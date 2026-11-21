#!/usr/bin/env python3
"""MyChess64 tools builder.
  python3 build_tools.py convert <old_tools_dir> <new_tools_dir>   one-time: old pages -> new shared shell
  python3 build_tools.py refresh <tools_dir>                       re-apply header/menu/related/footer/CSS after editing TOOLS below
  python3 build_tools.py check   <tools_dir>                       verify every link, canonical, menu, JSON-LD, JS syntax
To add a tool: add a row to TOOLS, create tools/<slug>/index.html (copy an existing page), run `refresh`."""
import re, sys, os, json, html, shutil, subprocess, glob, collections
SITE = 'https://www.mychess64.com'
esc = lambda s: html.escape(s, quote=True)

# slug, legacy folder, name, category id, card tag, icon
TOOLS = [
 ('pgn-viewer','pgn-viewer','PGN Viewer','notation','VIEW','play'),
 ('pgn-cleaner-validator','pgn-cleaner-validator','PGN Cleaner & Validator','notation','CLEAN','sliders'),
 ('notation-converter','notation-converter','PGN–FEN–SAN–UCI Converter','notation','CONVERT','swap'),
 ('game-result-checker','game-result-checker','Chess Game Result Checker','notation','CHECK','shield'),
 ('fen-validator','fen-validator','FEN Validator','notation','VALIDATE','shield'),
 ('chess-diagram-generator','diagram-generator','Chess Diagram Generator','position','DESIGN','grid'),
 ('chess-gif-video-maker','gif-video-maker','Chess GIF & Video Maker','position','CREATE','play'),
 ('image-to-fen','image-to-fen','Image-to-FEN Converter','position','CONVERT','image'),
 ('chess-position-share','position-share','Chess Position Share Tool','position','SHARE','share'),
 ('search-fide-rating','search-fide-rating','FIDE Rating Explorer','ratings','EXPLORE','search'),
 ('fide-rating-calculator','fide-rating-calculator','FIDE Rating Calculator','ratings','CALCULATE','calc'),
 ('performance-rating-calculator','performance-rating-calculator','Performance Rating Calculator','ratings','CALCULATE','calc'),
 ('chess-rating-converter','rating-converter','Chess Rating Converter','ratings','CONVERT','swap'),
 ('chess-rating-tracker','rating-tracker','Chess Rating Tracker','ratings','TRACK','trend'),
 ('swiss-round-calculator','swiss-round-calculator','Swiss Rounds Calculator','tournament','PLAN','calendar'),
 ('time-control-converter','time-control-converter','Time Control Converter','tournament','CONVERT','clock'),
 ('chess-scoresheet-generator','scoresheet-generator','Chess Scoresheet Generator','tournament','PRINT','printer'),
 ('tournament-time-planner','tournament-time-planner','Tournament Time Planner','tournament','PLAN','calendar'),
 ('prize-fund-splitter','prize-fund-splitter','Prize Fund Splitter','tournament','CALCULATE','pie'),
 ('academy-batch-profit-calculator','academy-batch-profit-calculator','Academy Batch Profit Calculator','academy','CALCULATE','calc'),
 ('academy-break-even-calculator','academy-break-even-calculator','Academy Break-Even Calculator','academy','CALCULATE','calc'),
 ('chess-class-schedule-maker','chess-class-schedule-maker','Chess Class Schedule Maker','academy','PLAN','calendar'),
 ('student-progress-report-builder','student-progress-report-builder','Chess Progress Report Builder','academy','REPORT','report'),
 ('chess-certificate-generator','chess-certificate-generator','Chess Certificate Generator','academy','CREATE','award'),
]
CATS = [  # id, anchor, name, menu subtitle, section subtitle, icon
 ('notation','cat-notation','Games & notation','Build, review and convert games','Read, clean and convert PGN and FEN.','doc'),
 ('position','cat-position','Positions & media','Create and share chess positions','Turn positions and games into images, links and animations.','grid'),
 ('ratings','cat-ratings','Ratings','Explore player ratings and progress','Look up, calculate and track chess ratings.','chart'),
 ('tournament','cat-tournament','Tournaments','Prepare and manage events','Plan rounds, time controls, prize funds and score sheets.','trophy'),
 ('academy','cat-academy','Academy & coaching','Run classes, batches and reports','Schedules, batch finances, progress reports and certificates.','cap'),
]
DESC_OVERRIDE = {
 'chess-diagram-generator':'Create board diagrams from a FEN or by dragging pieces, with arrows, highlights and a caption.',
 'chess-gif-video-maker':'Turn your PGN games into engaging animated replays for lessons and social media.',
 'image-to-fen':'Convert a chessboard image into an editable position and FEN notation.',
 'chess-position-share':'Share a chess position with a clean link or a ready-to-use board image.'}
FEATURED = (SITE+'/play/digital-chess-clock/','Digital Chess Clock','A free online chess clock for over-the-board and online games.')
ICONS = {
 'doc':'<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7"/>',
 'grid':'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
 'chart':'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
 'trophy':'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 21h8M10 17h4"/>',
 'cap':'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
 'play':'<path d="M7 4l13 8-13 8z"/>',
 'image':'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
 'share':'<path d="M7 17L17 7M9 7h8v8"/>',
 'sliders':'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
 'swap':'<path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4"/>',
 'shield':'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 'search':'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 'calc':'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2"/>',
 'trend':'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
 'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'printer':'<path d="M6 9V3h12v6M6 17H4v-6h16v6h-2M7 14h10v7H7z"/>',
 'pie':'<path d="M12 3v9h9a9 9 0 1 1-9-9zM15 3.5A9 9 0 0 1 20.5 9H15z"/>',
 'report':'<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3"/>',
 'award':'<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"/>',
}
svg = lambda k, sw=2, extra='': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"%s>%s</svg>' % (sw, extra, ICONS[k])
T = {t[0]: dict(slug=t[0], folder=t[1], name=t[2], cat=t[3], tag=t[4], icon=t[5]) for t in TOOLS}
C = {c[0]: dict(id=c[0], anchor=c[1], name=c[2], sub=c[3], sec=c[4], icon=c[5]) for c in CATS}
url = lambda slug: '/tools/%s/' % slug
abs_url = lambda slug: '%s/tools/%s/' % (SITE, slug)
LEGACY_NAMES = {t['folder']: s for s, t in T.items()}
LEGACY_NAMES.update({'performance-rating-calulator': 'performance-rating-calculator'})
for s in T: LEGACY_NAMES.setdefault(s, s)
for t in T.values(): LEGACY_NAMES[t['folder']] = t['slug']

# ---------------------------------------------------------------- shell parts
def header(cur=None):
    cols = ''
    for c in CATS:
        links = ''
        for t in TOOLS:
            if t[3] != c[0]: continue
            on = ' aria-current="page" class="on mc-tool-menu-link"' if t[0] == cur else ' class="mc-tool-menu-link"'
            links += '<a%s href="%s"><span class="mc-tool-link-mark">✦</span><span class="mc-tool-link-text">%s</span><span class="mc-tool-link-arrow">↗</span></a>' % (on, url(t[0]), esc(t[2]))
        cols += '<div><h3><span class="mc-category-icon">%s</span><span class="mc-category-heading-text"><span class="mc-category-title">%s</span><small class="mc-category-subtitle">%s</small></span></h3>%s</div>' % (svg(c[5]), esc(c[2]), esc(c[3]), links)
    feat = '<a class="mc-feat" href="%s"><span class="mc-feat-ic">%s</span><span class="mc-feat-tx"><span class="mc-feat-tag">FEATURED</span><b>%s</b><span>%s</span></span><span class="mc-feat-go" aria-hidden="true">&rarr;</span></a>' % (FEATURED[0], svg('clock'), esc(FEATURED[1]), esc(FEATURED[2]))
    chev = '<svg aria-hidden="true" fill="none" height="12" stroke="currentColor" stroke-width="2" viewBox="0 0 12 12" width="12"><path d="M2 4l4 4 4-4"></path></svg>'
    srch = '<svg aria-hidden="true" fill="none" height="19" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24" width="19"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>'
    moon = '<svg aria-hidden="true" fill="none" height="19" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24" width="19"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.6 8.6 0 1 0 20.5 14.2Z"></path></svg>'
    return ('<!--MC:HEADER--><a class="mc-skip" href="#main">Skip to content</a><div aria-hidden="true" class="mc-bg"></div><div class="mc-bar" role="banner"><div class="mc-in">'
      '<a aria-label="MyChess64 homepage" class="mc-logo" href="%s/"><img alt="MyChess64" id="hl" src="@@HL@@"/></a>'
      '<div aria-label="Main navigation" class="mc-nav" role="navigation"><a class="mc-main-link" href="%s/">Home</a>'
      '<details class="mc-menu mc-tools-menu"><summary class="mc-main-link mc-tools-trigger"><span class="hide-sm">Free Chess </span>Tools%s</summary>'
      '<div class="mc-panel mc-panel-compact mc-tools-dropdown"><div class="mc-tools-panel-intro"><strong>Explore MyChess64 Tools</strong><span>Everything you need to learn, prepare and improve.</span></div>%s%s'
      '<a class="mc-all-tools-link" href="%s/tools/"><span>Explore the complete tools library</span><span class="mc-view-all-arrow">→</span></a></div></details>'
      '<a class="mc-main-link" href="%s/academy/">Academy</a><a class="mc-main-link" href="%s/community/">Community</a>'
      '<a aria-label="Find a chess tool" class="mc-icon-link" href="%s/tools/" title="Find a chess tool">%s</a>'
      '<button aria-label="Toggle dark mode" class="mc-icon-link mc-theme-toggle" title="Toggle dark mode" type="button">%s</button></div></div></div><!--/MC:HEADER-->'
      ) % (SITE, SITE, chev, feat, cols, SITE, SITE, SITE, SITE, srch, moon)

def hero(slug, h1, sub, chip):
    t = T[slug]; c = C[t['cat']]
    return ('<!--MC:HERO--><div class="mc-hero"><div class="mc-in"><div class="mc-top"><ol class="mc-crumbs"><li><a href="%s/">Home</a></li><li><a href="%s/tools/#%s">%s</a></li><li><span aria-current="page">%s</span></li></ol>'
            '<a class="mc-back" href="%s/tools/">← Back to All Tools</a></div><div class="mc-title"><span class="mc-chip">%s</span><div><h1>%s</h1><p>%s</p></div></div></div></div><!--/MC:HERO-->'
            ) % (SITE, SITE, c['anchor'], esc(c['name']), h1, SITE, chip, h1, sub)

def related(slug, descs):
    t = T[slug]; c = C[t['cat']]
    sib = [s for s, x in T.items() if x['cat'] == t['cat']]
    i = sib.index(slug); picks = [sib[(i + k) % len(sib)] for k in range(1, len(sib))][:3]
    cards = ''
    for n, s in enumerate(picks):
        x = T[s]
        cards += ('<a aria-label="%s" class="mc-suggested-card %s" href="%s"><div class="mc-suggested-card-top"><span class="mc-suggested-icon">%s</span><span class="mc-suggested-tag">%s</span></div>'
                  '<h3>%s</h3><p>%s</p><span class="mc-suggested-action">Open tool →</span></a>') % (esc(x['name']), ['tone-blue', 'tone-violet', 'tone-gold'][n], url(s), svg(x['icon']), x['tag'], esc(x['name']), esc(descs[s]))
    return '<!--MC:RELATED--><section aria-labelledby="relh" class="mc-rel"><div class="mc-relhead"><h2 id="relh">More in %s</h2></div><div class="mc-suggested-grid">%s</div></section><!--/MC:RELATED-->' % (esc(c['name'].lower()), cards)

def footer():
    cols = ''
    for c in CATS:
        cols += '<div><h3>%s</h3>%s</div>' % (esc(c[2]), ''.join('<a href="%s">%s</a>' % (url(t[0]), esc(t[2])) for t in TOOLS if t[3] == c[0]))
    return ('<!--MC:FOOTER--><div class="mc-foot" role="contentinfo"><div class="mc-in mc-footgrid"><a class="mc-flogo" href="%s/tools/"><img alt="MyChess64 - Learn. Play. Improve. Anytime, Anywhere." id="flogo" src="@@FL@@"/></a>'
            '<div class="mc-foot-links">%s</div></div><div class="mc-base"><div class="mc-in"><span>© 2026 MyChess64</span><span class="mc-bl"><a href="%s/">Home</a><a href="%s">mychess64.com</a><a href="#main">Back to top</a></span></div></div></div><!--/MC:FOOTER-->') % (SITE, cols, SITE, SITE)

SHELLJS = ("<!--MC:SHELLJS--><script>(()=>{const m=document.querySelector('.mc-menu');if(!m)return;document.addEventListener('click',e=>{if(m.open&&!m.contains(e.target))m.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.open){m.open=false;m.querySelector('summary').focus()}})})();</script>"
  "<script id=\"mychess64-theme-toggle\">(function(){const body=document.body,button=document.querySelector('.mc-theme-toggle');if(!button)return;try{if(localStorage.getItem('mychess64-tools-theme')==='dark')body.classList.add('mc-dark')}catch(e){}"
  "button.addEventListener('click',function(){body.classList.toggle('mc-dark');try{localStorage.setItem('mychess64-tools-theme',body.classList.contains('mc-dark')?'dark':'light')}catch(e){}})})();</script><!--/MC:SHELLJS-->")

V5 = '''<style id="mc-v5">
/* MyChess64 shell v5: five-category menu, footer, dark-mode sheet for tools */
.mc-bar .mc-in{position:relative}
.mc-menu.mc-tools-menu{position:static}
@media(min-width:651px){.mc-tools-dropdown{position:absolute;left:auto;right:22px;top:calc(100% + 6px);width:min(1180px,calc(100vw - 32px));grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(min-width:651px) and (max-width:1099px){.mc-tools-dropdown{grid-template-columns:repeat(3,minmax(0,1fr))}}
.mc-tools-dropdown{max-height:calc(100dvh - 90px);overflow:auto}
.mc-foot-links{grid-template-columns:repeat(5,minmax(0,1fr))}
@media(max-width:900px){.mc-foot-links{grid-template-columns:repeat(2,minmax(0,1fr))}}
body.mc.mc-dark:not(.mc-darktool) main{background:#f4f8fe;color:#0b1f3a;border-radius:20px;margin-top:24px;margin-bottom:24px;padding:26px 24px}
body.mc.mc-dark:not(.mc-darktool) main .note{color:#4a5b76}
</style>'''

# ---------------------------------------------------------------- page assembly
def page(d, hl, fl, icon, shared, headscripts, kit, extra, pre, main, after, scripts, slug=None, title='', desc='', hero_html='', related_html='', cur=None, ld='', body_cls='mc mc-clean'):
    u = abs_url(slug) if slug else SITE + '/tools/'
    h = ('<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>%s</title><meta name="description" content="%s"/>'
         '<link rel="canonical" href="%s"/><meta name="robots" content="index,follow,max-image-preview:large"/><meta property="og:type" content="website"/><meta property="og:site_name" content="MyChess64"/>'
         '<meta property="og:title" content="%s"/><meta property="og:description" content="%s"/><meta property="og:url" content="%s"/><meta name="twitter:card" content="summary"/>'
         '<script type="application/ld+json">%s</script><meta name="theme-color" content="#0b1f3a"/><link rel="icon" href="%s"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&amp;family=Figtree:wght@400;500;600;700&amp;display=swap"/>%s'
         '<!--MC:KITCSS-->%s<!--/MC:KITCSS--><!--MC:SHARED-CSS-->%s<!--/MC:SHARED-CSS--><!--MC:EXTRACSS-->%s<!--/MC:EXTRACSS--></head>\n'
         ) % (esc(title), esc(desc), u, esc(title), esc(desc), u, ld, icon, headscripts, kit, shared, extra)
    b = ('<body class="%s">%s%s<!--MC:MAIN-->%s%s%s<!--/MC:MAIN-->%s%s%s<!--MC:SCRIPTS-->%s<!--/MC:SCRIPTS-->%s</body></html>\n'
         ) % (body_cls, header(cur).replace('@@HL@@', hl), hero_html, pre, main, after, related_html, footer().replace('@@FL@@', fl), '', scripts, SHELLJS)
    return h + b

def ld_tool(slug, name, desc):
    t = T[slug]; c = C[t['cat']]
    cat = {'notation': 'GameApplication', 'position': 'GameApplication', 'academy': 'EducationApplication'}.get(t['cat'], 'UtilitiesApplication')
    return json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "WebApplication", "name": name, "url": abs_url(slug), "description": desc, "applicationCategory": cat, "operatingSystem": "Any",
         "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "MyChess64", "url": SITE + "/"}},
        {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
         {"@type": "ListItem", "position": 2, "name": "Tools", "item": SITE + "/tools/"}, {"@type": "ListItem", "position": 3, "name": name}]}]}, ensure_ascii=False, separators=(',', ':'))

# ---------------------------------------------------------------- legacy parsing
SHARED_IDS = ('mychess64-tools-layout-refinement', 'mychess64-canonical-navigation', 'mychess64-tools-v3', 'mychess64-tools-v31-polish', 'mc-v41', 'mc-v5')
def is_base(txt): return '.mc-skip' in txt and '.mc-util' in txt
def fix_links(s):
    def r(m):
        n = m.group(1)
        if n == 'index': return '/tools/'
        return url(LEGACY_NAMES[n]) if n in LEGACY_NAMES else m.group(0)
    return re.sub(r'(?<![\w/.-])([a-z0-9-]+)\.html(?![\w])', r, s)

def parse(raw):
    head = raw[:raw.index('<body')]; body = raw[raw.index('<body'):]
    d = {}
    d['title'] = html.unescape(re.search(r'<title>(.*?)</title>', head, re.S).group(1))
    m = re.search(r'<meta name="description" content="([^"]*)"|<meta content="([^"]*)" name="description"', head)
    d['desc'] = html.unescape(m.group(1) or m.group(2))
    d['headscripts'] = ''.join(re.findall(r'<script\b[^>]*\bsrc=[^>]*></script>', head))
    kit, extra, seen_base = [], [], False
    for m in re.finditer(r'<style([^>]*)>(.*?)</style>', head, re.S):
        attrs, txt = m.group(1), m.group(2)
        if is_base(txt): seen_base = True; d['base'] = m.group(0); continue
        if any(i in attrs for i in SHARED_IDS): d.setdefault('sharedparts', []).append(m.group(0)); continue
        (extra if seen_base else kit).append(m.group(0))
    d['kit'], d['extra'] = ''.join(kit), ''.join(extra)
    d['icon'] = re.search(r'<link[^>]*rel="icon"[^>]*href="([^"]+)"|<link[^>]*href="([^"]+)"[^>]*rel="icon"', head)
    d['icon'] = d['icon'].group(1) or d['icon'].group(2)
    d['hl'] = re.search(r'<img[^>]*id="hl"[^>]*src="([^"]+)"|<img[^>]*src="([^"]+)"[^>]*id="hl"', body); d['hl'] = d['hl'].group(1) or d['hl'].group(2)
    fl = re.search(r'<img[^>]*id="flogo"[^>]*src="([^"]+)"|<img[^>]*src="([^"]+)"[^>]*id="flogo"', body)
    d['fl'] = (fl.group(1) or fl.group(2)) if fl else None
    main = re.search(r'<main\b.*?</main>', body, re.S); mi = body.index(main.group(0)); pre_region = body[:mi]
    assert '<script' not in main.group(0), 'script inside main'
    pb = re.search(r'<div class="printbrand.*?</div>', pre_region, re.S)
    d['pre'] = pb.group(0) if pb else ''
    h1 = re.search(r'<h1>(.*?)</h1><p>(.*?)</p>', pre_region, re.S); d['h1'], d['sub'] = h1.group(1), h1.group(2)
    chip = re.search(r'<span class="mc-chip">(<svg.*?</svg>)</span>', pre_region, re.S); d['chip'] = chip.group(1) if chip else None
    hb = re.search(r'<div class="mc-hero big".*', pre_region, re.S); d['herobig'] = hb.group(0) if hb else None
    rest = body[mi + len(main.group(0)):]
    cut = min(m.start() for m in (re.search(k, rest) for k in (r'<section[^>]*class="(?:mc-rel|more)"', r'<div[^>]*class="mc-foot"', r'<footer')) if m)
    d['after'] = rest[:cut]; d['main'] = main.group(0)
    sc = []
    for m in re.finditer(r'<script>(.*?)</script>', rest[cut:], re.S):
        if "document.querySelector('.mc-menu')" in m.group(1) and len(m.group(1)) < 400: continue
        sc.append(m.group(0))
    d['scripts'] = ''.join(sc)
    d['cards'] = {}
    for m in re.finditer(r'<a class="mc-card" href="([^"]+)\.html"[^>]*><b>(.*?)</b><span>(.*?)</span></a>', body, re.S):
        d['cards'][LEGACY_NAMES.get(m.group(1), m.group(1))] = html.unescape(m.group(3))
    for m in re.finditer(r'<a href="([^"]+)\.html"><span class="gl"[^>]*>.*?</span><span><b>(.*?)</b><span class="d">(.*?)</span>', body, re.S):
        d['cards'][LEGACY_NAMES.get(m.group(1), m.group(1))] = html.unescape(m.group(3))
    return d

def convert(src, dst):
    legacy = {}
    for s, t in T.items():
        legacy[s] = parse(open(os.path.join(src, t['folder'], 'index.html'), encoding='utf-8').read())
    idx = parse(open(os.path.join(src, 'index.html'), encoding='utf-8').read())
    ref = legacy['chess-diagram-generator']           # the latest page = design reference
    # shared css stack comes from the reference page, in its original order
    parts = {re.search(r'id="([^"]+)"', p).group(1): p for p in ref['sharedparts']}
    shared = ref['base'] + parts['mychess64-tools-layout-refinement'] + parts['mychess64-canonical-navigation'] + parts['mychess64-tools-v3'] + parts['mychess64-tools-v31-polish'] + parts['mc-v41'] + V5
    hl, fl, icon = ref['hl'], ref['fl'], ref['icon']
    descs = {}
    for s in T:
        for d in legacy.values():
            if s in d['cards']: descs.setdefault(s, d['cards'][s])
    for i in (idx,):
        for s, v in i['cards'].items(): descs.setdefault(s, v)
    descs.update(DESC_OVERRIDE)
    missing = [s for s in T if s not in descs]; assert not missing, missing
    out_tools = os.path.join(dst)
    if os.path.exists(out_tools): shutil.rmtree(out_tools)
    os.makedirs(out_tools)
    for s, d in legacy.items():
        t = T[s]
        sub = d['sub']
        desc = d['desc'] if 'MyChess64' in d['desc'] else d['desc'].rstrip('.') + '. Free online tool on MyChess64.'
        chip = d['chip'] or svg(t['icon'], 1.7).replace(' aria-hidden="true"', '')
        main = fix_links(d['main']); after = fix_links(d['after']); scripts = fix_links(d['scripts'])
        name = t['name']
        if 'chess-analysis-board.html' in main + scripts:
            main = main.replace('id="oa" href="chess-analysis-board.html"', 'id="oa" href="#" hidden')
            scripts = scripts.replace("$('#oa').href='chess-analysis-board.html#fen='+q;", "$('#oa').hidden=!ANALYSIS_URL;$('#oa').href=ANALYSIS_URL+'#fen='+q;")
            main = main.replace('id="an" href="#"', 'id="an" href="#" hidden')
            scripts = scripts.replace("$('#an').href='chess-analysis-board.html#fen='+", "$('#an').hidden=!ANALYSIS_URL;$('#an').href=ANALYSIS_URL+'#fen='+")
            scripts = "<script>const ANALYSIS_URL='';/* set to the live Analysis Board URL to show the button */</script>" + scripts
        html_out = page(d, hl, fl, icon, shared, d['headscripts'], d['kit'], d['extra'], d['pre'], main, after, scripts, slug=s,
                        title=d['title'], desc=desc, hero_html=hero(s, d['h1'], sub, chip), related_html=related(s, descs), cur=s,
                        ld=ld_tool(s, name, desc), body_cls='mc mc-clean' + (' mc-darktool' if s == 'chess-diagram-generator' else ''))
        os.makedirs(os.path.join(out_tools, s)); open(os.path.join(out_tools, s, 'index.html'), 'w', encoding='utf-8').write(html_out)
    # library index
    secs = ''
    for c in CATS:
        cards = ''.join('<a class="mc-card" href="%s" data-k="%s"><b>%s</b><span>%s</span></a>' % (url(t[0]), esc((t[2] + ' ' + descs[t[0]]).lower()), esc(t[2]), esc(descs[t[0]])) for t in TOOLS if t[3] == c[0])
        secs += '<section class="mc-sec" id="%s"><div class="mc-sechead"><span class="mc-chip sm">%s</span><div><h2>%s</h2><p>%s</p></div></div><div class="mc-grid">%s</div></section>' % (c[1], svg(c[5], 1.7).replace(' aria-hidden="true"', ''), esc(c[2]), esc(c[4]), cards)
    main = '<main id="main">' + secs + '<p id="none" class="note" hidden>No tool matches that search. Try a shorter word such as &ldquo;PGN&rdquo; or &ldquo;rating&rdquo;.</p></main>'
    herob = re.sub(r'\d+ tools', '%d tools' % len(T), idx['herobig']).replace('href="index.html"', 'href="/tools/"')
    herob = re.sub(r'<div class="mc-hero big".*?(?=$)', lambda m: m.group(0), herob, flags=re.S)
    title = 'Free Chess Tools for Players, Coaches & Organisers | MyChess64'
    desc = 'Free browser-based chess tools: PGN viewer, FEN validator, diagrams, rating calculators, tournament planners and academy tools. Nothing to install.'
    ld = json.dumps({"@context": "https://schema.org", "@type": "CollectionPage", "name": "MyChess64 Chess Tools", "url": SITE + "/tools/", "description": desc,
        "mainEntity": {"@type": "ItemList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": t[2], "url": abs_url(t[0])} for i, t in enumerate(TOOLS)]}}, ensure_ascii=False, separators=(',', ':'))
    html_out = page(idx, hl, fl, icon, shared, '', idx['kit'], idx['extra'], '', main, '', fix_links(idx['scripts']), slug=None, title=title, desc=desc,
                    hero_html='<!--MC:HERO-->' + herob + '<!--/MC:HERO-->', related_html='', cur=None, ld=ld)
    open(os.path.join(out_tools, 'index.html'), 'w', encoding='utf-8').write(html_out)
    if os.path.exists(os.path.join(src, 'merge_kb.js')): shutil.copy(os.path.join(src, 'merge_kb.js'), out_tools)

# ---------------------------------------------------------------- refresh (re-apply shell after editing TOOLS)
def region(t, name): return re.search(r'<!--MC:%s-->(.*?)<!--/MC:%s-->' % (name, name), t, re.S)
def refresh(root):
    ref = open(os.path.join(root, 'chess-diagram-generator', 'index.html'), encoding='utf-8').read()
    hl = re.search(r'id="hl" src="([^"]+)"', ref).group(1); fl = re.search(r'id="flogo" src="([^"]+)"', ref).group(1)
    descs = {}
    for m in re.finditer(r'<a class="mc-card" href="/tools/([^/"]+)/"[^>]*><b>.*?</b><span>(.*?)</span></a>', open(os.path.join(root, 'index.html'), encoding='utf-8').read()): descs[m.group(1)] = html.unescape(m.group(2))
    descs.update(DESC_OVERRIDE)
    for f in glob.glob(os.path.join(root, '*', 'index.html')) + [os.path.join(root, 'index.html')]:
        t = open(f, encoding='utf-8').read(); slug = os.path.basename(os.path.dirname(f)) if f != os.path.join(root, 'index.html') else None
        t = re.sub(r'<!--MC:HEADER-->.*?<!--/MC:HEADER-->', lambda m: header(slug).replace('@@HL@@', hl), t, flags=re.S)
        t = re.sub(r'<!--MC:FOOTER-->.*?<!--/MC:FOOTER-->', lambda m: footer().replace('@@FL@@', fl), t, flags=re.S)
        t = re.sub(r'<!--MC:SHELLJS-->.*?<!--/MC:SHELLJS-->', lambda m: SHELLJS, t, flags=re.S)
        if slug: t = re.sub(r'<!--MC:RELATED-->.*?<!--/MC:RELATED-->', lambda m: related(slug, descs), t, flags=re.S)
        t = re.sub(r'<style id="mc-v5">.*?</style>', lambda m: V5, t, flags=re.S)
        open(f, 'w', encoding='utf-8').write(t)

# ---------------------------------------------------------------- checks
def check(root):
    bad, notes = [], collections.defaultdict(set)
    pages = {s: os.path.join(root, s, 'index.html') for s in T}; pages['(library)'] = os.path.join(root, 'index.html')
    dirs = {d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d))}
    for d in sorted(dirs - set(T)): bad.append('folder not in TOOLS: ' + d)
    for s in T:
        if not os.path.exists(pages[s]): bad.append('missing page: ' + s)
    lib = open(pages['(library)'], encoding='utf-8').read(); anchors = set(re.findall(r'<section class="mc-sec" id="([^"]+)"', lib))
    navs = {}
    for name, f in pages.items():
        if not os.path.exists(f): continue
        t = open(f, encoding='utf-8').read(); tt = re.sub(r'data:[^"\')]+', 'DATA', t)
        slug = None if name == '(library)' else name
        want = abs_url(slug) if slug else SITE + '/tools/'
        can = re.findall(r'rel="canonical" href="([^"]+)"', t); og = re.findall(r'property="og:url" content="([^"]+)"', t)
        if can != [want] or og != [want]: bad.append('%s: canonical/og:url %s %s (want %s)' % (name, can, og, want))
        ids = [i for i in re.findall(r'\sid="([^"]+)"', tt) if '${' not in i]; dup = [i for i, n in collections.Counter(ids).items() if n > 1]
        if dup: bad.append('%s: duplicate ids %s' % (name, dup))
        for j in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
            try: json.loads(j)
            except Exception as e: bad.append('%s: bad JSON-LD %s' % (name, e))
        cur = re.findall(r'aria-current="page" class="on mc-tool-menu-link" href="([^"]+)"', t)
        if slug and cur != [url(slug)]: bad.append('%s: active menu item %s' % (name, cur))
        hdr = region(tt, 'HEADER'); ftr = region(tt, 'FOOTER')
        if not hdr or not ftr: bad.append(name + ': header/footer markers missing')
        else: navs[name] = (re.sub(r' aria-current="page" class="on mc-tool-menu-link"', ' class="mc-tool-menu-link"', hdr.group(1)), ftr.group(1))
        if slug:
            crumb = re.search(r'<a href="%s/tools/#([^"]+)"' % re.escape(SITE), region(tt, 'HERO').group(1))
            if not crumb or crumb.group(1) not in anchors: bad.append('%s: breadcrumb anchor %s not in library' % (name, crumb and crumb.group(1)))
            rel = re.findall(r'class="mc-suggested-card [^"]*" href="([^"]+)"', t)
            if len(rel) != 3 or slug in [r.strip('/').split('/')[-1] for r in rel]: bad.append('%s: related cards %s' % (name, rel))
        if t.count('<main') != 1 or 'id="main"' not in t: bad.append(name + ': main landmark')
        for h in re.findall(r'(?:href|action)="([^"]*)"', tt):
            if h.startswith('#'):
                if h != '#' and ('id="%s"' % h[1:]) not in t: bad.append('%s: anchor %s has no target' % (name, h))
            elif h.startswith('/tools/'):
                p, _, frag = h.partition('#'); s2 = p.strip('/').split('/')[1] if p.strip('/').count('/') else ''
                if p == '/tools/': 
                    if frag and frag not in anchors: bad.append('%s: %s' % (name, h))
                elif s2 not in T or not p.endswith('/') or p.count('/') != 3: bad.append('%s: broken internal link %s' % (name, h))
            elif h.startswith(SITE + '/tools/'):
                p, _, frag = h[len(SITE):].partition('#')
                if p != '/tools/' and p.strip('/').split('/')[-1] not in T: bad.append('%s: broken absolute link %s' % (name, h))
                if frag and frag not in anchors: bad.append('%s: %s' % (name, h))
            elif h.startswith(SITE): notes['outside ZIP (not verifiable here)'].add(h)
            elif h.startswith('http'): notes['external'].add(h.split('/')[2])
            elif h.startswith('data:') or h.startswith('DATA') or h.startswith('${'): pass
            elif h == '': pass
            else: bad.append('%s: relative/unknown link %r' % (name, h))
        for m in re.findall(r"[\w/-]+\.html[#'\"?]?", re.sub(r'<style.*?</style>', '', tt, flags=re.S)):
            bad.append('%s: leftover .html reference %s' % (name, m))
        # JS syntax
        for k, s in enumerate(re.findall(r'<script>(.*?)</script>', t, re.S)):
            open('/tmp/_c.js', 'w', encoding='utf-8').write(s)
            r = subprocess.run(['node', '--check', '/tmp/_c.js'], capture_output=True, text=True)
            if r.returncode: bad.append('%s: JS syntax error in script %d: %s' % (name, k, r.stderr.strip().splitlines()[-1][:120]))
    hs = {n for n, _ in navs.values()}; fs = {f for _, f in navs.values()}
    if len(hs) != 1: bad.append('header/menu differs between pages (%d variants)' % len(hs))
    if len(fs) != 1: bad.append('footer differs between pages (%d variants)' % len(fs))
    print('pages checked:', len(navs)); print('problems:', len(bad))
    for b in bad: print('  ✗', b)
    for k, v in notes.items(): print('%s:' % k); [print('   ', x) for x in sorted(v)]
    return bad

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'convert': convert(sys.argv[2], sys.argv[3])
    elif cmd == 'refresh': refresh(sys.argv[2])
    elif cmd == 'check': sys.exit(1 if check(sys.argv[2]) else 0)
