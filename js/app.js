/* ---------------------------------------------------------------
   CONTROLADOR DE LA APP — estado, render loop, eventos
--------------------------------------------------------------- */

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

function waHref(numero) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Hola, tengo una duda sobre mi camino hacia Imperial Master");
}

function waHrefPersonal(numero, nombre) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Hola" + (nombre ? " " + nombre : "") + "! ¿Cuántos puntos vas a pedir esta quincena y en qué fecha?");
}

function shareTextForLogro(titulo) {
  return "🏆 ¡He alcanzado el rango de \"" + titulo + "\" en mi camino hacia Imperial Master con Atomy! 🚀 Si tienes curiosidad, pregúntame de qué se trata.";
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
    bellOpen: false,
    logro: null,
    confirmReset: false,
    onboardingFoto: null,
    quincenaKey: null,
    lineaActiva: "izquierda",
    personaDraft: null,
    confirmDeletePersona: null,
    rangosVueltos: {},
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
    registerServiceWorker();
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

    // Garantiza que la quincena que se va a mostrar/editar ya exista en el estado
    // (los campos data-field de "otros puntos" necesitan el objeto creado de antemano).
    if (isAuth && (ui.view === "planeador" || ui.view === "listas")) {
      getQuincena(state, ui.quincenaKey || quincenaActualKey());
    }

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
      case "home": mainHtml = renderHome(state, ui); break;
      case "plan": mainHtml = renderPlanCompensacion(ui); break;
      case "planeador": mainHtml = renderPlaneador(state, ui); break;
      case "listas": mainHtml = renderListas(state, ui); break;
      case "perfil": mainHtml = renderPerfil(state); break;
      case "ajustes": mainHtml = renderAjustes(state, ui); break;
      default: mainHtml = renderHome(state, ui);
    }
    const container = document.getElementById("view-container");
    container.className = "view-container" + (isAuth ? " view-stack" : "");
    container.innerHTML = mainHtml;

    document.getElementById("menu-slot").innerHTML = renderMenuSheet(ui);

    let modalHtml = "";
    if (ui.logro) modalHtml = renderLogroModal(state, ui);
    else if (ui.personaDraft) modalHtml = renderPersonaModal(ui);
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

    // campos de texto (data-field / data-draft-field / data-roster-field): actualizan
    // estado sin re-render, para no perder el foco mientras se escribe.
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
      } else if (el.dataset && el.dataset.draftField && this.ui.personaDraft) {
        setPath(this.ui.personaDraft, el.dataset.draftField, el.value);
      } else if (el.dataset && el.dataset.rosterField) {
        const q = getQuincena(this.state, el.dataset.qkey);
        const lista = q[el.dataset.linea] || [];
        const persona = lista.find((p) => p.id === el.dataset.id);
        if (persona) {
          const isNumeric = el.dataset.rosterField === "puntos" || el.dataset.rosterField === "pvp";
          persona[el.dataset.rosterField] = isNumeric ? Number(el.value) || 0 : el.value;
          this.persist();
        }
      }
    });

    // inputs de archivo (fotos): data-target apunta a una ruta del estado, o al prefijo especial __onboardingFoto
    root.addEventListener("change", (e) => {
      const el = e.target;
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
    App.ui.view = arg;
    App.ui.menuOpen = false;
    App.ui.confirmReset = false;
    App.render();
    const c = document.getElementById("view-container");
    if (c) c.scrollTop = 0;
    window.scrollTo(0, 0);
  },

  "open-bell": function () { App.ui.bellOpen = true; App.render(); },
  "close-modal": function () { App.ui.bellOpen = false; App.ui.logro = null; App.render(); },

  "flip-rango": function (arg) {
    App.ui.rangosVueltos[arg] = !App.ui.rangosVueltos[arg];
    App.render();
  },

  "nav-quincena": function (arg) {
    const actual = App.ui.quincenaKey || quincenaActualKey();
    App.ui.quincenaKey = quincenaAdyacente(actual, Number(arg));
    App.render();
  },

  "set-linea": function (arg) {
    App.ui.lineaActiva = arg;
    App.render();
  },

  "add-persona": function (arg) {
    App.ui.personaDraft = { linea: arg, id: null, nombre: "", telefono: "", atomyId: "", contrasena: "", notas: "" };
    App.ui.confirmDeletePersona = null;
    App.render();
  },

  "edit-persona": function (arg, el) {
    const qKey = App.ui.quincenaKey || quincenaActualKey();
    const linea = el.dataset.linea;
    const q = getQuincena(App.state, qKey);
    const p = (q[linea] || []).find((x) => x.id === arg);
    if (!p) return;
    App.ui.personaDraft = { linea: linea, id: p.id, nombre: p.nombre, telefono: p.telefono, atomyId: p.atomyId, contrasena: p.contrasena, notas: p.notas };
    App.ui.confirmDeletePersona = null;
    App.render();
  },

  "cancel-persona": function () {
    App.ui.personaDraft = null;
    App.ui.confirmDeletePersona = null;
    App.render();
  },

  "save-persona": function () {
    const d = App.ui.personaDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    const qKey = App.ui.quincenaKey || quincenaActualKey();
    const q = getQuincena(App.state, qKey);
    if (d.id) {
      const p = (q[d.linea] || []).find((x) => x.id === d.id);
      if (p) {
        p.nombre = d.nombre;
        p.telefono = d.telefono;
        p.atomyId = d.atomyId;
        p.contrasena = d.contrasena;
        p.notas = d.notas;
      }
    } else {
      const nueva = Object.assign(nuevaPersona(), { nombre: d.nombre, telefono: d.telefono, atomyId: d.atomyId, contrasena: d.contrasena, notas: d.notas });
      q[d.linea] = q[d.linea] || [];
      q[d.linea].push(nueva);
    }
    App.ui.personaDraft = null;
    App.persist(true);
    App.showToast("Persona guardada");
    App.render();
  },

  "delete-persona": function (arg, el) {
    if (App.ui.confirmDeletePersona !== arg) {
      App.ui.confirmDeletePersona = arg;
      App.render();
      return;
    }
    const qKey = App.ui.quincenaKey || quincenaActualKey();
    const linea = el.dataset.linea;
    const q = getQuincena(App.state, qKey);
    q[linea] = (q[linea] || []).filter((x) => x.id !== arg);
    App.ui.confirmDeletePersona = null;
    App.ui.personaDraft = null;
    App.persist(true);
    App.showToast("Persona eliminada");
    App.render();
  },

  "toggle-verificado": function (arg, el) {
    const qKey = el.dataset.qkey;
    const linea = el.dataset.linea;
    const q = getQuincena(App.state, qKey);
    const p = (q[linea] || []).find((x) => x.id === arg);
    if (!p) return;
    p.verificado = !p.verificado;
    App.persist(true);
    App.render();
  },

  "toggle-reunion-enfoque": function (arg, el) {
    const q = getQuincena(App.state, el.dataset.qkey);
    q.reunionHecha = !q.reunionHecha;
    App.persist(true);
    App.render();
  },

  "set-rango-master": function (arg) {
    const i = Number(arg);
    const avanza = i > App.state.rangoActualIndex;
    App.state.rangoActualIndex = i;
    if (avanza) {
      App.celebrate();
      App.ui.logro = { titulo: RANGOS_MASTER[i].nombre, sub: "Nuevo rango de Maestría alcanzado en Atomy." };
      App.addActividad("Alcanzaste el rango: " + RANGOS_MASTER[i].nombre);
    }
    App.persist(true);
    App.render();
  },

  "share-logro-native": function (arg) {
    const text = shareTextForLogro(arg);
    if (navigator.share) {
      navigator.share({ title: "Cumbre Master", text: text, url: window.location.href }).catch(() => {});
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

  "reset-progress": function () {
    if (!App.ui.confirmReset) {
      App.ui.confirmReset = true;
      App.render();
      return;
    }
    Storage.clear();
    App.state = defaultState();
    App.ui.confirmReset = false;
    App.ui.onboardingFoto = null;
    App.ui.quincenaKey = null;
    App.ui.personaDraft = null;
    App.ui.view = "welcome";
    App.showToast("Progreso reiniciado");
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
