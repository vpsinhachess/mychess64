// Entry point
import { initBackend, B } from './backend.js';
import { initPublic } from './public.js';
import { initPanel, sample } from './panel.js';
import { D, hooks, diag, ls } from './state.js';

document.documentElement.classList.add('js'); window.__mc64 = true;
(async () => {
  await initBackend();
  B.onErr = (col, e) => diag('Database problem reading “' + col + '” (' + (e.code || e.message) + '). Check that Firestore is created and firestore.rules are published (README step 2).');
  initPublic();
  initPanel();
  ['coaches', 'reviews', 'classes', 'seatlog'].forEach(col => B.sub(col, rows => {
    D[col] = rows; hooks.render();
    // Demo mode only: fill the empty site with sample coaches once, so the design is visible
    if (col === 'coaches' && B.mode === 'demo' && !rows.length && !ls.get('mc64_seeded')) {
      ls.set('mc64_seeded', '1'); sample();
    }
  }));
})();
