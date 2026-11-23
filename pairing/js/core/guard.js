/* js/core/guard.js - website lock.
   Runs before the app. The app starts only on the website(s) listed in ALLOWED_HOSTS (config/config.js).
   On any other address it shows a short notice instead and never contacts the database. */
(function(){
  var C=window.MYCHESS64||{},
      low=function(a){return(a||[]).map(function(s){return String(s).toLowerCase()})},
      host=location.hostname.toLowerCase(),
      allowed=low(C.ALLOWED_HOSTS),
      isLocal=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(host),
      site=String(C.SITE_URL||'').replace(/\/+$/,''),
      ok=allowed.indexOf(host)>-1||(C.ALLOW_LOCALHOST===true&&isLocal);
  window.MC_OK=false;

  /* mychess64.com (without www) -> https://www.mychess64.com/... */
  if(!ok&&site&&low(C.REDIRECT_HOSTS).indexOf(host)>-1){
    location.replace(site+location.pathname+location.search+location.hash);return}

  /* always HTTPS on the real site */
  if(ok&&!isLocal&&location.protocol!=='https:'){
    location.replace('https:'+location.href.substring(location.protocol.length));return}

  /* do not run inside somebody else's iframe */
  if(ok&&C.ALLOW_EMBED!==true&&window.top!==window.self){
    try{ok=allowed.indexOf(window.top.location.hostname.toLowerCase())>-1}catch(e){ok=false}}

  window.MC_OK=ok;
  if(ok)return;

  document.documentElement.classList.add('mc-blocked');
  document.addEventListener('DOMContentLoaded',function(){
    var d=document.createElement('div');d.id='mc-block';
    var h=document.createElement('h1');h.textContent='MyChess64 Tournament Manager';
    var p=document.createElement('p');p.textContent='This tool works only on '+(allowed[0]||'www.mychess64.com')+'.';
    d.appendChild(h);d.appendChild(p);
    if(site){var a=document.createElement('a');a.href=site+(C.APP_PATH||'/pairing/');a.textContent='Open it on MyChess64';d.appendChild(a)}
    document.body.appendChild(d)});
})();
