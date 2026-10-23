/* Funship prototype: public site */
(function () {
  const L = FS.layout, esc = FS.esc, icon = FS.icon;

  // ---------- Home ----------
  FS.route("/", function () {
    const boats = [
      { slug: "chore-quest", x: "50%", b: "128px", w: "230px", r: "-3deg", d: ".15s", c: "#FFC83D", hull: "#FF7FA8" },
      { slug: "dinner-picker", x: "69%", b: "64px", w: "210px", r: "2deg", d: ".35s", c: "#24A898", hull: "#FFC83D" },
      { slug: "bedtime-story-machine", x: "80%", b: "196px", w: "200px", r: "-1deg", d: ".55s", c: "#FF7FA8", hull: "#9C92FF" },
    ];
    const boatHtml = boats.map((b) => {
      const idea = FS.idea(b.slug);
      return `<div class="boat" style="--x:${b.x};--b:${b.b};--w:${b.w};--r:${b.r};--d:${b.d};--c:${b.c}"><a href="#/ideas/${b.slug}" aria-label="${esc(idea.name)}: see this idea">
        <div class="boat-card"><div class="bc-strip"></div><div class="bc-name">${esc(idea.name)}</div><div class="bc-meta">${esc(FS.cat(idea.cat).name)}</div></div>${L.hull(b.hull)}</a></div>`;
    }).join("");
    const shelf = ["chore-quest", "dinner-picker", "road-trip-bingo", "our-family-book", "bedtime-story-machine", "hello-grandma"].map((s, i) => FS.ideaTile(FS.idea(s), i === 0)).join("");
    const tiers = Object.values(FS.TIERS).map((t) => tierCard(t, t.id === "bloom")).join("");

    return L.site(`
      <section class="hero"><div class="wrap"><div class="harbour">
        <div class="harbour-art">${L.harbourArt()}</div>
        <div class="harbour-copy">
          <h1>Little apps.<span class="line2">Big family magic.</span></h1>
          <p class="lede">Tell us about your routines, your drawings and your inside jokes. We'll make a small, beautiful app that only your family has.</p>
          <div class="row"><a class="btn sun" href="#/start">Make something for your family</a><a class="btn ghost" href="#/ideas">Explore ideas</a></div>
          <p class="trust">Made by a real person. No ads. Nothing you don't need.</p>
        </div>
        <div class="boats">${boatHtml}</div>
      </div></div></section>

      <section class="band"><div class="wrap">
        <div class="section-head"><h2>Your family isn't a template.<br>Your app shouldn't feel like one.</h2></div>
        <div class="notes">
          ${note("bubble", "Made around your people", "Your names, your kids' drawings, the dog, the Friday pizza tradition. It's all in there.")}
          ${note("sun", "Only what you need", "One focused app. No ads, no feeds, no settings menu you'll never open.")}
          ${note("lagoon", "Grows with you", "New school year, new baby, new trip? Ask for a change and your app changes with you.")}
        </div>
        <div class="privacy-strip">${icon("shield")}<p>We don't sell your family's information or use it to train AI models. You choose what to share, and you can ask for a copy or deletion any time. <a class="link" href="#/privacy">How we look after it</a></p></div>
      </div></section>

      <section class="band" style="padding-top:0"><div class="wrap">
        <div class="section-head" style="grid-template-columns:1fr auto;align-items:end"><h2>What could we make for you?</h2><a class="btn ghost" href="#/ideas">See all ${FS.IDEAS.length} ideas</a></div>
        <div class="shelf">${shelf}</div>
      </div></section>

      <section class="band" style="background:var(--surface)"><div class="wrap">
        <div class="section-head"><h2>From wish to ship</h2><p>You bring the idea. We'll make it real, and you'll see every step.</p></div>
        ${voyage()}
        <div class="row" style="margin-top:44px"><a class="btn" href="#/start">Start with a little idea</a><a class="link" href="#/how-it-works">More on how it works</a></div>
      </div></section>

      <section class="band"><div class="wrap"><div class="gift-band">
        <div><h2>Give them something that couldn't belong to anyone else</h2>
          <p class="lede">A game starring their kid's drawing. A recipe book full of grandma's stories. Give a Funship app, and they'll tell us their wish.</p>
          <div class="row"><a class="btn" href="#/gifts">Give a Funship app</a><span class="muted small">From $100. Printable card included.</span></div></div>
        ${giftCardPreview({ amount: 300, forChild: "Arjun", message: "For a game starring your dragon drawings. Love, Grandma Rose", from: "Grandma Rose" })}
      </div></div></section>

      <section class="band" style="padding-top:0"><div class="wrap maker">
        <div class="maker-portrait">${FS.pip({ mood: "proud" })}</div>
        <div class="stack" style="--gap:18px"><h2>Thoughtful technology. Human hands.</h2>
          <p class="lede">AI helps us organise your ideas and build faster. A real maker shapes the experience, checks every screen and talks it through with you. We keep the number of projects small so each one gets proper care.</p>
          <a class="link" href="#/about">Meet the maker</a></div>
      </div></section>

      <section class="band" style="background:var(--surface)"><div class="wrap">
        <div class="section-head"><h2>Start small. Make it special.</h2><p>Every project starts with an agreed plan and price. No surprise features. No membership required.</p></div>
        <div class="tiers">${tiers}</div>
      </div></section>

      <section class="final"><div class="wrap">
        ${FS.pip({ cls: "pip", mood: "happy" }).replace('class="pip"', 'class="pip" style="width:88px;margin:0 auto 24px"')}
        <h2>What would make your family's day a little better?</h2>
        <p>It doesn't have to be a big idea. The small, personal ones are often the ones we love most.</p>
        <a class="btn sun" href="#/start">Tell us your idea</a>
      </div></section>`);
  });

  function note(colour, title, text) {
    const fills = { bubble: "#FF7FA8", sun: "#FFC83D", lagoon: "#24A898" };
    const shapes = {
      bubble: `<circle cx="32" cy="32" r="26" fill="${fills.bubble}"/><circle cx="24" cy="28" r="4" fill="#23205C"/><circle cx="40" cy="28" r="4" fill="#23205C"/><path d="M22 40c6 6 14 6 20 0" stroke="#23205C" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
      sun: `<rect x="8" y="8" width="48" height="48" rx="14" fill="${fills.sun}"/><path d="M20 33l8 8 16-17" stroke="#23205C" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
      lagoon: `<path d="M32 56c-6-12-22-12-22-28 0-8 6-14 14-12 4 1 6 4 8 8 2-4 4-7 8-8 8-2 14 4 14 12 0 16-16 16-22 28z" fill="${fills.lagoon}"/><path d="M32 54V22" stroke="#23205C" stroke-width="3.5" stroke-linecap="round"/>`,
    };
    return `<div class="note"><svg class="blob" viewBox="0 0 64 64" aria-hidden="true">${shapes[colour]}</svg><h3>${title}</h3><p>${text}</p></div>`;
  }

  function voyage() {
    const s = [
      ["Tell us your wish", "Speak, type, draw, or show us an example. Two minutes is plenty."],
      ["Shape it together", "We turn it into a clear plan with a price and a list of what's included."],
      ["Watch it come to life", "Follow the build, try the preview, and say what to change out loud."],
      ["Make it yours", "Your app arrives, ready to open on your family's phones and tablets."],
    ];
    return `<ol class="voyage">${s.map((x, i) => `<li><div class="stop">${i === 3 ? icon("sparkle").replace("<svg", '<svg style="width:26px"') : i + 1}</div><h3>${x[0]}</h3><p>${x[1]}</p></li>`).join("")}</ol>`;
  }

  function tierCard(t, featured) {
    const glyph = { sprout: `<path d="M16 28V16M16 16c0-6-5-9-11-8 0 6 5 9 11 8zm0-2c0-6 4-9 11-9 0 7-4 10-11 9z" fill="#24A898"/>`, bloom: `<circle cx="16" cy="16" r="5" fill="#FFC83D"/><g fill="#FF7FA8"><circle cx="16" cy="6" r="5"/><circle cx="26" cy="16" r="5"/><circle cx="16" cy="26" r="5"/><circle cx="6" cy="16" r="5"/></g><circle cx="16" cy="16" r="5" fill="#FFC83D"/>`, grove: `<circle cx="10" cy="13" r="7" fill="#24A898"/><circle cx="22" cy="11" r="8" fill="#9C92FF"/><rect x="9" y="18" width="3" height="11" rx="1.5" fill="#24A898"/><rect x="21" y="17" width="3" height="12" rx="1.5" fill="#9C92FF"/>` }[t.id];
    return `<div class="tier${featured ? " featured" : ""}">
      <div class="tier-name"><svg viewBox="0 0 32 32" aria-hidden="true">${glyph}</svg><h3>${t.name}</h3>${featured ? `<span class="tag" style="margin-left:auto">Most families pick this</span>` : ""}</div>
      <div class="price">${FS.money(t.price)}<small>USD, about C${FS.money(t.cad)}</small></div>
      <p class="muted">${t.pitch}</p>
      <ul>${t.includes.map((i) => `<li>${icon("check")}<span>${i}</span></li>`).join("")}</ul>
      <p class="small muted">Usually ready in ${t.days}</p>
      <a class="btn${featured ? " sun" : " ghost"}" href="#/start?tier=${t.id}">Start a ${t.name} app</a></div>`;
  }
  FS.tierCard = tierCard;

  function giftCardPreview(g) {
    return `<div class="gift-card-preview" aria-label="Gift card preview">
      <div class="gc-top"><div class="gc-logo">${FS.logo()}Funship</div><div class="gc-amt">${FS.money(g.amount || 0)}</div></div>
      <div><div class="gc-for">${g.forChild ? "An app for " + esc(g.forChild) : "A custom app for your family"}</div><p class="gc-msg">${esc(g.message || "Your message will appear here.")}</p><p class="gc-msg" style="margin-top:6px;opacity:.75">From ${esc(g.from || "someone who loves you")}</p></div>
      <svg class="gc-wave" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 80 10 160 50 240 28 C 310 10 360 34 400 26 V60 H0Z" fill="#24A898"/><path d="M0 44 C 90 30 170 60 260 42 C 330 30 370 48 400 42 V60 H0Z" fill="#5CC9BB"/></svg>
    </div>`;
  }
  FS.giftCardPreview = giftCardPreview;

  // ---------- Ideas gallery ----------
  FS.route("/ideas", function () {
    return {
      html: L.site(`<div class="wrap">
        <div class="page-head"><h1>Ideas to make your own</h1><p class="lede">Every family app starts somewhere. Pick one to change, or use them to spark your own.</p></div>
        <div class="filters" role="group" aria-label="Filter ideas">
          <button class="pill" aria-pressed="true" data-goal="all">Everything</button>
          <button class="pill" aria-pressed="false" data-goal="easier">Make life easier</button>
          <button class="pill" aria-pressed="false" data-goal="playful">Make something playful</button>
          <button class="pill" aria-pressed="false" data-goal="gift">Give a gift</button>
        </div>
        <div id="gallery" style="padding:24px 0 100px"></div></div>`),
      mount(root) {
        const draw = (goal) => {
          const groups = FS.CATEGORIES.map((c) => {
            const items = FS.IDEAS.filter((i) => i.cat === c.id && (goal === "all" || i.goal === goal));
            if (!items.length) return "";
            return `<section class="cat-group c-${c.colour}"><h2><span class="dot"></span>${c.name}</h2><div class="grid-ideas">${items.map((i) => FS.ideaTile(i)).join("")}</div></section>`;
          }).join("");
          FS.$("#gallery", root).innerHTML = groups + `<div class="callout" style="margin-top:56px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"><p style="flex:1;min-width:240px"><strong>Have something else in mind?</strong> Tell us anyway. If it's something we don't make, we'll suggest a version we can.</p><a class="btn" href="#/start">Start with my own idea</a></div>`;
        };
        FS.$$(".pill", root).forEach((b) => b.addEventListener("click", () => {
          FS.$$(".pill", root).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); draw(b.dataset.goal);
        }));
        draw("all");
      },
    };
  });

  // ---------- Idea detail ----------
  FS.route("/ideas/:slug", function (slug) {
    const idea = FS.idea(slug);
    if (!idea) return L.site(`<div class="wrap empty" style="padding:120px 0"><h1 style="font-size:2rem">We couldn't find that idea</h1><a class="btn" href="#/ideas">Browse all ideas</a></div>`);
    const c = FS.cat(idea.cat), t = FS.TIERS[idea.tier];
    const related = FS.IDEAS.filter((i) => i.cat === idea.cat && i.slug !== slug).map((i) => FS.ideaTile(i)).join("");
    return L.site(`<div class="wrap">
      <p class="crumb" style="padding-top:32px"><a href="#/ideas">Ideas</a> / ${c.name}</p>
      <div class="idea-hero">
        <div class="stack" style="--gap:18px">
          <h1 style="font-size:clamp(2.4rem,5vw,3.6rem)">${esc(idea.name)}</h1>
          <p class="lede">${esc(idea.pitch)}</p>
          <div class="callout" style="background:var(--sun-soft)"><strong>The magic moment.</strong> ${esc(idea.magic)}</div>
          <dl class="facts"><div><dt>Size</dt><dd>${t.name}</dd></div><div><dt>Starts at</dt><dd>${FS.money(t.price)}</dd></div><div><dt>Usually ready in</dt><dd>${t.days.replace(" working days", " days")}</dd></div></dl>
          <div class="row"><a class="btn" href="#/start?idea=${slug}">Make this your own</a><a class="btn ghost" href="#/gifts?idea=${slug}">Give it as a gift</a></div>
        </div>
        <div class="c-${c.colour}">${phoneMock(idea, c)}</div>
      </div>
      <div class="grid-2" style="padding-bottom:40px">
        <div class="panel"><h3 style="margin-bottom:14px">What's usually in it</h3><ul class="checklist">${idea.features.map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}</ul></div>
        <div class="panel"><h3 style="margin-bottom:14px">Good to know</h3><div class="stack small" style="--gap:10px;color:var(--ink-2)">
          <p>This is a starting point, not a fixed product. We'll shape it around your family before you pay anything.</p>
          <p>Characters are always original or drawn by your family. We can't use characters from films, TV or games.</p>
          <p>Your app is a private web app. It opens in the browser and can be added to your home screen like any other app.</p></div></div>
      </div>
      ${related ? `<section style="padding:40px 0 100px"><h2 style="font-size:1.8rem;margin-bottom:20px">More ${c.name.toLowerCase()}</h2><div class="grid-ideas">${related}</div></section>` : ""}
    </div>`);
  });

  function phoneMock(idea, c) {
    const rows = idea.features.slice(0, 4).map((f, i) => `<div style="background:#fff;border-radius:16px;padding:12px 14px;display:flex;gap:10px;align-items:center;font-weight:600;font-size:.9rem;box-shadow:0 2px 0 rgba(35,32,92,.06)"><span style="width:26px;height:26px;border-radius:50%;background:${i === 0 ? "#24A898" : "#EFEDFB"};display:grid;place-items:center;color:#fff;flex:none">${i === 0 ? FS.icon("check").replace("<svg", '<svg style="width:16px"') : ""}</span>${esc(f)}</div>`).join("");
    return `<div class="mock-phone"><div class="mock-screen">
      <div style="padding:26px 18px 10px;display:flex;justify-content:space-between;align-items:center"><span style="font-family:var(--display);font-weight:600;font-size:1.3rem">${esc(idea.name)}</span><span style="width:34px">${FS.pip()}</span></div>
      <div style="margin:6px 18px 14px;padding:18px;border-radius:20px;background:#23205C;color:#fff"><div style="font-size:.8rem;opacity:.75">Made for</div><div style="font-family:var(--display);font-weight:600;font-size:1.4rem">Your family</div>
        <div style="margin-top:12px;height:10px;border-radius:10px;background:rgba(255,255,255,.18);overflow:hidden"><i style="display:block;width:62%;height:100%;background:#FFC83D;border-radius:10px"></i></div></div>
      <div style="display:grid;gap:10px;padding:0 18px">${rows}</div>
      <div style="margin-top:auto;height:70px;color:var(--c-ink)">${FS.icon(c.icon).replace("<svg", '<svg style="width:54px;height:54px;margin:0 auto;opacity:.6"')}</div>
    </div></div>`;
  }

  // ---------- How it works ----------
  FS.route("/how-it-works", () => L.site(`<div class="wrap" style="padding-bottom:100px">
    <div class="page-head"><h1>How it works</h1><p class="lede">A small project with a real person. Here's what happens from your first idea to the day your app arrives.</p></div>
    ${voyage()}
    <div class="grid-2" style="margin-top:64px">
      <div class="panel stack" style="--gap:12px"><h3>Talk instead of typing</h3><p class="muted">Most of what you tell us can be said out loud. Tap the microphone, explain it the way you'd tell a friend, and we'll tidy it into a plan you can check and edit.</p><p class="muted">Recordings are turned into text and then thrown away.</p></div>
      <div class="panel stack" style="--gap:12px"><h3>Feedback, right where you see it</h3><p class="muted">Every preview has a "Tell us what you think" button. Tap it on any screen and say what you'd change. Your kids can too, with big buttons and faces to tap.</p></div>
      <div class="panel stack" style="--gap:12px"><h3>A plan before you pay</h3><p class="muted">After you share your idea, you'll get a written plan: what's included, what isn't, the price and when it'll be ready. You only pay once you accept it.</p></div>
      <div class="panel stack" style="--gap:12px"><h3>Yours to keep using</h3><p class="muted">Hosting is included for the first year. After that, keep it running for $5 a month, or add Funship Care for $19 a month to include small changes.</p></div>
    </div>
    <div class="row" style="margin-top:48px"><a class="btn" href="#/start">Start your app</a><a class="btn ghost" href="#/faq">Read the questions</a></div>
  </div>`));

  // ---------- Pricing ----------
  FS.route("/pricing", () => L.site(`<div class="wrap" style="padding-bottom:100px">
    <div class="page-head"><h1>Pricing</h1><p class="lede">Pick a size to start. We'll confirm the right one in your plan, before you pay.</p></div>
    <div class="tiers">${Object.values(FS.TIERS).map((t) => tierCard(t, t.id === "bloom")).join("")}</div>
    <div class="grid-2" style="margin-top:40px">
      <div class="panel"><h3 style="margin-bottom:12px">Also available</h3><ul class="list">
        <li><span class="grow"><strong>Idea session</strong><br><span class="muted small">A 30-minute video call to shape your idea. Taken off your build if you go ahead within 14 days.</span></span><b>$49</b></li>
        <li><span class="grow"><strong>Funship Care</strong><br><span class="muted small">Hosting, upkeep and up to 20 minutes of small changes each month.</span></span><b>$19/mo</b></li>
        <li><span class="grow"><strong>Hosting only</strong><br><span class="muted small">After the first included year.</span></span><b>$5/mo</b></li>
        <li><span class="grow"><strong>Extra change session</strong><br><span class="muted small">Up to 30 minutes of agreed changes.</span></span><b>$49</b></li></ul></div>
      <div class="panel"><h3 style="margin-bottom:12px">How paying works</h3><ul class="list">
        <li><span class="grow"><strong>Sprout</strong><br><span class="muted small">Paid in full when you accept the plan.</span></span></li>
        <li><span class="grow"><strong>Bloom</strong><br><span class="muted small">Half to start, half before your app is delivered.</span></span></li>
        <li><span class="grow"><strong>Grove</strong><br><span class="muted small">40% to start, 40% when you approve the preview, 20% before delivery.</span></span></li>
        <li><span class="grow muted small">If we can't take on your idea, you won't be charged anything.</span></li></ul></div>
    </div></div>`));

  // ---------- Gifts ----------
  FS.route("/gifts", function () {
    return {
      html: L.site(`<div class="wrap" style="padding-bottom:100px">
        <div class="page-head"><h1>Give a Funship app</h1><p class="lede">They tell us their wish, we make it. You choose the amount and write the card.</p></div>
        <div class="grid-2" style="align-items:start;gap:48px">
          <form class="stack" id="giftform" style="--gap:22px" novalidate>
            <div class="field"><span class="label">How much would you like to give?</span>
              <div class="choice-grid" style="grid-template-columns:repeat(3,1fr)">
                ${[100, 300, 700].map((a) => `<label class="choice"><input type="radio" name="amount" value="${a}"${a === 300 ? " checked" : ""}><span style="flex-direction:column;align-items:flex-start;gap:2px"><b style="font-family:var(--display);font-size:1.5rem;font-weight:600">${FS.money(a)}</b><small class="muted">${a === 100 ? "Starts an idea" : a === 300 ? "Covers a Sprout" : "Covers a Bloom"}</small></span></label>`).join("")}
              </div></div>
            <div class="field"><span class="label">Who is it for?</span>
              <div class="choice-grid"><label class="choice"><input type="radio" name="kind" value="family" checked><span>${icon("users")}A whole family</span></label><label class="choice"><input type="radio" name="kind" value="child"><span>${icon("star")}A particular kid</span></label></div></div>
            <div class="field" id="childfield" hidden><label for="g-child">The kid's first name</label><p class="hint">Just a first name. We never ask for a child's email or age.</p><input class="input" id="g-child" name="child" maxlength="30" placeholder="Leo"></div>
            <div class="field"><label for="g-to">Their grown-up's email</label><p class="hint">We'll send the gift to the parent or guardian.</p><input class="input" id="g-to" type="email" name="email" placeholder="name@example.com" required></div>
            <div class="field"><label for="g-msg">Your message</label><textarea class="input" id="g-msg" name="message" maxlength="200" placeholder="For a game starring Leo's dragon drawings."></textarea></div>
            <div class="grid-2" style="gap:16px"><div class="field"><label for="g-from">From</label><input class="input" id="g-from" name="from" placeholder="Grandma Rose" required></div>
              <div class="field"><label for="g-date">Send on</label><input class="input" id="g-date" type="date" name="date"></div></div>
            <p class="small muted" id="giftErr" role="alert"></p>
            <button class="btn sun" type="submit">Continue to payment</button>
          </form>
          <div style="position:sticky;top:110px" class="stack" style="--gap:16px"><div id="gcprev"></div><p class="small muted" style="margin-top:28px;text-align:center">This is the card they'll get by email. You can print it too.</p></div>
        </div></div>`),
      mount(root) {
        const f = FS.$("#giftform", root);
        const d = new Date(); FS.$("#g-date", root).value = d.toISOString().slice(0, 10);
        const params = new URLSearchParams(location.hash.split("?")[1] || "");
        if (params.get("idea")) FS.$("#g-msg", root).value = "For your own " + FS.idea(params.get("idea")).name + ". Can't wait to see it!";
        const read = () => ({ amount: +f.amount.value, forChild: f.kind.value === "child" ? f.child.value.trim() || "your kid" : "", message: f.message.value, from: f.from.value, email: f.email.value.trim(), date: f.date.value });
        const draw = () => { FS.$("#childfield", root).hidden = f.kind.value !== "child"; FS.$("#gcprev", root).innerHTML = giftCardPreview(read()); };
        f.addEventListener("input", draw); draw();
        f.addEventListener("submit", (e) => {
          e.preventDefault(); const g = read();
          if (!/^\S+@\S+\.\S+$/.test(g.email)) { FS.$("#giftErr", root).textContent = "Add their grown-up's email so we know where to send it."; f.email.focus(); return; }
          if (!g.from.trim()) { FS.$("#giftErr", root).textContent = "Add who it's from."; f.from.focus(); return; }
          FS.checkout({ label: `Funship gift for ${g.forChild || "a family"}`, amount: g.amount, onPaid() {
            const token = "gift-" + Math.random().toString(36).slice(2, 8);
            const when = g.date ? new Date(g.date + "T09:00").getTime() : Date.now();
            FS.state.gifts.unshift({ id: FS.uid("g"), token, amount: g.amount, from: g.from, to: g.email, toEmail: g.email, forChild: g.forChild === "your kid" ? "" : g.forChild, message: g.message, sendOn: when, status: when > Date.now() + 3600000 ? "SCHEDULED" : "DELIVERED", boughtBy: FS.state.viewer });
            FS.save();
            FS.$("#app").innerHTML = L.site(`<div class="wrap celebrate" style="padding:80px 0 120px">${FS.pip({ cls: "pip", mood: "proud" })}<h1 style="font-size:2.6rem">A little something made just for them</h1>
              <p class="lede">${when > Date.now() + 3600000 ? `We'll email it on ${FS.date(when, { month: "long", day: "numeric" })}.` : "It's on its way to their inbox."} You can print the card now.</p>
              <div style="width:min(440px,100%);margin:20px 0">${giftCardPreview(g)}</div>
              <div class="row" style="justify-content:center"><button class="btn" onclick="window.print()">Print the card</button><a class="btn ghost" href="#/redeem/${token}">See what they'll see</a></div></div>`);
            FS.confetti();
          } });
        });
      },
    };
  });

  // ---------- Redeem a gift ----------
  FS.route("/redeem/:token", function (token) {
    const g = FS.state.gifts.find((x) => x.token === token);
    if (!g) return L.site(`<div class="wrap empty" style="padding:120px 0"><h1 style="font-size:2rem">This gift link doesn't work</h1><p class="muted">Check the link in your email, or ask the person who sent it.</p></div>`);
    return {
      html: L.site(`<div class="wrap" style="padding:56px 0 120px">
        <div class="gift-band" style="background:var(--sun-soft)">
          <div class="stack" style="--gap:18px"><h1 style="font-size:clamp(2.2rem,4.5vw,3.4rem)">${esc(g.from)} sent you a Funship app</h1>
            <p class="lede">${g.forChild ? `It's for ${esc(g.forChild)}. ` : ""}Tell us what you'd love, and we'll make it for your family.</p>
            ${g.status === "REDEEMED" ? `<p class="tag ok">Already added to a family account</p><a class="btn" href="#/portal">Go to my family</a>` : `<div class="row"><button class="btn" id="redeem">Add this gift and start</button></div><p class="small muted">You'll need a parent or guardian account. ${FS.money(g.amount)} goes toward your app.</p>`}
          </div>${giftCardPreview(g)}</div></div>`),
      mount(root) {
        const b = FS.$("#redeem", root); if (!b) return;
        b.onclick = () => {
          if (FS.viewer().role !== "parent") FS.state.viewer = "alex";
          g.status = "REDEEMED"; g.redeemedBy = FS.viewer().familyId; g.balance = g.amount; FS.save();
          FS.confetti(); FS.toast("Your gift is ready to become something wonderful."); FS.go("/start?gift=" + g.token);
        };
      },
    };
  });

  // ---------- About, FAQ, Privacy ----------
  FS.route("/about", () => L.site(`<div class="wrap" style="padding-bottom:100px"><div class="maker" style="padding:56px 0">
    <div class="maker-portrait" style="background:var(--lagoon-soft)">${FS.pip({ mood: "happy" })}</div>
    <div class="stack" style="--gap:18px"><h1 style="font-size:clamp(2.4rem,5vw,3.6rem)">Hi, I'm the maker</h1>
      <p class="lede">I build small, polished apps very quickly, with AI as my workshop assistant. Funship is me doing that for families: one app at a time, with your ideas at the centre.</p>
      <p class="lede">I'll read your idea, talk it through with you if you'd like, and show you every step. Based in Vancouver, BC, making apps for families across North America.</p>
      <div class="row"><a class="btn" href="#/start">Tell me your idea</a><a class="btn ghost" href="#/start?call=1">Book a 30-minute idea session</a></div></div></div></div>`));

  FS.route("/faq", () => {
    const qa = [
      ["Is this an app from the App Store?", "No. It's a private web app. It opens from a link and you can add it to your home screen, where it looks and works like an app."],
      ["Can my kid's favourite movie character be in it?", "We can't use characters from films, TV or games. We'd love to make an original one instead, or bring your kid's own drawing to life."],
      ["What can't you make?", "Apps that track someone's location, handle money between people, give medical advice, open to strangers, or need App Store publishing. If your idea is close, we'll suggest a version we can make."],
      ["What happens after the first year?", "Hosting is included for 12 months. After that, keep it running for $5 a month or choose Funship Care. If you stop, you get 30 days to export your family's data."],
      ["Who sees my family's photos and drawings?", "Only you, anyone you invite, and the maker building your app. We never sell or share them, and we don't use them to train AI."],
      ["Do you keep voice recordings?", "No. Recordings are turned into text and then deleted."],
    ];
    return L.site(`<div class="wrap" style="padding-bottom:100px;max-width:820px"><div class="page-head"><h1>Questions</h1></div>
      <div class="stack" style="--gap:12px">${qa.map(([q, a]) => `<details class="panel"><summary style="cursor:pointer;font-family:var(--display);font-weight:600;font-size:1.2rem">${q}</summary><p class="muted" style="margin-top:12px">${a}</p></details>`).join("")}</div></div>`);
  });

  FS.route("/privacy", () => L.site(`<div class="wrap" style="padding-bottom:100px;max-width:820px"><div class="page-head"><h1>Your family's stuff stays your family's</h1><p class="lede">Your photos, drawings, stories and ideas are personal. We treat them that way.</p></div>
    <ul class="checklist" style="gap:18px">${[
      ["No ads.", "Funship apps are made for your family, not for advertisers."],
      ["No selling your data.", "We don't sell your family's personal information."],
      ["No training on your family's content.", "We don't use your private family content to train AI models."],
      ["Your choice.", "You decide what to share, and we explain how it's used."],
      ["Voice stays simple.", "We turn voice notes into text and delete the recording."],
      ["Kids don't get accounts.", "A parent or guardian owns the account. Kids only ever use the app."],
      ["Your app, your data.", "Ask for an export or deletion any time."],
    ].map(([a, b]) => `<li>${icon("check")}<span><strong>${a}</strong> ${b}</span></li>`).join("")}</ul>
    <p class="callout" style="margin-top:32px">Draft wording for the prototype. The full privacy policy will be reviewed by a lawyer before launch.</p></div>`));
})();
