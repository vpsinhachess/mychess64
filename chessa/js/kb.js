/* Retrieval engine: normalise, tokenise, score, rank */
let active="All", lastTopic="";
function norm(s){return String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g," ").replace(/\s+/g," ").trim()}
function toks(s){return norm(s).split(" ").filter(x=>x&&!STOP.has(x))}
/* matching form: hyphens become spaces ("semi-open" = "semi open") */
const nz=s=>norm(s).replace(/-/g," ").replace(/\s+/g," ").trim();
/* whole-word / whole-phrase match (so "pin" does not match "opinion" and "tal" does not match "capital"); tolerates a plural "s" */
function wb(h,n){if(!n)return false;h=" "+h+" ";return h.includes(" "+n+" ")||h.includes(" "+n+"s ")}
/* title written with a possessive ("Queen's Gambit") may be asked as "queen gambit" or "queens gambit" */
const tvar=t=>[nz(t),nz(String(t).replace(/['’]s\b/g,"s")),nz(String(t).replace(/['’]s\b/g,""))];
function score(qv,e){
 const n=nz(qv), ts=toks(n); let s=0;
 const key=nz(e.key), topic=nz(e.topic), ans=nz(e.answer), tv=tvar(e.title), title=tv[0];
 const kw=key.split(" ").length, tw=title.split(" ").length;
 /* phrase matches; longer (more specific) phrases earn more, so "Queen's Gambit" beats plain "Gambit" */
 if(wb(n,key))s+=40+12*(kw-1);
 if(tv.some(t=>wb(n,t)))s+=30+12*(tw-1);
 for(const t of ts){
   if(key.split(" ").includes(t))s+=12;
   if(title.split(" ").includes(t)||tv[1].split(" ").includes(t)||tv[2].split(" ").includes(t))s+=8;
   if(topic.split(" ").includes(t))s+=3;
   if(ans.includes(t))s+=.45;
 }
 for(const [a,v] of Object.entries(ALIASES)) if(ts.includes(a)&&key===nz(v))s+=30;
 if(e.kid&&typeof KID!=="undefined")s+=KID.on()?(s>=10?25:0):-8;
 if(lastTopic===e.topic)s+=2;
 if(active!=="All"&&active!==e.topic)s-=15;
 return s;
}
function ranked(qv){return DB.map((e,i)=>[score(qv,e),i]).sort((a,b)=>b[0]-a[0])}
