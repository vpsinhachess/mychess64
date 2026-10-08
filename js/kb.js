/* Knowledge-base loader + search. Works even if data/manifest.js is stale or missing. */
(()=>{
const V=3; /* bump to bypass browser/GitHub Pages cache */
const FILES="about-chessa attack-defense calculation checkmates-patterns chessai-tech chessa-talk chess-basics-board chess-facts chess-gk chess-gk-world chess-history chess-logic chess-psychology chess-rules common-mistakes endgame-principles famous-games great-players indian-chess indian-gms middlegame-strategy notation-terminology opening-principles opening-theory-repertoire opening-traps piece-move positional-chess practical-endgames puzzles-question ratings-careers tactics-combinations thinking-decision tournament-chess training-improvement".split(' ');
const base=f=>f.replace(/^.*\/|\.js$/g,'');
const camel=n=>{const p=n.split('-');return p[0]+p.slice(1).map(x=>x[0].toUpperCase()+x.slice(1)).join('')};
const STOP=new Set('what is the a an of in to how do i me you can about tell explain please and for with on are does it my give some who why when'.split(' '));
const SYN=(window.KB_EXTRA||{}).synonyms||{};
const words=t=>norm(t).trim().split(' ').map(w=>SYN[w]||w);
const toks=t=>words(t).filter(w=>w.length>1&&!STOP.has(w));
const set=t=>new Set(toks(t));
const score=(e,qn,tk)=>{let s=0;for(const k of e._kn)if(k.length>2&&qn.includes(k))s+=8+k.length/5;
 for(const t of tk){if(e._k.has(t))s+=3;if(e._t.has(t))s+=3;if(e._q.has(t))s+=2;if(e._a.has(t))s+=.4}return s};
const K=window.KB={entries:[],loaded:[],failed:[]};
K.ready=(async()=>{
 const map=new Map();
 (window.KB_MANIFEST||[]).forEach(([f,n])=>map.set(base(f),n));
 FILES.forEach(n=>{if(!map.has(n))map.set(n,camel(n))});
 await Promise.all([...map.keys()].map(n=>new Promise(r=>{const s=document.createElement('script');
  s.src='data/'+n+'.js?v='+V;s.onload=()=>{K.loaded.push(n);r()};s.onerror=()=>{K.failed.push(n);r()};document.head.appendChild(s)})));
 const all=(window.KB_DATA||[]).map(e=>({...e,src:'core'}));
 map.forEach((v,n)=>(window[v]||[]).forEach(e=>all.push({...e,src:n})));
 all.forEach(e=>{e._kn=(e.keys||[]).map(norm);e._k=set((e.keys||[]).join(' '));e._t=set(e.topic);e._q=set(e.q);e._a=set(e.a)});
 K.entries=all})();
K.ask=t=>{const qn=' '+words(t).join(' ')+' ',tk=toks(t);
 const sc=K.entries.map(e=>({e,s:score(e,qn,tk)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s),b=sc[0];
 return b&&b.s>=5?{best:b.e,rel:sc.slice(1,5).filter(x=>x.s>=3&&x.e.topic!==b.e.topic).slice(0,3).map(x=>x.e)}:{}};
K.related=e=>K.entries.filter(x=>x.src===e.src&&x.id!==e.id).sort(()=>Math.random()-.5).slice(0,3);
K.byFiles=f=>K.entries.filter(e=>f.includes(e.src));
K.sample=(n,f)=>(f?K.byFiles(f):K.entries.filter(e=>!['core','chessa-talk','about-chessa'].includes(e.src))).sort(()=>Math.random()-.5).slice(0,n);
})();
