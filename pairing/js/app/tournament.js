/* js/app/tournament.js - Tournament actions: start, next round, results, undo. */
/* ---------- Control ---------- */
async function start(){
 const f=$('fmt').value,e=$('e1');e.textContent='';
 const ps=$('pl').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const i=l.lastIndexOf(',');
  return i<0?{name:cl(l),rating:0}:{name:cl(l.slice(0,i)),rating:parseInt(l.slice(i+1))||0}});
 const n=ps.length;
 if(n<2||ps.some(p=>!p.name)){e.textContent='Enter at least 2 players/teams, each with a name.';return}
 if(new Set(ps.map(p=>p.name.toLowerCase())).size!==n){e.textContent='Names must be unique.';return}
 ps.sort((a,b)=>b.rating-a.rating||a.name.localeCompare(b.name));ps.forEach((p,i)=>p.id=i);
 const boards=f==='team'?Math.max(1,parseInt($('boards').value)||4):1;
 S={fmt:f,ps,boards,rounds:[],R:0,view:0,pend:{},tb:0,pub:{pair:0,res:0},name:cl($('tn').value),det:sdet({d1:$('sd1').value,d2:$('sd2').value,venue:$('svn').value,org:$('so').value,arb:$('sa').value}),opt:{init:'W',bye:1,topExc:true,fh:true,relax:true}};
 if(f==='swiss'||f==='team'){
  const R=parseInt($('rounds').value)||Math.ceil(Math.log2(n));
  if(R>n-1||R<1){e.textContent='Rounds must be between 1 and '+(n-1)+' (no repeat pairings allowed).';S=null;return}
  S.R=R;S.rounds=[swissNext()];
  if(!S.rounds[0]){e.textContent='Could not pair round 1.';S=null;return}
 }else if(f==='rr'||f==='league'){S.rounds=rrRounds(n,f==='league');S.R=S.rounds.length}
 else{const k=koFirst(n);S.rounds=[k.g];S.R=k.R}
 if(!await mkT()){S=null;return}
 save();watch();render()}
function next(){
 const e=$('e2');e.textContent='';
 const last=S.rounds[S.rounds.length-1];
 if(!last.every(g=>g.b===null||g.s!==null)){e.textContent='Enter all results first.';return}
 if(S.rounds.length>=S.R)return;
 const g=S.fmt==='ko'?koNext():swissNext();
 if(!g){e.textContent='No valid pairing found (fewer than 2 active players, or search limit reached).';return}
 S.rounds.push(g);S.pend={};S.view=S.rounds.length-1;if(S.warn){toast(S.warn);delete S.warn}save();render()}
function setRes(r,i,v){const g=S.rounds[r][i],fo=v[0]==='f';g.f=fo?1:0;g.s=v===''?null:fo?+v.slice(1):+v;
 if(r===S.rounds.length-1&&(S.fmt==='swiss'||S.fmt==='team')){delete S.pend[g.w];delete S.pend[g.b];if(fo){S.pend[g.s===1?g.b:g.w]=0;toast('Absent player is set to − for the next round.')}}
 save();render()}
function fmtUI(){const f=$('fmt').value;$('rW').hidden=!(f==='swiss'||f==='team');$('bW').hidden=f!=='team'}
let ud=0;function undo(){if(!ud){ud=1;toast('Press Undo again to remove round '+S.rounds.length+'.');setTimeout(()=>ud=0,4000);return}ud=0;S.rounds.pop().forEach(g=>{if(g.b===null&&g.u!==undefined)S.pend[g.w]=g.u});const op=S.pub.pair,or=S.pub.res;S.pub.pair=Math.min(S.pub.pair,S.rounds.length);S.pub.res=Math.min(S.pub.res,S.rounds.length);S.view=S.rounds.length-1;save();render();if(S.pub.pair<op||S.pub.res<or)pubSend('Live page updated.')}
