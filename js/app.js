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

function shareTextForLogro(titulo) {
  return "🏆 ¡He conseguido el logro de \"" + titulo + "\" en mi recorrido hacia Sales Master con Atomy! 🚀 Si tienes curiosidad, pregúntame de qué se trata.";
}

function shareLogroLinksHTML(titulo) {
  const text = shareTextForLogro(titulo);
  const url = typeof window !== "undefined" && window.location ? window.location.href : "";
  const enc = encodeURIComponent(text + (url ? " " + url : ""));
  const waUrl = "https://wa.me/?text=" + enc;
  const fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url || "https://atomy.com") + "&quote=" + encodeURIComponent(text);
  const xUrl = "https://twitter.com/intent/tweet?text=" + enc;
  const nativeBtn = '<button class="share-chip" data-action="share-logro-native" data-arg="' + escapeHtml(titulo) + '">' + Icon("share2", { size: 15 }) + "<span>Compartir</span></button>";
  return (
    '<div class="share-chip-row">' +
    nativeBtn +
    '<a class="share-chip" href="' + waUrl + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "<span>WhatsApp</span></a>" +
    '<a class="share-chip" href="' + fbUrl + '" target="_blank" rel="noreferrer">' + Icon("users", { size: 15 }) + "<span>Facebook</span></a>" +
    '<a class="share-chip" href="' + xUrl + '" target="_blank" rel="noreferrer">' + Icon("hash", { size: 15 }) + "<span>X</span></a>" +
    '<button class="share-chip" data-action="share-logro-copy" data-arg="' + escapeHtml(titulo) + '">' + Icon("copy", { size: 15 }) + "<span>Copiar</span></button>" +
    "</div>"
  );
}

const App = {
  state: null,
  ui: {
    view: "welcome",
    menuOpen: false,
    activeDay: null,
    activeQuincena: null,
    bellOpen: false,
    logro: null,
    confirmReset: false,
    onboardingFoto: null,
    contactoDraft: null,
    contactoEditId: null,
    contactoFiltro: "todos",
    confirmDeleteContacto: null,
    pasosVueltos: {},
    lemaVueltos: {},
    carteleraOpen: false,
    bucketListOpen: false,
    agendaDia: null,
    actividadDraft: null,
    actividadEditId: null,
    confirmDeleteActividad: null,
    zoomDraft: null,
    zoomEditId: null,
    confirmDeleteZoom: null,
    calculadoraAbierta: false,
    agenda6Draft: null,
    calculadoraBusqueda: "",
    historialAbierto: false,
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
    this.checkAgendaAlarmas();
    setInterval(() => this.checkAgendaAlarmas(), 30000);
    registerServiceWorker();
  },

  checkAgendaAlarmas() {
    if (!("Notification" in window) || Notification.permission !== "granted" || !this.state.notifOn) return;
    const now = new Date();
    const hoy = hoyISO();
    const dia = this.state.agenda[diaSemanaHoyId()];
    if (!dia) return;

    const revisar = (item, titulo, cuerpo) => {
      if (!item.recordar || !item.hora || item.ultimoAviso === hoy) return;
      const [hh, mm] = item.hora.split(":").map(Number);
      if (Number.isNaN(hh) || Number.isNaN(mm)) return;
      const objetivo = new Date(now);
      objetivo.setHours(hh, mm, 0, 0);
      objetivo.setMinutes(objetivo.getMinutes() - (Number(item.recordarMin) || 0));
      const diffMs = now - objetivo;
      if (diffMs < 0 || diffMs >= 5 * 60000) return;
      try {
        new Notification(titulo, { body: cuerpo });
      } catch (e) {
        /* algunos navegadores restringen Notification fuera de un gesto del usuario: se ignora */
      }
      item.ultimoAviso = hoy;
      this.persist(true);
    };

    (dia.actividades || []).forEach((a) => {
      const tipo = agendaTipoInfo(a.tipo);
      revisar(a, "Cumbre 90 — " + tipo.label, a.nota || "Tienes esto programado a las " + a.hora + ".");
    });
    (dia.zooms || []).forEach((z) => {
      revisar(z, "Cumbre 90 — Zoom: " + (z.titulo || "Reunión"), "Empieza a las " + z.hora + ".");
    });
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
      case "escenario": mainHtml = renderEscenarioVida(state, ui); break;
      case "agenda": mainHtml = renderAgenda(state, ui); break;
      case "informe": mainHtml = renderInformeSemanal(state, ui); break;
      case "pasos": mainHtml = renderPasos(state, ui); break;
      case "lema": mainHtml = renderLema(state, ui); break;
      case "contactos": mainHtml = renderContactos(state, ui); break;
      case "plan6": mainHtml = ui.activeDay ? renderDiaDetalle(state, ui.activeDay) : renderPathMap(state); break;
      case "plan90":
        if (ui.activeQuincena) {
          getComprasQuincena(state, ui.activeQuincena);
          getCatalogoProductos(state, state.pais || "CO");
          mainHtml = renderQuincenaDetalle(state, ui, ui.activeQuincena);
        } else {
          mainHtml = renderPlan90(state);
        }
        break;
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
    if (ui.logro) modalHtml = renderLogroModal(state, ui);
    else if (ui.contactoDraft) modalHtml = renderContactoModal(ui);
    else if (ui.agenda6Draft) modalHtml = renderAgenda6Modal(ui);
    else if (ui.actividadDraft) modalHtml = renderActividadModal(ui);
    else if (ui.zoomDraft) modalHtml = renderZoomModal(ui);
    else if (ui.carteleraOpen) modalHtml = renderCarteleraModal();
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
      } else if (el.dataset && el.dataset.draftField && (this.ui.contactoDraft || this.ui.actividadDraft || this.ui.zoomDraft)) {
        // formularios con borrador (contacto / actividad de agenda / zoom): tampoco re-renderizan, para no perder el foco
        const draft = this.ui.contactoDraft || this.ui.actividadDraft || this.ui.zoomDraft;
        setPath(draft, el.dataset.draftField, el.value);
      } else if (el.id === "contacto-search") {
        // filtro de búsqueda de contactos: se aplica directo al DOM, sin pasar por render()
        const q = el.value.trim().toLowerCase();
        document.querySelectorAll(".contact-row").forEach((row) => {
          const match = !q || (row.dataset.search || "").indexOf(q) !== -1;
          row.classList.toggle("hidden", !match);
        });
      } else if (el.id === "calculadora-search") {
        // filtro de búsqueda de productos: se aplica directo al DOM, sin pasar por render()
        const q = el.value.trim().toLowerCase();
        document.querySelectorAll(".producto-row").forEach((row) => {
          const match = !q || (row.dataset.search || "").indexOf(q) !== -1;
          row.classList.toggle("hidden", !match);
        });
      } else if (el.dataset && el.dataset.agenda6Hora != null && this.ui.agenda6Draft) {
        const i = Number(el.dataset.agenda6Hora);
        this.ui.agenda6Draft.dias[i] = this.ui.agenda6Draft.dias[i] || { hora: "" };
        this.ui.agenda6Draft.dias[i].hora = el.value;
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
      if (el.tagName === "INPUT" && el.dataset && el.dataset.field && (el.dataset.field.indexOf("comprasQuincena.") === 0 || el.dataset.field.indexOf("catalogoProductos.") === 0)) {
        // recalcula los totales de la calculadora de productos al salir del campo (no en cada tecla, para no perder el foco)
        this.render();
        return;
      }
      if (el.tagName === "SELECT" && el.dataset && el.dataset.draftField && (this.ui.contactoDraft || this.ui.actividadDraft || this.ui.zoomDraft)) {
        const draft = this.ui.contactoDraft || this.ui.actividadDraft || this.ui.zoomDraft;
        setPath(draft, el.dataset.draftField, el.value);
        if (draft === this.ui.contactoDraft && el.dataset.draftField === "estado" && el.value === "Primer Pedido") {
          if (!draft.notaSeguimiento || !draft.notaSeguimiento.trim()) draft.notaSeguimiento = PRIMER_PEDIDO_NOTA;
          if (!draft.proximoSeguimiento) draft.proximoSeguimiento = addDiasISO(hoyISO(), 3);
          this.render();
        }
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
    const dia = DIAS.find((d) => d.id === dayId);
    App.addActividad("Completaste la Etapa: " + dia.etapa);
    App.celebrate();
    App.ui.logro = { titulo: dia.etapa, sub: "Etapa " + dia.id + " del Plan de Arranque — 6 Días conquistada.", tipo: "generic" };
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
      const premio = App.state.premios[q.n - 1];
      let sub = "Campamento del Plan de 90 Días conquistado.";
      if (premio) sub += " Desbloqueaste el premio: " + premio.premio + ".";
      App.ui.logro = { titulo: q.nombre, sub: sub, tipo: "generic" };

      const totalCompletas = QUINCENAS.filter((qq2) => {
        const sqs = SEMANAS.filter((s) => s.q === qq2.n);
        return sqs.every((s) => App.state.semanas[s.n].done);
      }).length;
      if (totalCompletas === QUINCENAS.length && !App.state.codigoCumbre) {
        App.state.codigoCumbre = "C90-" + Math.random().toString(36).slice(2, 8).toUpperCase();
        App.ui.logro = { titulo: "Cumbre 90 — Sales Master", sub: "¡Completaste las 6 quincenas del Plan de 90 Días!", tipo: "cumbre" };
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
      App.ui.logro = { titulo: RANGOS[i].nombre, sub: "Nuevo rango alcanzado en Atomy.", tipo: "rango", rangoIndex: i };
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
  "close-modal": function () { App.ui.bellOpen = false; App.ui.logro = null; App.ui.carteleraOpen = false; App.render(); },
  "open-cartelera": function () { App.ui.carteleraOpen = true; App.render(); },

  "toggle-bucket-list": function () {
    App.ui.bucketListOpen = !App.ui.bucketListOpen;
    App.render();
  },

  "toggle-bucket-cumplido": function (arg) {
    const item = App.state.bucketList[Number(arg)];
    if (!item) return;
    item.cumplido = !item.cumplido;
    App.persist(true);
    App.render();
  },

  "set-lema-foco": function (arg) {
    const n = Number(arg);
    if (App.state.lemaFoco.pilar !== n) {
      App.state.lemaFoco = { pilar: n, racha: 0, ultimaFecha: null };
    }
    App.persist(true);
    App.render();
  },

  "marcar-lema-hoy": function () {
    const foco = App.state.lemaFoco;
    if (!foco || foco.pilar == null) return;
    const hoy = hoyISO();
    if (foco.ultimaFecha === hoy) return;
    const rh = calcularRacha(foco.racha, foco.ultimaFecha);
    foco.racha = rh.racha;
    foco.ultimaFecha = rh.ultimaFecha;
    const pilar = LEMA_ATOMY.pilares.find((p) => p.n === foco.pilar);
    if (foco.racha === 7) {
      App.showToast("¡1 semana seguida viviendo “" + pilar.t + "”! 🔥");
    } else if (foco.racha === 21) {
      App.celebrate();
      App.ui.logro = { titulo: pilar.t, sub: "21 días seguidos — ya es un hábito.", tipo: "generic" };
      App.addActividad("Convertiste “" + pilar.t + "” en un hábito de 21 días.");
    }
    App.persist(true);
    App.render();
  },
  "close-logro-action": function () {
    const logro = App.ui.logro;
    App.ui.logro = null;
    if (logro && logro.tipo === "rango") App.ui.view = "perfil";
    else if (logro && logro.tipo === "cumbre") App.ui.view = "cumbre";
    App.render();
  },

  "share-logro-native": function (arg) {
    const text = shareTextForLogro(arg);
    if (navigator.share) {
      navigator.share({ title: "Cumbre 90", text: text, url: window.location.href }).catch(() => {});
    } else {
      Actions["share-logro-copy"](arg);
    }
  },

  "share-logro-copy": function (arg) {
    const text = shareTextForLogro(arg) + " " + window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => App.showToast("Mensaje copiado — ¡pégalo donde quieras!"),
        () => App.showToast("No se pudo copiar el mensaje")
      );
    } else {
      App.showToast("No se pudo copiar el mensaje");
    }
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
    let estadoAnterior = null;
    if (App.ui.contactoEditId) {
      const idx = App.state.contactos.findIndex((x) => x.id === App.ui.contactoEditId);
      if (idx !== -1) {
        estadoAnterior = App.state.contactos[idx].estado;
        App.state.contactos[idx] = Object.assign({}, App.state.contactos[idx], d);
      }
    } else {
      App.state.contactos.push(Object.assign({ id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), creado: hoyISO() }, d));
    }
    const nombreRegistrado = d.nombre.trim();
    const quedoComoSocio = d.estado === "Socio" && estadoAnterior !== "Socio";
    App.ui.contactoDraft = null;
    App.ui.contactoEditId = null;
    App.persist(true);
    App.showToast("Contacto guardado");
    if (quedoComoSocio) {
      App.ui.agenda6Draft = { contactoNombre: nombreRegistrado, dias: Array.from({ length: 6 }, () => ({ hora: "" })) };
    }
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

  "cancel-agenda6": function () {
    App.ui.agenda6Draft = null;
    App.render();
  },

  "save-agenda6": function () {
    const d = App.ui.agenda6Draft;
    if (!d) return;
    const mapDow = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    for (let i = 0; i < 6; i++) {
      const fecha = new Date(Date.now() + i * 86400000);
      const weekdayId = mapDow[fecha.getDay()];
      const diaInfo = DIAS.find((x) => x.id === i + 1);
      if (!App.state.agenda[weekdayId]) App.state.agenda[weekdayId] = emptyAgendaDia();
      const hora = (d.dias[i] && d.dias[i].hora) || "";
      App.state.agenda[weekdayId].actividades.push(
        Object.assign(nuevaActividadAgenda(), {
          tipo: "plan6",
          hora: hora,
          nota: "Día " + (i + 1) + " — " + diaInfo.titulo + " — con " + d.contactoNombre,
          recordar: !!hora,
          recordarMin: 10,
        })
      );
    }
    App.ui.agenda6Draft = null;
    App.persist(true);
    App.showToast("Agenda del Plan de 6 Días creada con " + d.contactoNombre);
    App.render();
  },

  "flip-paso": function (arg) {
    App.ui.pasosVueltos[arg] = !App.ui.pasosVueltos[arg];
    App.render();
  },

  "toggle-paso-check": function (arg, el) {
    const n = Number(el.dataset.paso);
    const i = Number(arg);
    const est = App.state.pasos[n];
    if (!est) return;
    est.checks[i] = !est.checks[i];
    App.persist(true);
    App.render();
  },

  "share-paso-reflexion": function (arg) {
    const texto = String(arg || "");
    if (navigator.share) {
      navigator.share({ title: "Cumbre 90", text: texto }).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(
        () => App.showToast("Reflexión copiada — ¡pégala donde quieras!"),
        () => App.showToast("No se pudo copiar el texto")
      );
    } else {
      App.showToast("No se pudo copiar el texto");
    }
  },

  "flip-lema": function (arg) {
    App.ui.lemaVueltos[arg] = !App.ui.lemaVueltos[arg];
    App.render();
  },

  "set-escenario-avance": function (arg, el) {
    const catId = el.dataset.cat;
    const lvl = Number(arg);
    const entry = App.state.escenarioVida[catId];
    if (!entry) return;
    entry.avance = entry.avance === lvl ? lvl - 1 : lvl;

    const completo = ESCENARIO_CATEGORIAS.every((c) => App.state.escenarioVida[c.id].avance === 4);
    if (completo && !App.state.escenarioCompletado) {
      App.state.escenarioCompletado = true;
      App.celebrate();
      App.ui.logro = { titulo: "Escenario de Vida", sub: "Uniste los 8 puntos en un círculo perfecto — ya tienes claro tu “por qué”.", tipo: "generic" };
      App.addActividad("Completaste tu Escenario de Vida — ¡círculo perfecto!");
    } else if (!completo) {
      App.state.escenarioCompletado = false;
    }
    App.persist(true);
    App.render();
  },

  "set-agenda-dia": function (arg) {
    App.ui.agendaDia = arg;
    App.render();
  },

  "add-actividad": function (arg) {
    App.ui.actividadDraft = Object.assign(nuevaActividadAgenda(), { dia: arg });
    App.ui.actividadEditId = null;
    App.render();
  },

  "edit-actividad": function (arg, el) {
    const dia = el.dataset.dia;
    const a = (App.state.agenda[dia].actividades || []).find((x) => x.id === arg);
    if (!a) return;
    App.ui.actividadDraft = Object.assign({}, a, { dia: dia });
    App.ui.actividadEditId = arg;
    App.ui.confirmDeleteActividad = null;
    App.render();
  },

  "cancel-actividad": function () {
    App.ui.actividadDraft = null;
    App.ui.actividadEditId = null;
    App.ui.confirmDeleteActividad = null;
    App.render();
  },

  "save-actividad": function () {
    const d = App.ui.actividadDraft;
    if (!d) return;
    const dia = App.state.agenda[d.dia];
    if (App.ui.actividadEditId) {
      const idx = dia.actividades.findIndex((x) => x.id === App.ui.actividadEditId);
      if (idx !== -1) dia.actividades[idx] = Object.assign({}, dia.actividades[idx], d);
    } else {
      dia.actividades.push(Object.assign(nuevaActividadAgenda(), d));
    }
    App.ui.actividadDraft = null;
    App.ui.actividadEditId = null;
    App.persist(true);
    App.showToast("Actividad guardada");
    App.render();
  },

  "delete-actividad": function (arg, el) {
    if (App.ui.confirmDeleteActividad !== arg) {
      App.ui.confirmDeleteActividad = arg;
      App.render();
      return;
    }
    const dia = App.state.agenda[el.dataset.dia];
    dia.actividades = dia.actividades.filter((x) => x.id !== arg);
    App.ui.confirmDeleteActividad = null;
    App.ui.actividadDraft = null;
    App.ui.actividadEditId = null;
    App.persist(true);
    App.showToast("Actividad eliminada");
    App.render();
  },

  "toggle-actividad-hecha": function (arg, el) {
    const dia = App.state.agenda[el.dataset.dia];
    const a = (dia.actividades || []).find((x) => x.id === arg);
    if (!a) return;
    a.hecha = !a.hecha;
    App.persist(true);
    App.render();
  },

  "add-zoom": function (arg) {
    App.ui.zoomDraft = Object.assign(nuevoZoomAgenda(), { dia: arg });
    App.ui.zoomEditId = null;
    App.render();
  },

  "edit-zoom": function (arg, el) {
    const dia = el.dataset.dia;
    const z = (App.state.agenda[dia].zooms || []).find((x) => x.id === arg);
    if (!z) return;
    App.ui.zoomDraft = Object.assign({}, z, { dia: dia });
    App.ui.zoomEditId = arg;
    App.ui.confirmDeleteZoom = null;
    App.render();
  },

  "cancel-zoom": function () {
    App.ui.zoomDraft = null;
    App.ui.zoomEditId = null;
    App.ui.confirmDeleteZoom = null;
    App.render();
  },

  "save-zoom": function () {
    const d = App.ui.zoomDraft;
    if (!d) return;
    const dia = App.state.agenda[d.dia];
    if (App.ui.zoomEditId) {
      const idx = dia.zooms.findIndex((x) => x.id === App.ui.zoomEditId);
      if (idx !== -1) dia.zooms[idx] = Object.assign({}, dia.zooms[idx], d);
    } else {
      dia.zooms.push(Object.assign(nuevoZoomAgenda(), d));
    }
    App.ui.zoomDraft = null;
    App.ui.zoomEditId = null;
    App.persist(true);
    App.showToast("Reunión guardada");
    App.render();
  },

  "delete-zoom": function (arg, el) {
    if (App.ui.confirmDeleteZoom !== arg) {
      App.ui.confirmDeleteZoom = arg;
      App.render();
      return;
    }
    const dia = App.state.agenda[el.dataset.dia];
    dia.zooms = dia.zooms.filter((x) => x.id !== arg);
    App.ui.confirmDeleteZoom = null;
    App.ui.zoomDraft = null;
    App.ui.zoomEditId = null;
    App.persist(true);
    App.showToast("Reunión eliminada");
    App.render();
  },

  "copy-zoom-link": function (arg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(arg).then(
        () => App.showToast("Enlace copiado"),
        () => App.showToast("No se pudo copiar el enlace")
      );
    } else {
      App.showToast("No se pudo copiar el enlace");
    }
  },

  "toggle-actividad-recordar": function () {
    if (!App.ui.actividadDraft) return;
    App.ui.actividadDraft.recordar = !App.ui.actividadDraft.recordar;
    if (App.ui.actividadDraft.recordar && !("Notification" in window ? Notification.permission === "granted" : false)) {
      Actions["toggle-notif"]();
    }
    App.render();
  },

  "toggle-zoom-recordar": function () {
    if (!App.ui.zoomDraft) return;
    App.ui.zoomDraft.recordar = !App.ui.zoomDraft.recordar;
    if (App.ui.zoomDraft.recordar && !("Notification" in window ? Notification.permission === "granted" : false)) {
      Actions["toggle-notif"]();
    }
    App.render();
  },

  "toggle-calculadora-productos": function () {
    App.ui.calculadoraAbierta = !App.ui.calculadoraAbierta;
    App.render();
  },

  "incrementar-registro": function (arg) {
    const dia = getRegistroDia(App.state, hoyISO());
    dia[arg] = (Number(dia[arg]) || 0) + 1;
    App.persist(true);
    App.render();
  },

  "decrementar-registro": function (arg) {
    const dia = getRegistroDia(App.state, hoyISO());
    dia[arg] = Math.max(0, (Number(dia[arg]) || 0) - 1);
    App.persist(true);
    App.render();
  },

  "set-idioma-informe": function (arg) {
    App.state.idiomaInforme = arg;
    App.persist(true);
    App.render();
  },

  "toggle-historial-compras": function () {
    App.ui.historialAbierto = !App.ui.historialAbierto;
    App.render();
  },

  "set-pais-catalogo": function (arg) {
    if (!PAISES_CATALOGO.some(function (p) { return p.id === arg; })) return;
    App.state.pais = arg;
    getCatalogoProductos(App.state, arg);
    App.persist(true);
    App.render();
  },

  "toggle-producto-probado": function (arg) {
    const catalogo = getCatalogoProductos(App.state, App.state.pais || "CO");
    const p = catalogo[Number(arg)];
    if (!p) return;
    p.probado = !p.probado;
    App.persist(true);
    App.render();
  },

  "add-producto": function () {
    const catalogo = getCatalogoProductos(App.state, App.state.pais || "CO");
    catalogo.push(nuevoProductoCatalogo({ categoria: "Mis productos" }));
    App.persist(true);
    App.render();
  },

  "delete-producto": function (arg) {
    const catalogo = getCatalogoProductos(App.state, App.state.pais || "CO");
    catalogo.splice(Number(arg), 1);
    App.persist(true);
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
