/* ===== Good / Bad trading topics ===== */
const cls3=n=>n>0?'g':n<0?'b':'e',CLN={g:'Good',b:'Bad',e:'Equal'};
function genTradeP(a,pred,heavy){const d=a==='w'?'b':'w';
for(let n=0;n<5000;n++){const P={},u=new Set(),put=(q,c)=>{P[q]=c;u.add(q)};
const ak=rsq();put(ak,a+'K');const dk=freeSq(u,q=>cdist(q,ak)>2);if(!dk)continue;put(dk,d+'K');
let bad=false;for(let i=0,no=2+(Math.random()*3|0);i<no;i++){const t=rnd(heavy?'QRRQRN':'QRRBBNNPP'),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,a));if(!q){bad=true;break}put(q,a+t)}
if(bad)continue;
const att=new Set();for(const q in P)if(P[q][0]===a&&P[q][1]!=='K')reach(P[q][1],q,P,a,1).forEach(x=>att.add(x));
const tg=shuf([...att].filter(q=>!u.has(q))),tl=[];let ne=0;const want=2+(Math.random()*3|0);
for(const q of tg){if(ne>=want)break;const t=rnd(heavy?'PPNB':'QRRBBNNPPP');if(t==='P'&&!pawnOk(P,q,d))continue;put(q,d+t);tl.push(q);ne++}
if(heavy)for(const q of tl){if(Math.random()<.95){const D=rnd('PPNB'),cand=D==='P'?behind(q,d):reach(D,q,P,d,1),fr=cand.filter(x=>!u.has(x)&&(D!=='P'||pawnOk(P,x,d)));if(fr.length)put(rnd(fr),d+D)}}
for(let i=0,m=(heavy?0:1)+(Math.random()*3|0);i<m;i++){const t=rnd('RBNPPQ'),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,d));if(q)put(q,d+t)}
for(let i=0,m=Math.random()*2|0;i<m;i++){const t=rnd('RBNP'),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,a));if(q)put(q,a+t)}
if(inChk(P,a)||inChk(P,d))continue;
const nets=capNets(P,a),r=pred(nets,P,a);if(!r)continue;return{P,nets,info:r}}return null}
function evalMod(num,title,desc,kind,tips){const modes=kind==='good'?['make','cls']:['avoid','worst','cls'],ML={make:'🏆 Make a good trade',cls:'❓ Good or Bad?',avoid:'🛑 Avoid bad trades',worst:'🔍 Spot the worst'};return{n:num+' · '+title,d:desc,sc:1,
i(){rs();this.mode=modes[0];this.side='r';this.badge=0;this.tg=0;this.tl=0;this.nr()},
gen(a){const m=this.mode;
if(m==='make')return genTradeP(a,(n,P,c)=>{if(n.length<2||n.length>6)return 0;if(!n.some(x=>x.net>0)||!n.some(x=>x.net<=0))return 0;if(Math.random()<.6&&!n.some(x=>x.net>0&&playSee(P,c,x.s,x.t).length>1))return 0;return 1});
if(m==='cls'){const w=rnd(['g','g','b','b','e']);return genTradeP(a,n=>{if(n.length<1||n.length>6)return 0;const o=n.filter(x=>cls3(x.net)===w);return o.length?{prop:rnd(o)}:0})}
if(m==='avoid'){const ab=Math.random()<.55;return genTradeP(a,n=>ab?(n.length>=1&&n.length<=4&&n.every(x=>x.net<0)?{allBad:1}:0):(n.length>=2&&n.length<=6&&n.some(x=>x.net>0)&&n.some(x=>x.net<0)?{allBad:0}:0),ab)}
return genTradeP(a,n=>{if(n.length<3||n.length>6)return 0;const mn=Math.min(...n.map(x=>x.net));return mn<0&&n.some(x=>x.net>mn)?{mn}:0})},
nr(){clearTimeout(nt);this.step=1;this.sel=null;this.lm=null;S.ar=[];S.flip=false;S.co='edge';S.an={};
const a=this.side==='r'?rnd('wb'):this.side;this.col=a;let G=null;for(let k=0;k<4&&!G;k++)G=this.gen(a);
if(!G){this.step=3;this.G=null;this.msg='Could not build a position — press Next.';S.pc={};return this.mv()}
this.G=G;this.P0={...G.P};S.pc=G.P;const nm=a==='w'?'White':'Black',ic=a==='w'?'⚪':'⚫',P=G.P,m=this.mode;
if(m==='make')this.msg=`${ic} ${nm} to move. Make a GOOD trade: win more points than you lose overall!`;
else if(m==='avoid')this.msg=`${ic} ${nm} to move. Find a good trade — or press “Don't capture” if every capture would lose points.`;
else if(m==='worst')this.msg=`${ic} ${nm} to move. Several captures are possible. Make the one you think is the WORST trade (loses the most points)!`;
else{const p=G.info.prop;S.ar=[[p.s,p.t,'#2e86de',P[p.s][1]==='N']];this.msg=`${ic} ${nm} to move. The blue arrow shows a proposed trade: ${NM[P[p.s][1]]} takes ${NM[P[p.t][1]]} on ${p.t}. Is it a Good, Bad or Equal trade overall?`}
this.mv()},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;(this.lm||[]).forEach(x=>add(x,'lm'));
if(this.G&&this.step===1&&this.mode==='cls')add(this.G.info.prop.s,'sel');
if(this.sel&&this.step===1){add(this.sel,'sel');lmoves(S.pc,this.col).filter(m=>m[0]===this.sel&&S.pc[m[1]]&&S.pc[m[1]][0]!==this.col).forEach(m=>add(m[1],'cap'))}
S.lb={};if(this.badge)for(const q in S.pc)if(S.pc[q][1]!=='K')S.lb[q]=PTS[S.pc[q][1]];go()},
p(){const s=this.step,m=this.mode;return `<div class="g${modes.length}">${modes.map(x=>B('mode',x,ML[x],m===x)).join('')}</div><div class="g3">${B('side','w','⚪ White',this.side==='w')}${B('side','b','⚫ Black',this.side==='b')}${B('side','r','🎲 Random',this.side==='r')}</div>${MSG(this.msg)}${s===1&&m==='cls'?`<div class="g3">${B('ans','g','✅ Good')}${B('ans','b','❌ Bad')}${B('ans','e','⚖️ Equal')}</div>`:''}${s===1&&m==='avoid'?B('skip',0,'🚫 Don’t capture',0,'p w'):''}<div class="vals">${[...'PNBRQ'].map(t=>`<span>${PG('w',t)}${PTS[t]}</span>`).join('')}</div><div class="g2">${B('badge',0,this.badge?'🔢 Points ON':'🔢 Points OFF',this.badge)}<div class="pill c">Won +${this.tg} · Lost −${this.tl}</div></div>${s===3?'<div class="mu c">⏭ Next position loads automatically…</div>'+B('new',0,'Next ▶',0,'p w'):`<div class="g2">${B('hint',0,'💡 Hint')}${B('new',0,'🎲 New position')}</div>`}<ul class="t">${tips.map(x=>`<li>${x}</li>`).join('')}</ul>`},
a(a,v){if(a==='mode'){this.mode=v;return this.nr()}if(a==='side'){this.side=v;return this.nr()}if(a==='new')return this.nr();if(a==='badge'){this.badge=!this.badge;return this.mv()}if(a==='hint')return this.hint();if(a==='skip')return this.skip();if(a==='ans')return this.answer(v)},
c(q){if(this.step!==1||!this.G||this.mode==='cls')return;const t=this.col,p=S.pc[q];
if(p&&p[0]===t){this.sel=this.sel===q?null:q;snd('click');if(this.sel&&!lmoves(S.pc,t).some(m=>m[0]===q&&S.pc[m[1]]&&S.pc[m[1]][0]!==t))this.msg='This piece has no capture. Try another piece.';return this.mv()}
if(!this.sel)return;const pt=S.pc[this.sel][1];
if(!lmoves(S.pc,t).some(m=>m[0]===this.sel&&m[1]===q)){this.msg=reach(pt,this.sel,S.pc,t).includes(q)?'🚫 Illegal! That would leave your king in check.':'❌ A '+NM[pt]+' cannot move there.';snd('bad');return this.mv()}
if(!S.pc[q]){this.msg='This lesson is about captures. Tap a piece, then choose a capture (red ring).';snd('bad');this.sel=null;return this.mv()}
const a=this.sel;this.sel=null;this.cap=[a,q];this.run(playSee(S.pc,t,a,q))},
answer(v){if(this.step!==1||this.mode!=='cls'||!this.G)return;const p=this.G.info.prop;this.ans=v;this.cap=[p.s,p.t];this.run(playSee(S.pc,this.col,p.s,p.t))},
skip(){if(this.step!==1||this.mode!=='avoid'||!this.G)return;this.step=3;const G=this.G;
if(G.info.allBad){tradeHit(true,'Good decision!','🛡');this.msg=`🛡 Good decision! Every capture here loses points (${this.opts()}). Not trading was the best move.`}
else{const b=this.best();tradeHit(false,'Missed a good trade','✕');this.msg=`❌ A good trade was available! ${this.bs(b)} All options: ${this.opts()}.`}
this.mv();later(()=>{if(M===this)this.nr()},5600)},
opts(){const P=this.P0;return this.G.nets.map(x=>`${NM[P[x.s][1]]} takes ${NM[P[x.t][1]]} on ${x.t}: ${x.net>0?'+':''}${x.net}`).join(' · ')},
best(){return this.G.nets.reduce((m,x)=>x.net>m.net?x:m,this.G.nets[0])},
bs(b){const P=this.P0;return `Best capture: your ${NM[P[b.s][1]]} takes the ${NM[P[b.t][1]]} on ${b.t} (net ${b.net>0?'+':''}${b.net}).`},
run(steps){this.step=2;let i=0;const one=()=>{if(M!==this)return;const s=steps[i++];S.pc=mk(S.pc,s.from,s.to);this.lm=[s.from,s.to];S.ar=[[s.from,s.to,s.c===this.col?'#15781B':'#e08a00',s.piece==='N']];S.an={[s.to]:1};snd('cap');this.mv();if(i<steps.length)later(one,900);else later(()=>this.finish(steps),750)};one()},
finish(steps){if(M!==this)return;this.step=3;const col=this.col,m=this.mode;let g=0,l=0;const gl=[],ll=[];steps.forEach(s=>{if(s.c===col){g+=s.val;gl.push(`${NM[s.victim]} (+${s.val})`)}else{l+=s.val;ll.push(`your ${NM[s.victim]} (−${s.val})`)}});
const net=g-l,line=`You won ${g} point${g===1?'':'s'}: ${gl.join(', ')||'none'}. You lost ${l} point${l===1?'':'s'}${ll.length?': '+ll.join(', '):''}. Net ${net>0?'+':''}${net}.`;
if(m!=='cls'){this.tg+=g;this.tl+=l}
if(m==='cls'){const tr=cls3(net),ok=this.ans===tr;tradeHit(ok,ok?'Correct!':'Not quite',ok?'✓':'✕');this.msg=`${ok?'✅ Correct':'❌ Not quite'} — it is a ${CLN[tr]} trade. ${line}`}
else if(m==='worst'){const mn=Math.min(...this.G.nets.map(x=>x.net)),ok=net===mn,w=this.G.nets.find(x=>x.net===mn),P=this.P0;tradeHit(ok,ok?'Worst trade found!':'Not the worst','🔍');this.msg=ok?`✅ Yes, that is the worst trade! ${line} All options: ${this.opts()}.`:`❌ Not the worst one. ${line} The worst was your ${NM[P[w.s][1]]} taking the ${NM[P[w.t][1]]} on ${w.t} (net ${w.net}). All options: ${this.opts()}.`}
else{const b=this.best();
if(net>0){tradeHit(true,'Good Trade!','✓');this.msg=`✅ Good Trade! ${line}${steps.length===1?' Nobody could recapture — a free piece!':' You took more than you gave.'}`}
else{tradeHit(false,net<0?'Bad Trade!':'Equal Trade',net<0?'✕':'⚖️');this.msg=`${net<0?'❌ Bad Trade!':'⚖️ Equal Trade — not good enough.'} ${line} ${m==='avoid'&&this.G.info.allBad?'The best move was NOT to capture — every capture here loses points ('+this.opts()+').':this.bs(b)}`}}
this.mv();later(()=>{if(M===this)this.nr()},5800)},
hint(){if(this.step!==1||!this.G)return;const P=S.pc,G=this.G,m=this.mode;
if(m==='make'||(m==='avoid'&&!G.info.allBad)){const b=this.best();S.ar=[[b.s,b.t,'#2e86de',P[b.s][1]==='N']];this.msg='💡 Follow the blue arrow — it is the capture that wins the most points.'}
else if(m==='avoid')this.msg='💡 For each capture ask: is the piece protected? If I get recaptured, do I lose more points than I won?';
else if(m==='worst')this.msg='💡 The worst trade loses the most points: a big piece for a small one that is protected.';
else this.msg='💡 Count it: points you win minus points you lose after the recapture. More than zero = Good, below zero = Bad.';
this.mv()}}}

const TIPT1=['A <b>trade</b> (exchange) means you capture a piece and your opponent captures one of yours back.','In this lesson the <b>value of the pieces does not matter</b>: Queen takes pawn, pawn takes Queen, Knight takes pawn — each one is just a trade.','Before you capture, ask: <b>is that piece protected?</b> If yes, expect a recapture.','If nothing protects it, the capture is <b>free</b> — no trade happens.','<b>Recapture:</b> when your opponent takes your piece, take back on the same square.'];
const TIPT2=['<b>Take free pieces:</b> an unprotected piece gives you points and costs you nothing.','<b>Take high-value pieces</b> when you can.','⚠️ Do not capture a low-value piece with a high-value piece if it is protected — you may lose more points than you win!','Count it: <b>points you win − points you lose = net</b>. A positive net is a Right Trade.','Values: Pawn 1 · Knight 3 · Bishop 3 · Rook 5 · Queen 9. The King cannot be traded.'];const TIPG=['<b>Good trade</b> = you win more points than you lose in the whole exchange.','Best of all: a <b>free piece</b> — nothing can recapture.','A small piece taking a bigger protected piece is good (pawn takes Queen!).','Trading a Knight or Bishop (3) for a Rook (5) is “winning the exchange”.','Always count the <b>whole sequence</b>: capture, recapture, capture again…','Values: Pawn 1 · Knight 3 · Bishop 3 · Rook 5 · Queen 9.'];
const TIPB=['<b>Bad trade</b> = you lose more points than you win in the whole exchange.','Never take a protected low-value piece with a high-value piece (Queen takes protected pawn = −8).','If every capture loses points, the best move is <b>not to capture</b> at all.','Before capturing ask: <b>Is it protected? What do I lose if they recapture?</b>','Losing a Rook (5) for a Bishop (3) loses 2 points.','Values: Pawn 1 · Knight 3 · Bishop 3 · Rook 5 · Queen 9.'];

const MODS=[
{n:'1 · Board Setup',d:'Place all 32 pieces in the starting position.',sc:1,
i(){rs();S.pc={};S.mk={};S.co='edge';this.sel='wK';this.msg='Pick a piece, then tap a square to place it.'},
p(){return `<div class="g6">${['w','b'].map(c=>[...T].map(t=>B('sel',c+t,PG(c,t),this.sel===c+t))).flat().join('')}</div>${B('sel','x','🧽 Eraser',this.sel==='x','w')}${MSG(this.msg)}<div class="g2">${B('check',0,'✅ Check setup','','p')}${B('fill',0,'👀 Show answer')}</div>${B('clear',0,'🗑️ Clear board','','w')}<ul class="t"><li>White pieces start on ranks 1–2, black on 7–8.</li><li>Rooks in the corners, then knights, bishops.</li><li>Queen goes on her own colour (white queen on a light square).</li><li>Light square in the bottom-right corner (h1).</li></ul>`},
a(a,v){if(a==='sel')this.sel=v;
if(a==='fill'){S.pc=start();S.mk={};this.msg='This is the starting position.';snd('move')}
if(a==='clear'){S.pc={};S.mk={};this.msg='Board cleared.'}
if(a==='check'){const s=start();let ok=0,bad=0;S.mk={};for(let i=0;i<8;i++)for(let r=1;r<9;r++){const q=F[i]+r,e=s[q],g=S.pc[q];if(e||g){if(e===g){ok++;S.mk[q]='ok'}else{bad++;S.mk[q]='bad'}}}
const perfect=!bad&&ok===32;this.msg=perfect?'🎉 Perfect setup!':`${ok} correct, ${bad} wrong or missing (red).`;hit(perfect,true)}
go()},
c(q){snd('move');S.mk={};if(this.sel==='x')delete S.pc[q];else{S.pc[q]=this.sel;S.an={[q]:1}}go()}},

{n:'2 · Identify Pieces',d:'Name the piece shown on the board.',sc:1,
i(){rs();this.on=0;S.pc={};S.co='edge'},
nx(){this.t=rnd(T);this.sq=rsq(this.sq);S.pc={[this.sq]:rnd('wb')+this.t};S.an={[this.sq]:1}},
p(){return `<div class="g3">${[...T].map(t=>`<button class="b" data-a="ans" data-v="${t}" ${this.on?'':'disabled'}>${PG('w',t)}${NM[t]}</button>`).join('')}</div>${B('s',0,this.on?'🔄 Restart':'▶ Start',0,'p w')}${MSG(this.on?'Which piece is this?':'Press Start')}`},
a(a,v){if(a==='s'){rs();this.on=1;this.nx()}
if(a==='ans'){if(v===this.t){hit(1);this.nx()}else hit(0)}go()}},

{n:'3 · Learn Coordinates',d:'Files a–h run left to right, ranks 1–8 bottom to top (from White\'s side). Tap any square.',
i(){S.pc=start();S.co='edge';this.sq=null;this.vis=new Set()},
p(){const s=this.sq,i=s?F.indexOf(s[0]):0;return `<div class="big">${s||'—'}</div>${MSG(s?`File ${s[0]} (column ${i+1}), rank ${s[1]} · ${(i+ +s[1])%2?'dark':'light'} square`:'Tap a square to see its name.')}<div class="g3">${B('co','none','Hidden',S.co==='none')}${B('co','edge','Edges',S.co==='edge')}${B('co','all','Every square',S.co==='all')}</div>${B('pcs',0,S.pc.a1?'Hide pieces':'Show pieces',0,'w')}<ul class="t"><li>Name = file letter + rank number, e.g. e4.</li><li>White's king starts on e1, black's on e8.</li><li>a1 is always a dark square.</li></ul>`},
a(a,v){if(a==='co')S.co=v;if(a==='pcs')S.pc=S.pc.a1?{}:start();go()},
c(q){snd('move');this.sq=q;S.mk={[q]:'sel'};this.vis.add(q);if(this.vis.size>=12&&!done.has(cur))win();go()}},

{n:'4 · Find the Square',d:'A coordinate appears — tap the matching square.',sc:1,
i(){rs();this.on=0;this.m=30;this.left=30;this.t=null;this.msg='';S.pc={};S.co='none'},
p(){return `<div class="g2">${B('m',30,'⏱ 30 sec',this.m===30)}${B('m',0,'∞ No limit',this.m===0)}</div><div class="big">${this.on?this.t:'—'}</div>${this.m?`<div class="mu c">Time left: <b id="tm">${this.left}</b>s</div>`:''}${MSG(this.msg||'Press Start')}${B('s',0,this.on?'🔄 Restart':'▶ Start training',0,'p w')}`},
a(a,v){if(a==='m'){this.m=+v;this.left=this.m;this.on=0;clearInterval(tm)}
if(a==='s'){rs();this.on=1;this.left=this.m;this.t=rsq();this.msg='Tap the square shown.';clearInterval(tm);if(this.m)tm=setInterval(()=>{this.left--;const e=$('#tm');if(e)e.textContent=this.left;if(this.left<=0){clearInterval(tm);this.on=0;this.msg=`Time's up! Score: ${st.c}`;if(st.c)win();go()}},1000)}
go()},
c(q){if(!this.on)return;if(q===this.t){hit(1);this.t=rsq(q)}else hit(0);go()}},

{n:'5 · Name the Square',d:'Name the highlighted square using the file and rank keys.',sc:1,
i(){rs();this.on=0;this.t=null;this.f=this.r=null;S.pc={};S.co='edge'},
p(){return `<div class="big">${(this.f||'')+(this.r||'')||'—'}</div><div class="mu">FILE</div><div class="g8">${[...F].map(x=>B('f',x,x,this.f===x)).join('')}</div><div class="mu">RANK</div><div class="g8">${[1,2,3,4,5,6,7,8].map(x=>B('r',x,x,this.r==x)).join('')}</div>${B('s',0,this.on?'🔄 Restart':'▶ Start training',0,'p w')}${B('tc',0,'Coordinates '+(S.co==='none'?'off':'on'),0,'w')}`},
a(a,v){if(a==='tc')S.co=S.co==='none'?'edge':'none';
if(a==='s'){rs();this.on=1;this.t=rsq();this.f=this.r=null;S.mk={[this.t]:'tgt'}}
if((a==='f'||a==='r')&&this.on){this[a]=v;if(this.f&&this.r){if(this.f+this.r===this.t){hit(1);this.t=rsq(this.t);S.mk={[this.t]:'tgt'}}else hit(0);this.f=this.r=null}}
go()}},

{n:'6 · Piece Points',d:'Learn how much each piece is worth, then test yourself.',sc:1,
i(){rs();this.q=null;S.co='edge';S.pc={};[...'PNBRQK'].forEach((t,k)=>S.pc[F[k+1]+4]='w'+t);this.info='Tap a piece on the board.'},
p(){return `<table>${[...'PNBRQK'].map(t=>`<tr><td>${PG('w',t)}</td><td>${NM[t]}</td><td>${VAL[t]}</td></tr>`).join('')}</table><ul class="t"><li>The king is priceless — losing it loses the game.</li><li>Bishop + knight (6) ≈ rook + pawn (6).</li><li>These points are a handy guide, not an official FIDE rule.</li></ul>${MSG(this.q?`How many points is the ${NM[this.q]}?`:this.info)}<div class="g6">${[1,3,5,9,'∞'].map(v=>`<button class="b" data-a="q" data-v="${v}" ${this.q?'':'disabled'}>${v}</button>`).join('')}</div><div class="g2">${B('s',0,'▶ Start quiz',0,'p')}${B('r',0,'Stop')}</div>`},
nx(){this.q=rnd(T);S.mk={['bcdefg'['PNBRQK'.indexOf(this.q)]+4]:'tgt'}},
a(a,v){if(a==='s'){rs();this.nx()}if(a==='r'){this.q=null;S.mk={}}
if(a==='q'){if(v===String(VAL[this.q])){hit(1);this.nx()}else hit(0)}go()},
c(q){if(this.q||!S.pc[q])return;const t=S.pc[q][1];this.info=`${NM[t]} = ${VAL[t]} point${VAL[t]===1?'':'s'}`;S.mk={[q]:'sel'};snd('move');go()}},

{n:'7 · Piece Movement',d:'Tap the piece to see where it can go, then tap a square. A right move gets a green arrow!',sc:1,
i(){rs();this.t='N';this.hint=0;this.en=0;this.setup()},
setup(){const p=this.t==='P',pos=p?rnd(F)+(2+Math.random()*5|0):rsq();S.pc={[pos]:'w'+this.t};S.ar=[];this.lm=null;this.selp=0;this.pos=pos;
if(this.en){const u=new Set([pos]);for(let i=0;i<4;i++){let q;do q=rnd(F)+(2+Math.random()*6|0);while(u.has(q));u.add(q);S.pc[q]='bP'}}
S.co='edge';this.msg=DESC[this.t];this.mv()},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;
if(this.lm)this.lm.forEach(x=>add(x,'lm'));
if(this.selp){add(this.pos,'sel');if(this.en){const Q={...S.pc};delete Q[this.pos];atk(Q,'b').forEach(x=>add(x,'bad'))}legal(this.t,this.pos,S.pc).forEach(x=>add(x,S.pc[x]?'cap':'dot'))}go()},
p(){return `<div class="g3">${[...T].map(t=>B('t',t,PG('w',t)+NM[t],this.t===t)).join('')}</div>${MSG(this.msg)}<div class="g2">${B('en',0,this.en?'♟ Enemy ON':'♟ Enemy OFF',this.en)}${B('rst',0,'🎲 New square')}</div><ul class="t"><li>Tap the piece to see its possible moves (green dots).</li><li>Then tap the square you want to move to.</li><li>Right move: ✅ point, green arrow, and the piece moves there.</li><li>Wrong move: ❌ point lost and the piece stays.</li><li>Turn on Enemy to practise captures and king safety (red squares are attacked).</li><li>A pawn that reaches the last rank becomes a Queen!</li></ul>`},
a(a,v){if(a==='t'){this.t=v;this.setup()}else if(a==='en'){this.en=!this.en;this.setup()}else this.setup()},
c(q){if(q===this.pos){this.selp=!this.selp;snd('click');return this.mv()}S.ar=[];this.selp=0;const o=this.pos,L=legal(this.t,o,S.pc);
if(L.includes(q)){const cp=S.pc[q];delete S.pc[o];S.pc[q]='w'+this.t;this.pos=q;S.an={[q]:1};this.lm=[o,q];S.ar=[[o,q,'#15781B',this.t==='N']];snd(cp?'cap':'move');
if(this.t==='P'&&q[1]==='8'){S.pc[q]='wQ';this.t='Q';this.msg='🎉 Promotion! The pawn reached the last rank and became a Queen.';hit(1,true)}
else{this.msg=cp?'✅ Correct — and you captured a piece!':'✅ Correct move!';hit(1)}this.mv()}
else{const Q={...S.pc};delete Q[o];const ill=this.t==='K'&&reach('K',o,S.pc,'w').includes(q)&&atk(Q,'b').has(q);
this.msg=ill?'🚫 Illegal! A king may never move into check.':'❌ That is not a valid move for the '+NM[this.t]+'.';hit(0);this.mv()}}},

{n:'8 · Castling',d:'Move king and rook together — but only when FIDE rules allow it.',sc:1,
i(){rs();this.setup()},
setup(){S.pc=start();S.co='edge';S.mk={};S.ar=[];this.dead=0;this.mvd={w:0,b:0};this.sel=null;this.msg='Pieces are in the way! Press “Clear the way”, then tap a king or a castling button.'},
clear(){['w','b'].forEach(c=>{const r=c==='w'?1:8;[...'bcdfg'].forEach(x=>{const p=S.pc[x+r];if(p&&p[0]===c&&p[1]!=='K'&&p[1]!=='R')delete S.pc[x+r]})})},
why(c,s){const r=c==='w'?1:8,k=s==='k',a=atk(S.pc,c==='w'?'b':'w');
if(this.mvd[c])return 'King and rook have already moved (castled).';
if(S.pc['e'+r]!==c+'K'||S.pc[(k?'h':'a')+r]!==c+'R')return 'King and rook must both be on their home squares.';
if((k?['f','g']:['b','c','d']).some(x=>S.pc[x+r]))return 'Pieces are standing between the king and rook.';
if(a.has('e'+r))return 'The king is in check — castling is not allowed.';
if((k?['f','g']:['d','c']).some(x=>a.has(x+r)))return 'The king would pass through or land on an attacked square.';return ''},
alive(){const sv=S.pc;S.pc={...sv};this.clear();const ok=['w','b'].some(c=>['k','q'].some(s=>!this.why(c,s)));S.pc=sv;return ok},
chk(){if(!this.dead&&!this.alive()){this.dead=1;this.msg+=' 🏁 No castling move is possible any more — restart the castling lesson to learn again!'}},
do(c,s){const r=c==='w'?1:8,k=s==='k',K=(k?'g':'c')+r,R=(k?'f':'d')+r,rf=(k?'h':'a')+r;delete S.pc['e'+r];delete S.pc[rf];S.pc[K]=c+'K';S.pc[R]=c+'R';this.mvd[c]=1;this.sel=null;S.mk={};S.an={[K]:1,[R]:1};S.ar=[['e'+r,K,'#15781B'],[rf,R,'#15781B']];this.msg=k?'Kingside castling (O-O): king to g, rook to f.':'Queenside castling (O-O-O): king to c, rook to d.';this.chk();snd('move');hit(1,true)},
p(){return `${MSG(this.msg)}${this.dead?B('rst',0,'↺ Restart castling lesson',0,'p w'):''}<div class="g2">${B('cs','wk','♔ White O-O')}${B('cs','wq','♔ White O-O-O')}</div><div class="g2">${B('cs','bk','♚ Black O-O')}${B('cs','bq','♚ Black O-O-O')}</div>${B('clr',0,'🧹 Clear the way',0,this.dead?'w':'p w')}<div class="g2">${B('dng',0,'⚠️ Attack demo')}${B('rst',0,'↺ Restart')}</div><ul class="t"><li>Neither the king nor that rook has moved before.</li><li>No pieces between the king and rook.</li><li>The king is not in check, does not pass over, and does not land on an attacked square.</li><li>King moves two squares toward the rook; the rook jumps to the other side.</li></ul>`},
a(a,v){S.ar=[];if(a==='rst')return this.setup(),go();
if(a==='clr'){this.clear();S.mk={};this.msg='Knights, bishops and queens are cleared (kings and rooks stay). Now try to castle!';this.chk()}
if(a==='dng'){this.setup();this.clear();delete S.pc.f2;delete S.pc.f7;S.pc.f8='bR';S.mk={f8:'bad'};this.msg='A black rook now attacks the f-file. Try White O-O, then White O-O-O!'}
if(a==='cs'){const c=v[0],s=v[1],w=this.why(c,s);if(!w)return this.do(c,s),go();this.msg='❌ '+w;hit(0)}
go()},
c(q){S.ar=[];const p=S.pc[q];
if(this.sel&&this.sel[q]){const c=q[1]==1?'w':'b';return this.do(c,this.sel[q]),go()}
if(p&&p[1]==='K'){const c=p[0],r=c==='w'?1:8,bad=[];S.mk={[q]:'sel'};this.sel={};
['k','q'].forEach(s=>{const w=this.why(c,s);if(w)bad.push(w);else{const g=(s==='k'?'g':'c')+r;this.sel[g]=s;S.mk[g]='dot'}});
this.msg=Object.keys(this.sel).length?'Tap a green dot to castle!':'Cannot castle: '+bad[0]}
else{S.mk={};this.sel=null}go()}}
,

{n:'9 · Learn Notation',d:'Every move has a short written name. Read the move on the board and choose its notation.',sc:1,
i(){rs();this.on=0;this.fb='';this.opts=[];S.pc={};S.ar=[];S.mk={};S.co='edge'},
nx(){const t=rnd(T),p=t==='P'?rnd(F)+(2+Math.random()*5|0):rsq(),P={[p]:'w'+t};let d,cap=0;
if(t==='P'){const f=F.indexOf(p[0]),r=+p[1],dg=[-1,1].map(x=>sqa(f+x,r+1)).filter(Boolean);if(Math.random()<.4){d=rnd(dg);cap=1}else d=rnd(legal('P',p,P))}
else{d=rnd(legal(t,p,P));cap=Math.random()<.4?1:0}
if(cap)P[d]='bN';
const fm=(l,x,s)=>l==='P'?(x?p[0]+'x'+s:s):l+(x?'x':'')+s,nb=s=>{const f=F.indexOf(s[0]),r=+s[1];return rnd([[1,0],[-1,0],[0,1],[0,-1]].map(([x,y])=>sqa(f+x,r+y)).filter(q=>q&&q!==p))};
const oth=[...'KQRBN'].filter(x=>x!==t),ok=fm(t,cap,d),w=new Set([fm(t,!cap,d),t==='P'?(cap?'Px'+d:'P'+d):fm(rnd(oth),cap,d),fm(t,cap,nb(d)),t==='P'?fm('P',cap,nb(d)):fm(rnd(oth),!cap,d)]);w.delete(ok);
while(w.size<3){const q=fm(rnd([...oth,'P']),Math.random()<.5,rsq());if(q!==ok)w.add(q)}
this.ok=ok;this.ex=`${ok} = ${NM[t]} ${cap?'captures on':'moves to'} ${d}`;this.opts=shuf([ok,...[...w].slice(0,3)]);S.pc=P;S.ar=[[p,d,'#15781B',t==='N']];S.an={[p]:1}},
p(){return `${MSG(this.on?(this.fb?this.fb+'<br>':'')+'Which notation describes the move shown by the arrow?':'Press Start, then pick the correct notation for the arrow move.')}<div class="g2">${this.opts.map(o=>`<button class="b opt" data-a="ans" data-v="${o}" ${this.on?'':'disabled'}>${o}</button>`).join('')}</div>${B('s',0,this.on?'🔄 Restart':'▶ Start',0,'p w')}<ul class="t"><li><b>K Q R B N</b> = King, Queen, Rook, Bishop, Knight. Pawns have <b>no letter</b>: e4.</li><li><b>x</b> = capture: Nxf3. A pawn capture starts with its file: exd5.</li><li><b>+</b> = check, <b>#</b> = checkmate.</li><li><b>O-O</b> = castle kingside, <b>O-O-O</b> = castle queenside.</li><li><b>=</b> = promotion: e8=Q.</li></ul>`},
a(a,v){if(a==='s'){rs();this.on=1;this.fb='';this.nx()}
if(a==='ans'&&this.on){if(v===this.ok){hit(1);this.fb='✅ '+this.ex}else{hit(0);this.fb='❌ It was '+this.ex}this.nx()}go()}},

{n:'10 · En Passant',d:'A special pawn capture — allowed only right after a two-square pawn advance! White and Black positions.',sc:1,
i(){rs();this.mode='prac';this.nr()},
nr(){clearTimeout(nt);for(let n=0;n<400&&!this.build();n++);this.mv()},
auto(ms){later(()=>{if(M===this)this.nr()},ms)},
build(){const prac=this.mode==='prac',s=rnd('wb'),e=s==='w'?'b':'w',dir=s==='w'?1:-1,rO=s==='w'?5:4,rp=rO+dir;
const type=prac?rnd(['simple','simple','simple','decoy']):rnd(['simple','decoy','single','delay','far','rank']);
let f,bf;
if(type==='decoy'){f=1+(Math.random()*6|0);bf=f+(Math.random()<.5?1:-1)}
else if(type==='far'){do{f=Math.random()*8|0;bf=Math.random()*8|0}while(Math.abs(f-bf)<2)}
else{f=Math.random()*8|0;bf=f===0?1:f===7?6:f+(Math.random()<.5?1:-1)}
const P={},u=new Set(),put=(q,pc)=>{P[q]=pc;u.add(q)},pr=type==='rank'?rO-dir:rO,bf2=2*f-bf;
put(F[f]+pr,s+'P');put(F[bf]+rO,e+'P');if(type==='decoy')put(F[bf2]+rO,e+'P');
const fw=F[f]+(pr+dir),tg=F[bf]+rp;u.add(fw);u.add(tg);
const from=F[bf]+(rO+(type==='single'?dir:2*dir));if(type!=='delay'&&type!=='single'){if(u.has(from))return 0;u.add(from);u.add(F[bf]+(rO+dir))}
const used=new Set([f,bf,bf2]);
for(let i=0,n=1+(Math.random()*3|0);i<n;i++){const fl=Math.random()*8|0,c=rnd([s,e]),q=F[fl]+(2+(Math.random()*6|0));if(!used.has(fl)&&!u.has(q)&&q[1]!=String(rO)&&pawnOk(P,q,c))put(q,c+'P')}
const ok=freeSq(u,q=>(s==='w'?+q[1]<rO:+q[1]>rO)&&!atk(P,e).has(q));if(!ok)return 0;put(ok,s+'K');
const ek=freeSq(u,q=>(s==='w'?+q[1]>rO:+q[1]<rO)&&cdist(q,ok)>1&&!atk(P,s).has(q));if(!ek)return 0;put(ek,e+'K');
let lm=[from,F[bf]+rO];if(type==='delay'){const pv=freeSq(u,q=>cdist(q,ek)===1);if(!pv)return 0;lm=[pv,ek]}
if(type==='simple'||type==='decoy'){const Q={...P};delete Q[F[f]+pr];delete Q[F[bf]+rO];Q[tg]=s+'P';if(atk(Q,e).has(ok))return 0}
Object.assign(this,{s,e,dir,rO,rp,f,bf,bf2,type,pq:F[f]+pr,fw,tg,valid:type==='simple'||type==='decoy',sel:0,lm});
S.pc=P;S.flip=false;S.ar=[[lm[0],lm[1],'#e08a00']];S.co='edge';S.an={};
const En=e==='b'?'Black':'White',Ow=s==='w'?'White':'Black',x=F[bf],dbl=`${x}${rO+2*dir}–${x}${rO}`,ic=s==='w'?'⚪':'⚫',R5=s==='w'?'5th':'4th';
const info={simple:`${En} just played ${dbl} (two squares).`,decoy:`${En} just played ${dbl} (two squares). Two pawns stand beside yours.`,single:`${En} just played ${x}${rO+dir}–${x}${rO} (one square).`,far:`${En} just played ${dbl} (two squares).`,rank:`${En} just played ${dbl} (two squares).`,delay:`${En}'s pawn went ${dbl} two moves ago. ${En}'s last move was the king (orange arrow).`}[type];
this.yes=type==='decoy'?'Only the pawn that just moved two squares (orange arrow) can be captured.':'The pawn moved two squares and landed right beside yours.';
this.why={single:'No — the pawn moved only one square. En passant needs a two-square advance.',delay:'No — you must capture immediately. The chance vanished after another move.',far:'No — the enemy pawn must land right beside your pawn.',rank:`No — your pawn must be on its ${R5} rank for en passant.`}[type]||'';
this.step=prac?2:1;
this.msg=`${ic} ${Ow} to move${s==='b'?' (Black pawns move down)':''}. ${info} `+(prac?'Capture en passant!':`Can ${Ow} capture en passant right now?`);
return 1},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;(this.lm||[]).forEach(x=>add(x,'lm'));
if(this.step===2&&this.sel){add(this.pq,'sel');add(this.fw,'dot');add(this.tg,'cap')}go()},
p(){const s=this.step;return `<div class="g2">${B('md','prac','🎯 Practice',this.mode==='prac')}${B('md','quiz','❓ Quiz',this.mode==='quiz')}</div>${MSG(this.msg)}${s===1?`<div class="g2">${B('yn','y','✅ Yes')}${B('yn','n','❌ No')}</div>`:''}${s===2?'<div class="mu c">Tap your pawn to see its moves.</div>':''}${s===3?'<div class="mu c">⏭ Next position loads automatically…</div>'+B('s',0,'Next ▶',0,'p w'):B('s',0,'🎲 New position',0,'w')}<ul class="t"><li>Your pawn must stand on its <b>5th rank</b> (4th rank for Black).</li><li>The enemy pawn must have just moved <b>two squares</b> and landed right beside yours.</li><li>You must capture <b>immediately</b> — on the very next move, or the chance is gone.</li><li>Your pawn lands on the square <b>behind</b> the enemy pawn, which is removed. Notation: exd6 e.p.</li></ul>`},
a(a,v){if(a==='md'){this.mode=v;return this.nr()}if(a==='s')return this.nr();
if(a==='yn'&&this.step===1){const y=v==='y';if(y===this.valid){hit(1);if(this.valid){this.step=2;this.msg='✅ Yes! '+this.yes+' Now play it: tap your pawn, then the square it lands on.'}else{this.step=3;this.msg='✅ '+this.why}}
else{hit(0);this.step=3;this.msg=this.valid?'❌ It was allowed! '+this.yes:'❌ '+this.why}
if(this.step===3)this.auto(4500);this.mv()}},
c(q){if(this.step!==2)return;
if(q===this.pq){this.sel=!this.sel;snd('click');return this.mv()}
if(q===this.tg){delete S.pc[F[this.bf]+this.rO];delete S.pc[this.pq];S.pc[q]=this.s+'P';S.an={[q]:1};this.lm=[this.pq,q];S.ar=[[this.pq,q,'#15781B']];snd('cap');this.step=3;this.sel=0;this.msg=`🎉 En passant! ${F[this.f]}x${q} e.p. — the pawn captured as if it had moved only one square.`;this.auto(2800);hit(1,true);return this.mv()}
this.msg=q===this.fw?'❌ That is a normal pawn move. Capture en passant: go diagonally behind the enemy pawn.':(this.type==='decoy'&&q===F[this.bf2]+this.rp?'❌ That pawn was already there. Only the pawn that just moved two squares can be captured.':'❌ That is not a legal pawn move. Tap your pawn to see its moves.');this.sel=0;hit(0);this.mv()}},

{n:'11 · Pawn Promotion',d:'Reach the last rank and your pawn becomes a stronger piece! White and Black positions.',sc:1,
i(){rs();this.mode='prac';this.nr()},
nr(){clearTimeout(nt);for(let n=0;n<400&&!this.build(n>300);n++);this.mv()},
auto(ms){later(()=>{if(M===this)this.nr()},ms)},
build(easy){const quiz=this.mode==='quiz',s=rnd('wb'),e=s==='w'?'b':'w',rp=s==='w'?7:2,lr=s==='w'?8:1;
const type=quiz&&!easy?rnd(['goal','goal','capture','check']):'goal',f=Math.random()*8|0,pq=F[f]+rp,fw=F[f]+lr,dg=[-1,1].map(x=>sqa(f+x,lr)).filter(Boolean);
const P={[pq]:s+'P'},u=new Set([pq,...dg]),put=(q,c)=>{P[q]=c;u.add(q)};let tg=[];
if(type==='check'){tg=[fw];u.add(fw)}
else{const blocked=type==='capture'?false:Math.random()<.25;let caps=dg.filter(()=>Math.random()<.6);
if((blocked||type==='capture')&&!caps.length)caps=[rnd(dg)];
if(blocked)put(fw,e+rnd(['R','N','B','Q']));else{tg.push(fw);u.add(fw)}
caps.forEach(q=>{put(q,e+rnd(['R','N','B']));tg.push(q)})}
for(let i=0,n=Math.random()*3|0;i<n;i++){const c=rnd([s,e]),t=rnd(c===s?['R','B','N']:['R','B','N','P']),q=freeSq(u,q=>t!=='P'||pawnOk(P,q,c));if(q)put(q,c+t)}
const ok=freeSq(u,q=>(s==='w'?+q[1]<=5:+q[1]>=4)&&!atk(P,e).has(q));if(!ok)return 0;put(ok,s+'K');
const ek=freeSq(u,q=>(s==='w'?+q[1]>=6:+q[1]<=3)&&cdist(q,ok)>1&&!atk(P,s).has(q));if(!ek)return 0;put(ek,e+'K');
if(atk(P,e).has(ok))return 0;
for(const q of tg){const Q={...P};delete Q[pq];Q[q]=s+'P';if(atk(Q,e).has(ok))return 0}
const gives=(t,d)=>{const Q={...P};delete Q[pq];Q[d]=s+t;return atk(Q,s).has(ek)};
let good=null;if(type==='check'){const g=[...'QRBN'].filter(t=>gives(t,fw));if(g.length<1||g.length>3)return 0;good=g}
const goal=rnd([...'QRBN']),Ow=s==='w'?'White':'Black',ic=s==='w'?'⚪':'⚫';
Object.assign(this,{s,e,pq,tg,ek,type,goal,good,f,step:1,sel:0,lm:null,dest:null});S.pc=P;S.flip=false;S.ar=[];S.co='edge';S.an={};
this.msg=`${ic} ${Ow} to move${s==='b'?' (Black pawns move down)':''}. `+(!quiz?'Push the pawn or capture diagonally to reach the last rank, then choose any piece.':type==='goal'?`Task: promote to a ${NM[goal]}.`:type==='capture'?`Task: capture an enemy piece and promote to a ${NM[goal]}.`:'Task: promote so the new piece gives CHECK to the enemy king!');
return 1},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;(this.lm||[]).forEach(x=>add(x,'lm'));
if(this.step===1&&this.sel){add(this.pq,'sel');this.tg.forEach(x=>add(x,S.pc[x]?'cap':'dot'))}go()},
p(){const s=this.step;return `<div class="g2">${B('md','prac','🎯 Practice',this.mode==='prac')}${B('md','quiz','❓ Quiz',this.mode==='quiz')}</div>${MSG(this.msg)}${s===2?`<div class="mu c">Choose the new piece:</div><div class="g2">${[...'QRBN'].map(t=>B('pr',t,PG(this.s,t)+NM[t])).join('')}</div>`:''}${s===3?'<div class="mu c">⏭ Next position loads automatically…</div>'+B('s',0,'Next ▶',0,'p w'):B('s',0,'🎲 New position',0,'w')}<ul class="t"><li>A pawn that reaches the last rank <b>must</b> promote — White on rank 8, Black on rank 1.</li><li>Choose a Queen, Rook, Bishop or Knight — never a King or a pawn.</li><li>Most players choose a Queen, but a Knight can sometimes give check that no other piece can!</li><li>A pawn can also promote by capturing diagonally.</li><li>Notation: <b>e8=Q</b>, <b>dxc8=N+</b> (+ means check)</li></ul>`},
a(a,v){if(a==='md'){this.mode=v;return this.nr()}if(a==='s')return this.nr();
if(a==='pr'&&this.step===2){const s=this.s,Q={...S.pc};Q[this.dest]=s+v;const chk=atk(Q,s).has(this.ek);let ok=true,why='';
if(this.mode==='quiz'){if(this.type==='check'){ok=chk;why=`A ${NM[v]} on ${this.dest} does not attack the king. Try another piece!`}else{ok=v===this.goal;why=`The task asks for a ${NM[this.goal]}.`}}
if(ok){S.pc[this.dest]=s+v;S.an={[this.dest]:1};this.step=3;this.auto(3200);this.msg=`✅ Promoted to a ${NM[v]}!${chk?' It gives check!':''} ${PINFO[v]} Notation: ${this.note}=${v}${chk?'+':''}`;hit(1,true)}
else{hit(0);this.msg='❌ '+why}
this.mv()}},
c(q){if(this.step!==1)return;if(q===this.pq){this.sel=!this.sel;snd('click');return this.mv()}
if(this.tg.includes(q)){const cp=S.pc[q];
if(this.type==='capture'&&!cp){hit(0);this.msg='❌ This task needs a capture. Move diagonally onto an enemy piece.';this.sel=0;return this.mv()}
delete S.pc[this.pq];S.pc[q]=this.s+'P';this.dest=q;this.lm=[this.pq,q];S.ar=[[this.pq,q,'#15781B']];S.an={[q]:1};this.note=cp?this.pq[0]+'x'+q:q;snd(cp?'cap':'move');this.step=2;this.sel=0;this.msg='The pawn reached the last rank! Choose its new piece.';this.mv()}
else{hit(0);this.msg='❌ Pawns move forward or capture diagonally. Tap the pawn to see its moves.';this.sel=0;this.mv()}}},

{n:'12 · Check on the King',d:'A king under attack is in check. Learn to spot check and to escape it!',sc:1,
i(){rs();this.mode='esc';this.step=0;this.sel=null;this.lm=null;this.K=null;S.pc={};S.ar=[];S.co='edge';this.msg='Press Start, then follow the task.';this.mv()},
auto(ms){later(()=>{if(M===this)this.nr()},ms)},
nr(){clearTimeout(nt);const esc=this.mode==='esc',g=genCheck(esc?true:Math.random()<.5);S.pc=g.P;this.K=g.K;this.ak=g.a;this.ic=atk(g.P,'b').has(g.K);this.mvs=this.ic?wmoves(g.P):[];this.sel=null;this.lm=null;S.ar=[];this.step=1;
this.msg=esc?'⚠️ Your king is in check! Tap a white piece, then tap a square that gets the king out of check.':'Is the white king in check right now?';this.mv()},
mv(){S.mk={};const add=(x,c)=>S.mk[x]=(S.mk[x]||'')+' '+c;(this.lm||[]).forEach(x=>add(x,'lm'));
if(this.step&&this.K&&S.pc[this.K]==='wK'&&atk(S.pc,'b').has(this.K)&&(this.mode==='esc'||this.step>1))add(this.K,'chk');
if(this.step===1&&this.mode==='esc'&&this.sel){add(this.sel,'sel');this.mvs.filter(m=>m[0]===this.sel).forEach(m=>add(m[1],S.pc[m[1]]?'cap':'dot'))}go()},
p(){const s=this.step;return `<div class="g2">${B('md','esc','🛡 Escape check',this.mode==='esc')}${B('md','chk','🔍 Is it check?',this.mode==='chk')}</div>${MSG(this.msg)}${s===1&&this.mode==='chk'?`<div class="g2">${B('yn','y','✅ Yes, check')}${B('yn','n','❌ No check')}</div>`:''}${s===0?B('s',0,'▶ Start',0,'p w'):''}${s===2?'<div class="mu c">⏭ Next position loads automatically…</div>'+B('s',0,'Next ▶',0,'p w'):''}<ul class="t"><li><b>Check</b>: the king is attacked by an enemy piece (red glow).</li><li>You must escape at once. Three ways:<br>1) Move the king to a safe square<br>2) Capture the checking piece<br>3) Block the line (not possible against a knight or pawn)</li><li>You may never make a move that leaves your own king in check.</li><li>If there is no escape, it is <b>checkmate</b> (#).</li></ul>`},
a(a,v){if(a==='md'){this.mode=v;return this.nr()}if(a==='s')return this.nr();
if(a==='yn'&&this.step===1){const y=v==='y';if(y===this.ic)hit(1);else hit(0);
this.msg=(y===this.ic?'✅ ':'❌ ')+(this.ic?'It IS check — a black piece attacks the king (see the glow).':'No check — nothing attacks the king (a piece may be in the way).');this.step=2;this.auto(3800);this.mv()}},
c(q){if(this.step!==1||this.mode!=='esc')return;const p=S.pc[q];
if(p&&p[0]==='w'){this.sel=this.sel===q?null:q;snd('click');if(this.sel)this.msg=this.mvs.some(m=>m[0]===q)?'Tap a green dot to move there.':'❌ This piece cannot get the king out of check — try another piece.';return this.mv()}
if(!this.sel){this.msg='Tap one of your white pieces first.';return this.mv()}
const s=this.sel,t=S.pc[s][1];this.sel=null;
if(this.mvs.some(m=>m[0]===s&&m[1]===q)){const cp=S.pc[q];delete S.pc[s];S.pc[q]='w'+t;S.an={[q]:1};this.lm=[s,q];S.ar=[[s,q,'#15781B',t==='N']];snd(cp?'cap':'move');this.step=2;
this.msg=t==='K'?'✅ The king stepped out of check!':(q===this.ak?'✅ You captured the checking piece!':'✅ You blocked the check!');this.auto(3000);hit(1,true)}
else{this.msg=reach(t,s,S.pc,'w').includes(q)?'❌ That move leaves your king in check! Find a move that removes the check.':'❌ A '+NM[t]+' cannot move there.';hit(0)}
this.mv()}}
,

mateMod(13,'Basic Checkmate I','Checkmate with a Queen or with Two Rooks. Solve puzzles, play the computer, or move both sides yourself.',[{id:'Q',label:'♛ Queen'},{id:'RR',label:'♜♜ Two Rooks'}],{Q:TIPQ,RR:TIPRR}),
mateMod(14,'Basic Checkmate II','Checkmate with One Rook or with Two Bishops. Solve puzzles, play the computer, or move both sides yourself.',[{id:'R',label:'♜ One Rook'},{id:'BB',label:'♝♝ Two Bishops'}],{R:TIPR,BB:TIPBB})
,

evalMod(15,'Good Trading of Pieces','Make trades that win more points overall: free pieces, bigger pieces and winning exchanges.','good',TIPG),
evalMod(16,'Bad Trading of Pieces','Learn what a bad trade is: losing more points than you win. Avoid it, spot it, or decline to capture.','bad',TIPB)
];

function load(i){clearInterval(tm);clearTimeout(nt);cur=i;M=MODS[i];S.mk={};S.ar=[];S.lb={};S.flip=false;S.pc={};S.an={};S.co='edge';M.i();go()}
function home(){$('#prog').textContent='⭐ '+done.size+' / '+MODS.length+' stars';$('#grid').innerHTML=MODS.map((m,i)=>{const[a,b]=m.n.split(' · ');return `<a class="tc" href="#/${i+1}" style="--c:${TINT[i]}"><span class="num">${a}</span>${done.has(i)?'<span class="star">⭐</span>':''}<span class="ic">${PG('w',ICON[i])}</span><h3>${EMO[i]} ${b}</h3><p>${m.d}</p><span class="go">Let's go! ▶</span></a>`}).join('')}
function route(){const m=/^#\/(\d+)$/.exec(location.hash),n=m?+m[1]:0,t=n>=1&&n<=MODS.length;clearInterval(tm);clearTimeout(nt);$('#home').hidden=t;$('#topic').hidden=!t;$('#flip').hidden=!t;$('#hm').hidden=!t;document.documentElement.classList.toggle('in',t);if(t){load(n-1);hideScore(true);showHero(n-1)}else{hideHero(true);home();afterHome()}scrollTo(0,0)}
$('#mascot').innerHTML=PG('w','N');
$('#bgp').innerHTML=[...'KQRBNPKQRBNP'].map((t,i)=>`<div style="left:${(i*8.5+3)%96}%;top:${(i*29+7)%88}%;animation-delay:${i*.35}s">${SVG(i%2?'b':'w',t)}</div>`).join('');
addEventListener('hashchange',route);

