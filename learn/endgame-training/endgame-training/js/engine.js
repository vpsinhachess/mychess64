/* Stockfish 19 wrapper (UCI over a Web Worker).
   API (all return Promises, never reject):
     SF.ready()                      -> Promise<boolean>   true when Stockfish is usable
     SF.best(fen, {ms, prio})        -> Promise<{move, from, to, promotion, cp, mate} | null>
   One search runs at a time. A newer request of equal/higher priority stops the running one
   (the stopped request resolves to null). prio: 2 = move/hint (never cancelled by evals), 1 = eval bar. */
(function (root) {
  "use strict";
  var C = root.MC64_CONFIG.engine, worker = null, failed = false, ok = false, readyP = null;
  var running = null, pending = null, lineHook = null;

  function post(c) { try { worker.postMessage(c); } catch (e) {} }

  function fail(why) {
    if (failed) return; failed = true; ok = false;
    try { if (worker) worker.terminate(); } catch (e) {}
    worker = null; var r = running, p = pending; running = pending = null;
    if (r) r.resolve(null); if (p) p.resolve(null);
    try { console.warn("[MC64] Stockfish unavailable:", why); } catch (e) {}
  }

  function onLine(l) {
    if (typeof l !== "string") { if (l && typeof l.data === "string") l = l.data; else return; }
    if (lineHook) lineHook(l);
    if (!running) return;
    if (l.indexOf("info ") === 0 && l.indexOf(" score ") > 0 && l.indexOf(" multipv ") < 0 || l.indexOf(" multipv 1 ") > 0) {
      var m = / score (cp|mate) (-?\d+)/.exec(l);
      if (m && l.indexOf("lowerbound") < 0 && l.indexOf("upperbound") < 0) running.last = { t: m[1], v: +m[2] };
    } else if (l.indexOf("bestmove") === 0) {
      var j = running; running = null;
      var mv = l.split(/\s+/)[1];
      if (j.cancelled || !mv || mv === "(none)" || mv === "0000") j.resolve(j.cancelled ? null : (j.last ? { move: null, cp: j.last.t === "cp" ? j.last.v : null, mate: j.last.t === "mate" ? j.last.v : null } : null));
      else j.resolve({
        move: mv, from: mv.slice(0, 2), to: mv.slice(2, 4), promotion: mv.length > 4 ? mv[4] : undefined,
        cp: j.last && j.last.t === "cp" ? j.last.v : null, mate: j.last && j.last.t === "mate" ? j.last.v : null
      });
      pump();
    }
  }

  function pump() {
    if (running || !pending || !ok) return;
    running = pending; pending = null;
    post("position fen " + running.fen);
    post("go movetime " + running.ms);
  }

  function start() {
    if (readyP) return readyP;
    readyP = new Promise(function (resolve) {
      if (typeof Worker === "undefined") { fail("no Worker support"); return resolve(false); }
      var timer = setTimeout(function () { fail("load timeout"); resolve(false); }, C.loadTimeoutMs);
      try { worker = new Worker(C.file); } catch (e) { clearTimeout(timer); fail(e); return resolve(false); }
      worker.onerror = function (e) { clearTimeout(timer); fail(e && e.message || "worker error"); resolve(false); };
      worker.onmessage = function (ev) { onLine(ev.data); };
      var stage = 0;
      lineHook = function (l) {
        if (stage === 0 && l === "uciok") {
          stage = 1;
          post("setoption name Threads value 1");
          post("setoption name Hash value " + C.level.hash);
          post("setoption name UCI_LimitStrength value false");   // never weakened
          post("setoption name Skill Level value " + C.level.skill); // 20 = Hard
          post("setoption name MultiPV value 1");
          post("isready");
        } else if (stage === 1 && l === "readyok") {
          stage = 2; clearTimeout(timer); ok = true; lineHook = null; resolve(true); pump();
        }
      };
      post("uci");
    });
    return readyP;
  }

  function best(fen, o) {
    o = o || {};
    return new Promise(function (resolve) {
      if (failed) return resolve(null);
      var job = { fen: fen, ms: o.ms || C.level.moveTimeMs, prio: o.prio || 2, resolve: resolve, last: null, cancelled: false };
      start();
      if (pending) {
        if (pending.prio > job.prio) return resolve(null);   // never replace a move request with an eval
        pending.resolve(null);
      }
      pending = job;
      if (running && running.prio <= job.prio) { running.cancelled = true; post("stop"); }
      pump();
    });
  }

  root.SF = { ready: start, best: best, failed: function () { return failed; }, info: "Stockfish 19 · Hard" };
})(window);
