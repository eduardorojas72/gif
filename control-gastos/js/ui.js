// Renderizado de las vistas y manejo de eventos. Sin frameworks: cada vista
// se vuelve a pintar por completo en #view y los listeners se re-enganchan.
const UI = {
  currentTab: "hoy",

  // ---------- Categorías (por defecto + personalizadas) ----------
  baseCategoriesFor(type) {
    return type === "income" ? LOGIC.localized(DATA.incomeCategories) : LOGIC.localized(DATA.expenseCategories);
  },
  categoriesFor(type) {
    const custom = STORE.getCustomCategories()[type === "income" ? "income" : "expense"] || [];
    return this.baseCategoriesFor(type).concat(custom);
  },
  categoryLabel(id) {
    const all = this.categoriesFor("expense").concat(this.categoriesFor("income"));
    const found = all.find((c) => c.id === id);
    return found ? found.icon + " " + found.label : id;
  },
  methodLabel(id) {
    const m = LOGIC.localized(DATA.paymentMethods).find((x) => x.id === id);
    return m ? m.label : id;
  },
  categoryOptionsHTML(type, selected) {
    return this.categoriesFor(type)
      .map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.icon} ${c.label}</option>`)
      .join("");
  },
  methodOptionsHTML(selected) {
    return LOGIC.localized(DATA.paymentMethods)
      .map((m) => `<option value="${m.id}" ${m.id === selected ? "selected" : ""}>${m.label}</option>`)
      .join("");
  },
  countryOptionsHTML(selected) {
    return DATA.countries
      .map((c) => `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${LOGIC.localized(c.name)} (${c.currency})</option>`)
      .join("");
  },

  // Aviso del saldo mensual (ingreso - gasto): en rojo si es negativo
  // ("números rojos"), en verde si es positivo.
  balanceBannerHTML(balance) {
    const n = Number(balance) || 0;
    const negative = n < 0;
    const sign = negative ? "-" : "+";
    return `
      <div class="balance-banner ${negative ? "balance-banner--negative" : "balance-banner--positive"}">
        <span class="balance-banner-label">${negative ? I18N.t("balanceNegative") : I18N.t("balancePositive")}</span>
        <strong>${sign}${LOGIC.formatMoney(Math.abs(n))}</strong>
      </div>`;
  },

  // ---------- Utilidades de UI: toast, modal, confeti ----------
  toast(message, tone) {
    const slot = document.getElementById("toast-slot");
    const el = document.createElement("div");
    el.className = "toast" + (tone ? " toast--" + tone : "");
    el.textContent = message;
    slot.appendChild(el);
    requestAnimationFrame(() => el.classList.add("toast--show"));
    setTimeout(() => {
      el.classList.remove("toast--show");
      setTimeout(() => el.remove(), 300);
    }, 3200);
  },

  openModal(html) {
    const slot = document.getElementById("modal-slot");
    slot.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-card" role="dialog" aria-modal="true">${html}</div>
      </div>`;
    document.getElementById("modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "modal-backdrop") UI.closeModal();
    });
    slot.querySelectorAll("[data-close-modal]").forEach((btn) =>
      btn.addEventListener("click", () => UI.closeModal())
    );
  },
  closeModal() {
    document.getElementById("modal-slot").innerHTML = "";
  },

  confettiBurst() {
    const slot = document.getElementById("confetti-slot");
    const colors = ["#F2C94C", "#17624B", "#EB5757", "#56CCF2", "#BB6BD9"];
    for (let i = 0; i < 36; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = Math.random() * 0.4 + "s";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      slot.appendChild(piece);
      setTimeout(() => piece.remove(), 2200);
    }
  },

  async celebrateGoal(goal) {
    AUDIO.playSuccess();
    this.confettiBurst();
    const settings = STORE.getSettings();
    const dataURL = await SHARE.buildGoalCardDataURL({ goal, userName: settings.userName });
    this.openModal(`
      <h2>${I18N.t("achievementTitle")}</h2>
      <img src="${dataURL}" alt="${I18N.t("achievementAlt")}" class="achievement-preview" />
      <p class="muted-small">${goal.photo ? "" : I18N.t("addPhotoHint")}</p>
      <input type="file" accept="image/*" id="celebrate-photo-input" hidden />
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnClose")}</button>
        <label class="btn btn-secondary" for="celebrate-photo-input">${goal.photo ? I18N.t("changePhotoBtn") : I18N.t("addPhotoBtn")}</label>
        <button type="button" class="btn btn-primary" id="share-goal-celebrate">${I18N.t("btnShare")}</button>
      </div>
    `);
    const shareBtn = document.getElementById("share-goal-celebrate");
    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        const text = I18N.t("shareGoalText", { label: goal.label });
        const result = await SHARE.shareCard(dataURL, text);
        if (result === "downloaded") UI.toast(I18N.t("imageDownloadedToast"));
      });
    }
    const photoInput = document.getElementById("celebrate-photo-input");
    if (photoInput) {
      photoInput.addEventListener("change", async () => {
        const file = photoInput.files && photoInput.files[0];
        if (!file) return;
        const photoDataURL = await SHARE.resizeImageFile(file, 1000, 0.85);
        const updated = STORE.setGoalPhoto(goal.id, photoDataURL);
        UI.celebrateGoal(updated);
      });
    }
  },

  // ---------- Comprobación de la meta diaria ----------
  checkBudgetAlert() {
    const settings = STORE.getSettings();
    if (!settings.dailyGoal) return;
    const spent = LOGIC.spentToday();
    const goal = LOGIC.effectiveGoalForDate(LOGIC.todayStr());
    const pill = document.getElementById("status-pill");
    if (spent > goal) {
      pill.hidden = false;
      pill.textContent = I18N.t("dailyGoalExceeded");
      pill.className = "status-pill status-pill--over";
      if (settings.soundEnabled) AUDIO.playAlert();
    } else {
      pill.hidden = false;
      const pct = Math.round((spent / goal) * 100);
      pill.textContent = I18N.t("pctOfDailyGoal", { pct });
      pill.className = "status-pill status-pill--ok";
    }
  },

  // ---------- Importar movimientos desde CSV: modal de revisión ----------
  openCSVImportPreview(result) {
    const rowsHTML = result.rows.map((r, i) => `
      <tr data-idx="${i}">
        <td>${r.date}</td>
        <td>${r.description}</td>
        <td class="${r.type === "income" ? "text-income" : "text-expense"}">${r.type === "income" ? "+" : "−"} ${LOGIC.formatMoney(r.amount)}</td>
        <td><select class="csv-cat-select" data-idx="${i}">${this.categoryOptionsHTML(r.type, r.category)}</select></td>
      </tr>`).join("");

    const skippedNote = result.skipped ? I18N.t("csvSkippedNote", { n: result.skipped }) : "";
    this.openModal(`
      <h2>${I18N.t("csvReviewTitle")}</h2>
      <p class="muted-small">${I18N.t("csvReviewSummary", { n: result.rows.length, skipped: skippedNote })}</p>
      <div class="table-scroll">
        <table class="sheet-table">
          <thead><tr><th>${I18N.t("colDate")}</th><th>${I18N.t("colDescription")}</th><th>${I18N.t("colAmount")}</th><th>${I18N.t("colCategory")}</th></tr></thead>
          <tbody id="csv-preview-body">${rowsHTML}</tbody>
        </table>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnCancel")}</button>
        <button type="button" class="btn btn-primary" id="csv-import-confirm">${I18N.t("csvImportBtn", { n: result.rows.length })}</button>
      </div>
    `);

    document.querySelectorAll(".csv-cat-select").forEach((sel) =>
      sel.addEventListener("change", () => {
        result.rows[Number(sel.dataset.idx)].category = sel.value;
      })
    );

    document.getElementById("csv-import-confirm").addEventListener("click", () => {
      result.rows.forEach((r) => {
        STORE.addTransaction({
          type: r.type,
          category: r.category,
          description: r.description,
          amount: r.amount,
          date: r.date,
          method: null,
          source: "imported"
        });
      });
      UI.closeModal();
      UI.toast(I18N.t("toastImported", { n: result.rows.length }));
      UI.render("movimientos");
    });
  },

  render(tab) {
    this.applyStaticChrome();
    if (tab) this.currentTab = tab;
    document.querySelectorAll(".tab-btn").forEach((b) => {
      const active = b.dataset.tab === this.currentTab;
      b.classList.toggle("is-active", active);
      if (active) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    const view = document.getElementById("view");
    const renderers = {
      hoy: this.renderHoy,
      movimientos: this.renderMovimientos,
      cuentas: this.renderCuentas,
      metas: this.renderMetas,
      consejos: this.renderConsejos,
      resumen: this.renderResumen
    };
    view.innerHTML = (renderers[this.currentTab] || this.renderHoy).call(this);
    this.wire(this.currentTab);
    this.checkBudgetAlert();
  },

  // ================= CUESTIONARIO INICIAL (ONBOARDING) =================
  OBSTACLE_TIP_MAP: {
    no_se: ["Registra hasta los gastos pequeños"],
    impulso: ["Espera 24 horas antes de una compra no planificada"],
    suscripciones: ["Revisa tus suscripciones cada trimestre"],
    deudas: ["Paga primero la deuda más cara"],
    irregular: ["Págate a ti mismo primero"],
    imprevistos: ["Fondo de emergencia antes que inversión"],
    sin_presupuesto: ["Regla 50/30/20", "Sobres virtuales por categoría"]
  },
  STEP_NUMBER: {
    accountMode: 1, userName: 2, age: 3, country: 4, monthlyIncome: 5,
    desiredIncome: 6, occupation: 7, workHours: 8, workGoal: 9,
    expensesSnapshot: 10, currentSavingsMonthly: 11, savingsGoalMonthly: 12,
    meetingGoal: 13, obstacles: 14, diagnosis: 14, purposes: 15,
    archetype: 16, summary: 17
  },
  TOTAL_STEPS: 17,

  nextStep(step, data) {
    const flow = {
      accountMode: "userName",
      userName: "age",
      age: "country",
      country: "monthlyIncome",
      monthlyIncome: "desiredIncome",
      desiredIncome: "occupation",
      occupation: "workHours",
      workHours: "workGoal",
      workGoal: "expensesSnapshot",
      expensesSnapshot: "currentSavingsMonthly",
      currentSavingsMonthly: "savingsGoalMonthly",
      savingsGoalMonthly: "meetingGoal",
      meetingGoal: () => (data.currentlyMeetingGoal ? "purposes" : "obstacles"),
      obstacles: "diagnosis",
      diagnosis: "purposes",
      purposes: "archetype",
      archetype: "summary",
      summary: null
    };
    const next = flow[step];
    return typeof next === "function" ? next() : next;
  },

  startOnboarding(prefill, editing) {
    this.onboard = {
      step: "accountMode",
      history: [],
      editing: !!editing,
      data: Object.assign({ obstacles: [], savingsPurposes: [] }, prefill || {})
    };
    document.getElementById("tabbar").hidden = true;
    document.getElementById("status-pill").hidden = true;
    this.renderOnboardingView();
  },

  cancelOnboarding() {
    document.getElementById("tabbar").hidden = false;
    this.onboard = null;
    this.render("metas");
  },

  onboardGo(step) {
    this.onboard.history.push(this.onboard.step);
    this.onboard.step = step;
    this.renderOnboardingView();
  },
  onboardBack() {
    const prev = this.onboard.history.pop();
    if (!prev) return;
    this.onboard.step = prev;
    this.renderOnboardingView();
  },
  onboardNext(patch) {
    Object.assign(this.onboard.data, patch);
    const next = this.nextStep(this.onboard.step, this.onboard.data);
    if (!next) {
      this.finishOnboarding();
      return;
    }
    this.onboardGo(next);
  },

  finishOnboarding() {
    const d = this.onboard.data;
    const country = DATA.countries.find((c) => c.code === d.country);
    const settings = Object.assign({}, STORE.getSettings(), {
      accountMode: d.accountMode || "individual",
      userName: d.userName || "",
      age: d.age || null,
      country: d.country || null,
      currency: country ? country.currency : STORE.getSettings().currency,
      monthlyIncome: d.monthlyIncome || null,
      occupation: d.occupation || "",
      savingsGoalMonthly: d.savingsGoalMonthly || null,
      currentlyMeetingGoal: !!d.currentlyMeetingGoal,
      obstacles: d.obstacles || [],
      savingsPurposes: d.savingsPurposes || [],
      savingsPurposeOther: d.savingsPurposeOther || "",
      dailyGoal: d.dailyGoal || STORE.getSettings().dailyGoal,
      desiredIncome: d.desiredIncome || null,
      hoursPerDay: d.hoursPerDay || null,
      overtimeHours: d.overtimeHours || null,
      multipleJobs: !!d.multipleJobs,
      commuteMinutes: d.commuteMinutes || null,
      workGoal: d.workGoal || "",
      expensesSnapshot: d.expensesSnapshot || {},
      currentSavingsMonthly: d.currentSavingsMonthly != null ? d.currentSavingsMonthly : null,
      archetypeKey: LOGIC.computeArchetype(d).key,
      savingsBehavior: d.savingsBehavior || "pasivo",
      incomeExpenseProfileKey: LOGIC.computeIncomeExpenseProfile(d).key,
      onboardingDone: true
    });
    STORE.saveSettings(settings);
    document.getElementById("tabbar").hidden = false;
    this.onboard = null;
    this.toast(I18N.t("toastProfileSaved"));
    this.render("hoy");
  },

  renderOnboardingView() {
    const view = document.getElementById("view");
    const step = this.onboard.step;
    const d = this.onboard.data;
    const num = this.STEP_NUMBER[step] || 1;
    const progress = `<p class="ob-progress">${I18N.t("onbProgress", { num, total: this.TOTAL_STEPS })}</p>`;
    const renderers = {
      accountMode: () => `
        <img class="ob-mascot" src="icons/mascot-piggy.svg" alt="Hucha" />
        ${this.languageSelectorHTML()}
        ${progress}
        <h1>${I18N.t("onbAccountModeTitle")}</h1>
        <div class="ob-choice-grid">
          <button class="ob-choice" data-value="individual">${I18N.t("onbAccountModeIndividual")}</button>
          <button class="ob-choice" data-value="compartida">${I18N.t("onbAccountModeShared")}</button>
        </div>`,
      userName: () => `
        ${progress}
        <h1>${I18N.t("onbUserNameTitle")}</h1>
        <form class="form ob-form" data-next>
          <input type="text" name="userName" value="${d.userName || ""}" placeholder="${I18N.t("onbUserNamePlaceholder")}" required autofocus />
          ${this.obNavHTML()}
        </form>`,
      age: () => `
        ${progress}
        <h1>${I18N.t("onbAgeTitle")}</h1>
        <form class="form ob-form" data-next>
          <input type="number" name="age" min="10" max="110" value="${d.age || ""}" placeholder="${I18N.t("onbAgePlaceholder")}" required />
          ${this.obNavHTML()}
        </form>`,
      country: () => `
        ${progress}
        <h1>${I18N.t("onbCountryTitle")}</h1>
        <p class="muted-small">${I18N.t("onbCountryHint")}</p>
        <form class="form ob-form" data-next>
          <select name="country" required>
            <option value="" disabled ${!d.country ? "selected" : ""}>${I18N.t("onbCountrySelect")}</option>
            ${this.countryOptionsHTML(d.country)}
          </select>
          ${this.obNavHTML()}
        </form>`,
      monthlyIncome: () => `
        ${progress}
        <h1>${I18N.t("onbMonthlyIncomeTitle")}</h1>
        <form class="form ob-form" data-next>
          <input type="number" name="monthlyIncome" min="0" step="0.01" value="${d.monthlyIncome || ""}" placeholder="${I18N.t("onbMonthlyIncomePlaceholder")}" required />
          ${this.obNavHTML()}
        </form>`,
      desiredIncome: () => `
        ${progress}
        <h1>${I18N.t("onbDesiredIncomeTitle")}</h1>
        <p class="muted-small">${I18N.t("onbDesiredIncomeHint")}</p>
        <form class="form ob-form" data-next>
          <input type="number" name="desiredIncome" min="0" step="0.01" value="${d.desiredIncome || ""}" placeholder="${I18N.t("onbDesiredIncomePlaceholder")}" required />
          ${this.obNavHTML()}
        </form>`,
      occupation: () => `
        ${progress}
        <h1>${I18N.t("onbOccupationTitle")}</h1>
        <form class="form ob-form" data-next>
          <input type="text" name="occupation" value="${d.occupation || ""}" placeholder="${I18N.t("onbOccupationPlaceholder")}" />
          ${this.obNavHTML()}
        </form>`,
      workHours: () => `
        ${progress}
        <h1>${I18N.t("onbWorkHoursTitle")}</h1>
        <form class="form ob-form" data-next>
          <label>${I18N.t("onbHoursPerDayLabel")}
            <input type="number" name="hoursPerDay" min="0" max="24" step="0.5" value="${d.hoursPerDay || ""}" placeholder="Ej. 8" required />
          </label>
          <label>${I18N.t("onbOvertimeLabel")}
            <input type="number" name="overtimeHours" min="0" step="0.5" value="${d.overtimeHours || ""}" placeholder="Ej. 5" />
          </label>
          <label>${I18N.t("onbCommuteLabel")}
            <input type="number" name="commuteMinutes" min="0" step="1" value="${d.commuteMinutes || ""}" placeholder="Ej. 30" />
          </label>
          <label class="toggle-row">
            <input type="checkbox" name="multipleJobs" ${d.multipleJobs ? "checked" : ""} />
            ${I18N.t("onbMultipleJobsLabel")}
          </label>
          ${this.obNavHTML()}
        </form>`,
      workGoal: () => `
        ${progress}
        <h1>${I18N.t("onbWorkGoalTitle")}</h1>
        <div class="ob-choice-grid">
          <button class="ob-choice" data-workgoal="ganar_mas">${I18N.t("onbWorkGoalEarnMore")}</button>
          <button class="ob-choice" data-workgoal="trabajar_menos">${I18N.t("onbWorkGoalWorkLess")}</button>
          <button class="ob-choice" data-workgoal="ambas">${I18N.t("onbWorkGoalBoth")}</button>
        </div>`,
      expensesSnapshot: () => `
        ${progress}
        <h1>${I18N.t("onbExpensesSnapshotTitle")}</h1>
        <p class="muted-small">${I18N.t("onbExpensesSnapshotHint")}</p>
        <form class="form ob-form" data-next>
          ${DATA.expenseSnapshotCategories.map((c) => `
            <label>${c.icon} ${LOGIC.localized(c.label)}
              <input type="number" name="expense_${c.id}" min="0" step="0.01" value="${(d.expensesSnapshot && d.expensesSnapshot[c.id]) || ""}" placeholder="0.00" />
            </label>
          `).join("")}
          ${this.obNavHTML()}
        </form>`,
      currentSavingsMonthly: () => `
        ${progress}
        <h1>${I18N.t("onbCurrentSavingsTitle")}</h1>
        <p class="muted-small">${I18N.t("onbCurrentSavingsHint")}</p>
        <form class="form ob-form" data-next>
          <input type="number" name="currentSavingsMonthly" min="0" step="0.01" value="${d.currentSavingsMonthly || ""}" placeholder="${I18N.t("onbCurrentSavingsPlaceholder")}" required />
          <label>${I18N.t("onbSavingsBehaviorLabel")}
            <select name="savingsBehavior">
              <option value="pasivo" ${(d.savingsBehavior || "pasivo") === "pasivo" ? "selected" : ""}>${I18N.t("onbSavingsBehaviorPassive")}</option>
              <option value="invierte" ${d.savingsBehavior === "invierte" ? "selected" : ""}>${I18N.t("onbSavingsBehaviorInvest")}</option>
            </select>
          </label>
          ${this.obNavHTML()}
        </form>`,
      savingsGoalMonthly: () => `
        ${progress}
        <h1>${I18N.t("onbSavingsGoalTitle")}</h1>
        <p class="muted-small">${I18N.t("onbSavingsGoalHint")}</p>
        <form class="form ob-form" data-next>
          <input type="number" name="savingsGoalMonthly" min="0" step="0.01" value="${d.savingsGoalMonthly || ""}" placeholder="${I18N.t("onbSavingsGoalPlaceholder")}" required />
          ${this.obNavHTML()}
        </form>`,
      meetingGoal: () => `
        ${progress}
        <h1>${I18N.t("onbMeetingGoalTitle")}</h1>
        <div class="ob-choice-grid">
          <button class="ob-choice" data-bool="true">${I18N.t("onbMeetingGoalYes")}</button>
          <button class="ob-choice" data-bool="false">${I18N.t("onbMeetingGoalNo")}</button>
        </div>`,
      obstacles: () => `
        ${progress}
        <h1>${I18N.t("onbObstaclesTitle")}</h1>
        <form class="form ob-form" data-next id="ob-obstacles-form">
          <div class="ob-checks">
            ${DATA.obstacles.map((o) => `
              <label class="ob-check"><input type="checkbox" name="obstacles" value="${o.id}" ${(d.obstacles || []).includes(o.id) ? "checked" : ""}/> ${LOGIC.localized(o.label)}</label>
            `).join("")}
          </div>
          ${this.obNavHTML()}
        </form>`,
      diagnosis: () => {
        const chosen = d.obstacles || [];
        const tipTitles = new Set();
        chosen.forEach((id) => (this.OBSTACLE_TIP_MAP[id] || []).forEach((t) => tipTitles.add(t)));
        const tips = DATA.tips.filter((t) => tipTitles.has(t.title.es));
        return `
          ${progress}
          <h1>${I18N.t("onbDiagnosisTitle")}</h1>
          <p>${I18N.t("onbDiagnosisBody")}</p>
          ${tips.length ? `
            <div class="tip-grid">
              ${tips.map((t) => `<div class="tip-card"><h3>${LOGIC.localized(t.title)}</h3><p>${LOGIC.localized(t.body)}</p></div>`).join("")}
            </div>` : ""}
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="ob-back">${I18N.t("btnBack")}</button>
            <button type="button" class="btn btn-primary" id="ob-continue">${I18N.t("btnContinue")}</button>
          </div>`;
      },
      purposes: () => `
        ${progress}
        <h1>${I18N.t("onbPurposesTitle")}</h1>
        <form class="form ob-form" data-next id="ob-purposes-form">
          <div class="ob-checks ob-checks--grid">
            ${DATA.savingsPurposes.map((p) => `
              <label class="ob-check"><input type="checkbox" name="savingsPurposes" value="${p.id}" ${(d.savingsPurposes || []).includes(p.id) ? "checked" : ""}/> ${p.icon} ${LOGIC.localized(p.label)}</label>
            `).join("")}
          </div>
          <input type="text" name="savingsPurposeOther" value="${d.savingsPurposeOther || ""}" placeholder="${I18N.t("onbPurposeOtherPlaceholder")}" />
          ${this.obNavHTML()}
        </form>`,
      archetype: () => {
        const result = LOGIC.computeArchetype(d);
        const profile = LOGIC.computeIncomeExpenseProfile(d);
        return `
          ${progress}
          <div class="archetype-reveal">
            <span class="archetype-emoji">${result.emoji}</span>
            <p class="archetype-kicker">${I18N.t("onbArchetypeKicker")}</p>
            <h1>${LOGIC.localized(result.label)}</h1>
            <p>${LOGIC.localized(result.description)}</p>
          </div>
          <div class="risk-badge risk-badge--${profile.key}">
            <span class="risk-badge-label">${I18N.t("onbIncomeExpenseProfileLabel")}</span>
            <strong>${LOGIC.localized(profile.label)}</strong>
            <span class="risk-badge-level">${I18N.t("onbRisk", { risk: LOGIC.localized(profile.risk) })}</span>
            <p>${LOGIC.localized(profile.description)}</p>
          </div>
          ${this.balanceBannerHTML(profile.balance)}
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="ob-back">${I18N.t("btnBack")}</button>
            <button type="button" class="btn btn-primary" id="ob-continue">${I18N.t("btnContinue")}</button>
          </div>`;
      },
      summary: () => {
        const daysInMonth = LOGIC.daysInMonth(LOGIC.todayStr());
        const fixedMonthly = LOGIC.fixedMonthlyFromSnapshot(d.expensesSnapshot);
        const suggested = d.monthlyIncome && d.savingsGoalMonthly
          ? Math.max(0, (d.monthlyIncome - d.savingsGoalMonthly - fixedMonthly) / daysInMonth)
          : (d.dailyGoal || 0);
        return `
          ${progress}
          <h1>${I18N.t("onbSummaryTitle", { name: d.userName || "" })}</h1>
          <p class="muted-small">${I18N.t("onbSummaryHint")}</p>
          <form class="form ob-form" data-next>
            <label>${I18N.t("onbDailyGoalLabel")}
              <input type="number" name="dailyGoal" min="0" step="0.01" value="${(d.dailyGoal != null ? d.dailyGoal : suggested).toFixed(2)}" required />
            </label>
            <div class="modal-actions">
              <button type="button" class="btn btn-ghost" id="ob-back">${I18N.t("btnBack")}</button>
              <button type="submit" class="btn btn-primary">${I18N.t("onbStartUsing")}</button>
            </div>
          </form>`;
      }
    };
    const cancelHeader = this.onboard.editing
      ? `<button type="button" class="icon-btn ob-close" id="ob-cancel" aria-label="${I18N.t("onbCancelEdit")}">✕</button>`
      : "";
    view.innerHTML = `<section class="card ob-card">${cancelHeader}${(renderers[step] || renderers.accountMode)()}</section>`;
    this.wireOnboarding(step);
  },

  // ---------- Selector de idioma ----------
  LANGUAGE_NAMES: { es: "Español", en: "English", fr: "Français", it: "Italiano", pt: "Português" },
  languageSelectorHTML() {
    const current = LOGIC.lang();
    return `
      <div class="lang-switcher">
        <select id="lang-switcher-select" aria-label="${I18N.t("languageLabel")}">
          ${LOGIC.SUPPORTED_LANGS.map((l) => `<option value="${l}" ${l === current ? "selected" : ""}>${this.LANGUAGE_NAMES[l]}</option>`).join("")}
        </select>
      </div>`;
  },
  setLanguage(lang) {
    const settings = STORE.getSettings();
    STORE.saveSettings(Object.assign({}, settings, { language: lang }));
    this.applyStaticChrome();
    if (this.onboard) this.renderOnboardingView();
    else this.render(this.currentTab);
  },
  applyStaticChrome() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = I18N.t(el.dataset.i18n);
    });
  },

  obNavHTML() {
    return `
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="ob-back">${I18N.t("btnBack")}</button>
        <button type="submit" class="btn btn-primary">${I18N.t("btnContinue")}</button>
      </div>`;
  },

  wireOnboarding(step) {
    const view = document.getElementById("view");
    const langSelect = view.querySelector("#lang-switcher-select");
    if (langSelect) langSelect.addEventListener("change", () => this.setLanguage(langSelect.value));
    const backBtn = view.querySelector("#ob-back");
    if (backBtn) backBtn.addEventListener("click", () => this.onboard.history.length ? this.onboardBack() : this.cancelOnboarding());
    const cancelBtn = view.querySelector("#ob-cancel");
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.cancelOnboarding());

    view.querySelectorAll(".ob-choice[data-value]").forEach((btn) =>
      btn.addEventListener("click", () => this.onboardNext({ accountMode: btn.dataset.value }))
    );
    view.querySelectorAll(".ob-choice[data-bool]").forEach((btn) =>
      btn.addEventListener("click", () => this.onboardNext({ currentlyMeetingGoal: btn.dataset.bool === "true" }))
    );
    view.querySelectorAll(".ob-choice[data-workgoal]").forEach((btn) =>
      btn.addEventListener("click", () => this.onboardNext({ workGoal: btn.dataset.workgoal }))
    );

    const continueBtn = view.querySelector("#ob-continue");
    if (continueBtn) continueBtn.addEventListener("click", () => this.onboardNext({}));

    const form = view.querySelector("form[data-next]");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const patch = {};
        const numericFields = new Set([
          "age", "monthlyIncome", "savingsGoalMonthly", "dailyGoal",
          "desiredIncome", "hoursPerDay", "overtimeHours", "commuteMinutes", "currentSavingsMonthly"
        ]);
        if (step === "obstacles") {
          patch.obstacles = fd.getAll("obstacles");
        } else if (step === "purposes") {
          patch.savingsPurposes = fd.getAll("savingsPurposes");
          patch.savingsPurposeOther = fd.get("savingsPurposeOther") || "";
        } else if (step === "expensesSnapshot") {
          const snapshot = {};
          DATA.expenseSnapshotCategories.forEach((c) => {
            const value = fd.get("expense_" + c.id);
            snapshot[c.id] = value ? parseFloat(value) : 0;
          });
          patch.expensesSnapshot = snapshot;
        } else {
          for (const [key, value] of fd.entries()) {
            if (key === "multipleJobs") continue;
            const num = parseFloat(value);
            patch[key] = numericFields.has(key) && value !== "" ? num : value;
          }
          if (step === "workHours") patch.multipleJobs = fd.get("multipleJobs") === "on";
        }
        this.onboardNext(patch);
      });
    }
  },

  // ================= HOY =================
  renderHoy() {
    const settings = STORE.getSettings();
    const today = LOGIC.todayStr();
    const spent = LOGIC.variableSpentForDate(today);
    const totalSpentToday = LOGIC.totalForDate(today, "expense");
    const fixedSpentToday = totalSpentToday - spent;
    const savingsToday = LOGIC.savingsLoggedForDate(today);
    const income = LOGIC.totalForDate(today, "income");
    const goal = settings.dailyGoal ? LOGIC.effectiveGoalForDate(today) : null;
    const pct = goal ? Math.min(100, Math.round((spent / goal) * 100)) : 0;
    const over = goal && spent > goal;
    const dayClosed = STORE.getDays()[today];
    const txs = LOGIC.transactionsForDate(today).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const planToday = STORE.getPlan(today);
    const savings = LOGIC.savingsProgressThisMonth();
    const streak = LOGIC.currentStreak();
    const tier = LOGIC.streakTier(streak);

    const unit = I18N.t(streak === 1 ? "streakDay" : "streakDays");
    return `
      <section class="card">
        <div class="hoy-banner"><img src="icons/scene-campfire.svg" alt="" /></div>

        <div class="card-head">
          <h1>${I18N.t("hoyTitle")}</h1>
          <span class="muted">${new Date().toLocaleDateString(I18N.t("todayDateLocale"), { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>

        ${settings.userName ? `<p class="muted-small">${I18N.t("hoyGreeting", { name: settings.userName })} · ${settings.accountMode === "compartida" ? I18N.t("hoyAccountFamily") : I18N.t("hoyAccountPersonal")}</p>` : ""}

        ${streak > 0 ? `
          <div class="tier-chip" style="background:linear-gradient(90deg, ${tier.from}, ${tier.to}); color:${tier.text}">
            ${tier.key === "start"
              ? I18N.t("streakStraight", { n: streak, unit })
              : I18N.t("streakInTier", { emoji: tier.emoji, n: streak, unit, tier: LOGIC.localized(tier.label).toLowerCase() })}
          </div>
        ` : ""}

        ${planToday ? `
          <div class="plan-banner">
            <div>
              <strong>${I18N.t("planBannerTitle")}</strong>
              <p>${planToday}</p>
            </div>
            <button class="icon-btn" data-action="edit-plan" title="${I18N.t("editPlanTitle")}" aria-label="${I18N.t("editPlanTitle")}">✏️</button>
          </div>
        ` : ""}

        ${goal ? `
          <div class="goal-block">
            <div class="goal-row">
              <span>${I18N.t("goalSpentLabel")} <strong class="${over ? "text-danger" : ""}">${LOGIC.formatMoney(spent)}</strong></span>
              <span>${I18N.t("goalGoalLabel")} <strong>${LOGIC.formatMoney(goal)}</strong>${savingsToday > 0 ? ` <span class="muted-small">${I18N.t("goalSavedNote", { base: LOGIC.formatMoney(settings.dailyGoal), extra: LOGIC.formatMoney(savingsToday) })}</span>` : ""}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill ${over ? "progress-fill--over" : ""}" style="width:${pct}%"></div>
            </div>
            ${over ? `<p class="alert-text">${I18N.t("goalOverBudget", { amount: LOGIC.formatMoney(spent - goal) })}</p>` : `<p class="muted-small">${I18N.t("goalRemaining", { amount: LOGIC.formatMoney(goal - spent) })}</p>`}
            ${fixedSpentToday > 0 ? `<p class="muted-small">${I18N.t("goalFixedNote", { amount: LOGIC.formatMoney(fixedSpentToday) })}</p>` : ""}
          </div>
        ` : `
          <div class="empty-hint">
            <p>${I18N.t("emptyGoalHint")}</p>
            <button class="btn btn-primary" data-action="go-metas">${I18N.t("configureGoalBtn")}</button>
          </div>
        `}

        ${settings.savingsGoalMonthly ? `
          <div class="goal-block savings-block">
            <div class="goal-row">
              <span>${I18N.t("savingsThisMonth")}</span>
              <span><strong>${LOGIC.formatMoney(savings.saved)}</strong> / ${LOGIC.formatMoney(savings.goal)}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill progress-fill--savings" style="width:${savings.pct}%"></div>
            </div>
            <p class="muted-small">${I18N.t("dailySavingsTargetNote", { amount: LOGIC.formatMoney(LOGIC.dailySavingsTarget()) })}</p>
          </div>
        ` : ""}

        <div class="quick-actions">
          <button class="btn btn-expense" data-action="add" data-type="expense" ${dayClosed ? "disabled" : ""}>${I18N.t("addExpenseBtn")}</button>
          <button class="btn btn-income" data-action="add" data-type="income" ${dayClosed ? "disabled" : ""}>${I18N.t("addIncomeBtn")}</button>
        </div>
        <button class="btn btn-saving btn-block" data-action="add-saving" ${dayClosed ? "disabled" : ""}>${I18N.t("addSavingBtn")}</button>

        ${income ? `<p class="muted-small">${I18N.t("todayIncomeNote", { amount: "<strong>" + LOGIC.formatMoney(income) + "</strong>" })}</p>` : ""}

        ${dayClosed
          ? `<div class="day-closed-banner ${dayClosed.met ? "is-good" : "is-bad"}">
               ${dayClosed.met ? I18N.t("dayClosedGood") : I18N.t("dayClosedBad")}
             </div>`
          : `<div class="hoy-close-actions">
               ${goal ? `<button class="btn btn-secondary btn-block" data-action="close-day">${I18N.t("closeDayBtn")}</button>` : ""}
               <button class="btn btn-ghost btn-block" data-action="plan-tomorrow">${I18N.t("planTomorrowBtn")}</button>
             </div>`
        }

        <h2 class="section-title">${I18N.t("todayMovementsTitle")}</h2>
        ${txs.length ? `<ul class="tx-list">${txs.map((t) => this.txItemHTML(t)).join("")}</ul>` : `<p class="muted">${I18N.t("noMovementsToday")}</p>`}
      </section>
    `;
  },

  txItemHTML(t) {
    const sign = t.type === "expense" ? "−" : "+";
    const amountClass = t.type === "expense" ? "text-expense" : (t.type === "saving" ? "text-saving" : "text-income");
    const catLabel = t.type === "saving" ? I18N.t("savingCatLabel") : this.categoryLabel(t.category);
    const fixedTag = t.excludeFromDailyGoal ? ` <em class="tag-linked">${I18N.t("tagFixed")}</em>` : "";
    return `
      <li class="tx-item" data-id="${t.id}">
        <span class="tx-cat">${catLabel}</span>
        <span class="tx-desc">${t.description || ""}${t.source === "linked" ? ` <em class="tag-linked">${I18N.t("tagLinked")}</em>` : ""}${fixedTag}</span>
        <span class="tx-amount ${amountClass}">${sign} ${LOGIC.formatMoney(t.amount)}</span>
        <button class="icon-btn" data-action="delete-tx" data-id="${t.id}" title="${I18N.t("deleteAria")}" aria-label="${I18N.t("deleteMovementAria")}">🗑️</button>
      </li>`;
  },

  addFormHTML(type) {
    const title = type === "income" ? I18N.t("addIncomeTitle") : I18N.t("addExpenseTitle");
    return `
      <h2>${title}</h2>
      <form id="tx-form" class="form">
        <label>${I18N.t("categoryLabel")}
          <select name="category">${this.categoryOptionsHTML(type)}</select>
        </label>
        <label>${I18N.t("descriptionLabel")}
          <input type="text" name="description" placeholder="${I18N.t("descriptionPlaceholder")}" />
        </label>
        <label>${I18N.t("amountLabel")}
          <input type="number" name="amount" min="0" step="0.01" required placeholder="0.00" />
        </label>
        ${type === "expense" ? `<label>${I18N.t("paymentMethodLabel")}
          <select name="method">${this.methodOptionsHTML("efectivo")}</select>
        </label>
        <label class="toggle-row">
          <input type="checkbox" name="excludeFromDailyGoal" />
          ${I18N.t("excludeFromDailyGoalLabel")}
        </label>` : ""}
        <input type="hidden" name="type" value="${type}" />
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnCancel")}</button>
          <button type="submit" class="btn btn-primary">${I18N.t("btnSave")}</button>
        </div>
      </form>
    `;
  },

  savingFormHTML() {
    return `
      <h2>${I18N.t("savingModalTitle")}</h2>
      <p class="muted-small">${I18N.t("savingModalHint")}</p>
      <form id="saving-form" class="form">
        <label>${I18N.t("savingWhatLabel")}
          <input type="text" name="description" placeholder="${I18N.t("savingWhatPlaceholder")}" required />
        </label>
        <label>${I18N.t("savingAmountLabel")}
          <input type="number" name="amount" min="0" step="0.01" required placeholder="0.00" />
        </label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnCancel")}</button>
          <button type="submit" class="btn btn-primary">${I18N.t("btnSave")}</button>
        </div>
      </form>
    `;
  },

  planFormHTML(forDate, current) {
    return `
      <h2>${I18N.t("planModalTitle", { date: forDate })}</h2>
      <p class="muted-small">${I18N.t("planModalHint")}</p>
      <form id="plan-form" class="form">
        <textarea name="plan" rows="4" placeholder="${I18N.t("planPlaceholder")}">${current || ""}</textarea>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnCancel")}</button>
          <button type="submit" class="btn btn-primary">${I18N.t("savePlanBtn")}</button>
        </div>
      </form>
    `;
  },

  // ================= MOVIMIENTOS =================
  renderMovimientos() {
    const all = STORE.getTransactions().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (a.createdAt < b.createdAt ? 1 : -1)));
    const totalIncome = all.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
    const totalExpense = all.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
    const totalSaving = all.filter((t) => t.type === "saving").reduce((s, t) => s + Number(t.amount), 0);
    const typeLabel = { income: I18N.t("typeIncome"), expense: I18N.t("typeExpense"), saving: I18N.t("typeSaving") };

    return `
      <section class="card">
        <div class="card-head">
          <h1>${I18N.t("movimientosTitle")}</h1>
          <span class="muted">${I18N.t("recordsCount", { n: all.length })}</span>
        </div>

        <form id="quick-row-form" class="sheet-add-row">
          <input type="date" name="date" value="${LOGIC.todayStr()}" required />
          <select name="type" id="qr-type">
            <option value="expense">${I18N.t("typeExpense")}</option>
            <option value="income">${I18N.t("typeIncome")}</option>
          </select>
          <select name="category" id="qr-category">${this.categoryOptionsHTML("expense")}</select>
          <input type="text" name="description" placeholder="${I18N.t("descriptionLabel")}" />
          <select name="method" id="qr-method">${this.methodOptionsHTML("efectivo")}</select>
          <input type="number" name="amount" step="0.01" min="0" placeholder="${I18N.t("amountLabel")}" required />
          <button type="submit" class="btn btn-primary btn-sm">${I18N.t("addRowBtn")}</button>
        </form>

        <div class="table-scroll">
          <table class="sheet-table">
            <thead>
              <tr>
                <th>${I18N.t("colDate")}</th><th>${I18N.t("colType")}</th><th>${I18N.t("colCategory")}</th><th>${I18N.t("colDescription")}</th><th>${I18N.t("colMethod")}</th><th>${I18N.t("colSource")}</th><th>${I18N.t("colAmount")}</th><th></th>
              </tr>
            </thead>
            <tbody>
              ${all.map((t) => `
                <tr data-id="${t.id}">
                  <td>${t.date}</td>
                  <td>${typeLabel[t.type] || t.type}</td>
                  <td>${t.type === "saving" ? I18N.t("savingCatLabel") : this.categoryLabel(t.category)}</td>
                  <td>${t.description || ""}${t.excludeFromDailyGoal ? ` <em class="tag-linked">${I18N.t("tagFixed")}</em>` : ""}</td>
                  <td>${t.method ? this.methodLabel(t.method) : "—"}</td>
                  <td>${t.source === "linked" ? I18N.t("sourceLinked") : t.source === "imported" ? I18N.t("sourceImported") : I18N.t("sourceManual")}</td>
                  <td class="${t.type === "expense" ? "text-expense" : (t.type === "saving" ? "text-saving" : "text-income")}">${t.type === "expense" ? "−" : "+"} ${LOGIC.formatMoney(t.amount)}</td>
                  <td><button class="icon-btn" data-action="delete-tx" data-id="${t.id}" aria-label="${I18N.t("deleteAria")}">🗑️</button></td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="6">${I18N.t("totalsRow")}</td>
                <td class="text-income">+ ${LOGIC.formatMoney(totalIncome)}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="6"></td>
                <td class="text-expense">− ${LOGIC.formatMoney(totalExpense)}</td>
                <td></td>
              </tr>
              ${totalSaving ? `
              <tr>
                <td colspan="6">${I18N.t("savingsRecordedNote")}</td>
                <td class="text-saving">+ ${LOGIC.formatMoney(totalSaving)}</td>
                <td></td>
              </tr>` : ""}
              <tr class="totals-balance">
                <td colspan="6">${I18N.t("balanceLabel")}</td>
                <td>${LOGIC.formatMoney(totalIncome - totalExpense)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        ${!all.length ? `<p class="muted">${I18N.t("noMovementsYet")}</p>` : ""}
      </section>
    `;
  },

  // ================= CUENTAS =================
  renderCuentas() {
    const accounts = STORE.getAccounts();
    const connectedIds = new Set(accounts.map((a) => a.bankId));

    return `
      <section class="card">
        <div class="card-head"><h1>${I18N.t("cuentasTitle")}</h1></div>
        <div class="notice">${I18N.t("cuentasNotice")}</div>

        <h2 class="section-title">${I18N.t("connectedAccountsTitle")}</h2>
        ${accounts.length ? `
          <ul class="account-list">
            ${accounts.map((a) => `
              <li class="account-item">
                <div>
                  <strong>${a.name}</strong>
                  <div class="muted-small">${a.kind}</div>
                </div>
                <div class="account-actions">
                  <button class="btn btn-secondary btn-sm" data-action="simulate-charge" data-id="${a.id}">${I18N.t("simulatePaymentBtn")}</button>
                  <button class="btn btn-ghost btn-sm" data-action="disconnect" data-id="${a.id}">${I18N.t("disconnectBtn")}</button>
                </div>
              </li>`).join("")}
          </ul>
        ` : `<p class="muted">${I18N.t("noAccountsYet")}</p>`}

        <h2 class="section-title">${I18N.t("demoBanksTitle")}</h2>
        <ul class="account-list">
          ${DATA.demoBanks.filter((b) => !connectedIds.has(b.id)).map((b) => `
            <li class="account-item">
              <div>
                <strong>${LOGIC.localized(b.name)}</strong>
                <div class="muted-small">${LOGIC.localized(b.kind)}</div>
              </div>
              <button class="btn btn-primary btn-sm" data-action="connect" data-id="${b.id}">${I18N.t("connectBtn")}</button>
            </li>`).join("")}
        </ul>

        <h2 class="section-title">${I18N.t("csvImportTitle")}</h2>
        <p class="muted-small">${I18N.t("csvImportHint")}</p>
        <label class="btn btn-secondary btn-block" for="csv-import-input">${I18N.t("csvChooseFileBtn")}</label>
        <input type="file" accept=".csv,text/csv" id="csv-import-input" hidden />
      </section>
    `;
  },

  // ================= METAS (perfil, meta, categorías) =================
  renderMetas() {
    const s = STORE.getSettings();
    const custom = STORE.getCustomCategories();
    const goals = STORE.getGoals();

    return `
      <section class="card">
        <div class="card-head"><h1>${I18N.t("metasTitle")}</h1></div>

        <div class="profile-summary">
          <div>
            <strong>${s.userName || I18N.t("noNameYet")}</strong>
            <div class="muted-small">
              ${s.age ? I18N.t("ageYears", { age: s.age }) : ""}${s.occupation || ""}${s.occupation ? " · " : ""}${s.accountMode === "compartida" ? I18N.t("familyAccount") : I18N.t("personalAccount")}
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" data-action="edit-profile">${I18N.t("editProfileBtn")}</button>
        </div>

        ${s.archetypeKey ? (() => {
          const arch = DATA.archetypes.find((a) => a.key === s.archetypeKey);
          if (!arch) return "";
          return `
            <div class="archetype-card">
              <span class="archetype-card-emoji">${arch.emoji}</span>
              <div>
                <p class="archetype-card-kicker">${I18N.t("yourArchetypeKicker")}</p>
                <strong>${LOGIC.localized(arch.label)}</strong>
                <p class="muted-small">${LOGIC.localized(arch.description)}</p>
              </div>
            </div>`;
        })() : ""}

        ${s.incomeExpenseProfileKey ? (() => {
          const profile = LOGIC.computeIncomeExpenseProfile(s);
          return `
            <div class="risk-badge risk-badge--${profile.key}">
              <span class="risk-badge-label">${I18N.t("incomeExpenseProfileLabel2")}</span>
              <strong>${LOGIC.localized(profile.label)}</strong>
              <span class="risk-badge-level">${I18N.t("riskLabel", { risk: LOGIC.localized(profile.risk) })}</span>
              <p>${LOGIC.localized(profile.description)}</p>
            </div>
            ${this.balanceBannerHTML(profile.balance)}`;
        })() : ""}

        <label class="toggle-switch-row">
          <span>${I18N.t("languageLabel")}</span>
        </label>
        ${this.languageSelectorHTML()}

        <label class="toggle-switch-row">
          <span>${I18N.t("accountModeLabel")}</span>
          <span class="toggle-switch" id="account-mode-toggle" data-mode="${s.accountMode}">
            <span class="toggle-opt ${s.accountMode !== "compartida" ? "is-active" : ""}" data-mode="individual">${I18N.t("accountModeIndividualLabel")}</span>
            <span class="toggle-opt ${s.accountMode === "compartida" ? "is-active" : ""}" data-mode="compartida">${I18N.t("accountModeSharedLabel")}</span>
          </span>
        </label>
        <p class="muted-small">${I18N.t("sharedAccountHint")}</p>

        <form id="settings-form" class="form">
          <label>${I18N.t("currencyCountryLabel")}
            <select name="country">${this.countryOptionsHTML(s.country)}</select>
          </label>
          <label>${I18N.t("dailyGoalLabel2")}
            <input type="number" name="dailyGoal" min="0" step="0.01" value="${s.dailyGoal || ""}" placeholder="Ej. 25" required />
          </label>
          <label>${I18N.t("monthlySavingsGoalLabel")}
            <input type="number" name="savingsGoalMonthly" min="0" step="0.01" value="${s.savingsGoalMonthly || ""}" placeholder="Ej. 150" />
          </label>
          <label class="toggle-row">
            <input type="checkbox" name="soundEnabled" ${s.soundEnabled ? "checked" : ""} />
            ${I18N.t("soundAlertLabel")}
          </label>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="test-sound">${I18N.t("testSoundBtn")}</button>
            <button type="submit" class="btn btn-primary">${I18N.t("btnSave")}</button>
          </div>
        </form>

        <h2 class="section-title">${I18N.t("savingsGoalsTitle")}</h2>
        <p class="muted-small">${I18N.t("savingsGoalsHint")}</p>
        ${goals.length ? `
          <ul class="goal-list">
            ${goals.map((g) => {
              const p = LOGIC.goalProgress(g);
              const purpose = DATA.savingsPurposes.find((x) => x.id === g.purpose);
              return `
                <li class="goal-item ${g.achieved ? "is-achieved" : ""}">
                  <div class="goal-item-head">
                    <strong>${purpose ? purpose.icon : "🎯"} ${g.label}</strong>
                    <button class="icon-btn" data-action="remove-goal" data-id="${g.id}" aria-label="${I18N.t("goalDeleteAria")}">🗑️</button>
                  </div>
                  <div class="goal-photo-row">
                    ${g.photo ? `<img src="${g.photo}" class="goal-photo-thumb" alt="" />` : ""}
                    <label class="btn btn-ghost btn-sm" for="goal-photo-input-${g.id}">${g.photo ? I18N.t("changePhotoBtn") : I18N.t("addPhotoBtn")}</label>
                    <input type="file" accept="image/*" id="goal-photo-input-${g.id}" data-action="goal-photo-input" data-id="${g.id}" hidden />
                  </div>
                  ${g.achieved
                    ? `<div class="goal-achieved-row"><span>${I18N.t("goalAchievedLabel")}</span><button class="btn btn-primary btn-sm" data-action="share-goal" data-id="${g.id}">${I18N.t("btnShare")}</button></div>`
                    : `
                      <div class="progress-track"><div class="progress-fill" style="width:${p.pct}%"></div></div>
                      <p class="muted-small">${LOGIC.formatMoney(p.saved)} / ${LOGIC.formatMoney(g.targetAmount)}</p>
                    `}
                </li>`;
            }).join("")}
          </ul>
        ` : ""}
        <form id="goal-form" class="form">
          <label>${I18N.t("goalWhatLabel")}
            <input type="text" name="label" placeholder="${I18N.t("goalWhatPlaceholder")}" required />
          </label>
          <label>${I18N.t("purposeLabel")}
            <select name="purpose">
              ${DATA.savingsPurposes.map((p) => `<option value="${p.id}">${p.icon} ${LOGIC.localized(p.label)}</option>`).join("")}
            </select>
          </label>
          <label>${I18N.t("goalHowMuchLabel")}
            <input type="number" name="targetAmount" min="0" step="0.01" placeholder="Ej. 50" required />
          </label>
          <button type="submit" class="btn btn-secondary btn-block">${I18N.t("addGoalBtn")}</button>
        </form>

        <h2 class="section-title">${I18N.t("inviteTitle")}</h2>
        <p class="muted-small">${I18N.t("inviteHint")}</p>
        <button class="btn btn-secondary btn-block" data-action="invite">${I18N.t("inviteBtn")}</button>

        <h2 class="section-title">${I18N.t("customCategoriesTitle")}</h2>
        <p class="muted-small">${I18N.t("customCategoriesHint")}</p>
        <div class="custom-cat-list">
          ${custom.expense.concat(custom.income).map((c) => `
            <span class="chip">${c.icon} ${c.label} <button class="chip-x" data-action="remove-category" data-type="${custom.expense.includes(c) ? "expense" : "income"}" data-id="${c.id}" aria-label="${I18N.t("removeCategoryAria")}">×</button></span>
          `).join("") || `<p class="muted-small">${I18N.t("noCustomCategoriesYet")}</p>`}
        </div>
        <form id="category-form" class="sheet-add-row category-add-row">
          <select name="type">
            <option value="expense">${I18N.t("typeExpense")}</option>
            <option value="income">${I18N.t("typeIncome")}</option>
          </select>
          <input type="text" name="label" placeholder="${I18N.t("categoryNamePlaceholder")}" required />
          <input type="text" name="icon" placeholder="${I18N.t("emojiOptionalPlaceholder")}" maxlength="2" />
          <button type="submit" class="btn btn-primary btn-sm">${I18N.t("addCategoryBtn")}</button>
        </form>
      </section>
    `;
  },

  // ================= CONSEJOS =================
  budgetSimAmounts(income) {
    const n = Math.max(0, Number(income) || 0);
    return { needs: n * 0.5, wants: n * 0.3, savings: n * 0.2 };
  },

  // Reparte un presupuesto mensual de alimentación en fondo fijo semanal (80%),
  // despensa mensual (15%) y margen de ajuste semanal (5%); y el fondo fijo
  // semanal, a su vez, en 3 bloques de prioridad (básicos/lácteos/opcionales).
  groceryBudgetSplit(monthlyBudget) {
    const n = Math.max(0, Number(monthlyBudget) || 0);
    const weeklyFixed = (n * 0.8) / 4;
    const pantryFund = n * 0.15;
    const weeklyMargin = (n * 0.05) / 4;
    return {
      weeklyFixed, pantryFund, weeklyMargin,
      block1: weeklyFixed * 0.7,
      block2: weeklyFixed * 0.2,
      block3: weeklyFixed * 0.1
    };
  },

  // Sistema de los 6 frascos (T. Harv Eker): reparte el ingreso en 6 cuentas
  // con un propósito fijo cada una. Alternativa con más categorías que el
  // 50/30/20, útil para quien quiere separar también educación y donación.
  sixJarsAmounts(income) {
    const n = Math.max(0, Number(income) || 0);
    return {
      necessities: n * 0.55,
      play: n * 0.10,
      freedom: n * 0.10,
      education: n * 0.10,
      longTerm: n * 0.10,
      give: n * 0.05
    };
  },

  // Reparte el presupuesto total de un viaje entre el promedio diario y un
  // colchón para imprevistos (10-15% del total), a partir del total y los días.
  travelBudgetSplit(totalBudget, days) {
    const total = Math.max(0, Number(totalBudget) || 0);
    const d = Math.max(1, Number(days) || 1);
    return {
      dailyAverage: total / d,
      bufferLow: total * 0.10,
      bufferHigh: total * 0.15
    };
  },

  renderConsejos() {
    const settings = STORE.getSettings();
    const simIncome = settings.monthlyIncome || "";
    const amounts = this.budgetSimAmounts(simIncome);
    const groceryAmounts = this.groceryBudgetSplit("");
    const jarsAmounts = this.sixJarsAmounts(simIncome);
    const travelAmounts = this.travelBudgetSplit("", 1);
    return `
      <section class="card">
        <div class="card-head"><h1>${I18N.t("consejosTitle")}</h1></div>
        <div class="tip-grid">
          ${DATA.tips.map((t) => `
            <div class="tip-card">
              <h3>${LOGIC.localized(t.title)}</h3>
              <p>${LOGIC.localized(t.body)}</p>
            </div>`).join("")}
        </div>

        <h2 class="section-title">${I18N.t("sim502030Title")}</h2>
        <p class="muted-small">${I18N.t("sim502030Hint")}</p>
        <div class="budget-sim">
          <label>${I18N.t("netMonthlyIncomeLabel")}
            <input type="number" id="sim-income" min="0" step="0.01" value="${simIncome}" placeholder="Ej. 2500" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>${I18N.t("row50Needs")}</span>
              <strong id="sim-needs">${LOGIC.formatMoney(amounts.needs)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>${I18N.t("row30Lifestyle")}</span>
              <strong id="sim-wants">${LOGIC.formatMoney(amounts.wants)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>${I18N.t("row20Savings")}</span>
              <strong id="sim-savings">${LOGIC.formatMoney(amounts.savings)}</strong>
            </div>
          </div>
          <ol class="budget-sim-steps">
            <li>${I18N.t("step502030_1")}</li>
            <li>${I18N.t("step502030_2")}</li>
            <li>${I18N.t("step502030_3")}</li>
          </ol>
        </div>

        <h2 class="section-title">${I18N.t("sixJarsTitle")}</h2>
        <p class="muted-small">${I18N.t("sixJarsHint")}</p>
        <div class="budget-sim">
          <label>${I18N.t("netMonthlyIncomeLabel")}
            <input type="number" id="jars-income" min="0" step="0.01" value="${simIncome}" placeholder="Ej. 2500" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>${I18N.t("row55Necessities")}</span>
              <strong id="jars-necessities">${LOGIC.formatMoney(jarsAmounts.necessities)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>${I18N.t("row10PlayLeisure")}</span>
              <strong id="jars-play">${LOGIC.formatMoney(jarsAmounts.play)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>${I18N.t("row10Freedom")}</span>
              <strong id="jars-freedom">${LOGIC.formatMoney(jarsAmounts.freedom)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--needs">
              <span>${I18N.t("row10Education")}</span>
              <strong id="jars-education">${LOGIC.formatMoney(jarsAmounts.education)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>${I18N.t("row10LongTerm")}</span>
              <strong id="jars-longterm">${LOGIC.formatMoney(jarsAmounts.longTerm)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>${I18N.t("row5Give")}</span>
              <strong id="jars-give">${LOGIC.formatMoney(jarsAmounts.give)}</strong>
            </div>
          </div>
          <p class="muted-small" style="margin:2px 0 0">${I18N.t("sixJarsFootnote")}</p>
        </div>

        <h2 class="section-title">${I18N.t("groceryBudgetTitle")}</h2>
        <p class="muted-small">${I18N.t("groceryBudgetHint")}</p>
        <div class="budget-sim">
          <label>${I18N.t("monthlyFoodBudgetLabel")}
            <input type="number" id="grocery-budget-income" min="0" step="0.01" placeholder="Ej. 400" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>${I18N.t("row80WeeklyFixed")}</span>
              <strong id="grocery-weekly">${LOGIC.formatMoney(groceryAmounts.weeklyFixed)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>${I18N.t("row15Pantry")}</span>
              <strong id="grocery-pantry">${LOGIC.formatMoney(groceryAmounts.pantryFund)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>${I18N.t("row5WeeklyMargin")}</span>
              <strong id="grocery-margin">${LOGIC.formatMoney(groceryAmounts.weeklyMargin)}</strong>
            </div>
          </div>
          <p class="muted-small" style="margin:2px 0 0">${I18N.t("weeklyFundByPriority")}</p>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>${I18N.t("block1Label")}</span>
              <strong id="grocery-block1">${LOGIC.formatMoney(groceryAmounts.block1)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>${I18N.t("block2Label")}</span>
              <strong id="grocery-block2">${LOGIC.formatMoney(groceryAmounts.block2)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>${I18N.t("block3Label")}</span>
              <strong id="grocery-block3">${LOGIC.formatMoney(groceryAmounts.block3)}</strong>
            </div>
          </div>
          <ol class="budget-sim-steps">
            <li>${I18N.t("groceryStep1")}</li>
            <li>${I18N.t("groceryStep2")}</li>
            <li>${I18N.t("groceryStep3")}</li>
          </ol>
        </div>

        <h2 class="section-title">${I18N.t("travelBudgetTitle")}</h2>
        <p class="muted-small">${I18N.t("travelBudgetHint")}</p>
        <div class="budget-sim">
          <label>${I18N.t("totalTripBudgetLabel")}
            <input type="number" id="travel-budget-total" min="0" step="0.01" placeholder="Ej. 2000" />
          </label>
          <label>${I18N.t("tripDaysLabel")}
            <input type="number" id="travel-budget-days" min="1" step="1" placeholder="Ej. 10" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>${I18N.t("dailyAvgAvailable")}</span>
              <strong id="travel-daily">${LOGIC.formatMoney(travelAmounts.dailyAverage)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>${I18N.t("row10to15Buffer")}</span>
              <strong id="travel-buffer">${LOGIC.formatMoney(travelAmounts.bufferLow)} - ${LOGIC.formatMoney(travelAmounts.bufferHigh)}</strong>
            </div>
          </div>
          <p class="muted-small" style="margin:2px 0 0">${I18N.t("travelFootnote")}</p>
        </div>

        <h2 class="section-title">${I18N.t("investorRoadmapTitle")}</h2>
        <p class="muted-small">${I18N.t("investorRoadmapHint")}</p>
        <div class="triple-colchon">
          <div class="triple-colchon-row"><span>60-70%</span><small>${I18N.t("lifestyleNoStress")}</small></div>
          <div class="triple-colchon-row"><span>3-6 ${I18N.t("streakDays")}</span><small>${I18N.t("shieldedEmergencyFund")}</small></div>
          <div class="triple-colchon-row"><span>15-25%</span><small>${I18N.t("surplusIntoAssets")}</small></div>
        </div>
        <ol class="roadmap-steps">
          ${DATA.roadmapSteps.map((step, i) => {
            const n = i + 1;
            const isCurrent = settings.incomeExpenseProfileKey && LOGIC.roadmapStepFor(settings.incomeExpenseProfileKey) === n;
            return `
              <li class="roadmap-step ${isCurrent ? "is-current" : ""}">
                <div class="roadmap-step-head">
                  <strong>${n}. ${LOGIC.localized(step.title)}</strong>
                  ${isCurrent ? `<span class="roadmap-step-here">${I18N.t("youAreHere")}</span>` : ""}
                </div>
                <p>${LOGIC.localized(step.body)}</p>
              </li>`;
          }).join("")}
        </ol>
        ${settings.incomeExpenseProfileKey && LOGIC.roadmapStepFor(settings.incomeExpenseProfileKey) === 5 ? `
          <p class="muted-small">${I18N.t("idealLevelNote")}</p>
        ` : ""}

        <h2 class="section-title">${I18N.t("investingOptionsTitle")}</h2>
        <div class="tip-grid">
          ${DATA.investingOptions.map((o) => `
            <div class="tip-card">
              <h3>${LOGIC.localized(o.title)}</h3>
              <p>${LOGIC.localized(o.note)}</p>
            </div>`).join("")}
        </div>
        <p class="muted-small">${I18N.t("investingFootnote")}</p>

        <h2 class="section-title">${I18N.t("booksTitle")}</h2>
        <ul class="resource-list">
          ${DATA.resources.books.map((b) => `<li><strong>${b.title}</strong>${b.author !== "—" ? " — " + b.author : ""}<br><span class="muted-small">${LOGIC.localized(b.note)}</span></li>`).join("")}
        </ul>

        <h2 class="section-title">${I18N.t("talksTitle")}</h2>
        <ul class="resource-list">
          ${DATA.resources.talks.map((t) => `<li><strong>${t.title}</strong> — ${t.author}<br><span class="muted-small">${LOGIC.localized(t.note)}</span></li>`).join("")}
        </ul>

        <h2 class="section-title">${I18N.t("articlesTitle")}</h2>
        <ul class="resource-list">
          ${DATA.resources.articles.map((a) => `<li><a href="${a.url}" target="_blank" rel="noopener noreferrer">${a.title}</a> <span class="muted-small">(${a.source})</span></li>`).join("")}
        </ul>

        ${DATA.resources.videos && DATA.resources.videos.length ? `
          <h2 class="section-title">${I18N.t("videosTitle")}</h2>
          <ul class="resource-list">
            ${DATA.resources.videos.map((v) => `<li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a> <span class="muted-small">(${v.source})</span></li>`).join("")}
          </ul>
        ` : ""}
      </section>
    `;
  },

  // ================= RESUMEN (gráficas + logros) =================
  resumenPeriod: "day",

  renderResumen() {
    const period = this.resumenPeriod;
    const breakdown = LOGIC.periodBreakdown(period, "expense");
    const days = STORE.getDays();
    const dates = Object.keys(days).sort().reverse();
    const streak = LOGIC.currentStreak();
    const best = LOGIC.bestStreak();
    const periodLabel = { day: I18N.t("periodLabelDay"), week: I18N.t("periodLabelWeek"), month: I18N.t("periodLabelMonth") };
    const periodTabLabel = { day: I18N.t("periodDay"), week: I18N.t("periodWeek"), month: I18N.t("periodMonth") };

    return `
      <section class="card">
        <div class="card-head"><h1>${I18N.t("resumenTitle")}</h1></div>

        <div class="period-tabs">
          ${["day", "week", "month"].map((p) => `
            <button class="period-tab ${p === period ? "is-active" : ""}" data-period="${p}">${periodTabLabel[p]}</button>
          `).join("")}
        </div>

        <div class="period-total">
          <span class="muted-small">${I18N.t("spentInPeriod", { period: periodLabel[period] })}</span>
          <strong>${LOGIC.formatMoney(breakdown.total)}</strong>
        </div>

        ${breakdown.top ? `<p class="muted-small">${I18N.t("topSpendingNote", { category: this.categoryLabel(breakdown.top.category), amount: LOGIC.formatMoney(breakdown.top.amount), pct: Math.round(breakdown.top.pct) })}</p>` : ""}

        ${breakdown.items.length ? `
          <div class="bar-chart">
            ${breakdown.items.map((it) => `
              <div class="bar-row">
                <span class="bar-label">${this.categoryLabel(it.category)}</span>
                <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, it.pct)}%"></div></div>
                <span class="bar-value">${LOGIC.formatMoney(it.amount)}</span>
              </div>
            `).join("")}
          </div>
        ` : `<p class="muted">${I18N.t("noExpensesPeriod")}</p>`}

        <h2 class="section-title">${I18N.t("goalsStreakTitle")}</h2>

        ${streak > 0 ? (() => {
          const tier = LOGIC.streakTier(streak);
          const daysInTier = LOGIC.daysInCurrentTier(streak);
          const unit = I18N.t(daysInTier === 1 ? "streakDay" : "streakDays");
          const streakUnit = I18N.t(streak === 1 ? "streakDay" : "streakDays");
          return `
            <div class="tier-banner" style="background:linear-gradient(135deg, ${tier.from}, ${tier.to}); color:${tier.text}">
              <span class="tier-banner-emoji">${tier.emoji}</span>
              <div class="tier-banner-text">
                <strong>${daysInTier} ${unit} ${I18N.t("en_el_nivel", { tier: LOGIC.localized(tier.label) })}</strong>
                <span>${I18N.t("tierBannerTotalStreak", { n: streak, unit: streakUnit })}</span>
              </div>
              <button class="btn btn-sm tier-banner-btn" data-action="share-tier">${I18N.t("btnShare")}</button>
            </div>`;
        })() : ""}

        <div class="streak-row">
          <div class="streak-box"><span class="streak-num">${streak}</span><span class="muted-small">${I18N.t("currentStreakLabel")}</span></div>
          <div class="streak-box"><span class="streak-num">${best}</span><span class="muted-small">${I18N.t("bestStreakLabel")}</span></div>
        </div>

        ${dates.length ? `
          <ul class="days-list">
            ${dates.map((date) => {
              const d = days[date];
              return `
                <li class="day-item ${d.met ? "is-good" : "is-bad"}">
                  <div>
                    <strong>${date}</strong>
                    <div class="muted-small">${LOGIC.formatMoney(d.spent)} / ${LOGIC.formatMoney(d.goal)}</div>
                  </div>
                  ${d.met ? `<button class="btn btn-primary btn-sm" data-action="share-day" data-date="${date}">${I18N.t("btnShare")}</button>` : `<span class="muted-small">${I18N.t("noAchievement")}</span>`}
                </li>`;
            }).join("")}
          </ul>
        ` : `<p class="muted">${I18N.t("noDaysClosedYet")}</p>`}
      </section>
    `;
  },

  // ================= CABLEADO DE EVENTOS POR VISTA =================
  wire(tab) {
    const view = document.getElementById("view");

    const langSelect = view.querySelector("#lang-switcher-select");
    if (langSelect) langSelect.addEventListener("change", () => this.setLanguage(langSelect.value));

    view.querySelectorAll('[data-action="go-metas"]').forEach((b) =>
      b.addEventListener("click", () => UI.render("metas"))
    );

    view.querySelectorAll('[data-action="add"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        UI.openModal(UI.addFormHTML(btn.dataset.type));
        document.getElementById("tx-form").addEventListener("submit", (e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          const tx = {
            type: fd.get("type"),
            category: fd.get("category"),
            description: fd.get("description"),
            amount: parseFloat(fd.get("amount")) || 0,
            method: fd.get("method") || null,
            excludeFromDailyGoal: fd.get("excludeFromDailyGoal") === "on",
            date: LOGIC.todayStr(),
            source: "manual"
          };
          STORE.addTransaction(tx);
          UI.closeModal();
          UI.toast(tx.type === "income" ? I18N.t("toastIncomeAdded") : I18N.t("toastExpenseAdded"));
          UI.render("hoy");
          UI.checkBudgetAlert();
        });
      })
    );

    const addSavingBtn = view.querySelector('[data-action="add-saving"]');
    if (addSavingBtn) {
      addSavingBtn.addEventListener("click", () => {
        UI.openModal(UI.savingFormHTML());
        document.getElementById("saving-form").addEventListener("submit", (e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          STORE.addTransaction({
            type: "saving",
            category: null,
            description: fd.get("description"),
            amount: parseFloat(fd.get("amount")) || 0,
            date: LOGIC.todayStr(),
            source: "manual"
          });
          UI.closeModal();
          UI.toast(I18N.t("toastSavingLogged"));
          UI.render("hoy");
        });
      });
    }

    view.querySelectorAll('[data-action="delete-tx"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        if (confirm(I18N.t("confirmDeleteMovement"))) {
          STORE.deleteTransaction(btn.dataset.id);
          UI.render(UI.currentTab);
        }
      })
    );

    // ---- Planificar mañana / editar plan de hoy ----
    const planTomorrowBtn = view.querySelector('[data-action="plan-tomorrow"]');
    if (planTomorrowBtn) {
      planTomorrowBtn.addEventListener("click", () => {
        const tomorrow = LOGIC.todayStr(1);
        UI.openModal(UI.planFormHTML(I18N.t("wordTomorrow"), STORE.getPlan(tomorrow)));
        document.getElementById("plan-form").addEventListener("submit", (e) => {
          e.preventDefault();
          STORE.setPlan(tomorrow, new FormData(e.target).get("plan"));
          UI.closeModal();
          UI.toast(I18N.t("toastPlanSavedTomorrow"));
        });
      });
    }
    const editPlanBtn = view.querySelector('[data-action="edit-plan"]');
    if (editPlanBtn) {
      editPlanBtn.addEventListener("click", () => {
        const today = LOGIC.todayStr();
        UI.openModal(UI.planFormHTML(I18N.t("wordToday"), STORE.getPlan(today)));
        document.getElementById("plan-form").addEventListener("submit", (e) => {
          e.preventDefault();
          STORE.setPlan(today, new FormData(e.target).get("plan"));
          UI.closeModal();
          UI.render("hoy");
        });
      });
    }

    const closeDayBtn = view.querySelector('[data-action="close-day"]');
    if (closeDayBtn) {
      closeDayBtn.addEventListener("click", () => {
        const record = LOGIC.closeDay(LOGIC.todayStr());
        if (!record) return;
        const tomorrow = LOGIC.todayStr(1);
        const existingPlan = STORE.getPlan(tomorrow);
        let resultHTML;
        let dataURL = null;
        const text = I18N.t("shareStreakText", { n: LOGIC.currentStreak() });

        if (record.met) {
          AUDIO.playSuccess();
          UI.confettiBurst();
          const settings = STORE.getSettings();
          dataURL = SHARE.buildCardDataURL({
            date: record.date, goal: record.goal, spent: record.spent,
            streak: LOGIC.currentStreak(), userName: settings.userName
          });
          resultHTML = `
            <h2>${I18N.t("goalMetTitle")}</h2>
            <img src="${dataURL}" alt="${I18N.t("achievementCardAlt")}" class="achievement-preview" />
            <button type="button" class="btn btn-primary btn-block" id="share-btn">${I18N.t("btnShare")}</button>`;
        } else {
          resultHTML = `
            <h2>${I18N.t("dayClosedTitle")}</h2>
            <p>${I18N.t("dayClosedOverBody")}</p>`;
        }

        UI.openModal(`
          ${resultHTML}
          <hr class="modal-divider" />
          <h3>${I18N.t("planTomorrowTitle")}</h3>
          <form id="plan-form">
            <textarea name="plan" rows="3" placeholder="${I18N.t("planExamplePlaceholder")}">${existingPlan}</textarea>
            <div class="modal-actions">
              <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnClose")}</button>
              <button type="submit" class="btn btn-primary">${I18N.t("savePlanBtn")}</button>
            </div>
          </form>
        `);

        if (dataURL) {
          document.getElementById("share-btn").addEventListener("click", async () => {
            const result = await SHARE.shareCard(dataURL, text);
            if (result === "downloaded") UI.toast(I18N.t("imageDownloadedToast"));
          });
        }
        document.getElementById("plan-form").addEventListener("submit", (e) => {
          e.preventDefault();
          STORE.setPlan(tomorrow, new FormData(e.target).get("plan"));
          UI.closeModal();
          UI.toast(I18N.t("toastPlanSavedTomorrow"));
          UI.render("hoy");
        });

        UI.render("hoy");

        // El cierre de día puede hacer que una meta con propósito también
        // se cumpla; se avisa con un toast para no chocar con este modal.
        LOGIC.checkGoalsAchieved().forEach((g) => {
          UI.toast(I18N.t("toastGoalAchieved", { label: g.label }));
        });
      });
    }

    // ---- Movimientos: alta rápida tipo hoja de cálculo ----
    const qrType = view.querySelector("#qr-type");
    if (qrType) {
      qrType.addEventListener("change", () => {
        document.getElementById("qr-category").innerHTML = UI.categoryOptionsHTML(qrType.value);
      });
    }
    const quickRowForm = view.querySelector("#quick-row-form");
    if (quickRowForm) {
      quickRowForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        STORE.addTransaction({
          date: fd.get("date"),
          type: fd.get("type"),
          category: fd.get("category"),
          description: fd.get("description"),
          method: fd.get("type") === "expense" ? fd.get("method") : null,
          amount: parseFloat(fd.get("amount")) || 0,
          source: "manual"
        });
        UI.toast(I18N.t("toastRowAdded"));
        UI.render("movimientos");
        UI.checkBudgetAlert();
      });
    }

    // ---- Cuentas ----
    view.querySelectorAll('[data-action="connect"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const bank = DATA.demoBanks.find((b) => b.id === btn.dataset.id);
        STORE.addAccount({ bankId: bank.id, name: LOGIC.localized(bank.name), kind: LOGIC.localized(bank.kind) });
        UI.toast(I18N.t("toastAccountConnected"));
        UI.render("cuentas");
      })
    );
    view.querySelectorAll('[data-action="disconnect"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        STORE.removeAccount(btn.dataset.id);
        UI.render("cuentas");
      })
    );
    view.querySelectorAll('[data-action="simulate-charge"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const tx = LOGIC.simulateLinkedExpense(btn.dataset.id);
        UI.toast(I18N.t("toastSimulatedPayment", { desc: tx.description, amount: LOGIC.formatMoney(tx.amount) }));
        UI.render("cuentas");
        UI.checkBudgetAlert();
      })
    );

    // ---- Cuentas: importar movimientos desde CSV ----
    const csvInput = view.querySelector("#csv-import-input");
    if (csvInput) {
      csvInput.addEventListener("change", () => {
        const file = csvInput.files && csvInput.files[0];
        csvInput.value = "";
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const result = LOGIC.parseBankCSV(String(reader.result || ""));
          if (!result.rows.length) {
            UI.toast(I18N.t("toastCsvUnreadable"), "warn");
            return;
          }
          UI.openCSVImportPreview(result);
        };
        reader.onerror = () => UI.toast(I18N.t("toastCsvFileError"), "warn");
        reader.readAsText(file);
      });
    }

    // ---- Metas: perfil, cuenta, guardado, categorías ----
    const editProfileBtn = view.querySelector('[data-action="edit-profile"]');
    if (editProfileBtn) {
      editProfileBtn.addEventListener("click", () => {
        const s = STORE.getSettings();
        UI.startOnboarding(s, true);
      });
    }
    const modeToggle = view.querySelector("#account-mode-toggle");
    if (modeToggle) {
      modeToggle.querySelectorAll(".toggle-opt").forEach((opt) =>
        opt.addEventListener("click", () => {
          const settings = STORE.getSettings();
          settings.accountMode = opt.dataset.mode;
          STORE.saveSettings(settings);
          UI.render("metas");
        })
      );
    }
    const settingsForm = view.querySelector("#settings-form");
    if (settingsForm) {
      settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const country = DATA.countries.find((c) => c.code === fd.get("country"));
        const settings = STORE.getSettings();
        STORE.saveSettings(Object.assign({}, settings, {
          country: fd.get("country"),
          currency: country ? country.currency : settings.currency,
          dailyGoal: parseFloat(fd.get("dailyGoal")) || null,
          savingsGoalMonthly: parseFloat(fd.get("savingsGoalMonthly")) || null,
          soundEnabled: fd.get("soundEnabled") === "on"
        }));
        UI.toast(I18N.t("toastGoalsSaved"));
        UI.render("hoy");
      });
      const testSound = view.querySelector("#test-sound");
      testSound.addEventListener("click", () => AUDIO.playAlert());
    }
    const categoryForm = view.querySelector("#category-form");
    if (categoryForm) {
      categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        STORE.addCustomCategory(fd.get("type"), fd.get("label"), fd.get("icon"));
        UI.toast(I18N.t("toastCategoryAdded"));
        UI.render("metas");
      });
    }
    view.querySelectorAll('[data-action="remove-category"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        STORE.removeCustomCategory(btn.dataset.type, btn.dataset.id);
        UI.render("metas");
      })
    );

    // ---- Metas de ahorro por propósito ----
    const goalForm = view.querySelector("#goal-form");
    if (goalForm) {
      goalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        STORE.addGoal({
          label: fd.get("label"),
          purpose: fd.get("purpose"),
          targetAmount: parseFloat(fd.get("targetAmount")) || 0
        });
        UI.toast(I18N.t("toastGoalAdded"));
        UI.render("metas");
      });
    }
    view.querySelectorAll('[data-action="remove-goal"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        if (confirm(I18N.t("confirmDeleteGoal"))) {
          STORE.removeGoal(btn.dataset.id);
          UI.render("metas");
        }
      })
    );
    view.querySelectorAll('[data-action="goal-photo-input"]').forEach((input) =>
      input.addEventListener("change", async () => {
        const file = input.files && input.files[0];
        if (!file) return;
        try {
          const dataURL = await SHARE.resizeImageFile(file, 1000, 0.85);
          STORE.setGoalPhoto(input.dataset.id, dataURL);
          UI.toast(I18N.t("toastPhotoAdded"));
          UI.render("metas");
        } catch (e) {
          UI.toast(I18N.t("toastPhotoError"));
        }
      })
    );
    view.querySelectorAll('[data-action="share-goal"]').forEach((btn) =>
      btn.addEventListener("click", async () => {
        const goal = STORE.getGoals().find((g) => g.id === btn.dataset.id);
        if (!goal) return;
        const settings = STORE.getSettings();
        const dataURL = await SHARE.buildGoalCardDataURL({ goal, userName: settings.userName });
        const text = I18N.t("shareGoalText", { label: goal.label });
        SHARE.shareCard(dataURL, text).then((result) => {
          if (result === "downloaded") UI.toast(I18N.t("imageDownloadedToast"));
        });
      })
    );

    // ---- Consejos: simulador 50/30/20 ----
    const simIncomeInput = view.querySelector("#sim-income");
    if (simIncomeInput) {
      simIncomeInput.addEventListener("input", () => {
        const amounts = UI.budgetSimAmounts(simIncomeInput.value);
        document.getElementById("sim-needs").textContent = LOGIC.formatMoney(amounts.needs);
        document.getElementById("sim-wants").textContent = LOGIC.formatMoney(amounts.wants);
        document.getElementById("sim-savings").textContent = LOGIC.formatMoney(amounts.savings);
      });
    }

    // ---- Consejos: sistema de los 6 frascos ----
    const jarsIncomeInput = view.querySelector("#jars-income");
    if (jarsIncomeInput) {
      jarsIncomeInput.addEventListener("input", () => {
        const amounts = UI.sixJarsAmounts(jarsIncomeInput.value);
        document.getElementById("jars-necessities").textContent = LOGIC.formatMoney(amounts.necessities);
        document.getElementById("jars-play").textContent = LOGIC.formatMoney(amounts.play);
        document.getElementById("jars-freedom").textContent = LOGIC.formatMoney(amounts.freedom);
        document.getElementById("jars-education").textContent = LOGIC.formatMoney(amounts.education);
        document.getElementById("jars-longterm").textContent = LOGIC.formatMoney(amounts.longTerm);
        document.getElementById("jars-give").textContent = LOGIC.formatMoney(amounts.give);
      });
    }

    // ---- Consejos: presupuesto de la compra por bloques ----
    const groceryBudgetInput = view.querySelector("#grocery-budget-income");
    if (groceryBudgetInput) {
      groceryBudgetInput.addEventListener("input", () => {
        const amounts = UI.groceryBudgetSplit(groceryBudgetInput.value);
        document.getElementById("grocery-weekly").textContent = LOGIC.formatMoney(amounts.weeklyFixed);
        document.getElementById("grocery-pantry").textContent = LOGIC.formatMoney(amounts.pantryFund);
        document.getElementById("grocery-margin").textContent = LOGIC.formatMoney(amounts.weeklyMargin);
        document.getElementById("grocery-block1").textContent = LOGIC.formatMoney(amounts.block1);
        document.getElementById("grocery-block2").textContent = LOGIC.formatMoney(amounts.block2);
        document.getElementById("grocery-block3").textContent = LOGIC.formatMoney(amounts.block3);
      });
    }

    // ---- Consejos: presupuesto de viaje ----
    const travelTotalInput = view.querySelector("#travel-budget-total");
    const travelDaysInput = view.querySelector("#travel-budget-days");
    if (travelTotalInput && travelDaysInput) {
      const updateTravel = () => {
        const amounts = UI.travelBudgetSplit(travelTotalInput.value, travelDaysInput.value || 1);
        document.getElementById("travel-daily").textContent = LOGIC.formatMoney(amounts.dailyAverage);
        document.getElementById("travel-buffer").textContent = LOGIC.formatMoney(amounts.bufferLow) + " - " + LOGIC.formatMoney(amounts.bufferHigh);
      };
      travelTotalInput.addEventListener("input", updateTravel);
      travelDaysInput.addEventListener("input", updateTravel);
    }

    // ---- Resumen ----
    view.querySelectorAll(".period-tab").forEach((btn) =>
      btn.addEventListener("click", () => {
        UI.resumenPeriod = btn.dataset.period;
        UI.render("resumen");
      })
    );
    view.querySelectorAll('[data-action="share-day"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const date = btn.dataset.date;
        const d = STORE.getDays()[date];
        const settings = STORE.getSettings();
        const dataURL = SHARE.buildCardDataURL({
          date: d.date, goal: d.goal, spent: d.spent, streak: LOGIC.currentStreak(), userName: settings.userName
        });
        SHARE.shareCard(dataURL, I18N.t("shareTierText")).then((result) => {
          if (result === "downloaded") UI.toast(I18N.t("imageDownloadedToast"));
        });
      })
    );

    const shareTierBtn = view.querySelector('[data-action="share-tier"]');
    if (shareTierBtn) {
      shareTierBtn.addEventListener("click", async () => {
        const settings = STORE.getSettings();
        const streak = LOGIC.currentStreak();
        const dataURL = await SHARE.buildTierCardDataURL({ streak, userName: settings.userName });
        const text = SHARE.inviteText(streak);
        SHARE.shareCard(dataURL, text).then((result) => {
          if (result === "downloaded") UI.toast(I18N.t("imageDownloadedToast"));
        });
      });
    }

    const inviteBtn = view.querySelector('[data-action="invite"]');
    if (inviteBtn) {
      inviteBtn.addEventListener("click", () => {
        const streak = LOGIC.currentStreak();
        SHARE.shareText(SHARE.inviteText(streak)).then((result) => {
          if (result === "copied") UI.toast(I18N.t("toastMessageCopied"));
        });
      });
    }
  }
};
