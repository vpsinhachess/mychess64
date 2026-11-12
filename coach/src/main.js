// Public website entry point
import { initBackend, B } from './backend.js';
import { initPublic, draw } from './public.js';
import { seedDemo } from './sample.js';
import { D, hooks, load, PUBLIC_TABLES } from './state.js';

document.documentElement.classList.add('js'); window.__mc64 = true;
(async () => {
  await initBackend();
  hooks.render = () => draw();
  initPublic();
  await seedDemo();
  await load(PUBLIC_TABLES);
})();
