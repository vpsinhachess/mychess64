/* js/services/storage.js - Firebase Realtime Database access (REST). */
/* Storage: Firebase Realtime Database via REST (see firebase-rules.json). Secrets live in paths, enforced by the rules. */
async function fb(method,path,body){
 if(!window.MC_OK)throw{message:'This app works only on '+((window.MYCHESS64&&MYCHESS64.SITE_URL)||'www.mychess64.com')};
 const r=await fetch(window.FIREBASE_URL.replace(/\/$/,'')+'/'+path+'.json',{method,body:body===undefined?undefined:JSON.stringify(body)});
 if(!r.ok)throw{message:r.status===401||r.status===403?'Permission denied (check Firebase rules)':'Server error ('+r.status+')'};
 return r.json()}
async function authOK(id,h){const ok=await fb('GET','a/'+id+'/ok/'+h);if(ok===true){TOKEN=h;return true}return false}
const mkDoc=p=>{const k=p[0],id=p.slice(2);const o={
 get:async()=>{const d=await fb('GET',k==='s'?'s/'+id+'/'+TOKEN:k+'/'+id+'/pub');return{exists:!!d,data:()=>d}},
 set:async d=>{
  if(k==='a'){await fb('PUT','a/'+id,{pub:{salt:d.salt,v:d.v},h:d.h,ok:{[d.h]:true}});TOKEN=d.h}
  else if(k==='t')await fb('PUT','t/'+id,{k:TOKEN,pub:d});
  else await fb('PUT','s/'+id+'/'+TOKEN,d)},
 delete:async()=>{if(k==='t')await fb('PUT','t/'+id,{k:TOKEN,pub:{j:''}});else if(k==='s')await fb('PUT','s/'+id+'/'+TOKEN,null)},
 onSnapshot:(cb,err)=>{let last=null,stop=false;const tick=async()=>{if(stop)return;
  try{const s=await o.get(),x=JSON.stringify(s.data());if(x!==last){last=x;cb(s)}}catch(e){err&&err(e)}
  setTimeout(tick,4000)};tick();return()=>{stop=true}}};return o};
