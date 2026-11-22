/* Effects */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function stars(n){if(RM)return;const r=$('#bw').getBoundingClientRect(),w=document.createElement('div');w.className='burst';
for(let i=0;i<n;i++){const a=6.283*i/n,d=110+Math.random()*170,e=document.createElement('div');e.className='sp';e.textContent=rnd(['⭐','✨','🌟','💫']);e.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d}px`;w.appendChild(e)}
document.body.appendChild(w);setTimeout(()=>w.remove(),1500)}
function burst(big){if(RM)return;const w=document.createElement('div');w.className='burst';
for(let i=0;i<(big?16:7);i++){const e=document.createElement('div');e.className='fp';e.innerHTML=SVG(rnd('wb'),rnd(T));e.style.cssText=`--x:${(Math.random()-.5)*(big?90:50)}vw;--y:-${45+Math.random()*50}vh;--r:${(Math.random()-.5)*720}deg;left:${12+Math.random()*76}%;animation-delay:${Math.random()*.3}s`;w.appendChild(e)}
const cl=['#ff6b6b','#feca57','#48dbfb','#1dd1a1','#ff9ff3','#54a0ff'];
for(let i=0;i<(big?70:26);i++){const e=document.createElement('i');e.className='cf';e.style.cssText=`background:${rnd(cl)};--x:${(Math.random()-.5)*220}px;left:${Math.random()*100}%;animation-delay:${Math.random()*.6}s`;w.appendChild(e)}
document.body.appendChild(w);setTimeout(()=>w.remove(),3200);stars(big?20:9)}
function ret(el,c){el.classList.remove(c);void el.offsetWidth;el.classList.add(c)}

function layer(ms){const w=document.createElement('div');w.className='burst';document.body.appendChild(w);setTimeout(()=>w.remove(),ms||3500);return w}
const CL=['#ff6b6b','#feca57','#48dbfb','#1dd1a1','#ff9ff3','#54a0ff','#ffffff','#ff9f43'];
function cannon(big){if(RM)return;const w=layer(3800),W=innerWidth,H=innerHeight;
for(let s=0;s<2;s++)for(let i=0;i<(big?46:16);i++){const e=document.createElement('i');e.className='cf2';e.style.cssText=`background:${rnd(CL)};left:${s?W-8:8}px;top:${H-8}px;border-radius:${rnd(['2px','50%','0'])};width:${6+Math.random()*8}px;height:${8+Math.random()*10}px`;
const dx=(s?-1:1)*W*(.1+Math.random()*.55),up=H*(.4+Math.random()*.5),rot=(Math.random()-.5)*1080;
e.animate([{transform:'translate(0,0) rotate(0)',opacity:1,easing:'ease-out'},{transform:`translate(${dx*.6}px,${-up}px) rotate(${rot*.5}deg)`,offset:.42,opacity:1,easing:'ease-in'},{transform:`translate(${dx}px,${H*.15}px) rotate(${rot}deg)`,opacity:0}],{duration:1700+Math.random()*1500,delay:Math.random()*250,fill:'forwards'});w.appendChild(e)}}
function fireworks(){if(RM)return;const W=innerWidth,H=innerHeight;for(let k=0;k<4;k++)setTimeout(()=>{const w=layer(1800),cx=W*(.18+Math.random()*.64),cy=H*(.12+Math.random()*.38),col=rnd(CL.slice(0,6));
for(let i=0;i<28;i++){const a=6.283*i/28,d=70+Math.random()*90,e=document.createElement('i');e.className='fw';e.style.cssText=`left:${cx}px;top:${cy}px;background:${col};box-shadow:0 0 8px 2px ${col}`;
e.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+30}px) scale(.3)`,opacity:0}],{duration:1100+Math.random()*300,easing:'cubic-bezier(.1,.7,.3,1)',fill:'forwards'});w.appendChild(e)}},k*260)}
function wave(big){if(RM)return;setTimeout(()=>[...document.querySelectorAll('#bd .pc')].forEach((e,i)=>e.animate([{transform:'translateY(0) scale(1) rotate(0)'},{transform:`translateY(-24%) scale(1.2) rotate(${i%2?10:-10}deg)`,offset:.4},{transform:'translateY(0) scale(1) rotate(0)'}],{duration:560,delay:big?i*30:Math.random()*90,easing:'ease-out'})),40)}
function banner(ok,ic,tx,ms){const f=$('#fb');f.className='fb '+(ok?'g':'r');f.innerHTML='<span class="bi">'+ic+'</span><small>'+tx+'</small>';f.hidden=false;clearTimeout(f.t);f.t=setTimeout(()=>f.hidden=true,ms||800)}
function win(){done.add(cur);snd('win');burst(1);cannon(1);fireworks();setTimeout(()=>wave(1),250);banner(1,'🏆','Congratulations!',1700)}
function feed(ok){const bw=$('#bw');
if(ok){if(streak&&streak%5===0){snd('win');burst(1);cannon(1);fireworks();wave(1);banner(1,'🌟','Amazing! '+streak+' in a row!',1600)}else{snd('good');burst();cannon(0);wave(0);banner(1,'✓',rnd(['Correct!','Great job!','Awesome!','Super!','Brilliant!']))}ret(bw,'glow')}
else{snd('bad');banner(0,'✕','Try again!');ret(bw,'shake')}}
function live(ks){const L=$('#live');L.hidden=!M.sc;if(!M.sc)return;
const v={a:st.a,c:st.c,i:st.i,s:streak},p=st.a?Math.round(st.c/st.a*100):0;
for(const q in v)L.querySelector('[data-k='+q+'] b').textContent=v[q];
$('#mt').style.width=p+'%';$('#pct').textContent=p+'%';
(ks||[]).forEach(k=>ret(L.querySelector('[data-k='+k+']'),'bump'))}
function hit(ok,big){st.a++;if(ok){st.c++;streak++;if(st.c>=5)done.add(cur)}else{st.i++;streak=0}live(['a',ok?'c':'i']);rec(ok);if(ok&&big)win();else feed(ok)}

