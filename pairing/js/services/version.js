/* js/services/version.js - Update check ("A new version is available"). */
const APP_V=window.APP_VERSION||'0';
async function chkV(){try{const r=await fetch('config/version.js?_='+Date.now(),{cache:'no-store'});const t=await r.text(),m=/APP_VERSION\s*=\s*'([^']+)'/.exec(t);if(m&&m[1]!==APP_V)$('upd').hidden=false}catch(e){}}
function updNow(){const u=new URL(location.href);u.searchParams.set('v',Date.now());location.replace(u.toString())}
