/* Chat UI: tiles, messages, puzzles, voice, mic, shortcuts */
(()=>{
const chat=$('#chat'),main=$('#main'),q=$('#q'),send=$('#send'),down=$('#down');let voice=true;
$('#big').innerHTML=$('#mini').innerHTML=FACE;
const X=window.KB_EXTRA||{},shuf=a=>[...a].sort(()=>Math.random()-.5);
const scroll=()=>setTimeout(()=>main.scrollTo({top:main.scrollHeight,behavior:'smooth'}),30);
const chip=(t,fn)=>{const s=document.createElement('button');s.className='rl';s.textContent=t;s.onclick=fn;return s};
const words=t=>esc(t).split(/(\s+)/).map((w,i)=>/\S/.test(w)?`<span class="w" style="animation-delay:${Math.min(i*14,1200)}ms">${w}</span>`:w).join('');
function add(cls,html){document.body.classList.add('chat');const m=document.createElement('div');m.className='msg '+cls;
 m.innerHTML=(cls=='bot'?'<div class="av">♛</div>':'')+'<div class="bubble">'+html+'</div>';chat.appendChild(m);scroll();return m}
function say(html,chips,sp){const m=add('bot','<div class="txt">'+html+'</div>');
 if(chips&&chips.length){const d=document.createElement('div');d.className='meta';chips.forEach(c=>d.appendChild(c));m.querySelector('.bubble').appendChild(d)}
 scroll();if(sp)speak(sp)}
function speak(t){if(!voice||!window.speechSynthesis)return;speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(t.replace(/[#*♛]/g,' ').slice(0,420)),f=[$('#big'),$('#mini')];u.rate=.95;
 u.onstart=()=>f.forEach(e=>e.classList.add('talk'));u.onend=u.onerror=()=>f.forEach(e=>e.classList.remove('talk'));speechSynthesis.speak(u)}
const topics=l=>l.map(e=>chip(e.topic,()=>ask(e.q,e)));
function show(e,rel){say('<b>'+esc(e.topic)+'</b>\n'+words(e.a),(rel||[]).map(r=>chip('➜ '+r.topic,()=>ask(r.q,r))),e.topic+'. '+e.a)}
const pzChips=p=>[...shuf(p.opts).map(o=>chip(o,()=>ask(o))),chip('💡 Hint',()=>say('💡 '+esc(p.hint))),
 chip('👀 Show answer',()=>{Puz.cur=null;say('The answer is <b>'+esc(p.sol)+'</b>. '+esc(p.why),[chip('➡ Next puzzle',()=>puzzle())])})];
function puzzle(daily){const p=Puz.next(daily),side=p.fen.split(' ')[1]=='b'?'Black':'White';
 say(board(p.fen)+'<b>🧩 '+esc(p.title)+'</b>\n'+side+' to move. Find the checkmate in 1! Tap an answer 👇',pzChips(p),side+' to move. Find the checkmate in one.')}
function answer(t,e){
 if(KB.entries.length<10){const m='⚠️ My knowledge files did not load ('+KB.loaded.length+' loaded, '+KB.failed.length+' failed). Press Ctrl+Shift+R to refresh.'+(Object.keys(KB.errors).length?'\n\nTechnical detail: '+Object.entries(KB.errors).slice(0,2).map(x=>x[0]+' → '+x[1]).join('\n'):'\n\nNo errors were reported, so the files loaded but no questions/answers were found in them.');return say(m,[],'My knowledge files did not load. Please refresh the page.')}
 if(e)return show(e,KB.related(e));
 const z=Puz.answer(t);
 if(z){if(z.ok){const p=Puz.cur;Puz.cur=null;celebrate('🎉 Correct!');return say('🎉 <b>Correct!</b> '+esc(p.sol)+' is checkmate!\n'+esc(p.why),[chip('➡ Next puzzle',()=>puzzle())],'Correct! '+p.why)}
  return say('Not quite 🙂 Try another one!',pzChips(Puz.cur))}
 if(/puzzle|पहेली/i.test(t))return puzzle();
 if(/surprise|random|fun fact/i.test(t)){const e=KB.sample(1,['chess-facts','chess-history','chessai-tech'])[0]||KB.sample(1)[0];if(e)return show(e,KB.related(e))}
 const r=KB.ask(t);
 r.best?show(r.best,r.rel):say("Hmm, I don't know that one yet 🤔\nTry one of these:",topics(KB.sample(5)),"Hmm, I don't know that one yet. Try one of these.")}
function ask(text,e){text=text.trim();if(!text)return;add('user',esc(text));q.value='';sync();
 const d=add('bot','<div class="dots"><i></i><i></i><i></i></div>');
 KB.ready.then(()=>setTimeout(()=>{d.remove();answer(text,e)},450))}
function openCat(c){add('user',c.e+' '+c.n);KB.ready.then(()=>{const l=KB.byFiles(c.f);say('Great choice! Pick a topic 👇',topics(l),'Pick a topic')})}
function home(){chat.innerHTML='';document.body.classList.remove('chat');speechSynthesis&&speechSynthesis.cancel();Puz.cur=null;main.scrollTo(0,0)}
/* home tiles + suggestions */
const tiles=[{e:'🧩',n:'Daily Puzzle',c:'#ff7ad9',f:()=>{add('user','🧩 Daily Puzzle');puzzle(1)}},{e:'🎲',n:'Surprise Me',c:'#5ee6ff',f:()=>ask('Surprise me')},
 ...(X.categories||[]).map(c=>({e:c.e,n:c.n,c:c.c,f:()=>openCat(c)}))];
$('#tiles').innerHTML='';tiles.forEach(t=>{const b=document.createElement('button');b.className='tile';b.style.setProperty('--c',t.c);b.innerHTML='<span>'+t.e+'</span>'+t.n;b.onclick=t.f;$('#tiles').appendChild(b)});
(X.suggestions||[]).forEach(s=>$('#sug').appendChild(chip(s,()=>ask(s))));
$('#qa-p').onclick=()=>{add('user','🧩 Puzzle');puzzle()};$('#qa-s').onclick=()=>ask('Surprise me');$('#qa-h').onclick=home;$('#clear').onclick=home;
/* composer */
function sync(){send.classList.toggle('idle',!q.value.trim());$('#xq').classList.toggle('show',!!q.value)}
q.oninput=sync;setInterval(sync,300);$('#xq').onclick=()=>{q.value='';sync();q.focus()};
send.onclick=()=>ask(q.value);q.onkeydown=e=>{if(e.key==='Enter'&&!e.isComposing)ask(q.value)};
document.onkeydown=e=>{const t=/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);if(e.key==='/'&&!t){e.preventDefault();q.focus()}else if(e.key==='Escape'){q.value='';q.blur();sync()}};
/* voice out / mic in */
$('#vc').onclick=function(){voice=!voice;this.classList.toggle('on',voice);this.textContent=voice?'🔊':'🔇';if(!voice&&window.speechSynthesis)speechSynthesis.cancel()};
const SR=window.SpeechRecognition||window.webkitSpeechRecognition,mic=$('#mic');
if(!SR)mic.hidden=true;else{const r=new SR();r.lang='en-IN';r.onresult=e=>ask(e.results[0][0].transcript);r.onend=()=>mic.classList.remove('rec');mic.onclick=()=>{try{r.start();mic.classList.add('rec')}catch(e){}}}
/* scroll-down button */
main.onscroll=()=>down.classList.toggle('show',main.scrollHeight-main.scrollTop-main.clientHeight>140);
down.onclick=()=>main.scrollTo({top:main.scrollHeight,behavior:'smooth'});
const fx=$('#fx');'♟♞♝♜♛♚♟♞♝♜♛♚♟♞'.split('').forEach((g,i)=>{const e=document.createElement('i');e.textContent=g;e.style.cssText=`left:${Math.random()*100}%;font-size:${24+Math.random()*40}px;animation-duration:${18+Math.random()*22}s;animation-delay:-${Math.random()*30}s`;fx.appendChild(e)});
sync();
})();
