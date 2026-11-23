/* js/engine/swiss.js - Swiss pairing (FIDE Dutch-style, score groups, backtracking). */
/* ---------- Swiss (Dutch-style: score groups, S1/S2 halves, backtracking) ---------- */
function swissNext(){
 const st=stats(),rn=S.rounds.length+1;
 const order=st.filter(x=>!(x.p.wd&&rn>=x.p.wd)&&!(x.p.id in S.pend)).sort((a,b)=>b.pts-a.pts||b.p.rating-a.p.rating||a.p.id-b.p.id);
 const n=order.length;if(n<2)return null;
 const had=new Set();for(const x of st)for(const o of x.opp)had.add(x.p.id+'-'+o);
 const pref=x=>{const c=x.col.filter(k=>k),d=c.filter(k=>k==='W').length-c.filter(k=>k==='B').length,l=c.slice(-2);
  if(d>=2||(l.length===2&&l[0]==='W'&&l[1]==='W'))return{c:'B',s:2,d};
  if(d<=-2||(l.length===2&&l[0]==='B'&&l[1]==='B'))return{c:'W',s:2,d};
  if(d===1)return{c:'B',s:1,d};if(d===-1)return{c:'W',s:1,d};
  if(c.length)return{c:c[c.length-1]==='W'?'B':'W',s:1,d};
  return{c:null,s:0,d:0}};
 const lastR=rn===S.R,tm=S.fmt==='team',P=new Map(st.map(x=>{const r={...pref(x)};if(lastR&&O().topExc&&r.s===2&&x.pts>(tm?S.R:S.R/2))r.s=1;return[x,r]}));
 const ok=(a,b)=>{if(had.has(a.p.id+'-'+b.p.id))return false;const pa=P.get(a),pb=P.get(b);
  return relax||!(pa.s===2&&pb.s===2&&pa.c===pb.c)};
 let steps=0,relax=false,T=0;const CAP=60000,INF=1e9;
 const cc=(p,q)=>{const a=P.get(p),b=P.get(q);return a.c&&a.c===b.c};
 const lf={};
 if(O().fh)for(let r=0;r<S.rounds.length;r++){const pr=stats(S.rounds.slice(0,r)),cur={};
  for(const g of S.rounds[r]){if(g.b===null||g.f)continue;const a=pr[g.w].pts,b=pr[g.b].pts;cur[g.w]=a>b?'D':a<b?'U':'';cur[g.b]=a>b?'U':a<b?'D':''}
  for(const x of st)lf[x.p.id]=cur[x.p.id]||''}
 const fcost=(p,q)=>{if(!O().fh||p.pts===q.pts)return 0;const hi=p.pts>q.pts?p:q,lo=hi===p?q:p;return(lf[hi.p.id]==='D'?1:0)+(lf[lo.p.id]==='U'?1:0)};
 function solve(L,fl,cl,fc){
  if(!L.length)return[];
  if(++steps>CAP)return null;
  const p=L[0],rest=L.slice(1);
  const g=rest.filter(x=>x.pts===p.pts),lo=rest.filter(x=>x.pts!==p.pts);
  const k=Math.max(0,Math.floor((g.length+1)/2)-1);
  for(const q of [...g.slice(k),...g.slice(0,k).reverse(),...lo]){
   if(!ok(p,q))continue;
   const f=p.pts!==q.pts?1:0,c=cc(p,q)?1:0,x=fcost(p,q);
   if(f>fl||c>cl||x>fc)continue;
   const r=solve(rest.filter(y=>y!==q),fl-f,cl-c,fc-x);
   if(r)return[[p,q],...r];
   if(steps>CAP)return null}
  return null}
 function best(L){const m=Math.floor(L.length/2);
  steps=0;let r1=solve(L,INF,INF,INF);if(!r1)return null;
  let f1=INF,c1=INF;
  for(let f=0;f<=m&&Date.now()<T;f++){steps=0;const r=solve(L,f,INF,INF);if(r){r1=r;f1=f;break}}
  for(let c=0;c<=m&&Date.now()<T;c++){steps=0;const r=solve(L,f1,c,INF);if(r){r1=r;c1=c;break}}
  if(O().fh)for(let x=0;x<=m&&Date.now()<T;x++){steps=0;const r=solve(L,f1,c1,x);if(r){r1=r;break}}
  return r1}
 let pairs=null,byeP=null;
 const run=()=>{T=Date.now()+1500;pairs=null;byeP=null;
  if(n%2){const c=[...order].reverse(),pool=c.filter(x=>x.bye===0);
   for(const b of(pool.length?pool:c)){const r=best(order.filter(x=>x!==b));if(r){pairs=r;byeP=b;break}}}
  else pairs=best(order)};
 delete S.warn;run();
 if(!pairs&&O().relax){relax=true;run();if(pairs)S.warn='Colour rules had to be relaxed in this round.'}
 if(!pairs)return null;
 pairs.sort((A,B)=>Math.max(B[0].pts,B[1].pts)-Math.max(A[0].pts,A[1].pts)||(B[0].pts+B[1].pts)-(A[0].pts+A[1].pts)||Math.min(A[0].p.id,A[1].p.id)-Math.min(B[0].p.id,B[1].p.id));
 const out=pairs.map(([a,b],i)=>{
  const pa=P.get(a),pb=P.get(b);let wa;
  if(pa.c&&pb.c&&pa.c!==pb.c)wa=pa.c==='W';
  else{const win=pa.s>pb.s?a:pb.s>pa.s?b:Math.abs(pa.d)>=Math.abs(pb.d)?a:b,pw=P.get(win);
   const wW=pw.c?pw.c==='W':(win===a?(i%2===0)===(O().init!=='B'):(i%2===1)===(O().init!=='B'));
   wa=win===a?wW:!wW}
  return wa?{w:a.p.id,b:b.p.id,s:null}:{w:b.p.id,b:a.p.id,s:null}});
 if(byeP)out.push({w:byeP.p.id,b:null,s:null});
 for(const id in S.pend)out.push({w:+id,b:null,s:null,u:S.pend[id]});
 return out}
