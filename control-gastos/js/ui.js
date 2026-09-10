// Renderizado de las vistas y manejo de eventos. Sin frameworks: cada vista
// se vuelve a pintar por completo en #view y los listeners se re-enganchan.
const UI = {
  currentTab: "hoy",

  categoriesFor(type) {
    return type === "income" ? DATA.incomeCategories : DATA.expenseCategories;
  },

  categoryLabel(id) {
    const all = DATA.expenseCategories.concat(DATA.incomeCategories);
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
      logros: this.renderLogros
    };
    view.innerHTML = (renderers[this.currentTab] || this.renderHoy).call(this);
    this.wire(this.currentTab);
    this.checkBudgetAlert();
  },

  // ---------- Vista: Hoy ----------
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

    return `
      <section class="card">
        <div class="card-head">
          <h1>Hoy</h1>
          <span class="muted">${new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>

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

        <div class="quick-actions">
          <button class="btn btn-expense" data-action="add" data-type="expense" ${dayClosed ? "disabled" : ""}>➖ Añadir gasto</button>
          <button class="btn btn-income" data-action="add" data-type="income" ${dayClosed ? "disabled" : ""}>➕ Añadir ingreso</button>
        </div>

        ${income ? `<p class="muted-small">Ingresos de hoy: <strong>${LOGIC.formatMoney(income)}</strong></p>` : ""}

        ${dayClosed
          ? `<div class="day-closed-banner ${dayClosed.met ? "is-good" : "is-bad"}">
               ${dayClosed.met ? "✅ Cerraste el día dentro de tu meta." : "📌 Cerraste el día por encima de tu meta."}
             </div>`
          : goal
            ? `<button class="btn btn-secondary btn-block" data-action="close-day">🌙 Cerrar mi día de hoy</button>`
            : ""
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

  // ---------- Vista: Movimientos (hoja de cálculo) ----------
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
                  <td>${t.source === "linked" ? "🔗 Enlazado" : "✍️ Manual"}</td>
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

  // ---------- Vista: Cuentas (enlace simulado) ----------
  renderCuentas() {
    const accounts = STORE.getAccounts();
    const connectedIds = new Set(accounts.map((a) => a.bankId));

    return `
      <section class="card">
        <div class="card-head"><h1>Cuentas</h1></div>
        <div class="notice">
          <strong>Esto es una simulación.</strong> Para capturar de verdad los pagos con tarjeta o móvil en cuanto ocurren
          hace falta integrar un proveedor de Open Banking (por ejemplo Plaid o Tink) con tu consentimiento explícito y una
          cuenta de desarrollador. Aquí puedes probar cómo se vería: "conecta" un banco de demostración y simula pagos
          para ver cómo aparecen automáticamente en Movimientos.
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
      </section>
    `;
  },

  // ---------- Vista: Metas ----------
  renderMetas() {
    const s = STORE.getSettings();
    return `
      <section class="card">
        <div class="card-head"><h1>Metas y alertas</h1></div>
        <form id="settings-form" class="form">
          <label>Tu nombre (para las tarjetas de logro)
            <input type="text" name="userName" value="${s.userName || ""}" placeholder="Opcional" />
          </label>
          <label>Moneda
            <select name="currency">
              ${["EUR", "USD", "MXN", "GBP"].map((c) => `<option value="${c}" ${c === s.currency ? "selected" : ""}>${c}</option>`).join("")}
            </select>
          </label>
          <label>Meta de gasto diario
            <input type="number" name="dailyGoal" min="0" step="0.01" value="${s.dailyGoal || ""}" placeholder="Ej. 25" required />
          </label>
          <label class="toggle-row">
            <input type="checkbox" name="soundEnabled" ${s.soundEnabled ? "checked" : ""} />
            Alerta sonora al superar la meta
          </label>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="test-sound">🔊 Probar sonido</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </section>
    `;
  },

  // ---------- Vista: Consejos ----------
  renderConsejos() {
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
      </section>
    `;
  },

  // ---------- Vista: Logros ----------
  renderLogros() {
    const days = STORE.getDays();
    const dates = Object.keys(days).sort().reverse();
    const streak = LOGIC.currentStreak();
    const best = LOGIC.bestStreak();

    return `
      <section class="card">
        <div class="card-head"><h1>Logros</h1></div>
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

  // ---------- Cableado de eventos por vista ----------
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

    const closeDayBtn = view.querySelector('[data-action="close-day"]');
    if (closeDayBtn) {
      closeDayBtn.addEventListener("click", () => {
        const record = LOGIC.closeDay(LOGIC.todayStr());
        if (!record) return;
        if (record.met) {
          AUDIO.playSuccess();
          UI.confettiBurst();
          const settings = STORE.getSettings();
          const dataURL = SHARE.buildCardDataURL({
            date: record.date, goal: record.goal, spent: record.spent,
            streak: LOGIC.currentStreak(), userName: settings.userName
          });
          const text = "¡Hoy cumplí mi meta de gasto diario con Control de Gastos! 💪 Racha de " + LOGIC.currentStreak() + " día(s).";
          UI.openModal(`
            <h2>🏆 ¡Meta cumplida!</h2>
            <img src="${dataURL}" alt="Tarjeta de logro" class="achievement-preview" />
            <div class="modal-actions">
              <button type="button" class="btn btn-ghost" data-close-modal>Cerrar</button>
              <button type="button" class="btn btn-primary" id="share-btn">Compartir 📤</button>
            </div>
          `);
          document.getElementById("share-btn").addEventListener("click", async () => {
            const result = await SHARE.shareCard(dataURL, text);
            if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
          });
        } else {
          UI.toast("Hoy superaste tu meta. ¡Mañana lo consigues! 💪", "warn");
        }
        UI.render("hoy");
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

    // ---- Metas ----
    const settingsForm = view.querySelector("#settings-form");
    if (settingsForm) {
      settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        STORE.saveSettings({
          userName: fd.get("userName") || "",
          currency: fd.get("currency"),
          dailyGoal: parseFloat(fd.get("dailyGoal")) || null,
          soundEnabled: fd.get("soundEnabled") === "on"
        });
        UI.toast("Metas guardadas");
        UI.render("hoy");
      });
      const testSound = view.querySelector("#test-sound");
      testSound.addEventListener("click", () => AUDIO.playAlert());
    }

    // ---- Logros ----
    view.querySelectorAll('[data-action="share-day"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const date = btn.dataset.date;
        const d = STORE.getDays()[date];
        const settings = STORE.getSettings();
        const dataURL = SHARE.buildCardDataURL({
          date: d.date, goal: d.goal, spent: d.spent, streak: LOGIC.currentStreak(), userName: settings.userName
        });
        SHARE.shareCard(dataURL, "¡Cumplí mi meta de gasto diario con Control de Gastos! 💪").then((result) => {
          if (result === "downloaded") UI.toast("Imagen descargada, ¡ya puedes compartirla!");
        });
      })
    );
  }
};
