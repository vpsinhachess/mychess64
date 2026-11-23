/* js/engine/knockout.js - Knockout seeding and next-round pairing. */
/* ---------- Knockout ---------- */
function koFirst(n){
 let P=1;while(P<n)P*=2;let o=[1];
 while(o.length<P){const L=o.length*2+1;o=o.flatMap(s=>[s,L-s])}
 const g=[];for(let i=0;i<P;i+=2){const a=o[i],b=o[i+1];
  if(b>n)g.push({w:a-1,b:null,s:null});else if(a>n)g.push({w:b-1,b:null,s:null});else g.push({w:Math.min(a,b)-1,b:Math.max(a,b)-1,s:null})}
 return {g,R:Math.log2(P)}}
function koNext(){
 const prev=S.rounds[S.rounds.length-1];
 const win=prev.map(g=>g.b===null?g.w:(g.s===1?g.w:g.b));const g=[];
 for(let i=0;i<win.length;i+=2)g.push({w:win[i],b:win[i+1],s:null});
 return g}
