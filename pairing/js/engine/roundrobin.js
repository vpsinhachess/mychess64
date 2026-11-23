/* js/engine/roundrobin.js - Round robin / league pairing (Berger tables). */
/* ---------- Round robin (Berger / circle method) ---------- */
function rrRounds(n,dbl){
 const ids=[...Array(n).keys()];if(n%2)ids.push(null);const m=ids.length,out=[];let a=ids.slice();
 for(let r=0;r<m-1;r++){const rd=[];
  for(let i=0;i<m/2;i++){let x=a[i],y=a[m-1-i];if(i===0&&r%2)[x,y]=[y,x];rd.push([x,y])}
  out.push(rd);a=[a[0],a[m-1],...a.slice(1,m-1)]}
 const mk=(rd,sw)=>rd.map(([x,y])=>{if(sw)[x,y]=[y,x];return y===null?{w:x,b:null,s:null}:x===null?{w:y,b:null,s:null}:{w:x,b:y,s:null}});
 let res=out.map(rd=>mk(rd,false));
 if(dbl)res=res.concat(out.map(rd=>mk(rd,true)));
 return res}
