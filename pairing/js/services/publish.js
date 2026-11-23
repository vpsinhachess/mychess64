/* js/services/publish.js - Publishing pairings and results to the live page. */
/* ---------- Live publishing (organiser) and participant page ---------- */
function pubData(){const P=S.pub;return{name:S.name||'',det:S.det||{},opt:{bye:O().bye},fmt:S.fmt,boards:S.boards,R:S.R,tb:S.tb||0,pub:{pair:P.pair,res:P.res},upd:Date.now(),
 ps:S.ps.map(p=>({id:p.id,name:p.name,rating:p.rating,wd:p.wd||0,init:p.init||0})),
 rounds:S.rounds.slice(0,P.pair).map((r,i)=>r.map(g=>i<P.res?g:{w:g.w,b:g.b,s:null,u:g.u}))}}
function sig(){const d=pubData();delete d.upd;return JSON.stringify(d)}
function pst(){const P=S.pub;$('pst').textContent=(P.pair?'Live: pairings R1\u2013'+P.pair+(P.res?', results R1\u2013'+P.res:', no results yet')+'.':'Nothing published yet.')+(P.pair&&S.psig!==sig()?' \u26a0 Unpublished changes: publish again.':'')}
async function pubSend(m){save();pst();
 if(!dbh)return toast('Live publishing is not available in this view.');
 try{await dbh.doc('t/'+TID).set({j:JSON.stringify(pubData())});S.psig=sig();save();pst();toast(m)}catch(e){toast('Publish failed: '+((e&&e.message)||'error'))}}
function pubP(){const n=N(),dn=g=>g.b===null||g.s!==null;let k=0;
 for(let i=0;i<n-1;i++){if(!S.rounds[i].every(dn))break;k=i+1}
 S.pub.pair=Math.max(S.pub.pair,n);S.pub.res=Math.max(S.pub.res,k);
 pubSend(k<n-1?RN(n)+' pairing is live. '+RN(k+1)+' results are incomplete, so standings stop at '+RN(k)+'.':RN(n)+' pairing is live'+(n>1?' with the standing of '+RN(n-1)+'.':'.'))}
function pubR(){const n=N();
 for(let i=0;i<n;i++)if(!S.rounds[i].every(g=>g.b===null||g.s!==null))return toast('Enter all results of '+RN(i+1)+' first.');
 S.pub.res=Math.max(S.pub.res,n);S.pub.pair=Math.max(S.pub.pair,n);pubSend('Results and standing up to '+RN(n)+' are live.')}
async function unpub(){S.pub={pair:0,res:0};save();pst();try{if(dbh)await dbh.doc('t/'+TID).set({j:JSON.stringify(pubData())});toast('Unpublished.')}catch(e){toast('Could not unpublish.')}}
