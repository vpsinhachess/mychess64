/* ===================================================================
   MyChess64 settings – the ONLY file you normally need to edit.
   (Plain script, so the site also works when index.html is opened
   straight from a folder.)
   =================================================================== */

// 1) Supabase keys: Project Settings → API (README, Step 2).
//    While they still say PASTE… the site runs in DEMO MODE
//    (data saved only in the visitor's own browser).
window.MC64_SUPABASE = {
  url: "https://sifiuyrqaxfgibahqtpv.supabase.co",        // e.g. https://abcdxyz.supabase.co
  anonKey: "sb_publishable_FcWUPVQ2jYZO3Z6hl6cXww__-F2zBqt"  // the "anon / public" key (safe to publish)
};

// 2) Optional contact details & email alerts (leave '' to hide)
window.MC64_SITE = {
  whatsapp: '',   // digits only with country code, e.g. '917004186712' -> floating WhatsApp button
  phone: '',      // e.g. '+91 70041 86712'
  email: '',      // e.g. 'mychess64.com@gmail.com'
  address: '',    // e.g. 'Patna, Bihar, India'
  // Optional: also e-mail every demo request / coach application to you (free key from web3forms.com)
  web3formsKey: 'd45fca8a-c796-49d4-84b0-383d5cad3d23'
};
