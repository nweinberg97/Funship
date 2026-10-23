/* Funship prototype: page shells */
(function () {
  const L = (FS.layout = {});

  L.header = function () {
    const v = FS.viewer();
    const account = v.role === "admin"
      ? `<a class="btn small quiet" href="#/admin">Workbench</a>`
      : `<a class="btn small quiet hide-sm" href="#/portal">My family</a>`;
    return `<header class="site-head"><div class="wrap">
      <a class="logo" href="#/">${FS.logo()}<span>Funship</span></a>
      <nav class="nav" id="nav" aria-label="Main">
        <a href="#/ideas">Ideas</a><a href="#/how-it-works">How it works</a><a href="#/pricing">Pricing</a><a href="#/gifts">Gifts</a><a href="#/about">The maker</a>
      </nav>
      <div class="head-actions">${account}<a class="btn small" href="#/start">Start your app</a>
        <button class="btn small quiet menu-btn" aria-expanded="false" aria-controls="nav" onclick="const n=document.getElementById('nav');const o=n.classList.toggle('open');this.setAttribute('aria-expanded',o)" aria-label="Menu">${FS.icon("menu")}</button>
      </div></div></header>`;
  };

  L.footer = () => `<footer class="site-foot"><div class="wrap">
      <div class="stack" style="--gap:12px"><a class="logo" href="#/">${FS.logo()}<span>Funship</span></a><p>Little apps made for one family at a time, in Vancouver, BC.</p><p class="small muted">This is a clickable prototype. Nothing here is charged, sent or stored on a server.</p></div>
      <div><h4>Make</h4><ul><li><a href="#/ideas">Ideas</a></li><li><a href="#/start">Start your app</a></li><li><a href="#/pricing">Pricing</a></li><li><a href="#/how-it-works">How it works</a></li></ul></div>
      <div><h4>Give</h4><ul><li><a href="#/gifts">Give a Funship app</a></li><li><a href="#/redeem/demo-gift">Redeem a gift</a></li></ul></div>
      <div><h4>Trust</h4><ul><li><a href="#/privacy">Your family's privacy</a></li><li><a href="#/faq">Questions</a></li><li><a href="#/about">The maker</a></li></ul></div>
    </div></footer>`;

  L.site = (main) => L.header() + `<main id="main">${main}</main>` + L.footer();

  L.portal = function (main, active) {
    const fam = FS.family();
    const links = [["/portal", "home", "Home"], ["/portal/apps", "apps", "Our apps"], ["/portal/billing", "card", "Payments"], ["/portal/gifts", "gift", "Gifts"], ["/portal/settings", "gear", "Family settings"]];
    return L.header() + `<main id="main" class="wrap portal">
      <nav class="side" aria-label="Family portal">
        <div class="fam"><span class="muted small">Signed in as ${FS.esc(FS.viewer().name)}</span><strong>${FS.esc(fam.name)}</strong></div>
        ${links.map(([h, i, t]) => `<a href="#${h}">${FS.icon(i)}${t}</a>`).join("")}
      </nav>
      <div class="portal-main">${main}</div></main>`;
  };

  L.admin = function (main) {
    const links = [["/admin", "home", "Today"], ["/admin/requests", "inbox", "Requests"], ["/admin/feedback", "chat", "Feedback"], ["/admin/projects", "layers", "Builds"], ["/admin/calendar", "cal", "Calls"], ["/admin/gifts", "gift", "Gifts"], ["/admin/templates", "apps", "App Kit"]];
    return `<div class="mock-banner">Demo mode: payments, emails and voice are simulated in your browser.</div>` +
      `<header class="site-head"><div class="wrap" style="max-width:1320px;width:min(1320px,100% - 32px)">
        <a class="logo" href="#/admin">${FS.logo()}<span>Funship</span></a><span class="tag violet">Workbench</span>
        <div class="head-actions"><a class="btn small quiet" href="#/">View site</a></div></div></header>` +
      `<main id="main" class="wrap portal" style="width:min(1320px,100% - 32px)">
        <nav class="side" aria-label="Workbench"><div class="fam"><span class="muted small">Your workbench</span><strong>Hi, maker</strong></div>
        ${links.map(([h, i, t]) => `<a href="#${h}">${FS.icon(i)}${t}</a>`).join("")}</nav>
        <div class="portal-main">${main}</div></main>`;
  };

  L.gate = function (label) {
    return L.site(`<div class="wrap empty" style="padding:120px 0">${FS.pip({ cls: "pip", mood: "sleepy" })}<h1 style="font-size:2.4rem">${label === "admin" ? "This is the maker's workbench" : "Sign in to see your family's space"}</h1>
      <p class="muted">For this demo, switch who you're viewing as.</p>
      <div class="row" style="justify-content:center">${label === "admin" ? `<button class="btn" onclick="FS.switchTo('maker','/admin')">View as the maker</button>` : `<button class="btn" onclick="FS.switchTo('alex','/portal')">View as Alex Chen</button><button class="btn ghost" onclick="FS.switchTo('jamie','/portal')">View as Jamie Morgan</button>`}</div></div>`);
  };

  FS.switchTo = function (who, path) { FS.state.viewer = who; FS.save(); FS.go(path); };

  L.demoBar = function () {
    if (location.hash.startsWith("#/app/")) { const b = FS.$(".demo-bar"); if (b) b.remove(); return; }
    let bar = FS.$(".demo-bar");
    if (!bar) { bar = document.createElement("div"); bar.className = "demo-bar"; document.body.appendChild(bar); }
    const v = FS.state.viewer;
    bar.innerHTML = `<span class="tag">Prototype</span><label class="sr" for="viewas">View as</label>
      <select id="viewas"><option value="alex"${v === "alex" ? " selected" : ""}>Alex Chen (parent)</option><option value="jamie"${v === "jamie" ? " selected" : ""}>Jamie Morgan (parent)</option><option value="maker"${v === "maker" ? " selected" : ""}>The maker (you)</option></select>
      <button type="button" id="resetdemo">Reset demo</button>`;
    bar.querySelector("#viewas").onchange = (e) => { const w = e.target.value; FS.switchTo(w, w === "maker" ? "/admin" : "/portal"); };
    bar.querySelector("#resetdemo").onclick = () => { FS.reset(); FS.toast("Demo reset to the starting data."); FS.render(); };
  };

  // ---------- The harbour (hero art) ----------
  L.harbourArt = function () {
    const stars = [[8,10],[18,22],[30,8],[44,18],[56,6],[66,24],[78,12],[88,20],[94,7],[72,4],[38,28],[12,34],[84,32]]
      .map(([x, y], i) => `<circle class="twinkle" style="animation-delay:${(i * .37) % 3}s" cx="${x * 12}" cy="${y * 6}" r="${i % 3 ? 2 : 3}" fill="#FFF6D6"/>`).join("");
    return `<svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><radialGradient id="glow" cx="78%" cy="26%" r="40%"><stop offset="0" stop-color="#5A4FE0" stop-opacity=".55"/><stop offset="1" stop-color="#23205C" stop-opacity="0"/></radialGradient></defs>
      <rect width="1200" height="640" fill="url(#glow)"/>
      ${stars}
      <g transform="translate(870 70)"><g class="pip-float">${FS.pip().replace('<svg viewBox="0 0 100 100" class="" aria-hidden="true">', '<svg viewBox="0 0 100 100" width="150" height="150">')}</g></g>
      <path d="M0 470 C 160 430 320 500 480 466 C 640 432 800 490 960 460 C 1080 438 1150 455 1200 450 V640 H0Z" fill="#2E2A78"/>
      <path d="M0 520 C 140 490 300 548 470 516 C 640 484 790 540 960 512 C 1080 492 1150 506 1200 500 V640 H0Z" fill="#1FA092"/>
      <path d="M0 568 C 170 540 330 590 500 562 C 670 534 820 584 980 560 C 1090 544 1160 556 1200 552 V640 H0Z" fill="#24A898"/>
      <path d="M0 606 C 180 586 340 624 520 602 C 700 580 860 620 1020 600 C 1110 590 1170 598 1200 596 V640 H0Z" fill="#5CC9BB"/>
    </svg>`;
  };

  L.hull = (fill) => `<svg class="boat-hull" viewBox="0 0 200 60" aria-hidden="true"><path d="M4 8 H196 L160 54 H40 Z" fill="${fill}"/><path d="M4 8 H196" stroke="#23205C" stroke-opacity=".25" stroke-width="3"/></svg>`;
})();
