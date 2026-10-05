// Lógica del test: estado, navegación entre preguntas (algunas
// condicionales), diagnóstico breve y envío de las respuestas completas
// por WhatsApp. Sin frameworks, sin backend: todo vive en memoria del
// navegador y se pierde al recargar.

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
  step: -1, // -1 = portada, 0..N-1 = preguntas visibles, N = resultado
  answers: {},
  multiSelection: null, // Set en curso para la pregunta "multi" activa

  // Algunas preguntas (maquillaje) solo aparecen según respuestas previas.
  visibleQuestions() {
    return DATA.questions.filter((q) => !q.showIf || q.showIf(this.answers));
  },

  totalSteps() {
    return this.visibleQuestions().length;
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

  // ---------- Diagnóstico breve (pantalla de resultado) ----------
  buildDiagnosis() {
    const a = this.answers;
    const skinTypeQ = DATA.questions.find((q) => q.id === "skinType");
    const skinTypeOpt = (skinTypeQ.options || []).find((o) => o.value === a.skinType);
    const skinTypeLabel = (skinTypeOpt && skinTypeOpt.shortLabel) || this.optionLabel(skinTypeQ, a.skinType) || "";
    const concernsQ = DATA.questions.find((q) => q.id === "concerns");
    const concernValues = Array.isArray(a.concerns) ? a.concerns : [];
    const concernLabels = concernValues.map((v) => this.optionLabel(concernsQ, v).toLowerCase());
    const concernsText = concernLabels.length ? concernLabels.join(", ") : "varios aspectos de tu piel";
    return { skinTypeLabel, concernsText };
  },

  // ---------- Resumen completo para WhatsApp ----------
  buildSummaryLines() {
    return this.visibleQuestions().map((q) => {
      const raw = this.answers[q.id];
      let value;
      if (q.type === "multi") {
        const vals = Array.isArray(raw) ? raw : [];
        value = vals.length ? vals.map((v) => this.optionLabel(q, v)).join(", ") : "Ninguna";
      } else if (q.type === "choice") {
        value = raw != null ? this.optionLabel(q, raw) : "-";
      } else if (q.type === "number") {
        value = raw ? raw + (q.unit ? " " + q.unit : "") : "-";
      } else {
        value = raw || "-";
      }
      return (q.summaryLabel || q.question) + ": " + value;
    });
  },

  whatsappLink() {
    const lines = this.buildSummaryLines();
    const text = "Hola, acabo de hacer el test de piel y me gustaría recibir una recomendación personalizada. Aquí van mis respuestas:\n\n"
      + lines.join("\n");
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  },

  // ---------- Render ----------
  render() {
    const root = document.getElementById("view");
    if (this.step === -1) {
      root.innerHTML = this.introHTML();
    } else if (this.step < this.totalSteps()) {
      root.innerHTML = this.questionHTML(this.visibleQuestions()[this.step], this.step);
    } else {
      root.innerHTML = this.resultHTML();
    }
    this.wire();
    window.scrollTo(0, 0);
  },

  introHTML() {
    return `
      <section class="card intro-card">
        <span class="intro-emoji">🧴</span>
        <h1>¿Cómo está tu piel?</h1>
        <p class="muted">Un test rápido para conocer tu tipo de piel y tus hábitos de cuidado actuales, y así poder darte una recomendación que se ajuste a ti.</p>
        <p class="muted-small">Esto es solo un diagnóstico: no te dice qué hacer, solo nos ayuda a entender tu caso antes de hablar contigo.</p>
        <button class="btn btn-primary btn-block" id="start-btn">Empezar el test</button>
      </section>`;
  },

  numberFieldHTML(q, savedValue) {
    return `
      <form id="number-form" class="number-form">
        <label class="number-field">
          <input type="number" name="${q.id}" min="0" step="1" placeholder="${q.placeholder || ""}" value="${savedValue != null ? savedValue : ""}" autofocus />
        </label>
        <button type="submit" class="btn btn-primary btn-block">Continuar</button>
      </form>`;
  },

  multiFieldHTML(q, savedValues) {
    const selected = new Set(Array.isArray(savedValues) ? savedValues : []);
    return `
      <div class="multi-grid" id="multi-grid">
        ${q.options.map((o) => `<button type="button" class="multi-btn${selected.has(o.value) ? " selected" : ""}" data-value="${o.value}">${o.label}</button>`).join("")}
      </div>
      <button type="button" class="btn btn-primary btn-block" id="multi-continue-btn" ${selected.size ? "" : "disabled"}>Continuar</button>`;
  },

  questionHTML(q, i) {
    const pct = Math.round((i / this.totalSteps()) * 100);
    let controlHTML = "";
    if (q.type === "choice") {
      const hasImages = q.options.some((o) => o.image);
      controlHTML = `
        <div class="choice-grid${hasImages ? " choice-grid-photo" : ""}">
          ${q.options.map((o) => `
            <button class="choice-btn${o.image ? " choice-btn-photo" : ""}" data-value="${o.value}">
              ${o.image ? `<img src="${o.image}" alt="" class="choice-btn-img" />` : ""}
              <span>${o.label}</span>
            </button>`).join("")}
        </div>`;
    } else if (q.type === "number") {
      controlHTML = this.numberFieldHTML(q, this.answers[q.id]);
    } else if (q.type === "multi") {
      controlHTML = this.multiFieldHTML(q, this.answers[q.id]);
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

  resultHTML() {
    const { skinTypeLabel, concernsText } = this.buildDiagnosis();
    return `
      <section class="card result-card">
        <span class="result-emoji">🧴</span>
        <p class="result-kicker">Tu diagnóstico</p>
        <h1>Piel ${skinTypeLabel.toLowerCase()}</h1>
        <p>Según tus respuestas, tus focos principales son: <strong>${concernsText}</strong>. Antes de recomendarte algo, prefiero verlo contigo.</p>

        <hr class="divider" />

        <p class="muted-small">🔒 Tus respuestas solo se envían a este WhatsApp, no se guardan en ningún servidor.</p>
        <a class="btn btn-whatsapp btn-block" id="whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer">💆 Recibir mi recomendación personalizada</a>

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

    const q = this.step >= 0 && this.step < this.totalSteps() ? this.visibleQuestions()[this.step] : null;

    if (q && q.type === "choice") {
      document.querySelectorAll(".choice-btn").forEach((btn) =>
        btn.addEventListener("click", () => this.answerAndNext(q.id, btn.dataset.value))
      );
    }

    if (q && q.type === "number") {
      const form = document.getElementById("number-form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const value = new FormData(form).get(q.id);
          if (!value) return;
          this.answerAndNext(q.id, value);
        });
      }
    }

    if (q && q.type === "multi") {
      const grid = document.getElementById("multi-grid");
      const continueBtn = document.getElementById("multi-continue-btn");
      const selected = new Set(Array.isArray(this.answers[q.id]) ? this.answers[q.id] : []);
      if (grid) {
        grid.querySelectorAll(".multi-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const value = btn.dataset.value;
            if (selected.has(value)) {
              selected.delete(value);
              btn.classList.remove("selected");
            } else {
              selected.add(value);
              btn.classList.add("selected");
            }
            continueBtn.disabled = selected.size === 0;
          });
        });
      }
      if (continueBtn) {
        continueBtn.addEventListener("click", () => this.answerAndNext(q.id, Array.from(selected)));
      }
    }

    const waBtn = document.getElementById("whatsapp-btn");
    if (waBtn) waBtn.href = this.whatsappLink();
  }
};

APP.render();
