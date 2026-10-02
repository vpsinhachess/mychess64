/* MyChess64 service worker. Change VERSION whenever you update any file, so users get the new files. */
const VERSION='mychess64-v1';
const FILES=["./", "index.html", "logo.png", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "student-tracker.html", "chess-training-board.html", "live-game-play.html", "find-the-squares.html", "name-the-squares.html", "identify-the-chess-pieces.html", "set-the-chess-board.html", "opening-explorer.html", "digital-chess-clock.html", "play-with-computer-and-friend.html", "chess-learning-videos.html", "upcoming-chess-tournaments-in-india.html", "world-chess-champions.html", "grand-masters-of-india.html", "free-chess-softwares.html", "chess-news.html", "free-chess-books.html", "useful-chess-websites.html", "chess-tournament-pairing.html", "online-chess-tournament.html", "analysis-board.html"];

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
