const STATES=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"];
/* Shared: helpers, Supabase auth (organiser/admin), dashboard, accounts, CSV/print */
const $=id=>document.getElementById(id);
const fmt=d=>new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

/* ===== Supabase config: paste your Project URL and anon (public) key ===== */

let sb=null,me=null,prof=null,dbEvents=[],myT=[],cur=null,PI=[],LG=[],amode="organiser",reg=false;
try{if(window.supabase&&/^https?:/.test(SB_URL))sb=supabase.createClient(SB_URL,SB_KEY)}catch(e){}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cents=v=>Math.round((parseFloat(v)||0)*100);
const inr=c=>"₹"+(c/100).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});
const safeUrl=u=>/^https?:\/\//i.test(u||"")?u:"";
const todayStr=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};const today=todayStr; /* local date, not UTC */
const shut=id=>{$(id).classList.remove("on");if(window.PAGE_MODE&&(id==="authM"||id==="dashM"))location.href="../index.html"};
function toast(m){const t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display="none",3500)}
const fld=(id,l,v,ty="text",x="")=>`<div><label class="mm">${l}</label><input id="${id}" type="${ty}" value="${esc(v)}" ${x}></div>`;

/* ---------- auth ---------- */
async function setUser(u){
 me=u||null;prof=null;
 if(u&&sb){const {data}=await sb.from("profiles").select("*").eq("id",u.id).single();prof=data}
 bar();
}
function bar(){
 $("authBar").innerHTML=prof&&["organiser","admin"].includes(prof.role)
  ?`<button class="secondary" onclick="openDash()">${prof.role==="admin"?"Admin":"My"} Dashboard</button><button onclick="logout()">Logout</button>`
  :`<button class="secondary" onclick="openAuth('organiser')">Organiser Login</button>`;
}
function openAuth(m){amode=m;reg=false;authRender();$("authM").classList.add("on")}
function authRender(){
 const ad=amode==="admin";
 $("authBox").innerHTML=`<h2>${ad?"Admin":"Organiser"} ${reg?"Registration":"Login"}</h2>${reg?fld("aN","Full name / Organisation","")+"":""}
 ${fld("aE","Email","","email")}${fld("aP","Password (min 6 characters)","","password")}<p id="aMsg" class="mm er"></p>
 <button onclick="doAuth()">${reg?"Create Organiser Account":"Login"}</button> <button class="secondary" onclick="shut('authM')">Cancel</button>
 ${ad?"":`<p class="mm">${reg?"Already registered?":"New organiser?"} <a href="#" class="gold" onclick="reg=!reg;authRender();return false">${reg?"Login":"Register here"}</a></p>`}`;
}
async function doAuth(){
 const m=$("aMsg"),email=$("aE").value.trim(),password=$("aP").value;
 if(!sb)return m.textContent="Supabase is not configured — add your URL and key in index.html.";
 if(!email||password.length<6)return m.textContent="Enter email and a password of at least 6 characters.";
 let r;
 if(reg){
  const name=$("aN").value.trim();if(!name)return m.textContent="Enter your name or organisation.";
  r=await sb.auth.signUp({email,password,options:{data:{full_name:name,role:"organiser"}}});
  if(r.error)return m.textContent=r.error.message;
  if(!r.data.session){m.className="mm";m.textContent="Account created. Confirm your email, then login.";return}
 }else{
  r=await sb.auth.signInWithPassword({email,password});
  if(r.error)return m.textContent=r.error.message;
 }
 await setUser(r.data.user);
 const ok=amode==="admin"?prof?.role==="admin":["organiser","admin"].includes(prof?.role);
 if(!ok){await sb.auth.signOut();return m.textContent=amode==="admin"?"This account is not an admin.":"This account is not an organiser."}
 $("authM").classList.remove("on");openDash();
}
async function logout(){await sb.auth.signOut();shut("dashM");toast("Logged out")}

/* ---------- dashboard: tournaments ---------- */
const ST={pending:"Pending approval",approved:"Live",rejected:"Rejected"};
async function openDash(){if(!prof||!["organiser","admin"].includes(prof.role))return;$("dashM").classList.add("on");await dashHome()}
async function dashHome(){
 let q=sb.from("tournaments").select("*,profiles(full_name,email)").order("start_date",{ascending:false});
 if(prof.role!=="admin")q=q.eq("organiser_id",me.id);
 const {data,error}=await q;if(error)return toast(error.message);
 myT=data||[];const adm=prof.role==="admin";
 $("dashBox").innerHTML=`<div class="row"><h2 style="margin:0;flex:1">${adm?"Admin":"Organiser"} Dashboard</h2><button onclick="tForm()">+ New Tournament</button><button class="secondary" onclick="shut('dashM')">✕ Close</button></div>
 <p class="mm">${esc(prof.full_name||me.email)} · ${myT.length} tournament(s)${adm?"":" · new events go live after admin approval"}</p>
 <div class="tw"><table class="tbl"><tr><th>Tournament</th><th>Starts</th><th>Location</th>${adm?"<th>Organiser</th>":""}<th>Status</th><th></th></tr>
 ${myT.map(t=>`<tr><td>${esc(t.title)}</td><td>${fmt(t.start_date)}</td><td>${esc(t.district)}, ${esc(t.state)}</td>${adm?`<td>${esc(t.profiles?.full_name||t.profiles?.email||"")}</td>`:""}<td><span class="pill">${ST[t.status]}</span></td>
 <td><button class="sm" onclick="mgr('${t.id}')">Manage</button> <button class="sm secondary" onclick="tForm('${t.id}')">Edit</button>
 ${adm&&t.status!=="approved"?`<button class="sm" onclick="setSt('${t.id}','approved')">Approve</button> `:""}${adm&&t.status!=="rejected"?`<button class="sm secondary" onclick="setSt('${t.id}','rejected')">Reject</button> `:""}
 <button class="sm secondary" onclick="delT('${t.id}')">Delete</button></td></tr>`).join("")||'<tr><td colspan="5">No tournaments yet — click “+ New Tournament”.</td></tr>'}</table></div>`;
}
async function setSt(id,s){const {error}=await sb.from("tournaments").update({status:s}).eq("id",id);if(error)return toast(error.message);await dashHome();window.loadDb&&loadDb()}
async function delT(id){if(!confirm("Delete this tournament with all its players and accounts? This cannot be undone."))return;
 const {error}=await sb.from("tournaments").delete().eq("id",id);if(error)return toast(error.message);await dashHome();window.loadDb&&loadDb()}
function tForm(id){
 const t=myT.find(x=>x.id===id)||{},v=k=>t[k]??"";
 $("dashBox").innerHTML=`<h2>${id?"Edit":"New"} Tournament</h2><div class="fg">
 ${fld("fT","Tournament name *",v("title"))}${fld("fS","Start date *",v("start_date"),"date")}${fld("fE","End date *",v("end_date"),"date")}
 <div><label class="mm">State *</label><select id="fSt"><option value="">Select state</option>${STATES.map(s=>`<option>${s}</option>`).join("")}</select></div>${fld("fD","District *",v("district"))}${fld("fV","Venue",v("venue"))}
 <div><label class="mm">Format</label><select id="fF"><option>Classical</option><option>Rapid</option><option>Blitz</option></select></div>
 ${fld("fFee","Entry fee (₹)",v("entry_fee"),"number",'min="0" step="0.01"')}${fld("fC","Contact phone",v("contact"))}${fld("fB","Brochure URL (https://…)",v("brochure_url"))}</div>
 <p id="fM" class="mm er"></p><button onclick="saveT('${id||""}')">Save</button> <button class="secondary" onclick="dashHome()">Cancel</button>`;
 $("fF").value=t.format||"Rapid";$("fSt").value=t.state||"";
}
async function saveT(id){
 const g=k=>$(k).value.trim();
 const r={title:g("fT"),start_date:g("fS"),end_date:g("fE"),state:g("fSt"),district:g("fD"),venue:g("fV"),format:g("fF"),
  entry_fee:cents(g("fFee"))/100,contact:g("fC"),brochure_url:g("fB")};
 const e=r.title.length<5?"Enter the tournament name (min 5 characters).":!r.start_date||!r.end_date?"Select start and end dates.":r.end_date<r.start_date?"End date cannot be before start date.":!r.state||!r.district?"State and District are required.":r.brochure_url&&!safeUrl(r.brochure_url)?"Brochure URL must start with http:// or https://":"";
 if(e)return $("fM").textContent=e;
 const {error}=await(id?sb.from("tournaments").update(r).eq("id",id):sb.from("tournaments").insert({...r,organiser_id:me.id}));
 if(error)return $("fM").textContent=error.message;
 toast(id?"Saved.":"Submitted"+(prof.role==="admin"?".":" for admin approval."));await dashHome();window.loadDb&&loadDb();
}

/* ---------- dashboard: one tournament (all money in integer paise) ---------- */
async function mgr(id){
 cur=myT.find(x=>x.id===id);
 const [a,b]=await Promise.all([sb.from("interests").select("*").eq("tournament_id",id).order("created_at"),sb.from("ledger").select("*").eq("tournament_id",id).order("entry_date")]);
 if(a.error||b.error)return toast((a.error||b.error).message);
 PI=a.data;LG=b.data;mgrView();
}
function calc(){
 const fee=cents(cur.entry_fee),R=PI.filter(i=>i.status==="registered");
 const c={n:PI.length,reg:R.length,contacted:PI.filter(i=>i.status==="contacted").length,expected:R.length*fee,
  collected:R.reduce((a,i)=>a+cents(i.fee_paid),0),oi:0,ex:0,stray:PI.filter(i=>i.status!=="registered"&&cents(i.fee_paid)>0).length};
 LG.forEach(l=>{if(l.kind==="income")c.oi+=cents(l.amount);else c.ex+=cents(l.amount)});
 c.pending=Math.max(c.expected-c.collected,0);c.inc=c.collected+c.oi;c.net=c.inc-c.ex;return c;
}
const grp=k=>{const m={};LG.filter(l=>l.kind===k).forEach(l=>m[l.head]=(m[l.head]||0)+cents(l.amount));return Object.entries(m).sort()};
const wa=p=>{let d=String(p).replace(/\D/g,"");if(d.length===10)d="91"+d;return d};
function mgrView(){const sc=$("dashM").scrollTop;mgrView0();$("dashM").scrollTop=sc}
function mgrView0(){
 const c=calc(),t=cur,k=(l,v,cl="")=>`<div><span>${l}</span><b class="${cl}">${v}</b></div>`;
 const opts=s=>["interested","contacted","registered","withdrawn"].map(x=>`<option value="${x}"${x===s?" selected":""}>${x[0].toUpperCase()+x.slice(1)}</option>`).join("");
 const prow=(r,l)=>r.map(([h,a])=>`<tr><td>${esc(h)}</td><td>${inr(a)}</td></tr>`).join("");
 $("dashBox").innerHTML=`<div class="row"><h2 style="margin:0;flex:1">${esc(t.title)}</h2><button class="secondary" onclick="dashHome()">← Back</button></div>
 <p class="mm">${fmt(t.start_date)} – ${fmt(t.end_date)} · ${esc(t.district)}, ${esc(t.state)} · Entry fee ${inr(cents(t.entry_fee))}</p>
 <div class="kp">${k("Interested (all)",c.n)}${k("Contacted",c.contacted)}${k("Registered",c.reg)}${k("Expected fee",inr(c.expected))}${k("Fee collected",inr(c.collected))}${k("Fee pending",inr(c.pending),c.pending?"neg":"pos")}</div>
 <h3>Players &amp; Participants</h3>
 <div class="row"><button class="sm" onclick="addP()">+ Add Player</button><button class="sm secondary" onclick="exportCSV(false)">CSV – all interested</button><button class="sm secondary" onclick="exportCSV(true)">CSV – registered</button><button class="sm secondary" onclick="printList()">Print participants list</button></div>
 ${c.stray?`<p class="mm er">${c.stray} non-registered player(s) have a fee recorded. It is not counted in “Fee collected” — refund or adjust it.</p>`:""}
 <div class="tw"><table class="tbl"><tr><th>#</th><th>Name</th><th>Contact</th><th>Email</th><th>FIDE ID</th><th>Category</th><th>Status</th><th>Fee paid ₹</th><th></th></tr>
 ${PI.map((i,x)=>`<tr><td>${x+1}</td><td>${esc(i.player_name)}${i.note?`<br><small class="mm">${esc(i.note)}</small>`:""}</td>
 <td><a class="gold" href="tel:${esc(i.phone)}">${esc(i.phone)}</a> · <a class="gold" target="_blank" rel="noopener" href="https://wa.me/${wa(i.phone)}">WhatsApp</a></td>
 <td>${esc(i.email)}</td><td>${esc(i.fide_id)}</td><td>${esc(i.category)}</td>
 <td><select onchange="updP('${i.id}',{status:this.value})">${opts(i.status)}</select></td>
 <td><input type="number" min="0" step="0.01" value="${i.fee_paid}" onchange="updP('${i.id}',{fee_paid:Math.max(0,cents(this.value)/100)})"></td>
 <td><button class="sm secondary" onclick="delP('${i.id}')">✕</button></td></tr>`).join("")||'<tr><td colspan="9">No players have shown interest yet.</td></tr>'}</table></div>
 <h3>Income &amp; Expense</h3>
 <div class="row"><select id="lK"><option value="income">Income</option><option value="expense">Expense</option></select><input id="lH" list="hd" placeholder="Head (Hall rent, Arbiter fee, Sponsorship…)"><input id="lA" type="number" min="0.01" step="0.01" placeholder="Amount ₹"><input id="lD" type="date" value="${today()}"><input id="lN" placeholder="Note"><button class="sm" onclick="addL()">Add</button></div>
 <datalist id="hd"><option>Sponsorship</option><option>Hall rent</option><option>Arbiter fee</option><option>Prize money</option><option>Trophies &amp; medals</option><option>Food &amp; refreshments</option><option>Printing &amp; publicity</option><option>Equipment</option></datalist>
 <div class="tw"><table class="tbl"><tr><th>Date</th><th>Type</th><th>Head</th><th>Amount</th><th>Note</th><th></th></tr>
 ${LG.map(l=>`<tr><td>${fmt(l.entry_date)}</td><td>${l.kind}</td><td>${esc(l.head)}</td><td class="${l.kind==="income"?"pos":"neg"}">${inr(cents(l.amount))}</td><td>${esc(l.note)}</td><td><button class="sm secondary" onclick="delL('${l.id}')">✕</button></td></tr>`).join("")||'<tr><td colspan="6">No entries yet.</td></tr>'}</table></div>
 <h3>Profit &amp; Loss Account</h3>
 <table class="tbl"><tr><th colspan="2">Income</th></tr><tr><td>Entry fees collected (${c.reg} registered)</td><td>${inr(c.collected)}</td></tr>${prow(grp("income"))}
 <tr><th>Total income</th><th>${inr(c.inc)}</th></tr><tr><th colspan="2">Expenses</th></tr>${prow(grp("expense"))}
 <tr><th>Total expenses</th><th>${inr(c.ex)}</th></tr><tr><th>${c.net>=0?"Net profit":"Net loss"}</th><th class="${c.net>=0?"pos":"neg"}">${inr(Math.abs(c.net))}</th></tr></table>`;
}
async function updP(id,patch){const {error}=await sb.from("interests").update(patch).eq("id",id);if(error)return toast(error.message);Object.assign(PI.find(x=>x.id===id),patch);mgrView()}
async function delP(id){if(!confirm("Remove this player?"))return;const {error}=await sb.from("interests").delete().eq("id",id);if(error)return toast(error.message);PI=PI.filter(x=>x.id!==id);mgrView()}
async function addP(){
 const n=(prompt("Player name")||"").trim(),p=(prompt("Phone")||"").trim();
 if(!n||!/^[0-9+\-\s]{7,15}$/.test(p))return toast("Enter a valid name and phone.");
 const {data,error}=await sb.from("interests").insert({tournament_id:cur.id,player_name:n,phone:p,category:"Open",status:"registered"}).select().single();
 if(error)return toast(error.message);PI.push(data);mgrView();
}
async function addL(){
 const h=$("lH").value.trim(),a=cents($("lA").value),d=$("lD").value;
 if(!h||a<=0||!d)return toast("Enter head, a positive amount and date.");
 const {data,error}=await sb.from("ledger").insert({tournament_id:cur.id,kind:$("lK").value,head:h,amount:a/100,entry_date:d,note:$("lN").value.trim()||null}).select().single();
 if(error)return toast(error.message);LG.push(data);LG.sort((x,y)=>x.entry_date<y.entry_date?-1:1);mgrView();
}
async function delL(id){if(!confirm("Delete this entry?"))return;const {error}=await sb.from("ledger").delete().eq("id",id);if(error)return toast(error.message);LG=LG.filter(x=>x.id!==id);mgrView()}

/* ---------- lists: CSV & print ---------- */
const q=s=>{s=String(s??"");if(/^[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
function exportCSV(onlyReg){
 const L=PI.filter(i=>!onlyReg||i.status==="registered").sort((a,b)=>a.player_name.localeCompare(b.player_name));
 if(!L.length)return toast("No players to export.");
 const rows=[["Sl","Name","Phone","Email","FIDE ID","Category","Status","Fee Paid"],...L.map((i,x)=>[x+1,i.player_name,i.phone,i.email,i.fide_id,i.category,i.status,(cents(i.fee_paid)/100).toFixed(2)])];
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+rows.map(r=>r.map(q).join(",")).join("\r\n")],{type:"text/csv"}));
 a.download=`${cur.title.replace(/[^\w]+/g,"_").slice(0,40)}_${onlyReg?"participants":"interested"}.csv`;a.click();
}
function printList(){
 const L=PI.filter(i=>i.status==="registered").sort((a,b)=>a.player_name.localeCompare(b.player_name));
 if(!L.length)return toast("No registered players yet.");
 const w=window.open("","_blank");if(!w)return toast("Allow pop-ups to print.");
 w.document.write(`<title>Participants</title><style>body{font:13px Arial;margin:24px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:6px;text-align:left}</style>
 <h2>${esc(cur.title)}</h2><p>${fmt(cur.start_date)} – ${fmt(cur.end_date)} · ${esc(cur.district)}, ${esc(cur.state)} · ${L.length} participants</p>
 <table><tr><th>Sl</th><th>Name</th><th>FIDE ID</th><th>Category</th><th>Phone</th><th>Fee paid</th><th>Signature</th></tr>
 ${L.map((i,x)=>`<tr><td>${x+1}</td><td>${esc(i.player_name)}</td><td>${esc(i.fide_id)}</td><td>${esc(i.category)}</td><td>${esc(i.phone)}</td><td>${inr(cents(i.fee_paid))}</td><td></td></tr>`).join("")}</table>`);
 w.document.close();w.print();
}

/* ---------- start ---------- */
document.querySelectorAll(".mod").forEach(m=>m.addEventListener("mousedown",e=>{if(e.target===m&&!window.PAGE_MODE)m.classList.remove("on")}));
(async()=>{
 bar();if(!sb){if(window.PAGE_MODE)openAuth(PAGE_MODE);return}
 const {data}=await sb.auth.getSession();await setUser(data.session?.user);
 sb.auth.onAuthStateChange((_e,s)=>{if((s?.user?.id||null)!==(me?.id||null))setUser(s?.user)});
 window.loadDb&&loadDb();
 if(window.PAGE_MODE){const ok=PAGE_MODE==="admin"?prof?.role==="admin":["organiser","admin"].includes(prof?.role);ok?openDash():openAuth(PAGE_MODE)}
})();

document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!window.PAGE_MODE)document.querySelectorAll(".mod.on").forEach(m=>m.classList.remove("on"))});
