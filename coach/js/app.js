(() => {
  // ../gh/src/backend.js
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
    let st;
    try {
      st = JSON.parse(localStorage.getItem(K));
    } catch (e) {
    }
    st = st || { data: {}, acc: [] };
    const save2 = () => {
      try {
        localStorage.setItem(K, JSON.stringify(st));
      } catch (e) {
      }
    };
    const arr = (c) => st.data[c] = st.data[c] || [];
    const fire = (c) => subs.filter((s) => s.c === c).forEach((s) => s.run());
    let session = null;
    try {
      session = sessionStorage.getItem("mc64_s");
    } catch (e) {
    }
    const emit = () => {
      const a = st.acc.find((x) => x.uid === session);
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
        save2();
        fire(c);
      },
      async remove(c, id) {
        st.data[c] = arr(c).filter((x) => x.id !== id);
        save2();
        fire(c);
      },
      async submit(id, o, cls) {
        await impl.set("requests", id, o);
        if (cls) await impl.set("seatlog", id, { cls, ts: o.ts });
      },
      async login(e, p) {
        const a = st.acc.find((x) => x.email === e.toLowerCase());
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
        if (st.acc.some((x) => x.email === email)) throw { code: "auth/email-already-in-use" };
        const u = forcedUid || "u" + Date.now().toString(36);
        st.acc.push({ uid: u, email, hash: await sha(u + pw), role: forcedUid === "admin1" ? "admin" : "coach" });
        save2();
        return u;
      }
    };
    if (!st.acc.some((a) => a.role === "admin")) impl.createUser("admin@mychess64.com", "admin123", "admin1");
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

  // ../gh/src/state.js
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
  var DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var TIMES = ["6 AM", "4 PM", "5 PM", "7 PM"];
  var lvl = { Kids: "Beginner", Adults: "Intermediate", Tournament: "Advanced", Openings: "Advanced" };
  function diag(m) {
    const b = $("fatal");
    if (!b) return;
    b.textContent = "\u26A0 " + m;
    b.style.display = "block";
  }
  var D = { coaches: [], reviews: [], classes: [], seatlog: [], requests: [], apps: [], coachPrivate: [] };
  var ST = { user: null, cat: "All", txt: "", sel: {}, pend: {}, saved: /* @__PURE__ */ new Set() };
  var hooks = { render() {
  } };
  var stat = (x) => {
    const rs = D.reviews.filter((r) => r.cid === x.id);
    return { n: rs.length, r: rs.length ? rs.reduce((a, b) => a + (+b.stars || 5), 0) / rs.length : 0 };
  };
  var seats = (c) => (+c.cap || 1) - D.seatlog.filter((s) => s.cls === c.id).length;
  var upcoming = (id) => D.classes.filter((c) => c.cid === id && c.date >= today()).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  // ../gh/src/public.js
  var site = window.MC64_SITE || {};
  var P = ["\u265E", "\u265B", "\u265C", "\u265D", "\u265F", "\u265A"];
  var io;
  try {
    JSON.parse(ls.get("mc64_saved") || "[]").forEach((i) => ST.saved.add(i));
  } catch (e) {
  }
  var throttle = () => {
    if (Date.now() - (+ls.get("mc64_last") || 0) < 15e3) {
      toast("Please wait a few seconds before sending again.", 1);
      return true;
    }
    return false;
  };
  function draw() {
    const tabs = $("tabs"), grid = $("grid");
    [...tabs.children].forEach((b) => b.classList.toggle("on", b.textContent === ST.cat));
    const lv = $("lv").value, so = $("so").value, md = $("md2").value;
    let L = D.coaches.filter((x) => x.status !== "hidden").map((x) => {
      const s = stat(x);
      return { ...x, _r: s.r, _n: s.n };
    }).filter((x) => (ST.cat === "All" || (ST.cat === "Saved \u2665" ? ST.saved.has(x.id) : (x.cats || []).includes(ST.cat))) && (!ST.txt || (x.name + x.city).toLowerCase().includes(ST.txt)) && (!lv || (x.cats || []).some((c) => lvl[c] === lv)) && (!md || x.mode === md || x.mode === "Both"));
    if (so === "r") L.sort((a, b) => b._r - a._r);
    if (so === "pl") L.sort((a, b) => a.price - b.price);
    if (so === "ph") L.sort((a, b) => b.price - a.price);
    if (so === "e") L.sort((a, b) => b.exp - a.exp);
    $("cnt").textContent = L.length + " coach" + (L.length === 1 ? "" : "es") + " found \xB7 " + ST.saved.size + " saved";
    grid.innerHTML = L.length ? L.map((x) => `<article class="cd"><div class="ph" style="background:linear-gradient(135deg,${x.c1},${x.c2})">${x.photo ? `<img src="${x.photo}" alt="${esc(x.name)}" loading="lazy">` : `<div class="ini">${ini(x.name)}</div>`}<span class="rb">\u2605 ${x._n ? x._r.toFixed(1) + " (" + x._n + ")" : "New"}</span><button class="hr ${ST.saved.has(x.id) ? "on" : ""}" onclick="save('${x.id}')" aria-label="Save coach">\u2665</button><div class="nm"><h3>${esc(x.name)} <i class="vf">\u2713</i></h3><span>${esc(x.title)} \xB7 ${esc(x.city)}</span></div></div><div class="cbd"><p>${esc(x.bio)}</p><div class="tags">${(x.cats || []).map((c) => `<i>${c}</i>`).join("")}<i>${esc(x.mode)}</i></div><div class="mt"><span>\u{1F393} ${x.exp} yrs</span><span>\u{1F465} ${x.students} students</span></div><div class="foot"><div><b>\u20B9${x.price}</b><small>/hr</small></div><div class="bt"><button class="btn o sm" onclick="openM('${x.id}')">Profile</button><button class="btn sm" onclick="demo('${x.id}')">Free demo</button></div></div></div></article>`).join("") : '<p class="mu">No coaches to show yet. Try Reset, or request a match below.</p>';
    const rs = [...D.reviews].sort((a, b) => b.ts - a.ts).slice(0, 3);
    $("reviews").style.display = rs.length ? "" : "none";
    $("rvg").innerHTML = rs.map((r) => {
      const c = D.coaches.find((x) => x.id === r.cid);
      return `<div class="tm"><div class="q">${"\u2605".repeat(+r.stars || 5)}</div><p>${esc(r.text)}</p><b>${esc(r.name)}</b><small>${c ? "Student of " + esc(c.name) : "Verified student"}</small></div>`;
    }).join("");
    reveal();
    if (!ST.dl && location.hash.startsWith("#coach=")) {
      const id = decodeURIComponent(location.hash.slice(7));
      if (D.coaches.some((c) => c.id === id)) {
        ST.dl = 1;
        openM(id);
      }
    }
  }
  function save(id) {
    ST.saved.has(id) ? ST.saved.delete(id) : ST.saved.add(id);
    ls.set("mc64_saved", JSON.stringify([...ST.saved]));
    draw();
    if ($("md").classList.contains("on")) openM(id, 1);
  }
  function applySearch() {
    ST.txt = $("q").value.trim().toLowerCase();
    draw();
    $("coaches").scrollIntoView();
  }
  function quick(k) {
    ST.cat = k;
    ST.txt = "";
    draw();
    $("coaches").scrollIntoView();
  }
  function resetAll() {
    ST.cat = "All";
    ST.txt = "";
    ["q", "lv", "so", "md2"].forEach((i) => $(i).value = "");
    draw();
  }
  function theme() {
    const r = document.documentElement, d = r.dataset.theme || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
    r.dataset.theme = d === "dark" ? "light" : "dark";
  }
  function menu(c) {
    $("mm").classList.toggle("on", c ? false : void 0);
  }
  function openM(id, keep) {
    const x = D.coaches.find((c) => c.id === id);
    if (!x) return;
    if (!keep) ST.sel = {};
    const sel = ST.sel, s = stat(x), rs = D.reviews.filter((r) => r.cid === id).sort((a, b) => b.ts - a.ts), cl = upcoming(id);
    $("pm").innerHTML = `<button class="x" onclick="closeM()" aria-label="Close">\xD7</button><div class="pbn" style="background:linear-gradient(135deg,${x.c1},${x.c2})"><span class="wm">${P[x.name.length % 6]}</span></div>
<div class="phd"><div class="pav">${x.photo ? `<img src="${x.photo}" alt="${esc(x.name)}">` : `<div class="ini" style="font-size:54px;background:linear-gradient(135deg,${x.c1},${x.c2})">${ini(x.name)}</div>`}</div>
<div class="pin"><h2>${esc(x.name)} <i class="vf">\u2713</i></h2><div class="tags" style="margin-top:8px"><span class="tt">${esc(x.title)}</span><i>\u{1F4CD} ${esc(x.city)}</i><i>${esc(x.mode)} classes</i><i style="color:#b7791f">\u2605 ${s.n ? s.r.toFixed(1) + " \xB7 " + s.n + " reviews" : "New coach"}</i></div></div></div>
<div class="pbd"><div class="main"><div><h4>About</h4><p>${esc(x.bio)}</p><p class="mu" style="margin-top:6px">Languages: ${esc(x.langs || "English")}</p></div>
<div class="ss"><div><b>${x.exp}+</b><span>Years coaching</span></div><div><b>${x.students}+</b><span>Students taught</span></div><div><b>${s.n}</b><span>Reviews</span></div></div>
<div><h4>Specialities</h4><div class="tags">${(x.cats || []).map((c) => `<i>${c}</i>`).join("")}<i>Game analysis</i><i>Endgames</i><i>Homework &amp; progress tracking</i></div></div>
<div><h4>Student reviews</h4><div style="display:grid;gap:8px">${rs.length ? rs.slice(0, 4).map((r) => `<div class="rvw"><span class="q">${"\u2605".repeat(+r.stars || 5)}</span> <b>${esc(r.name)}</b><p>${esc(r.text)}</p></div>`).join("") : '<p class="mu">No reviews yet.</p>'}</div></div></div>
<aside class="bk"><div class="pr">\u20B9${x.price}<small> /hour</small></div><div class="mu">Your first demo class is free</div>
${cl.length ? "<h4>Upcoming classes</h4>" + cl.map((c) => {
      const l = seats(c);
      return `<button class="sl ${sel.cls === c.id ? "on" : ""}" ${l <= 0 ? "disabled" : ""} onclick="pickCls('${id}','${c.id}')"><b>${esc(c.title)}</b><span>${fd(c.date)} \xB7 ${tf(c.time)} \xB7 ${c.dur} min \xB7 ${esc(c.mode)} \xB7 ${l > 0 ? l + " seats left" : "Full"}</span></button>`;
    }).join("") : '<h4>Preferred slot</h4><div class="dy">' + DAYS.map((d) => `<button class="${sel.d === d ? "on" : ""}" onclick="pickSlot('${id}','d','${d}')">${d}</button>`).join("") + '</div><div class="tm2">' + TIMES.map((t) => `<button class="${sel.t === t ? "on" : ""}" onclick="pickSlot('${id}','t','${t}')">${t}</button>`).join("") + "</div>"}
<button class="btn g" onclick="demo('${id}')">Book free demo</button><button class="btn o" onclick="save('${id}')">${ST.saved.has(id) ? "\u2665 Saved" : "\u2661 Save coach"}</button><button class="btn o" onclick="shareCoach('${id}')">\u{1F517} Share profile</button></aside></div>`;
    $("md").classList.add("on");
    document.body.style.overflow = "hidden";
    const xb = $("pm").querySelector(".x");
    if (xb && !keep) xb.focus();
  }
  async function shareCoach(id) {
    const u = location.origin + location.pathname + "#coach=" + encodeURIComponent(id);
    try {
      await navigator.clipboard.writeText(u);
      toast("Profile link copied \u2713");
    } catch (e) {
      prompt("Copy this link", u);
    }
  }
  function pickCls(id, c) {
    ST.sel = { cls: c };
    openM(id, 1);
  }
  function pickSlot(id, k, v) {
    ST.sel[k] = v;
    openM(id, 1);
  }
  function closeM() {
    $("md").classList.remove("on");
    if (!$("app").classList.contains("on")) document.body.style.overflow = "";
  }
  function demo2(id) {
    const sel = ST.sel, c = D.classes.find((x2) => x2.id === sel.cls);
    let sl = "";
    if (c) sl = c.title + " \xB7 " + fd(c.date) + " " + tf(c.time);
    else if (sel.d) sl = sel.d + (sel.t ? " " + sel.t : "");
    ST.pend = { cid: id, cls: c ? c.id : "", slot: sl };
    const x = D.coaches.find((k) => k.id === id), m = { Kids: "Chess for Kids", Adults: "Chess for Adults", Tournament: "Tournament Prep" }, v = x && m[(x.cats || []).find((a) => m[a])];
    if (v) $("e_c").value = v;
    closeM();
    $("enquire").scrollIntoView();
    setTimeout(() => $("e_n").focus(), 450);
  }
  function finish(f, id, n, msg) {
    f.querySelectorAll("input,select,button").forEach((x) => x.style.display = "none");
    const o = $(id);
    o.innerHTML = "Thank you" + (n ? ", " + esc(n) : "") + "! " + msg + ` <a href="#" onclick="resetForm('` + f.id + "','" + id + `');return false">Submit another</a>`;
    o.style.display = "block";
  }
  function resetForm(fid, id) {
    const f = $(fid);
    f.reset();
    f.querySelectorAll("input,select,button").forEach((x) => x.style.display = "");
    $(id).style.display = "none";
  }
  async function subDemo(e) {
    e.preventDefault();
    const f = e.target, n = $("e_n").value.trim(), btn = f.querySelector("button.btn");
    if (f.querySelector(".hp").value) {
      finish(f, "e_ok", n, "We\u2019ll contact you within 24 hours.");
      return false;
    }
    if (throttle()) return false;
    btn.disabled = true;
    try {
      await B.submit(uid(), { ts: Date.now(), name: n, phone: $("e_p").value.trim(), cat: $("e_c").value, cid: ST.pend.cid || "", cls: ST.pend.cls || "", slot: ST.pend.slot || "", status: "new" }, ST.pend.cls || "");
      ls.set("mc64_last", Date.now());
      ST.pend = {};
      finish(f, "e_ok", n, "We\u2019ll contact you within 24 hours.");
    } catch (err) {
      console.error(err);
      toast("Could not send your request (" + (err.code || err.message || "error") + "). Please try again.", 1);
    }
    btn.disabled = false;
    return false;
  }
  async function subJoin(e) {
    e.preventDefault();
    const f = e.target, n = $("j_n").value.trim(), btn = f.querySelector("button.btn");
    if (f.querySelector(".hp").value) {
      finish(f, "j_ok", n, "Our team will review your application soon.");
      return false;
    }
    if (throttle()) return false;
    btn.disabled = true;
    try {
      await B.set("apps", uid(), { ts: Date.now(), name: n, rating: $("j_r").value.trim(), email: $("j_e").value.trim(), city: $("j_c").value.trim(), status: "new" });
      ls.set("mc64_last", Date.now());
      finish(f, "j_ok", n, "Our team will review your application soon.");
    } catch (err) {
      console.error(err);
      toast("Could not send your application (" + (err.code || err.message || "error") + "). Please try again.", 1);
    }
    btn.disabled = false;
    return false;
  }
  function reveal() {
    const els = document.querySelectorAll(".rv:not(.in),.cd:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    io = io || new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      io.unobserve(en.target);
      en.target.querySelectorAll("[data-n]").forEach((c) => {
        const T = +c.dataset.n, s = c.dataset.s;
        let v = 0;
        const st = setInterval(() => {
          v = Math.min(T, v + Math.ceil(T / 30));
          c.textContent = s === "\u2605" ? (v / 10).toFixed(1) + "\u2605" : v + s;
          if (v >= T) clearInterval(st);
        }, 30);
      });
    }), { threshold: 0.1 });
    els.forEach((e) => {
      if (e.classList.contains("cd")) e.classList.add("rv");
      io.observe(e);
    });
  }
  function initPublic() {
    const tabs = $("tabs");
    ["All", "Kids", "Adults", "Tournament", "Openings", "Saved \u2665"].forEach((k) => {
      const b = document.createElement("button");
      b.textContent = k;
      b.onclick = () => {
        ST.cat = k;
        draw();
      };
      tabs.appendChild(b);
    });
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeM();
      if (e.key === "Enter" && e.target.id === "q") applySearch();
    });
    addEventListener("scroll", () => $("tp").classList.toggle("on", scrollY > 600), { passive: true });
    const dlg = $("pm");
    dlg.setAttribute("role", "dialog");
    dlg.setAttribute("aria-modal", "true");
    dlg.setAttribute("aria-label", "Coach profile");
    const fc = [site.phone && "\u{1F4DE} " + site.phone, site.email && '\u2709 <a href="mailto:' + esc(site.email) + '">' + esc(site.email) + "</a>", site.address && "\u{1F4CD} " + esc(site.address)].filter(Boolean).join("<br>");
    if ($("fcontact")) $("fcontact").innerHTML = fc;
    const wd = (site.whatsapp || "").replace(/\D/g, "");
    if (wd) {
      const a = document.createElement("a");
      a.className = "wa";
      a.href = "https://wa.me/" + wd + "?text=" + encodeURIComponent("Hi MyChess64, I want a free demo class.");
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", "Chat on WhatsApp");
      a.textContent = "\u{1F4AC}";
      document.body.appendChild(a);
    }
    addEventListener("hashchange", () => {
      ST.dl = 0;
      draw();
    });
    Object.assign(window, { shareCoach, draw, save, applySearch, quick, resetAll, theme, menu, openM, pickCls, pickSlot, closeM, demo: demo2, resetForm, subDemo, subJoin });
    draw();
  }

  // ../gh/src/panel.js
  var keepOpen = false;
  var at = "ov";
  var ct = "ov";
  var tmpPh = "";
  var pendingOpen = false;
  var privSubs = [];
  var isAdmin = () => ST.user && ST.user.role === "admin";
  var myId = () => ST.user && ST.user.uid;
  var mine = () => D.coaches.find((c) => c.id === myId());
  var emailOf = (id) => (D.coachPrivate.find((p) => p.id === id) || {}).email || "";
  var panelOpen = () => $("app").classList.contains("on");
  var errMsg = (e) => ({ "auth/email-already-in-use": "That email already has an account.", "auth/weak-password": "Password must be at least 6 characters.", "auth/invalid-email": "Invalid email address.", "permission-denied": "Permission denied (check Firestore rules / admin setup)." })[e && e.code] || e && e.message || "Something went wrong";
  function startAuth() {
    B.onAuth((u) => {
      ST.user = u;
      privSubs.forEach((f) => f());
      privSubs = [];
      if (u && u.role === "admin") {
        privSubs.push(B.sub("requests", (a) => {
          D.requests = a;
          hooks.render();
        }), B.sub("apps", (a) => {
          D.apps = a;
          hooks.render();
        }), B.sub("coachPrivate", (a) => {
          D.coachPrivate = a;
          hooks.render();
        }));
      } else if (u && u.role === "coach") {
        privSubs.push(B.sub("requests", (a) => {
          D.requests = a;
          hooks.render();
        }, ["cid", u.uid]));
      } else {
        D.requests = [];
        D.apps = [];
        D.coachPrivate = [];
        if (pendingOpen && u) {
          pendingOpen = false;
          keepOpen = true;
          const m = $("l_msg");
          if (m) m.innerHTML = "\u26A0 Signed in as <b>" + esc(u.email) + "</b>, but this account has no admin or coach access" + (u.err ? " (" + esc(u.err) + ")" : "") + ".<br>If you are the admin: in Firebase \u2192 Firestore create collection <b>admins</b> with Document ID <b>" + esc(u.uid) + "</b>. Also check that firestore.rules are published.";
          B.logout();
        } else if (panelOpen() && !pendingOpen && !keepOpen) closeApp();
        if (!u) keepOpen = false;
      }
      authUI();
      hooks.render();
      if (pendingOpen && u && u.role) {
        pendingOpen = false;
        openPanel();
      }
    });
  }
  function authUI() {
    const b = $("loginBtn");
    if (b) b.textContent = ST.user && ST.user.role ? "Dashboard" : "Login";
  }
  function openLogin() {
    window.menu && window.menu(1);
    $("app").classList.add("on");
    document.body.style.overflow = "hidden";
    if (ST.user && ST.user.role) return openPanel();
    $("app").innerHTML = `<div class="lgw"><div class="fm lgb"><h3>Login</h3><p class="mu">Coaches and admins sign in here.</p><input id="l_e" type="email" placeholder="Email" autocomplete="username"><input id="l_p" type="password" placeholder="Password" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin()"><button class="btn" onclick="doLogin()">Sign in</button><p id="l_msg" class="mu" style="color:#b91c1c"></p><button class="btn o" onclick="forgot()">Forgot password?</button><button class="btn o" onclick="closeApp()">Cancel</button>${B.mode === "demo" ? '<p class="mu"><b>Demo mode</b> (add Firebase config for real logins)<br>Admin: admin@mychess64.com / admin123<br>Coach: aarav@mychess64.com / chess1234</p>' : ""}</div></div>`;
  }
  async function doLogin() {
    const e = $("l_e").value.trim(), p = $("l_p").value;
    if (!e || !p) {
      toast("Enter email and password", 1);
      return;
    }
    try {
      $("l_msg").textContent = "";
      pendingOpen = true;
      await B.login(e, p);
    } catch (err) {
      pendingOpen = false;
      toast(B.mode === "demo" ? "Invalid email or password" : "Login failed (" + (err.code || err.message) + ")", 1);
    }
  }
  async function forgot() {
    const e = $("l_e") && $("l_e").value.trim() || ST.user && ST.user.email;
    if (!e) {
      toast("Type your email first", 1);
      return;
    }
    try {
      await B.reset(e);
      toast("Password-reset email sent to " + e);
    } catch (err) {
      toast(errMsg(err), 1);
    }
  }
  function openPanel() {
    $("app").classList.add("on");
    document.body.style.overflow = "hidden";
    isAdmin() ? aTab() : cTab();
  }
  function closeApp() {
    $("app").classList.remove("on");
    document.body.style.overflow = "";
  }
  async function logout() {
    closeApp();
    await B.logout();
  }
  var url = (u) => /^https?:\/\//i.test(u || "") ? u : "";
  var shell = (t, tb, cur, fn) => `<div class="ah"><div class="wrap in2"><span class="ph2"><img class="plogo" src="assets/header-logo.webp" alt=""><b class="ttl">${t}</b></span><span class="mu">${B.mode === "firebase" ? "\u25CF Live (Firebase)" : "\u25CF Demo mode \xB7 saved in this browser only"}</span><span style="display:flex;gap:8px"><button class="btn o sm" onclick="logout()">Log out</button><button class="btn sm" onclick="closeApp()">Close \u2715</button></span></div><div class="at wrap">${tb.map(([k, l]) => `<button class="${k === cur ? "on" : ""}" onclick="${fn}('${k}')">${l}</button>`).join("")}</div></div><div class="wrap" style="padding-top:20px;padding-bottom:70px"><div id="anote" class="note"></div><div id="abody"></div></div>`;
  var empty = (m) => `<p class="mu">${m}</p>`;
  function cform(x, adm) {
    x = x || {};
    tmpPh = x.photo || "";
    const ci = Math.max(0, COL.findIndex((c) => c[0] === x.c1)), isNew = !x.id;
    return `<div class="fm"><h3>${isNew ? "Add coach" : "Edit profile"}</h3><div class="g2"><label>Name<input id="f_n" value="${esc(x.name)}"></label><label>Title / rating<input id="f_t" value="${esc(x.title)}" placeholder="FIDE 2100"></label><label>City<input id="f_c" value="${esc(x.city)}"></label><label>Mode<select id="f_m">${["Online", "Home", "Both"].map((m) => `<option ${x.mode === m ? "selected" : ""}>${m}</option>`).join("")}</select></label><label>Fee \u20B9/hr<input id="f_p" type="number" value="${x.price || 500}"></label><label>Experience (yrs)<input id="f_e" type="number" value="${x.exp || 0}"></label><label>Students taught<input id="f_s" type="number" value="${x.students || 0}"></label><label>Languages<input id="f_l" value="${esc(x.langs)}"></label>
${isNew ? '<label>Login email<input id="f_em" type="email"></label><label>Temporary password (6+ chars)<input id="f_pw" type="text"></label>' : ""}</div>
<div class="cats">${CATS.map((c) => `<label class="ck"><input type="checkbox" class="f_cat" value="${c}" ${(x.cats || []).includes(c) ? "checked" : ""}> ${c}</label>`).join("")}</div><label>About<textarea id="f_b" rows="3">${esc(x.bio)}</textarea></label>
<div class="phrow"><div id="f_pv" class="pv">${x.photo ? `<img src="${x.photo}" alt="">` : "No photo"}</div><label class="btn o sm" style="display:inline-block">Upload photo<input type="file" accept="image/*" hidden onchange="phPick(this)"></label><label>Banner colour<select id="f_col">${COL.map((c, i) => `<option value="${i}" ${i === ci ? "selected" : ""}>Theme ${i + 1}</option>`).join("")}</select></label></div>
<div class="ra"><button class="btn" onclick="csave('${x.id || ""}',${!!adm})">Save</button>${adm ? `<button class="btn o" onclick="$('aform').innerHTML=''">Cancel</button>` : ""}${!isNew ? `<button class="btn o" onclick="sendReset('${x.id}')">Send password-reset email</button>` : ""}</div></div>`;
  }
  function phPick(inp) {
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
        $("f_pv").innerHTML = `<img src="${tmpPh}" alt="">`;
      };
      im.src = r.result;
    };
    r.readAsDataURL(f);
  }
  async function sendReset(id) {
    const e = id === myId() ? ST.user.email : emailOf(id);
    if (!e) {
      toast("No email on record", 1);
      return;
    }
    try {
      await B.reset(e);
      toast("Password-reset email sent to " + e);
    } catch (err) {
      toast(errMsg(err), 1);
    }
  }
  async function csave(id, adm) {
    const g = (i) => $(i).value.trim();
    if (!g("f_n") || !g("f_t")) {
      toast("Name and title are required", 1);
      return;
    }
    const old = D.coaches.find((c) => c.id === id) || {}, col = COL[+$("f_col").value];
    try {
      let cid = id;
      if (!id) {
        const em = g("f_em").toLowerCase(), pw = g("f_pw");
        if (!em || pw.length < 6) {
          toast("Email and a 6+ character password are required", 1);
          return;
        }
        cid = await B.createUser(em, pw);
        await B.set("coachPrivate", cid, { email: em });
      }
      const o = { ...strip(old), name: g("f_n"), title: g("f_t"), city: g("f_c"), mode: $("f_m").value, price: +g("f_p") || 0, exp: +g("f_e") || 0, students: +g("f_s") || 0, langs: g("f_l"), bio: g("f_b"), cats: [...document.querySelectorAll(".f_cat:checked")].map((x) => x.value), c1: col[0], c2: col[1], photo: tmpPh, status: old.status || "active" };
      await B.set("coaches", cid, o);
      toast(id ? "Saved \u2713 \u2014 live on the website" : "Coach created \u2713 \u2014 they can now log in");
      if (adm) $("aform").innerHTML = "";
    } catch (err) {
      console.error(err);
      toast(errMsg(err), 1);
    }
  }
  var NEW = () => D.requests.filter((r) => r.status === "new").length;
  var NA = () => D.apps.filter((a) => a.status === "new").length;
  function aTab(k) {
    at = k || at;
    $("app").innerHTML = shell("MyChess64 Admin", [["ov", "Overview"], ["req", "Demo requests (" + NEW() + " new)"], ["apps", "Coach applications (" + NA() + " new)"], ["coaches", "Coaches"], ["reviews", "Reviews"], ["data", "Data"]], at, "aTab");
    $("abody").innerHTML = {
      ov: '<div class="ss4" id="kpi"></div><h3 style="margin:22px 0 10px">Latest demo requests</h3><div id="alist"></div>',
      req: '<div class="bar"><b>Demo requests</b><span><input id="rq_s" placeholder="Search name / phone" oninput="aList()"><select id="rq_f" onchange="aList()"><option value="all">All statuses</option><option>new</option><option>contacted</option><option>done</option></select><button class="btn o sm" onclick="exportCsv()">Export CSV</button></span></div><div id="alist"></div>',
      apps: '<div id="alist"></div>',
      coaches: `<div id="aform"></div><div class="bar"><b>Coaches</b><button class="btn sm" onclick="$('aform').innerHTML=cformNew()">+ Add coach</button></div><div id="alist"></div>`,
      reviews: '<div class="fm"><h3>Add player review</h3><div class="g2"><label>Coach<select id="rv_c">' + D.coaches.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("") + '</select></label><label>Player name<input id="rv_n"></label><label>Stars<select id="rv_s">' + [5, 4, 3, 2, 1].map((n) => `<option>${n}</option>`).join("") + '</select></label></div><label>Review<textarea id="rv_t" rows="2"></textarea></label><div class="ra"><button class="btn" onclick="addRv()">Add review</button></div></div><div id="alist"></div>',
      data: '<div class="fm"><h3>Sample data</h3><p class="mu">Adds six sample coaches (without logins), reviews and two classes so you can see the design filled in. Delete them any time from the Coaches tab.</p><div class="ra"><button class="btn" onclick="loadSample()">Load sample data</button></div></div>'
    }[at];
    aList();
  }
  var rq = (r) => {
    const c = D.coaches.find((x) => x.id === r.cid), p = String(r.phone || "").replace(/\D/g, "");
    return `<div class="rw"><div><b>${esc(r.name)}</b> <span class="bdg ${r.status}">${r.status}</span><div class="mu">\u{1F4DE} <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a> \xB7 <a target="_blank" rel="noopener" href="https://wa.me/${p.length === 10 ? "91" + p : p}">WhatsApp</a></div><div class="mu">${esc(r.cat || "")}${c ? " \xB7 Coach: " + esc(c.name) : ""}${r.slot ? " \xB7 " + esc(r.slot) : ""}</div><div class="mu">${new Date(r.ts).toLocaleString("en-IN")}</div></div><div class="ra">${isAdmin() ? `<select onchange="assign('${r.id}',this.value)"><option value="">Assign coach\u2026</option>${D.coaches.map((c2) => `<option value="${c2.id}" ${c2.id === r.cid ? "selected" : ""}>${esc(c2.name)}</option>`).join("")}</select>` : ""}<select onchange="rstat('${r.id}',this.value)">${["new", "contacted", "done"].map((s) => `<option ${s === r.status ? "selected" : ""}>${s}</option>`).join("")}</select>${isAdmin() ? `<button class="btn o sm" onclick="del('requests','${r.id}')">Delete</button>` : ""}</div></div>`;
  };
  async function rstat(id, v) {
    try {
      await B.set("requests", id, { ...strip(D.requests.find((x) => x.id === id)), status: v });
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  async function assign(id, cid) {
    try {
      await B.set("requests", id, { ...strip(D.requests.find((x) => x.id === id)), cid });
      toast(cid ? "Request assigned \u2014 the coach can now see it" : "Assignment removed");
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  async function del(col, id) {
    if (!confirm("Delete this item?")) return;
    try {
      await B.remove(col, id);
      if (col === "coaches") await B.remove("coachPrivate", id);
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  function badges() {
    const tb = document.querySelectorAll(".at button");
    if (!tb.length) return;
    if (isAdmin()) {
      if (tb[1]) tb[1].textContent = "Demo requests (" + NEW() + " new)";
      if (tb[2]) tb[2].textContent = "Coach applications (" + NA() + " new)";
    } else if (tb[1]) tb[1].textContent = "Bookings (" + D.requests.filter((r) => r.status === "new").length + " new)";
  }
  function aList() {
    const L = $("alist");
    if (!L) return;
    badges();
    if (!isAdmin()) {
      L.innerHTML = cList();
      return;
    }
    const kp = $("kpi");
    if (kp) kp.innerHTML = `<div><b>${NEW()}</b><span>New demo requests</span></div><div><b>${D.requests.length}</b><span>Total requests</span></div><div><b>${NA()}</b><span>New applications</span></div><div><b>${D.coaches.length}</b><span>Coaches</span></div><div><b>${D.reviews.length}</b><span>Reviews</span></div>`;
    const sorted = (a) => [...a].sort((x, y) => y.ts - x.ts);
    L.innerHTML = {
      ov: () => sorted(D.requests).slice(0, 5).map(rq).join("") || empty("No demo requests yet."),
      req: () => {
        const q = (($("rq_s") || {}).value || "").toLowerCase(), f = ($("rq_f") || {}).value || "all";
        return sorted(D.requests).filter((r) => (f === "all" || r.status === f) && (!q || (r.name + r.phone).toLowerCase().includes(q))).map(rq).join("") || empty("No matching demo requests.");
      },
      apps: () => sorted(D.apps).map((a) => `<div class="rw"><div><b>${esc(a.name)}</b> <span class="bdg ${a.status}">${a.status}</span><div class="mu">${esc(a.rating)} \xB7 ${esc(a.city || "")}</div><div class="mu">\u2709 <a href="mailto:${esc(a.email)}">${esc(a.email)}</a></div><div class="mu">${new Date(a.ts).toLocaleString("en-IN")}</div></div><div class="ra">${a.status === "new" ? `<button class="btn sm" onclick="approve('${a.id}')">Approve</button><button class="btn o sm" onclick="setApp('${a.id}','rejected')">Reject</button>` : ""}<button class="btn o sm" onclick="del('apps','${a.id}')">Delete</button></div></div>`).join("") || empty("No applications yet."),
      coaches: () => D.coaches.map((c) => `<div class="rw"><div class="rwl"><div class="pv sm2">${c.photo ? `<img src="${c.photo}" alt="">` : ini(c.name)}</div><div><b>${esc(c.name)}</b> <span class="bdg ${c.status === "hidden" ? "done" : "new"}">${c.status === "hidden" ? "hidden" : "live"}</span><div class="mu">${esc(c.title)} \xB7 ${esc(c.city)} \xB7 \u20B9${c.price}/hr</div><div class="mu">\u2709 ${esc(emailOf(c.id) || "no login")}</div></div></div><div class="ra"><button class="btn sm" onclick="editCoach('${c.id}')">Edit</button><button class="btn o sm" onclick="toggleCoach('${c.id}')">${c.status === "hidden" ? "Show" : "Hide"}</button><button class="btn o sm" onclick="del('coaches','${c.id}')">Delete</button></div></div>`).join("") || empty("No coaches yet \u2014 add one or load sample data."),
      reviews: () => sorted(D.reviews).map((r) => `<div class="rw"><div><span class="q" style="color:#f9a825">${"\u2605".repeat(+r.stars || 5)}</span> <b>${esc(r.name)}</b><div class="mu">${esc(r.text)}</div><div class="mu">Coach: ${esc((D.coaches.find((c) => c.id === r.cid) || {}).name || "\u2014")}</div></div><div class="ra"><button class="btn o sm" onclick="del('reviews','${r.id}')">Delete</button></div></div>`).join("") || empty("No reviews yet."),
      data: () => ""
    }[at]();
  }
  function editCoach(id) {
    $("aform").innerHTML = cform(D.coaches.find((x) => x.id === id), true);
    $("app").scrollTo(0, 0);
  }
  var cformNew = () => cform(null, true);
  async function toggleCoach(id) {
    const c = D.coaches.find((x) => x.id === id);
    try {
      await B.set("coaches", id, { ...strip(c), status: c.status === "hidden" ? "active" : "hidden" });
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  async function setApp(id, s) {
    try {
      await B.set("apps", id, { ...strip(D.apps.find((a) => a.id === id)), status: s });
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  async function approve(id) {
    const a = D.apps.find((x) => x.id === id), pw = Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6).toUpperCase() + "7";
    try {
      const cid = await B.createUser(a.email.toLowerCase(), pw);
      await B.set("coachPrivate", cid, { email: a.email.toLowerCase() });
      await B.set("coaches", cid, { name: a.name, title: a.rating, city: a.city || "India", mode: "Online", cats: ["Kids"], price: 600, exp: 0, students: 0, langs: "English", bio: "New coach on MyChess64.", c1: COL[0][0], c2: COL[0][1], photo: "", status: "active" });
      await setApp(id, "approved");
      $("anote").innerHTML = `\u2713 ${esc(a.name)} approved and listed. Login: <b>${esc(a.email)}</b> \xB7 temporary password <b>${pw}</b> \u2014 share it with the coach (they can change it with \u201CForgot password\u201D).`;
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  async function addRv() {
    const t = $("rv_t").value.trim(), n = $("rv_n").value.trim(), c = $("rv_c").value;
    if (!t || !n || !c) {
      toast("Coach, name and review text are required", 1);
      return;
    }
    try {
      await B.set("reviews", uid(), { cid: c, name: n, text: t, stars: +$("rv_s").value, ts: Date.now() });
      $("rv_t").value = "";
      $("rv_n").value = "";
      toast("Review added \u2713");
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  async function exportCsv() {
    const q = (s) => '"' + String(s != null ? s : "").replace(/"/g, '""') + '"';
    const rows = [["Date", "Name", "Phone", "Category", "Coach", "Slot", "Status"], ...D.requests.map((r) => [new Date(r.ts).toLocaleString("en-IN"), r.name, r.phone, r.cat, (D.coaches.find((c) => c.id === r.cid) || {}).name || "", r.slot, r.status])].map((r) => r.map(q).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    a.download = "demo-requests.csv";
    a.click();
  }
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
    await B.set("classes", "c2", { cid: "s1", title: "Tournament Prep", date: d(4), time: "19:00", dur: 90, mode: "Online", cap: 4, level: "Advanced", link: "" });
  }
  async function loadSample() {
    try {
      await sample();
      toast("Sample data loaded \u2713");
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  function cTab(k) {
    ct = k || ct;
    const c = mine();
    if (!c) {
      $("app").innerHTML = shell("Coach dashboard", [], "", "cTab");
      $("abody").innerHTML = empty("Your coach profile was not found. Please contact the admin.");
      return;
    }
    const nb = D.requests.filter((r) => r.status === "new").length, s = stat(c);
    $("app").innerHTML = shell("Coach dashboard \xB7 " + esc(c.name), [["ov", "Overview"], ["bk", "Bookings (" + nb + " new)"], ["sch", "Schedule"], ["pf", "My profile"]], ct, "cTab");
    $("abody").innerHTML = {
      ov: `<div class="ss4"><div><b>${D.requests.length}</b><span>Total bookings</span></div><div><b>${nb}</b><span>New requests</span></div><div><b>${upcoming(c.id).length}</b><span>Upcoming classes</span></div><div><b>${s.n ? s.r.toFixed(1) : "\u2014"}</b><span>Rating (${s.n} reviews)</span></div></div><h3 style="margin:22px 0 10px">Next classes</h3><div id="alist"></div>`,
      bk: '<div id="alist"></div>',
      sch: `<div class="fm"><h3>Schedule a chess class</h3><div class="g2"><label>Class title<input id="s_t" placeholder="e.g. Opening Basics"></label><label>Date<input id="s_d" type="date" min="${today()}"></label><label>Time<input id="s_h" type="time" value="17:00"></label><label>Duration (min)<input id="s_u" type="number" value="60"></label><label>Mode<select id="s_m"><option>Online</option><option>Home</option></select></label><label>Seats<input id="s_c" type="number" value="5" min="1"></label><label>Level<select id="s_l"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label>Meeting link (optional)<input id="s_k" placeholder="https://"></label></div><div class="ra"><button class="btn" onclick="addCls()">Add to schedule</button></div></div><div id="alist"></div>`,
      pf: '<div id="aform">' + cform(c, false) + "</div>"
    }[ct];
    aList();
  }
  function cList() {
    const L = (a, m) => a.join("") || empty(m), id = myId();
    if (ct === "bk") return L([...D.requests].sort((a, b) => b.ts - a.ts).map(rq), "No bookings yet \u2014 students who book you appear here.");
    const cl = D.classes.filter((c) => c.cid === id).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)), lim = ct === "ov" ? cl.filter((c) => c.date >= today()).slice(0, 4) : cl;
    return L(lim.map((c) => `<div class="rw"><div><b>${esc(c.title)}</b> <span class="bdg ${c.date < today() ? "done" : "new"}">${c.date < today() ? "past" : "upcoming"}</span><div class="mu">${fd(c.date)} \xB7 ${tf(c.time)} \xB7 ${c.dur} min \xB7 ${esc(c.mode)} \xB7 ${esc(c.level)}</div><div class="mu">${+c.cap - seats(c)} booked of ${c.cap} seats${url(c.link) ? ` \xB7 <a target="_blank" rel="noopener" href="${esc(url(c.link))}">Join link</a>` : ""}</div></div>${ct === "sch" ? `<div class="ra"><button class="btn o sm" onclick="del('classes','${c.id}')">Delete</button></div>` : ""}</div>`), "No classes scheduled yet.");
  }
  async function addCls() {
    const g = (i) => $(i).value.trim();
    if (!g("s_t") || !g("s_d") || !g("s_h")) {
      toast("Title, date and time are required", 1);
      return;
    }
    try {
      await B.set("classes", uid(), { cid: myId(), title: g("s_t"), date: g("s_d"), time: g("s_h"), dur: +g("s_u") || 60, mode: $("s_m").value, cap: +g("s_c") || 1, level: $("s_l").value, link: url(g("s_k")) });
      $("s_t").value = "";
      toast("Class scheduled \u2713 \u2014 students can now book it");
    } catch (e) {
      toast(errMsg(e), 1);
    }
  }
  function initPanel() {
    hooks.render = () => {
      draw();
      if (panelOpen() && $("alist")) aList();
    };
    Object.assign(window, { aList, assign, openLogin, doLogin, forgot, closeApp, logout, phPick, sendReset, csave, aTab, cTab, rstat, del, editCoach, cformNew, toggleCoach, setApp, approve, addRv, exportCsv, loadSample, addCls, $ });
    startAuth();
  }

  // ../gh/src/main.js
  document.documentElement.classList.add("js");
  window.__mc64 = true;
  (async () => {
    await initBackend();
    B.onErr = (col, e) => diag("Database problem reading \u201C" + col + "\u201D (" + (e.code || e.message) + "). Check that Firestore is created and firestore.rules are published (README step 2).");
    initPublic();
    initPanel();
    ["coaches", "reviews", "classes", "seatlog"].forEach((col) => B.sub(col, (rows) => {
      D[col] = rows;
      hooks.render();
      if (col === "coaches" && B.mode === "demo" && !rows.length && !ls.get("mc64_seeded")) {
        ls.set("mc64_seeded", "1");
        sample();
      }
    }));
  })();
})();
