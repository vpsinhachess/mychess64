/* Chess engine: Stockfish (strong, from CDN) with a built-in fallback search. Needs chess.js. */
(()=>{
const VAL={p:100,n:320,b:330,r:500,q:900,k:0};
const ev=g=>{let s=0;g.board().forEach(r=>r.forEach(p=>{if(p)s+=(p.color==='w'?1:-1)*VAL[p.type]}));return s};
const nega=(g,d,a,b)=>{if(g.in_checkmate())return -99999-d;if(g.in_draw())return 0;if(!d)return(g.turn()==='w'?1:-1)*ev(g);
 const ms=g.moves({verbose:true}).sort((x,y)=>(y.captured?VAL[y.captured]:0)-(x.captured?VAL[x.captured]:0));
 for(const m of ms){g.move(m);const v=-nega(g,d-1,-b,-a);g.undo();if(v>a)a=v;if(a>=b)break}return a};
const search=(fen,d)=>{const g=new Chess(fen);let best=null,a=-1e6;
 for(const m of g.moves({verbose:true})){g.move(m);const v=-nega(g,d-1,-1e6,-a);g.undo();if(v>a||!best){a=v;best=m}}
 return best&&{from:best.from,to:best.to,promo:best.promotion}};
let sf=null,cb=null,tried=0;
const init=()=>{if(tried)return;tried=1;try{const u='https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js';
 sf=new Worker(URL.createObjectURL(new Blob(["importScripts('"+u+"')"],{type:'application/javascript'})));
 sf.onmessage=e=>{const l=String(e.data);if(l.indexOf('bestmove')===0&&cb){const m=l.split(' ')[1],f=cb;cb=null;if(m&&m!=='(none)')f({from:m.slice(0,2),to:m.slice(2,4),promo:m[4]})}};
 sf.onerror=()=>{sf=null};sf.postMessage('uci')}catch(e){sf=null}};
window.Engine={
 san(fen,m){const g=new Chess(fen),r=g.move({from:m.from,to:m.to,promotion:m.promo||'q'});return r?r.san:m.from+m.to},
 best(fen,done,depth){if(typeof Chess==='undefined')return done(null);init();let fin=false;
  const end=r=>{if(fin)return;fin=true;clearTimeout(t);cb=null;done(r)};
  const t=setTimeout(()=>end(search(fen,3)),sf?4000:50);
  if(sf){cb=end;sf.postMessage('ucinewgame');sf.postMessage('position fen '+fen);sf.postMessage('go depth '+(depth||12))}},
 quick:fen=>search(fen,3)};
})();
