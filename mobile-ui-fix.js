(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];

  let toastTimer;
  function toast(message) {
    const node = qs("#toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
  }

  function stateRef() {
    try { return window.eval("state"); }
    catch { return JSON.parse(localStorage.getItem("credlyGrowthHub") || "{}"); }
  }

  function saveState(mutator) {
    try {
      const s = window.eval("state");
      mutator(s);
      window.eval("save()");
      return;
    } catch {
      const s = stateRef();
      mutator(s);
      localStorage.setItem("credlyGrowthHub", JSON.stringify(s));
      location.reload();
    }
  }

  function nextDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }

  function initScrollHeader() {
    const topbar = qs(".topbar");
    if (!topbar) return;
    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > 90 && y > lastY + 5) topbar.classList.add("is-hidden");
      if (y < lastY - 5 || y < 40) topbar.classList.remove("is-hidden");
      lastY = y;
    }, { passive: true });
  }

  function enhanceBadgeCards() {
    qsa(".badge-card").forEach(card => {
      const code = qs("p code", card);
      if (!code || qs("details.mobile-query", card)) return;

      const details = document.createElement("details");
      details.className = "mobile-query";
      details.innerHTML = `<summary>View search query</summary><div class="query-box"><code>${code.textContent}</code></div>`;

      const actions = qs(".actions", card);
      card.insertBefore(details, actions || null);
    });
  }

  function ensureInlineAddForms() {
    const skillList = qs("#skillList");
    if (skillList && !qs("#mobileSkillAdd")) {
      const wrap = document.createElement("div");
      wrap.className = "mobile-inline-add";
      wrap.id = "mobileSkillAdd";
      wrap.innerHTML = `
        <input id="mobileSkillInput" placeholder="Add skill, e.g. Zero Trust">
        <button class="btn primary" data-mobile-action="add-skill">Add skill</button>
      `;
      skillList.parentElement.insertBefore(wrap, skillList);
    }

    const scheduleRows = qs("#scheduleRows");
    const table = scheduleRows?.closest("table");
    if (table && !qs("#mobileSessionAdd")) {
      const wrap = document.createElement("div");
      wrap.className = "mobile-inline-add";
      wrap.id = "mobileSessionAdd";
      wrap.innerHTML = `
        <input id="mobileSessionInput" placeholder="Add topic, badge or SCORM module">
        <button class="btn primary" data-mobile-action="add-session">Add session</button>
      `;
      table.parentElement.insertBefore(wrap, table);
    }
  }

  function pill(status) {
    if (status === "Complete") return `<span class="pill done">Complete</span>`;
    if (status === "In Progress") return `<span class="pill warn">In progress</span>`;
    return `<span class="pill">Planned</span>`;
  }

  function buildMobileScheduleCards() {
    const table = qs("#scheduleRows")?.closest("table");
    if (!table) return;

    let holder = qs(".mobile-session-cards");
    if (!holder) {
      holder = document.createElement("div");
      holder.className = "mobile-session-cards";
      table.after(holder);
    }

    const s = stateRef();
    const sessions = Array.isArray(s.schedule) ? s.schedule : [];

    if (!sessions.length) {
      holder.innerHTML = `<div class="mobile-session-card"><h3>No sessions scheduled</h3><p>Add a session manually or generate a 30-day plan.</p></div>`;
      return;
    }

    holder.innerHTML = sessions.map((item, i) => `
      <article class="mobile-session-card">
        <div class="session-meta"><span class="tag">${item.date || ""}</span>${pill(item.status || "Planned")}</div>
        <h3>${item.topic || "Learning session"}</h3>
        <p>${item.badge || "Manual / SCORM module"}</p>
        <label>Status
          <select data-mobile-status="${i}">
            <option ${item.status === "Planned" ? "selected" : ""}>Planned</option>
            <option ${item.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option ${item.status === "Complete" ? "selected" : ""}>Complete</option>
          </select>
        </label>
        <button class="btn danger" data-mobile-action="remove-session" data-index="${i}">Remove session</button>
      </article>
    `).join("");
  }

  document.addEventListener("click", async event => {
    const button = event.target.closest("[data-mobile-action]");
    if (!button) return;

    const action = button.dataset.mobileAction;

    if (action === "add-skill") {
      const input = qs("#mobileSkillInput");
      const name = input?.value.trim();
      if (!name) return toast("Enter a skill name first.");
      saveState(s => {
        s.skills = Array.isArray(s.skills) ? s.skills : [];
        s.skills.push({ name, score: 0, evidence: "" });
      });
      if (input) input.value = "";
      toast("Skill added.");
    }

    if (action === "add-session") {
      const input = qs("#mobileSessionInput");
      const topic = input?.value.trim();
      if (!topic) return toast("Enter a session topic first.");
      saveState(s => {
        s.schedule = Array.isArray(s.schedule) ? s.schedule : [];
        s.schedule.push({ date: nextDate(), topic, badge: "Manual / SCORM module", status: "Planned" });
      });
      if (input) input.value = "";
      toast("Session added.");
    }

    if (action === "remove-session") {
      const index = Number(button.dataset.index);
      saveState(s => {
        s.schedule = Array.isArray(s.schedule) ? s.schedule : [];
        s.schedule.splice(index, 1);
      });
      toast("Session removed.");
    }
  });

  document.addEventListener("change", event => {
    const select = event.target.closest("[data-mobile-status]");
    if (!select) return;
    const index = Number(select.dataset.mobileStatus);
    saveState(s => {
      s.schedule = Array.isArray(s.schedule) ? s.schedule : [];
      if (s.schedule[index]) s.schedule[index].status = select.value;
    });
    toast("Session status updated.");
  });

  const observer = new MutationObserver(() => {
    enhanceBadgeCards();
    ensureInlineAddForms();
    buildMobileScheduleCards();
  });

  function boot() {
    initScrollHeader();
    enhanceBadgeCards();
    ensureInlineAddForms();
    buildMobileScheduleCards();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
