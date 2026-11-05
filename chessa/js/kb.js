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
/* per-entry text is normalised once and cached; per-question work is done once, not once per entry (fast with thousands of entries) */
const nf=e=>e._n||(e._n=(()=>{const key=nz(e.key),tv=tvar(e.title),sp=x=>new Set(x.split(" "));return{key,topic:nz(e.topic),ans:nz(e.answer),tv,kws:sp(key),kwn:key.split(" ").length,tws:new Set([...sp(tv[0]),...sp(tv[1]),...sp(tv[2])]),twn:tv[0].split(" ").length,tps:sp(nz(e.topic)),q:(e.q||[]).map(x=>{const n=nz(x);return{n,w:n.split(" ").length,t:toks(n)}}).filter(x=>x.n),kw:(e.kw||[]).map(x=>{const n=nz(x);return{n,w:n.split(" ").length}}).filter(x=>x.n)}})());
let _q,_n,_ts,_al,_nw;
function qctx(qv){if(qv!==_q){_q=qv;_n=nz(qv);_ts=toks(_n);_nw=_n.split(" ").length;_al=Object.entries(ALIASES).filter(([a])=>_ts.includes(a)).map(([a,v])=>nz(v))}}
function score(qv,e){
 qctx(qv);const n=_n,ts=_ts;let s=0;
 const c=nf(e),key=c.key,ans=c.ans,tv=c.tv;
 /* phrase matches; longer (more specific) phrases earn more, so "Queen's Gambit" beats plain "Gambit" */
 if(wb(n,key))s+=40+12*(c.kwn-1);
 if(tv.some(t=>wb(n,t)))s+=30+12*(c.twn-1);
 for(const t of ts){
   if(c.kws.has(t))s+=12;
   if(c.tws.has(t))s+=8;
   if(c.tps.has(t))s+=3;
   if(ans.includes(t))s+=.45;
 }
 /* knowledge packs: keyword phrases, and the questions an entry is written to answer */
 if(c.kw.length){let b=0;for(const k of c.kw)if(wb(n,k.n)){const v=18+10*(k.w-1);if(v>b)b=v}s+=b}
 if(c.q.length){let b=0;for(const x of c.q){if(n===x.n){b=95;break}if(x.w<=_nw+1&&x.n.startsWith(n+" ")&&b<55)b=55;if(x.t.length>=2&&ts.length>=2){let h=0;for(const t of x.t)if(ts.includes(t))h++;const r=h/Math.max(x.t.length,ts.length);if(r>=.6&&r*60>b)b=r*60}}s+=b}
 for(const v of _al)if(key===v)s+=30;
 if(e.kid&&typeof KID!=="undefined")s+=KID.on()?(s>=10?25:0):-8;
 if(lastTopic===e.topic)s+=2;
 if(active!=="All"&&active!==e.topic)s-=15;
 return s;
}

function ranked(qv){return DB.map((e,i)=>[score(qv,e),i]).sort((a,b)=>b[0]-a[0])}
