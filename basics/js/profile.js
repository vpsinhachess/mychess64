/* ===== Kid profile: mascot, name popup, scorecard popup, PDF ===== */
const MAS=()=>`<svg class="mas" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="46" fill="#ffe27a" stroke="#e0a800" stroke-width="4"/><circle cx="50" cy="52" r="38" fill="#fff6cf" opacity=".75"/><g transform="translate(5,6) scale(1.9)">${PS.wN}<circle cx="13.2" cy="27.8" r="1.8" fill="#ff7b9c" opacity=".8"/><path d="M7.4 29.8q1.6 1.6 3.4.2" fill="none" stroke="#000" stroke-width=".7" stroke-linecap="round"/><path d="M15.5 38.4q9 3.2 19 0l.7 3q-10.2 3.4-20.4 0z" fill="#ee5253" stroke="#000" stroke-width=".8"/><path d="M17.2 9.8l2.3-4.4 2.2 3.1 2.2-3.1 2.3 4.4z" fill="#ffd34d" stroke="#8a6500" stroke-width=".7" stroke-linejoin="round"/></g></svg>`;
let spoken=false,scT=null,scShown=0;
function pickVoice(){try{const v=speechSynthesis.getVoices();if(!v.length)return null;const en=v.filter(x=>/^en/i.test(x.lang));for(const p of ['Samantha','Google UK English Female','Google US English','Zira','Karen','Tessa','Moira','Female'])if(en.some(x=>x.name.includes(p)))return en.find(x=>x.name.includes(p));return en[0]||v[0]}catch(e){return null}}
function talk(on){document.querySelectorAll('.nmc .mas').forEach(m=>m.classList.toggle('talk',on))}
function say(text){if(!vol||!('speechSynthesis' in window))return false;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text),vx=pickVoice();u.pitch=1.9;u.rate=1.02;u.volume=1;if(vx){u.voice=vx;u.lang=vx.lang}else u.lang='en-US';u.onstart=()=>{spoken=true;talk(true)};u.onend=u.onerror=()=>talk(false);speechSynthesis.speak(u);return true}catch(e){return false}}
function updateChip(){$('#meN').textContent=PRO.name;$('#meBox').hidden=!PRO.name}
function askName(){const o=$('#nm');$('#nmi').value=PRO.name;$('#nmx').hidden=!PRO.name;$('#nme').hidden=true;$('#masA').innerHTML=MAS();o.hidden=false;hideScore(true);spoken=false;setTimeout(()=>$('#nmi').focus(),400);
const line='Hi! Enter your name, buddy!';say(line);['pointerdown','keydown'].forEach(ev=>o.addEventListener(ev,()=>{if(!spoken)say(line)},{once:true}))}
function submitName(){let n=$('#nmi').value.replace(/[\u0000-\u001f<>]/g,'').replace(/\s+/g,' ').trim();n=[...n].slice(0,18).join('');
if(!n){$('#nme').hidden=false;ret($('.nmc'),'shake');snd('bad');$('#nmi').focus();return}
PRO.name=n;saveP();$('#nm').hidden=true;try{speechSynthesis.cancel()}catch(e){}updateChip();snd('win');burst();say('Nice to meet you, '+n+'!')}
function scoreData(){let a=0,c=0,i=0;for(const k in PRO.tot){a+=PRO.tot[k].a;c+=PRO.tot[k].c;i+=PRO.tot[k].i}return{a,c,i,acc:a?Math.round(c/a*100):0,stars:done.size,best:PRO.best}}
function hideScore(now){clearTimeout(scT);const e=$('#sc');if(e.hidden)return;if(now){e.hidden=true;e.classList.remove('out');return}e.classList.add('out');setTimeout(()=>{e.hidden=true;e.classList.remove('out')},260)}
function showScore(auto){if(!PRO.name||!$('#nm').hidden)return;const d=scoreData(),e=$('#sc'),bar=$('#scB');
$('#scT').textContent=d.a?`Hi, ${PRO.name}! 👋`:`Welcome, ${PRO.name}! 🎉`;
$('#scS').innerHTML=`<span class="sy" title="Stars">⭐ <b>${d.stars}</b>/${MODS.length}</span><span class="sy" title="Correct">✅ <b>${d.c}</b></span><span class="sy" title="Incorrect">❌ <b>${d.i}</b></span><span class="sy" title="Best streak">🔥 <b>${d.best}</b></span><span class="sy" title="Accuracy">🎯 <b>${d.acc}%</b></span>`;
$('#masB').innerHTML=MAS();bar.style.display=auto?'':'none';if(auto){bar.style.animation='none';void bar.offsetWidth;bar.style.animation=''}
e.classList.remove('out');e.hidden=false;scShown=performance.now();clearTimeout(scT);if(auto)scT=setTimeout(()=>hideScore(),3000)}
function afterHome(){updateChip()}
document.addEventListener('pointerdown',ev=>{const e=$('#sc');if(e.hidden||performance.now()-scShown<400)return;if(ev.target.closest('#scD'))return;hideScore()},true);
$('#scx').onclick=()=>hideScore();$('#me').onclick=()=>showScore(false);$('#meE').onclick=()=>askName();
$('#nmgo').onclick=submitName;$('#nmx').onclick=()=>{$('#nm').hidden=true;try{speechSynthesis.cancel()}catch(e){}};$('#nmsp').onclick=()=>say('Hi! Enter your name, buddy!');
$('#nmi').addEventListener('keydown',e=>{if(e.key==='Enter')submitName();if(e.key==='Escape'&&PRO.name)$('#nmx').click()});
try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>{}}catch(e){}
$('#scD').onclick=async ev=>{ev.stopPropagation();clearTimeout(scT);$('#scB').style.display='none';const b=ev.currentTarget,safe=(PRO.name.normalize('NFKD').replace(/[^\w\- ]/g,'').trim().replace(/\s+/g,'-')||'Champion');b.disabled=true;b.textContent='⏳ Making your PDF…';
try{await loadPDF();const bytes=await buildScorecard(),r=await savePDF(`MyChess64-${safe}-Scorecard.pdf`,bytes);b.textContent=r==='declined'?'📄 Download PDF':'✅ PDF ready!'}catch(e){b.textContent='⚠️ Try again'}b.disabled=false;setTimeout(()=>{b.textContent='📄 Download PDF'},2600)};

