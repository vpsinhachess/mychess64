/* MyChess64 service worker. Change VERSION whenever you update any file, so users get the new files. */
const VERSION='mychess64-v6';
const FILES=["./", "index.html", "logo.png", "manifest.json", "icon-192.png", "icon-512.png", "play-with-computer-and-friend.html", "live-game-play.html", "ask-chessa.html", "find-the-squares.html", "name-the-squares.html", "identify-the-chess-pieces.html", "set-the-chess-board.html", "opening-explorer.html", "chess-rules.html", "free-chess-books.html", "free-chess-softwares.html", "useful-chess-websites.html", "play-custom-position.html", "chess-training-board.html", "analysis-board.html", "chess-scanner.html", "student-tracker.html", "upcoming-chess-tournaments-in-india.html", "online-chess-tournament.html", "chess-tournament-pairing.html", "grand-masters-of-india.html", "india-chess-medals.html", "medal-winners-india.html", "world-chess-champions.html", "women-champions.html", "chess-news.html", "chess-learning-videos.html", "digital-chess-clock.html", "search-fide-rating.html"];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
/* Show the saved copy at once, and refresh it from the network in the background. */
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{
      if(res&&res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(r,copy))}
      return res;
    }).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):undefined));
    return hit||net;
  }));
});
