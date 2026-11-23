/* js/services/export.js - Export: PDF, CSV and signed JSON backups. */
/* ---------- Export / Import / UI helpers ---------- */
const N=()=>+($('vw').hidden?$('xr'):$('vxr')).value,fn=x=>S.fmt+'_'+x+'_'+new Date().toISOString().slice(0,10);
const rt=g=>g.b===null?(g.u===undefined?'bye':'absent '+g.u):g.s===null?'':g.f?(g.s===1?'+/-':'-/+'):S.fmt==='team'?g.s+'-'+(S.boards-g.s):g.s===1?'1-0':g.s===0?'0-1':'1/2-1/2';
function snap(n){const c=JSON.parse(JSON.stringify(S));delete c.view;
 if(S.fmt==='rr'||S.fmt==='league')c.rounds=c.rounds.map((r,i)=>i<n?r:r.map(g=>({...g,s:null})));else c.rounds=c.rounds.slice(0,n);return c}
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function env(t,kind,thr){const p=JSON.stringify(t);return JSON.stringify({app:'chess-tm',v:2,kind,tid:TID,through:thr,exported:new Date().toISOString(),sum:await sha(p),sig:TOKEN?await sha(TOKEN+':'+p):'',t},null,1)}
async function xJSON(){const n=N();dl(fn('through-R'+n)+'.json',await env(snap(n),'partial',n))}
async function xFull(){const c=JSON.parse(JSON.stringify(S));delete c.view;dl(fn('FULL')+'.json',await env(c,'full',S.rounds.length))}
function xCSV(){const n=N()-1,q=s=>'"'+String(s).replace(/"/g,'""')+'"';
 const rows=[['Round','Board','White','White rating','Result','Black','Black rating']];
 S.rounds[n].forEach((g,i)=>rows.push([n+1,i+1,nm(g.w),S.ps[g.w].rating,rt(g),g.b===null?'':nm(g.b),g.b===null?'':S.ps[g.b].rating]));
 dl(fn('round'+(n+1))+'.csv',rows.map(r=>r.map(q).join(',')).join('\n'))}
async function xPDF(mode){mode=mode||'both';await loadLogo();
 if(!window.jspdf){toast('PDF library failed to load.');return}
 if(S.ps.some(p=>/[^\x00-\xff]/.test(p.name)))toast('PDF supports Latin letters only.');
 const n=N(),t=S.fmt==='team',lim=S.vo?Math.min(n,S.pub.res):n,d=S.det||{},doc=new window.jspdf.jsPDF({orientation:'landscape'}),W=doc.internal.pageSize.getWidth(),H=doc.internal.pageSize.getHeight();let y=14;try{doc.addImage(LG.d,'PNG',10,5,LG.w,LG.h)}catch(e){}
 const row=(c,x,b)=>{if(y>196){doc.addPage();y=14}doc.setFont('helvetica',b?'bold':'normal');doc.setFontSize(9);c.forEach((v,i)=>doc.text(String(v).slice(0,34),x[i],y));y+=6;if(b)doc.line(10,y-4.5,W-10,y-4.5)};
 doc.setFontSize(18);doc.setFont('helvetica','bold');doc.text(S.name||'Chess Tournament',W/2,y,{align:'center'});y+=8;
 doc.setFontSize(10);doc.setFont('helvetica','normal');
 [['Date',d.date],['Venue',d.venue],['Organiser',d.org],['Arbiter',d.arb]].filter(x=>x[1]).forEach(x=>{doc.text(x[0]+': '+x[1],W-12,y,{align:'right'});y+=5});
 y=Math.max(y+3,30);
 if(mode!=='stand'){doc.setFontSize(13);doc.setFont('helvetica','bold');doc.text(RN(n)+' - Pairing',12,y);y+=8;
  const pre=stats(S.rounds.slice(0,Math.min(n-1,lim))),px=[12,22,92,108,124,150,220,236],pt=t?'MP':'Pts';
  row(['Bd','White','Rtg',pt,'Result','Black','Rtg',pt],px,1);
  S.rounds[n-1].forEach((g,i)=>{const w=S.ps[g.w],b=g.b===null?null:S.ps[g.b];
   row([i+1,w.name,w.rating||'',pre[g.w].pts,g.b===null?(g.u===undefined?'Bye':'Absent'):(n<=lim?(rt(g)||'-'):'-'),b?b.name:'-',b?(b.rating||''):'',b?pre[g.b].pts:''],px)});y+=6}
 if(mode!=='pair'){doc.setFontSize(13);doc.setFont('helvetica','bold');
  if(!lim)doc.text('No results published yet.',12,y);else{
   doc.text('Standing of '+RN(lim),12,y);y+=8;
   const sx=[12,22,100,120,138,156,176,196,216];row(['#','Name','Rtg',t?'MP':'Pts',t?'GP':'','Buch-1','Buch','SB','Wins'],sx,1);
   stats(S.rounds.slice(0,lim)).sort(cmp).forEach((x,i)=>row([i+1,x.p.name,x.p.rating||'',x.pts,t?x.gp:'',x.cut1,x.buch,+x.sb.toFixed(2),x.w],sx))}}
 const pc=doc.getNumberOfPages();
 for(let i=1;i<=pc;i++){doc.setPage(i);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.text('Designed and Developed by: Ved Prakash Sinha  |  MyChess64 - Learn. Play. Improve. Anytime, Anywhere.',W/2,H-6,{align:'center'});doc.text('Page '+i+' / '+pc,W-12,H-6,{align:'right'})}
 dl(fn((mode==='stand'?'standing-R':'pairing-R')+n)+'.pdf',doc.output('blob'))}
function xST(){const n=N(),t=S.fmt==='team',lim=S.vo?Math.min(n,S.pub.res):n,q=s=>'"'+String(s).replace(/"/g,'""')+'"';
 const rows=[['Rank','Name','Rating',t?'Match pts':'Points',t?'Game pts':'','Buchholz-1','Buchholz','Sonneborn-Berger','Wins']];
 stats(S.rounds.slice(0,lim)).sort(cmp).forEach((x,i)=>rows.push([i+1,x.p.name,x.p.rating,x.pts,t?x.gp:'',x.cut1,x.buch,+x.sb.toFixed(2),x.w]));
 dl(fn('standings-R'+lim)+'.csv',rows.map(r=>r.map(q).join(',')).join('\n'))}
