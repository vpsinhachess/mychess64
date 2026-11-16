// Run by GitHub Actions every week:  node scripts/update-events.mjs
// Sources: AICF All Events table (main) and FIDE calendar (India events, best-effort).
// A failing source NEVER wipes data: the last good events of that source are kept and the error is recorded in meta.
import fs from "node:fs";
import * as cheerio from "cheerio";
import { parsePlace } from "./geo.mjs";

const OUT = "data/events.json";
const AICF_URL = process.env.AICF_URL || "https://aicf.in/all-events/";
const FIDE_URL = process.env.FIDE_URL || "https://calendar.fide.com/";
const UA = "MyChess64-EventBot/1.0 (+https://www.mychess64.com)";
const now = new Date().toISOString();
const todayIso = now.slice(0, 10);
const cutoff = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(url) {
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": UA, accept: "text/html" }, signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.text();
    } catch (e) { if (i >= 2) throw e; await sleep(4000 * (i + 1)); }
  }
}
const pad = n => String(n).padStart(2, "0");
const iso = (d, m, y) => `${y}-${pad(m)}-${pad(d)}`;
const valid = s => { const d = new Date(s + "T00:00:00Z"); return !isNaN(d) && d.toISOString().slice(0, 10) === s; };
const parts = s => { const m = (s || "").match(/(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})/); return m ? [+m[1], +m[2], +m[3]] : null };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const txt = s => String(s || "").replace(/\s+/g, " ").trim();
function inferFormat(t) {
  const n = t.toLowerCase();
  if (/\bnational\b/.test(n)) return "National";
  if (n.includes("blitz")) return "Blitz";
  if (n.includes("rapid")) return "Rapid";
  return "Classical";
}
const safeUrl = (h, base) => { try { const u = new URL(h, base); return /^https?:$/.test(u.protocol) ? u.href : "" } catch { return "" } };

async function aicf() {
  const $ = cheerio.load(await get(AICF_URL));
  const out = [];
  $("table tr").each((_, tr) => {
    const td = $(tr).find("td");
    if (td.length < 5) return;
    const t = i => txt($(td[i]).text());
    const title = t(0), code = t(1), place = t(4);
    const sp = parts(t(2)), ep = parts(t(3));
    if (!title || !code || !sp) return;
    const start = iso(sp[0], sp[1], sp[2]);
    if (!valid(start)) return;
    let end = ep && valid(iso(ep[0], ep[1], ep[2])) ? iso(ep[0], ep[1], ep[2]) : null, fix = false;
    if (!end || end < start) {            // source typo, e.g. 02-05-2026 → 03-02-2026
      fix = true;
      const alt = ep ? iso(ep[0], sp[1], sp[2]) : null;
      end = alt && valid(alt) && alt >= start ? alt : start;
    }
    const links = $(tr).find("a[href]").map((_, a) => $(a).attr("href")).get();
    const b = links.find(h => /\.pdf(\?|$)/i.test(h)) || links[links.length - 1] || "";
    const e = { source: "aicf", id: `aicf-${slug(code)}-${start}`, title, code, start, end, place, ...parsePlace(place), format: inferFormat(title), brochure: safeUrl(b, AICF_URL) };
    if (fix) e.fix = true;
    out.push(e);
  });
  return out;
}

const MON = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
async function fide() {                      // best-effort text parser for "03 Apr - 23 Apr / Toronto (CAN)"
  const $ = cheerio.load(await get(FIDE_URL));
  $("script,style").remove();
  const lines = $("body").text().split(/\n+/).map(txt).filter(Boolean);
  const y = +((lines.join(" ").match(/Calendar\s+(20\d\d)/) || [])[1] || new Date().getFullYear());
  const re = /^(\d{1,2})\s+([A-Za-z]{3})\s*-\s*(\d{1,2})\s+([A-Za-z]{3})\s*\/\s*(.+?)\s*\(([A-Z]{3})\)$/;
  const out = [];
  lines.forEach((l, i) => {
    const m = l.match(re);
    if (!m || i === 0) return;
    const [, d1, m1, d2, m2, city, cc] = m;
    if (cc !== "IND" && !process.env.FIDE_ALL) return;
    const a = MON[m1.toLowerCase()], b = MON[m2.toLowerCase()];
    if (!a || !b) return;
    const start = iso(+d1, a, y), end = iso(+d2, b, b < a ? y + 1 : y);
    if (!valid(start) || !valid(end)) return;
    const title = lines[i - 1];
    out.push({ source: "fide", id: `fide-${slug(title)}-${start}`, title, code: "FIDE", start, end, place: `${city}, ${cc}`, ...parsePlace(city), format: inferFormat(title), brochure: "" });
  });
  return out;
}

const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { events: [], meta: {} };
const meta = { updated: now, sources: {} }, res = {};
const old = s => (prev.events || []).filter(e => e.source === s);

async function run(name, fn, min) {
  try {
    const seen = new Set();
    const list = (await fn()).filter(e => e.end >= cutoff && !seen.has(e.id) && seen.add(e.id));
    const before = old(name).filter(e => e.end >= todayIso).length;
    const upcoming = list.filter(e => e.end >= todayIso).length;
    if (list.length < min || (before >= 10 && upcoming < before * 0.5))
      throw new Error(`suspicious result: ${upcoming} upcoming rows now vs ${before} before`);
    res[name] = list;
    meta.sources[name] = { ok: true, count: list.length, at: now };
    console.log(name, "ok:", list.length, "rows");
  } catch (e) {
    console.error(name, "FAILED:", e.message);
    res[name] = old(name);
    meta.sources[name] = { ok: false, count: res[name].length, at: prev.meta?.sources?.[name]?.at || null, error: String(e.message).slice(0, 200) };
  }
}
await run("aicf", aicf, 10);
await run("fide", fide, 0);
if (!meta.sources.aicf.ok) meta.updated = prev.meta?.updated || now;   // do not claim freshness if the main source failed

const events = [...res.aicf, ...res.fide].sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ meta, events }, null, 1) + "\n");
console.log("written", events.length, "events");
if (!meta.sources.aicf.ok) process.exit(1);   // fail the workflow so GitHub emails you
