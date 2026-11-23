/* js/ui/details.js - Tournament details, pairing-rule form and sharing (copy link, WhatsApp). */
function fillDet(){const d=S.det||{},o=O();$('dn').value=S.name||'';$('dd1').value=d.d1||'';$('dd2').value=d.d2||'';$('dv').value=d.venue||'';$('do').value=d.org||'';$('da').value=d.arb||'';
 $('o_init').value=o.init;$('o_bye').value=String(o.bye);$('o_top').checked=!!o.topExc;$('o_fh').checked=!!o.fh;$('o_rx').checked=!!o.relax}
function saveDet(){S.name=cl($('dn').value);S.det=sdet({date:(S.det&&!S.det.d1?S.det.date:''),d1:$('dd1').value,d2:$('dd2').value,venue:$('dv').value,org:$('do').value,arb:$('da').value});render();pubSend('Tournament details updated live.')}
function saveOpt(){S.opt={init:$('o_init').value,bye:+$('o_bye').value,topExc:$('o_top').checked,fh:$('o_fh').checked,relax:$('o_rx').checked};save();toast('Pairing rules saved. They apply from the next round you generate.')}
function shareTxt(){return '♟ '+(S.name||'Chess Tournament')+'\nView Live Pairing & Result:\n'+((window.MYCHESS64&&MYCHESS64.SITE_URL)?MYCHESS64.SITE_URL.replace(/\/+$/,''):location.origin)+location.pathname+'?t='+TID+'\nTournament ID: '+TID}
function copyT(){const t=shareTxt();const f=()=>{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();let k=false;try{k=document.execCommand('copy')}catch(e){}a.remove();toast(k?'Tournament link copied. Paste it in WhatsApp.':'Copy failed. ID: '+TID)};
 if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('Tournament link copied. Paste it in WhatsApp.'),f);else f()}
function waT(){window.open('https://wa.me/?text='+encodeURIComponent(shareTxt()),'_blank')}
