/* js/engine/standings.js - Points, Buchholz, Sonneborn-Berger and tie-break ordering. */
/* ---------- Standings ---------- */
function stats(rs=S.rounds){
 const {fmt,ps,boards}=S,team=fmt==='team',lg=fmt==='league';
 const st=ps.map(p=>({p,pts:(p.init||0)*(team?2:1),gp:(p.init||0)*(team?boards:1),w:0,opp:[],col:[],bye:p.init===1?1:0,res:[]}));
 const val=(x,y)=>team?(x>y?2:x===y?1:0):lg?(x>y?3:x===y?1:0):x;
 for(const rd of rs)for(const g of rd){
  const a=st[g.w];
  if(g.b===null){if(g.u===undefined){const bp=O().bye;a.pts+=bp*(team?2:lg?3:1);a.gp+=bp*(team?boards/2:1);if(bp===1)a.w++;a.bye++}else{a.pts+=g.u*(team?2:lg?3:1);a.gp+=g.u*(team?boards:1);if(g.u===1){a.w++;a.bye++}}a.col.push(null);continue}
  if(g.s===null)continue;
  const b=st[g.b];if(g.f){const wn=g.s===1?a:b;wn.pts+=team?2:lg?3:1;wn.gp+=team?boards:1;wn.w++;wn.bye++;continue}a.col.push('W');b.col.push('B');a.opp.push(g.b);b.opp.push(g.w);
  const sa=g.s,sb=(team?boards:1)-g.s;const wt=(x,y)=>team?(x>y?1:x===y?.5:0):x;a.res.push([g.b,wt(sa,sb)]);b.res.push([g.w,wt(sb,sa)]);
  a.pts+=val(sa,sb);b.pts+=val(sb,sa);a.gp+=sa;b.gp+=sb;
  if(sa>sb)a.w++;if(sb>sa)b.w++}
 for(const x of st){const o=x.opp.map(i=>st[i].pts).sort((m,n)=>m-n);
  x.buch=o.reduce((s,v)=>s+v,0);x.cut1=x.buch-(o[0]||0);x.sb=x.res.reduce((s,r)=>s+st[r[0]].pts*r[1],0)}
 return st}
const TB=[['cut1','buch','sb','w'],['w','cut1','buch','sb'],['sb','buch','cut1','w']];
const cmp=(a,b)=>{let d=b.pts-a.pts;if(d)return d;if(S.fmt==='team'){d=b.gp-a.gp;if(d)return d}for(const k of TB[S.tb||0]){d=b[k]-a[k];if(d)return d}return b.p.rating-a.p.rating};
