/* js/ui/render.js - Organiser screen rendering and table builders. */
function render(){
 $('setup').hidden=!!S;$('app').hidden=!S;if(!S)return;
 const names={swiss:'Swiss',rr:'Round Robin',league:'League',ko:'Knockout',team:'Team Swiss'};
 const v=Math.min(S.view,S.rounds.length-1),rd=S.rounds[v],t=S.fmt==='team',ko=S.fmt==='ko';
 $('ttl').textContent=(S.name?S.name+' · ':'')+names[S.fmt];$('tid').textContent='Tournament ID: '+TID+'  (share with participants)';hdr('oname','odet');if(FD!==TID){fillDet();FD=TID}$('orp').hidden=!(S.fmt==='swiss'||S.fmt==='team');
 PRE=stats(S.rounds.slice(0,v));$('xr').innerHTML=S.rounds.map((_,i)=>`<option value="${i+1}" ${i===v?'selected':''}>${RN(i+1)}</option>`).join('');
 $('ud').hidden=S.rounds.length<2||S.fmt==='rr'||S.fmt==='league';
 $('tb').value=S.tb||0;rp();pst();nav(0);
 $('sub').textContent=S.ps.length+(t?' teams':' players')+' · round '+(v+1)+' of '+S.R+' · results '+rd.filter(g=>g.b===null||g.s!==null).length+'/'+rd.length;
 $('tabs').innerHTML=S.rounds.map((_,i)=>`<button class="${i===v?'on':''}" onclick="S.view=${i};render()">${ko&&i===S.R-1?'Final':RN(i+1)+' - Pairing'+(i<S.pub.pair?' ●':'')}</button>`).join('');
 const opts=g=>opts0(g)+`<option value="f1" ${g.f&&g.s===1?'selected':''}>+ / − Black absent</option><option value="f0" ${g.f&&g.s===0?'selected':''}>− / + White absent</option>`;const opts0=g=>{
  if(t){let o='<option value="">–</option>';for(let x=0;x<=S.boards;x+=.5)o+=`<option value="${x}" ${g.s===x?'selected':''}>${x} – ${S.boards-x}</option>`;return o}
  const a=[['1','1 – 0'],['0.5','½ – ½'],['0','0 – 1']].filter(x=>!(ko&&x[0]==='0.5'));
  return '<option value="">–</option>'+a.map(x=>`<option value="${x[0]}" ${g.s===+x[0]?'selected':''}>${x[1]}</option>`).join('')};
 $('pairs').innerHTML='<table class="pt">'+PH(t)+pairRows(rd,PRE,(g,i)=>g.b===null?(g.u===undefined?'<i>Bye (full point)</i>':'<i>Absent (−) · '+g.u+' pt</i>'):`<select onchange="setRes(${v},${i},this.value)">${opts(g)}</select>`)+'</table>'+
  (ko?'<p class="mu">Knockout: a draw is not allowed — record the winner of the tiebreak as 1–0 or 0–1.</p>':'');
 const auto=S.fmt==='rr'||S.fmt==='league';
 $('nx').hidden=auto||S.rounds.length>=S.R;
 {let o='',first=true;for(let i=S.rounds.length-1;i>=0;i--){if(!S.rounds[i].some(g=>g.s!==null))continue;
  o+=`<details class="card" ${first?'open':''}><summary><b>Standing of ${RN(i+1)}</b>${i<S.pub.res?' <span class="tag">live</span>':''}</summary><div class="sc">${stHTML(i+1)}</div></details>`;first=false}
  $('st').innerHTML=o||'<p class="mu">Standings appear here as soon as results are entered.</p>'}
 const done=S.rounds.length>=S.R&&rd===S.rounds[S.R-1]&&rd.every(g=>g.b===null||g.s!==null);
 $('ch').textContent=done?(ko?'Champion: '+nm(rd[0].b===null||rd[0].s===1?rd[0].w:rd[0].b):'Tournament complete — winner: '+stats(S.rounds).sort(cmp)[0].p.name):'';
 $('note').textContent={swiss:'Dutch-style Swiss: no repeat pairings, colour preferences (max 2 same colour in a row, colour difference ≤ 2), bye to the lowest-ranked player without a bye. Choose the tie-break order above the standings.',
  rr:'Berger tables; colours alternate, odd fields get a rotating bye.',league:'Double round robin: 3 pts win, 1 draw; second half reverses colours.',
  ko:'Standard seeding (1 v N); byes go to the top seeds.',team:'Match points 2/1/0, then game points. Colours alternate by board; team bye = 2 MP.'}[S.fmt];
}
const PH=t=>'<tr><th>Bd</th><th>White</th><th>Rtg</th><th>'+(t?'MP':'Pts')+'</th><th>Result</th><th>Black</th><th>Rtg</th><th>'+(t?'MP':'Pts')+'</th></tr>';
function pairRows(rd,pts,res){return rd.map((g,i)=>{const w=S.ps[g.w],b=g.b===null?null:S.ps[g.b];
 return `<tr><td>${i+1}</td><td><b>${w.name}</b></td><td>${w.rating||''}</td><td>${pts[g.w]?pts[g.w].pts:0}</td><td>${res(g,i)}</td>`+(b?`<td><b>${b.name}</b></td><td>${b.rating||''}</td><td>${pts[g.b]?pts[g.b].pts:0}</td>`:'<td colspan="3" class="mu">—</td>')+'</tr>'}).join('')}
function stHTML(n){const t=S.fmt==='team',st=stats(S.rounds.slice(0,n)).sort(cmp);
 return '<table class="stt"><tr><th>#</th><th>Name</th><th>Rtg</th><th>'+(t?'MP':'Pts')+'</th>'+(t?'<th>GP</th>':'')+'<th>Buch-1</th><th>Buch</th><th>SB</th><th>Wins</th></tr>'+st.map((x,i)=>`<tr><td>${i+1}</td><td>${x.p.name}${x.p.wd?' <span class="mu">(wd '+RN(x.p.wd)+')</span>':''}</td><td>${x.p.rating||''}</td><td><b>${x.pts}</b></td>${t?`<td>${x.gp}</td>`:''}<td>${x.cut1}</td><td>${x.buch}</td><td>${+x.sb.toFixed(2)}</td><td>${x.w}</td></tr>`).join('')+'</table>'}
const pl=id=>{const p=S.ps[id];return p.name+(p.rating?' <span class="mu">('+p.rating+')</span>':'')+' · <b>'+(PRE[id]?PRE[id].pts:0)+'</b>'};
function hdr(a,b){const d=S.det||{};$(a).textContent=S.name||'Chess Tournament';$(b).innerHTML=[['Date',d.date],['Venue',d.venue],['Organiser',d.org],['Arbiter',d.arb]].filter(x=>x[1]).map(x=>`<div><b>${x[0]}:</b> ${x[1]}</div>`).join('')}
