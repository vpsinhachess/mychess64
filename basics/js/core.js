let LIB={}; /* filled by main.js from data/puzzles.json */
const $=s=>document.querySelector(s),F='abcdefgh',NM={K:'King',Q:'Queen',R:'Rook',B:'Bishop',N:'Knight',P:'Pawn'},VAL={P:1,N:3,B:3,R:5,Q:9,K:'∞'},T='KQRBNP';
const SK='mychess64.v1';let PRO={name:'',tot:{},done:[],best:0};
try{const s=JSON.parse(localStorage.getItem(SK)||'null');if(s&&typeof s==='object'){PRO.name=[...String(s.name||'')].slice(0,18).join('');PRO.tot=s.tot&&typeof s.tot==='object'?s.tot:{};PRO.done=Array.isArray(s.done)?s.done.filter(n=>Number.isInteger(n)):[];PRO.best=+s.best||0}}catch(e){}
const saveP=()=>{try{localStorage.setItem(SK,JSON.stringify(PRO))}catch(e){}};
class SSet extends Set{add(v){super.add(v);PRO.done=[...this];saveP();return this}}
function rec(ok){const r=PRO.tot[cur]||(PRO.tot[cur]={a:0,c:0,i:0});r.a++;if(ok)r.c++;else r.i++;if(streak>PRO.best)PRO.best=streak;saveP()}
const ICON=['R','P','B','N','Q','P','K','R'],EMO=['🧩','🔍','🗺️','🎯','✏️','💰','🏃','🏰'],TINT=['#ff9f43','#2e86de','#10ac84','#ee5253','#8e7cf0','#d9a000','#0aa5d6','#d63af9'],done=new SSet();PRO.done.forEach(v=>Set.prototype.add.call(done,v));ICON.push('B','P','Q','K','Q','R','R','P');EMO.push('📝','👻','👑','⚠️','🏁','🎓','🏆','📉');TINT.push('#e84393','#00a884','#e17055','#5f27cd','#ff7f50','#2d98da','#16a085','#c0392b');
let S={flip:false,co:'edge',pc:{},mk:{},an:{},ar:[]},M,cur=0,st={a:0,c:0,i:0},tm=null,streak=0,vol=1,AC,MG;
const rnd=a=>a[Math.random()*a.length|0],rsq=x=>{let s;do s=rnd(F)+(1+Math.random()*8|0);while(s===x);return s},rs=()=>{st={a:0,c:0,i:0};streak=0};
const start=()=>{const p={},o='RNBQKBNR';for(let i=0;i<8;i++){p[F[i]+1]='w'+o[i];p[F[i]+2]='wP';p[F[i]+7]='bP';p[F[i]+8]='b'+o[i]}return p};
const B=(a,v,t,on,x='')=>`<button class="b${on?' on':''} ${x}" data-a="${a}" data-v="${v}">${t}</button>`;
const PG=(c,t)=>`<span class="ps">${SVG(c,t)}</span>`,MSG=t=>`<div class="msg">${t}</div>`;

