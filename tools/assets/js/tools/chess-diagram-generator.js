const CUR="chess-diagram-generator";
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
async function exportCanvas(s,o,N=720){await loadPieces();const k=N/720,B=document.createElement('canvas');B.width=B.height=N;drawBoard(B,s,o);
 const th=o.title?70*k:0,fh=o.logo?76*k:0,C=document.createElement('canvas');C.width=N;C.height=N+th+fh;const x=C.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,N,C.height);
 if(th){x.fillStyle='#0b1f3a';x.font='700 '+30*k+'px Figtree,system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(o.title,N/2,th/2,N-40*k)}x.drawImage(B,0,th);
 if(fh){const im=new Image();im.src=$('#hl').src;await im.decode();const h=56*k;x.drawImage(im,12*k,N+th+10*k,im.width*h/im.height,h);x.fillStyle='#5a6b85';x.font='600 '+22*k+'px Figtree,system-ui,sans-serif';x.textAlign='right';x.textBaseline='middle';x.fillText(s.t=='w'?'White to move':'Black to move',N-12*k,N+th+fh/2)}return C}
function exportSvg(s,o,N=720){const k=N/720,u=N/8,th=o.title?70*k:0,fh=o.logo?44*k:0,fl=o.flip,T=TH[o.th]||TH.wood,pos=q=>{const r=q>>3,f=q&7;return fl?[(7-f)*u,(7-r)*u+th]:[f*u,r*u+th]},cen=q=>{const[a,b]=pos(q);return[a+u/2,b+u/2]};let g='';
 for(let i=0;i<64;i++){const[x,y]=pos(i);g+=`<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="${T[((i>>3)+(i&7))%2]}"/>`}
 for(const q of o.hl||[]){const[x,y]=pos(q);g+=`<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="rgba(155,199,0,.41)"/>`}
 if(o.co!==false)for(let i=0;i<8;i++){g+=`<text x="${i*u+u*.07}" y="${th+N-u*.07}" font-size="${u*.17}" font-weight="700" fill="${T[(7+i)%2==0?1:0]}">${FILES[fl?7-i:i]}</text><text x="${N-u*.06}" y="${th+i*u+u*.2}" text-anchor="end" font-size="${u*.17}" font-weight="700" fill="${T[(i+7)%2==0?1:0]}">${fl?i+1:8-i}</text>`}
 s.b.forEach((c,i)=>{if(c){const[x,y]=pos(i);g+=`<image href="${pSrc(c)}" x="${x}" y="${y}" width="${u}" height="${u}"/>`}});
 for(const[q,col]of o.ci||[]){const[cx,cy]=cen(q);g+=`<circle cx="${cx}" cy="${cy}" r="${u*.45}" fill="none" stroke="${AC[col]||AC.green}" stroke-width="${u*.07}"/>`}
 for(const[a,b,col]of o.ar||[]){const[x1,y1]=cen(a),[x2,y2]=cen(b),an=Math.atan2(y2-y1,x2-x1),hl=u*.38,c=AC[col]||AC.green;g+=`<line x1="${x1}" y1="${y1}" x2="${x2-Math.cos(an)*hl*.55}" y2="${y2-Math.sin(an)*hl*.55}" stroke="${c}" stroke-width="${u*.17}" stroke-linecap="round"/><polygon points="${x2},${y2} ${x2-Math.cos(an-.5)*hl},${y2-Math.sin(an-.5)*hl} ${x2-Math.cos(an+.5)*hl},${y2-Math.sin(an+.5)*hl}" fill="${c}"/>`}
 const ff='font-family="Figtree,Arial,sans-serif"';
 if(o.title)g+=`<text x="${N/2}" y="${th/2+10*k}" text-anchor="middle" font-size="${30*k}" font-weight="700" fill="#0b1f3a" ${ff}>${esc(o.title)}</text>`;
 if(fh)g+=`<text x="${12*k}" y="${th+N+fh/2+7*k}" font-size="${22*k}" font-weight="700" fill="#0b6fe6" ${ff}>MyChess64.com</text><text x="${N-12*k}" y="${th+N+fh/2+7*k}" text-anchor="end" font-size="${22*k}" font-weight="600" fill="#5a6b85" ${ff}>${s.t=='w'?'White':'Black'} to move</text>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N+th+fh}" width="${N}" height="${N+th+fh}"><rect width="100%" height="100%" fill="#fff"/>${g}</svg>`}
function palette(el){const o={cur:'MOVE'},nm={K:'White king',Q:'White queen',R:'White rook',B:'White bishop',N:'White knight',P:'White pawn',k:'Black king',q:'Black queen',r:'Black rook',b:'Black bishop',n:'Black knight',p:'Black pawn'},
 ic=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`,
 tb=(v,l,p)=>`<button type="button" data-p="${v}" class="pc alt" title="${l}" aria-label="${l}">${ic(p)}</button>`;
 el.innerHTML=tb('MOVE','Move pieces (drag)','<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>')+
 [...'KQRBNPkqrbnp'].map(c=>`<button type="button" data-p="${c}" class="pc" title="${nm[c]}" aria-label="${nm[c]}"><img src="${pSrc(c)}" alt=""></button>`).join('')+
 tb('','Erase square','<path d="M6 6l12 12M18 6L6 18"/>')+tb('ARROW','Draw arrows (tap a square for a circle)','<path d="M5 19L19 5M10 5h9v9"/>');
 const mark=()=>{el.querySelectorAll('button').forEach(b=>{const on=b.dataset.p==o.cur;b.classList.toggle('sel',on);b.setAttribute('aria-pressed',on)});cv.style.touchAction=o.cur=='MOVE'||o.cur=='ARROW'?'none':'manipulation';cv.style.cursor=o.cur=='MOVE'?'grab':'crosshair'};
 el.onclick=e=>{const b=e.target.closest('button');if(b){o.cur=b.dataset.p;mark()}};mark();return o}
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=m;t.className='show';clearTimeout(t._t);t._t=setTimeout(()=>t.className='',2800)}
function copyTxt(b,t){const ok=()=>{const o=b.textContent;b.textContent='Copied';setTimeout(()=>b.textContent=o,1300)},fb=()=>{try{const a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity=0;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();ok()}catch(e){toast('Copy is blocked here. Select the text and copy it manually.')}};
 try{navigator.clipboard.writeText(t).then(ok).catch(fb)}catch(e){fb()}}
function dl(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(data instanceof Blob?data:new Blob([data],{type}));a.download=name;a.click()}
const KEY='mc64-diagram';let s=parseFen(START),flip=false,A=[],C=[],hist=[],fut=[],cur='',drag=null,ann=null;
const cv=$('#cv'),P=palette($('#pal')),L=t=>t.split(/[\s,]+/),
 sqs=t=>L(t).filter(x=>/^[a-h][1-8]$/.test(x)).map(sqIdx),
 arr=t=>L(t).filter(x=>/^[a-h][1-8][a-h][1-8]$/.test(x)).map(x=>[sqIdx(x.slice(0,2)),sqIdx(x.slice(2)),$('#ac').value]),
 arTxt=()=>A.map(x=>sqName(x[0])+sqName(x[1])).join(' '),
 opts=()=>({th:$('#th').value,flip,co:$('#co').checked,hl:sqs($('#hs').value),ar:A,ci:C,title:$('#ti').value,logo:true}),
 draw=x=>{const o={...opts(),...x};drawBoard(cv,s,o);$('#cap').textContent=o.title},
 snap=()=>JSON.stringify({b:s.b,t:s.t,c:s.c,e:s.e,h:s.h,n:s.n,A,C}),
 btns=()=>{$('#un').disabled=!hist.length;$('#re').disabled=!fut.length};
function check(){const n=c=>s.b.filter(x=>x==c).length,m=[],f=$('#fst');
 if(n('K')!=1)m.push('White needs exactly one king');if(n('k')!=1)m.push('Black needs exactly one king');
 if(s.b.some((c,i)=>(c=='P'||c=='p')&&(i<8||i>55)))m.push('pawns cannot stand on the first or last rank');
 if(n('P')>8||n('p')>8)m.push('a side cannot have more than 8 pawns');
 f.className='fst '+(m.length?'warn':'ok');f.textContent=m.length?'Check: '+m.join('; ')+'. You can still export it.':'Position looks valid.'}
function commit(){const j=snap();if(j!==cur){if(cur)hist.push(cur);if(hist.length>100)hist.shift();cur=j;fut=[]}btns()}
function restore(j){const o=JSON.parse(j);s={b:o.b,t:o.t,c:o.c,e:o.e,h:o.h,n:o.n};A=o.A;C=o.C;$('#tm').value=s.t;$('#fen').value=toFen(s);$('#ar').value=arTxt();check();draw();btns()}
function sync(){cleanCast(s);s.e='-';$('#fen').value=toFen(s);check();draw();commit()}
const pt=e=>{const r=cv.getBoundingClientRect(),k=cv.width/r.width;return{x:(e.clientX-r.left)*k,y:(e.clientY-r.top)*k,in:e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom}};
cv.onpointerdown=e=>{const q=sqAt(cv,e,flip),t=P.cur;
 if(e.button==2||t=='ARROW'){ann={f:q,t:q};cv.setPointerCapture(e.pointerId);return}
 if(e.button)return;
 if(t=='MOVE'){if(s.b[q]){drag={f:q,c:s.b[q]};cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';const p=pt(e);draw({hide:q,float:{c:drag.c,x:p.x,y:p.y}})}}
 else{s.b[q]=t;sync()}};
cv.onpointermove=e=>{if(drag){const p=pt(e);draw({hide:drag.f,float:{c:drag.c,x:p.x,y:p.y}})}else if(ann){ann.t=sqAt(cv,e,flip);draw({ar:ann.t==ann.f?A:[...A,[ann.f,ann.t,$('#ac').value]]})}};
cv.onpointerup=e=>{if(P.cur=='MOVE')cv.style.cursor='grab';
 if(drag){const q=sqAt(cv,e,flip),d=drag;drag=null;if(!pt(e).in)s.b[d.f]='';else if(q!=d.f){s.b[q]=d.c;s.b[d.f]=''}sync()}
 else if(ann){const a=ann,col=$('#ac').value;ann=null;
  if(a.f==a.t){const i=C.findIndex(x=>x[0]==a.f);i<0?C.push([a.f,col]):C.splice(i,1)}
  else{const i=A.findIndex(x=>x[0]==a.f&&x[1]==a.t);i<0?A.push([a.f,a.t,col]):A.splice(i,1)}
  $('#ar').value=arTxt();commit();draw()}};
cv.onpointercancel=()=>{drag=ann=null;draw()};cv.oncontextmenu=e=>e.preventDefault();
$('#fen').oninput=e=>{try{let v=e.target.value.trim();if(/^\S+$/.test(v))v+=' w - - 0 1';s=parseFen(v);$('#tm').value=s.t;e.target.style.borderColor='';check();draw();commit()}catch(x){e.target.style.borderColor='#c0392b';const f=$('#fst');f.className='fst err';f.textContent=x.message+'.'}};
$('#st').onclick=()=>{s=parseFen(START);A=[];C=[];$('#tm').value='w';$('#ar').value='';sync()};
$('#cl').onclick=()=>{s.b=Array(64).fill('');s.c='';sync()};
$('#fl').onclick=()=>{flip=!flip;draw()};
$('#tm').onchange=e=>{s.t=e.target.value;sync()};
$('#cm').onclick=()=>{A=[];C=[];$('#hs').value=$('#ar').value='';commit();draw()};
$('#un').onclick=()=>{if(hist.length){fut.push(cur);cur=hist.pop();restore(cur)}};
$('#re').onclick=()=>{if(fut.length){hist.push(cur);cur=fut.pop();restore(cur)}};
$('#cf').onclick=e=>copyTxt(e.target,toFen(s));
$('#ar').oninput=e=>{A=arr(e.target.value);commit();draw()};
['th','ti','hs','co'].forEach(x=>$('#'+x).oninput=()=>draw());
document.addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey)||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;const k=e.key.toLowerCase();if(k=='z'){e.preventDefault();$(e.shiftKey?'#re':'#un').click()}else if(k=='y'){e.preventDefault();$('#re').click()}});
$('#png').onclick=async()=>{const o=opts(),N=+$('#sz').value,f=$('#ft').value;if(f=='svg'){await loadPieces();return dl('chess-diagram.svg',exportSvg(s,o,N),'image/svg+xml')}const c=await exportCanvas(s,o,N);c.toBlob(b=>dl('chess-diagram.'+f,b),f=='jpg'?'image/jpeg':'image/png',.95)};
$('#cpi').onclick=async e=>{const b=e.target;try{const c=await exportCanvas(s,opts(),+$('#sz').value);c.toBlob(async x=>{try{await navigator.clipboard.write([new ClipboardItem({'image/png':x})]);const o=b.textContent;b.textContent='Copied';setTimeout(()=>b.textContent=o,1300)}catch(z){toast('Your browser blocked image copy. Use Download instead.')}})}catch(x){toast('Could not create the image. Use Download instead.')}};
$('#lk').onclick=e=>{const p=new URLSearchParams({fen:toFen(s),th:$('#th').value});if(flip)p.set('flip',1);if($('#ti').value)p.set('t',$('#ti').value);copyTxt(e.target,location.origin+location.pathname+'#'+p)};
$('#pr').onclick=()=>print();
const PK=['th','co','sz','ft','ac'],box=el=>el.type=='checkbox';
try{const p=JSON.parse(localStorage.getItem(KEY)||'{}');PK.forEach(k=>{if(k in p){const el=$('#'+k);if(box(el))el.checked=p[k];else el.value=p[k]}})}catch(e){}
PK.forEach(k=>$('#'+k).addEventListener('change',()=>{try{localStorage.setItem(KEY,JSON.stringify(Object.fromEntries(PK.map(k=>{const el=$('#'+k);return[k,box(el)?el.checked:el.value]}))))}catch(e){}}));
const hp=HP();try{if(hp.get('fen'))s=parseFen(hp.get('fen'))}catch(e){}
if(TH[hp.get('th')])$('#th').value=hp.get('th');if(hp.get('flip'))flip=true;if(hp.get('t'))$('#ti').value=hp.get('t');
$('#tm').value=s.t;$('#fen').value=toFen(s);check();draw();commit();window.__redraw=()=>draw();