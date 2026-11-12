/* ===================================================================
   MyChess64 settings – the ONLY file you normally need to edit.
   (Plain script, so the site also works when index.html is opened
   straight from a folder.)
   =================================================================== */

// 1) Supabase keys: Project Settings → API (README, Step 2).
//    While they still say PASTE… the site runs in DEMO MODE
//    (data saved only in the visitor's own browser).
window.MC64_SUPABASE = {
  url: "PASTE_YOUR_SUPABASE_URL",        // e.g. https://abcdxyz.supabase.co
  anonKey: "PASTE_YOUR_ANON_PUBLIC_KEY"  // the "anon / public" key (safe to publish)
};

// 2) Optional contact details & email alerts (leave '' to hide)
window.MC64_SITE = {
  whatsapp: '',   // digits only with country code, e.g. '919876543210' -> floating WhatsApp button
  phone: '',      // e.g. '+91 98765 43210'
  email: '',      // e.g. 'hello@mychess64.com'
  address: '',    // e.g. 'Patna, Bihar'
  // Optional: also e-mail every demo request / coach application to you (free key from web3forms.com)
  web3formsKey: 'd45fca8a-c796-49d4-84b0-383d5cad3d23'
};
