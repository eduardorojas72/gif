/* ---------------------------------------------------------------
   VIEWS — each function returns an HTML string for #view-container
   (or for the fixed regions: header, sidebar, menu, fab, modals)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "perfil", label: "My Profile", icon: "user-badge" },
  { id: "pasos", label: "The 8 Steps", icon: "footprints" },
  { id: "plan6", label: "6-Day Plan", icon: "trail-map" },
  { id: "contactos", label: "List of 250", icon: "users" },
  { id: "clientes", label: "Customers", icon: "package" },
  { id: "agenda", label: "Weekly Agenda", icon: "calendar" },
  { id: "informe", label: "Weekly Report", icon: "trending-up" },
  { id: "enfoque", label: "Focus Meeting", icon: "target" },
  { id: "plan90", label: "90-Day Plan", icon: "mountain-flag" },
  { id: "recursos", label: "Audiovisual Resources", icon: "video" },
  { id: "arbol", label: "My Genealogy Tree", icon: "crown" },
  { id: "socios", label: "My Partners", icon: "users" },
  { id: "sos", label: "S.O.S. Calls", icon: "bell" },
  { id: "eventos", label: "Contact List", icon: "users" },
  { id: "lema", label: "Atomy's Motto", icon: "heart" },
  { id: "premios", label: "Rewards", icon: "gift" },
  { id: "logros", label: "Achievements", icon: "award" },
  { id: "ajustes", label: "Settings", icon: "settings" },
];

// Orden del menu lateral de escritorio, en 2 columnas: la primera agrupa el
// recorrido del negocio (entrenamiento y medios), la segunda el resto
// (perfil, contactos/equipo y ajustes). El menu movil (menu sheet) usa
// MENU_ITEMS en su orden original, sin verse afectado por esto.
const SIDEBAR_COLUMNAS = [
  ["home", "pasos", "plan6", "agenda", "informe", "enfoque", "lema", "plan90", "recursos", "premios"],
  ["perfil", "contactos", "clientes", "arbol", "socios", "sos", "eventos", "logros", "ajustes"],
];

const TOUR_PASOS = [
  { icon: "compass", titulo: "Welcome to Cumbre 90!", texto: "This quick tour shows you what you can do in each section of the app. It takes less than 2 minutes and you can skip it anytime." },
  { icon: "home", titulo: "Home", texto: "Here you'll see your overall progress, your streak of active days, and quick access to what matters most." },
  { icon: "user-badge", titulo: "My Profile", texto: "Your info, your current rank in Atomy, and your photo." },
  { icon: "footprints", titulo: "The 8 Steps", texto: "The foundation of the business explained step by step, with practical activities to apply each one." },
  { icon: "trail-map", titulo: "6-Day Plan", texto: "Your initial training day by day, with daily missions — including downloading the official Atomy app on your phone." },
  { icon: "users", titulo: "List of 250", texto: "Write down every contact (name, phone, status) and follow up on your List of 250." },
  { icon: "package", titulo: "Customers", texto: "Register the people who've already bought: their info, a running history of every order with its value and PV, and follow-up reminders from 1 week up to 11 months." },
  { icon: "calendar", titulo: "Weekly Agenda", texto: "Schedule your calls, meetings, and Zooms, with reminders so you never forget them." },
  { icon: "trending-up", titulo: "Weekly Report", texto: "At the end of the week, just pick the language and send your activity report to your sponsor — the app has already crunched the numbers for you." },
  { icon: "target", titulo: "Focus Meeting", texto: "Organize your Left and Right roster, and use the product calculator to plan your fortnightly purchase and share it with your sponsor." },
  { icon: "mountain-flag", titulo: "90-Day Plan", texto: "Your 6 fortnights with clear goals on the way to Sales Master." },
  { icon: "crown", titulo: "My Genealogy Tree", texto: "Save your ID and password there, along with your sponsor's info — from here you can message them directly on WhatsApp whenever you have a question." },
  { icon: "users", titulo: "My Partners", texto: "Your permanent team directory by Left and Right line — tap a name to see their ID, Zoom, PVP, and last purchase date. The line turns orange when it's gone 11 months without a purchase." },
  { icon: "bell", titulo: "S.O.S. Calls and Contact List", texto: "Save other support numbers you can turn to, and the people you meet at events." },
  { icon: "heart", titulo: "The Motto, Rewards, Achievements, and Settings", texto: "Daily inspiration, your unlocked achievements, and your account settings." },
  { icon: "sparkles", titulo: "All set!", texto: "You can watch this tour again anytime using the floating button you'll see on screen." },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 20) return "Good afternoon";
  return "Good evening";
}

function mountainMarkHTML(size, lit) {
  size = size || 22;
  const dotColor = lit ? "var(--gold)" : "var(--success)";
  return (
    '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none">' +
    '<path d="M2 19L9 7L13 14L16 9L22 19H2Z" fill="var(--accent)"/>' +
    '<circle cx="16" cy="6" r="2" fill="' + dotColor + '"/></svg>'
  );
}

/* ---------------- Welcome / Onboarding ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen cover-screen">' +
    mountainMarkHTML(64, true) +
    '<h1 style="margin-top:22px;font-size:30px;font-weight:700;letter-spacing:-.02em">Cumbre 90</h1>' +
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">The 8 Steps to Success</p>' +
    '<p class="muted" style="margin-top:22px;max-width:340px;font-size:14.5px;line-height:1.6;white-space:pre-line;text-align:left">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Start my journey ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    (LICENCIA_TITULAR ? '<p class="muted small" style="margin-top:26px;opacity:.6">Copy exclusively licensed to ' + escapeHtml(LICENCIA_TITULAR) + "</p>" : "") +
    "</div>"
  );
}

function renderOnboarding(ui) {
  const foto = ui.onboardingFoto;
  const avatarInner = foto ? '<img src="' + foto + '" alt="Your photo"/>' : Icon("camera", { size: 26 });
  return (
    '<div class="center-screen" style="justify-content:center">' +
    '<div style="display:flex;flex-direction:column;align-items:center">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="onboarding-file">' + avatarInner + "</button>" +
    '<input id="onboarding-file" type="file" accept="image/*" class="hidden" data-target="__onboardingFoto">' +
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Change photo" : "Add photo (optional)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">What\'s your name?</h2>' +
    '<p class="muted small" style="margin-top:4px">This helps us personalize your journey.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Your name" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<div style="width:100%;max-width:320px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Your Atomy details <span class="muted" style="font-weight:400">(optional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">We\'ll save them in your Genealogy Tree, so you won\'t have to look them up or ask for them again.</p>' +
    '<input id="onboarding-atomy-id-input" type="text" placeholder="Your Atomy ID" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-atomy-pass-input" type="text" placeholder="Your Atomy password" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<div style="width:100%;max-width:320px;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Your sponsor <span class="muted" style="font-weight:400">(optional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">This way we activate the WhatsApp button to message them right away, and save it in your Genealogy Tree. You can skip this and fill it in later.</p>' +
    '<input id="onboarding-sponsor-name-input" type="text" placeholder="Your sponsor\'s name" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-sponsor-phone-input" type="text" inputmode="numeric" placeholder="Their WhatsApp, e.g. 34600000000" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Start ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    "</div>"
  );
}

/* ---------------- Header / Sidebar / Menu ---------------- */

function renderHeader(state, ui) {
  const hasReminders = getReminders(state).length > 0;
  return (
    '<div class="app-header">' +
    '<button class="icon-btn menu-toggle" data-action="open-menu">' + Icon("menu", { size: 22 }) + "</button>" +
    '<div class="brand">' + mountainMarkHTML(18) + '<span>CUMBRE 90</span></div>' +
    '<div class="actions">' +
    '<button class="icon-btn" style="position:relative" data-action="open-bell">' + Icon("bell", { size: 18 }) +
    (hasReminders ? '<span style="position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:999px;background:var(--warn)"></span>' : "") +
    "</button>" +
    '<button class="icon-btn" data-action="toggle-dark">' + Icon(state.dark ? "sun" : "moon", { size: 18 }) + "</button>" +
    "</div></div>"
  );
}

function renderSidebar(ui) {
  const ordenIds = SIDEBAR_COLUMNAS[0].concat(SIDEBAR_COLUMNAS[1]);
  const items = ordenIds.map(function (id) {
    const it = MENU_ITEMS.find(function (m) { return m.id === id; });
    const active = ui.view === it.id;
    return (
      '<button class="sidebar-item' + (active ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      Icon(it.icon, { size: 20 }) + "<span>" + it.label + "</span></button>"
    );
  }).join("");
  const salir = '<button class="sidebar-item" style="color:var(--warn)" data-action="salir-app">' + Icon("log-out", { size: 20 }) + "<span>Exit</span></button>";
  return (
    '<div class="sidebar">' +
    '<div class="sidebar-logo">' + mountainMarkHTML(26, true) + "</div>" +
    '<div class="sidebar-grid">' + items + salir + "</div>" +
    "</div>"
  );
}

function renderMenuSheet(ui) {
  if (!ui.menuOpen) return "";
  const items = MENU_ITEMS.map(function (it) {
    const active = ui.view === it.id;
    return (
      '<button class="menu-item' + (active ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      medallionHTML(it.icon, 34) + "<span>" + it.label + "</span></button>"
    );
  }).join("");
  const salir = '<button class="menu-item" style="color:var(--warn)" data-action="salir-app">' + medallionHTML("log-out", 34) + "<span>Exit</span></button>";
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><div class="row gap-2">' + mountainMarkHTML(18) + '<span style="font-weight:700;font-size:14px">CUMBRE 90</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + salir + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Exclusive license: ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
    "</div></div>"
  );
}

/* ---------------- reminders / bell ---------------- */

function getReminders(state) {
  const out = [];
  const inact = diasInactivo(state.ultimaFecha);
  if (inact >= 2) {
    out.push({ text: "You've gone " + inact + " days without progress. Pick your journey back up whenever you can — every step counts." });
  }
  const llamada = state.dias[5] && state.dias[5].fields && state.dias[5].fields.llamada;
  if (llamada && llamada.trim()) {
    out.push({ text: "Remember your weekly call with your mentor: " + llamada.trim() + "." });
  }
  const hoy = hoyISO();
  (state.contactos || []).forEach(function (c) {
    if (c.proximoSeguimiento && c.proximoSeguimiento <= hoy && c.estado !== "Discarded") {
      const vencido = c.proximoSeguimiento < hoy;
      out.push({
        text: (vencido ? "Overdue follow-up: " : "Follow-up today: ") + c.nombre + (c.notaSeguimiento ? " — " + c.notaSeguimiento : ""),
        telefono: c.telefono,
        contactoId: c.id,
      });
    }
  });
  return out;
}

function renderTourModal(ui) {
  const total = TOUR_PASOS.length;
  const paso = Math.max(0, Math.min(total - 1, ui.tourPaso || 0));
  const info = TOUR_PASOS[paso];
  const esPrimero = paso === 0;
  const esUltimo = paso === total - 1;

  const dots = TOUR_PASOS.map(function (_, i) {
    return '<span class="tour-dot' + (i === paso ? " active" : "") + '"></span>';
  }).join("");

  const btnAnterior = !esPrimero
    ? '<button class="btn-secondary" data-action="tour-anterior">' + Icon("chevron-left", { size: 15, color: "var(--gold-light)" }) + " Back</button>"
    : "";
  const btnSaltar = !esUltimo
    ? '<button class="btn-secondary" data-action="tour-saltar">Skip</button>'
    : "";
  const btnSiguiente =
    '<button class="btn-primary" data-action="tour-siguiente">' +
    (esUltimo ? "Got it" : "Next") +
    (esUltimo ? "" : " " + Icon("chevron-right", { size: 15, color: "#1B1338" })) +
    "</button>";

  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop"></div>' +
    '<div class="modal-card tour-card">' +
    '<div class="tour-icon-circle">' + Icon(info.icon, { size: 30, color: "var(--gold)" }) + "</div>" +
    '<h3 style="font-size:17px;font-weight:700;margin-top:6px">' + escapeHtml(info.titulo) + "</h3>" +
    '<p class="muted" style="font-size:13.5px;line-height:1.55;margin-top:2px">' + escapeHtml(info.texto) + "</p>" +
    '<div class="tour-dots">' + dots + "</div>" +
    '<div class="muted small">Step ' + (paso + 1) + " of " + total + "</div>" +
    '<div class="tour-nav">' + btnAnterior + btnSaltar + btnSiguiente + "</div>" +
    "</div></div>"
  );
}

function renderBellPanel(state) {
  const reminders = getReminders(state);
  const body = reminders.length
    ? reminders.map(function (r) {
        const waBtn = r.telefono
          ? '<a class="icon-btn" style="flex-shrink:0" href="' + waHrefPersonal(r.telefono) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
          : "";
        const hechoBtn = r.contactoId
          ? '<div class="icon-btn" style="flex-shrink:0;cursor:pointer" data-action="marcar-seguimiento-hecho" data-arg="' + r.contactoId + '" title="Mark follow-up done">' + Icon("check-circle", { size: 14, color: "var(--success)" }) + "</div>"
          : "";
        return (
          '<div class="row gap-2" style="align-items:flex-start;text-align:left;padding:10px 0;border-top:1px solid var(--border)">' +
          Icon("bell", { size: 15, color: "var(--accent)" }) +
          '<span class="small" style="color:var(--text);flex:1">' + escapeHtml(r.text) + "</span>" +
          hechoBtn +
          waBtn +
          "</div>"
        );
      }).join("") +
      (reminders.some(function (r) { return r.contactoId; })
        ? '<button class="link-btn small" style="margin-top:8px" data-action="goto" data-arg="contactos">View List of 250 →</button>'
        : "")
    : '<p class="muted small" style="margin-top:8px">All caught up — you have no pending reminders.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Reminders</span>' +
    '<button class="icon-btn" data-action="close-modal">' + Icon("x", { size: 18 }) + "</button></div>" +
    body +
    "</div></div>"
  );
}

function renderLogroModal(state, ui) {
  const logro = ui.logro;
  if (!logro) return "";
  const actionBtn =
    logro.tipo === "rango"
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("user-badge", { size: 16, color: "#1B1338" }) + " View my badge</button>"
      : logro.tipo === "cumbre"
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("award", { size: 16, color: "#1B1338" }) + " View certificate</button>"
      : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card logro-modal">' +
    Icon("award", { size: 46, color: "var(--gold)" }) +
    '<div class="logro-modal-eyebrow">I just achieved</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Share it — it\'s a great way to get people asking what it\'s about 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    actionBtn +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">' + (actionBtn ? "Close" : "Great, continue") + "</button>" +
    "</div></div>"
  );
}

/* ---------------- Home ---------------- */

function renderHome(state) {
  const quincenasMap = derivarQuincenas(state);
  const etapasHechas = DIAS.filter(function (d) { return state.dias[d.id].done; }).length;
  const campamentosHechos = Object.values(quincenasMap).filter(Boolean).length;
  const totalPasos = DIAS.length + QUINCENAS.length;
  const pctGeneral = Math.round(((etapasHechas + campamentosHechos) / totalPasos) * 100);
  const cumbreLograda = campamentosHechos === QUINCENAS.length;

  const nextEtapa = DIAS.find(function (d) { return !state.dias[d.id].done; });
  const nextCampamento = QUINCENAS.find(function (q) { return !quincenasMap[q.n]; });
  const nextPremioIdx = state.premios.findIndex(function (_, i) { return !quincenasMap[i + 1]; });

  const proximos = [];
  if (nextEtapa) {
    const est = state.dias[nextEtapa.id];
    const total = nextEtapa.checklist.length + 1;
    const hecho = est.checks.filter(Boolean).length + (est.quizOk ? 1 : 0);
    proximos.push({ titulo: nextEtapa.etapa, sub: hecho + "/" + total, pct: Math.round((hecho / total) * 100), goTo: "plan6" });
  }
  if (nextCampamento) proximos.push({ titulo: nextCampamento.nombre, sub: "0/1", pct: 0, goTo: "plan90" });
  if (nextPremioIdx !== -1) proximos.push({ titulo: state.premios[nextPremioIdx].premio, sub: "0/1", pct: 0, goTo: "premios" });

  let mensaje = "Keep going, every step counts!";
  if (pctGeneral === 0) mensaje = "Your journey starts today. Let's go!";
  else if (pctGeneral === 100) mensaje = "You've completed everything available! Keep it up.";
  else if (pctGeneral >= 70) mensaje = "You're almost at the Summit — don't let up.";

  const chips = DIAS.map(function (d) { return '<div class="seg' + (state.dias[d.id].done ? " on" : "") + '"></div>'; }).join("");

  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Your photo"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  const proximosHtml = proximos.length
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Coming up next</span></div>' +
      '<div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">' +
      proximos.map(function (it) {
        return (
          '<button data-action="goto" data-arg="' + it.goTo + '" style="text-align:left;width:100%">' +
          '<div class="row between"><span style="font-size:13.5px;font-weight:600;color:var(--text)">' + escapeHtml(it.titulo) + '</span><span class="muted small">' + it.sub + "</span></div>" +
          '<div class="progressbar gold thin" style="margin-top:6px"><div style="width:' + Math.max(it.pct, 4) + '%"></div></div>' +
          "</button>"
        );
      }).join("") +
      "</div>" +
      '<button class="link-btn small" style="margin-top:12px" data-action="goto" data-arg="logros">View all achievements →</button>' +
      "</div>"
    : "";

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(RANGOS[state.rangoIndex].nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Hi, ' + escapeHtml(state.nombre || "partner") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Welcome to Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">6 Stages · 6 Camps · Unlimited access</div>' +
    '<div class="chip-row" style="margin-top:16px">' + chips + "</div>" +
    '<div class="row between" style="margin-top:16px"><span class="muted small">' + (etapasHechas + campamentosHechos) + "/" + totalPasos + ' milestones completed</span><span style="font-size:24px;font-weight:700">' + pctGeneral + "%</span></div>" +
    '<div class="progressbar" style="margin-top:8px"><div style="width:' + pctGeneral + '%"></div></div>' +
    '<div class="muted small" style="margin-top:12px">' + mensaje + "</div>" +
    "</div>" +

    escenarioVidaHomeCardHTML(state) +

    enlacesUtilesHomeCardHTML() +

    proximosHtml +

    mountainSceneHTML(quincenasMap, cumbreLograda, 190).replace('<div class="mountain-wrap">', '<button class="mountain-wrap card-hover" data-action="goto" data-arg="plan90" style="cursor:pointer">').replace(/<\/div>$/, '</button>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="pasos">' + pasosHeaderMedallionHTML(44) + '<div class="nc-body"><div class="nc-title">The 8 Steps to Success</div><div class="nc-desc">Your permanent reference</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="lema">' + medallionHTML("heart", 44) + '<div class="nc-body"><div class="nc-title">Atomy\'s Motto</div><div class="nc-desc">Philosophy and code of ethics</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="contactos">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">List of 250 Contacts</div><div class="nc-desc">' + (state.contactos || []).length + ' registered · schedule follow-ups</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan6">' + medallionHTML("trail-map", 44) + '<div class="nc-body"><div class="nc-title">6-Day Startup Plan</div><div class="nc-desc">Walk your map day by day</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="premios">' + medallionHTML("gift", 44) + '<div class="nc-body"><div class="nc-title">Rewards from your sponsor</div><div class="nc-desc">See what you can earn</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +

    (cumbreLograda
      ? '<button class="btn-primary" style="background:var(--success)" data-action="goto" data-arg="cumbre">' + Icon("award", { size: 18, color: "#fff" }) + ' You reached the Summit! View achievement</button>'
      : "")
  );
}

function enlacesUtilesHomeCardHTML() {
  return (
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Before Anything Else</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Keep handy the apps and pages you\'ll need for your day-to-day with Atomy.</p>' +
    '<div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
    ENLACES_UTILES.map(function (e) {
      return (
        '<a class="row between" href="' + e.url + '" target="_blank" rel="noreferrer" style="padding:9px 8px;border:1px solid var(--border-soft);border-radius:10px;background:rgba(255,255,255,0.03)">' +
        '<span class="small" style="font-weight:600;line-height:1.3">' + escapeHtml(e.nombre) + "</span>" +
        Icon("chevron-right", { size: 14, color: "var(--text-soft)" }) +
        "</a>"
      );
    }).join("") +
    "</div></div>"
  );
}

/* ---------------- Life Scenario ---------------- */

function escenarioVidaHomeCardHTML(state) {
  const esc = state.escenarioVida;
  const iniciadas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance > 0 || ((esc[c.id] || {}).meta || "").trim(); }).length;
  const completas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance === 4; }).length;

  if (state.escenarioCompletado) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--gold);background:var(--accent-soft)" data-action="goto-escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Life Scenario</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">🏆 Perfect circle! You reached your 8 goals.</div>' +
      '<div class="muted small" style="margin-top:2px">Tap to review them or set yourself bigger goals.</div>' +
      "</button>"
    );
  }
  if (iniciadas === 0) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--accent)" data-action="goto-escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Before you begin</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">Define your Life Scenario — your “why”</div>' +
      '<div class="muted small" style="margin-top:2px">It\'s the first step of Step 1. Determine your dreams across 8 areas of your life before moving forward.</div>' +
      "</button>"
    );
  }
  const pct = Math.round((completas / ESCENARIO_CATEGORIAS.length) * 100);
  return (
    '<button class="card card-hover" style="text-align:left;width:100%" data-action="goto-escenario">' +
    '<div class="row between"><div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Life Scenario</span></div>' +
    '<span class="muted small">' + completas + "/" + ESCENARIO_CATEGORIAS.length + "</span></div>" +
    '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 4) + '%"></div></div>' +
    '<div class="muted small" style="margin-top:8px">Keep completing your goals until you reach the perfect circle.</div>' +
    "</button>"
  );
}

function escenarioCategoriaHTML(cat, esc) {
  const data = esc[cat.id] || { meta: "", avance: 0 };
  const dots = [1, 2, 3, 4].map(function (lvl) {
    const on = lvl <= data.avance;
    return '<button class="avance-dot' + (on ? " on" : "") + '" data-action="set-escenario-avance" data-cat="' + cat.id + '" data-arg="' + lvl + '" aria-label="Level ' + lvl + '"></button>';
  }).join("");
  return (
    '<div class="card escenario-card">' +
    '<div class="row gap-3" style="align-items:flex-start">' +
    medallionHTML(cat.icon, 40) +
    '<div style="flex:1;min-width:0">' +
    '<div style="font-weight:700;font-size:14.5px">' + escapeHtml(cat.label) + "</div>" +
    '<div class="muted small" style="margin-top:1px;text-transform:uppercase;letter-spacing:.06em;font-size:10.5px">' + escapeHtml(cat.pilar) + "</div>" +
    '<div class="row gap-1" style="margin-top:8px">' + dots + "</div>" +
    "</div></div>" +
    '<textarea rows="2" placeholder="' + escapeHtml(cat.ejemplo) + '" data-field="escenarioVida.' + cat.id + '.meta" ' +
    'style="margin-top:10px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(data.meta) + "</textarea>" +
    "</div>"
  );
}

function bucketRowHTML(i, item) {
  const ejemplo = BUCKET_LIST_EJEMPLOS[i % BUCKET_LIST_EJEMPLOS.length];
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="align-items:flex-start">' +
    '<button class="avance-dot' + (item.cumplido ? " on" : "") + '" style="flex-shrink:0;margin-top:3px" data-action="toggle-bucket-cumplido" data-arg="' + i + '" aria-label="Mark as achieved"></button>' +
    '<div style="flex:1;min-width:0">' +
    '<div class="row gap-2">' +
    '<span class="muted small" style="flex-shrink:0;width:22px">' + (i + 1) + ".</span>" +
    '<input type="text" placeholder="' + escapeHtml(ejemplo.texto) + '" value="' + escapeHtml(item.texto) + '" data-field="bucketList.' + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (item.cumplido ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13.5px;padding:4px 2px;outline:none">' +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;padding-left:26px;flex-wrap:wrap">' +
    '<input type="date" value="' + (item.fecha || "") + '" data-field="bucketList.' + i + '.fecha" style="flex:1;min-width:120px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none">' +
    '<input type="text" placeholder="' + escapeHtml(ejemplo.porque) + '" value="' + escapeHtml(item.porque) + '" data-field="bucketList.' + i + '.porque" style="flex:1.6;min-width:140px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none">' +
    "</div></div></div></div>"
  );
}

function bucketListSectionHTML(state, ui) {
  const lista = state.bucketList;
  const escritas = lista.filter(function (i) { return (i.texto || "").trim(); }).length;
  const cumplidas = lista.filter(function (i) { return i.cumplido; }).length;
  const open = !!ui.bucketListOpen;
  const rows = open ? lista.map(function (item, i) { return bucketRowHTML(i, item); }).join("") : "";
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-bucket-list">' +
    '<div class="row gap-2">' + Icon("clipboard-list", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">List of 100 — my dreams</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Write down up to 100 things you\'d like to achieve, have, or experience — with a date and your “why.” No need to fill it out in order or all at once.</p>' +
    '<div class="muted small" style="margin-top:4px">' + escritas + " written · " + cumplidas + " achieved</div>" +
    (open ? '<div class="view-stack gap-sm" style="margin-top:12px">' + rows + "</div>" : "") +
    "</div>"
  );
}

/* ---------------- Gran Plan 3 — 3-year projection ---------------- */

function granPlanHitoRowHTML(anio, i, h, confirmKey) {
  const key = anio + "|" + i;
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' +
    '<input type="text" placeholder="Date (e.g. 08/2026)" value="' + escapeHtml(h.fecha) + '" data-field="granPlan3.' + anio + "." + i + '.fecha" style="flex:1;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Mastery level" value="' + escapeHtml(h.nivel) + '" data-field="granPlan3.' + anio + "." + i + '.nivel" style="flex:1.4;min-width:130px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;align-items:center;flex-wrap:wrap">' +
    '<input type="text" placeholder="Group PV" value="' + escapeHtml(h.pvGrupal) + '" data-field="granPlan3.' + anio + "." + i + '.pvGrupal" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Income" value="' + escapeHtml(h.ingresos) + '" data-field="granPlan3.' + anio + "." + i + '.ingresos" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<div data-action="delete-hito-granplan" data-arg="' + key + '" style="cursor:pointer;color:var(--warn);font-size:11px;padding:4px;flex-shrink:0">' + (confirmKey === key ? "Delete?" : Icon("x", { size: 14 })) + "</div>" +
    "</div></div>"
  );
}

function granPlanAnioHTML(anio, label, hitos, ui) {
  const rows = hitos.map(function (h, i) { return granPlanHitoRowHTML(anio, i, h, ui.confirmDeleteHito); }).join("");
  return (
    '<div style="margin-top:14px">' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light)">' + escapeHtml(label) + "</div>" +
    '<div class="view-stack gap-sm" style="margin-top:6px">' + rows + "</div>" +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-hito-granplan" data-arg="' + anio + '">+ Add milestone</div>' +
    "</div>"
  );
}

function granPlanSectionHTML(state, ui) {
  const open = !!ui.granPlanOpen;
  const gp = state.granPlan3;
  const total = gp.anio1.length + gp.anio2.length + gp.anio3.length;
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-granplan">' +
    '<div class="row gap-2">' + Icon("trending-up", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Gran Plan 3 — 3-year projection</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + total + " milestones saved</div>" +
    (open
      ? '<p class="muted small" style="margin-top:8px;line-height:1.5">' + escapeHtml(GRAN_PLAN_3_INTRO) + "</p>" +
        granPlanAnioHTML("anio1", "Year 1", gp.anio1, ui) +
        granPlanAnioHTML("anio2", "Year 2", gp.anio2, ui) +
        granPlanAnioHTML("anio3", "Year 3", gp.anio3, ui)
      : "") +
    "</div>"
  );
}

/* ---------------- Diary of My Future Self ---------------- */

function diarioFuturoSectionHTML(state, ui) {
  const open = !!ui.diarioFuturoOpen;
  const texto = state.diarioFuturo.texto;
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-diario-futuro">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Diary of My Future Self</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    (open
      ? '<p class="muted small" style="margin-top:6px;line-height:1.5">' + escapeHtml(DIARIO_FUTURO_INTRO) + "</p>" +
        '<textarea rows="8" placeholder="' + escapeHtml(DIARIO_FUTURO_EJEMPLO) + '" data-field="diarioFuturo.texto" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 12px;font-size:13px;outline:none;resize:vertical;font-family:inherit;line-height:1.5">' + escapeHtml(texto) + "</textarea>"
      : '<p class="muted small" style="margin-top:6px">' + (texto ? "You've already written your letter — tap to view or edit it." : "You haven't written it yet.") + "</p>") +
    "</div>"
  );
}

/* ---------------- Monthly business plan ---------------- */

function planComercialMensualHTML(state, ui) {
  const mesKey = ui.mesPlanComercial || mesActualKey();
  const plan = getPlanComercialMensual(state, mesKey);

  const metasHtml = plan.metas.map(function (m, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (m.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-meta-planmensual" data-arg="' + m.id + '"></div>' +
      '<input type="text" placeholder="E.g. Earn $3,000 USD a month" value="' + escapeHtml(m.texto) + '" data-field="planComercialMensual.' + mesKey + ".metas." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (m.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-meta-planmensual" data-arg="' + m.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteMetaPlan === m.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const accionesHtml = plan.acciones.map(function (a, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (a.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-accion-planmensual" data-arg="' + a.id + '"></div>' +
      '<input type="text" placeholder="E.g. Call 10 people a day" value="' + escapeHtml(a.texto) + '" data-field="planComercialMensual.' + mesKey + ".acciones." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (a.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-accion-planmensual" data-arg="' + a.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteAccionPlan === a.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const quincenasHtml = plan.quincenas.map(function (q, i) {
    const label = i === 0 ? "First half of the month" : "Second half of the month";
    return (
      '<div class="card" style="padding:10px 12px;margin-top:8px">' +
      '<div class="muted small" style="font-weight:600">' + label + "</div>" +
      '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
      '<div style="flex:1;min-width:80px"><label class="muted small">Income</label><input type="number" value="' + (Number(q.ingresos) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.ingresos" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:80px"><label class="muted small">Sales PV</label><input type="number" value="' + (Number(q.pv) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:100px"><label class="muted small">Mastery level</label><input type="text" value="' + escapeHtml(q.nivel) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.nivel" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      "</div></div>"
    );
  }).join("");

  return (
    '<div class="card">' +
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("target", { size: 13, color: "var(--gold)" }) + " Monthly business plan</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="planmensual-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="planmensual-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Goals</div>' +
    metasHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-meta-planmensual">+ Add goal</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Action plan</div>' +
    accionesHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-accion-planmensual">+ Add action</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Income by fortnight</div>' +
    quincenasHtml +
    "</div>"
  );
}

/* Reusable core of the Life Scenario experience (radar + category cards +
   List of 100), without the section header or intro — used both in the
   standalone view and embedded inside Day 1. */
function renderEscenarioVidaBody(state, ui) {
  const esc = state.escenarioVida;
  const completas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance === 4; }).length;
  const cards = ESCENARIO_CATEGORIAS.map(function (c) { return escenarioCategoriaHTML(c, esc); }).join("");
  const pasos = "<ol style=\"margin:0;padding-left:18px\">" + ESCENARIO_PASOS.map(function (p) { return '<li class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(p) + "</li>"; }).join("") + "</ol>";

  return (
    '<div class="card" style="text-align:center">' +
    escenarioRadarSVG(ESCENARIO_CATEGORIAS, esc) +
    '<div class="muted small" style="margin-top:6px">' + completas + " of " + ESCENARIO_CATEGORIAS.length + " goals in the perfect circle</div>" +
    "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">How do I fill it in?</div>' + pasos + "</div>" +
    '<div class="card"><div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + Icon("video", { size: 13, color: "var(--gold)" }) + " Videos to help you build it</div>" + videoListCardHTML(ESCENARIO_VIDEOS) + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    granPlanSectionHTML(state, ui) +
    diarioFuturoSectionHTML(state, ui) +
    planComercialMensualHTML(state, ui) +
    bucketListSectionHTML(state, ui)
  );
}

function renderEscenarioVida(state, ui) {
  return (
    sectionHeaderHTML("Life Scenario", ESCENARIO_LEMA, "compass") +
    '<div class="card"><p class="small" style="line-height:1.6">' + escapeHtml(ESCENARIO_INTRO) + "</p></div>" +
    renderEscenarioVidaBody(state, ui)
  );
}

function videoRowHTML(v) {
  return (
    '<a class="card card-hover row gap-3" style="text-decoration:none;color:inherit;align-items:center" href="' + escapeHtml(v.url) + '" target="_blank" rel="noreferrer">' +
    '<div style="flex-shrink:0;width:38px;height:38px;border-radius:50%;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">' + Icon("video", { size: 17, color: "var(--gold)" }) + "</div>" +
    '<div style="flex:1;font-weight:600;font-size:13.5px;line-height:1.4">' + escapeHtml(v.titulo) + "</div>" +
    Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) +
    "</a>"
  );
}

function videoListCardHTML(videos) {
  return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' + videos.map(videoRowHTML).join("") + "</div>";
}

function documentRowHTML(d) {
  return (
    '<a class="card card-hover row gap-3" style="text-decoration:none;color:inherit;align-items:center" href="' + escapeHtml(d.url) + '" target="_blank" rel="noreferrer">' +
    '<div style="flex-shrink:0;width:38px;height:38px;border-radius:50%;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">' + Icon("download", { size: 17, color: "var(--gold)" }) + "</div>" +
    '<div style="flex:1;font-weight:600;font-size:13.5px;line-height:1.4">' + escapeHtml(d.titulo) + "</div>" +
    Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) +
    "</a>"
  );
}

function documentListCardHTML(documentos) {
  return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' + documentos.map(documentRowHTML).join("") + "</div>";
}

function renderRecursosAudiovisuales(state, ui) {
  const categorias = RECURSOS_AUDIOVISUALES.map(function (cat) {
    const documentos = cat.id === "negocio"
      ? '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 8px">' + Icon("download", { size: 14, color: "var(--gold)" }) + " Documents</div>" + documentListCardHTML(NEGOCIO_DOCUMENTOS)
      : "";
    return (
      '<div class="card" style="background:transparent;border:none;padding:0;margin-top:18px">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + Icon(cat.icon, { size: 14, color: "var(--gold)" }) + " " + escapeHtml(cat.label) + "</div>" +
      videoListCardHTML(cat.videos) +
      documentos +
      "</div>"
    );
  }).join("");

  return (
    sectionHeaderHTML("Audiovisual Resources", "The most important videos to understand and share Atomy, organized by topic.", "video") +
    categorias
  );
}

/* ---------------- Monthly Los 8 Pasos self-assessment ---------------- */

function evaluacion8PasosHTML(state, ui) {
  const mesKey = ui.mesEvaluacion8Pasos || mesActualKey();
  const ev = getEvaluacion8Pasos(state, mesKey);

  const filas = EVALUACION_8PASOS_CATEGORIAS.map(function (c) {
    const val = ev.puntajes[c.id] || 0;
    const dots = [1, 2, 3, 4, 5].map(function (n) {
      const on = n <= val;
      return '<div class="avance-dot' + (on ? " on" : "") + '" style="cursor:pointer" data-action="set-puntaje-8pasos" data-cat="' + c.id + '" data-arg="' + n + '"></div>';
    }).join("");
    return (
      '<div style="margin-top:12px">' +
      '<div style="font-size:13px;font-weight:600">' + escapeHtml(c.label) + "</div>" +
      '<div class="muted small" style="margin-top:2px;line-height:1.45">' + escapeHtml(c.pregunta) + "</div>" +
      '<div class="row gap-1" style="margin-top:6px">' + dots + "</div>" +
      "</div>"
    );
  }).join("");

  const total = EVALUACION_8PASOS_CATEGORIAS.reduce(function (sum, c) { return sum + (ev.puntajes[c.id] || 0); }, 0);
  const banda = EVALUACION_8PASOS_BANDAS.find(function (b) { return total >= b.min && total <= b.max; }) || EVALUACION_8PASOS_BANDAS[0];

  return (
    '<div class="card">' +
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + " Monthly Self-Assessment — The 8 Steps</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="eval8pasos-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="eval8pasos-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    filas +
    '<div class="card" style="margin-top:14px;background:var(--accent-soft);border-color:var(--gold)">' +
    '<div class="row between"><span style="font-weight:700;font-size:13px">Your score this month</span><span style="font-weight:700;font-size:18px;color:var(--gold)">' + total + "</span></div>" +
    '<p class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(banda.texto) + "</p>" +
    "</div>" +
    '<div class="field" style="margin-top:12px"><label>Praise points</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.alabanza" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.alabanza) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Reflection points</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.reflexion" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.reflexion) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Sponsor\'s comments</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.comentarioPatrocinador" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.comentarioPatrocinador) + "</textarea></div>" +
    "</div>"
  );
}

const OCHO_CORE_NOTA_HTML =
  '<div class="card" style="background:var(--accent-soft);border:none">' +
  '<div class="row gap-2" style="font-weight:700;font-size:13px">' + Icon("check-circle", { size: 15, color: "var(--accent)" }) + " Your daily/monthly 8 Core</div>" +
  '<p class="muted small" style="margin-top:6px;line-height:1.55">You already track that daily checklist (Reading, Watching VOD, Meeting attendance, Product usage, Showing the plan, Customer delivery, Sponsor consulting, Building trust) on your official Atomy page — go to <b>Follow to Success → My Monthly 8 Core</b> and check it off there day by day.</p>' +
  "</div>";

/* ---------------- The 8 Steps ---------------- */

function renderPasos(state, ui) {
  const vueltos = ui.pasosVueltos || {};
  const cards = OCHO_PASOS.map(function (p) {
    const flipped = !!vueltos[p.n];
    const est = state.pasos[p.n] || { checks: [] };
    const front =
      '<div class="flip-face flip-front">' +
      pasoMedallionHTML(p.icon, 68) +
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Step ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="line-height:1.45;margin-top:4px;max-width:44ch">' + escapeHtml(p.d) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Tap to see the full explanation</span></div>' +
      "</div>";

    const checklist = (p.actividades || []).length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">This step\'s activities</div>' +
        '<div style="margin-top:6px">' +
        p.actividades.map(function (a, i) {
          const on = !!est.checks[i];
          return (
            '<div class="check-row" style="padding-bottom:2px">' +
            (i < p.actividades.length - 1 ? '<div class="line' + (on ? " on" : "") + '" style="left:11.5px"></div>' : "") +
            /* note: we use <div> here, not <button> — this checklist lives inside a
               step's flippable card, which is already a <button>; a <button> can't nest another. */
            '<div class="check-dot' + (on ? " on" : "") + '" style="width:24px;height:24px;font-size:10px;cursor:pointer" data-action="toggle-paso-check" data-paso="' + p.n + '" data-arg="' + i + '">' + (on ? Icon("check", { size: 12, color: "#1B1338" }) : (i + 1)) + "</div>" +
            '<div class="check-label' + (on ? " on" : "") + '" style="font-size:12.5px;padding:2px 0 16px;cursor:pointer" data-action="toggle-paso-check" data-paso="' + p.n + '" data-arg="' + i + '">' + escapeHtml(a) + "</div>" +
            "</div>"
          );
        }).join("") +
        "</div>"
      : "";

    const duplicaChecklist = (p.duplicaChecklist || []).length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Learn and Duplicate</div>' +
        '<p class="muted small" style="margin-top:2px;line-height:1.5">Check off each task once you know how to do it — and once you\'ve taught it to your team.</p>' +
        '<div style="margin-top:6px">' +
        p.duplicaChecklist.map(function (a, i) {
          const on = !!est.duplicaChecks[i];
          return (
            '<div class="check-row" style="padding-bottom:2px">' +
            (i < p.duplicaChecklist.length - 1 ? '<div class="line' + (on ? " on" : "") + '" style="left:11.5px"></div>' : "") +
            '<div class="check-dot' + (on ? " on" : "") + '" style="width:24px;height:24px;font-size:10px;cursor:pointer" data-action="toggle-paso-duplica-check" data-paso="' + p.n + '" data-arg="' + i + '">' + (on ? Icon("check", { size: 12, color: "#1B1338" }) : (i + 1)) + "</div>" +
            '<div class="check-label' + (on ? " on" : "") + '" style="font-size:12.5px;padding:2px 0 16px;cursor:pointer" data-action="toggle-paso-duplica-check" data-paso="' + p.n + '" data-arg="' + i + '">' + escapeHtml(a) + "</div>" +
            "</div>"
          );
        }).join("") +
        "</div>"
      : "";

    const distribuidoresCard = p.n === 8 ? renderDistribuidoresDuplicaCard(state, ui) : "";

    const reflexion = p.reflexion
      ? '<div class="card" style="margin-top:14px;background:var(--accent-soft);border-color:var(--gold)">' +
        '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("heart", { size: 13, color: "var(--gold)" }) + " Reflection to share</div>" +
        '<p style="font-size:13px;line-height:1.55;margin-top:6px;font-style:italic">“' + linkifyText(p.reflexion) + '”</p>' +
        '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(p.reflexion) + '">' + Icon("share2", { size: 13 }) + " Share</div>" +
        "</div>"
      : "";

    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Step " + p.n + " — " + escapeHtml(p.t) + "</div>" +
      '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
      (p.n === 1
        ? '<div class="badge soft" style="cursor:pointer" data-action="goto-escenario">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + " " + Icon("chevron-right", { size: 11 }) + "</div>"
        : '<span class="badge soft">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + "</span>") +
      '<span class="badge gold">' + Icon("sparkles", { size: 11 }) + " " + escapeHtml(p.objetivo) + "</span>" +
      "</div>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Detailed explanation</div>' +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + linkifyText(p.explicacion) + "</p>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Practical examples</div>' +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + linkifyText(p.ejemplo) + "</p>" +
      (p.guion
        ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">' + escapeHtml(p.guion.titulo) + "</div>" +
          p.guion.lineas.map(function (l) { return '<p style="font-size:13px;line-height:1.55;margin-top:6px">' + linkifyText(l) + "</p>"; }).join("")
        : "") +
      (p.n === 1 ? '<div style="margin-top:14px">' + smartOkrCardHTML() + "</div>" : "") +
      checklist + duplicaChecklist + reflexion +
      "</div>";
    return (
      '<button class="flip-card paso-checklist' + (flipped ? " is-open" : "") + '" data-action="flip-paso" data-arg="' + p.n + '">' +
      '<div class="flip-inner' + (flipped ? " flipped" : "") + '">' + front + back + "</div>" +
      "</button>" +
      distribuidoresCard
    );
  }).join("");
  const header =
    '<div class="section-header">' + pasosHeaderMedallionHTML(64) +
    '<div><h2>The 8 Steps to Success</h2><p>Based on the teaching of President Han-Gill Park. Tap each step to see the full explanation.</p></div></div>';
  return header +
    videoRowHTML({ titulo: "The 8 Steps To Success - Han Gill Park", url: "https://www.youtube.com/watch?v=z-Nzz1HkoE8" }) +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + cards + "</div>" +
    evaluacion8PasosHTML(state, ui) +
    OCHO_CORE_NOTA_HTML;
}

/* Step 8 — tracking table: each row is a "Learn and Duplicate" item, each
   column a distributor on the team. Lives OUTSIDE the flippable <button>
   (unlike the rest of the step's content) because it needs a text <input>
   for the name — an <input> inside a <button> isn't valid and in practice
   the browser won't let you focus it. */
function renderDistribuidoresDuplicaCard(state, ui) {
  const paso8 = OCHO_PASOS.find(function (p) { return p.n === 8; });
  const items = (paso8 && paso8.duplicaChecklist) || [];
  const distribuidores = state.distribuidoresDuplicado || [];
  const confirmId = ui.confirmDeleteDistribuidor;
  const addBtn = '<div class="btn-secondary" style="margin-top:12px;width:fit-content;cursor:pointer" data-action="add-distribuidor-duplica">+ Add distributor</div>';

  const intro =
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' +
    Icon("users", { size: 13, color: "var(--gold)" }) + " Per-distributor duplication tracker</div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Add each distributor on your team and check off, one by one, which “Learn and Duplicate” tasks you\'ve already taught them. You can add distributors gradually — no need to add them all at once.</p>';

  if (!distribuidores.length) {
    return '<div class="card" style="margin-top:14px">' + intro + addBtn + "</div>";
  }

  const headerCells = distribuidores.map(function (d) {
    const total = items.length;
    const done = d.checks.filter(Boolean).length;
    const deleteInner = confirmId === d.id ? "Delete?" : Icon("x", { size: 12 });
    return (
      '<th style="min-width:150px;padding:0 6px 8px;vertical-align:top;font-weight:400">' +
      '<input type="text" value="' + escapeHtml(d.nombre) + '" placeholder="Distributor\'s name" data-distribuidor-field="nombre" data-distribuidor-id="' + d.id + '" style="width:100%;font-size:12.5px;font-weight:700;padding:6px 8px">' +
      '<div class="row between" style="margin-top:4px;align-items:center">' +
      '<span class="muted" style="font-size:10.5px">' + done + "/" + total + "</span>" +
      '<div data-action="delete-distribuidor-duplica" data-arg="' + d.id + '" style="cursor:pointer;color:var(--warn);font-size:10.5px;display:flex;align-items:center;gap:3px;white-space:nowrap">' + deleteInner + "</div>" +
      "</div>" +
      "</th>"
    );
  }).join("");

  const bodyRows = items.map(function (item, i) {
    const cells = distribuidores.map(function (d) {
      const on = !!d.checks[i];
      return (
        '<td style="text-align:center;padding:5px 6px">' +
        '<div class="check-dot' + (on ? " on" : "") + '" style="width:26px;height:26px;font-size:10px;margin:0 auto;cursor:pointer" data-action="toggle-distribuidor-duplica-check" data-arg="' + d.id + "|" + i + '">' +
        (on ? Icon("check", { size: 12, color: "#1B1338" }) : "") +
        "</div>" +
        "</td>"
      );
    }).join("");
    return (
      '<tr>' +
      '<td style="padding:5px 12px 5px 0;font-size:12px;color:var(--text-soft);max-width:230px;position:sticky;left:0;background:var(--card)">' + escapeHtml(item) + "</td>" +
      cells +
      "</tr>"
    );
  }).join("");

  return (
    '<div class="card" style="margin-top:14px">' +
    intro +
    '<div style="overflow-x:auto;margin-top:10px">' +
    '<table style="border-collapse:collapse;width:100%">' +
    '<thead><tr><th style="position:sticky;left:0;background:var(--card)"></th>' + headerCells + "</tr></thead>" +
    "<tbody>" + bodyRows + "</tbody>" +
    "</table>" +
    "</div>" +
    addBtn +
    "</div>"
  );
}

/* ---------------- Atomy's Motto ---------------- */

function lemaFocoHTML(state) {
  const foco = state.lemaFoco || { pilar: null, racha: 0, ultimaFecha: null };
  const hoy = hoyISO();
  const yaHoy = foco.ultimaFecha === hoy;
  const pilarSel = foco.pilar != null ? LEMA_ATOMY.pilares.find(function (p) { return p.n === foco.pilar; }) : null;

  const selector = LEMA_ATOMY.pilares.map(function (p) {
    const active = foco.pilar === p.n;
    return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="set-lema-foco" data-arg="' + p.n + '">' + escapeHtml(p.t) + "</button>";
  }).join(" ");

  return (
    '<div class="card" style="margin-top:14px">' +
    '<div class="row gap-2">' + Icon("flame", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Your focus pillar</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Which of the 4 pillars do you feel you\'re living the least? Pick it, set the goal of living it every day, and track your streak here.</p>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:10px">' + selector + "</div>" +
    (pilarSel
      ? '<div style="margin-top:16px;text-align:center">' +
        '<div style="font-size:34px;font-weight:700;color:var(--gold-light)">' + foco.racha + "</div>" +
        '<div class="muted small">' + (foco.racha === 1 ? "day in a row" : "days in a row") + " living “" + escapeHtml(pilarSel.t) + "”</div>" +
        '<button class="btn-primary" style="margin-top:12px"' + (yaHoy ? " disabled" : "") + ' data-action="marcar-lema-hoy">' +
        (yaHoy ? Icon("check", { size: 16, color: "#fff" }) + " Already marked today" : "I did it today") +
        "</button>" +
        "</div>"
      : "") +
    "</div>"
  );
}

/* SMART/OKR content — lives as the single source in pillar 2 of Atomy's
   Motto, but is reused (with its own Share button) in Stage 5 of the 6-Day
   Plan and in Step 1 of The 8 Steps, where the partner actually sets their
   goals. */
function smartOkrShareText() {
  const marcos = (LEMA_ATOMY.pilares.find(function (p) { return p.n === 2; }) || {}).marcos || [];
  return "How to set clear goals:\n\n" + marcos.map(function (m) {
    return m.nombre + ": " + m.explicacion + " Example: " + m.ejemplo;
  }).join("\n\n");
}

function smartOkrCardHTML() {
  const marcos = (LEMA_ATOMY.pilares.find(function (p) { return p.n === 2; }) || {}).marcos || [];
  const marcosHtml = marcos.map(function (m) {
    return (
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:12px">' + escapeHtml(m.nombre) + "</div>" +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + escapeHtml(m.explicacion) + "</p>" +
      '<p class="muted small" style="line-height:1.5;margin-top:5px;font-style:italic">' + escapeHtml(m.ejemplo) + "</p>"
    );
  }).join("");
  return (
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px;color:var(--gold-light)">How to set your goals</div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Two simple ways to turn a vague intention into a real goal.</p>' +
    marcosHtml +
    '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(smartOkrShareText()) + '">' + Icon("share2", { size: 13 }) + " Share</div>" +
    "</div>"
  );
}

/* Custom "Share" modal for image cards (My Profile, day card): instead of
   jumping straight to the OS's native share panel (which on desktop shows
   apps like Mail/Outlook/Paint, not social networks), the same 6 networks
   are always offered. Instagram, TikTok, and YouTube have no way to receive
   an attached file from the web without a backend of their own, so those
   buttons download the image and open the app/site so it can be attached by
   hand — always announced with a toast, never silently. */
function renderCompartirImagenModal(ui) {
  const d = ui.compartirImagenDraft;
  if (!d) return "";
  const plataformas = [
    { id: "whatsapp", label: "WhatsApp", color: "#25D366" },
    { id: "instagram", label: "Instagram", color: "#E1306C" },
    { id: "tiktok", label: "TikTok", color: "var(--text)" },
    { id: "facebook", label: "Facebook", color: "#1877F2" },
    { id: "linkedin", label: "LinkedIn", color: "#0A66C2" },
    { id: "youtube", label: "YouTube", color: "#FF0000" },
  ];
  const botones = plataformas.map(function (p) {
    return (
      '<button class="share-platform-btn" data-action="compartir-imagen-plataforma" data-arg="' + p.id + '">' +
      '<span class="share-platform-icon" style="color:' + p.color + '">' + Icon(p.id, { size: 22, color: p.color }) + "</span>" +
      "<span>" + p.label + "</span></button>"
    );
  }).join("");
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cerrar-compartir-imagen"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Share</span>' +
    '<button class="icon-btn" data-action="cerrar-compartir-imagen">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Choose where to share your image.</p>' +
    '<div class="share-platform-grid" style="margin-top:10px">' + botones + "</div>" +
    '<button class="btn-secondary" style="margin-top:14px" data-action="compartir-imagen-descargar">' + Icon("download", { size: 15 }) + " Just download the image</button>" +
    '<button class="link-btn small" style="margin-top:10px" data-action="compartir-imagen-mas-opciones">More sharing options</button>' +
    "</div></div>"
  );
}

function renderCarteleraModal() {
  const pilaresList = LEMA_ATOMY.pilares.map(function (p) {
    return '<div style="font-size:16.5px;font-weight:700;margin-top:10px">' + escapeHtml(p.t) + "!</div>";
  }).join("");
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="border-color:var(--gold);max-width:340px">' +
    medallionHTML("heart", 60) +
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--gold);margin-top:14px">Atomy\'s Motto</div>' +
    pilaresList +
    '<div style="font-size:15px;font-weight:700;color:var(--gold-light);margin-top:16px;line-height:1.5">Let\'s go, let\'s go, let\'s go!<br>We made it!</div>' +
    '<div class="muted small" style="margin-top:18px;line-height:1.5">📌 Screenshot this, print it, or set it as your wallpaper — somewhere you\'ll see it every day.</div>' +
    '<button class="link-btn small" style="margin-top:16px" data-action="close-modal">Close</button>' +
    "</div></div>"
  );
}

function renderLema(state, ui) {
  const vueltos = ui.lemaVueltos || {};
  const cards = LEMA_ATOMY.pilares.map(function (p) {
    const flipped = !!vueltos[p.n];
    const front =
      '<div class="flip-face flip-front">' +
      medallionHTML(p.icon, 68) +
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Pillar ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      (p.sub ? '<div class="muted small" style="font-style:italic;margin-top:2px">' + escapeHtml(p.sub) + "</div>" : "") +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Tap to see the full explanation</span></div>' +
      "</div>";
    const acciones = p.acciones && p.acciones.length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Daily actions</div>' +
        "<ul style=\"margin:5px 0 0;padding-left:18px\">" + p.acciones.map(function (a) { return '<li style="font-size:13px;line-height:1.55;margin-top:4px">' + escapeHtml(a) + "</li>"; }).join("") + "</ul>"
      : "";
    const marcos = p.marcos && p.marcos.length
      ? p.marcos.map(function (m) {
          return (
            '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">' + escapeHtml(m.nombre) + "</div>" +
            '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + escapeHtml(m.explicacion) + "</p>" +
            '<p class="muted small" style="line-height:1.5;margin-top:5px;font-style:italic">' + escapeHtml(m.ejemplo) + "</p>"
          );
        }).join("") +
        '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(smartOkrShareText()) + '">' + Icon("share2", { size: 13 }) + " Share</div>"
      : "";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Pillar " + p.n + " — " + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="font-style:italic;margin-top:4px">' + escapeHtml(p.sub) + "</div>" +
      '<p style="font-size:13px;line-height:1.55;margin-top:14px">' + escapeHtml(p.explicacion) + "</p>" +
      acciones + marcos +
      "</div>";
    return (
      '<button class="flip-card' + (flipped ? " is-open" : "") + '" data-action="flip-lema" data-arg="' + p.n + '">' +
      '<div class="flip-inner' + (flipped ? " flipped" : "") + '">' + front + back + "</div>" +
      "</button>"
    );
  }).join("");
  const header =
    '<div class="section-header">' + medallionHTML("heart", 64) +
    '<div><h2>Atomy\'s Motto</h2><p>Corporate Philosophy and Code of Ethics — President Han-Gill Park. Tap each pillar to see the full explanation.</p></div></div>';
  const intro = '<p class="muted small" style="line-height:1.6;margin-top:-4px">' + escapeHtml(LEMA_ATOMY.intro) + "</p>";
  const carteleraBtn =
    '<button class="btn-secondary" style="margin-top:12px" data-action="open-cartelera">' + Icon("image-plus", { size: 15 }) + " View poster to display somewhere visible</button>";
  const exclamacion =
    '<div class="card" style="margin-top:14px;text-align:center;border-color:var(--gold)">' +
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--gold)">Official Motto Chant</div>' +
    '<p style="font-size:14px;line-height:1.6;margin-top:6px;font-weight:600">' + escapeHtml(LEMA_ATOMY.exclamacion) + "</p></div>";
  return header + intro + carteleraBtn +
    '<div class="view-stack gap-sm" style="margin-top:14px">' + cards + "</div>" +
    exclamacion +
    lemaFocoHTML(state);
}

/* ---------------- 6-Day Plan — map ---------------- */

const TRAIL_POSITIONS = [
  { x: 22, y: 92 }, { x: 74, y: 77 }, { x: 22, y: 62 },
  { x: 74, y: 47 }, { x: 22, y: 30 }, { x: 74, y: 13 },
];

function renderPathMap(state) {
  const pathD = "M" + TRAIL_POSITIONS.map(function (p) { return p.x + "," + p.y; }).join(" L");
  const nodes = DIAS.map(function (d, i) {
    const est = state.dias[d.id];
    const frac = dayProgress(est, d);
    const pos = TRAIL_POSITIONS[i];
    const estado = est.done ? "done" : frac > 0 ? "progress" : "dim";
    let ring = "";
    if (estado === "progress") {
      const dash = 44 - 44 * frac;
      ring = '<svg style="position:absolute;top:-6px;right:-6px" width="18" height="18" viewBox="0 0 18 18">' +
        '<circle cx="9" cy="9" r="7" fill="var(--card)" stroke="var(--border)" stroke-width="2"/>' +
        '<circle cx="9" cy="9" r="7" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="44" stroke-dashoffset="' + dash + '" stroke-linecap="round" transform="rotate(-90 9 9)"/></svg>';
    }
    const checkFlag = estado === "done" ? '<div class="check-flag">' + Icon("check", { size: 13, color: "#fff" }) + "</div>" : "";
    return (
      '<button class="trail-node" style="left:' + pos.x + '%;top:' + pos.y + '%" data-action="open-day" data-arg="' + d.id + '">' +
      '<div class="circle ' + estado + '">' + Icon(d.icono, { size: 26, color: estado === "dim" ? "var(--text-soft)" : "#fff" }) + checkFlag + ring + "</div>" +
      '<span class="label' + (estado === "dim" ? " dim" : "") + '">' + escapeHtml(d.etapa) + "</span>" +
      "</button>"
    );
  }).join("");

  const overlay =
    '<svg class="trail-svg" viewBox="0 0 100 100" preserveAspectRatio="none">' +
    '<path d="' + pathD + '" fill="none" stroke="#F0C468" stroke-opacity="0.65" stroke-width="1.4" stroke-dasharray="0.5 3" stroke-linecap="round"/></svg>' +
    nodes;

  return sectionHeaderHTML("6-Day Startup Plan", "Climb the map and conquer every stage.", "trail-map") +
    heroMountainHTML(overlay);
}

function renderDiaDetalle(state, ui, diaId) {
  const dia = DIAS.find(function (d) { return d.id === diaId; });
  const est = state.dias[diaId];
  const allChecked = est.checks.every(Boolean);

  const nota = dia.nota ? '<div class="card" style="background:var(--accent-soft);border:none;font-size:14px;line-height:1.55">' + linkifyText(dia.nota) + "</div>" : "";
  const smartOkr = diaId === 5 ? smartOkrCardHTML() : "";

  const escenarioAbierto = !!ui.escenarioAbierto;
  const contenido = (dia.contenido || []).length
    ? '<div class="view-stack gap-sm">' +
      (dia.contenido || []).map(function (sec) {
        const isEscenario = diaId === 1 && sec.h === "Write Your Life Scenario";
        const headerHtml = isEscenario
          ? '<button class="row between" style="width:100%;text-align:left;margin-bottom:8px" data-action="toggle-escenario-inline">' +
            '<div style="font-weight:700;font-size:14px;color:var(--gold-light)">' + escapeHtml(sec.h) + "</div>" +
            '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (escenarioAbierto ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
            "</button>"
          : '<div style="font-weight:700;font-size:14px;color:var(--gold-light);margin-bottom:8px">' + escapeHtml(sec.h) + "</div>";
        const card =
          '<div class="card">' +
          headerHtml +
          sec.body.map(function (p) { return '<p class="muted small" style="line-height:1.55;margin-top:6px">' + linkifyText(p) + "</p>"; }).join("") +
          (isEscenario ? '<div class="muted small" style="margin-top:8px;font-weight:600">' + (escenarioAbierto ? "Tap to collapse" : "Tap to open your full Life Scenario (radar, goals, and List of 100)") + "</div>" : "") +
          "</div>";
        if (!isEscenario || !escenarioAbierto) return card;
        return card + '<div class="view-stack gap-sm">' + renderEscenarioVidaBody(state, ui) + "</div>";
      }).join("") +
      "</div>"
    : "";

  const campos = dia.campos.length
    ? '<div class="view-stack gap-sm">' +
      dia.campos.map(function (c) {
        return (
          '<div class="field"><label>' + escapeHtml(c.label) + "</label>" +
          '<textarea rows="2" data-field="dias.' + diaId + '.fields.' + c.key + '">' + escapeHtml(est.fields[c.key] || "") + "</textarea></div>"
        );
      }).join("") +
      '<button class="btn-secondary" style="width:fit-content;padding:9px 14px" data-action="share-day" data-arg="' + diaId + '">' + Icon("share2", { size: 14 }) + " Share as a card</button>" +
      "</div>"
    : "";

  const opciones = dia.quiz.opciones.map(function (op, i) {
    const selected = est.quizSel === i;
    const isCorrect = i === dia.quiz.correcta;
    const showResult = est.quizSel !== null && est.quizSel !== undefined;
    let style = "";
    if (showResult && selected && isCorrect) style = "border-color:var(--success);background:var(--success-soft)";
    else if (showResult && selected && !isCorrect) style = "border-color:var(--warn);background:var(--warn-soft)";
    const resultIcon = showResult && selected ? Icon(isCorrect ? "check" : "triangle-alert", { size: 16, color: isCorrect ? "var(--success)" : "var(--warn)" }) : "";
    return '<button class="quiz-opt" style="' + style + '" data-action="answer-quiz" data-day="' + diaId + '" data-arg="' + i + '">' + escapeHtml(op) + "<span>" + resultIcon + "</span></button>";
  }).join("");

  const quizFeedback = est.quizOk
    ? '<div class="row gap-2 small" style="color:var(--success);font-weight:600;margin-top:10px">' + Icon("check", { size: 14 }) + " Correct! One more step conquered.</div>"
    : (est.quizSel !== null && est.quizSel !== undefined
      ? '<div class="muted small" style="margin-top:10px">No worries, try again whenever you like — there\'s no limit on attempts.</div>'
      : "");

  const checklist = dia.checklist.map(function (c, i) {
    const on = est.checks[i];
    return (
      '<div class="check-row" style="padding-bottom:2px">' +
      (i < dia.checklist.length - 1 ? '<div class="line' + (on ? " on" : "") + '"></div>' : "") +
      '<button class="check-dot' + (on ? " on" : "") + '" data-action="toggle-check" data-day="' + diaId + '" data-arg="' + i + '">' + (on ? Icon("check", { size: 15, color: "#fff" }) : (i + 1)) + "</button>" +
      '<button class="check-label' + (on ? " on" : "") + '" data-action="toggle-check" data-day="' + diaId + '" data-arg="' + i + '">' + escapeHtml(c) + "</button>" +
      "</div>"
    );
  }).join("");

  const finishLabel = est.done ? "Day conquered " + Icon("award", { size: 18, color: "#fff" }) : "Conquer this day";
  const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
  const finishDisabled = !allChecked || est.done;

  const nextDia = DIAS.find(function (d) { return d.id === diaId + 1; });
  const nextDayBtn = nextDia
    ? '<button class="link-btn row gap-2" style="width:fit-content" data-action="open-day" data-arg="' + nextDia.id + '">Next day ' + Icon("chevron-right", { size: 16 }) + "</button>"
    : "";

  return (
    '<div class="row between">' +
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-map">' + Icon("chevron-left", { size: 16 }) + " Journey map</button>" +
    nextDayBtn +
    "</div>" +
    '<div>' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Stage ' + dia.id + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(dia.etapa) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(dia.titulo) + "</p>" +
    '<p class="muted" style="font-size:13.5px;margin-top:6px;font-style:italic">' + escapeHtml(dia.objetivo) + "</p>" +
    "</div>" +
    nota + contenido + smartOkr + campos +
    '<div class="card">' +
    '<div class="row gap-2" style="font-weight:600;font-size:14px;margin-bottom:12px">' + Icon("sparkles", { size: 15, color: "var(--gold)" }) + " Quick review question</div>" +
    '<div style="font-size:14px;margin-bottom:12px">' + escapeHtml(dia.quiz.pregunta) + "</div>" +
    '<div style="display:flex;flex-direction:column;gap:8px">' + opciones + "</div>" +
    quizFeedback +
    "</div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Day ' + dia.id + " Missions</div>" + checklist + "</div>" +
    '<button class="btn-primary" style="' + finishStyle + '" ' + (finishDisabled ? "disabled" : "") + ' data-action="finish-day" data-arg="' + diaId + '">' + finishLabel + "</button>"
  );
}

/* ---------------- 90-Day Plan ---------------- */

function renderPlan90(state) {
  const quincenasMap = derivarQuincenas(state);
  const campamentosHechos = Object.values(quincenasMap).filter(Boolean).length;
  const cumbreLograda = campamentosHechos === QUINCENAS.length;
  const tiles = QUINCENAS.map(function (q, idx) {
    const done = quincenasMap[q.n];
    const premio = state.premios[idx];
    const premioHtml = premio
      ? '<div class="badge soft" style="margin-top:8px">' + Icon("gift", { size: 11 }) + " " + escapeHtml(premio.premio) + "</div>"
      : "";
    return (
      '<button class="tile card-hover' + (done ? " unlocked" : "") + '" data-action="open-quincena" data-arg="' + q.n + '">' +
      gemCornersHTML() +
      '<div style="position:relative">' + campMedallionHTML(q.n, done) +
      '<div class="badge ' + (done ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (done ? "Completed" : "Wk " + q.semanas) + "</div>" +
      "</div>" +
      '<div class="tile-body"><div class="tile-title">' + escapeHtml(q.nombre) + '</div><div class="tile-sub">' + escapeHtml(q.foco) + "</div>" + premioHtml + "</div>" +
      "</button>"
    );
  }).join("");

  const banner = cumbreLograda
    ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:500">🏔️ You completed all 6 fortnights! Go to the Summit screen to celebrate your achievement.</div>'
    : "";

  return sectionHeaderHTML("90-Day Plan", "Your path to the Sales Master rank, fortnight by fortnight.", "mountain-flag") +
    mountainSceneHTML(quincenasMap, cumbreLograda, 170) +
    '<div class="grid-2">' + tiles + "</div>" +
    banner;
}

function pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, appName) {
  const items = catalogo.filter(function (p) { return (Number(compras[p.id]) || 0) > 0; });
  const lineas = items.map(function (p) {
    const cant = Number(compras[p.id]) || 0;
    return "• " + (p.nombre || "(unnamed)") + " x" + cant + " (" + ((Number(p.pv) || 0) * cant).toLocaleString(paisInfo.locale) + " PV)";
  });
  return (
    "📦 My purchase plan for this fortnight (" + appName + "):\n" +
    lineas.join("\n") +
    "\n\nTotal: " + totalPV.toLocaleString(paisInfo.locale) + " PV · " + formatMoneda(totalPrecio, paisInfo) +
    "\n\nCan you help me check it?"
  );
}

function pedidoWhatsappHref(numero, texto) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent(texto);
}

function formatMoneda(valor, paisInfo) {
  try {
    return Number(valor || 0).toLocaleString(paisInfo.locale, { style: "currency", currency: paisInfo.moneda, maximumFractionDigits: 0 });
  } catch (e) {
    return paisInfo.simbolo + Number(valor || 0).toLocaleString();
  }
}

function paisSelectorHTML(state) {
  return (
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:8px">' +
    PAISES_CATALOGO.map(function (p) {
      const active = state.pais === p.id;
      return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="set-pais-catalogo" data-arg="' + p.id + '">' + escapeHtml(p.label) + "</button>";
    }).join("") +
    "</div>"
  );
}

function productoRowHTML(paisId, qn, compras, p, i, paisInfo, historico) {
  const cantidad = Number(compras[p.id]) || 0;
  const pedidoAntes = historico > 0;
  const searchKey = (p.nombre || "").toLowerCase();
  return (
    '<div class="card producto-row" data-search="' + escapeHtml(searchKey) + '" style="padding:10px 12px">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<input type="text" placeholder="Product name" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="check-dot' + (p.probado ? " on" : "") + '" style="width:24px;height:24px;flex-shrink:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Mark as tried">' + (p.probado ? Icon("check", { size: 11, color: "#fff" }) : "") + "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    (pedidoAntes
      ? '<div class="badge gold" style="margin-top:6px;width:fit-content">' + Icon("check-circle", { size: 10 }) + " You've ordered this before (" + historico + (historico === 1 ? " unit in total)" : " units in total)") + "</div>"
      : "") +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Price (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">This fortnight</label><input type="number" min="0" value="' + cantidad + '" data-field="comprasQuincena.' + qn + "." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    "</div></div>"
  );
}

function historialComprasHTML(state, ui, catalogo) {
  const pedidos = catalogo.filter(function (p) { return totalHistoricoProducto(state, p.id) > 0; });
  const abierto = !!ui.historialAbierto;
  return (
    '<div class="card" style="margin-top:10px">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-historial-compras">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13px">Purchase history</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (abierto ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 15, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + pedidos.length + " of " + catalogo.length + " products you already know · " + (catalogo.length - pedidos.length) + " to discover" + "</div>" +
    (abierto
      ? (pedidos.length
          ? '<div class="view-stack gap-sm" style="margin-top:10px">' +
            pedidos
              .slice()
              .sort(function (a, b) { return (a.nombre || "").localeCompare(b.nombre || ""); })
              .map(function (p) {
                const n = totalHistoricoProducto(state, p.id);
                return (
                  '<div class="row between" style="padding:6px 0;border-top:1px solid var(--border-soft)">' +
                  '<span class="small">' + escapeHtml(p.nombre || "(unnamed)") + "</span>" +
                  '<span class="badge soft">' + n + (n === 1 ? " unit" : " units") + "</span>" +
                  "</div>"
                );
              }).join("") +
            "</div>"
          : '<p class="muted small" style="margin-top:8px">You haven\'t ordered any product in any fortnight yet — once you do, it\'ll show up here.</p>')
      : "") +
    "</div>"
  );
}

/* ---------------- Focus Meeting (Left/Right lists) ---------------- */

function resumenLineasEnfoqueHTML(lista) {
  const planIzq = sumaLineaEnfoque(lista, "izquierda", false), verIzq = sumaLineaEnfoque(lista, "izquierda", true);
  const planDer = sumaLineaEnfoque(lista, "derecha", false), verDer = sumaLineaEnfoque(lista, "derecha", true);
  function bloque(nombre, plan, ver) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      '<div class="rl-value">' + ver.toLocaleString("en") + ' <span class="muted small" style="font-weight:400">verified points</span></div>' +
      '<div class="rl-sub">Planned, not yet verified: ' + plan.toLocaleString("en") + " points</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Left", planIzq, verIzq) + bloque("Right", planDer, verDer) + "</div>";
}

function resumenEnfoqueTexto(state, qn) {
  const q = QUINCENAS.find(function (x) { return x.n === qn; });
  const lista = peekListaEnfoque(state, qn);
  function lineaTexto(nombre, linea) {
    const arr = (lista[linea] || []).slice().sort(function (a, b) { return (a.fecha || "9999-99-99").localeCompare(b.fecha || "9999-99-99"); });
    const plan = sumaLineaEnfoque(lista, linea, false);
    const ver = sumaLineaEnfoque(lista, linea, true);
    const otros = Number(linea === "izquierda" ? lista.otrosIzquierda : lista.otrosDerecha) || 0;
    const personasTxt = arr.length
      ? arr.map(function (p) { return "• " + (p.nombre || "(unnamed)") + ": " + (Number(p.puntos) || 0).toLocaleString("en") + " points" + (p.verificado ? " ✅ verified" : " (not verified)"); }).join("\n")
      : "  (no people registered)";
    return (
      "*" + nombre + " Line*\n" +
      personasTxt +
      (otros ? "\n• Outside the list (personal use/other): " + otros.toLocaleString("en") + " points" : "") +
      "\nVerified: " + ver.toLocaleString("en") + " points · Planned, not yet verified: " + plan.toLocaleString("en") + " points"
    );
  }
  return (
    "🎯 Focus Meeting — Fortnight " + qn + (q ? " (" + q.nombre + ")" : "") + ":\n\n" +
    lineaTexto("Left", "izquierda") + "\n\n" +
    lineaTexto("Right", "derecha") +
    "\n\n" + (lista.reunionHecha ? "✅ I've already held my focus meeting with my partners." : "⏳ I haven't held my focus meeting with my partners yet.") +
    "\n\nCan you help me review it to plan my fortnight?"
  );
}

function personaEnfoqueRowHTML(qn, linea, p) {
  const verificadoClass = p.verificado ? " on" : "";
  const waLink = p.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(p.telefono, p.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card roster-row" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "No name") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + "</div>" : "") +
    (p.atomyId || p.contrasena
      ? '<div class="muted small" style="margin-top:2px">' +
        (p.atomyId ? "ID " + escapeHtml(p.atomyId) : "") +
        (p.atomyId && p.contrasena ? " · " : "") +
        (p.contrasena ? "Password " + escapeHtml(p.contrasena) : "") +
        "</div>"
      : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-persona-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-persona-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (p.notas ? '<div class="muted small" style="margin-top:4px;font-style:italic">“' + escapeHtml(p.notas) + '”</div>' : "") +
    '<div class="rr-inputs">' +
    '<div class="field"><label>PVP</label><input type="number" min="0" step="10000" value="' + (Number(p.pvp) || 0) + '" data-roster-field="pvp" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="field"><label>PVG</label><input type="number" min="0" step="10000" value="' + (Number(p.puntos) || 0) + '" data-roster-field="puntos" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    "</div>" +
    '<div class="field" style="margin-top:8px"><label>Planned date</label><input type="date" value="' + (p.fecha || "") + '" data-roster-field="fecha" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="roster-check' + verificadoClass + '" data-action="toggle-verificado-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' +
    '<div class="box">' + (p.verificado ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (p.verificado ? "Verified — already ordered their points" : "Mark as verified") + "</span>" +
    "</div>" +
    "</div>"
  );
}

function renderReunionEnfoqueHTML(state, ui, qn) {
  const lista = getListaEnfoque(state, qn);
  const linea = ui.lineaActivaEnfoque || "izquierda";
  const filas = (lista[linea] || []).slice().sort(function (a, b) { return (a.fecha || "9999-99-99").localeCompare(b.fecha || "9999-99-99"); });
  const rows = filas.length
    ? filas.map(function (p) { return personaEnfoqueRowHTML(qn, linea, p); }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You haven\'t added anyone to this line yet.</p>';

  return (
    '<div class="card" style="margin-top:16px;border-color:var(--gold)">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Focus Meeting</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">' +
    (qn >= 5
      ? "You're getting close to Sales Master — from here, start tracking how many points each person on your team plans to order, by line, so you don't lose your cycle."
      : "Log the people on your team here by Left/Right line — it'll become more useful starting fortnight 5 and 6, when you start tracking cycling on your way to Sales Master.") +
    "</p>" +
    '<div class="roster-check' + (lista.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qn="' + qn + '">' +
    '<div class="box">' + (lista.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (lista.reunionHecha ? "Focus meeting done this fortnight" : "Mark: I held my focus meeting with my partners") + "</span>" +
    "</div>" +
    resumenLineasEnfoqueHTML(lista) +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, resumenEnfoqueTexto(state, qn)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share with my sponsor</a>"
      : '<p class="muted small" style="margin-top:10px">Add your sponsor\'s WhatsApp in Settings so you can share your Focus Meeting.</p>') +
    '<div class="tabs" style="margin-top:10px">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea-enfoque" data-arg="izquierda">Left (' + (lista.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea-enfoque" data-arg="derecha">Right (' + (lista.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field" style="margin-top:10px"><label>Points already confirmed outside the list (personal use or other)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? lista.otrosIzquierda : lista.otrosDerecha) + '" data-field="listasEnfoque.' + qn + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-persona-enfoque" data-qn="' + qn + '" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Add person</button>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
    "</div>"
  );
}

/* The program's "in-progress" fortnight (the first of the 6 not yet
   completed); if all 6 are done, the last one is shown. This is the default
   value the Focus Meeting page opens with when no fortnight has been chosen
   yet in this session. */
function quincenaEnfoquePorDefecto(state) {
  const quincenasMap = derivarQuincenas(state);
  const enCurso = QUINCENAS.find(function (q) { return !quincenasMap[q.n]; });
  return enCurso ? enCurso.n : QUINCENAS[QUINCENAS.length - 1].n;
}

function enfoqueQuincenaNavHTML(state, qn) {
  const quincenasMap = derivarQuincenas(state);
  const chips = QUINCENAS.map(function (q) {
    const active = q.n === qn;
    const done = quincenasMap[q.n];
    return (
      '<button class="badge ' + (active ? "gold" : (done ? "soft" : "dark")) + '" style="cursor:pointer" data-action="set-enfoque-quincena" data-arg="' + q.n + '">' +
      "Q" + q.n + (done ? " " + Icon("check-circle", { size: 10 }) : "") +
      "</button>"
    );
  }).join("");
  const q = QUINCENAS.find(function (x) { return x.n === qn; });
  return (
    '<div class="row gap-2" style="flex-wrap:wrap">' + chips + "</div>" +
    '<div style="margin-top:12px">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Fortnight ' + q.n + " · Weeks " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>"
  );
}

function renderReunionEnfoquePage(state, ui) {
  const qn = ui.enfoqueQuincena || quincenaEnfoquePorDefecto(state);
  return (
    sectionHeaderHTML("Focus Meeting", "Plan with your team how many points each person will order, by line, fortnight by fortnight.", "target") +
    enfoqueQuincenaNavHTML(state, qn) +
    renderReunionEnfoqueHTML(state, ui, qn) +
    productosCalculadoraHTML(state, ui, qn)
  );
}

function renderPersonaEnfoqueModal(ui) {
  const d = ui.personaEnfoqueDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-persona-enfoque" data-linea="' + d.linea + '" data-arg="' + d.id + '">' +
      (ui.confirmDeletePersonaEnfoque === d.id ? "Are you sure? Tap again to delete" : "Delete person") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-persona-enfoque"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit person" : "New person — " + (d.linea === "izquierda" ? "Left" : "Right") + " line") + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona-enfoque">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="field"><label>Phone (optional)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Password</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">The password is optional and only so you can enter points for this person if needed — no one is required to share it.</p>' +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="notas" placeholder="Observations...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona-enfoque">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona-enfoque">Cancel</button>' +
    "</div></div>"
  );
}

function productosCalculadoraHTML(state, ui, qn) {
  const paisId = state.pais || "CO";
  const paisInfo = paisCatalogoInfo(paisId);
  const compras = getComprasQuincena(state, qn);
  const catalogo = getCatalogoProductos(state, paisId);
  let totalPV = 0, totalPrecio = 0, planeados = 0, probados = 0;
  catalogo.forEach(function (p) {
    const cant = Number(compras[p.id]) || 0;
    if (cant > 0) {
      totalPV += cant * (Number(p.pv) || 0);
      totalPrecio += cant * (Number(p.precio) || 0);
      planeados++;
    }
    if (p.probado) probados++;
  });
  const open = !!ui.calculadoraAbierta;

  let rows = "";
  if (open) {
    const categorias = [];
    catalogo.forEach(function (p) { if (categorias.indexOf(p.categoria) === -1) categorias.push(p.categoria); });
    rows = categorias.map(function (cat) {
      const itemsHtml = catalogo
        .map(function (p, i) { return { p: p, i: i }; })
        .filter(function (o) { return o.p.categoria === cat; })
        .map(function (o) { return productoRowHTML(paisId, qn, compras, o.p, o.i, paisInfo, totalHistoricoProducto(state, o.p.id)); })
        .join("");
      return '<div style="font-weight:700;font-size:11.5px;color:var(--gold-light);text-transform:uppercase;letter-spacing:.05em;margin-top:14px">' + escapeHtml(cat) + "</div>" + itemsHtml;
    }).join("");
  }

  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-calculadora-productos">' +
    '<div class="row gap-2">' + Icon("clipboard-list", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Product Calculator</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Check off which products you\'ve already tried, and how many you plan to buy this fortnight — so you know how many PV that represents and how much you\'ll pay, for your focus meeting.</p>' +
    '<div class="muted small" style="margin-top:10px">Country / catalog</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Planned PV</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Total to pay</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " of " + catalogo.length + " products tried · " + planeados + " planned this fortnight</div>" +
    (planeados > 0
      ? (state.whatsapp && state.whatsapp.trim()
          ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, "Cumbre 90")) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share with my sponsor</a>"
          : '<p class="muted small" style="margin-top:10px">Add your sponsor\'s WhatsApp in Settings so you can share your order.</p>')
      : "") +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        historialComprasHTML(state, ui, catalogo) +
        '<div class="field" style="margin-top:10px">' +
        '<div class="row gap-2" style="align-items:center;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);border-radius:12px;padding:9px 12px">' +
        Icon("search", { size: 15, color: "var(--text-soft)" }) +
        '<input id="calculadora-search" type="text" placeholder="Search for a product by name..." style="flex:1;background:transparent;border:none;color:var(--text);font-size:13.5px;outline:none">' +
        "</div></div>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Add product</button>'
      : "") +
    "</div>"
  );
}

function renderQuincenaDetalle(state, ui, qn) {
  const q = QUINCENAS.find(function (x) { return x.n === qn; });
  const semanas = SEMANAS.filter(function (s) { return s.q === qn; });
  const qDone = semanas.every(function (s) { return state.semanas[s.n] && state.semanas[s.n].done; });
  const doneCount = Object.values(derivarQuincenas(state)).filter(Boolean).length;

  const semanasHtml = semanas.map(function (s) {
    const est = state.semanas[s.n];
    const allChecked = est.checks.every(Boolean);
    const checklist = s.acciones.map(function (a, i) {
      const on = est.checks[i];
      return (
        '<div class="check-row" style="padding-bottom:2px">' +
        (i < s.acciones.length - 1 ? '<div class="line' + (on ? " on" : "") + '"></div>' : "") +
        '<button class="check-dot' + (on ? " on" : "") + '" data-action="toggle-semana-check" data-week="' + s.n + '" data-arg="' + i + '">' + (on ? Icon("check", { size: 15, color: "#fff" }) : (i + 1)) + "</button>" +
        '<button class="check-label' + (on ? " on" : "") + '" data-action="toggle-semana-check" data-week="' + s.n + '" data-arg="' + i + '">' + escapeHtml(a) + "</button>" +
        "</div>"
      );
    }).join("");
    const finishLabel = est.done ? "Week completed " + Icon("check", { size: 16, color: "#fff" }) : "Mark week completed";
    const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
    return (
      '<div class="card">' +
      '<div class="row between"><span style="font-weight:700;font-size:14px">Week ' + s.n + "</span>" + (est.done ? '<span class="badge success">Completed</span>' : "") + "</div>" +
      '<div class="muted small" style="margin-top:6px">PV Goal: <b style="color:var(--text)">' + escapeHtml(s.metaPV) + "</b></div>" +
      '<div class="muted small">Contacts Goal: <b style="color:var(--text)">' + escapeHtml(s.metaContactos) + "</b></div>" +
      '<div class="muted small" style="margin-top:2px;font-style:italic">' + escapeHtml(s.paso) + "</div>" +
      '<div style="margin-top:12px">' + checklist + "</div>" +
      '<button class="btn-primary" style="margin-top:14px;' + finishStyle + '" ' + (!allChecked || est.done ? "disabled" : "") + ' data-action="finish-semana" data-arg="' + s.n + '">' + finishLabel + "</button>" +
      "</div>"
    );
  }).join("");

  return (
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-quincenas">' + Icon("chevron-left", { size: 16 }) + " 90-Day Plan</button>" +
    "<div>" +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Fortnight ' + q.n + " · Weeks " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>" +
    quincenaAscensoHTML(doneCount) +
    semanasHtml +
    (qDone ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:600">🏕️ Fortnight completed!</div>' : "") +
    '<button class="btn-secondary" data-action="goto" data-arg="enfoque">' + Icon("target", { size: 15 }) + " Go to Focus Meeting</button>"
  );
}

/* ---------------- Sponsor rewards ---------------- */

function renderPremios(state, ui) {
  const quincenasMap = derivarQuincenas(state);
  const desc = "Customize them however you like — change them whenever it suits you, even month to month.";
  const addBtn = '<button class="btn-secondary" style="margin-top:12px" data-action="add-premio">+ Add reward</button>';

  if (!state.premios.length) {
    return sectionHeaderHTML("Rewards from your sponsor", desc, "gift") +
      '<div class="card" style="text-align:center">' +
      Icon("gift", { size: 30, color: "var(--text-soft)" }) +
      '<p class="muted small" style="margin-top:10px;line-height:1.5">Your sponsor hasn\'t set up any rewards here yet. As soon as they confirm one, add it with the button below.</p>' +
      "</div>" + addBtn;
  }

  const tiles = state.premios.map(function (p, i) {
    const desbloqueado = !!quincenasMap[i + 1];
    const media = p.imagen ? '<img src="' + p.imagen + '" alt="' + escapeHtml(p.premio) + '"/>' : Icon("gift", { size: 30, color: "#fff" });
    const uploadBtn =
      '<label class="icon-btn" style="position:absolute;bottom:8px;right:8px;width:28px;height:28px;border-radius:999px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer">' +
      Icon("image-plus", { size: 14, color: "#fff" }) +
      '<input type="file" accept="image/*" class="hidden" data-target="premios.' + i + '.imagen"></label>';
    const deleteBtn =
      '<div class="icon-btn" style="position:absolute;top:8px;left:8px;width:24px;height:24px;border-radius:999px;background:rgba(0,0,0,0.35);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer" data-action="delete-premio" data-arg="' + i + '">' +
      (ui.confirmDeletePremio === i ? Icon("check", { size: 12, color: "var(--warn)" }) : Icon("x", { size: 12 })) +
      "</div>";
    const body =
      '<div class="field-inline" style="display:flex;flex-direction:column;gap:6px">' +
      '<input type="text" placeholder="Milestone" value="' + escapeHtml(p.hito) + '" data-field="premios.' + i + '.hito">' +
      '<input type="text" placeholder="Reward" style="color:var(--accent);font-weight:600" value="' + escapeHtml(p.premio) + '" data-field="premios.' + i + '.premio">' +
      "</div>";
    return (
      '<div class="tile' + (desbloqueado ? " unlocked" : "") + '">' +
      gemCornersHTML() +
      '<div class="tile-media" style="background:' + (p.imagen ? "transparent" : "radial-gradient(circle at 30% 20%, var(--accent-soft), var(--accent))") + '">' +
      media +
      '<div class="badge ' + (desbloqueado ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (desbloqueado ? "Completed" : "To earn") + "</div>" +
      uploadBtn + deleteBtn +
      "</div>" +
      '<div class="tile-body">' + body + "</div>" +
      "</div>"
    );
  }).join("");

  return sectionHeaderHTML("Rewards from your sponsor", desc, "gift") +
    '<div class="grid-2">' + tiles + "</div>" +
    addBtn +
    '<p class="muted small" style="line-height:1.5">Achievements are marked by you in the app. Your sponsor will verify the milestone (for example, with a screenshot you send over WhatsApp) before handing over the reward.</p>';
}

/* ---------------- Profile ---------------- */

function renderPerfil(state) {
  const rango = RANGOS[state.rangoIndex];
  const rangoButtons = RANGOS.map(function (r, i) {
    const estado = i < state.rangoIndex ? "pasado" : i === state.rangoIndex ? "actual" : "pendiente";
    const conseguido = estado !== "pendiente";
    const inner = conseguido && state.foto ? '<img src="' + state.foto + '" alt="' + escapeHtml(r.nombre) + '"/>' : (conseguido ? Icon("user-badge", { size: 22 }) : Icon("circle", { size: 16, color: "var(--border)" }));
    const passFlag = estado === "pasado" ? '<div style="position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:999px;background:var(--success);border:2px solid var(--card);display:flex;align-items:center;justify-content:center">' + Icon("check", { size: 11, color: "#fff" }) + "</div>" : "";
    const borderColor = estado === "actual" ? "var(--gold)" : conseguido ? "var(--success)" : "var(--border)";
    const ringShadow = estado === "actual" ? "box-shadow:0 0 0 4px var(--accent-soft);" : "";
    return (
      '<button style="display:flex;flex-direction:column;align-items:center;gap:6px" data-action="set-rango" data-arg="' + i + '">' +
      '<div style="width:64px;height:64px;border-radius:999px;border:2px solid ' + borderColor + ';display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;background:' + (conseguido ? "var(--card)" : "transparent") + ';' + ringShadow + '">' + inner + passFlag + "</div>" +
      '<span style="font-size:11.5px;font-weight:600;text-align:center;line-height:1.2;color:' + (conseguido ? "var(--text)" : "var(--text-soft)") + ';opacity:' + (conseguido ? 1 : 0.7) + '">' + escapeHtml(r.nombre) + "</span>" +
      '<span class="muted small" style="opacity:.8">' + r.pv + "</span>" +
      "</button>"
    );
  }).join("");

  const actividad = state.actividad.length
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Recent activity</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    recogCardHTML(state.nombre, state.foto, rango.nombre, rango.pv, state.rangoIndex) +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="perfil-file">' + Icon("camera", { size: 15 }) + " " + (state.foto ? "Change photo" : "Add photo") + "</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="download-recog-card">' + Icon("download", { size: 15, color: "#fff" }) + " Share</button>" +
    '<input id="perfil-file" type="file" accept="image/*" class="hidden" data-target="foto">' +
    "</div>" +
    '<div class="text-center muted small" style="margin-top:-8px">🔥 ' + state.racha + " " + (state.racha === 1 ? "day in a row" : "days in a row") + "</div>" +
    '<div class="card" style="text-align:center">' +
    '<div style="font-weight:700;font-size:14px">Invite someone to become a VIP Consumer</div>' +
    '<p class="muted small" style="line-height:1.5;margin-top:4px">Share this post on your social media so your contacts discover the benefits of becoming a VIP Consumer with Atomy.</p>' +
    '<img src="img/consumidor-vip.png" alt="VIP Consumer" style="width:100%;max-width:220px;border-radius:14px;margin:10px auto 0;display:block">' +
    '<button class="btn-primary" style="width:100%;margin-top:10px;color:#fff" data-action="share-consumidor-vip">' + Icon("share2", { size: 15, color: "#fff" }) + " Share</button>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Your rank</div>' +
    '<div class="muted small" style="margin-bottom:12px">Tap the badge for the rank you currently hold in Atomy.</div>' +
    '<div class="grid-3">' + rangoButtons + "</div>" +
    '<div class="card" style="margin-top:12px;padding:14px"><div style="font-size:14px;font-weight:600">' + escapeHtml(rango.nombre) + '</div><div class="muted small" style="margin-top:2px">' + escapeHtml(rango.meta) + "</div></div>" +
    "</div>" +
    actividad
  );
}

/* ---------------- Achievements ---------------- */

function logroChipHTML(titulo, hecho, iconName, imagen) {
  const inner = imagen ? '<img src="' + imagen + '" alt="' + escapeHtml(titulo) + '"/>' : Icon(iconName, { size: 22, color: hecho ? "#fff" : "var(--text-soft)" });
  const flag = hecho ? '<div class="flag">' + Icon("check", { size: 11, color: "#fff" }) + "</div>" : "";
  return (
    '<div class="logro-chip' + (hecho ? " on" : "") + '">' +
    '<div class="logro-badge' + (hecho ? " on" : "") + '">' + inner + flag + "</div>" +
    '<span class="lc-label">' + escapeHtml(titulo) + "</span></div>"
  );
}

function renderLogros(state) {
  const quincenasMap = derivarQuincenas(state);
  const etapasHechas = DIAS.filter(function (d) { return state.dias[d.id].done; }).length;
  const campamentosHechos = Object.values(quincenasMap).filter(Boolean).length;
  const premiosDesbloqueados = state.premios.filter(function (_, i) { return quincenasMap[i + 1]; }).length;
  const cumbreLograda = campamentosHechos === QUINCENAS.length;
  const totalLogros = DIAS.length + QUINCENAS.length + state.premios.length + 1;
  const logrosHechos = etapasHechas + campamentosHechos + premiosDesbloqueados + (cumbreLograda ? 1 : 0);

  const etapas = DIAS.map(function (d) { return logroChipHTML(d.etapa, state.dias[d.id].done, d.icono); }).join("");
  const camps = QUINCENAS.map(function (q) { return campLogroChipHTML(q.nombre, !!quincenasMap[q.n]); }).join("");
  const premios = state.premios.map(function (p, i) { return logroChipHTML(p.premio, !!quincenasMap[i + 1], "gift", p.imagen); }).join("");

  return sectionHeaderHTML("Achievements Panel", logrosHechos + " of " + totalLogros + " milestones conquered", "award") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Stages of the 6-Day Plan</div><div class="grid-3">' + etapas + "</div></div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Camps of the 90-Day Plan</div><div class="grid-3">' + camps + "</div></div>" +
    (state.premios.length ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Rewards from your sponsor</div><div class="grid-3">' + premios + "</div></div>" : "") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Final achievement</div><div class="grid-3">' + logroChipHTML("Sales Master — the Summit", cumbreLograda, "mountain-flag", "img/logro-cumbre.png") + "</div></div>";
}

/* ---------------- Summit ---------------- */

function renderCumbre(state) {
  const codigo = state.codigoCumbre || "C90-000000";
  return (
    '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;padding-top:20px">' +
    Icon("award", { size: 56, color: "var(--gold)" }) +
    '<h2 style="font-size:22px;font-weight:700">You reached the Summit, ' + escapeHtml(state.nombre) + "!</h2>" +
    '<p class="muted" style="font-size:14px;max-width:300px;line-height:1.6">You completed your 90-Day Plan and qualified for the Sales Master rank. In the coming weeks you\'ll receive a Director\'s Letter from Atomy, mailed straight from Korea.</p>' +
    '<div class="card" style="border:2px solid var(--gold);width:100%;text-align:left">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em">Certificate</div>' +
    '<div style="font-size:15px;font-weight:700;margin-top:4px">You\'ve completed Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">Code ' + codigo + "</div>" +
    '<button class="btn-primary" style="background:var(--gold);margin-top:16px" data-action="download-cert">Download certificate</button>' +
    "</div>" +
    '<div class="card muted small" style="width:100%">You\'re not alone on this journey — celebrate with your sponsor and get ready to guide your first partner down the same path.</div>' +
    "</div>"
  );
}

/* ---------------- Settings ---------------- */

function renderAjustes(state, ui) {
  const whatsappField =
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Your sponsor\'s WhatsApp</label>' +
    '<p class="muted small" style="margin-top:-2px;margin-bottom:8px;line-height:1.5">The floating green button messages this number directly.</p>' +
    '<input type="text" inputmode="numeric" placeholder="E.g. 34600000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>';

  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Browser notifications</div><div class="muted small" style="margin-top:2px">Reminder alerts outside the app</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  const resetLabel = ui.confirmReset ? "Are you sure? Tap again to reset" : "Reset my progress";

  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">This copy\'s license</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">This copy of Cumbre 90 is licensed exclusively to <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> and their own team. It is not authorized to be shared with other leaders or teams.</p>' +
      "</div>"
    : "";

  return (
    sectionHeaderHTML("Settings", "", "settings") +
    licenciaCard +
    '<div class="card row between">' +
    '<div><div style="font-size:14px;font-weight:600">Sponsor mode</div><div class="muted small" style="margin-top:2px">Turn it on if you also mentor your own team — adds the My Team\'s Report section</div></div>' +
    '<div class="toggle' + (state.mentorMode ? " on" : "") + '" data-action="toggle-mentor"><div class="knob"></div></div>' +
    "</div>" +
    whatsappField +
    notifRow +
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("download", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Backup</span></div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">All your data (List of 250, Genealogy Tree, your progress) lives only on this device. Download a backup and save it wherever you like (your Google Drive, email, etc.) — that way you won\'t lose it if you switch phones or clear your browser data.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-respaldo">' + Icon("download", { size: 15 }) + " Download backup</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="importar-respaldo-input">' + Icon("repeat", { size: 15 }) + " Restore from file</button>" +
    "</div>" +
    '<input id="importar-respaldo-input" type="file" accept="application/json,.json" class="hidden" data-target="__importBackup">' +
    "</div>" +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}

/* ---------------- List of 250 Contacts (CRM) ---------------- */

function contactoNivelBadge(nivel) {
  const cls = nivel === "Hot" ? "warn" : nivel === "Warm" ? "gold" : "soft";
  return '<span class="badge ' + cls + '">' + escapeHtml(nivel) + "</span>";
}

function renderContactos(state, ui) {
  const contactos = state.contactos || [];
  const filtro = ui.contactoFiltro || "all";
  const hoy = hoyISO();

  const counts = { Hot: 0, Warm: 0, Cold: 0 };
  contactos.forEach(function (c) { if (counts[c.nivel] != null) counts[c.nivel]++; });

  const filterBtns = ["all"].concat(CONTACTO_NIVELES).map(function (f) {
    const active = filtro === f;
    const label = f === "all" ? "All · " + contactos.length : f + " · " + counts[f];
    return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="filter-contactos" data-arg="' + f + '">' + label + "</button>";
  }).join(" ");

  const filtered = filtro === "all" ? contactos : contactos.filter(function (c) { return c.nivel === filtro; });
  const sorted = filtered.slice().sort(function (a, b) {
    if (filtro === "all") {
      const an = CONTACTO_NIVELES.indexOf(a.nivel), bn = CONTACTO_NIVELES.indexOf(b.nivel);
      if (an !== bn) return an - bn;
    }
    const av = a.proximoSeguimiento || "9999-99-99";
    const bv = b.proximoSeguimiento || "9999-99-99";
    if (av !== bv) return av < bv ? -1 : 1;
    return (a.nombre || "").localeCompare(b.nombre || "");
  });

  let lastNivel = null;
  const rows = sorted.length
    ? sorted.map(function (c) {
        let nivelHeader = "";
        if (filtro === "all" && c.nivel !== lastNivel) {
          lastNivel = c.nivel;
          nivelHeader = '<div class="row gap-2" style="margin-top:16px;margin-bottom:2px;color:var(--gold);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(c.nivel) + " · " + (counts[c.nivel] || 0) + "</div>";
        }
        const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
        const esHoy = c.proximoSeguimiento === hoy;
        const fechaTxt = c.proximoSeguimiento ? (vencido ? "Overdue · " : esHoy ? "Today · " : "") + c.proximoSeguimiento : "No follow-up set";
        const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
        const waLink = c.telefono
          ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
          : "";
        return nivelHeader + (
          '<div class="card contact-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
          '<div class="row between" style="align-items:flex-start">' +
          '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre) + "</div>" +
          '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "No phone") + (c.pais ? " · " + escapeHtml(c.pais) : "") + "</div></div>" +
          contactoNivelBadge(c.nivel) +
          "</div>" +
          '<div class="row between" style="margin-top:10px;align-items:center">' +
          '<span class="small" style="font-weight:600' + ((c.estado === "Partner" || c.estado === "Consumer") ? ";color:var(--gold-light)" : "") + '">' + escapeHtml(c.estado) + "</span>" +
          '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
          "</div>" +
          (c.notaSeguimiento ? '<div class="muted small" style="margin-top:4px;font-style:italic">“' + escapeHtml(c.notaSeguimiento) + '”</div>' : "") +
          (c.proximoSeguimiento
            ? '<div class="row gap-2" style="margin-top:6px;align-items:center;cursor:pointer" data-action="marcar-seguimiento-hecho" data-arg="' + c.id + '">' +
              Icon("check-circle", { size: 13, color: "var(--success)" }) +
              '<span class="small" style="color:var(--success);font-weight:600">Mark follow-up done</span></div>'
            : "") +
          '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="3">+3 d</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="7">+1 wk</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="30">+1 mo</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="60">+2 mo</button>' +
          waLink +
          '<button class="icon-btn" data-action="edit-contacto" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
          "</div>" +
          '<div class="row gap-2" style="margin-top:6px">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto" data-arg="' + c.id + '" data-tipo="llamada">' + Icon("phone-call", { size: 13 }) + " Call</button>" +
          '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto" data-arg="' + c.id + '" data-tipo="mensaje">' + Icon("message-circle", { size: 13 }) + " Message</button>" +
          "</div>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You don\'t have any contacts registered yet. Tap “+ New contact” to start your List of 250.</p>';

  return (
    sectionHeaderHTML("List of 250 Contacts", contactos.length + " of 250 registered", "users") +
    '<p class="muted small" style="margin-top:-4px">Tap “Call” or “Message” on each contact to log it in your Weekly Report.</p>' +
    '<input id="contacto-search" type="text" placeholder="Search by name or phone..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<div class="row gap-2">' +
    '<button class="btn-primary" style="flex:1" data-action="add-contacto">' + Icon("phone-call", { size: 16, color: "#fff" }) + " New</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="importar-contactos">' + Icon("download", { size: 16 }) + " Import Contacts</button>" +
    "</div>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderImportarContactosModal(ui) {
  if (!ui.importarContactosOpen) return "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cerrar-importar-contactos"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Import Contacts</span>' +
    '<button class="icon-btn" data-action="cerrar-importar-contactos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Your browser doesn\'t allow opening the contacts picker directly here. Copy your contacts from your phone — one per line, in the format <b>Name, Phone</b> — and paste them below:</p>' +
    '<textarea rows="9" id="importar-contactos-textarea" placeholder="Jane Smith, +1 555 111 2222\nJohn Doe, +1 555 333 4444" style="margin-top:10px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit"></textarea>' +
    '<button class="btn-primary" style="margin-top:14px" data-action="confirmar-importar-contactos">Import</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cerrar-importar-contactos">Cancel</button>' +
    "</div></div>"
  );
}

function renderContactoModal(ui) {
  const d = ui.contactoDraft;
  if (!d) return "";
  const editing = !!ui.contactoEditId;
  const nivelOpts = CONTACTO_NIVELES.map(function (n) { return '<option value="' + n + '"' + (d.nivel === n ? " selected" : "") + ">" + n + "</option>"; }).join("");
  const estadoOpts = CONTACTO_ESTADOS.map(function (s) { return '<option value="' + s + '"' + (d.estado === s ? " selected" : "") + ">" + s + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contacto" data-arg="' + ui.contactoEditId + '">' +
      (ui.confirmDeleteContacto === ui.contactoEditId ? "Are you sure? Tap again to delete" : "Delete contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit contact" : "New contact") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Country"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Level</label><select data-draft-field="nivel" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + nivelOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Status</label><select data-draft-field="estado" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="notas" placeholder="How you met, interests...">' + escapeHtml(d.notas) + "</textarea></div>" +
    '<div class="field"><label>Next follow-up</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="3">+3 days</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="7">+1 week</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="30">+1 month</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="60">+2 months</button>' +
    "</div>" +
    '<div class="field"><label>Follow-up note</label><input type="text" data-draft-field="notaSeguimiento" value="' + escapeHtml(d.notaSeguimiento || "") + '" placeholder="E.g. Call to ask about their decision"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto">Save contact</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- Customers — people who already bought, with a running purchase history ---------------- */

function clienteRowHTML(c) {
  const hoy = hoyISO();
  const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
  const esHoy = c.proximoSeguimiento === hoy;
  const fechaTxt = c.proximoSeguimiento ? (vencido ? "Overdue · " : esHoy ? "Today · " : "") + c.proximoSeguimiento : "No follow-up set";
  const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
    : "";
  const totalCompras = (c.compras || []).length;
  return (
    '<div class="card cliente-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "No name") + "</div>" +
    '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "No phone") + (totalCompras ? " · " + totalCompras + " purchase" + (totalCompras === 1 ? "" : "s") : "") + "</div></div>" +
    '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="7">1 week</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="14">2 weeks</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="30">1 month</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="60">2 months</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-meses="11">11 months</button>' +
    waLink +
    '<button class="icon-btn" data-action="edit-cliente" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
    "</div>" +
    "</div>"
  );
}

function renderClientes(state) {
  const clientes = state.clientes || [];
  const sorted = clientes.slice().sort(function (a, b) {
    const av = a.proximoSeguimiento || "9999-99-99";
    const bv = b.proximoSeguimiento || "9999-99-99";
    if (av !== bv) return av < bv ? -1 : 1;
    return (a.nombre || "").localeCompare(b.nombre || "");
  });
  const rows = sorted.length
    ? sorted.map(clienteRowHTML).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You don\'t have any customers registered yet. Tap "New customer" to get started.</p>';
  return (
    sectionHeaderHTML("Customers", clientes.length + " registered", "package") +
    '<input id="cliente-search" type="text" placeholder="Search by name or phone..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<button class="btn-primary" data-action="add-cliente">' + Icon("phone-call", { size: 16, color: "#fff" }) + " New customer</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function compraClienteRowHTML(co) {
  return (
    '<div class="row between" style="padding:7px 0;border-top:1px solid var(--border-soft);align-items:center">' +
    '<div style="min-width:0"><div style="font-weight:600;font-size:13px">' + escapeHtml(co.producto || "Product") + "</div>" +
    '<div class="muted small">' + (co.fecha || "") + " · " + (Number(co.valor) || 0).toLocaleString() + " · " + (Number(co.pv) || 0) + " PV</div></div>" +
    '<button class="icon-btn" data-action="delete-compra-cliente" data-arg="' + co.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>"
  );
}

function renderClienteModal(ui) {
  const d = ui.clienteDraft;
  if (!d) return "";
  const editing = !!ui.clienteEditId;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-cliente" data-arg="' + ui.clienteEditId + '">' +
      (ui.confirmDeleteCliente === ui.clienteEditId ? "Are you sure? Tap again to delete" : "Delete customer") +
      "</button>"
    : "";
  const compras = (d.compras || []).slice().sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
  const comprasHtml = compras.length
    ? compras.map(compraClienteRowHTML).join("")
    : '<p class="muted small" style="padding:4px 0">No purchases recorded yet.</p>';
  const totalPV = compras.reduce(function (acc, co) { return acc + (Number(co.pv) || 0); }, 0);
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-cliente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:400px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit customer" : "New customer") + "</span>" +
    '<button class="icon-btn" data-action="cancel-cliente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Optional"></div>' +
    '<div class="field" style="flex:1"><label>Password</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    '<div class="field" style="flex:1"><label>Birthday</label><input type="date" data-draft-field="fechaNacimiento" value="' + (d.fechaNacimiento || "") + '"></div>' +
    "</div>" +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="observaciones" placeholder="E.g. allergies, health conditions, preferences...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    '<div class="field"><label>Next follow-up</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2" style="flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="7">1 week</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="14">2 weeks</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="30">1 month</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="60">2 months</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-meses="11">11 months</button>' +
    "</div>" +
    '<div class="card" style="margin-top:2px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("package", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13.5px">Products purchased</span></div>' +
    (totalPV ? '<div class="muted small" style="margin-top:2px">Total to date: ' + totalPV + " PV</div>" : "") +
    '<div style="margin-top:2px">' + comprasHtml + "</div>" +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<input id="cliente-compra-producto" type="text" placeholder="Product" style="flex:2;min-width:110px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<input id="cliente-compra-valor" type="number" min="0" placeholder="Value" style="flex:1;min-width:70px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<input id="cliente-compra-pv" type="number" min="0" placeholder="PV" style="flex:1;min-width:60px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    "</div>" +
    '<input id="cliente-compra-fecha" type="date" value="' + hoyISO() + '" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<button class="btn-secondary" style="margin-top:8px;width:100%" data-action="add-compra-cliente">' + Icon("coins", { size: 14 }) + " Add purchase</button>" +
    "</div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-cliente">Save customer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-cliente">Cancel</button>' +
    "</div></div>"
  );
}

function renderCumpleanosPanel(state) {
  const hoy = cumpleanosHoy(state.clientes);
  const body = hoy.length
    ? hoy.map(function (c) {
        const waBtn = c.telefono
          ? '<a class="icon-btn" style="flex-shrink:0" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
          : "";
        return (
          '<div class="row gap-2" style="align-items:center;text-align:left;padding:10px 0;border-top:1px solid var(--border)">' +
          Icon("party", { size: 16, color: "var(--gold)" }) +
          '<span class="small" style="color:var(--text);flex:1;font-weight:600">' + escapeHtml(c.nombre) + "</span>" +
          waBtn +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="margin-top:8px">No customer birthdays today.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between">' +
    '<span class="row gap-2" style="align-items:center;font-weight:700;font-size:15px">' + Icon("party", { size: 16, color: "var(--gold)" }) + "<span>Today's birthdays</span></span>" +
    '<button class="icon-btn" data-action="close-modal">' + Icon("x", { size: 18 }) + "</button></div>" +
    body +
    "</div></div>"
  );
}

function renderAgenda6Modal(ui) {
  const d = ui.agenda6Draft;
  if (!d) return "";
  const filas = Array.from({ length: 6 }, function (_, i) {
    const diaInfo = DIAS.find(function (x) { return x.id === i + 1; });
    const hora = (d.dias[i] && d.dias[i].hora) || "";
    return (
      '<div class="field">' +
      '<label>Day ' + (i + 1) + " — " + escapeHtml(diaInfo.titulo) + "</label>" +
      '<input type="time" data-agenda6-hora="' + i + '" value="' + escapeHtml(hora) + '">' +
      "</div>"
    );
  }).join("");
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-agenda6"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row gap-2">' + Icon("footprints", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:15px">' + escapeHtml(d.contactoNombre) + " is a new partner!</span></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Schedule here the 6 meetings of the 6-Day Plan with ' + escapeHtml(d.contactoNombre) + " — they\'ll be saved to your Weekly Agenda, on the day each one falls. Leave the time blank for any day you don\'t want to schedule yet.</p>" +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + filas + "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-agenda6">Create 6-day schedule</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-agenda6">Not now</button>' +
    "</div></div>"
  );
}

/* ---------------- My Genealogy Tree ---------------- */

function ascendenteRowHTML(a) {
  const waLink = a.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(a.telefono, a.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  const subLinea = [a.rango, a.pais].filter(function (v) { return v; }).join(" · ");
  return (
    '<div class="card roster-row" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(a.nombre || "No name") + "</div>" +
    (subLinea ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(subLinea) + "</div>" : "") +
    (a.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(a.telefono) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-ascendente" data-arg="' + a.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-ascendente" data-arg="' + a.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (a.horarioNoMolestar ? '<div class="muted small" style="margin-top:6px;font-style:italic">Do not disturb: ' + escapeHtml(a.horarioNoMolestar) + "</div>" : "") +
    "</div>"
  );
}

function renderArbolGenealogico(state, ui) {
  const arbol = state.arbolGenealogico;
  const yo = arbol.yo;
  const p = arbol.patrocinador;
  const waPatrocinador = p.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(p.telefono, p.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
    : "";
  const ascendentes = arbol.ascendentes || [];
  const rows = ascendentes.length
    ? ascendentes.map(function (a) { return ascendenteRowHTML(a); }).join("")
    : '<p class="muted small" style="text-align:center;padding:20px 0">You haven\'t added anyone to your upline yet.</p>';

  return (
    sectionHeaderHTML("My Genealogy Tree", "Your ID, your sponsor, and your upline, always at hand.", "crown") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("user-badge", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Me</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">This way your own partners can look up your ID and password without having to ask you every time.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Atomy ID</label><input type="text" data-field="arbolGenealogico.yo.atomyId" value="' + escapeHtml(yo.atomyId) + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field"><label>Password</label><input type="text" data-field="arbolGenealogico.yo.contrasena" value="' + escapeHtml(yo.contrasena) + '" placeholder="Your Atomy password"></div>' +
    '<div class="field"><label>Date of birth</label><input type="date" data-field="arbolGenealogico.yo.fechaNacimiento" value="' + escapeHtml(yo.fechaNacimiento || "") + '"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row between"><div class="row gap-2">' + Icon("crown", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Sponsor</span></div>' + waPatrocinador + "</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Their contact and Zoom info — for asking them for help or signing up for company trainings, which usually ask for your sponsor\'s ID.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Name</label><input type="text" data-field="arbolGenealogico.patrocinador.nombre" value="' + escapeHtml(p.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy ID</label><input type="text" data-field="arbolGenealogico.patrocinador.atomyId" value="' + escapeHtml(p.atomyId) + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Rank</label><input type="text" data-field="arbolGenealogico.patrocinador.rango" value="' + escapeHtml(p.rango) + '" placeholder="E.g. Sales Master"></div>' +
    "</div>" +
    '<div class="field"><label>Date of birth</label><input type="date" data-field="arbolGenealogico.patrocinador.fechaNacimiento" value="' + escapeHtml(p.fechaNacimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-field="arbolGenealogico.patrocinador.pais" value="' + escapeHtml(p.pais) + '" placeholder="E.g. Colombia"></div>' +
    '<div class="field" style="flex:1"><label>Phone</label><input type="text" inputmode="tel" data-field="arbolGenealogico.patrocinador.telefono" value="' + escapeHtml(p.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Zoom ID</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomId" value="' + escapeHtml(p.zoomId) + '" placeholder="Optional"></div>' +
    '<div class="field" style="flex:1"><label>Zoom password</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomContrasena" value="' + escapeHtml(p.zoomContrasena) + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="field"><label>Hours not to call</label><input type="text" data-field="arbolGenealogico.patrocinador.horarioNoLlamar" value="' + escapeHtml(p.horarioNoLlamar) + '" placeholder="E.g. After 8pm, or on Sundays"></div>' +
    '<div class="field"><label>Support WhatsApp group</label><input type="text" data-field="arbolGenealogico.patrocinador.grupoWhatsapp" value="' + escapeHtml(p.grupoWhatsapp || "") + '" placeholder="Paste the group invite link here"></div>' +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">If you add it, a floating button will appear so your new partners can write there when they have questions outside your Hours not to call or the check-in time you\'ve agreed on together.</p>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Upline</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">The people above your direct sponsor — useful if you need their support, or their ID for a training.</p>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-ascendente">' + Icon("crown", { size: 16, color: "#fff" }) + " Add another level up the line</button>" +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + rows + "</div>" +
    "</div>"
  );
}

function renderAscendenteModal(ui) {
  const d = ui.ascendenteDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-ascendente" data-arg="' + d.id + '">' +
      (ui.confirmDeleteAscendente === d.id ? "Are you sure? Tap again to delete" : "Delete person") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-ascendente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit person" : "New upline person") + "</span>" +
    '<button class="icon-btn" data-action="cancel-ascendente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Rank</label><input type="text" data-draft-field="rango" value="' + escapeHtml(d.rango) + '" placeholder="E.g. Sales Master"></div>' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="E.g. Colombia"></div>' +
    "</div>" +
    '<div class="field"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    '<div class="field"><label>Hours not to disturb</label><input type="text" data-draft-field="horarioNoMolestar" value="' + escapeHtml(d.horarioNoMolestar) + '" placeholder="E.g. After 9pm"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-ascendente">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-ascendente">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- S.O.S. Calls ---------------- */

function sosRowHTML(s) {
  const waLink = s.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(s.telefono, s.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card roster-row" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(s.nombre || "No name") + "</div>" +
    (s.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(s.telefono) + "</div>" : "") +
    (s.zoomId ? '<div class="muted small" style="margin-top:2px">Zoom: ' + escapeHtml(s.zoomId) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-sos" data-arg="' + s.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-sos" data-arg="' + s.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (s.nota ? '<div class="muted small" style="margin-top:6px;font-style:italic">“' + escapeHtml(s.nota) + '”</div>' : "") +
    "</div>"
  );
}

function renderLlamadasSOS(state, ui) {
  const lista = state.llamadasSOS || [];
  const rows = lista.length
    ? lista.map(function (s) { return sosRowHTML(s); }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You don\'t have any S.O.S. contacts saved yet.</p>';
  return (
    sectionHeaderHTML("S.O.S. Calls", "People you can call for support, even if they\'re not part of your own line.", "bell") +
    '<div class="card"><p class="small" style="line-height:1.6">Sometimes the help you need doesn\'t come from your direct genealogy — it could be a mentor from another team, a company trainer, or someone you trust who\'s an expert on a topic. Save who to call in those moments.</p></div>' +
    '<button class="btn-primary" data-action="add-sos">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Add contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderSOSModal(ui) {
  const d = ui.sosDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-sos" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSOS === d.id ? "Are you sure? Tap again to delete" : "Delete contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-sos"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit contact" : "New S.O.S. contact") + "</span>" +
    '<button class="icon-btn" data-action="cancel-sos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="field"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    '<div class="field"><label>Zoom ID</label><input type="text" data-draft-field="zoomId" value="' + escapeHtml(d.zoomId || "") + '" placeholder="E.g. 123 456 7890"></div>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="nota" placeholder="Why turn to this person?">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-sos">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-sos">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- My Partners — permanent directory by Left/Right line ---------------- */

function misSocioRowHTML(linea, s) {
  const meses = mesesDesde(s.fechaUltimaCompra);
  const porVencer = meses !== null && meses >= 11;
  return (
    '<button class="card" style="padding:11px 13px;width:100%;text-align:left;display:block;cursor:pointer' +
    (porVencer ? ";border-color:var(--warn);background:rgba(240,166,92,0.1)" : "") + '" data-action="edit-socio" data-linea="' + linea + '" data-arg="' + s.id + '">' +
    '<div class="row between" style="align-items:center;gap:6px">' +
    '<span style="font-weight:700;font-size:13.5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap' + (porVencer ? ";color:var(--warn)" : "") + '">' + escapeHtml(s.nombre || "No name") + "</span>" +
    (porVencer ? Icon("triangle-alert", { size: 14, color: "var(--warn)" }) : "") +
    "</div></button>"
  );
}

function misSociosColumnaHTML(state, linea) {
  const lista = (state.misSocios && state.misSocios[linea]) || [];
  const sorted = lista.slice().sort(function (a, b) { return (a.nombre || "").localeCompare(b.nombre || ""); });
  const rows = sorted.length
    ? sorted.map(function (s) { return misSocioRowHTML(linea, s); }).join("")
    : '<p class="muted small" style="text-align:center;padding:12px 0">No partners yet.</p>';
  return (
    '<div style="min-width:0">' +
    '<div style="font-weight:700;font-size:13px;margin-bottom:6px">' + (linea === "izquierda" ? "Left" : "Right") + " · " + lista.length + "</div>" +
    '<button class="btn-secondary" style="width:100%;padding:8px;font-size:12.5px" data-action="add-socio" data-arg="' + linea + '">' + Icon("phone-call", { size: 14 }) + " Add</button>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
    "</div>"
  );
}

function renderMisSocios(state) {
  return (
    sectionHeaderHTML("My Partners", "Your permanent team directory, by Left and Right line. Tap a name to view or update their info.", "users") +
    '<div class="card"><p class="small" style="line-height:1.6">When a partner has gone <b>11 months without a purchase</b>, their name is highlighted in orange to warn you they are about to expire and need to make a purchase.</p></div>' +
    '<div class="grid-2">' + misSociosColumnaHTML(state, "izquierda") + misSociosColumnaHTML(state, "derecha") + "</div>"
  );
}

function renderSocioModal(ui) {
  const d = ui.socioDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-socio" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSocio === d.id ? "Are you sure? Tap again to delete" : "Delete partner") +
      "</button>"
    : "";
  const meses = mesesDesde(d.fechaUltimaCompra);
  const aviso = meses !== null && meses >= 11
    ? '<p class="small" style="margin-top:-4px;color:var(--warn);font-weight:600;display:flex;align-items:center;gap:5px">' + Icon("triangle-alert", { size: 13, color: "var(--warn)" }) + "Gone " + meses + " months without a purchase — about to expire</p>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-socio"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit partner" : "New partner — " + (d.linea === "izquierda" ? "Left" : "Right") + " line") + "</span>" +
    '<button class="icon-btn" data-action="cancel-socio">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Password</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="field"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    '<div class="field"><label>Zoom ID</label><input type="text" data-draft-field="zoomId" value="' + escapeHtml(d.zoomId || "") + '" placeholder="E.g. 123 456 7890"></div>' +
    '<div class="field"><label>PVP <span class="muted" style="font-weight:400">(update it whenever they send it to you)</span></label><input type="number" min="0" step="10000" data-draft-field="pvp" value="' + (Number(d.pvp) || 0) + '"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Birthday</label><input type="date" data-draft-field="fechaCumpleanos" value="' + (d.fechaCumpleanos || "") + '"></div>' +
    '<div class="field" style="flex:1"><label>Last purchase date</label><input type="date" data-draft-field="fechaUltimaCompra" value="' + (d.fechaUltimaCompra || "") + '"></div>' +
    "</div>" +
    aviso +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="notas" placeholder="Remarks...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-socio">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-socio">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- Contact List (live events) ---------------- */

function contactoEventoRowHTML(c) {
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "No name") +
    (c.pais ? ' <span class="badge soft" style="margin-left:4px">' + escapeHtml(c.pais) + "</span>" : "") + "</div>" +
    (c.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-contacto-evento" data-arg="' + c.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-contacto-evento" data-arg="' + c.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (c.observaciones ? '<div class="muted small" style="margin-top:6px">' + escapeHtml(c.observaciones) + "</div>" : "") +
    "</div>"
  );
}

function renderContactosEventos(state, ui) {
  const lista = state.contactosEventos || [];
  const rows = lista.length
    ? lista.map(function (c) { return contactoEventoRowHTML(c); }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You don\'t have any event contacts saved yet.</p>';
  return (
    sectionHeaderHTML("Contact List", "People you met at seminars, conventions, or other live events — not always prospects yet.", "users") +
    '<button class="btn-primary" data-action="add-contacto-evento">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Add contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderContactoEventoModal(ui) {
  const d = ui.contactoEventoDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contacto-evento" data-arg="' + d.id + '">' +
      (ui.confirmDeleteContactoEvento === d.id ? "Are you sure? Tap again to delete" : "Delete contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto-evento"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit contact" : "New contact") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto-evento">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="E.g. Colombia"></div>' +
    '<div class="field" style="flex:1"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+1 555 000 0000"></div>' +
    "</div>" +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="observaciones" placeholder="Where you met them, interests...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto-evento">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto-evento">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- Weekly Agenda ---------------- */

function agendaTipoInfo(tipoId) {
  return AGENDA_TIPOS.find(function (t) { return t.id === tipoId; }) || AGENDA_TIPOS[0];
}

function actividadRowHTML(dia, a) {
  const tipo = agendaTipoInfo(a.tipo);
  const puntual = !!a.fecha;
  return (
    '<div class="card" style="padding:12px' + (a.hecha ? ";opacity:.6" : "") + '">' +
    '<div class="row gap-3" style="align-items:flex-start">' +
    '<button data-action="toggle-actividad-hecha" data-dia="' + dia + '" data-arg="' + a.id + '" style="flex-shrink:0;margin-top:1px">' +
    Icon(a.hecha ? "check-circle" : "circle", { size: 20, color: a.hecha ? "var(--success)" : "var(--text-soft)" }) +
    "</button>" +
    '<div style="flex:1;min-width:0">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + Icon(tipo.icon, { size: 13, color: "var(--gold-light)" }) +
    '<span style="font-weight:700;font-size:13.5px' + (a.hecha ? ";text-decoration:line-through" : "") + '">' + escapeHtml(tipo.label) + "</span>" +
    (a.hora ? '<span class="muted small">· ' + escapeHtml(a.hora) + "</span>" : "") +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " " + escapeHtml(agendaFechaLabel(a.fecha)) + "</span>" : "") +
    (a.recordar ? Icon("bell", { size: 12, color: "var(--gold-light)" }) : "") + "</div>" +
    (a.nota ? '<div class="muted small" style="margin-top:3px">' + escapeHtml(a.nota) + "</div>" : "") +
    "</div>" +
    '<button class="icon-btn" data-action="edit-actividad" data-dia="' + dia + '" data-arg="' + a.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    "</div></div>"
  );
}

function agendaFechaLabel(fecha) {
  try {
    return new Date(fecha + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" });
  } catch (e) {
    return fecha;
  }
}

function zoomRowHTML(dia, z) {
  const puntual = !!z.fecha;
  return (
    '<div class="card" style="padding:12px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div class="row gap-2" style="min-width:0">' + Icon("video", { size: 14, color: "var(--gold-light)" }) +
    '<div style="min-width:0"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(z.titulo || "Untitled meeting") + "</div>" +
    '<div class="row gap-2" style="margin-top:2px;flex-wrap:wrap">' +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " Just " + escapeHtml(agendaFechaLabel(z.fecha)) + "</span>" : '<span class="badge dark">Every week</span>') +
    (z.hora ? '<span class="muted small">' + escapeHtml(z.hora) + "</span>" : "") +
    (z.recordar ? Icon("bell", { size: 11, color: "var(--gold-light)" }) : "") +
    "</div></div></div>" +
    '<button class="icon-btn" data-action="edit-zoom" data-dia="' + dia + '" data-arg="' + z.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    "</div>" +
    (z.enlace
      ? '<div class="row gap-2" style="margin-top:10px">' +
        '<a class="btn-secondary" style="flex:1;padding:8px;text-align:center" href="' + escapeHtml(z.enlace) + '" target="_blank" rel="noreferrer">' + Icon("video", { size: 14 }) + " Join</a>" +
        '<button class="icon-btn" data-action="copy-zoom-link" data-arg="' + escapeHtml(z.enlace) + '">' + Icon("copy", { size: 14 }) + "</button>" +
        "</div>"
      : '<div class="muted small" style="margin-top:8px">No link saved yet — tap to add one.</div>') +
    "</div>"
  );
}

function renderAgenda(state, ui) {
  const diaActivo = ui.agendaDia || diaSemanaHoyId();
  const diaInfo = DIAS_SEMANA.find(function (d) { return d.id === diaActivo; });
  const diaData = state.agenda[diaActivo] || emptyAgendaDia();

  const tabs = DIAS_SEMANA.map(function (d) {
    const active = diaActivo === d.id;
    const esHoy = d.id === diaSemanaHoyId();
    return (
      '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="set-agenda-dia" data-arg="' + d.id + '">' +
      d.label.slice(0, 3) + (esHoy ? " •" : "") +
      "</button>"
    );
  }).join(" ");

  const actividades = diaData.actividades.slice().sort(function (a, b) { return (a.hora || "99:99").localeCompare(b.hora || "99:99"); });
  const actividadesHtml = actividades.length
    ? actividades.map(function (a) { return actividadRowHTML(diaActivo, a); }).join("")
    : '<p class="muted small" style="text-align:center;padding:16px 0">No activities for ' + escapeHtml(diaInfo.label) + ".</p>";

  const zoomsHtml = diaData.zooms.length
    ? diaData.zooms.map(function (z) { return zoomRowHTML(diaActivo, z); }).join("")
    : '<p class="muted small" style="text-align:center;padding:16px 0">No Zoom meetings saved for this day.</p>';

  return (
    sectionHeaderHTML("Weekly Agenda", "Your day-to-day work routine — calls, visits, presentations, registrations, and trainings, plus your Zoom meetings.", "calendar") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + tabs + "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Activities — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-actividad" data-arg="' + diaActivo + '">+ Add</button></div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + actividadesHtml + "</div>" +
    "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Zoom — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-zoom" data-arg="' + diaActivo + '">+ Add</button></div>' +
    '<div class="muted small" style="margin-top:2px">Save your recurring Zooms here (the same link every week) or a one-off as soon as you get the invite — for example, if you\'re told today about a Zoom for tomorrow, add it right here with its date, time, and link.</div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + zoomsHtml + "</div>" +
    "</div>"
  );
}

/* ---------------- Weekly Report ---------------- */

const REGISTRO_TIPOS = [
  { id: "llamadas", label: "Calls", icon: "phone-call" },
  { id: "mensajes", label: "Invitation messages", icon: "message-circle" },
  { id: "pedidos", label: "Orders", icon: "package" },
];

/* Stats derived from the List of 250 (not manual counters: calculated on
   the fly from state.contactos, based on estadoFecha/follow-ups). */
const REGISTRO_DERIVADOS = [
  { id: "contactados", label: "Contacted", icon: "phone-call" },
  { id: "presentaciones", label: "Presentations", icon: "presentation" },
  { id: "registros", label: "New registrations (Partner/Consumer)", icon: "user-badge" },
  { id: "seguimientosRealizados", label: "Follow-ups done", icon: "check-circle" },
];

/* The 7 indicators of the fortnightly summary: 3 manual + 4 derived, in a
   single order for the chart and the comparative metric selector. Each with
   a distinct color taken from the palette already defined in :root
   (css/styles.css). */
const QUINCENA_METRICAS = [
  { id: "llamadas", label: "Calls", corta: "Calls", color: "var(--gold)" },
  { id: "mensajes", label: "Messages", corta: "Msgs", color: "var(--gold-light)" },
  { id: "pedidos", label: "Orders", corta: "Ord", color: "var(--gold-deep)" },
  { id: "contactados", label: "Contacted", corta: "Cont", color: "var(--accent)" },
  { id: "presentaciones", label: "Presentations", corta: "Pres", color: "var(--success)" },
  { id: "registros", label: "Registrations", corta: "Reg", color: "var(--warn)" },
  { id: "seguimientosRealizados", label: "Follow-ups done", corta: "F/up", color: "var(--text-soft)" },
];

function contadorAccionHTML(tipo, label, icon, valorHoy) {
  return (
    '<div class="card" style="padding:12px">' +
    '<div class="row between" style="align-items:center">' +
    '<div class="row gap-2">' + Icon(icon, { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13.5px">' + escapeHtml(label) + "</span></div>" +
    '<div class="row gap-2" style="align-items:center">' +
    '<button class="icon-btn" style="font-size:18px;font-weight:700;width:32px;height:32px;background:rgba(255,255,255,0.04);border-radius:8px" data-action="decrementar-registro" data-arg="' + tipo + '">−</button>' +
    '<span style="min-width:22px;text-align:center;font-weight:700;font-size:16px">' + valorHoy + "</span>" +
    '<button class="icon-btn" style="font-size:18px;font-weight:700;width:32px;height:32px;background:rgba(255,255,255,0.04);border-radius:8px" data-action="incrementar-registro" data-arg="' + tipo + '">+</button>' +
    "</div></div></div>"
  );
}

function informeSemanalTextoPersonal(state, semana, derivados, idioma) {
  const t = informeI18n(idioma);
  return (
    t.tituloPersonal + "\n" +
    "• " + t.llamadas + ": " + semana.llamadas + "\n" +
    "• " + t.mensajes + ": " + semana.mensajes + "\n" +
    "• " + t.pedidos + ": " + semana.pedidos + "\n" +
    "• " + t.contactados + ": " + derivados.contactados + "\n" +
    "• " + t.presentaciones + ": " + derivados.presentaciones + "\n" +
    "• " + t.reuniones + ": " + derivados.seguimientosRealizados + "\n" +
    "• " + t.nuevosRegistros + ": " + derivados.registros +
    "\n\n" + t.cierrePersonal
  );
}

function informeSemanalTextoEquipo(state, equipo, idioma) {
  const t = informeI18n(idioma);
  return (
    t.tituloEquipo + "\n" +
    "• " + t.sociosActivos + ": " + equipo.totalSocios + "\n" +
    "• " + t.nuevosSocios + ": " + equipo.nuevosSocios + "\n" +
    "• " + t.seguimientosSemana + ": " + equipo.seguimientosSemana + "\n" +
    "• " + t.seguimientosVencidos + ": " + equipo.seguimientosVencidos +
    "\n\n" + t.cierreEquipo
  );
}

function idiomaInformeSelectorHTML(state) {
  return (
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("compass", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13px">Report language</span></div>' +
    '<p class="muted small" style="margin-top:2px">Choose the language your sponsor will receive the report in (it can be different from your app\'s language).</p>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:8px">' +
    IDIOMAS_INFORME.map(function (i) {
      const active = state.idiomaInforme === i.id;
      return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="set-idioma-informe" data-arg="' + i.id + '">' + escapeHtml(i.label) + "</button>";
    }).join("") +
    "</div></div>"
  );
}

function renderInformeSemanal(state, ui) {
  const hoy = hoyISO();
  const hoyReg = getRegistroDia(state, hoy);
  const semana = sumarRegistroSemana(state);
  const derivadosSemana = calcularDerivadosPeriodo(state, ultimos7Dias());

  const contadores = REGISTRO_TIPOS.map(function (t) { return contadorAccionHTML(t.id, t.label, t.icon, hoyReg[t.id] || 0); }).join("");

  const resumenSemana =
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px">This week (last 7 days)</div>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_TIPOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (semana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const resumenListaHtml =
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("users", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">This week — your List of 250</span></div>' +
    '<p class="muted small" style="margin-top:2px">Only counts what actually changed status this week — not just any new contact.</p>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_DERIVADOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (derivadosSemana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const idioma = state.idiomaInforme || "en";
  const hayActividad = (semana.llamadas + semana.mensajes + semana.pedidos + derivadosSemana.contactados + derivadosSemana.presentaciones + derivadosSemana.registros + derivadosSemana.seguimientosRealizados) > 0;
  const compartirPersonal = hayActividad
    ? (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-primary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoPersonal(state, semana, derivadosSemana, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 16, color: "#fff" }) + " Share my report with my sponsor</a>"
        : '<p class="muted small" style="margin-top:10px">Add your sponsor\'s WhatsApp in Settings so you can share your report.</p>')
    : '<p class="muted small" style="margin-top:10px">Log at least one action this week to share your report.</p>';
  const idiomaSelector = hayActividad ? idiomaInformeSelectorHTML(state) : "";

  let equipoHtml = "";
  if (state.mentorMode) {
    const socios = state.contactos.filter(function (c) { return c.estado === "Partner"; });
    const semanaIds = ultimos7Dias();
    const equipo = {
      totalSocios: socios.length,
      // "New this week" is based on estadoFecha (when they became a Partner), not on
      // the contact's creation date — same as the personal report's registrosSemana,
      // so someone contacted months ago who only just became a partner still counts.
      nuevosSocios: socios.filter(function (c) { return c.estadoFecha && semanaIds.indexOf(c.estadoFecha) !== -1; }).length,
      seguimientosSemana: socios.filter(function (c) { return c.proximoSeguimiento && c.proximoSeguimiento >= hoy && c.proximoSeguimiento <= addDiasISO(hoy, 6); }).length,
      seguimientosVencidos: socios.filter(function (c) { return c.proximoSeguimiento && c.proximoSeguimiento < hoy; }).length,
    };
    equipoHtml =
      '<div class="card" style="margin-top:16px;border-color:var(--gold)">' +
      '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">My Team\'s Report</span></div>' +
      '<p class="muted small" style="margin-top:4px;line-height:1.5">A snapshot of your own team, to help guide them — and to share with your own sponsor, just like they share theirs with you.</p>' +
      '<div class="grid-2" style="margin-top:10px;gap:10px">' +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Active partners</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.totalSocios + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">New this week</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.nuevosSocios + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Follow-ups this week</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.seguimientosSemana + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Overdue follow-ups</div><div style="font-size:18px;font-weight:700;color:' + (equipo.seguimientosVencidos > 0 ? "var(--warn)" : "var(--gold-light)") + '">' + equipo.seguimientosVencidos + "</div></div>" +
      "</div>" +
      (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-secondary" style="margin-top:12px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoEquipo(state, equipo, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share my team's report</a>"
        : "") +
      "</div>";
  }

  return (
    sectionHeaderHTML("Weekly Report", "Log your actions day by day, and share your progress with your sponsor — so they can help you grow.", "trending-up") +
    '<div><div style="font-weight:700;font-size:14px;margin-bottom:8px">Today</div>' +
    '<div class="view-stack gap-sm">' + contadores + "</div></div>" +
    resumenSemana +
    resumenListaHtml +
    renderResumenQuincenaHTML(state, ui) +
    idiomaSelector +
    compartirPersonal +
    equipoHtml
  );
}

/* ---------------- Fortnightly summary (calendar) — SVG charts ---------------- */

function svgBarChart(items, opts) {
  opts = opts || {};
  const W = opts.width || 320;
  const H = opts.height || 190;
  const padTop = 22, padBottom = 32, padSide = 6;
  const chartW = W - padSide * 2;
  const chartH = H - padTop - padBottom;
  const max = Math.max(1, ...items.map(function (i) { return Number(i.value) || 0; }));
  const n = Math.max(items.length, 1);
  const gap = n > 1 ? 8 : 0;
  const barW = Math.max(10, (chartW - gap * (n - 1)) / n);
  let bars = "";
  items.forEach(function (it, i) {
    const x = padSide + i * (barW + gap);
    const val = Number(it.value) || 0;
    const h = max > 0 ? (val / max) * chartH : 0;
    const y = padTop + (chartH - h);
    const color = it.color || "var(--gold)";
    bars +=
      '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + Math.max(h, 1).toFixed(1) + '" rx="4" fill="' + color + '"/>' +
      '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">' + val + "</text>" +
      '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (H - 10).toFixed(1) + '" text-anchor="middle" font-size="9.5" fill="var(--text-soft)">' + escapeHtml(it.label) + "</text>";
  });
  const baseY = padTop + chartH;
  return (
    '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="' + H + '" preserveAspectRatio="xMidYMid meet" style="display:block;max-width:100%">' +
    '<line x1="' + padSide + '" y1="' + baseY + '" x2="' + (W - padSide) + '" y2="' + baseY + '" stroke="var(--border)" stroke-width="1"/>' +
    bars +
    "</svg>"
  );
}

function quincenaNavHTML(key) {
  return (
    '<div class="row between" style="align-items:center;margin-top:10px">' +
    '<div class="icon-btn" style="cursor:pointer" data-action="quincena-nav" data-arg="-1">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<span style="font-weight:600;font-size:13px">' + escapeHtml(calQuincenaLabel(key)) + (key === calQuincenaActualKey() ? ' <span class="muted small">(current)</span>' : "") + "</span>" +
    '<div class="icon-btn" style="cursor:pointer" data-action="quincena-nav" data-arg="1">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>"
  );
}

function renderResumenQuincenaHTML(state, ui) {
  const abierto = !!ui.quincenaResumenAbierto;
  const header =
    '<div class="card" style="margin-top:12px">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-quincena-resumen">' +
    '<div class="row gap-2">' + Icon("trending-up", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13px">Fortnightly summary</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (abierto ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 15, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px">Your calls, messages, orders, contacts, and follow-ups, grouped by calendar fortnight (1–15 and 16–end of each month).</p>';

  if (!abierto) return header + "</div>";

  const key = ui.quincenaVista || calQuincenaActualKey();
  const datos = datosQuincena(state, key);
  const items = QUINCENA_METRICAS.map(function (m) { return { label: m.corta, value: datos[m.id] || 0, color: m.color }; });

  const actual =
    '<div style="margin-top:12px">' +
    quincenaNavHTML(key) +
    '<div style="margin-top:8px">' + svgBarChart(items) + "</div>" +
    "</div>";

  const claves = quincenasConActividad(state);
  let comparativo;
  if (claves.length < 2) {
    comparativo =
      '<p class="muted small" style="margin-top:14px;text-align:center;padding:10px 0">Come back once you have at least 2 fortnights of activity to see your progress compared.</p>';
  } else {
    const metricaId = ui.quincenaMetricaTab || "llamadas";
    const metricaChips = QUINCENA_METRICAS.map(function (m) {
      const active = metricaId === m.id;
      return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="set-quincena-metrica" data-arg="' + m.id + '">' + escapeHtml(m.label) + "</button>";
    }).join("");
    const metrica = QUINCENA_METRICAS.find(function (m) { return m.id === metricaId; }) || QUINCENA_METRICAS[0];
    const compItems = claves.map(function (k) {
      return { label: calQuincenaLabelCorta(k), value: datosQuincena(state, k)[metrica.id] || 0, color: metrica.color };
    });
    comparativo =
      '<div style="margin-top:16px;border-top:1px solid var(--border-soft);padding-top:12px">' +
      '<div style="font-weight:700;font-size:13px">Progress compared</div>' +
      '<div class="row gap-2" style="flex-wrap:wrap;margin-top:8px">' + metricaChips + "</div>" +
      '<div style="margin-top:10px">' + svgBarChart(compItems, { width: Math.max(320, claves.length * 46) }) + "</div>" +
      "</div>";
  }

  return header + actual + comparativo + "</div>";
}

function recordatorioFieldHTML(d, toggleAction) {
  const on = !!d.recordar;
  const minOpts = [0, 10, 30, 60].map(function (m) {
    const label = m === 0 ? "At that time" : m + " min before";
    return '<option value="' + m + '"' + (Number(d.recordarMin) === m ? " selected" : "") + ">" + label + "</option>";
  }).join("");
  return (
    '<div class="field">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<button class="check-dot' + (on ? " on" : "") + '" data-action="' + toggleAction + '">' + (on ? Icon("check", { size: 13, color: "#1B1338" }) : Icon("bell", { size: 13 })) + "</button>" +
    '<button class="check-label' + (on ? " on" : "") + '" style="padding:0;flex:1;text-align:left" data-action="' + toggleAction + '">Notify me</button>' +
    "</div>" +
    (on
      ? '<select data-draft-field="recordarMin" style="width:100%;margin-top:8px;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:9px 12px;font-size:13.5px;outline:none">' + minOpts + "</select>" +
        '<p class="muted small" style="margin-top:4px">Only alerts while you have Cumbre 90 open in the browser or installed, with notifications turned on in Settings.</p>'
      : "") +
    "</div>"
  );
}

function renderActividadModal(ui) {
  const d = ui.actividadDraft;
  if (!d) return "";
  const editing = !!ui.actividadEditId;
  const tipoOpts = AGENDA_TIPOS.map(function (t) { return '<option value="' + t.id + '"' + (d.tipo === t.id ? " selected" : "") + ">" + t.label + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-actividad" data-dia="' + d.dia + '" data-arg="' + ui.actividadEditId + '">' +
      (ui.confirmDeleteActividad === ui.actividadEditId ? "Are you sure? Tap again to delete" : "Delete activity") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-actividad"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit activity" : "New activity") + "</span>" +
    '<button class="icon-btn" data-action="cancel-actividad">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Type</label><select data-draft-field="tipo" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + tipoOpts + "</select></div>" +
    '<div class="field"><label>Time (optional)</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Date (optional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Leave it empty if it repeats every week on that day. Add a date if it\'s a one-off — for example, a single task.</p></div>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="nota" placeholder="Who with, where, what you need to bring...">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    recordatorioFieldHTML(d, "toggle-actividad-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-actividad">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-actividad">Cancel</button>' +
    "</div></div>"
  );
}

function renderPatrocinadorFabModal(ui) {
  const d = ui.patrocinadorFabDraft;
  if (!d) return "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancelar-patrocinador-fab"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Add your sponsor</span>' +
    '<button class="icon-btn" data-action="cancelar-patrocinador-fab">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">You haven\'t saved their WhatsApp yet. Add it once and this button will open their chat directly every time you tap it.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre || "") + '" placeholder="Your sponsor\'s name"></div>' +
    '<div class="field"><label>WhatsApp</label><input type="text" inputmode="numeric" data-draft-field="telefono" value="' + escapeHtml(d.telefono || "") + '" placeholder="E.g. 34600000000"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="guardar-patrocinador-fab">Save and message them</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancelar-patrocinador-fab">Cancel</button>' +
    "</div></div>"
  );
}

function renderZoomModal(ui) {
  const d = ui.zoomDraft;
  if (!d) return "";
  const editing = !!ui.zoomEditId;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-zoom" data-dia="' + d.dia + '" data-arg="' + ui.zoomEditId + '">' +
      (ui.confirmDeleteZoom === ui.zoomEditId ? "Are you sure? Tap again to delete" : "Delete meeting") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-zoom"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit Zoom meeting" : "New Zoom meeting") + "</span>" +
    '<button class="icon-btn" data-action="cancel-zoom">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Title</label><input type="text" data-draft-field="titulo" value="' + escapeHtml(d.titulo || "") + '" placeholder="E.g. Weekly team training"></div>' +
    '<div class="field"><label>Time</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Date (optional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Leave it empty if it\'s your regular weekly Zoom. Add a date if it\'s a one-off meeting — for example, one you were just invited to for tomorrow.</p></div>' +
    '<div class="field"><label>Meeting link</label><input type="text" inputmode="url" data-draft-field="enlace" value="' + escapeHtml(d.enlace || "") + '" placeholder="https://zoom.us/j/..."></div>' +
    recordatorioFieldHTML(d, "toggle-zoom-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-zoom">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-zoom">Cancel</button>' +
    "</div></div>"
  );
}
