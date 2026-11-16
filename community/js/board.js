// Chess boards: FEN positions, PGN game replay (uses chess.js if it loaded).
const Board = (() => {
  const PIECE = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟", K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙" };
  const states = {};

  function boardEl(fen, flip) {
    const squares = [];
    fen.split(" ")[0].split("/").forEach((rank, r) => {
      let f = 0;
      for (const ch of rank) {
        if (/\d/.test(ch)) {
          for (let k = 0; k < Number(ch); k++) { squares.push({ p: "", dark: (r + f) % 2 === 1 }); f++; }
        } else {
          squares.push({ p: PIECE[ch] || "", dark: (r + f) % 2 === 1 });
          f++;
        }
      }
    });
    if (flip) squares.reverse();
    const grid = el("div", { class: "board", role: "img", "aria-label": "Chess board" });
    squares.forEach(s => grid.append(el("div", { class: "sq " + (s.dark ? "dk" : "lt") }, s.p)));
    return grid;
  }

  function fenFromText(text) {
    const m = (text || "").match(/([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+/);
    return m ? m[0] : null;
  }

  function looksLikePGN(text) {
    return /\[Event\s|\b1\.\s*[KQRBNOa-h]/.test(text || "");
  }

  function parsePGN(text) {
    if (typeof Chess === "undefined") return null;
    try {
      const game = new Chess();
      if (!game.load_pgn(text)) return null;
      const moves = game.history();
      const replay = new Chess();
      const fens = [replay.fen()];
      moves.forEach(m => { replay.move(m); fens.push(replay.fen()); });
      return { moves, fens };
    } catch (e) {
      return null;
    }
  }

  // Interactive replay: first/back/forward/last buttons, clickable move list, flip.
  function replay(key, pg, rerender) {
    const st = (states[key] = states[key] || { i: 0, flip: false });
    st.i = Math.max(0, Math.min(st.i, pg.moves.length));
    const go = n => () => { st.i = Math.max(0, Math.min(pg.moves.length, n)); rerender(); };
    const moveList = el("div", { class: "moves" });
    pg.moves.forEach((m, k) => {
      if (k % 2 === 0) moveList.append(el("span", { class: "mn" }, (k / 2 + 1) + "."));
      moveList.append(el("button", { class: "mv" + (st.i === k + 1 ? " on" : ""), onclick: go(k + 1) }, m), " ");
    });
    const label = st.i === 0 ? "Start position" : `Move ${Math.ceil(st.i / 2)} of ${Math.ceil(pg.moves.length / 2)}`;
    return el("div", { class: "replay" },
      boardEl(pg.fens[st.i], st.flip),
      el("div", { class: "ctl" },
        el("button", { onclick: go(0), "aria-label": "Start" }, "⏮"),
        el("button", { onclick: go(st.i - 1), "aria-label": "Back" }, "◀"),
        el("span", { class: "meta" }, label),
        el("button", { onclick: go(st.i + 1), "aria-label": "Forward" }, "▶"),
        el("button", { onclick: go(pg.moves.length), "aria-label": "End" }, "⏭"),
        el("button", { onclick: () => { st.flip = !st.flip; rerender(); } }, "⇅ Flip")),
      moveList);
  }

  return { boardEl, fenFromText, looksLikePGN, parsePGN, replay };
})();
