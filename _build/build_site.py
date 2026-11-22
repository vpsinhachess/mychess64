#!/usr/bin/env python3
"""MyChess64 site builder (tools/ + master-tools/).
  python3 build_site.py convert-master <master_tools_dir> <site_dir>   one-time: master-tools pages -> shared shell
  python3 build_site.py refresh <site_dir>                            re-apply menu / footer / related cards / CSS everywhere
  python3 build_site.py check <site_dir>                              verify links, canonicals, menus, JSON-LD, JS syntax
To add a tool: add a row to TOOLS (and a description in tools-data.json), create <base>/<slug>/index.html, run `refresh`.
To move a tool to another section change its base ('tools' <-> 'master-tools') and move its folder."""
import re, sys, os, json, html, shutil, subprocess, glob, collections
SITE = 'https://www.mychess64.com'
esc = lambda s: html.escape(s, quote=True)
HERE = os.path.dirname(os.path.abspath(__file__))

# slug, legacy folder, name, category, card tag, icon, base
_T = [
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
_M = [
 ('analysis-board','analysis-board','Analysis Board','m-analyse','ANALYSE','chart'),
 ('training-board','training-board','Training Board','m-analyse','TRAIN','grid'),
 ('opening-repertoire','opening-repertiore','Opening Repertoire Lab','m-analyse','STUDY','doc'),
 ('custom-position','custom-position','Play Chess Online','m-analyse','PLAY','play'),
 ('chess-lens','chess-lens','Chess Scanner','m-edit','SCAN','image'),
 ('pgn-editor','pgn-editor','PGN Editor','m-edit','EDIT','sliders'),
 ('pgn-merger','pgn-merger','PGN Merger','m-edit','MERGE','swap'),
 ('student-tracker','student-tracker','Student Progress Tracker','m-edit','TRACK','trend'),
 ('player-report-card','player-report-card','Player Report Card','m-edit','REPORT','report'),
]
TOOLS = [r + ('tools',) for r in _T] + [r + ('master-tools',) for r in _M]
# id, anchor, name, menu subtitle, section subtitle, icon, section
CATS = [
 ('notation','cat-notation','Games & notation','Build, review and convert games','Read, clean and convert PGN and FEN.','doc','tools'),
 ('position','cat-position','Positions & media','Create and share chess positions','Turn positions and games into images, links and animations.','grid','tools'),
 ('ratings','cat-ratings','Ratings','Explore player ratings and progress','Look up, calculate and track chess ratings.','chart','tools'),
 ('tournament','cat-tournament','Tournaments','Prepare and manage events','Plan rounds, time controls, prize funds and score sheets.','trophy','tools'),
 ('academy','cat-academy','Academy & coaching','Run classes, batches and reports','Schedules, batch finances, progress reports and certificates.','cap','tools'),
 ('m-analyse','cat-m-analyse','Analyse, train & play','Study positions, openings and games','Analyse positions with an engine, train, study openings and play live.','chart','master-tools'),
 ('m-edit','cat-m-edit','Edit, scan & coach','PGN files, diagrams and student progress','Edit and merge PGN, scan diagrams and follow student progress.','doc','master-tools'),
]
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
T = {t[0]: dict(slug=t[0], folder=t[1], name=t[2], cat=t[3], tag=t[4], icon=t[5], base=t[6]) for t in TOOLS}
C = {c[0]: dict(id=c[0], anchor=c[1], name=c[2], sub=c[3], sec=c[4], icon=c[5], section=c[6]) for c in CATS}
SECTIONS = {'tools': 'Free Chess Tools', 'master-tools': 'Master Tools'}
url = lambda slug: '/%s/%s/' % (T[slug]['base'], slug)
abs_url = lambda slug: SITE + url(slug)
lib_url = lambda base: '/%s/' % base

def load_descs(root=None):
    p = os.path.join(root or HERE, 'tools-data.json')
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}

# ---------------------------------------------------------------- shell parts
CHEV = '<svg aria-hidden="true" fill="none" height="12" stroke="currentColor" stroke-width="2" viewBox="0 0 12 12" width="12"><path d="M2 4l4 4 4-4"></path></svg>'
SRCH = '<svg aria-hidden="true" fill="none" height="19" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24" width="19"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>'
MOON = '<svg aria-hidden="true" fill="none" height="19" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24" width="19"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.6 8.6 0 1 0 20.5 14.2Z"></path></svg>'

def menu_cols(section, cur):
    cols = ''
    for c in CATS:
        if c[6] != section: continue
        links = ''
        for t in TOOLS:
            if t[3] != c[0]: continue
            on = ' aria-current="page" class="on mc-tool-menu-link"' if t[0] == cur else ' class="mc-tool-menu-link"'
            links += '<a%s href="%s"><span class="mc-tool-link-mark">✦</span><span class="mc-tool-link-text">%s</span><span class="mc-tool-link-arrow">↗</span></a>' % (on, url(t[0]), esc(t[2]))
        cols += '<div><h3><span class="mc-category-icon">%s</span><span class="mc-category-heading-text"><span class="mc-category-title">%s</span><small class="mc-category-subtitle">%s</small></span></h3>%s</div>' % (svg(c[5]), esc(c[2]), esc(c[3]), links)
    return cols

def header_inner(cur=None):
    feat = '<a class="mc-feat" href="%s"><span class="mc-feat-ic">%s</span><span class="mc-feat-tx"><span class="mc-feat-tag">FEATURED</span><b>%s</b><span>%s</span></span><span class="mc-feat-go" aria-hidden="true">&rarr;</span></a>' % (FEATURED[0], svg('clock'), esc(FEATURED[1]), esc(FEATURED[2]))
    return ('<div class="mc-bar" role="banner"><div class="mc-in">'
      '<a aria-label="MyChess64 homepage" class="mc-logo" href="%s/"><img alt="MyChess64" id="hl" src="@@HL@@"/></a>'
      '<div aria-label="Main navigation" class="mc-nav" role="navigation"><a class="mc-main-link" href="%s/">Home</a>'
      '<details class="mc-menu mc-tools-menu"><summary class="mc-main-link mc-tools-trigger"><span class="hide-sm">Free Chess </span>Tools%s</summary>'
      '<div class="mc-panel mc-panel-compact mc-tools-dropdown"><div class="mc-tools-panel-intro"><strong>Explore MyChess64 Tools</strong><span>Everything you need to learn, prepare and improve.</span></div>%s%s'
      '<a class="mc-all-tools-link" href="%s/tools/"><span>Explore the complete tools library</span><span class="mc-view-all-arrow">→</span></a></div></details>'
      '<details class="mc-menu mc-tools-menu mc-master-menu"><summary class="mc-main-link mc-tools-trigger">Master Tools%s</summary>'
      '<div class="mc-panel mc-panel-compact mc-tools-dropdown mc-master-dropdown"><div class="mc-tools-panel-intro"><strong>MyChess64 Master Tools</strong><span>Advanced tools for analysis, training and coaching.</span></div>%s'
      '<a class="mc-all-tools-link" href="%s/master-tools/"><span>Explore all master tools</span><span class="mc-view-all-arrow">→</span></a></div></details>'
      '<a class="mc-main-link" href="%s/academy/">Academy</a><a class="mc-main-link" href="%s/community/">Community</a>'
      '<a aria-label="Find a chess tool" class="mc-icon-link" href="%s/tools/" title="Find a chess tool">%s</a>'
      '<button aria-label="Toggle dark mode" class="mc-icon-link mc-theme-toggle" title="Toggle dark mode" type="button">%s</button></div></div></div>'
      ) % (SITE, SITE, CHEV, feat, menu_cols('tools', cur), SITE, CHEV, menu_cols('master-tools', cur), SITE, SITE, SITE, SITE, SRCH, MOON)

def header(cur=None):
    return '<!--MC:HEADER--><a class="mc-skip" href="#main">Skip to content</a><div aria-hidden="true" class="mc-bg"></div>' + header_inner(cur) + '<!--/MC:HEADER-->'

def hero(slug, h1, sub, chip):
    t = T[slug]; c = C[t['cat']]; b = t['base']
    return ('<!--MC:HERO--><div class="mc-hero"><div class="mc-in"><div class="mc-top"><ol class="mc-crumbs"><li><a href="%s/">Home</a></li><li><a href="%s/%s/#%s">%s</a></li><li><span aria-current="page">%s</span></li></ol>'
            '<a class="mc-back" href="%s/%s/">← Back to All %s</a></div><div class="mc-title"><span class="mc-chip">%s</span><div><h1>%s</h1><p>%s</p></div></div></div></div><!--/MC:HERO-->'
            ) % (SITE, SITE, b, c['anchor'], esc(c['name']), h1, SITE, b, 'Tools' if b == 'tools' else 'Master Tools', chip, h1, sub)

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

def footer_inner(top='#main'):
    out = ''
    for sec, label in SECTIONS.items():
        cols = ''
        for c in CATS:
            if c[6] != sec: continue
            cols += '<div><h3>%s</h3>%s</div>' % (esc(c[2]), ''.join('<a href="%s">%s</a>' % (url(t[0]), esc(t[2])) for t in TOOLS if t[3] == c[0]))
        out += '<p class="mc-foot-label">%s</p><div class="mc-foot-links%s">%s</div>' % (label, ' mc-foot-master' if sec != 'tools' else '', cols)
    return ('<div class="mc-foot" role="contentinfo"><div class="mc-in mc-footgrid"><a class="mc-flogo" href="%s/tools/"><img alt="MyChess64 - Learn. Play. Improve. Anytime, Anywhere." id="flogo" src="@@FL@@"/></a>'
            '<div class="mc-foot-stack">%s</div></div><div class="mc-base"><div class="mc-in"><span>© 2026 MyChess64</span><span class="mc-bl"><a href="%s/">Home</a><a href="%s">mychess64.com</a><a href="%s">Back to top</a></span></div></div></div>') % (SITE, out, SITE, SITE, top)
footer = lambda: '<!--MC:FOOTER-->' + footer_inner() + '<!--/MC:FOOTER-->'

SHELLJS = ("<!--MC:SHELLJS--><script>(()=>{const ms=[...document.querySelectorAll('.mc-menu')];if(!ms.length)return;ms.forEach(m=>m.addEventListener('toggle',()=>{if(m.open)ms.forEach(o=>{if(o!==m)o.open=false})}));"
  "document.addEventListener('click',e=>{ms.forEach(m=>{if(m.open&&!m.contains(e.target))m.open=false})});document.addEventListener('keydown',e=>{if(e.key==='Escape')ms.forEach(m=>{if(m.open){m.open=false;m.querySelector('summary').focus()}})})})();</script>"
  "<script id=\"mychess64-theme-toggle\">(function(){const body=document.body,button=document.querySelector('.mc-theme-toggle');if(!button)return;try{if(localStorage.getItem('mychess64-tools-theme')==='dark')body.classList.add('mc-dark')}catch(e){}"
  "button.addEventListener('click',function(){body.classList.toggle('mc-dark');try{localStorage.setItem('mychess64-tools-theme',body.classList.contains('mc-dark')?'dark':'light')}catch(e){}})})();</script><!--/MC:SHELLJS-->")

V5 = '''<style id="mc-v5">
/* MyChess64 shell v6: two menus (Free Chess Tools + Master Tools), stacked footer, dark-mode sheet */
.mc-bar .mc-in{position:relative}
.mc-menu.mc-tools-menu{position:static}
@media(min-width:651px){.mc-tools-dropdown{position:absolute;left:auto;right:22px;top:calc(100% + 6px);width:min(1180px,calc(100vw - 32px));grid-template-columns:repeat(5,minmax(0,1fr))}
.mc-tools-dropdown.mc-master-dropdown{width:min(720px,calc(100vw - 32px));grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:651px) and (max-width:1099px){.mc-tools-dropdown{grid-template-columns:repeat(3,minmax(0,1fr))}.mc-tools-dropdown.mc-master-dropdown{grid-template-columns:repeat(2,minmax(0,1fr))}}
.mc-tools-dropdown{max-height:calc(100dvh - 90px);overflow:auto}
@media(max-width:900px){.mc-nav{gap:2px}.mc-nav .mc-main-link{padding-left:9px;padding-right:9px}}
@media(max-width:720px){.mc-bar .mc-in{flex-wrap:wrap;gap:6px 10px}.mc-nav{flex-wrap:wrap;justify-content:flex-end;margin-left:auto}}
.mc-foot-stack{display:grid;gap:6px}
.mc-foot-label{margin:0;font:800 .72rem var(--hd);letter-spacing:.1em;text-transform:uppercase;color:var(--blue)}
.mc-foot-links{grid-template-columns:repeat(5,minmax(0,1fr))}
.mc-foot-links+.mc-foot-label{margin-top:14px}
.mc-foot-links.mc-foot-master{grid-template-columns:repeat(5,minmax(0,1fr))}
@media(max-width:900px){.mc-foot-links,.mc-foot-links.mc-foot-master{grid-template-columns:repeat(2,minmax(0,1fr))}}
body.mc.mc-dark .mc-foot-label{color:#7db8ff}
body.mc.mc-dark:not(.mc-darktool) main{background:#f4f8fe;color:#0b1f3a;border-radius:20px;margin-top:24px;margin-bottom:24px;padding:26px 24px}
body.mc.mc-dark:not(.mc-darktool) main .note{color:#4a5b76}
</style>'''

# ---------------------------------------------------------------- pages
def ld_tool(slug, name, desc):
    t = T[slug]; c = C[t['cat']]; b = t['base']
    cat = {'notation': 'GameApplication', 'position': 'GameApplication', 'academy': 'EducationApplication', 'm-analyse': 'GameApplication'}.get(t['cat'], 'UtilitiesApplication')
    return json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "WebApplication", "name": name, "url": abs_url(slug), "description": desc, "applicationCategory": cat, "operatingSystem": "Any",
         "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "MyChess64", "url": SITE + "/"}},
        {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
         {"@type": "ListItem", "position": 2, "name": SECTIONS[b], "item": SITE + '/%s/' % b}, {"@type": "ListItem", "position": 3, "name": name}]}]}, ensure_ascii=False, separators=(',', ':'))

FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&amp;family=Figtree:wght@400;500;600;700&amp;display=swap'
def seo_block(slug, title, desc, fonts=False):
    u = abs_url(slug)
    return ('<!--MC:SEO--><title>%s</title><meta name="description" content="%s"/><link rel="canonical" href="%s"/><meta name="robots" content="index,follow,max-image-preview:large"/>'
            '<meta property="og:type" content="website"/><meta property="og:site_name" content="MyChess64"/><meta property="og:title" content="%s"/><meta property="og:description" content="%s"/><meta property="og:url" content="%s"/>'
            '<meta name="twitter:card" content="summary"/><script type="application/ld+json">%s</script>%s<!--/MC:SEO-->') % (
            esc(title), esc(desc), u, esc(title), esc(desc), u, ld_tool(slug, T[slug]['name'], desc),
            ('<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link rel="stylesheet" href="%s"/>' % FONTS) if fonts else '')

def inject_head(raw, slug, title, desc, fonts=False):
    raw = re.sub(r'<!--MC:SEO-->.*?<!--/MC:SEO-->', '', raw, flags=re.S)
    head_end = raw.index('</head>')
    head = raw[:head_end]
    head = re.sub(r'<title>.*?</title>', '', head, flags=re.S)
    head = re.sub(r'<meta[^>]*name="description"[^>]*>', '', head)
    m = re.search(r'<meta charset[^>]*>', head, re.I)
    head = head[:m.end()] + seo_block(slug, title, desc, fonts) + head[m.end():]
    return head + raw[head_end:]

def shadow_css(shared):
    css = ''.join(re.findall(r'<style[^>]*>(.*?)</style>', shared, re.S))
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = css.replace('body.mc.mc-dark', '.mc-sh.mc-dark').replace('body.mc', '.mc-sh').replace(':root', ':host')
    css += '.mc-sh{min-height:0!important;display:block!important;background:transparent!important;font:16px/1.55 Figtree,system-ui,sans-serif;color:var(--ink);position:relative}.mc-sh .mc-tools-dropdown{z-index:2147483001}'
    return re.sub(r'\s+', ' ', css)

def chrome_script(cur, shared, hl, fl):
    hdr = header_inner(cur).replace('@@HL@@', hl)
    ftr = footer_inner('#top').replace('@@FL@@', fl)
    js = r'''(function(){var CSS=@@CSS@@,HDR=@@HDR@@,FTR=@@FTR@@,KEY='mychess64-tools-theme';
function dark(){try{return localStorage.getItem(KEY)==='dark'}catch(e){return false}}
function mount(h,html){var r=h.attachShadow({mode:'open'});r.innerHTML='<style>'+CSS+'</style><div class="mc-sh mc mc-clean'+(dark()?' mc-dark':'')+'">'+html+'</div>';return r}
function inside(e,m){return e.composedPath().indexOf(m)>-1}
function menus(r){var ms=[].slice.call(r.querySelectorAll('.mc-menu'));ms.forEach(function(m){m.addEventListener('toggle',function(){if(m.open)ms.forEach(function(o){if(o!==m)o.open=false})})});
document.addEventListener('click',function(e){ms.forEach(function(m){if(m.open&&!inside(e,m))m.open=false})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')ms.forEach(function(m){if(m.open){m.open=false;m.querySelector('summary').focus()}})})}
customElements.define('mc-site-header',class extends HTMLElement{connectedCallback(){var r=mount(this,HDR);menus(r);var b=r.querySelector('.mc-theme-toggle');
if(b)b.addEventListener('click',function(){var d=!dark();try{localStorage.setItem(KEY,d?'dark':'light')}catch(e){}
document.querySelectorAll('mc-site-header,mc-site-footer').forEach(function(h){var c=h.shadowRoot&&h.shadowRoot.querySelector('.mc-sh');if(c)c.classList.toggle('mc-dark',d)})})}});
customElements.define('mc-site-footer',class extends HTMLElement{connectedCallback(){mount(this,FTR)}});
var s=document.createElement('style');s.textContent='mc-site-header{display:block;position:sticky;top:0;z-index:2147483000}mc-site-footer{display:block}';document.head.appendChild(s)})();'''
    js = js.replace('@@CSS@@', json.dumps(shadow_css(shared))).replace('@@HDR@@', json.dumps(hdr)).replace('@@FTR@@', json.dumps(ftr))
    return '<script>' + js.replace('</', '<\\/') + '</script>'

def apply_chrome(raw, cur, shared, hl, fl):
    raw = re.sub(r'<!--MC:CHROME-->.*?<!--/MC:CHROME-->', '', raw, flags=re.S)
    m = re.search(r'<body[^>]*>', raw)
    raw = raw[:m.end()] + '<!--MC:CHROME--><mc-site-header id="top"></mc-site-header><!--/MC:CHROME-->' + raw[m.end():]
    i = raw.rindex('</body>')
    return raw[:i] + '<!--MC:CHROME--><mc-site-footer></mc-site-footer>' + chrome_script(cur, shared, hl, fl) + '<!--/MC:CHROME-->' + raw[i:]

# ---------------------------------------------------------------- master-tools conversion
SHELL_PAGES = {'pgn-editor', 'pgn-merger', 'analysis-board', 'player-report-card'}
CHROME_PAGES = {'chess-lens', 'student-tracker', 'opening-repertoire'}
MASTER_DESC = {
 'analysis-board': 'Analyse positions and games with Stockfish.',
 'training-board': 'A full-screen analysis and training board with PGN and puzzle libraries.',
 'opening-repertoire': 'Study, drill and play openings with a built-in repertoire and engine, then export PDF guides.',
 'custom-position': 'Play live chess with a friend directly in your browser.',
 'chess-lens': 'Read chess diagrams from an image or PDF and turn them into legal FEN positions.',
 'pgn-editor': 'Edit moves, comments, variations and game details.',
 'pgn-merger': 'Merge PGN files, check every move against the rules of chess, and save a clean .pgn.',
 'student-tracker': 'Check ratings, activity, puzzles and the latest 20 games of any Lichess or Chess.com student.',
 'player-report-card': 'Turn many games into a graded, printable report for a student.'}
TITLES = {
 'analysis-board': 'Chess Analysis Board with Stockfish | MyChess64', 'training-board': 'Analysis & Training Board | MyChess64',
 'opening-repertoire': 'Opening Repertoire Lab: Study, Drill & Play | MyChess64', 'custom-position': 'Play Chess Online with a Friend | MyChess64',
 'chess-lens': 'Chess Scanner: Image or PDF to FEN | MyChess64', 'pgn-editor': 'PGN Editor | MyChess64', 'pgn-merger': 'PGN Merger | MyChess64',
 'student-tracker': 'Student Progress Tracker | MyChess64', 'player-report-card': 'Player Report Card | MyChess64'}
LEGACY = {t['folder']: s for s, t in T.items()}
LEGACY.update({s: s for s in T}); LEGACY.update({'performance-rating-calulator': 'performance-rating-calculator', 'position-share-tool': 'chess-position-share', 'chess-analysis-board': 'analysis-board'})
def fix_links(s, idx):
    def r(m):
        n = m.group(1)
        if n == 'index': return idx
        return url(LEGACY[n]) if n in LEGACY else m.group(0)
    return re.sub(r'(?<![\w/.-])([a-z0-9-]+)\.html(?![\w])', r, s)

def parse_shell(raw):
    head, body = raw[:raw.index('<body')], raw[raw.index('<body'):]
    d = {}
    d['headscripts'] = ''.join(re.findall(r'<script\b[^>]*\bsrc=[^>]*></script>', head))
    styles = [m.group(0) for m in re.finditer(r'<style[^>]*>.*?</style>', head, re.S)]
    d['kit'], d['extra'] = styles[0], ''.join(styles[1:])
    d['hl'] = re.search(r'<img[^>]*id="hl"[^>]*src="([^"]+)"|<img[^>]*src="([^"]+)"[^>]*id="hl"', body); d['hl'] = d['hl'].group(1) or d['hl'].group(2)
    main = re.search(r'<main\b.*?</main>', body, re.S); mi = body.index(main.group(0)); pre_region = body[:mi]
    assert '<script' not in main.group(0)
    pb = re.search(r'<div class="printbrand.*?</div>', pre_region, re.S); d['pre'] = pb.group(0) if pb else ''
    h1 = re.search(r'<h1>(.*?)</h1><p>(.*?)</p>', pre_region, re.S); d['h1'], d['sub'] = re.sub(r'^[^\w&]+', '', h1.group(1)).strip(), h1.group(2)
    rest = body[mi + len(main.group(0)):]
    cut = min(m.start() for m in (re.search(k, rest) for k in (r'<section[^>]*class="(?:mc-rel|more)"', r'<div[^>]*class="mc-foot"', r'<footer')) if m)
    d['after'] = rest[:cut]; d['main'] = re.sub(r'<main(?![^>]*\bid=)', '<main id="main"', main.group(0), count=1)
    d['scripts'] = ''.join(m.group(0) for m in re.finditer(r'<script>(.*?)</script>', rest[cut:], re.S))
    return d

def page(shared, hl, fl, icon, slug, d, title, desc, descs, body_cls='mc mc-clean'):
    u = abs_url(slug)
    h = ('<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>' + seo_block(slug, title, desc) +
         '<meta name="theme-color" content="#0b1f3a"/><link rel="icon" href="%s"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>'
         '<link rel="stylesheet" href="%s"/>%s<!--MC:KITCSS-->%s<!--/MC:KITCSS--><!--MC:SHARED-CSS-->%s<!--/MC:SHARED-CSS--><!--MC:EXTRACSS-->%s<!--/MC:EXTRACSS--></head>\n') % (icon, FONTS, d['headscripts'], d['kit'], shared, d['extra'])
    chip = svg(T[slug]['icon'], 1.7).replace(' aria-hidden="true"', '')
    b = ('<body class="%s">%s%s<!--MC:MAIN-->%s%s%s<!--/MC:MAIN-->%s%s<!--MC:SCRIPTS-->%s<!--/MC:SCRIPTS-->%s</body></html>\n') % (
        body_cls, header(slug).replace('@@HL@@', hl), hero(slug, d['h1'], d['sub'], chip), d['pre'], d['main'], d['after'], related(slug, descs), footer().replace('@@FL@@', fl), d['scripts'], SHELLJS)
    return h + b

def index_main(section, descs):
    secs = ''
    for c in CATS:
        if c[6] != section: continue
        cards = ''.join('<a class="mc-card" href="%s" data-k="%s"><b>%s</b><span>%s</span></a>' % (url(t[0]), esc((t[2] + ' ' + descs[t[0]]).lower()), esc(t[2]), esc(descs[t[0]])) for t in TOOLS if t[3] == c[0])
        secs += '<section class="mc-sec" id="%s"><div class="mc-sechead"><span class="mc-chip sm">%s</span><div><h2>%s</h2><p>%s</p></div></div><div class="mc-grid">%s</div></section>' % (c[1], svg(c[5], 1.7).replace(' aria-hidden="true"', ''), esc(c[2]), esc(c[4]), cards)
    return '<main id="main">' + secs + '<p id="none" class="note" hidden>No tool matches that search. Try a shorter word such as &ldquo;PGN&rdquo; or &ldquo;rating&rdquo;.</p></main>'

def convert_master(src, site):
    descs = load_descs(); tools_dir = os.path.join(site, 'tools'); mdir = os.path.join(site, 'master-tools')
    assert os.path.isdir(tools_dir), 'put the v5 tools folder in <site>/tools first'
    ref = open(os.path.join(tools_dir, 'chess-diagram-generator', 'index.html'), encoding='utf-8').read()
    shared = re.search(r'<!--MC:SHARED-CSS-->(.*?)<!--/MC:SHARED-CSS-->', ref, re.S).group(1)
    hl = re.search(r'id="hl" src="([^"]+)"', ref).group(1); fl = re.search(r'id="flogo" src="([^"]+)"', ref).group(1); icon = re.search(r'<link rel="icon" href="([^"]+)"', ref).group(1)
    for s in MASTER_DESC: descs[s] = MASTER_DESC[s]
    if os.path.exists(mdir): shutil.rmtree(mdir)
    os.makedirs(mdir)
    for s, t in T.items():
        if t['base'] != 'master-tools': continue
        sdir = os.path.join(src, t['folder']); out = os.path.join(mdir, s)
        shutil.copytree(sdir, out)                       # keeps PDFs, python, json etc. next to the page
        f = os.path.join(out, 'index.html'); raw = open(f, encoding='utf-8').read()
        title, desc = TITLES[s], MASTER_DESC[s]
        if s in SHELL_PAGES:
            d = parse_shell(raw)
            for k in ('main', 'after', 'scripts'): d[k] = fix_links(d[k], '/master-tools/')
            d['scripts'] = re.sub(r'document\.querySelector\("nav"\)\.innerHTML=.*?\.join\(""\);', '', d['scripts'], flags=re.S)   # old per-page nav (relative .html links)
            raw = page(shared, hl, fl, icon, s, d, title, desc, descs)
        elif s in CHROME_PAGES:
            raw = inject_head(raw, s, title, desc, fonts=True)
            raw = apply_chrome(raw, s, shared, hl, fl)
        else:
            raw = inject_head(raw, s, title, desc)
        open(f, 'w', encoding='utf-8').write(raw)
    if os.path.exists(os.path.join(mdir, 'opening-repertoire', 'index.html')): pass
    json.dump(descs, open(os.path.join(HERE, 'tools-data.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    # master-tools library page, cloned from the tools library hero
    tl = open(os.path.join(tools_dir, 'index.html'), encoding='utf-8').read()
    hero_big = re.search(r'<!--MC:HERO-->(.*?)<!--/MC:HERO-->', tl, re.S).group(1)
    hero_big = re.sub(r'<h1>.*?</h1>', '<h1>Master tools for analysis, training and coaching</h1>', hero_big, count=1, flags=re.S)
    hero_big = re.sub(r'<p>.*?</p>', '<p>%d advanced tools: engine analysis, openings, PGN editing, diagram scanning and student progress. Nothing to install.</p>' % sum(1 for t in TOOLS if t[6] == 'master-tools'), hero_big, count=1, flags=re.S)
    pre_css = re.search(r'<!--MC:KITCSS-->(.*?)<!--/MC:KITCSS-->', tl, re.S).group(1)
    script = ''.join(re.findall(r'<script>const q=document.getElementById.*?</script>', tl, re.S))
    desc = 'Advanced chess tools from MyChess64: analysis board, openings lab, PGN editor and merger, diagram scanner and student progress tracking.'
    ld = json.dumps({"@context": "https://schema.org", "@type": "CollectionPage", "name": "MyChess64 Master Tools", "url": SITE + "/master-tools/", "description": desc,
        "mainEntity": {"@type": "ItemList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": t[2], "url": SITE + '/master-tools/%s/' % t[0]} for i, t in enumerate([t for t in TOOLS if t[6] == 'master-tools'])]}}, ensure_ascii=False, separators=(',', ':'))
    u = SITE + '/master-tools/'; title = 'Master Tools: Analysis, Openings, PGN & Coaching | MyChess64'
    idx = ('<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>%s</title><meta name="description" content="%s"/><link rel="canonical" href="%s"/>'
           '<meta name="robots" content="index,follow,max-image-preview:large"/><meta property="og:type" content="website"/><meta property="og:site_name" content="MyChess64"/><meta property="og:title" content="%s"/><meta property="og:description" content="%s"/><meta property="og:url" content="%s"/><meta name="twitter:card" content="summary"/>'
           '<script type="application/ld+json">%s</script><meta name="theme-color" content="#0b1f3a"/><link rel="icon" href="%s"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link rel="stylesheet" href="%s"/>'
           '<!--MC:KITCSS-->%s<!--/MC:KITCSS--><!--MC:SHARED-CSS-->%s<!--/MC:SHARED-CSS--><!--MC:EXTRACSS--><!--/MC:EXTRACSS--></head>\n<body class="mc mc-clean">%s<!--MC:HERO-->%s<!--/MC:HERO--><!--MC:MAIN-->%s<!--/MC:MAIN-->%s<!--MC:SCRIPTS-->%s<!--/MC:SCRIPTS-->%s</body></html>\n') % (
           esc(title), esc(desc), u, esc(title), esc(desc), u, ld, icon, FONTS, pre_css, shared, header(None).replace('@@HL@@', hl), hero_big, index_main('master-tools', descs), footer().replace('@@FL@@', fl), script, SHELLJS)
    open(os.path.join(mdir, 'index.html'), 'w', encoding='utf-8').write(idx)
    # the two "Open in Analysis Board" buttons in /tools/ can now point somewhere real
    for s in ('image-to-fen', 'chess-position-share'):
        f = os.path.join(tools_dir, s, 'index.html'); t = open(f, encoding='utf-8').read()
        open(f, 'w', encoding='utf-8').write(t.replace("const ANALYSIS_URL='';/* set to the live Analysis Board URL to show the button */", "const ANALYSIS_URL='/master-tools/analysis-board/';"))

# ---------------------------------------------------------------- refresh
def refresh(site):
    descs = load_descs(os.path.join(site, '_build') if os.path.exists(os.path.join(site, '_build', 'tools-data.json')) else None)
    ref = open(os.path.join(site, 'tools', 'chess-diagram-generator', 'index.html'), encoding='utf-8').read()
    hl = re.search(r'id="hl" src="([^"]+)"', ref).group(1); fl = re.search(r'id="flogo" src="([^"]+)"', ref).group(1)
    files = glob.glob(os.path.join(site, '*', '*', 'index.html')) + [os.path.join(site, b, 'index.html') for b in ('tools', 'master-tools')]
    for f in files:
        t = open(f, encoding='utf-8').read(); rel = os.path.relpath(f, site).split(os.sep)
        slug = rel[1] if len(rel) == 3 else None
        if slug and slug not in T: continue
        t = re.sub(r'<style id="mc-v5">.*?</style>', lambda m: V5, t, flags=re.S)
        if '<!--MC:HEADER-->' in t:
            t = re.sub(r'<!--MC:HEADER-->.*?<!--/MC:HEADER-->', lambda m: header(slug).replace('@@HL@@', hl), t, flags=re.S)
            t = re.sub(r'<!--MC:FOOTER-->.*?<!--/MC:FOOTER-->', lambda m: footer().replace('@@FL@@', fl), t, flags=re.S)
            t = re.sub(r'<!--MC:SHELLJS-->.*?<!--/MC:SHELLJS-->', lambda m: SHELLJS, t, flags=re.S)
            if slug: t = re.sub(r'<!--MC:RELATED-->.*?<!--/MC:RELATED-->', lambda m: related(slug, descs), t, flags=re.S)
            else: t = re.sub(r'<!--MC:MAIN-->.*?<!--/MC:MAIN-->', lambda m: '<!--MC:MAIN-->' + index_main(rel[0], descs) + '<!--/MC:MAIN-->', t, flags=re.S)
        open(f, 'w', encoding='utf-8').write(t)
    ref = open(os.path.join(site, 'tools', 'chess-diagram-generator', 'index.html'), encoding='utf-8').read()
    shared = re.search(r'<!--MC:SHARED-CSS-->(.*?)<!--/MC:SHARED-CSS-->', ref, re.S).group(1)
    for s in CHROME_PAGES:
        f = os.path.join(site, 'master-tools', s, 'index.html'); raw = open(f, encoding='utf-8').read()
        open(f, 'w', encoding='utf-8').write(apply_chrome(raw, s, shared, hl, fl))

# ---------------------------------------------------------------- check
def region(t, name): return re.search(r'<!--MC:%s-->(.*?)<!--/MC:%s-->' % (name, name), t, re.S)
def check(site):
    bad, notes = [], collections.defaultdict(set)
    pages = {}
    for s, t in T.items(): pages[s] = os.path.join(site, t['base'], s, 'index.html')
    for b in ('tools', 'master-tools'): pages['(%s library)' % b] = os.path.join(site, b, 'index.html')
    for b in ('tools', 'master-tools'):
        have = {d for d in os.listdir(os.path.join(site, b)) if os.path.isdir(os.path.join(site, b, d))}
        want = {s for s, t in T.items() if t['base'] == b}
        for d in sorted(have - want): bad.append('%s/%s: folder not in TOOLS' % (b, d))
    anchors = {}
    for b in ('tools', 'master-tools'):
        anchors[b] = set(re.findall(r'<section class="mc-sec" id="([^"]+)"', open(pages['(%s library)' % b], encoding='utf-8').read()))
    hdrs, ftrs = {}, {}
    for name, f in pages.items():
        if not os.path.exists(f): bad.append('missing page: ' + name); continue
        t = open(f, encoding='utf-8').read(); tt = re.sub(r'data:[^"\')\\]+', 'DATA', t)
        slug = name if name in T else None; base = T[slug]['base'] if slug else name[1:name.index(' ')]
        want = abs_url(slug) if slug else SITE + '/%s/' % base
        can = re.findall(r'rel="canonical" href="([^"]+)"', t); og = re.findall(r'property="og:url" content="([^"]+)"', t)
        if can != [want] or og != [want]: bad.append('%s: canonical/og:url %s %s (want %s)' % (name, can, og, want))
        if len(re.findall(r'<title>', t[:t.index('</head>')])) != 1: bad.append(name + ': title tag count')
        if len(re.findall(r'name="description"', t)) != 1: bad.append(name + ': description meta count')
        ids = [i for i in re.findall(r'\sid="([^"]+)"', re.sub(r'<script.*?</script>', '', tt, flags=re.S)) if '${' not in i]
        dup = [i for i, n in collections.Counter(ids).items() if n > 1]
        if dup: bad.append('%s: duplicate ids %s' % (name, dup))
        for j in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
            try: json.loads(j)
            except Exception as e: bad.append('%s: bad JSON-LD %s' % (name, e))
        cur = re.findall(r'aria-current=\\?"page\\?" class=\\?"on mc-tool-menu-link\\?" href=\\?"([^"\\]+)', t)
        if slug and ('<mc-site-header' in t or '<!--MC:HEADER-->' in t) and cur != [url(slug)]: bad.append('%s: active menu item %s' % (name, cur))
        if '<!--MC:HEADER-->' in t:
            hdr = region(tt, 'HEADER').group(1); ftr = region(tt, 'FOOTER').group(1)
            hdrs[name] = re.sub(r' aria-current="page" class="on mc-tool-menu-link"', ' class="mc-tool-menu-link"', hdr); ftrs[name] = ftr
            if t.count('<main') != 1 or 'id="main"' not in t: bad.append(name + ': main landmark')
            if slug:
                crumb = re.search(r'<a href="%s/%s/#([^"]+)"' % (re.escape(SITE), base), region(tt, 'HERO').group(1))
                if not crumb or crumb.group(1) not in anchors[base]: bad.append('%s: breadcrumb anchor %s' % (name, crumb and crumb.group(1)))
                rel = re.findall(r'class="mc-suggested-card [^"]*" href="([^"]+)"', t)
                if len(rel) != 3 or url(slug) in rel: bad.append('%s: related cards %s' % (name, rel))
        elif '<mc-site-header>' not in t: pass
        for h in re.findall(r'(?:href|action)=\\?"([^"\\]*)', tt):
            if h.startswith('#'):
                if h != '#' and '${' not in h and ('id="%s"' % h[1:]) not in t: bad.append('%s: anchor %s has no target' % (name, h))
            elif re.match(r'/(tools|master-tools)/', h):
                p, _, frag = h.partition('#'); parts = p.strip('/').split('/')
                if len(parts) == 1:
                    if frag and frag not in anchors[parts[0]]: bad.append('%s: %s' % (name, h))
                elif not (len(parts) == 2 and parts[1] in T and T[parts[1]]['base'] == parts[0] and p.endswith('/')): bad.append('%s: broken internal link %s' % (name, h))
            elif h.startswith(SITE + '/tools/') or h.startswith(SITE + '/master-tools/'):
                p, _, frag = h[len(SITE):].partition('#'); parts = p.strip('/').split('/')
                if not (len(parts) == 1 or (len(parts) == 2 and parts[1] in T and T[parts[1]]['base'] == parts[0])): bad.append('%s: broken absolute link %s' % (name, h))
                elif frag and frag not in anchors[parts[0]]: bad.append('%s: %s' % (name, h))
            elif h.startswith(SITE): notes['outside this ZIP (not verifiable here)'].add(h)
            elif h.startswith('http'): notes['external'].add(h.split('/')[2])
            elif h in ('', 'DATA') or h.startswith(('data:', '${', 'DATA')): pass
            else: bad.append('%s: relative/unknown link %r' % (name, h))
        for m in re.findall(r"[\w/-]+\.html[#'\"?]?", re.sub(r'<style.*?</style>', '', tt, flags=re.S)): bad.append('%s: leftover .html reference %s' % (name, m))
        for k, s in enumerate(re.findall(r'<script>(.*?)</script>', t, re.S)):
            open('/tmp/_c.js', 'w', encoding='utf-8').write(s)
            r = subprocess.run(['node', '--check', '/tmp/_c.js'], capture_output=True, text=True)
            if r.returncode: bad.append('%s: JS syntax error in script %d: %s' % (name, k, r.stderr.strip().splitlines()[-1][:120]))
    if len(set(hdrs.values())) != 1: bad.append('header differs between pages (%d variants)' % len(set(hdrs.values())))
    if len(set(ftrs.values())) != 1: bad.append('footer differs between pages (%d variants)' % len(set(ftrs.values())))
    print('pages checked:', len(pages), '| light-shell pages:', len(hdrs)); print('problems:', len(bad))
    for b in bad: print('  ✗', b)
    for k, v in notes.items(): print('%s:' % k); [print('   ', x) for x in sorted(v)]
    return bad

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'convert-master': convert_master(sys.argv[2], sys.argv[3])
    elif cmd == 'refresh': refresh(sys.argv[2])
    elif cmd == 'check': sys.exit(1 if check(sys.argv[2]) else 0)
