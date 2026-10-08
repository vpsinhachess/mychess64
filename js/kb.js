/* Knowledge-base loader + search.
   Format-agnostic: loads every file in data/, finds the question/answer entries inside it
   (any global array/object, window.x=..., const x=..., fields q/question/title/a/answer/text...). */
(()=>{
const V=4; /* bump to bypass browser/GitHub Pages cache */
const FILES="about-chessa attack-defense calculation checkmates-patterns chessai-tech chessa-talk chess-basics-board chess-facts chess-gk chess-gk-world chess-history chess-logic chess-psychology chess-rules common-mistakes endgame-principles famous-games great-players indian-chess indian-gms middlegame-strategy notation-terminology opening-principles opening-theory-repertoire opening-traps piece-move positional-chess practical-endgames puzzles-question ratings-careers tactics-combinations thinking-decision tournament-chess training-improvement openingFundamentals".split(' ');
const base=f=>f.replace(/^.*\/|\.js$/g,'');
const STOP=new Set('what is the a an of in to how do i me you can about tell explain please and for with on are does it my give some who why when'.split(' '));
const SYN=(window.KB_EXTRA||{}).synonyms||{};
const words=t=>norm(t).trim().split(' ').map(w=>SYN[w]||w);
const toks=t=>words(t).filter(w=>w.length>1&&!STOP.has(w));
const set=t=>new Set(toks(t));
const K=window.KB={entries:[],loaded:[],failed:[],counts:{}};
/* ---- entry detection ---- */
const ANS=['a','answer','ans','text','content','body','explanation','description','details','response','reply','info','definition','summary'];
const TOP=['topic','title','name','heading','term','label','subject'];
const QQ=['q','question','prompt','query','ask'];
const KEY=['keys','keywords','keyword','tags','k','triggers','patterns','aliases','synonyms','alt','questions','variants'];
const pick=(o,F)=>{for(const f of F){const v=o[f];if(typeof v==='string'&&v.trim())return v.trim();if(Array.isArray(v)&&v.length&&v.every(x=>typeof x==='string'))return v.join('\n')}return ''};
const arr=(o,F)=>{const r=[];for(const f of F){const v=o[f];if(Array.isArray(v))r.push(...v.filter(x=>typeof x==='string'));else if(typeof v==='string')r.push(...v.split(/[,|;]/))}return r.map(s=>s.trim()).filter(Boolean)};
function entry(o){let a=pick(o,ANS),topic=pick(o,TOP),q=pick(o,QQ);
 if(!a){a=Object.values(o).filter(x=>typeof x==='string').sort((x,y)=>y.length-x.length)[0]||'';if(a.length<25)return null}
 topic=topic||q||String(o.id||'');if(!topic)return null;q=q||topic;
 return{topic,q,a,keys:[...arr(o,KEY),topic]}}
function harvest(v,out,d=0){if(!v||d>5||typeof v==='function')return;
 if(Array.isArray(v)){if(v.length>=2&&v.every(x=>typeof x==='string')){if(v[1].length>15)out.push({topic:v[0],q:v[0],a:v[1],keys:[v[0],...v.slice(2)]});return}
  v.forEach(x=>Array.isArray(x)&&x.length>=2&&x.every(y=>typeof y==='string')?harvest(x,out,d+1):harvest(x,out,d+1));return}
 if(typeof v!=='object')return;
 if(pick(v,ANS)||(pick(v,TOP)&&pick(v,QQ))){const e=entry(v);if(e)out.push(e);return}
 const vals=Object.values(v);
 if(vals.length&&vals.every(x=>typeof x==='string')){Object.keys(v).forEach(k=>v[k].length>15&&out.push({topic:k,q:k,a:v[k],keys:[k]}));return}
 vals.forEach(x=>harvest(x,out,d+1))}
/* ---- loading: fetch text, run it globally, collect what it defined ---- */
const gl=(0,eval); /* indirect eval = global scope */
const seen=new Set(Object.keys(window));
const fresh=()=>{const n=Object.keys(window).filter(k=>!seen.has(k));n.forEach(k=>seen.add(k));return n};
async function loadFile(n){
 const url='data/'+n+'.js?v='+V,out=[];
 let txt=null;try{const r=await fetch(url,{cache:'no-cache'});if(r.ok)txt=await r.text()}catch(e){}
 if(txt===null)return await viaScript(url,n,out);
 const names=new Set();let m;const re=/(?:^|[\n;])\s*(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=|(?:window|self|globalThis)\.([A-Za-z_$][\w$]*)\s*=(?!=)/g;
 while(m=re.exec(txt))names.add(m[1]||m[2]);
 let ret={};try{ret=gl(txt+'\n;({'+[...names].map(k=>JSON.stringify(k)+':(typeof '+k+'!=="undefined"?'+k+':undefined)').join(',')+'})')||{}}catch(e){K.failed.push(n+' (error: '+e.message+')');return[]}
 fresh().forEach(k=>{if(!(k in ret))ret[k]=window[k]});
 harvest(Object.values(ret),out);return out}
function viaScript(url,n,out){return new Promise(r=>{const s=document.createElement('script');s.src=url;
 s.onload=()=>{const o={};fresh().forEach(k=>o[k]=window[k]);harvest(Object.values(o),out);r(out)};
 s.onerror=()=>{K.failed.push(n);r([])};document.head.appendChild(s)})}
K.ready=(async()=>{
 const names=new Set(FILES);(window.KB_MANIFEST||[]).forEach(x=>names.add(base(x[0])));
 const res=await Promise.all([...names].map(async n=>{try{return[n,await loadFile(n)]}catch(e){K.failed.push(n);return[n,[]]}}));
 const all=(window.KB_DATA||[]).map(e=>({...e,src:'core'}));
 res.forEach(([n,list])=>{K.counts[n]=list.length;if(list.length)K.loaded.push(n);list.forEach((e,i)=>all.push({...e,id:n+'-'+(i+1),src:n}))});
 all.forEach(e=>{e._kn=(e.keys||[]).map(norm);e._k=set((e.keys||[]).join(' '));e._t=set(e.topic);e._q=set(e.q);e._a=set(e.a)});
 K.entries=all;console.info('CHESSA knowledge: '+all.length+' entries from '+K.loaded.length+' files',K.counts)})();
/* ---- search ---- */
const score=(e,qn,tk)=>{let s=0;for(const k of e._kn)if(k.length>2&&qn.includes(k))s+=8+k.length/5;
 for(const t of tk){if(e._k.has(t))s+=3;if(e._t.has(t))s+=3;if(e._q.has(t))s+=2;if(e._a.has(t))s+=.4}return s};
K.ask=t=>{const qn=' '+words(t).join(' ')+' ',tk=toks(t);
 const sc=K.entries.map(e=>({e,s:score(e,qn,tk)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s),b=sc[0];
 return b&&b.s>=3?{best:b.e,rel:sc.slice(1,5).filter(x=>x.s>=2&&x.e.topic!==b.e.topic).slice(0,3).map(x=>x.e)}:{}};
K.related=e=>e?K.entries.filter(x=>x.src===e.src&&x.id!==e.id).sort(()=>Math.random()-.5).slice(0,3):[];
K.byFiles=f=>K.entries.filter(e=>f.includes(e.src));
K.sample=(n,f)=>(f?K.byFiles(f):K.entries.filter(e=>!['core','chessa-talk','about-chessa'].includes(e.src))).sort(()=>Math.random()-.5).slice(0,n);
})();
