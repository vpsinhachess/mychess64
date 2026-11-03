CHESSA.reg("wiki","Wikipedia: people, events, history and general chess questions — ranked, cached, with source links");
(function(){
const {esc,fix}=window.cx;
const bot=(h,m,c)=>window.botUI(h,m,c);
const API="https://en.wikipedia.org/w/api.php";
const TTL=7*864e5,CK="cw2";
/* a page only counts as "chess" if its title / short description / opening text says so */
const CHESSY=/chess|grandmaster|gambit|checkmate|\bFIDE\b|shatranj|chaturanga|stockfish|lichess|candidates tournament|olympiad/i;
const J=async u=>{try{const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);const r=await fetch(u,{signal:c.signal});clearTimeout(t);return r.ok?await r.json():null}catch(e){return null}};

/* ---------- cache (7 days, 40 entries) ---------- */
const cget=k=>{try{const o=JSON.parse(localStorage[CK]||"{}"),x=o[k];return x&&Date.now()-x.at<TTL?x.d:null}catch(e){return null}};
const cput=(k,d)=>{try{const o=JSON.parse(localStorage[CK]||"{}"),ks=Object.keys(o);if(ks.length>40)delete o[ks[0]];o[k]={at:Date.now(),d};localStorage[CK]=JSON.stringify(o)}catch(e){}};

/* ---------- question -> topic ---------- */
const PRE=/^(?:please\s+)?(?:(?:who|what)(?:\s+(?:is|are|was|were)|['’]s)|tell me(?:\s+more)?\s+about|explain|define|describe|about|look\s?up|find|search(?:\s+for)?)\s+(?:an?\s+|the\s+)?/i;
const WF=/^(?:who\s+(?:is|was|were|are|invented|created|founded|discovered|won|became|beat|defeated)|when\s+(?:was|were|did|is)|where\s+(?:was|were|did|is)|history\s+of|story\s+of|origins?\s+of|biography\s+of|life\s+of|tell me about)\b/i;
function parse(v){let t=String(v).trim().replace(/\s+/g," "),explicit=false;
 const em=t.match(/^(?:wiki(?:pedia)?\s*[:\-]?\s+|wiki(?:pedia)?\s*[:\-]\s*|search wikipedia for\s+|look\s?up on wikipedia\s+)(.+)$/i);if(em){explicit=true;t=em[1]}
 t=t.replace(/[?!.]+$/,"").trim();for(let i=0;i<2;i++)t=t.replace(PRE,"");
 return{topic:t.trim(),explicit}}

/* ---------- text helpers ---------- */
function clean(t){return String(t||"").replace(/\s*\((?:[^()]*[ˈˌːɑɪʊəʃʒŋθðæɛɔʔ][^()]*)\)/g,"").replace(/\s*\(\s*[;,]?\s*\)/g,"").replace(/\[[^\]]{0,12}\]/g,"").replace(/[ \t]+/g," ").replace(/\s*\n\s*/g,"\n").trim()}
const ABBR=/(?:\b[A-Z]|\b(?:Mr|Mrs|Ms|Dr|St|Jr|Sr|vs|No|Prof|Gen|Col|Lt|Capt|ca|approx|b|c|d|e\.g|i\.e|U\.S))\.$/;
function sents(t){const raw=t.replace(/\n+/g," ").match(/\S.*?[.!?]["')\]]*(?=\s+[A-Z“"0-9]|$)/g)||[t],out=[];
 raw.forEach(s=>{if(out.length&&ABBR.test(out[out.length-1]))out[out.length-1]+=" "+s;else out.push(s)});return out}
const nzs=s=>nz(s);
const okUrl=(u,t)=>/^https:\/\/[a-z-]+\.wikipedia\.org\//.test(u||"")?u:"https://en.wikipedia.org/wiki/"+encodeURIComponent(String(t).replace(/ /g,"_"));
const okImg=u=>/^https:\/\/upload\.wikimedia\.org\//.test(u||"")?u:"";

/* ---------- Wikipedia API ---------- */
const PROPS="&prop=extracts%7Cpageimages%7Cinfo%7Cdescription%7Cpageprops&exintro=1&explaintext=1&exlimit=max&exsentences=10&piprop=thumbnail&pithumbsize=260&inprop=url&ppprop=disambiguation";
async function search(q,n){const r=await J(API+"?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit="+n+"&gsrsearch="+encodeURIComponent(q)+PROPS);
 return r===null?null:(r.query&&r.query.pages?Object.values(r.query.pages):[])}
async function byTitle(t){const a=t.charAt(0).toUpperCase()+t.slice(1),b=t.replace(/\b[a-z]/g,c=>c.toUpperCase());
 const r=await J(API+"?action=query&format=json&origin=*&redirects=1&titles="+encodeURIComponent(a===b?a:a+"|"+b)+PROPS);
 return r===null?null:(r.query&&r.query.pages?Object.values(r.query.pages).filter(p=>!("missing" in p)&&!("invalid" in p)).map(p=>({...p,index:0})):[])}

/* ---------- ranking ---------- */
function rankPages(topic,pages){
 const tset=new Set(toks(topic)),origin=/invent|origin|first|history|creat|ancient|began|start|born/i.test(topic),out=[];
 pages.forEach(p=>{
  if(!p.extract||p.extract.length<40||(p.pageprops&&"disambiguation" in p.pageprops)||/^(List|Lists|Index|Outline) of\b/i.test(p.title))return;
  const tt=[...new Set(toks(p.title))];let hit=0;
  tset.forEach(t=>{if(tt.includes(t)||tt.some(x=>x.length>4&&t.length>4&&(x.startsWith(t.slice(0,5))||t.startsWith(x.slice(0,5)))))hit++});
  const ov=tset.size?hit/tset.size:0,chessy=CHESSY.test(p.title+" "+(p.description||"")+" "+p.extract.slice(0,500)),
   exact=nzs(p.title)===nzs(topic)||nzs(p.title)===nzs(topic+" chess")?1:0,
   s=ov*10+(chessy?5:0)+exact*6+(origin&&/history|origin/i.test(p.title)?4:0)-(p.idx||0)*.6;
  out.push({p,s,ov,chessy})});
 const need=tset.size>=3?.34:.5;
 const good=out.filter(x=>x.chessy&&x.ov>=need&&x.s>=5).sort((a,b)=>b.s-a.s);
 return{best:good[0]&&good[0].p,others:good.slice(1,3).map(x=>x.p.title)}}

async function find(topic){
 const tq=norm(topic),bias=/\bchess\b/.test(tq)?[topic]:[topic+" chess",topic];
 const jobs=bias.map(q=>search(q,6));if(topic.split(/\s+/).length<=6)jobs.push(byTitle(topic));
 const res=await Promise.all(jobs);if(res.every(r=>r===null))return"net";
 const map=new Map();res.forEach((r,qi)=>(r||[]).forEach(p=>{const idx=(p.index==null?9:p.index)+(qi>0?.4:0),o=map.get(p.pageid);if(!o||o.idx>idx)map.set(p.pageid,{...p,idx})}));
 const {best,others}=rankPages(topic,[...map.values()]);if(!best)return null;
 const x=clean(best.extract);
 return{t:best.title,d:best.description||"",u:okUrl(best.fullurl,best.title),i:okImg(best.thumbnail&&best.thumbnail.source),s:sents(x).slice(0,10),r:others}}

/* ---------- display ---------- */
let lw=null;
function take(arr,max){let n=0,len=0;while(n<arr.length&&(n<1||(n<3&&len<max))){len+=arr[n].length;n++}return n}
const KIDON=()=>window.KID&&KID.on();
const BLOCK=/\b(die[sd]?|dying|death|dead|kill\w*|murder\w*|suicid\w*|wars?|nazi\w*|holocaust|sex\w*|drugs?|alcohol\w*|drunk|gambl\w*|arrest\w*|prison|jail\w*|scandal\w*|abus\w*|assault\w*|rape\w*|terror\w*|bombs?|weapons?|guns?|shot|cancer|disease\w*|mental\w*|depress\w*|disorder\w*|paranoi\w*|psychiatr\w*|accus\w*|controvers\w*|antisemit\w*|racis\w*|politic\w*|communis\w*|soviet|kgb|fled|exile\w*|defect\w*|divorc\w*|affair|hospital\w*|funeral)\b/i;
function kidCard(d){const n=KID.band()==1?2:3,s=d.s.filter(x=>!BLOCK.test(x)).slice(0,n);
 return s.length?{t:d.t,d:BLOCK.test(d.d||"")?"":d.d,u:d.u,i:"",s,r:[]}:null}
function show(d,first){
 if(KIDON()){const k=kidCard(d);if(!k)return bot("That one has some grown-up parts, so I'll skip it! 🙈 Ask me about the pieces, rules, puzzles or famous players instead.",["📖 Kid-safe filter"],["Famous players","Fun fact","Daily puzzle"]);
  lw=null;return bot('<div class="wkc"><b>'+esc(k.t)+"</b>"+(k.d?'<span class="wd">'+esc(k.d)+"</span>":"\n")+esc(k.s.join(" "))+"</div>",["📖 Short and kid-safe"],["Quiz me","Famous players","Fun fact"])}
 const k=first?take(d.s,430):0,part=d.s.slice(0,k).join(" ");lw={d,rest:d.s.slice(k)};
 const img=d.i?'<img src="'+esc(d.i)+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">':"";
 const chips=[];if(lw.rest.length)chips.push("Read more");d.r.forEach(t=>chips.push("Wikipedia: "+t));chips.push("Quiz me");
 bot('<div class="wkc">'+img+"<b>"+esc(d.t)+"</b>"+(d.d?'<span class="wd">'+esc(d.d)+"</span>":"\n")+esc(part)+"</div>",["📖 Wikipedia · CC BY-SA",'<a href="'+esc(d.u)+'" target="_blank" rel="noopener">Read the full article ↗</a>'],chips)}
function more(){const d=lw.d,k=take(lw.rest,520),part=lw.rest.slice(0,k).join(" ");lw.rest=lw.rest.slice(k);
 const chips=[];if(lw.rest.length)chips.push("Read more");d.r.forEach(t=>chips.push("Wikipedia: "+t));
 bot("<b>"+esc(d.t)+"</b> (continued)\n"+esc(part)+(lw.rest.length?"":"\n<i>That is the end of the summary — the full article has much more.</i>"),["📖 Wikipedia · CC BY-SA",'<a href="'+esc(d.u)+'" target="_blank" rel="noopener">Read the full article ↗</a>'],chips)}

/* ---------- main entry ---------- */
async function answer(topic,o){o=o||{};const key=nzs(topic);if(!key||key.length<2)return false;
 if(KIDON()&&!KID.wiki()){if(o.explicit)bot("Wikipedia is for bigger kids — but I know lots of chess! Try “How do pieces move?” or “Famous players”. 😊",null,["How do pieces move?","Famous players","Daily puzzle"]);return !!o.explicit}
 let d=cget(key),net=false;
 const w=d?null:bot('<i class="wait">Searching Wikipedia…</i>');
 if(!d){const r=await find(topic);if(r==="net")net=true;else if(r){d=r;cput(key,d)}}
 if(w&&w.parentNode)w.parentNode.remove();
 if(d){show(d,true);return true}
 if(o.explicit){bot(net?"I couldn't reach Wikipedia right now. Check your internet connection and try again.":"I couldn't find a reliable chess-related Wikipedia article for “"+esc(topic)+"”. Try the full name or a more specific term.",null,net?["Wikipedia: "+topic]:["Top players","Random opening","Chess tip"]);return true}
 return false}
async function fallback(v){const p=parse(v);return p.topic.length>1?await answer(p.topic,{}):false}

/* ---------- routing ---------- */
let sk=false;const _a=add;add=(r,t)=>{if(sk&&r=="user"){sk=false;return}_a(r,t)};
const prev=ask;
ask=async function(v){
 try{const n=v.trim();
  if(lw&&lw.rest.length&&/^(read more|wiki more)$/i.test(n)){add("user",v);return more()}
  const p=parse(n);
  if(p.explicit&&p.topic){add("user",v);return void await answer(p.topic,{explicit:true})}
  if(WF.test(n)&&p.topic.length>1&&ranked(fix(v))[0][0]<(/^who\s+(is|was)\b/i.test(n)?25:60)){add("user",v);if(await answer(p.topic,{}))return;sk=true}
  return prev(v)
 }catch(e){bot("Sorry, something went wrong while searching Wikipedia. Please try again.")}};
window.CHESSA.wiki={lookup:answer,fallback,parse,find,rank:rankPages,sents,clean};
})();
