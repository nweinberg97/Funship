/* Funship prototype: store, helpers, icons, router */
(function () {
  const KEY = "funship-demo-v3";

  // ---------- Store (browser only; no backend) ----------
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const s = JSON.parse(raw); if (s && s.version === 3) return s; }
    } catch (e) { /* storage unavailable */ }
    return FS.seed();
  }
  FS.state = load();
  FS.save = function () { try { localStorage.setItem(KEY, JSON.stringify(FS.state)); } catch (e) {} };
  FS.reset = function () { try { localStorage.removeItem(KEY); } catch (e) {} FS.state = FS.seed(); FS.save(); };
  FS.viewer = () => FS.state.users[FS.state.viewer];
  FS.family = () => { const v = FS.viewer(); return v && v.familyId ? FS.state.families[v.familyId] : null; };
  FS.uid = (p) => p + "-" + Math.random().toString(36).slice(2, 8);

  // ---------- Helpers ----------
  FS.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  FS.money = (n) => "$" + Number(n).toLocaleString("en-US");
  FS.date = (t, opts) => new Date(t).toLocaleDateString("en-US", opts || { month: "short", day: "numeric" });
  FS.dateTime = (t) => new Date(t).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  FS.ago = (t) => {
    const d = Math.round((Date.now() - t) / 86400000);
    if (d < 0) return "in " + -d + (d === -1 ? " day" : " days"); if (d === 0) return "today"; if (d === 1) return "yesterday"; return d + " days ago";
  };
  FS.idea = (slug) => FS.IDEAS.find((i) => i.slug === slug);
  FS.cat = (id) => FS.CATEGORIES.find((c) => c.id === id);
  FS.$ = (sel, root) => (root || document).querySelector(sel);
  FS.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  FS.toast = function (msg) {
    const old = FS.$(".toast"); if (old) old.remove();
    const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2800);
  };

  FS.modal = function (html, onMount) {
    const s = document.createElement("div"); s.className = "scrim";
    s.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}<button class="x" data-close aria-label="Close">${FS.icon("x")}</button></div>`;
    const prev = document.activeElement;
    const close = () => { s.remove(); document.removeEventListener("keydown", onKey); if (prev && prev.focus) prev.focus(); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    s.addEventListener("click", (e) => { if (e.target === s || e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(s);
    const f = s.querySelector("input, textarea, button:not(.x)"); if (f) f.focus();
    if (onMount) onMount(s, close);
    return close;
  };

  FS.confetti = function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas"); c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:100";
    c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    const x = c.getContext("2d"); const cols = ["#FFC83D", "#FF7FA8", "#24A898", "#4B3FD1", "#9C92FF"];
    const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .45, vx: (Math.random() - .5) * 16, vy: -Math.random() * 16 - 4, r: Math.random() * 6 + 4, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6 }));
    const t0 = performance.now();
    (function f(t) {
      x.clearRect(0, 0, c.width, c.height);
      ps.forEach((p) => { p.vy += .5; p.x += p.vx; p.y += p.vy; p.a += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); });
      if (t - t0 < 1200) requestAnimationFrame(f); else c.remove();
    })(t0);
  };

  // ---------- Icons ----------
  const I = {
    check: '<path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    stop: '<rect x="7" y="7" width="10" height="10" rx="2.5" fill="currentColor"/>',
    arrowL: '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    home: '<path d="M4 11l8-6.5 8 6.5V20h-5v-5h-6v5H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    sparkle: '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z" fill="currentColor"/>',
    gift: '<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-1.5-3-5-3.5-5-1.2C7 7 10 7 12 7zm0 0c1.5-3 5-3.5 5-1.2C17 7 14 7 12 7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/>',
    gear: '<circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    apps: '<rect x="4" y="4" width="7" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="7" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="13" width="7" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    inbox: '<path d="M3 13l3-8h12l3 8v6H3zM3 13h5l1.5 2.5h5L16 13h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    users: '<circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 19c.7-3.4 3-5 6-5s5.3 1.6 6 5M16 5.2a3 3 0 010 5.6M18 14.2c1.6.6 2.6 2.1 3 4.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    shield: '<path d="M12 3l8 3v6c0 4.6-3.3 8-8 9-4.7-1-8-4.4-8-9V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    play: '<path d="M8 5l11 7-11 7z" fill="currentColor"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    // category glyphs (filled, friendly)
    map: '<path d="M3 6l6-2.5 6 2.5 6-2.5v14.5L15 20.5 9 18l-6 2.5z" fill="currentColor" opacity=".25"/><path d="M3 6l6-2.5 6 2.5 6-2.5v14.5L15 20.5 9 18l-6 2.5zM9 3.5V18M15 6v14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="11" r="1.8" fill="currentColor"/>',
    pot: '<path d="M4 10h16v5a5 5 0 01-5 5H9a5 5 0 01-5-5z" fill="currentColor" opacity=".25"/><path d="M4 10h16v5a5 5 0 01-5 5H9a5 5 0 01-5-5zM2 10h20M9 4.5c0 1.5 1 1.5 1 3M13 4.5c0 1.5 1 1.5 1 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="8.5" fill="currentColor" opacity=".25"/><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" fill="currentColor" opacity=".25"/><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" opacity=".25"/><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="9" r="1.5" fill="currentColor"/><circle cx="15" cy="15" r="1.5" fill="currentColor"/><circle cx="15" cy="9" r="1.5" fill="currentColor"/><circle cx="9" cy="15" r="1.5" fill="currentColor"/>',
    cake: '<path d="M4 12h16v8H4z" fill="currentColor" opacity=".25"/><path d="M4 12h16v8H4zM4 15.5c2 1.5 4-1.5 6 0s4 1.5 6 0 2.6-.6 4 0M12 12V8M12 5.5c.9-.9.9-2-.0-3-.9 1-.9 2.1 0 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    book: '<path d="M4 5c3-1 5.5-1 8 1 2.5-2 5-2 8-1v14c-3-1-5.5-1-8 1-2.5-2-5-2-8-1z" fill="currentColor" opacity=".25"/><path d="M4 5c3-1 5.5-1 8 1 2.5-2 5-2 8-1v14c-3-1-5.5-1-8 1-2.5-2-5-2-8-1zM12 6v14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    heart: '<path d="M12 20s-8-4.7-8-10.2A4.3 4.3 0 0112 7.5a4.3 4.3 0 018 2.3C20 15.3 12 20 12 20z" fill="currentColor" opacity=".25"/><path d="M12 20s-8-4.7-8-10.2A4.3 4.3 0 0112 7.5a4.3 4.3 0 018 2.3C20 15.3 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    pencil: '<path d="M4 20l1-5L15.5 4.5l4 4L9 19z" fill="currentColor" opacity=".25"/><path d="M4 20l1-5L15.5 4.5l4 4L9 19zM13 7l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  };
  FS.icon = (name, cls) => `<svg viewBox="0 0 24 24" aria-hidden="true"${cls ? ` class="${cls}"` : ""}>${I[name] || ""}</svg>`;

  // Pip, the little spark (original mascot)
  FS.pip = function (opts) {
    opts = opts || {};
    const mood = opts.mood || "happy";
    const mouth = mood === "proud" ? '<path d="M44 58c3 4 9 4 12 0" fill="none" stroke="#23205C" stroke-width="3.2" stroke-linecap="round"/>'
      : mood === "sleepy" ? '<path d="M45 59h10" stroke="#23205C" stroke-width="3" stroke-linecap="round"/>'
      : '<path d="M43 57c4 6 11 6 15 0" fill="#23205C"/>';
    const eyes = mood === "sleepy" ? '<path d="M37 47c2 2 5 2 7 0M56 47c2 2 5 2 7 0" fill="none" stroke="#23205C" stroke-width="3" stroke-linecap="round"/>'
      : '<ellipse cx="40" cy="46" rx="3.4" ry="4.4" fill="#23205C"/><ellipse cx="60" cy="46" rx="3.4" ry="4.4" fill="#23205C"/><circle cx="41.2" cy="44.5" r="1.2" fill="#fff"/><circle cx="61.2" cy="44.5" r="1.2" fill="#fff"/>';
    return `<svg viewBox="0 0 100 100" class="${opts.cls || ""}" aria-hidden="true">
      <path d="M50 4 C56 30 70 44 96 50 C70 56 56 70 50 96 C44 70 30 56 4 50 C30 44 44 30 50 4Z" fill="${opts.fill || "#FFC83D"}" stroke="#23205C" stroke-width="${opts.stroke == null ? 0 : opts.stroke}"/>
      <ellipse cx="33" cy="55" rx="5" ry="3" fill="#FF7FA8" opacity=".7"/><ellipse cx="67" cy="55" rx="5" ry="3" fill="#FF7FA8" opacity=".7"/>
      ${eyes}${mouth}
    </svg>`;
  };
  FS.logo = () => `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M3 26h34l-5.5 8.5h-23z" fill="var(--violet)"/><path d="M20 3c1.2 6 4 9 10.5 10.3C24 14.6 21.2 17.5 20 23.5c-1.2-6-4-8.9-10.5-10.2C16 12 18.8 9 20 3z" fill="#FFC83D"/></svg>`;

  FS.tierChip = (tier) => `<span class="tier-chip ${tier}"><i></i>${FS.TIERS[tier].name} · from ${FS.money(FS.TIERS[tier].price)}</span>`;

  FS.ideaTile = function (idea, big) {
    const c = FS.cat(idea.cat);
    return `<a class="idea-tile c-${c.colour}${big ? " big" : ""}" href="#/ideas/${idea.slug}">
      <div class="art">${FS.icon(c.icon)}</div>
      <div class="body"><h3>${FS.esc(idea.name)}</h3><p class="muted small">${FS.esc(idea.pitch)}</p>
      <div class="meta">${FS.tierChip(idea.tier)}</div></div></a>`;
  };

  // ---------- Router ----------
  FS.routes = [];
  FS.route = (pattern, view, opts) => FS.routes.push({ re: new RegExp("^" + pattern.replace(/:(\w+)/g, "([^/]+)") + "$"), view, opts: opts || {} });
  // The current route lives in FS.path, so navigation works even where the address bar
  // can't be changed (embedded or sandboxed viewers). The hash is kept in sync when allowed.
  const fromHash = () => { try { const h = location.hash || ""; return h.startsWith("#/") ? h.slice(1) : "/"; } catch (e) { return "/"; } };
  FS.path = fromHash();
  FS.query = () => new URLSearchParams(FS.path.split("?")[1] || "");
  FS.go = (path) => {
    FS.path = path || "/";
    try { if (location.hash !== "#" + FS.path) history.pushState(null, "", "#" + FS.path); } catch (e) { /* sandboxed: keep in-page state only */ }
    FS.render();
  };
  let lastPath = null;

  FS.render = function () {
    const path = (FS.path || "/").split("?")[0] || "/";
    const root = FS.$("#app");
    for (const r of FS.routes) {
      const m = path.match(r.re);
      if (m) {
        if (r.opts.needs && !r.opts.needs(FS.viewer())) { root.innerHTML = FS.layout.gate(r.opts.needs.label); FS.after(); return; }
        try {
          const out = r.view.apply(null, m.slice(1).map(decodeURIComponent));
          root.innerHTML = typeof out === "string" ? out : out.html;
          if (out && out.mount) out.mount(root);
        } catch (err) {
          console.error(err);
          root.innerHTML = FS.layout.site(`<div class="wrap empty" style="padding:120px 0"><h1 style="font-size:2rem">This screen didn't load</h1><p class="muted">Reset the demo data and try again.</p><button class="btn" onclick="FS.reset();FS.go('/')">Reset and go home</button></div>`);
        }
        FS.after(path, r.opts);
        return;
      }
    }
    root.innerHTML = FS.layout.site(`<div class="wrap empty" style="padding:120px 0">${FS.pip({ cls: "pip", mood: "sleepy" })}<h2>This page drifted off</h2><p class="muted">The link may be old. Head back to the start.</p><a class="btn" href="#/">Go to the home page</a></div>`);
    FS.after(path);
  };

  FS.after = function (path, opts) {
    if (path !== lastPath) window.scrollTo(0, 0);
    lastPath = path;
    if (!(path || "").startsWith("/app/")) document.body.style.background = "";
    const h1 = FS.$("#app h1"); document.title = (h1 ? h1.textContent.trim().replace(/\s+/g, " ") + " | " : "") + "Funship";
    FS.$$(".nav a, .side a").forEach((a) => {
      const href = a.getAttribute("href").slice(1);
      const on = href === path || (href !== "/" && href !== "/portal" && href !== "/admin" && path && path.startsWith(href));
      a.toggleAttribute("aria-current", !!on); if (on) a.setAttribute("aria-current", "page");
    });
    FS.layout.demoBar();
  };

  const syncFromHash = () => { const h = fromHash(); if (h !== FS.path) { FS.path = h; FS.render(); } };
  window.addEventListener("hashchange", syncFromHash);
  window.addEventListener("popstate", syncFromHash);
  // Handle in-app links ourselves so they never depend on the hash changing.
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!a || a.target === "_blank") return;
    e.preventDefault();
    const nav = document.getElementById("nav"); if (nav) nav.classList.remove("open");
    FS.go(a.getAttribute("href").slice(1));
  });
  window.addEventListener("scroll", () => { const h = FS.$(".site-head"); if (h) h.classList.toggle("scrolled", scrollY > 8); }, { passive: true });
})();
