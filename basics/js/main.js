/* Boot */
const loadPDF=(()=>{let p;return()=>p||(p=new Promise((ok,no)=>{const s=document.createElement('script');s.src=window.__PDF_SRC||'js/pdf.js';s.onload=ok;s.onerror=()=>{p=null;no(new Error('pdf'))};document.head.appendChild(s)}))})();
route();if(!PRO.name)askName();
(window.requestIdleCallback||setTimeout)(()=>{const i=new Image();i.src=HERO_URL},2500);
