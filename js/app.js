/* ---------------------------------------------------------------
   CONTROLADOR DE LA APP — estado, render loop, eventos
--------------------------------------------------------------- */

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

function waHref(numero) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Ciao, ho un dubbio sul mio percorso in Cumbre 90");
}

function waHrefPersonal(numero, nombre) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent("Ciao" + (nombre ? " " + nombre : "") + "! Come stai?");
}

function shareTextForLogro(titulo) {
  return "🏆 Ho raggiunto il traguardo \"" + titulo + "\" nel mio percorso verso Sales Master con Atomy! 🚀 Se sei curioso, chiedimi di cosa si tratta.";
}

/* Instagram, TikTok y YouTube no tienen una URL pública para prellenar un
   texto (a diferencia de WhatsApp/Facebook/LinkedIn) — por eso para esas
   plataformas el botón copia el mensaje al portapapeles y abre la web/app,
   en vez de fingir un intent que esas redes no ofrecen. YouTube no está
   entre las opciones porque no admite publicar un texto suelto como éste. */
function shareLogroLinksHTML(titulo) {
  const text = shareTextForLogro(titulo);
  const encText = encodeURIComponent(text);
  const waUrl = "https://wa.me/?text=" + encText;
  const fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://atomy.com") + "&quote=" + encText;
  const liUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://atomy.com");
  return (
    '<div class="share-chip-row">' +
    '<a class="share-chip" href="' + waUrl + '" target="_blank" rel="noreferrer">' + Icon("whatsapp", { size: 15, color: "#25D366" }) + "<span>WhatsApp</span></a>" +
    '<button class="share-chip" data-action="share-logro-plataforma" data-arg="instagram|' + escapeHtml(titulo) + '">' + Icon("instagram", { size: 15 }) + "<span>Instagram</span></button>" +
    '<button class="share-chip" data-action="share-logro-plataforma" data-arg="tiktok|' + escapeHtml(titulo) + '">' + Icon("tiktok", { size: 15 }) + "<span>TikTok</span></button>" +
    '<a class="share-chip" href="' + fbUrl + '" target="_blank" rel="noreferrer">' + Icon("facebook", { size: 15, color: "#1877F2" }) + "<span>Facebook</span></a>" +
    '<a class="share-chip" href="' + liUrl + '" target="_blank" rel="noreferrer">' + Icon("linkedin", { size: 15, color: "#0A66C2" }) + "<span>LinkedIn</span></a>" +
    '<button class="share-chip" data-action="share-logro-copy" data-arg="' + escapeHtml(titulo) + '">' + Icon("copy", { size: 15 }) + "<span>Copia</span></button>" +
    "</div>"
  );
}

const App = {
  state: null,
  ui: {
    view: "welcome",
    menuOpen: false,
    activeDay: null,
    escenarioAbierto: false,
    activeQuincena: null,
    enfoqueQuincena: null,
    bellOpen: false,
    logro: null,
    confirmReset: false,
    onboardingFoto: null,
    contactoDraft: null,
    contactoEditId: null,
    contactoFiltro: "tutti",
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
    lineaActivaEnfoque: "izquierda",
    personaEnfoqueDraft: null,
    confirmDeletePersonaEnfoque: null,
    ascendenteDraft: null,
    confirmDeleteAscendente: null,
    sosDraft: null,
    confirmDeleteSOS: null,
    contactoEventoDraft: null,
    confirmDeleteContactoEvento: null,
    quincenaResumenAbierto: false,
    quincenaVista: null,
    quincenaMetricaTab: "llamadas",
    tourAbierto: false,
    tourPaso: 0,
    patrocinadorFabDraft: null,
    confirmDeleteDistribuidor: null,
    compartirImagenDraft: null,
    confirmDeletePremio: null,
    granPlanOpen: false,
    confirmDeleteHito: null,
    diarioFuturoOpen: false,
    mesEvaluacion8Pasos: null,
    mesPlanComercial: null,
    confirmDeleteMetaPlan: null,
    confirmDeleteAccionPlan: null,
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
      revisar(a, "Cumbre 90 — " + tipo.label, a.nota || "Hai questo in programma alle " + a.hora + ".");
    });
    (dia.zooms || []).forEach((z) => {
      revisar(z, "Cumbre 90 — Zoom: " + (z.titulo || "Riunione"), "Inizia alle " + z.hora + ".");
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
      new Notification("Cumbre 90 — Promemoria", {
        body: reminders.length > 1 ? primero.text + " (+" + (reminders.length - 1) + " altri)" : primero.text,
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
      ? '<button class="fab-whatsapp" data-action="abrir-whatsapp-fab" title="Escribir a tu patrocinador/a">' + Icon("message-circle", { size: 24, color: "#fff" }) + "</button>" +
        (!ui.tourAbierto
          ? '<button class="fab-tour" data-action="iniciar-tour" title="Ver recorrido explicativo">' + Icon("compass", { size: 22, color: "#fff" }) + "</button>"
          : "")
      : "";
    document.getElementById("app-root").classList.toggle("has-sidebar", isAuth);

    let mainHtml = "";
    switch (ui.view) {
      case "welcome": mainHtml = renderWelcome(); break;
      case "onboarding": mainHtml = renderOnboarding(ui); break;
      case "home": mainHtml = renderHome(state); break;
      case "agenda": mainHtml = renderAgenda(state, ui); break;
      case "informe": mainHtml = renderInformeSemanal(state, ui); break;
      case "pasos": mainHtml = renderPasos(state, ui); break;
      case "lema": mainHtml = renderLema(state, ui); break;
      case "contactos": mainHtml = renderContactos(state, ui); break;
      case "arbol": mainHtml = renderArbolGenealogico(state, ui); break;
      case "sos": mainHtml = renderLlamadasSOS(state, ui); break;
      case "eventos": mainHtml = renderContactosEventos(state, ui); break;
      case "plan6": mainHtml = ui.activeDay ? renderDiaDetalle(state, ui, ui.activeDay) : renderPathMap(state); break;
      case "plan90":
        if (ui.activeQuincena) {
          mainHtml = renderQuincenaDetalle(state, ui, ui.activeQuincena);
        } else {
          mainHtml = renderPlan90(state);
        }
        break;
      case "enfoque":
        if (!ui.enfoqueQuincena) ui.enfoqueQuincena = quincenaEnfoquePorDefecto(state);
        getComprasQuincena(state, ui.enfoqueQuincena);
        getCatalogoProductos(state, state.pais || "CO");
        mainHtml = renderReunionEnfoquePage(state, ui);
        break;
      case "premios": mainHtml = renderPremios(state, ui); break;
      case "perfil": mainHtml = renderPerfil(state); break;
      case "logros": mainHtml = renderLogros(state); break;
      case "cumbre": mainHtml = renderCumbre(state); break;
      case "ajustes": mainHtml = renderAjustes(state, ui); break;
      default: mainHtml = renderHome(state);
    }
    const container = document.getElementById("view-container");
    container.className = "view-container" + (isAuth ? " view-stack" : "");
    container.innerHTML = mainHtml;
    document.getElementById("app-bg").classList.toggle("bg-logros", ui.view === "logros");

    document.getElementById("menu-slot").innerHTML = renderMenuSheet(ui);

    let modalHtml = "";
    if (ui.tourAbierto) modalHtml = renderTourModal(ui);
    else if (ui.compartirImagenDraft) modalHtml = renderCompartirImagenModal(ui);
    else if (ui.patrocinadorFabDraft) modalHtml = renderPatrocinadorFabModal(ui);
    else if (ui.logro) modalHtml = renderLogroModal(state, ui);
    else if (ui.contactoDraft) modalHtml = renderContactoModal(ui);
    else if (ui.agenda6Draft) modalHtml = renderAgenda6Modal(ui);
    else if (ui.actividadDraft) modalHtml = renderActividadModal(ui);
    else if (ui.zoomDraft) modalHtml = renderZoomModal(ui);
    else if (ui.personaEnfoqueDraft) modalHtml = renderPersonaEnfoqueModal(ui);
    else if (ui.ascendenteDraft) modalHtml = renderAscendenteModal(ui);
    else if (ui.sosDraft) modalHtml = renderSOSModal(ui);
    else if (ui.contactoEventoDraft) modalHtml = renderContactoEventoModal(ui);
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
      } else if (el.dataset && el.dataset.draftField && (this.ui.contactoDraft || this.ui.actividadDraft || this.ui.zoomDraft || this.ui.personaEnfoqueDraft || this.ui.ascendenteDraft || this.ui.sosDraft || this.ui.contactoEventoDraft || this.ui.patrocinadorFabDraft)) {
        // formularios con borrador (contacto / actividad de agenda / zoom / persona de Reunión de Enfoque / ascendente / S.O.S. / contacto de evento / patrocinador desde el FAB): tampoco re-renderizan, para no perder el foco
        const draft = this.ui.contactoDraft || this.ui.actividadDraft || this.ui.zoomDraft || this.ui.personaEnfoqueDraft || this.ui.ascendenteDraft || this.ui.sosDraft || this.ui.contactoEventoDraft || this.ui.patrocinadorFabDraft;
        setPath(draft, el.dataset.draftField, el.value);
      } else if (el.dataset && el.dataset.rosterField) {
        const lista = getListaEnfoque(this.state, el.dataset.qn);
        const arr = lista[el.dataset.linea] || [];
        const persona = arr.find((p) => p.id === el.dataset.id);
        if (persona) {
          const isNumeric = el.dataset.rosterField === "puntos" || el.dataset.rosterField === "pvp";
          persona[el.dataset.rosterField] = isNumeric ? Number(el.value) || 0 : el.value;
          this.persist();
        }
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
      } else if (el.dataset && el.dataset.distribuidorField) {
        const item = (this.state.distribuidoresDuplicado || []).find((d) => d.id === el.dataset.distribuidorId);
        if (item) {
          item[el.dataset.distribuidorField] = el.value;
          this.persist();
        }
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
        return;
      }
      if (el.type === "file" && el.dataset && el.dataset.target === "__importBackup") {
        const file = el.files && el.files[0];
        el.value = "";
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          let parsed;
          try {
            parsed = JSON.parse(reader.result);
          } catch (e) {
            this.showToast("Questo file non è un backup valido di Cumbre 90.");
            return;
          }
          if (!window.confirm("Questo sostituirà tutti i tuoi dati attuali (Lista dei 250, Albero Genealogico, progressi) con quelli del file di backup. Continuare?")) return;
          const rh = calcularRacha(parsed.racha, parsed.ultimaFecha);
          this.state = hydrateState(parsed);
          this.state.racha = rh.racha;
          this.state.ultimaFecha = rh.ultimaFecha;
          this.persist(true);
          this.render();
          this.showToast("Dati ripristinati correttamente ✨");
        };
        reader.readAsText(file);
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
    const atomyIdInput = document.getElementById("onboarding-atomy-id-input");
    const atomyPassInput = document.getElementById("onboarding-atomy-pass-input");
    const atomyId = atomyIdInput ? atomyIdInput.value.trim() : "";
    const atomyPass = atomyPassInput ? atomyPassInput.value.trim() : "";
    const sponsorNameInput = document.getElementById("onboarding-sponsor-name-input");
    const sponsorPhoneInput = document.getElementById("onboarding-sponsor-phone-input");
    const sponsorNombre = sponsorNameInput ? sponsorNameInput.value.trim() : "";
    const sponsorTelefono = sponsorPhoneInput ? sponsorPhoneInput.value.replace(/[^0-9]/g, "") : "";
    const rh = calcularRacha(0, null);
    App.state.nombre = nombre;
    App.state.foto = App.ui.onboardingFoto;
    App.state.onboarded = true;
    App.state.racha = rh.racha;
    App.state.ultimaFecha = rh.ultimaFecha;
    if (atomyId) App.state.arbolGenealogico.yo.atomyId = atomyId;
    if (atomyPass) App.state.arbolGenealogico.yo.contrasena = atomyPass;
    if (sponsorNombre) App.state.arbolGenealogico.patrocinador.nombre = sponsorNombre;
    if (sponsorTelefono) {
      App.state.whatsapp = sponsorTelefono;
      App.state.arbolGenealogico.patrocinador.telefono = sponsorTelefono;
    }
    App.ui.view = "home";
    if (!App.state.tourVisto) {
      App.ui.tourAbierto = true;
      App.ui.tourPaso = 0;
    }
    App.persist(true);
    App.render();
  },

  "abrir-whatsapp-fab": function () {
    if (App.state.whatsapp && App.state.whatsapp.trim()) {
      window.open(waHref(App.state.whatsapp), "_blank", "noreferrer");
      return;
    }
    App.ui.patrocinadorFabDraft = {
      nombre: (App.state.arbolGenealogico.patrocinador && App.state.arbolGenealogico.patrocinador.nombre) || "",
      telefono: "",
    };
    App.render();
  },

  "cancelar-patrocinador-fab": function () {
    App.ui.patrocinadorFabDraft = null;
    App.render();
  },

  "guardar-patrocinador-fab": function () {
    const d = App.ui.patrocinadorFabDraft;
    if (!d) return;
    const telefono = (d.telefono || "").replace(/[^0-9]/g, "");
    if (!telefono) return;
    App.state.whatsapp = telefono;
    App.state.arbolGenealogico.patrocinador.telefono = telefono;
    if (d.nombre && d.nombre.trim()) App.state.arbolGenealogico.patrocinador.nombre = d.nombre.trim();
    App.ui.patrocinadorFabDraft = null;
    App.persist(true);
    App.render();
    window.open(waHref(telefono), "_blank", "noreferrer");
  },

  "iniciar-tour": function () {
    App.ui.tourAbierto = true;
    App.ui.tourPaso = 0;
    App.render();
  },

  "tour-siguiente": function () {
    if (App.ui.tourPaso < TOUR_PASOS.length - 1) {
      App.ui.tourPaso++;
    } else {
      App.ui.tourAbierto = false;
      App.state.tourVisto = true;
      App.persist(true);
    }
    App.render();
  },

  "tour-anterior": function () {
    App.ui.tourPaso = Math.max(0, App.ui.tourPaso - 1);
    App.render();
  },

  "tour-saltar": function () {
    App.ui.tourAbierto = false;
    App.state.tourVisto = true;
    App.persist(true);
    App.showToast("Puoi rivedere il tour con il pulsante flottante");
    App.render();
  },

  "tour-ir-paso": function (arg) {
    const i = Number(arg);
    if (i >= 0 && i < TOUR_PASOS.length) App.ui.tourPaso = i;
    App.render();
  },

  "toggle-dark": function () {
    App.state.dark = !App.state.dark;
    applyTheme(App.state.dark);
    App.persist();
    App.render();
  },

  "salir-app": function () {
    App.ui.menuOpen = false;
    App.render();
    window.close();
    App.showToast("Se non si è chiusa da sola, ora puoi chiudere questa scheda o tornare indietro.");
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

  "goto-escenario": function () {
    App.ui.view = "plan6";
    App.ui.activeDay = 1;
    App.ui.escenarioAbierto = true;
    App.ui.menuOpen = false;
    App.render();
    const c = document.getElementById("view-container");
    if (c) c.scrollTop = 0;
    window.scrollTo(0, 0);
  },

  "toggle-escenario-inline": function () {
    App.ui.escenarioAbierto = !App.ui.escenarioAbierto;
    App.render();
  },

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
    App.addActividad("Hai completato la Tappa: " + dia.etapa);
    App.celebrate();
    App.ui.logro = { titulo: dia.etapa, sub: "Tappa " + dia.id + " del Piano di Avvio — 6 Giorni conquistata.", tipo: "generic" };
    App.persist(true);
    App.render();
  },

  "share-day": function (arg) {
    downloadDiaCard(App.state, Number(arg));
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
    App.addActividad("Hai completato la Settimana " + weekN + " (" + semana.paso + ")");
    App.celebrate();

    const q = QUINCENAS.find((qq) => qq.n === semana.q);
    const semanasQ = SEMANAS.filter((s) => s.q === q.n);
    const quincenaCompleta = semanasQ.every((s) => App.state.semanas[s.n].done);
    if (quincenaCompleta) {
      App.addActividad("Hai conquistato il Campo: " + q.nombre);
      const premio = App.state.premios[q.n - 1];
      let sub = "Campo del Piano di 90 Giorni conquistato.";
      if (premio) sub += " Hai sbloccato il premio: " + premio.premio + ".";
      App.ui.logro = { titulo: q.nombre, sub: sub, tipo: "generic" };

      const totalCompletas = QUINCENAS.filter((qq2) => {
        const sqs = SEMANAS.filter((s) => s.q === qq2.n);
        return sqs.every((s) => App.state.semanas[s.n].done);
      }).length;
      if (totalCompletas === QUINCENAS.length && !App.state.codigoCumbre) {
        App.state.codigoCumbre = "C90-" + Math.random().toString(36).slice(2, 8).toUpperCase();
        App.ui.logro = { titulo: "Cumbre 90 — Sales Master", sub: "Hai completato tutte e 6 le quindicine del Piano di 90 Giorni!", tipo: "cumbre" };
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
      App.ui.logro = { titulo: RANGOS[i].nombre, sub: "Nuovo rango raggiunto in Atomy.", tipo: "rango", rangoIndex: i };
      App.addActividad("Hai raggiunto il rango: " + RANGOS[i].nombre);
    }
    App.persist(true);
    App.render();
  },

  "download-recog-card": function () { downloadRecogCard(App.state); },
  "download-cert": function () { downloadCertificado(App.state); },
  "share-consumidor-vip": function () { downloadConsumidorVipCard(App.state); },

  /* -------- Modal "Compartir" para tarjetas-imagen (WhatsApp/Instagram/TikTok/Facebook/LinkedIn/YouTube) -------- */

  "cerrar-compartir-imagen": function () {
    App.ui.compartirImagenDraft = null;
    App.render();
  },

  "compartir-imagen-descargar": function () {
    const d = App.ui.compartirImagenDraft;
    if (!d) return;
    downloadBlob(d.blob, d.filename);
    App.showToast("Immagine scaricata — ora puoi allegarla dove vuoi condividerla.");
    App.ui.compartirImagenDraft = null;
    App.render();
  },

  "compartir-imagen-mas-opciones": function () {
    const d = App.ui.compartirImagenDraft;
    if (!d) return;
    const file = new File([d.blob], d.filename, { type: "image/png" });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: "Cumbre 90", text: d.shareText }).catch(function (err) {
        if (err && err.name === "AbortError") return;
        downloadBlob(d.blob, d.filename);
        App.showToast("Impossibile aprire il pannello di condivisione — l'immagine è stata scaricata.");
      });
    } else {
      downloadBlob(d.blob, d.filename);
      App.showToast("Immagine scaricata — ora puoi allegarla dove vuoi condividerla.");
    }
    App.ui.compartirImagenDraft = null;
    App.render();
  },

  /* Instagram, TikTok y YouTube no aceptan recibir un archivo adjunto desde
     una página web sin servidor propio — se descarga la imagen y se abre la
     app/web para que el socio la adjunte a mano, avisando siempre con un toast. */
  "compartir-imagen-plataforma": function (arg) {
    const d = App.ui.compartirImagenDraft;
    if (!d) return;
    downloadBlob(d.blob, d.filename);
    const urls = {
      whatsapp: "https://wa.me/?text=" + encodeURIComponent(d.shareText || ""),
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      tiktok: "https://www.tiktok.com/upload",
      linkedin: "https://www.linkedin.com/feed/?shareActive=true",
      youtube: "https://studio.youtube.com/",
    };
    const labels = { whatsapp: "WhatsApp", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn", youtube: "YouTube" };
    if (urls[arg]) window.open(urls[arg], "_blank");
    App.showToast("Immagine scaricata — aprila in " + (labels[arg] || arg) + " e allegala lì.");
    App.ui.compartirImagenDraft = null;
    App.render();
  },

  "toggle-mentor": function () {
    App.state.mentorMode = !App.state.mentorMode;
    App.persist();
    App.render();
  },

  "add-premio": function () {
    App.state.premios.push(nuevoPremio());
    App.persist(true);
    App.render();
  },

  "delete-premio": function (arg) {
    const i = Number(arg);
    if (App.ui.confirmDeletePremio !== i) {
      App.ui.confirmDeletePremio = i;
      App.render();
      return;
    }
    App.state.premios.splice(i, 1);
    App.ui.confirmDeletePremio = null;
    App.persist(true);
    App.render();
  },

  /* -------- Gran Plan 3 -------- */

  "toggle-granplan": function () {
    App.ui.granPlanOpen = !App.ui.granPlanOpen;
    App.render();
  },

  "add-hito-granplan": function (arg) {
    App.state.granPlan3[arg].push(nuevoHitoGranPlan());
    App.persist(true);
    App.render();
  },

  "delete-hito-granplan": function (arg) {
    const parts = arg.split("|");
    const anio = parts[0];
    const i = Number(parts[1]);
    const key = arg;
    if (App.ui.confirmDeleteHito !== key) {
      App.ui.confirmDeleteHito = key;
      App.render();
      return;
    }
    App.state.granPlan3[anio].splice(i, 1);
    App.ui.confirmDeleteHito = null;
    App.persist(true);
    App.render();
  },

  /* -------- Diario de mi yo futuro -------- */

  "toggle-diario-futuro": function () {
    App.ui.diarioFuturoOpen = !App.ui.diarioFuturoOpen;
    App.render();
  },

  /* -------- Evaluación mensual de Los 8 Pasos -------- */

  "eval8pasos-mes-anterior": function () {
    App.ui.mesEvaluacion8Pasos = mesAdyacente(App.ui.mesEvaluacion8Pasos || mesActualKey(), -1);
    App.render();
  },

  "eval8pasos-mes-siguiente": function () {
    App.ui.mesEvaluacion8Pasos = mesAdyacente(App.ui.mesEvaluacion8Pasos || mesActualKey(), 1);
    App.render();
  },

  "set-puntaje-8pasos": function (arg, el) {
    const catId = el.dataset.cat;
    const valor = Number(arg);
    const mesKey = App.ui.mesEvaluacion8Pasos || mesActualKey();
    const ev = getEvaluacion8Pasos(App.state, mesKey);
    ev.puntajes[catId] = ev.puntajes[catId] === valor ? 0 : valor;
    App.persist(true);
    App.render();
  },

  /* -------- Plan comercial mensual -------- */

  "planmensual-mes-anterior": function () {
    App.ui.mesPlanComercial = mesAdyacente(App.ui.mesPlanComercial || mesActualKey(), -1);
    App.render();
  },

  "planmensual-mes-siguiente": function () {
    App.ui.mesPlanComercial = mesAdyacente(App.ui.mesPlanComercial || mesActualKey(), 1);
    App.render();
  },

  "add-meta-planmensual": function () {
    const mesKey = App.ui.mesPlanComercial || mesActualKey();
    getPlanComercialMensual(App.state, mesKey).metas.push(nuevaMetaPlanMensual());
    App.persist(true);
    App.render();
  },

  "toggle-meta-planmensual": function (arg) {
    const mesKey = App.ui.mesPlanComercial || mesActualKey();
    const meta = getPlanComercialMensual(App.state, mesKey).metas.find((m) => m.id === arg);
    if (!meta) return;
    meta.hecha = !meta.hecha;
    App.persist(true);
    App.render();
  },

  "delete-meta-planmensual": function (arg) {
    if (App.ui.confirmDeleteMetaPlan !== arg) {
      App.ui.confirmDeleteMetaPlan = arg;
      App.render();
      return;
    }
    const mesKey = App.ui.mesPlanComercial || mesActualKey();
    const plan = getPlanComercialMensual(App.state, mesKey);
    plan.metas = plan.metas.filter((m) => m.id !== arg);
    App.ui.confirmDeleteMetaPlan = null;
    App.persist(true);
    App.render();
  },

  "add-accion-planmensual": function () {
    const mesKey = App.ui.mesPlanComercial || mesActualKey();
    getPlanComercialMensual(App.state, mesKey).acciones.push(nuevaAccionPlanMensual());
    App.persist(true);
    App.render();
  },

  "toggle-accion-planmensual": function (arg) {
    const mesKey = App.ui.mesPlanComercial || mesActualKey();
    const accion = getPlanComercialMensual(App.state, mesKey).acciones.find((a) => a.id === arg);
    if (!accion) return;
    accion.hecha = !accion.hecha;
    App.persist(true);
    App.render();
  },

  "delete-accion-planmensual": function (arg) {
    if (App.ui.confirmDeleteAccionPlan !== arg) {
      App.ui.confirmDeleteAccionPlan = arg;
      App.render();
      return;
    }
    const mesKey = App.ui.mesPlanComercial || mesActualKey();
    const plan = getPlanComercialMensual(App.state, mesKey);
    plan.acciones = plan.acciones.filter((a) => a.id !== arg);
    App.ui.confirmDeleteAccionPlan = null;
    App.persist(true);
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
      App.showToast("Attiva i permessi di notifica dalle impostazioni del tuo browser.");
    }
  },

  "descargar-respaldo": function () {
    const blob = new Blob([JSON.stringify(App.state, null, 2)], { type: "application/json" });
    const fecha = hoyISO();
    downloadBlob(blob, "Cumbre90-Respaldo-" + slugFile(App.state.nombre || "socio") + "-" + fecha + ".json");
    App.showToast("Copia di sicurezza scaricata");
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
    App.showToast("Progressi reimpostati");
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
      App.showToast("1 settimana di fila vivendo «" + pilar.t + "»! 🔥");
    } else if (foco.racha === 21) {
      App.celebrate();
      App.ui.logro = { titulo: pilar.t, sub: "21 giorni di fila — ormai è un'abitudine.", tipo: "generic" };
      App.addActividad("Hai trasformato «" + pilar.t + "» in un'abitudine di 21 giorni.");
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

  "share-logro-plataforma": function (arg) {
    const parts = String(arg || "").split("|");
    const platform = parts[0];
    const titulo = parts.slice(1).join("|");
    const text = shareTextForLogro(titulo);
    const abrir = { instagram: "https://www.instagram.com/", tiktok: "https://www.tiktok.com/upload" };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => App.showToast("Testo copiato — incollalo nella tua storia o nel tuo post."),
        () => App.showToast("Impossibile copiare il testo.")
      );
    } else {
      App.showToast("Impossibile copiare il testo.");
    }
    if (abrir[platform]) window.open(abrir[platform], "_blank");
  },

  "share-logro-copy": function (arg) {
    const text = shareTextForLogro(arg) + " " + window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => App.showToast("Messaggio copiato — incollalo dove vuoi!"),
        () => App.showToast("Impossibile copiare il messaggio")
      );
    } else {
      App.showToast("Impossibile copiare il messaggio");
    }
  },

  "add-contacto": function () {
    App.ui.contactoDraft = { nombre: "", telefono: "", pais: "", nivel: "Tiepido", estado: "Da contattare", notas: "", notaSeguimiento: "", proximoSeguimiento: null };
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
        const actualizado = Object.assign({}, App.state.contactos[idx], d);
        // Solo se toca estadoFecha si el estado realmente cambió al guardar — así
        // editar otro campo (p.ej. una nota) no reinicia la fecha del estado.
        if (estadoAnterior !== d.estado) actualizado.estadoFecha = hoyISO();
        App.state.contactos[idx] = actualizado;
      }
    } else {
      App.state.contactos.push(Object.assign({ id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), creado: hoyISO(), estadoFecha: hoyISO(), seguimientosRealizados: [] }, d));
    }
    const nombreRegistrado = d.nombre.trim();
    const quedoComoSocio = d.estado === "Socio" && estadoAnterior !== "Socio";
    App.ui.contactoDraft = null;
    App.ui.contactoEditId = null;
    App.persist(true);
    App.showToast("Contatto salvato");
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
    App.showToast("Contatto eliminato");
    App.render();
  },

  "quick-seguimiento": function (arg, el) {
    const dias = Number(el.dataset.days);
    const c = App.state.contactos.find((x) => x.id === arg);
    if (!c) return;
    c.proximoSeguimiento = addDiasISO(hoyISO(), dias);
    App.persist(true);
    App.showToast("Follow-up programmato");
    App.render();
  },

  "marcar-seguimiento-hecho": function (arg) {
    const c = App.state.contactos.find((x) => x.id === arg);
    if (!c) return;
    if (!Array.isArray(c.seguimientosRealizados)) c.seguimientosRealizados = [];
    c.seguimientosRealizados.push(hoyISO());
    c.proximoSeguimiento = null;
    App.persist(true);
    App.showToast("Follow-up segnato come fatto");
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
          nota: "Giorno " + (i + 1) + " — " + diaInfo.titulo + " — con " + d.contactoNombre,
          recordar: !!hora,
          recordarMin: 10,
        })
      );
    }
    App.ui.agenda6Draft = null;
    App.persist(true);
    App.showToast("Agenda del Piano di 6 Giorni creata con " + d.contactoNombre);
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

  "toggle-paso-duplica-check": function (arg, el) {
    const n = Number(el.dataset.paso);
    const i = Number(arg);
    const est = App.state.pasos[n];
    if (!est) return;
    est.duplicaChecks[i] = !est.duplicaChecks[i];
    App.persist(true);
    App.render();
  },

  /* -------- Paso 8 — seguimiento de duplicación por distribuidor -------- */

  "add-distribuidor-duplica": function () {
    App.state.distribuidoresDuplicado.push(nuevoDistribuidorDuplica());
    App.persist(true);
    App.render();
  },

  "delete-distribuidor-duplica": function (arg) {
    if (App.ui.confirmDeleteDistribuidor !== arg) {
      App.ui.confirmDeleteDistribuidor = arg;
      App.render();
      return;
    }
    App.state.distribuidoresDuplicado = App.state.distribuidoresDuplicado.filter((d) => d.id !== arg);
    App.ui.confirmDeleteDistribuidor = null;
    App.persist(true);
    App.showToast("Distributore eliminato");
    App.render();
  },

  "toggle-distribuidor-duplica-check": function (arg) {
    const parts = arg.split("|");
    const item = App.state.distribuidoresDuplicado.find((d) => d.id === parts[0]);
    if (!item) return;
    const i = Number(parts[1]);
    item.checks[i] = !item.checks[i];
    App.persist(true);
    App.render();
  },

  "share-paso-reflexion": function (arg) {
    const texto = String(arg || "");
    if (navigator.share) {
      navigator.share({ title: "Cumbre 90", text: texto }).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(
        () => App.showToast("Riflessione copiata — incollala dove vuoi!"),
        () => App.showToast("Impossibile copiare il testo")
      );
    } else {
      App.showToast("Impossibile copiare il testo");
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
      App.ui.logro = { titulo: "Scenario di Vita", sub: "Hai unito gli 8 punti in un cerchio perfetto — ora hai chiaro il tuo «perché».", tipo: "generic" };
      App.addActividad("Hai completato il tuo Scenario di Vita — cerchio perfetto!");
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
    App.showToast("Attività salvata");
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
    App.showToast("Attività eliminata");
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
    App.showToast("Riunione salvata");
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
    App.showToast("Riunione eliminata");
    App.render();
  },

  "copy-zoom-link": function (arg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(arg).then(
        () => App.showToast("Link copiato"),
        () => App.showToast("Impossibile copiare il link")
      );
    } else {
      App.showToast("Impossibile copiare il link");
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

  "set-linea-enfoque": function (arg) {
    App.ui.lineaActivaEnfoque = arg;
    App.render();
  },

  "set-enfoque-quincena": function (arg) {
    App.ui.enfoqueQuincena = Number(arg);
    App.render();
  },

  "add-persona-enfoque": function (arg, el) {
    const qn = (el && el.dataset.qn) || App.ui.enfoqueQuincena || App.ui.activeQuincena;
    App.ui.personaEnfoqueDraft = { qn: qn, linea: arg, id: null, nombre: "", telefono: "", atomyId: "", contrasena: "", notas: "" };
    App.ui.confirmDeletePersonaEnfoque = null;
    App.render();
  },

  "edit-persona-enfoque": function (arg, el) {
    const qn = el.dataset.qn || App.ui.enfoqueQuincena || App.ui.activeQuincena;
    const linea = el.dataset.linea;
    const lista = getListaEnfoque(App.state, qn);
    const p = (lista[linea] || []).find((x) => x.id === arg);
    if (!p) return;
    App.ui.personaEnfoqueDraft = { qn: qn, linea: linea, id: p.id, nombre: p.nombre, telefono: p.telefono, atomyId: p.atomyId, contrasena: p.contrasena, notas: p.notas };
    App.ui.confirmDeletePersonaEnfoque = null;
    App.render();
  },

  "cancel-persona-enfoque": function () {
    App.ui.personaEnfoqueDraft = null;
    App.ui.confirmDeletePersonaEnfoque = null;
    App.render();
  },

  "save-persona-enfoque": function () {
    const d = App.ui.personaEnfoqueDraft;
    if (!d || !d.nombre || !d.nombre.trim()) return;
    const qn = d.qn || App.ui.enfoqueQuincena || App.ui.activeQuincena;
    const lista = getListaEnfoque(App.state, qn);
    if (d.id) {
      const p = (lista[d.linea] || []).find((x) => x.id === d.id);
      if (p) {
        p.nombre = d.nombre;
        p.telefono = d.telefono;
        p.atomyId = d.atomyId;
        p.contrasena = d.contrasena;
        p.notas = d.notas;
      }
    } else {
      const nueva = Object.assign(nuevaPersonaEnfoque(), { nombre: d.nombre, telefono: d.telefono, atomyId: d.atomyId, contrasena: d.contrasena, notas: d.notas });
      lista[d.linea] = lista[d.linea] || [];
      lista[d.linea].push(nueva);
    }
    App.ui.personaEnfoqueDraft = null;
    App.persist(true);
    App.showToast("Persona salvata");
    App.render();
  },

  "delete-persona-enfoque": function (arg, el) {
    if (App.ui.confirmDeletePersonaEnfoque !== arg) {
      App.ui.confirmDeletePersonaEnfoque = arg;
      App.render();
      return;
    }
    const qn = el.dataset.qn || (App.ui.personaEnfoqueDraft && App.ui.personaEnfoqueDraft.qn) || App.ui.enfoqueQuincena || App.ui.activeQuincena;
    const linea = el.dataset.linea;
    const lista = getListaEnfoque(App.state, qn);
    lista[linea] = (lista[linea] || []).filter((x) => x.id !== arg);
    App.ui.confirmDeletePersonaEnfoque = null;
    App.ui.personaEnfoqueDraft = null;
    App.persist(true);
    App.showToast("Persona eliminata");
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
    App.showToast("Persona salvata");
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
    App.showToast("Persona eliminata");
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
    App.showToast("Contatto salvato");
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
    App.showToast("Contatto eliminato");
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
    App.showToast("Contatto salvato");
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
    App.showToast("Contatto eliminato");
    App.render();
  },

  "toggle-verificado-enfoque": function (arg, el) {
    const lista = getListaEnfoque(App.state, el.dataset.qn);
    const linea = el.dataset.linea;
    const p = (lista[linea] || []).find((x) => x.id === arg);
    if (!p) return;
    p.verificado = !p.verificado;
    App.persist(true);
    App.render();
  },

  "toggle-reunion-enfoque": function (arg, el) {
    const lista = getListaEnfoque(App.state, el.dataset.qn);
    lista.reunionHecha = !lista.reunionHecha;
    App.persist(true);
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

  "toggle-quincena-resumen": function () {
    App.ui.quincenaResumenAbierto = !App.ui.quincenaResumenAbierto;
    if (App.ui.quincenaResumenAbierto && !App.ui.quincenaVista) App.ui.quincenaVista = calQuincenaActualKey();
    App.render();
  },

  "quincena-nav": function (arg) {
    const actual = App.ui.quincenaVista || calQuincenaActualKey();
    App.ui.quincenaVista = calQuincenaAdyacente(actual, Number(arg));
    App.render();
  },

  "set-quincena-metrica": function (arg) {
    App.ui.quincenaMetricaTab = arg;
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
    catalogo.push(nuevoProductoCatalogo({ categoria: "I miei prodotti" }));
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
