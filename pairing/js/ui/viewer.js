/* js/ui/viewer.js - Participant (live) page and preview. */
function prevw(){if(ORG)return;if(!S)return toast('Start a tournament first.');
 ORG=S;S=pubData();S.vo=1;nav(1);$('setup').hidden=true;$('app').hidden=true;$('vb').hidden=false;$('vb').textContent='← Organiser';vrender()}
function nav(p){$('nP').classList.toggle('on',!!p);$('nO').classList.toggle('on',!p)}
function vback(){if(!ORG){home();return}S=ORG;ORG=null;$('vw').hidden=true;$('vb').hidden=true;render()}
function vrender(){const P=S.pub,t=S.fmt==='team',nr=S.rounds.length;
 $('vw').hidden=false;$('vmsg').textContent='';hdr('vname','vdet');
 $('vs').textContent=S.ps.length+(t?' teams':' players')+' · '+nr+' of '+S.R+' rounds published'+(S.upd?' · updated '+new Date(S.upd).toLocaleTimeString():'');
 [1,2,3].forEach(i=>{$('vt'+i).className=i===VT?'on':'';$('vp'+i).hidden=i!==VT});
 const rl=p=>nm(p.id)+(p.rating?' <span class="mu">('+p.rating+')</span>':'');
 $('vp3').innerHTML='<div class="card sc"><table><tr><th>#</th><th>Name</th><th>Rating</th><th>Status</th></tr>'+S.ps.map((p,i)=>`<tr><td>${i+1}</td><td>${p.name}</td><td>${p.rating||''}</td><td>${p.wd?'Withdrawn ('+RN(p.wd)+')':'Active'}</td></tr>`).join('')+'</table></div>';
 $('vxr').innerHTML=S.rounds.map((_,i)=>`<option value="${i+1}" ${i===nr-1?'selected':''}>${RN(i+1)}</option>`).join('');
 if(!nr)$('vrl').innerHTML='<p class="mu">Pairings are not published yet.</p>';
 else{let o='';for(let r=nr-1;r>=0;r--){const pts=stats(S.rounds.slice(0,Math.min(r,P.res)));
  o+=`<details class="card" ${r===nr-1?'open':''}><summary><b>${RN(r+1)} - Pairing</b>${r<P.res?' <span class="tag">result published</span>':''}</summary><div class="sc"><table class="pt">${PH(t)}${pairRows(S.rounds[r],pts,g=>g.b===null?(g.u===undefined?'<i>Bye</i>':'<i>Absent</i>'):(r<P.res?'<b>'+(rt(g)||'–')+'</b>':'–'))}</table></div></details>`}
  $('vrl').innerHTML=o}
 if(!P.res)$('vp2').innerHTML='<p class="mu">Standings appear after the first round result is published.</p>';
 else{let o='';for(let n=P.res;n>=1;n--)o+=`<details class="card" ${n===P.res?'open':''}><summary><b>Standing of ${RN(n)}</b></summary><div class="sc">${stHTML(n)}</div></details>`;$('vp2').innerHTML=o}
 vfind()}
function viewerStart(id){if(unsub){unsub();unsub=null}$('gate').hidden=true;$('vb').hidden=false;$('vb').textContent='← Home';$('setup').hidden=true;$('app').hidden=true;$('vw').hidden=false;
 if(!dbh){$('vmsg').textContent='Backend not configured. Open config/config.js and set FIREBASE_URL (see README).';return}
 unsub=dbh.doc('t/'+id).onSnapshot(s=>{let d=null;try{d=s.exists?JSON.parse(s.data().j):null}catch(e){}
  if(!d){S=null;$('vmsg').textContent='Tournament not found, or nothing published yet. This page updates automatically.';$('vrl').innerHTML=$('vp2').innerHTML=$('vp3').innerHTML=$('vmy').innerHTML='';return}
  if(!Array.isArray(d.rounds)||!Array.isArray(d.ps)||!d.pub)return;d.ps.forEach(p=>p.name=cl(p.name));d.name=cl(d.name);d.det=sdet(d.det);const prev=S;S=d;S.vo=1;if(!prev||prev.pub.res!==d.pub.res)VS=0;vrender()},()=>{$('vmsg').textContent='Could not load the live data.'})}
function vfind(){const q=$('vf').value.trim().toLowerCase(),el=$('vmy');if(!q||!S){el.innerHTML='';return}
 const rows=[];S.rounds.forEach((rd,r)=>rd.forEach(g=>{if(nm(g.w).toLowerCase().includes(q)||(g.b!==null&&nm(g.b).toLowerCase().includes(q)))
  rows.push(`<tr><td>R${r+1}</td><td>${nm(g.w)}</td><td><b>${g.b===null||r<S.pub.res?(rt(g)||'\u2013'):'\u2013'}</b></td><td>${g.b===null?'\u2014':nm(g.b)}</td></tr>`)}));
 el.innerHTML=rows.length?'<table><tr><th>Rd</th><th>White</th><th>Result</th><th>Black</th></tr>'+rows.join('')+'</table>':'<p class="mu">No games found.</p>'}
