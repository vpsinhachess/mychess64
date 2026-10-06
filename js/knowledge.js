CHESSA.reg("knowledge","KB retrieval, typo fixing, FEN/opening/notation/Elo answers");
(function(){
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
norm=function(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g," ").replace(/\s+/g," ").trim()};
const V=new Set();DB.forEach(e=>toks(e.key+" "+e.title).forEach(t=>V.add(t)));Object.keys(ALIASES).forEach(a=>V.add(a));
function lev(a,b){const m=[];for(let i=0;i<=a.length;i++)m[i]=[i];for(let j=1;j<=b.length;j++)m[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]==b[j-1]?0:1));return m[a.length][b.length]}
function fix(v){v=String(v).replace(/(\w)['’]s\b/g,"$1s").replace(/\bqueens\b/gi,"queen");
 return norm(v).replace(/([a-z]{2,})-([a-z]{2,})/g,"$1 $2").split(" ").map(t=>{if(t.length<5||V.has(t)||STOP.has(t))return t;let best=t,bd=t.length>7?3:2;for(const w of V){if(Math.abs(w.length-t.length)>2)continue;const x=lev(t,w);if(x<bd){bd=x;best=w}}return best}).join(" ")}
const CH=/chess|king|queen|rook|bishop|knight|pawn|check|mate|opening|endgame|middlegame|tactic|strateg|fen|pgn|fide|rating|elo|grandmaster|tournament|castl|gambit|sacrific|stalemate|promotion|zugzwang|opposition|variation|notation|board|move|piece|defense|defence|attack|blunder|puzzle|calculat|train|improve|plan|position|evaluat|file|rank|square|tempo|fork|pin|skewer|trap|clock|draw/;
const SANRE=/^(O-O(-O)?|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](=?[QRBN])?)[+#]?[!?]*$/;
const OPS="Ruy Lopez|C60|e4 e5 Nf3 Nc6 Bb5|ruy lopez,Italian Game: Giuoco Piano|C53|e4 e5 Nf3 Nc6 Bc4 Bc5|italian game,Italian Game|C50|e4 e5 Nf3 Nc6 Bc4|italian game,Scotch Game|C44|e4 e5 Nf3 Nc6 d4|scotch game,Vienna Game|C25|e4 e5 Nc3|vienna game,King's Gambit|C30|e4 e5 f4|,Petrov Defense|C42|e4 e5 Nf3 Nf6|,Sicilian Defense|B20|e4 c5|sicilian defense,Sicilian Najdorf|B90|e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6|sicilian defense,French Defense|C00|e4 e6|french defense,Caro-Kann Defense|B10|e4 c6|caro kann,Pirc Defense|B07|e4 d6 d4 Nf6 Nc3 g6|pirc defense,Modern Defense|B06|e4 g6|modern defense,Scandinavian Defense|B01|e4 d5|,Alekhine Defense|B02|e4 Nf6|,Queen's Gambit|D06|d4 d5 c4|queen gambit,Queen's Gambit Declined|D30|d4 d5 c4 e6|queen gambit declined,Queen's Gambit Accepted|D20|d4 d5 c4 dxc4|queen gambit accepted,Slav Defense|D10|d4 d5 c4 c6|,London System|D02|d4 d5 Nf3 Nf6 Bf4|london system,Nimzo-Indian Defense|E20|d4 Nf6 c4 e6 Nc3 Bb4|nimzo indian,Queen's Indian Defense|E12|d4 Nf6 c4 e6 Nf3 b6|,King's Indian Defense|E60|d4 Nf6 c4 g6|kings indian,Grünfeld Defense|D70|d4 Nf6 c4 g6 Nc3 d5|grunfeld defense,Dutch Defense|A80|d4 f5|,English Opening|A10|c4|english opening,Réti Opening|A04|Nf3|,Bird Opening|A02|f4|".split(",").map(s=>{const a=s.split("|");return{n:a[0],c:a[1],m:a[2].split(" "),k:a[3]}}).sort((a,b)=>b.m.length-a.m.length);
let lastE=null,lp;const seen=new Set();
function lib(){if(window.Chess)return Promise.resolve(1);return lp||(lp=new Promise(r=>{const s=document.createElement("script");s.src="lib/chess.min.js";s.onload=()=>r(1);s.onerror=()=>{s.remove();const c=document.createElement("script");c.src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js";c.onload=()=>r(1);c.onerror=()=>{lp=null;r(0)};document.head.appendChild(c)};document.head.appendChild(s)}))}
function bot(h,m,c){return window.botUI(h,m,c)}
function boardHTML(g){const U="https://cdn.jsdelivr.net/gh/lichess-org/lila@master/public/piece/cburnett/",G={p:"♟",n:"♞",b:"♝",r:"♜",q:"♛",k:"♚"};
 let h='<div style="display:grid;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(8,minmax(0,1fr));width:min(100%,320px);aspect-ratio:1;margin:8px 0;border-radius:8px;overflow:hidden;box-shadow:0 6px 20px #0008;white-space:normal">';
 g.board().forEach((r,i)=>r.forEach((c,j)=>{const k=c?c.color+c.type.toUpperCase():"";h+='<div style="position:relative;min-width:0;min-height:0;overflow:hidden;display:grid;place-items:center;font-size:20px;background:'+((i+j)%2?"#3d6a8f":"#c9d9e8")+'">'+(c?'<img draggable="false" alt="'+G[c.type]+'" data-p="'+k+'" src="'+U+k+'.svg" style="position:absolute;inset:0;width:100%;height:100%" onerror="if(!this.d){this.d=1;this.src=\'https://lichess1.org/assets/piece/cburnett/\'+this.dataset.p+\'.svg\'}else this.replaceWith(this.alt)">':"")+"</div>"}));
 return h+"</div>"}
const VAL={p:100,n:320,b:330,r:500,q:900,k:0};
function ev(g){let s=0;g.board().forEach((r,i)=>r.forEach((c,j)=>{if(!c)return;let v=VAL[c.type];if(c.type=="p")v+=(c.color=="w"?6-i:i-1)*6;if(c.type!="k")v+=(7-Math.abs(3.5-j)-Math.abs(3.5-i))*(c.type=="n"||c.type=="b"?3:1);s+=c.color=="w"?v:-v}));return s}
const ord=ms=>ms.sort((x,y)=>(y.captured?VAL[y.captured]:0)-(x.captured?VAL[x.captured]:0));
function nm(g,d,a,b){if(g.in_checkmate())return -99999-d;if(g.in_draw()||g.in_stalemate())return 0;if(!d){const e=ev(g);return g.turn()=="w"?e:-e}let best=-1e9;for(const m of ord(g.moves({verbose:true}))){g.move(m);const s=-nm(g,d-1,-b,-a);g.undo();if(s>best)best=s;if(s>a)a=s;if(a>=b)break}return best}
function pick(g,d){let best=null,bs=-1e9;for(const m of ord(g.moves({verbose:true}))){g.move(m);const s=-nm(g,d-1,-1e9,1e9);g.undo();if(s>bs){bs=s;best=m}}return[best,bs]}
async function cloud(fen){try{const c=new AbortController();setTimeout(()=>c.abort(),3500);const r=await fetch("https://lichess.org/api/cloud-eval?fen="+encodeURIComponent(fen),{signal:c.signal});if(!r.ok)return null;const j=await r.json(),p=j.pvs[0];return{cp:p.cp,mate:p.mate,mv:p.moves.split(" ").slice(0,5),depth:j.depth}}catch(e){return null}}
function uciToSan(fen,u){const h=new Chess(fen),o=[];for(const x of u){const m=h.move({from:x.slice(0,2),to:x.slice(2,4),promotion:x[4]});if(!m)break;o.push(m.san)}return o}
const fe=x=>(x>0?"+":"")+(x/100).toFixed(2);
async function analyze(raw){
 const w=bot("<i>Analyzing…</i>"),done=(h,m,c)=>{w.parentNode.remove();bot(h,m,c)};
 if(!await lib())return done("I couldn't load the chess-rules library (needs internet once). Try again, or use the Position panel on MyChess64.");
 const d=["w","-","-","0","1"],p=raw.trim().split(/\s+/),hadSide=p.length>1;while(p.length<6)p.push(d[p.length-1]);const fen=p.join(" ");
 const vf=new Chess().validate_fen(fen);
 if(!vf.valid)return done("That FEN isn't valid: "+esc(vf.error)+"\nCheck that every rank adds up to 8 squares and each side has exactly one king.");
 const g=new Chess(fen),fl=[p[0],p[1]=="w"?"b":"w",p[2],"-",p[4],p[5]].join(" ");
 if(new Chess(fl).in_check())return done("⚠ Illegal position: the side that is NOT to move has its king in check, so this position cannot occur in a real game.");
 const side=g.turn()=="w"?"White":"Black";let mw=0,mb=0;g.board().forEach(r=>r.forEach(c=>{if(c){const v=VAL[c.type]/100;c.color=="w"?mw+=v:mb+=v}}));
 const st=g.in_checkmate()?"Checkmate — "+(side=="White"?"Black":"White")+" wins.":g.in_stalemate()?"Stalemate — draw.":g.insufficient_material()?"Dead position — draw by insufficient material.":g.in_check()?side+" is in check.":"No check.";
 let h=(hadSide?"":"<i>Side to move not given — assumed White.</i>\n")+boardHTML(g)+"<b>"+side+" to move.</b> "+st+"\nLegal moves: "+g.moves().length+" · Material: White "+mw+" vs Black "+mb+" (pawn units)";
 if(!g.game_over()){
  const c=await cloud(fen);
  if(c){const s=uciToSan(fen,c.mv);h+="\n\n<b>Best line (Lichess cloud eval, depth "+c.depth+"):</b> "+esc(s.join(" "))+"\nEvaluation: "+(c.mate!=null?"mate in "+Math.abs(c.mate)+(c.mate>0?" for White":" for Black"):fe(c.cp)+" (White's view)")}
  else{await new Promise(r=>setTimeout(r,30));const dp=g.fen().split(" ")[0].replace(/[^a-zA-Z]/g,"").length>20?2:3,[m,s]=pick(g,dp),sc=g.turn()=="w"?s:-s;
   h+="\n\n<b>Suggested move (CHESSA mini-engine, depth "+dp+"):</b> "+esc(m.san)+"\nEvaluation: "+(Math.abs(sc)>90000?"forced mate":fe(sc))+" (White's view)\n<i>Offline mini-engine: solid for tactics, not Stockfish-level.</i>"}
 }
 done(h,["♟ Position Analysis","Rules: FIDE via chess.js"],["How to evaluate a position","Candidate moves from a position"])}
async function opening(v){
 const m=v.match(/(?:^|\s)1\s*\.\s*(.*)$/s);if(!m)return false;
 const mv=[];for(let x of m[1].replace(/\d+\s*\.{1,3}/g," ").replace(/[,;]/g," ").split(/\s+/).filter(Boolean)){x=x.replace(/^0-0-0/,"O-O-O").replace(/^0-0/,"O-O");if(!SANRE.test(x))break;mv.push(x.replace(/[!?]+$/,""))}
 if(!mv.length)return false;
 if(!await lib()){bot("I couldn't load the chess-rules library (needs internet once).");return true}
 const g=new Chess(),h=[];
 for(let i=0;i<mv.length;i++){const r=g.move(mv[i],{sloppy:true});if(!r){bot("⚠ Move "+(Math.floor(i/2)+1)+(i%2?"…":".")+" <b>"+esc(mv[i])+"</b> is illegal in this position.");return true}h.push(r.san)}
 const o=OPS.find(x=>x.m.length<=h.length&&x.m.every((y,i)=>h[i]==y)),e=o&&DB.find(z=>z.key==o.k);
 let t=o?"<b>"+esc(o.n)+"</b> (ECO "+o.c+")"+(e?"\n"+esc(e.answer):""):"All "+h.length+" moves are legal, but this line isn't in my opening table yet.";
 bot(t+"\n"+boardHTML(g)+"<b>"+(g.turn()=="w"?"White":"Black")+" to move.</b>"+(g.game_over()?" "+(g.in_checkmate()?"Checkmate.":"Game over."):""),["♟ Opening Recognition",esc(h.join(" "))],g.game_over()?null:["Candidate moves from a position"]);
 if(e){lastE=e;seen.add(e.title)}return true}
function explain(m){const P={K:"King",Q:"Queen",R:"Rook",B:"Bishop",N:"Knight"};
 if(/^O-O-O/.test(m))return"Queenside castling (O-O-O): the king goes to c1/c8 and the rook to d1/d8."+(/[+#]/.test(m)?" It also gives "+(/#/.test(m)?"checkmate":"check")+".":"");
 if(/^O-O/.test(m))return"Kingside castling (O-O): the king goes to g1/g8 and the rook to f1/f8."+(/[+#]/.test(m)?" It also gives "+(/#/.test(m)?"checkmate":"check")+".":"");
 const r=m.match(/^([KQRBN])?([a-h])?([1-8])?(x)?([a-h][1-8])(?:=([QRBN]))?([+#])?$/);if(!r)return null;
 let t=(P[r[1]]||"Pawn")+(r[2]||r[3]?(r[1]?" (the one on the "+(r[2]?r[2]+"-file":"rank "+r[3])+")":" from the "+r[2]+"-file"):"")+(r[4]?" captures on ":" moves to ")+r[5]+".";
 if(r[6])t+=" The pawn promotes to a "+P[r[6]]+".";if(r[7])t+=r[7]=="#"?" It is checkmate (#).":" It gives check (+).";return t}
const miss=v=>{try{const a=JSON.parse(localStorage.chessa_miss||"[]");a.push(v);localStorage.chessa_miss=JSON.stringify(a.slice(-100))}catch(e){}};
window.chessaMisses=()=>{try{return JSON.parse(localStorage.chessa_miss||"[]")}catch(e){return[]}};
function kb(v){
 const fx=fix(v),r=ranked(fx),b=r[0],e=DB[b[1]];
 if(!CH.test(fx)&&b[0]<9)return bot("♟ I'm CHESSA, the MyChess64 Chess Coach. I answer chess questions only — try rules, openings, tactics, strategy, endgames, FEN or training.",null,["Castling","How to stop blundering","Lucena position"]);
 if(b[0]<10){miss(v);return bot("♟ I couldn't find a reliable match. Did you mean one of these?",null,r.slice(0,3).map(x=>DB[x[1]].title))}
 lastE=e;seen.add(e.title);lastTopic=e.topic;
 let h=esc(e.answer);const s=r.slice(1).find(x=>DB[x[1]]!==e&&DB[x[1]].title!=e.title);
 if(s&&b[0]-s[0]<5&&s[0]>=20){const f=DB[s[1]];h+="\n\n<b>Also relevant — "+esc(f.title)+" ("+esc(f.topic)+"):</b> "+esc(f.answer);seen.add(f.title)}
 const rel=[];for(const x of r.slice(1,14)){if(x[0]<10)break;const t=DB[x[1]].title;if(t!=e.title&&!rel.includes(t))rel.push(t);if(rel.length>=3)break}
 bot(h,["♟ "+esc(e.topic),"📚 "+esc(e.ref),"Match "+Math.round(Math.min(1,b[0]/55)*100)+"%"],rel)}
ask=async function(v){
 if(!v)return;add("user",v);const n=norm(v);
 try{
  const fm=v.match(/((?:[rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+)(\s+[wb](?:\s+(?:[KQkq]{1,4}|-))?(?:\s+(?:[a-h][36]|-))?(?:\s+\d+){0,2})?/);
  if(fm)return await analyze(fm[1]+(fm[2]||""));
  const em=v.match(/(\d{3,4})\D{1,25}?(?:vs|v|against|and|versus)\D{0,12}?(\d{3,4})/i);
  if(em&&/elo|rating|expect|chance|win|probab|score/i.test(v)){const a=+em[1],b=+em[2],p=1/(1+Math.pow(10,(b-a)/400));return bot("A <b>"+a+"</b>-rated player is expected to score <b>"+(p*100).toFixed(1)+"%</b> against a <b>"+b+"</b>-rated player (draws count as half a point).\nElo formula: E = 1 / (1 + 10^((Rb − Ra) / 400)). With K=20, a win would change the rating by about +"+Math.round(20*(1-p))+".",["♟ Elo Calculator"],["Elo rating","FIDE rating"])}
  if(await opening(v))return;
  const sm=v.match(/(?:^|[\s(])(O-O(?:-O)?[+#]?|[KQRBN][a-h]?[1-8]?x?[a-h][1-8][+#]?|[a-h]x[a-h][1-8](?:=[QRBN])?[+#]?|[a-h][18]=[QRBN][+#]?)(?=$|[\s?.,!)])/);
  if(sm&&/mean|notation|san|what is|what's|explain|read|decode/i.test(v)){const t=explain(sm[1]);if(t)return bot("<b>"+esc(sm[1])+"</b> — "+t,["♟ Notation Decoder"],["SAN","PGN"])}
  if(/^(hi|hello|hey|namaste|hii+|good (morning|evening|afternoon))\b/.test(n)||/who are you|your name|what can you do|^help$/.test(n))return bot("Hi, I'm <b>CHESSA</b> ♛ Ask me about rules, openings, tactics or endgames. Paste a FEN or type moves, and I'll analyze them. Try “quiz me”, “random opening” or “puzzle”.",null,["1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6","What does Nxe5+ mean","Elo 1500 vs 1700 chance"]);
  if(/thank|thx|great|awesome|nice/.test(n)&&n.split(" ").length<6)return bot("You're welcome! Ask me anything else about chess ♟");
  if(/^(more|tell me more|why|example|examples|go on|continue|what else|next)$/.test(n)&&lastE){const x=DB.find(z=>z.topic==lastE.topic&&!seen.has(z.title));if(x){seen.add(x.title);lastE=x;return bot("<b>"+esc(x.title)+"</b>\n"+esc(x.answer),["♟ "+esc(x.topic),"📚 "+esc(x.ref)])}return bot("That's all I have on this topic — pick another from the cards above or ask something new.")}
  kb(v)
 }catch(err){bot("Sorry, something went wrong while analyzing that. Please try again.")}
};
window.cx={fix,CH,boardHTML,lib,esc,V};
})();

