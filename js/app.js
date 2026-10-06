/* App shell: UI, character, drop-in text effect, voice, message rendering */
const AV='<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5cff"/><stop offset="1" stop-color="#3a1a8f"/></linearGradient><linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#d9981f"/></linearGradient><radialGradient id="ey" cx=".4" cy=".35"><stop offset="0" stop-color="#d8fbff"/><stop offset=".55" stop-color="#3fd7ff"/><stop offset="1" stop-color="#1b6bff"/></radialGradient></defs><path d="M36 125C22 62 58 14 100 14s78 48 64 111c-4 22-10 42-22 56H58c-12-14-18-34-22-56z" fill="url(#hg)"/><path d="M36 200c0-34 26-46 64-46s64 12 64 46z" fill="#1d1250"/><path d="M70 160l30 26 30-26" stroke="url(#gd)" stroke-width="5" fill="none" stroke-linejoin="round"/><circle cx="100" cy="186" r="5" fill="#5ee6ff" class="glow"/><rect x="89" y="136" width="22" height="28" rx="9" fill="#e8bfa8"/><ellipse cx="100" cy="102" rx="40" ry="46" fill="#f9dfcd"/><path d="M56 96c8-36 36-44 48-44 18 0 36 12 40 44-14-20-32-24-48-22-16 2-30 8-40 22z" fill="url(#hg)"/><path d="M62 70l-16 44M138 70l16 44" stroke="#5ee6ff" stroke-width="2" opacity=".6" class="glow"/><g class="eye"><ellipse cx="82" cy="106" rx="9" ry="11" fill="url(#ey)"/><circle cx="85" cy="102" r="3" fill="#fff"/></g><g class="eye"><ellipse cx="118" cy="106" rx="9" ry="11" fill="url(#ey)"/><circle cx="121" cy="102" r="3" fill="#fff"/></g><path d="M71 92q10-6 20-1M109 91q10-5 20 1" stroke="#4a2a8f" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="72" cy="124" r="6" fill="#ff7ad9" opacity=".3"/><circle cx="128" cy="124" r="6" fill="#ff7ad9" opacity=".3"/><path class="sm" d="M90 127q10 8 20 0" stroke="#c0405f" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse class="mo" cx="100" cy="128" rx="7" ry="2.4" fill="#b8324f"/><path d="M68 46l8-24 14 14 10-22 10 22 14-14 8 24z" fill="url(#gd)" stroke="#a8700f" stroke-width="1.5" stroke-linejoin="round"/><circle cx="76" cy="21" r="3.5" fill="#fff"/><circle cx="100" cy="12" r="4" fill="#fff"/><circle cx="124" cy="21" r="3.5" fill="#fff"/><circle cx="100" cy="62" r="4.5" fill="#ff7ad9" class="glow"/></svg>';
const $=id=>document.getElementById(id),el=(t,c)=>{const e=document.createElement(t);if(c)e.className=c;return e};
const chat=$("chat"),q=$("q"),send=$("send"),main=$("main");
$("big").innerHTML=AV;$("mini").innerHTML=AV;
const SAMPLE=["Daily puzzle","Quiz me","Random opening","Top players"];
SAMPLE.forEach(t=>{const b=el("button","chip");b.textContent=t;b.onclick=()=>{q.value=t;send.click()};$("sug").append(b)});
const fx=$("fx");for(let i=0;i<14;i++){const s=el("i");s.textContent="♟♞♝♜♛♚"[i%6];s.style.cssText="left:"+(i*7.3%100)+"%;font-size:"+(26+i*4%40)+"px;animation-duration:"+(22+i*3%18)+"s;animation-delay:-"+(i*4%20)+"s";fx.append(s)}
const G=s=>window.Intl&&Intl.Segmenter?[...new Intl.Segmenter(undefined,{granularity:"grapheme"}).segment(s)].map(x=>x.segment):[...s];
function drop(root,sp){let n=0,i=0;const w=document.createTreeWalker(root,4),ns=[];while(w.nextNode())ns.push(w.currentNode);
 const inB=x=>x.parentElement.closest('[style*="grid"]');ns.forEach(x=>{if(!inB(x))n+=x.textContent.length});
 const S=(sp||Math.max(9,Math.min(26,6000/Math.max(n,1))))*(window.tsm||1);
 ns.forEach(x=>{if(inB(x))return;const f=document.createDocumentFragment();x.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.append(p);return}const wd=el("span","w");G(p).forEach(ch=>{const s=el("span","c");s.textContent=ch;s.style.animationDelay=(i++*S)+"ms";wd.append(s)});f.append(wd)});x.replaceWith(f)});return i*S+500}
drop($("t1"),110);drop($("t2"),35);
let vOn=localStorage.cv!=="0",voice,th=null;
function pv(){const v=speechSynthesis.getVoices();voice=v.find(x=>/^en/i.test(x.lang)&&/female|zira|samantha|aria|jenny|google uk english female|karen|moira|tessa|hazel|susan/i.test(x.name))||v.find(x=>/^en/i.test(x.lang))}
if(window.speechSynthesis){pv();speechSynthesis.onvoiceschanged=pv}else $("vc").style.display="none";
const body=document.body;
function speak(s){if(!vOn||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s.replace(/[♟♞♝♜♛♚]/g,"").replace(/\s+/g," ").replace(/\b(\d)\.(?=[a-hKQRBNO])/g,"$1 "));if(window.pv2){const x=window.pv2(s);u.lang=x.lang;if(x.voice)u.voice=x.voice}else if(voice)u.voice=voice;u.pitch=window.vp||1.12;u.rate=window.vr||.98;u.onstart=()=>body.classList.add("talk");u.onend=u.onerror=()=>body.classList.remove("talk");speechSynthesis.speak(u)}
function stopV(){if(window.speechSynthesis)speechSynthesis.cancel();body.classList.remove("talk")}
$("vc").onclick=()=>{vOn=!vOn;localStorage.cv=vOn?"1":"0";$("vc").textContent=vOn?"🔊":"🔇";$("vc").classList.toggle("on",vOn);if(!vOn)stopV()};
$("vc").textContent=vOn?"🔊":"🔇";$("vc").classList.toggle("on",vOn);
const sc=()=>main.scrollTo({top:main.scrollHeight});
function think(){if(th)th.remove();th=el("div","msg bot");th.innerHTML='<div class="av">♛</div><div class="bubble"><div class="dots"><i></i><i></i><i></i></div></div>';chat.append(th);sc()}
function add(role,text){body.classList.add("chat");stopV();const r=el("div","msg "+role),b=el("div","bubble");b.textContent=text;r.append(b);chat.append(r);sc();if(role=="user")think()}
window.botUI=function(html,meta,chips){
 const wait=/Analyzing/.test(html),row=el("div","msg bot"),a=el("div","av"),b=el("div","bubble"),t=el("div","txt");a.textContent="♛";t.innerHTML=html;b.append(t);row.append(a,b);
 const go=()=>{if(th){th.remove();th=null}chat.append(row);row.style.display="";if(wait){sc();return}
  const sp=(t.cloneNode(true));sp.querySelectorAll('[style*="grid"]').forEach(x=>x.remove());const say=sp.textContent;
  const d=drop(t);const m=el("div","meta");m.style.animationDelay=d+"ms";(meta||[]).forEach(x=>{const s=el("span");s.innerHTML=x;m.append(s)});(chips||[]).forEach(x=>{const s=el("span","rl");s.textContent="↪ "+x;s.onclick=()=>{q.value=x;send.click()};m.append(s)});if(m.children.length)b.append(m);
  speak(say);const iv=setInterval(sc,120);setTimeout(()=>{clearInterval(iv);sc()},d+700)};
 if(wait){if(th){th.remove();th=null}go()}else{row.style.display="none";setTimeout(go,th?700:0)}
 return b};
$("clear").onclick=()=>{stopV();chat.innerHTML="";th=null;lastTopic="";body.classList.remove("chat")};
send.onclick=()=>{const v=q.value.trim();if(v){q.value="";ask(v)}};
q.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();send.click()}};
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SR){const r=new SR();r.lang="en-US";r.onresult=e=>{q.value=e.results[0][0].transcript;send.click()};r.onend=()=>$("mic").classList.remove("rec");$("mic").onclick=()=>{stopV();try{r.start();$("mic").classList.add("rec")}catch(e){}}}else $("mic").style.display="none";
var ask;
