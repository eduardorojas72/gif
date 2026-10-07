// Lógica del test: estado, navegación entre preguntas, diagnóstico de
// concienciación y envío de las respuestas por WhatsApp. Sin frameworks,
// sin backend: todo vive en memoria del navegador y se pierde al recargar.

// Número de WhatsApp por defecto, en formato internacional sin "+" ni
// espacios (país + número). Ahora mismo asume España (+34).
const DEFAULT_WHATSAPP_NUMBER = "34635151252";

// Cada persona del equipo puede compartir su propio enlace añadiendo
// ?wa=<su número> para que quien haga el test le escriba a ella.
function resolveWhatsappNumber() {
  const override = new URLSearchParams(window.location.search).get("wa");
  if (!override) return DEFAULT_WHATSAPP_NUMBER;
  const digits = override.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : DEFAULT_WHATSAPP_NUMBER;
}

const WHATSAPP_NUMBER = resolveWhatsappNumber();

const APP = {
  step: -1, // -1 = portada, 0..N-1 = preguntas, N = resultado
  answers: {},

  totalSteps() {
    return DATA.questions.length;
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

  advance() {
    if (this.step >= this.totalSteps() - 1) {
      this.step = this.totalSteps(); // pantalla de resultado
    } else {
      this.step += 1;
    }
    this.render();
  },

  answerAndNext(id, value) {
    this.answers[id] = value;
    this.advance();
  },

  restart() {
    this.step = -1;
    this.answers = {};
    this.render();
  },

  optionLabel(q, value) {
    const opt = (q.options || []).find((o) => o.value === value);
    return opt ? opt.label : value;
  },

  // ---------- Diagnóstico de concienciación (pantalla de resultado) ----------
  riskScore() {
    const a = this.answers;
    let score = 0;
    if (a.usualDetergent === "comercialConvencional" || a.usualDetergent === "noSeguro") score += 1;
    if (a.readsLabel === "aVeces") score += 1;
    if (a.readsLabel === "nunca") score += 2;
    if (a.skinReaction === "algunaVez") score += 1;
    if (a.skinReaction === "frecuente") score += 2;
    if (a.doseUsage === "masDeLaDosis" || a.doseUsage === "noMido") score += 1;
    if (a.environmentConcern === "algoSi") score += 1;
    if (a.environmentConcern === "noLoHabiaPensado") score += 2;
    return score;
  },

  concernFlags() {
    const a = this.answers;
    const flags = [];
    if (a.skinReaction === "frecuente" || a.skinReaction === "algunaVez") {
      flags.push("Ya has notado irritación o alergia en la piel con ropa recién lavada.");
    }
    if (a.readsLabel !== "siempre") {
      flags.push("No sueles revisar qué ingredientes lleva tu detergente.");
    }
    if (a.doseUsage === "masDeLaDosis" || a.doseUsage === "noMido") {
      flags.push("Podrías estar usando más detergente del necesario, y gastando de más.");
    }
    if (a.environmentConcern !== "muchoSi") {
      flags.push("El impacto ambiental de los químicos que van al agua pasa un poco desapercibido.");
    }
    return flags;
  },

  buildArchetype() {
    const score = this.riskScore();
    const key = score >= 6 ? "alto" : score >= 3 ? "medio" : "bajo";
    return DATA.archetypes.find((x) => x.key === key) || DATA.archetypes[DATA.archetypes.length - 1];
  },

  // ---------- Resumen completo para WhatsApp ----------
  buildSummaryLines() {
    return DATA.questions.map((q) => {
      const raw = this.answers[q.id];
      const value = raw != null ? this.optionLabel(q, raw) : "-";
      return (q.summaryLabel || q.question) + ": " + value;
    });
  },

  whatsappLink() {
    const lines = this.buildSummaryLines();
    const text = "Hola, acabo de hacer el test de lavado consciente y me gustaría recibir información sobre la alternativa más saludable, económica y sostenible. Aquí van mis respuestas:\n\n"
      + lines.join("\n");
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
      root.innerHTML = this.resultHTML();
    }
    this.wire();
    window.scrollTo(0, 0);
  },

  introHTML() {
    return `
      <section class="card intro-card">
        <span class="intro-emoji">🫧</span>
        <h1>¿Tu lavado es tan seguro como crees?</h1>
        <p class="muted">Un test rápido (menos de 2 minutos) sobre lo que realmente hay en tu detergente, y cómo afecta a tu piel, tu bolsillo y el medio ambiente.</p>
        <p class="muted-small">No es un anuncio: es un diagnóstico de conciencia. Al final te contamos qué alternativas existen.</p>
        <button class="btn btn-primary btn-block" id="start-btn">Empezar el test</button>
      </section>`;
  },

  questionHTML(q, i) {
    const pct = Math.round((i / this.totalSteps()) * 100);
    const controlHTML = `
      <div class="choice-grid">
        ${q.options.map((o) => `<button class="choice-btn" data-value="${o.value}">${o.label}</button>`).join("")}
      </div>`;
    return `
      <section class="card">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <p class="q-count">Pregunta ${i + 1} de ${this.totalSteps()}</p>
        <h1>${q.question}</h1>
        ${controlHTML}
        <button type="button" class="btn btn-ghost btn-block" id="back-btn">Atrás</button>
      </section>`;
  },

  resultHTML() {
    const archetype = this.buildArchetype();
    const flags = this.concernFlags();
    return `
      <section class="card result-card">
        <p class="result-kicker">Tu diagnóstico</p>
        <h1>${archetype.title}</h1>
        <p>${archetype.body}</p>

        ${flags.length ? `
        <ul class="flags-list">
          ${flags.map((f) => `<li>${f}</li>`).join("")}
        </ul>` : ""}

        <hr class="divider" />

        <p class="muted-small">Existen alternativas que cuidan de ti, de tu bolsillo y del planeta:</p>
        <div class="benefit-grid">
          ${DATA.benefits.map((b) => `
            <div class="benefit-card">
              <span class="benefit-icon">${b.icon}</span>
              <p class="benefit-title">${b.title}</p>
              <p class="benefit-text">${b.text}</p>
            </div>`).join("")}
        </div>

        <hr class="divider" />

        <p class="muted-small">🔒 Tus respuestas solo se envían a este WhatsApp, no se guardan en ningún servidor.</p>
        <a class="btn btn-whatsapp btn-block" id="whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer">🫧 Quiero conocer la alternativa</a>

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

    if (this.step >= 0 && this.step < this.totalSteps()) {
      const q = DATA.questions[this.step];
      document.querySelectorAll(".choice-btn").forEach((btn) =>
        btn.addEventListener("click", () => this.answerAndNext(q.id, btn.dataset.value))
      );
    }

    const waBtn = document.getElementById("whatsapp-btn");
    if (waBtn) waBtn.href = this.whatsappLink();
  }
};

APP.render();
