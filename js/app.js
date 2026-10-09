/* ---------------------------------------------------------------
   CONTROLADOR DE LA APP — estado, render loop, eventos
--------------------------------------------------------------- */

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

const App = {
  state: null,
  ui: {
    view: "home",
    menuOpen: false,
    fechaActual: null,
    bloqueDraft: null,
    bloqueEditId: null,
    confirmDeleteBloque: null,
    prospectoDraft: null,
    prospectoEditId: null,
    confirmDeleteProspecto: null,
    miembroDraft: null,
    miembroEditId: null,
    confirmDeleteMiembro: null,
    contenidoDraft: null,
    contenidoEditId: null,
    confirmDeleteContenido: null,
    contenidoFiltro: "todos",
    cobroDraft: null,
    cobroEditId: null,
    confirmDeleteCobro: null,
    confirmReset: false,
  },
  saveTimer: null,
  toastTimer: null,

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
    this.ui.fechaActual = hoyISO();
    applyTheme(this.state.dark);
    this.persist(true);
    this.bindEvents();
    this.render();
  },

  persist(immediate) {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    if (immediate) {
      Storage.save(this.state);
      return;
    }
    this.saveTimer = setTimeout(() => Storage.save(this.state), 400);
  },

  showToast(msg) {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    const slot = document.getElementById("toast-slot");
    slot.innerHTML = '<div class="toast">' + escapeHtml(msg) + "</div>";
    this.toastTimer = setTimeout(() => { slot.innerHTML = ""; }, 2200);
  },

  render() {
    const state = this.state;
    const ui = this.ui;
    document.getElementById("header-slot").innerHTML = renderHeader(state, ui);
    document.getElementById("sidebar-slot").innerHTML = state.onboarded ? renderSidebar(ui) : "";
    document.getElementById("app-root").classList.toggle("has-sidebar", state.onboarded);

    let mainHtml = "";
    if (!state.onboarded) {
      mainHtml = ui.view === "onboarding" ? renderOnboarding(ui) : renderWelcome();
    } else {
      switch (ui.view) {
        case "dia": mainHtml = renderMiDia(state, ui); break;
        case "prospeccion": mainHtml = renderProspeccion(state, ui); break;
        case "equipo": mainHtml = renderEquipo(state, ui); break;
        case "comunicacion": mainHtml = renderComunicacion(state, ui); break;
        case "redes": mainHtml = renderRedesSociales(state, ui); break;
        case "finanzas": mainHtml = renderFinanzas(state, ui); break;
        case "cierre": mainHtml = renderCierreDia(state, ui); break;
        case "ajustes": mainHtml = renderAjustes(state, ui); break;
        default: mainHtml = renderHome(state, ui);
      }
    }
    const container = document.getElementById("view-container");
    container.className = "view-container" + (state.onboarded ? "" : "");
    container.innerHTML = mainHtml;

    document.getElementById("menu-slot").innerHTML = state.onboarded ? renderMenuSheet(ui) : "";

    let modalHtml = "";
    if (ui.bloqueDraft) modalHtml = renderBloqueModal(ui);
    else if (ui.prospectoDraft) modalHtml = renderProspectoModal(ui);
    else if (ui.miembroDraft) modalHtml = renderMiembroModal(ui);
    else if (ui.contenidoDraft) modalHtml = renderContenidoModal(ui);
    else if (ui.cobroDraft) modalHtml = renderCobroModal(ui);
    document.getElementById("modal-slot").innerHTML = modalHtml;

    const nameInput = document.getElementById("onboarding-name-input");
    if (nameInput) {
      nameInput.addEventListener("input", () => {
        const btn = document.getElementById("onboarding-submit");
        const ok = nameInput.value.trim().length > 0;
        btn.disabled = !ok;
        btn.style.opacity = ok ? "1" : ".55";
      });
    }
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
        return;
      }
      const draft = this.ui.bloqueDraft || this.ui.prospectoDraft || this.ui.miembroDraft || this.ui.contenidoDraft || this.ui.cobroDraft;
      if (el.dataset && el.dataset.draftField && draft) {
        setPath(draft, el.dataset.draftField, el.value);
      }
    });

    root.addEventListener("change", (e) => {
      const el = e.target;
      if (el.type === "file" && el.dataset && el.dataset.target === "__importBackup") {
        const file = el.files && el.files[0];
        el.value = "";
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          let parsed;
          try {
            parsed = JSON.parse(reader.result);
          } catch (err) {
            App.showToast("Ese archivo no es un respaldo válido.");
            return;
          }
          App.state = hydrateState(parsed);
          const rh = calcularRacha(App.state.racha, App.state.ultimaFecha);
          App.state.racha = rh.racha;
          App.state.ultimaFecha = rh.ultimaFecha;
          applyTheme(App.state.dark);
          App.persist(true);
          App.showToast("Datos importados correctamente");
          App.render();
        };
        reader.readAsText(file);
      }
    });
  },
};

const Actions = {
  "start-app": function () {
    App.ui.view = "onboarding";
    App.render();
  },

  "finish-onboarding": function () {
    const el = document.getElementById("onboarding-name-input");
    const nombre = el ? el.value.trim() : "";
    if (!nombre) return;
    App.state.nombre = nombre;
    App.state.onboarded = true;
    App.ui.view = "home";
    App.persist(true);
    App.render();
  },

  salir: function () {
    App.state.onboarded = false;
    App.ui.view = "home";
    App.ui.menuOpen = false;
    App.persist(true);
    App.render();
  },

  "toggle-menu": function () {
    App.ui.menuOpen = !App.ui.menuOpen;
    App.render();
  },

  "close-menu": function () {
    App.ui.menuOpen = false;
    App.render();
  },

  goto: function (arg) {
    App.ui.view = arg;
    App.ui.menuOpen = false;
    window.scrollTo(0, 0);
    App.render();
  },

  "toggle-dark": function () {
    App.state.dark = !App.state.dark;
    applyTheme(App.state.dark);
    App.persist(true);
    App.render();
  },

  "nav-fecha": function (arg) {
    if (arg === "0") App.ui.fechaActual = hoyISO();
    else App.ui.fechaActual = addDiasISO(App.ui.fechaActual, Number(arg));
    App.render();
  },

  "usar-plantilla": function () {
    const plan = getPlanDia(App.state, App.ui.fechaActual);
    if (plan.bloques.length) return;
    plan.bloques = PLANTILLA_JORNADA.map(function (b) {
      const nb = nuevoBloque(b.categoria);
      nb.hora = b.hora;
      nb.titulo = b.titulo;
      return nb;
    });
    App.persist(true);
    App.showToast("Plantilla aplicada");
    App.render();
  },

  "toggle-prioridad": function (arg) {
    const fecha = App.ui.view === "home" ? hoyISO() : App.ui.fechaActual;
    const plan = getPlanDia(App.state, fecha);
    const idx = Number(arg);
    plan.prioridades[idx].hecha = !plan.prioridades[idx].hecha;
    App.persist(true);
    App.render();
  },

  /* -------- Bloques del día -------- */

  "add-bloque": function () {
    App.ui.bloqueDraft = nuevoBloque();
    App.ui.bloqueEditId = null;
    App.render();
  },

  "edit-bloque": function (arg) {
    const plan = getPlanDia(App.state, App.ui.fechaActual);
    const b = plan.bloques.find((x) => x.id === arg);
    if (!b) return;
    App.ui.bloqueDraft = Object.assign({}, b);
    App.ui.bloqueEditId = arg;
    App.ui.confirmDeleteBloque = null;
    App.render();
  },

  "cancel-bloque": function () {
    App.ui.bloqueDraft = null;
    App.ui.bloqueEditId = null;
    App.ui.confirmDeleteBloque = null;
    App.render();
  },

  "save-bloque": function () {
    const d = App.ui.bloqueDraft;
    if (!d || !d.titulo || !d.titulo.trim()) return;
    const plan = getPlanDia(App.state, App.ui.fechaActual);
    if (App.ui.bloqueEditId) {
      const idx = plan.bloques.findIndex((x) => x.id === App.ui.bloqueEditId);
      if (idx !== -1) plan.bloques[idx] = Object.assign({}, plan.bloques[idx], d);
    } else {
      plan.bloques.push(Object.assign({}, d));
    }
    App.ui.bloqueDraft = null;
    App.ui.bloqueEditId = null;
    App.persist(true);
    App.showToast("Bloque guardado");
    App.render();
  },

  "delete-bloque": function (arg) {
    if (App.ui.confirmDeleteBloque !== arg) {
      App.ui.confirmDeleteBloque = arg;
      App.render();
      return;
    }
    const plan = getPlanDia(App.state, App.ui.fechaActual);
    plan.bloques = plan.bloques.filter((x) => x.id !== arg);
    App.ui.bloqueDraft = null;
    App.ui.bloqueEditId = null;
    App.ui.confirmDeleteBloque = null;
    App.persist(true);
    App.showToast("Bloque eliminado");
    App.render();
  },

  "toggle-bloque": function (arg) {
    const plan = getPlanDia(App.state, App.ui.fechaActual);
    const b = plan.bloques.find((x) => x.id === arg);
    if (!b) return;
    b.hecho = !b.hecho;
    App.persist(true);
    App.render();
  },

  /* -------- Prospección -------- */

  "add-prospecto": function () {
    App.ui.prospectoDraft = nuevoProspectoDia();
    App.ui.prospectoEditId = null;
    App.render();
  },

  "edit-prospecto": function (arg) {
    const lista = getProspeccionDia(App.state, App.ui.fechaActual);
    const p = lista.find((x) => x.id === arg);
    if (!p) return;
    App.ui.prospectoDraft = Object.assign({}, p);
    App.ui.prospectoEditId = arg;
    App.ui.confirmDeleteProspecto = null;
    App.render();
  },

  "cancel-prospecto": function () {
    App.ui.prospectoDraft = null;
    App.ui.prospectoEditId = null;
    App.ui.confirmDeleteProspecto = null;
    App.render();
  },

  "save-prospecto": function () {
    const d = App.ui.prospectoDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    const lista = getProspeccionDia(App.state, App.ui.fechaActual);
    if (App.ui.prospectoEditId) {
      const idx = lista.findIndex((x) => x.id === App.ui.prospectoEditId);
      if (idx !== -1) lista[idx] = Object.assign({}, lista[idx], d);
    } else {
      lista.push(Object.assign({}, d));
    }
    App.ui.prospectoDraft = null;
    App.ui.prospectoEditId = null;
    App.persist(true);
    App.showToast("Contacto guardado");
    App.render();
  },

  "delete-prospecto": function (arg) {
    if (App.ui.confirmDeleteProspecto !== arg) {
      App.ui.confirmDeleteProspecto = arg;
      App.render();
      return;
    }
    const lista = getProspeccionDia(App.state, App.ui.fechaActual);
    App.state.prospeccionPorDia[App.ui.fechaActual] = lista.filter((x) => x.id !== arg);
    App.ui.prospectoDraft = null;
    App.ui.prospectoEditId = null;
    App.ui.confirmDeleteProspecto = null;
    App.persist(true);
    App.showToast("Contacto eliminado");
    App.render();
  },

  "toggle-prospecto": function (arg) {
    const lista = getProspeccionDia(App.state, App.ui.fechaActual);
    const p = lista.find((x) => x.id === arg);
    if (!p) return;
    p.hecho = !p.hecho;
    App.persist(true);
    App.render();
  },

  /* -------- Equipo -------- */

  "add-miembro": function () {
    App.ui.miembroDraft = nuevoMiembroEquipo();
    App.ui.miembroEditId = null;
    App.render();
  },

  "edit-miembro": function (arg) {
    const m = App.state.equipoMiembros.find((x) => x.id === arg);
    if (!m) return;
    App.ui.miembroDraft = Object.assign({}, m);
    App.ui.miembroEditId = arg;
    App.ui.confirmDeleteMiembro = null;
    App.render();
  },

  "cancel-miembro": function () {
    App.ui.miembroDraft = null;
    App.ui.miembroEditId = null;
    App.ui.confirmDeleteMiembro = null;
    App.render();
  },

  "save-miembro": function () {
    const d = App.ui.miembroDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    if (App.ui.miembroEditId) {
      const idx = App.state.equipoMiembros.findIndex((x) => x.id === App.ui.miembroEditId);
      if (idx !== -1) App.state.equipoMiembros[idx] = Object.assign({}, App.state.equipoMiembros[idx], d);
    } else {
      App.state.equipoMiembros.push(Object.assign({}, d));
    }
    App.ui.miembroDraft = null;
    App.ui.miembroEditId = null;
    App.persist(true);
    App.showToast("Miembro guardado");
    App.render();
  },

  "delete-miembro": function (arg) {
    if (App.ui.confirmDeleteMiembro !== arg) {
      App.ui.confirmDeleteMiembro = arg;
      App.render();
      return;
    }
    App.state.equipoMiembros = App.state.equipoMiembros.filter((x) => x.id !== arg);
    App.ui.miembroDraft = null;
    App.ui.miembroEditId = null;
    App.ui.confirmDeleteMiembro = null;
    App.persist(true);
    App.showToast("Miembro eliminado");
    App.render();
  },

  "registrar-checkin": function (arg) {
    const m = App.state.equipoMiembros.find((x) => x.id === arg);
    if (!m) return;
    m.ultimoContacto = hoyISO();
    m.proximoCheckIn = addDiasISO(hoyISO(), 7);
    App.persist(true);
    App.showToast("Check-in registrado");
    App.render();
  },

  /* -------- Comunicación -------- */

  "add-comunicacion": function (arg, el) {
    const tipo = el.dataset.tipo;
    const input = document.getElementById("com-input-" + tipo);
    const texto = input ? input.value.trim() : "";
    if (!texto) return;
    const com = getComunicacionDia(App.state, App.ui.fechaActual);
    const item = nuevaTareaComunicacion();
    item.titulo = texto;
    com[tipo].push(item);
    App.persist(true);
    App.render();
  },

  "toggle-comunicacion": function (arg, el) {
    const tipo = el.dataset.tipo;
    const com = getComunicacionDia(App.state, App.ui.fechaActual);
    const item = com[tipo].find((x) => x.id === arg);
    if (!item) return;
    item.hecho = !item.hecho;
    App.persist(true);
    App.render();
  },

  "delete-comunicacion": function (arg, el) {
    const tipo = el.dataset.tipo;
    const com = getComunicacionDia(App.state, App.ui.fechaActual);
    com[tipo] = com[tipo].filter((x) => x.id !== arg);
    App.persist(true);
    App.render();
  },

  /* -------- Redes Sociales -------- */

  "add-contenido": function () {
    App.ui.contenidoDraft = nuevoContenidoRRSS();
    App.ui.contenidoDraft.fecha = App.ui.fechaActual;
    App.ui.contenidoEditId = null;
    App.render();
  },

  "edit-contenido": function (arg) {
    const c = App.state.contenidoRRSS.find((x) => x.id === arg);
    if (!c) return;
    App.ui.contenidoDraft = Object.assign({}, c);
    App.ui.contenidoEditId = arg;
    App.ui.confirmDeleteContenido = null;
    App.render();
  },

  "cancel-contenido": function () {
    App.ui.contenidoDraft = null;
    App.ui.contenidoEditId = null;
    App.ui.confirmDeleteContenido = null;
    App.render();
  },

  "save-contenido": function () {
    const d = App.ui.contenidoDraft;
    if (!d || !d.idea || !d.idea.trim()) return;
    if (App.ui.contenidoEditId) {
      const idx = App.state.contenidoRRSS.findIndex((x) => x.id === App.ui.contenidoEditId);
      if (idx !== -1) App.state.contenidoRRSS[idx] = Object.assign({}, App.state.contenidoRRSS[idx], d);
    } else {
      App.state.contenidoRRSS.push(Object.assign({}, d));
    }
    App.ui.contenidoDraft = null;
    App.ui.contenidoEditId = null;
    App.persist(true);
    App.showToast("Publicación guardada");
    App.render();
  },

  "delete-contenido": function (arg) {
    if (App.ui.confirmDeleteContenido !== arg) {
      App.ui.confirmDeleteContenido = arg;
      App.render();
      return;
    }
    App.state.contenidoRRSS = App.state.contenidoRRSS.filter((x) => x.id !== arg);
    App.ui.contenidoDraft = null;
    App.ui.contenidoEditId = null;
    App.ui.confirmDeleteContenido = null;
    App.persist(true);
    App.showToast("Publicación eliminada");
    App.render();
  },

  "filter-contenido": function (arg) {
    App.ui.contenidoFiltro = arg;
    App.render();
  },

  /* -------- Finanzas -------- */

  "add-cobro": function () {
    App.ui.cobroDraft = nuevoCobro();
    App.ui.cobroEditId = null;
    App.render();
  },

  "edit-cobro": function (arg) {
    const c = App.state.cobros.find((x) => x.id === arg);
    if (!c) return;
    App.ui.cobroDraft = Object.assign({}, c);
    App.ui.cobroEditId = arg;
    App.ui.confirmDeleteCobro = null;
    App.render();
  },

  "cancel-cobro": function () {
    App.ui.cobroDraft = null;
    App.ui.cobroEditId = null;
    App.ui.confirmDeleteCobro = null;
    App.render();
  },

  "save-cobro": function () {
    const d = App.ui.cobroDraft;
    if (!d || !d.cliente || !d.cliente.trim()) return;
    if (App.ui.cobroEditId) {
      const idx = App.state.cobros.findIndex((x) => x.id === App.ui.cobroEditId);
      if (idx !== -1) App.state.cobros[idx] = Object.assign({}, App.state.cobros[idx], d);
    } else {
      App.state.cobros.push(Object.assign({}, d));
    }
    App.ui.cobroDraft = null;
    App.ui.cobroEditId = null;
    App.persist(true);
    App.showToast("Cobro guardado");
    App.render();
  },

  "delete-cobro": function (arg) {
    if (App.ui.confirmDeleteCobro !== arg) {
      App.ui.confirmDeleteCobro = arg;
      App.render();
      return;
    }
    App.state.cobros = App.state.cobros.filter((x) => x.id !== arg);
    App.ui.cobroDraft = null;
    App.ui.cobroEditId = null;
    App.ui.confirmDeleteCobro = null;
    App.persist(true);
    App.showToast("Cobro eliminado");
    App.render();
  },

  /* -------- Cierre del día -------- */

  "set-energia": function (arg) {
    const c = getCierreDia(App.state, App.ui.fechaActual);
    c.animo = Number(arg);
    App.persist(true);
    App.render();
  },

  "completar-cierre": function () {
    const c = getCierreDia(App.state, App.ui.fechaActual);
    c.hecho = true;
    if (c.prioridadManana && c.prioridadManana.trim()) {
      const manana = addDiasISO(App.ui.fechaActual, 1);
      const planManana = getPlanDia(App.state, manana);
      if (!planManana.prioridades[0].texto.trim()) {
        planManana.prioridades[0].texto = c.prioridadManana.trim();
      }
    }
    App.persist(true);
    App.showToast("¡Jornada cerrada! Mañana empiezas con ventaja.");
    App.render();
  },

  /* -------- Ajustes -------- */

  "trigger-import-backup": function () {
    const input = document.getElementById("import-backup-file");
    if (input) input.click();
  },

  "export-backup": function () {
    const data = JSON.stringify(App.state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dia-de-impacto-backup-" + hoyISO() + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    App.showToast("Respaldo descargado");
  },

  "reset-app": function () {
    if (!App.ui.confirmReset) {
      App.ui.confirmReset = true;
      App.render();
      return;
    }
    Storage.clear();
    App.state = defaultState();
    App.ui.view = "home";
    App.ui.confirmReset = false;
    applyTheme(App.state.dark);
    App.render();
  },
};

window.addEventListener("DOMContentLoaded", () => App.init());

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
