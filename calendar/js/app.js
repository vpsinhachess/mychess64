/* Public page: loads data/events.json (refreshed weekly by GitHub Actions) + organiser events */
let events=[],STATIC=[],DB=[],META=null,LOADERR=false;
const PAGE=24;let shown=PAGE;
const monthName=d=>new Date(d+"T00:00:00").toLocaleDateString("en-IN",{month:"long",year:"numeric"});
const fmtD=t=>new Date(t).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
const isNational=e=>e.format==="National"||/\bnational\b/i.test(e.title);
const isInternational=e=>/\binternational\b|grandmaster/i.test(e.title);
const category=e=>isNational(e)?"National":isInternational(e)?"International":"Open";
const st=e=>e.state||"Other",dist=e=>e.district||"";
const dd=(a,b)=>Math.round((new Date(a+"T00:00:00")-new Date(b+"T00:00:00"))/864e5);

async function loadStatic(){
 try{
  const r=await fetch("data/events.json?d="+todayStr(),{cache:"no-cache"});
  if(!r.ok)throw new Error(r.status);
  const j=await r.json();STATIC=Array.isArray(j.events)?j.events:[];META=j.meta||null;
 }catch(e){STATIC=[];META=null;LOADERR=true}
 rebuild();
}
function rebuild(){
 const t=todayStr();
 events=[...STATIC,...DB].filter(e=>e.end>=t);   // ongoing events stay until their last day
 setStatus();refreshUI();
}
function setStatus(){
 const s=$("liveStatus");
 if(!META){s.textContent=LOADERR?"● Event data could not be loaded":"";s.className="live-dot stale";return}
 const age=(Date.now()-Date.parse(META.updated))/864e5,old=age>8,a=META.sources?.aicf;
 s.textContent=old?`● Data last updated ${Math.floor(age)} days ago — refresh pending`
  :`● Auto-updated ${fmtD(META.updated)} from AICF & FIDE (weekly)`+(a&&a.ok===false?" · AICF unreachable, showing last good data":"");
 s.className="live-dot"+(old||(a&&a.ok===false)?" stale":"");
 const c=$("checked");if(c)c.textContent=fmtD(META.updated);
}

function fillSel(id,label,vals,keep,sort=true){
 const el=$(id);let u=[...new Set(vals.filter(Boolean))];if(sort)u.sort();
 el.replaceChildren(new Option("All "+label,""));u.forEach(v=>el.add(new Option(v,v)));
 el.value=u.includes(keep)?keep:"";
}
function refreshUI(){
 const s0=$("state").value,p0=$("place").value,f0=$("format").value,m0=$("month").value;
 fillSel("state","State",events.map(st),s0);
 const s=$("state").value;
 fillSel("place","District",events.filter(e=>!s||st(e)===s).map(dist),p0);
 fillSel("format","Format",events.map(e=>e.format),f0);
 fillSel("month","Month",[...events].sort((a,b)=>a.start.localeCompare(b.start)).map(e=>monthName(e.start)),m0,false);
 const n=(k,v)=>$(k).textContent=v;
 n("count",events.length);n("states",new Set(events.map(st).filter(x=>x!=="Other")).size);
 n("national",events.filter(isNational).length);n("months",new Set(events.map(e=>monthName(e.start))).size);
 shown=PAGE;render();
}
function filtered(){
 const q=$("search").value.toLowerCase().trim().split(/\s+/).filter(Boolean),s=$("state").value,p=$("place").value,f=$("format").value,m=$("month").value;
 return events.filter(e=>{
  const hay=[e.title,e.code,e.place,e.state,e.district,e.format].join(" ").toLowerCase();
  return q.every(w=>hay.includes(w))&&(!s||st(e)===s)&&(!p||dist(e)===p)&&(!f||e.format===f)&&(!m||monthName(e.start)===m);
 }).sort((a,b)=>a.start.localeCompare(b.start)||a.title.localeCompare(b.title));
}
function tagsFor(e){
 const x=[e.format];
 [[/below 1800/i,"Below 1800"],[/below 1700/i,"Below 1700"],[/below 1600/i,"Below 1600"],[/above 2100|above 2000/i,"2000+"],[/women|girls/i,"Women"],[/junior|youth|under[- ]?\d+/i,"Junior"]].forEach(([r,l])=>r.test(e.title)&&x.push(l));
 return [...new Set(x)].slice(0,4);
}
function when(e){
 const t=todayStr();
 if(e.start<=t&&e.end>=t)return["Ongoing","on"];
 const d=dd(e.start,t);
 return d>=1&&d<=7?[d===1?"Starts tomorrow":`Starts in ${d} days`,"soon"]:null;
}
function card(e){
 const c=category(e),cls=c==="National"?"national":c==="International"?"international":"",w=when(e),db=e.source==="db";
 const src={aicf:"AICF",fide:"FIDE",db:"Organiser"}[e.source]||"AICF";
 const loc=[e.district,e.state].filter(Boolean).join(", ")||e.place||"",url=safeUrl(e.brochure);
 const pdf=url?`<a class="btn download" href="${esc(url)}" target="_blank" rel="noopener">⬇ Brochure PDF</a>`:`<span class="btn download" style="opacity:.55;cursor:not-allowed">PDF Not Available</span>`;
 const main=db?`<a class="btn" href="#" data-int="${esc(e.id)}">♟ I'm Interested</a>`
  :`<a class="btn" href="${e.source==="fide"?"https://calendar.fide.com/":"https://aicf.in/all-events/"}" target="_blank" rel="noopener">${src} Listing ↗</a>`;
 const wa="https://wa.me/?text="+encodeURIComponent(`${e.title}\n${fmt(e.start)} – ${fmt(e.end)} · ${loc}\nhttps://www.mychess64.com/`);
 const code=db?"Event Code: "+e.code:e.source==="fide"?"FIDE Calendar":"AICF Event Code: "+e.code;
 return `<article class="card"><div class="card-top"><div class="chips"><span class="badge ${cls}">${c}</span><span class="chip">${src}</span>${w?`<span class="chip ${w[1]}">${w[0]}</span>`:""}${e.fix?'<span class="chip soon" title="The source listed inconsistent dates">Check dates</span>':""}</div>
 <div class="datebox"><small>Event Dates</small>${fmt(e.start)}${e.end!==e.start?`<br>— ${fmt(e.end)}`:""}</div></div>
 <div class="card-body"><h3>${esc(e.title)}</h3>
 <div class="meta"><div><span class="icon">📍</span><span>${esc(loc)}${db&&e.venue?" · "+esc(e.venue):""}</span></div><div><span class="icon">♟</span><span>${esc(e.format)} tournament</span></div>${db?`<div><span class="icon">₹</span><span>Entry fee ₹${esc(e.fee)}</span></div>`:""}</div>
 <div class="code-row"><span class="code">${esc(code)}</span><span class="format">${esc(e.format)}</span></div>
 <div class="tags">${tagsFor(e).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
 <div class="card-actions">${pdf}${main}</div>
 <div class="mini"><a href="#" data-ics="${esc(e.id)}">＋ Add to calendar</a><a href="${wa}" target="_blank" rel="noopener">Share on WhatsApp</a></div></div></article>`;
}
function render(){
 const list=filtered(),n=list.length;
 $("result").childNodes[0].textContent=n?`Showing ${Math.min(shown,n)} of ${n} upcoming event${n===1?"":"s"} `:"";
 if(!n){
  $("eventArea").innerHTML=LOADERR?`<div class="empty">Event data could not be loaded right now.<br><br><a class="btn" href="https://aicf.in/all-events/" target="_blank" rel="noopener">Open AICF All Events ↗</a></div>`
   :`<div class="empty">No tournaments match your search or filters.<br><br><button onclick="resetFilters()">Clear Filters</button></div>`;
  $("moreBox").innerHTML="";return;
 }
 const g={};list.slice(0,shown).forEach(e=>(g[monthName(e.start)]??=[]).push(e));
 $("eventArea").innerHTML=Object.entries(g).map(([m,a])=>`<div class="month"><div class="month-title"><h2>${m}</h2><span>${a.length} event${a.length===1?"":"s"}</span><div class="month-line"></div></div><div class="grid">${a.map(card).join("")}</div></div>`).join("");
 $("moreBox").innerHTML=n>shown?`<button data-more="1">Show more (${n-shown} remaining)</button>`:"";
}
function resetFilters(){["search","state","place","format","month"].forEach(i=>$(i).value="");refreshUI()}

function ics(e){
 const d=s=>s.replace(/-/g,""),x=new Date(e.end+"T00:00:00Z");x.setUTCDate(x.getUTCDate()+1);
 const t=s=>String(s).replace(/[\\;,]/g,"\\$&").replace(/\n/g,"\\n"),loc=[e.district,e.state].filter(Boolean).join(", ")||e.place||"";
 const body=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//MyChess64//Events//EN","BEGIN:VEVENT",`UID:${e.id}@mychess64.com`,
  `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d+/g,"")}`,`DTSTART;VALUE=DATE:${d(e.start)}`,`DTEND;VALUE=DATE:${x.toISOString().slice(0,10).replace(/-/g,"")}`,
  `SUMMARY:${t(e.title)}`,`LOCATION:${t(loc)}`,`DESCRIPTION:${t("Check the official brochure before travelling. https://www.mychess64.com/")}`,"END:VEVENT","END:VCALENDAR"].join("\r\n");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([body],{type:"text/calendar"}));
 a.download=(e.code||"event").replace(/[^\w-]+/g,"_")+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}

$("state").addEventListener("change",()=>{fillSel("place","District",events.filter(e=>!$("state").value||st(e)===$("state").value).map(dist),"");shown=PAGE;render()});
["place","format","month"].forEach(id=>$(id).addEventListener("change",()=>{shown=PAGE;render()}));
let tm;$("search").addEventListener("input",()=>{clearTimeout(tm);tm=setTimeout(()=>{shown=PAGE;render()},150)});
$("reset").addEventListener("click",resetFilters);
document.addEventListener("click",ev=>{
 const a=ev.target.closest("[data-int],[data-ics],[data-more]");if(!a)return;ev.preventDefault();
 if(a.dataset.more){shown+=PAGE;render();return}
 if(a.dataset.int)return openInterest(a.dataset.int);
 const e=events.find(x=>x.id===a.dataset.ics);if(e)ics(e);
});
loadStatic();
