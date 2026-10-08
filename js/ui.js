/* Ask CHESSA UI: chat, answers, puzzles bar, voice, mic, language */
(()=>{
const chat=$('#chat'),main=$('#main'),q=$('#q'),send=$('#send'),down=$('#down'),mic=$('#mic');
let voice=true,force=false,lang='en';
const X=window.KB_EXTRA||{},shuf=a=>[...a].sort(()=>Math.random()-.5);
const T={en:{ph:'Type your chess question…',tg:'Hi! Ask me anything about chess ♟️',ls:'🎤 Listening… speak now',lg:'EN'},hi:{ph:'अपना शतरंज का सवाल लिखें…',tg:'नमस्ते! शतरंज के बारे में कुछ भी पूछें ♟️',ls:'🎤 सुन रही हूँ… बोलिए',lg:'हिं'}};
const scroll=()=>setTimeout(()=>main.scrollTo({top:main.scrollHeight,behavior:'smooth'}),40);
const chip=(t,fn)=>{const s=document.createElement('button');s.className='rl';s.textContent=t;s.onclick=fn;return s};
const rows=(items,fn)=>{const d=document.createElement('div');d.className='sl';items.forEach(it=>{const b=document.createElement('button');b.className='row';b.textContent=it.t;b.onclick=()=>fn(it);d.appendChild(b)});return d};
const words=t=>esc(t).split(/(\s+)/).map((w,i)=>/\S/.test(w)?`<span class="wd" style="animation-delay:${Math.min(i*12,1000)}ms">${w}</span>`:w).join('');
function add(cls,html){document.body.classList.add('chat');const m=document.createElement('div');m.className='msg '+cls;
 m.innerHTML=(cls=='bot'?'<div class="av">♛</div>':'')+'<div class="bubble">'+html+'</div>';chat.appendChild(m);scroll();return m}
function say(html,chips,sp){const m=add('bot','<div class="txt">'+html+'</div>');
 if(chips&&chips.length){const d=document.createElement('div');d.className='meta';chips.forEach(c=>d.appendChild(c));m.querySelector('.bubble').appendChild(d)}
 scroll();if(sp)speak(sp);return m}
function speak(t,o={}){if(!(voice||force||o.happy)||!window.speechSynthesis)return;speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(t.replace(/chessa/gi,'Chessah').replace(/[#*♛💡]/g,' ').slice(0,450)),f=[$('#big'),$('#mini')],vs=speechSynthesis.getVoices();
 u.lang='en-IN';u.rate=o.happy?1.05:.95;u.pitch=o.happy?1.45:1.05;
 const v=vs.find(x=>/en-IN/i.test(x.lang)&&/female|heera|neerja|veena/i.test(x.name))||vs.find(x=>/^en/i.test(x.lang)&&/female|zira|samantha|aria|jenny/i.test(x.name))||vs.find(x=>/^en/i.test(x.lang));if(v)u.voice=v;
 u.onstart=()=>f.forEach(e=>e.classList.add('talk'));u.onend=u.onerror=()=>f.forEach(e=>e.classList.remove('talk'));speechSynthesis.speak(u)}
function sayList(msg,items,fn){const m=say(esc(msg),null,msg);m.querySelector('.bubble').appendChild(rows(items,fn))}
const topicRows=l=>l.map(e=>({t:e.topic,e}));
const openTopic=it=>ask(it.e.q,it.e);
function show(e){const p=e.a.split('\n\n'),ex=p.find(x=>x.startsWith('💡')),mn=p.filter(x=>!x.startsWith('💡')).join('\n\n');
 say('<div class="ans"><div class="ah">'+esc(e.topic)+'</div><div class="ab">'+words(mn)+'</div>'+(ex?'<div class="ex">'+esc(ex)+'</div>':'')+'</div>',null,mn)}
function pickList(l){
 if(l.length<=18)return sayList('Pick a topic 👇',topicRows(l),openTopic);
 const subs=[...new Set(l.map(e=>e.sub).filter(Boolean))];
 if(subs.length>1&&subs.length<=24)return sayList('Pick a group 👇',subs.map(t=>({t})),it=>{add('user',it.t);pickList(l.filter(e=>e.sub===it.t))});
 sayList('Here are some topics 👇',[...topicRows(shuf(l).slice(0,12)),{t:'🔀 Show other topics',more:1}],it=>it.more?pickList(l):openTopic(it))}
function status(){const c=KB.counts,n=Object.keys(c);say('<div class="ans"><div class="ah">📊 Knowledge status</div><div class="ab">'+KB.entries.length+' answers from '+KB.loaded.length+' of '+n.length+' files.\n\n'+n.map(k=>(c[k]?'✅ ':'⚠️ ')+k+': '+c[k]).join('\n')+(Object.keys(KB.errors).length?'\n\nErrors:\n'+Object.entries(KB.errors).map(x=>x[0]+' → '+esc(x[1])).join('\n'):'')+'</div></div>')}
function analyze(t){let f=t.split(/\s+/).slice(0,6);while(f.length<6)f.push(['w','-','-','0','1'][f.length-1]);f=f.join(' ');
 try{if(typeof Chess==='undefined'||!new Chess(f).moves().length)throw 0}catch(e){return say('That position looks invalid or the board engine is not loaded.')}
 say('🤖 Engine is thinking…');Engine.best(f,r=>{if(!r)return say('The engine could not start.');const s=Engine.san(f,r);say(board(f)+'<div class="ans"><div class="ah">🤖 Engine says</div><div class="ab">Best move: <b>'+esc(s)+'</b></div></div>','','The best move is '+s)},12)}
const PT=[['m1','♚ Mate in 1'],['m2','♚ Mate in 2'],['m3','♚ Mate in 3'],['pin','📌 Pin'],['fork','🍴 Fork'],['best','⭐ Best Move'],['daily','📅 Daily']];
const typed=t=>{const s=t.toLowerCase(),m=s.match(/mate in ?([123])/);if(m)return'm'+m[1];if(/best move/.test(s)&&/puzzle/.test(s))return'best';if(/pin/.test(s)&&/puzzle/.test(s))return'pin';if(/fork/.test(s)&&/puzzle/.test(s))return'fork';if(/daily/.test(s))return'daily';if(/puzzle|पहेली/.test(s))return'daily';return null};
function answer(t,e){
 if(e)return show(e);
 if(/^(status|debug|files)$/i.test(t.trim()))return status();
 if(/^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[wb]\b/.test(t.trim()))return analyze(t.trim());
 const pt=typed(t);if(pt)return Puz.start(pt);
 if(KB.entries.length<10)return say('⚠️ My knowledge files did not load ('+KB.loaded.length+' loaded). Press Ctrl+Shift+R, or type <b>status</b> to see details.','','My knowledge files did not load.');
 if(/surprise|random|fun fact/i.test(t)){const e=KB.sample(1,['chess-facts','chess-history','chessai-tech'])[0]||KB.sample(1)[0];if(e)return show(e)}
 const r=KB.ask(t);
 r.best?show(r.best):sayList("Hmm, I don't know that one yet 🤔 Try one of these:",topicRows(KB.sample(5)),openTopic)}
function ask(text,e,o){text=text.trim();if(!text)return;add('user',esc(text));q.value='';sync();force=!!(o&&o.talk);
 const d=add('bot','<div class="dots"><i></i><i></i><i></i></div>');
 KB.ready.then(()=>setTimeout(()=>{d.remove();answer(text,e)},400))}
function home(){chat.innerHTML='';document.body.classList.remove('chat');window.speechSynthesis&&speechSynthesis.cancel();main.scrollTo(0,0)}
const pz=(t,l)=>{add('user',l);Puz.start(t)};
/* home: suggestions (as separated lines) + tiles */
const sg=document.createElement('div');sg.className='sl';$('#sug').appendChild(sg);
(X.suggestions||[]).forEach(s=>{const b=document.createElement('button');b.className='row';b.textContent=s;b.onclick=()=>ask(s);sg.appendChild(b)});
const tiles=[{e:'🧩',n:'Daily Puzzle',c:'#ff7ad9',f:()=>pz('daily','📅 Daily Puzzle')},{e:'🎲',n:'Surprise Me',c:'#5ee6ff',f:()=>ask('Surprise me')},
 ...(X.categories||[]).map(c=>({e:c.e,n:c.n,c:c.c,f:()=>{add('user',c.e+' '+c.n);KB.ready.then(()=>pickList(KB.byFiles(c.f)))}}))];
tiles.forEach(t=>{const b=document.createElement('button');b.className='tile';b.style.setProperty('--c',t.c);b.innerHTML='<span>'+t.e+'</span>'+t.n;b.onclick=t.f;$('#tiles').appendChild(b)});
/* bottom bar: puzzle types */
PT.forEach(([t,l])=>{const b=document.createElement('button');b.className='chip';b.textContent=l;b.onclick=()=>pz(t,l);$('#qa').appendChild(b)});
[['🎲 Surprise',()=>ask('Surprise me')],['🏠 Menu',home]].forEach(([l,f])=>{const b=document.createElement('button');b.className='chip';b.textContent=l;b.onclick=f;$('#qa').appendChild(b)});
$('#clear').onclick=home;
/* composer */
function sync(){send.classList.toggle('idle',!q.value.trim());$('#xq').classList.toggle('show',!!q.value)}
q.oninput=sync;setInterval(sync,300);$('#xq').onclick=()=>{q.value='';sync();q.focus()};
send.onclick=()=>ask(q.value);q.onkeydown=e=>{if(e.key==='Enter'&&!e.isComposing)ask(q.value)};
document.onkeydown=e=>{const t=/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);if(e.key==='/'&&!t){e.preventDefault();q.focus()}else if(e.key==='Escape'){q.value='';q.blur();sync()}};
/* voice on/off, language */
$('#vc').onclick=function(){voice=!voice;this.classList.toggle('on',voice);this.textContent=voice?'🔊':'🔇';if(!voice&&window.speechSynthesis)speechSynthesis.cancel()};
$('#lg').onclick=function(){lang=lang==='en'?'hi':'en';this.textContent=T[lang].lg;q.placeholder=T[lang].ph;$('.tg').textContent=T[lang].tg;const t=$('#toast');t.textContent=lang==='hi'?'भाषा: हिंदी (माइक हिंदी सुनेगा)':'Language: English';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
/* mic: listen, show words, then answer WITH voice */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR)mic.hidden=true;else mic.onclick=()=>{
 if(mic.classList.contains('rec'))return;window.speechSynthesis&&speechSynthesis.cancel();
 const r=new SR();let fin='',err='';r.lang=lang==='hi'?'hi-IN':'en-IN';r.interimResults=true;r.maxAlternatives=1;
 r.onstart=()=>{mic.classList.add('rec');q.placeholder=T[lang].ls};
 r.onresult=e=>{let t='';for(const x of e.results)t+=x[0].transcript;q.value=t;sync();if(e.results[e.results.length-1].isFinal)fin=t};
 r.onerror=e=>{err=e.error};
 r.onend=()=>{mic.classList.remove('rec');q.placeholder=T[lang].ph;
  if(fin)return ask(fin,null,{talk:true});
  say(err==='not-allowed'||err==='service-not-allowed'?'🎤 Please allow microphone access (tap the 🔒 icon near the web address) and try again.':'🎤 I could not hear you. Tap the mic and speak clearly.')};
 try{r.start()}catch(e){mic.classList.remove('rec')}};
main.onscroll=()=>down.classList.toggle('show',main.scrollHeight-main.scrollTop-main.clientHeight>140);
down.onclick=()=>main.scrollTo({top:main.scrollHeight,behavior:'smooth'});
const fx=$('#fx');'♟♞♝♜♛♚♟♞♝♜♛♚♟♞'.split('').forEach((g,i)=>{const e=document.createElement('i');e.textContent=g;e.style.cssText=`left:${Math.random()*100}%;font-size:${24+Math.random()*40}px;animation-duration:${18+Math.random()*22}s;animation-delay:-${Math.random()*30}s`;fx.appendChild(e)});
if(window.speechSynthesis)speechSynthesis.getVoices();
window.UI={add,say,chip,speak,scroll};sync();
})();
