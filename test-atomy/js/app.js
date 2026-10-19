// Lógica del test: estado, navegación entre preguntas (algunas
// condicionales según la pregunta clave), mensaje de resultado y envío
// de las respuestas por WhatsApp. Sin frameworks, sin backend: todo vive
// en memoria del navegador y se pierde al recargar.

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

// Nombre de quien recibe el mensaje (para el saludo "Hola, Eduardo...").
// Cada socio puede personalizarlo con ?name=<su nombre> en el enlace.
const DEFAULT_GREETER_NAME = "Eduardo";
function resolveGreeterName() {
  const override = new URLSearchParams(window.location.search).get("name");
  return override ? override.trim() : DEFAULT_GREETER_NAME;
}

const GREETER_NAME = resolveGreeterName();

const APP = {
  step: -1, // -1 = portada, 0..N-1 = preguntas visibles, N = resultado
  answers: {},

  // Algunas preguntas (6 y 7) solo aparecen según la respuesta a la
  // pregunta clave (interest).
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

  // ---------- Mensaje de resultado (según la pregunta clave) ----------
  buildArchetype() {
    const key = this.answers.interest;
    return DATA.archetypes[key] || DATA.archetypes.conocerMas;
  },

  // ---------- Resumen completo para WhatsApp ----------
  buildSummaryLines() {
    return this.visibleQuestions().filter((q) => q.id !== "wantsToReceive").map((q) => {
      const raw = this.answers[q.id];
      let value;
      if (q.type === "multi") {
        const vals = Array.isArray(raw) ? raw : [];
        value = vals.length ? vals.map((v) => this.optionLabel(q, v)).join(", ") : "Ninguna";
      } else {
        value = raw != null ? this.optionLabel(q, raw) : "-";
      }
      return (q.summaryLabel || q.question) + ": " + value;
    });
  },

  whatsappLink() {
    const lines = this.buildSummaryLines();
    const wants = this.answers.wantsToReceive;
    const greeting = DATA.receiveGreetings[wants] || DATA.defaultReceiveGreeting;
    const text = "Hola, " + GREETER_NAME + ", " + greeting + " Aquí van mis respuestas:\n\n" + lines.join("\n");
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
        <span class="intro-emoji">🛍️</span>
        <h1>¿Qué tanto cuidas tu día a día?</h1>
        <p class="muted">Un test rápido (menos de 2 minutos) sobre tus hábitos de cuidado diario: cosmética, higiene, hogar, café y bienestar.</p>
        <button class="btn btn-primary btn-block" id="start-btn">Empezar</button>
      </section>`;
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
    const controlHTML = q.type === "multi"
      ? this.multiFieldHTML(q, this.answers[q.id])
      : `
      <div class="choice-grid">
        ${q.options.map((o) => `<button class="choice-btn" data-value="${o.value}">${o.label}</button>`).join("")}
      </div>`;
    return `
      <section class="card">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <p class="q-count">${q.kicker || "Pregunta " + (i + 1) + " de " + this.totalSteps()}</p>
        ${q.intro ? `<p class="muted">${q.intro}</p>` : ""}
        <h1>${q.question}</h1>
        ${q.hint ? `<p class="muted-small">${q.hint}</p>` : ""}
        ${controlHTML}
        <button type="button" class="btn btn-ghost btn-block" id="back-btn">Atrás</button>
      </section>`;
  },

  resultHTML() {
    const archetype = this.buildArchetype();
    return `
      <section class="card result-card">
        <p class="result-kicker">Tu resultado</p>
        <h1>${archetype.title}</h1>
        <p>${archetype.body}</p>

        <hr class="divider" />

        <p class="muted-small">🔒 Tus respuestas solo se envían a este WhatsApp, no se guardan en ningún servidor.</p>
        <a class="btn btn-whatsapp btn-block" id="whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer">💬 Cuéntame más</a>

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

    if (q && q.type === "multi") {
      const grid = document.getElementById("multi-grid");
      const continueBtn = document.getElementById("multi-continue-btn");
      const selected = new Set(Array.isArray(this.answers[q.id]) ? this.answers[q.id] : []);
      const maxSelect = q.maxSelect || Infinity;

      const updateCapState = () => {
        if (!grid) return;
        grid.querySelectorAll(".multi-btn").forEach((btn) => {
          const isSelected = selected.has(btn.dataset.value);
          btn.classList.toggle("multi-btn-capped", !isSelected && selected.size >= maxSelect);
        });
      };

      if (grid) {
        updateCapState();
        grid.querySelectorAll(".multi-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const value = btn.dataset.value;
            if (selected.has(value)) {
              selected.delete(value);
              btn.classList.remove("selected");
            } else {
              if (selected.size >= maxSelect) return;
              selected.add(value);
              btn.classList.add("selected");
            }
            continueBtn.disabled = selected.size === 0;
            updateCapState();
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
