CHESSA.reg("wiki","Wikipedia (free) for players, events and history, with cache and source links");
(function(){
const {fix,boardHTML,lib,esc}=window.cx;
const bot=(h,m,c)=>window.botUI(h,m,c),pick=a=>a[Math.floor(Math.random()*a.length)];
const J=async u=>{try{const c=new AbortController();setTimeout(()=>c.abort(),8000);const r=await fetch(u,{signal:c.signal});return r.ok?await r.json():null}catch(e){return null}};
const lk=(u,t)=>'<a href="'+esc(u)+'" target="_blank" rel="noopener" style="color:#ffe4a3">'+t+' ↗</a>';
/* ---- Wikipedia with cache + source link ---- */
const cg=k=>{try{return JSON.parse(localStorage.cw||"{}")[k]}catch(e){}};
const cs=(k,v)=>{try{const o=JSON.parse(localStorage.cw||"{}"),ks=Object.keys(o);if(ks.length>60)delete o[ks[0]];o[k]=v;localStorage.cw=JSON.stringify(o)}catch(e){}};
async function wiki2(s){
 const t0=s.replace(/^(who (is|was)|tell me about|biography of|history of|what happened (in|at))\s+/i,"").replace(/\?+$/,"").trim(),k=t0.toLowerCase();let d=cg(k);
 if(!d){const r=await J("https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&format=json&origin=*&srsearch="+encodeURIComponent(t0+" chess")),h=r&&r.query&&r.query.search[0];if(!h)return false;
  const x=await J("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(h.title.replace(/ /g,"_")));
  if(!x||!x.extract||!/chess|grandmaster/i.test(x.extract+" "+(x.description||"")))return false;d={t:x.title,e:x.extract,u:x.content_urls.desktop.page};cs(k,d)}
 bot("<b>"+esc(d.t)+"</b>\n"+esc((d.e.match(/[^.!?]+[.!?]+/g)||[d.e]).slice(0,3).join(" ").trim()),["📖 Wikipedia",lk(d.u,"Source")],["Quiz me","Chess tip"]);return true}

let sk=false;const _a=add;add=(r,t)=>{if(sk&&r=="user"){sk=false;return}_a(r,t)};
const prev=ask;
ask=async function(v){const n=v.trim();
 if(/^(who (is|was)|tell me about|biography of|history of|what happened (in|at))\s+\S/i.test(n)&&ranked(fix(v))[0][0]<10){add("user",v);if(await wiki2(n))return;sk=true}
 return prev(v)};
window.CHESSA.wiki={lookup:wiki2};
})();
