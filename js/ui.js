CHESSA.reg("ui","Settings, voice speed, suggestions, reply, message actions, KB import");
(function(){
const E=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};
const {esc}=window.cx,bot=(h,m,c)=>{document.body.classList.add("chat");window.botUI(h,m,c)};
const S=(()=>{try{return JSON.parse(localStorage.cst||"{}")}catch(e){return{}}})(),sv=()=>localStorage.cst=JSON.stringify(S);
if(S.vr)window.vr=S.vr;if(S.vp)window.vp=S.vp;window.tsm=S.ts||1;
/* ---- styles ---- */
const st=E("style");st.textContent="body{background:radial-gradient(900px 520px at 12% -10%,#5b2bd466,transparent),radial-gradient(800px 600px at 100% 100%,#0d6a8f55,transparent),#080414}header{position:sticky;top:0;z-index:5;background:linear-gradient(#0a0618f2,#0a061800);backdrop-filter:blur(10px)}.bubble{border-radius:22px;font-size:15.5px}.bot .bubble{background:linear-gradient(160deg,#ffffff16,#ffffff06);border:1px solid #ffffff24;box-shadow:0 10px 30px #0007,inset 0 1px 0 #ffffff26}.user .bubble{background:linear-gradient(135deg,#8b5cff,#4f2fd6 60%,#2f7bff)}.av{animation:pop 3s ease-in-out infinite}@keyframes pop{50%{transform:scale(1.08)}}.talk .av{box-shadow:0 0 18px #5ee6ff}.wv{display:none;gap:2px;align-items:flex-end;height:14px;margin-left:8px}.talk .wv{display:flex}.wv i{width:3px;height:100%;background:var(--cy);border-radius:2px;animation:wv .55s infinite alternate}.wv i:nth-child(2){animation-delay:.1s}.wv i:nth-child(3){animation-delay:.25s}.wv i:nth-child(4){animation-delay:.05s}.wv i:nth-child(5){animation-delay:.2s}@keyframes wv{from{transform:scaleY(.2)}}.acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;opacity:0;animation:in .5s both}.acts button{border:1px solid var(--line);background:#ffffff0d;color:#cfc6f5;border-radius:99px;padding:5px 10px;font-size:12px;cursor:pointer}.acts button:hover{background:#f5c65a22;color:#ffe4a3}#sg{display:flex;gap:6px;overflow-x:auto;padding:0 2px 8px}#sg button{flex:none;border:1px solid #f5c65a55;background:#f5c65a12;color:#ffe4a3;border-radius:99px;padding:7px 12px;font-size:13px;cursor:pointer;animation:in .3s both}#rp{display:none;align-items:center;gap:8px;font-size:12px;color:#cfc6f5;border-left:3px solid var(--gold);background:#ffffff0d;border-radius:8px;padding:6px 10px;margin-bottom:8px}#rp i{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#rp button{background:none;border:0;color:#fff;font-size:16px}#set{position:fixed;left:0;right:0;bottom:0;max-width:880px;margin:auto;background:#150d33f5;border:1px solid #ffffff22;border-radius:22px 22px 0 0;padding:16px 18px max(18px,env(safe-area-inset-bottom));transform:translateY(110%);transition:.35s;z-index:20;backdrop-filter:blur(18px)}#set.open{transform:none}#set .sh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:17px}#set label{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid #ffffff12;font-size:14px}#set select,#set input[type=range]{max-width:55%;background:#ffffff14;color:#fff;border:1px solid var(--line);border-radius:10px;padding:6px}#set output{color:var(--gold);font-size:12px}#set .row{display:flex;gap:8px;margin-top:12px}#set .row button{flex:1;padding:10px;border-radius:12px;border:1px solid #f5c65a55;background:#f5c65a14;color:#ffe4a3;font-size:14px}@keyframes cf{to{transform:translateY(105vh) rotate(540deg);opacity:.2}}#sg::-webkit-scrollbar{height:0}";document.head.append(st);
document.querySelector(".nm").after(E("div","wv","<i></i><i></i><i></i><i></i><i></i>"));
/* ---- knowledge: auto-load files + import ---- */
const FILES=window.KB_MANIFEST||[];
function addKB(a,keep){let n=0;const seen=new Set(DB.map(e=>e.topic+"|"+e.title)),add2=[];
 (Array.isArray(a)?a:[]).forEach(e=>{if(e&&e.title&&e.answer&&e.key){const k=(e.topic||"")+"|"+e.title;if(!seen.has(k)){seen.add(k);const x={topic:e.topic||"Knowledge",title:e.title,key:e.key,answer:e.answer,ref:e.ref||"Custom KB"};DB.push(x);add2.push(x);n++}}});
 DB.forEach(e=>toks(e.key+" "+e.title).forEach(t=>window.cx.V.add(t)));
 if(keep&&n){try{const o=JSON.parse(localStorage.ckb||"[]");localStorage.ckb=JSON.stringify(o.concat(add2))}catch(e){}}return n}
try{addKB(JSON.parse(localStorage.ckb||"[]"))}catch(e){}
FILES.forEach(([f,n])=>{if((0,eval)("typeof "+n)!="undefined"){addKB((0,eval)(n));return}const s=E("script");s.src=f;s.onload=()=>{try{addKB((0,eval)("typeof "+n+"!='undefined'?"+n+":[]"))}catch(e){}};document.head.append(s)});
/* ---- settings sheet ---- */
const gear=E("button","ib","⚙");gear.title="Settings";$("vc").before(gear);
const P=E("div");P.id="set";P.innerHTML='<div class="sh"><b>Settings</b><button class="ib" id="sx">✕</button></div><label>Language<span id="s1"></span></label><label>Level<span id="s2"></span></label><label>Voice<select id="sv"></select></label><label>Voice speed <output id="o1"></output><input id="sr" type="range" min=".6" max="1.6" step=".05"></label><label>Voice pitch <output id="o2"></output><input id="sp" type="range" min=".8" max="1.5" step=".05"></label><label>Text effect<select id="st"><option value="0.5">Fast</option><option value="1">Normal</option><option value="1.7">Slow</option></select></label><div class="row"><button id="stt">▶ Test voice</button><button id="simp">📥 Import knowledge</button></div><input id="sf" type="file" accept=".js,.json,.txt" hidden>';document.body.append(P);
$("s1").append(document.querySelector('[title="Language / भाषा"]'));$("s2").append(document.querySelector('[title="Level"]'));document.querySelector('[title="Voice speed"]').remove();
gear.onclick=()=>P.classList.toggle("open");$("sx").onclick=()=>P.classList.remove("open");
const sr=$("sr"),sp=$("sp"),ss=$("st");
sr.value=window.vr||.98;sp.value=window.vp||1.12;ss.value=S.ts||1;
const lab=()=>{$("o1").textContent=(+sr.value).toFixed(2)+"×";$("o2").textContent=(+sp.value).toFixed(2)};lab();
sr.oninput=()=>{window.vr=S.vr=+sr.value;sv();lab()};sp.oninput=()=>{window.vp=S.vp=+sp.value;sv();lab()};ss.onchange=()=>{window.tsm=S.ts=+ss.value;sv()};
$("stt").onclick=()=>{const o=vOn;vOn=true;speak(localStorage.cl==="hi"?"नमस्ते, मैं चेसा हूँ। चलिए शतरंज खेलें!":"Hi, I'm Chessa. Let's play some chess!");vOn=o};
if(window.speechSynthesis){let vs=[];const fv=()=>{vs=speechSynthesis.getVoices().filter(x=>/^(en|hi)/i.test(x.lang));$("sv").innerHTML=vs.map(x=>"<option>"+esc(x.name)+" ("+x.lang+")</option>").join("");
  const i=vs.findIndex(x=>x.name==S.vn);if(i>=0){$("sv").selectedIndex=i;ap(vs[i])}};
 const ap=v=>{if(/^hi/i.test(v.lang))window.hv=v;else voice=v};
 $("sv").onchange=()=>{const v=vs[$("sv").selectedIndex];if(v){S.vn=v.name;sv();ap(v)}};
 const o=speechSynthesis.onvoiceschanged;speechSynthesis.onvoiceschanged=()=>{o&&o();fv()};fv()}
else $("sv").parentNode.style.display="none";
$("simp").onclick=()=>$("sf").click();
$("sf").onchange=async()=>{const f=$("sf").files[0];if(!f)return;let a;try{const t=await f.text(),m=t.match(/\[\s*\{[\s\S]*\}\s*\]/);a=new Function("return "+(m?m[0]:t))()}catch(e){}
 P.classList.remove("open");const n=a?addKB(a,true):-1;$("sf").value="";
 bot(n<0?"I couldn't read that file. It should contain a list of entries with topic, title, key, answer and ref.":"✅ Imported <b>"+n+"</b> new entries. I now know <b>"+DB.length+"</b> topics.",["📥 Knowledge import"],n>0?["Quiz me","Chess tip"]:null)};
/* ---- suggestions + autocomplete ---- */
const sg=E("div");sg.id="sg";const rb=E("div");rb.id="rp";document.querySelector(".cmp").before(sg);document.querySelector(".cmp").before(rb);
const DEF=["Daily puzzle","Quiz me","Random opening","Chess tip","Top players"];let ctx=DEF;
const setSg=l=>{sg.innerHTML="";l.slice(0,7).forEach(t=>{const b=E("button");b.textContent=t;b.onclick=()=>{q.value=t;send.click()};sg.append(b)})};setSg(DEF);
q.addEventListener("input",()=>{const v=q.value.trim();if(v.length<2)return setSg(ctx);const ts=norm(v).split(" ").filter(w=>w.length>1);
 const m=DB.filter(e=>{const h=norm(e.title+" "+e.key);return ts.every(t=>h.includes(t))}).slice(0,6).map(e=>e.title);setSg(m.length?m:ctx)});
/* ---- reply + message actions ---- */
let rp=null;
function setReply(t){rp=t.slice(0,160);rb.innerHTML="<span>↩</span><i>"+esc(rp)+"</i><button>✕</button>";rb.style.display="flex";rb.querySelector("button").onclick=()=>{rp=null;rb.style.display="none"};q.focus()}
const say=(t)=>{const o=vOn;vOn=true;speak(t);vOn=o};
function acts(r,t){const b=r.querySelector(".bubble"),a=E("div","acts"),c=t.querySelectorAll(".c"),tx=()=>t.innerText.replace(/\s+/g," ").trim();
 a.style.animationDelay=(c.length?parseFloat(c[c.length-1].style.animationDelay)+500:0)+"ms";
 [["🔊 Listen",()=>say(tx())],["📋 Copy",e=>{try{navigator.clipboard.writeText(tx())}catch(x){}e.target.textContent="✓ Copied"}],["↩ Reply",()=>setReply(tx())],["👍",e=>{e.target.parentNode.textContent="Thanks! 💛"}],["👎",e=>{try{const m=JSON.parse(localStorage.chessa_miss||"[]");m.push("👎 "+tx().slice(0,80));localStorage.chessa_miss=JSON.stringify(m.slice(-100))}catch(x){}e.target.parentNode.textContent="Thanks — I'll improve."}]]
 .forEach(([l,f])=>{const x=E("button");x.textContent=l;x.onclick=f;a.append(x)});b.append(a)}
function conf(){for(let i=0;i<26;i++){const s=E("i");s.textContent=["♛","♞","✨","⭐","♟"][i%5];s.style.cssText="position:fixed;top:-20px;left:"+Math.random()*100+"vw;font-size:"+(16+Math.random()*18)+"px;font-style:normal;z-index:30;pointer-events:none;animation:cf "+(1.6+Math.random()*1.4)+"s ease-in forwards";document.body.append(s);setTimeout(()=>s.remove(),3200)}}
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{
 if(n.nodeType==3){if(/Puzzle solved|पहेली हल/.test(n.textContent)&&n.parentNode&&n.parentNode.classList&&n.parentNode.classList.contains("pst"))conf();return}
 if(n.nodeType!=1||!n.classList.contains("msg")||!n.classList.contains("bot"))return;
 if(n.querySelector(".pz")){ctx=["Next puzzle","Daily puzzle","Quiz me"];setSg(ctx);return}
 const t=n.querySelector(".txt");if(!t||n.querySelector(".dots")||/Analyzing|reviewing/.test(t.textContent))return;
 const ch=[...n.querySelectorAll(".meta .rl")].map(x=>x.textContent.replace(/^↪ /,""));ctx=ch.length?ch.concat(DEF):DEF;setSg(ctx);acts(n,t)}))).observe(chat,{childList:true,subtree:true});
/* ---- router ---- */
let sk=false;const _a=add;add=(r,t)=>{if(sk&&r=="user"){sk=false;return}_a(r,t)};
const prev=ask;
ask=async function(v){const n=v.trim();
 if(rp&&n.split(/\s+/).length<=6){const c=rp.split(" ").slice(0,14).join(" ");rp=null;rb.style.display="none";add("user",v);sk=true;return prev(v+" "+c)}
 if(rp){rp=null;rb.style.display="none"}
 return prev(v)};
})();

