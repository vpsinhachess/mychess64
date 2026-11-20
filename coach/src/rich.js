// Safe rich text for the "About me" box: whitelist sanitizer + toolbar markup (no dependencies).
// Stored value = small sanitized HTML (p, br, b, strong, i, em, u, ul, ol, li, h3, h4, blockquote, a[http/https]).
const ALLOWED = new Set(['P', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'UL', 'OL', 'LI', 'H3', 'H4', 'BLOCKQUOTE', 'A']);
const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'MATH', 'FORM', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT']);
export const BIO_MAX = 1500;
const esc = s => String(s).replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');

function walk(node) {
  let out = '';
  node.childNodes.forEach(n => {
    if (n.nodeType === 3) { out += esc(n.nodeValue); return; }
    if (n.nodeType !== 1) return;
    const t = n.tagName.toUpperCase(); if (DROP.has(t)) return;
    const inner = walk(n);
    if (t === 'DIV') out += '<p>' + inner + '</p>';                       // line wrappers made by contenteditable
    else if (t === 'BR') out += '<br>';
    else if (t === 'A') { const h = n.getAttribute('href') || ''; out += /^https?:\/\//i.test(h) ? `<a href="${esc(h)}" target="_blank" rel="noopener noreferrer nofollow">${inner}</a>` : inner; }
    else if (ALLOWED.has(t)) { const l = t.toLowerCase(); out += `<${l}>${inner}</${l}>`; }
    else out += inner;                                                    // unwrap span, font, etc. (attributes/styles are dropped)
  });
  return out;
}
export function cleanHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString('<body>' + html, 'text/html');
  let out = walk(doc.body).replace(/(<p><br><\/p>\s*){2,}/g, '<p><br></p>').trim();
  return out === '<p><br></p>' ? '' : out;
}
const hasTags = s => /<\/?(p|br|b|strong|i|em|u|ul|ol|li|h3|h4|blockquote|a|div)\b/i.test(s);
/** HTML safe to inject (handles old plain-text bios too) */
export const renderBio = bio => { bio = String(bio || ''); return hasTags(bio) ? cleanHtml(bio) : esc(bio).replace(/\n/g, '<br>'); };
/** one-line plain text (cards, previews, length checks) */
export function plainText(bio) {
  const html = renderBio(bio).replace(/<\/(p|li|h3|h4|blockquote)>|<br>/gi, ' $&');
  return (new DOMParser().parseFromString('<body>' + html, 'text/html').body.textContent || '').replace(/\s+/g, ' ').trim();
}

const BTN = [['bold', '<b>B</b>', 'Bold (Ctrl+B)'], ['italic', '<i>I</i>', 'Italic (Ctrl+I)'], ['underline', '<u>U</u>', 'Underline (Ctrl+U)'], ['|'], ['heading', 'H', 'Heading'], ['ul', '• List', 'Bulleted list'], ['ol', '1. List', 'Numbered list'], ['quote', '❝', 'Quote'], ['|'], ['br', '↵', 'Line break (Shift+Enter)'], ['link', '🔗', 'Add link'], ['clear', 'Tx', 'Clear formatting'], ['|'], ['undo', '↶', 'Undo'], ['redo', '↷', 'Redo']];
export function editorHTML(id, bio) {
  return `<div class="rte-wrap"><div class="rte-bar" onmousedown="event.preventDefault()" role="toolbar" aria-label="Text formatting">${BTN.map(b => b[0] === '|' ? '<span class="sep"></span>' : `<button type="button" data-c="${b[0]}" title="${b[2]}" aria-label="${b[2]}" onclick="ui.fmt('${b[0]}')">${b[1]}</button>`).join('')}</div>
<div id="${id}" class="rte" contenteditable="true" role="textbox" aria-multiline="true" data-ph="Tell students about your coaching style, achievements and who you teach…" oninput="ui.pv()" onkeyup="ui.tbState()" onmouseup="ui.tbState()" onpaste="ui.paste(event)">${renderBio(bio)}</div>
<div class="rte-foot"><span id="${id}_n">0 / ${BIO_MAX}</span><span>Enter = new paragraph · Shift+Enter = line break</span></div></div>`;
}
