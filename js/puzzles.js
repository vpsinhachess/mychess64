/* Interactive puzzles: tap a piece, tap a square. Uses chess.js (rules) + Engine (hints). */
window.Puz={idx:{},
list(t){return t==='daily'?PUZZLES:PUZZLES.filter(p=>p.t===t)},
pick(t){const L=this.list(t);if(!L.length)return null;if(t==='daily')return L[new Date().getDate()%L.length];const i=this.idx[t]=((this.idx[t]??-1)+1)%L.length;return L[i]},
start(t,again){const p=again||this.pick(t);if(!p)return UI.say('No puzzles of that type yet.');
 if(typeof Chess==='undefined')return UI.say('⚠️ The puzzle board needs an internet connection to load (chess.js). Please check your connection and refresh.');
 const G={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'},NM={p:'pawn',n:'knight',b:'bishop',r:'rook',q:'queen',k:'king'},s={g:new Chess(p.fen),ply:0,sel:null,hl:[],last:[],hint:[],done:0,tries:0};
 const side=s.g.turn()==='w'?'White':'Black',uci=u=>({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});
 const m=UI.say('<b>🧩 '+esc(p.title)+'</b>\n'+side+' to move. Tap a piece, then tap where it goes.<div class="pb"></div><div class="st"></div>',
  [UI.chip('💡 Hint',()=>hint()),UI.chip('🤖 Engine',()=>eng()),UI.chip('👀 Solution',()=>sol()),UI.chip('➡ Next',()=>Puz.start(t==='daily'?'daily':p.t)),UI.chip('🔁 Restart',()=>Puz.start(t,p))],'');
 const st=h=>m.querySelector('.st').innerHTML=h;
 const draw=()=>{const g=s.g,b=g.board(),inCk=g.in_check()?g.turn():'',pb=m.querySelector('.pb');let h='<div class="board pz">';
  for(let r=0;r<8;r++)for(let f=0;f<8;f++){const sq='abcdefgh'[f]+(8-r),c=b[r][f],cl=[(r+f)%2?'d':'l'];
   if(c)cl.push(c.color==='w'?'pw':'pk');if(sq===s.sel)cl.push('sel');if(s.hl.includes(sq))cl.push(c?'cap':'mv');if(s.last.includes(sq))cl.push('last');if(s.hint.includes(sq))cl.push('hint');
   if(c&&c.type==='k'&&c.color===inCk)cl.push('chk');h+='<b data-s="'+sq+'" class="'+cl.join(' ')+'">'+(c?G[c.type]:'')+'</b>'}
  pb.innerHTML=h+'</div>';pb.onclick=e=>{const x=e.target.closest('[data-s]');x&&tap(x.dataset.s)}};
 const tap=sq=>{if(s.done)return;const g=s.g,pc=g.get(sq);s.hint=[];
  if(s.sel&&s.sel!==sq){const mv=g.moves({square:s.sel,verbose:true}).find(x=>x.to===sq);if(mv)return play(mv)}
  if(pc&&pc.color===g.turn()){s.sel=sq;s.hl=g.moves({square:sq,verbose:true}).map(x=>x.to)}else{s.sel=null;s.hl=[]}draw()};
 const play=mv=>{const g=s.g,u=mv.from+mv.to+(mv.promotion||''),last=s.ply===p.sol.length-1;
  g.move(mv);s.sel=null;s.hl=[];
  const ok=u===p.sol[s.ply]||(last&&p.t[0]==='m'&&g.in_checkmate());
  if(!ok){g.undo();s.tries++;st('❌ Not quite. Try another move, or tap 💡 Hint.');m.querySelector('.pb').classList.add('shake');setTimeout(()=>m.querySelector('.pb').classList.remove('shake'),400);return draw()}
  s.last=[mv.from,mv.to];s.ply++;
  if(s.ply>=p.sol.length||g.game_over()){s.done=1;draw();st('🎉 <b>Correct!</b> '+esc(p.why)+(s.tries?'':'\n⭐ First try!'));celebrate('🎉 Puzzle solved!');UI.speak('Congratulations! Well done! You solved the puzzle! Brilliant!',{happy:1});return}
  st('✅ Good move! Now I reply…');draw();
  setTimeout(()=>{const r=uci(p.sol[s.ply]);g.move(r);s.last=[r.from,r.to];s.ply++;draw();st('Your turn. Find the next move!')},650)};
 const exp=()=>uci(p.sol[s.ply]||p.sol[0]);
 const hint=()=>{if(s.done)return;const e=exp(),pc=s.g.get(e.from);s.sel=null;s.hl=[];
  if(s.hint.length===0){s.hint=[e.from];st('💡 '+esc(p.hint)+'\nHint 1: move the glowing <b>'+NM[pc.type]+'</b>. Tap 💡 again for more.')}
  else{s.hint=[e.from,e.to];st('💡 Hint 2: move the <b>'+NM[pc.type]+'</b> from <b>'+e.from+'</b> to the other glowing square!')}draw()};
 const eng=()=>{if(s.done)return;st('🤖 Engine is thinking…');Engine.best(s.g.fen(),r=>{if(!r)return st('The engine could not start.');s.hint=[r.from,r.to];s.sel=null;s.hl=[];draw();st('🤖 Engine suggests: <b>'+Engine.san(s.g.fen(),r)+'</b>')},10)};
 const sol=()=>{const g=new Chess(p.fen),o=[];p.sol.forEach(u=>{const r=g.move(uci(u));o.push(r.san)});s.done=1;draw();st('👀 Solution: <b>'+o.join('  ')+'</b>\n'+esc(p.why))};
 draw()}};
