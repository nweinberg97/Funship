/* Funship prototype: voice capture + feedback sheet.
   Uses the browser's built-in speech recognition when available; otherwise a clearly
   labelled demo transcript. Nothing is uploaded or stored as audio. */
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Attach a mic control that writes into a textarea.
  FS.micControl = function (wrap, textarea, sample) {
    let rec = null, on = false, demoTimer = null, base = "";
    const btn = wrap.querySelector(".mic"), status = wrap.querySelector(".mic-status");
    const set = (state, msg, sub) => {
      on = state; btn.classList.toggle("on", state);
      btn.innerHTML = FS.icon(state ? "stop" : "mic");
      btn.setAttribute("aria-label", state ? "Stop recording" : "Start recording");
      status.innerHTML = `${state ? '<span class="levels" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>' : ""}<span>${msg}<small>${sub || ""}</small></span>`;
      status.style.display = "flex"; status.style.gap = "12px"; status.style.alignItems = "center";
    };
    const stop = () => {
      if (rec) { try { rec.stop(); } catch (e) {} rec = null; }
      clearInterval(demoTimer);
      set(false, "Got it. Check the words below and fix anything.", "The recording isn't kept.");
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    };
    btn.addEventListener("click", () => {
      if (on) return stop();
      base = textarea.value ? textarea.value.trim() + " " : "";
      if (SR) {
        try {
          rec = new SR(); rec.lang = "en-US"; rec.interimResults = true; rec.continuous = true;
          rec.onresult = (e) => { let s = ""; for (let i = 0; i < e.results.length; i++) s += e.results[i][0].transcript; textarea.value = base + s; };
          rec.onerror = (ev) => { rec = null; if (ev && /not-allowed|service-not-allowed|audio-capture|network/.test(ev.error)) { demo(); } else stop(); };
          rec.onend = () => { if (on) stop(); };
          rec.start(); set(true, "Listening… tap to stop", "Talk like you'd tell a friend.");
          return;
        } catch (e) { /* fall through to demo */ }
      }
      demo();
    });
    // Demo transcript when the browser can't transcribe or the mic is blocked.
    function demo() {
      clearInterval(demoTimer);
      const words = (sample || "We'd love something that makes mornings calmer for the kids.").split(" ");
      let i = 0; set(true, "Listening… (demo voice)", "Voice isn't available here, so we're playing a sample.");
      demoTimer = setInterval(() => { textarea.value = base + words.slice(0, ++i).join(" "); if (i >= words.length) stop(); }, 90);
    }
  };

  FS.micBlock = (id) => `<div class="mic-wrap" data-mic="${id}"><button type="button" class="mic" aria-label="Start recording">${FS.icon("mic")}</button><div class="mic-status"><span>Tap to talk instead of typing<small>Your voice is turned into text, then the recording is deleted.</small></span></div></div>`;

  // Feedback sheet used in previews and delivered apps. ctx = { projectId, familyId, screen, kid }
  FS.feedbackSheet = function (ctx) {
    const faces = [["😍", "Love it"], ["🙂", "Good"], ["😐", "Not sure"], ["🙁", "Not right"]];
    FS.modal(`<div class="stack" style="--gap:18px">
      <h2 style="font-size:1.8rem;padding-right:40px">${ctx.kid ? "What should we change?" : "Tell us what you think"}</h2>
      <p class="muted">${ctx.kid ? "Tell us or tap a face. Your grown-up will see what you say." : `About the <strong>${FS.esc(ctx.screen)}</strong> screen. Say it out loud or type.`}</p>
      <div class="row" role="group" aria-label="How do you feel about it?">${faces.map(([f, l]) => `<button type="button" class="pill face" data-face="${f}" aria-pressed="false" style="min-height:56px;font-size:1.6rem;padding:0 14px" aria-label="${l}">${f}</button>`).join("")}</div>
      <div style="display:grid;justify-items:center;gap:10px" class="mic-wrap" data-mic="fb"><button type="button" class="mic big" aria-label="Start recording">${FS.icon("mic")}</button><div class="mic-status" style="text-align:center"><span>Tap and talk<small>Recordings are deleted once they're words.</small></span></div></div>
      <div class="field"><label for="fbtext">${ctx.kid ? "Or type it" : "What would you change?"}</label><textarea id="fbtext" class="input" style="min-height:100px" placeholder="The stars are too small…"></textarea></div>
      <div id="followup"></div>
      <button class="btn" id="fbsend" type="button">Send feedback</button></div>`, (s, close) => {
      let face = "";
      FS.$$(".face", s).forEach((b) => b.onclick = () => { face = b.dataset.face; FS.$$(".face", s).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); });
      const ta = FS.$("#fbtext", s);
      FS.micControl(FS.$('[data-mic="fb"]', s), ta, ctx.kid ? "The stars are too small and I want a unicorn instead of a dragon" : "Can the reset happen on Sunday night instead of Monday morning");
      let asked = false;
      ta.addEventListener("input", () => {
        if (asked || ta.value.trim().split(/\s+/).length < 6 || ctx.kid) return;
        asked = true;
        FS.$("#followup", s).innerHTML = `<div class="callout" style="display:flex;gap:12px;align-items:flex-start"><span style="width:30px;flex:none">${FS.pip()}</span><span><strong>One quick question:</strong> ${followUp(ta.value)}<br><span class="small muted">Answer by adding to your note, or skip it.</span></span></div>`;
      });
      FS.$("#fbsend", s).onclick = () => {
        const text = ta.value.trim();
        if (!text && !face) { ta.focus(); FS.toast("Tap a face or say something first."); return; }
        FS.state.feedback.unshift({ id: FS.uid("f"), projectId: ctx.projectId, familyId: ctx.familyId, by: ctx.kid ? ctx.kid + " (kid mode)" : FS.viewer().name, screen: ctx.screen, at: Date.now(), text: text || "(reaction only)", mood: face || "🙂", theme: themeOf(text), sentiment: face === "🙁" || face === "😐" ? "mixed" : "positive", status: "new" });
        FS.save(); close();
        FS.toast(ctx.kid ? "You did it! Your idea is on its way to the maker." : "Thanks! Your note is with the maker.");
        if (ctx.onSent) ctx.onSent();
      };
    });
  };

  function followUp(t) {
    t = t.toLowerCase();
    if (/small|big|size|see/.test(t)) return "Is that on the phone, the tablet, or both?";
    if (/reset|time|morning|night|day/.test(t)) return "What time would work best for your family?";
    if (/colou?r|look|style/.test(t)) return "Is there a colour or picture you'd like instead?";
    return "What would make this screen feel just right?";
  }
  function themeOf(t) {
    t = (t || "").toLowerCase();
    if (/unicorn|dragon|character|draw/.test(t)) return "Characters";
    if (/reset|time|morning|night|sunday|monday/.test(t)) return "Schedule";
    if (/small|big|size|button|see|read/.test(t)) return "Readability";
    if (/colou?r|look|style/.test(t)) return "Look & feel";
    return "General";
  }
  FS.themeOf = themeOf;
})();
