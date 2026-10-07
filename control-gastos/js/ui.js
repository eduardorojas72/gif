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
      const subs = LOGIC.detectSubscriptions();
      if (subs.items.length) UI.toast("🔁 " + I18N.t("subsSummary", { n: subs.items.length, amount: LOGIC.formatMoney(subs.total) }));
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
    this.updateFab();
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
    accountMode: 1, userName: 2, age: 3, country: 4, monthlyBudget: 5,
    desiredIncome: 6, occupation: 7, workHours: 8, workGoal: 9,
    obstacles: 10, diagnosis: 10, archetype: 11, summary: 12
  },
  TOTAL_STEPS: 12,

  nextStep(step, data) {
    const flow = {
      accountMode: "userName",
      userName: "age",
      age: "country",
      country: "monthlyBudget",
      monthlyBudget: "desiredIncome",
      desiredIncome: "occupation",
      occupation: "workHours",
      workHours: "workGoal",
      workGoal: "obstacles",
      obstacles: "diagnosis",
      diagnosis: "archetype",
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
      data: Object.assign({ obstacles: [] }, prefill || {})
    };
    document.getElementById("tabbar").hidden = true;
    document.getElementById("status-pill").hidden = true;
    document.getElementById("fab-add").hidden = true;
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
      otherIncome: d.otherIncome || 0,
      occupation: d.occupation || "",
      obstacles: d.obstacles || [],
      dailyGoal: d.dailyGoal || STORE.getSettings().dailyGoal,
      desiredIncome: d.desiredIncome || null,
      hoursPerDay: d.hoursPerDay || null,
      overtimeHours: d.overtimeHours || null,
      multipleJobs: !!d.multipleJobs,
      commuteMinutes: d.commuteMinutes || null,
      workGoal: d.workGoal || "",
      expensesSnapshot: d.expensesSnapshot || {},
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
      // Ingresos y gastos del mes en una sola pantalla, con el saldo que
      // va quedando calculado en vivo mientras se escribe.
      monthlyBudget: () => {
        const other = Number(d.otherIncome) || 0;
        const salary = d.monthlyIncome ? Math.max(0, Number(d.monthlyIncome) - other) : "";
        return `
        ${progress}
        <h1>${I18N.t("onbBudgetTitle")}</h1>
        <p class="muted-small">${I18N.t("onbBudgetHint")}</p>
        <form class="form ob-form" data-next id="ob-budget-form">
          <h3 class="ob-subtitle">${I18N.t("onbIncomeSection")}</h3>
          <label>${I18N.t("onbSalaryLabel")}
            <input type="number" name="salary" min="0" step="0.01" value="${salary || ""}" placeholder="Ej. 1500" inputmode="decimal" required />
          </label>
          <label>${I18N.t("onbOtherIncomeLabel")}
            <input type="number" name="otherIncome" min="0" step="0.01" value="${other || ""}" placeholder="Ej. 0" inputmode="decimal" />
          </label>
          <h3 class="ob-subtitle">${I18N.t("onbExpensesSection")}</h3>
          ${DATA.expenseSnapshotCategories.map((c) => `
            <label>${c.icon} ${LOGIC.localized(c.label)}
              <input type="number" name="expense_${c.id}" min="0" step="0.01" value="${(d.expensesSnapshot && d.expensesSnapshot[c.id]) || ""}" placeholder="0.00" inputmode="decimal" />
            </label>
          `).join("")}
          <div id="ob-budget-balance"></div>
          ${this.obNavHTML()}
        </form>`;
      },
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
        // Lo que queda del ingreso tras los gastos fijos, repartido por día.
        const suggested = d.monthlyIncome
          ? Math.max(0, (d.monthlyIncome - fixedMonthly) / daysInMonth)
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

  readBudgetForm(form) {
    const fd = new FormData(form);
    const num = (key) => parseFloat(fd.get(key)) || 0;
    const expenses = {};
    DATA.expenseSnapshotCategories.forEach((c) => { expenses[c.id] = num("expense_" + c.id); });
    return { income: num("salary") + num("otherIncome"), otherIncome: num("otherIncome"), expenses };
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
    view.querySelectorAll(".ob-choice[data-workgoal]").forEach((btn) =>
      btn.addEventListener("click", () => this.onboardNext({ workGoal: btn.dataset.workgoal }))
    );

    const continueBtn = view.querySelector("#ob-continue");
    if (continueBtn) continueBtn.addEventListener("click", () => this.onboardNext({}));

    const budgetForm = view.querySelector("#ob-budget-form");
    if (budgetForm) {
      const balanceSlot = budgetForm.querySelector("#ob-budget-balance");
      const updateBalance = () => {
        const { income, expenses } = this.readBudgetForm(budgetForm);
        balanceSlot.innerHTML = this.balanceBannerHTML(income - Object.values(expenses).reduce((a, b) => a + b, 0));
      };
      updateBalance();
      budgetForm.addEventListener("input", updateBalance);
    }

    const form = view.querySelector("form[data-next]");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const patch = {};
        const numericFields = new Set([
          "age", "monthlyIncome", "dailyGoal",
          "desiredIncome", "hoursPerDay", "overtimeHours", "commuteMinutes"
        ]);
        if (step === "obstacles") {
          patch.obstacles = fd.getAll("obstacles");
        } else if (step === "monthlyBudget") {
          const { income, otherIncome, expenses } = this.readBudgetForm(form);
          patch.monthlyIncome = income;
          patch.otherIncome = otherIncome;
          patch.expensesSnapshot = expenses;
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
    const ants = LOGIC.antSummary(today, today);
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

        ${this.antTodayBlockHTML(ants)}

        <div class="quick-actions">
          <button class="btn btn-expense" data-action="add" data-type="expense" ${dayClosed ? "disabled" : ""}>${I18N.t("addExpenseBtn")}</button>
          <button class="btn btn-income" data-action="add" data-type="income" ${dayClosed ? "disabled" : ""}>${I18N.t("addIncomeBtn")}</button>
        </div>
        <button class="btn btn-ant btn-block" data-action="add-ant" ${dayClosed ? "disabled" : ""}>${I18N.t("addAntBtn")}</button>

        ${income ? `<p class="muted-small">${I18N.t("todayIncomeNote", { amount: "<strong>" + LOGIC.formatMoney(income) + "</strong>" })}</p>` : ""}

        ${dayClosed
          ? `<div class="day-closed-banner ${dayClosed.met ? "is-good" : "is-bad"}">
               ${dayClosed.met ? I18N.t("dayClosedGood") : I18N.t("dayClosedBad")}
             </div>`
          : `<div class="hoy-close-actions">
               <button class="btn btn-secondary btn-block" data-action="close-day">${I18N.t("closeDayBtn")}</button>
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
    const catLabel = t.type === "saving" ? I18N.t("savingCatLabel") : (t.antConcept ? LOGIC.antConceptLabel(t.antConcept) : this.categoryLabel(t.category));
    const fixedTag = t.excludeFromDailyGoal ? ` <em class="tag-linked">${I18N.t("tagFixed")}</em>` : "";
    const antTag = t.antConcept
      ? ` <em class="tag-ant">🐜${t.antNeeded === true ? " ✅" : t.antNeeded === false ? " ❌" : ""}</em>`
      : "";
    return `
      <li class="tx-item" data-id="${t.id}">
        <span class="tx-cat">${catLabel}</span>
        <span class="tx-desc">${t.description || ""}${t.source === "linked" ? ` <em class="tag-linked">${I18N.t("tagLinked")}</em>` : ""}${fixedTag}${antTag}</span>
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
        ${type === "expense" ? `<label>${I18N.t("antSelectLabel")}
          <select name="antConcept">
            <option value="">${I18N.t("antSelectNone")}</option>
            ${this.antConceptOptionsHTML()}
          </select>
        </label>
        <label>${I18N.t("paymentMethodLabel")}
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

  // ---------- Gastos hormiga ----------
  antConceptOptionsHTML(selected) {
    return DATA.antConcepts
      .map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.icon} ${LOGIC.localized(c.label)}</option>`)
      .join("");
  },

  antChipsHTML(items) {
    return `<div class="ant-chips">${items.map((it) => `
      <span class="ant-chip">${LOGIC.antConceptLabel(it.concept)} <strong>${LOGIC.formatMoney(it.amount)}</strong>${it.count > 1 ? ` <span class="muted-small">×${it.count}</span>` : ""}</span>
    `).join("")}</div>`;
  },

  antTodayBlockHTML(ants) {
    const weekStart = LOGIC.weekStartOf();
    const weekGoal = LOGIC.weekGoalProgress(weekStart);
    const lastWeekStart = LOGIC.weekStartOf(null, -1);
    const lastWeek = LOGIC.antSummary(lastWeekStart, LOGIC.weekEndOf(lastWeekStart));
    const avoidLabels = weekGoal ? weekGoal.avoid.map((id) => LOGIC.antConceptLabel(id)).join(" · ") : "";
    return `
      <div class="goal-block ant-block">
        <div class="goal-row">
          <span>${I18N.t("antTodayTitle")}</span>
          <strong>${LOGIC.formatMoney(ants.total)}</strong>
        </div>
        ${ants.count ? this.antChipsHTML(ants.items) : `<p class="muted-small">${I18N.t("antTodayNone")}</p>`}
        ${weekGoal ? `
          <div class="ant-goal-note ${weekGoal.slips ? "is-slip" : ""}">
            <strong>${I18N.t("antWeekGoalShort")}</strong> ${avoidLabels}
            <div class="muted-small">${weekGoal.slips
              ? I18N.t("antWeekGoalSlips", { n: weekGoal.slips, amount: LOGIC.formatMoney(weekGoal.slipAmount) })
              : I18N.t("antWeekGoalClean")}</div>
          </div>` : (lastWeek.count ? `
          <button class="btn btn-ghost btn-block" data-action="go-resumen">${I18N.t("antSetWeekGoalPrompt", { amount: LOGIC.formatMoney(lastWeek.total) })}</button>` : "")}
      </div>`;
  },

  antFormHTML() {
    return `
      <h2>${I18N.t("antModalTitle")}</h2>
      <p class="muted-small">${I18N.t("antModalHint")}</p>
      <form id="ant-form" class="form">
        <div class="ant-concept-grid">
          ${DATA.antConcepts.map((c, i) => `
            <label class="ant-concept">
              <input type="radio" name="antConcept" value="${c.id}" ${i === 0 ? "checked" : ""} />
              <span>${c.icon} ${LOGIC.localized(c.label)}</span>
            </label>
          `).join("")}
        </div>
        <label>${I18N.t("amountLabel")}
          <input type="number" name="amount" min="0" step="0.01" required placeholder="0.00" inputmode="decimal" />
        </label>
        <label>${I18N.t("descriptionLabel")}
          <input type="text" name="description" placeholder="${I18N.t("antDescriptionPlaceholder")}" />
        </label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnCancel")}</button>
          <button type="submit" class="btn btn-primary">${I18N.t("btnSave")}</button>
        </div>
      </form>
    `;
  },

  // Guarda un gasto de hoy y refresca la vista actual.
  saveExpenseToday(tx, toastKey) {
    STORE.addTransaction(Object.assign({ type: "expense", method: null, excludeFromDailyGoal: false, date: LOGIC.todayStr(), source: "manual" }, tx));
    UI.closeModal();
    UI.toast(I18N.t(toastKey || "toastExpenseAdded"));
    UI.render(UI.currentTab);
    UI.checkBudgetAlert();
  },

  openAddForm(type) {
    UI.openModal(UI.addFormHTML(type));
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
      if (fd.get("antConcept")) tx.antConcept = fd.get("antConcept");
      STORE.addTransaction(tx);
      UI.closeModal();
      UI.toast(tx.type === "income" ? I18N.t("toastIncomeAdded") : I18N.t("toastExpenseAdded"));
      UI.render(UI.currentTab);
      UI.checkBudgetAlert();
    });
  },

  openAntForm() {
    UI.openModal(UI.antFormHTML());
    document.getElementById("ant-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const concept = LOGIC.antConcept(fd.get("antConcept"));
      UI.saveExpenseToday({
        category: concept.category,
        antConcept: concept.id,
        description: fd.get("description") || "",
        amount: parseFloat(fd.get("amount")) || 0
      }, "toastAntAdded");
    });
  },

  // ---------- Botón "+": gasto en 2 toques ----------
  // Toque 1: elegir el atajo. Toque 2: guardar (el importe viene ya puesto
  // con el último usado para ese atajo).
  openQuickAdd() {
    const quickAmounts = STORE.getSettings().quickAmounts || {};
    UI.openModal(`
      <h2>${I18N.t("quickAddTitle")}</h2>
      <div class="quick-grid">
        ${DATA.quickShortcuts.map((q) => `
          <button type="button" class="quick-btn" data-quick="${q.id}">
            <span class="quick-icon">${q.icon}</span>
            <span>${LOGIC.localized(q.label)}</span>
            ${quickAmounts[q.id] ? `<span class="muted-small">${LOGIC.formatMoney(quickAmounts[q.id])}</span>` : ""}
          </button>`).join("")}
        <button type="button" class="quick-btn" data-quick-open="ant"><span class="quick-icon">🐜</span><span>${I18N.t("quickAntLabel")}</span></button>
        <button type="button" class="quick-btn" data-quick-open="other"><span class="quick-icon">✏️</span><span>${I18N.t("quickOtherLabel")}</span></button>
      </div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close-modal>${I18N.t("btnCancel")}</button></div>
    `);
    document.querySelector('[data-quick-open="ant"]').addEventListener("click", () => UI.openAntForm());
    document.querySelector('[data-quick-open="other"]').addEventListener("click", () => UI.openAddForm("expense"));
    document.querySelectorAll("[data-quick]").forEach((btn) =>
      btn.addEventListener("click", () => UI.openQuickAmount(DATA.quickShortcuts.find((q) => q.id === btn.dataset.quick)))
    );
  },

  openQuickAmount(q) {
    const last = (STORE.getSettings().quickAmounts || {})[q.id];
    UI.openModal(`
      <h2>${q.icon} ${LOGIC.localized(q.label)}</h2>
      <form id="quick-form" class="form">
        <label>${I18N.t("amountLabel")}
          <input type="number" name="amount" min="0.01" step="0.01" required placeholder="0.00" inputmode="decimal" value="${last || ""}" />
        </label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" id="quick-back">${I18N.t("btnBack")}</button>
          <button type="submit" class="btn btn-primary">${I18N.t("btnSave")}</button>
        </div>
      </form>
    `);
    const input = document.querySelector("#quick-form [name=amount]");
    if (!last) input.focus();
    document.getElementById("quick-back").addEventListener("click", () => UI.openQuickAdd());
    document.getElementById("quick-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const amount = parseFloat(input.value) || 0;
      const settings = STORE.getSettings();
      settings.quickAmounts = Object.assign({}, settings.quickAmounts, { [q.id]: amount });
      STORE.saveSettings(settings);
      const tx = { category: q.category, description: LOGIC.localized(q.label), amount };
      if (q.antConcept) tx.antConcept = q.antConcept;
      UI.saveExpenseToday(tx, q.antConcept ? "toastAntAdded" : "toastExpenseAdded");
    });
  },

  // Muestra el botón "+" solo cuando se puede apuntar un gasto de hoy.
  updateFab() {
    const fab = document.getElementById("fab-add");
    if (!fab) return;
    const closed = !!STORE.getDays()[LOGIC.todayStr()];
    fab.hidden = !!this.onboard || closed;
    fab.setAttribute("aria-label", I18N.t("quickAddTitle"));
  },

  // ---------- Recordatorio diario (evento repetido en el calendario) ----------
  // Una web sin servidor no puede enviar avisos a una hora fija con la app
  // cerrada; el calendario del móvil sí, así que se genera un evento diario.
  reminderICS(time) {
    const [hh, mm] = (time || "21:00").split(":");
    const d = new Date();
    const date = LOGIC.ymd(d).replace(/-/g, "");
    const stamp = d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const url = location.origin + location.pathname;
    const title = I18N.t("reminderEventTitle");
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Hucha//Recordatorio//ES", "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:hucha-recordatorio-" + Date.now() + "@hucha",
      "DTSTAMP:" + stamp,
      "DTSTART:" + date + "T" + hh.padStart(2, "0") + mm.padStart(2, "0") + "00",
      "DURATION:PT5M",
      "RRULE:FREQ=DAILY",
      "SUMMARY:" + title,
      "DESCRIPTION:" + I18N.t("reminderEventBody") + " " + url,
      "URL:" + url,
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + title, "TRIGGER:PT0M", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
  },

  downloadFile(name, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  // Revisión de fin de día: por cada gasto hormiga, "lo necesitaba" o "no lo
  // necesitaba". Llama a onDone cuando el usuario termina.
  openAntReview(date, onDone) {
    const txs = LOGIC.antTransactionsInRange(date, date).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    const render = () => {
      const current = LOGIC.antTransactionsInRange(date, date);
      const byId = Object.fromEntries(current.map((t) => [t.id, t]));
      const pending = txs.filter((t) => byId[t.id] && byId[t.id].antNeeded == null).length;
      UI.openModal(`
        <h2>${I18N.t("antReviewTitle")}</h2>
        <p class="muted-small">${I18N.t("antReviewHint")}</p>
        <ul class="ant-review-list">
          ${txs.map((t) => {
            const v = byId[t.id] ? byId[t.id].antNeeded : null;
            return `
              <li class="ant-review-item">
                <div class="ant-review-head">
                  <span>${LOGIC.antConceptLabel(t.antConcept)}${t.description && t.description !== LOGIC.localized(LOGIC.antConcept(t.antConcept).label) ? ` <span class="muted-small">· ${t.description}</span>` : ""}</span>
                  <strong>${LOGIC.formatMoney(t.amount)}</strong>
                </div>
                <div class="ant-review-actions">
                  <button type="button" class="btn btn-sm ant-yes ${v === true ? "is-on" : ""}" data-review="${t.id}" data-needed="true">${I18N.t("antNeededYes")}</button>
                  <button type="button" class="btn btn-sm ant-no ${v === false ? "is-on" : ""}" data-review="${t.id}" data-needed="false">${I18N.t("antNeededNo")}</button>
                </div>
              </li>`;
          }).join("")}
        </ul>
        <div class="modal-actions">
          <button type="button" class="btn btn-primary" id="ant-review-done">${pending ? I18N.t("antReviewPending", { n: pending }) : I18N.t("btnContinue")}</button>
        </div>
      `);
      document.querySelectorAll("[data-review]").forEach((btn) =>
        btn.addEventListener("click", () => {
          STORE.updateTransaction(btn.dataset.review, { antNeeded: btn.dataset.needed === "true" });
          render();
        })
      );
      document.getElementById("ant-review-done").addEventListener("click", () => onDone());
    };
    render();
  },

  // Bloque de resumen hormiga que encabeza el modal de cierre del día.
  antDaySummaryHTML(date) {
    const ants = LOGIC.antSummary(date, date);
    if (!ants.count) {
      return `<div class="ant-day-summary is-clean"><strong>${I18N.t("antDayCleanTitle")}</strong><p>${I18N.t("antDayCleanBody")}</p></div>`;
    }
    return `
      <div class="ant-day-summary">
        <strong>${I18N.t("antDaySummaryTitle", { amount: LOGIC.formatMoney(ants.total), n: ants.count })}</strong>
        ${this.antChipsHTML(ants.items)}
        <p class="muted-small">${ants.notNeeded > 0
          ? I18N.t("antDayNotNeeded", { amount: LOGIC.formatMoney(ants.notNeeded) })
          : I18N.t("antDayAllNeeded")}</p>
      </div>`;
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

  // Cierra el día (si hay meta diaria), muestra el resumen de gastos hormiga
  // y ofrece planificar mañana.
  finishCloseDay(date) {
    const record = LOGIC.closeDay(date);
    const hadAnts = LOGIC.antTransactionsInRange(date, date).length > 0;
    const tomorrow = LOGIC.todayStr(1);
    const existingPlan = STORE.getPlan(tomorrow);
    let resultHTML;
    let dataURL = null;
    const text = I18N.t("shareStreakText", { n: LOGIC.currentStreak() });

    if (record && record.met) {
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
    } else if (record) {
      resultHTML = `
        <h2>${I18N.t("dayClosedTitle")}</h2>
        <p>${I18N.t("dayClosedOverBody")}</p>`;
    } else {
      resultHTML = `<h2>${I18N.t("dayClosedTitle")}</h2>`;
    }
    // Sin gastos hormiga en el día también se celebra, aunque no haya meta.
    if (!hadAnts && !(record && record.met)) {
      AUDIO.playSuccess();
      UI.confettiBurst();
    }

    UI.openModal(`
      ${UI.antDaySummaryHTML(date)}
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
                  <td>${t.description || ""}${t.excludeFromDailyGoal ? ` <em class="tag-linked">${I18N.t("tagFixed")}</em>` : ""}${t.antConcept ? ` <em class="tag-ant">🐜 ${LOGIC.antConceptLabel(t.antConcept)}</em>` : ""}</td>
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
    return `
      <section class="card">
        <div class="card-head"><h1>${I18N.t("cuentasTitle")}</h1></div>

        <h2 class="section-title">${I18N.t("csvImportTitle")}</h2>
        <p class="muted-small">${I18N.t("csvImportHint")}</p>
        <label class="btn btn-secondary btn-block" for="csv-import-input">${I18N.t("csvChooseFileBtn")}</label>
        <input type="file" accept=".csv,text/csv" id="csv-import-input" hidden />

        ${this.subscriptionsSectionHTML()}
        ${this.debtsSectionHTML()}
      </section>
    `;
  },

  // ---------- Suscripciones detectadas ----------
  subscriptionsSectionHTML() {
    const subs = LOGIC.detectSubscriptions();
    return `
      <h2 class="section-title">${I18N.t("subsTitle")}</h2>
      ${subs.items.length ? `
        <div class="subs-total">
          <strong>${I18N.t("subsSummary", { n: subs.items.length, amount: LOGIC.formatMoney(subs.total) })}</strong>
          <span class="muted-small">${I18N.t("subsYearly", { amount: LOGIC.formatMoney(subs.total * 12) })}</span>
        </div>
        <ul class="subs-list">
          ${subs.items.map((it) => `
            <li class="subs-item">
              <span>🔁 ${it.name}<span class="muted-small"> · ${I18N.t("subsSeen", { n: it.months })}</span></span>
              <strong>${LOGIC.formatMoney(it.monthly)}${I18N.t("perMonthShort")}</strong>
            </li>`).join("")}
        </ul>
        <p class="muted-small">${I18N.t("subsTip")}</p>
      ` : `<p class="muted-small">${I18N.t("subsNone")}</p>`}
    `;
  },

  // ---------- Deudas y plan para salir de ellas ----------
  addMonthsLabel(months) {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString(I18N.t("todayDateLocale"), { month: "long", year: "numeric" });
  },

  debtsSectionHTML() {
    const s = STORE.getSettings();
    const debts = STORE.getDebts();
    const strategy = s.debtStrategy === "avalancha" ? "avalancha" : "bola";
    const totalDebt = debts.reduce((sum, d) => sum + (Number(d.balance) || 0), 0);
    const active = debts.filter((d) => Number(d.balance) > 0);
    const plan = active.length ? LOGIC.debtPlan(active, strategy, s.debtExtra) : null;
    const other = active.length ? LOGIC.debtPlan(active, strategy === "bola" ? "avalancha" : "bola", s.debtExtra) : null;
    const byId = Object.fromEntries(debts.map((d) => [d.id, d]));
    return `
      <h2 class="section-title">${I18N.t("debtsTitle")}</h2>
      <p class="muted-small">${I18N.t("debtsHint")}</p>
      ${debts.length ? `
        <ul class="debt-list">
          ${debts.map((d) => `
            <li class="debt-item">
              <div class="debt-head">
                <strong>${d.name}</strong>
                <button class="icon-btn" data-action="remove-debt" data-id="${d.id}" aria-label="${I18N.t("deleteAria")}">🗑️</button>
              </div>
              <div class="muted-small">${I18N.t("debtLine", { balance: LOGIC.formatMoney(d.balance), rate: Number(d.rate) || 0, min: LOGIC.formatMoney(d.minPayment) })}</div>
              ${Number(d.balance) > 0
                ? `<button class="btn btn-secondary btn-sm" data-action="pay-debt" data-id="${d.id}">${I18N.t("debtPayBtn")}</button>`
                : `<span class="debt-done">${I18N.t("debtPaidOff")}</span>`}
            </li>`).join("")}
        </ul>
        <div class="period-total">
          <span class="muted-small">${I18N.t("debtTotalLabel")}</span>
          <strong>${LOGIC.formatMoney(totalDebt)}</strong>
        </div>
      ` : ""}
      <form id="debt-form" class="form debt-form">
        <label>${I18N.t("debtNameLabel")}
          <input type="text" name="name" placeholder="${I18N.t("debtNamePlaceholder")}" required />
        </label>
        <div class="debt-form-row">
          <label>${I18N.t("debtBalanceLabel")}
            <input type="number" name="balance" min="0" step="0.01" placeholder="Ej. 1200" inputmode="decimal" required />
          </label>
          <label>${I18N.t("debtRateLabel")}
            <input type="number" name="rate" min="0" step="0.01" placeholder="Ej. 18" inputmode="decimal" />
          </label>
          <label>${I18N.t("debtMinLabel")}
            <input type="number" name="minPayment" min="0" step="0.01" placeholder="Ej. 60" inputmode="decimal" required />
          </label>
        </div>
        <button type="submit" class="btn btn-secondary btn-block">${I18N.t("debtAddBtn")}</button>
      </form>
      ${active.length ? `
        <div class="debt-plan">
          <h3>${I18N.t("debtPlanTitle")}</h3>
          <div class="period-tabs">
            <button class="period-tab ${strategy === "bola" ? "is-active" : ""}" data-debt-strategy="bola">${I18N.t("debtSnowball")}</button>
            <button class="period-tab ${strategy === "avalancha" ? "is-active" : ""}" data-debt-strategy="avalancha">${I18N.t("debtAvalanche")}</button>
          </div>
          <p class="muted-small">${I18N.t(strategy === "bola" ? "debtSnowballHint" : "debtAvalancheHint")}</p>
          <label class="debt-extra">${I18N.t("debtExtraLabel")}
            <input type="number" id="debt-extra" min="0" step="1" value="${s.debtExtra || ""}" placeholder="0" inputmode="decimal" />
          </label>
          ${plan ? `
            <div class="debt-free">
              <span>${I18N.t("debtFreeIn")}</span>
              <strong>${I18N.t("debtMonths", { n: plan.months })}</strong>
              <span class="muted-small">${this.addMonthsLabel(plan.months)} · ${I18N.t("debtInterestTotal", { amount: LOGIC.formatMoney(plan.totalInterest) })}</span>
            </div>
            <ol class="debt-order">
              ${plan.payoff.map((p, i) => `
                <li class="${i === 0 ? "is-first" : ""}">
                  <strong>${byId[p.id].name}</strong>
                  <span class="muted-small">${i === 0 ? I18N.t("debtAttackFirst") + " · " : ""}${I18N.t("debtPaidBy", { when: this.addMonthsLabel(p.month) })}</span>
                </li>`).join("")}
            </ol>
            ${other && other.totalInterest + 1 < plan.totalInterest
              ? `<p class="muted-small">${I18N.t("debtOtherCheaper", { amount: LOGIC.formatMoney(plan.totalInterest - other.totalInterest) })}</p>`
              : ""}
          ` : `<p class="alert-text">${I18N.t("debtNeverWarning")}</p>`}
        </div>
      ` : ""}
    `;
  },

  // ================= METAS (perfil, meta, categorías) =================
  renderMetas() {
    const s = STORE.getSettings();
    const custom = STORE.getCustomCategories();

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
          <label class="toggle-row">
            <input type="checkbox" name="soundEnabled" ${s.soundEnabled ? "checked" : ""} />
            ${I18N.t("soundAlertLabel")}
          </label>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="test-sound">${I18N.t("testSoundBtn")}</button>
            <button type="submit" class="btn btn-primary">${I18N.t("btnSave")}</button>
          </div>
        </form>

        ${(() => {
          const target = LOGIC.emergencyFundTarget();
          if (!target) return "";
          return `
            <div class="suggest-card">
              <strong>${I18N.t("emergencySuggestTitle")}</strong>
              <p class="muted-small">${I18N.t("emergencySuggestBody", { amount: LOGIC.formatMoney(target) })}</p>
            </div>`;
        })()}

        <h2 class="section-title">${I18N.t("reminderTitle")}</h2>
        <p class="muted-small">${I18N.t("reminderHint")}</p>
        <form id="reminder-form" class="reminder-row">
          <input type="time" name="time" value="${s.reminderTime || "21:00"}" required />
          <button type="submit" class="btn btn-primary">${I18N.t("reminderBtn")}</button>
        </form>

        <h2 class="section-title">${I18N.t("backupTitle")}</h2>
        <p class="muted-small">${I18N.t("backupHint")}</p>
        <p class="muted-small"><strong>${s.lastBackupAt
          ? I18N.t("backupLast", { date: new Date(s.lastBackupAt).toLocaleDateString(I18N.t("todayDateLocale"), { day: "numeric", month: "long", year: "numeric" }) })
          : I18N.t("backupNever")}</strong></p>
        <div class="quick-actions">
          <button class="btn btn-primary" data-action="export-backup">${I18N.t("backupExportBtn")}</button>
          <label class="btn btn-secondary" for="import-backup-input">${I18N.t("backupImportBtn")}</label>
        </div>
        <input type="file" id="import-backup-input" accept="application/json,.json" hidden />

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

  // Consejos agrupados por tema. Los que no estén en ningún tema (p. ej.
  // consejos añadidos más adelante) van al grupo final "Más consejos".
  tipTopics() {
    const used = new Set();
    const topics = DATA.tipTopics.map((t) => {
      t.tips.forEach((i) => used.add(i));
      return Object.assign({}, t, { tips: t.tips.map((i) => DATA.tips[i]).filter(Boolean) });
    });
    const rest = DATA.tips.filter((_, i) => !used.has(i));
    if (rest.length) topics.push({ id: "mas", icon: "✨", label: { es: "Más consejos", en: "More tips", fr: "Plus de conseils", it: "Altri consigli", pt: "Mais dicas" }, tips: rest });
    return topics;
  },
  tipOfTheDay() {
    const d = new Date();
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    return DATA.tips[dayOfYear % DATA.tips.length];
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
        ${(() => {
          const tip = this.tipOfTheDay();
          return `
            <div class="tip-of-day">
              <span class="tip-of-day-kicker">${I18N.t("tipOfDayKicker")}</span>
              <h3>${LOGIC.localized(tip.title)}</h3>
              <p>${LOGIC.localized(tip.body)}</p>
            </div>`;
        })()}
        <input type="search" id="tips-search" class="tips-search" placeholder="${I18N.t("tipsSearchPlaceholder")}" aria-label="${I18N.t("tipsSearchPlaceholder")}" />
        <p class="muted-small" id="tips-search-empty" hidden>${I18N.t("tipsSearchEmpty")}</p>

        <div class="topic-list">
          ${this.tipTopics().map((topic) => `
            <details class="topic" data-topic="${topic.id}">
              <summary><span>${topic.icon} ${LOGIC.localized(topic.label)}</span><span class="topic-count">${topic.tips.length}</span></summary>
              <div class="tip-grid">
                ${topic.tips.map((t) => `
                  <div class="tip-card">
                    <h3>${LOGIC.localized(t.title)}</h3>
                    <p>${LOGIC.localized(t.body)}</p>
                  </div>`).join("")}
              </div>
            </details>`).join("")}
        </div>

        <details class="topic topic--tools">
          <summary><span>${I18N.t("toolsTopicTitle")}</span></summary>
          <div class="topic-body">
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

          </div>
        </details>

        <details class="topic topic--tools">
          <summary><span>${I18N.t("investorRoadmapTitle")}</span></summary>
          <div class="topic-body">
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
          </div>
        </details>

        <details class="topic topic--tools">
          <summary><span>${I18N.t("resourcesTopicTitle")}</span></summary>
          <div class="topic-body">
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
          </div>
        </details>
      </section>
    `;
  },

  // ---------- Gráfico de columnas: gasto variable de cada día ----------
  // Una sola serie (el gasto del día) frente a la línea de la meta diaria.
  // Las columnas por encima de la meta van en rojo; tocar una muestra su cifra.
  dailyChartHTML(start, end) {
    const goal = STORE.getSettings().dailyGoal || 0;
    const today = LOGIC.todayStr();
    const days = [];
    for (let d = new Date(start + "T00:00:00"); LOGIC.ymd(d) <= end; d.setDate(d.getDate() + 1)) {
      const date = LOGIC.ymd(d);
      days.push({ date, amount: date > today ? null : LOGIC.variableSpentForDate(date) });
    }
    const max = Math.max(goal, ...days.map((x) => x.amount || 0));
    if (!max) return "";
    const locale = I18N.t("todayDateLocale");
    const label = (date) => new Date(date + "T00:00:00").toLocaleDateString(locale, { weekday: "short", day: "numeric" });
    const showEvery = days.length > 10 ? 5 : 1;
    return `
      <div class="day-chart" role="img" aria-label="${I18N.t("dailyChartTitle")}">
        <div class="day-chart-head">
          <strong>${I18N.t("dailyChartTitle")}</strong>
          <span class="muted-small" id="day-chart-readout">${goal ? I18N.t("dailyChartGoalLegend", { amount: LOGIC.formatMoney(goal) }) : ""}</span>
        </div>
        <div class="day-chart-plot">
          ${goal ? `<div class="day-chart-goal" style="bottom:${(goal / max) * 100}%"></div>` : ""}
          ${days.map((x) => `
            <button type="button" class="day-col" data-readout="${label(x.date)}: ${x.amount == null ? "—" : LOGIC.formatMoney(x.amount)}" title="${label(x.date)}: ${x.amount == null ? "—" : LOGIC.formatMoney(x.amount)}">
              <span class="day-bar ${goal && x.amount > goal ? "is-over" : ""} ${x.date === today ? "is-today" : ""}" style="height:${x.amount ? Math.max(2, (x.amount / max) * 100) : 0}%"></span>
            </button>`).join("")}
        </div>
        <div class="day-chart-axis">
          ${days.map((x, i) => `<span>${i % showEvery === 0 ? (days.length > 10 ? Number(x.date.slice(8)) : label(x.date).split(" ")[0]) : ""}</span>`).join("")}
        </div>
      </div>`;
  },

  // ---------- Resumen semanal de gastos hormiga + meta de la semana ----------
  antWeekSectionHTML() {
    const today = LOGIC.todayStr();
    const weekStart = LOGIC.weekStartOf(today);
    const week = LOGIC.antSummary(weekStart, LOGIC.weekEndOf(weekStart));
    const lastStart = LOGIC.weekStartOf(today, -1);
    const last = LOGIC.antSummary(lastStart, LOGIC.weekEndOf(lastStart));
    const progress = LOGIC.weekGoalProgress(weekStart);
    // El domingo se cierra la semana: la meta que se fija es la de la próxima.
    const isSunday = new Date(today + "T00:00:00").getDay() === 0;
    const targetStart = isSunday ? LOGIC.weekStartOf(today, 1) : weekStart;
    const targetGoal = STORE.getWeekGoal(targetStart);
    const basis = isSunday ? week : last;
    const preselected = targetGoal ? targetGoal.avoid : LOGIC.suggestedAvoidConcepts(basis);
    const fmtDay = (d) => new Date(d + "T00:00:00").toLocaleDateString(I18N.t("todayDateLocale"), { day: "numeric", month: "short" });
    const diff = week.total - last.total;

    return `
      <div class="ant-week">
        <h2 class="section-title">${I18N.t("antWeekTitle")}</h2>
        <p class="muted-small">${fmtDay(weekStart)} – ${fmtDay(LOGIC.weekEndOf(weekStart))}</p>
        <div class="period-total">
          <span class="muted-small">${I18N.t("antWeekTotalLabel", { n: week.count })}</span>
          <strong>${LOGIC.formatMoney(week.total)}</strong>
        </div>
        ${week.count ? `
          <div class="bar-chart">
            ${week.items.map((it) => `
              <div class="bar-row">
                <span class="bar-label">${LOGIC.antConceptLabel(it.concept)}</span>
                <div class="bar-track"><div class="bar-fill bar-fill--ant" style="width:${Math.max(4, it.pct)}%"></div></div>
                <span class="bar-value">${LOGIC.formatMoney(it.amount)}</span>
              </div>
            `).join("")}
          </div>
          <div class="ant-split">
            <div class="ant-split-box is-yes"><span>${I18N.t("antNeededYes")}</span><strong>${LOGIC.formatMoney(week.needed)}</strong></div>
            <div class="ant-split-box is-no"><span>${I18N.t("antNeededNo")}</span><strong>${LOGIC.formatMoney(week.notNeeded)}</strong></div>
          </div>
          ${week.unreviewed > 0 ? `<p class="muted-small">${I18N.t("antUnreviewedNote", { amount: LOGIC.formatMoney(week.unreviewed) })}</p>` : ""}
          ${week.notNeeded > 0 ? `<p class="ant-insight">${I18N.t("antMonthProjection", { amount: LOGIC.formatMoney(week.notNeeded * 52 / 12) })}</p>` : ""}
        ` : `<p class="muted">${I18N.t("antWeekNone")}</p>`}
        ${last.count ? `<p class="muted-small">${I18N.t(diff <= 0 ? "antVsLastWeekDown" : "antVsLastWeekUp", { last: LOGIC.formatMoney(last.total), diff: LOGIC.formatMoney(Math.abs(diff)) })}</p>` : ""}

        ${progress ? `
          <div class="ant-goal-note ${progress.slips ? "is-slip" : ""}">
            <strong>${I18N.t("antWeekGoalShort")}</strong> ${progress.avoid.map((id) => LOGIC.antConceptLabel(id)).join(" · ")}
            <div class="muted-small">${progress.slips
              ? I18N.t("antWeekGoalSlips", { n: progress.slips, amount: LOGIC.formatMoney(progress.slipAmount) })
              : I18N.t("antWeekGoalClean")}</div>
          </div>` : ""}

        <form id="week-goal-form" class="form ant-goal-form" data-week="${targetStart}">
          <h3>${I18N.t(isSunday ? "antNextWeekGoalTitle" : "antThisWeekGoalTitle")}</h3>
          <p class="muted-small">${I18N.t("antGoalHint")}</p>
          <div class="ant-concept-grid">
            ${DATA.antConcepts.map((c) => `
              <label class="ant-concept">
                <input type="checkbox" name="avoid" value="${c.id}" ${preselected.includes(c.id) ? "checked" : ""} />
                <span>${c.icon} ${LOGIC.localized(c.label)}</span>
              </label>
            `).join("")}
          </div>
          <button type="submit" class="btn btn-primary btn-block">${targetGoal ? I18N.t("antGoalUpdateBtn") : I18N.t("antGoalSaveBtn")}</button>
        </form>
      </div>
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

        ${this.antWeekSectionHTML()}

        <h2 class="section-title">${I18N.t("allExpensesTitle")}</h2>
        <div class="period-tabs">
          ${["day", "week", "month"].map((p) => `
            <button class="period-tab ${p === period ? "is-active" : ""}" data-period="${p}">${periodTabLabel[p]}</button>
          `).join("")}
        </div>

        <div class="period-total">
          <span class="muted-small">${I18N.t("spentInPeriod", { period: periodLabel[period] })}</span>
          <strong>${LOGIC.formatMoney(breakdown.total)}</strong>
        </div>

        ${period !== "day" ? this.dailyChartHTML(breakdown.start, period === "month" ? LOGIC.ymd(new Date(Number(breakdown.start.slice(0, 4)), Number(breakdown.start.slice(5, 7)), 0)) : breakdown.end) : ""}

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
      btn.addEventListener("click", () => UI.openAddForm(btn.dataset.type))
    );

    const addAntBtn = view.querySelector('[data-action="add-ant"]');
    if (addAntBtn) addAntBtn.addEventListener("click", () => UI.openAntForm());

    view.querySelectorAll('[data-action="go-resumen"]').forEach((b) =>
      b.addEventListener("click", () => {
        UI.resumenPeriod = "week";
        UI.render("resumen");
      })
    );

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
        const today = LOGIC.todayStr();
        if (LOGIC.antTransactionsInRange(today, today).length) UI.openAntReview(today, () => UI.finishCloseDay(today));
        else UI.finishCloseDay(today);
      });
    }

    const tipsSearch = view.querySelector("#tips-search");
    if (tipsSearch) {
      const norm = (x) => LOGIC._normalizeText(x);
      tipsSearch.addEventListener("input", () => {
        const q = norm(tipsSearch.value.trim());
        let found = 0;
        view.querySelectorAll(".topic[data-topic]").forEach((topic) => {
          let visible = 0;
          topic.querySelectorAll(".tip-card").forEach((card) => {
            const match = !q || norm(card.textContent).includes(q);
            card.hidden = !match;
            if (match) visible++;
          });
          topic.hidden = q && !visible;
          topic.open = !!q && visible > 0;
          found += visible;
        });
        view.querySelector("#tips-search-empty").hidden = !q || found > 0;
      });
    }

    const readout = view.querySelector("#day-chart-readout");
    view.querySelectorAll(".day-col").forEach((col) => {
      const show = () => { readout.textContent = col.dataset.readout; };
      col.addEventListener("mouseenter", show);
      col.addEventListener("focus", show);
      col.addEventListener("click", show);
    });

    const weekGoalForm = view.querySelector("#week-goal-form");
    if (weekGoalForm) {
      weekGoalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const avoid = new FormData(weekGoalForm).getAll("avoid");
        STORE.setWeekGoal(weekGoalForm.dataset.week, avoid);
        UI.toast(avoid.length ? I18N.t("toastWeekGoalSaved") : I18N.t("toastWeekGoalCleared"));
        UI.render("resumen");
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
    const reminderForm = view.querySelector("#reminder-form");
    if (reminderForm) {
      reminderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const time = new FormData(reminderForm).get("time") || "21:00";
        STORE.saveSettings(Object.assign({}, STORE.getSettings(), { reminderTime: time }));
        UI.downloadFile("hucha-recordatorio.ics", UI.reminderICS(time), "text/calendar");
        UI.toast(I18N.t("toastReminderDownloaded"));
      });
    }

    // ---- Deudas ----
    const debtForm = view.querySelector("#debt-form");
    if (debtForm) {
      debtForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(debtForm);
        STORE.addDebt({
          name: fd.get("name"),
          balance: parseFloat(fd.get("balance")) || 0,
          rate: parseFloat(fd.get("rate")) || 0,
          minPayment: parseFloat(fd.get("minPayment")) || 0
        });
        UI.toast(I18N.t("toastDebtAdded"));
        UI.render("cuentas");
      });
    }
    view.querySelectorAll('[data-action="remove-debt"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        if (confirm(I18N.t("confirmDeleteDebt"))) {
          STORE.removeDebt(btn.dataset.id);
          UI.render("cuentas");
        }
      })
    );
    view.querySelectorAll('[data-action="pay-debt"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const debt = STORE.getDebts().find((d) => d.id === btn.dataset.id);
        if (!debt) return;
        const raw = prompt(I18N.t("debtPayPrompt", { name: debt.name }), debt.minPayment || "");
        const amount = parseFloat(String(raw || "").replace(",", "."));
        if (!amount || amount <= 0) return;
        const balance = Math.max(0, Math.round((Number(debt.balance) - amount) * 100) / 100);
        STORE.updateDebt(debt.id, { balance });
        UI.toast(balance === 0 ? I18N.t("toastDebtPaidOff", { name: debt.name }) : I18N.t("toastDebtPaid"));
        if (balance === 0) UI.confettiBurst();
        UI.render("cuentas");
      })
    );
    view.querySelectorAll("[data-debt-strategy]").forEach((btn) =>
      btn.addEventListener("click", () => {
        STORE.saveSettings(Object.assign({}, STORE.getSettings(), { debtStrategy: btn.dataset.debtStrategy }));
        UI.render("cuentas");
      })
    );
    const debtExtra = view.querySelector("#debt-extra");
    if (debtExtra) {
      debtExtra.addEventListener("change", () => {
        STORE.saveSettings(Object.assign({}, STORE.getSettings(), { debtExtra: Math.max(0, parseFloat(debtExtra.value) || 0) }));
        UI.render("cuentas");
      });
    }

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
    view.querySelectorAll(".period-tab[data-period]").forEach((btn) =>
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

    // ---- Copia de seguridad ----
    const exportBtn = view.querySelector('[data-action="export-backup"]');
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const backup = STORE.exportAll();
        UI.downloadFile("hucha-copia-" + LOGIC.todayStr() + ".json", JSON.stringify(backup, null, 2), "application/json");
        STORE.saveSettings(Object.assign({}, STORE.getSettings(), { lastBackupAt: backup.exportedAt }));
        UI.toast(I18N.t("toastBackupExported"));
        UI.render("metas");
      });
    }
    const importInput = view.querySelector("#import-backup-input");
    if (importInput) {
      importInput.addEventListener("change", async () => {
        const file = importInput.files && importInput.files[0];
        importInput.value = "";
        if (!file) return;
        let backup = null;
        try { backup = JSON.parse(await file.text()); } catch (e) { backup = null; }
        if (!backup || backup.app !== STORE.BACKUP_APP_ID) {
          UI.toast(I18N.t("toastBackupInvalid"), "warn");
          return;
        }
        const when = new Date(backup.exportedAt).toLocaleDateString(I18N.t("todayDateLocale"), { day: "numeric", month: "long", year: "numeric" });
        if (!confirm(I18N.t("confirmBackupImport", { date: when }))) return;
        if (STORE.importAll(backup)) location.reload();
        else UI.toast(I18N.t("toastBackupInvalid"), "warn");
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
