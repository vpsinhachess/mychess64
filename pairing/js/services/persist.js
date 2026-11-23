/* js/services/persist.js - Autosave (device + online), offline retry, live sync, delete. */
function save(now){if(!TID||!dbh||!S||S.vo)return;clearTimeout(sv);S.rev=(S.rev||0)+1;const id=TID,j=JSON.stringify(S);
 try{localStorage.setItem('chessBak:'+id,j)}catch(e){}
 const w=()=>dbh.doc('s/'+id).set({j}).then(()=>{dirty=false;$('sv').textContent='Saved online '+new Date().toLocaleTimeString()}).catch(()=>{dirty=true;$('sv').textContent='\u26a0 Offline: kept on this device, will retry'});
 if(now)return w();$('sv').textContent='Saving\u2026';sv=setTimeout(w,500)}
setInterval(()=>{if(dirty&&TID&&S&&!S.vo)save(true)},10000);addEventListener('online',()=>{if(dirty&&TID&&S&&!S.vo)save(true)});
function load(){try{const s=localStorage.getItem('chessT');if(s){S=JSON.parse(s);S.pend=S.pend||{};S.pub=S.pub||{pair:0,res:0}}}catch(e){}}
async function reset(){if(TID&&S&&!S.vo){try{await save(true)}catch(e){}}home()}
function watch(){if(unsubS)unsubS();unsubS=dbh.doc('s/'+TID).onSnapshot(sn=>{if(!sn.exists||!S||S.vo||ORG)return;let d;try{d=JSON.parse(sn.data().j)}catch(e){return}
 if((d.rev||0)>(S.rev||0)){S=d;S.pend=S.pend||{};S.pub=S.pub||{pair:0,res:0};render();toast('Updated from another device.')}})}
let dd=0;async function delT(){if(!dd){dd=1;toast('Press Delete again to permanently remove this tournament.');setTimeout(()=>dd=0,4000);return}dd=0;
 try{const id=TID;clearTimeout(sv);await dbh.doc('t/'+id).delete();await dbh.doc('s/'+id).delete();await dbh.doc('a/'+id).delete();S=null;home();toast('Tournament '+id+' deleted.')}catch(e){toast('Delete failed.')}}
