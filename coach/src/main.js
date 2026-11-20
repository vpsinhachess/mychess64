// Public website entry point
import { initBackend, B } from './backend.js';
import { initPublic, draw } from './public.js';
import { seedDemo } from './sample.js';
import { D, hooks, load, PUBLIC_TABLES } from './state.js';

document.documentElement.classList.add('js'); window.__mc64 = true;
// A password-reset (or failed e-mail) link that landed on the website is forwarded to the Coach Portal, which handles it
if (/type=recovery|error_code=|demo_token=/.test(location.hash)) { location.replace('coach.html' + location.hash); }
else (async () => {
  await initBackend();
  hooks.render = () => draw();
  initPublic();
  await seedDemo();
  await load(PUBLIC_TABLES);
})();
