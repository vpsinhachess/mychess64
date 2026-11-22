/* --- kids-themed PDF scorecard: drawn on a canvas, wrapped in a one-page PDF --- */
function pdfFromJpeg(jpg,w,h){const enc=new TextEncoder(),parts=[],offs=[];let len=0;const push=u=>{parts.push(u);len+=u.length},s=t=>push(enc.encode(t)),pw=595.28,ph=841.89;
s('%PDF-1.4\n');const obj=(n,b)=>{offs[n]=len;s(`${n} 0 obj\n${b}\nendobj\n`)};
obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
obj(3,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`);
const c=`q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;obj(4,`<< /Length ${c.length} >>\nstream\n${c}\nendstream`);
offs[5]=len;s(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);push(jpg);s('\nendstream\nendobj\n');
obj(6,'<< /Title (MyChess64 Scorecard) /Producer (MyChess64) >>');const x=len;let t='xref\n0 7\n0000000000 65535 f \n';for(let i=1;i<=6;i++)t+=String(offs[i]).padStart(10,'0')+' 00000 n \n';s(t);s(`trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${x}\n%%EOF`);
const out=new Uint8Array(len);let p=0;for(const u of parts){out.set(u,p);p+=u.length}return out}
async function buildScorecard(){const W=1654,H=2339,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d'),FF="Fredoka,'Trebuchet MS','Segoe UI',system-ui,sans-serif",d=scoreData();
try{await Promise.all([document.fonts.load('700 60px Fredoka'),document.fonts.load('600 30px Fredoka')])}catch(e){}
const rr=(a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()};
const img=(svg,w,h)=>new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.replace('<svg ',`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `))});
const star=(cx,cy,r,f,o)=>{x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;x.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}x.closePath();x.fillStyle=f;x.fill();x.lineWidth=o||0;if(o){x.strokeStyle='#c98f00';x.lineJoin='round';x.stroke()}};
const disc=(cx,cy,r,f)=>{x.beginPath();x.arc(cx,cy,r,0,7);x.fillStyle=f;x.fill()};
const icon=(k,cx,cy,r)=>{if(k==='star')star(cx,cy,r,'#ffc83d',5);else if(k==='ok'){disc(cx,cy,r,'#2ecc71');x.strokeStyle='#fff';x.lineWidth=r*.2;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(cx-r*.45,cy);x.lineTo(cx-r*.1,cy+r*.38);x.lineTo(cx+r*.5,cy-r*.35);x.stroke()}
else if(k==='bad'){disc(cx,cy,r,'#ee5253');x.strokeStyle='#fff';x.lineWidth=r*.2;x.lineCap='round';x.beginPath();x.moveTo(cx-r*.4,cy-r*.4);x.lineTo(cx+r*.4,cy+r*.4);x.moveTo(cx+r*.4,cy-r*.4);x.lineTo(cx-r*.4,cy+r*.4);x.stroke()}
else if(k==='aim'){disc(cx,cy,r,'#ee5253');disc(cx,cy,r*.72,'#fff');disc(cx,cy,r*.46,'#ee5253');disc(cx,cy,r*.2,'#fff')}
else{x.beginPath();x.moveTo(cx,cy-r);x.bezierCurveTo(cx+r*.95,cy-r*.15,cx+r*.9,cy+r*.85,cx,cy+r);x.bezierCurveTo(cx-r*.9,cy+r*.85,cx-r*.95,cy-r*.05,cx-r*.3,cy-r*.55);x.bezierCurveTo(cx-r*.2,cy-r*.25,cx,cy-r*.4,cx,cy-r);x.fillStyle='#ff8a00';x.fill();x.beginPath();x.moveTo(cx,cy-r*.1);x.bezierCurveTo(cx+r*.45,cy+r*.2,cx+r*.4,cy+r*.7,cx,cy+r*.85);x.bezierCurveTo(cx-r*.4,cy+r*.7,cx-r*.35,cy+r*.2,cx,cy-r*.1);x.fillStyle='#ffd34d';x.fill()}};
let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#d6efff');g.addColorStop(.5,'#fff6dc');g.addColorStop(1,'#ffe4ee');x.fillStyle=g;x.fillRect(0,0,W,H);
const cols=36,sz=W/cols,rows=Math.round(H/sz),sy=H/rows;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)if(r<2||r>=rows-2||c<2||c>=cols-2){x.fillStyle=(r+c)%2?'#b58863':'#f0d9b5';x.fillRect(c*sz,r*sy,sz+1,sy+1)}
const m=sz*2+28,my=sy*2+28;rr(m,my,W-2*m,H-2*my,60);x.fillStyle='rgba(255,255,255,.92)';x.fill();x.lineWidth=8;x.strokeStyle='#ffd34d';x.stroke();
const logo=document.querySelector('.logo img'),li=logo?await new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src=logo.src}):null;
if(li){const lh=250,lw=lh*li.width/li.height;x.drawImage(li,(W-lw)/2,150,lw,lh)}
const mi=await img(MAS().replace('class="mas"',''),300,300);if(mi)x.drawImage(mi,150,130,290,290);
const mi2=await img(SVG('b','N'),300,300);if(mi2)x.drawImage(mi2,W-440,130,290,290);
x.textAlign='center';x.textBaseline='alphabetic';let tg=x.createLinearGradient(W/2-450,0,W/2+450,0);tg.addColorStop(0,'#ff5e62');tg.addColorStop(.5,'#ff9f43');tg.addColorStop(1,'#2e86de');
x.font=`700 100px ${FF}`;const tw0=x.measureText('My Chess Scorecard').width/2+75;x.lineWidth=16;x.strokeStyle='#fff';x.lineJoin='round';x.strokeText('My Chess Scorecard',W/2,520);x.fillStyle=tg;x.fillText('My Chess Scorecard',W/2,520);
star(W/2-tw0,485,44,'#ffc83d',5);star(W/2+tw0,485,44,'#ffc83d',5);
x.font=`600 46px ${FF}`;x.fillStyle='#7a6a58';x.fillText('Awarded to',W/2,620);
let fs=150;x.font=`700 ${fs}px ${FF}`;while(x.measureText(PRO.name).width>1150&&fs>50){fs-=4;x.font=`700 ${fs}px ${FF}`}
x.lineWidth=14;x.strokeStyle='#fff';x.strokeText(PRO.name,W/2,770);x.fillStyle='#2b2118';x.fillText(PRO.name,W/2,770);
x.strokeStyle='#ffd34d';x.lineWidth=12;x.lineCap='round';x.beginPath();const nw=Math.min(x.measureText(PRO.name).width,1150)/2+40;x.moveTo(W/2-nw,812);for(let i=0;i<=20;i++)x.lineTo(W/2-nw+i*nw/10,812+(i%2?-8:8));x.stroke();
const tiles=[['star',`${d.stars}/${MODS.length}`,'Stars','#fff3c4','#ffc83d'],['ok',d.c,'Correct','#d8f7e5','#2ecc71'],['bad',d.i,'Incorrect','#ffe0e0','#ee5253'],['aim',d.acc+'%','Accuracy','#ffe6ee','#ff6b81'],['fire',d.best,'Best streak','#ffe9cf','#ff8a00']];
const cx0=150,cw=W-300,tw=(cw-4*22)/5,ty=870;tiles.forEach((t,i)=>{const tx=cx0+i*(tw+22);rr(tx,ty,tw,240,36);x.fillStyle=t[3];x.fill();x.lineWidth=7;x.strokeStyle=t[4];x.stroke();icon(t[0],tx+tw/2,ty+62,40);x.fillStyle='#2b2118';x.font=`700 72px ${FF}`;x.fillText(String(t[1]),tx+tw/2,ty+170);x.fillStyle='#7a6a58';x.font=`600 30px ${FF}`;x.fillText(t[2],tx+tw/2,ty+216)});
x.font=`700 66px ${FF}`;x.fillStyle='#2e86de';x.fillText('My Chess Journey',W/2,1190);
const names=MODS.map(q=>q.n.split(' · ')[1]),colW=(cw-30)/2,rh=90,gy=1230,tints=TINT;
names.forEach((nm,i)=>{const col=i%2,row=i>>1,px=cx0+col*(colW+30),py=gy+row*rh,tt=PRO.tot[i],has=tt&&tt.a>0,acc=has?Math.round(tt.c/tt.a*100):0,dn=done.has(i);
rr(px,py,colW,rh-14,26);x.fillStyle='#fff';x.fill();x.lineWidth=5;x.strokeStyle=tints[i%tints.length];x.stroke();
disc(px+48,py+(rh-14)/2,27,tints[i%tints.length]);x.fillStyle='#fff';x.font=`700 32px ${FF}`;x.textAlign='center';x.fillText(String(i+1),px+48,py+(rh-14)/2+10);
x.textAlign='left';x.fillStyle='#2b2118';x.font=`700 30px ${FF}`;let tx=nm;while(x.measureText(tx).width>colW-190&&tx.length>4)tx=tx.slice(0,-2);if(tx!==nm)tx+='…';x.fillText(tx,px+98,py+33);
x.font=`600 24px ${FF}`;if(has){x.fillStyle='#17b062';x.fillText('✔ '+tt.c,px+98,py+62);x.fillStyle='#ee4d4d';x.fillText('✘ '+tt.i,px+190,py+62);x.fillStyle='#7a6a58';x.fillText(acc+'%',px+280,py+62);rr(px+350,py+49,colW-350-100,12,6);x.fillStyle='#eadfcb';x.fill();rr(px+350,py+49,(colW-450)*acc/100,12,6);x.fillStyle=acc>=70?'#2ecc71':acc>=40?'#ffc83d':'#ee5253';x.fill()}
else{x.fillStyle='#a39583';x.fillText(i===2?'Explore the board':'Not played yet',px+98,py+62)}
if(dn)star(px+colW-48,py+(rh-14)/2,26,'#ffc83d',4);else{star(px+colW-48,py+(rh-14)/2,26,'#f0e8d8',3)}});
x.textAlign='center';x.fillStyle='#ff6b81';x.font=`700 58px ${FF}`;x.fillText('Keep practising and have fun!',W/2,gy+rh*9-14+64);
x.fillStyle='#7a6a58';x.font=`600 34px ${FF}`;x.fillText('Learn. Play. Improve. Anytime, Anywhere.',W/2,gy+rh*9-14+120);
x.font=`600 30px ${FF}`;x.fillText(new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}),W/2,gy+rh*9-14+166);
const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',.93));return pdfFromJpeg(new Uint8Array(await blob.arrayBuffer()),W,H)}
async function savePDF(name,bytes){const blob=new Blob([bytes],{type:'application/pdf'});
try{if(window.claude&&window.claude.use){const dl=await window.claude.use('downloads');if(dl){try{await dl.save({filename:name,data:blob});return 'saved'}catch(e){if(e&&e.code==='declined')return 'declined';throw e}}}}catch(e){if(e&&e.code==='declined')return 'declined'}
const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return 'saved'}
