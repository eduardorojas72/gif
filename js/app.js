/* ---------------------------------------------------------------
   CONTROLADOR DE LA APP — estado, render loop, eventos
--------------------------------------------------------------- */

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

function waHref(numero) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Hola, tengo una duda sobre mi recorrido en Cumbre 90");
}

function waHrefPersonal(numero, nombre) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Hola" + (nombre ? " " + nombre : "") + "! ¿Cómo estás?");
}

const App = {
  state: null,
  ui: {
    view: "welcome",
    menuOpen: false,
    activeDay: null,
    activeQuincena: null,
    bellOpen: false,
    celebracionRango: null,
    confirmReset: false,
    onboardingFoto: null,
    contactoDraft: null,
    contactoEditId: null,
    contactoFiltro: "todos",
    confirmDeleteContacto: null,
  },
  saveTimer: null,
  toastTimer: null,
  confettiTimer: null,

  init() {
    const raw = Storage.load();
    let st;
    if (raw) {
      const rh = calcularRacha(raw.racha, raw.ultimaFecha);
      st = hydrateState(raw);
      st.racha = rh.racha;
      st.ultimaFecha = rh.ultimaFecha;
    } else {
      st = defaultState();
    }
    this.state = st;
    if (st.onboarded) this.ui.view = "home";
    applyTheme(st.dark);
    this.bindEvents();
    this.render();
    this.notifyReminders();
    registerServiceWorker();
  },

  notifyReminders() {
    if (!("Notification" in window)) return;
    if (!this.state.notifOn || Notification.permission !== "granted") return;
    const hoy = hoyISO();
    if (this.state.notifUltimoAviso === hoy) return;
    const reminders = getReminders(this.state);
    if (!reminders.length) return;
    this.state.notifUltimoAviso = hoy;
    this.persist(true);
    try {
      const primero = reminders[0];
      new Notification("Cumbre 90 — Recordatorio", {
        body: reminders.length > 1 ? primero.text + " (+" + (reminders.length - 1) + " más)" : primero.text,
      });
    } catch (e) {
      /* algunos navegadores restringen Notification fuera de un gesto del usuario: se ignora */
    }
  },

  persist(immediate) {
    if (immediate) {
      Storage.save(this.state);
      return;
    }
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => Storage.save(this.state), 300);
  },

  addActividad(texto) {
    this.state.actividad = [{ texto, fecha: hoyISO() }].concat(this.state.actividad).slice(0, 8);
  },

  showToast(msg) {
    clearTimeout(this.toastTimer);
    const slot = document.getElementById("toast-slot");
    slot.innerHTML = '<div class="toast">' + Icon("check", { size: 16, color: "var(--success)" }) + "<span>" + escapeHtml(msg) + "</span></div>";
    this.toastTimer = setTimeout(() => { slot.innerHTML = ""; }, 2200);
  },

  celebrate() {
    const slot = document.getElementById("confetti-slot");
    const colors = ["var(--accent)", "var(--success)", "var(--gold)", "var(--warn)"];
    let html = "";
    for (let i = 0; i < 30; i++) {
      const left = (Math.random() * 100).toFixed(1);
      const color = colors[i % colors.length];
      const delay = (Math.random() * 0.25).toFixed(2);
      const duration = (1.1 + Math.random() * 0.7).toFixed(2);
      const rotate = Math.round(Math.random() * 360);
      html += '<span class="confetti-piece" style="left:' + left + "%;background:" + color + ";animation-delay:" + delay + "s;animation-duration:" + duration + "s;transform:rotate(" + rotate + 'deg)"></span>';
    }
    slot.innerHTML = '<div class="confetti-layer">' + html + "</div>";
    clearTimeout(this.confettiTimer);
    this.confettiTimer = setTimeout(() => { slot.innerHTML = ""; }, 1900);
  },

  render() {
    const state = this.state, ui = this.ui;
    const isAuth = ui.view !== "welcome" && ui.view !== "onboarding";

    document.getElementById("sidebar-slot").innerHTML = isAuth ? renderSidebar(ui) : "";
    document.getElementById("header-slot").innerHTML = isAuth ? renderHeader(state, ui) : "";
    document.getElementById("fab-slot").innerHTML = isAuth
      ? '<a class="fab-whatsapp" href="' + waHref(state.whatsapp) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 24, color: "#fff" }) + "</a>"
      : "";
    document.getElementById("app-root").classList.toggle("has-sidebar", isAuth);

    let mainHtml = "";
    switch (ui.view) {
      case "welcome": mainHtml = renderWelcome(); break;
      case "onboarding": mainHtml = renderOnboarding(ui); break;
      case "home": mainHtml = renderHome(state); break;
      case "pasos": mainHtml = renderPasos(); break;
      case "contactos": mainHtml = renderContactos(state, ui); break;
      case "plan6": mainHtml = ui.activeDay ? renderDiaDetalle(state, ui.activeDay) : renderPathMap(state); break;
      case "plan90": mainHtml = ui.activeQuincena ? renderQuincenaDetalle(state, ui.activeQuincena) : renderPlan90(state); break;
      case "premios": mainHtml = renderPremios(state); break;
      case "perfil": mainHtml = renderPerfil(state); break;
      case "logros": mainHtml = renderLogros(state); break;
      case "cumbre": mainHtml = renderCumbre(state); break;
      case "ajustes": mainHtml = renderAjustes(state, ui); break;
      default: mainHtml = renderHome(state);
    }
    const container = document.getElementById("view-container");
    container.className = "view-container" + (isAuth ? " view-stack" : "");
    container.innerHTML = mainHtml;

    document.getElementById("menu-slot").innerHTML = renderMenuSheet(ui);

    let modalHtml = "";
    if (ui.celebracionRango !== null) modalHtml = renderCelebracionModal(ui.celebracionRango, state);
    else if (ui.contactoDraft) modalHtml = renderContactoModal(ui);
    else if (ui.bellOpen) modalHtml = renderBellPanel(state);
    document.getElementById("modal-slot").innerHTML = modalHtml;

    if (ui.view === "onboarding") this.wireOnboardingName();
  },

  wireOnboardingName() {
    const input = document.getElementById("onboarding-name-input");
    const btn = document.getElementById("onboarding-submit");
    if (!input || !btn) return;
    const sync = () => {
      const has = input.value.trim().length > 0;
      btn.disabled = !has;
      btn.style.opacity = has ? "1" : ".55";
    };
    input.addEventListener("input", sync);
    sync();
  },

  bindEvents() {
    const root = document.getElementById("app-root");

    root.addEventListener("click", (e) => {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      const arg = el.dataset.arg;
      const handler = Actions[action];
      if (handler) handler(arg, el);
    });

    // campos de texto (data-field): actualizan estado sin re-render, para no perder el foco
    root.addEventListener("input", (e) => {
      const el = e.target;
      if (el.dataset && el.dataset.field) {
        let value = el.value;
        if (el.dataset.field === "whatsapp") {
          value = value.replace(/[^0-9]/g, "");
          if (el.value !== value) el.value = value;
        }
        setPath(this.state, el.dataset.field, value);
        this.persist();
      } else if (el.dataset && el.dataset.draftField && this.ui.contactoDraft) {
        // formulario de contacto (App.ui.contactoDraft): tampoco re-renderiza, para no perder el foco
        setPath(this.ui.contactoDraft, el.dataset.draftField, el.value);
      } else if (el.id === "contacto-search") {
        // filtro de búsqueda de contactos: se aplica directo al DOM, sin pasar por render()
        const q = el.value.trim().toLowerCase();
        document.querySelectorAll(".contact-row").forEach((row) => {
          const match = !q || (row.dataset.search || "").indexOf(q) !== -1;
          row.classList.toggle("hidden", !match);
        });
      }
    });

    // montaña hero (Plan de 6 días): revelado tipo "linterna" que sigue al cursor
    root.addEventListener("pointermove", (e) => {
      const hero = e.target.closest && e.target.closest(".hero-mountain");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty("--mx", (x - 170) + "px");
      hero.style.setProperty("--my", (y - 170) + "px");
      hero.classList.add("hm-active");
    });
    root.addEventListener("pointerout", (e) => {
      const hero = e.target.closest && e.target.closest(".hero-mountain");
      if (!hero || hero.contains(e.relatedTarget)) return;
      hero.style.removeProperty("--mx");
      hero.style.removeProperty("--my");
      hero.classList.remove("hm-active");
    });

    // inputs de archivo (fotos): data-target apunta a una ruta del estado, o al prefijo especial __onboardingFoto
    root.addEventListener("change", (e) => {
      const el = e.target;
      if (el.tagName === "SELECT" && el.dataset && el.dataset.draftField && this.ui.contactoDraft) {
        setPath(this.ui.contactoDraft, el.dataset.draftField, el.value);
        return;
      }
      if (el.type === "file" && el.dataset && el.dataset.target) {
        const file = el.files && el.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const target = el.dataset.target;
          if (target === "__onboardingFoto") {
            this.ui.onboardingFoto = reader.result;
          } else {
            setPath(this.state, target, reader.result);
            this.persist(true);
          }
          this.render();
        };
        reader.readAsDataURL(file);
      }
    });
  },
};

const Actions = {
  "start-app": function () {
    App.ui.view = App.state.onboarded ? "home" : "onboarding";
    App.render();
  },

  "trigger-file": function (arg) {
    const el = document.getElementById(arg);
    if (el) el.click();
  },

  "finish-onboarding": function () {
    const input = document.getElementById("onboarding-name-input");
    const nombre = input ? input.value.trim() : "";
    if (!nombre) return;
    const rh = calcularRacha(0, null);
    App.state.nombre = nombre;
    App.state.foto = App.ui.onboardingFoto;
    App.state.onboarded = true;
    App.state.racha = rh.racha;
    App.state.ultimaFecha = rh.ultimaFecha;
    App.ui.view = "home";
    App.persist(true);
    App.render();
  },

  "toggle-dark": function () {
    App.state.dark = !App.state.dark;
    applyTheme(App.state.dark);
    App.persist();
    App.render();
  },

  "open-menu": function () { App.ui.menuOpen = true; App.render(); },
  "close-menu": function () { App.ui.menuOpen = false; App.render(); },

  "goto": function (arg) {
    App.ui.activeDay = null;
    App.ui.view = arg;
    App.ui.menuOpen = false;
    App.ui.confirmReset = false;
    App.render();
    const c = document.getElementById("view-container");
    if (c) c.scrollTop = 0;
    window.scrollTo(0, 0);
  },

  "open-day": function (arg) { App.ui.activeDay = Number(arg); App.render(); },
  "back-to-map": function () { App.ui.activeDay = null; App.render(); },

  "answer-quiz": function (arg, el) {
    const dayId = Number(el.dataset.day);
    const idx = Number(arg);
    const dia = DIAS.find((d) => d.id === dayId);
    const est = App.state.dias[dayId];
    est.quizSel = idx;
    if (idx === dia.quiz.correcta) est.quizOk = true;
    App.persist(true);
    App.render();
  },

  "toggle-check": function (arg, el) {
    const dayId = Number(el.dataset.day);
    const idx = Number(arg);
    const est = App.state.dias[dayId];
    est.checks[idx] = !est.checks[idx];
    App.persist(true);
    App.render();
  },

  "finish-day": function (arg) {
    const dayId = Number(arg);
    const est = App.state.dias[dayId];
    if (est.done) return;
    est.done = true;
    App.addActividad("Completaste la Etapa: " + DIAS.find((d) => d.id === dayId).etapa);
    App.celebrate();
    App.persist(true);
    App.render();
  },

  "share-day": function (arg) {
    downloadDiaCard(App.state, Number(arg));
    App.showToast("Tarjeta lista para compartir ✨");
  },

  "open-quincena": function (arg) { App.ui.activeQuincena = Number(arg); App.render(); },
  "back-to-quincenas": function () { App.ui.activeQuincena = null; App.render(); },

  "toggle-semana-check": function (arg, el) {
    const weekN = Number(el.dataset.week);
    const idx = Number(arg);
    const est = App.state.semanas[weekN];
    est.checks[idx] = !est.checks[idx];
    App.persist(true);
    App.render();
  },

  "finish-semana": function (arg) {
    const weekN = Number(arg);
    const est = App.state.semanas[weekN];
    if (est.done) return;
    est.done = true;
    const semana = SEMANAS.find((s) => s.n === weekN);
    App.addActividad("Completaste la Semana " + weekN + " (" + semana.paso + ")");
    App.celebrate();

    const q = QUINCENAS.find((qq) => qq.n === semana.q);
    const semanasQ = SEMANAS.filter((s) => s.q === q.n);
    const quincenaCompleta = semanasQ.every((s) => App.state.semanas[s.n].done);
    if (quincenaCompleta) {
      App.addActividad("Conquistaste el Campamento: " + q.nombre);
      const totalCompletas = QUINCENAS.filter((qq2) => {
        const sqs = SEMANAS.filter((s) => s.q === qq2.n);
        return sqs.every((s) => App.state.semanas[s.n].done);
      }).length;
      if (totalCompletas === QUINCENAS.length && !App.state.codigoCumbre) {
        App.state.codigoCumbre = "C90-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      }
    }
    App.persist(true);
    App.render();
  },

  "set-rango": function (arg) {
    const i = Number(arg);
    const avanza = i > App.state.rangoIndex;
    App.state.rangoIndex = i;
    if (avanza) {
      App.celebrate();
      App.ui.celebracionRango = i;
      App.addActividad("Alcanzaste el rango: " + RANGOS[i].nombre);
    }
    App.persist(true);
    App.render();
  },

  "download-recog-card": function () { downloadRecogCard(App.state); },
  "download-cert": function () { downloadCertificado(App.state); },

  "toggle-mentor": function () {
    App.state.mentorMode = !App.state.mentorMode;
    App.persist();
    App.render();
  },

  "toggle-notif": function () {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      App.state.notifOn = !App.state.notifOn;
      App.persist();
      App.render();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((perm) => {
        App.state.notifOn = perm === "granted";
        App.persist();
        App.render();
      });
    } else {
      App.showToast("Activa los permisos de notificación desde los ajustes de tu navegador.");
    }
  },

  "reset-progress": function () {
    if (!App.ui.confirmReset) {
      App.ui.confirmReset = true;
      App.render();
      return;
    }
    Storage.clear();
    App.state = defaultState();
    App.ui.confirmReset = false;
    App.ui.activeDay = null;
    App.ui.onboardingFoto = null;
    App.ui.view = "welcome";
    App.showToast("Progreso reiniciado");
    App.render();
  },

  "open-bell": function () { App.ui.bellOpen = true; App.render(); },
  "close-modal": function () { App.ui.bellOpen = false; App.ui.celebracionRango = null; App.render(); },
  "close-celebracion-ver": function () {
    App.ui.celebracionRango = null;
    App.ui.view = "perfil";
    App.render();
  },

  "add-contacto": function () {
    App.ui.contactoDraft = { nombre: "", telefono: "", pais: "", nivel: "Tibio", estado: "Por contactar", notas: "", notaSeguimiento: "", proximoSeguimiento: null };
    App.ui.contactoEditId = null;
    App.render();
  },

  "edit-contacto": function (arg) {
    const c = App.state.contactos.find((x) => x.id === arg);
    if (!c) return;
    App.ui.contactoDraft = Object.assign({}, c);
    App.ui.contactoEditId = arg;
    App.ui.confirmDeleteContacto = null;
    App.render();
  },

  "cancel-contacto": function () {
    App.ui.contactoDraft = null;
    App.ui.contactoEditId = null;
    App.ui.confirmDeleteContacto = null;
    App.render();
  },

  "save-contacto": function () {
    const d = App.ui.contactoDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    if (App.ui.contactoEditId) {
      const idx = App.state.contactos.findIndex((x) => x.id === App.ui.contactoEditId);
      if (idx !== -1) App.state.contactos[idx] = Object.assign({}, App.state.contactos[idx], d);
    } else {
      App.state.contactos.push(Object.assign({ id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), creado: hoyISO() }, d));
    }
    App.ui.contactoDraft = null;
    App.ui.contactoEditId = null;
    App.persist(true);
    App.showToast("Contacto guardado");
    App.render();
  },

  "delete-contacto": function (arg) {
    if (App.ui.confirmDeleteContacto !== arg) {
      App.ui.confirmDeleteContacto = arg;
      App.render();
      return;
    }
    App.state.contactos = App.state.contactos.filter((x) => x.id !== arg);
    App.ui.confirmDeleteContacto = null;
    App.ui.contactoDraft = null;
    App.ui.contactoEditId = null;
    App.persist(true);
    App.showToast("Contacto eliminado");
    App.render();
  },

  "quick-seguimiento": function (arg, el) {
    const dias = Number(el.dataset.days);
    const c = App.state.contactos.find((x) => x.id === arg);
    if (!c) return;
    c.proximoSeguimiento = addDiasISO(hoyISO(), dias);
    App.persist(true);
    App.showToast("Seguimiento programado");
    App.render();
  },

  "quick-draft-seguimiento": function (arg) {
    if (!App.ui.contactoDraft) return;
    App.ui.contactoDraft.proximoSeguimiento = addDiasISO(hoyISO(), Number(arg));
    App.render();
  },

  "filter-contactos": function (arg) {
    App.ui.contactoFiltro = arg;
    App.render();
  },
};

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
}

document.addEventListener("DOMContentLoaded", () => App.init());
