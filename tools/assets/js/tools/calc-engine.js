const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};

const $=s=>document.querySelector(s),n=x=>parseFloat(x)||0,f0=x=>Math.round(x).toLocaleString('en-IN'),inr=x=>'₹'+f0(x);
const st=(l,v,s='')=>`<div class="stat"><span>${l}</span><b>${v}</b>${s?`<small>${s}</small>`:''}</div>`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const F=T.fields;
$('#form').innerHTML=F.map(([id,l,t,d,o])=>{
 if(d==='today')d=today();
 if(t=='select')return `<label>${l}<select id="${id}">${o.map(x=>`<option${x==d?' selected':''}>${x}</option>`).join('')}</select></label>`;
 if(t=='area')return `<label>${l}<textarea id="${id}" rows="3">${d}</textarea></label>`;
 return `<label>${l}<input id="${id}" type="${t}" value="${d}" ${t=='number'?'step="any" inputmode="decimal"':''}></label>`}).join('')
 +(typeof act!='undefined'?act.map((a,i)=>`<button type="button" class="${a[2]||''}" data-i="${i}">${a[0]}</button>`).join(''):'');
const vals=()=>Object.fromEntries(F.map(([id])=>[id,$('#'+id).value]));
const run=()=>{try{$('#out').innerHTML=calc(vals())}catch(e){$('#out').innerHTML='<p class="muted">Check your inputs.</p>'}};
document.addEventListener('input',run);
document.querySelectorAll('button[data-i]').forEach(b=>b.onclick=()=>{act[b.dataset.i][1](vals());run()});
run();

const KEY='mc64:'+CUR,flash=(b,m)=>{const o=b.textContent;b.textContent=m;setTimeout(()=>b.textContent=o,1400)};
try{const h=location.hash.slice(1),s=h?decodeURIComponent(escape(atob(h))):localStorage[KEY];if(s){const o=JSON.parse(s);F.forEach(([id])=>{if(id in o)$('#'+id).value=o[id]})}}catch(e){}
document.addEventListener('input',()=>{try{localStorage[KEY]=JSON.stringify(vals())}catch(e){}});
new MutationObserver(()=>{$('#bcsv').hidden=!$('#out table')}).observe($('#out'),{childList:true,subtree:true});
run();
$('#bprint').onclick=()=>print();
$('#bcopy').onclick=async e=>{try{await navigator.clipboard.writeText($('#out').innerText);flash(e.target,'Copied')}catch(x){flash(e.target,'Copy failed')}};
$('#blink').onclick=async e=>{try{await navigator.clipboard.writeText(location.href.split('#')[0]+'#'+btoa(unescape(encodeURIComponent(JSON.stringify(vals())))));flash(e.target,'Link copied')}catch(x){flash(e.target,'Copy failed')}};
$('#breset').onclick=()=>{try{localStorage.removeItem(KEY)}catch(e){}try{history.replaceState(null,'',location.pathname)}catch(e){};location.reload()};
$('#bcsv').onclick=()=>{const t=[...$('#out table').rows].map(r=>[...r.cells].map(c=>'"'+c.innerText.replace(/"/g,'""')+'"').join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download=CUR+'.csv';a.click()};
$('#bpdf').onclick=pdf;
async function pdf(){
 const b=$('#bpdf'),o=b.textContent;b.textContent='Preparing…';
 try{
  await mcLoadPdfLibs();
  const m=T.mode,land=m=='cert',box=document.createElement('div');box.className='pdfsheet';box.style.width=(land?1122:794)+'px';
  const dt=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  box.innerHTML=(m=='std'||m=='bare'?`<div class="ph"><img src="${$('#hl').src}"><div><b>${T.title}</b><br><span>${dt}</span></div></div>`:'')
   +(m=='std'?`<h4>Inputs</h4><table>${F.map(([id,l])=>`<tr><td>${l}</td><td><b>${esc($('#'+id).value)}</b></td></tr>`).join('')}</table><h4>Results</h4>`:'')
   +`<div>${$('#out').innerHTML}</div>`+(land?'':'<div class="pf">Generated with MyChess64 Chess Tools · Learn. Play. Improve. Anytime, Anywhere.</div>');
  box.querySelectorAll('.noprint,a[onclick]').forEach(e=>e.remove());document.body.appendChild(box);
  const c=await html2canvas(box,{scale:2,backgroundColor:'#fff'});box.remove();
  const pd=new window.jspdf.jsPDF({orientation:land?'l':'p',unit:'pt',format:'a4'}),pw=pd.internal.pageSize.getWidth(),ph=pd.internal.pageSize.getHeight();
  if(land){const s=Math.min(pw/c.width,ph/c.height);pd.addImage(c,'PNG',(pw-c.width*s)/2,(ph-c.height*s)/2,c.width*s,c.height*s)}
  else{const pg=ph*c.width/pw;for(let off=0,p=0;off<c.height;off+=pg,p++){const s=document.createElement('canvas');s.width=c.width;s.height=Math.min(pg,c.height-off);s.getContext('2d').drawImage(c,0,off,c.width,s.height,0,0,c.width,s.height);if(p)pd.addPage();pd.addImage(s,'PNG',0,0,pw,s.height*pw/c.width)}}
  pd.save(T.slug+'.pdf');
 }catch(e){print()}finally{b.textContent=o}
}
