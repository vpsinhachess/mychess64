/* MyChess64 rating maths (Elo-style, per puzzle phase).
 * Used by js/mc64-sync.js. Kept separate so the formula can be tuned in one place.
 *   update(R, opponent, score)  -> R is {r, n, pk}; score 1 = solved, 0 = missed. Returns the change.
 *   weighted(phases)            -> overall MCR: average of phase ratings weighted by puzzles played.
 *   title(r)                    -> player band name for a rating. */
(function (root) {
  'use strict';
  var MIN = 400, MAX = 3000, DEFAULT = 1000;
  var BANDS = [[0, 'Rookie'], [800, 'Novice'], [1100, 'Club player'], [1400, 'Tactician'],
    [1700, 'Expert'], [2000, 'Master'], [2300, 'Grandmaster']];

  function clamp(v) {
    v = +v; if (!isFinite(v)) v = DEFAULT;
    return Math.max(MIN, Math.min(MAX, Math.round(v)));
  }
  function kFactor(n) { return n < 10 ? 48 : n < 30 ? 32 : 20; }
  function expected(rating, opponent) { return 1 / (1 + Math.pow(10, (opponent - rating) / 400)); }
  function update(R, opponent, score) {
    var E = expected(R.r, opponent);
    var d = Math.round(kFactor(R.n) * (score - E));
    var next = clamp(R.r + d);
    d = next - R.r;
    R.r = next; R.n++;
    if (next > R.pk) R.pk = next;
    return d;
  }
  function weighted(phases) {
    var a = 0, b = 0;
    phases.forEach(function (P) { if (P && P.n > 0) { a += P.r * P.n; b += P.n; } });
    return b ? Math.round(a / b) : DEFAULT;
  }
  function title(r) {
    var t = BANDS[0][1];
    BANDS.forEach(function (x) { if (r >= x[0]) t = x[1]; });
    return t;
  }

  var API = { MIN: MIN, MAX: MAX, DEFAULT: DEFAULT, BANDS: BANDS, clamp: clamp, kFactor: kFactor, expected: expected, update: update, weighted: weighted, title: title };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.MC64RATING = API;
})(typeof window !== 'undefined' ? window : globalThis);
