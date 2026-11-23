/* js/services/branding.js - Logo used in PDF exports. */
/* The logo is a normal image file (assets/img/logo-header.png). It is converted to a data URL only when a PDF is made. */
const LG={d:'',w:40.0,h:12.7};let lgP=null;
function loadLogo(){if(LG.d)return Promise.resolve();
 return lgP||(lgP=fetch('assets/img/logo-header.png').then(r=>r.blob()).then(b=>new Promise((ok,no)=>{const f=new FileReader();f.onload=()=>{LG.d=f.result;ok()};f.onerror=no;f.readAsDataURL(b)})).catch(()=>{lgP=null}))}
