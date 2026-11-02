#!/usr/bin/env python3
"""Opening Study Guide builder (batch).
  python build_guides.py                      -> PDFs for the 40 biggest families + index in ./Opening_Guides
  python build_guides.py --family "Sicilian Defense" --family "French Defense"
  python build_guides.py --all                -> every family (150)
Needs: pip install chess reportlab svglib   and a Stockfish binary (auto-detected; --no-engine to skip evals).
Data: openings_data.json (Lichess chess-openings, CC0) + opening_knowledge.json (family concepts, coach layer)."""
import argparse, collections, json, os, re, shutil, sys
import chess, chess.engine
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics import renderPDF
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak, Table, TableStyle, Flowable, KeepTogether)
from svglib.svglib import svg2rlg

HERE = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(HERE, "openings_data.json")))
KB = json.load(open(os.path.join(HERE, "opening_knowledge.json")))
FC, FIVE = KB["FC"], KB["FIVE"]
sys.path.insert(0, HERE)
from openings_db import OPENINGS

FD = "/usr/share/fonts/truetype/dejavu/"
for n, f in (("DV", "DejaVuSans.ttf"), ("DVB", "DejaVuSans-Bold.ttf"), ("DVI", "DejaVuSans-Oblique.ttf"), ("DVM", "DejaVuSansMono.ttf")):
    pdfmetrics.registerFont(TTFont(n, FD + f))
pdfmetrics.registerFontFamily("DV", normal="DV", bold="DVB", italic="DVI", boldItalic="DVB")
INK, ACC, MUTE, LINE = colors.HexColor("#1c2430"), colors.HexColor("#4f7f1c"), colors.HexColor("#5d6b7a"), colors.HexColor("#d3d9e0")
LT, DK = colors.HexColor("#f0d9b5"), colors.HexColor("#b58863")
PS = lambda n, **k: ParagraphStyle(n, fontName=k.pop("font", "DV"), textColor=k.pop("color", INK), **k)
ST = dict(b=PS("b", fontSize=9, leading=12.6, spaceAfter=3), s=PS("s", fontSize=7.6, leading=10, color=MUTE), h1=PS("h1", font="DVB", fontSize=24, leading=28, spaceAfter=4),
          h2=PS("h2", font="DVB", fontSize=13.5, leading=17, spaceBefore=8, spaceAfter=3), h3=PS("h3", font="DVB", fontSize=8.6, leading=11, color=ACC, spaceBefore=6, spaceAfter=1),
          mv=PS("mv", font="DVM", fontSize=8, leading=11.5), box=PS("box", fontSize=9.4, leading=13.4))
P = lambda t, s="b": Paragraph(t, ST[s] if isinstance(s, str) else s)
esc = lambda t: t.replace("&", "&amp;").replace("<", "&lt;")
PIECE = {}
for k in ["wK", "wQ", "wR", "wB", "wN", "wP", "bK", "bQ", "bR", "bB", "bN", "bP"]:
    PIECE[k] = svg2rlg(os.path.join(HERE, "pieces", k + ".svg"))

# ---------------------------------------------------------------- knowledge helpers
CLS = [(r"Sicilian", "sic"), (r"French", "french"), (r"Caro-Kann", "caro"), (r"Scandinavian|Alekhine|Pirc|Modern Defense|Philidor|Owen|St\. George|Nimzowitsch Defense|Hippopotamus|Rat Defense|Czech Defense|Portuguese|Lion|Robatsch", "semi"),
       (r"Ruy Lopez|Spanish", "ruy"), (r"Italian|Giuoco|Two Knights|Evans|Fried Liver|Jerome", "italian"),
       (r"Scotch|Vienna|King's Gambit|Petrov|Russian Game|Four Knights|Three Knights|Bishop's|Center Game|Danish|Ponziani|Latvian|Elephant|King's Pawn|Hungarian Defense", "open"),
       (r"Queen's Gambit|Slav|Tarrasch|Albin|Chigorin|Queen's Pawn", "qg"), (r"Nimzo|Bogo|Queen's Indian|Catalan|Blumenfeld|Old Indian|Indian Defense", "indianQ"),
       (r"King's Indian Attack|Reti|Réti|Zukertort", "flank"), (r"King's Indian|Gr[uü]nfeld|Benoni|Benko", "kid"), (r"Dutch|Stonewall|Leningrad", "dutch"),
       (r"London|Colle|Trompowsky|Torre|Jobava|Veresov|Blackmar|Richter|Barry|Mikenas|Englund|Budapest", "qp"),
       (r"English|Bird|Larsen|Sokolsky|Orangutan|Polish|Anglo|Mieses|Hungarian Opening|Barnes|Amar|Clemenz|Grob|Dunst|Ware|Lasker|Desprez|Van|Saragossa", "flank")]
def cls(name, eco):
    for r, k in CLS:
        if re.search(r, name): return k
    return {"A": "flank", "B": "semi", "C": "open", "D": "qg", "E": "indianQ"}.get(eco[0], "open")
def plan(c, col):
    out = {}
    for x in FC[c].get(col, "").split(";"):
        if "=" in x: s, w = x.split("=", 1); out[s] = w
    return out
BLAND = {"develop", "develop actively", "solid", "flexible", "solid development", "develop the bishop", "solid center", "castle"}
BLACK_SIDE = re.compile(r"Defen[cs]e|Declined|Indian|Benoni|Dutch|Pirc|Modern|Scandinavian|Alekhine|Philidor|Gambit Accepted|Hippopotamus|Rat |Owen|Lion|Budapest|Englund|Albin|Latvian|Elephant|Czech|St\. George")

def norm(s): return re.sub(r"[+#?!]", "", s)
def board_after(sans):
    b = chess.Board()
    for s in sans: b.push_san(s)
    return b
def numbered(sans, start_ply=0):
    out = []
    for i, s in enumerate(sans):
        p = start_ply + i
        out.append((f"{p//2+1}." if p % 2 == 0 else (f"{p//2+1}..." if i == 0 else "")) + s)
    return " ".join(out)

def explain(b, mv, pl):
    san = b.san(mv); n = norm(san)
    pc = b.piece_at(mv.from_square); tgt = chess.square_name(mv.to_square); f = tgt[0]
    if b.is_castling(mv): gen = "Castles: the king reaches safety and the rook joins the center."
    elif pc.piece_type == chess.PAWN:
        if b.is_capture(mv): gen = "Pawn capture: challenges the center and opens lines."
        elif tgt in ("d4", "e4", "d5", "e5"): gen = "Occupies the center with a pawn."
        elif f in "abgh": gen = "Gains space on the wing."
        else: gen = "Pawn move that supports the center or prepares a break."
    elif pc.piece_type in (chess.KNIGHT, chess.BISHOP):
        nm = "knight" if pc.piece_type == chess.KNIGHT else "bishop"; home = 1 if pc.color == chess.WHITE else 8
        if tgt in ("g2", "b2", "g7", "b7") and pc.piece_type == chess.BISHOP: gen = "Fianchetto: the bishop takes the long diagonal."
        elif chess.square_rank(mv.from_square) + 1 == home: gen = "Develops the %s to %s." % (nm, tgt)
        elif b.is_capture(mv): gen = "Captures on %s to trade or win material." % tgt
        else: gen = "Repositions the %s to a more active square." % nm
    elif pc.piece_type == chess.QUEEN: gen = "Queen move: puts pressure on a target (watch for tempo-gaining attacks)."
    elif pc.piece_type == chess.ROOK: gen = "Rook move: contests an open file or the center."
    else: gen = "King move."
    if n not in pl or pl[n].lower() in BLAND: return gen
    L = pl[n][0].upper() + pl[n][1:]
    return f"{L}. {gen}" if len(L) < 24 and not gen.lower().startswith(L.lower()[:7]) else L + "."

# ---------------------------------------------------------------- name tree
def split_name(n):
    if ": " not in n: return []
    return [x.strip() for x in n.split(": ", 1)[1].split(", ")]
def lcp(lines):
    out = []
    for col in zip(*lines):
        if all(c == col[0] for c in col): out.append(col[0])
        else: break
    return out
class N:
    def __init__(s, label): s.label = label; s.kids = collections.OrderedDict(); s.ents = []; s.line = []; s.eco = ""
def build_tree(ents, famname):
    root = N(famname)
    for e in ents:
        n = root
        for p in split_name(e["name"]): n = n.kids.setdefault(p, N(p))
        n.ents.append(e)
    def fin(n, parent_line):
        sub = []
        def collect(x):
            sub.extend(x.ents)
            for k in x.kids.values(): collect(k)
        collect(n)
        own = sorted(n.ents, key=lambda e: len(e["san"]))
        n.line = own[0]["san"] if own else lcp([e["san"] for e in sub]) if sub else list(parent_line)
        n.eco = own[0]["eco"] if own else (sub[0]["eco"] if sub else "")
        n.size = len(sub)
        for k in n.kids.values(): fin(k, n.line)
    fin(root, [])
    return root
def tree_rows(root):
    rows = []
    def go(n, depth, guides, last, parent_line):
        pre = n.line if n.line[:len(parent_line)] == parent_line else []
        cut = len(parent_line) if pre else 0
        rows.append(dict(d=depth, g=list(guides), last=last, label=n.label, eco=n.eco, size=n.size, prefix=n.line[:cut], new=n.line[cut:], start=cut))
        ks = sorted(n.kids.values(), key=lambda k: (len(k.line), k.label))
        for i, k in enumerate(ks):
            go(k, depth + 1, guides + ([not last] if depth >= 1 else []), i == len(ks) - 1, n.line)
    ks = sorted(root.kids.values(), key=lambda k: (len(k.line), k.label))
    rows.append(dict(d=0, g=[], last=True, label=root.label, eco=root.eco, size=root.size, prefix=[], new=root.line, start=0))
    for i, k in enumerate(ks): go(k, 1, [], i == len(ks) - 1, root.line)
    return rows

# ---------------------------------------------------------------- flowables
class Diagram(Flowable):
    def __init__(s, board, size=190, flip=False, arrows=(), cap="", last=None):
        super().__init__(); s.b, s.size, s.flip, s.arrows, s.cap, s.last = board, size, flip, list(arrows), cap, last
        s.width, s.height = size, size + 11
    def xy(s, sq):
        f, r = chess.square_file(sq), chess.square_rank(sq); q = s.size / 8
        return ((7 - f if s.flip else f) * q, ((7 - r) if s.flip else r) * q + 11)
    def draw(s):
        c, q = s.canv, s.size / 8
        for sq in chess.SQUARES:
            x, y = s.xy(sq); c.setFillColor(DK if (chess.square_file(sq) + chess.square_rank(sq)) % 2 == 0 else LT); c.rect(x, y, q, q, stroke=0, fill=1)
            if s.last and sq in s.last: c.setFillColor(colors.Color(.6, .78, 0, .42)); c.rect(x, y, q, q, stroke=0, fill=1)
        for sq in chess.SQUARES:
            p = s.b.piece_at(sq)
            if p:
                x, y = s.xy(sq); d = PIECE[("w" if p.color else "b") + p.symbol().upper()]; k = q / d.width
                c.saveState(); c.translate(x, y); c.scale(k, k); renderPDF.draw(d, c, 0, 0); c.restoreState()
        for a, bb, col in s.arrows:
            x1, y1 = s.xy(a); x2, y2 = s.xy(bb); x1 += q / 2; y1 += q / 2; x2 += q / 2; y2 += q / 2
            import math; dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1; ux, uy = dx / L, dy / L; hl = q * .34
            c.setStrokeColor(col); c.setFillColor(col); c.setLineWidth(q * .14); c.setLineCap(1); c.saveState(); c.setStrokeAlpha(.82); c.setFillAlpha(.82)
            c.line(x1, y1, x2 - ux * hl, y2 - uy * hl); p = c.beginPath(); p.moveTo(x2, y2); p.lineTo(x2 - ux * hl - uy * hl * .6, y2 - uy * hl + ux * hl * .6); p.lineTo(x2 - ux * hl + uy * hl * .6, y2 - uy * hl - ux * hl * .6); p.close(); c.drawPath(p, stroke=0, fill=1); c.restoreState()
        c.setStrokeColor(INK); c.setLineWidth(.8); c.rect(0, 11, s.size, s.size, stroke=1, fill=0)
        c.setFont("DV", 6.3); c.setFillColor(MUTE); c.drawString(0, 2, s.cap)
class TreeFlow(Flowable):
    RH = 21
    def __init__(s, rows, width):
        super().__init__(); s.rows, s.width = rows, width; s.height = len(rows) * s.RH
    def draw(s):
        c = s.canv; H = s.height; rh = s.RH
        for i, r in enumerate(s.rows):
            y = H - (i + 1) * rh; ym = y + rh / 2; d = r["d"]; x0 = 6 + d * 15
            c.setStrokeColor(colors.HexColor("#9fb08a")); c.setLineWidth(.8)
            for L, g in enumerate(r["g"]):
                if g: xx = 6 + L * 15 + 5; c.line(xx, y, xx, y + rh)
            if d >= 1:
                xl = 6 + (d - 1) * 15 + 5; c.line(xl, y + rh, xl, ym if r["last"] else y); c.line(xl, ym, x0, ym)
            key = r["size"] >= 10
            c.setFillColor(ACC if key else colors.HexColor("#9fb08a")); c.circle(x0 + 2, ym, 2.4 if key else 1.7, stroke=0, fill=1)
            c.setFont("DVB", 8.2); c.setFillColor(INK); lab = r["label"] if d else r["label"] + " (all lines)"
            w = s.width - x0 - 40
            while pdfmetrics.stringWidth(lab, "DVB", 8.2) > w and len(lab) > 8: lab = lab[:-2]
            c.drawString(x0 + 8, ym + 1.5, lab)
            if r["eco"]: c.setFont("DV", 6.8); c.setFillColor(MUTE); c.drawRightString(s.width, ym + 1.5, r["eco"])
            x = x0 + 8; yy = ym - 7.3; c.setFont("DVM", 6.9)
            pre = numbered(r["prefix"]) if r["prefix"] else ""
            if r["prefix"]:
                c.setFillColor(MUTE); c.drawString(x, yy, pre + " "); x += pdfmetrics.stringWidth(pre + " ", "DVM", 6.9)
            new = numbered(r["new"], r["start"])
            if r["prefix"] and r["new"]: c.setFillColor(ACC); c.drawString(x, yy, "-> "); x += pdfmetrics.stringWidth("-> ", "DVM", 6.9)
            c.setFillColor(INK); c.setFont("DVB" if False else "DVM", 6.9)
            room = s.width - x - 4
            while pdfmetrics.stringWidth(new, "DVM", 6.9) > room and len(new) > 6: new = new[:-4] + "…"
            c.drawString(x, yy, new)

# ---------------------------------------------------------------- engine helpers
def evaluate(eng, board, t=0.5):
    if not eng: return None
    info = eng.analyse(board, chess.engine.Limit(time=t)); sc = info["score"].white()
    best = info["pv"][0] if info.get("pv") else None
    cp = sc.score(mate_score=10000); txt = (f"#{sc.mate()}" if sc.is_mate() else f"{cp/100:+.2f}")
    v = "equal" if abs(cp) < 25 else ("slightly better for " + ("White" if cp > 0 else "Black")) if abs(cp) < 75 else ("clearly better for " + ("White" if cp > 0 else "Black")) if abs(cp) < 200 else ("winning edge for " + ("White" if cp > 0 else "Black"))
    return dict(cp=cp, txt=txt, verdict=v, depth=info.get("depth", 0), best=board.san(best) if best else "-", bestmove=best)

def ideas_arrows(board, c, maxn=3):
    pl = plan(c, "w" if board.turn else "b"); out = []
    for m in board.legal_moves:
        n = norm(board.san(m))
        if n in pl and len(out) < maxn: out.append((m.from_square, m.to_square, colors.HexColor("#2f6fb3")))
    return out

# ---------------------------------------------------------------- family guide
def mainstream(ents, famname):
    exact = [e for e in ents if e["name"] == famname]
    path = list(min(exact, key=lambda e: len(e["san"]))["san"]) if exact else []
    while len(path) < 14:
        cnt = collections.Counter(e["san"][len(path)] for e in ents if len(e["san"]) > len(path) and e["san"][:len(path)] == path)
        if not cnt or cnt.most_common(1)[0][1] < 2: break
        path.append(cnt.most_common(1)[0][0])
    if len(path) < 4: path = list(max(ents, key=lambda e: len(e["san"]))["san"])
    return path

def build_family(fam, ents, reps, out, eng, no_pages=False):
    c = cls(fam, ents[0]["eco"]); K = FC[c]
    ecos = sorted({e["eco"] for e in ents}); eco_rng = ecos[0] if len(ecos) == 1 else f"{ecos[0]}-{ecos[-1]}"
    main = mainstream(ents, fam); tree = build_tree(ents, fam); rows = tree_rows(tree)
    side_black = bool(BLACK_SIDE.search(fam)); flip = side_black
    doc = BaseDocTemplate(out, pagesize=letter, leftMargin=.7 * inch, rightMargin=.7 * inch, topMargin=.8 * inch, bottomMargin=.7 * inch, title=f"{fam} - Opening Study Guide", author="Opening Lab")
    W = doc.width
    def foot(cv, d):
        cv.saveState(); cv.setFillColor(colors.HexColor("#1c2430")); cv.rect(0, letter[1] - 30, letter[0], 30, stroke=0, fill=1); cv.setFillColor(colors.white); cv.setFont("DVB", 9)
        cv.drawString(.7 * inch, letter[1] - 19, f"Opening Study Guide  |  {fam}"); cv.setFont("DV", 7.5); cv.setFillColor(MUTE); cv.drawString(.7 * inch, .42 * inch, "Data: Lichess chess-openings (CC0). Concept notes: Opening Lab. Evals: Stockfish." if eng else "Data: Lichess chess-openings (CC0). Concept notes: Opening Lab.")
        cv.drawRightString(letter[0] - .7 * inch, .42 * inch, str(d.page)); cv.restoreState()
    doc.addPageTemplates([PageTemplate(id="p", frames=[Frame(doc.leftMargin, doc.bottomMargin, W, doc.height, id="f")], onPage=foot)])
    S = []
    # ---- page 1: summary
    bmain = board_after(main)
    arr = ideas_arrows(bmain, c)
    ev0 = evaluate(eng, bmain, .8)
    if ev0 and ev0["bestmove"]: arr = [(ev0["bestmove"].from_square, ev0["bestmove"].to_square, colors.HexColor("#15781B"))] + arr
    S += [P(esc(fam), "h1"), P(f"ECO {eco_rng}  |  {len(ents)} named lines  |  {K['t']}", "s"), Spacer(1, 6)]
    box = Table([[P("<b>In one sentence:</b> " + esc(K.get("why", "")), "box")], [P("<b>Memory pattern:</b> " + esc(K.get("mem", "")), "box")]], colWidths=[W], style=[("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#eaf3dc")), ("BOX", (0, 0), (-1, -1), .6, ACC), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)])
    S += [box, Spacer(1, 8)]
    cap = "Main line: " + numbered(main)[:70] + ("..." if len(numbered(main)) > 70 else "")
    ideas = "".join(f"<b>{i+1}.</b> {esc(t)}<br/>" for i, t in enumerate(K.get("ideas", [])))
    right = [P("Key ideas", "h3"), P(ideas), P("Reading the diagram", "h3"), P("Blue arrows = thematic plan moves for the side to move. Green arrow = engine's best move." if ev0 else "Blue arrows = thematic plan moves for the side to move.", "s")]
    if ev0: right.append(P(f"Engine at the end of the main line: <b>{ev0['txt']}</b> ({ev0['verdict']}, depth {ev0['depth']}). Best: {esc(ev0['best'])}.", "s"))
    S.append(Table([[Diagram(bmain, 200, flip, arr, cap), right]], colWidths=[215, W - 215], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]))
    S += [P("The five coach questions", "h2")]
    five = [("1. Ideal pawn structure?", K["s"]), ("2. Where does my king go?", K["k"]), ("3. Best minor pieces?", K["p"]), ("4. Main middlegame plan?", K["pl"]), ("5. What does my opponent want?", K["o"])]
    S.append(Table([[P(f"<b>{a}</b>", "b"), P(esc(b))] for a, b in five], colWidths=[130, W - 130], style=[("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), .3, LINE), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    S.append(PageBreak())
    # ---- page 2: main line explained
    S += [P("The main line, move by move", "h1"), P("Most common continuation in the database: " + esc(numbered(main)), "s"), Spacer(1, 4)]
    b = chess.Board(); rowsx = [[P("<b>Move</b>", "s"), P("<b>Why it is played</b>", "s")]]; marks = []
    for i, s in enumerate(main):
        mv = b.parse_san(s); col = "w" if b.turn else "b"; why = explain(b, mv, plan(c, col)); num = f"{i//2+1}." if i % 2 == 0 else f"{i//2+1}..."
        rowsx.append([P(f"<b>{num} {esc(s)}</b>", ST["mv"]), P(esc(why))]); b.push(mv)
        if i in (3, 7) and i < len(main) - 1: marks.append((i, b.copy()))
    S.append(Table(rowsx, colWidths=[70, W - 70], repeatRows=1, style=[("VALIGN", (0, 0), (-1, -1), "TOP"), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f4f7f0")]), ("LINEBELOW", (0, 0), (-1, 0), .6, ACC), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    if marks:
        S += [Spacer(1, 8), Table([[Diagram(bd, 150, flip, ideas_arrows(bd, c, 2), f"After {numbered(main[:i+1])[-22:]}") for i, bd in marks[:2]]], colWidths=[W / 2] * 2)]
    S.append(PageBreak())
    # ---- key variations
    top = [k for k in tree.kids.values() if k.size >= 1]
    top.sort(key=lambda k: (-k.size, len(k.line)))
    picks = []
    for k in top:
        if len(k.line) >= 3 and len(picks) < 6: picks.append(k)
    S += [P("Key variations", "h1"), P("The most important named branches (ranked by how much theory lies beneath them). Diagram arrows: blue = plan moves, green = Stockfish.", "s"), Spacer(1, 6)]
    for k in picks:
        bd = board_after(k.line); ev = evaluate(eng, bd, .5); ar = ideas_arrows(bd, c)
        if ev and ev["bestmove"]: ar = [(ev["bestmove"].from_square, ev["bestmove"].to_square, colors.HexColor("#15781B"))] + ar
        sub = [x.label for x in sorted(k.kids.values(), key=lambda z: -z.size)[:4]]
        txt = [P(f"<b>{esc(k.label)}</b>  <font color='#5d6b7a' size='7'>{k.eco}  |  {k.size} lines</font>", "box"), P(esc(numbered(k.line)), "mv")]
        if ev: txt.append(P(f"Stockfish: <b>{ev['txt']}</b> ({ev['verdict']}, depth {ev['depth']}). Best next move: {esc(ev['best'])}.", "s"))
        pt = "w" if bd.turn else "b"; pl = list(plan(c, pt).items())[:3]
        txt.append(P("What to look for: " + esc("; ".join(f"{s} ({w})" for s, w in pl)), "s"))
        if sub: txt.append(P("Sub-variations: " + esc(", ".join(sub)), "s"))
        S.append(KeepTogether([Table([[Diagram(bd, 150, flip, ar, "Position after the line"), txt]], colWidths=[165, W - 165], style=[("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), .3, LINE)]), Spacer(1, 5)]))
    if reps:
        S += [P("Detailed repertoire notes", "h2")]
        for o in reps:
            f5 = FIVE.get(o["name"], ["", ""])
            S.append(KeepTogether([P(f"<b>{esc(o['name'])}</b> ({o['eco']}, {o['side']})", "box"), P(esc(o["line"]), "mv"), P("<b>Idea:</b> " + esc(o["idea"])), P("<b>Structure:</b> " + esc(o["struct"])), P("<b>Pieces:</b> " + esc(o["pieces"])), P("<b>Plan:</b> " + esc(o["plan"])), P("<b>King:</b> " + esc(f5[0]) + " <b>Opponent:</b> " + esc(f5[1])), P("<b>Watch out:</b> " + esc(o["watch"])), Spacer(1, 6)]))
    S.append(PageBreak())
    # ---- coach view
    S += [P("Expert and coach view", "h1")]
    if K.get("exp"): S.append(P(esc(K["exp"]), "s"))
    S += [P("What a coach would tell you", "h3"), P(esc(K.get("coach", ""))), P("Why play it", "h3"), P(esc(K.get("why", ""))), P("Typical mistakes", "h3")]
    S += [P("&bull; " + esc(t)) for t in K.get("mist", [])]
    S += [P("Typical tactics and traps", "h3")] + [P("&bull; " + esc(t)) for t in K.get("trap", [])]
    S += [P("Endgame and middlegame outlook", "h3"), P(esc(K.get("end", ""))), P("Study checklist", "h3")]
    for t in ["Play the main line on a board and say each move's purpose aloud.", "Learn the five coach questions by heart; answer them without notes.", "Drill two sub-variations until the moves feel automatic.", "Play three games with the opening, then review where you left theory.", "Re-read the traps page the day before a tournament."]:
        S.append(P("[  ] " + esc(t)))
    S.append(PageBreak())
    # ---- tree
    S += [P("The opening tree", "h1"), P("Every named line in this family as a tree. Gray moves are inherited from the parent; green after the arrow are the new moves that define the variation. Large green dots mark branches with 10 or more lines.", "s"), Spacer(1, 6)]
    for i in range(0, len(rows), 29): S.append(TreeFlow(rows[i:i + 29], W))
    S.append(PageBreak())
    # ---- cheat sheet
    S += [P("One-page memory sheet", "h1")]
    seq = numbered(main[:10]); S += [P("Move-order pattern", "h3"), P(esc(seq), ST["mv"]), P("Plan chain", "h3")]
    pw = list(plan(c, "w").items())[:5]; pb = list(plan(c, "b").items())[:5]
    S.append(Table([[P("<b>White</b>", "s"), P(esc("  ->  ".join(s for s, _ in pw)))], [P("<b>Black</b>", "s"), P(esc("  ->  ".join(s for s, _ in pb)))]], colWidths=[50, W - 50], style=[("LINEBELOW", (0, 0), (-1, -1), .3, LINE)]))
    S += [P("Three rules to remember", "h3")] + [P(f"{i+1}. {esc(t)}") for i, t in enumerate([K.get("mem", ""), K["pl"], K["o"]])]
    S += [P("Pawn structure in one line", "h3"), P(esc(K["s"]))]
    doc.build(S)
    return dict(fam=fam, eco=eco_rng, n=len(ents), file=os.path.basename(out), cls=K["t"])

def build_index(index, path):
    doc = BaseDocTemplate(path, pagesize=letter, leftMargin=.7 * inch, rightMargin=.7 * inch, topMargin=.8 * inch, bottomMargin=.7 * inch, title="Opening Study Guides - Index")
    doc.addPageTemplates([PageTemplate(id="p", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")])])
    S = [P("Opening Study Guides", "h1"), P("One PDF per opening family. Each guide has: summary and key ideas, the main line explained move by move, key variations with Stockfish evaluations, an expert/coach page, the full visual opening tree and a one-page memory sheet.", "b"), Spacer(1, 8)]
    rows = [[P("<b>File</b>", "s"), P("<b>Family</b>", "s"), P("<b>ECO</b>", "s"), P("<b>Lines</b>", "s"), P("<b>Type</b>", "s")]] + [[P(esc(i["file"]), "s"), P(esc(i["fam"]), "b"), P(i["eco"], "s"), P(str(i["n"]), "s"), P(esc(i["cls"]), "s")] for i in index]
    S.append(Table(rows, colWidths=[150, 150, 55, 35, 120], repeatRows=1, style=[("VALIGN", (0, 0), (-1, -1), "TOP"), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f4f7f0")]), ("LINEBELOW", (0, 0), (-1, 0), .6, ACC)]))
    S += [Spacer(1, 10), P("How to study with these guides", "h2")] + [P(f"{n}. {esc(x)}") for n, x in enumerate(["Read page 1 (key ideas + five questions) and answer the questions from memory.", "Walk through the explained main line and say why each move is played.", "Learn two key variations; use the Opening Lab app Drill mode to test yourself.", "Use the tree to see where transpositions and sidelines branch.", "Finish with the memory sheet before every game."], 1)]
    doc.build(S)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--family", action="append"); ap.add_argument("--all", action="store_true"); ap.add_argument("--top", type=int, default=40)
    ap.add_argument("--out", default=os.path.join(HERE, "..", "Opening_Guides")); ap.add_argument("--stockfish"); ap.add_argument("--no-engine", action="store_true"); a = ap.parse_args()
    ents = [dict(eco=r[0], name=r[1], fam=r[1].split(":")[0], san=r[2].split()) for r in D["entries"]]
    fams = collections.OrderedDict()
    for e in ents: fams.setdefault(e["fam"], []).append(e)
    repfam = collections.defaultdict(list)
    for i, o in enumerate(OPENINGS): repfam[D["rep"][i]["fam"]].append(o)
    names = a.family or ([f for f in fams] if a.all else [f for f, _ in sorted(fams.items(), key=lambda kv: -len(kv[1]))[:a.top]] + [f for f in repfam if f in fams and f not in [x for x, _ in sorted(fams.items(), key=lambda kv: -len(kv[1]))[:a.top]]])
    os.makedirs(a.out, exist_ok=True)
    sf = None if a.no_engine else (a.stockfish or shutil.which("stockfish") or ("/usr/games/stockfish" if os.path.exists("/usr/games/stockfish") else None))
    eng = chess.engine.SimpleEngine.popen_uci(sf) if sf else None
    if eng: eng.configure({"Threads": 2})
    index = []
    for i, f in enumerate(names, 1):
        safe = re.sub(r"[^A-Za-z0-9]+", "_", f).strip("_"); path = os.path.join(a.out, f"{i:02d}_{safe}.pdf")
        info = build_family(f, fams[f], repfam.get(f, []), path, eng); index.append(info); print("built", path, file=sys.stderr)
    if eng: eng.quit()
    json.dump(index, open(os.path.join(a.out, "index.json"), "w"), indent=1); build_index(index, os.path.join(a.out, "00_Index.pdf"))
    print(f"Built {len(index)} guides in {a.out}")
if __name__ == "__main__": main()
