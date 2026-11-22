/* Boot: load the puzzle library, then start the app. */
const loadPDF=(()=>{let p;return()=>p||(p=new Promise((ok,no)=>{const s=document.createElement('script');s.src=window.__PDF_SRC||'js/pdf.js';s.onload=ok;s.onerror=()=>{p=null;no(new Error('pdf'))};document.head.appendChild(s)}))})();
const getJSON=u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u);return r.json()});
getJSON('data/puzzles.json').then(l=>{
  LIB=l;
  route();if(!PRO.name)askName();
  (window.requestIdleCallback||setTimeout)(()=>{const i=new Image();i.src=HERO_URL},2500);
}).catch(()=>{document.getElementById('home').insertAdjacentHTML('afterbegin','<p style="padding:16px;text-align:center">Could not load game data. Please refresh.</p>')});
