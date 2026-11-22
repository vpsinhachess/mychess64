/* ===== Checkmate engine: K Q R B N (no pawns/castling) + puzzle library ===== */
const kingOf=(P,c)=>Object.keys(P).find(q=>P[q]===c+'K'),inChk=(P,c)=>atk(P,c==='w'?'b':'w').has(kingOf(P,c)),mk=(P,s,d)=>{const Q={...P},p=Q[s];delete Q[s];Q[d]=p;return Q};
function lmoves(P,c){const e=c==='w'?'b':'w',K=kingOf(P,c),o=[];for(const s in P){if(P[s][0]!==c)continue;const t=P[s][1];for(const d of reach(t,s,P,c)){if(P[d]&&P[d][1]==='K')continue;const Q={...P};delete Q[s];Q[d]=c+t;if(!atk(Q,e).has(t==='K'?d:K))o.push([s,d])}}return o}
function stat(P,c){const m=lmoves(P,c).length,k=inChk(P,c);return m?(k?'check':'ok'):(k?'mate':'stale')}
function mate1(P,a){const d=a==='w'?'b':'w';for(const[s,t]of lmoves(P,a)){const Q=mk(P,s,t);if(inChk(Q,d)&&stat(Q,d)==='mate')return[s,t]}return null}
function forced2(Q,a){const d=a==='w'?'b':'w',r=lmoves(Q,d);return r.length>0&&r.every(([s,t])=>mate1(mk(Q,s,t),a))}
const PV={Q:900,R:500,B:330,N:320};
function posv(P,a){const d=a==='w'?'b':'w',dk=kingOf(P,d),ak=kingOf(P,a);if(!dk||!ak)return 0;let v=0;for(const q in P)if(P[q][0]===a&&P[q][1]!=='K')v+=PV[P[q][1]];
const f=F.indexOf(dk[0]),r=+dk[1]-1,e=Math.min(f,7-f,r,7-r),cn=Math.min(Math.max(f,r),Math.max(7-f,r),Math.max(f,7-r),Math.max(7-f,7-r));return v-e*25-cn*8-cdist(ak,dk)*12}
function evalA(P,a){const d=a==='w'?'b':'w',m=lmoves(P,d).length,k=inChk(P,d);if(!m)return k?100000:-50000;return posv(P,a)-m*10+(k?6:0)}
function cpuMove(P,c){const a=c==='w'?'b':'w',mv=lmoves(P,c);if(!mv.length)return null;let best=null,bs=1e9;
for(const[s,t]of mv){const Q=mk(P,s,t);let w=-1e9;for(const[s2,t2]of lmoves(Q,a)){const v=evalA(mk(Q,s2,t2),a);if(v>w)w=v;if(w>=1e5)break}const sc=w+Math.random()*8;if(sc<bs){bs=sc;best=[s,t]}}return best}
const pkey=(P,o)=>Object.keys(P).sort().map(q=>q+P[q]).join()+o;
function hintMove(P,a,two,seen){const d=a==='w'?'b':'w',am=lmoves(P,a),m1=mate1(P,a);if(m1)return{mv:m1,mate:1};
for(const[s,t]of am){const Q=mk(P,s,t),st=stat(Q,d);if((st==='ok'||st==='check')&&forced2(Q,a))return{mv:[s,t],mate:2}}
let best=null,bs=-1e9;for(const[s,t]of am){const Q=mk(P,s,t),dm=lmoves(Q,d);if(!dm.length&&!inChk(Q,d))continue;let w=1e9;
for(const[s2,t2]of dm){const R=mk(Q,s2,t2);let v=-1e9;for(const[s3,t3]of lmoves(R,a)){const V=evalA(mk(R,s3,t3),a);if(V>v)v=V}if(v===-1e9)v=posv(R,a);if(v<w)w=v}
if(w===1e9)w=posv(Q,a);if(seen&&seen.has(pkey(Q,d)))w-=400;if(w>bs){bs=w;best=[s,t]}}
return{mv:best,mate:0}}
const sqCol=q=>(F.indexOf(q[0])+ +q[1])%2;
function randPos(kind,a){const d=a==='w'?'b':'w',pcs={Q:['Q'],RR:['R','R'],R:['R'],BB:['B','B']}[kind];
for(let n=0;n<600;n++){const P={},u=new Set(),put=(q,c)=>{P[q]=c;u.add(q)};
let dk=rsq();if(Math.random()<.5){const i=Math.random()*8|0,sd=Math.random()*4|0;dk=[F[0]+(i+1),F[7]+(i+1),F[i]+1,F[i]+8][sd]}
put(dk,d+'K');const ak=freeSq(u,q=>cdist(q,dk)>1);if(!ak)continue;put(ak,a+'K');
let ok=true;const cols=[];for(const t of pcs){const q=freeSq(u,q=>t!=='B'||!cols.includes(sqCol(q)));if(!q){ok=false;break}if(t==='B')cols.push(sqCol(q));put(q,a+t)}
if(!ok||inChk(P,d))continue;const dm=lmoves(P,d);if(!dm.length||dm.some(m=>P[m[1]]))continue;if(!lmoves(P,a).length)continue;return P}return null}
function fenP(fp){const P={};fp.split('/').forEach((row,i)=>{let f=0;for(const ch of row){if(/\d/.test(ch))f+=+ch;else{P[F[f]+(8-i)]=(ch===ch.toUpperCase()?'w':'b')+ch.toUpperCase();f++}}});return P}
function tfP(P,k,swap){const o={};for(const q in P){const f=F.indexOf(q[0]),r=+q[1]-1,[a,b]=[[f,r],[7-f,r],[f,7-r],[7-f,7-r],[r,f],[7-r,f],[r,7-f],[7-r,7-f]][k];let pc=P[q];if(swap)pc=(pc[0]==='w'?'b':'w')+pc[1];o[F[a]+(b+1)]=pc}return o}
function mateMod(num,title,desc,kinds,tips){return{n:num+' · '+title,d:desc,sc:1,
i(){rs();this.kind=kinds[0].id;this.mode='m1';this.side='r';this.nr()},
nr(){clearTimeout(nt);this.lock=0;this.over=0;this.sel=null;this.lm=null;this.hist=[];this.hm=0;this.reps=new Map();this.need=this.mode==='m2'?2:1;S.ar=[];S.flip=false;S.co='edge';S.an={};
this.sc=this.mode==='man'?0:1;const a=this.side==='r'?rnd('wb'):this.side;this.col=a;this.turn=a;
let P=null;if(this.mode==='m1'||this.mode==='m2')P=tfP(fenP(rnd(LIB[this.kind][this.mode==='m1'?1:2])),Math.random()*8|0,a==='b');else P=randPos(this.kind,a);
if(!P)P=tfP(fenP(rnd(LIB[this.kind][1])),0,a==='b');S.pc=P;this.reps.set(pkey(P,a),1);const nm=a==='w'?'White':'Black',ic=a==='w'?'⚪':'⚫';
this.msg={m1:`${ic} ${nm} to move. Find the checkmate in 1 move!`,m2:`${ic} ${nm} to move. Find a forced checkmate in 2 moves!`,comp:`${ic} You play ${nm}. Checkmate the computer's king! (Moves: 0)`,man:`🖐 Manual mode: you move both sides. ${nm} to move.`}[this.mode];this.mv()},
auto(ms){later(()=>{if(M===this)this.nr()},ms)},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;(this.lm||[]).forEach(x=>add(x,'lm'));
if(inChk(S.pc,this.turn))add(kingOf(S.pc,this.turn),'chk');
if(this.sel&&!this.over){add(this.sel,'sel');lmoves(S.pc,this.turn).filter(m=>m[0]===this.sel).forEach(m=>add(m[1],S.pc[m[1]]?'cap':'dot'))}go()},
p(){const pz=this.mode==='m1'||this.mode==='m2',B2=(a,v,t,on)=>B(a,v,t,on);
return `<div class="g2">${kinds.map(k=>B2('kind',k.id,k.label,this.kind===k.id)).join('')}</div><div class="g2">${B2('mode','m1','🎯 Mate in 1',this.mode==='m1')}${B2('mode','m2','🧠 Mate in 2',this.mode==='m2')}${B2('mode','comp','🤖 vs Computer',this.mode==='comp')}${B2('mode','man','🖐 Manual',this.mode==='man')}</div><div class="g3">${B2('side','w','⚪ White',this.side==='w')}${B2('side','b','⚫ Black',this.side==='b')}${B2('side','r','🎲 Random',this.side==='r')}</div>${MSG(this.msg)}<div class="g3">${B('hint',0,'💡 Hint')}<button class="b" data-a="undo" data-v="0" ${pz||!this.hist.length||(this.over&&this.mode!=='man')?'disabled':''}>↩ Undo</button>${B('new',0,'🎲 New')}</div>${this.over&&this.mode!=='man'?'<div class="mu c">⏭ Next position loads automatically…</div>':''}<ul class="t">${(tips[this.kind]||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`},
a(a,v){if(a==='kind'){this.kind=v;return this.nr()}if(a==='mode'){this.mode=v;return this.nr()}if(a==='side'){this.side=v;return this.nr()}if(a==='new')return this.nr();if(a==='hint')return this.hint();if(a==='undo')return this.undo()},
c(q){if(this.over||this.lock)return;const t=this.turn;if(this.mode!=='man'&&t!==this.col)return;const p=S.pc[q];
if(p&&p[0]===t){this.sel=this.sel===q?null:q;snd('click');return this.mv()}
if(!this.sel)return;if(lmoves(S.pc,t).some(m=>m[0]===this.sel&&m[1]===q))return this.tryMove(this.sel,q);
const pt=S.pc[this.sel][1];this.msg=reach(pt,this.sel,S.pc,t).includes(q)?'🚫 Illegal! That would leave your king in check (or next to the enemy king).':'❌ A '+NM[pt]+' cannot move there.';snd('bad');this.mv()},
tryMove(a,b){const t=this.turn,o=t==='w'?'b':'w',Q=mk(S.pc,a,b),pz=this.mode==='m1'||this.mode==='m2';
if(pz){const st=stat(Q,o);let good=st==='mate';if(!good&&this.mode==='m2'&&this.need===2)good=st!=='stale'&&forced2(Q,t);
if(!good){this.sel=null;this.msg=st==='stale'?'🤝 That is stalemate — a draw, not a win! Always leave the king a move.':(this.mode==='m2'&&this.need===2)?'❌ That does not force checkmate in 2. Look for a move after which every reply allows mate.':st==='check'?'❌ Check, but the king can escape. Find the move that leaves no escape.':'❌ That is not checkmate. Look for a move that leaves the king no escape.';hit(0);return this.mv()}}
this.play(a,b)},
play(a,b){const t=this.turn,o=t==='w'?'b':'w',pc=S.pc[a][1],cap=S.pc[b];this.hist.push({pc:{...S.pc},turn:t,lm:this.lm,hm:this.hm,need:this.need});
delete S.pc[a];S.pc[b]=t+pc;this.lm=[a,b];S.ar=[[a,b,t===this.col?'#15781B':'#e08a00',pc==='N']];S.an={[b]:1};this.sel=null;snd(cap?'cap':'move');
const firstOfTwo=this.mode==='m2'&&t===this.col&&this.need===2;if(firstOfTwo)this.need=1;
this.turn=o;this.hm=cap?0:this.hm+1;const key=pkey(S.pc,o),cnt=(this.reps.get(key)||0)+1;this.reps.set(key,cnt);
const st=stat(S.pc,o);if(st==='mate')return this.finish('mate',t);if(st==='stale')return this.finish('stale');
const rest=Object.values(S.pc).filter(v=>v[1]!=='K');if(!rest.length||(rest.length===1&&'BN'.includes(rest[0][1])))return this.finish('insuf');
if(cnt>=3)return this.finish('rep');if(this.hm>=100)return this.finish('50');
const n=this.hist.filter(h=>h.turn===this.col).length;if(st==='check')snd('check');
this.msg=st==='check'?(o===this.col?'⚠️ Your king is in check!':'✔ Check!'):firstOfTwo?'✅ Good first move! The king must reply…':this.mode==='comp'?`Your move. (Moves: ${n})`:this.mode==='man'?`${o==='w'?'White':'Black'} to move.`:this.mode==='m2'&&o===this.col?'Now deliver checkmate in 1!':this.msg;
if(this.mode!=='man'&&o!==this.col){this.lock=1;later(()=>this.cpu(),650)}this.mv()},
cpu(){if(M!==this||this.over)return;this.lock=0;const mv=cpuMove(S.pc,this.turn);if(mv)this.play(mv[0],mv[1])},
finish(type,w){this.over=1;this.sel=null;this.lock=0;const sc=this.mode!=='man';
this.msg={mate:`🏆 Checkmate! ${w==='w'?'White':'Black'} wins!`,stale:'🤝 Stalemate — the king has no legal move but is not in check. It is a draw!',insuf:'🤝 Draw — not enough material left to checkmate.',rep:'🤝 Draw by threefold repetition.','50':'🤝 Draw by the 50-move rule (50 moves without a capture).'}[type];
if(type==='mate'){if(sc)hit(1,true);else win()}else{snd('bad');banner(0,'🤝','Draw',1800);if(sc)hit(0)}
if(sc)this.auto(type==='mate'?4200:5000);this.mv()},
undo(){if(this.over&&this.mode!=='man')return;let n=this.mode==='comp'&&this.turn===this.col?2:1,h=null;for(let i=0;i<n&&this.hist.length;i++)h=this.hist.pop();if(!h)return;clearTimeout(nt);
S.pc=h.pc;this.turn=h.turn;this.lm=h.lm;this.hm=h.hm;this.need=h.need;this.over=0;this.lock=0;this.sel=null;S.ar=[];this.reps=new Map();for(const x of this.hist){const k=pkey(x.pc,x.turn);this.reps.set(k,(this.reps.get(k)||0)+1)}const k0=pkey(S.pc,this.turn);this.reps.set(k0,(this.reps.get(k0)||0)+1);this.msg='↩ Move taken back.';this.mv()},
hint(){if(this.over||this.lock)return;const t=this.turn,man=this.mode==='man';if(!man&&t!==this.col)return;
if(man&&t!==this.col){this.msg='💡 Hints are for the attacking side. The lone king should look for an escape or a loose piece!';return this.mv()}
const H=hintMove(S.pc,t,this.mode==='m2'&&this.need===2,new Set(this.reps.keys()));if(!H.mv){this.msg='No hint available.';return this.mv()}
S.ar=[[H.mv[0],H.mv[1],'#2e86de',S.pc[H.mv[0]][1]==='N']];this.sel=null;
this.msg=H.mate===1?'💡 There is a checkmate in 1 — follow the blue arrow!':H.mate===2?'💡 A forced mate in 2 starts with the blue arrow.':'💡 Suggested move (blue arrow): it shrinks the king’s space. Can you see why?';this.mv()}}}

const TIPQ=['<b>Queen + King vs King:</b> use the queen to cut the king off, bring your own king close, then check next to the king with your king protecting the queen.','A queen a knight’s move away from the king builds a “box” without allowing escape.','⚠️ <b>Stalemate trap:</b> if the lone king has no legal move and is NOT in check, it is a draw. Always leave a move or give check!','Keep your queen protected or at least away from the enemy king.'];
const TIPRR=['<b>Ladder mate:</b> one rook cuts the king off on a rank, the other rook checks on the next rank. Repeat toward the edge.','Keep the rooks on neighbouring ranks or files so they protect each other.','Never leave a rook where the enemy king can capture it.','The final check is delivered on the edge, with the other rook sealing the next line.'];
const TIPR=['<b>Rook + King vs King:</b> cut the king off with the rook, march your king forward, then take the <b>opposition</b> (kings two squares apart, one between).','When the kings face each other, check with the rook on the edge rank or file for mate.','Keep the rook at a safe distance (not next to the enemy king) unless it is protected.','It can take up to 16 moves — be patient and avoid stalemate.'];
const TIPBB=['<b>Two Bishops + King vs King:</b> the bishops must stand on <b>opposite colours</b>.','Place the bishops side by side on neighbouring diagonals to form a wall and push the king toward a corner.','Bring your king close — the final mate happens in a corner with your king helping.','It can take up to 19 moves. Avoid stalemate and keep the bishops protected.'];

