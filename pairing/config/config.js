/* ===================================================================
   MyChess64 Tournament Manager - settings
   This is the only file you normally need to edit.
   =================================================================== */
window.MYCHESS64={

  /* Your website. Share links and footer links use it. */
  SITE_URL:"https://www.mychess64.com",
  APP_PATH:"/pairing/",

  /* The app starts ONLY on these addresses. Anywhere else it shows a notice
     and does not connect to the database. */
  ALLOWED_HOSTS:["www.mychess64.com"],

  /* These addresses are sent on to SITE_URL automatically. */
  REDIRECT_HOSTS:["mychess64.com"],

  /* Set true only while testing on your own computer (http://localhost:...). */
  ALLOW_LOCALHOST:false,

  /* false = the app refuses to run inside an iframe on another website. */
  ALLOW_EMBED:false,

  /* Firebase Realtime Database URL (no trailing slash needed). */
  FIREBASE_URL:"https://mychess64-25df9-default-rtdb.asia-southeast1.firebasedatabase.app"
};

/* kept for compatibility with older code */
window.FIREBASE_URL=window.MYCHESS64.FIREBASE_URL;
