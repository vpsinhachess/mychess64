/* js/services/auth.js - Create tournament, organiser login, participant entry, password hashing. */
async function hash(p,s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+':'+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function h2(p,s){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(p),'PBKDF2',false,['deriveBits']);const b=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(s),iterations:150000,hash:'SHA-256'},k,256);return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const hashV=(p,s,v)=>v===2?h2(p,s):hash(p,s);
async function mkT(){const e=$('e1'),pw=$('pw').value;
 if(pw.length<4){e.textContent='Choose a password of at least 4 characters.';return false}
 if(!dbh){e.textContent='Backend not configured. Open config/config.js and set FIREBASE_URL (see README).';return false}
 try{let id,k=0;do{id='CT-'+rid(6);k++}while((await dbh.doc('a/'+id).get()).exists&&k<10);
  const salt=rid(12);await dbh.doc('a/'+id).set({salt,h:await h2(pw,salt),v:2});
  TID=id;await dbh.doc('t/'+id).set({j:JSON.stringify(pubData())});S.psig=sig();
  try{localStorage.setItem('lastTid',id)}catch(x){}
  document.body.classList.add('os');toast('Tournament created. ID: '+id);return true}
 catch(x){e.textContent='Could not create the tournament: '+((x&&x.message)||'error');return false}}
async function login(){const e=$('le'),id=$('li').value.trim().toUpperCase(),pw=$('lw').value;e.textContent='';
 if(!id||!pw){e.textContent='Enter the tournament ID and password.';return}
 if(Date.now()<lk){e.textContent='Too many attempts. Wait '+Math.ceil((lk-Date.now())/1000)+'s.';return}
 if(!dbh){e.textContent='Backend not configured. Open config/config.js and set FIREBASE_URL (see README).';return}
 try{const a=await dbh.doc('a/'+id).get();
  if(!a.exists||!await authOK(id,await hashV(pw,a.data().salt,a.data().v))){await new Promise(r=>setTimeout(r,700));if(++lf>=5){lk=Date.now()+30000;lf=0}e.textContent='Wrong tournament ID or password.';return}lf=0;
  const s=await dbh.doc('s/'+id).get();let R=null,L=null;
  try{if(s.exists)R=JSON.parse(s.data().j)}catch(x){}
  try{const b=localStorage.getItem('chessBak:'+id);if(b)L=JSON.parse(b)}catch(x){}
  const okS=d=>d&&Array.isArray(d.rounds)&&Array.isArray(d.ps);if(!okS(R))R=null;if(!okS(L))L=null;
  if(!R&&!L)throw{message:'no saved data found for this tournament'};
  const useL=!!L&&(!R||(L.rev||0)>(R.rev||0));S=useL?L:R;
  S.pend=S.pend||{};S.pub=S.pub||{pair:0,res:0};S.ps.forEach(p=>p.name=cl(p.name));S.name=cl(S.name);S.det=sdet(S.det);S.opt=S.opt||{};TID=id;dirty=useL;FD=null;
  if(useL)save(true);watch();restored=useL;
  try{localStorage.setItem('lastTid',id)}catch(x){}
  document.body.classList.add('os');$('gate').hidden=true;$('lw').value='';render();toast(restored?'Recovered the newer copy saved on this device.':'Logged in. Tournament data loaded.')}
 catch(x){e.textContent='Login failed: '+((x&&x.message)||'error')}}
function enterP(){const id=$('pi').value.trim().toUpperCase();$('pe').textContent='';
 if(!id){$('pe').textContent='Enter the tournament ID.';return}
 if(!dbh){$('pe').textContent='Backend not configured. Open config/config.js and set FIREBASE_URL (see README).';return}
 viewerStart(id)}
