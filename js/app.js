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
    calculadoraAbierta: false,
    agendaDia: null,
    actividadDraft: null,
    actividadEditId: null,
    confirmDeleteActividad: null,
    zoomDraft: null,
    zoomEditId: null,
    confirmDeleteZoom: null,
    ascendenteDraft: null,
    confirmDeleteAscendente: null,
    sosDraft: null,
    confirmDeleteSOS: null,
    contactoEventoDraft: null,
    confirmDeleteContactoEvento: null,
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
      revisar(a, "Cumbre Master — " + tipo.label, a.nota || "Tienes esto programado a las " + a.hora + ".");
    });
    (dia.zooms || []).forEach((z) => {
      revisar(z, "Cumbre Master — Zoom: " + (z.titulo || "Reunión"), "Empieza a las " + z.hora + ".");
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
      new Notification("Cumbre Master — Recordatorio", {
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

    // Garantiza que la quincena que se va a mostrar/editar ya exista en el estado
    // (los campos data-field de "otros puntos" necesitan el objeto creado de antemano).
    if (isAuth && (ui.view === "planeador" || ui.view === "listas")) {
      getQuincena(state, ui.quincenaKey || quincenaActualKey());
    }
    if (isAuth && ui.view === "listas") {
      getCatalogoProductos(state, state.pais || "CO");
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
      case "agenda": mainHtml = renderAgenda(state, ui); break;
      case "informe": mainHtml = renderInformeSemanal(state, ui); break;
      case "arbol": mainHtml = renderArbolGenealogico(state, ui); break;
      case "sos": mainHtml = renderLlamadasSOS(state, ui); break;
      case "eventos": mainHtml = renderContactosEventos(state, ui); break;
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
    else if (ui.actividadDraft) modalHtml = renderActividadModal(ui);
    else if (ui.zoomDraft) modalHtml = renderZoomModal(ui);
    else if (ui.ascendenteDraft) modalHtml = renderAscendenteModal(ui);
    else if (ui.sosDraft) modalHtml = renderSOSModal(ui);
    else if (ui.contactoEventoDraft) modalHtml = renderContactoEventoModal(ui);
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
      } else if (el.dataset && el.dataset.draftField && (this.ui.personaDraft || this.ui.actividadDraft || this.ui.zoomDraft || this.ui.ascendenteDraft || this.ui.sosDraft || this.ui.contactoEventoDraft)) {
        const draft = this.ui.personaDraft || this.ui.actividadDraft || this.ui.zoomDraft || this.ui.ascendenteDraft || this.ui.sosDraft || this.ui.contactoEventoDraft;
        setPath(draft, el.dataset.draftField, el.value);
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
      if (el.tagName === "INPUT" && el.dataset && el.dataset.field && (el.dataset.field.indexOf("quincenas.") === 0 && el.dataset.field.indexOf(".compras.") !== -1 || el.dataset.field.indexOf("catalogoProductos.") === 0)) {
        // recalcula los totales de la calculadora de productos al salir del campo (no en cada tecla, para no perder el foco)
        this.render();
        return;
      }
      if (el.tagName === "SELECT" && el.dataset && el.dataset.draftField && (this.ui.actividadDraft || this.ui.zoomDraft)) {
        const draft = this.ui.actividadDraft || this.ui.zoomDraft;
        setPath(draft, el.dataset.draftField, el.value);
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
    App.ui.personaDraft = { linea: arg, id: null, nombre: "", telefono: "", pais: App.state.pais || "CO", atomyId: "", contrasena: "", notas: "" };
    App.ui.confirmDeletePersona = null;
    App.render();
  },

  "edit-persona": function (arg, el) {
    const qKey = App.ui.quincenaKey || quincenaActualKey();
    const linea = el.dataset.linea;
    const q = getQuincena(App.state, qKey);
    const p = (q[linea] || []).find((x) => x.id === arg);
    if (!p) return;
    App.ui.personaDraft = { linea: linea, id: p.id, nombre: p.nombre, telefono: p.telefono, pais: p.pais || "CO", atomyId: p.atomyId, contrasena: p.contrasena, notas: p.notas };
    App.ui.confirmDeletePersona = null;
    App.render();
  },

  "cancel-persona": function () {
    App.ui.personaDraft = null;
    App.ui.confirmDeletePersona = null;
    App.render();
  },

  "set-persona-draft-pais": function (arg) {
    if (!App.ui.personaDraft) return;
    App.ui.personaDraft.pais = arg;
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
        p.pais = d.pais;
        p.atomyId = d.atomyId;
        p.contrasena = d.contrasena;
        p.notas = d.notas;
      }
    } else {
      const nueva = Object.assign(nuevaPersona(), { nombre: d.nombre, telefono: d.telefono, pais: d.pais, atomyId: d.atomyId, contrasena: d.contrasena, notas: d.notas });
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

  /* -------- Mi Árbol Genealógico — línea ascendente -------- */

  "add-ascendente": function () {
    App.ui.ascendenteDraft = { id: null, nombre: "", rango: "", pais: "", telefono: "", horarioNoMolestar: "" };
    App.ui.confirmDeleteAscendente = null;
    App.render();
  },

  "edit-ascendente": function (arg) {
    const a = (App.state.arbolGenealogico.ascendentes || []).find((x) => x.id === arg);
    if (!a) return;
    App.ui.ascendenteDraft = Object.assign({}, a);
    App.ui.confirmDeleteAscendente = null;
    App.render();
  },

  "cancel-ascendente": function () {
    App.ui.ascendenteDraft = null;
    App.ui.confirmDeleteAscendente = null;
    App.render();
  },

  "save-ascendente": function () {
    const d = App.ui.ascendenteDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    const lista = App.state.arbolGenealogico.ascendentes;
    if (d.id) {
      const a = lista.find((x) => x.id === d.id);
      if (a) {
        a.nombre = d.nombre;
        a.rango = d.rango;
        a.pais = d.pais;
        a.telefono = d.telefono;
        a.horarioNoMolestar = d.horarioNoMolestar;
      }
    } else {
      lista.push(Object.assign(nuevaPersonaAscendente(), { nombre: d.nombre, rango: d.rango, pais: d.pais, telefono: d.telefono, horarioNoMolestar: d.horarioNoMolestar }));
    }
    App.ui.ascendenteDraft = null;
    App.persist(true);
    App.showToast("Persona guardada");
    App.render();
  },

  "delete-ascendente": function (arg) {
    if (App.ui.confirmDeleteAscendente !== arg) {
      App.ui.confirmDeleteAscendente = arg;
      App.render();
      return;
    }
    App.state.arbolGenealogico.ascendentes = App.state.arbolGenealogico.ascendentes.filter((x) => x.id !== arg);
    App.ui.confirmDeleteAscendente = null;
    App.ui.ascendenteDraft = null;
    App.persist(true);
    App.showToast("Persona eliminada");
    App.render();
  },

  /* -------- Llamadas S.O.S. -------- */

  "add-sos": function () {
    App.ui.sosDraft = { id: null, nombre: "", telefono: "", nota: "" };
    App.ui.confirmDeleteSOS = null;
    App.render();
  },

  "edit-sos": function (arg) {
    const s = (App.state.llamadasSOS || []).find((x) => x.id === arg);
    if (!s) return;
    App.ui.sosDraft = Object.assign({}, s);
    App.ui.confirmDeleteSOS = null;
    App.render();
  },

  "cancel-sos": function () {
    App.ui.sosDraft = null;
    App.ui.confirmDeleteSOS = null;
    App.render();
  },

  "save-sos": function () {
    const d = App.ui.sosDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    if (d.id) {
      const s = App.state.llamadasSOS.find((x) => x.id === d.id);
      if (s) {
        s.nombre = d.nombre;
        s.telefono = d.telefono;
        s.nota = d.nota;
      }
    } else {
      App.state.llamadasSOS.push(Object.assign(nuevaLlamadaSOS(), { nombre: d.nombre, telefono: d.telefono, nota: d.nota }));
    }
    App.ui.sosDraft = null;
    App.persist(true);
    App.showToast("Contacto guardado");
    App.render();
  },

  "delete-sos": function (arg) {
    if (App.ui.confirmDeleteSOS !== arg) {
      App.ui.confirmDeleteSOS = arg;
      App.render();
      return;
    }
    App.state.llamadasSOS = App.state.llamadasSOS.filter((x) => x.id !== arg);
    App.ui.confirmDeleteSOS = null;
    App.ui.sosDraft = null;
    App.persist(true);
    App.showToast("Contacto eliminado");
    App.render();
  },

  /* -------- Lista de Contactos (eventos en vivo) -------- */

  "add-contacto-evento": function () {
    App.ui.contactoEventoDraft = { id: null, nombre: "", pais: "", telefono: "", observaciones: "" };
    App.ui.confirmDeleteContactoEvento = null;
    App.render();
  },

  "edit-contacto-evento": function (arg) {
    const c = (App.state.contactosEventos || []).find((x) => x.id === arg);
    if (!c) return;
    App.ui.contactoEventoDraft = Object.assign({}, c);
    App.ui.confirmDeleteContactoEvento = null;
    App.render();
  },

  "cancel-contacto-evento": function () {
    App.ui.contactoEventoDraft = null;
    App.ui.confirmDeleteContactoEvento = null;
    App.render();
  },

  "save-contacto-evento": function () {
    const d = App.ui.contactoEventoDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    if (d.id) {
      const c = App.state.contactosEventos.find((x) => x.id === d.id);
      if (c) {
        c.nombre = d.nombre;
        c.pais = d.pais;
        c.telefono = d.telefono;
        c.observaciones = d.observaciones;
      }
    } else {
      App.state.contactosEventos.push(Object.assign(nuevoContactoEvento(), { nombre: d.nombre, pais: d.pais, telefono: d.telefono, observaciones: d.observaciones }));
    }
    App.ui.contactoEventoDraft = null;
    App.persist(true);
    App.showToast("Contacto guardado");
    App.render();
  },

  "delete-contacto-evento": function (arg) {
    if (App.ui.confirmDeleteContactoEvento !== arg) {
      App.ui.confirmDeleteContactoEvento = arg;
      App.render();
      return;
    }
    App.state.contactosEventos = App.state.contactosEventos.filter((x) => x.id !== arg);
    App.ui.confirmDeleteContactoEvento = null;
    App.ui.contactoEventoDraft = null;
    App.persist(true);
    App.showToast("Contacto eliminado");
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
    App.ui.actividadDraft = null;
    App.ui.zoomDraft = null;
    App.ui.agendaDia = null;
    App.ui.view = "welcome";
    App.showToast("Progreso reiniciado");
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
};

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
}

document.addEventListener("DOMContentLoaded", () => App.init());
