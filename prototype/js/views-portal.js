/* Funship prototype: intake, checkout and family portal */
(function () {
  const L = FS.layout, esc = FS.esc, icon = FS.icon;
  const isParent = (v) => v && v.role === "parent"; isParent.label = "parent";

  // ---------- Mock checkout (no real payment) ----------
  FS.checkout = function ({ label, amount, note, onPaid }) {
    FS.modal(`<div class="stack" style="--gap:18px">
      <span class="tag">Demo checkout: no card is charged</span>
      <h2 style="font-size:1.8rem;padding-right:40px">Pay ${FS.money(amount)}</h2>
      <div class="callout"><strong>${esc(label)}</strong>${note ? `<br><span class="small">${esc(note)}</span>` : ""}</div>
      <div class="field"><label for="cc">Card</label><input class="input" id="cc" value="4242 4242 4242 4242" readonly aria-describedby="cchint"><p class="hint" id="cchint">A test card is filled in for the demo. In the real product, payment happens on Stripe's secure page.</p></div>
      <button class="btn sun" id="pay" type="button">Pay ${FS.money(amount)}</button></div>`, (s, close) => {
      FS.$("#pay", s).onclick = (e) => {
        e.target.disabled = true; e.target.textContent = "Confirming payment…";
        setTimeout(() => { close(); onPaid(); }, 900);
      };
    });
  };

  // ---------- Intake wizard ----------
  const STEPS = ["Your wish", "Who it's for", "The magic moment", "Must-haves", "The look", "Size and timing", "Check and send"];
  const BLOCKED = [
    [/track|location|spy|monitor|read (their|his|her) messages/i, "We don't build apps that track or monitor someone. We could make a family adventure board where everyone shares their own progress."],
    [/disney|elsa|frozen|pok[eé]mon|pikachu|marvel|spider-?man|mario|paw patrol|bluey|minecraft/i, "We can't use characters from films, TV or games. Let's make a new character of your very own, or bring your kid's drawing to life."],
    [/allowance|send money|bank|crypto|bet|gambl/i, "We don't build apps that move money between people. We could make a points board with rewards your family decides."],
    [/medical|diagnos|medication|insulin/i, "We don't build medical or safety-critical apps. We could help with a calm routine or reminder board instead."],
  ];

  FS.route("/start", function () {
    const q = FS.query();
    const v = FS.viewer();
    if (!isParent(v)) { FS.state.viewer = "alex"; FS.save(); }
    const famId = FS.viewer().familyId;
    // resume or create draft
    let draft = Object.values(FS.state.drafts).find((d) => d.familyId === famId && !d.submitted);
    if (!draft || q.get("idea") || q.get("tier") || q.get("gift")) {
      const idea = q.get("idea") ? FS.idea(q.get("idea")) : null;
      draft = { id: FS.uid("d"), familyId: famId, step: 0, idea: idea ? idea.slug : "", wish: idea ? `We'd love our own ${idea.name}. ` : "", people: FS.state.families[famId].members.map((m) => ({ ...m })), magic: "", musts: idea ? idea.features.slice() : [], other: "", style: "Bright and playful", colours: "", uploads: [], devices: ["Phone"], tier: q.get("tier") || (idea ? idea.tier : "sprout"), when: "Within a month", consent: false, gift: q.get("gift") || "", wantsCall: q.get("call") === "1" };
      FS.state.drafts[draft.id] = draft; FS.save();
    }
    return { html: L.site(`<div class="wrap wizard" id="wiz"></div>`), mount: (root) => wizard(FS.$("#wiz", root), draft) };
  });

  function wizard(el, d) {
    const save = () => { FS.save(); const s = FS.$("#saved"); if (s) { s.textContent = "Saved just now"; } };
    const draw = () => {
      const s = d.step;
      el.innerHTML = `<ol class="steps" aria-label="Steps">${STEPS.map((t, i) => `<li class="${i < s ? "done" : i === s ? "current" : ""}"${i === s ? ' aria-current="step"' : ""}><span class="n">${i < s ? icon("check").replace("<svg", '<svg style="width:14px"') : i + 1}</span>${t}</li>`).join("")}</ol>
        <form class="wizard-card" novalidate>
          <div class="progress-bar" aria-hidden="true"><i style="width:${((s + 1) / STEPS.length) * 100}%"></i></div>
          <p class="muted small">Step ${s + 1} of ${STEPS.length}${d.gift ? ` · <span class="tag ok">Gift applied</span>` : ""}</p>
          ${stepBody(s, d)}
          <div class="wizard-nav">
            ${s > 0 ? `<button type="button" class="btn ghost" data-back>${icon("arrowL").replace("<svg", '<svg style="width:18px"')}Back</button>` : ""}
            <button type="submit" class="btn">${s === STEPS.length - 1 ? "Make my plan" : "Next"}</button>
            <span class="save" id="saved">Your answers save as you go</span>
          </div></form>`;
      const form = FS.$("form", el);
      FS.$$("[data-mic]", el).forEach((m) => FS.micControl(m, FS.$("#" + m.dataset.mic, el), sampleFor(s)));
      bindStep(s, d, form, save);
      const back = FS.$("[data-back]", el); if (back) back.onclick = () => { d.step--; save(); draw(); };
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const err = validate(s, d); const box = FS.$("#err", el);
        if (box) box.textContent = err;
        if (err) return;
        if (s < STEPS.length - 1) { d.step++; save(); draw(); FS.$("h2", el).focus(); }
        else makeBrief(el, d);
      });
      const h = FS.$("h2", el); h.setAttribute("tabindex", "-1");
    };
    draw();
  }

  function sampleFor(s) {
    return [
      "Our kids argue about chores every evening. We want a game where they earn stars toward Friday movie night, and Leo's dragon drawing should be the hero.",
      "",
      "Fewer reminders from us, and the kids actually wanting to help after dinner.",
    ][s] || "";
  }

  function stepBody(s, d) {
    const idea = d.idea ? FS.idea(d.idea) : null;
    switch (s) {
      case 0: return `<h2>What would you love to make?</h2>
        ${idea ? `<div class="callout">Starting from <strong>${esc(idea.name)}</strong>. Tell us how you'd make it yours. <a class="link" href="#/ideas">Pick a different idea</a></div>` : `<p class="lede">Describe it like you'd tell a friend. Rough is fine.</p>`}
        ${FS.micBlock("wish")}
        <div class="field"><label for="wish">Your idea</label><textarea class="input" id="wish" name="wish" placeholder="Our kids argue about chores every evening…">${esc(d.wish)}</textarea></div>
        <div id="scope" aria-live="polite"></div><p id="err" class="small" style="color:var(--danger)" role="alert"></p>
        ${idea ? "" : `<p class="small muted">Not sure yet? <a class="link" href="#/ideas">Browse ideas</a> for inspiration.</p>`}`;
      case 1: return `<h2>Who will use it?</h2><p class="lede">First names and rough ages are all we need. No birthdays, no emails for kids.</p>
        <div class="stack" style="--gap:10px" id="people">${d.people.map((p, i) => personRow(p, i)).join("")}</div>
        <div class="row"><button type="button" class="btn quiet small" data-add="adult">Add a grown-up</button><button type="button" class="btn quiet small" data-add="child">Add a kid</button></div>
        <p id="err" class="small" style="color:var(--danger)" role="alert"></p>`;
      case 2: return `<h2>What should feel different when it works?</h2><p class="lede">This is the magic moment we'll design around.</p>
        ${FS.micBlock("magic")}<div class="field"><label for="magic">The moment</label><textarea class="input" id="magic" placeholder="The kids remind us it's chore time, not the other way round.">${esc(d.magic)}</textarea></div><p id="err" class="small" style="color:var(--danger)" role="alert"></p>`;
      case 3: {
        const opts = Array.from(new Set([...(idea ? idea.features : []), "Pick your character", "Stars or points", "Photos from our family", "A countdown", "Checklists", "Parent-only settings", "Works for two kids separately"]));
        return `<h2>What does it need?</h2><p class="lede">Pick what matters. We'll confirm everything in your plan.</p>
          <div class="choice-grid">${opts.map((o) => `<label class="choice"><input type="checkbox" name="musts" value="${esc(o)}"${d.musts.includes(o) ? " checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div>
          <div class="field"><label for="other">Anything else?</label><input class="input" id="other" value="${esc(d.other)}" placeholder="Biscuit the dog should be in it somewhere"></div>`;
      }
      case 4: return `<h2>How should it look?</h2>
        <div class="field"><span class="label">Overall feel</span><div class="choice-grid">${["Bright and playful", "Calm and cosy", "Storybook", "Simple and clean"].map((o) => `<label class="choice"><input type="radio" name="style" value="${o}"${d.style === o ? " checked" : ""}><span>${o}</span></label>`).join("")}</div></div>
        <div class="field"><label for="colours">Favourite colours</label><input class="input" id="colours" value="${esc(d.colours)}" placeholder="Purple and yellow"></div>
        <div class="field"><span class="label">Drawings, photos or examples</span><p class="hint">Optional. Kids' drawings make the best characters. Pictures stay on this device in the demo.</p>
          <label class="btn quiet" style="width:max-content">${icon("upload").replace("<svg", '<svg style="width:20px"')}Add pictures<input type="file" accept="image/*" multiple id="files" class="sr"></label>
          <div class="row" id="thumbs">${d.uploads.map(thumb).join("")}</div></div>`;
      case 5: return `<h2>Size and timing</h2>
        <div class="field"><span class="label">Where will you use it?</span><div class="choice-grid">${["Phone", "Tablet", "Computer", "Shared family device"].map((o) => `<label class="choice"><input type="checkbox" name="devices" value="${o}"${d.devices.includes(o) ? " checked" : ""}><span>${o}</span></label>`).join("")}</div></div>
        <div class="field"><span class="label">Roughly how big?</span><p class="hint">Just a starting point. Your plan will confirm the size and price.</p><div class="choice-grid">${Object.values(FS.TIERS).map((t) => `<label class="choice"><input type="radio" name="tier" value="${t.id}"${d.tier === t.id ? " checked" : ""}><span style="flex-direction:column;align-items:flex-start;gap:2px">${t.name} · ${FS.money(t.price)}<small class="muted" style="font-weight:500">${t.pitch}</small></span></label>`).join("")}</div></div>
        <div class="field"><label for="when">When would you like it?</label><select class="input" id="when">${["As soon as possible", "Within a month", "For a date (birthday, trip, holiday)", "No rush"].map((o) => `<option${d.when === o ? " selected" : ""}>${o}</option>`).join("")}</select></div>`;
      case 6: return `<h2>Check and send</h2><p class="lede">Here's what you told us. Next, we'll turn it into a plan you can edit.</p>
        <dl class="brief">${[["Your idea", d.wish], ["Who", d.people.map((p) => p.name + (p.kind === "child" ? ` (${p.age})` : "")).join(", ")], ["The magic moment", d.magic], ["Must-haves", d.musts.concat(d.other ? [d.other] : []).join(", ") || "We'll suggest some"], ["The look", [d.style, d.colours].filter(Boolean).join(", ") + (d.uploads.length ? ` · ${d.uploads.length} picture(s)` : "")], ["Size and timing", `${FS.TIERS[d.tier].name}, ${d.when.toLowerCase()}`]].map(([k, v]) => `<div class="brief-sec"><dt class="small muted">${k}</dt><dd style="margin:0">${esc(v || "—")}</dd></div>`).join("")}</dl>
        <label style="display:flex;gap:12px;align-items:flex-start;font-weight:500"><input type="checkbox" id="consent" ${d.consent ? "checked" : ""} style="width:22px;height:22px;margin-top:2px;accent-color:var(--violet)"><span>I'm a parent or guardian, and I agree that Funship can use what I've shared, including my kids' names and drawings, to make this app. You can delete it any time.</span></label>
        <p id="err" class="small" style="color:var(--danger)" role="alert"></p>`;
    }
  }

  const personRow = (p, i) => `<div class="row" data-person="${i}" style="gap:10px"><input class="input" style="flex:1;min-width:140px" aria-label="Name" value="${esc(p.name)}" data-f="name" placeholder="First name">
    ${p.kind === "child" ? `<select class="input" style="width:150px" aria-label="Age" data-f="age">${["Under 5", "5–7", "8–12", "13–17"].map((a) => `<option${p.age === a ? " selected" : ""}>${a}</option>`).join("")}</select>` : `<span class="tag violet" style="padding:6px 12px">Grown-up</span>`}
    <button type="button" class="btn quiet small" data-remove="${i}" aria-label="Remove ${esc(p.name || "person")}">Remove</button></div>`;
  const thumb = (u, i) => `<figure style="margin:0;width:96px"><img src="${u.src}" alt="${esc(u.name)}" style="width:96px;height:96px;object-fit:cover;border-radius:14px;border:2px solid var(--line)"><figcaption class="small muted" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(u.name)}</figcaption></figure>`;

  function bindStep(s, d, form, save) {
    const on = (sel, ev, fn) => { const x = FS.$(sel, form); if (x) x.addEventListener(ev, fn); };
    if (s === 0) on("#wish", "input", (e) => {
      d.wish = e.target.value; save();
      const hit = BLOCKED.find(([re]) => re.test(d.wish));
      FS.$("#scope", form).innerHTML = hit ? `<div class="callout" style="background:var(--bubble-soft);display:flex;gap:12px"><span style="width:30px;flex:none">${FS.pip({ mood: "sleepy" })}</span><span><strong>We love the idea behind this.</strong> ${hit[1]}</span></div>` : "";
    });
    if (s === 1) {
      form.addEventListener("input", (e) => { const row = e.target.closest("[data-person]"); if (!row) return; d.people[+row.dataset.person][e.target.dataset.f] = e.target.value; save(); });
      FS.$$("[data-add]", form).forEach((b) => b.onclick = () => { d.people.push(b.dataset.add === "child" ? { name: "", kind: "child", age: "5–7" } : { name: "", kind: "adult" }); save(); FS.$("#people", form).innerHTML = d.people.map(personRow).join(""); FS.$$("#people input", form).pop().focus(); });
      form.addEventListener("click", (e) => { const r = e.target.closest("[data-remove]"); if (!r) return; d.people.splice(+r.dataset.remove, 1); save(); FS.$("#people", form).innerHTML = d.people.map(personRow).join(""); });
    }
    if (s === 2) on("#magic", "input", (e) => { d.magic = e.target.value; save(); });
    if (s === 3) { form.addEventListener("change", () => { d.musts = FS.$$('input[name="musts"]:checked', form).map((x) => x.value); save(); }); on("#other", "input", (e) => { d.other = e.target.value; save(); }); }
    if (s === 4) {
      form.addEventListener("change", (e) => { if (e.target.name === "style") { d.style = e.target.value; save(); } });
      on("#colours", "input", (e) => { d.colours = e.target.value; save(); });
      on("#files", "change", (e) => {
        Array.from(e.target.files).slice(0, 6).forEach((f) => {
          if (!/^image\/(png|jpe?g|webp|gif)$/.test(f.type) || f.size > 10e6) { FS.toast("We couldn't add that picture. Try a JPG, PNG, or WebP under 10 MB."); return; }
          const r = new FileReader(); r.onload = () => shrink(r.result, (src) => { d.uploads.push({ name: f.name, src }); save(); FS.$("#thumbs", form).innerHTML = d.uploads.map(thumb).join(""); }); r.readAsDataURL(f);
        });
      });
    }
    if (s === 5) { form.addEventListener("change", (e) => { if (e.target.name === "tier") d.tier = e.target.value; if (e.target.name === "devices") d.devices = FS.$$('input[name="devices"]:checked', form).map((x) => x.value); if (e.target.id === "when") d.when = e.target.value; save(); }); }
    if (s === 6) on("#consent", "change", (e) => { d.consent = e.target.checked; save(); });
  }

  function shrink(src, cb) { const img = new Image(); img.onload = () => { const c = document.createElement("canvas"); const k = Math.min(1, 360 / Math.max(img.width, img.height)); c.width = img.width * k; c.height = img.height * k; c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); cb(c.toDataURL("image/jpeg", .8)); }; img.src = src; }

  function validate(s, d) {
    if (s === 0 && d.wish.trim().length < 12) return "Tell us a little more about your idea. A sentence or two is plenty.";
    if (s === 1 && !d.people.some((p) => p.name.trim())) return "Add at least one person who'll use the app.";
    if (s === 6 && !d.consent) return "Please tick the box so we can use what you've shared to make your app.";
    return "";
  }

  function makeBrief(el, d) {
    el.innerHTML = `<div style="grid-column:1/-1" class="celebrate"><span style="width:90px" class="pip-wrap">${FS.pip({ cls: "pip pip-float" })}</span><h2>Tidying up your notes into a plan…</h2><p class="muted">This takes a few seconds.</p></div>`;
    setTimeout(() => {
      const idea = d.idea ? FS.idea(d.idea) : null;
      const kids = d.people.filter((p) => p.kind === "child" && p.name);
      const title = idea ? idea.name : guessTitle(d.wish);
      const req = {
        id: FS.uid("r"), familyId: d.familyId, idea: d.idea, title, status: "DRAFT", tier: d.tier, created: Date.now(), wish: d.wish, gift: d.gift,
        brief: {
          purpose: firstSentence(d.wish),
          people: d.people.filter((p) => p.name).map((p) => p.name + (p.kind === "child" ? ` (${p.age})` : "")).join(", ") + ` will use it on ${d.devices.join(", ").toLowerCase() || "their devices"}.`,
          workflow: d.magic ? `Designed around this moment: ${d.magic}` : "We'll work out the main flow together.",
          look: [d.style, d.colours].filter(Boolean).join(". ") + (d.uploads.length ? `. Using ${d.uploads.length} picture(s) you shared.` : "."),
          features: d.musts.concat(d.other ? [d.other] : []),
          exclusions: ["No ads or public sharing", "No location tracking or money between people"],
          questions: kids.length > 1 ? [`Should ${kids.map((k) => k.name).join(" and ")} each have their own view?`] : ["Who sets things up: one parent or both?"],
        },
        uploads: d.uploads,
      };
      FS.state.requests.unshift(req); d.submitted = true; FS.save();
      FS.go("/portal/requests/" + req.id + "/brief");
    }, 1600);
  }
  const firstSentence = (t) => (t.split(/(?<=[.!?])\s/)[0] || t).trim();
  function guessTitle(t) {
    t = t.toLowerCase();
    const m = [["chore", "Chore Quest"], ["dinner", "Dinner Picker"], ["meal", "Dinner Picker"], ["trip", "Family Adventure Map"], ["bedtime", "Bedtime Lantern"], ["grandma", "Hello, Grandma"], ["birthday", "Birthday Universe"], ["recipe", "Family Recipe Garden"], ["morning", "Morning Mission"], ["spell", "Spelling Safari"]].find(([k]) => t.includes(k));
    return m ? m[1] : "Our family app";
  }

  // ---------- Brief (editable) ----------
  FS.route("/portal/requests/:id/brief", function (id) {
    const r = FS.state.requests.find((x) => x.id === id);
    if (!r) return L.portal(`<div class="empty">${FS.pip({ mood: "sleepy" })}<h1 style="font-size:2rem">We couldn't find that request</h1><a class="btn" href="#/portal">Back to your family</a></div>`);
    const b = r.brief, done = r.status !== "DRAFT";
    const sec = (key, label, val, list) => `<section class="brief-sec"><h4>${label}${done ? "" : '<span class="tag">Suggested. Tap to edit</span>'}</h4>${list ? `<ul style="margin:0;padding-left:20px" data-key="${key}" ${done ? "" : 'contenteditable="true"'}>${val.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p data-key="${key}" ${done ? "" : 'contenteditable="true"'}>${esc(val)}</p>`}</section>`;
    return {
      html: L.portal(`<p class="crumb"><a href="#/portal">Home</a> / ${esc(r.title)}</p>
        <div class="page-head" style="padding-top:12px"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Your plan for ${esc(r.title)}</h1>
          <p class="lede">${done ? "You confirmed this plan. The maker is reviewing it." : "We tidied your notes into a build plan. Edit anything that isn't quite right, then confirm it."}</p></div>
        <div class="brief">${sec("purpose", "What it's for", b.purpose)}${sec("people", "Who uses it", b.people)}${sec("workflow", "How it works", b.workflow)}${sec("look", "The look", b.look)}${sec("features", "Must-haves", b.features.length ? b.features : ["We'll suggest some"], true)}${sec("exclusions", "Not included", b.exclusions, true)}
          ${b.questions.length ? `<section class="brief-sec" style="background:var(--sun-soft)"><h4>A question for you</h4>${b.questions.map((q) => `<p>${esc(q)}</p>`).join("")}<p class="small muted">Answer by editing the plan above, or we'll ask on a call.</p></section>` : ""}</div>
        ${done ? `<div class="row" style="margin-top:24px"><a class="btn" href="#/portal">Back to your family</a></div>` : `<label style="display:flex;gap:12px;margin:24px 0 16px;font-weight:600"><input type="checkbox" id="ok" style="width:22px;height:22px;accent-color:var(--violet)">This plan reflects what we want</label>
        <div class="row"><button class="btn" id="send" disabled>Send to the maker</button><span class="small muted">Nothing is charged yet. You'll get a price before you pay.</span></div>`}`),
      mount(root) {
        FS.$$("[data-key]", root).forEach((n) => n.addEventListener("blur", () => {
          const k = n.dataset.key; r.brief[k] = n.tagName === "UL" ? FS.$$("li", n).map((li) => li.textContent.trim()).filter(Boolean) : n.textContent.trim(); FS.save();
        }));
        const ok = FS.$("#ok", root), send = FS.$("#send", root); if (!ok) return;
        ok.onchange = () => (send.disabled = !ok.checked);
        send.onclick = () => {
          r.status = "SUBMITTED"; FS.save();
          FS.$(".portal-main", root).innerHTML = `<div class="celebrate">${FS.pip({ cls: "pip", mood: "proud" })}<h1 style="font-size:2.4rem">It's on the workbench</h1>
            <p class="lede">The maker will read your plan within two working days and send you a price. Want to talk it through first?</p>
            <div class="row" style="justify-content:center"><a class="btn" href="#/portal/requests/${r.id}/booking">Book a 30-minute idea session</a><a class="btn ghost" href="#/portal">Back to your family</a></div></div>`;
        };
      },
    };
  }, { needs: isParent });

  // ---------- Booking ----------
  FS.route("/portal/requests/:id/booking", function (id) {
    const r = FS.state.requests.find((x) => x.id === id); if (!r) return L.portal(`<p>Request not found.</p>`);
    const days = [];
    for (let i = 1; days.length < 5; i++) { const d = new Date(); d.setDate(d.getDate() + i); if (d.getDay() % 6) days.push(d); }
    const slots = ["9:30", "11:00", "13:30", "16:00", "19:00"];
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return {
      html: L.portal(`<p class="crumb"><a href="#/portal">Home</a> / ${esc(r.title)}</p>
        <div class="page-head" style="padding-top:12px"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Want to talk it through?</h1><p class="lede">Book a 30-minute idea session. It's $49, and it comes off your build if you go ahead within 14 days.</p></div>
        <div class="panel"><p class="small muted" style="margin-bottom:16px">Times shown in your time zone (${esc(tz)}).</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px">${days.map((d, di) => `<div class="stack" style="--gap:8px"><strong>${d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</strong>${slots.filter((_, si) => (si + di) % 4 !== 1).map((s) => { const [h, m] = s.split(":"); const t = new Date(d); t.setHours(+h, +m, 0, 0); return `<button class="pill" data-at="${t.getTime()}" aria-pressed="false">${t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</button>`; }).join("")}</div>`).join("")}</div></div>
        <div class="row" style="margin-top:20px"><button class="btn" id="book" disabled>Book and pay $49</button><a class="link" href="#/portal">Skip, just send me a price</a></div>`),
      mount(root) {
        let at = 0;
        FS.$$("[data-at]", root).forEach((b) => b.onclick = () => { at = +b.dataset.at; FS.$$("[data-at]", root).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); FS.$("#book", root).disabled = false; });
        FS.$("#book", root).onclick = () => FS.checkout({ label: "Idea session with the maker", amount: 49, note: FS.dateTime(at), onPaid() {
          FS.state.bookings.push({ id: FS.uid("b"), familyId: r.familyId, requestId: r.id, at, status: "Upcoming" });
          r.status = "CALL_BOOKED"; FS.state.payments.unshift({ id: FS.uid("pay"), familyId: r.familyId, label: "Idea session", amount: 49, at: Date.now(), status: "Paid" }); FS.save();
          FS.toast("Booked for " + FS.dateTime(at) + ". The video link is in your email."); FS.go("/portal");
        } });
      },
    };
  }, { needs: isParent });

  // ---------- Proposal ----------
  FS.route("/portal/requests/:id/proposal", function (id) {
    const r = FS.state.requests.find((x) => x.id === id); const p = r && r.proposal;
    if (!p) return L.portal(`<div class="empty">${FS.pip({ mood: "sleepy" })}<h1 style="font-size:2rem">No plan and price yet</h1><p class="muted">The maker will send one soon.</p><a class="btn" href="#/portal">Back to your family</a></div>`);
    const t = FS.TIERS[p.tier];
    const gift = FS.state.gifts.find((g) => g.redeemedBy === r.familyId && g.balance > 0);
    const dueNow = Math.max(0, p.deposit - (gift ? Math.min(gift.balance, p.deposit) : 0));
    return {
      html: L.portal(`<p class="crumb"><a href="#/portal">Home</a> / ${esc(r.title)}</p>
        <div class="page-head" style="padding-top:12px"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Your plan and price</h1><p class="lede">${esc(r.title)} for ${esc(FS.state.families[r.familyId].name)}.</p></div>
        <div class="grid-2" style="align-items:start">
          <div class="panel"><h3 style="margin-bottom:14px">What we'll make</h3><ul class="checklist">${p.scope.map((s) => `<li>${icon("check")}<span>${esc(s)}</span></li>`).join("")}</ul>
            <h3 style="margin:24px 0 10px">Not included</h3><p class="muted">${r.brief.exclusions.map(esc).join(". ")}.</p>
            ${r.call ? `<h3 style="margin:24px 0 10px">From our call</h3><p class="muted">${esc(r.call.notes)}</p>` : ""}</div>
          <div class="panel" style="position:sticky;top:96px"><h3>${t.name} app</h3>
            <div style="font-family:var(--display);font-size:3rem;font-weight:600;margin:12px 0 4px">${FS.money(p.price)}</div><p class="muted small">${esc(p.due)}</p>
            <ul class="list kv" style="margin:18px 0"><li><span class="grow">Ready in</span><b>${esc(p.delivery.replace(" working days after kickoff", " days"))}</b></li><li><span class="grow">Rounds of changes</span><b>${p.revisions}</b></li><li><span class="grow">Fixes after delivery</span><b>30 days</b></li><li><span class="grow">Hosting</span><b>First year included</b></li>${gift ? `<li><span class="grow">Gift from ${esc(gift.from)}</span><b>−${FS.money(Math.min(gift.balance, p.deposit))}</b></li>` : ""}</ul>
            ${p.status === "ACCEPTED" ? `<p class="tag ok">Accepted and paid</p>` : `<label style="display:flex;gap:10px;margin-bottom:16px;font-weight:500"><input type="checkbox" id="agree" style="width:22px;height:22px;accent-color:var(--violet)">I've read what's included and the <a class="link" href="#/faq">terms</a></label><button class="btn sun" id="accept" style="width:100%" disabled>Accept and pay ${FS.money(dueNow)} to start</button>`}</div></div>`),
      mount(root) {
        const a = FS.$("#agree", root); if (!a) return;
        a.onchange = () => (FS.$("#accept", root).disabled = !a.checked);
        FS.$("#accept", root).onclick = () => {
          const finish = () => {
            p.status = "ACCEPTED"; r.status = "IN_PROGRESS";
            if (gift) gift.balance -= Math.min(gift.balance, p.deposit);
            const pid = FS.uid("p");
            FS.state.projects[pid] = { id: pid, requestId: r.id, familyId: r.familyId, name: r.title, stage: "sketching", target: Date.now() + 14 * 86400000, updates: [{ at: Date.now(), text: "We're officially on the workbench! I'll share first sketches this week." }], previewReady: false };
            r.projectId = pid;
            FS.state.payments.unshift({ id: FS.uid("pay"), familyId: r.familyId, label: r.title + " · deposit", amount: dueNow, at: Date.now(), status: "Paid" });
            FS.save(); FS.confetti(); FS.toast("You're officially on the workbench."); FS.go("/portal/projects/" + pid);
          };
          if (dueNow === 0) finish(); else FS.checkout({ label: `${r.title} · ${t.name} deposit`, amount: dueNow, note: "The rest is due before delivery.", onPaid: finish });
        };
      },
    };
  }, { needs: isParent });

  // ---------- Portal home ----------
  FS.route("/portal", function () {
    const fam = FS.family();
    const reqs = FS.state.requests.filter((r) => r.familyId === fam.id);
    const projects = Object.values(FS.state.projects).filter((p) => p.familyId === fam.id);
    const next = nextAction(reqs, projects);
    const kids = fam.members.filter((m) => m.kind === "child").map((m) => m.name);
    return L.portal(`
      <h1 class="sr">${esc(fam.name)}</h1>
      ${next ? `<div class="next-up"><div><span class="muted small">Up next</span><h2>${next.title}</h2><p class="muted" style="margin-top:6px">${next.text}</p></div><a class="btn sun" href="${next.href}">${next.cta}</a>
        <svg viewBox="0 0 200 60" style="position:absolute;right:-20px;bottom:-12px;width:240px;opacity:.5" aria-hidden="true"><path d="M0 30 C40 15 80 45 120 28 C150 15 180 32 200 26V60H0Z" fill="#24A898"/></svg></div>` : ""}
      <div class="panel" style="margin-top:24px"><div class="panel-head"><h3>Your apps and ideas</h3><a class="btn small" href="#/start">Make another app</a></div>
        ${reqs.length ? `<ul class="list">${reqs.map((r) => { const pr = r.projectId && FS.state.projects[r.projectId]; const href = pr ? `#/portal/projects/${pr.id}` : r.status === "PROPOSAL_SENT" ? `#/portal/requests/${r.id}/proposal` : `#/portal/requests/${r.id}/brief`;
          return `<li><span class="avatar" style="background:var(--sky-soft);color:var(--violet)">${icon(r.idea ? FS.cat(FS.idea(r.idea).cat).icon : "sparkle").replace("<svg", '<svg style="width:24px"')}</span><span class="grow"><a href="${href}" style="font-weight:650;text-decoration:none">${esc(r.title)}</a><br><span class="small muted">${pr ? FS.STAGES.find((s) => s.id === pr.stage).name : FS.REQUEST_STATUS[r.status]} · started ${FS.ago(r.created)}</span></span><a class="btn small quiet" href="${href}">Open</a></li>`; }).join("")}</ul>`
        : `<div class="empty">${FS.pip()}<h3>Your first Funship app starts here.</h3><p class="muted">Nothing on the workbench just yet. What would make family life a little easier?</p><a class="btn" href="#/start">Tell us your idea</a></div>`}</div>
      <div class="grid-2" style="margin-top:20px">
        <div class="panel"><h3 style="margin-bottom:12px">Your family</h3><p class="muted">${fam.members.map((m) => esc(m.name)).join(", ")}</p>${kids.length ? `<p class="small muted" style="margin-top:8px">Kids use apps under your account. They never get their own logins.</p>` : ""}<a class="link" href="#/portal/settings" style="display:inline-block;margin-top:12px">Manage family</a></div>
        <div class="panel"><h3 style="margin-bottom:12px">Ideas for this season</h3><p class="muted">A holiday countdown with one small family activity behind each day.</p><a class="link" href="#/ideas/holiday-countdown" style="display:inline-block;margin-top:12px">See the idea</a></div>
      </div>`);
  }, { needs: isParent });

  function nextAction(reqs, projects) {
    const prop = reqs.find((r) => r.status === "PROPOSAL_SENT");
    if (prop) return { title: `Your plan for ${esc(prop.title)} is ready`, text: "Check what's included and the price, then accept to get started.", cta: "Review the plan", href: `#/portal/requests/${prop.id}/proposal` };
    const prev = projects.find((p) => p.previewReady && p.stage !== "delivered");
    if (prev) return { title: `Try the ${esc(prev.name)} preview`, text: "Tap around, then tell us what to change. Your kids can too.", cta: "Open the preview", href: `#/portal/projects/${prev.id}` };
    const draft = reqs.find((r) => r.status === "DRAFT");
    if (draft) return { title: `Confirm your plan for ${esc(draft.title)}`, text: "Check the plan we made from your notes and send it to the maker.", cta: "Check the plan", href: `#/portal/requests/${draft.id}/brief` };
    const b = FS.state.bookings.find((x) => x.familyId === FS.family().id && x.status === "Upcoming");
    if (b) return { title: "Your idea session is booked", text: FS.dateTime(b.at) + ". The video link is in your email.", cta: "See details", href: `#/portal/requests/${b.requestId}/brief` };
    return null;
  }

  // ---------- Project ----------
  FS.route("/portal/projects/:id", function (id) {
    const p = FS.state.projects[id]; if (!p) return L.portal(`<p>Project not found.</p>`);
    const si = FS.STAGES.findIndex((s) => s.id === p.stage);
    const delivered = p.stage === "delivered";
    const fb = FS.state.feedback.filter((f) => f.projectId === id);
    const statusName = { new: "Under review", planned: "Planned", doing: "In progress", done: "Done", declined: "Not this time" };
    return {
      html: L.portal(`<p class="crumb"><a href="#/portal">Home</a> / ${esc(p.name)}</p>
        <div class="page-head" style="padding-top:12px"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">${esc(p.name)}</h1><p class="lede">${delivered ? "It's yours. Time to make a little magic." : `Aiming to be ready around ${FS.date(p.target, { month: "long", day: "numeric" })}.`}</p></div>
        <div class="panel"><ol class="timeline" aria-label="Progress">${FS.STAGES.map((s, i) => { const st = delivered || i < si ? "done" : i === si ? "now" : ""; return `<li class="${st}"${i === si && !delivered ? ' aria-current="step"' : ""}><span class="dot">${st === "done" ? icon("check") : ""}</span><strong>${s.name}</strong><span>${s.note}</span></li>`; }).join("")}</ol></div>
        ${p.previewReady ? `<div class="panel"><div class="panel-head"><h3>${delivered ? "Your app" : "Try the preview"}</h3><div class="row"><a class="btn small quiet" href="#/app/${p.appSlug}" target="_blank" rel="noopener">${icon("external").replace("<svg", '<svg style="width:16px"')}Open full screen</a>${!delivered && p.stage === "ready" ? `<button class="btn small sun" id="approve">Approve the app</button>` : ""}</div></div>
          <div class="preview-frame"><div class="preview-bar"><span class="dots"><i></i><i></i><i></i></span>${delivered ? "Your app" : "Preview"} · tap "Tell us what you think" on any screen</div><iframe title="${esc(p.name)} preview" src="index.html#/app/${p.appSlug}?preview=${id}"></iframe></div></div>` : `<div class="panel empty">${FS.pip({ mood: "sleepy" })}<h3>Your preview is being prepared</h3><p class="muted">You'll get an email when it's ready to try.</p></div>`}
        <div class="grid-2" style="margin-top:20px;align-items:start">
          <div class="panel"><h3 style="margin-bottom:16px">Updates from the maker</h3><ul class="updates">${p.updates.slice().reverse().map((u) => `<li><span class="avatar">${FS.pip()}</span><div class="bubble"><time>${FS.ago(u.at)}</time>${esc(u.text)}</div></li>`).join("")}</ul></div>
          <div class="panel"><div class="panel-head"><h3>Your feedback</h3>${p.previewReady ? `<button class="btn small" id="fbbtn">${icon("mic").replace("<svg", '<svg style="width:18px"')}Add feedback</button>` : ""}</div>
            ${fb.length ? `<ul class="list">${fb.map((f) => `<li><span style="font-size:1.5rem" aria-hidden="true">${f.mood}</span><span class="grow"><span>${esc(f.text)}</span><br><span class="small muted">${esc(f.by)} · ${esc(f.screen)} · ${FS.ago(f.at)}</span></span><span class="tag ${f.status === "done" ? "ok" : f.status === "new" ? "" : "violet"}">${statusName[f.status]}</span></li>`).join("")}</ul>` : `<p class="muted">No notes from your family yet. We'll keep an ear out.</p>`}</div></div>`),
      mount(root) {
        const b = FS.$("#fbbtn", root); if (b) b.onclick = () => FS.feedbackSheet({ projectId: id, familyId: p.familyId, screen: "Whole app", onSent: FS.render });
        const ap = FS.$("#approve", root); if (ap) ap.onclick = () => {
          const r = FS.state.requests.find((x) => x.id === p.requestId);
          const bal = r && r.proposal ? r.proposal.price - r.proposal.deposit : 349;
          FS.checkout({ label: p.name + " · final payment", amount: bal, note: "Then your app is published.", onPaid() {
            p.stage = "delivered"; p.deliveredAt = Date.now(); if (r) r.status = "DELIVERED";
            p.updates.push({ at: Date.now(), text: "It's yours! Add it to your home screen and enjoy." });
            FS.state.payments.unshift({ id: FS.uid("pay"), familyId: p.familyId, label: p.name + " · final payment", amount: bal, at: Date.now(), status: "Paid" });
            FS.save(); FS.render(); FS.confetti();
          } });
        };
        window.onmessage = (e) => { if (e.data === "fs-feedback-sent") FS.render(); };
      },
    };
  }, { needs: isParent });

  // ---------- Apps ----------
  FS.route("/portal/apps", function () {
    const fam = FS.family();
    const apps = Object.values(FS.state.projects).filter((p) => p.familyId === fam.id && p.previewReady);
    return L.portal(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Our apps</h1></div>
      ${apps.length ? `<div class="grid-ideas">${apps.map((p) => `<div class="idea-tile c-sun"><div class="art" style="min-height:160px">${FS.pip({ mood: p.stage === "delivered" ? "proud" : "happy" }).replace("<svg", '<svg style="width:90px"')}</div><div class="body"><h3>${esc(p.name)}</h3><p class="small muted">${p.stage === "delivered" ? `App birthday: ${FS.date(p.deliveredAt || Date.now(), { month: "long", day: "numeric" })}` : "Preview ready to try"}</p>
        <div class="row" style="margin-top:10px"><a class="btn small" href="#/app/${p.appSlug}" target="_blank" rel="noopener">Open app</a><a class="btn small quiet" href="#/portal/projects/${p.id}">Details</a></div>
        <details style="margin-top:12px"><summary class="small link">Add it to your home screen</summary><p class="small muted" style="margin-top:8px">On iPhone, open the app in Safari, tap Share, then "Add to Home Screen". On Android, open the browser menu and tap "Add to Home screen".</p></details></div></div>`).join("")}</div>`
      : `<div class="panel empty">${FS.pip()}<h3>Your first app will appear here when it's ready.</h3><a class="btn" href="#/start">Tell us your idea</a></div>`}`);
  }, { needs: isParent });

  // ---------- Billing ----------
  FS.route("/portal/billing", function () {
    const pays = FS.state.payments.filter((p) => p.familyId === FS.family().id);
    return L.portal(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Payments</h1><p class="lede">Receipts for everything you've paid. Card details are never stored by Funship.</p></div>
      <div class="panel">${pays.length ? `<ul class="list">${pays.map((p) => `<li><span class="grow"><strong>${esc(p.label)}</strong><br><span class="small muted">${FS.date(p.at, { month: "long", day: "numeric", year: "numeric" })}</span></span><b>${FS.money(p.amount)}</b><span class="tag ok">${p.status}</span></li>`).join("")}</ul>` : `<p class="muted">No payments yet.</p>`}</div>
      <div class="panel"><h3 style="margin-bottom:8px">Hosting</h3><p class="muted">Hosting is included for the first year of each app. We'll remind you a month before it renews, and you can cancel any time without contacting us.</p></div>`);
  }, { needs: isParent });

  // ---------- Gifts (bought) ----------
  FS.route("/portal/gifts", function () {
    const mine = FS.state.gifts.filter((g) => g.boughtBy === FS.state.viewer || g.redeemedBy === FS.family().id);
    const st = { SCHEDULED: "Scheduled", DELIVERED: "Sent", REDEEMED: "Redeemed" };
    return L.portal(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Gifts</h1></div>
      <div class="panel"><div class="panel-head"><h3>Gifts you've given or received</h3><a class="btn small" href="#/gifts">Give a Funship app</a></div>
      ${mine.length ? `<ul class="list">${mine.map((g) => `<li><span class="avatar" style="background:var(--bubble-soft);color:#E0457A">${icon("gift").replace("<svg", '<svg style="width:22px"')}</span><span class="grow"><strong>${FS.money(g.amount)} ${g.forChild ? "for " + esc(g.forChild) : "for " + esc(g.to)}</strong><br><span class="small muted">${g.redeemedBy === FS.family().id ? `From ${esc(g.from)} · ${FS.money(g.balance || 0)} left to use` : `To ${esc(g.to)} · ${g.status === "SCHEDULED" ? "sends " + FS.date(g.sendOn) : ""}`}</span></span><span class="tag ${g.status === "REDEEMED" ? "ok" : "violet"}">${st[g.status]}</span></li>`).join("")}</ul>` : `<p class="muted">No gifts just yet.</p>`}</div>`);
  }, { needs: isParent });

  // ---------- Settings ----------
  FS.route("/portal/settings", function () {
    const fam = FS.family();
    return {
      html: L.portal(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Family settings</h1></div>
        <div class="panel stack" style="--gap:16px"><div class="field"><label for="fname">Family name</label><input class="input" id="fname" value="${esc(fam.name)}"></div>
          <div><span class="label" style="font-weight:650">People</span><ul class="list" style="margin-top:8px">${fam.members.map((m) => `<li><span class="grow">${esc(m.name)}</span><span class="tag ${m.kind === "child" ? "pink" : "violet"}">${m.kind === "child" ? "Kid, " + m.age : "Grown-up"}</span></li>`).join("")}</ul></div>
          <button class="btn" id="savefam" style="width:max-content">Save changes</button></div>
        <div class="panel stack" style="--gap:12px"><h3>Invite a co-parent</h3><p class="muted">They can see your apps and add feedback. Billing stays with you.</p><div class="row"><input class="input" style="flex:1;min-width:220px" type="email" id="invite" placeholder="partner@example.com" aria-label="Their email"><button class="btn quiet" id="sendinv">Send invite</button></div></div>
        <div class="panel stack" style="--gap:12px"><h3>Your data</h3><p class="muted">Download everything you've shared with us, or delete it. Deleting removes your apps and can't be undone.</p><div class="row"><button class="btn quiet" id="export">Download our data</button><button class="btn ghost" id="del" style="--fg:var(--danger)">Delete our family's data</button></div></div>`),
      mount(root) {
        FS.$("#savefam", root).onclick = () => { fam.name = FS.$("#fname", root).value.trim() || fam.name; FS.save(); FS.toast("Changes saved."); FS.render(); };
        FS.$("#sendinv", root).onclick = () => { const e = FS.$("#invite", root).value.trim(); if (!/^\S+@\S+\.\S+$/.test(e)) { FS.toast("Add their email address first."); return; } FS.toast("Invite sent to " + e + " (demo)."); FS.$("#invite", root).value = ""; };
        FS.$("#export", root).onclick = () => { const data = { family: fam, requests: FS.state.requests.filter((r) => r.familyId === fam.id), feedback: FS.state.feedback.filter((f) => f.familyId === fam.id) }; const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })); a.download = "funship-family-data.json"; a.click(); };
        FS.$("#del", root).onclick = () => FS.modal(`<div class="stack" style="--gap:16px"><h2 style="font-size:1.6rem;padding-right:40px">Delete ${esc(fam.name)}'s data?</h2><p class="muted">This removes your requests, apps and feedback from this demo. It can't be undone.</p><div class="row"><button class="btn" data-close>Keep our data</button><button class="btn ghost" id="really" style="--fg:var(--danger)">Delete everything</button></div></div>`, (s, close) => {
          FS.$("#really", s).onclick = () => { FS.state.requests = FS.state.requests.filter((r) => r.familyId !== fam.id); FS.state.feedback = FS.state.feedback.filter((f) => f.familyId !== fam.id); Object.keys(FS.state.projects).forEach((k) => { if (FS.state.projects[k].familyId === fam.id) delete FS.state.projects[k]; }); FS.save(); close(); FS.toast("Your family's data was deleted."); FS.go("/portal"); };
        });
      },
    };
  }, { needs: isParent });
})();
