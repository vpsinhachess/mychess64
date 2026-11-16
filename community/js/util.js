// Small DOM and formatting helpers. All user text goes through textContent, never innerHTML.
function $(sel) { return document.querySelector(sel); }

function el(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === null || v === false) continue;
    if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (k === "class") node.className = v;
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  kids.flat().forEach(k => {
    if (k !== undefined && k !== null && k !== false && k !== "") node.append(k);
  });
  return node;
}

function ago(iso) {
  if (!iso) return "";
  const s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

// Light formatting: **bold**, `code`, and lines starting with "> " are quotes.
function rich(text) {
  const box = el("div", { class: "body" });
  (text || "").split("\n").forEach(line => {
    const isQuote = line.startsWith("> ");
    const p = el(isQuote ? "blockquote" : "div", {});
    const src = isQuote ? line.slice(2) : line;
    src.split(/(\*\*[^*]+\*\*|`[^`]+`)/).forEach(seg => {
      if (/^\*\*.+\*\*$/.test(seg)) p.append(el("strong", {}, seg.slice(2, -2)));
      else if (/^`.+`$/.test(seg)) p.append(el("code", {}, seg.slice(1, -1)));
      else seg.split(/(@[A-Za-z0-9_]{1,32})/).forEach(part =>
        /^@[A-Za-z0-9_]{1,32}$/.test(part) ? p.append(el("span", { class: "mention" }, part)) : p.append(part));
    });
    box.append(p);
  });
  return box;
}

let flashTimer = null;
function flash(msg, ms = 3000) {
  const n = $("#note");
  if (!n) return;
  n.textContent = msg;
  n.classList.add("show");
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => n.classList.remove("show"), ms);
}
