/* ===== Trading topics: exchange engine (static exchange evaluation by search) ===== */
const PTS={P:1,N:3,B:3,R:5,Q:9,K:0};
function seeGain(P,s,c){const o=c==='w'?'b':'w',caps=lmoves(P,c).filter(m=>m[1]===s);if(!caps.length)return 0;const v=PTS[P[s][1]];let best=0;for(const[a,t]of caps){const g=v-seeGain(mk(P,a,t),t,o);if(g>best)best=g}return best}
function capNets(P,a){const d=a==='w'?'b':'w';return lmoves(P,a).filter(([s,t])=>P[t]&&P[t][0]===d).map(([s,t])=>({s,t,net:PTS[P[t][1]]-seeGain(mk(P,s,t),t,d)}))}
function playSee(P,a,s0,t0){const steps=[];let Q=P,c=a,f=s0;const t=t0;
for(let i=0;i<10;i++){const v=Q[t],mv=Q[f];steps.push({c,from:f,to:t,piece:mv[1],victim:v[1],val:PTS[v[1]]});Q=mk(Q,f,t);const o=c==='w'?'b':'w',caps=lmoves(Q,o).filter(m=>m[1]===t);if(!caps.length)break;
let best=null,bg=-1;for(const[s2,t2]of caps){const g=PTS[Q[t][1]]-seeGain(mk(Q,s2,t2),t,c);if(g>bg){bg=g;best=[s2,t2]}}
if(bg<0)break;c=o;f=best[0]}
return steps}
const behind=(t,col)=>[-1,1].map(x=>sqa(F.indexOf(t[0])+x,+t[1]+(col==='b'?1:-1))).filter(Boolean);
function genSmart(a){const d=a==='w'?'b':'w';
for(let n=0;n<3000;n++){const P={},u=new Set(),put=(q,c)=>{P[q]=c;u.add(q)};
const ak=rsq();put(ak,a+'K');const dk=freeSq(u,q=>cdist(q,ak)>2);if(!dk)continue;put(dk,d+'K');
let bad=false;for(let i=0,no=2+(Math.random()*3|0);i<no;i++){const t=rnd('QRRBBNNPP'),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,a));if(!q){bad=true;break}put(q,a+t)}
if(bad)continue;
const att=new Set();for(const q in P)if(P[q][0]===a&&P[q][1]!=='K')reach(P[q][1],q,P,a,1).forEach(x=>att.add(x));
const tg=shuf([...att].filter(q=>!u.has(q)));let ne=0;const want=2+(Math.random()*3|0);
for(const q of tg){if(ne>=want)break;const t=rnd('QRRBBNNPPP');if(t==='P'&&!pawnOk(P,q,d))continue;put(q,d+t);ne++}
for(let i=0,m=1+(Math.random()*3|0);i<m;i++){const t=rnd('RBNPPQ'),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,d));if(q)put(q,d+t)}
for(let i=0,m=Math.random()*2|0;i<m;i++){const t=rnd('RBNP'),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,a));if(q)put(q,a+t)}
if(inChk(P,a)||inChk(P,d))continue;
const nets=capNets(P,a);if(nets.length<2||nets.length>6)continue;
if(!nets.some(x=>x.net>0)||!nets.some(x=>x.net<=0))continue;
return{P,nets}}return null}
function genTask(a){const d=a==='w'?'b':'w';
for(let n=0;n<4000;n++){const A=rnd('QRBNPKQRBNP'),B=rnd('QRBNPQRBNP'),P={},u=new Set(),put=(q,c)=>{P[q]=c;u.add(q)};
const ak=rsq();put(ak,a+'K');const dk=freeSq(u,q=>cdist(q,ak)>2);if(!dk)continue;put(dk,d+'K');
let from=ak;if(A!=='K'){const q=freeSq(u,q=>A!=='P'||pawnOk(P,q,a));if(!q)continue;put(q,a+A);from=q}
const att=reach(A,from,P,a,1).filter(q=>!u.has(q)&&(B!=='P'||pawnOk(P,q,d)));if(!att.length)continue;const t=rnd(att);put(t,d+B);
if(A!=='K'&&Math.random()<.55){const D=rnd('QRBNP'),cand=D==='P'?behind(t,d):reach(D,t,P,d,1),fr=cand.filter(q=>!u.has(q)&&(D!=='P'||(pawnOk(P,q,d))));if(fr.length)put(rnd(fr),d+D)}
for(let i=0,m=Math.random()*3|0;i<m;i++){const c=rnd([a,d]),T=rnd('RBNPQ'),q=freeSq(u,q=>T!=='P'||pawnOk(P,q,c));if(q)put(q,c+T)}
if(inChk(P,a)||inChk(P,d))continue;
if(!lmoves(P,a).some(m=>m[0]===from&&m[1]===t))continue;
return{P,A,B,t}}return null}
function genRecap(a){const d=a==='w'?'b':'w';
for(let n=0;n<4000;n++){const X=rnd('QRBNPQRBNP'),Y=rnd('QRBNP'),P={},u=new Set(),put=(q,c)=>{P[q]=c;u.add(q)};
const ak=rsq();put(ak,a+'K');const dk=freeSq(u,q=>cdist(q,ak)>2);if(!dk)continue;put(dk,d+'K');
const s=freeSq(u,q=>X!=='P'||pawnOk(P,q,d));if(!s)continue;put(s,d+X);
const cand=(X==='P'?behind(s,d):reach(X,s,P,d,1)).filter(q=>!u.has(q)&&(X!=='P'||(q[1]>1&&q[1]<8)));if(!cand.length)continue;const f=rnd(cand);u.add(f);if('QRB'.includes(X))between(f,s).forEach(q=>u.add(q));
let okA=true;for(let i=0,na=Math.random()<.4?2:1;i<na;i++){const T=rnd('QRBNPQRBN'),c2=T==='P'?behind(s,a==='w'?'b':'w'):reach(T,s,P,a,1),fr=c2.filter(q=>!u.has(q)&&(T!=='P'||pawnOk(P,q,a)));if(!fr.length){okA=false;break}put(rnd(fr),a+T)}
if(!okA)continue;
if(Math.random()<.5){const D=rnd('QRBNP'),cand2=D==='P'?behind(s,d):reach(D,s,P,d,1),fr=cand2.filter(q=>!u.has(q)&&(D!=='P'||pawnOk(P,q,d)));if(fr.length)put(rnd(fr),d+D)}
for(let i=0,m=Math.random()*3|0;i<m;i++){const c=rnd([a,d]),T=rnd('RBNPQ'),q=freeSq(u,q=>T!=='P'||pawnOk(P,q,c));if(q)put(q,c+T)}
if(inChk(P,a)||inChk(P,d))continue;
if(!lmoves(P,a).some(m=>m[1]===s))continue;
return{P,s,f,X,Y}}return null}
function tradeHit(ok,label,ic){st.a++;if(ok){st.c++;streak++;if(st.c>=5)done.add(cur)}else{st.i++;streak=0}live(['a',ok?'c':'i']);rec(ok);const bw=$('#bw');
if(ok){if(streak%5===0){snd('win');burst(1);cannon(1);fireworks();wave(1);banner(1,'🌟',label+' · '+streak+' in a row!',1700)}else{snd('good');burst();cannon(0);wave(0);banner(1,ic,label,1300)}ret(bw,'glow')}else{snd('bad');banner(0,ic,label,1400);ret(bw,'shake')}}
function tradeMod(num,title,desc,smart,tips){return{n:num+' · '+title,d:desc,sc:1,
i(){rs();this.mode=smart?'smart':'task';this.side='r';this.badge=0;this.tg=0;this.tl=0;this.nr()},
nr(){clearTimeout(nt);this.step=1;this.sel=null;this.lm=null;S.ar=[];S.flip=false;S.co='edge';S.an={};
const a=this.side==='r'?rnd('wb'):this.side;this.col=a;let G=null;for(let k=0;k<4&&!G;k++)G=smart?genSmart(a):this.mode==='task'?genTask(a):genRecap(a);
if(!G){this.step=3;this.G=null;this.msg='Could not build a position — press Next.';S.pc={};return this.mv()}
this.G=G;this.P0={...G.P};S.pc=G.P;const nm=a==='w'?'White':'Black',ic=a==='w'?'⚪':'⚫',en=a==='w'?'Black':'White';
if(smart)this.msg=`${ic} ${nm} to move. Pick the best capture! Compare the points you win and lose.`;
else if(this.mode==='task')this.msg=`${ic} ${nm} to move. Capture the ${NM[G.B]} on ${G.t} with your ${NM[G.A]}!`;
else{this.lm=[G.f,G.s];S.ar=[[G.f,G.s,'#e08a00']];this.msg=`${ic} ${nm} to move. ${en}'s ${NM[G.X]} just captured your ${NM[G.Y]} on ${G.s}. Recapture!`}
this.mv()},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;(this.lm||[]).forEach(x=>add(x,'lm'));
if(this.G&&this.step===1&&this.mode==='task')add(this.G.t,'tgt');
if(this.sel&&this.step===1){add(this.sel,'sel');lmoves(S.pc,this.col).filter(m=>m[0]===this.sel&&S.pc[m[1]]&&S.pc[m[1]][0]!==this.col).forEach(m=>add(m[1],'cap'))}
S.lb={};if(smart&&this.badge)for(const q in S.pc)if(S.pc[q][1]!=='K')S.lb[q]=PTS[S.pc[q][1]];go()},
p(){const s=this.step;return `${smart?'':`<div class="g2">${B('mode','task','🎯 Capture task',this.mode==='task')}${B('mode','recap','🔁 Recapture',this.mode==='recap')}</div>`}<div class="g3">${B('side','w','⚪ White',this.side==='w')}${B('side','b','⚫ Black',this.side==='b')}${B('side','r','🎲 Random',this.side==='r')}</div>${MSG(this.msg)}${smart?`<div class="vals">${[...'PNBRQ'].map(t=>`<span>${PG('w',t)}${PTS[t]}</span>`).join('')}</div><div class="g2">${B('badge',0,this.badge?'🔢 Points ON':'🔢 Points OFF',this.badge)}<div class="pill c">Won +${this.tg} · Lost −${this.tl}</div></div>`:''}${s===3?'<div class="mu c">⏭ Next position loads automatically…</div>'+B('new',0,'Next ▶',0,'p w'):`<div class="g2">${B('hint',0,'💡 Hint')}${B('new',0,'🎲 New position')}</div>`}<ul class="t">${tips.map(x=>`<li>${x}</li>`).join('')}</ul>`},
a(a,v){if(a==='mode'){this.mode=v;return this.nr()}if(a==='side'){this.side=v;return this.nr()}if(a==='new')return this.nr();if(a==='badge'){this.badge=!this.badge;return this.mv()}if(a==='hint')return this.hint()},
c(q){if(this.step!==1||!this.G)return;const t=this.col,p=S.pc[q];
if(p&&p[0]===t){this.sel=this.sel===q?null:q;snd('click');if(this.sel&&!lmoves(S.pc,t).some(m=>m[0]===q&&S.pc[m[1]]&&S.pc[m[1]][0]!==t))this.msg='This piece has no capture. Try another piece.';return this.mv()}
if(!this.sel)return;const pt=S.pc[this.sel][1];
if(!lmoves(S.pc,t).some(m=>m[0]===this.sel&&m[1]===q)){this.msg=reach(pt,this.sel,S.pc,t).includes(q)?'🚫 Illegal! That would leave your king in check.':'❌ A '+NM[pt]+' cannot move there.';snd('bad');return this.mv()}
if(!S.pc[q]){this.msg='This lesson is about captures. Tap a piece, then choose a capture (red ring).';snd('bad');this.sel=null;return this.mv()}
this.attempt(this.sel,q)},
attempt(a,b){const G=this.G,P=S.pc,t=this.col,d=t==='w'?'b':'w',A=P[a][1],B=P[b][1];this.sel=null;
if(smart)return this.run(playSee(P,t,a,b));
if(this.mode==='task'){if(b!==G.t||A!==G.A){this.msg=b!==G.t?`❌ That capture is legal, but the task asks for the ${NM[G.B]} on ${G.t}.`:`❌ Right piece to capture, but use your ${NM[G.A]} for this task!`;tradeHit(false,'Not that one','✕');return this.mv()}
const Q=mk(P,a,b),rc=lmoves(Q,d).filter(m=>m[1]===b),steps=[{c:t,from:a,to:b,piece:A,victim:B,val:0}];if(rc.length){const m=rnd(rc);steps.push({c:d,from:m[0],to:b,piece:Q[m[0]][1],victim:A,val:0})}return this.run(steps)}
if(b!==G.s){this.msg='❌ That is a capture, but not on '+G.s+'. Recapture the piece that just captured!';tradeHit(false,'Not a recapture','✕');return this.mv()}
this.run([{c:t,from:a,to:b,piece:A,victim:B,val:0}])},
run(steps){this.step=2;let i=0;const one=()=>{if(M!==this)return;const s=steps[i++];S.pc=mk(S.pc,s.from,s.to);this.lm=[s.from,s.to];S.ar=[[s.from,s.to,s.c===this.col?'#15781B':'#e08a00',s.piece==='N']];S.an={[s.to]:1};snd('cap');this.mv();if(i<steps.length)later(one,900);else later(()=>this.finish(steps),750)};one()},
finish(steps){if(M!==this)return;this.step=3;const col=this.col,nm=t=>NM[t];
if(smart){let g=0,l=0;const gl=[],ll=[];steps.forEach(s=>{if(s.c===col){g+=s.val;gl.push(`${nm(s.victim)} (+${s.val})`)}else{l+=s.val;ll.push(`your ${nm(s.victim)} (−${s.val})`)}});
const net=g-l,nets=this.G.nets,best=nets.reduce((m,x)=>x.net>m.net?x:m,nets[0]),P0=this.P0;this.tg+=g;this.tl+=l;
const line=`You won ${g} point${g===1?'':'s'}: ${gl.join(', ')||'none'}. You lost ${l} point${l===1?'':'s'}${ll.length?': '+ll.join(', '):''}. Net ${net>0?'+':''}${net}.`,bs=`Best capture: your ${nm(P0[best.s][1])} takes the ${nm(P0[best.t][1])} on ${best.t} (net ${best.net>0?'+':''}${best.net}).`;
if(net>0){tradeHit(true,'Right Trade!','✓');this.msg=`✅ Right Trade! ${line}${best.net>net?' '+bs:''}`}
else if(net<0){tradeHit(false,'Wrong Trade!','✕');this.msg=`❌ Wrong Trade! ${line} ${bs}`}
else{tradeHit(false,'Even Trade','⚖️');this.msg=`⚖️ Even Trade — ${line} Nothing gained, nothing lost, but a better capture existed. ${bs}`}}
else if(this.mode==='task'){const me=steps[0],re=steps[1];if(re){tradeHit(true,'Trade done!','🔁');this.msg=`🔁 Trade! Your ${nm(me.piece)} took the ${nm(me.victim)}, then their ${nm(re.piece)} took your ${nm(re.victim)}. One piece each — that is a trade.`}
else{tradeHit(true,'Free capture!','🎁');this.msg=`🎁 Free capture! Nothing protected the ${nm(me.victim)}, so nobody could recapture — no trade this time.`}}
else{const me=steps[0],G=this.G;tradeHit(true,'Trade complete!','🔁');this.msg=`🔁 Trade complete! They took your ${nm(G.Y)}, you took their ${nm(G.X)} back with your ${nm(me.piece)}. One piece each.`}
this.mv();later(()=>{if(M===this)this.nr()},smart?5600:4600)},
hint(){if(this.step!==1||!this.G)return;const t=this.col,P=S.pc,G=this.G;let h=null,m='';
if(smart){const best=G.nets.reduce((x,y)=>y.net>x.net?y:x,G.nets[0]);h=[best.s,best.t];m='💡 Follow the blue arrow — it is the capture that wins the most points.'}
else if(this.mode==='task'){const x=lmoves(P,t).find(m=>m[1]===G.t&&P[m[0]][1]===G.A);h=x;m='💡 The blue arrow shows which piece captures.'}
else{const xs=lmoves(P,t).filter(m=>m[1]===G.s).sort((x,y)=>PTS[P[x[0]][1]]-PTS[P[y[0]][1]]);h=xs[0];m='💡 Take back on the same square — see the blue arrow.'}
if(!h)return;S.ar=[[h[0],h[1],'#2e86de',P[h[0]][1]==='N']];this.msg=m;this.mv()}}}

