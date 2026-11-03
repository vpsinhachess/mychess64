CHESSA.reg("extras","Help card, question history (↑/↓), About / brand sheet section, Wiki tips");
(function(){
const bot=(h,m,c)=>{document.body.classList.add("chat");return window.botUI(h,m,c)};
/* ---------- help card ---------- */
const HELP='<b>What I can do</b>\n♟ <b>Learn</b> — rules, openings, tactics, endgames (try “castling” or “Sicilian Defense”)\n📖 <b>Wikipedia</b> — people, events, history (try “who is Magnus Carlsen” or “history of chess”)\n🔍 <b>Analyze</b> — paste a FEN or a PGN; type moves like “1.e4 e5 2.Nf3”\n🧩 <b>Puzzles</b> — “daily puzzle”, “random puzzle”\n🎯 <b>Quiz</b> — “quiz me”\n🏆 <b>Players</b> — “top players”, “player magnuscarlsen”\n📊 <b>Elo</b> — “Elo 1500 vs 1700 chance”\n🎙 Voice, Hindi (हि) and levels are in ⚙ Settings.\n<i>Tip: press ↑ to repeat your last question.</i>';
const HELPRE=/^(help|\?|menu|commands?|what can (you|chessa) do\??|how (do|to) (i )?use (you|chessa|this)\??)$/i;
/* ---------- history ---------- */
let H=[],hi=-1;try{H=JSON.parse(localStorage.chh||"[]")}catch(e){}
const q=document.getElementById("q");
q.addEventListener("keydown",e=>{if(e.isComposing)return;
 if(e.key=="ArrowUp"&&H.length){e.preventDefault();hi=hi<0?H.length-1:Math.max(0,hi-1);q.value=H[hi]}
 else if(e.key=="ArrowDown"&&hi>=0){e.preventDefault();hi++;if(hi>=H.length){hi=-1;q.value=""}else q.value=H[hi]}});
const prev=ask;
ask=async function(v){const n=String(v).trim();
 if(!(window.KID&&KID.on())&&n&&n.length<300&&H[H.length-1]!==n){H.push(n);H=H.slice(-30);try{localStorage.chh=JSON.stringify(H)}catch(e){}}hi=-1;
 if(HELPRE.test(n)){add("user",v);return bot(HELP,["❓ Help"],["Daily puzzle","History of chess","Quiz me","Random opening"])}
 return prev(v)};
/* ---------- About block in the settings sheet ---------- */
const P=document.getElementById("set");
if(P){const a=document.createElement("div");a.className="about";a.style.cssText="margin-top:14px;padding-top:12px;border-top:1px solid #ffffff1a;text-align:center;font-size:11.5px;color:#9db4d8;line-height:1.6";
 a.innerHTML='<a href="https://www.mychess64.com" target="_blank" rel="noopener" style="display:inline-block;background:#fff;border-radius:14px;padding:8px 14px"><img src="assets/logo-stacked.png" alt="MyChess64 — Learn. Play. Improve. Anytime, Anywhere." style="display:block;height:84px;width:auto"></a><br>CHESSA v'+CHESSA.version+' · AI chess coach by <a href="https://www.mychess64.com" target="_blank" rel="noopener" style="color:#9be4ff">MyChess64</a><br>Designed &amp; Developed by VED PRAKASH SINHA · Made in BHARAT<br><span style="opacity:.8">Wikipedia look-ups send your question to wikipedia.org. Text © Wikipedia contributors, CC BY-SA.</span>';
 P.append(a);P.style.maxHeight="92vh";P.style.overflowY="auto"}
})();
