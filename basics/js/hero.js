/* ===== Animated mascot that greets the child when a topic opens ===== */
const HERO_URL='assets/img/hero.webp',HERO_STILL_URL='assets/img/hero-still.webp';
let hpT=null,hpShown=0,heroI=0;
const HERO_LINES=['Let’s solve it, {n}!','You can do it, {n}!','Ready, {n}? Let’s play!','Go {n}, go! 🚀','Show me your skills, {n}!'];
function hideHero(now){clearTimeout(hpT);const e=$('#hp');if(e.hidden)return;if(now){e.hidden=true;e.classList.remove('out');return}e.classList.add('out');setTimeout(()=>{e.hidden=true;e.classList.remove('out')},260)}
function showHero(i){if(!PRO.name||!$('#nm').hidden)return;const e=$('#hp');clearTimeout(hpT);
try{const im=new Image();im.className='hpimg';im.alt='';im.decoding='async';im.src=RM?HERO_STILL_URL:HERO_URL;$('#hpI').replaceChildren(im)}catch(err){$('#hpI').textContent=''}
$('#hpT').textContent=HERO_LINES[heroI++%HERO_LINES.length].replace('{n}',PRO.name);$('#hpS').textContent=EMO[i]+' '+MODS[i].n.split(' · ')[1];
e.classList.remove('out');e.hidden=false;hpShown=performance.now();hpT=setTimeout(()=>hideHero(),3400)}
document.addEventListener('pointerdown',()=>{if(!$('#hp').hidden&&performance.now()-hpShown>300)hideHero()},true);
$('#hpx').onclick=()=>hideHero();

