/* Board drawing */
function draw(){const b=$('#bd');b.innerHTML='';
for(let r=0;r<8;r++)for(let c=0;c<8;c++){const fi=S.flip?7-c:c,rk=S.flip?r+1:8-r,sq=F[fi]+rk,d=document.createElement('div');
d.className='sq '+((fi+rk)%2?'d':'l')+' '+(S.mk[sq]||'');d.dataset.s=sq;
const p=S.pc[sq];if(p){d.innerHTML=SVG(p[0],p[1]);if(S.an[sq])d.firstChild.classList.add('pin');if(S.lb&&S.lb[sq]!==undefined)d.innerHTML+='<i class="pt">'+S.lb[sq]+'</i>'}
if(S.co==='all')d.innerHTML+='<i class="co" style="left:4px;top:3px">'+sq+'</i>';
else if(S.co==='edge'){if(r===7)d.innerHTML+='<i class="co" style="right:4px;bottom:2px">'+F[fi]+'</i>';if(c===0)d.innerHTML+='<i class="co" style="left:4px;top:2px">'+rk+'</i>'}
b.appendChild(d)}S.an={};arrows()}
function arrows(){const o=$('#ar');o&&o.remove();if(!S.ar||!S.ar.length)return;
const P=q=>{const f=F.indexOf(q[0]),r=+q[1];return[(S.flip?7-f:f)+.5,(S.flip?r-1:8-r)+.5]};let s='';
S.ar.forEach(([a,b,col,kn])=>{const[x1,y1]=P(a),[x2,y2]=P(b),c=col||'#15781B',pts=[[x1,y1]];
if(kn)pts.push(Math.abs(y2-y1)>Math.abs(x2-x1)?[x1,y2]:[x2,y1]);pts.push([x2,y2]);
const[px,py]=pts[pts.length-2],dx=x2-px,dy=y2-py,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,hl=.45,hw=.3,bx=x2-ux*hl,by=y2-uy*hl,sh=pts.slice(0,-1).concat([[bx,by]]).map(p=>p.join(',')).join(' ');
s+=`<g opacity=".85" fill="${c}" stroke="${c}"><polyline points="${sh}" fill="none" stroke-width=".17" stroke-linecap="round" stroke-linejoin="round"/><polygon stroke="none" points="${x2},${y2} ${bx-uy*hw},${by+ux*hw} ${bx+uy*hw},${by-ux*hw}"/></g>`});
$('#bw').insertAdjacentHTML('beforeend','<svg id="ar" viewBox="0 0 8 8">'+s+'</svg>')}
function go(){draw();$('#pn').innerHTML=`<h2>${M.n}</h2><div class="mu">${M.d}</div>`+M.p();live()}
$('#bd').onclick=e=>{const s=e.target.closest('.sq');if(s&&M.c)M.c(s.dataset.s)};
$('#pn').onclick=e=>{const b=e.target.closest('[data-a]');if(b&&!b.disabled&&M.a)M.a(b.dataset.a,b.dataset.v)};
$('#flip').onclick=()=>{S.flip=!S.flip;draw()};
const vi=()=>{$('#snd').textContent=vol?'🔊':'🔇'};
$('#snd').onclick=()=>{vol=vol?0:1;$('#vol').value=vol;vi()};
$('#vol').oninput=e=>{vol=+e.target.value;vi()};$('#vol').onchange=()=>snd('move');
$('#theme').onclick=()=>{const r=document.documentElement,d=(r.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))==='dark';r.dataset.theme=d?'light':'dark';$('#theme').textContent=d?'☾':'☀'};
document.addEventListener('pointerdown',e=>{if(e.target.closest('.b,.tc'))snd('click')});

