/* Public page: organiser-posted events (Supabase) + player interest (no login) */
async function loadDb(){
 if(!sb)return;
 const {data,error}=await sb.from("tournaments").select("*").eq("status","approved").gte("end_date",todayStr());
 if(error)return;
 DB=(data||[]).map(t=>({source:"db",id:t.id,title:t.title,code:"MC64-"+t.id.slice(0,6).toUpperCase(),start:t.start_date,end:t.end_date,
  place:`${t.district}, ${t.state}`,state:t.state,district:t.district,format:t.format,brochure:t.brochure_url||"",fee:t.entry_fee,venue:t.venue||""}));
 rebuild();
}
function openInterest(id){
 const e=events.find(x=>x.id===id);if(!e)return;
 $("intBox").innerHTML=`<h2>I'm Interested</h2><p class="mm">${esc(e.title)}<br>${fmt(e.start)} – ${fmt(e.end)} · Entry fee ₹${esc(e.fee)}</p>
 <div class="fg">${fld("iN","Player name *","")}${fld("iP","Phone / WhatsApp *","","tel")}${fld("iE","Email","","email")}${fld("iF","FIDE ID (optional)","")}</div>
 <input id="iH" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
 <select id="iC">${["Open","Below 1800","Below 1600","Under 7","Under 9","Under 11","Under 13","Under 15","Under 17","Women","Senior"].map(x=>`<option>${x}</option>`).join("")}</select>
 <textarea id="iO" rows="2" maxlength="400" placeholder="Note to organiser (optional)"></textarea><p id="iM" class="mm er"></p>
 <button id="iS" onclick="sendInterest('${esc(id)}')">Send Interest</button> <button class="secondary" onclick="shut('intM')">Cancel</button>`;
 $("intM").classList.add("on");
}
async function sendInterest(id){
 const g=k=>$(k).value.trim(),n=g("iN"),p=g("iP"),m=$("iM");
 if(g("iH")){shut("intM");return}                       // honeypot: bots fill hidden fields
 if(!n||n.length>100)return m.textContent="Please enter your name.";
 if(!/^[0-9+\-\s]{7,15}$/.test(p))return m.textContent="Enter a valid phone number (digits only).";
 if(g("iE")&&!/^\S+@\S+\.\S+$/.test(g("iE")))return m.textContent="Enter a valid email or leave it blank.";
 if(!sb)return m.textContent="Supabase is not configured yet.";
 $("iS").disabled=true;
 const {error}=await sb.from("interests").insert({tournament_id:id,player_name:n,phone:p,email:g("iE")||null,fide_id:g("iF")||null,category:g("iC"),note:g("iO")||null});
 $("iS").disabled=false;
 if(error)return m.textContent=error.code==="23505"?"This phone number has already shown interest in this tournament.":"Could not send. Please try again.";
 shut("intM");toast("Interest sent — the organiser may contact you.");
}
