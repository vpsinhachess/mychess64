/* Retrieval engine: normalise, tokenise, score, rank */
let active="All", lastTopic="";
function norm(s){return String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g," ").replace(/\s+/g," ").trim()}
function toks(s){return norm(s).split(" ").filter(x=>x&&!STOP.has(x))}
function score(qv,e){
 const n=norm(qv), ts=toks(n); let s=0;
 const key=norm(e.key), title=norm(e.title), topic=norm(e.topic), ans=norm(e.answer);
 if(n.includes(key))s+=40;if(n.includes(title))s+=30;
 for(const t of ts){
   if(key.split(" ").includes(t))s+=12;
   if(title.split(" ").includes(t))s+=8;
   if(topic.split(" ").includes(t))s+=3;
   if(ans.includes(t))s+=.45;
 }
 for(const [a,v] of Object.entries(ALIASES)) if(ts.includes(a)&&key===norm(v))s+=30;
 if(lastTopic===e.topic)s+=2;
 if(active!=="All"&&active!==e.topic)s-=15;
 return s;
}
function ranked(qv){return DB.map((e,i)=>[score(qv,e),i]).sort((a,b)=>b[0]-a[0])}

