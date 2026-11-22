// Build: node build.mjs  ->  writes ./dist (minified, bundled, ready to deploy)
import fs from 'fs'; import path from 'path'; import {createRequire} from 'module'; const csso=createRequire(import.meta.url)('csso');
import {minify} from 'terser'; import {minify as minHtml} from 'html-minifier-terser';
const out='dist', order=['piece-set','core','pieces','audio','effects','board','rules','mate','exchange','topics','profile','puzzles','hero','main'];
fs.rmSync(out,{recursive:true,force:true});
for(const d of ['css','js','assets/img']) fs.mkdirSync(path.join(out,d),{recursive:true});
const terser=async(code)=>(await minify(code,{compress:{passes:2},mangle:true,format:{comments:false}})).code; // top-level names kept (classic scripts share scope)
// JS: one bundle (+ lazy PDF module)
const bundle=order.map(n=>fs.readFileSync(`js/${n}.js`,'utf8')).join('\n;\n');
fs.writeFileSync(`${out}/js/app.min.js`,await terser(bundle));
fs.writeFileSync(`${out}/js/pdf.min.js`,await terser(fs.readFileSync('js/pdf.js','utf8')));
// CSS
fs.writeFileSync(`${out}/css/style.min.css`,csso.minify(fs.readFileSync('css/style.css','utf8')).css);
// assets
for(const f of fs.readdirSync('assets/img')) fs.copyFileSync(`assets/img/${f}`,`${out}/assets/img/${f}`);
// HTML
let html=fs.readFileSync('index.html','utf8')
  .replace(/<script defer src="js\/[^"]+"><\/script>\s*/g,'')
  .replace('css/style.css','css/style.min.css')
  .replace('</body>','<script>window.__PDF_SRC="js/pdf.min.js"</script><script defer src="js/app.min.js"></script></body>')
  .replace('<link rel="stylesheet" href="css/style.min.css">','<link rel="preload" href="js/app.min.js" as="script">\n<link rel="stylesheet" href="css/style.min.css">');
fs.writeFileSync(`${out}/index.html`,await minHtml(html,{collapseWhitespace:true,removeComments:true,minifyCSS:true,minifyJS:true,keepClosingSlash:true}));
console.log('built');
