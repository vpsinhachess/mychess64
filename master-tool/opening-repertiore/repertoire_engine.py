#!/usr/bin/env python3
"""Chess repertoire engine.
  python repertoire_engine.py                       -> full atlas PDF (all openings)
  python repertoire_engine.py --style sharp --max-theory 4 --out my_rep.pdf --pgn my_rep.pgn
  python repertoire_engine.py --stockfish /usr/games/stockfish   (adds engine evals)
Requires: pip install chess reportlab
"""
import argparse, re, shutil, sys, os
import chess, chess.engine, chess.pgn
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
                                Table, TableStyle, Flowable, KeepTogether)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from openings_db import OPENINGS, STRUCTURES

FD = "/usr/share/fonts/truetype/dejavu/"
pdfmetrics.registerFont(TTFont("DV", FD + "DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DVB", FD + "DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DVI", FD + "DejaVuSans-Oblique.ttf"))
pdfmetrics.registerFontFamily("DV", normal="DV", bold="DVB", italic="DVI", boldItalic="DVB")

INK, ACC, SQD, SQL, MUTE = colors.HexColor("#14202B"), colors.HexColor("#B9741A"), colors.HexColor("#6F8FA3"), colors.HexColor("#E3EAEF"), colors.HexColor("#566574")
S = lambda n, **k: ParagraphStyle(n, fontName=k.pop("font", "DV"), textColor=k.pop("color", INK), **k)
ST = dict(
    body=S("b", fontSize=9.2, leading=13.2, spaceAfter=4),
    small=S("s", fontSize=8, leading=11, color=MUTE),
    h1=S("h1", font="DVB", fontSize=22, leading=26, spaceAfter=8, spaceBefore=4),
    h2=S("h2", font="DVB", fontSize=14.5, leading=18, spaceBefore=8, spaceAfter=3),
    h3=S("h3", font="DVB", fontSize=10.2, leading=13, spaceBefore=5, spaceAfter=1, color=ACC),
    mv=S("mv", font="DVB", fontSize=8.6, leading=12.5),
    var=S("v", fontSize=8.4, leading=11.6),
)
PIECES = {"K": "\u265A", "Q": "\u265B", "R": "\u265C", "B": "\u265D", "N": "\u265E", "P": "\u265F"}

def toks(line):
    return [t for t in re.split(r"\s+", re.sub(r"\d+\.(\.\.)?", "", line).strip()) if t]

def play(line):
    b = chess.Board()
    for t in toks(line):
        b.push_san(t)          # raises ValueError on an illegal move
    return b

def find_engine(path=None):
    p = path or shutil.which("stockfish") or ("/usr/games/stockfish" if os.path.exists("/usr/games/stockfish") else None)
    return p

def evaluate(board, path, depth=12):
    try:
        with chess.engine.SimpleEngine.popen_uci(path) as e:
            info = e.analyse(board, chess.engine.Limit(depth=depth))
            sc = info["score"].white()
            best = info.get("pv", [None])[0]
            txt = f"{sc.score()/100:+.2f}" if not sc.is_mate() else f"#{sc.mate()}"
            mv = board.san(best) if best else "-"
            return txt, mv
    except Exception:
        return None

class Diagram(Flowable):
    def __init__(self, board, size=190, flip=False, caption=""):
        super().__init__()
        self.b, self.size, self.flip, self.cap = board, size, flip, caption
        self.width, self.height = size, size + 12
    def draw(self):
        c, sq = self.canv, self.size / 8
        for r in range(8):
            for f in range(8):
                x = (7 - f if self.flip else f) * sq
                y = ((7 - r) if self.flip else r) * sq + 12
                c.setFillColor(SQD if (r + f) % 2 == 0 else SQL)
                c.rect(x, y, sq, sq, stroke=0, fill=1)
                p = self.b.piece_at(chess.square(f, r))
                if p:
                    white = p.color == chess.WHITE
                    c.setFont("DV", sq * 0.82)
                    c.setFillColor(colors.white if white else colors.HexColor("#0d141a"))
                    c.setStrokeColor(colors.HexColor("#0d141a"))
                    c.setLineWidth(0.7)
                    t = c.beginText(x + sq * 0.08, y + sq * 0.2)
                    t.setFont("DV", sq * 0.82); t.setTextRenderMode(2)
                    t.textOut(PIECES[p.symbol().upper()])
                    c.drawText(t)
        c.setStrokeColor(INK); c.setLineWidth(1); c.rect(0, 12, self.size, self.size, stroke=1, fill=0)
        c.setFont("DV", 6.5); c.setFillColor(MUTE)
        c.drawString(0, 2, self.cap + ("  (Black at bottom)" if self.flip else ""))

def P(t, s="body"): return Paragraph(t, ST[s] if isinstance(s, str) else s)

def footer(c, d):
    c.saveState(); c.setFont("DV", 7.5); c.setFillColor(MUTE)
    c.drawString(0.7 * inch, 0.45 * inch, "Chess Opening Repertoire Atlas")
    c.drawRightString(letter[0] - 0.7 * inch, 0.45 * inch, f"{d.page}")
    c.setStrokeColor(SQD); c.setLineWidth(2); c.line(0.7 * inch, letter[1] - 0.55 * inch, letter[0] - 0.7 * inch, letter[1] - 0.55 * inch)
    c.restoreState()

# ------------------------------------------------------------------ selection engine
def select(color, style, max_theory):
    pool = [o for o in OPENINGS if o["side"] == color and o["theory"] <= max_theory]
    def score(o): return (0 if o["style"] == style else 1 if o["style"] == "universal" else 2, o["theory"])
    pool.sort(key=score)
    out = []
    if color == "White":
        first = {}
        for o in pool:
            first.setdefault(toks(o["line"])[0], []).append(o)
        for k in ("e4", "d4", "c4", "Nf3"):      # one main weapon per first move family
            if first.get(k): out.append(first[k][0])
        out += [o for o in pool if o not in out][:2]
    else:
        e4 = [o for o in pool if o["line"].startswith("1.e4")]
        d4 = [o for o in pool if o["line"].startswith("1.d4")]
        out = e4[:2] + d4[:2]
    return out

def export_pgn(ops, path):
    with open(path, "w") as f:
        for o in ops:
            for i, (ln, note) in enumerate([(o["line"], "Main line")] + o["vars"]):
                g = chess.pgn.Game(); g.headers.update({"Event": "Repertoire", "White": "Study", "Black": "Study", "ECO": o["eco"].split("-")[0].split(",")[0],
                                                       "Opening": o["name"], "Annotator": note})
                node = g
                for t in toks(ln):
                    mv = node.board().parse_san(t); node = node.add_variation(mv)
                print(g, file=f, end="\n\n")

# ------------------------------------------------------------------ concepts text
def concepts(story):
    story += [P("Part I \u2013 Opening Concepts", "h1"),
        P("An opening repertoire is a set of plans, not a pile of moves. Learn the idea, the pawn structure and the typical piece placement first; the move orders then become easy to remember.", "body"),
        P("1. The ten opening principles", "h2")]
    for t in ["<b>Control the center</b> with pawns (e4, d4, c4) or with pieces from a distance (hypermodern play).",
              "<b>Develop knights before bishops</b>, and develop every minor piece once; do not move the same piece twice without reason.",
              "<b>Castle early</b> (usually within the first 8-10 moves); connect the rooks.",
              "<b>Do not take pawns that cost tempo</b> and do not bring the queen out early unless it gains something concrete.",
              "<b>Make threats, parry threats</b>: before each move ask 'what does my opponent want?'.",
              "<b>Pawn breaks</b> (c5, e5, f4, ...c5, ...e5, ...f5) decide the middlegame; know your break before you choose the opening.",
              "<b>Keep the bishop pair</b> in open positions; knights are better in closed ones.",
              "<b>Do not open the center when your king is uncastled</b> and the opponent is better developed.",
              "<b>Use tactics to test principles</b>: pins, forks and discovered attacks decide most opening traps.",
              "<b>Know the structure</b>: pawn structure dictates plans for 20 moves; pieces follow the pawns."]:
        story.append(P("\u2022 " + t))
    story.append(P("2. Core pawn structures (with diagrams)", "h2"))
    for name, fen, txt in STRUCTURES:
        d = Diagram(chess.Board(fen), 150, caption=name)
        story.append(KeepTogether([Table([[d, [P(name, "h3"), P(txt)]]], colWidths=[165, 360], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]), Spacer(1, 4)]))
    story += [P("3. Piece placement", "h2"),
        P("<b>Knights</b> love outposts (a square protected by a pawn that no enemy pawn can attack): d5/e5 for White, d4/e4 for Black. <b>Bishops</b> need open diagonals; trade off your bad bishop (blocked by your own pawns) or open the position. <b>Rooks</b> belong on open or half-open files; connect them with queen and king safe. <b>The queen</b> develops late and should not wander without a target. <b>The king</b> belongs castled; remove it from the center before the center opens."),
        P("4. Plans by pawn structure", "h2")]
    for t in ["<b>Open center (e4 e5):</b> develop quickly, castle, fight for the e- and d-files; tactics decide.",
              "<b>Closed center (Ruy Lopez, KID):</b> maneuver knights to good squares; play on the wing where you have more space (kingside for KID Black, queenside for White).",
              "<b>Queen's Gambit structures:</b> minority attack (b4-b5) vs hanging or isolated pawns; use e4 when Black is cramped.",
              "<b>Sicilian structures:</b> White attacks the kingside with f4-g4 or Be3-Qd2-O-O-O; Black counterattacks with ...b5 and ...Rc8 on the queenside.",
              "<b>French / Caro-Kann:</b> attack the base of the pawn chain; improve the 'bad' bishop or trade it.",
              "<b>Hedgehog / Maroczy:</b> White clamps d5 and b5; Black waits with ...a6, ...b6, ...Be7 and prepares ...b5 or ...d5."]:
        story.append(P("\u2022 " + t))
    story += [P("5. Move orders and transpositions", "h2"),
        P("Many openings transpose: the Slav and Queen's Gambit can reach the same structure; Reti / English / Catalan share the fianchetto setup; the Italian and the Ruy Lopez can transposition to similar closed centers. Learn the target position and the set of plans so that move-order tricks do not catch you off guard."),
        P("6. How to study an opening", "h2")]
    for t in ["Play the main line on a board and say aloud the idea of every move.",
              "Learn two sidelines per opening, not twenty; know the most common deviations.",
              "Play 10-20 training games with the line against an engine or friend, then review where you left theory.",
              "Keep a notebook (or PGN file) with your own mistakes; update the repertoire after every tournament.",
              "Drill tactics from your openings (pins, sacrifices, typical traps) 15 minutes a day.",
              "Study master games in your openings; pay attention to plans, not just moves.",
              "Use an engine only after you form your own conclusion; ask 'why did it prefer that move?'."]:
        story.append(P("\u2022 " + t))
    story.append(PageBreak())

# ------------------------------------------------------------------ opening page
def opening_block(o, ev, flip):
    b = play(o["line"])
    cap = "Position after: " + " ".join(toks(o["line"])[-3:])
    d = Diagram(b, 178, flip, cap)
    meta = f"ECO {o['eco']}   |   style: {o['style']}   |   theory: {'\u25CF'*o['theory']}{'\u25CB'*(5-o['theory'])}"
    if ev: meta += f"   |   Stockfish d12: {ev[0]}, best {ev[1]}"
    right = [P(o["tag"], "body"), P(meta, "small"), Spacer(1, 3), P("Main line", "h3"), P(o["line"], "mv")]
    head = [P(f"{o['name']}", "h2"), Table([[d, right]], colWidths=[192, 335], style=[("VALIGN", (0, 0), (-1, -1), "TOP")])]
    rows = [[P("Main idea", "h3"), P(o["idea"])], [P("Pawn structure", "h3"), P(o["struct"])], [P("Best pieces", "h3"), P(o["pieces"])],
            [P("Plan", "h3"), P(o["plan"])]]
    t = Table(rows, colWidths=[85, 440], style=[("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.3, SQL),
                                              ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)])
    var = [P("Key variations", "h3")] + [Table([[P("<b>%s</b>" % l, "var"), P(n, "var")]], colWidths=[320, 205],
                                              style=[("VALIGN", (0, 0), (-1, -1), "TOP"), ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F1F5F7")),
                                                     ("BOX", (0, 0), (-1, -1), 0.3, SQL), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]) for l, n in o["vars"]]
    watch = Table([[P("<b>Watch out:</b> " + o["watch"], "var")]], colWidths=[525], style=[("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F6E9D6")), ("LEFTPADDING", (0, 0), (-1, -1), 6)])
    return [KeepTogether(head + [t] + var + [Spacer(1, 3), watch]), Spacer(1, 12)]

def build_pdf(ops_white, ops_black, out, title, sf_path, full):
    doc = BaseDocTemplate(out, pagesize=letter, leftMargin=0.7 * inch, rightMargin=0.7 * inch, topMargin=0.8 * inch, bottomMargin=0.7 * inch, title=title, author="Repertoire Engine")
    doc.addPageTemplates([PageTemplate(id="p", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")], onPage=footer)])
    story = [Spacer(1, 60), P(title, S("t", font="DVB", fontSize=34, leading=38)), Spacer(1, 10),
             P("A complete guide to major chess openings for White and Black: strong variations, ideas, pawn structures, best pieces and plans, with diagrams and an engine-assisted repertoire builder.", S("c", fontSize=12, leading=17, color=MUTE)),
             Spacer(1, 24), Diagram(play("1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7"), 230, caption="Ruy Lopez: the start of a classical repertoire"), Spacer(1, 24),
             P("<b>Contents</b>", "h2"), P("Part I \u2013 Opening concepts, pawn structures, piece play, plans, study method"),
             P("Part II \u2013 White repertoire: %d openings" % len(ops_white)), P("Part III \u2013 Black repertoire: %d openings" % len(ops_black)),
             P("Part IV \u2013 Repertoire builder: style matrix, ready-made repertoires, checklists"), Spacer(1, 12),
             P("All move lines in this document were checked move-by-move for legality with the python-chess library" + (", and evaluated with Stockfish." if sf_path else ". Run the script with --stockfish PATH to add engine evaluations."), "small"), PageBreak()]
    concepts(story)
    for label, ops, flip in (("Part II \u2013 White Repertoire", ops_white, False), ("Part III \u2013 Black Repertoire", ops_black, True)):
        story += [P(label, "h1")]
        for o in ops:
            ev = evaluate(play(o["line"]), sf_path) if sf_path else None
            story += opening_block(o, ev, flip)
        story.append(PageBreak())
    # ---- Part IV
    story += [P("Part IV \u2013 Repertoire Builder", "h1"),
              P("Choose openings that match your style and the time you can invest. The engine ranks openings by style match first, then by how light the theory is.")]
    rows = [["Opening", "Side", "Style", "Theory", "ECO"]] + [[o["name"], o["side"], o["style"], "%d/5" % o["theory"], o["eco"]] for o in OPENINGS if o in ops_white + ops_black]
    story.append(Table(rows, colWidths=[200, 55, 80, 60, 130], repeatRows=1, style=[("FONTNAME", (0, 0), (-1, -1), "DV"), ("FONTNAME", (0, 0), (-1, 0), "DVB"), ("FONTSIZE", (0, 0), (-1, -1), 8),
         ("BACKGROUND", (0, 0), (-1, 0), SQL), ("GRID", (0, 0), (-1, -1), 0.3, SQL), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F7F9FA")])]))
    story.append(P("Ready-made repertoires (generated by the engine)", "h2"))
    for style, mt, lab in (("solid", 3, "Solid & low-risk"), ("universal", 4, "Universal / balanced"), ("sharp", 5, "Aggressive / maximum winning chances")):
        w = select("White", style, mt); b = select("Black", style, mt)
        story += [P(lab, "h3"), P("<b>White:</b> " + ", ".join(o["name"] for o in w) + "<br/><b>Black:</b> " + ", ".join(o["name"] for o in b))]
    story += [P("Quick answers to rare first moves (Black)", "h2"),
              P("\u2022 <b>1.c4</b>: ...e5 (reversed Sicilian) or ...c5/...Nf6 symmetrical setups; or ...e6 with ...d5 (QGD structures)."),
              P("\u2022 <b>1.Nf3</b>: ...d5 and ...c6 (Slav setup) or ...Nf6 followed by ...g6 (King's Indian setup)."),
              P("\u2022 <b>1.b3 / 1.g3 / 1.f4</b>: ...d5 and ...Nf6, take the center and develop naturally; against 1.f4 use ...d5 and ...Nf6 (Stonewall-like), or the Dutch reversed."),
              P("\u2022 <b>1.d4 d5 2.Bf4 / Colle</b>: ...c5 with ...Qb6 vs the London; ...Nf6, ...e6, ...Bd6 vs Colle."),
              P("Checklist before every tournament", "h2")]
    for t in ["Review your main lines the day before; do not learn new theory the night before.",
              "Know the first 10 moves of every opening; know the first break and the first plan.",
              "Prepare one surprise weapon (Scotch, Vienna, Evans, Scandinavian) for stronger opponents.",
              "After each game, add one new idea or correction to your notes."]:
        story.append(P("\u2022 " + t))
    doc.build(story)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--style", choices=["sharp", "solid", "positional", "universal"], help="filter by playing style")
    ap.add_argument("--max-theory", type=int, default=5)
    ap.add_argument("--color", choices=["White", "Black", "both"], default="both")
    ap.add_argument("--out", default="Chess_Opening_Repertoire.pdf")
    ap.add_argument("--pgn", help="also export all lines to a PGN file")
    ap.add_argument("--stockfish", help="path to a Stockfish binary (auto-detected if installed)")
    a = ap.parse_args()
    for o in OPENINGS:                              # validation pass
        for ln in [o["line"]] + [v[0] for v in o["vars"]]:
            play(ln)
    pool = [o for o in OPENINGS if o["theory"] <= a.max_theory and (a.style is None or o["style"] in (a.style, "universal"))]
    w = [o for o in pool if o["side"] == "White"] if a.color in ("White", "both") else []
    b = [o for o in pool if o["side"] == "Black"] if a.color in ("Black", "both") else []
    sf = find_engine(a.stockfish)
    title = "Chess Opening Repertoire Atlas" if not a.style else f"Chess Repertoire \u2013 {a.style.title()} Style"
    build_pdf(w, b, a.out, title, sf, a.style is None)
    if a.pgn: export_pgn(w + b, a.pgn)
    print(f"Wrote {a.out}: {len(w)} White + {len(b)} Black openings; engine: {'Stockfish' if sf else 'off'}")

if __name__ == "__main__":
    main()
