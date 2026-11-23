
const $=id=>document.getElementById(id);
let player=null, history=[];

function showStatus(msg, error=false){const s=$('status');s.textContent=msg;s.style.display='block';s.classList.toggle('err',error)}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

async function loadPlayer(){
  const id=$('fideId').value.trim();
  if(!/^\d+$/.test(id)){showStatus('Please enter a valid numeric FIDE ID.',true);return}
  showStatus('Loading player and rating history…');
  $('content').classList.add('hidden');$('welcome').classList.remove('hidden');
  try{
    const [pRes,hRes]=await Promise.all([
      fetch('https://lichess.org/api/fide/player/'+encodeURIComponent(id),{headers:{Accept:'application/json'}}),
      fetch('https://lichess.org/api/fide/player/'+encodeURIComponent(id)+'/ratings',{headers:{Accept:'application/json'}})
    ]);
    if(!pRes.ok||!hRes.ok) throw new Error('Player not found or the FIDE service is temporarily unavailable.');
    player=await pRes.json();history=normalizeHistory(await hRes.json());
    renderPlayer(id);renderAll();
    $('content').classList.remove('hidden');$('welcome').classList.add('hidden');
    showStatus('Player loaded successfully.');
  }catch(e){
    showStatus(e.message+' You can also open the official FIDE profile directly.',true);
  }
}

function val(o,...keys){for(const k of keys){if(o&&o[k]!=null&&o[k]!==''&&o[k]!=='null')return o[k]}return '—'}
function renderPlayer(id){
  const std=val(player,'rating','standard','standard_elo'), rapid=val(player,'rapid','rapid_elo'), blitz=val(player,'blitz','blitz_elo');
  const name=val(player,'name'), fed=val(player,'federation'), title=val(player,'title');
  $('profileCard').innerHTML=`
    <div class="profile"><div><div class="playername">${esc(name)}</div><div class="meta">FIDE ID ${esc(id)} · ${esc(fed)} · ${esc(val(player,'year'))}</div>
    <div class="badges">${title!=='—'?'<span class="badge">'+esc(title)+'</span>':''}<span class="badge">${esc(val(player,'gender'))}</span></div></div>
    </div>
    <div class="ratings">
      <div class="rating"><span>Standard</span><b>${esc(std)}</b></div>
      <div class="rating"><span>Rapid</span><b>${esc(rapid)}</b></div>
      <div class="rating"><span>Blitz</span><b>${esc(blitz)}</b></div>
    </div>
    <div class="actions"><a class="btn" href="https://ratings.fide.com/profile/${encodeURIComponent(id)}" target="_blank" rel="noopener">Official FIDE Profile ↗</a></div>`;
  $('fideLink').href='https://ratings.fide.com/profile/'+encodeURIComponent(id);
  $('crLink').href='https://chess-results.com/partieSuche.aspx?art=3';
  $('lichessLink').href='https://lichess.org/fide/'+encodeURIComponent(id);
}

function decodePoint(point){
  const n=Number(point);
  if(!Number.isFinite(n)) return null;
  const elo=n%10000;
  const dateNum=Math.floor(n/10000);
  const year=Math.floor(dateNum/100);
  const month=dateNum%100;
  if(!year || !month || !elo) return null;
  return {
    date:`${year}-${String(month).padStart(2,'0')}`,
    n:year*100+month,
    rating:elo
  };
}
function normalizeHistory(data){
  const out=[];
  for(const type of ['standard','rapid','blitz']){
    for(const point of (Array.isArray(data?.[type])?data[type]:[])){
      const d=decodePoint(point);
      if(d) out.push({...d,type});
    }
  }
  return out;
}
function filtered(){
  const type=$('ratingType').value;
  let valid=history.filter(x=>x.type===type);
  const months=$('period').value;
  valid.sort((a,b)=>a.n-b.n);
  if(months!=='all'&&months!=='custom') valid=valid.slice(-Number(months));
  if(months==='custom'){
    const f=$('fromDate').value.replaceAll('-','').slice(0,6), t=$('toDate').value.replaceAll('-','').slice(0,6);
    if(f) valid=valid.filter(x=>String(x.n)>=f);
    if(t) valid=valid.filter(x=>String(x.n)<=t);
  }
  return valid;
}
function renderAll(){renderChart();renderTable()}
function renderTable(){
  const type=$('ratingType').value,a=filtered();let prev=null;
  const rows=[...a].reverse().map(x=>{const r=x.rating;const ch=prev==null?'—':(r-prev>0?'+':'')+(r-prev);prev=r;return `<tr><td>${esc(x.date)}</td><td>${r||'—'}</td><td>—</td><td>${ch}</td></tr>`}).join('');
  $('historyBody').innerHTML=rows||'<tr><td colspan="4">No rating records in this period.</td></tr>';
  const vals=a.map(x=>x.rating).filter(Number.isFinite);
  if(vals.length){$('change').textContent=(vals.at(-1)-vals[0]>=0?'+':'')+(vals.at(-1)-vals[0]);$('highest').textContent=Math.max(...vals);$('lowest').textContent=Math.min(...vals);$('games').textContent='—'}
  else{$('change').textContent=$('highest').textContent=$('lowest').textContent=$('games').textContent='—'}
}
function renderChart(){
  const canvas=$('chart'),box=canvas.parentElement, dpr=devicePixelRatio||1,w=box.clientWidth,h=box.clientHeight;
  canvas.width=w*dpr;canvas.height=h*dpr;const c=canvas.getContext('2d');c.scale(dpr,dpr);c.clearRect(0,0,w,h);
  const type=$('ratingType').value,a=filtered();const vals=a.map(x=>x.rating).filter(Number.isFinite);
  if(vals.length<1){c.fillStyle='#5a6b85';c.font='14px system-ui';c.fillText('No data for this selection.',20,30);return}
  const pad={l:48,r:15,t:20,b:38},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b,min=Math.floor(Math.min(...vals)/25)*25,max=Math.ceil(Math.max(...vals)/25)*25||min+100;
  const range=Math.max(50,max-min), y=v=>pad.t+(max-v)/range*ch,x=i=>pad.l+(i/(Math.max(1,a.length-1)))*cw;
  c.strokeStyle='#dbe4f3';c.lineWidth=1;c.font='11px system-ui';c.fillStyle='#5a6b85';
  for(let i=0;i<=5;i++){const v=min+range*i/5,yy=y(v);c.beginPath();c.moveTo(pad.l,yy);c.lineTo(w-pad.r,yy);c.stroke();c.fillText(Math.round(v),8,yy+4)}
  c.strokeStyle='#0b6fe6';c.lineWidth=3;c.beginPath();
  a.forEach((p,i)=>{const yy=y(p.rating);i?c.lineTo(x(i),yy):c.moveTo(x(i),yy)});c.stroke();
  c.fillStyle='#f9a825';a.forEach((p,i)=>{if(i===0||i===a.length-1||a.length<24){c.beginPath();c.arc(x(i),y(p.rating),3.5,0,Math.PI*2);c.fill()}});
  c.fillStyle='#5a6b85';c.textAlign='center';const step=Math.max(1,Math.ceil(a.length/6));a.forEach((p,i)=>{if(i%step===0||i===a.length-1)c.fillText(p.date,x(i),h-12)});c.textAlign='start';
}
$('searchBtn').addEventListener('click',loadPlayer);$('fideId').addEventListener('keydown',e=>{if(e.key==='Enter')loadPlayer()});
$('ratingType').addEventListener('change',renderAll);$('period').addEventListener('change',()=>{const custom=$('period').value==='custom';$('fromDate').classList.toggle('hidden',!custom);$('toDate').classList.toggle('hidden',!custom);renderAll()});$('fromDate').addEventListener('change',renderAll);$('toDate').addEventListener('change',renderAll);addEventListener('resize',()=>player&&renderChart());
