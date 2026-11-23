/* js/app/boot.js - Application start-up. */
async function boot(){if(!window.MC_OK)return;fmtUI();const av=$('appv');if(av)av.textContent=APP_V;chkV();setInterval(chkV,300000);let ok=true;
 if(window.FIREBASE_URL&&!/YOUR/.test(window.FIREBASE_URL))dbh={doc:mkDoc};
 addEventListener('pagehide',()=>{if(TID&&S&&!S.vo)save(true)});home();try{$('li').value=localStorage.getItem('lastTid')||''}catch(e){}if(!dbh)$('gm').textContent='Backend not configured. Open config/config.js and set FIREBASE_URL (see README).';try{const q=(new URLSearchParams(location.search).get('t')||'').trim().toUpperCase();if(dbh&&/^CT-[A-HJ-NP-Z2-9]{6}$/.test(q)){$('pi').value=q;enterP()}}catch(e){}}
boot();
