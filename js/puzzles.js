CHESSA.reg("puzzles","Playable puzzles: built-in set (data/puzzles.js), Lichess daily, Chess.com");
(function(){
const {lib,esc}=window.cx;
const U="https://cdn.jsdelivr.net/gh/lichess-org/lila@master/public/piece/cburnett/",G={p:"♟",n:"♞",b:"♝",r:"♜",q:"♛",k:"♚"};
const sty=document.createElement("style");sty.textContent=".pz{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(8,minmax(0,1fr));width:min(100%,340px);aspect-ratio:1;margin:8px 0;border-radius:8px;overflow:hidden;box-shadow:0 8px 24px #0009;user-select:none;touch-action:manipulation}.pz>div{position:relative;min-width:0;min-height:0;overflow:hidden;display:grid;place-items:center;cursor:pointer;font-size:22px}.pz .l{background:#c9d9e8}.pz .d{background:#3d6a8f}.pz .lm{box-shadow:inset 0 0 0 100px #f5c65a55}.pz .s{box-shadow:inset 0 0 0 100px #f5c65aaa}.pz .m::after{content:'';position:absolute;width:30%;height:30%;border-radius:50%;background:#0a06188c}.pz .c::after{content:'';position:absolute;inset:4%;border-radius:50%;border:4px solid #0a06188c}.pz img{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}.pz.bad{animation:shk .35s}@keyframes shk{20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}.pst{font-weight:700;min-height:1.5em}";document.head.append(sty);
const J=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),7000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const hi=()=>localStorage.cl==="hi";
const T={ok:["✅ Correct!","✅ सही!"],bad:["Try your best move","अपनी सबसे अच्छी चाल चलिए"],done:["🎉 Puzzle solved! Next puzzle coming…","🎉 पहेली हल हुई! अगली पहेली आ रही है…"],go:["to move — find the best move!","की चाल — सबसे अच्छी चाल खोजिए!"],sol:["Solution: ","हल: "]};
const tt=k=>T[k][hi()?1:0],clean=s=>s.replace(/[+#?!]/g,"");
const off=th=>local(th)||local()||window.botUI("I couldn't reach the free puzzle service right now. Check your internet and try again.");
let P=null,solved=0,lastUrl="";const seen=new Set();
function local(th){const L=window.PUZZLES||[];if(!L.length)return false;let A=th&&th.a?L.filter(x=>(x.tags||[]).includes(th.a)):L;if(!A.length)return false;
 const lv=["Beginner","Intermediate","Advanced"][+localStorage.clv||0],B=A.filter(x=>x.level==lv);if(B.length)A=B;
 const U=A.filter(x=>!seen.has(x.id));if(U.length)A=U;else A.forEach(x=>seen.delete(x.id));
 const x=A[Math.floor(Math.random()*A.length)];seen.add(x.id);mount("<b>"+esc(x.theme)+"</b> · "+x.level,x.fen,x.moves,relFor(th));return true}
function pimg(c){const i=document.createElement("img"),k=c.color+c.type.toUpperCase();i.draggable=false;i.alt=G[c.type];i.src=U+k+".svg";i.onerror=()=>{if(!i.d){i.d=1;i.src="https://lichess1.org/assets/piece/cburnett/"+k+".svg"}else i.replaceWith(i.alt)};return i}
function mount(title,fen,moves,rel){
 if(P)P.dead=true;
 const g=new Chess(fen),me=g.turn(),row=document.createElement("div"),av=document.createElement("div"),b=document.createElement("div"),hd=document.createElement("div"),bd=document.createElement("div"),stt=document.createElement("div"),bt=document.createElement("div");
 row.className="msg bot";av.className="av";av.textContent="♛";b.className="bubble";bd.className="pz";stt.className="pst";bt.className="meta";bt.style.cssText="opacity:1;animation:none";hd.innerHTML=title;
 b.append(hd,bd,stt,bt);row.append(av,b);if(th){th.remove();th=null}document.body.classList.add("chat");chat.append(row);
 const ctl={dead:false};P=ctl;let i=0,sel=null,tg=[],lm=null,lock=false;
 const who=hi()?(me=="w"?"सफ़ेद":"काला"):(me=="w"?"White":"Black"),goTxt=who+" "+tt("go");stt.textContent=goTxt;
 const sc=()=>main.scrollTo({top:main.scrollHeight});
 function draw(){bd.innerHTML="";const R=me=="w"?[0,1,2,3,4,5,6,7]:[7,6,5,4,3,2,1,0];
  R.forEach(r=>R.forEach(c=>{const sq="abcdefgh"[c]+(8-r),d=document.createElement("div"),p=g.get(sq);
   d.className=(r+c)%2?"d":"l";if(sq==sel)d.classList.add("s");else if(lm&&(sq==lm.from||sq==lm.to))d.classList.add("lm");if(tg.includes(sq))d.classList.add(p?"c":"m");
   if(p)d.append(pimg(p));d.onclick=()=>tap(sq);bd.append(d)}))}
 function fin(){lock=true;solved++;stt.textContent=tt("done")+" ("+solved+" 🔥)";speak(hi()?"सही!":"Correct!");sc();setTimeout(()=>{if(!ctl.dead)rnd()},2400)}
 function tap(sq){if(lock||ctl.dead||i>=moves.length)return;const p=g.get(sq);
  if(sel&&tg.includes(sq))return go(sel,sq);
  if(p&&p.color==me){sel=sq;tg=g.moves({square:sq,verbose:true}).map(m=>m.to)}else{sel=null;tg=[]}draw()}
 function go(f,t){
  const m=g.move({from:f,to:t,promotion:"q"});sel=null;tg=[];if(!m){draw();return}
  if(clean(m.san)!=clean(moves[i])&&!g.in_checkmate()){g.undo();draw();bd.classList.remove("bad");void bd.offsetWidth;bd.classList.add("bad");stt.textContent=tt("bad");speak(tt("bad"));return}
  lm=m;i++;draw();if(g.in_checkmate()||i>=moves.length)return fin();
  stt.textContent=tt("ok");lock=true;
  setTimeout(()=>{if(ctl.dead)return;const o=g.move(moves[i],{sloppy:true});if(o){lm=o;i++}draw();lock=false;if(i>=moves.length||g.game_over())fin();else stt.textContent=goTxt},650)}
 ctl.sol=()=>{stt.textContent=tt("sol")+moves.slice(i).join(" ");sc()};
 [["💡 Hint",()=>{const m=g.moves({verbose:true}).find(x=>clean(x.san)==clean(moves[i]));if(m&&!lock){sel=m.from;tg=[];draw()}}],["👁 Solution",ctl.sol],["⏭ Next",()=>{ctl.dead=true;rnd()}]].forEach(([t,f])=>{const s=document.createElement("span");s.className="rl";s.textContent=t;s.onclick=f;bt.append(s)});
 (rel||[]).forEach(t=>{const s=document.createElement("span");s.className="rl kw";s.dataset.q=t;s.textContent="🔎 "+t;s.onclick=()=>{q.value=t;send.click()};bt.append(s)});
 draw();sc()}
async function ccom(){
 if(!await lib())return false;let j=null;
 for(let k=0;k<3;k++){j=await J("https://api.chess.com/pub/puzzle/random");if(j&&j.fen&&j.url!=lastUrl)break}
 if(!j||!j.fen)return false;lastUrl=j.url;
 const h=new Chess(j.fen),mv=[];(j.pgn||"").replace(/\[[^\]]*\]/g,"").replace(/\{[^}]*\}/g,"").replace(/\d+\.(\.\.)?/g," ").split(/\s+/).filter(Boolean).every(x=>{const m=h.move(x,{sloppy:true});if(m)mv.push(m.san);return m});
 if(!mv.length)return false;mount("<b>Puzzle</b> · "+esc(j.title||"Chess.com"),j.fen,mv,relFor(null));return true}

/* ---- themed random puzzles ---- */
const TH=[[/mate in (1|one)\b|mate-in-1|one[- ]move mate/i,"mateIn1","Mate in 1"],[/mate in (2|two)\b/i,"mateIn2","Mate in 2"],[/mate in (3|three)\b/i,"mateIn3","Mate in 3"],[/mate in (4|four)\b/i,"mateIn4","Mate in 4"],[/back[ -]?rank/i,"backRankMate","Back-rank mate"],[/smother/i,"smotheredMate","Smothered mate"],[/\bfork/i,"fork","Fork"],[/\bpin/i,"pin","Pin"],[/skewer/i,"skewer","Skewer"],[/discover/i,"discoveredAttack","Discovered attack"],[/hanging|free piece/i,"hangingPiece","Hanging piece"],[/sacrific/i,"sacrifice","Sacrifice"],[/deflect/i,"deflection","Deflection"],[/attract/i,"attraction","Attraction"],[/pawn endgame/i,"pawnEndgame","Pawn endgame"],[/rook endgame/i,"rookEndgame","Rook endgame"],[/bishop endgame/i,"bishopEndgame","Bishop endgame"],[/knight endgame/i,"knightEndgame","Knight endgame"],[/queen endgame/i,"queenEndgame","Queen endgame"],[/endgame|end game/i,"endgame","Endgame"],[/middle ?game/i,"middlegame","Middlegame"],[/opening/i,"opening","Opening"],[/promot/i,"promotion","Promotion"],[/zugzwang/i,"zugzwang","Zugzwang"],[/quiet/i,"quietMove","Quiet move"],[/x-?ray/i,"xRayAttack","X-ray"],[/trapped/i,"trappedPiece","Trapped piece"],[/double check/i,"doubleCheck","Double check"],[/en passant/i,"enPassant","En passant"],[/exposed king|king hunt/i,"exposedKing","Exposed king"],[/\bmate|checkmate/i,"mate","Checkmate"],[/tactic/i,"","Tactics"]];
const REL={mateIn1:["Mate in 2 puzzle","Back rank puzzle","Smothered mate puzzle","Fork puzzle"],mateIn2:["Mate in 1 puzzle","Mate in 3 puzzle","Back rank puzzle","Sacrifice puzzle"],mateIn3:["Mate in 2 puzzle","Sacrifice puzzle","Deflection puzzle","Endgame puzzle"],backRankMate:["Mate in 1 puzzle","Deflection puzzle","Pin puzzle","Mate in 2 puzzle"],smotheredMate:["Mate in 1 puzzle","Fork puzzle","Sacrifice puzzle","Mate in 2 puzzle"],fork:["Pin puzzle","Skewer puzzle","Hanging piece puzzle","Mate in 1 puzzle"],pin:["Fork puzzle","Skewer puzzle","Discovered attack puzzle","Mate in 1 puzzle"],skewer:["Pin puzzle","Fork puzzle","Discovered attack puzzle","Endgame puzzle"],endgame:["Pawn endgame puzzle","Rook endgame puzzle","Promotion puzzle","Mate in 2 puzzle"],sacrifice:["Deflection puzzle","Attraction puzzle","Mate in 2 puzzle","Fork puzzle"],mate:["Mate in 1 puzzle","Mate in 2 puzzle","Back rank puzzle","Smothered mate puzzle"]};
const BASE=["Mate in 1 puzzle","Mate in 2 puzzle","Fork puzzle","Pin puzzle","Back rank puzzle","Endgame puzzle"];
const relFor=th=>(REL[th&&th.a]||BASE).slice(0,4).concat(["Random puzzle"]);
const theme=n=>{for(const t of TH)if(t[0].test(n))return{a:t[1],l:t[2]};return null};
let CUR=null;
function parse(j){try{const g=new Chess();if(!g.load_pgn(j.game.pgn))return null;const H=g.history({verbose:true}),sol=j.puzzle.solution,ip=j.puzzle.initialPly;
 for(const n of [H.length,ip+1,ip]){if(!(n>=1&&n<=H.length))continue;const c=new Chess();for(let i=0;i<n;i++)c.move(H[i]);const fen=c.fen(),h=new Chess(fen),mv=[];let ok=true;
  for(const x of sol){const m=h.move({from:x.slice(0,2),to:x.slice(2,4),promotion:x[4]});if(!m){ok=false;break}mv.push(m.san)}
  if(ok&&mv.length)return{fen,mv}}}catch(e){}return null}
async function lch(th){
 const d="difficulty="+["easier","normal","harder"][+localStorage.clv||0],a=th&&th.a?"angle="+th.a+"&":"";
 for(const u of ["https://lichess.org/api/puzzle/next?"+a+d,"https://lichess.org/api/puzzle/next?"+a.replace(/&$/,"")]){
  for(let k=0;k<3;k++){const j=await J(u);if(!j||!j.puzzle||!j.game)break;if(seen.has(j.puzzle.id))continue;const r=parse(j);
   if(r){seen.add(j.puzzle.id);mount("<b>"+(th&&th.l?esc(th.l):"Puzzle")+"</b> · rating "+j.puzzle.rating,r.fen,r.mv,relFor(th));return true}}}
 return false}
async function start(th){
 CUR=th;if(!await lib())return off(th);
 const tr=th?[lch]:Math.random()<.5?[ccom,lch]:[lch,ccom];
 for(const f of tr)if(await f(th))return;
 off(th)}
async function rnd(){return start(CUR)}
const prev=ask,WQ=/^(what|why|how|explain|tell|define|who|when|where|should|does|do|is|are|can|which)\b/i;
ask=async function(v){
 const n=v.trim();
 if(P&&!P.dead&&/^(show )?(the )?(solution|answer)$/i.test(n)){add("user",v);if(th){th.remove();th=null}return P.sol()}
 if(/^(offline|easy|beginner|local|starter) puzzle$/i.test(n)){add("user",v);return local()||off()}
 if(/^(next|another|more|new) puzzle$/i.test(n)){add("user",v);return start(CUR)}
 if(/\bpuzzles?\b/i.test(n)&&!WQ.test(n)){add("user",v);return start(/^random puzzle$/i.test(n)?null:theme(n))}
 return prev(v)};
})();
