CHESSA.reg("tutor","Modes (Learn/Analyze/Puzzle/Quiz/Study/Coach), levels, coach tips");
(function(){
const {fix,boardHTML,lib,esc}=window.cx;
const bot=(h,m,c)=>window.botUI(h,m,c),pick=a=>a[Math.floor(Math.random()*a.length)];
const J=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),8000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const lk=(u,t)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener" style="color:#ffe4a3">'+t+' ↗</a>';
/* ---- levels, coach tips, common mistakes ---- */
const LV=["Beginner","Intermediate","Advanced"];let lvl=+localStorage.clv||0;
const TIPS=[[/open/i,"Develop knights and bishops, fight for the centre and castle early.","Moving the same piece twice or grabbing pawns while behind in development."],[/tactic/i,"Before every move ask: checks, captures, threats — for both sides.","Moving fast without checking what your opponent's last move threatens."],[/middle|strateg|plan/i,"Improve your worst-placed piece and make a plan before attacking.","Attacking without enough pieces, or playing with no plan."],[/end/i,"Activate your king and push passed pawns.","Leaving the king passive, or pushing a pawn without counting moves."],[/rule|fide/i,"Learn touch-move and the draw rules — they decide real games.","Giving up a lost game when stalemate or repetition could save it."],[/fen|pgn|notation/i,"Practise by writing your own games in algebraic notation.","Forgetting the side to move or castling rights in a FEN."],[/train|improve/i,"Do 15 minutes of tactics daily and review every loss.","Playing only blitz without reviewing your mistakes."],[/hist|play|theor/i,"Play through famous games and ask why each move was chosen.","Memorising moves without understanding the ideas."]];
const _o=window.botUI;
window.botUI=(h,m,c)=>{if(m&&m.some(x=>/📚/.test(x))&&!/Coach tip/.test(h)){
  if(lvl==0&&!/Also relevant/.test(h)){const x=h.match(/^([\s\S]*?[.!?])\s+([^.!?]*[.!?])/);if(x)h=x[1]+" "+x[2]}
  const tp=TIPS.find(x=>x[0].test(m.join(" ")));if(tp)h+="\n\n💡 <b>Coach tip:</b> "+tp[1]+(lvl>0?"\n⚠ <b>Common mistake:</b> "+tp[2]:"")+(lvl==2?"\n🎯 <b>Go deeper:</b> check this idea with the engine on your own games.":"")}
 return _o(h,m,c)};
/* ---- modes ---- */
const st=document.createElement("style");st.textContent="#modes{display:flex;gap:6px;overflow-x:auto;padding:0 14px 8px}#modes button{flex:none;border:1px solid var(--line);background:#ffffff0d;color:#e9e3ff;border-radius:99px;padding:7px 13px;font-size:13px;cursor:pointer}#modes button.on{border-color:var(--gold);color:#ffe4a3;background:#f5c65a1c}";document.head.append(st);
const bar=document.createElement("div");bar.id="modes";document.querySelector("header").after(bar);
const PLAN=["Beginner plan: learn how the pieces move and the basic checkmates, play one slow game a day, solve 10 easy puzzles and review one mistake.","Intermediate plan: 20 minutes of tactics, one opening line, one endgame theme (Lucena, Philidor) and a review of every loss.","Advanced plan: deep calculation, model games, a repertoire, engine review of your own games and rook-endgame drills."];
const say=(h,c)=>{document.body.classList.add("chat");bot(h,["🎓 "+LV[lvl]],c)};
const M={Learn:()=>say("Pick a lesson, or ask me anything:",[...new Set(Array.from({length:8},()=>pick(DB).title))].slice(0,4)),
 Analyze:()=>say("Paste a <b>FEN</b> or a full <b>PGN</b> and Stockfish will give the best move, the evaluation and any blunders or mistakes.",["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]),
 Puzzle:()=>{q.value="Daily puzzle";send.click()},Quiz:()=>{q.value="Quiz me";send.click()},
 Study:()=>say("<b>Study plan</b>\n"+PLAN[lvl],["Quiz me","Daily puzzle","Random opening"]),
 Coach:()=>say("Coach mode: what do you want to improve? I'll add a tip and the most common mistake to every answer.",["How to stop blundering","Lucena position","Zugzwang","Castling"])};
Object.keys(M).forEach(k=>{const b=document.createElement("button");b.textContent=k;b.onclick=()=>{[...bar.children].forEach(x=>x.classList.remove("on"));b.classList.add("on");M[k]()};bar.append(b)});
const lb=document.createElement("button");lb.className="ib";lb.style.fontSize="13px";lb.title="Level";
const ul=()=>lb.textContent=LV[lvl][0];lb.onclick=()=>{lvl=(lvl+1)%3;localStorage.clv=lvl;ul();say("Level set to <b>"+LV[lvl]+"</b>. Answers, tips and study plans now match this level.")};ul();
document.getElementById("vc").before(lb);
})();
