// MyChess64 build step: copies the site into dist/ and protects it on the way.
//   .html  -> minified (inline CSS and JS minified too)
//   .css   -> minified
//   .js    -> minified, then obfuscated (files ending in .min.js are copied as they are)
//   others -> copied unchanged (images, fonts, APK, CNAME, manifest, ...)
//
// Settings (environment variables):
//   OBFUSCATE=0   skip obfuscation (minify only), handy while debugging
//   OUT_DIR=dist  output folder

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { minify as minifyHtml } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import { minify as terser } from 'terser';
import JavaScriptObfuscator from 'javascript-obfuscator';

const ROOT = process.cwd();
const OUT = path.resolve(ROOT, process.env.OUT_DIR || 'dist');
const OBFUSCATE = process.env.OBFUSCATE !== '0';

const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'scripts', path.basename(OUT)]);
const SKIP_FILES = new Set(['package.json', 'package-lock.json', '.gitignore', 'README.md', 'LICENSE']);

// Keep global names intact (renameGlobals: false) because HTML attributes such as
// onclick="..." call functions by name.
const OBFUSCATOR_OPTIONS = {
  compact: true,
  simplify: true,
  target: 'browser',
  sourceMap: false,
  renameGlobals: false,
  identifierNamesGenerator: 'hexadecimal',
  stringArray: true,
  stringArrayThreshold: 0.75,
  stringArrayEncoding: ['base64'],
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
};

const stats = { html: 0, css: 0, js: 0, copied: 0, saved: 0 };

function warn(msg) {
  // Shows up as a yellow annotation in the GitHub Actions run.
  console.log(`::warning::${msg}`);
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) && path.dirname(full) === ROOT) continue;
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      yield* walk(full);
    } else if (entry.isFile()) {
      if (path.dirname(full) === ROOT && SKIP_FILES.has(entry.name)) continue;
      yield full;
    }
  }
}

async function processHtml(src) {
  const input = await fs.readFile(src, 'utf8');
  try {
    return await minifyHtml(input, {
      collapseWhitespace: true,
      conservativeCollapse: true, // keep one space where whitespace matters
      removeComments: true,
      minifyCSS: true,
      minifyJS: { compress: true, mangle: true, format: { comments: false } },
    });
  } catch (err) {
    warn(`HTML minify failed for ${path.relative(ROOT, src)}; published unminified. ${err.message}`);
    return input;
  }
}

async function processCss(src) {
  const input = await fs.readFile(src, 'utf8');
  const out = new CleanCSS({ level: 1 }).minify(input);
  if (out.errors.length) {
    warn(`CSS minify failed for ${path.relative(ROOT, src)}; copied as is. ${out.errors[0]}`);
    return input;
  }
  return out.styles;
}

async function processJs(src) {
  const input = await fs.readFile(src, 'utf8');
  try {
    const min = await terser(input, { compress: true, mangle: true, format: { comments: false } });
    let code = min.code ?? input;
    if (OBFUSCATE) {
      code = JavaScriptObfuscator.obfuscate(code, OBFUSCATOR_OPTIONS).getObfuscatedCode();
    }
    return code;
  } catch (err) {
    warn(`JS processing failed for ${path.relative(ROOT, src)}; copied as is. ${err.message}`);
    return input;
  }
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  for await (const src of walk(ROOT)) {
    const rel = path.relative(ROOT, src);
    const dest = path.join(OUT, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });

    const ext = path.extname(src).toLowerCase();
    const before = (await fs.stat(src)).size;
    let text = null;

    if (ext === '.html' || ext === '.htm') { text = await processHtml(src); stats.html++; }
    else if (ext === '.css') { text = await processCss(src); stats.css++; }
    else if (ext === '.js' && !src.endsWith('.min.js')) { text = await processJs(src); stats.js++; }

    if (text === null) {
      await fs.copyFile(src, dest);
      stats.copied++;
    } else {
      await fs.writeFile(dest, text, 'utf8');
      stats.saved += before - Buffer.byteLength(text);
    }
  }

  console.log(
    `Built ${OUT}\n  html: ${stats.html}, css: ${stats.css}, js: ${stats.js}, copied: ${stats.copied}\n` +
    `  saved ${(stats.saved / 1024).toFixed(1)} KB (obfuscation ${OBFUSCATE ? 'on' : 'off'})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
