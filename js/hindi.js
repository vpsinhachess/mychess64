CHESSA.reg("hindi","Hindi voice, translation and Hindi mic");
(function(){
const EMAIL="";/* optional: your email raises the MyMemory backup limit to ~50,000 characters/day */
const DEV=/[\u0900-\u097F]/;let lang=localStorage.cl==="hi"?"hi":"en";
const JJ=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),8000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const cache=(()=>{try{return JSON.parse(localStorage.ctc||"{}")}catch(e){return{}}})();
const TS={};
async function loc(s,f,t){if(!("Translator" in self))return null;const k=f+t;
 try{if(!TS[k]){const o={sourceLanguage:f,targetLanguage:t};if(await Translator.availability(o)==="unavailable")return null;TS[k]=await Translator.create(o)}return await TS[k].translate(s)}catch(e){delete TS[k];return null}}
async function gx(s,f,t){const r=await JJ("https://translate.googleapis.com/translate_a/single?client=gtx&sl="+f+"&tl="+t+"&dt=t&q="+encodeURIComponent(s));try{return r&&r[0]?r[0].map(x=>x[0]).join(""):null}catch(e){return null}}
const prewarm=()=>{if("Translator" in self)loc("hello","en","hi").then(()=>loc("नमस्ते","hi","en"))};
const save=()=>{try{const k=Object.keys(cache);if(k.length>150)k.slice(0,50).forEach(x=>delete cache[x]);localStorage.ctc=JSON.stringify(cache)}catch(e){}};
async function t1(s,f,t){
 const key=f+t+s;if(cache[key])return cache[key];
 const z=await loc(s,f,t)||await gx(s,f,t);if(z){cache[key]=z;save();return z}
 const r=await JJ("https://api.mymemory.translated.net/get?langpair="+f+"%7C"+t+"&q="+encodeURIComponent(s)+(EMAIL?"&de="+encodeURIComponent(EMAIL):""));
 let o=r&&r.responseStatus==200&&r.responseData&&r.responseData.translatedText;
 if(!o||/MYMEMORY|INVALID|QUERY LENGTH/i.test(o)){const l=await JJ("https://lingva.ml/api/v1/"+f+"/"+t+"/"+encodeURIComponent(s));o=l&&l.translation}
 if(o){cache[key]=o;save()}return o||null}
async function tr(s,f,t){
 const parts=[];let cur="";for(const x of s.match(/[^.!?]+[.!?]*\s*/g)||[s]){if((cur+x).length>450&&cur){parts.push(cur);cur=x}else cur+=x}if(cur)parts.push(cur);
 const out=await Promise.all(parts.map(p=>/[A-Za-z\u0900-\u097F]/.test(p)?t1(p.trim(),f,t):p));
 return out.some(x=>x==null)?null:out.join(" ")}
async function trHtml(h){
 const d=document.createElement("div");d.innerHTML=h;const w=document.createTreeWalker(d,4),ns=[];
 while(w.nextNode()){const n=w.currentNode;if(!n.parentElement.closest('[style*="grid"]')&&(n.textContent.match(/\b[a-z]{3,}\b/gi)||[]).length>=2)ns.push(n)}
 const res=await Promise.all(ns.map(n=>{const m=n.textContent.match(/^(\s*)([\s\S]*?)(\s*)$/);return tr(m[2],"en","hi").then(o=>o==null?null:m[1]+o+m[3])}));
 if(res.some(x=>x==null))return null;ns.forEach((n,i)=>n.textContent=res[i]);return d.innerHTML}
const orig=window.botUI;let qp=Promise.resolve();
window.botUI=function(h,m,c){
 if(lang!="hi"||/Analyzing/.test(h))return orig(h,m,c);
 qp=qp.then(async()=>{const o=await trHtml(h);o==null?orig(h,(m||[]).concat(["English — translation unavailable"]),c):orig(o,m,c)}).catch(()=>{orig(h,m,c)});return null};
window.pv2=s=>DEV.test(s)?{lang:"hi-IN",voice:window.hv||speechSynthesis.getVoices().find(x=>/^hi/i.test(x.lang))}:{lang:"en-US",voice:voice};
let skip2=false;const _a=add;add=(r,t)=>{if(skip2&&r=="user"){skip2=false;return}_a(r,t)};
const prev=ask;
ask=async function(v){
 if(!DEV.test(v))return prev(v);
 add("user",v);skip2=true;const en=await tr(v,"hi","en");
 if(!en){skip2=false;return orig("Hindi translation isn't available right now. Please ask in English.")}
 return prev(en)};
const lb=document.createElement("button");lb.className="ib";lb.style.fontSize="13px";lb.title="Language / भाषा";
const hv=()=>window.speechSynthesis&&speechSynthesis.getVoices().find(x=>/^hi/i.test(x.lang));
function ui(){lb.textContent=lang=="hi"?"हि":"EN";lb.classList.toggle("on",lang=="hi");q.placeholder=lang=="hi"?"CHESSA से पूछें…":"Ask CHESSA…"}
lb.onclick=()=>{prewarm();lang=lang=="hi"?"en":"hi";localStorage.cl=lang;ui();document.body.classList.add("chat");
 const warn=lang=="hi"&&window.speechSynthesis&&speechSynthesis.getVoices().length&&!hv()?["⚠ No Hindi voice found. Install Hindi text-to-speech in your device settings."]:null;
 orig(lang=="hi"?"नमस्ते! मैं <b>CHESSA</b> ♛ हूँ। शतरंज के बारे में कुछ भी पूछिए, हिंदी या अंग्रेज़ी में।":"Hi, I'm <b>CHESSA</b> ♛ Voice is back to English. Ask me anything about chess.",warn)};
document.querySelector('[title="Voice speed"]').before(lb);ui();send.addEventListener("click",()=>{if(lang=="hi")prewarm()});
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SR)$("mic").onclick=()=>{stopV();const r=new SR();r.lang=lang=="hi"?"hi-IN":"en-US";r.onresult=e=>{q.value=e.results[0][0].transcript;send.click()};r.onend=()=>$("mic").classList.remove("rec");try{r.start();$("mic").classList.add("rec")}catch(e){}};
})();
