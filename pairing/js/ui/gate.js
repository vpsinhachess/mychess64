/* js/ui/gate.js - Home / login screen. */
function home(){if(TID&&S&&!S.vo)save(true);if(unsub){unsub();unsub=null}if(unsubS){unsubS();unsubS=null}S=null;TID=null;ORG=null;document.body.classList.remove('os');
 ['setup','app','vw','imp'].forEach(i=>$(i).hidden=true);$('gate').hidden=false;recent();$('vb').hidden=true}
function recent(){const el=$('rec');if(!el)return;let o='';
 try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!/^chessBak:CT-[A-HJ-NP-Z2-9]{6}$/.test(k))continue;
  let n='';try{n=cl(JSON.parse(localStorage.getItem(k)).name)}catch(e){}const id=k.slice(9);
  o+=`<button onclick="$('li').value='${id}';$('lw').focus()">${id}${n?' \u00b7 '+n:''}</button> `}}catch(e){}
 el.innerHTML=o?'<b>Tournaments saved on this device</b><br>'+o:''}
