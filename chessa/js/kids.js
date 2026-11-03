CHESSA.reg("kids","Kid Mode: chess-only guard, safety filters, kind tone, stars & streaks, parent PIN area");
(function(){
const K=window.KID,$=id=>document.getElementById(id);
const bot=(h,m,c)=>{document.body.classList.add("chat");return window.botUI(h,m,c)};
const E=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const AGES=["5–7","8–11","12+"];

/* ---------- styles ---------- */
const st=E("style");st.textContent="body.kid .bubble{font-size:16.5px}body.kid .chip,body.kid #sg button,body.kid .meta .rl{font-size:14.5px;padding:10px 15px}body.kid #simp{display:none}#stars{flex:none;border:1px solid #ffb02e66;background:#ffb02e18;color:#ffdca0;border-radius:99px;padding:6px 10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap}#stars:hover{background:#ffb02e30}.toast{position:fixed;left:50%;top:max(16px,env(safe-area-inset-top));transform:translateX(-50%);background:linear-gradient(135deg,#ffd166,#ff9f1c);color:#2a1700;font-weight:700;padding:10px 18px;border-radius:99px;box-shadow:0 10px 30px #0008;z-index:40;animation:toast 2.6s ease both;pointer-events:none}@keyframes toast{0%{opacity:0;transform:translate(-50%,-20px)}12%,80%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,-10px)}}#par{margin-top:14px;padding-top:12px;border-top:1px solid #ffffff1a;font-size:13px}#par .ph{display:flex;align-items:center;justify-content:space-between;gap:8px}#par button{padding:8px 12px;border-radius:12px;border:1px solid #ffb02e55;background:#ffb02e14;color:#ffdca0;font-size:13px;cursor:pointer;font-family:inherit}#par label{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid #ffffff12}#par select{background:#ffffff14;color:#fff;border:1px solid var(--line);border-radius:10px;padding:6px}#par .row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}@media (max-width:380px){#stars{padding:5px 8px;font-size:11.5px}}";
document.head.append(st);

/* ---------- progress: stars, streak, badges (stored only on this device) ---------- */
const BADGES=[[3,"Pawn Hero ♟"],[10,"Knight Explorer ♞"],[25,"Bishop Thinker ♝"],[50,"Rook Champion ♜"],[100,"Queen of Chess ♛"]];
const load=()=>{try{return Object.assign({stars:0,streak:0,last:"",badges:[]},JSON.parse(localStorage.ckp||"{}"))}catch(e){return{stars:0,streak:0,last:"",badges:[]}}};
let P=load();const save=()=>{try{localStorage.ckp=JSON.stringify(P)}catch(e){}};
const day=()=>new Date().toISOString().slice(0,10);
const pill=E("button","","");pill.id="stars";pill.title="My stars";pill.setAttribute("aria-label","My stars and streak");
$("vc").before(pill);
function paint(){pill.style.display=K.on()?"":"none";pill.textContent="⭐ "+P.stars+(P.streak>1?" · 🔥"+P.streak:"")}
function toast(t){const d=E("div","toast",t);d.setAttribute("role","status");document.body.append(d);setTimeout(()=>d.remove(),2700)}
function win(kind){if(!K.on())return;
 P.stars++;const t=day();
 if(P.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);P.streak=P.last===y?P.streak+1:1;P.last=t}
 const nb=BADGES.find(b=>P.stars==b[0]&&!P.badges.includes(b[1]));
 if(nb){P.badges.push(nb[1]);setTimeout(()=>bot("🏅 <b>New badge: "+nb[1]+"</b>\nYou have collected "+P.stars+" stars. Keep going, champion!",["🏅 Badge"],["Daily puzzle","Quiz me"]),1800)}
 save();paint();toast("⭐ +1 star! "+(kind=="quiz"?"Great answer!":"Great puzzle!"))}
function progress(){const nx=BADGES.find(b=>b[0]>P.stars);
 return"⭐ <b>"+P.stars+" stars</b> · 🔥 "+(P.streak||0)+" day streak\n"+(P.badges.length?"🏅 Badges: "+P.badges.join(", ")+"\n":"")+(nx?"Next badge: <b>"+nx[1]+"</b> at "+nx[0]+" stars.":"You have every badge — amazing!")}
pill.onclick=()=>{if(window.ask)ask("my stars")};

/* ---------- safety: what kids type ---------- */
const BAD=/\b(fuck\w*|shit\w*|bitch\w*|bastard|asshole|dick|pussy|porn\w*|sex\w*|nude\w*|naked|slut|whore|cunt|rape\w*|chutiya|madarchod|bhenchod|gandu|harami|randi)\b/i;
const PII=/(?:\+?\d[\d\s().-]{8,}\d)|[\w.+-]+@[\w-]+\.[\w.]+|\bmy (?:real )?(?:name|address|phone|number|school|surname|mobile|email|class|age) (?:is|are)\b|\bi (?:live|stay) (?:in|at|near)\b|\bi go to\b.*\bschool\b|\bmy (?:mom|mum|dad|mother|father)(?:'s)? (?:name|number|phone)\b/i;
const SAD=/\b(kill (?:my|him|her)self|want to die|wanna die|suicid\w*|hurt (?:my|him|her)self|hate my life|nobody loves me|bull(?:y|ied|ying)|abus(?:e|ed|es|ing)|hits me|beats me|touched me|scared of (?:my|him|her)|run away)\b/i;
const FACTS=["A chessboard has 64 squares — that is where the “64” in MyChess64 comes from! ♟","The word “checkmate” comes from the Persian “shah mat”, which means “the king is helpless”.","There are more possible chess games than atoms in the universe. You will never run out of new games! 🌌","The queen used to be a weak piece. About 500 years ago she became the strongest one!","The knight is the only piece that can jump over other pieces. 🐎","The fastest possible checkmate takes just 2 moves — it is called the fool's mate.","In 1997 a computer called Deep Blue beat the world champion Garry Kasparov in a match. 🤖","Chess started in India about 1,500 years ago, in a game called chaturanga. 🇮🇳"];
const OFF=["Hmm, I only know chess! ♟ Want to try a puzzle, a quiz or a fun fact instead?","That's outside my chess world! 🌍 I'm great at pieces, rules, puzzles and famous players. Shall we try one?","I'm a chess helper, so I can't talk about that. 😊 But ask me how a piece moves, or try a puzzle!"];
const SOFT=["Great question! ","Good thinking! ","Nice one! ","Ooh, I like this one! ","Let's see… "];
const JARGON=[[/\bblunders?\b/gi,m=>/s$/i.test(m)?"big mistakes":"big mistake"],[/\binaccurac(?:y|ies)\b/gi,"small slip"],[/\bprophylaxis\b/gi,"stopping their plan early"],[/\bzugzwang\b/gi,"a spot where every move hurts"]];
const KCHIPS=["Daily puzzle","Quiz me","Fun fact","Famous players"];

function offTopic(){return bot(pick(OFF),["♟ Chess only"],KCHIPS)}
function lost(titles){return bot("Hmm, I'm not sure about that one yet! 🤔 Try asking about a piece, a rule, a trick like a fork, or a famous player.",null,titles.slice(0,2).concat(["How pieces move","Fun fact"]))}
function kidHelp(){return bot("<b>Things we can do together</b> ♟\n🐎 Ask how a piece moves (try “knight”)\n📜 Ask about a rule (try “castling” or “checkmate”)\n🧩 Solve a puzzle — say “daily puzzle”\n🎯 Take a quiz — say “quiz me”\n🌟 Hear a fun fact — say “fun fact”\n🏆 See your stars — say “my stars”",["❓ Help"],["How pieces move","Daily puzzle","Quiz me","Fun fact"])}

/* ---------- router (runs before every other module) ---------- */
const prev=ask;
ask=async function(v){const n=String(v).trim();
 if(!K.on())return prev(v);
 const hide=()=>add("user","🙈 (message hidden)");
 if(SAD.test(n)){hide();return bot("I'm really sorry you feel this way. 💛 You are important. Please tell a grown-up you trust — a parent, a teacher or a family member — right now.\nIn India, you can call <b>Childline 1098</b> (free, any time) or <b>112</b> in an emergency.",["💛 You're not alone"],["Fun fact"])}
 if(BAD.test(n)){hide();return bot("Let's keep our chess chat kind and friendly. 💛 Want a puzzle or a fun fact?",null,KCHIPS)}
 if(PII.test(n)&&!/(?:[rnbqkpRNBQKP1-8]+\/){3}/.test(n)&&!/\[(Event|White|Black)\s+"/.test(n)){hide();return bot("Please don't share names, addresses, phone numbers or school names with me — keep them private! 🔒 I don't need them to teach you chess. What shall we learn?",["🔒 Stay safe"],KCHIPS)}
 if(/^(top players|best players|leaderboards?|top 5)$/i.test(n))return prev("famous chess players");
 if(/^(?:player|profile|lichess|chess\.?com|rating of)\s+\S+$/i.test(n)){add("user",v);return bot("Looking up other people's accounts is for grown-ups. 🙈 But I can tell you about famous players!",null,["Famous players","Daily puzzle"])}
 if(/^(?:another |one more |tell me a |random )?(?:fun )?facts?(?: please)?$/i.test(n)&&/fact/i.test(n)){add("user",v);return bot("<b>Fun fact!</b> 🌟\n"+pick(FACTS),["🌟 Fun fact"],["Another fun fact","Quiz me","Daily puzzle"])}
 if(/^(?:my )?(?:stars|score|progress|badges|streak)$/i.test(n)){add("user",v);return bot(progress(),["🏆 My progress"],["Daily puzzle","Quiz me"])}
 if(/^(help|\?|menu|commands?|what can (you|chessa) do\??)$/i.test(n)){add("user",v);return kidHelp()}
 return prev(v)};

/* ---------- tone: wraps every bot message ---------- */
const _b=window.botUI;
window.botUI=function(h,m,c){
 if(!K.on()||window.isWait(h))return _b(h,m,c);
 m=(m||[]).filter(x=>!/<a\s/i.test(x));                       /* no links out of the chat */
 if(typeof h=="string"){
  JARGON.forEach(([re,to])=>{h=h.replace(re,to)});
  h=h.replace(/^Hi, I'm <b>CHESSA<\/b> ♛[^\n]*/,"Hi friend! I'm <b>CHESSA</b> ♛ your chess buddy. Ask me how a piece moves, try a puzzle, or say “fun fact”!");
  if(m.some(x=>/📚/.test(x))&&!/^(Great|Good|Nice|Ooh|Let)/.test(h)&&Math.random()<.6)h=pick(SOFT)+h}
 return _b(h,m,c)};

/* ---------- start screen + header ---------- */
function hero(){const s=$("sug");if(!s)return;const L=K.on()?[["How do pieces move?"],["Daily puzzle"],["Quiz me"],["Fun fact"],["Famous players"],["Help"]]:null;
 if(!L)return;s.innerHTML="";L.forEach(([t])=>{const b=E("button","chip");b.textContent=t;b.onclick=()=>{$("q").value=t;$("send").click()};s.append(b)})}
function apply(){document.body.classList.toggle("kid",K.on());paint();if(K.on())hero();
 document.querySelectorAll("#modes button").forEach(b=>{b.hidden=K.on()&&K.band()==0&&/^(Analyze|Wiki)$/.test(b.textContent)})}
apply();

/* ---------- parent area (inside ⚙ Settings) ---------- */
async function hash(s){try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("chessa:"+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){let h=5381;for(const c of"chessa:"+s)h=(h*33^c.charCodeAt(0))>>>0;return"x"+h}}
const S=$("set");
if(S){const par=E("div");par.id="par";
 par.innerHTML='<div class="ph"><b>👨‍👩‍👧 Parent area</b><button id="pun">🔒 Unlock</button></div><div id="pst" style="color:#9db4d8;font-size:12px;margin-top:4px"></div><div id="pbox" hidden><label>Kid Mode<input type="checkbox" id="pk"></label><label>Child\'s age<select id="pa"><option value="0">5–7</option><option value="1">8–11</option><option value="2">12+</option></select></label><label>Wikipedia answers (age 8+)<input type="checkbox" id="pw"></label><div class="row"><button id="pcl">🧹 Clear history &amp; progress</button><button id="ppin">🔑 Change PIN</button><button id="plk">🔒 Lock</button></div></div>';
 const ab=S.querySelector(".about");S.insertBefore(par,ab||null);
 const say=()=>{$("pst").textContent="Kid Mode is "+(K.on()?"ON · age "+AGES[K.band()]:"OFF")+". Progress is stored only on this device."};say();
 const pbox=$("pbox"),sync=()=>{$("pk").checked=K.on();$("pa").value=K.band();$("pw").checked=localStorage.ckw!=="0"};
 const lock=()=>{pbox.hidden=true;$("pun").hidden=false};
 async function newPin(){const p=prompt("Choose a 4-digit parent PIN (it keeps children out of these settings):");if(p===null)return false;if(!/^\d{4}$/.test(p)){alert("Please use exactly 4 digits.");return false}localStorage.ckpin=await hash(p);return true}
 $("pun").onclick=async()=>{
  if(!localStorage.ckpin){if(!await newPin())return}
  else{const p=prompt("Enter parent PIN:");if(p===null)return;if(await hash(p)!==localStorage.ckpin){alert("That PIN is not correct.");return}}
  sync();pbox.hidden=false;$("pun").hidden=true};
 $("plk").onclick=lock;$("ppin").onclick=async()=>{if(await newPin())alert("PIN changed.")};
 $("pk").onchange=()=>{localStorage.ckm=$("pk").checked?"1":"0";apply();say();if(!K.on())document.body.classList.remove("kid")};
 $("pw").onchange=()=>{localStorage.ckw=$("pw").checked?"1":"0"};
 $("pa").onchange=()=>{localStorage.cka=$("pa").value;location.reload()};   /* reload so every module picks up the new level */
 $("pcl").onclick=()=>{if(!confirm("Delete question history, saved Wikipedia answers and all stars?"))return;["chh","cw2","ctc","ckp","chessa_miss"].forEach(k=>localStorage.removeItem(k));P=load();paint();alert("Done — history and progress cleared.")};
 S.addEventListener("transitionend",()=>{if(!S.classList.contains("open"))lock()});
}
window.CHESSA.kid={win,offTopic,lost,progress,facts:FACTS};
})();
