/* Chess logic (FIDE): move generation + attacked squares */
const DIR={R:[[1,0],[-1,0],[0,1],[0,-1]],B:[[1,1],[1,-1],[-1,1],[-1,-1]]};DIR.Q=DIR.K=DIR.R.concat(DIR.B);
const JM=[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]],sqa=(x,y)=>x>=0&&x<8&&y>0&&y<9?F[x]+y:null;
function reach(t,sq,P,col,att){const f=F.indexOf(sq[0]),r=+sq[1],o=[],dr=col==='w'?1:-1;
if(t==='P'){if(att)[-1,1].forEach(d=>{const c=sqa(f+d,r+dr);c&&o.push(c)});
else{const a=sqa(f,r+dr);if(a&&!P[a]){o.push(a);const b=(col==='w'?r===2:r===7)&&sqa(f,r+2*dr);if(b&&!P[b])o.push(b)}[-1,1].forEach(d=>{const c=sqa(f+d,r+dr);if(c&&P[c]&&P[c][0]!==col)o.push(c)})}}
else if(t==='N')JM.forEach(([x,y])=>{const c=sqa(f+x,r+y);if(c&&(att||!(P[c]&&P[c][0]===col)))o.push(c)});
else DIR[t].forEach(([x,y])=>{for(let i=1;i<8;i++){const c=sqa(f+x*i,r+y*i);if(!c)break;if(P[c]){if(att||P[c][0]!==col)o.push(c);break}o.push(c);if(t==='K')break}});
return o}
function atk(P,by){const s=new Set();for(const q in P)if(P[q][0]===by)reach(P[q][1],q,P,by,1).forEach(x=>s.add(x));return s}
function legal(t,sq,P){let o=reach(t,sq,P,'w');if(t==='K'){const Q={...P};delete Q[sq];const a=atk(Q,'b');o=o.filter(x=>!a.has(x))}return o}
const DESC={K:'Moves one square in any direction — but NEVER onto a square the enemy attacks (that would be check!).',Q:'Moves any number of squares in a straight line or diagonal — rook and bishop combined.',R:'Moves any number of squares along ranks and files (straight lines).',B:'Moves any number of squares diagonally and stays on one colour for the whole game.',N:'Jumps in an L-shape: two squares one way, one sideways. The only piece that can jump over others.',P:'Moves forward one square (two from its starting square) and captures diagonally. Never moves backward.'};

const cdist=(a,b)=>Math.max(Math.abs(F.indexOf(a[0])-F.indexOf(b[0])),Math.abs(a[1]-b[1])),shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
function wmoves(P){const K=Object.keys(P).find(q=>P[q]==='wK'),o=[];for(const s in P){if(P[s][0]!=='w')continue;const t=P[s][1];reach(t,s,P,'w').forEach(d=>{if(P[d]==='bK')return;const Q={...P};delete Q[s];Q[d]='w'+t;if(!atk(Q,'b').has(t==='K'?d:K))o.push([s,d])})}return o}
function lineOk(t,a,b){const dx=Math.abs(F.indexOf(a[0])-F.indexOf(b[0])),dy=Math.abs(a[1]-b[1]);return(t!=='B'&&(dx===0||dy===0))||(t!=='R'&&dx===dy)}
function between(a,b){const f1=F.indexOf(a[0]),r1=+a[1],f2=F.indexOf(b[0]),r2=+b[1],sx=Math.sign(f2-f1),sy=Math.sign(r2-r1),o=[];let f=f1+sx,r=r1+sy;while(f!==f2||r!==r2){o.push(F[f]+r);f+=sx;r+=sy}return o}
function genCheck(chk){for(let n=0;n<800;n++){const P={},K=rsq(),u=new Set([K]);P[K]='wK';
const at=rnd(['Q','R','B','N','P','Q','R','B']);let a;
for(let t=0;t<60;t++){a=rsq();if(!u.has(a)&&(at!=='P'||(a[1]>1&&a[1]<8)))break}
if(u.has(a)||(at==='P'&&(a[1]<2||a[1]>7)))continue;u.add(a);P[a]='b'+at;
for(let i=0,hn=1+(Math.random()*2|0);i<hn;i++){let s,t=0;do s=rsq();while(u.has(s)&&++t<60);if(!u.has(s)){u.add(s);P[s]='w'+rnd(['R','B','N','Q'])}}
if(!chk&&'QRB'.includes(at)&&lineOk(at,a,K)){const bt=between(a,K).filter(q=>!u.has(q));if(bt.length){const q=rnd(bt);u.add(q);P[q]='w'+rnd(['R','B','N'])}}
let k,t2=0;const bad=q=>u.has(q)||cdist(q,K)<2||atk(P,'w').has(q);do k=rsq();while(bad(k)&&++t2<80);if(bad(k))continue;P[k]='bK';
if(atk(P,'b').has(K)!==chk)continue;if(chk&&!wmoves(P).length)continue;return{P,K,a}}
return chk?{P:{e1:'wK',e8:'bR',h8:'bK',a2:'wN'},K:'e1',a:'e8'}:{P:{e1:'wK',e8:'bR',e2:'wN',h8:'bK'},K:'e1',a:'e8'}}

function freeSq(u,okf){for(let i=0;i<120;i++){const s=rsq();if(!u.has(s)&&(!okf||okf(s)))return s}return null}
let nt=null;const later=(fn,ms)=>{clearTimeout(nt);nt=setTimeout(fn,ms)};
const pawnOk=(P,q,c)=>{const f=q[0],r=+q[1];if(c==='w'?(r<2||r>6):(r<3||r>7))return false;for(const k in P){if(k[0]!==f||P[k][1]!=='P'||P[k][0]===c)continue;const rr=+k[1];if(c==='w'?rr<=r:rr>=r)return false}return true};
const PINFO={Q:'The Queen moves like a rook and a bishop together.',R:'The Rook moves along ranks and files.',B:'The Bishop moves along diagonals.',N:'The Knight jumps in an L-shape.'};
