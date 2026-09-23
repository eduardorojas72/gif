// Lógica del test: estado, navegación entre preguntas, cálculo del
// perfil de resultado y construcción del enlace de WhatsApp final.
// Sin frameworks, sin backend: todo vive en memoria del navegador.

// Sustituye este número por el tuyo en formato internacional sin "+" ni
// espacios (país + número). Ahora mismo asume España (+34).
const WHATSAPP_NUMBER = "34635151252";

const APP = {
  step: -1, // -1 = portada, 0..N-1 = preguntas, N = resultado
  answers: {},

  totalSteps() {
    return DATA.questions.length;
  },

  formatMoney(n) {
    const v = Number(n) || 0;
    return v.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";
  },

  start() {
    this.step = 0;
    this.answers = {};
    this.render();
  },

  back() {
    if (this.step <= 0) {
      this.step = -1;
    } else {
      this.step -= 1;
    }
    this.render();
  },

  answerAndNext(id, value) {
    this.answers[id] = value;
    if (this.step >= this.totalSteps() - 1) {
      this.step = this.totalSteps(); // pantalla de resultado
    } else {
      this.step += 1;
    }
    this.render();
  },

  restart() {
    this.step = -1;
    this.answers = {};
    this.render();
  },

  // ---------- Cálculo del perfil (solo diagnóstico) ----------
  computeProfile() {
    const a = this.answers;
    const income = Number(a.income) || 0;
    const expenses = Number(a.expenses) || 0;
    const savings = Number(a.savings) || 0;
    const margin = income - expenses;
    const ratio = income ? expenses / income : 0;
    const savingsRate = income ? savings / income : 0;
    const singleIncome = a.incomeSources === "one";
    const noBuffer = a.emergencyFund === "none" || a.emergencyFund === "less1";
    const worksALot = a.workHours === "high" || a.workHours === "veryhigh";
    const lowSatisfaction = Number(a.satisfaction) <= 2;
    const worriedDebt = a.debt === "yes";

    let key;
    if (ratio >= 1 || worriedDebt) {
      key = "rojos";
    } else if (ratio >= 0.9 && noBuffer) {
      key = "limite";
    } else if (worksALot && singleIncome && lowSatisfaction) {
      key = "hamster";
    } else if (savingsRate > 0 && singleIncome) {
      key = "ahorra_dependiente";
    } else {
      key = "solido";
    }

    const profile = DATA.profiles.find((p) => p.key === key) || DATA.profiles[0];
    return Object.assign({ income, expenses, savings, margin, ratio, savingsRate, singleIncome }, profile);
  },

  whatsappLink(profile) {
    const text = "Hola, acabo de hacer el test «Cómo está tu economía» y mi resultado fue: "
      + profile.label + ". Me gustaría saber más.";
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  },

  // ---------- Render ----------
  render() {
    const root = document.getElementById("view");
    if (this.step === -1) {
      root.innerHTML = this.introHTML();
    } else if (this.step < this.totalSteps()) {
      root.innerHTML = this.questionHTML(DATA.questions[this.step], this.step);
    } else {
      root.innerHTML = this.resultHTML(this.computeProfile());
    }
    this.wire();
    window.scrollTo(0, 0);
  },

  introHTML() {
    return `
      <section class="card intro-card">
        <span class="intro-emoji">🧭</span>
        <h1>¿Cómo está tu economía?</h1>
        <p class="muted">Un test rápido (2 minutos) para ver con claridad tu situación económica actual: cuánto margen tienes, cuánto dependes de un solo ingreso y qué tan preparado/a estás ante un imprevisto.</p>
        <p class="muted-small">Esto es solo un diagnóstico: no te dice qué hacer con tu dinero, solo te ayuda a verlo con claridad.</p>
        <button class="btn btn-primary btn-block" id="start-btn">Empezar el test</button>
      </section>`;
  },

  questionHTML(q, i) {
    const pct = Math.round(((i) / this.totalSteps()) * 100);
    let controlHTML = "";
    if (q.type === "number") {
      controlHTML = `
        <form id="q-form" class="q-form">
          <input type="number" name="value" min="0" step="1" placeholder="${q.placeholder || ""}" required autofocus />
          <button type="submit" class="btn btn-primary btn-block">Continuar</button>
        </form>`;
    } else if (q.type === "choice") {
      controlHTML = `
        <div class="choice-grid">
          ${q.options.map((o) => `<button class="choice-btn" data-value="${o.value}">${o.label}</button>`).join("")}
        </div>`;
    } else if (q.type === "scale") {
      const nums = [];
      for (let n = q.min; n <= q.max; n++) nums.push(n);
      controlHTML = `
        <div class="scale-grid">
          ${nums.map((n) => `<button class="scale-btn" data-value="${n}">${n}</button>`).join("")}
        </div>`;
    }
    return `
      <section class="card">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <p class="q-count">Pregunta ${i + 1} de ${this.totalSteps()}</p>
        <h1>${q.question}</h1>
        ${q.hint ? `<p class="muted-small">${q.hint}</p>` : ""}
        ${controlHTML}
        <button type="button" class="btn btn-ghost btn-block" id="back-btn">Atrás</button>
      </section>`;
  },

  resultHTML(p) {
    return `
      <section class="card result-card">
        <span class="result-emoji">${p.emoji}</span>
        <p class="result-kicker">Tu situación económica</p>
        <h1>${p.label}</h1>
        <p class="result-risk">Riesgo: <strong>${p.risk}</strong></p>
        <p>${p.description}</p>

        <div class="result-stats">
          <div class="result-stat">
            <span class="muted-small">Margen mensual</span>
            <strong class="${p.margin < 0 ? "text-danger" : "text-ok"}">${p.margin >= 0 ? "+" : ""}${this.formatMoney(p.margin)}</strong>
          </div>
          <div class="result-stat">
            <span class="muted-small">Fuentes de ingreso</span>
            <strong>${p.singleIncome ? "1 (única)" : "2 o más"}</strong>
          </div>
        </div>

        <hr class="divider" />

        <div class="cta-card">
          <p class="cta-title">💬 ¿Te gustaría conocer una forma de generar un ingreso extra, compatible con lo que ya haces?</p>
          <p class="muted-small">Sin compromiso: cuéntame tu caso por WhatsApp y hablamos.</p>
          <a class="btn btn-whatsapp btn-block" id="whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer">📲 Hablar por WhatsApp</a>
        </div>

        <button type="button" class="btn btn-ghost btn-block" id="restart-btn">Repetir el test</button>
      </section>`;
  },

  wire() {
    const startBtn = document.getElementById("start-btn");
    if (startBtn) startBtn.addEventListener("click", () => this.start());

    const backBtn = document.getElementById("back-btn");
    if (backBtn) backBtn.addEventListener("click", () => this.back());

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) restartBtn.addEventListener("click", () => this.restart());

    const q = DATA.questions[this.step];
    if (q && q.type === "number") {
      const form = document.getElementById("q-form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const value = new FormData(form).get("value");
          this.answerAndNext(q.id, value);
        });
      }
    }
    document.querySelectorAll(".choice-btn").forEach((btn) =>
      btn.addEventListener("click", () => this.answerAndNext(q.id, btn.dataset.value))
    );
    document.querySelectorAll(".scale-btn").forEach((btn) =>
      btn.addEventListener("click", () => this.answerAndNext(q.id, btn.dataset.value))
    );

    const waBtn = document.getElementById("whatsapp-btn");
    if (waBtn) waBtn.href = this.whatsappLink(this.computeProfile());
  }
};

APP.render();
