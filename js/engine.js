CHESSA.reg("engine","Stockfish WASM: best move, evaluation, blunder/mistake review");
(function(){
const {fix,boardHTML,lib,esc}=window.cx;
const bot=(h,m,c)=>window.botUI(h,m,c),pick=a=>a[Math.floor(Math.random()*a.length)];
const J=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),8000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const lk=(u,t)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener" style="color:#ffe4a3">'+t+' ↗</a>';
/* ---- Stockfish WASM (free, in-browser) ---- */
let SF=null,sfp=null;
function sfLoad(){return sfp||(sfp=(async()=>{
 const tries=[["https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-nnue-16-single.js","https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-nnue-16-single.wasm"],["https://cdn.jsdelivr.net/npm/stockfish@10.0.2/src/stockfish.js",""]];
 for(const [js,w] of tries){try{
  const wk=new Worker(URL.createObjectURL(new Blob(['importScripts("'+js+'");'],{type:"application/javascript"}))+(w?"#"+w:""));
  const ok=await new Promise(r=>{const t=setTimeout(()=>r(false),15000);wk.onmessage=e=>{if(String(e.data).includes("uciok")){clearTimeout(t);r(true)}};wk.onerror=()=>{clearTimeout(t);r(false)};wk.postMessage("uci")});
  if(ok){SF=wk;return wk}wk.terminate()}catch(e){}}
 sfp=null;return null})())}
function sfGo(fen,mt){return new Promise(res=>{const o={};SF.onmessage=e=>{const l=String(e.data);
 if(l.startsWith("info")&&l.includes(" pv ")){const m=l.match(/score (cp|mate) (-?\d+)/);if(m){delete o.cp;delete o.mate;o[m[1]]=+m[2]}o.pv=l.split(" pv ")[1].trim().split(" ");o.d=+(l.match(/depth (\d+)/)||[0,0])[1]}
 if(l.startsWith("bestmove")){clearTimeout(tm);o.best=l.split(" ")[1];res(o)}};const tm=setTimeout(()=>res(o),mt+8000);SF.postMessage("position fen "+fen);SF.postMessage("go movetime "+mt)})}
const sv=(o,t)=>(o.mate!=null?Math.sign(o.mate)*(10000-Math.abs(o.mate)*10):(o.cp||0))*(t=="w"?1:-1);
const fm=s=>Math.abs(s)>9000?(s>0?"+":"−")+"M":(s>0?"+":"")+(s/100).toFixed(2);
const sans=(fen,u)=>{const h=new Chess(fen),o=[];for(const x of u){const m=h.move({from:x.slice(0,2),to:x.slice(2,4),promotion:x[4]});if(!m)break;o.push(m.san)}return o};
const NM={p:"pawn",n:"knight",b:"bishop",r:"rook",q:"queen",k:"king"};
function why(fen,u,sc){const g=new Chess(fen),m=g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]});if(!m)return"";
 const a=Math.abs(sc),side=sc>0?"White":"Black";let t=[];
 if(m.san.includes("#"))t.push("it is checkmate");else{if(m.captured)t.push("it captures a "+NM[m.captured]);if(m.san.includes("+"))t.push("it gives check");if(m.flags.includes("k")||m.flags.includes("q"))t.push("it castles to safety");if(m.promotion)t.push("it promotes")}
 return(t.length?"Why: "+t.join(" and ")+". ":"")+(a>9000?side+" has a forced checkmate.":a<40?"The position is roughly equal.":a<150?side+" has a slight edge.":a<400?side+" has a clear advantage.":side+" is winning.")}
async function fenSF(fen){
 const g=new Chess(fen),w=bot("<i>Analyzing…</i>"),o=await sfGo(fen,1800);if(w&&w.parentNode)w.parentNode.remove();
 if(!o.pv)return bot(g.game_over()?"<b>"+(g.in_checkmate()?"Checkmate.":"Game over.")+"</b>\n"+boardHTML(g):"The engine didn't respond in time. Please try again.");
 const sc=sv(o,g.turn()),s=sans(fen,o.pv.slice(0,6));
 bot(boardHTML(g)+"<b>"+(g.turn()=="w"?"White":"Black")+" to move.</b>\nBest move: <b>"+esc(s[0])+"</b>\nEvaluation: <b>"+fm(sc)+"</b> (White's view)\nLine: "+esc(s.join(" "))+"\n"+why(fen,o.pv[0],sc),["♟ Stockfish · depth "+o.d],["Explain like a beginner","Quiz me"])}
async function review(v){
 if(!await lib())return;
 const t=v.replace(/^(analy[sz]e|review)\s*(game|pgn)?\s*/i,"").replace(/\]\s*\[/g,"]\n[").replace(/\]\s+(?=1\s*\.)/,"]\n\n"),g=new Chess();
 if(!g.load_pgn(t))return bot("I couldn't read that PGN. Check that the moves are complete and legal.");
 const hd=g.header(),H=g.history({verbose:true}).slice(0,80);
 const w=bot("<i>Stockfish is reviewing the game…</i>");
 if(!await sfLoad()){if(w&&w.parentNode)w.parentNode.remove();return bot("I couldn't load the Stockfish engine (it needs internet once). Try again in a moment.")}
 const c=new Chess(),E=[],B=[],F=[];
 for(let i=0;i<=H.length;i++){F.push(c.fen());
  if(c.game_over()){E.push(c.in_checkmate()?(c.turn()=="w"?-9999:9999):0);B.push("");break}
  const o=await sfGo(c.fen(),140);E.push(sv(o,c.turn()));B.push(o.pv?o.pv[0]:"");
  if(i<H.length)c.move({from:H[i].from,to:H[i].to,promotion:H[i].promotion})}
 const cap=x=>Math.max(-1500,Math.min(1500,x)),K={w:[0,0,0],b:[0,0,0]},L=[];
 for(let i=0;i<H.length&&i+1<E.length;i++){const m=H[i],u=m.from+m.to+(m.promotion||"");if(u==B[i])continue;
  const loss=(cap(E[i])-cap(E[i+1]))*(m.color=="w"?1:-1),k=loss>=300?0:loss>=150?1:loss>=70?2:-1;if(k<0)continue;K[m.color][k]++;
  const b=B[i]?sans(F[i],[B[i]])[0]:"",r=!b?"":b.includes("#")?"you missed a forced checkmate":b.includes("x")?"you missed winning material":b.includes("+")?"you missed a strong check":"a stronger plan existed";
  L.push({loss,t:Math.floor(i/2)+1+(m.color=="w"?". ":"… ")+m.san+(k==0?"??":k==1?"?":"?!")+" ("+["Blunder","Mistake","Inaccuracy"][k]+", −"+(loss/100).toFixed(1)+") — better "+b+": "+r})}
 L.sort((a,b)=>b.loss-a.loss);if(w&&w.parentNode)w.parentNode.remove();
 const sm=x=>x[0]+" blunder(s), "+x[1]+" mistake(s), "+x[2]+" inaccuracy(ies)";
 bot("<b>"+esc(hd.White||"White")+" vs "+esc(hd.Black||"Black")+"</b> · "+Math.ceil(H.length/2)+" moves\nWhite: "+sm(K.w)+"\nBlack: "+sm(K.b)+(L.length?"\n\n<b>Key moments</b>\n"+esc(L.slice(0,5).map(x=>x.t).join("\n")):"\n\nNo major errors found — well played!"),["♟ Stockfish game review"],["Quiz me","Study"])}

let sk=false;const _a=add;add=(r,t)=>{if(sk&&r=="user"){sk=false;return}_a(r,t)};
const prev=ask;
ask=async function(v){
 try{const n=v.trim();
  if(/\[(Event|White|Black|Result|Site)\s+"/.test(v)||(/^(analy[sz]e|review)/i.test(n)&&/(?:^|\s)1\s*\.\s*\S/.test(v))){add("user",n.slice(0,50)+"…");return await review(v)}
  const fm=v.match(/((?:[rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+)(?:\s+([wb])\b)?(?:\s+([KQkq-]{1,4}))?(?:\s+([a-h][36]|-))?(?:\s+(\d+))?(?:\s+(\d+))?/);
  if(fm&&await lib()){const fen=[fm[1],fm[2]||"w",fm[3]||"-",fm[4]||"-",fm[5]||"0",fm[6]||"1"].join(" ");
   if(new Chess().validate_fen(fen).valid){add("user",v);if(await sfLoad())return await fenSF(fen);sk=true}}
  return prev(v)
 }catch(e){bot("Sorry, something went wrong. Please try again.")}};
window.CHESSA.engine={analyzeFEN:fenSF,reviewPGN:review,load:sfLoad};
})();
