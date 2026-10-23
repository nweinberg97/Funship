/* Funship prototype: the maker's workbench + the demo delivered app */
(function () {
  const L = FS.layout, esc = FS.esc, icon = FS.icon;
  const isAdmin = (v) => v && v.role === "admin"; isAdmin.label = "admin";
  const famName = (id) => (FS.state.families[id] || { name: "A family" }).name;
  const reqStatusTag = (s) => `<span class="tag ${s === "SUBMITTED" || s === "DRAFT" ? "" : s === "DELIVERED" ? "ok" : s === "PROPOSAL_SENT" ? "pink" : "violet"}">${FS.REQUEST_STATUS[s]}</span>`;

  // ---------- Today ----------
  FS.route("/admin", function () {
    const reqs = FS.state.requests;
    const waiting = reqs.filter((r) => r.status === "SUBMITTED" || r.status === "CALL_BOOKED");
    const active = Object.values(FS.state.projects).filter((p) => p.stage !== "delivered");
    const fbNew = FS.state.feedback.filter((f) => f.status === "new");
    const calls = FS.state.bookings.filter((b) => b.status === "Upcoming").sort((a, b) => a.at - b.at);
    const hours = active.reduce((n, p) => n + (FS.state.requests.find((r) => r.id === p.requestId) || { tier: "bloom" }).tier.length * 2, 0);
    return L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Today on the workbench</h1></div>
      <div class="kpis">
        <a class="kpi" href="#/admin/requests"><b>${waiting.length}</b><span>Requests to review</span></a>
        <a class="kpi" href="#/admin/projects"><b>${active.length}</b><span>Apps being built</span></a>
        <a class="kpi" href="#/admin/feedback"><b>${fbNew.length}</b><span>New feedback</span></a>
        <a class="kpi" href="#/admin/calendar"><b>${calls.length}</b><span>Upcoming calls</span></a>
      </div>
      <div class="grid-2" style="margin-top:20px;align-items:start">
        <div class="panel"><div class="panel-head"><h3>Needs you</h3></div>
          ${waiting.length || fbNew.length ? `<ul class="list">${waiting.map((r) => `<li><span class="grow"><a href="#/admin/requests/${r.id}" class="link">${esc(r.title)}</a><br><span class="small muted">${esc(famName(r.familyId))} · ${FS.ago(r.created)}</span></span>${reqStatusTag(r.status)}</li>`).join("")}${fbNew.slice(0, 3).map((f) => `<li><span class="grow"><a href="#/admin/feedback" class="link">“${esc(f.text.slice(0, 60))}${f.text.length > 60 ? "…" : ""}”</a><br><span class="small muted">${esc(f.by)} · ${FS.ago(f.at)}</span></span><span class="tag">Feedback</span></li>`).join("")}</ul>` : `<div class="empty" style="padding:24px">${FS.pip({ mood: "proud" })}<p>Your workbench is clear.</p></div>`}</div>
        <div class="panel"><h3 style="margin-bottom:14px">This week</h3>
          <p class="muted small">Estimated build time committed</p>
          <div style="display:flex;align-items:baseline;gap:8px;margin:6px 0 10px"><b style="font-family:var(--display);font-size:2.4rem">${Math.min(hours, 25)}h</b><span class="muted">of 25h you set aside</span></div>
          <div class="progress-bar" style="display:block;height:12px"><i style="width:${Math.min(100, (hours / 25) * 100)}%;background:${hours > 22 ? "var(--bubble)" : "var(--lagoon)"}"></i></div>
          <h4 style="margin:22px 0 10px">Calls</h4>${calls.length ? `<ul class="list">${calls.map((b) => `<li><span class="grow">${esc(famName(b.familyId))}<br><span class="small muted">${FS.dateTime(b.at)}</span></span></li>`).join("")}</ul>` : `<p class="muted">No calls booked.</p>`}</div>
      </div>`);
  }, { needs: isAdmin });

  // ---------- Requests ----------
  FS.route("/admin/requests", function () {
    const rows = FS.state.requests.filter((r) => r.status !== "DRAFT");
    return L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Requests</h1></div>
      <div class="panel scroll-x">${rows.length ? `<table class="table"><thead><tr><th>App</th><th>Family</th><th>Size</th><th>Summary</th><th>Status</th><th>Received</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td><a href="#/admin/requests/${r.id}">${esc(r.title)}</a>${r.gift ? ' <span class="tag pink">Gift</span>' : ""}</td><td>${esc(famName(r.familyId))}</td><td>${FS.TIERS[r.tier].name}</td><td class="muted" style="max-width:340px">${esc(r.brief.purpose)}</td><td>${reqStatusTag(r.status)}</td><td class="muted">${FS.ago(r.created)}</td></tr>`).join("")}</tbody></table>` : `<p class="muted">No requests match these filters.</p>`}</div>`);
  }, { needs: isAdmin });

  FS.route("/admin/requests/:id", function (id) {
    const r = FS.state.requests.find((x) => x.id === id); if (!r) return L.admin(`<p>Not found.</p>`);
    const b = r.brief, fam = FS.state.families[r.familyId];
    const blocked = /track|location|disney|pok|marvel|money|medical/i.test(r.wish);
    return {
      html: L.admin(`<p class="crumb"><a href="#/admin/requests">Requests</a> / ${esc(r.title)}</p>
        <div class="page-head" style="padding-top:12px"><div class="row" style="justify-content:space-between"><h1 style="font-size:clamp(2rem,4vw,2.6rem)">${esc(r.title)}</h1>${reqStatusTag(r.status)}</div><p class="lede">${esc(fam.name)} · ${fam.members.map((m) => esc(m.name) + (m.kind === "child" ? ` (${m.age})` : "")).join(", ")}</p></div>
        <div class="grid-2" style="align-items:start">
          <div><div class="panel"><h3 style="margin-bottom:10px">In their words</h3><p>“${esc(r.wish)}”</p>
            <p class="small" style="margin-top:12px"><span class="tag ${blocked ? "pink" : "ok"}">${blocked ? "Needs your review: may be out of scope" : "Fits the menu"}</span></p></div>
            <div class="panel"><h3 style="margin-bottom:12px">Their confirmed plan</h3><dl class="stack" style="--gap:12px">${[["For", b.purpose], ["Who", b.people], ["How", b.workflow], ["Look", b.look], ["Must-haves", b.features.join(", ")], ["Not included", b.exclusions.join(", ")]].map(([k, v]) => `<div><dt class="small muted">${k}</dt><dd style="margin:2px 0 0">${esc(v)}</dd></div>`).join("")}</dl></div>
            ${r.uploads && r.uploads.length ? `<div class="panel"><h3 style="margin-bottom:12px">Pictures they shared</h3><div class="row">${r.uploads.map((u) => `<img src="${u.src}" alt="${esc(u.name)}" style="width:110px;height:110px;object-fit:cover;border-radius:14px">`).join("")}</div></div>` : ""}
            ${r.call ? `<div class="panel"><h3 style="margin-bottom:8px">Call notes</h3><p class="muted">${esc(r.call.notes)}</p></div>` : ""}</div>
          <div class="panel" style="position:sticky;top:96px">${r.proposal ? `<h3>Plan sent</h3><p class="muted" style="margin:8px 0 16px">${FS.TIERS[r.proposal.tier].name} · ${FS.money(r.proposal.price)} · ${r.proposal.status === "ACCEPTED" ? "accepted" : "waiting for them"}</p>${r.projectId ? `<a class="btn" href="#/admin/projects">Go to the build</a>` : ""}` : `
            <h3 style="margin-bottom:14px">Send a plan and price</h3>
            <form id="prop" class="stack" style="--gap:14px">
              <div class="field"><label for="ptier">Size</label><select class="input" id="ptier">${Object.values(FS.TIERS).map((t) => `<option value="${t.id}"${t.id === r.tier ? " selected" : ""}>${t.name} · ${FS.money(t.price)}</option>`).join("")}</select></div>
              <div class="field"><label for="pscope">What's included (one per line)</label><textarea class="input" id="pscope">${esc(b.features.join("\n"))}</textarea></div>
              <div class="field"><label for="pdel">Ready in</label><input class="input" id="pdel" value="${FS.TIERS[r.tier].days} after kickoff"></div>
              <div class="callout small" id="pcap"></div>
              <div class="row"><button class="btn" type="submit">Send the plan</button><button class="btn ghost" type="button" id="decline">Decline kindly</button></div></form>`}</div></div>`),
      mount(root) {
        const f = FS.$("#prop", root); if (!f) return;
        const cap = () => { const t = FS.$("#ptier", root).value; const h = { sprout: 7, bloom: 16, grove: 34 }[t]; FS.$("#pcap", root).innerHTML = `About <strong>${h} hours</strong> of your time. ${h > 20 ? "This would push you past this week's 25 hours." : "Fits this week's capacity."}`; };
        FS.$("#ptier", root).onchange = cap; cap();
        f.onsubmit = (e) => {
          e.preventDefault(); const t = FS.TIERS[FS.$("#ptier", root).value];
          const dep = t.id === "sprout" ? t.price : t.id === "bloom" ? Math.ceil(t.price / 2) : Math.ceil(t.price * .4);
          r.tier = t.id; r.status = "PROPOSAL_SENT";
          r.proposal = { id: FS.uid("q"), tier: t.id, price: t.price, deposit: dep, due: t.id === "sprout" ? "Paid in full to start" : t.id === "bloom" ? "50% now, 50% before delivery" : "40% now, 40% at preview, 20% before delivery", delivery: FS.$("#pdel", root).value, revisions: { sprout: 1, bloom: 2, grove: 3 }[t.id], scope: FS.$("#pscope", root).value.split("\n").map((s) => s.trim()).filter(Boolean), status: "SENT" };
          FS.save(); FS.toast("Plan sent. They'll get an email (demo)."); FS.render();
        };
        FS.$("#decline", root).onclick = () => { r.status = "DECLINED"; FS.save(); FS.toast("Declined with a kind note and a simpler suggestion."); FS.go("/admin/requests"); };
      },
    };
  }, { needs: isAdmin });

  // ---------- Feedback board ----------
  const COLS = [["new", "New feedback"], ["planned", "Planned"], ["doing", "In progress"], ["done", "Done"], ["declined", "Not this time"]];
  FS.route("/admin/feedback", function () {
    const all = FS.state.feedback;
    const themes = all.reduce((m, f) => ((m[f.theme] = (m[f.theme] || 0) + 1), m), {});
    return {
      html: L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Feedback</h1><p class="lede">Voice and text notes from previews, sorted into themes. Move each one along as you work.</p></div>
        <div class="row" style="margin-bottom:18px">${Object.entries(themes).map(([t, n]) => `<span class="tag violet" style="padding:6px 12px">${esc(t)} · ${n}</span>`).join("")}</div>
        ${all.length ? `<div class="board">${COLS.map(([k, label]) => { const items = all.filter((f) => f.status === k); return `<div class="col"><h4>${label}<span>${items.length}</span></h4>${items.map((f) => `<article class="card-fb"><div class="row" style="justify-content:space-between"><span style="font-size:1.3rem" aria-hidden="true">${f.mood}</span><span class="tag ${f.sentiment === "positive" ? "ok" : ""}">${esc(f.theme)}</span></div><q>${esc(f.text)}</q><div class="meta">${esc(f.by)} · ${esc(famName(f.familyId))}<br>Screen: ${esc(f.screen)} · ${FS.ago(f.at)}</div>
          <label class="sr" for="mv-${f.id}">Move to</label><select class="input" id="mv-${f.id}" data-move="${f.id}" style="min-height:38px;padding:6px 10px;font-size:.88rem">${COLS.map(([ck, cl]) => `<option value="${ck}"${ck === k ? " selected" : ""}>${cl}</option>`).join("")}</select></article>`).join("")}</div>`; }).join("")}</div>` : `<div class="panel empty"><p>No feedback waiting.</p></div>`}`),
      mount(root) { FS.$$("[data-move]", root).forEach((s) => s.onchange = () => { FS.state.feedback.find((f) => f.id === s.dataset.move).status = s.value; FS.save(); FS.render(); }); },
    };
  }, { needs: isAdmin });

  // ---------- Builds ----------
  FS.route("/admin/projects", function () {
    const ps = Object.values(FS.state.projects);
    return {
      html: L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Builds</h1></div>
        ${ps.length ? ps.map((p) => `<div class="panel"><div class="panel-head"><div><h3>${esc(p.name)}</h3><p class="small muted">${esc(famName(p.familyId))} · target ${FS.date(p.target)}</p></div>
          <div class="row"><label class="sr" for="st-${p.id}">Stage</label><select class="input" id="st-${p.id}" data-stage="${p.id}" style="width:auto">${FS.STAGES.concat([{ id: "delivered", name: "Delivered" }]).map((s) => `<option value="${s.id}"${s.id === p.stage ? " selected" : ""}>${s.name}</option>`).join("")}</select>
          ${p.previewReady ? `<a class="btn small quiet" href="#/app/${p.appSlug}">Open preview</a>` : `<button class="btn small" data-preview="${p.id}">Share a preview</button>`}</div></div>
          <form class="row" data-update="${p.id}"><label class="sr" for="up-${p.id}">Update for the family</label><input class="input" id="up-${p.id}" style="flex:1;min-width:220px" placeholder="Write a short update for the family"><button class="btn quiet">Post update</button></form></div>`).join("") : `<div class="panel empty"><p>No builds yet. They start when a family accepts a plan.</p></div>`}`),
      mount(root) {
        FS.$$("[data-stage]", root).forEach((s) => s.onchange = () => { const p = FS.state.projects[s.dataset.stage]; p.stage = s.value; if (s.value === "delivered") p.deliveredAt = Date.now(); p.updates.push({ at: Date.now(), text: `Moved to "${s.options[s.selectedIndex].text}".` }); FS.save(); FS.toast("Stage updated. The family sees it now."); });
        FS.$$("[data-preview]", root).forEach((b) => b.onclick = () => { const p = FS.state.projects[b.dataset.preview]; p.previewReady = true; p.appSlug = "chen-chore-quest"; p.updates.push({ at: Date.now(), text: "Your preview is ready to try!" }); FS.save(); FS.toast("Preview shared with the family."); FS.render(); });
        FS.$$("[data-update]", root).forEach((f) => f.onsubmit = (e) => { e.preventDefault(); const i = FS.$("input", f); if (!i.value.trim()) return; FS.state.projects[f.dataset.update].updates.push({ at: Date.now(), text: i.value.trim() }); FS.save(); i.value = ""; FS.toast("Update posted."); });
      },
    };
  }, { needs: isAdmin });

  FS.route("/admin/calendar", () => L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Calls</h1></div>
    <div class="panel"><ul class="list">${FS.state.bookings.slice().sort((a, b) => b.at - a.at).map((b) => { const r = FS.state.requests.find((x) => x.id === b.requestId); return `<li><span class="avatar" style="background:var(--sky-soft);color:var(--violet)">${icon("cal").replace("<svg", '<svg style="width:22px"')}</span><span class="grow"><strong>${esc(famName(b.familyId))}</strong> · ${esc(r ? r.title : "")}<br><span class="small muted">${FS.dateTime(b.at)}</span></span><span class="tag ${b.status === "Done" ? "ok" : "violet"}">${b.status}</span></li>`; }).join("")}</ul></div>`), { needs: isAdmin });

  FS.route("/admin/gifts", () => L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Gifts</h1></div>
    <div class="panel scroll-x"><table class="table"><thead><tr><th>Amount</th><th>From</th><th>To</th><th>Sends</th><th>Status</th></tr></thead><tbody>${FS.state.gifts.map((g) => `<tr><td><b>${FS.money(g.amount)}</b></td><td>${esc(g.from)}</td><td>${esc(g.to)}${g.forChild ? `<br><span class="small muted">for ${esc(g.forChild)}</span>` : ""}</td><td>${FS.date(g.sendOn)}</td><td><span class="tag ${g.status === "REDEEMED" ? "ok" : "violet"}">${g.status.toLowerCase().replace(/^./, (c) => c.toUpperCase())}</span></td></tr>`).join("")}</tbody></table></div>`), { needs: isAdmin });

  FS.route("/admin/templates", () => L.admin(`<div class="page-head" style="padding-top:0"><h1 style="font-size:clamp(2rem,4vw,2.8rem)">Family App Kit</h1><p class="lede">Reusable parts, so most of each app is assembled and only the magic is custom.</p></div>
    <div class="grid-ideas">${[["Quest board", "Chores, stars, rewards, characters", "Chore Quest, Pocket Points", 9], ["Story steps", "Branching story pages with art", "Bedtime Story Machine", 11], ["Day planner", "Day cards, checklists, unlocks", "Japan Family Quest", 12], ["Photo book", "Chapters, photo pages, captions", "Our Family Book", 8], ["Countdown", "Dates, daily reveals", "Holiday Countdown", 5], ["Feedback button", "Voice + faces on every screen", "Every app", 0]].map(([n, d, u, h]) => `<div class="panel"><h3>${n}</h3><p class="muted small" style="margin:6px 0 12px">${d}</p><p class="small">Used in: ${u}</p><p class="small muted">${h ? `About ${h}h to adapt` : "Included automatically"}</p></div>`).join("")}</div>`), { needs: isAdmin });

  // ---------- Demo delivered app: Chore Quest ----------
  FS.route("/app/:slug", () => FS.choreApp({ embedded: false, preview: FS.query().get("preview"), from: FS.query().get("from") }));

  FS.choreApp = function (opt) {
    const s = FS.state.choreApp;
    const preview = opt.preview, embedded = opt.embedded;
    const project = Object.values(FS.state.projects).find((p) => p.appSlug === "chen-chore-quest") || {};
    const kid = s.kid, list = s.chores[kid];
    const earned = list.filter((c) => c.done).reduce((n, c) => n + c.s, 0);
    const total = s.banked[kid] + earned, pct = Math.min(100, (total / s.goal) * 100);
    const chars = { dragon: { fill: "#24A898", name: "Ember the dragon" }, unicorn: { fill: "#FF7FA8", name: "Clover the unicorn" }, star: { fill: "#FFC83D", name: "Pip" } };
    const ch = chars[s.character] || chars.dragon;
    const creature = s.character === "star" ? FS.pip({ mood: "proud" }) : `<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="72" rx="38" ry="34" fill="${ch.fill}"/>${s.character === "unicorn" ? '<path d="M60 8 l7 30 h-14z" fill="#FFC83D"/>' : '<path d="M30 46 l-8-22 18 14zM90 46 l8-22-18 14z" fill="' + ch.fill + '"/><path d="M96 70 q20 0 18 20 q-8-8-16-6" fill="' + ch.fill + '"/>'}<circle cx="47" cy="66" r="6" fill="#23205C"/><circle cx="73" cy="66" r="6" fill="#23205C"/><circle cx="49" cy="64" r="2" fill="#fff"/><circle cx="75" cy="64" r="2" fill="#fff"/><path d="M48 84 q12 10 24 0" stroke="#23205C" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="38" cy="80" rx="6" ry="3.5" fill="#fff" opacity=".45"/><ellipse cx="82" cy="80" rx="6" ry="3.5" fill="#fff" opacity=".45"/></svg>`;
    const starSize = s.bigStars ? 34 : 22;
    return {
      html: `<div class="chore-app${embedded ? " embedded" : ""}">
        <div style="max-width:520px;margin:0 auto;padding:22px 18px 120px">
          ${embedded ? "" : `<a class="link" href="${FS.viewer().role === "admin" ? "#/admin/projects" : opt.from ? "#/portal/projects/" + opt.from : "#/portal/apps"}" style="color:#CFCBF5;display:inline-flex;gap:6px;align-items:center;margin-bottom:12px">${FS.icon("arrowL").replace("<svg", '<svg style="width:16px"')}Back to ${FS.viewer().role === "admin" ? "the workbench" : "your family"}</a>`}
          ${preview || embedded ? `<div class="mock-banner" style="border-radius:999px;margin-bottom:14px">Preview · made for the Chen family</div>` : ""}
          <div class="row" style="justify-content:space-between"><${embedded ? "h2" : "h1"} style="font-size:1.9rem;color:#fff;font-family:var(--display);font-weight:600">Chore Quest</${embedded ? "h2" : "h1"}>
            <div class="row" role="group" aria-label="Who's playing?">${Object.keys(s.chores).map((k) => `<button class="pill" data-kid="${k}" aria-pressed="${k === kid}" style="${k === kid ? "background:#FFC83D;border-color:#FFC83D;color:#23205C" : "background:transparent;color:#fff;border-color:rgba(255,255,255,.3)"}">${k}</button>`).join("")}</div></div>
          <div style="margin-top:18px;background:rgba(255,255,255,.08);border-radius:28px;padding:20px;display:grid;grid-template-columns:110px 1fr;gap:16px;align-items:center">
            <button data-screen="Pick your character" id="charbtn" style="background:none;border:0;cursor:pointer;padding:0" aria-label="Change character, now ${ch.name}">${creature}</button>
            <div><div style="font-size:.9rem;opacity:.8">${esc(kid)}'s quest with ${ch.name}</div><div style="font-family:var(--display);font-size:1.7rem;font-weight:600;line-height:1.1;margin:4px 0 10px">${total} of ${s.goal} stars</div>
              <div style="height:16px;border-radius:16px;background:rgba(255,255,255,.15);overflow:hidden"><i style="display:block;height:100%;width:${pct}%;background:#FFC83D;border-radius:16px;transition:width .4s var(--ease)"></i></div>
              <div style="font-size:.9rem;margin-top:8px;opacity:.85">Goal: ${esc(s.reward)}</div></div></div>
          <h2 style="font-size:1.3rem;color:#fff;margin:26px 4px 12px">Today's quests</h2>
          <ul style="list-style:none;margin:0;padding:0;display:grid;gap:12px">${list.map((c, i) => `<li><button data-chore="${i}" style="width:100%;min-height:72px;display:flex;gap:14px;align-items:center;padding:14px 16px;border-radius:22px;border:0;cursor:pointer;text-align:left;font:inherit;font-weight:650;font-size:1.08rem;background:${c.done ? "#24A898" : "#fff"};color:${c.done ? "#fff" : "#23205C"}" aria-pressed="${c.done}">
            <span style="width:40px;height:40px;border-radius:50%;flex:none;display:grid;place-items:center;background:${c.done ? "rgba(255,255,255,.25)" : "#EFEDFB"}">${c.done ? FS.icon("check").replace("<svg", '<svg style="width:22px"') : ""}</span><span style="flex:1">${esc(c.t)}</span>
            <span style="display:flex;gap:2px" aria-label="${c.s} stars">${Array.from({ length: c.s }, () => `<svg viewBox="0 0 24 24" style="width:${starSize}px;height:${starSize}px" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" fill="#FFC83D" stroke="#23205C" stroke-width="1.2"/></svg>`).join("")}</span></button></li>`).join("")}</ul>
          <details style="margin-top:26px;background:rgba(255,255,255,.06);border-radius:20px;padding:14px 18px"><summary style="cursor:pointer;font-weight:650">For grown-ups</summary>
            <div class="stack" style="--gap:10px;margin-top:12px"><p style="opacity:.85">Reset everyone's quests for a new week. Stars earned are kept.</p><button class="btn small sun" id="reset" style="width:max-content">Start a new week</button></div></details>
        </div>
        <button id="fab" class="app-fab" style="min-height:60px;padding:0 22px 0 16px;border-radius:999px;border:0;background:#FF7FA8;color:#23205C;font:inherit;font-weight:700;display:flex;align-items:center;gap:10px;cursor:pointer;box-shadow:0 14px 30px -10px rgba(0,0,0,.5)"><span style="width:30px">${FS.icon("mic")}</span>Tell us what you think</button>
      </div>`,
      mount(root) {
        if (!embedded) document.body.style.background = "#23205C";
        const redraw = () => { FS.save(); FS.render(); };
        FS.$$("[data-kid]", root).forEach((b) => b.onclick = () => { s.kid = b.dataset.kid; redraw(); });
        FS.$$("[data-chore]", root).forEach((b) => b.onclick = () => { const c = list[+b.dataset.chore]; c.done = !c.done; FS.save(); if (c.done && list.every((x) => x.done)) { FS.render(); FS.confetti(); } else FS.render(); });
        FS.$("#charbtn", root).onclick = () => { const order = s.unicornUnlocked ? ["dragon", "unicorn", "star"] : ["dragon", "star"]; s.character = order[(order.indexOf(s.character) + 1) % order.length]; redraw(); };
        FS.$("#reset", root).onclick = () => { Object.keys(s.chores).forEach((k) => { s.banked[k] += s.chores[k].filter((c) => c.done).reduce((n, c) => n + c.s, 0); s.chores[k].forEach((c) => (c.done = false)); }); FS.toast("New week started. Stars kept."); redraw(); };
        FS.$("#fab", root).onclick = () => FS.feedbackSheet({ projectId: project.id || "p-chore", familyId: "chen", screen: "Star board", kid: kid, onSent: FS.render });
      },
    };
  };

  // When the maker marks the unicorn request done, unlock it in the app.
  const origSave = FS.save;
  FS.save = function () {
    const f = FS.state.feedback.find((x) => /unicorn/i.test(x.text) && x.status === "done");
    if (f && !FS.state.choreApp.unicornUnlocked) { FS.state.choreApp.unicornUnlocked = true; FS.state.choreApp.bigStars = true; }
    origSave();
  };
})();
