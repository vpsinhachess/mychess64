/* js/core/utils.js - Small helpers: text cleaning, dates, toast, theme switch, file download. */
const nm=i=>S.ps[i].name;
const cl=s=>String(s==null?'':s).replace(/[<>&"'`]/g,'').trim().slice(0,60);
const cl2=s=>String(s==null?'':s).replace(/[<>&"'`]/g,'').trim().slice(0,120);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fd=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?(+m[3])+' '+MON[+m[2]-1]+' '+m[1]:''};
const iso=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||'')?s:'';
const sdet=o=>{o=o||{};let a=iso(o.d1),b=iso(o.d2);if(!a&&b){a=b;b=''}if(a&&b&&b<a){const x=a;a=b;b=x}
 const date=a?(b&&b!==a?fd(a)+' to '+fd(b):fd(a)):cl2(o.date);return{date,d1:a,d2:b,venue:cl2(o.venue),org:cl2(o.org),arb:cl2(o.arb)}};
const rid=n=>{const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',a=crypto.getRandomValues(new Uint8Array(n));return[...a].map(v=>c[v%c.length]).join('')};
const RN=i=>'Round '+String(i).padStart(2,'0');
const NAMES={swiss:'Swiss',rr:'Round Robin',league:'League',ko:'Knockout',team:'Team Swiss'};
let tt;function toast(m){const e=$('toast');e.textContent=m;e.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('show'),3200)}
function theme(){const r=document.documentElement,d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=d?'light':'dark'}
async function dl(filename,data){if(/\.csv$/i.test(filename))data='\ufeff'+data.replace(/(^|,|\n)"([=+@-])/g,"$1\"'$2");
 const b=data instanceof Blob?data:new Blob([data]),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);toast('Saved '+filename)}
