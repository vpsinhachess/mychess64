(() => {
  // src/backend.js
  var cfg = window.MC64_FIREBASE || {};
  var B = {};
  var LIVE = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith("PASTE");
  async function sha(s) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("mc64:" + s));
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function firebase() {
    const base = "https://www.gstatic.com/firebasejs/10.12.2/";
    const [A, Au, F] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-firestore.js")]);
    const app = A.initializeApp(cfg), auth = Au.getAuth(app), fs = F.getFirestore(app);
    return {
      mode: "firebase",
      sub(col, cb, q) {
        let ref = F.collection(fs, col);
        if (q) ref = F.query(ref, F.where(q[0], "==", q[1]));
        return F.onSnapshot(ref, (s) => cb(s.docs.map((d) => ({ ...d.data(), id: d.id }))), (e) => {
          console.warn("[" + col + "]", e.code);
          B.onErr && B.onErr(col, e);
        });
      },
      set: (col, id, o) => F.setDoc(F.doc(fs, col, id), o),
      remove: (col, id) => F.deleteDoc(F.doc(fs, col, id)),
      async submit(id, o, seatCls) {
        const b = F.writeBatch(fs);
        b.set(F.doc(fs, "requests", id), o);
        if (seatCls) b.set(F.doc(fs, "seatlog", id), { cls: seatCls, ts: o.ts });
        await b.commit();
      },
      login: (e, p) => Au.signInWithEmailAndPassword(auth, e, p).then((r) => r.user.uid),
      logout: () => Au.signOut(auth),
      reset: (e) => Au.sendPasswordResetEmail(auth, e),
      onAuth: (cb) => Au.onAuthStateChanged(auth, async (u) => {
        if (!u) return cb(null);
        let role = null, err = "";
        try {
          if ((await F.getDoc(F.doc(fs, "admins", u.uid))).exists()) role = "admin";
          else if ((await F.getDoc(F.doc(fs, "coaches", u.uid))).exists()) role = "coach";
        } catch (e) {
          console.warn(e);
          err = e.code || e.message;
        }
        cb({ uid: u.uid, email: u.email, role, err });
      }),
      // creates a login for a coach WITHOUT signing the admin out (uses a throw-away second app)
      async createUser(email, pw) {
        const sec = A.initializeApp(cfg, "sec" + Date.now()), sa = Au.getAuth(sec);
        try {
          const r = await Au.createUserWithEmailAndPassword(sa, email, pw);
          await Au.signOut(sa);
          return r.user.uid;
        } finally {
          await A.deleteApp(sec);
        }
      }
    };
  }
  function demo() {
    const K = "mc64_demo_v3", subs = [], listeners = [];
    let st2;
    try {
      st2 = JSON.parse(localStorage.getItem(K));
    } catch (e) {
    }
    st2 = st2 || { data: {}, acc: [] };
    const save = () => {
      try {
        localStorage.setItem(K, JSON.stringify(st2));
      } catch (e) {
      }
    };
    const arr = (c) => st2.data[c] = st2.data[c] || [];
    const fire = (c) => subs.filter((s) => s.c === c).forEach((s) => s.run());
    let session = null;
    try {
      session = sessionStorage.getItem("mc64_s");
    } catch (e) {
    }
    const emit = () => {
      const a = st2.acc.find((x) => x.uid === session);
      listeners.forEach((f) => f(a ? { uid: a.uid, email: a.email, role: a.role } : null));
    };
    const impl = {
      mode: "demo",
      sub(c, cb, q) {
        const s = { c, run: () => cb(arr(c).filter((x) => !q || x[q[0]] === q[1]).map((x) => ({ ...x }))) };
        subs.push(s);
        setTimeout(s.run);
        return () => subs.splice(subs.indexOf(s), 1);
      },
      async set(c, id, o) {
        const a = arr(c), i = a.findIndex((x) => x.id === id), v = { ...o, id };
        i < 0 ? a.push(v) : a[i] = v;
        save();
        fire(c);
      },
      async remove(c, id) {
        st2.data[c] = arr(c).filter((x) => x.id !== id);
        save();
        fire(c);
      },
      async submit(id, o, cls) {
        await impl.set("requests", id, o);
        if (cls) await impl.set("seatlog", id, { cls, ts: o.ts });
      },
      async login(e, p) {
        const a = st2.acc.find((x) => x.email === e.toLowerCase());
        if (!a || a.hash !== await sha(a.uid + p)) throw new Error("bad");
        session = a.uid;
        try {
          sessionStorage.setItem("mc64_s", session);
        } catch (x) {
        }
        emit();
        return a.uid;
      },
      async logout() {
        session = null;
        try {
          sessionStorage.removeItem("mc64_s");
        } catch (x) {
        }
        emit();
      },
      async reset() {
        alert("Demo mode: password-reset emails need Firebase. Ask the admin to create a new account.");
      },
      onAuth(cb) {
        listeners.push(cb);
        setTimeout(emit);
      },
      async createUser(email, pw, forcedUid) {
        email = email.toLowerCase();
        if (st2.acc.some((x) => x.email === email)) throw { code: "auth/email-already-in-use" };
        const u = forcedUid || "u" + Date.now().toString(36);
        st2.acc.push({ uid: u, email, hash: await sha(u + pw), role: forcedUid === "admin1" ? "admin" : "coach" });
        save();
        return u;
      }
    };
    if (!st2.acc.some((a) => a.role === "admin")) impl.createUser("admin@mychess64.com", "admin123", "admin1");
    return impl;
  }
  async function initBackend() {
    let impl;
    if (LIVE) {
      try {
        impl = await firebase();
      } catch (e) {
        console.error("Firebase failed, using demo mode", e);
      }
    }
    Object.assign(B, impl || demo());
    return B;
  }

  // src/state.js
  var $ = (i) => document.getElementById(i);
  var esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
  var ls = { get(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }, set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
    }
  } };
  var uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  var ini = (n) => String(n || "?").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  var today = () => {
    const d = /* @__PURE__ */ new Date();
    return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  };
  var fd = (d) => (/* @__PURE__ */ new Date(d + "T00:00")).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  var tf = (t) => (/* @__PURE__ */ new Date("1970-01-01T" + t)).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  var strip = (o) => {
    const { id, ...r } = o;
    return r;
  };
  function toast(m, bad) {
    const t = $("ts");
    t.textContent = m;
    t.className = "toast on" + (bad ? " bad" : "");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.className = "toast", 4e3);
  }
  var COL = [["#0b6bde", "#19c3ff"], ["#c2410c", "#f59e0b"], ["#6d28d9", "#a78bfa"], ["#0f766e", "#2dd4bf"], ["#be185d", "#f472b6"], ["#1e3a8a", "#6366f1"]];
  var CATS = ["Kids", "Adults", "Tournament", "Openings"];
  function diag(m) {
    const b = $("fatal");
    if (!b) return;
    b.textContent = "\u26A0 " + m;
    b.style.display = "block";
  }
  var D = { coaches: [], reviews: [], classes: [], seatlog: [], requests: [], apps: [], coachPrivate: [] };
  var stat = (x) => {
    const rs = D.reviews.filter((r) => r.cid === x.id);
    return { n: rs.length, r: rs.length ? rs.reduce((a, b) => a + (+b.stars || 5), 0) / rs.length : 0 };
  };
  var seats = (c) => (+c.cap || 1) - D.seatlog.filter((s) => s.cls === c.id).length;
  var upcoming = (id) => D.classes.filter((c) => c.cid === id && c.date >= today()).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  // src/sample.js
  async function sample() {
    const d = (n) => {
      const t = /* @__PURE__ */ new Date();
      t.setDate(t.getDate() + n);
      return t.toISOString().slice(0, 10);
    };
    const S0 = [
      ["Aarav Sharma", "FIDE Master \xB7 2310", "Delhi", "Online", ["Kids", "Tournament"], 900, 12, 120, "English, Hindi", "Trained 120+ juniors; state-level medallists. Patient, structured lessons.", 0, "aarav@mychess64.com"],
      ["Priya Nair", "WIM \xB7 2180", "Bengaluru", "Online", ["Kids", "Adults"], 700, 9, 95, "English, Malayalam", "Makes chess fun for beginners aged 5\u201312 with games and puzzles.", 1, "priya@mychess64.com"],
      ["Rohit Verma", "IM \xB7 2410", "Mumbai", "Online", ["Tournament", "Openings"], 1500, 15, 60, "English, Hindi", "Opening repertoires and deep game analysis for rated players.", 2, "rohit@mychess64.com"],
      ["Sneha Iyer", "FIDE 1950", "Chennai", "Home", ["Kids", "Adults"], 600, 7, 54, "English, Tamil", "Friendly home tuition for school kids and returning adult players.", 3, "sneha@mychess64.com"],
      ["Vikram Singh", "CM \xB7 2050", "Patna", "Online", ["Adults", "Openings"], 500, 8, 44, "Hindi, English", "Helps adult improvers break 1500 with simple, practical plans.", 4, "vikram@mychess64.com"],
      ["Ananya Das", "WFM \xB7 2090", "Kolkata", "Online", ["Kids", "Tournament"], 800, 10, 78, "English, Bengali", "Endgame specialist and former national under-14 girls champion.", 5, "ananya@mychess64.com"]
    ];
    const R = [["Meera K.", "Very patient and structured. Our son improved quickly."], ["Rahul S.", "Clear explanations and great game analysis after every class."], ["Anita V.", "Flexible timings and lessons the kids genuinely enjoy."]];
    for (let i = 0; i < 6; i++) {
      const a = S0[i], id = "s" + (i + 1);
      await B.set("coaches", id, { name: a[0], title: a[1], city: a[2], mode: a[3], cats: a[4], price: a[5], exp: a[6], students: a[7], langs: a[8], bio: a[9], c1: COL[a[10]][0], c2: COL[a[10]][1], photo: "", status: "active" });
      if (B.mode === "demo") {
        try {
          await B.createUser(a[11], "chess1234", id);
          await B.set("coachPrivate", id, { email: a[11] });
        } catch (e) {
        }
      }
      for (let k = 0; k < 2; k++) await B.set("reviews", "r" + i + k, { cid: id, name: R[(i + k) % 3][0], text: R[(i + k) % 3][1], stars: 5, ts: Date.now() - i * 1e5 - k });
    }
    await B.set("classes", "c1", { cid: "s1", title: "Kids Tactics Group", date: d(2), time: "17:00", dur: 60, mode: "Online", cap: 6, level: "Beginner", link: "" });
    if (B.mode === "demo") {
      const T = Date.now();
      [["Riya Sharma", "9876500001", "Chess for Kids", "Kids Tactics Group", "new", 3e5], ["Arjun Mehta", "9876500002", "Tournament Prep", "Sat 5 PM", "contacted", 9e6], ["Neha Gupta", "9876500003", "Chess for Adults", "", "confirmed", 9e7]].forEach((r) => B.set("requests", "dq" + r[1], { ts: T - r[5], name: r[0], phone: r[1], cat: r[2], cid: "s1", cls: "", slot: r[3], status: r[4] }));
    }
    await B.set("classes", "c2", { cid: "s1", title: "Tournament Prep", date: d(4), time: "19:00", dur: 90, mode: "Online", cap: 4, level: "Advanced", link: "" });
  }

  // src/coach.js
  var S = { user: null, tab: "home", bf: "all", bq: "", sq: "", edit: "" };
  var subReq = null;
  var tmpPh = "";
  var pendingMsg = "";
  var TABS = [["home", "\u{1F3E0}", "Home"], ["bk", "\u{1F4E5}", "Bookings"], ["sch", "\u{1F4C5}", "Schedule"], ["st", "\u{1F465}", "Students"], ["rv", "\u2B50", "Reviews"], ["pf", "\u{1F464}", "Profile"]];
  var STAT = ["new", "contacted", "confirmed", "done", "cancelled"];
  var me = () => D.coaches.find((c) => c.id === (S.user && S.user.uid));
  var url = (u) => /^https?:\/\//i.test(u || "") ? u : "";
  var digits = (p) => {
    p = String(p || "").replace(/\D/g, "");
    return p.length === 10 ? "91" + p : p;
  };
  var ago = (ts) => {
    const m = Math.round((Date.now() - ts) / 6e4);
    return m < 1 ? "just now" : m < 60 ? m + " min ago" : m < 1440 ? Math.round(m / 60) + " h ago" : Math.round(m / 1440) + " d ago";
  };
  var ymd = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  var addDays = (s, n) => {
    const d = /* @__PURE__ */ new Date(s + "T00:00");
    d.setDate(d.getDate() + n);
    return ymd(d);
  };
  var reach = (r) => `<a class="ic" href="tel:${esc(r.phone)}">\u{1F4DE} Call</a><a class="ic" target="_blank" rel="noopener" href="https://wa.me/${digits(r.phone)}">\u{1F4AC} WhatsApp</a>`;
  var avatar = (c, cls = "") => `<div class="av ${cls}" style="background:linear-gradient(135deg,${c.c1 || "#0b6bde"},${c.c2 || "#19c3ff"})">${c.photo ? `<img src="${c.photo}" alt="">` : ini(c.name)}</div>`;
  var publicLink = () => location.href.replace(/coach\.html.*$/, "") + "index.html#coach=" + (S.user ? S.user.uid : "");
  function students() {
    const m = {};
    D.requests.forEach((r) => {
      const k = digits(r.phone);
      const e = m[k] = m[k] || { name: r.name, phone: r.phone, n: 0, last: 0, cats: /* @__PURE__ */ new Set() };
      e.n++;
      e.last = Math.max(e.last, r.ts);
      if (r.cat) e.cats.add(r.cat);
    });
    return Object.values(m).sort((a, b) => b.last - a.last);
  }
  function showLogin(msg) {
    $("app").hidden = true;
    const L = $("login");
    L.hidden = false;
    L.innerHTML = `<div class="lcard"><img class="llogo" src="assets/header-logo.webp" alt="MyChess64"><h1>Coach Portal</h1><p class="mu">Sign in to manage your classes, bookings and profile.</p>
<p id="l_msg" class="err">${msg ? esc(msg) : ""}</p>
<input id="l_e" type="email" placeholder="Email" autocomplete="username"><input id="l_p" type="password" placeholder="Password" autocomplete="current-password" onkeydown="if(event.key==='Enter')cp.login()">
<button class="btn" onclick="cp.login()">Sign in</button><button class="btn o" onclick="cp.forgot()">Forgot password?</button>
${B.mode === "demo" ? '<p class="mu demo"><b>Demo mode</b> (no Firebase keys yet)<br>Email: aarav@mychess64.com \xB7 Password: chess1234</p>' : ""}
<div class="feat"><span>\u{1F4E5} Bookings</span><span>\u{1F4C5} Class scheduler</span><span>\u{1F465} Students</span><span>\u2B50 Reviews</span><span>\u{1F464} Profile &amp; photo</span><span>\u{1F517} Share link</span></div>
<a class="back" href="index.html">\u2190 Back to website</a></div>`;
  }
  async function login() {
    const e = $("l_e").value.trim(), p = $("l_p").value;
    if (!e || !p) {
      toast("Enter your email and password", 1);
      return;
    }
    try {
      await B.login(e, p);
    } catch (err) {
      toast(B.mode === "demo" ? "Invalid email or password" : "Login failed (" + (err.code || err.message) + ")", 1);
    }
  }
  async function forgot() {
    const e = ($("l_e") || {}).value;
    if (!e) {
      toast("Type your email first", 1);
      return;
    }
    try {
      await B.reset(e.trim());
      toast("Password-reset email sent");
    } catch (err) {
      toast(err.code || "Could not send", 1);
    }
  }
  async function logout() {
    await B.logout();
  }
  function showApp() {
    $("login").hidden = true;
    const a = $("app");
    a.hidden = false;
    a.innerHTML = `<header class="top"><img class="tlogo" src="assets/header-logo.webp" alt="MyChess64"><span class="sp"></span><button class="btn o sm" onclick="cp.guide()">\u2753 Guide</button><a class="btn o sm hide-s" href="index.html" target="_blank">Website \u2197</a><button class="btn sm" onclick="cp.logout()">Log out</button></header>
<div class="body"><nav class="side" id="nav"></nav><main id="main"></main></div>`;
    go(S.tab, true);
    if (!ls.get("mc64_tour")) {
      ls.set("mc64_tour", "1");
      setTimeout(guide, 400);
    }
  }
  function nav() {
    const nb = D.requests.filter((r) => r.status === "new").length, c = me();
    $("nav").innerHTML = (c ? `<div class="who">${avatar(c, "sm")}<div><b>${esc(c.name)}</b><span>${esc(c.title)}</span></div></div>` : "") + TABS.map(([k, i, l]) => `<button class="${k === S.tab ? "on" : ""}" onclick="cp.go('${k}')"><i>${i}</i><span>${l}</span>${k === "bk" && nb ? `<em>${nb}</em>` : ""}</button>`).join("");
  }
  function go(t, force) {
    S.tab = t;
    render(true);
    window.scrollTo && scrollTo(0, 0);
  }
  function render(force) {
    if (!S.user || S.user.role !== "coach" || $("app").hidden || !$("main")) return;
    const a = document.activeElement;
    if (!force && a && $("main").contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) {
      nav();
      return;
    }
    nav();
    const c = me();
    $("main").innerHTML = !c ? '<div class="card">Your coach profile was not found. Please contact the admin.</div>' : { home, bk, sch, st, rv, pf }[S.tab](c);
    const fn = { bk: bkList, sch: schList, st: stList, pf: pv }[S.tab];
    if (fn) fn();
  }
  function home(c) {
    const nb = D.requests.filter((r) => r.status === "new").length, up = upcoming(c.id), s = stat(c), h = (/* @__PURE__ */ new Date()).getHours();
    const todo = [["Add a profile photo", !!c.photo, "pf"], ["Write a bio (40+ characters)", (c.bio || "").length >= 40, "pf"], ["Set languages & fee", !!c.langs && c.price > 0, "pf"], ["Schedule your first class", D.classes.some((x) => x.cid === c.id), "sch"], ["Share your profile link", !!ls.get("mc64_shared"), "share"]];
    const done = todo.filter((t) => t[1]).length, pct = Math.round(done / todo.length * 100), latest = [...D.requests].sort((a, b) => b.ts - a.ts).slice(0, 3);
    return `<h2 class="hello">${h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"}, ${esc(c.name.split(" ")[0])} \u{1F44B}</h2>
<div class="kpis"><div onclick="cp.go('bk')"><b>${nb}</b><span>New bookings</span></div><div onclick="cp.go('sch')"><b>${up.length}</b><span>Upcoming classes</span></div><div onclick="cp.go('st')"><b>${students().length}</b><span>Students</span></div><div onclick="cp.go('rv')"><b>${s.n ? s.r.toFixed(1) : "\u2014"}</b><span>Rating (${s.n})</span></div></div>
<h3 class="sec">Coach tools</h3><div class="tiles">
<button onclick="cp.go('sch')"><i>\u2795</i><b>Schedule a class</b><span>One-off or weekly repeat</span></button>
<button onclick="cp.go('bk')"><i>\u{1F4E5}</i><b>Bookings</b><span>Call, WhatsApp, update status</span></button>
<button onclick="cp.go('st')"><i>\u{1F465}</i><b>My students</b><span>Everyone who booked you</span></button>
<button onclick="cp.go('rv')"><i>\u2B50</i><b>Reviews</b><span>Ratings from your students</span></button>
<button onclick="cp.go('pf')"><i>\u270F\uFE0F</i><b>Edit profile</b><span>Photo, bio, fee, specialities</span></button>
<button onclick="cp.share()"><i>\u{1F517}</i><b>Share my profile</b><span>Copy your public link</span></button></div>
<div class="two"><div class="card"><div class="ch"><b>Setup checklist</b><span class="mu">${done}/${todo.length}</span></div><div class="bar"><i style="width:${pct}%"></i></div>${todo.map((t) => `<button class="chk ${t[1] ? "ok" : ""}" onclick="${t[2] === "share" ? "cp.share()" : `cp.go('${t[2]}')`}"><i>${t[1] ? "\u2713" : ""}</i>${t[0]}</button>`).join("")}</div>
<div class="card"><div class="ch"><b>Next classes</b><button class="lnk" onclick="cp.go('sch')">Manage \u2192</button></div>${up.slice(0, 3).map((x) => `<div class="li"><b>${esc(x.title)}</b><span class="mu">${fd(x.date)} \xB7 ${tf(x.time)} \xB7 ${x.dur} min \xB7 ${x.cap - seats(x)}/${x.cap} booked</span></div>`).join("") || `<p class="mu">No classes yet. <button class="lnk" onclick="cp.go('sch')">Schedule one \u2192</button></p>`}
<div class="ch" style="margin-top:14px"><b>Latest bookings</b><button class="lnk" onclick="cp.go('bk')">All \u2192</button></div>${latest.map((r) => `<div class="li"><b>${esc(r.name)}</b> <span class="bdg s-${r.status}">${r.status}</span><span class="mu">${esc(r.cat || "")} \xB7 ${ago(r.ts)}</span></div>`).join("") || '<p class="mu">New booking requests will appear here.</p>'}</div></div>`;
  }
  function bk() {
    const n = (k) => k === "all" ? D.requests.length : D.requests.filter((r) => r.status === k).length;
    return `<div class="ph"><h2>Bookings</h2><input id="bq" placeholder="Search name / phone" value="${esc(S.bq)}" oninput="cp.bq(this.value)"></div><div class="chips">${["all", ...STAT].map((k) => `<button class="${S.bf === k ? "on" : ""}" onclick="cp.bf('${k}')">${k} <em>${n(k)}</em></button>`).join("")}</div><div id="list"></div>`;
  }
  function bkList() {
    const q = S.bq.toLowerCase(), L = [...D.requests].sort((a, b) => b.ts - a.ts).filter((r) => (S.bf === "all" || r.status === S.bf) && (!q || (r.name + r.phone).toLowerCase().includes(q)));
    $("list").innerHTML = L.map((r) => `<div class="card bkc"><div class="r1"><b>${esc(r.name)}</b><span class="bdg s-${r.status}">${r.status}</span></div><div class="mu">\u{1F4DA} ${esc(r.cat || "\u2014")}${r.slot ? " \xB7 \u{1F551} " + esc(r.slot) : ""} \xB7 ${ago(r.ts)}</div><div class="acts">${reach(r)}</div>
<div class="r3"><select onchange="cp.setSt('${r.id}',this.value)">${STAT.map((s) => `<option ${s === r.status ? "selected" : ""}>${s}</option>`).join("")}</select><input placeholder="Private note\u2026" maxlength="280" value="${esc(r.note || "")}" onchange="cp.note('${r.id}',this.value)"></div></div>`).join("") || '<div class="card mu">No bookings here yet. When a student requests a demo with you, it appears instantly.</div>';
  }
  async function mut(id, patch, msg) {
    const r = D.requests.find((x) => x.id === id);
    try {
      await B.set("requests", id, { ...strip(r), ...patch });
      if (msg) toast(msg);
    } catch (e) {
      toast(e.code || "Could not save", 1);
    }
  }
  function schForm(x) {
    x = x || {};
    return `<div class="card"><div class="ch"><b>${x.id ? "Edit class" : "Schedule a class"}</b>${x.id ? '<button class="lnk" onclick="cp.cancelEdit()">Cancel edit</button>' : ""}</div><div class="g2">
<label>Title<input id="s_t" value="${esc(x.title || "")}" placeholder="e.g. Opening Basics"></label><label>Date<input id="s_d" type="date" value="${x.date || ""}" min="${today()}"></label>
<label>Time<input id="s_h" type="time" value="${x.time || "17:00"}"></label><label>Duration (min)<input id="s_u" type="number" value="${x.dur || 60}"></label>
<label>Mode<select id="s_m">${["Online", "Home"].map((m) => `<option ${x.mode === m ? "selected" : ""}>${m}</option>`).join("")}</select></label><label>Seats<input id="s_c" type="number" min="1" value="${x.cap || 5}"></label>
<label>Level<select id="s_l">${["Beginner", "Intermediate", "Advanced"].map((m) => `<option ${x.level === m ? "selected" : ""}>${m}</option>`).join("")}</select></label><label>Meeting link<input id="s_k" value="${esc(x.link || "")}" placeholder="https://meet\u2026"></label>
${x.id ? "" : '<label>Repeat weekly<select id="s_r"><option value="1">Does not repeat</option><option value="4">4 weeks</option><option value="8">8 weeks</option><option value="12">12 weeks</option></select></label>'}</div>
<button class="btn" onclick="cp.saveCls()">${x.id ? "Save changes" : "Add to schedule"}</button></div>`;
  }
  function sch(c) {
    const days = [...Array(7)].map((_, i) => addDays(today(), i));
    return `<div class="ph"><h2>Schedule</h2></div><div class="week">${days.map((d) => {
      const n = D.classes.filter((x) => x.cid === c.id && x.date === d).length;
      return `<button onclick="cp.pickDay('${d}')"><span>${(/* @__PURE__ */ new Date(d + "T00:00")).toLocaleDateString("en-IN", { weekday: "short" })}</span><b>${(/* @__PURE__ */ new Date(d + "T00:00")).getDate()}</b><em class="${n ? "on" : ""}">${n ? n + " class" + (n > 1 ? "es" : "") : "\u2014"}</em></button>`;
    }).join("")}</div>
<div id="sf">${schForm(D.classes.find((x) => x.id === S.edit))}</div><div id="list"></div>`;
  }
  function schList() {
    const c = me(), all = D.classes.filter((x) => x.cid === c.id).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)), up = all.filter((x) => x.date >= today()), past = all.filter((x) => x.date < today()).reverse().slice(0, 5);
    const row = (x) => {
      const b = x.cap - seats(x), p = Math.min(100, Math.round(b / x.cap * 100));
      return `<div class="card cls"><div class="r1"><b>${esc(x.title)}</b><span class="mu">${fd(x.date)} \xB7 ${tf(x.time)} \xB7 ${x.dur} min</span></div><div class="mu">${esc(x.mode)} \xB7 ${esc(x.level)} \xB7 ${b}/${x.cap} seats booked</div><div class="bar"><i style="width:${p}%"></i></div><div class="acts">${url(x.link) ? `<a class="ic" target="_blank" rel="noopener" href="${esc(url(x.link))}">\u25B6 Join link</a>` : ""}<button class="ic" onclick="cp.editCls('${x.id}')">\u270F\uFE0F Edit</button><button class="ic" onclick="cp.dup('${x.id}')">\u29C9 +1 week</button><button class="ic del" onclick="cp.delCls('${x.id}')">\u{1F5D1} Delete</button></div></div>`;
    };
    $("list").innerHTML = `<h3 class="sec">Upcoming (${up.length})</h3>${up.map(row).join("") || '<div class="card mu">Nothing scheduled. Add your first class above \u2014 students can book it from your public profile.</div>'}${past.length ? `<h3 class="sec">Recent past</h3>${past.map(row).join("")}` : ""}`;
  }
  async function saveCls() {
    const g = (i) => $(i).value.trim();
    if (!g("s_t") || !g("s_d") || !g("s_h")) {
      toast("Title, date and time are required", 1);
      return;
    }
    const o = { cid: S.user.uid, title: g("s_t"), date: g("s_d"), time: g("s_h"), dur: +g("s_u") || 60, mode: $("s_m").value, cap: Math.max(1, +g("s_c") || 1), level: $("s_l").value, link: url(g("s_k")) };
    try {
      if (S.edit) {
        await B.set("classes", S.edit, o);
        S.edit = "";
        toast("Class updated \u2713");
      } else {
        const n = +($("s_r") || { value: 1 }).value;
        for (let i = 0; i < n; i++) await B.set("classes", uid(), { ...o, date: addDays(o.date, 7 * i) });
        toast(n > 1 ? n + " classes scheduled \u2713" : "Class scheduled \u2713 \u2014 students can now book it");
      }
      $("sf").innerHTML = schForm();
    } catch (e) {
      toast(e.code || "Could not save", 1);
    }
  }
  function st() {
    return `<div class="ph"><h2>My students</h2><input placeholder="Search name / phone" value="${esc(S.sq)}" oninput="cp.sq(this.value)"></div><div id="list"></div>`;
  }
  function stList() {
    const q = S.sq.toLowerCase(), L = students().filter((s) => !q || (s.name + s.phone).toLowerCase().includes(q));
    $("list").innerHTML = L.map((s) => `<div class="card bkc"><div class="r1"><b>${esc(s.name)}</b><span class="bdg">${s.n} booking${s.n > 1 ? "s" : ""}</span></div><div class="mu">\u{1F4DA} ${[...s.cats].map(esc).join(", ") || "\u2014"} \xB7 last ${ago(s.last)}</div><div class="acts">${reach(s)}</div></div>`).join("") || '<div class="card mu">Students appear here once they book a demo with you.</div>';
  }
  function rv(c) {
    const rs = D.reviews.filter((r) => r.cid === c.id).sort((a, b) => b.ts - a.ts), s = stat(c);
    return `<div class="ph"><h2>Reviews</h2></div><div class="card rvs"><div class="big"><b>${s.n ? s.r.toFixed(1) : "\u2014"}</b><span>\u2605 average \xB7 ${s.n} review${s.n === 1 ? "" : "s"}</span></div><div>${[5, 4, 3, 2, 1].map((n) => {
      const k = rs.filter((r) => +r.stars === n).length;
      return `<div class="dist"><span>${n}\u2605</span><div class="bar"><i style="width:${s.n ? Math.round(k / s.n * 100) : 0}%"></i></div><span>${k}</span></div>`;
    }).join("")}</div></div>
${rs.map((r) => `<div class="card"><div class="r1"><b>${esc(r.name)}</b><span class="stars">${"\u2605".repeat(+r.stars || 5)}</span></div><p>${esc(r.text)}</p></div>`).join("") || '<div class="card mu">No reviews yet.</div>'}<p class="mu">Reviews are added by the MyChess64 team after verifying your students.</p>`;
  }
  function pf(c) {
    tmpPh = c.photo || "";
    const ci = Math.max(0, COL.findIndex((x) => x[0] === c.c1));
    return `<div class="ph"><h2>My profile</h2><button class="btn o sm" onclick="cp.share()">\u{1F517} Copy public link</button></div><div class="pfgrid"><div class="card" oninput="cp.pv()"><div class="g2">
<label>Name<input id="f_n" value="${esc(c.name)}"></label><label>Title / rating<input id="f_t" value="${esc(c.title)}"></label><label>City<input id="f_c" value="${esc(c.city)}"></label>
<label>Mode<select id="f_m">${["Online", "Home", "Both"].map((m) => `<option ${c.mode === m ? "selected" : ""}>${m}</option>`).join("")}</select></label><label>Fee \u20B9/hr<input id="f_p" type="number" value="${c.price || 0}"></label><label>Experience (yrs)<input id="f_e" type="number" value="${c.exp || 0}"></label>
<label>Students taught<input id="f_s" type="number" value="${c.students || 0}"></label><label>Languages<input id="f_l" value="${esc(c.langs)}"></label></div>
<div class="cats">${CATS.map((k) => `<label class="ck"><input type="checkbox" class="f_cat" value="${k}" ${(c.cats || []).includes(k) ? "checked" : ""}> ${k}</label>`).join("")}</div>
<label>About you<textarea id="f_b" rows="4">${esc(c.bio)}</textarea></label>
<div class="phrow"><label class="btn o sm">\u{1F4F7} Upload photo<input type="file" accept="image/*" hidden onchange="cp.photo(this)"></label><button class="btn o sm" onclick="cp.rmPhoto()">Remove photo</button><label>Banner colour<select id="f_col" onchange="cp.pv()">${COL.map((x, i) => `<option value="${i}" ${i === ci ? "selected" : ""}>Theme ${i + 1}</option>`).join("")}</select></label></div>
<div class="acts"><button class="btn" onclick="cp.savePf()">Save profile</button><button class="btn o" onclick="cp.reset()">Change password (email link)</button></div></div>
<div><div class="mu" style="margin-bottom:6px">Live preview \u2013 how students see you</div><div id="pvbox"></div></div></div>`;
  }
  function pv() {
    const b = $("pvbox");
    if (!b || !$("f_n")) return;
    const col = COL[+$("f_col").value] || COL[0], cats = [...document.querySelectorAll(".f_cat:checked")].map((x) => x.value);
    b.innerHTML = `<div class="pcard"><div class="pimg" style="background:linear-gradient(135deg,${col[0]},${col[1]})">${tmpPh ? `<img src="${tmpPh}" alt="">` : `<div class="ini">${ini($("f_n").value)}</div>`}<div class="nm"><b>${esc($("f_n").value)} \u2713</b><span>${esc($("f_t").value)} \xB7 ${esc($("f_c").value)}</span></div></div><div class="pb"><p>${esc($("f_b").value) || '<span class="mu">Your bio appears here\u2026</span>'}</p><div class="tags">${cats.map((k) => `<i>${k}</i>`).join("")}<i>${esc($("f_m").value)}</i></div><div class="r1"><b>\u20B9${+$("f_p").value || 0}/hr</b><span class="mu">\u{1F393} ${+$("f_e").value || 0} yrs</span></div></div></div>`;
  }
  function photo(inp) {
    const f = inp.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = 480, c = document.createElement("canvas");
        c.width = c.height = s;
        const m = Math.min(im.width, im.height);
        c.getContext("2d").drawImage(im, (im.width - m) / 2, (im.height - m) / 4, m, m, 0, 0, s, s);
        tmpPh = c.toDataURL("image/jpeg", 0.82);
        pv();
      };
      im.src = r.result;
    };
    r.readAsDataURL(f);
  }
  async function savePf() {
    const c = me(), g = (i) => $(i).value.trim();
    if (!g("f_n") || !g("f_t")) {
      toast("Name and title are required", 1);
      return;
    }
    const col = COL[+$("f_col").value];
    try {
      await B.set("coaches", c.id, { ...strip(c), name: g("f_n"), title: g("f_t"), city: g("f_c"), mode: $("f_m").value, price: +g("f_p") || 0, exp: +g("f_e") || 0, students: +g("f_s") || 0, langs: g("f_l"), bio: g("f_b"), cats: [...document.querySelectorAll(".f_cat:checked")].map((x) => x.value), c1: col[0], c2: col[1], photo: tmpPh });
      toast("Profile saved \u2713 \u2014 live on the website");
    } catch (e) {
      toast(e.code || "Could not save", 1);
    }
  }
  function guide() {
    let m = $("gd");
    if (!m) {
      m = document.createElement("div");
      m.id = "gd";
      m.className = "md";
      m.onclick = (e) => {
        if (e.target === m) m.classList.remove("on");
      };
      document.body.appendChild(m);
    }
    m.innerHTML = `<div class="mb"><h3>Welcome to your coach tools \u{1F44B}</h3><ul><li>\u{1F3E0} <b>Home</b> \u2013 today at a glance, quick actions and a setup checklist.</li><li>\u{1F4E5} <b>Bookings</b> \u2013 students who requested you. Call or WhatsApp them, set status, add private notes.</li><li>\u{1F4C5} <b>Schedule</b> \u2013 create classes (one-off or weekly repeat). Students book seats from your public profile.</li><li>\u{1F465} <b>Students</b> \u2013 everyone who has booked you, with quick contact.</li><li>\u2B50 <b>Reviews</b> \u2013 your rating and student feedback.</li><li>\u{1F464} <b>Profile</b> \u2013 photo, bio, fee, specialities with a live preview. Copy your public link to share.</li></ul><button class="btn" onclick="document.getElementById('gd').classList.remove('on')">Got it</button></div>`;
    m.classList.add("on");
  }
  async function share() {
    ls.set("mc64_shared", "1");
    const u = publicLink();
    try {
      await navigator.clipboard.writeText(u);
      toast("Profile link copied \u2713");
    } catch (e) {
      prompt("Copy your public profile link", u);
    }
    render(true);
  }
  window.cp = {
    login,
    forgot,
    logout,
    go,
    guide,
    share,
    photo,
    savePf,
    saveCls,
    pv,
    bf: (k) => {
      S.bf = k;
      render(true);
    },
    bq: (v) => {
      S.bq = v;
      bkList();
    },
    sq: (v) => {
      S.sq = v;
      stList();
    },
    setSt: (id, v) => mut(id, { status: v }, "Status updated"),
    note: (id, v) => mut(id, { note: v.slice(0, 280) }, "Note saved"),
    pickDay: (d) => {
      if ($("s_d")) {
        $("s_d").value = d;
        $("s_d").focus();
      }
    },
    editCls: (id) => {
      S.edit = id;
      $("sf").innerHTML = schForm(D.classes.find((x) => x.id === id));
      $("sf").scrollIntoView();
    },
    cancelEdit: () => {
      S.edit = "";
      $("sf").innerHTML = schForm();
    },
    dup: async (id) => {
      const x = D.classes.find((c) => c.id === id);
      try {
        await B.set("classes", uid(), { ...strip(x), date: addDays(x.date, 7) });
        toast("Copied to next week \u2713");
      } catch (e) {
        toast(e.code || "Failed", 1);
      }
    },
    delCls: async (id) => {
      if (confirm("Delete this class?")) try {
        await B.remove("classes", id);
        toast("Class deleted");
      } catch (e) {
        toast(e.code || "Failed", 1);
      }
    },
    rmPhoto: () => {
      tmpPh = "";
      pv();
    },
    reset: async () => {
      try {
        await B.reset(S.user.email);
        toast("Password-reset email sent to " + S.user.email);
      } catch (e) {
        toast(e.code || "Failed", 1);
      }
    }
  };
  document.documentElement.classList.add("js");
  window.__mc64 = true;
  (async () => {
    await initBackend();
    B.onErr = (col, e) => diag("Database problem reading \u201C" + col + "\u201D (" + (e.code || e.message) + "). Check Firestore is created and firestore.rules are published (README step 2).");
    ["coaches", "reviews", "classes", "seatlog"].forEach((col) => B.sub(col, (rows) => {
      D[col] = rows;
      if (col === "coaches" && B.mode === "demo" && !rows.length && !ls.get("mc64_seeded")) {
        ls.set("mc64_seeded", "1");
        sample();
      }
      render();
    }));
    B.onAuth((u) => {
      S.user = u;
      if (subReq) {
        subReq();
        subReq = null;
      }
      D.requests = [];
      if (u && u.role === "coach") {
        subReq = B.sub("requests", (a) => {
          D.requests = a;
          render();
        }, ["cid", u.uid]);
        showApp();
      } else if (u) {
        pendingMsg = u.role === "admin" ? "This portal is for coaches. Admins: use Login on the main website." : "Signed in as " + u.email + ", but no coach profile was found" + (u.err ? " (" + u.err + ")" : "") + ". Ask the admin to create your coach account.";
        B.logout();
      } else {
        showLogin(pendingMsg);
        pendingMsg = "";
      }
    });
  })();
})();
