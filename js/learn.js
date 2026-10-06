CHESSA.reg("learn","Quiz, opening database, Chess960, beginner mode");
(function(){
const {fix,boardHTML,lib,esc}=window.cx;
const bot=(h,m,c)=>window.botUI(h,m,c);
const J=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),7000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const off=()=>bot("I couldn't reach the free chess service right now. Check your internet and try again.");
const lk=(u,t)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener" style="color:#ffe4a3">'+t+' ↗</a>';
const pick=a=>a[Math.floor(Math.random()*a.length)],side=g=>g.turn()=="w"?"White":"Black";
/* ---------- MIC ---------- */
const mic=$("mic"),SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null;mic.style.display="";
const ph=()=>q.placeholder=localStorage.cl==="hi"?"CHESSA से पूछें…":"Ask CHESSA…";
const ERR={"not-allowed":"The microphone is blocked. Allow it in your browser's site settings (🔒 icon), then tap the mic again.","service-not-allowed":"This browser blocked speech recognition. Open the page over https or localhost and allow the microphone.","no-speech":"I didn't hear anything. Tap the mic and try again.","audio-capture":"No microphone was found on this device.","network":"Voice recognition needs an internet connection.","language-not-supported":"This browser doesn't support that voice language."};
mic.onclick=()=>{
 if(!SR){document.body.classList.add("chat");return bot("Voice input isn't supported in this browser. Please use Chrome, Edge or Safari.")}
 if(rec){rec.stop();return}
 stopV();const r=new SR();rec=r;let got="",bad=false;
 r.lang=localStorage.cl==="hi"?"hi-IN":"en-US";r.interimResults=true;r.maxAlternatives=1;
 r.onstart=()=>{mic.classList.add("rec");q.placeholder=r.lang=="hi-IN"?"सुन रही हूँ…":"Listening…"};
 r.onresult=e=>{let t="";for(const x of e.results)t+=x[0].transcript;got=t;q.value=t};
 r.onerror=e=>{if(ERR[e.error]){bad=e.error!="no-speech";document.body.classList.add("chat");bot(ERR[e.error])}};
 r.onend=()=>{rec=null;mic.classList.remove("rec");ph();if(got.trim()&&!bad)send.click()};
 try{r.start()}catch(e){rec=null}};
/* ---------- OPENING DATABASE (Lichess, CC0) ---------- */
let OD=null;
async function ops(){if(OD)return OD;
 const get=async c=>{for(const u of ["https://raw.githubusercontent.com/lichess-org/chess-openings/master/","https://cdn.jsdelivr.net/gh/lichess-org/chess-openings@master/"]){try{const r=await fetch(u+c+".tsv");if(r.ok)return await r.text()}catch(e){}}return""};
 const t=await Promise.all([..."abcde"].map(get)),o=[];
 t.forEach(x=>x.split("\n").slice(1).forEach(l=>{const p=l.split("\t");if(p.length>2)o.push({c:p[0],n:p[1],p:p[2].trim(),m:p[2].replace(/\d+\./g," ").trim().split(/\s+/)})}));
 return OD=o.length?o:null}
async function card(e){
 if(!await lib()){off();return true}const g=new Chess();e.m.forEach(x=>g.move(x,{sloppy:true}));
 bot("<b>"+esc(e.n)+"</b> (ECO "+e.c+")\nMoves: "+esc(e.p)+"\n"+boardHTML(g)+"<b>"+side(g)+" to move.</b>",["♟ Lichess opening database"],["Random opening"]);return true}
async function oname(s){
 const o=await ops();if(!o){off();return true}
 const ts=norm(s).split(" ").filter(w=>w.length>2&&!/^(opening|the|what|tell|about|explain|variation)$/.test(w));if(!ts.length)return false;
 let b=null,bs=0;for(const e of o){const nn=norm(e.n);let sc=0;for(const t of ts)if(nn.includes(t))sc++;if(sc>bs||(sc==bs&&b&&sc&&e.n.length<b.n.length)){bs=sc;b=e}}
 return b&&bs>=ts.length?card(b):false}
async function rop(){const o=await ops();if(!o)return off();return card(pick(o.filter(e=>e.m.length>=4&&e.m.length<=12)))}
async function odb(v){
 const o=await ops();if(!o)return;const k=v.search(/(?:^|\s)1\s*\./);
 const mv=v.slice(k).replace(/\d+\s*\.{1,3}/g," ").replace(/[,;]/g," ").split(/\s+/).filter(Boolean).map(x=>x.replace(/[!?]+$/,"").replace(/^0-0-0/,"O-O-O").replace(/^0-0/,"O-O"));
 let b=null;for(const e of o)if(e.m.length<=mv.length&&e.m.every((x,i)=>x==mv[i])&&(!b||e.m.length>b.m.length))b=e;
 if(b)bot("<b>Opening database:</b> "+esc(b.n)+" (ECO "+b.c+")",["♟ Lichess opening database"])}
/* ---------- CHESS.COM PUZZLES + LEADERBOARD ---------- */
let cz=null;
async function rpz(){
 if(!await lib())return off();const j=await J("https://api.chess.com/pub/puzzle/random");if(!j||!j.fen)return off();
 const g=new Chess(j.fen),h=new Chess(j.fen),san=[];
 (j.pgn||"").replace(/\[[^\]]*\]/g,"").replace(/\{[^}]*\}/g,"").replace(/\d+\.(\.\.)?/g," ").split(/\s+/).filter(Boolean).every(x=>{const m=h.move(x,{sloppy:true});if(m)san.push(m.san);return m});
 cz={san,url:j.url};
 bot("<b>Puzzle:</b> "+esc(j.title||"Chess puzzle")+"\n"+boardHTML(g)+"<b>"+side(g)+" to move — find the best move!</b>",["🧩 Chess.com puzzle"],["Show solution","Another puzzle"])}
async function top(){
 const j=await J("https://api.chess.com/pub/leaderboards");if(!j)return off();
 const f=(k,t)=>j[k]?"<b>"+t+"</b>\n"+j[k].slice(0,5).map((p,i)=>(i+1)+". "+esc(p.username)+" — "+p.score).join("\n"):"";
 bot([f("live_blitz","Blitz"),f("live_rapid","Rapid"),f("live_bullet","Bullet")].filter(Boolean).join("\n\n"),["🏆 Chess.com live leaderboards"],j.live_blitz?["Player "+j.live_blitz[0].username]:null)}
/* ---------- QUIZ ---------- */
let qz=null;
function quiz(){
 const e=pick(DB.filter(x=>!/Quote|History/.test(x.topic)&&x.title.length<32)),ws=(e.title+" "+e.key).split(/[^A-Za-z]+/).filter(w=>w.length>2&&!STOP.has(w.toLowerCase()));
 const t=ws.length?e.answer.replace(new RegExp("\\b("+ws.join("|")+")\\w*","gi"),"____"):e.answer;
 qz={e};bot("<b>Quiz:</b> What is this about?\n“"+esc(t)+"”",["🎯 "+esc(e.topic)],["Hint","Skip"])}
function qans(v){const u=toks(v),t=toks(qz.e.title),h=t.filter(w=>u.some(x=>x==w||(w.length>4&&x.length>4&&x.slice(0,4)==w.slice(0,4))));return(t.length&&h.length>=Math.ceil(t.length/2))||norm(v).includes(norm(qz.e.key))}
function qflow(v,n){
 if(/^hint$/i.test(n)){add("user",v);const t=qz.e.title;bot("Hint: it starts with “"+esc(t[0])+"” and has "+t.split(" ").length+" word(s).",null,["Skip"]);return true}
 if(/^(skip|pass|give up|answer|i don'?t know)$/i.test(n)){add("user",v);const e=qz.e;qz=null;bot("It was <b>"+esc(e.title)+"</b>.\n"+esc(e.answer),["🎯 "+esc(e.topic)],["Next quiz"]);return true}
 if(n.split(/\s+/).length<=6&&!/^(what|how|why|who|when|where|explain|tell|define|show|play|analy|top|player|puzzle|random)/i.test(n)){add("user",v);const e=qz.e,ok=qans(v);qz=null;bot((ok?"✅ Correct! ":"Not quite — it was ")+"<b>"+esc(e.title)+"</b>.\n"+esc(e.answer),["🎯 "+esc(e.topic)],["Next quiz"]);return true}
 qz=null;return false}
/* ---------- CHESS960 ---------- */
async function c960(){
 if(!await lib())return off();const b=Array(8).fill(""),fr=()=>b.map((x,i)=>x?null:i).filter(x=>x!==null);
 b[pick([0,2,4,6])]="b";b[pick([1,3,5,7])]="b";b[pick(fr())]="q";b[pick(fr())]="n";b[pick(fr())]="n";const e=fr();b[e[0]]="r";b[e[1]]="k";b[e[2]]="r";
 const w=b.join(""),fen=w+"/pppppppp/8/8/8/8/PPPPPPPP/"+w.toUpperCase()+" w - - 0 1";
 bot("<b>Chess960 position</b>\n"+boardHTML(new Chess(fen))+"FEN: "+esc(fen)+"\nCopy this FEN into MyChess64's custom position to play it.",["🎲 Fischer Random"],["Chess960"])}
/* ---------- BEGINNER MODE + RELATED QUESTIONS ---------- */
const GL="fork|one piece attacks two things at once;pin|a piece that can't move because something more valuable is behind it;skewer|a valuable piece must move and exposes the piece behind it;zugzwang|a position where every move you make makes things worse;tempo|one move of time;fianchetto|placing a bishop on the long diagonal next to the corner;gambit|giving away a pawn on purpose to get a faster attack;en passant|a special pawn capture right after an enemy pawn jumps two squares;castling|the king and rook swap places to make the king safe;stalemate|you have no legal move and are not in check, so it is a draw;opposition|kings face each other with one square between, so one must step aside;outpost|a strong square for a knight that enemy pawns can't attack;development|bringing your pieces off the back rank;promotion|a pawn reaching the last row becomes a stronger piece;blunder|a very bad mistake;sacrifice|giving up material to get something better;initiative|keeping your opponent busy answering your threats;prophylaxis|stopping your opponent's plan before it starts;fen|a line of text that describes a position;pgn|a text format that stores a whole game;elo|a number that shows playing strength;endgame|the last phase, with few pieces left;middlegame|the fight after the opening;passed pawn|a pawn with no enemy pawns in its way;discovered attack|moving one piece to reveal an attack by another;zwischenzug|an in-between move before the expected reply;blockade|a piece placed in front of an enemy pawn to stop it".split(";").map(x=>x.split("|"));
let last=null;const _o=window.botUI;
window.botUI=(h,m,c)=>{if(m&&m.some(x=>/📚/.test(x))){const d=document.createElement("div");d.innerHTML=h;last=d.textContent;c=["Explain like a beginner"].concat((c||[]).map(t=>/^(how|why|what|when|which|can|do|is|tell)\b/i.test(t)?t:"Tell me about "+t))}return _o(h,m,c)};
async function llm(t){try{if(!("LanguageModel" in self))return null;const o={expectedOutputs:[{type:"text",languages:["en"]}]};if(await LanguageModel.availability(o)!=="available")return null;
 const s=await LanguageModel.create({...o,initialPrompts:[{role:"system",content:"You are a friendly chess coach. Rewrite the text for a complete beginner in under 70 words, using short simple sentences, no jargon, and one everyday comparison."}]});
 return await Promise.race([s.prompt(t),new Promise(r=>setTimeout(()=>r(null),20000))])}catch(e){return null}}
async function eli(){
 if(!last)return bot("Ask me a chess question first, then tap “Explain like a beginner”.");
 let t=await llm(last);
 if(!t){const s=(last.match(/[^.!?]+[.!?]+/g)||[last]).slice(0,2).join(" ").trim(),lc=last.toLowerCase(),g=GL.filter(x=>new RegExp("\\b"+x[0]+"\\b").test(lc)).slice(0,4);
  t=s+(g.length?"\n\nWords to know:\n"+g.map(x=>"• "+x[0]+": "+x[1]).join("\n"):"")}
 bot("<b>💡 In simple words</b>\n"+esc(t),["💡 Beginner mode"],["Quiz me","Another tip"])}
/* ---------- ROUTER ---------- */
let sk=false;const _b=add;add=(r,t)=>{if(sk&&r=="user"){sk=false;return}_b(r,t)};
const prev=ask;
ask=async function(v){
 try{
  const n=v.trim();
  if(qz&&qflow(v,n))return;
  if(/^(explain (it )?(like|to) (a )?(beginner|child|kid|5)|explain like i'?m 5|eli5|simplify( it)?|in simple words|make it simple|i don'?t (understand|get it))\??$/i.test(n)){add("user",v);return await eli()}
  if(/^(?:next |another |new )?quiz(?: me)?$/i.test(n)){add("user",v);return quiz()}
  if(/^(?:random|another|new|next|more) puzzle$/i.test(n)){add("user",v);return await rpz()}
  if(/^(give me a |show me a |today'?s )?(daily )?puzzle( of the day)?$/i.test(n))cz=null;
  if(cz&&/^(show )?(the )?(solution|answer)$/i.test(n)){add("user",v);return bot("<b>Solution:</b> "+esc(cz.san.join(" ")||"see Chess.com"),[lk(cz.url,"Open on Chess.com")],["Another puzzle"])}
  if(/^(top players|best players|leaderboards?|top 5)$/i.test(n)){add("user",v);return await top()}
  if(/chess ?960|fischer ?random|random position/i.test(n)){add("user",v);return await c960()}
  if(/^(random opening|surprise me|opening of the day)$/i.test(n)){add("user",v);return await rop()}
  const om=n.match(/^opening\s+(.{3,60})$/i);
  if(om){add("user",v);if(await oname(om[1]))return;return bot("I couldn't find that opening. Try its common name, like “Najdorf” or “King's Gambit Accepted”.")}
  if(/(?:^|\s)1\s*\.\s*\S/.test(v)&&!/\[(Event|White)/.test(v)){await prev(v);return await odb(v)}
  if(/gambit|defen[cs]e|attack|variation|system/i.test(n)&&n.split(/\s+/).length>=2&&ranked(fix(v))[0][0]<10){add("user",v);if(await oname(n))return;sk=true}
  return prev(v)
 }catch(e){bot("Sorry, something went wrong. Please try again.")}
};
})();
