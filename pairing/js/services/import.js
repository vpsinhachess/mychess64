/* js/services/import.js - Import and restore from backup files. */
async function fileIn(el){const f=el.files[0];if(f)imp(await f.text())}
function parseT(t){
 if(!t||!Array.isArray(t.ps)||!Array.isArray(t.rounds)||!t.rounds.length||!['swiss','rr','league','ko','team'].includes(t.fmt))throw 'This is not a tournament data file.';
 const n=t.ps.length;if(n<2)throw 'No players in file.';
 for(const r of t.rounds){if(!Array.isArray(r))throw 'Invalid round data.';for(const g of r){if(!Number.isInteger(g.w)||g.w<0||g.w>=n||(g.b!==null&&(!Number.isInteger(g.b)||g.b<0||g.b>=n||g.b===g.w)))throw 'Invalid pairing data.';if(g.s!==null&&typeof g.s!=='number')throw 'Invalid result data.'}}
 const X=JSON.parse(JSON.stringify(t));['psig','vo','vv','warn'].forEach(k=>delete X[k]);
 X.ps=X.ps.map((p,i)=>({...p,id:i,name:cl(p.name)||'Player '+(i+1),rating:+p.rating||0,wd:+p.wd||0,init:+p.init||0}));
 X.name=cl(X.name);X.det=sdet(X.det);X.pend=X.pend||{};X.pub=X.pub||{pair:0,res:0};X.tb=+X.tb||0;X.boards=+X.boards||1;X.R=+X.R||X.rounds.length;X.opt=X.opt||{};
 const k=X.rounds.findIndex(r=>r.some(g=>g.b!==null&&g.s===null));X.view=k<0?X.rounds.length-1:k;return{k,S:X}}
async function readT(txt){const o=JSON.parse(txt);let warn='';
 if(o&&o.v>=2){const p=JSON.stringify(o.t);
  if(!o.sum||o.sum!==await sha(p))throw 'File is damaged or has been edited (checksum mismatch). Nothing was imported.';
  if(o.tid&&o.tid===TID&&TOKEN){if(o.sig!==await sha(TOKEN+':'+p))throw 'Signature mismatch: not an authentic export of this tournament. Nothing was imported.'}
  else if(o.tid&&o.tid!==TID)warn=' (file is from tournament '+o.tid+')'}
 else warn=' (old file format: integrity not verified)';
 const r=parseT(o.t||o);r.warn=warn;return r}
async function imp(txt){try{if(!TID)throw 'Log in or create a tournament first.';const o=await readT(txt),rv=S?S.rev||0:0;
 try{localStorage.setItem('chessPre:'+TID,JSON.stringify(S))}catch(x){}
 S=o.S;S.rev=rv;FD=null;save();$('imp').hidden=true;$('ie').textContent='';render();toast('Imported'+o.warn+'. Continue from round '+(o.k<0?S.rounds.length:o.k+1)+'. Previous version kept on this device.')}catch(e){$('ie').textContent=typeof e==='string'?e:'Invalid or corrupted file.'}}
async function newFromFile(el){const f=el.files[0];if(!f)return;const e=$('e1');e.textContent='';
 try{S=(await readT(await f.text())).S;S.pub={pair:0,res:0}}catch(x){S=null;e.textContent=typeof x==='string'?x:'Invalid or corrupted file.';return}
 if(!await mkT()){S=null;return}save();watch();render()}
