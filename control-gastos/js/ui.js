// Renderizado de las vistas y manejo de eventos. Sin frameworks: cada vista
// se vuelve a pintar por completo en #view y los listeners se re-enganchan.
const UI = {
  currentTab: "hoy",

  // ---------- Categorías (por defecto + personalizadas) ----------
  baseCategoriesFor(type) {
    return type === "income" ? DATA.incomeCategories : DATA.expenseCategories;
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
    const m = DATA.paymentMethods.find((x) => x.id === id);
    return m ? m.label : id;
  },
  categoryOptionsHTML(type, selected) {
    return this.categoriesFor(type)
      .map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.icon} ${c.label}</option>`)
      .join("");
  },
  methodOptionsHTML(selected) {
    return DATA.paymentMethods
      .map((m) => `<option value="${m.id}" ${m.id === selected ? "selected" : ""}>${m.label}</option>`)
      .join("");
  },
  countryOptionsHTML(selected) {
    return DATA.countries
      .map((c) => `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${c.name} (${c.currency})</option>`)
      .join("");
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
      <h2>🎉 ¡Logro alcanzado!</h2>
      <img src="${dataURL}" alt="Logro alcanzado" class="achievement-preview" />
      <p class="muted-small">${goal.photo ? "" : "¿Tienes una foto de ese momento? Añádela para una tarjeta con más recuerdo."}</p>
      <input type="file" accept="image/*" id="celebrate-photo-input" hidden />
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close-modal>Cerrar</button>
        <label class="btn btn-secondary" for="celebrate-photo-input">${goal.photo ? "📷 Cambiar foto" : "📷 Añadir foto"}</label>
        <button type="button" class="btn btn-primary" id="share-goal-celebrate">Compartir 📤</button>
      </div>
    `);
    const shareBtn = document.getElementById("share-goal-celebrate");
    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        const text = "¡Logré \"" + goal.label + "\" ahorrando con Hucha! 🎉🐷";
        const result = await SHARE.shareCard(dataURL, text);
        if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
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
    const pill = document.getElementById("status-pill");
    if (spent > settings.dailyGoal) {
      pill.hidden = false;
      pill.textContent = "⚠️ Meta diaria superada";
      pill.className = "status-pill status-pill--over";
      if (settings.soundEnabled) AUDIO.playAlert();
    } else {
      pill.hidden = false;
      const pct = Math.round((spent / settings.dailyGoal) * 100);
      pill.textContent = "🟢 " + pct + "% de tu meta diaria";
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

    this.openModal(`
      <h2>Revisar movimientos importados</h2>
      <p class="muted-small">${result.rows.length} movimiento${result.rows.length === 1 ? "" : "s"} detectado${result.rows.length === 1 ? "" : "s"}${result.skipped ? `, ${result.skipped} fila${result.skipped === 1 ? "" : "s"} omitida${result.skipped === 1 ? "" : "s"} por no reconocerse` : ""}. Revisa las categorías sugeridas antes de importar.</p>
      <div class="table-scroll">
        <table class="sheet-table">
          <thead><tr><th>Fecha</th><th>Descripción</th><th>Importe</th><th>Categoría</th></tr></thead>
          <tbody id="csv-preview-body">${rowsHTML}</tbody>
        </table>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close-modal>Cancelar</button>
        <button type="button" class="btn btn-primary" id="csv-import-confirm">Importar ${result.rows.length} movimiento${result.rows.length === 1 ? "" : "s"}</button>
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
      UI.toast(result.rows.length + " movimiento" + (result.rows.length === 1 ? "" : "s") + " importado" + (result.rows.length === 1 ? "" : "s"));
      UI.render("movimientos");
    });
  },

  render(tab) {
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
    this.toast("¡Perfil guardado! Empecemos 💪");
    this.render("hoy");
  },

  renderOnboardingView() {
    const view = document.getElementById("view");
    const step = this.onboard.step;
    const d = this.onboard.data;
    const num = this.STEP_NUMBER[step] || 1;
    const renderers = {
      accountMode: () => `
        <img class="ob-mascot" src="icons/mascot-piggy.svg" alt="Hucha" />
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¡Hola! Soy Hucha 🐷 ¿Cómo quieres usarme?</h1>
        <div class="ob-choice-grid">
          <button class="ob-choice" data-value="individual">🙋 Cuenta personal</button>
          <button class="ob-choice" data-value="compartida">👨‍👩‍👧 Cuenta familiar / compartida</button>
        </div>`,
      userName: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cómo te llamas?</h1>
        <form class="form ob-form" data-next>
          <input type="text" name="userName" value="${d.userName || ""}" placeholder="Tu nombre" required autofocus />
          ${this.obNavHTML()}
        </form>`,
      age: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cuántos años tienes?</h1>
        <form class="form ob-form" data-next>
          <input type="number" name="age" min="10" max="110" value="${d.age || ""}" placeholder="Edad" required />
          ${this.obNavHTML()}
        </form>`,
      country: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿En qué país vives?</h1>
        <p class="muted-small">Así configuramos tu moneda automáticamente.</p>
        <form class="form ob-form" data-next>
          <select name="country" required>
            <option value="" disabled ${!d.country ? "selected" : ""}>Selecciona un país</option>
            ${this.countryOptionsHTML(d.country)}
          </select>
          ${this.obNavHTML()}
        </form>`,
      monthlyIncome: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cuánto ganas al mes aproximadamente?</h1>
        <form class="form ob-form" data-next>
          <input type="number" name="monthlyIncome" min="0" step="0.01" value="${d.monthlyIncome || ""}" placeholder="Ingreso mensual" required />
          ${this.obNavHTML()}
        </form>`,
      desiredIncome: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cuánto te gustaría ganar al mes, idealmente?</h1>
        <p class="muted-small">Así podemos comparar tu ingreso actual con el que sueñas tener.</p>
        <form class="form ob-form" data-next>
          <input type="number" name="desiredIncome" min="0" step="0.01" value="${d.desiredIncome || ""}" placeholder="Ingreso mensual deseado" required />
          ${this.obNavHTML()}
        </form>`,
      occupation: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿En qué trabajas?</h1>
        <form class="form ob-form" data-next>
          <input type="text" name="occupation" value="${d.occupation || ""}" placeholder="Ej. Diseñadora, comercio, estudiante..." />
          ${this.obNavHTML()}
        </form>`,
      workHours: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>Cuéntanos de tu jornada laboral</h1>
        <form class="form ob-form" data-next>
          <label>Horas que trabajas al día
            <input type="number" name="hoursPerDay" min="0" max="24" step="0.5" value="${d.hoursPerDay || ""}" placeholder="Ej. 8" required />
          </label>
          <label>Horas extra a la semana (opcional)
            <input type="number" name="overtimeHours" min="0" step="0.5" value="${d.overtimeHours || ""}" placeholder="Ej. 5" />
          </label>
          <label>Minutos de traslado, solo ida (opcional)
            <input type="number" name="commuteMinutes" min="0" step="1" value="${d.commuteMinutes || ""}" placeholder="Ej. 30" />
          </label>
          <label class="toggle-row">
            <input type="checkbox" name="multipleJobs" ${d.multipleJobs ? "checked" : ""} />
            Tengo más de un trabajo o fuente de ingreso activa
          </label>
          ${this.obNavHTML()}
        </form>`,
      workGoal: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>Si pudieras mejorar tu situación, ¿qué priorizarías?</h1>
        <div class="ob-choice-grid">
          <button class="ob-choice" data-workgoal="ganar_mas">💰 Ganar más</button>
          <button class="ob-choice" data-workgoal="trabajar_menos">🕒 Trabajar menos</button>
          <button class="ob-choice" data-workgoal="ambas">✨ Ambas</button>
        </div>`,
      expensesSnapshot: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cuánto gastas al mes en cada categoría?</h1>
        <p class="muted-small">Una estimación aproximada está bien, no hace falta ser exacto.</p>
        <form class="form ob-form" data-next>
          ${DATA.expenseSnapshotCategories.map((c) => `
            <label>${c.icon} ${c.label}
              <input type="number" name="expense_${c.id}" min="0" step="0.01" value="${(d.expensesSnapshot && d.expensesSnapshot[c.id]) || ""}" placeholder="0.00" />
            </label>
          `).join("")}
          ${this.obNavHTML()}
        </form>`,
      currentSavingsMonthly: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cuánto logras ahorrar realmente cada mes, hoy en día?</h1>
        <p class="muted-small">No la meta ideal, sino lo que de verdad consigues guardar ahora mismo.</p>
        <form class="form ob-form" data-next>
          <input type="number" name="currentSavingsMonthly" min="0" step="0.01" value="${d.currentSavingsMonthly || ""}" placeholder="Ej. 50" required />
          <label>¿Qué haces con lo que ahorras?
            <select name="savingsBehavior">
              <option value="pasivo" ${(d.savingsBehavior || "pasivo") === "pasivo" ? "selected" : ""}>Lo dejo en la cuenta o en efectivo</option>
              <option value="invierte" ${d.savingsBehavior === "invierte" ? "selected" : ""}>Lo invierto o lo pongo a producir</option>
            </select>
          </label>
          ${this.obNavHTML()}
        </form>`,
      savingsGoalMonthly: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Cuánto te gustaría ahorrar cada mes?</h1>
        <p class="muted-small">Esta será tu cuota de ahorro deseada.</p>
        <form class="form ob-form" data-next>
          <input type="number" name="savingsGoalMonthly" min="0" step="0.01" value="${d.savingsGoalMonthly || ""}" placeholder="Meta de ahorro mensual" required />
          ${this.obNavHTML()}
        </form>`,
      meetingGoal: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Actualmente estás logrando esa meta de ahorro?</h1>
        <div class="ob-choice-grid">
          <button class="ob-choice" data-bool="true">✅ Sí, ya lo consigo</button>
          <button class="ob-choice" data-bool="false">❌ No, todavía no</button>
        </div>`,
      obstacles: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Qué se te dificulta más? Elige todas las que apliquen</h1>
        <form class="form ob-form" data-next id="ob-obstacles-form">
          <div class="ob-checks">
            ${DATA.obstacles.map((o) => `
              <label class="ob-check"><input type="checkbox" name="obstacles" value="${o.id}" ${(d.obstacles || []).includes(o.id) ? "checked" : ""}/> ${o.label}</label>
            `).join("")}
          </div>
          ${this.obNavHTML()}
        </form>`,
      diagnosis: () => {
        const chosen = d.obstacles || [];
        const tipTitles = new Set();
        chosen.forEach((id) => (this.OBSTACLE_TIP_MAP[id] || []).forEach((t) => tipTitles.add(t)));
        const tips = DATA.tips.filter((t) => tipTitles.has(t.title));
        return `
          <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
          <h1>Tu punto de partida</h1>
          <p>Casi siempre el primer paso es el mismo: <strong>registra tus ingresos y gastos durante unos días</strong> para ver con claridad en qué se te va el dinero. A partir de ahí podrás ajustar.</p>
          ${tips.length ? `
            <div class="tip-grid">
              ${tips.map((t) => `<div class="tip-card"><h3>${t.title}</h3><p>${t.body}</p></div>`).join("")}
            </div>` : ""}
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="ob-back">Atrás</button>
            <button type="button" class="btn btn-primary" id="ob-continue">Continuar</button>
          </div>`;
      },
      purposes: () => `
        <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
        <h1>¿Para qué te gustaría usar lo que ahorres?</h1>
        <form class="form ob-form" data-next id="ob-purposes-form">
          <div class="ob-checks ob-checks--grid">
            ${DATA.savingsPurposes.map((p) => `
              <label class="ob-check"><input type="checkbox" name="savingsPurposes" value="${p.id}" ${(d.savingsPurposes || []).includes(p.id) ? "checked" : ""}/> ${p.icon} ${p.label}</label>
            `).join("")}
          </div>
          <input type="text" name="savingsPurposeOther" value="${d.savingsPurposeOther || ""}" placeholder="Otro (opcional)" />
          ${this.obNavHTML()}
        </form>`,
      archetype: () => {
        const result = LOGIC.computeArchetype(d);
        const profile = LOGIC.computeIncomeExpenseProfile(d);
        return `
          <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
          <div class="archetype-reveal">
            <span class="archetype-emoji">${result.emoji}</span>
            <p class="archetype-kicker">Tu arquetipo financiero es...</p>
            <h1>${result.label}</h1>
            <p>${result.description}</p>
          </div>
          <div class="risk-badge risk-badge--${profile.key}">
            <span class="risk-badge-label">Perfil de ingreso y gasto</span>
            <strong>${profile.label}</strong>
            <span class="risk-badge-level">Riesgo: ${profile.risk}</span>
            <p>${profile.description}</p>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="ob-back">Atrás</button>
            <button type="button" class="btn btn-primary" id="ob-continue">Continuar</button>
          </div>`;
      },
      summary: () => {
        const daysInMonth = LOGIC.daysInMonth(LOGIC.todayStr());
        const suggested = d.monthlyIncome && d.savingsGoalMonthly
          ? Math.max(0, (d.monthlyIncome - d.savingsGoalMonthly) / daysInMonth)
          : (d.dailyGoal || 0);
        return `
          <p class="ob-progress">Paso ${num} de ${this.TOTAL_STEPS}</p>
          <h1>¡Listo, ${d.userName || ""}! 🎉</h1>
          <p class="muted-small">Con tus datos, esta sería tu meta de gasto diario sugerida (puedes ajustarla):</p>
          <form class="form ob-form" data-next>
            <label>Meta de gasto diario
              <input type="number" name="dailyGoal" min="0" step="0.01" value="${(d.dailyGoal != null ? d.dailyGoal : suggested).toFixed(2)}" required />
            </label>
            <div class="modal-actions">
              <button type="button" class="btn btn-ghost" id="ob-back">Atrás</button>
              <button type="submit" class="btn btn-primary">Empezar a usar la app</button>
            </div>
          </form>`;
      }
    };
    const cancelHeader = this.onboard.editing
      ? `<button type="button" class="icon-btn ob-close" id="ob-cancel" aria-label="Cancelar edición">✕</button>`
      : "";
    view.innerHTML = `<section class="card ob-card">${cancelHeader}${(renderers[step] || renderers.accountMode)()}</section>`;
    this.wireOnboarding(step);
  },

  obNavHTML() {
    return `
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="ob-back">Atrás</button>
        <button type="submit" class="btn btn-primary">Continuar</button>
      </div>`;
  },

  wireOnboarding(step) {
    const view = document.getElementById("view");
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
    const spent = LOGIC.totalForDate(today, "expense");
    const income = LOGIC.totalForDate(today, "income");
    const goal = settings.dailyGoal;
    const pct = goal ? Math.min(100, Math.round((spent / goal) * 100)) : 0;
    const over = goal && spent > goal;
    const dayClosed = STORE.getDays()[today];
    const txs = LOGIC.transactionsForDate(today).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const planToday = STORE.getPlan(today);
    const savings = LOGIC.savingsProgressThisMonth();
    const streak = LOGIC.currentStreak();
    const tier = LOGIC.streakTier(streak);

    return `
      <section class="card">
        <div class="hoy-banner"><img src="icons/scene-campfire.svg" alt="" /></div>

        <div class="card-head">
          <h1>Hoy</h1>
          <span class="muted">${new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>

        ${settings.userName ? `<p class="muted-small">Hola, ${settings.userName} · ${settings.accountMode === "compartida" ? "cuenta familiar 👨‍👩‍👧" : "cuenta personal 🙋"}</p>` : ""}

        ${streak > 0 ? `
          <div class="tier-chip" style="background:linear-gradient(90deg, ${tier.from}, ${tier.to}); color:${tier.text}">
            ${tier.key === "start"
              ? `🔥 ${streak} ${streak === 1 ? "día" : "días"} seguidos sin pasarte`
              : `${tier.emoji} ${streak} ${streak === 1 ? "día" : "días"} en el ${tier.label.toLowerCase()}`}
          </div>
        ` : ""}

        ${planToday ? `
          <div class="plan-banner">
            <div>
              <strong>🌙 Tu plan de anoche para hoy</strong>
              <p>${planToday}</p>
            </div>
            <button class="icon-btn" data-action="edit-plan" title="Editar plan" aria-label="Editar plan">✏️</button>
          </div>
        ` : ""}

        ${goal ? `
          <div class="goal-block">
            <div class="goal-row">
              <span>Gastado: <strong class="${over ? "text-danger" : ""}">${LOGIC.formatMoney(spent)}</strong></span>
              <span>Meta: <strong>${LOGIC.formatMoney(goal)}</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill ${over ? "progress-fill--over" : ""}" style="width:${pct}%"></div>
            </div>
            ${over ? `<p class="alert-text">⚠️ Has superado tu meta diaria por ${LOGIC.formatMoney(spent - goal)}.</p>` : `<p class="muted-small">Te quedan ${LOGIC.formatMoney(goal - spent)} para hoy.</p>`}
          </div>
        ` : `
          <div class="empty-hint">
            <p>Todavía no tienes una meta de gasto diario configurada.</p>
            <button class="btn btn-primary" data-action="go-metas">Configurar mi meta</button>
          </div>
        `}

        ${settings.savingsGoalMonthly ? `
          <div class="goal-block savings-block">
            <div class="goal-row">
              <span>🐷 Ahorro de este mes</span>
              <span><strong>${LOGIC.formatMoney(savings.saved)}</strong> / ${LOGIC.formatMoney(savings.goal)}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill progress-fill--savings" style="width:${savings.pct}%"></div>
            </div>
            <p class="muted-small">Meta de ahorro diario: ${LOGIC.formatMoney(LOGIC.dailySavingsTarget())}</p>
          </div>
        ` : ""}

        <div class="quick-actions">
          <button class="btn btn-expense" data-action="add" data-type="expense" ${dayClosed ? "disabled" : ""}>➖ Añadir gasto</button>
          <button class="btn btn-income" data-action="add" data-type="income" ${dayClosed ? "disabled" : ""}>➕ Añadir ingreso</button>
        </div>

        ${income ? `<p class="muted-small">Ingresos de hoy: <strong>${LOGIC.formatMoney(income)}</strong></p>` : ""}

        ${dayClosed
          ? `<div class="day-closed-banner ${dayClosed.met ? "is-good" : "is-bad"}">
               ${dayClosed.met ? "✅ Cerraste el día dentro de tu meta." : "📌 Cerraste el día por encima de tu meta."}
             </div>`
          : `<div class="hoy-close-actions">
               ${goal ? `<button class="btn btn-secondary btn-block" data-action="close-day">🌙 Cerrar mi día de hoy</button>` : ""}
               <button class="btn btn-ghost btn-block" data-action="plan-tomorrow">✏️ Planificar mañana</button>
             </div>`
        }

        <h2 class="section-title">Movimientos de hoy</h2>
        ${txs.length ? `<ul class="tx-list">${txs.map((t) => this.txItemHTML(t)).join("")}</ul>` : `<p class="muted">Aún no has registrado nada hoy.</p>`}
      </section>
    `;
  },

  txItemHTML(t) {
    const sign = t.type === "income" ? "+" : "−";
    return `
      <li class="tx-item" data-id="${t.id}">
        <span class="tx-cat">${this.categoryLabel(t.category)}</span>
        <span class="tx-desc">${t.description || ""}${t.source === "linked" ? ' <em class="tag-linked">enlazado</em>' : ""}</span>
        <span class="tx-amount ${t.type === "income" ? "text-income" : "text-expense"}">${sign} ${LOGIC.formatMoney(t.amount)}</span>
        <button class="icon-btn" data-action="delete-tx" data-id="${t.id}" title="Eliminar" aria-label="Eliminar movimiento">🗑️</button>
      </li>`;
  },

  addFormHTML(type) {
    const title = type === "income" ? "Añadir ingreso" : "Añadir gasto";
    return `
      <h2>${title}</h2>
      <form id="tx-form" class="form">
        <label>Categoría
          <select name="category">${this.categoryOptionsHTML(type)}</select>
        </label>
        <label>Descripción
          <input type="text" name="description" placeholder="Ej. Supermercado" />
        </label>
        <label>Importe
          <input type="number" name="amount" min="0" step="0.01" required placeholder="0.00" />
        </label>
        ${type === "expense" ? `<label>Método de pago
          <select name="method">${this.methodOptionsHTML("efectivo")}</select>
        </label>` : ""}
        <input type="hidden" name="type" value="${type}" />
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    `;
  },

  planFormHTML(forDate, current) {
    return `
      <h2>✏️ Planifica el ${forDate}</h2>
      <p class="muted-small">Escribe algo breve: qué quieres lograr o evitar mañana.</p>
      <form id="plan-form" class="form">
        <textarea name="plan" rows="4" placeholder="Ej. Llevar comida de casa y no pedir a domicilio">${current || ""}</textarea>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar plan</button>
        </div>
      </form>
    `;
  },

  // ================= MOVIMIENTOS =================
  renderMovimientos() {
    const all = STORE.getTransactions().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (a.createdAt < b.createdAt ? 1 : -1)));
    const totalIncome = all.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
    const totalExpense = all.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);

    return `
      <section class="card">
        <div class="card-head">
          <h1>Movimientos</h1>
          <span class="muted">${all.length} registros</span>
        </div>

        <form id="quick-row-form" class="sheet-add-row">
          <input type="date" name="date" value="${LOGIC.todayStr()}" required />
          <select name="type" id="qr-type">
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
          <select name="category" id="qr-category">${this.categoryOptionsHTML("expense")}</select>
          <input type="text" name="description" placeholder="Descripción" />
          <select name="method" id="qr-method">${this.methodOptionsHTML("efectivo")}</select>
          <input type="number" name="amount" step="0.01" min="0" placeholder="Importe" required />
          <button type="submit" class="btn btn-primary btn-sm">Añadir fila</button>
        </form>

        <div class="table-scroll">
          <table class="sheet-table">
            <thead>
              <tr>
                <th>Fecha</th><th>Tipo</th><th>Categoría</th><th>Descripción</th><th>Método</th><th>Origen</th><th>Importe</th><th></th>
              </tr>
            </thead>
            <tbody>
              ${all.map((t) => `
                <tr data-id="${t.id}">
                  <td>${t.date}</td>
                  <td>${t.type === "income" ? "Ingreso" : "Gasto"}</td>
                  <td>${this.categoryLabel(t.category)}</td>
                  <td>${t.description || ""}</td>
                  <td>${t.method ? this.methodLabel(t.method) : "—"}</td>
                  <td>${t.source === "linked" ? "🔗 Enlazado" : t.source === "imported" ? "📄 Importado" : "✍️ Manual"}</td>
                  <td class="${t.type === "income" ? "text-income" : "text-expense"}">${t.type === "income" ? "+" : "−"} ${LOGIC.formatMoney(t.amount)}</td>
                  <td><button class="icon-btn" data-action="delete-tx" data-id="${t.id}" aria-label="Eliminar">🗑️</button></td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="6">Totales</td>
                <td class="text-income">+ ${LOGIC.formatMoney(totalIncome)}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="6"></td>
                <td class="text-expense">− ${LOGIC.formatMoney(totalExpense)}</td>
                <td></td>
              </tr>
              <tr class="totals-balance">
                <td colspan="6">Balance</td>
                <td>${LOGIC.formatMoney(totalIncome - totalExpense)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        ${!all.length ? `<p class="muted">Todavía no hay movimientos. Añade tu primera fila arriba.</p>` : ""}
      </section>
    `;
  },

  // ================= CUENTAS =================
  renderCuentas() {
    const accounts = STORE.getAccounts();
    const connectedIds = new Set(accounts.map((a) => a.bankId));

    return `
      <section class="card">
        <div class="card-head"><h1>Cuentas</h1></div>
        <div class="notice">
          <strong>Esto es una simulación.</strong> Por ahora esta app no enlaza cuentas bancarias reales ni en tiempo real:
          eso requeriría un proveedor de Open Banking (Plaid, Tink...) con tu consentimiento explícito y manejo seguro de
          datos sensibles que esta app, al no tener servidor propio, no puede garantizar. Aquí puedes probar cómo se vería:
          "conecta" un banco de demostración y simula pagos para ver cómo aparecerían automáticamente en Movimientos.
        </div>

        <h2 class="section-title">Cuentas conectadas</h2>
        ${accounts.length ? `
          <ul class="account-list">
            ${accounts.map((a) => `
              <li class="account-item">
                <div>
                  <strong>${a.name}</strong>
                  <div class="muted-small">${a.kind}</div>
                </div>
                <div class="account-actions">
                  <button class="btn btn-secondary btn-sm" data-action="simulate-charge" data-id="${a.id}">Simular pago</button>
                  <button class="btn btn-ghost btn-sm" data-action="disconnect" data-id="${a.id}">Desconectar</button>
                </div>
              </li>`).join("")}
          </ul>
        ` : `<p class="muted">Todavía no has conectado ninguna cuenta.</p>`}

        <h2 class="section-title">Bancos de demostración disponibles</h2>
        <ul class="account-list">
          ${DATA.demoBanks.filter((b) => !connectedIds.has(b.id)).map((b) => `
            <li class="account-item">
              <div>
                <strong>${b.name}</strong>
                <div class="muted-small">${b.kind}</div>
              </div>
              <button class="btn btn-primary btn-sm" data-action="connect" data-id="${b.id}">Conectar</button>
            </li>`).join("")}
        </ul>

        <h2 class="section-title">📄 Importar movimientos reales desde CSV</h2>
        <p class="muted-small">Descarga el extracto de tu banca online en formato CSV y impórtalo aquí. El archivo se procesa en tu dispositivo: nunca se envía a ningún servidor.</p>
        <label class="btn btn-secondary btn-block" for="csv-import-input">📄 Elegir archivo CSV</label>
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
        <div class="card-head"><h1>Metas y perfil</h1></div>

        <div class="profile-summary">
          <div>
            <strong>${s.userName || "Sin nombre"}</strong>
            <div class="muted-small">
              ${s.age ? s.age + " años · " : ""}${s.occupation || ""}${s.occupation ? " · " : ""}${s.accountMode === "compartida" ? "Cuenta familiar" : "Cuenta personal"}
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" data-action="edit-profile">Editar mi perfil ✏️</button>
        </div>

        ${s.archetypeKey ? (() => {
          const arch = DATA.archetypes.find((a) => a.key === s.archetypeKey);
          if (!arch) return "";
          return `
            <div class="archetype-card">
              <span class="archetype-card-emoji">${arch.emoji}</span>
              <div>
                <p class="archetype-card-kicker">Tu arquetipo financiero</p>
                <strong>${arch.label}</strong>
                <p class="muted-small">${arch.description}</p>
              </div>
            </div>`;
        })() : ""}

        ${s.incomeExpenseProfileKey ? (() => {
          const profile = DATA.incomeExpenseProfiles.find((p) => p.key === s.incomeExpenseProfileKey);
          if (!profile) return "";
          return `
            <div class="risk-badge risk-badge--${profile.key}">
              <span class="risk-badge-label">Perfil de ingreso y gasto</span>
              <strong>${profile.label}</strong>
              <span class="risk-badge-level">Riesgo: ${profile.risk}</span>
              <p>${profile.description}</p>
            </div>`;
        })() : ""}

        <label class="toggle-switch-row">
          <span>Modo de cuenta</span>
          <span class="toggle-switch" id="account-mode-toggle" data-mode="${s.accountMode}">
            <span class="toggle-opt ${s.accountMode !== "compartida" ? "is-active" : ""}" data-mode="individual">Individual</span>
            <span class="toggle-opt ${s.accountMode === "compartida" ? "is-active" : ""}" data-mode="compartida">Compartida</span>
          </span>
        </label>
        <p class="muted-small">La cuenta compartida solo cambia cómo se muestra la app; los datos siguen guardados en este dispositivo, no se sincronizan entre personas.</p>

        <form id="settings-form" class="form">
          <label>Moneda / país
            <select name="country">${this.countryOptionsHTML(s.country)}</select>
          </label>
          <label>Meta de gasto diario
            <input type="number" name="dailyGoal" min="0" step="0.01" value="${s.dailyGoal || ""}" placeholder="Ej. 25" required />
          </label>
          <label>Meta de ahorro mensual
            <input type="number" name="savingsGoalMonthly" min="0" step="0.01" value="${s.savingsGoalMonthly || ""}" placeholder="Ej. 150" />
          </label>
          <label class="toggle-row">
            <input type="checkbox" name="soundEnabled" ${s.soundEnabled ? "checked" : ""} />
            Alerta sonora al superar la meta (mientras la app esté abierta)
          </label>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="test-sound">🔊 Probar sonido</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>

        <h2 class="section-title">🎯 Tus metas de ahorro</h2>
        <p class="muted-small">Ponle nombre a lo que quieres lograr (p. ej. "Cena con amigos") y cuánto necesitas ahorrar. Cuando lo alcances, te lo celebramos.</p>
        ${goals.length ? `
          <ul class="goal-list">
            ${goals.map((g) => {
              const p = LOGIC.goalProgress(g);
              const purpose = DATA.savingsPurposes.find((x) => x.id === g.purpose);
              return `
                <li class="goal-item ${g.achieved ? "is-achieved" : ""}">
                  <div class="goal-item-head">
                    <strong>${purpose ? purpose.icon : "🎯"} ${g.label}</strong>
                    <button class="icon-btn" data-action="remove-goal" data-id="${g.id}" aria-label="Eliminar meta">🗑️</button>
                  </div>
                  <div class="goal-photo-row">
                    ${g.photo ? `<img src="${g.photo}" class="goal-photo-thumb" alt="" />` : ""}
                    <label class="btn btn-ghost btn-sm" for="goal-photo-input-${g.id}">${g.photo ? "📷 Cambiar foto" : "📷 Añadir foto"}</label>
                    <input type="file" accept="image/*" id="goal-photo-input-${g.id}" data-action="goal-photo-input" data-id="${g.id}" hidden />
                  </div>
                  ${g.achieved
                    ? `<div class="goal-achieved-row"><span>✅ ¡Lograda!</span><button class="btn btn-primary btn-sm" data-action="share-goal" data-id="${g.id}">Compartir 📤</button></div>`
                    : `
                      <div class="progress-track"><div class="progress-fill" style="width:${p.pct}%"></div></div>
                      <p class="muted-small">${LOGIC.formatMoney(p.saved)} / ${LOGIC.formatMoney(g.targetAmount)}</p>
                    `}
                </li>`;
            }).join("")}
          </ul>
        ` : ""}
        <form id="goal-form" class="form">
          <label>¿Qué quieres lograr?
            <input type="text" name="label" placeholder="Ej. Cena con amigos" required />
          </label>
          <label>Propósito
            <select name="purpose">
              ${DATA.savingsPurposes.map((p) => `<option value="${p.id}">${p.icon} ${p.label}</option>`).join("")}
            </select>
          </label>
          <label>¿Cuánto necesitas ahorrar?
            <input type="number" name="targetAmount" min="0" step="0.01" placeholder="Ej. 50" required />
          </label>
          <button type="submit" class="btn btn-secondary btn-block">Añadir meta</button>
        </form>

        <h2 class="section-title">💌 Invitar</h2>
        <p class="muted-small">Comparte Hucha con alguien a quien aprecies, sin premios ni letra pequeña — solo una recomendación.</p>
        <button class="btn btn-secondary btn-block" data-action="invite">Invitar / recomendar</button>

        <h2 class="section-title">Categorías personalizadas</h2>
        <p class="muted-small">Las categorías por defecto (incluida "Compra de Productos Atomy") ya están disponibles. Añade las tuyas si te faltan.</p>
        <div class="custom-cat-list">
          ${custom.expense.concat(custom.income).map((c) => `
            <span class="chip">${c.icon} ${c.label} <button class="chip-x" data-action="remove-category" data-type="${custom.expense.includes(c) ? "expense" : "income"}" data-id="${c.id}" aria-label="Eliminar categoría">×</button></span>
          `).join("") || '<p class="muted-small">Todavía no has añadido categorías propias.</p>'}
        </div>
        <form id="category-form" class="sheet-add-row category-add-row">
          <select name="type">
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
          <input type="text" name="label" placeholder="Nombre de la categoría" required />
          <input type="text" name="icon" placeholder="Emoji (opcional)" maxlength="2" />
          <button type="submit" class="btn btn-primary btn-sm">Añadir categoría</button>
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
        <div class="card-head"><h1>Consejos para ahorrar</h1></div>
        <div class="tip-grid">
          ${DATA.tips.map((t) => `
            <div class="tip-card">
              <h3>${t.title}</h3>
              <p>${t.body}</p>
            </div>`).join("")}
        </div>

        <h2 class="section-title">🧮 Simulador 50/30/20</h2>
        <p class="muted-small">Escribe tu ingreso neto mensual y reparte automáticamente entre necesidades, estilo de vida y ahorro.</p>
        <div class="budget-sim">
          <label>Ingreso mensual neto
            <input type="number" id="sim-income" min="0" step="0.01" value="${simIncome}" placeholder="Ej. 2500" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>50% · Necesidades básicas</span>
              <strong id="sim-needs">${LOGIC.formatMoney(amounts.needs)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>30% · Estilo de vida</span>
              <strong id="sim-wants">${LOGIC.formatMoney(amounts.wants)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>20% · Ahorro y futuro</span>
              <strong id="sim-savings">${LOGIC.formatMoney(amounts.savings)}</strong>
            </div>
          </div>
          <ol class="budget-sim-steps">
            <li>Calcula tus ingresos netos reales: suma los sueldos fijos o el promedio de lo que entra a la cuenta cada mes.</li>
            <li>Automatiza el preahorro: nada más cobrar, transfiere el 20% a una cuenta separada. Si no lo ves en la cuenta principal, no lo gastas.</li>
            <li>Clasifica tus gastos en necesidades u ocio: revisa los movimientos del último mes para ajustar los límites de cada categoría.</li>
          </ol>
        </div>

        <h2 class="section-title">🏺 Sistema de los 6 frascos</h2>
        <p class="muted-small">Otra alternativa al 50/30/20 (método de T. Harv Eker): reparte el ingreso en 6 "frascos" con un propósito fijo cada uno, incluyendo educación y donación como categorías propias.</p>
        <div class="budget-sim">
          <label>Ingreso mensual neto
            <input type="number" id="jars-income" min="0" step="0.01" value="${simIncome}" placeholder="Ej. 2500" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>55% · Necesidades</span>
              <strong id="jars-necessities">${LOGIC.formatMoney(jarsAmounts.necessities)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>10% · Ocio ("Play")</span>
              <strong id="jars-play">${LOGIC.formatMoney(jarsAmounts.play)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>10% · Libertad financiera</span>
              <strong id="jars-freedom">${LOGIC.formatMoney(jarsAmounts.freedom)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--needs">
              <span>10% · Educación</span>
              <strong id="jars-education">${LOGIC.formatMoney(jarsAmounts.education)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>10% · Ahorro para grandes compras</span>
              <strong id="jars-longterm">${LOGIC.formatMoney(jarsAmounts.longTerm)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>5% · Donación</span>
              <strong id="jars-give">${LOGIC.formatMoney(jarsAmounts.give)}</strong>
            </div>
          </div>
          <p class="muted-small" style="margin:2px 0 0">Puedes usar el 50/30/20, los 6 frascos o el reparto por bloques de la compra: elige el que te resulte más fácil de mantener, no hace falta seguir los tres a la vez.</p>
        </div>

        <h2 class="section-title">🛒 Presupuesto de la compra por bloques</h2>
        <p class="muted-small">Escribe tu presupuesto mensual de alimentación y repártelo en fondo semanal, despensa y margen de ajuste; el fondo semanal se reparte a su vez por prioridad.</p>
        <div class="budget-sim">
          <label>Presupuesto mensual de alimentación
            <input type="number" id="grocery-budget-income" min="0" step="0.01" placeholder="Ej. 400" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>80% ÷ 4 · Fondo fijo semanal</span>
              <strong id="grocery-weekly">${LOGIC.formatMoney(groceryAmounts.weeklyFixed)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>15% · Despensa mensual</span>
              <strong id="grocery-pantry">${LOGIC.formatMoney(groceryAmounts.pantryFund)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>5% ÷ 4 · Margen de ajuste semanal</span>
              <strong id="grocery-margin">${LOGIC.formatMoney(groceryAmounts.weeklyMargin)}</strong>
            </div>
          </div>
          <p class="muted-small" style="margin:2px 0 0">El fondo fijo semanal, repartido por prioridad:</p>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>70% · Bloque 1: básicos imprescindibles</span>
              <strong id="grocery-block1">${LOGIC.formatMoney(groceryAmounts.block1)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--wants">
              <span>20% · Bloque 2: lácteos y complementos</span>
              <strong id="grocery-block2">${LOGIC.formatMoney(groceryAmounts.block2)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>10% · Bloque 3: opcionales (el primero en recortar)</span>
              <strong id="grocery-block3">${LOGIC.formatMoney(groceryAmounts.block3)}</strong>
            </div>
          </div>
          <ol class="budget-sim-steps">
            <li>Calcula el total estimado antes de ir al súper: apunta el precio aproximado junto a cada producto de tu lista.</li>
            <li>Ve sumando con la calculadora del móvil según metes cosas al carro; si al llegar al bloque 3 te pasas, deja los opcionales en la estantería.</li>
            <li>Compra primero los congelados y secos: así aseguras la base de tus comidas aunque a fin de mes vayas más justo.</li>
          </ol>
        </div>

        <h2 class="section-title">🧳 Presupuesto de viaje</h2>
        <p class="muted-small">Escribe el presupuesto total y los días de tu viaje para ver tu promedio diario y cuánto conviene reservar como colchón para imprevistos.</p>
        <div class="budget-sim">
          <label>Presupuesto total del viaje
            <input type="number" id="travel-budget-total" min="0" step="0.01" placeholder="Ej. 2000" />
          </label>
          <label>Días de viaje
            <input type="number" id="travel-budget-days" min="1" step="1" placeholder="Ej. 10" />
          </label>
          <div class="budget-sim-results">
            <div class="budget-sim-row budget-sim-row--needs">
              <span>Promedio diario disponible</span>
              <strong id="travel-daily">${LOGIC.formatMoney(travelAmounts.dailyAverage)}</strong>
            </div>
            <div class="budget-sim-row budget-sim-row--savings">
              <span>10-15% · Colchón para imprevistos</span>
              <strong id="travel-buffer">${LOGIC.formatMoney(travelAmounts.bufferLow)} - ${LOGIC.formatMoney(travelAmounts.bufferHigh)}</strong>
            </div>
          </div>
          <p class="muted-small" style="margin:2px 0 0">Con el resto: reserva antes los costes fijos (vuelos, alojamiento, seguro de viaje) y reparte lo que quede entre alimentación, movilidad local y ocio para cada día.</p>
        </div>

        <h2 class="section-title">🗺️ Ruta hacia el perfil Inversor</h2>
        <p class="muted-small">En la clase media, depender de un solo sueldo suele ser una trampa de vulnerabilidad: si los ingresos se detienen, todo se tambalea. La meta no es la privación, sino convertir parte del trabajo de hoy en un patrimonio que trabaje mañana.</p>
        <div class="triple-colchon">
          <div class="triple-colchon-row"><span>60-70%</span><small>Estilo de vida sin estrés</small></div>
          <div class="triple-colchon-row"><span>3-6 meses</span><small>Fondo de emergencia blindado</small></div>
          <div class="triple-colchon-row"><span>15-25%</span><small>Excedente convertido en activos</small></div>
        </div>
        <ol class="roadmap-steps">
          ${DATA.roadmapSteps.map((step, i) => {
            const n = i + 1;
            const isCurrent = settings.incomeExpenseProfileKey && LOGIC.roadmapStepFor(settings.incomeExpenseProfileKey) === n;
            return `
              <li class="roadmap-step ${isCurrent ? "is-current" : ""}">
                <div class="roadmap-step-head">
                  <strong>${n}. ${step.title}</strong>
                  ${isCurrent ? '<span class="roadmap-step-here">📍 Estás aquí</span>' : ""}
                </div>
                <p>${step.body}</p>
              </li>`;
          }).join("")}
        </ol>
        ${settings.incomeExpenseProfileKey && LOGIC.roadmapStepFor(settings.incomeExpenseProfileKey) === 5 ? `
          <p class="muted-small">🎉 Según tu diagnóstico, ¡ya estás en el nivel ideal! Sigue automatizando aportaciones y revisa tu situación una vez al año.</p>
        ` : ""}

        <h2 class="section-title">Opciones sencillas para invertir el excedente</h2>
        <div class="tip-grid">
          ${DATA.investingOptions.map((o) => `
            <div class="tip-card">
              <h3>${o.title}</h3>
              <p>${o.note}</p>
            </div>`).join("")}
        </div>
        <p class="muted-small">La fiscalidad y las opciones disponibles cambian según el país: revisa siempre la normativa y las comisiones de tu entidad antes de invertir.</p>

        <h2 class="section-title">Para profundizar: libros</h2>
        <ul class="resource-list">
          ${DATA.resources.books.map((b) => `<li><strong>${b.title}</strong>${b.author !== "—" ? " — " + b.author : ""}<br><span class="muted-small">${b.note}</span></li>`).join("")}
        </ul>

        <h2 class="section-title">Charlas recomendadas</h2>
        <ul class="resource-list">
          ${DATA.resources.talks.map((t) => `<li><strong>${t.title}</strong> — ${t.author}<br><span class="muted-small">${t.note}</span></li>`).join("")}
        </ul>

        <h2 class="section-title">Artículos usados como fuente</h2>
        <ul class="resource-list">
          ${DATA.resources.articles.map((a) => `<li><a href="${a.url}" target="_blank" rel="noopener noreferrer">${a.title}</a> <span class="muted-small">(${a.source})</span></li>`).join("")}
        </ul>

        ${DATA.resources.videos && DATA.resources.videos.length ? `
          <h2 class="section-title">Vídeos recomendados</h2>
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
    const periodLabel = { day: "Hoy", week: "Esta semana", month: "Este mes" };

    return `
      <section class="card">
        <div class="card-head"><h1>Resumen</h1></div>

        <div class="period-tabs">
          ${["day", "week", "month"].map((p) => `
            <button class="period-tab ${p === period ? "is-active" : ""}" data-period="${p}">${{ day: "Día", week: "Semana", month: "Mes" }[p]}</button>
          `).join("")}
        </div>

        <div class="period-total">
          <span class="muted-small">Gastado · ${periodLabel[period]}</span>
          <strong>${LOGIC.formatMoney(breakdown.total)}</strong>
        </div>

        ${breakdown.top ? `<p class="muted-small">📌 Lo que más gastas: <strong>${this.categoryLabel(breakdown.top.category)}</strong> (${LOGIC.formatMoney(breakdown.top.amount)}, ${Math.round(breakdown.top.pct)}%)</p>` : ""}

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
        ` : `<p class="muted">No hay gastos registrados en este periodo.</p>`}

        <h2 class="section-title">Racha de metas cumplidas</h2>

        ${streak > 0 ? (() => {
          const tier = LOGIC.streakTier(streak);
          const daysInTier = LOGIC.daysInCurrentTier(streak);
          return `
            <div class="tier-banner" style="background:linear-gradient(135deg, ${tier.from}, ${tier.to}); color:${tier.text}">
              <span class="tier-banner-emoji">${tier.emoji}</span>
              <div class="tier-banner-text">
                <strong>${daysInTier} ${daysInTier === 1 ? "día" : "días"} en el ${tier.label}</strong>
                <span>Racha total: ${streak} ${streak === 1 ? "día" : "días"} sin pasarte de tu meta</span>
              </div>
              <button class="btn btn-sm tier-banner-btn" data-action="share-tier">Compartir 📤</button>
            </div>`;
        })() : ""}

        <div class="streak-row">
          <div class="streak-box"><span class="streak-num">${streak}</span><span class="muted-small">Racha actual</span></div>
          <div class="streak-box"><span class="streak-num">${best}</span><span class="muted-small">Mejor racha</span></div>
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
                  ${d.met ? `<button class="btn btn-primary btn-sm" data-action="share-day" data-date="${date}">Compartir 📤</button>` : `<span class="muted-small">Sin logro</span>`}
                </li>`;
            }).join("")}
          </ul>
        ` : `<p class="muted">Todavía no has cerrado ningún día. Configura una meta y usa "Cerrar mi día" desde la pestaña Hoy.</p>`}
      </section>
    `;
  },

  // ================= CABLEADO DE EVENTOS POR VISTA =================
  wire(tab) {
    const view = document.getElementById("view");

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
            date: LOGIC.todayStr(),
            source: "manual"
          };
          STORE.addTransaction(tx);
          UI.closeModal();
          UI.toast(tx.type === "income" ? "Ingreso añadido" : "Gasto añadido");
          UI.render("hoy");
        });
      })
    );

    view.querySelectorAll('[data-action="delete-tx"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        if (confirm("¿Eliminar este movimiento?")) {
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
        UI.openModal(UI.planFormHTML("mañana", STORE.getPlan(tomorrow)));
        document.getElementById("plan-form").addEventListener("submit", (e) => {
          e.preventDefault();
          STORE.setPlan(tomorrow, new FormData(e.target).get("plan"));
          UI.closeModal();
          UI.toast("Plan guardado para mañana");
        });
      });
    }
    const editPlanBtn = view.querySelector('[data-action="edit-plan"]');
    if (editPlanBtn) {
      editPlanBtn.addEventListener("click", () => {
        const today = LOGIC.todayStr();
        UI.openModal(UI.planFormHTML("hoy", STORE.getPlan(today)));
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
        const text = "¡Hoy cumplí mi meta de gasto diario con Hucha! 🐷 Racha de " + LOGIC.currentStreak() + " día(s).";

        if (record.met) {
          AUDIO.playSuccess();
          UI.confettiBurst();
          const settings = STORE.getSettings();
          dataURL = SHARE.buildCardDataURL({
            date: record.date, goal: record.goal, spent: record.spent,
            streak: LOGIC.currentStreak(), userName: settings.userName
          });
          resultHTML = `
            <h2>🏆 ¡Meta cumplida!</h2>
            <img src="${dataURL}" alt="Tarjeta de logro" class="achievement-preview" />
            <button type="button" class="btn btn-primary btn-block" id="share-btn">Compartir 📤</button>`;
        } else {
          resultHTML = `
            <h2>📌 Día cerrado</h2>
            <p>Hoy superaste tu meta. ¡Mañana lo consigues! 💪</p>`;
        }

        UI.openModal(`
          ${resultHTML}
          <hr class="modal-divider" />
          <h3>🌙 Planifica mañana</h3>
          <form id="plan-form">
            <textarea name="plan" rows="3" placeholder="Ej. Llevar comida de casa">${existingPlan}</textarea>
            <div class="modal-actions">
              <button type="button" class="btn btn-ghost" data-close-modal>Cerrar</button>
              <button type="submit" class="btn btn-primary">Guardar plan</button>
            </div>
          </form>
        `);

        if (dataURL) {
          document.getElementById("share-btn").addEventListener("click", async () => {
            const result = await SHARE.shareCard(dataURL, text);
            if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
          });
        }
        document.getElementById("plan-form").addEventListener("submit", (e) => {
          e.preventDefault();
          STORE.setPlan(tomorrow, new FormData(e.target).get("plan"));
          UI.closeModal();
          UI.toast("Plan guardado para mañana");
          UI.render("hoy");
        });

        UI.render("hoy");

        // El cierre de día puede hacer que una meta con propósito también
        // se cumpla; se avisa con un toast para no chocar con este modal.
        LOGIC.checkGoalsAchieved().forEach((g) => {
          UI.toast("🎉 ¡Lograste tu meta \"" + g.label + "\"! Ve a Metas para compartirlo.");
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
        UI.toast("Fila añadida");
        UI.render("movimientos");
        UI.checkBudgetAlert();
      });
    }

    // ---- Cuentas ----
    view.querySelectorAll('[data-action="connect"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const bank = DATA.demoBanks.find((b) => b.id === btn.dataset.id);
        STORE.addAccount({ bankId: bank.id, name: bank.name, kind: bank.kind });
        UI.toast("Cuenta conectada (simulada)");
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
        UI.toast("Pago simulado: " + tx.description + " (" + LOGIC.formatMoney(tx.amount) + ")");
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
            UI.toast("No se pudo leer ningún movimiento de este archivo. Revisa el formato.", "warn");
            return;
          }
          UI.openCSVImportPreview(result);
        };
        reader.onerror = () => UI.toast("No se pudo leer el archivo.", "warn");
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
        UI.toast("Metas guardadas");
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
        UI.toast("Categoría añadida");
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
        UI.toast("Meta añadida");
        UI.render("metas");
      });
    }
    view.querySelectorAll('[data-action="remove-goal"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        if (confirm("¿Eliminar esta meta?")) {
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
          UI.toast("Foto añadida");
          UI.render("metas");
        } catch (e) {
          UI.toast("No se pudo cargar la foto");
        }
      })
    );
    view.querySelectorAll('[data-action="share-goal"]').forEach((btn) =>
      btn.addEventListener("click", async () => {
        const goal = STORE.getGoals().find((g) => g.id === btn.dataset.id);
        if (!goal) return;
        const settings = STORE.getSettings();
        const dataURL = await SHARE.buildGoalCardDataURL({ goal, userName: settings.userName });
        const text = "¡Logré \"" + goal.label + "\" ahorrando con Hucha! 🎉🐷";
        SHARE.shareCard(dataURL, text).then((result) => {
          if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
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
        SHARE.shareCard(dataURL, "¡Cumplí mi meta de gasto diario con Hucha! 🐷").then((result) => {
          if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
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
          if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
        });
      });
    }

    const inviteBtn = view.querySelector('[data-action="invite"]');
    if (inviteBtn) {
      inviteBtn.addEventListener("click", () => {
        const streak = LOGIC.currentStreak();
        SHARE.shareText(SHARE.inviteText(streak)).then((result) => {
          if (result === "copied") UI.toast("Mensaje copiado, ¡ya puedes pegarlo donde quieras!");
        });
      });
    }
  }
};
