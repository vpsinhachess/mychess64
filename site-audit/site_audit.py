#!/usr/bin/env python3
"""
Site Audit - crawl a website, lint its HTML for bugs, find broken links, build a sitemap,
measure page speed and produce a page-wise + site-wide SEO report.

Install:  pip install requests beautifulsoup4
Run UI :  python site_audit.py            (opens http://localhost:8000)
Run CLI:  python site_audit.py https://www.mychess64.com [max_pages]
"""
import sys, re, time, json, html, threading, webbrowser, csv, io
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urljoin, urldefrag, urlparse
import requests
from bs4 import BeautifulSoup
from html.parser import HTMLParser

DEFAULT_URL = "https://www.mychess64.com"
UA = {"User-Agent": "SiteAuditBot/1.0 (+personal website audit)"}
TIMEOUT = 15
esc = html.escape


def host(u):
    return urlparse(u).netloc.lower().removeprefix("www.")


def norm(u):
    u, _ = urldefrag(u.strip())
    p = urlparse(u)
    if p.path == "":
        u = u.replace(p.netloc, p.netloc + "/", 1) if not p.query else u
    return u


# ---------------------------------------------------------------- fetching
def fetch_page(url):
    r = {"url": url, "status": 0, "time": 0, "size": 0, "html": False, "links": [], "assets": []}
    try:
        t = time.time()
        resp = requests.get(url, headers=UA, timeout=TIMEOUT, allow_redirects=True)
        r["time"] = round(time.time() - t, 2)
        r["status"] = resp.status_code
        r["final"] = resp.url
        r["redirects"] = len(resp.history)
        r["size"] = len(resp.content)
        r["compressed"] = "content-encoding" in resp.headers
        hh = resp.headers
        r["ttfb"] = round(resp.elapsed.total_seconds(), 2)
        r["hdr"] = {"hsts": "strict-transport-security" in hh, "xcto": "x-content-type-options" in hh,
                    "csp": "content-security-policy" in hh}
        ct = resp.headers.get("content-type", "")
        if "html" in ct and resp.status_code < 400:
            r["html"] = True
            r.update(analyse(resp.text, resp.url))
    except Exception as e:
        r["error"] = str(e)[:120]
    return r


def analyse(markup, base):
    s = BeautifulSoup(markup, "html.parser")
    d = {}
    d["lint"] = html_lint(markup, base.startswith("https"))
    d["title"] = (s.title.string or "").strip() if s.title and s.title.string else ""
    m = s.find("meta", attrs={"name": re.compile("^description$", re.I)})
    d["desc"] = (m.get("content") or "").strip() if m else ""
    d["h1"] = [h.get_text(" ", strip=True) for h in s.find_all("h1")]
    d["h2"] = len(s.find_all("h2"))
    c = s.find("link", rel="canonical")
    d["canonical"] = c.get("href") if c else ""
    d["viewport"] = bool(s.find("meta", attrs={"name": "viewport"}))
    d["lang"] = (s.html.get("lang") if s.html else "") or ""
    rb = s.find("meta", attrs={"name": re.compile("^robots$", re.I)})
    d["noindex"] = bool(rb and "noindex" in (rb.get("content") or "").lower())
    d["og"] = bool(s.find("meta", property="og:title"))
    d["schema"] = bool(s.find("script", type="application/ld+json"))
    imgs = s.find_all("img")
    d["images"] = len(imgs)
    d["no_alt"] = sum(1 for i in imgs if not (i.get("alt") or "").strip())
    for x in s(["script", "style", "noscript"]):
        x.decompose()
    d["words"] = len(s.get_text(" ", strip=True).split())
    links, assets = [], []
    for a in s.find_all("a", href=True):
        h = a["href"].strip()
        if h.startswith(("mailto:", "tel:", "javascript:", "#", "sms:")) or not h:
            continue
        links.append(norm(urljoin(base, h)))
    for i in imgs:
        if i.get("src") and not i["src"].startswith("data:"):
            assets.append(norm(urljoin(base, i["src"])))
    d["links"], d["assets"] = list(dict.fromkeys(links)), list(dict.fromkeys(assets))
    return d


def check_link(url):
    try:
        r = requests.head(url, headers=UA, timeout=TIMEOUT, allow_redirects=True)
        if r.status_code in (403, 405, 400, 501) or r.status_code >= 500:
            r = requests.get(url, headers=UA, timeout=TIMEOUT, stream=True)
        return r.status_code, ""
    except Exception as e:
        return 0, str(e)[:100]


# ---------------------------------------------------------------- scoring
def seo_issues(p):
    """Return list of (severity, message) for one page."""
    out = []
    if p["status"] == 0 or p["status"] >= 400:
        return [("high", f"Page error (status {p['status'] or 'no response'})")]
    if not p["html"]:
        return out
    t, d = p["title"], p["desc"]
    if not t: out.append(("high", "Missing <title>"))
    elif len(t) < 30 or len(t) > 60: out.append(("low", f"Title length {len(t)} (ideal 30-60)"))
    if not d: out.append(("high", "Missing meta description"))
    elif len(d) < 70 or len(d) > 160: out.append(("low", f"Meta description length {len(d)} (ideal 70-160)"))
    if len(p["h1"]) == 0: out.append(("high", "No H1 heading"))
    elif len(p["h1"]) > 1: out.append(("medium", f"{len(p['h1'])} H1 headings (use one)"))
    if not p["canonical"]: out.append(("low", "No canonical tag"))
    if not p["viewport"]: out.append(("high", "No viewport meta (not mobile friendly)"))
    if not p["lang"]: out.append(("low", "No lang attribute on <html>"))
    if p["noindex"]: out.append(("medium", "Page is set to noindex"))
    if not p["og"]: out.append(("low", "No Open Graph tags (poor social sharing)"))
    if not p["schema"]: out.append(("low", "No structured data (JSON-LD)"))
    if p["no_alt"]: out.append(("medium", f"{p['no_alt']} of {p['images']} images missing alt text"))
    if p["words"] < 300: out.append(("medium", f"Thin content ({p['words']} words)"))
    if p["time"] > 3: out.append(("high", f"Very slow load ({p['time']}s)"))
    elif p["time"] > 1.5: out.append(("medium", f"Slow load ({p['time']}s)"))
    if p["size"] > 2_000_000: out.append(("medium", f"Heavy page ({p['size']//1024} KB)"))
    if not p.get("compressed"): out.append(("low", "No gzip/brotli compression"))
    if p.get("redirects", 0) > 1: out.append(("low", f"{p['redirects']} redirects before reaching page"))
    if not p["url"].startswith("https"): out.append(("high", "Not served over HTTPS"))
    return out


def score(issues):
    w = {"high": 12, "medium": 6, "low": 2}
    return max(0, 100 - sum(w[s] for s, _ in issues))


# ---------------------------------------------------------------- HTML lint (bugs & errors)
VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"}
OPT = {"li","p","td","th","tr","thead","tbody","tfoot","option","optgroup","dt","dd","colgroup","html","head","body","caption"}
DEPR = {"font","center","marquee","blink","big","strike","frame","frameset","acronym","tt"}
HEAD = {"h1","h2","h3","h4","h5","h6"}


class Lint(HTMLParser):
    def __init__(self, https):
        super().__init__(convert_charrefs=True)
        self.https, self.stack, self.out = https, [], []
        self.ids, self.anchors, self.labels, self.inputs = {}, set(), set(), []
        self.lab, self.a, self.h, self.last_h = 0, None, None, 0
        self.head, self.titles, self.charset = False, 0, False
        self.c = defaultdict(int)

    def add(self, sev, msg, line=None):
        self.out.append((sev, f"{msg} (line {line or self.getpos()[0]})"))

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        ln = self.getpos()[0]
        if tag in DEPR: self.add("medium", f"Deprecated tag <{tag}>")
        if "id" in a:
            if a["id"] in self.ids: self.ids[a["id"]][0] += 1
            else: self.ids[a["id"]] = [1, ln]
        if "style" in a: self.c["style"] += 1
        if any(k.startswith("on") for k in a): self.c["onev"] += 1
        src = a.get("src") or a.get("href") or ""
        if self.https and src.startswith("http://") and tag in ("img","script","iframe","link","source","video","audio"):
            self.c["mixed"] += 1
        if tag == "img":
            if "alt" not in a: self.add("medium", "Image without alt attribute")
            if not (a.get("width") and a.get("height")): self.c["dim"] += 1
            if self.a: self.a["img"] = True
        elif tag == "a":
            self.a = {"t": "", "img": False, "line": ln, "href": "href" in a,
                      "aria": bool(a.get("aria-label") or a.get("title"))}
            h = a.get("href", "")
            if h.startswith("#") and len(h) > 1: self.anchors.add(h[1:])
            rel = a.get("rel", "")
            if a.get("target") == "_blank" and "noopener" not in rel and "noreferrer" not in rel: self.c["blank"] += 1
        elif tag in HEAD:
            lv = int(tag[1]); self.h = {"t": "", "line": ln}
            if self.last_h and lv > self.last_h + 1:
                self.add("low", f"Heading level skipped (h{self.last_h} to h{lv})")
            self.last_h = lv
        elif tag == "label":
            self.lab += 1
            if a.get("for"): self.labels.add(a["for"])
        elif tag in ("input", "select", "textarea"):
            if a.get("type", "text").lower() not in ("hidden","submit","button","image","reset"):
                self.inputs.append((a.get("id"), bool(a.get("aria-label") or a.get("aria-labelledby") or a.get("title")), self.lab > 0))
        elif tag == "iframe" and not a.get("title"): self.add("low", "iframe without title")
        elif tag == "script" and a.get("src") and self.head and "async" not in a and "defer" not in a and a.get("type") != "module":
            self.c["block"] += 1
        elif tag == "title": self.titles += 1
        elif tag == "meta" and ("charset" in a or "content-type" in a.get("http-equiv", "").lower()): self.charset = True
        elif tag == "head": self.head = True
        elif tag == "body": self.head = False
        if tag not in VOID: self.stack.append((tag, ln))

    def handle_endtag(self, tag):
        if tag in VOID: return
        if tag == "a" and self.a:
            x, self.a = self.a, None
            if x["href"] and not x["t"].strip() and not x["img"] and not x["aria"]:
                self.add("medium", "Empty link (no text)", x["line"])
        elif tag in HEAD and self.h:
            x, self.h = self.h, None
            if not x["t"].strip(): self.add("medium", f"Empty <{tag}> heading", x["line"])
        elif tag == "label": self.lab = max(0, self.lab - 1)
        elif tag == "head": self.head = False
        idx = next((i for i in range(len(self.stack) - 1, -1, -1) if self.stack[i][0] == tag), None)
        if idx is None:
            self.add("medium", f"Stray closing tag </{tag}> without opening tag"); return
        for t, l in self.stack[idx + 1:]:
            if t not in OPT: self.add("high", f"<{t}> opened on line {l} is not closed before </{tag}>")
        del self.stack[idx:]

    def handle_data(self, d):
        if self.a: self.a["t"] += d
        if self.h: self.h["t"] += d


def html_lint(markup, https):
    p = Lint(https)
    try:
        p.feed(markup); p.close()
    except Exception:
        return [("low", "HTML parser could not fully read this page")]
    out = p.out[:30]
    if not re.match(r"\s*(<!--.*?-->\s*)*<!doctype html", markup, re.I | re.S):
        out.append(("medium", "Missing <!DOCTYPE html>"))
    for t, l in p.stack:
        if t not in OPT: out.append(("high", f"Unclosed <{t}> opened on line {l}"))
    for i, (n, l) in p.ids.items():
        if n > 1: out.append(("high", f"Duplicate id \"{i}\" used {n} times (first on line {l})"))
    for a in p.anchors:
        if a not in p.ids and a != "top": out.append(("medium", f"Anchor link #{a} points to a missing id"))
    n = sum(1 for i, aria, inl in p.inputs if not (aria or inl or (i and i in p.labels)))
    if n: out.append(("medium", f"{n} form fields without a label"))
    if p.titles > 1: out.append(("medium", f"{p.titles} <title> tags (should be 1)"))
    if not p.charset: out.append(("medium", "No charset declaration (<meta charset>)"))
    if p.c["mixed"]: out.append(("high", f"{p.c['mixed']} insecure http:// resources on an https page (mixed content)"))
    if p.c["block"]: out.append(("medium", f"{p.c['block']} render-blocking scripts in <head> (add defer/async)"))
    if p.c["dim"]: out.append(("low", f"{p.c['dim']} images without width/height (causes layout shift)"))
    if p.c["blank"]: out.append(("low", f"{p.c['blank']} links with target=_blank but no rel=noopener"))
    if p.c["style"] > 15: out.append(("low", f"{p.c['style']} inline style attributes (move to CSS)"))
    if p.c["onev"]: out.append(("low", f"{p.c['onev']} inline JavaScript event handlers (onclick etc.)"))
    return out


TIPS = [
    ("Missing <title>", "Add a unique <title> (30-60 chars) describing the page."),
    ("Title length", "Rewrite the title to 30-60 characters."),
    ("Missing meta description", "Add <meta name=\"description\" content=\"...\"> of 70-160 characters."),
    ("Meta description length", "Rewrite the description to 70-160 characters."),
    ("No H1", "Add exactly one <h1> stating the page's main topic."),
    ("H1 headings", "Keep one <h1> per page; make the others <h2>."),
    ("viewport", "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">."),
    ("alt", "Describe every image with alt=\"...\"; use alt=\"\" only for decorative images."),
    ("Duplicate id", "IDs must be unique on a page. Rename the duplicates."),
    ("not closed", "Close the tag in the correct place; unclosed tags break layout."),
    ("Unclosed", "Add the missing closing tag."),
    ("Stray closing", "Remove the extra closing tag or add the missing opening tag."),
    ("Deprecated tag", "Replace with CSS (e.g. <center> becomes text-align:center)."),
    ("render-blocking", "Add defer (or async) to <script src=...> tags in <head>."),
    ("mixed content", "Change http:// resources to https://."),
    ("Slow load", "Compress images, minify CSS/JS, enable caching, use a CDN."),
    ("Very slow", "Compress images, minify CSS/JS, enable caching, use a CDN."),
    ("Heavy page", "Resize and compress images (WebP), lazy-load below-the-fold media."),
    ("Thin content", "Add useful original text (300+ words) or mark the page noindex."),
    ("without a label", "Add <label for=id> or aria-label to each form field."),
    ("width/height", "Add width and height attributes to <img> to avoid layout shift."),
    ("Empty link", "Give the link visible text or an aria-label."),
    ("Anchor link", "Fix or remove the #anchor: the target id does not exist."),
    ("canonical", "Add <link rel=\"canonical\" href=\"...\"> with the preferred URL."),
    ("Open Graph", "Add og:title, og:description and og:image meta tags."),
    ("structured data", "Add JSON-LD from schema.org (Organization, Article, BreadcrumbList...)."),
    ("compression", "Enable gzip/brotli for your assets."),
    ("DOCTYPE", "Start the file with <!DOCTYPE html>."),
    ("charset", "Add <meta charset=\"utf-8\"> as the first tag in <head>."),
]


def page_issues(p):
    """All issues of a page as (severity, message, category)."""
    out = []
    for s, m in seo_issues(p):
        cat = "Errors" if m.startswith("Page error") else "Speed" if re.search(r"load|Heavy|compression|redirects", m) else "SEO"
        out.append((s, m, cat))
    for s, m in p.get("lint", []): out.append((s, m, "HTML"))
    return out


def sitemap_urls(url, depth=0):
    try:
        t = requests.get(url, headers=UA, timeout=10).text
    except Exception:
        return []
    locs = re.findall(r"<loc>\s*(.*?)\s*</loc>", t, re.S)
    if "<sitemapindex" in t and depth < 2:
        return [u for x in locs[:20] for u in sitemap_urls(html.unescape(x), depth + 1)]
    return [html.unescape(x) for x in locs]


def issues_csv(pages):
    o = io.StringIO(); w = csv.writer(o)
    w.writerow(["page", "category", "severity", "issue"])
    for u, p in pages.items():
        for s, m, c in page_issues(p): w.writerow([u, c, s, m])
    return o.getvalue()


# ---------------------------------------------------------------- crawl
def run_audit(start, max_pages, state):
    start = norm(start if start.startswith("http") else "https://" + start)
    root = host(start)
    state.update(phase="Crawling pages", done=0, total=1, report=None, start=start)
    pages, seen, queue = {}, {start}, [start]
    sm = [norm(u) for u in sitemap_urls(urljoin(start, "/sitemap.xml")) if host(u) == root]
    for u in sm:
        if u not in seen: seen.add(u); queue.append(u)
    with ThreadPoolExecutor(8) as ex:
        while queue and len(pages) < max_pages:
            batch = queue[: max_pages - len(pages)]
            queue = queue[len(batch):]
            for p in ex.map(fetch_page, batch):
                pages[p["url"]] = p
                state["done"] = len(pages)
                for l in p["links"]:
                    if l.startswith("http") and host(l) == root and l not in seen:
                        if re.search(r"\.(jpg|jpeg|png|gif|webp|svg|pdf|zip|css|js|ico|mp4|mp3)(\?|$)", l, re.I):
                            continue
                        seen.add(l); queue.append(l)
            state["total"] = len(pages) + len(queue)

    # collect every link/asset and who links to it
    sources = defaultdict(set)
    for u, p in pages.items():
        for l in p["links"] + p["assets"]:
            sources[l].add(u)
    to_check = [u for u in sources if u not in pages and u.startswith("http")]
    state.update(phase="Checking links", done=0, total=len(to_check))
    status = {u: (p["status"], p.get("error", "")) for u, p in pages.items()}
    with ThreadPoolExecutor(12) as ex:
        for u, res in zip(to_check, ex.map(check_link, to_check)):
            status[u] = res
            state["done"] += 1
    broken = []
    for u, (code, err) in status.items():
        if code == 0 or code >= 400:
            for src in sorted(sources.get(u, [])) or [""]:
                broken.append({"url": u, "code": code or "ERR", "error": err,
                               "source": src, "type": "internal" if host(u) == root else "external"})
    # robots / sitemap presence
    extra = {}
    for name in ("robots.txt", "sitemap.xml"):
        try:
            extra[name] = requests.get(urljoin(start, "/" + name), headers=UA, timeout=10).status_code == 200
        except Exception:
            extra[name] = False
    try:
        extra["https_redirect"] = requests.get("http://" + urlparse(start).netloc + "/", headers=UA, timeout=10).url.startswith("https")
    except Exception:
        extra["https_redirect"] = False
    state["report"] = build_report(start, pages, broken, status, extra, sm)
    state["pages"], state["broken"] = pages, broken
    state["phase"] = "Done"


# ---------------------------------------------------------------- report
def sitemap_xml(pages):
    ok = [u for u, p in pages.items() if p["status"] == 200 and p["html"] and not p.get("noindex")]
    rows = "".join(f"<url><loc>{esc(u)}</loc></url>\n" for u in ok)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + rows + "</urlset>")


CSS = """
:root{--bg:#f4f6f9;--card:#fff;--tx:#1c2430;--mu:#5d6b7c;--ln:#dde3ea;--ac:#1a62c9;--hi:#d64545;--me:#d9961a;--lo:#7a8aa0;--ok:#2e9d5b}
@media(prefers-color-scheme:dark){:root{--bg:#12171d;--card:#1b222b;--tx:#e6ebf1;--mu:#98a5b5;--ln:#2b3541;--ac:#5b9cf0}}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--tx)}
header{padding:16px}h1{margin:0;font-size:22px}header p{margin:2px 0 0;color:var(--mu)}
nav{position:sticky;top:0;z-index:5;background:var(--card);border-bottom:1px solid var(--ln);display:flex;gap:4px;overflow-x:auto;padding:6px 10px}
nav a{white-space:nowrap;padding:6px 12px;border-radius:16px;color:var(--tx);text-decoration:none;font-size:14px}nav a:hover{background:var(--ln)}
main{max-width:1100px;margin:0 auto;padding:0 14px 40px}section{scroll-margin-top:50px}
h2{margin:28px 0 10px;font-size:19px}h3{font-size:16px;margin:16px 0 6px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.card{background:var(--card);border:1px solid var(--ln);border-radius:12px;padding:12px}
.card b{font-size:24px;display:block}.mu,.tip{color:var(--mu);font-size:13px}
.ring{width:120px;height:120px;border-radius:50%;display:grid;place-items:center;margin:auto;position:relative}
.ring::after{content:"";position:absolute;inset:12px;border-radius:50%;background:var(--card)}
.ring span{position:relative;z-index:1;font-size:28px;font-weight:700;text-align:center;line-height:1.1}
.wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;background:var(--card);font-size:13px}
td,th{border-bottom:1px solid var(--ln);padding:6px 8px;text-align:left;vertical-align:top}th{background:var(--bg)}
td.u{word-break:break-all}.pill{color:#fff;border-radius:10px;padding:1px 8px;font-size:12px;white-space:nowrap}
.high{background:var(--hi)}.medium{background:var(--me)}.low{background:var(--lo)}.cat{background:var(--ac)}
details{background:var(--card);border:1px solid var(--ln);border-radius:8px;margin:6px 0;padding:8px 12px}
summary{cursor:pointer;word-break:break-word}.bar{height:10px;border-radius:5px;min-width:2px}
input,select{padding:8px;border-radius:8px;border:1px solid var(--ln);background:var(--card);color:var(--tx);font-size:14px}
.ok{color:var(--ok)}.no{color:var(--hi)}a{color:var(--ac)}ul{margin:4px 0;padding-left:20px}
@media print{nav{display:none}details{break-inside:avoid}}
"""
JS = ("<script>function f(){var q=document.getElementById('q').value.toLowerCase(),s=document.getElementById('sv').value;"
      "document.querySelectorAll('#plist details').forEach(function(d){d.style.display="
      "(d.dataset.t.indexOf(q)>-1&&(!s||d.dataset.s==s))?'':'none'})}</script>")


def build_report(start, pages, broken, status, extra, sm):
    W = {"high": 3, "medium": 2, "low": 1}
    PI = {u: page_issues(p) for u, p in pages.items()}
    sc = {u: score([(s, m) for s, m, c in i]) for u, i in PI.items()}
    htmls = [p for p in pages.values() if p["html"]]

    def cat_score(cat):
        v = [score([(s, m) for s, m, c in PI[p["url"]] if c == cat]) for p in htmls]
        return round(sum(v) / max(1, len(v)))

    ibr = len({b["url"] for b in broken if b["type"] == "internal"})
    ebr = len({b["url"] for b in broken if b["type"] == "external"})
    links_sc = max(0, 100 - ibr * 10 - ebr * 3)
    page_sc = round(sum(sc.values()) / max(1, len(sc)))
    total = round((page_sc * 3 + links_sc) / 4)
    col = lambda s: "var(--ok)" if s >= 80 else "var(--me)" if s >= 60 else "var(--hi)"
    grade = lambda s: "A" if s >= 90 else "B" if s >= 80 else "C" if s >= 70 else "D" if s >= 55 else "F"
    pill = lambda sev: f"<span class='pill {sev}'>{sev}</span>"
    cpill = lambda c: f"<span class='pill cat'>{c}</span>"

    agg = {}
    for u, iss in PI.items():
        for s, m, c in iss:
            a = agg.setdefault((c, re.sub(r"\d+(\.\d+)?", "#", m)), {"sev": s, "cat": c, "msg": m, "pages": []})
            a["pages"].append(u)
            if W[s] > W[a["sev"]]: a["sev"] = s
    fixes = sorted(agg.values(), key=lambda a: -(W[a["sev"]] * len(a["pages"])))
    tip = lambda m: next((t for k, t in TIPS if k.lower() in m.lower()), "")
    nsev = {k: sum(len(a["pages"]) for a in agg.values() for _ in [0] if a["sev"] == k) for k in W}

    ok = [q for q in pages.values() if q["status"] == 200]
    ts = sorted(q["time"] for q in ok) or [0]
    avg, med = round(sum(ts) / len(ts), 2), ts[len(ts) // 2]
    P = [f"<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"
         f"<title>Audit {esc(start)}</title><style>{CSS}</style>"
         f"<header><h1>Website audit: {esc(start)}</h1><p>{time.strftime('%d %b %Y %H:%M')} &middot; {len(pages)} pages crawled "
         f"&middot; <a href=issues.csv>all issues (CSV)</a> &middot; <a href=sitemap.xml>sitemap.xml</a> "
         f"&middot; <a href=broken_links.csv>broken links (CSV)</a></p></header><nav>"
         + "".join(f"<a href='#{i}'>{n}</a>" for i, n in [("ov", "Overview"), ("fix", "Top fixes"), ("bl", "Broken links"),
                   ("ht", "HTML errors"), ("sp", "Speed"), ("pg", "All pages"), ("sm", "Sitemap &amp; setup")]) + "</nav><main>"]

    # overview
    cats = [("SEO", cat_score("SEO")), ("HTML quality", cat_score("HTML")), ("Speed", cat_score("Speed")), ("Links", links_sc)]
    P.append(f"<section id=ov><h2>Overview</h2><div class=grid><div class=card><div class=ring style='background:conic-gradient({col(total)} {total}%,var(--ln) 0)'>"
             f"<span>{total}<br><small>Grade {grade(total)}</small></span></div></div>")
    P += [f"<div class=card><b style='color:{col(s)}'>{s}</b>{n} score</div>" for n, s in cats]
    P.append(f"<div class=card><b style='color:{'var(--hi)' if ibr + ebr else 'var(--ok)'}'>{ibr + ebr}</b>Broken links ({ibr} internal)</div>"
             f"<div class=card><b>{avg}s</b>Avg load (median {med}s)</div>"
             f"<div class=card><b style='color:var(--hi)'>{nsev['high']}</b>High-severity issue types</div>"
             f"<div class=card><b>{sum(len(q['links']) for q in pages.values())}</b>Links found</div></div></section>")

    # top fixes
    P.append("<section id=fix><h2>Top fixes (most impact first)</h2>")
    for a in fixes[:15]:
        pg = a["pages"]
        P.append(f"<details><summary>{pill(a['sev'])} {cpill(a['cat'])} {esc(a['msg'])} <span class=mu>&middot; {len(pg)} page(s)</span></summary>"
                 f"<p class=tip>How to fix: {esc(tip(a['msg'])) or 'See the page details.'}</p><ul>"
                 + "".join(f"<li class=tip>{esc(x)}</li>" for x in pg[:30]) + ("<li class=tip>...</li>" if len(pg) > 30 else "") + "</ul></details>")
    if not fixes: P.append("<p>No issues found.</p>")
    P.append("</section>")

    # broken links
    grp = {}
    for b in broken:
        g = grp.setdefault(b["url"], {"code": b["code"], "type": b["type"], "err": b["error"], "src": []})
        g["src"].append(b["source"])
    P.append(f"<section id=bl><h2>Broken / invalid links ({len(grp)})</h2>")
    if grp:
        P.append("<div class=wrap><table><tr><th>Broken URL<th>Status<th>Type<th>Found on</tr>")
        for u, g in sorted(grp.items(), key=lambda x: x[1]["type"] != "internal"):
            P.append(f"<tr><td class=u>{esc(u)}<td>{g['code']} {esc(g['err'])}<td>{g['type']}<td class=u>"
                     + "<br>".join(esc(s) for s in g["src"][:6]) + (f"<br>+{len(g['src']) - 6} more" if len(g["src"]) > 6 else "") + "</tr>")
        P.append("</table></div><p class=tip>Some external sites block bots (403/999) and may be false alarms: open them manually to confirm.</p>")
    else: P.append("<p class=ok>No broken links found.</p>")
    P.append("</section>")

    # html errors
    hagg = [a for a in fixes if a["cat"] == "HTML"]
    P.append(f"<section id=ht><h2>HTML bugs &amp; errors</h2><p class=tip>Checked: unclosed/stray tags, duplicate ids, deprecated tags, missing doctype/charset, "
             "mixed content, empty links/headings, unlabeled form fields, broken #anchors, blocking scripts. Line numbers are included.</p>")
    if hagg:
        P.append("<div class=wrap><table><tr><th>Severity<th>Problem<th>Pages<th>Fix</tr>")
        for a in hagg:
            P.append(f"<tr><td>{pill(a['sev'])}<td>{esc(a['msg'])}<td>{len(a['pages'])}<td>{esc(tip(a['msg']))}</tr>")
        P.append("</table></div><h3>By page</h3>")
        for u, iss in PI.items():
            hi = [(s, m) for s, m, c in iss if c == "HTML"]
            if hi:
                P.append(f"<details><summary>{esc(u)} <span class=mu>&middot; {len(hi)} problem(s)</span></summary><ul>"
                         + "".join(f"<li>{pill(s)} {esc(m)}</li>" for s, m in hi) + "</ul></details>")
    else: P.append("<p class=ok>No HTML problems detected.</p>")
    P.append("</section>")

    # speed
    P.append(f"<section id=sp><h2>Page speed</h2><p class=tip>Measured from the machine running the audit: fastest {ts[0]}s, median {med}s, slowest {ts[-1]}s.</p>"
             "<div class=wrap><table><tr><th>Slowest pages<th style='width:25%'><th>Load<th>Server<th>Size</tr>")
    for q in sorted(ok, key=lambda x: -x["time"])[:20]:
        w = min(100, q["time"] / 4 * 100)
        P.append(f"<tr><td class=u>{esc(q['url'])}<td><div class=bar style='width:{w}%;background:{col(100 - w)}'></div><td>{q['time']}s"
                 f"<td>{q.get('ttfb', '-')}s<td>{q['size'] // 1024} KB</tr>")
    P.append("</table></div></section>")

    # all pages
    P.append("<section id=pg><h2>All pages (page-wise report)</h2><input id=q placeholder='Search URL or issue' oninput=f()> "
             "<select id=sv onchange=f()><option value=''>Any worst severity</option><option>high</option><option>medium</option><option>low</option></select><div id=plist>")
    for u in sorted(pages, key=lambda x: sc[x]):
        q, iss = pages[u], PI[u]
        ms = max((W[s] for s, _, _ in iss), default=0)
        sev = {3: "high", 2: "medium", 1: "low", 0: ""}[ms]
        txt = esc((u + " " + " ".join(m for _, m, _ in iss)).lower(), quote=True)
        P.append(f"<details data-t=\"{txt}\" data-s=\"{sev}\"><summary><span class=pill style='background:{col(sc[u])}'>{sc[u]}</span> {esc(u)}</summary>")
        if q["html"]:
            P.append(f"<p class=tip><b>Title:</b> {esc(q['title']) or '-'}<br><b>Description:</b> {esc(q['desc']) or '-'}<br><b>H1:</b> {esc(' | '.join(q['h1'])) or '-'}"
                     f"<br>{q['words']} words &middot; {len(q['links'])} links &middot; {q['images']} images &middot; {q['time']}s &middot; {q['size'] // 1024} KB</p>")
        P.append("<ul>" + "".join(f"<li>{pill(s)} {cpill(c)} {esc(m)}</li>" for s, m, c in iss) + "</ul>" if iss else "<p class=ok>No issues.</p>")
        P.append("</details>")
    P.append("</div></section>")

    # sitemap & setup
    k = lambda u: u.split("#")[0].rstrip("/")
    smset, linked = {k(u) for u in sm}, {k(l) for q in pages.values() for l in q["links"]}
    orphans = [u for u in sm if k(u) not in linked and k(u) != k(start)]
    missing = [u for u, q in pages.items() if q["status"] == 200 and q["html"] and not q.get("noindex") and sm and k(u) not in smset]
    home = pages.get(start) or next(iter(pages.values()))
    hd = home.get("hdr", {})
    chk = [(extra.get("robots.txt"), "robots.txt exists"), (extra.get("sitemap.xml"), "sitemap.xml exists on the site"),
           (extra.get("https_redirect"), "http:// redirects to https://"), (start.startswith("https"), "Site uses HTTPS"),
           (hd.get("hsts"), "HSTS header"), (hd.get("xcto"), "X-Content-Type-Options header"), (hd.get("csp"), "Content-Security-Policy header")]
    P.append("<section id=sm><h2>Sitemap &amp; setup</h2><ul>" + "".join(f"<li class={'ok' if v else 'no'}>{'&#10004;' if v else '&#10008;'} {n}</li>" for v, n in chk)
             + "</ul><p class=tip>Security headers cannot be customised on GitHub Pages, so treat those as low priority.</p>")
    if orphans: P.append(f"<h3>In your sitemap but not linked from any page ({len(orphans)})</h3><ul>" + "".join(f"<li class=tip>{esc(u)}</li>" for u in orphans[:50]) + "</ul>")
    if missing: P.append(f"<h3>Crawled pages missing from your sitemap ({len(missing)})</h3><ul>" + "".join(f"<li class=tip>{esc(u)}</li>" for u in missing[:50]) + "</ul>")
    P.append("<h3>Crawled structure</h3><div class=wrap><table><tr><th>URL<th>Status<th>Title<th>Words</tr>")
    for u in sorted(pages):
        q = pages[u]
        P.append(f"<tr><td class=u>{esc(u)}<td>{q['status']}<td>{esc(q.get('title', ''))[:70]}<td>{q.get('words', '')}</tr>")
    P.append("</table></div></section></main>" + JS)
    return "".join(P)


# ---------------------------------------------------------------- local web UI
STATE = {"phase": "Idle", "done": 0, "total": 0, "report": None}
PAGE = """<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>Site Audit</title><style>body{font:16px system-ui;margin:0;background:#f4f6f9}
header{background:#1c2430;color:#fff;padding:14px}main{padding:14px}
input,button{font-size:16px;padding:10px;border-radius:8px;border:1px solid #bbb}
input{width:min(420px,70%)}button{background:#1a62c9;color:#fff;border:0;cursor:pointer}
#bar{height:8px;background:#dde3ea;border-radius:4px;margin:10px 0}#fill{height:8px;width:0;background:#2e9d5b;border-radius:4px}
iframe{width:100%;height:80vh;border:1px solid #ccd;background:#fff;margin-top:10px}a{margin-right:12px}</style>
<header><b>Site Audit</b> - broken links, sitemap, speed &amp; SEO</header><main>
<input id=u value="%s"> <input id=m type=number value=150 style="width:80px" title="max pages">
<button onclick=go()>Analyse whole website</button><div id=st></div><div id=bar><div id=fill></div></div>
<div id=dl style="display:none"><a href=/sitemap.xml download>Download sitemap.xml</a>
<a href=/broken.csv download>Broken links CSV</a><a href=/issues.csv download>All issues CSV</a><a href=/report target=_blank>Open full report</a></div>
<iframe id=f style="display:none"></iframe></main><script>
async function go(){await fetch('/start',{method:'POST',body:JSON.stringify({url:u.value,max:+m.value})});
f.style.display='none';dl.style.display='none';poll()}
async function poll(){const s=await (await fetch('/status')).json();
st.textContent=s.phase+' '+s.done+'/'+s.total;fill.style.width=(s.total?100*s.done/s.total:0)+'%%';
if(s.phase=='Done'){f.src='/report';f.style.display='block';dl.style.display='block';fill.style.width='100%%'}
else if(s.phase!='Idle')setTimeout(poll,800)}
if(location.search.indexOf('auto')>-1)go();</script>"""


class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def send(self, body, ctype="text/html", extra=None):
        b = body.encode() if isinstance(body, str) else body
        self.send_response(200)
        self.send_header("Content-Type", ctype + "; charset=utf-8")
        for k, v in (extra or {}).items(): self.send_header(k, v)
        self.end_headers(); self.wfile.write(b)

    def do_GET(self):
        if self.path.split("?")[0] == "/": self.send(PAGE % DEFAULT_URL)
        elif self.path == "/status":
            self.send(json.dumps({k: STATE[k] for k in ("phase", "done", "total")}), "application/json")
        elif self.path == "/report": self.send(STATE.get("report") or "No report yet")
        elif self.path == "/sitemap.xml" and STATE.get("pages"):
            self.send(sitemap_xml(STATE["pages"]), "application/xml", {"Content-Disposition": "attachment; filename=sitemap.xml"})
        elif self.path == "/issues.csv" and STATE.get("pages"):
            self.send(issues_csv(STATE["pages"]), "text/csv", {"Content-Disposition": "attachment; filename=all_issues.csv"})
        elif self.path == "/broken.csv" and STATE.get("broken"):
            self.send(to_csv(STATE["broken"]), "text/csv", {"Content-Disposition": "attachment; filename=broken_links.csv"})
        else: self.send("Not available", "text/plain")

    def do_POST(self):
        data = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or "{}")
        if STATE["phase"] not in ("Crawling pages", "Checking links"):
            threading.Thread(target=run_audit, args=(data["url"], min(int(data.get("max", 150)), 1000), STATE), daemon=True).start()
        self.send("{}", "application/json")


def to_csv(rows):
    o = io.StringIO(); w = csv.writer(o)
    w.writerow(["broken_url", "status", "type", "found_on_page"])
    for b in rows: w.writerow([b["url"], b["code"], b["type"], b["source"]])
    return o.getvalue()


if __name__ == "__main__":
    if len(sys.argv) > 1:  # CLI mode
        st = {}
        run_audit(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 150, st)
        open("audit_report.html", "w", encoding="utf-8").write(st["report"])
        open("sitemap.xml", "w", encoding="utf-8").write(sitemap_xml(st["pages"]))
        open("broken_links.csv", "w", encoding="utf-8").write(to_csv(st["broken"]))
        open("issues.csv", "w", encoding="utf-8").write(issues_csv(st["pages"]))
        print("Saved audit_report.html, sitemap.xml, broken_links.csv, issues.csv")
    else:
        print("Open http://localhost:8000  (Ctrl+C to stop)")
        threading.Timer(1, lambda: webbrowser.open("http://localhost:8000/?auto=1")).start()
        ThreadingHTTPServer(("localhost", 8000), H).serve_forever()
