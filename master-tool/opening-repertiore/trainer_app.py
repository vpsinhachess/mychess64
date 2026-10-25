#!/usr/bin/env python3
"""Stockfish opening trainer. Run:  python trainer_app.py   then open http://localhost:8765
Needs: pip install chess   + a Stockfish binary (auto-detected, or --stockfish PATH).
Modes: Drill (play your repertoire lines, engine judges deviations) and Free (play on vs Stockfish).
Keep openings_db.py in the same folder."""
import argparse, json, os, random, re, shutil, sys, threading, webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import chess, chess.engine
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from openings_db import OPENINGS

def to_ucis(line):
    b, out = chess.Board(), []
    for t in re.split(r"\s+", re.sub(r"\d+\.(\.\.)?", "", line).strip()):
        m = b.parse_san(t); out.append(m.uci()); b.push(m)
    return out

LINES = [[to_ucis(o["line"])] + [to_ucis(v[0]) for v in o["vars"]] for o in OPENINGS]
LOCK = threading.Lock()
ENGINE = None
G = dict(board=chess.Board(), oi=0, color=chess.WHITE, mode="idle", cands=[], hist=[], msg="Choose an opening and press Start.",
         stats=dict(ok=0, miss=0), skill=8, last=None)

def score(board, t=0.15):
    if not ENGINE: return None
    info = ENGINE.analyse(board, chess.engine.Limit(time=t))
    s = info["score"].white()
    return dict(cp=s.score(mate_score=10000), text=(f"#{s.mate()}" if s.is_mate() else f"{s.score()/100:+.2f}"),
                best=(board.san(info["pv"][0]) if info.get("pv") else None))

def state(extra=None):
    b = G["board"]
    legal = {}
    if G["mode"] != "idle" and not b.is_game_over() and b.turn == G["color"]:
        for m in b.legal_moves: legal.setdefault(chess.square_name(m.from_square), []).append(chess.square_name(m.to_square))
    sans, t = [], chess.Board()
    for u in [m.uci() for m in b.move_stack]:
        sans.append(t.san(chess.Move.from_uci(u))); t.push(chess.Move.from_uci(u))
    d = dict(fen=b.fen(), legal=legal, color="white" if G["color"] else "black", mode=G["mode"], msg=G["msg"], stats=G["stats"],
             moves=sans, last=G["last"], eval=score(b) if G["mode"] != "idle" else None, over=b.is_game_over(), engine=bool(ENGINE))
    if extra: d.update(extra)
    return d

def push(uci):
    m = chess.Move.from_uci(uci); G["board"].push(m); G["last"] = [chess.square_name(m.from_square), chess.square_name(m.to_square)]

def engine_reply():
    b = G["board"]
    if b.is_game_over() or b.turn == G["color"]: return
    if not ENGINE:
        G["msg"] = "No Stockfish found: make the opponent move yourself or install Stockfish."; return
    ENGINE.configure({"Skill Level": G["skill"]})
    r = ENGINE.play(b, chess.engine.Limit(time=0.3)); push(r.move.uci())

def opponent_book():
    ply = len(G["hist"]); nxt = [l for l in G["cands"] if len(l) > ply]
    if not nxt:
        G["mode"] = "free"; G["msg"] = "Line complete! Continue the game against Stockfish."; engine_reply(); return
    l = random.choice(nxt); push(l[ply]); G["hist"].append(l[ply])
    G["cands"] = [x for x in G["cands"] if len(x) > ply and x[ply] == l[ply]]
    if not any(len(l2) > ply + 1 for l2 in G["cands"]):
        G["mode"] = "free"; G["msg"] = "Line complete! Continue the game against Stockfish."

def start(oi, mode):
    o = OPENINGS[oi]
    G.update(board=chess.Board(), oi=oi, color=(o["side"] == "White"), mode=mode, hist=[], cands=[list(l) for l in LINES[oi]], last=None, stats=dict(ok=0, miss=0))
    G["msg"] = f"{o['name']}: play the book moves as {o['side']}." if mode == "drill" else "Free game vs Stockfish."
    if mode == "drill" and G["color"] == chess.BLACK: opponent_book()
    elif mode == "free" and G["color"] == chess.BLACK: engine_reply()

def move(uci):
    b = G["board"]; m = chess.Move.from_uci(uci)
    p = b.piece_at(m.from_square)
    if p and p.piece_type == chess.PAWN and chess.square_rank(m.to_square) in (0, 7): m = chess.Move.from_uci(uci[:4] + "q")
    if m not in b.legal_moves: return state(dict(error="illegal"))
    if G["mode"] == "drill":
        ply = len(G["hist"]); u = m.uci()
        match = [l for l in G["cands"] if len(l) > ply and l[ply] == u]
        if match:
            push(u); G["hist"].append(u); G["cands"] = match; G["stats"]["ok"] += 1; G["msg"] = "Book move!"
            opponent_book()
            return state()
        book = sorted({l[ply] for l in G["cands"] if len(l) > ply})
        san_book = [b.san(chess.Move.from_uci(x)) for x in book]
        before = score(b); san = b.san(m); b.push(m); after = score(b); b.pop()
        sign = 1 if G["color"] else -1
        verdict = ""
        if before and after:
            loss = (before["cp"] - after["cp"]) * sign / 100
            verdict = f" Stockfish: {san} is {after['text']} vs best {before['text']} ({'playable, but off-book' if loss < 0.3 else 'a real mistake' if loss > 0.8 else 'inaccurate'})."
        G["stats"]["miss"] += 1
        G["msg"] = f"Not in your repertoire. Book: {', '.join(san_book)}.{verdict} Try again."
        return state(dict(deviation=True, book=book))
    push(m.uci())
    G["msg"] = "Your move."; engine_reply()
    return state()

def hint():
    b = G["board"]
    if G["mode"] == "drill":
        ply = len(G["hist"]); u = sorted({l[ply] for l in G["cands"] if len(l) > ply})
        if u: return dict(hint=[chess.square_name(chess.Move.from_uci(u[0]).from_square), chess.square_name(chess.Move.from_uci(u[0]).to_square)], text="Book move: " + b.san(chess.Move.from_uci(u[0])))
    s = score(b, 0.4)
    return dict(text="Engine suggests: " + (s["best"] if s else "n/a"))

PAGE = r"""<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Opening Trainer</title>
<style>:root{--bg:#EDF0F2;--ink:#14202B;--d:#6F8FA3;--l:#E3EAEF;--acc:#B9741A}@media(prefers-color-scheme:dark){:root{--bg:#10171D;--ink:#E6ECF0;--d:#4a6677;--l:#8fa5b3}}
body{margin:0;background:var(--bg);color:var(--ink);font:15px system-ui,sans-serif}main{max-width:620px;margin:auto;padding:14px}
h1{font-size:22px;margin:4px 0 10px}.row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}select,button{font:inherit;padding:8px 10px;border-radius:8px;border:1px solid #8aa;background:var(--l);color:#14202B}
button.p{background:var(--acc);color:#fff;border-color:var(--acc)}#wrap{display:flex;gap:6px}#bar{width:14px;background:#222;border-radius:3px;position:relative}#fill{position:absolute;bottom:0;left:0;right:0;background:#fff;transition:height .3s}
#b{display:grid;grid-template-columns:repeat(8,1fr);flex:1;aspect-ratio:1;border:2px solid var(--ink)}.s{display:flex;align-items:center;justify-content:center;font-size:min(8vw,46px);cursor:pointer;position:relative;user-select:none}
.s.l{background:var(--l)}.s.d{background:var(--d)}.s.sel{outline:3px solid var(--acc);outline-offset:-3px}.s.lm{box-shadow:inset 0 0 0 100px rgba(185,116,26,.35)}.s.t::after{content:"";width:28%;height:28%;border-radius:50%;background:rgba(20,32,43,.35);position:absolute}.s.h{outline:3px dashed #2a9d4a;outline-offset:-3px}
.w{color:#fff;text-shadow:0 0 2px #000,0 0 2px #000,0 0 1px #000}.k{color:#0d141a;text-shadow:0 0 1px #fff}
#msg{margin:10px 0;padding:10px;border-left:4px solid var(--acc);background:rgba(127,127,127,.12);min-height:40px}#mv{font:13px ui-monospace,monospace;opacity:.85}</style></head><body><main>
<h1>Opening Trainer <small id=ev style="font-weight:400;font-size:14px"></small></h1>
<div class=row><select id=op></select><select id=md><option value=drill>Drill repertoire</option><option value=free>Free game vs Stockfish</option></select><button class=p id=go>Start</button><button id=hb>Hint</button></div>
<div id=wrap><div id=bar><div id=fill></div></div><div id=b></div></div><div id=msg></div><div id=st></div><div id=mv></div></main>
<script>
const G={w:{K:"♚",Q:"♛",R:"♜",B:"♝",N:"♞",P:"♟"}};let S=null,sel=null,hint=null;
const $=i=>document.getElementById(i);
async function api(p,b){const r=await fetch(p,b?{method:"POST",body:JSON.stringify(b)}:{});return r.json()}
async function init(){const o=await api("/api/openings");$("op").innerHTML=o.map((x,i)=>`<option value=${i}>${x}</option>`).join("");S=await api("/api/state");draw()}
function draw(){const b=$("b");b.innerHTML="";const rows=S.fen.split(" ")[0].split("/");const g={};
rows.forEach((r,ri)=>{let f=0;for(const ch of r){if(/\d/.test(ch))f+=+ch;else{g["abcdefgh"[f]+(8-ri)]=ch;f++}}});
const fl=S.color==="black";for(let r=0;r<8;r++)for(let c=0;c<8;c++){const file=fl?7-c:c,rank=fl?r+1:8-r,sq="abcdefgh"[file]+rank;
const d=document.createElement("div");d.className="s "+((file+rank)%2?"l":"d");const p=g[sq];if(p){d.textContent=G.w[p.toUpperCase()];d.classList.add(p===p.toUpperCase()?"w":"k")}
if(sel===sq)d.classList.add("sel");if(sel&&S.legal[sel]&&S.legal[sel].includes(sq))d.classList.add("t");if(S.last&&S.last.includes(sq))d.classList.add("lm");if(hint&&hint.includes(sq))d.classList.add("h");
d.onclick=()=>click(sq);b.appendChild(d)}
$("msg").textContent=S.msg;$("st").textContent=S.mode==="drill"?`Book moves ✓ ${S.stats.ok}   Deviations ✗ ${S.stats.miss}`:"";
let t="";S.moves.forEach((m,i)=>t+=(i%2?"":(i/2+1)+". ")+m+" ");$("mv").textContent=t;
if(S.eval){$("ev").textContent="Eval "+S.eval.text;$("fill").style.height=(50+50*Math.tanh(S.eval.cp/400))+"%"}else $("ev").textContent=S.engine?"":"(no Stockfish)"}
async function click(sq){if(S.mode==="idle")return;if(sel&&S.legal[sel]&&S.legal[sel].includes(sq)){const u=sel+sq;sel=null;hint=null;S=await api("/api/move",{uci:u});draw();return}
sel=S.legal[sq]?sq:null;draw()}
$("go").onclick=async()=>{sel=null;hint=null;S=await api("/api/start",{oi:+$("op").value,mode:$("md").value});draw()};
$("hb").onclick=async()=>{const h=await api("/api/hint");hint=h.hint||null;S.msg=h.text;draw()};init();
</script></body></html>"""

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def send(self, code, body, ct="application/json"):
        data = body.encode() if isinstance(body, str) else body
        self.send_response(code); self.send_header("Content-Type", ct); self.send_header("Content-Length", str(len(data))); self.end_headers(); self.wfile.write(data)
    def do_GET(self):
        with LOCK:
            if self.path == "/": return self.send(200, PAGE, "text/html; charset=utf-8")
            if self.path == "/api/openings": return self.send(200, json.dumps([f"{o['side']}: {o['name']}" for o in OPENINGS]))
            if self.path == "/api/state": return self.send(200, json.dumps(state()))
            if self.path == "/api/hint": return self.send(200, json.dumps(hint()))
        self.send(404, "{}")
    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0)); d = json.loads(self.rfile.read(n) or "{}")
        with LOCK:
            if self.path == "/api/start": start(int(d["oi"]), d["mode"]); return self.send(200, json.dumps(state()))
            if self.path == "/api/move": return self.send(200, json.dumps(move(d["uci"])))
        self.send(404, "{}")

def main():
    global ENGINE
    ap = argparse.ArgumentParser(); ap.add_argument("--stockfish"); ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--skill", type=int, default=8, help="Stockfish skill 0-20 for free play"); ap.add_argument("--no-browser", action="store_true"); a = ap.parse_args()
    p = a.stockfish or shutil.which("stockfish") or ("/usr/games/stockfish" if os.path.exists("/usr/games/stockfish") else None)
    if p: ENGINE = chess.engine.SimpleEngine.popen_uci(p)
    else: print("Stockfish not found: drills work, but evals and engine play are disabled.")
    G["skill"] = a.skill
    url = f"http://localhost:{a.port}"; print("Trainer running at", url)
    if not a.no_browser: webbrowser.open(url)
    try: ThreadingHTTPServer(("127.0.0.1", a.port), H).serve_forever()
    finally:
        if ENGINE: ENGINE.quit()

if __name__ == "__main__": main()
