/* App shell: UI, character, drop-in text effect, voice, message rendering */
const AVT='<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hg@" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f8cff"/><stop offset="1" stop-color="#0a2a66"/></linearGradient><linearGradient id="gd@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#d9981f"/></linearGradient><radialGradient id="ey@" cx=".4" cy=".35"><stop offset="0" stop-color="#d8fbff"/><stop offset=".55" stop-color="#3fd7ff"/><stop offset="1" stop-color="#1b6bff"/></radialGradient></defs><path d="M36 125C22 62 58 14 100 14s78 48 64 111c-4 22-10 42-22 56H58c-12-14-18-34-22-56z" fill="url(#hg@)"/><path d="M36 200c0-34 26-46 64-46s64 12 64 46z" fill="#0b2a5b"/><path d="M70 160l30 26 30-26" stroke="url(#gd@)" stroke-width="5" fill="none" stroke-linejoin="round"/><circle cx="100" cy="186" r="5" fill="#19c4ff" class="glow"/><rect x="89" y="136" width="22" height="28" rx="9" fill="#e8bfa8"/><ellipse cx="100" cy="102" rx="40" ry="46" fill="#f9dfcd"/><path d="M56 96c8-36 36-44 48-44 18 0 36 12 40 44-14-20-32-24-48-22-16 2-30 8-40 22z" fill="url(#hg@)"/><path d="M62 70l-16 44M138 70l16 44" stroke="#19c4ff" stroke-width="2" opacity=".6" class="glow"/><g class="eye"><ellipse cx="82" cy="106" rx="9" ry="11" fill="url(#ey@)"/><circle cx="85" cy="102" r="3" fill="#fff"/></g><g class="eye"><ellipse cx="118" cy="106" rx="9" ry="11" fill="url(#ey@)"/><circle cx="121" cy="102" r="3" fill="#fff"/></g><path d="M71 92q10-6 20-1M109 91q10-5 20 1" stroke="#0a3a8f" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="72" cy="124" r="6" fill="#ff9f1c" opacity=".3"/><circle cx="128" cy="124" r="6" fill="#ff9f1c" opacity=".3"/><path class="sm" d="M90 127q10 8 20 0" stroke="#c0405f" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse class="mo" cx="100" cy="128" rx="7" ry="2.4" fill="#b8324f"/><path d="M68 46l8-24 14 14 10-22 10 22 14-14 8 24z" fill="url(#gd@)" stroke="#a8700f" stroke-width="1.5" stroke-linejoin="round"/><circle cx="76" cy="21" r="3.5" fill="#fff"/><circle cx="100" cy="12" r="4" fill="#fff"/><circle cx="124" cy="21" r="3.5" fill="#fff"/><circle cx="100" cy="62" r="4.5" fill="#ff9f1c" class="glow"/></svg>';
const AV=AVT.replace(/@/g,"h");
const $=id=>document.getElementById(id),el=(t,c)=>{const e=document.createElement(t);if(c)e.className=c;return e};
const chat=$("chat"),q=$("q"),send=$("send"),main=$("main");
if(window.top!==window||/[?&]embed=1/.test(location.search))document.body.classList.add("embed");   /* shown inside the website's chat panel */
$("big").innerHTML=AV;
const SAMPLE=[["Daily puzzle"],["Quiz me"],["Random opening"],["Top players"],["History of chess","wk"],["Who is Viswanathan Anand?","wk"],["Help"]];
SAMPLE.forEach(([t,k])=>{const b=el("button","chip"+(k?" "+k:""));b.textContent=(k?"📖 ":"")+t;b.onclick=()=>{q.value=t;send.click()};$("sug").append(b)});
const fx=$("fx");for(let i=0;i<14;i++){const s=el("i");s.textContent="♟♞♝♜♛♚"[i%6];s.style.cssText="left:"+(i*7.3%100)+"%;font-size:"+(26+i*4%40)+"px;animation-duration:"+(22+i*3%18)+"s;animation-delay:-"+(i*4%20)+"s";fx.append(s)}
const G=s=>window.Intl&&Intl.Segmenter?[...new Intl.Segmenter(undefined,{granularity:"grapheme"}).segment(s)].map(x=>x.segment):[...s];
const RM=window.matchMedia?matchMedia("(prefers-reduced-motion: reduce)"):{matches:false};
/* drop-in letter effect. Text inside inline "grid" blocks (chess boards) is left alone. */
function drop(root,sp){let n=0,i=0;const w=document.createTreeWalker(root,4),ns=[];while(w.nextNode())ns.push(w.currentNode);
 const inB=x=>x.parentElement.closest('[style*="grid"]');ns.forEach(x=>{if(!inB(x))n+=x.textContent.length});
 const S=RM.matches?0:(sp||Math.max(3,Math.min(16,3800/Math.max(n,1))))*(window.tsm||1);root.dataset.s=S;
 ns.forEach(x=>{if(inB(x))return;const f=document.createDocumentFragment();x.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.append(p);return}const wd=el("span","w");G(p).forEach(ch=>{const s=el("span","c");s.textContent=ch;s.style.animationDelay=(i++*S)+"ms";wd.append(s)});f.append(wd)});x.replaceWith(f)});return i*S+500}
drop($("t1"),110);drop($("t2"),35);
/* ---------- voice (chunked: Chrome silently stops utterances longer than ~15 s) ---------- */
let vOn=localStorage.cv!=="0",voice,th=null,sg=0;
function pv(){const v=speechSynthesis.getVoices();voice=v.find(x=>/^en/i.test(x.lang)&&/female|zira|samantha|aria|jenny|google uk english female|karen|moira|tessa|hazel|susan/i.test(x.name))||v.find(x=>/^en/i.test(x.lang))}
if(window.speechSynthesis){pv();speechSynthesis.onvoiceschanged=pv}else $("vc").style.display="none";
const body=document.body;
function speak(s){if(!vOn||!window.speechSynthesis)return;speechSynthesis.cancel();const gen=++sg;
 const t=s.replace(/[♟♞♝♜♛♚]/g,"").replace(/\s+/g," ").replace(/\b(\d)\.(?=[a-hKQRBNO])/g,"$1 ").trim();if(!t)return;
 const parts=t.match(/[^.!?।]+[.!?।]*\s*/g)||[t],chunks=[];let cur="";parts.forEach(p=>{if((cur+p).length>180&&cur){chunks.push(cur);cur=p}else cur+=p});if(cur)chunks.push(cur);
 chunks.forEach((c,i)=>{const u=new SpeechSynthesisUtterance(c.trim());
  if(window.pv2){const x=window.pv2(c);u.lang=x.lang;if(x.voice)u.voice=x.voice}else if(voice)u.voice=voice;
  u.pitch=window.vp||1.12;u.rate=window.vr||.98;
  if(!i)u.onstart=()=>{if(gen===sg)body.classList.add("talk")};
  if(i==chunks.length-1)u.onend=u.onerror=()=>{if(gen===sg)body.classList.remove("talk")};
  speechSynthesis.speak(u)})}
function stopV(){sg++;if(window.speechSynthesis)speechSynthesis.cancel();body.classList.remove("talk")}
$("vc").onclick=()=>{vOn=!vOn;localStorage.cv=vOn?"1":"0";$("vc").textContent=vOn?"🔊":"🔇";$("vc").classList.toggle("on",vOn);if(!vOn)stopV()};
$("vc").textContent=vOn?"🔊":"🔇";$("vc").classList.toggle("on",vOn);
const sc=()=>main.scrollTo({top:main.scrollHeight});
/* ---------- chat history: stays on this device (sessionStorage + localStorage), restored on reload / next visit ---------- */
const HX=(()=>{const K="cch",MAX=40,TTL=30*864e5;let L=[];
 const rd=s=>{try{const o=JSON.parse(s.getItem(K)||"null");return o&&o.v==1&&Date.now()-o.t<TTL&&Array.isArray(o.m)?o:null}catch(e){return null}};
 const wr=()=>{const s=JSON.stringify({v:1,t:Date.now(),m:L});try{sessionStorage.setItem(K,s)}catch(e){}try{localStorage.setItem(K,s)}catch(e){}};
 return{load(){let a=null,b=null;try{a=rd(sessionStorage)}catch(e){}try{b=rd(localStorage)}catch(e){}const o=a&&b?(a.t>=b.t?a:b):a||b;L=o?o.m:[];return L},
  push(x){L.push(x);if(L.length>MAX)L=L.slice(-MAX);wr()},
  clear(){L=[];try{sessionStorage.removeItem(K)}catch(e){}try{localStorage.removeItem(K)}catch(e){}}}})();
window.CHESSA_HISTORY=HX;
function think(){if(th)th.remove();th=el("div","msg bot");th.innerHTML='<div class="av" aria-hidden="true">♛</div><div class="bubble" aria-label="CHESSA is typing"><div class="dots"><i></i><i></i><i></i></div></div>';chat.append(th);sc()}
function add(role,text){body.classList.add("chat");stopV();HX.push({r:role,t:String(text).slice(0,700)});const r=el("div","msg "+role),b=el("div","bubble");b.textContent=text;r.append(b);chat.append(r);sc();if(role=="user")think()}
/* A "wait" message (<i class="wait">…</i>) is a temporary status line: shown at once, never spoken, removed by its caller. */
const isWait=h=>/class="wait"/.test(h);window.isWait=isWait;
window.botUI=function(html,meta,chips){
 const wait=isWait(html);if(!wait&&typeof html=="string")HX.push(/style="[^"]*grid|class="pz|<button|<canvas|onclick|<input/.test(html)||html.length>8000?{r:"bot",h:"<i>(interactive board or tool \u2014 ask again to reopen it)</i>",m:[],c:[]}:{r:"bot",h:html,m:meta||[],c:chips||[]});
 const row=el("div","msg bot"),a=el("div","av"),b=el("div","bubble"),t=el("div","txt");a.textContent="♛";a.setAttribute("aria-hidden","true");t.innerHTML=html;b.append(t);row.append(a,b);
 const go=()=>{if(th){th.remove();th=null}chat.append(row);row.style.display="";if(wait){sc();return}
  const sp=(t.cloneNode(true));sp.querySelectorAll('[style*="grid"]').forEach(x=>x.remove());const say=sp.textContent;
  /* screen readers get the plain text; the animated per-letter copy is hidden from them */
  if(!t.querySelector("a,button")){const r=el("span","sr");r.textContent=say.replace(/\s+/g," ").trim();b.append(r);t.setAttribute("aria-hidden","true")}
  const d=drop(t);const m=el("div","meta");m.style.animationDelay=d+"ms";(meta||[]).forEach(x=>{const s=el("span");s.innerHTML=x;m.append(s)});(chips||[]).forEach(x=>{const s=el("span","rl");s.textContent="↪ "+x;s.tabIndex=0;s.setAttribute("role","button");const run=()=>{q.value=x;send.click()};s.onclick=run;s.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();run()}};m.append(s)});if(m.children.length){b.append(m);m.style.display="none";setTimeout(()=>{m.style.display="";sc()},d)}   /* no blank gap while the reply is still being typed */
  speak(say);
  /* follow the text while it is being typed, so the visitor always sees the newest words (not a blank gap below) */
  const cs=t.querySelectorAll(".c"),S=+t.dataset.s||14,t0=performance.now();
  const iv=setInterval(()=>{if(!cs.length){sc();return}const k=Math.min(cs.length-1,Math.floor((performance.now()-t0)/Math.max(S,1))+8),r=cs[k].getBoundingClientRect(),mr=main.getBoundingClientRect(),over=r.bottom-(mr.bottom-28);if(over>0)main.scrollTop+=Math.ceil(over*.6)+3},50);
  setTimeout(()=>{clearInterval(iv);sc()},d+500);setTimeout(sc,d+1300)};
 if(wait){if(th){th.remove();th=null}go()}else{row.style.display="none";setTimeout(go,th?300:0)}
 return b};
$("clear").onclick=()=>{stopV();chat.innerHTML="";th=null;lastTopic="";body.classList.remove("chat");HX.clear()};
send.onclick=()=>{const v=q.value.trim();if(v){q.value="";ask(v);if(matchMedia("(hover:hover)").matches)q.focus({preventScroll:true})}};   /* keep typing without clicking again */
addEventListener("message",e=>{if(e.origin===location.origin&&e.data==="askchessa:focus"&&matchMedia("(hover:hover)").matches)q.focus({preventScroll:true})});
let ce=0;q.addEventListener("compositionend",()=>{ce=Date.now()});   /* Safari fires a stray Enter right after a composition ends */
q.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&Date.now()-ce>60){e.preventDefault();send.click()}};
/* a promise that rejects somewhere in the module chain must never leave the typing dots on screen forever */
addEventListener("unhandledrejection",e=>{console.warn("CHESSA:",e.reason);if(th){th.remove();th=null;window.botUI("Sorry, something went wrong. Please try again.")}});
var ask;

/* restore the previous conversation (static: no typing animation, no voice) once every module has loaded */
function restoreChat(){const L=HX.load();if(!L.length||chat.children.length)return;body.classList.add("chat");
 const note=el("div","msg");note.style.cssText="justify-content:center;animation:none;color:var(--mu);font-size:12px;margin:6px 0";note.textContent="— your previous chat —";chat.append(note);
 L.forEach(x=>{const row=el("div","msg "+(x.r=="user"?"user":"bot")),b=el("div","bubble");row.style.animation="none";
  if(x.r=="user"){b.textContent=x.t;row.append(b)}
  else{const a=el("div","av"),t=el("div","txt");a.textContent="\u265b";a.setAttribute("aria-hidden","true");t.innerHTML=x.h;b.append(t);row.append(a,b);
   const m=el("div","meta");m.style.cssText="opacity:1;animation:none";(x.m||[]).forEach(z=>{const s=el("span");s.innerHTML=z;m.append(s)});
   (x.c||[]).forEach(z=>{const s=el("span","rl");s.textContent="\u21aa "+z;s.tabIndex=0;s.setAttribute("role","button");const run=()=>{q.value=z;send.click()};s.onclick=run;s.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();run()}};m.append(s)});if(m.children.length)b.append(m)}
  chat.append(row)});sc()}
addEventListener("load",()=>setTimeout(()=>{try{restoreChat()}catch(e){console.warn("CHESSA history:",e)}},50));
