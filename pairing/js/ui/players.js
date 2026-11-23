/* js/ui/players.js - Players, attendance, withdrawals and late entries. */
function rp(){const ok=S.fmt==='swiss'||S.fmt==='team';$('pm').hidden=!ok;$('wl').hidden=true;if(!ok)return;
 const nr=S.rounds.length+1;if(!$('wr').value||+$('wr').value<nr)$('wr').value=Math.min(nr,S.R);
 const out=p=>p.wd&&nr>=p.wd;
 $('pmb').innerHTML=S.ps.filter(p=>!out(p)).map(p=>{const ab=p.id in S.pend;
  const stt=ab?'<b style="color:#b3261e">\u2212 Absent</b>':'<b class="ok">+ Present</b>'+(p.wd?' <span class="mu">(leaves '+RN(p.wd)+')</span>':'');
  const act=`<button onclick="tg(${p.id})">${ab?'Mark +':'Mark \u2212'}</button>`+(ab?` <select onchange="S.pend[${p.id}]=+this.value;save()">${[0,.5,1].map(v=>`<option ${S.pend[p.id]===v?'selected':''}>${v}</option>`).join('')}</select> pt`:'');
  return `<tr><td>${p.name}</td><td>${p.rating||''}</td><td>${stt}</td><td>${act}</td><td><button onclick="wdr(${p.id},${p.wd?0:1})">${p.wd?'Cancel withdrawal':'Withdraw'}</button></td></tr>`}).join('');
 const w=S.ps.filter(out);$('wl').hidden=!w.length;
 $('wlb').innerHTML=w.map(p=>`<tr><td>${p.name}</td><td>${p.rating||''}</td><td>${RN(p.wd)}</td><td><button class="p" onclick="inc(${p.id},0)">From next round (${RN(nr)})</button> <button onclick="inc(${p.id},1)">From current round</button></td></tr>`).join('')}
function tg(id){if(id in S.pend)delete S.pend[id];else S.pend[id]=0;save();render()}
function wdr(id,on){const p=S.ps[id];if(!on){delete p.wd;save();render();return}
 const r=+$('wr').value,nr=S.rounds.length+1;
 if(!(r>=nr&&r<=S.R))return toast('Choose a round from '+nr+' to '+S.R+'. For the current round use "absent" in the result.');
 p.wd=r;delete S.pend[id];save();render();toast(p.name+' withdrawn from round '+r+'.')}
function addP(){const n=cl($('ln').value);
 if(!n)return toast('Enter a name.');
 if(S.ps.some(p=>p.name.toLowerCase()===n.toLowerCase()))return toast('That name already exists.');
 if(S.rounds.length>=S.R)return toast('The last round is already paired.');
 S.ps.push({id:S.ps.length,name:n,rating:parseInt($('lr').value)||0,init:+$('lp').value});
 $('ln').value='';$('lr').value='';save();render();toast(n+' added, paired from round '+(S.rounds.length+1)+'.')}
function inc(id,cur){const p=S.ps[id],nr=S.rounds.length+1;
 if(!cur){delete p.wd;save();render();toast(p.name+' will be paired from '+RN(nr)+'.');return}
 const rd=S.rounds[S.rounds.length-1],bye=rd&&rd.find(g=>g.b===null&&g.u===undefined);
 if(!bye)return toast('No free opponent in the current round (no bye player). Use "From next round".');
 const o=bye.w,hi=S.ps[o].rating>=p.rating;rd[rd.indexOf(bye)]={w:hi?o:id,b:hi?id:o,s:null};delete p.wd;delete S.pend[id];save();render();toast(p.name+' added to '+RN(S.rounds.length)+' against '+nm(o)+'.')}
