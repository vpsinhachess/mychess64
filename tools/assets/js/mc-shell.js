(()=>{const ms=[...document.querySelectorAll('.mc-menu')];if(!ms.length)return;ms.forEach(m=>m.addEventListener('toggle',()=>{if(m.open)ms.forEach(o=>{if(o!==m)o.open=false})}));document.addEventListener('click',e=>{ms.forEach(m=>{if(m.open&&!m.contains(e.target))m.open=false})});document.addEventListener('keydown',e=>{if(e.key==='Escape')ms.forEach(m=>{if(m.open){m.open=false;m.querySelector('summary').focus()}})})})();
(function(){const body=document.body,button=document.querySelector('.mc-theme-toggle');if(!button)return;try{if(localStorage.getItem('mychess64-tools-theme')==='dark')body.classList.add('mc-dark')}catch(e){}button.addEventListener('click',function(){body.classList.toggle('mc-dark');try{localStorage.setItem('mychess64-tools-theme',body.classList.contains('mc-dark')?'dark':'light')}catch(e){}})})();
/* Load the PDF libraries only when someone asks for a PDF (they were loaded on every page view before). */
(function(){
  var U={h:'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',j:'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'},p=null;
  function load(u){return new Promise(function(res,rej){var s=document.createElement('script');s.src=u;s.onload=res;s.onerror=function(){rej(new Error('Could not load '+u))};document.head.appendChild(s)})}
  window.mcLoadPdfLibs=function(){
    if(window.html2canvas&&window.jspdf)return Promise.resolve();
    if(!p)p=Promise.all([load(U.h),load(U.j)]).catch(function(e){p=null;throw e});
    return p;
  };
})();
