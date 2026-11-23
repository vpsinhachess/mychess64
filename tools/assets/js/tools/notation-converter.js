const CUR="notation-converter";
const N8=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],K8=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
function attacked(s,sq,by){const r=sq>>3,f=sq&7,at=(a,b)=>a>=0&&a<8&&b>=0&&b<8?s.b[a*8+b]:'',own=ch=>by=='w'?ch.toUpperCase():ch.toLowerCase(),pr=by=='w'?r+1:r-1;
 for(const d of[-1,1])if(at(pr,f+d)==own('p'))return true;
 for(const[d,e]of N8)if(at(r+d,f+e)==own('n'))return true;
 for(const[d,e]of K8)if(at(r+d,f+e)==own('k'))return true;
 for(const[d,e]of K8){let a=r+d,b=f+e;while(a>=0&&a<8&&b>=0&&b<8){const ch=s.b[a*8+b];if(ch){const l=ch.toLowerCase();if(ch==own(l)&&(l=='q'||l==(d&&e?'b':'r')))return true;break}a+=d;b+=e}}return false}
const chk=(s,col)=>{const k=s.b.indexOf(col=='w'?'K':'k');return k>=0&&attacked(s,k,col=='w'?'b':'w')};
function pseudo(s){const out=[],w=s.t=='w',op=w?'b':'w',me=c=>c&&isW(c)==w,en=c=>c&&isW(c)!=w;
 for(let i=0;i<64;i++){const ch=s.b[i];if(!me(ch))continue;const l=ch.toLowerCase(),r=i>>3,f=i&7,add=(t,x={})=>out.push({f:i,t,p:ch,...x});
  if(l=='p'){const dr=w?-1:1,st=w?6:1,pr=w?0:7,nr=r+dr;if(nr<0||nr>7)continue;const one=nr*8+f;
   if(!s.b[one]){if(nr==pr)for(const q of'qrbn')add(one,{q});else{add(one);if(r==st&&!s.b[one+dr*8])add(one+dr*8)}}
   for(const df of[-1,1]){const ff=f+df;if(ff<0||ff>7)continue;const to=nr*8+ff;
    if(en(s.b[to])){if(nr==pr)for(const q of'qrbn')add(to,{q,x:1});else add(to,{x:1})}else if(s.e!='-'&&sqIdx(s.e)==to)add(to,{x:1,ep:1})}}
  else if(l=='n'||l=='k'){for(const[d,e]of l=='n'?N8:K8){const a=r+d,b=f+e;if(a<0||a>7||b<0||b>7)continue;const to=a*8+b,t=s.b[to];if(!me(t))add(to,t?{x:1}:{})}
   if(l=='k'&&i==(w?60:4)){const R=w?'R':'r';
    if(s.c.includes(w?'K':'k')&&!s.b[i+1]&&!s.b[i+2]&&s.b[i+3]==R&&!attacked(s,i,op)&&!attacked(s,i+1,op))add(i+2,{cs:'K'});
    if(s.c.includes(w?'Q':'q')&&!s.b[i-1]&&!s.b[i-2]&&!s.b[i-3]&&s.b[i-4]==R&&!attacked(s,i,op)&&!attacked(s,i-1,op))add(i-2,{cs:'Q'})}}
  else{const D=l=='b'?K8.filter(a=>a[0]&&a[1]):l=='r'?K8.filter(a=>!a[0]||!a[1]):K8;
   for(const[d,e]of D){let a=r+d,b=f+e;while(a>=0&&a<8&&b>=0&&b<8){const to=a*8+b,t=s.b[to];if(me(t))break;add(to,t?{x:1}:{});if(t)break;a+=d;b+=e}}}}
 return out}
function make(s,m){const b=s.b.slice(),w=s.t=='w';let c=s.c,e='-';b[m.t]=m.q?(w?m.q.toUpperCase():m.q):b[m.f];b[m.f]='';if(m.ep)b[m.t+(w?8:-8)]='';
 if(m.cs){if(m.cs=='K'){b[m.t-1]=b[m.t+1];b[m.t+1]=''}else{b[m.t+1]=b[m.t-2];b[m.t-2]=''}}
 const pw=m.p.toLowerCase()=='p';if(pw&&Math.abs(m.t-m.f)==16)e=sqName((m.f+m.t)/2);
 for(const q of[m.f,m.t]){if(q==60)c=c.replace(/[KQ]/g,'');if(q==4)c=c.replace(/[kq]/g,'');if(q==63)c=c.replace('K','');if(q==56)c=c.replace('Q','');if(q==7)c=c.replace('k','');if(q==0)c=c.replace('q','')}
 return{b,t:w?'b':'w',c,e,h:pw||m.x?0:s.h+1,n:s.n+(w?0:1)}}
const legal=s=>pseudo(s).filter(m=>!chk(make(s,m),s.t)),uci=m=>sqName(m.f)+sqName(m.t)+(m.q||'');
function san(s,m,L){L=L||legal(s);let x;const pc=m.p.toUpperCase();
 if(m.cs)x=m.cs=='K'?'O-O':'O-O-O';
 else if(pc=='P'){x=(m.x?FILES[m.f&7]+'x':'')+sqName(m.t)+(m.q?'='+m.q.toUpperCase():'')}
 else{x=pc;const o=L.filter(k=>k.p==m.p&&k.t==m.t&&k.f!=m.f);if(o.length){const sf=o.some(k=>(k.f&7)==(m.f&7)),sr=o.some(k=>(k.f>>3)==(m.f>>3));x+=!sf?FILES[m.f&7]:!sr?8-(m.f>>3):sqName(m.f)}x+=(m.x?'x':'')+sqName(m.t)}
 const n=make(s,m);if(chk(n,n.t))x+=legal(n).length?'+':'#';return x}
function parseSan(s,t){const L=legal(s),c=t.replace(/[+#!?]/g,'').replace(/0/g,'O').replace(/e\.p\./,'').replace('=','').trim(),sn=k=>san(s,k,L).replace(/[+#=]/g,'');
 const m=L.find(k=>sn(k)==c)||L.find(k=>uci(k)==c.toLowerCase());if(!m)throw Error('Illegal or unreadable move: '+t);return m}
function insuff(s){const p=[];s.b.forEach((c,i)=>{if(c&&c.toLowerCase()!='k')p.push([c.toLowerCase(),((i>>3)+(i&7))&1])});if(!p.length)return true;if(p.length==1&&'bn'.includes(p[0][0]))return true;return p.every(x=>x[0]=='b'&&x[1]==p[0][1])}
function status(s){const L=legal(s),ck=chk(s,s.t);if(!L.length)return ck?'checkmate':'stalemate';if(insuff(s))return'insufficient material';return ck?'check':'ongoing'}
const repKey=s=>{const f=toFen(s).split(' ');return f[0]+' '+f[1]+' '+f[2]+' '+(legal(s).some(m=>m.ep)?f[3]:'-')};
function parsePgn(txt){const re=/\[(\w+)\s+"((?:[^"\\]|\\.)*)"\s*\]|\{([^}]*)\}|;([^\n]*)|(\()|(\))|\$(\d+)|(\d+)\s*\.+|(1-0|0-1|1\/2-1\/2|\*)|([^\s(){}\[\];$]+)/g;
 const games=[];let g=null,cur,stack=[],started=false,m;const nw=()=>{g={tags:{},line:[],res:'',pre:''};cur=g.line;stack=[];started=false},fin=()=>{if(g&&(started||Object.keys(g.tags).length))games.push(g);g=null};
 while((m=re.exec(txt))){
  if(m[1]){if(g&&started)fin();if(!g)nw();g.tags[m[1]]=m[2].replace(/\\(["\\])/g,'$1')}
  else if(m[3]!==undefined||m[4]!==undefined){const c=(m[3]!==undefined?m[3]:m[4]).trim().replace(/\s+/g,' ');if(!g)nw();const last=cur[cur.length-1];if(last)last.c=(last.c?last.c+' ':'')+c;else if(!stack.length)g.pre=(g.pre?g.pre+' ':'')+c}
  else if(m[5]){if(!g)nw();const last=cur[cur.length-1];if(last){const v=[];last.vars.push(v);stack.push(cur);cur=v}}
  else if(m[6]){if(stack.length)cur=stack.pop()}
  else if(m[7]){if(g&&cur.length)cur[cur.length-1].g.push(+m[7])}
  else if(m[8]){}
  else if(m[9]){if(!g)nw();g.res=m[9];started=true;fin()}
  else if(m[10]){if(!g)nw();started=true;let t=m[10];const nags=[],am=/([!?]{1,2})$/.exec(t);if(am){t=t.slice(0,-am[1].length);nags.push({'!':1,'?':2,'!!':3,'??':4,'!?':5,'?!':6}[am[1]])}if(t)cur.push({san:t,c:'',g:nags,vars:[]})}}
 fin();return games}
function replay(g){let s;try{s=g.tags&&g.tags.FEN?parseFen(g.tags.FEN):parseFen(START)}catch(e){return{H:[parseFen(START)],M:[],S:[],N:[],err:{k:-1,san:'FEN tag: '+e.message}}}
 const H=[s],M=[],S=[],N=[];let err=null;for(let k=0;k<g.line.length;k++){const nd=g.line[k];try{const m=parseSan(s,nd.san);S.push(san(s,m));M.push(m);N.push(nd);s=make(s,m);H.push(s)}catch(e){err={k,san:nd.san};break}}return{H,M,S,N,err}}
function wLine(line,s,o){const out=[];let f=1;for(const nd of line){const m=parseSan(s,nd.san),sn=san(s,m),w=s.t=='w';out.push(w?s.n+'. '+sn:(f?s.n+'... ':'')+sn);f=0;
 if(o.g)(nd.g||[]).forEach(x=>out.push('$'+x));if(o.c&&nd.c){out.push('{'+nd.c.replace(/[{}]/g,'')+'}');f=1}if(o.v)for(const v of nd.vars){out.push('('+wLine(v,s,o)+')');f=1}s=make(s,m)}return out.join(' ')}
const ORD=['Event','Site','Date','Round','White','Black','Result'];
const tagsBlock=t=>[...ORD,...Object.keys(t).filter(x=>!ORD.includes(x))].filter(x=>x in t).map(x=>`[${x} "${String(t[x]).replace(/(["\\])/g,'\\$1')}"]`).join('\n');
function toPgn(g,o={}){const s=g.tags.FEN?parseFen(g.tags.FEN):parseFen(START),body=(wLine(g.line,s,o)+' '+(g.res||g.tags.Result||'*')).trim().replace(/(.{1,78})(\s+|$)/g,'$1\n').trim();return(Object.keys(g.tags).length?tagsBlock(g.tags)+'\n\n':'')+body+'\n'}
const TH={wood:['#f0d9b5','#b58863'],blue:['#dee3e6','#8ca2ad'],green:['#ffffdd','#86a666'],gray:['#e4e4e4','#9a9a9a']};
const PIMG={};let pDone=false;
const pLoad=Promise.all(Object.keys(PSVG).map(k=>new Promise(r=>{const im=new Image();im.onload=im.onerror=r;im.src='data:image/svg+xml;base64,'+PSVG[k];PIMG[k]=im}))).then(()=>{pDone=true;setTimeout(()=>window.__redraw&&window.__redraw())});
const loadPieces=()=>pLoad,pk=c=>(isW(c)?'w':'b')+c.toLowerCase(),pSrc=c=>'data:image/svg+xml;base64,'+PSVG[pk(c)];
const AC={green:'rgba(21,120,27,.75)',red:'rgba(136,32,32,.75)',blue:'rgba(0,48,136,.7)',yellow:'rgba(230,143,0,.85)'};
function drawBoard(cv,s,o={}){const S=cv.width,u=S/8,x=cv.getContext('2d'),th=TH[o.th]||TH.wood,fl=o.flip,P=q=>{const r=q>>3,f=q&7;return fl?[(7-f)*u,(7-r)*u]:[f*u,r*u]},C=q=>{const[a,b]=P(q);return[a+u/2,b+u/2]};
 x.clearRect(0,0,S,S);for(let i=0;i<64;i++){const[px,py]=P(i);x.fillStyle=th[((i>>3)+(i&7))%2];x.fillRect(px,py,u,u)}
 for(const q of o.hl||[]){const[px,py]=P(q);x.fillStyle='rgba(155,199,0,.41)';x.fillRect(px,py,u,u)}
 if(o.check!=null){const[cx,cy]=C(o.check),g=x.createRadialGradient(cx,cy,0,cx,cy,u*.71);g.addColorStop(0,'rgba(255,0,0,1)');g.addColorStop(.25,'rgba(231,0,0,1)');g.addColorStop(.89,'rgba(169,0,0,0)');x.fillStyle=g;x.fillRect(cx-u/2,cy-u/2,u,u)}
 if(o.sel!=null){const[px,py]=P(o.sel);x.fillStyle='rgba(20,85,30,.5)';x.fillRect(px,py,u,u)}
 if(o.over!=null&&(o.dots||[]).includes(o.over)){const[px,py]=P(o.over);x.fillStyle='rgba(20,85,30,.3)';x.fillRect(px,py,u,u)}
 if(o.co!==false){x.font='700 '+u*.17+'px Figtree,system-ui,sans-serif';x.textBaseline='top';for(let k=0;k<8;k++){x.fillStyle=th[(7+k)%2==0?1:0];x.textAlign='left';x.fillText(FILES[fl?7-k:k],k*u+u*.07,S-u*.22);x.fillStyle=th[(k+7)%2==0?1:0];x.textAlign='right';x.fillText(fl?k+1:8-k,S-u*.06,k*u+u*.05)}}
 for(const q of o.dots||[]){const[cx,cy]=C(q);x.fillStyle='rgba(20,85,30,.5)';x.beginPath();if(s.b[q]){x.rect(cx-u/2,cy-u/2,u,u);x.moveTo(cx+u*.56,cy);x.arc(cx,cy,u*.56,0,7);x.globalAlpha=.6;x.fill('evenodd');x.globalAlpha=1}else{x.arc(cx,cy,u*.16,0,7);x.fill()}}
 for(let i=0;i<64;i++){const c=s.b[i];if(!c||i==o.hide)continue;const[px,py]=P(i),im=PIMG[pk(c)];if(pDone&&im&&im.naturalWidth)x.drawImage(im,px,py,u,u)}
 for(const[q,col]of o.ci||[]){const[cx,cy]=C(q);x.strokeStyle=AC[col]||AC.green;x.lineWidth=u*.07;x.beginPath();x.arc(cx,cy,u*.45,0,7);x.stroke()}
 for(const[a,b,col]of o.ar||[]){const[x1,y1]=C(a),[x2,y2]=C(b),an=Math.atan2(y2-y1,x2-x1),hl=u*.38;x.strokeStyle=x.fillStyle=AC[col]||AC.green;x.lineWidth=u*.17;x.lineCap='round';x.beginPath();x.moveTo(x1,y1);x.lineTo(x2-Math.cos(an)*hl*.55,y2-Math.sin(an)*hl*.55);x.stroke();x.beginPath();x.moveTo(x2,y2);x.lineTo(x2-hl*Math.cos(an-.5),y2-hl*Math.sin(an-.5));x.lineTo(x2-hl*Math.cos(an+.5),y2-hl*Math.sin(an+.5));x.fill()}
 if(o.float){const im=PIMG[pk(o.float.c)],z=u*1.12;if(im&&im.naturalWidth)x.drawImage(im,o.float.x-z/2,o.float.y-z/2,z,z)}}
function sqAt(cv,ev,fl){const r=cv.getBoundingClientRect();let f=Math.floor((ev.clientX-r.left)/r.width*8),k=Math.floor((ev.clientY-r.top)/r.height*8);f=Math.max(0,Math.min(7,f));k=Math.max(0,Math.min(7,k));return fl?(7-k)*8+7-f:k*8+f}
async function exportCanvas(s,o){await loadPieces();const B=document.createElement('canvas');B.width=B.height=720;drawBoard(B,s,o);const th=o.title?70:0,fh=o.logo?76:0,C=document.createElement('canvas');C.width=720;C.height=720+th+fh;const x=C.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,720,C.height);
 if(th){x.fillStyle='#0b1f3a';x.font='700 30px Figtree,system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(o.title,360,th/2,680)}x.drawImage(B,0,th);
 if(fh){const im=new Image();im.src=$('#hl').src;await im.decode();const h=56;x.drawImage(im,12,720+th+10,im.width*h/im.height,h);x.fillStyle='#5a6b85';x.font='600 22px Figtree,system-ui,sans-serif';x.textAlign='right';x.textBaseline='middle';x.fillText(s.t=='w'?'White to move':'Black to move',708,720+th+fh/2)}return C}
function palette(el){const o={cur:'P'};el.innerHTML=[...'KQRBNPkqrbnp'].map(c=>`<button type="button" data-p="${c}" class="pc"><img src="${pSrc(c)}" alt="${c}"></button>`).join('')+'<button type="button" data-p="" class="pc alt">✕</button>';
 const mark=()=>el.querySelectorAll('button').forEach(b=>b.classList.toggle('sel',b.dataset.p==o.cur));el.onclick=e=>{const b=e.target.closest('button');if(b){o.cur=b.dataset.p;mark()}};mark();return o}
function mkEngine(cb){const SRC=[['https://cdn.jsdelivr.net/npm/stockfish@19.0.1/bin/stockfish-19-lite-single.js','https://cdn.jsdelivr.net/npm/stockfish@19.0.1/bin/stockfish-19-lite-single.wasm','Stockfish 19 (NNUE)'],['https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js',null,'Stockfish 10 (basic fallback)']];
 let w=null,k=0,ready=false,q=[],dead=false,out=0,stale=0;const E={label:'loading engine…',go(f,d){if(out>0)send('stop');stale=out;out++;send('position fen '+f);send('go depth '+d)},stop(){if(out>0)send('stop')},reset(){stale=out;if(out>0)send('stop')},cmd(c){send(c)},opt(n,v){send('setoption name '+n+' value '+v)}};
 function send(c){if(dead)return;if(ready)w.postMessage(c);else q.push(c)}
 function start(){if(k>=SRC.length){dead=true;cb('error');return}const[js,wasm,name]=SRC[k++];let to;const fail=()=>{clearTimeout(to);try{w&&w.terminate()}catch(e){}ready=false;start()};
  try{w=new Worker(URL.createObjectURL(new Blob(['importScripts("'+js+'")'],{type:'text/javascript'}))+(wasm?'#'+encodeURIComponent(wasm):''))}catch(e){return fail()}
  to=setTimeout(fail,25000);w.onerror=()=>{if(!ready)fail();else cb('error')};
  w.onmessage=e=>{const t=typeof e.data=='string'?e.data:'';if(!ready){if(t=='uciok'){ready=true;clearTimeout(to);E.label=name;if(k==1)w.postMessage('setoption name Hash value 64');q.forEach(c=>w.postMessage(c));q=[];w.postMessage('isready');cb('label')}return}
  if(t.startsWith('bestmove')){out=Math.max(0,out-1);if(stale>0){stale--;return}cb(t);return}if(stale>0&&t.startsWith('info'))return;cb(t)};w.postMessage('uci')}
 start();return E}
const MVAL={p:1,n:3,b:3,r:5,q:9},material=(s,side)=>{let t=0;for(const c of s.b)if(c&&c.toLowerCase()!='k'&&(isW(c)?'w':'b')==side)t+=MVAL[c.toLowerCase()];return t};
const playUci=(s,u)=>{const m=legal(s).find(q=>uci(q)==u);return m?make(s,m):null};
const playPv=(s,pv,n)=>{let x=s;for(const u of (pv||[]).slice(0,n)){const y=playUci(x,u);if(!y)break;x=y}return x};
const wpc=cp=>50+50*(2/(1+Math.exp(-0.00368208*cp))-1),wpOf=(e,side)=>side=='w'?wpc(e.v):100-wpc(e.v);
const phaseOf=(s,ply)=>{if(ply<=20)return'o';let t=0;for(const c of s.b)if(c&&!/[kp]/i.test(c))t+=MVAL[c.toLowerCase()];return t<=24?'e':'m'};
const MT={mate_allowed:['Allowed checkmate','This move let the opponent force checkmate.','King safety: before each move, check every check and capture your opponent has.'],
mate_missed:['Missed a forced mate','A forced checkmate was available but not played.','Always look at every check first. Practise mate-in-one and mate-in-two puzzles.'],
hung:['Hung material','This move left a piece or pawn unprotected, so the opponent could win material.','Before moving, ask: what does this move leave undefended? Check what the opponent just threatened.'],
tactic:['Missed a tactic','A tactic that wins material was available, but a different move was played.','Look at checks, captures and threats for both sides on every move. Train with daily puzzles.'],
slip:['Let a win slip','The position was clearly better before this move, and afterwards most of the advantage was gone.','When ahead, simplify and remove counterplay instead of trying for something flashy.'],
opening:['Opening slip','An early inaccuracy gave the opponent a more comfortable game.','Learn the ideas behind one simple opening and avoid moving the same piece twice without a reason.'],
endgame:['Endgame slip','A small inaccuracy in a simplified position, where precision matters most.','Study basic endings: king and pawn, rook endings, and activating the king.'],
position:['Positional mistake','No material was lost, but the position got worse (piece placement, structure or king safety).','Improve your worst-placed piece, compare plans, and count attackers and defenders.']};
function mistakeType(H,j,eb,ea,sd){const opp=sd=='w'?'b':'w',sg=sd=='w'?1:-1,Hb=H[j-1],Ha=H[j],md=s=>material(s,sd)-material(s,opp);
 if(ea.mate!=null&&ea.mate*sg<0&&!(eb.mate!=null&&eb.mate*sg<0))return'mate_allowed';
 if(eb.mate!=null&&eb.mate*sg>0&&!(ea.mate!=null&&ea.mate*sg>0))return'mate_missed';
 const b0=md(Hb);let after=Ha;if(ea.pv&&ea.pv.length)after=playPv(Ha,ea.pv,1);if(md(after)-b0<=-2)return'hung';
 if(eb.pv&&eb.pv.length){const g=md(playPv(Hb,eb.pv,3))-b0,pl=md(playPv(Ha,ea.pv||[],2))-b0;if(g>=2&&pl<g-1)return'tactic'}
 if(wpOf(eb,sd)>=70&&wpOf(ea,sd)<=55)return'slip';const ph=phaseOf(Hb,j);return ph=='o'?'opening':ph=='e'?'endgame':'position'}
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=m;t.className='show';clearTimeout(t._t);t._t=setTimeout(()=>t.className='',2800)}
function copyTxt(b,t){const ok=()=>{const o=b.textContent;b.textContent='Copied';setTimeout(()=>b.textContent=o,1300)},fb=()=>{try{const a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity=0;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();ok()}catch(e){toast('Copy is blocked here. Select the text and copy it manually.')}};
 try{navigator.clipboard.writeText(t).then(ok).catch(fb)}catch(e){fb()}}
function dl(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(data instanceof Blob?data:new Blob([data],{type}));a.download=name;a.click()}
function lzw(px){const CL=256,EOI=257,out=[];let bits=0,nb=0,d=new Map,next=258,sz=9;const put=(c,z)=>{bits|=c<<nb;nb+=z;while(nb>=8){out.push(bits&255);bits>>=8;nb-=8}};put(CL,sz);let cur=px[0];
 for(let i=1;i<px.length;i++){const k=(cur<<8)|px[i],v=d.get(k);if(v!==undefined)cur=v;else{put(cur,sz);d.set(k,next++);if(next>(1<<sz)&&sz<12)sz++;if(next>=4096){put(CL,sz);d=new Map;next=258;sz=9}cur=px[i]}}
 put(cur,sz);put(EOI,sz);if(nb>0)out.push(bits&255);return out}
function gifEncode(frames,W,H,delays){const o=[],w=(...a)=>{for(const x of a)o.push(x)},w16=v=>w(v&255,v>>8&255);w(71,73,70,56,57,97);w16(W);w16(H);w(0xF7,0,0);
 for(let i=0;i<256;i++){if(i<216)w(Math.floor(i/36)*51,(Math.floor(i/6)%6)*51,(i%6)*51);else w(0,0,0)}
 w(0x21,0xFF,11,78,69,84,83,67,65,80,69,50,46,48,3,1,0,0,0);
 frames.forEach((px,k)=>{const d=Math.round(delays[k]);w(0x21,0xF9,4,0,d&255,d>>8,0,0,0x2C);w16(0);w16(0);w16(W);w16(H);w(0,8);const z=lzw(px);for(let i=0;i<z.length;i+=255){const c=z.slice(i,i+255);w(c.length);for(const x of c)o.push(x)}w(0)});w(0x3B);return new Uint8Array(o)}

const numbered=R=>R.S.map((s,k)=>(R.H[k].t=='w'?R.H[k].n+'. ':!k?R.H[k].n+'... ':'')+s).join(' ');
function conv(){const t=$('#in').value.trim(),m=$('#msg');m.className='';m.textContent='';if(!t){$('#out').value='';return}
 try{const sf=$('#sf').value.trim()||START;parseFen(sf);let k=$('#fi').value;if(k=='auto')k=isFen(t)?'fen':/\[\w+\s+"/.test(t)?'pgn':/^\s*(\d+\.+\s*)?[a-h][1-8][a-h][1-8][qrbn]?(\s|$)/.test(t)?'uci':'san';
 if(k=='fen'){const s=parseFen(t),L=legal(s);const asc=[...Array(8)].map((_,r)=>(8-r)+'  '+s.b.slice(r*8,r*8+8).map(c=>c||'.').join(' ')).join('\n')+'\n   a b c d e f g h';
  $('#out').value='FEN\n'+toFen(s)+'\n\nBoard\n'+asc+'\n\nStatus: '+status(s)+'\n\nLegal moves ('+L.length+')\nSAN: '+L.map(x=>san(s,x,L)).join(' ')+'\nUCI: '+L.map(uci).join(' ');m.className='ok';m.textContent='✓ FEN read';return}
 let g;if(k=='uci'){let s=parseFen(sf);const line=[];for(const u of t.replace(/\d+\.+/g,' ').split(/\s+/).filter(Boolean)){const mv=legal(s).find(q=>uci(q)==u.toLowerCase());if(!mv)throw Error('Illegal UCI move "'+u+'" at ply '+(line.length+1));line.push({san:san(s,mv),c:'',g:[],vars:[]});s=make(s,mv)}g={tags:{},line,res:'*'}}
 else{g=parsePgn(t)[0];if(!g)throw Error('No moves found')}
 if(sf!=START&&!g.tags.FEN){g.tags.SetUp='1';g.tags.FEN=sf}
 const R=replay(g);const fin=R.H[R.H.length-1];const P=()=>{const h={...g,tags:{...g.tags}};if(!Object.keys(h.tags).length){h.tags={Event:'?',Site:'?',Date:'????.??.??',Round:'?',White:'?',Black:'?',Result:h.res||'*'}}h.line=R.err?g.line.slice(0,R.err.k):g.line;return toPgn(h,{c:1,v:1,g:1})};
 const sec={pgn:P,san:()=>numbered(R),uci:()=>R.M.map(uci).join(' '),fen:()=>toFen(fin),fens:()=>R.H.map((s,j)=>(j?j+'. '+R.S[j-1]:'start')+'\t'+toFen(s)).join('\n')};const o=$('#fo').value;
 $('#out').value=o=='all'?[['PGN','pgn'],['SAN','san'],['UCI','uci'],['FEN (final)','fen'],['FEN after every move','fens']].map(([a,b])=>a+'\n'+sec[b]()).join('\n\n'):sec[o]();
 if(R.err){m.className='no';m.textContent=`✗ Move ${R.err.k+1} ("${R.err.san}") is illegal. Output stops before it.`}else{m.className='ok';m.textContent=`✓ ${R.M.length} moves converted`}}catch(e){m.className='no';m.textContent='✗ '+e.message;$('#out').value=''}}
['in','sf','fi','fo'].forEach(x=>$('#'+x).oninput=conv);$('#cp').onclick=e=>copyTxt(e.target,$('#out').value);$('#dw').onclick=()=>dl('chess-notation.txt',$('#out').value,'text/plain');
$('#in').value='1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7';conv();