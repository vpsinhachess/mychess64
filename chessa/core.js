/* Helpers, mascot face, chess board renderer, celebration */
window.$=s=>document.querySelector(s);
window.esc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
window.norm=t=>' '+String(t).toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g,' ').trim()+' ';
window.FACE='<svg viewBox="0 0 100 100" aria-hidden="true"><path class="glow" d="M22 34l8-18 12 12 8-16 8 16 12-12 8 18z" fill="#f5c65a"/><circle cx="50" cy="60" r="28" fill="#ffe1c4"/><g fill="#2a1700"><ellipse class="eye" cx="40" cy="57" rx="3.5" ry="5"/><ellipse class="eye" cx="60" cy="57" rx="3.5" ry="5"/></g><path class="sm" d="M40 70q10 9 20 0" stroke="#c0392b" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse class="mo" cx="50" cy="72" rx="6" ry="3" fill="#c0392b"/><circle cx="33" cy="67" r="4" fill="#ff9aa8" opacity=".5"/><circle cx="67" cy="67" r="4" fill="#ff9aa8" opacity=".5"/></svg>';
window.board=fen=>{const P={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};let h='<div class="board">';
 fen.split(' ')[0].split('/').forEach((row,r)=>{let f=0;const sq=ch=>{h+=`<b class="${(r+f++)%2?'d':'l'} ${ch&&ch===ch.toUpperCase()?'w':'k'}">${ch?P[ch.toLowerCase()]:''}</b>`};
  for(const ch of row)/\d/.test(ch)?[...Array(+ch)].forEach(()=>sq('')):sq(ch)});
 return h+'</div>'};
(()=>{const cv=$('#confetti'),x=cv.getContext('2d');let P=[],on=0,tt;
const fit=()=>{const d=devicePixelRatio||1;cv.width=innerWidth*d;cv.height=innerHeight*d;x.setTransform(d,0,0,d,0,0)};fit();addEventListener('resize',fit);
const C=['#f5c65a','#5ee6ff','#ff7ad9','#7ef0b4','#fff','#a78bfa'],G=['♛','♞','♟','♜','★'];
const burst=(X,Y,n,sp)=>{for(let i=0;i<n;i++){const a=-Math.PI/2+(Math.random()-.5)*sp,v=7+Math.random()*10;P.push({X,Y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:0,vr:(Math.random()-.5)*.3,s:6+Math.random()*8,c:C[i%6],g:Math.random()<.25?G[i%5]:0,l:0})}};
const tick=()=>{x.clearRect(0,0,innerWidth,innerHeight);P=P.filter(p=>p.Y<innerHeight+30&&p.l<240);
 P.forEach(p=>{p.vy+=.28;p.vx*=.99;p.X+=p.vx;p.Y+=p.vy;p.r+=p.vr;p.l++;x.save();x.translate(p.X,p.Y);x.rotate(p.r);x.globalAlpha=1-p.l/240;x.fillStyle=p.c;
  p.g?(x.font=p.s*2+'px serif',x.fillText(p.g,0,0)):x.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);x.restore()});
 P.length?requestAnimationFrame(tick):(on=0)};
window.celebrate=m=>{if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const w=innerWidth,h=innerHeight;
 burst(w/2,h*.65,110,2.4);setTimeout(()=>{burst(w*.1,h*.85,70,1.1);burst(w*.9,h*.85,70,1.1)},180);setTimeout(()=>burst(w/2,h*.5,60,3),420);
 if(!on){on=1;requestAnimationFrame(tick)}}
 const t=$('#toast');t.textContent=m||'🏆 Well played!';t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2200)};
})();
