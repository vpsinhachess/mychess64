CHESSA.reg("live","Free live info: Lichess, Chess.com, tablebase, tips");
(function(){
const {fix,boardHTML,lib,esc}=window.cx;
const bot=(h,m,c)=>window.botUI(h,m,c);
const J=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),7000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const off=()=>bot("I couldn't reach the free chess service right now. Check your internet and try again.");
const lk=(u,t)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener" style="color:#ffe4a3">'+t+' ↗</a>';
const base=ask;let pz=null;q.maxLength=4000;
const sans=(fen,u)=>{const h=new Chess(fen),o=[];for(const x of u){const m=h.move({from:x.slice(0,2),to:x.slice(2,4),promotion:x[4]});if(!m)break;o.push(m.san)}return o};
async function puzzle(){
 if(!await lib())return off();
 const j=await J("https://lichess.org/api/puzzle/daily");if(!j)return off();
 const g=new Chess();g.load_pgn(j.game.pgn);
 pz={fen:g.fen(),sol:j.puzzle.solution,url:"https://lichess.org/training/"+j.puzzle.id};
 bot("<b>Daily puzzle</b> · rating "+j.puzzle.rating+"\n"+boardHTML(g)+"<b>"+(g.turn()=="w"?"White":"Black")+" to move — find the best move!</b>",["🧩 Lichess daily puzzle"],["Show solution"])}
async function player(u){
 const c=await J("https://api.chess.com/pub/player/"+encodeURIComponent(u.toLowerCase())+"/stats");
 if(c&&(c.chess_rapid||c.chess_blitz||c.chess_bullet)){const r=k=>c[k]&&c[k].last?c[k].last.rating:"–";
  return bot("<b>"+esc(u)+"</b> on Chess.com\nRapid "+r("chess_rapid")+" · Blitz "+r("chess_blitz")+" · Bullet "+r("chess_bullet")+(c.tactics&&c.tactics.highest?"\nBest puzzle rating "+c.tactics.highest.rating:""),["♟ Chess.com public data"])}
 const l=await J("https://lichess.org/api/user/"+encodeURIComponent(u));
 if(l&&l.perfs){const p=l.perfs,r=k=>p[k]?p[k].rating:"–";
  return bot("<b>"+esc(l.username)+"</b> on Lichess\nBullet "+r("bullet")+" · Blitz "+r("blitz")+" · Rapid "+r("rapid")+" · Classical "+r("classical")+"\nGames played: "+(l.count?l.count.all:"–"),["♟ Lichess public data"])}
 bot("I couldn't find a player named <b>"+esc(u)+"</b> on Chess.com or Lichess.")}
async function tb(p,side){
 const j=await J("https://tablebase.lichess.ovh/standard?fen="+encodeURIComponent(p+" "+side+" - - 0 1"));if(!j||!j.category)return;
 const me=side=="w"?"White":"Black",ot=side=="w"?"Black":"White",c=j.category,m=j.moves&&j.moves[0];
 const r=c=="win"?me+" wins":c=="loss"?ot+" wins":c=="draw"?"Draw":c=="cursed-win"?me+" is winning, but the 50-move rule makes it a draw":c=="blessed-loss"?ot+" is winning, but the 50-move rule saves "+me+" (draw)":"Unknown";
 bot("<b>Endgame tablebase (perfect play):</b> "+r+(j.dtm?" — mate in "+Math.ceil(Math.abs(j.dtm)/2)+" moves":"")+(m?"\nBest move: "+esc(m.san):""),["♟ Lichess tablebase"])}
async function pgn(v){
 if(!await lib())return off();
 const t=v.replace(/\]\s*\[/g,"]\n[").replace(/\]\s+(?=1\s*\.)/,"]\n\n"),g=new Chess();
 if(!g.load_pgn(t))return bot("I couldn't read that PGN. Check that the moves are complete and legal.");
 const h=g.header(),n=g.history().length;
 bot("<b>"+esc(h.White||"White")+" vs "+esc(h.Black||"Black")+"</b>"+(h.Event?" · "+esc(h.Event):"")+"\nResult: "+esc(h.Result||"*")+" · "+Math.ceil(n/2)+" moves"+(g.in_checkmate()?" · ended in checkmate":"")+"\n"+boardHTML(g)+"Final position shown.",["♟ PGN Summary"],["Analyze your own games"])}
const tips=DB.filter(e=>/Golden|Quote|Training/.test(e.topic));
ask=async function(v){
 try{
  const n=v.trim();
  if(/^(give me a |show me a |today'?s )?(daily )?puzzle( of the day)?$/i.test(n)){add("user",v);return await puzzle()}
  if(pz&&/^(show )?(the )?(solution|answer)$/i.test(n)){add("user",v);return bot("<b>Solution:</b> "+esc(sans(pz.fen,pz.sol).join(" ")||"see Lichess"),[lk(pz.url,"Open on Lichess")])}
  const pm=n.match(/^(?:player|profile|lichess|chess\.?com|rating of)\s+(?:of\s+)?([\w-]{2,30})$/i);if(pm&&!/^(puzzles?|tips?|quotes?|openings?|tablebase|analysis|games?|app|rules?|help)$/i.test(pm[1])){add("user",v);return await player(pm[1])}
  if(/^(another |random |daily |chess )?(tip|quote)( please)?$/i.test(n)){add("user",v);const e=tips[Math.floor(Math.random()*tips.length)];return bot("<b>"+esc(e.title)+"</b>\n"+esc(e.answer),["♟ "+esc(e.topic)],["Another tip"])}
  if(/\[(Event|White|Black|Result|Site)\s+"/.test(v)){add("user",n.slice(0,50)+"…");return await pgn(v)}
  const fm=v.match(/((?:[rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+)(?:\s+([wb])\b)?/);
  if(fm){await base(v);if((fm[1].match(/[a-zA-Z]/g)||[]).length<=7)await tb(fm[1],fm[2]||"w");return}
  return base(v)
 }catch(e){bot("Sorry, something went wrong. Please try again.")}
};
const vb=document.createElement("button");vb.className="ib";vb.title="Voice speed";vb.textContent="1×";vb.style.fontSize="12px";
const R=[[.98,"1×"],[.8,"0.8×"],[1.25,"1.3×"]];let ri=0;vb.onclick=()=>{ri=(ri+1)%3;window.vr=R[ri][0];vb.textContent=R[ri][1]};
document.getElementById("vc").before(vb);
})();
