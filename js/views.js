/* ---------------------------------------------------------------
   VIEWS — Cumbre Master: each function returns an HTML string
   for #view-container (or for the fixed regions: header, menu, modals)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "plan", label: "Compensation Plan", icon: "book-open" },
  { id: "planeador", label: "Pay Period Planner", icon: "target" },
  { id: "listas", label: "Focus Meeting", icon: "users" },
  { id: "reto7x7", label: "7×7 Challenge", icon: "flame" },
  { id: "agenda", label: "Weekly Agenda", icon: "calendar" },
  { id: "informe", label: "Weekly Report", icon: "trending-up" },
  { id: "arbol", label: "My Genealogy Tree", icon: "crown" },
  { id: "sos", label: "S.O.S. Calls", icon: "bell" },
  { id: "eventos", label: "Contacts List", icon: "users" },
  { id: "perfil", label: "My Rank", icon: "user-badge" },
  { id: "ajustes", label: "Settings", icon: "settings" },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 20) return "Good afternoon";
  return "Good evening";
}

/* ---------------- Welcome / Onboarding ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen cover-screen">' +
    Icon("gem", { size: 64, color: "var(--gold)" }) +
    '<h1 style="margin-top:22px;font-size:28px;font-weight:700;letter-spacing:-.02em">Cumbre Master</h1>' +
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">From Sales Master to Imperial Master</p>' +
    '<p class="muted" style="margin-top:22px;max-width:300px;font-size:15px;line-height:1.6">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Get started ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    (LICENCIA_TITULAR ? '<p class="muted small" style="margin-top:26px;opacity:.6">Exclusive licensed copy for ' + escapeHtml(LICENCIA_TITULAR) + "</p>" : "") +
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
    '<p class="muted small" style="margin-top:4px">This helps us personalize your leader dashboard.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Your name" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<div style="width:100%;max-width:320px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Your Atomy details <span class="muted" style="font-weight:400">(optional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">We\'ll save them in your Genealogy Tree, so you never have to look them up or enter them again.</p>' +
    '<input id="onboarding-atomy-id-input" type="text" placeholder="Your Atomy ID" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-atomy-pass-input" type="text" placeholder="Your Atomy password" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<div style="width:100%;max-width:320px;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Your sponsor <span class="muted" style="font-weight:400">(optional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">This turns on the WhatsApp button to message them right away, and saves it in your Genealogy Tree. You can skip this and fill it in later.</p>' +
    '<input id="onboarding-sponsor-name-input" type="text" placeholder="Your sponsor\'s name" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-sponsor-phone-input" type="text" inputmode="numeric" placeholder="Their WhatsApp, e.g. 34600000000" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Get started ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    "</div>"
  );
}

/* ---------------- Header / Menu ---------------- */

function renderHeader(state, ui) {
  const hasReminders = getReminders(state).length > 0;
  return (
    '<div class="app-header">' +
    '<button class="icon-btn menu-toggle" data-action="open-menu">' + Icon("menu", { size: 22 }) + "</button>" +
    '<div class="brand">' + Icon("gem", { size: 18, color: "var(--gold)" }) + '<span>CUMBRE MASTER</span></div>' +
    '<div class="actions">' +
    '<button class="icon-btn" style="position:relative" data-action="open-bell">' + Icon("bell", { size: 18 }) +
    (hasReminders ? '<span style="position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:999px;background:var(--warn)"></span>' : "") +
    "</button>" +
    '<button class="icon-btn" data-action="toggle-dark">' + Icon(state.dark ? "sun" : "moon", { size: 18 }) + "</button>" +
    "</div></div>"
  );
}

function renderSidebar(ui) {
  const items = MENU_ITEMS.map(function (it) {
    const active = ui.view === it.id;
    return (
      '<button class="sidebar-item' + (active ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      Icon(it.icon, { size: 20 }) + "<span>" + it.label + "</span></button>"
    );
  }).join("");
  const salir = '<button class="sidebar-item" style="color:var(--warn)" data-action="salir-app">' + Icon("log-out", { size: 20 }) + "<span>Exit</span></button>";
  return (
    '<div class="sidebar">' +
    '<div class="sidebar-logo">' + Icon("gem", { size: 22, color: "var(--gold)" }) + "</div>" +
    items + salir +
    '<div class="sidebar-spacer"></div>' +
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
    '<div class="menu-head"><div class="row gap-2">' + Icon("gem", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">CUMBRE MASTER</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + salir + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Exclusive license: ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
    "</div></div>"
  );
}

/* ---------------- reminders / bell ---------------- */

function getReminders(state) {
  const out = [];
  const key = quincenaActualKey();
  const q = state.quincenas[key];
  const dias = diasRestantesQuincena(key);
  if (q && dias > 0) {
    [["izquierda", "Left"], ["derecha", "Right"]].forEach(function (par) {
      const verificado = sumaLinea(q, par[0], true);
      const faltante = Math.max(0, META_PV_QUINCENA - verificado);
      if (faltante > 0) {
        const ritmo = Math.ceil(faltante / dias);
        out.push({ text: par[1] + " leg: " + faltante.toLocaleString("en") + " verified PV still needed. Required pace: " + ritmo.toLocaleString("en") + " PV/day." });
      }
    });
  }
  const hoy = hoyISO();
  (state.contactosEventos || []).forEach(function (c) {
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

function renderBellPanel(state) {
  const reminders = getReminders(state);
  const body = reminders.length
    ? reminders.map(function (r) {
        const waBtn = r.telefono
          ? '<a class="icon-btn" style="flex-shrink:0" href="' + waHrefPersonal(r.telefono) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
          : "";
        const hechoBtn = r.contactoId
          ? '<div class="icon-btn" style="flex-shrink:0;cursor:pointer" data-action="marcar-seguimiento-contacto-hecho" data-arg="' + r.contactoId + '" title="Mark follow-up done">' + Icon("check-circle", { size: 14, color: "var(--success)" }) + "</div>"
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
        ? '<button class="link-btn small" style="margin-top:8px" data-action="goto" data-arg="eventos">View Contacts List →</button>'
        : "")
    : '<p class="muted small" style="margin-top:8px">You\'re on track — no pending alerts or follow-ups.</p>';
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
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card logro-modal">' +
    Icon("award", { size: 46, color: "var(--gold)" }) +
    '<div class="logro-modal-eyebrow">New rank reached!</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Share it with your team — leading by example duplicates more than any speech 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">Great, continue</button>' +
    "</div></div>"
  );
}

/* ---------------- Home ---------------- */

function quincenaNavHTML(qKey) {
  const actual = esQuincenaActual(qKey);
  return (
    '<div class="quincena-nav">' +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="-1">' + Icon("chevron-left", { size: 18 }) + "</button>" +
    '<div class="qn-label">' + escapeHtml(quincenaLabel(qKey)) + (actual ? ' <span class="badge gold" style="margin-left:6px">Current</span>' : "") + "</div>" +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="1">' + Icon("chevron-right", { size: 18 }) + "</button>" +
    "</div>" +
    (actual ? '<div class="muted small" style="text-align:center;margin-top:-4px">' + diasRestantesQuincena(qKey) + " days left in this pay period</div>" : "")
  );
}

function resumenLineasHTML(planIzq, verIzq, planDer, verDer) {
  const pctIzq = Math.min(100, Math.round((verIzq / META_PV_QUINCENA) * 100));
  const pctDer = Math.min(100, Math.round((verDer / META_PV_QUINCENA) * 100));
  function bloque(nombre, plan, ver, pct) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      '<div class="rl-value">' + ver.toLocaleString("en") + ' <span class="muted small" style="font-weight:400">/ ' + META_PV_QUINCENA.toLocaleString("en") + " PV</span></div>" +
      '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 3) + '%"></div></div>' +
      '<div class="rl-sub">Verified ' + pct + "% · Planned, not yet verified: " + plan.toLocaleString("en") + " PV</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Left", planIzq, verIzq, pctIzq) + bloque("Right", planDer, verDer, pctDer) + "</div>";
}

function renderHome(state, ui) {
  const rango = RANGOS_MASTER[state.rangoActualIndex];
  const siguiente = RANGOS_MASTER[state.rangoActualIndex + 1];
  const key = quincenaActualKey();
  const q = peekQuincena(state, key);
  const planIzq = sumaLinea(q, "izquierda", false), verIzq = sumaLinea(q, "izquierda", true);
  const planDer = sumaLinea(q, "derecha", false), verDer = sumaLinea(q, "derecha", true);
  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Your photo"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(rango.nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Hi, ' + escapeHtml(state.nombre || "leader") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Your current pay period</div>' +
    '<div class="muted small" style="margin-top:4px">' + escapeHtml(quincenaLabel(key)) + " · " + diasRestantesQuincena(key) + " days left</div>" +
    "</div>" +

    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +

    (siguiente
      ? '<div class="card"><div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Your next goal</span></div>' +
        '<div style="font-size:15px;font-weight:700;margin-top:6px">' + escapeHtml(siguiente.nombre) + "</div>" +
        '<div class="muted small" style="margin-top:2px;line-height:1.5">' + escapeHtml(siguiente.prerrequisito) + "</div>" +
        "</div>"
      : '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 You already reached Imperial Master, the highest rank in the plan!</div>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="planeador">' + medallionHTML("target", 44) + '<div class="nc-body"><div class="nc-title">Pay Period Planner</div><div class="nc-desc">How much is left and at what pace</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="listas">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Focus Meeting</div><div class="nc-desc">Plan with your team, line by line</div></div>' + clicaAquiBadgeHTML(false, "accent") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan">' + medallionHTML("book-open", 44) + '<div class="nc-body"><div class="nc-title">Compensation Plan</div><div class="nc-desc">How it works, explained simply</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>"
  );
}

/* ---------------- Compensation Plan (theory) ---------------- */

function renderPlanCompensacion(ui, state) {
  const vueltos = ui.rangosVueltos || {};
  const paisInfo = paisCatalogoInfo((state && state.pais) || "CO");

  const partes = DISTRIBUCION.partes.map(function (p) {
    return (
      '<div class="row gap-3" style="padding:10px 0;border-top:1px solid var(--border-soft)">' +
      medallionHTML(p.icon, 40) +
      '<div style="flex:1"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.pct) + " — " + escapeHtml(p.nombre) + "</div>" +
      '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.detalle) + "</div></div>" +
      "</div>"
    );
  }).join("");

  const filasTabla = COMISION_GENERAL.map(function (c) {
    return "<tr><td>" + escapeHtml(c.nivel) + "</td><td class=\"num\">" + escapeHtml(c.puntos) + "</td><td>" + escapeHtml(c.condicion) + "</td><td class=\"num\">" + escapeHtml(c.piernaDebil) + "</td></tr>";
  }).join("");

  const cards = RANGOS_MASTER.map(function (r) {
    const flipped = !!vueltos[r.n];
    const front =
      '<div class="flip-face flip-front">' +
      medallionHTML(r.icon, 64) +
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">' + (r.n === 0 ? "Rank achieved" : "Rank " + (r.n + 1)) + "</div>" +
      '<div style="font-size:16px;font-weight:700;margin-top:2px">' + escapeHtml(r.nombre) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Tap to see the details</span></div>' +
      "</div>";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + escapeHtml(r.nombre) + "</div>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Prerequisite</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.prerrequisito) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Mastery Commission</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.comisionMaestria) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Bonus on promotion</div>' +
      (r.montos || []).map(function (m) {
        return '<p style="font-size:13px;font-weight:700;line-height:1.5;margin-top:4px;color:var(--gold-light)">' + escapeHtml(m.etiqueta) + ": " + escapeHtml(formatMonedaAprox(m.cop, paisInfo)) + "</p>";
      }).join("") +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.promocion) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">To advance</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.criterio) + "</p>" +
      "</div>";
    return (
      '<button class="flip-card' + (flipped ? " is-open" : "") + '" data-action="flip-rango" data-arg="' + r.n + '">' +
      '<div class="flip-inner' + (flipped ? " flipped" : "") + '">' + front + back + "</div>" +
      "</button>"
    );
  }).join("");

  const criterios = "<ul style=\"margin:0;padding-left:18px\">" + CRITERIOS_GENERALES.map(function (c) { return '<li class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(c) + "</li>"; }).join("") + "</ul>";
  const notas = NOTAS_VALORES.map(function (n) {
    const texto = escapeHtml(n.etiqueta) + ": equivalent to " + escapeHtml(formatMonedaAprox(n.cop, paisInfo)) + (n.sufijo ? " " + escapeHtml(n.sufijo) : "") + ".";
    return '<p class="muted small" style="line-height:1.5;margin-top:6px">' + texto + "</p>";
  }).join("") + '<p class="muted small" style="line-height:1.5;margin-top:6px">' + escapeHtml(NOTA_MONEDA_APROX) + "</p>";
  const clubes = CLUBES_EXITO.map(function (c) {
    const requisito = c.requisito || ("Have earned an annual income of " + formatMonedaAprox(c.ingresoAnualCop, paisInfo) + ".");
    const nota = c.ingresoCopMin
      ? "Equivalent to an income " + formatMonedaRangoAprox(c.ingresoCopMin, c.ingresoCopMax, paisInfo) + " " + c.ingresoSufijo + "."
      : "";
    return (
      '<div class="row gap-3" style="padding:9px 0;border-top:1px solid var(--border-soft)">' +
      Icon("award", { size: 16, color: "var(--gold-light)" }) +
      '<div style="flex:1"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(c.nombre) + "</div>" +
      '<div class="muted small" style="margin-top:2px;line-height:1.4">' + escapeHtml(requisito) + (nota ? " " + escapeHtml(nota) : "") + "</div></div>" +
      "</div>"
    );
  }).join("");

  return (
    sectionHeaderHTML("Compensation Plan", "How commissions are split, and the path from Sales Master to Imperial Master.", "book-open") +
    '<div class="card">' +
    '<p class="small" style="line-height:1.6">' + escapeHtml(DISTRIBUCION.intro) + "</p>" +
    partes +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(DISTRIBUCION.notaPeriodo) + "</p>" +
    "</div>" +
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px;margin-bottom:8px">General Commission (44%)</div>' +
    '<div class="table-simple"><table><thead><tr><th>Level</th><th>Points</th><th>Member condition</th><th>Weak leg</th></tr></thead><tbody>' + filasTabla + "</tbody></table></div>" +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(COMISION_GENERAL_NOTA) + "</p>" +
    "</div>" +
    '<div style="font-size:14px;font-weight:700;margin-top:4px">Mastery Path — from Sales Master to Imperial Master</div>' +
    '<div class="muted small" style="margin-top:2px">Tap a card to see its approximate bonus in your currency (' + escapeHtml(paisInfo.label) + "). " + escapeHtml(NOTA_MONEDA_APROX) + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">General rules for advancing</div>' + criterios + "</div>" +
    '<div class="card"><div class="row gap-2" style="font-weight:700;font-size:14px">' + Icon("trophy", { size: 15, color: "var(--gold)" }) + " Success Clubs</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Additional recognitions for sustained income, beyond the Mastery rank reached.</p>' +
    clubes + "</div>" +
    '<div class="card">' + notas + "</div>"
  );
}

/* ---------------- Pay Period Planner ---------------- */

/* ---------------- Gran Plan 3 (Big 3-Year Plan) — 3-year projection ---------------- */

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
    clicaAquiBadgeHTML(open, "gold") +
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

/* ---------------- Future-Self Journal ---------------- */

function diarioFuturoSectionHTML(state, ui) {
  const open = !!ui.diarioFuturoOpen;
  const texto = state.diarioFuturo.texto;
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-diario-futuro">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Future-Self Journal</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
    "</button>" +
    (open
      ? '<p class="muted small" style="margin-top:6px;line-height:1.5">' + escapeHtml(DIARIO_FUTURO_INTRO) + "</p>" +
        '<textarea rows="8" placeholder="' + escapeHtml(DIARIO_FUTURO_EJEMPLO) + '" data-field="diarioFuturo.texto" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 12px;font-size:13px;outline:none;resize:vertical;font-family:inherit;line-height:1.5">' + escapeHtml(texto) + "</textarea>"
      : '<p class="muted small" style="margin-top:6px">' + (texto ? "You've already written your letter — tap to view or edit it." : "You haven't written it yet.") + "</p>") +
    "</div>"
  );
}

/* ---------------- Monthly Business Plan ---------------- */

function planComercialMensualHTML(state, ui) {
  const mesKey = ui.mesPlanComercial || mesActualKey();
  const plan = getPlanComercialMensual(state, mesKey);

  const metasHtml = plan.metas.map(function (m, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (m.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-meta-planmensual" data-arg="' + m.id + '"></div>' +
      '<input type="text" placeholder="E.g. Earn 3000 USD a month" value="' + escapeHtml(m.texto) + '" data-field="planComercialMensual.' + mesKey + ".metas." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (m.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
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
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("target", { size: 13, color: "var(--gold)" }) + " Monthly Business Plan</div>" +
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
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Income per pay period</div>' +
    quincenasHtml +
    "</div>"
  );
}

/* ---------------- Monthly Evaluation of the 8 Steps ---------------- */

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
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + " Monthly Evaluation of the 8 Steps</div>" +
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
    '<div class="field" style="margin-top:12px"><label>Points of praise</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.alabanza" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.alabanza) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Points for reflection</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.reflexion" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.reflexion) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Sponsor comments</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.comentarioPatrocinador" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.comentarioPatrocinador) + "</textarea></div>" +
    "</div>"
  );
}

const OCHO_CORE_NOTA_HTML =
  '<div class="card" style="background:var(--accent-soft);border:none">' +
  '<div class="row gap-2" style="font-weight:700;font-size:13px">' + Icon("check-circle", { size: 15, color: "var(--accent)" }) + " Your daily/monthly 8 Core</div>" +
  '<p class="muted small" style="margin-top:6px;line-height:1.55">You already track this daily checklist (Reading, Watching VOD, Meeting attendance, Product use, Showing the plan, Delivery to the customer, Sponsor consultation, Building trust) on your official Atomy page — go to <b>Follow to Success → My Monthly 8 Core</b> and check it off there day by day.</p>' +
  "</div>";

function renderPlaneador(state, ui) {
  const qKey = ui.quincenaKey || quincenaActualKey();
  const q = peekQuincena(state, qKey);
  const dias = Math.max(1, diasRestantesQuincena(qKey));
  const verIzq = sumaLinea(q, "izquierda", true);
  const verDer = sumaLinea(q, "derecha", true);
  const faltIzq = Math.max(0, META_PV_QUINCENA - verIzq);
  const faltDer = Math.max(0, META_PV_QUINCENA - verDer);
  const ritmoIzq = Math.ceil(faltIzq / dias);
  const ritmoDer = Math.ceil(faltDer / dias);
  const desequilibrio = Math.abs(verIzq - verDer);

  let alerta = "";
  if (faltIzq === 0 && faltDer === 0) {
    alerta = '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 You already completed 2,500,000 PV in both legs this pay period!</div>';
  } else if (desequilibrio > META_PV_QUINCENA * 0.4) {
    const adelantada = verIzq > verDer ? "Left" : "Right";
    const atrasada = verIzq > verDer ? "Right" : "Left";
    alerta =
      '<div class="card" style="border-color:var(--warn);background:var(--warn-soft)">' +
      '<div class="row gap-2" style="font-weight:700;color:var(--warn)">' + Icon("triangle-alert", { size: 16, color: "var(--warn)" }) + " Unbalanced legs</div>" +
      '<p class="small" style="margin-top:6px;line-height:1.5">Your ' + adelantada + " leg is way ahead of your " + atrasada + " leg. The extra points in " + adelantada + " won't cycle if " + atrasada + " doesn't reach the same level — activate more orders in " + atrasada + " before the pay period ends.</p>" +
      "</div>";
  }

  function bloqueCalc(nombre, falt, ritmo) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      (falt > 0
        ? '<div class="rl-value">' + falt.toLocaleString("en") + ' <span class="muted small" style="font-weight:400">PV remaining</span></div>' +
          '<div class="rl-sub">Required pace: ' + ritmo.toLocaleString("en") + " PV/day for " + dias + (dias === 1 ? " day" : " days") + "</div>"
        : '<div class="rl-value" style="color:var(--success)">Completed ✓</div>') +
      "</div>"
    );
  }

  return (
    sectionHeaderHTML("Pay Period Planner", "How much is left and at what pace, so you don't miss any cycling.", "target") +
    quincenaNavHTML(qKey) +
    alerta +
    '<div class="resumen-linea">' + bloqueCalc("Left", faltIzq, ritmoIzq) + bloqueCalc("Right", faltDer, ritmoDer) + "</div>" +
    '<button class="btn-secondary" data-action="goto" data-arg="listas">' + Icon("users", { size: 15 }) + " Go to Focus Meeting</button>" +
    granPlanSectionHTML(state, ui) +
    diarioFuturoSectionHTML(state, ui) +
    planComercialMensualHTML(state, ui) +
    evaluacion8PasosHTML(state, ui) +
    OCHO_CORE_NOTA_HTML
  );
}

/* ---------------- Focus Meeting (Left/Right lists) ---------------- */

function pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, appName) {
  const items = catalogo.filter(function (p) { return (Number(compras[p.id]) || 0) > 0; });
  const lineas = items.map(function (p) {
    const cant = Number(compras[p.id]) || 0;
    return "• " + (p.nombre || "(no name)") + " x" + cant + " (" + ((Number(p.pv) || 0) * cant).toLocaleString(paisInfo.locale) + " PV)";
  });
  return (
    "📦 My purchase plan for this pay period (" + appName + "):\n" +
    lineas.join("\n") +
    "\n\nTotal: " + totalPV.toLocaleString(paisInfo.locale) + " PV · " + formatMoneda(totalPrecio, paisInfo) +
    "\n\nCan you help me verify it?"
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

/* ---------------- "Tap here" — reusable badge for toggles and navigation ---------------- */

function clicaAquiBadgeHTML(open, color) {
  const cls = color === "accent" ? "blue" : "gold";
  return (
    '<span class="badge ' + cls + '" style="flex-shrink:0">Tap here' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' +
    Icon("chevron-right", { size: 11, color: color === "accent" ? "var(--accent)" : "#1B1338" }) +
    "</span></span>"
  );
}

/* ---------------- 7×7 Challenge — 10-contact table and weekly evaluation ---------------- */

function contactos10FilaHTML(pathPrefix, i, fila) {
  const inputStyle = "width:100%;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 8px;font-size:12.5px;outline:none";
  return (
    "<tr>" +
    '<td style="padding:4px 6px;font-size:11px;color:var(--text-soft);text-align:center">' + (i + 1) + "</td>" +
    '<td style="padding:4px"><input type="text" placeholder="Name" value="' + escapeHtml(fila.nombre) + '" data-field="' + pathPrefix + "." + i + '.nombre" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" inputmode="tel" placeholder="Phone" value="' + escapeHtml(fila.telefono) + '" data-field="' + pathPrefix + "." + i + '.telefono" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" placeholder="Notes / follow-up" value="' + escapeHtml(fila.observaciones) + '" data-field="' + pathPrefix + "." + i + '.observaciones" style="' + inputStyle + '"></td>' +
    "</tr>"
  );
}

function contactos10TablaHTML(pathPrefix, rows, open, toggleAction, toggleArg) {
  const llenos = rows.filter(function (r) { return (r.nombre || "").trim(); }).length;
  const filas = rows.map(function (r, i) { return contactos10FilaHTML(pathPrefix, i, r); }).join("");
  const thStyle = "text-align:left;font-size:11px;color:var(--text-soft);padding:4px;font-weight:600";
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="' + toggleAction + '"' + (toggleArg != null ? ' data-arg="' + toggleArg + '"' : "") + '>' +
    '<div class="row gap-2">' + Icon("phone-call", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">My first 10 contacts</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + llenos + " of 10 have a name recorded</div>" +
    (open
      ? '<div style="overflow-x:auto;margin-top:10px">' +
        '<table style="border-collapse:collapse;width:100%">' +
        "<thead><tr><th></th><th style=\"" + thStyle + "\">Name</th><th style=\"" + thStyle + "\">Phone</th><th style=\"" + thStyle + "\">Notes</th></tr></thead>" +
        "<tbody>" + filas + "</tbody>" +
        "</table></div>"
      : "") +
    "</div>"
  );
}

function evaluacion7x7ResumenTexto(ev, periodoLabel) {
  return (
    "📊 " + periodoLabel + " — 7×7 Challenge (Cumbre Master):\n" +
    "• People contacted: " + (ev.contactados || "0") + "\n" +
    "• Responded: " + (ev.respondieron || "0") + "\n" +
    "• Presentations given: " + (ev.presentaciones || "0") + "\n" +
    "• Purchases secured: " + (ev.compras || "0") + "\n" +
    "• People interested in the business: " + (ev.interesados || "0") + "\n" +
    "• Who I need to keep following up with: " + (ev.seguimiento || "—") +
    "\n\nCan you help me review it?"
  );
}

function evaluacion7x7PanelHTML(state, pathPrefix, ev, open, toggleAction, toggleArg, periodoLabel) {
  const campo = function (key, label, placeholder) {
    return (
      '<div class="field" style="flex:1;min-width:110px"><label>' + label + "</label>" +
      '<input type="text" inputmode="numeric" placeholder="' + placeholder + '" value="' + escapeHtml(ev[key]) + '" data-field="' + pathPrefix + "." + key + '"></div>'
    );
  };
  const compartir = state.whatsapp && state.whatsapp.trim()
    ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, evaluacion7x7ResumenTexto(ev, periodoLabel)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share with my sponsor</a>"
    : '<p class="muted small" style="margin-top:10px">Add your sponsor\'s WhatsApp in Settings so you can share this.</p>';
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="' + toggleAction + '"' + (toggleArg != null ? ' data-arg="' + toggleArg + '"' : "") + '>' +
    '<div class="row gap-2">' + Icon("target", { size: 15, color: "var(--accent)" }) + '<span style="font-weight:700;font-size:14px">My achievements this week</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Log it every 7 days and share it with your sponsor — this is the ongoing work of growing your business.</p>' +
    (open
      ? '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
        campo("contactados", "People contacted", "0") +
        campo("respondieron", "Responded", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("presentaciones", "Presentations given", "0") +
        campo("compras", "Purchases secured", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("interesados", "People interested in the business", "0") +
        "</div>" +
        '<div class="field" style="margin-top:8px"><label>Who do I need to keep following up with?</label>' +
        '<textarea rows="2" data-field="' + pathPrefix + '.seguimiento">' + escapeHtml(ev.seguimiento) + "</textarea></div>" +
        compartir
      : "") +
    "</div>"
  );
}

/* Converts an official COP amount (RANGOS_MASTER.montos) to the active
   country's currency and formats it with the "approx." prefix — see
   TASAS_COP_POR_MONEDA in data.js for why the conversion is approximate. */
function formatMonedaAprox(montoCOP, paisInfo) {
  const valor = convertirDesdeCOP(montoCOP, paisInfo.moneda);
  return "approx. " + formatMoneda(valor, paisInfo);
}

/* Same as formatMonedaAprox but for a range (e.g. "approx. $X to $Y") — the
   "approx." prefix appears once, not repeated at each end. */
function formatMonedaRangoAprox(copMin, copMax, paisInfo) {
  const min = formatMoneda(convertirDesdeCOP(copMin, paisInfo.moneda), paisInfo);
  const max = formatMoneda(convertirDesdeCOP(copMax, paisInfo.moneda), paisInfo);
  return "approx. " + min + " to " + max;
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

function productoRowHTML(paisId, qKey, compras, p, i, paisInfo) {
  const cantidad = Number(compras[p.id]) || 0;
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<input type="text" placeholder="Product name" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="roster-check' + (p.probado ? " on" : "") + '" style="margin-top:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Mark as tried">' +
    '<div class="box" style="width:22px;height:22px">' + (p.probado ? Icon("check", { size: 12, color: "#1B1338" }) : "") + "</div>" +
    "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Price (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">This pay period</label><input type="number" min="0" value="' + cantidad + '" data-field="quincenas.' + qKey + ".compras." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    "</div></div>"
  );
}

function productosCalculadoraHTML(state, ui, qKey, q) {
  const paisId = state.pais || "CO";
  const paisInfo = paisCatalogoInfo(paisId);
  const compras = q.compras || {};
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
        .map(function (o) { return productoRowHTML(paisId, qKey, compras, o.p, o.i, paisInfo); })
        .join("");
      return '<div style="font-weight:700;font-size:11.5px;color:var(--gold-light);text-transform:uppercase;letter-spacing:.05em;margin-top:14px">' + escapeHtml(cat) + "</div>" + itemsHtml;
    }).join("");
  }

  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-calculadora-productos">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Product Calculator</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Mark which products you\'ve already tried, and how many each person plans to buy this pay period — so you know how much PV it represents and how much you\'ll pay, for your focus meeting.</p>' +
    '<div class="muted small" style="margin-top:10px">Country / catalog</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Planned PV</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Total to pay</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " of " + catalogo.length + " products tried · " + planeados + " planned this pay period</div>" +
    (planeados > 0
      ? (state.whatsapp && state.whatsapp.trim()
          ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, "Cumbre Master")) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share with my sponsor</a>"
          : '<p class="muted small" style="margin-top:10px">Add your sponsor\'s WhatsApp in Settings so you can share your order.</p>')
      : "") +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Add product</button>'
      : "") +
    "</div>"
  );
}

function personaRowHTML(qKey, linea, p) {
  const verificadoClass = p.verificado ? " on" : "";
  const waLink = p.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(p.telefono, p.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card roster-row" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "No name") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + (p.pais ? " · " + escapeHtml(paisCatalogoInfo(p.pais).label) : "") + "</div>" : "") +
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
    '<button class="icon-btn" data-action="edit-persona" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-persona" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (p.notas ? '<div class="muted small" style="margin-top:4px;font-style:italic">“' + escapeHtml(p.notas) + '”</div>' : "") +
    '<div class="rr-inputs">' +
    '<div class="field"><label>PVP</label><input type="number" min="0" step="10000" value="' + (Number(p.pvp) || 0) + '" data-roster-field="pvp" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="field"><label>PVG</label><input type="number" min="0" step="10000" value="' + (Number(p.puntos) || 0) + '" data-roster-field="puntos" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    "</div>" +
    '<div class="field" style="margin-top:8px"><label>Fecha planeada</label><input type="date" value="' + (p.fecha || "") + '" data-roster-field="fecha" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="roster-check' + verificadoClass + '" data-action="toggle-verificado" data-qkey="' + qKey + '" data-linea="' + linea + '" data-arg="' + p.id + '">' +
    '<div class="box">' + (p.verificado ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (p.verificado ? "Verified — already ordered their points" : "Mark as verified") + "</span>" +
    "</div>" +
    "</div>"
  );
}

function resumenEnfoqueTexto(state, qKey) {
  const q = peekQuincena(state, qKey);
  function lineaTexto(nombre, linea) {
    const arr = (q[linea] || []).slice().sort(function (a, b) { return (a.fecha || "9999-99-99").localeCompare(b.fecha || "9999-99-99"); });
    const plan = sumaLinea(q, linea, false);
    const ver = sumaLinea(q, linea, true);
    const otros = Number(linea === "izquierda" ? q.otrosIzquierda : q.otrosDerecha) || 0;
    const personasTxt = arr.length
      ? arr.map(function (p) {
          return "• " + (p.nombre || "(no name)") + ": PVP " + (Number(p.pvp) || 0).toLocaleString("en") + " · PVG " + (Number(p.puntos) || 0).toLocaleString("en") + (p.verificado ? " ✅ verified" : " (not verified)");
        }).join("\n")
      : "  (no people registered)";
    return (
      "*" + nombre + " leg*\n" +
      personasTxt +
      (otros ? "\n• Outside the list (personal consumption/other): " + otros.toLocaleString("en") + " points" : "") +
      "\nVerified: " + ver.toLocaleString("en") + " points · Planned, not yet verified: " + plan.toLocaleString("en") + " points"
    );
  }
  return (
    "🎯 Focus Meeting — Pay period " + quincenaLabel(qKey) + ":\n\n" +
    lineaTexto("Left", "izquierda") + "\n\n" +
    lineaTexto("Right", "derecha") +
    "\n\n" + (q.reunionHecha ? "✅ I've already had my focus meeting with my partners." : "⏳ I haven't had my focus meeting with my partners yet.") +
    "\n\nCan you help me review it to plan my pay period?"
  );
}

/* ---------------- 7×7 Challenge ---------------- */

function renderReto7x7(state, ui) {
  const totalChecks = RETO_7X7_DIAS.reduce(function (sum, d) { return sum + d.checklist.length; }, 0);

  const semanasHtml = [1, 2, 3, 4].map(function (semN) {
    const est = state.reto7x7[semN];
    const doneCount = RETO_7X7_DIAS.reduce(function (sum, d) { return sum + est.dias[d.id].checks.filter(Boolean).length; }, 0);
    const open = !!(ui.reto7x7SemanaOpen && ui.reto7x7SemanaOpen[semN]);
    const contactos10Open = !!(ui.reto7x7Contactos10Open && ui.reto7x7Contactos10Open[semN]);
    const evaluacionOpen = !!(ui.reto7x7EvaluacionOpen && ui.reto7x7EvaluacionOpen[semN]);

    const diasHtml = !open ? "" : RETO_7X7_DIAS.map(function (d) {
      const diaEst = est.dias[d.id];
      const diaKey = semN + "-" + d.id;
      const diaOpen = !!(ui.reto7x7DiaOpen && ui.reto7x7DiaOpen[diaKey]);
      const contenidoHtml = d.contenido.map(function (p) {
        return '<p class="muted small" style="margin-top:6px;line-height:1.5">' + escapeHtml(p) + "</p>";
      }).join("");
      const checklistHtml = d.checklist.map(function (item, i) {
        const on = diaEst.checks[i];
        return (
          '<div class="check-row" style="padding-bottom:2px">' +
          (i < d.checklist.length - 1 ? '<div class="line' + (on ? " on" : "") + '"></div>' : "") +
          '<button class="check-dot' + (on ? " on" : "") + '" data-action="toggle-reto7x7-check" data-week="' + semN + '" data-arg="' + d.id + "|" + i + '">' + (on ? Icon("check", { size: 15, color: "#fff" }) : (i + 1)) + "</button>" +
          '<button class="check-label' + (on ? " on" : "") + '" data-action="toggle-reto7x7-check" data-week="' + semN + '" data-arg="' + d.id + "|" + i + '">' + escapeHtml(item) + "</button>" +
          "</div>"
        );
      }).join("");
      return (
        '<div class="card" style="margin-top:8px">' +
        '<button class="row between" style="width:100%;text-align:left" data-action="toggle-reto7x7-dia" data-week="' + semN + '" data-arg="' + d.id + '">' +
        '<div class="row gap-2">' + Icon(d.icono, { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13.5px">Day ' + d.id + " — " + escapeHtml(d.titulo) + "</span></div>" +
        clicaAquiBadgeHTML(diaOpen, "gold") +
        "</button>" +
        (diaOpen
          ? '<p class="muted small" style="margin-top:6px;font-style:italic">' + escapeHtml(d.frase) + "</p>" +
            contenidoHtml +
            '<div style="margin-top:10px">' + checklistHtml + "</div>"
          : '<div class="muted small" style="margin-top:4px">' + diaEst.checks.filter(Boolean).length + " of " + d.checklist.length + " tasks done</div>") +
        "</div>"
      );
    }).join("");

    return (
      '<div class="card" style="margin-top:12px">' +
      '<button class="row between" style="width:100%;text-align:left" data-action="toggle-reto7x7-semana" data-arg="' + semN + '">' +
      '<div class="row gap-2">' + Icon("flame", { size: 16, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:15px">Week ' + semN + " — 7×7 Challenge</span></div>" +
      clicaAquiBadgeHTML(open, "gold") +
      "</button>" +
      '<div class="muted small" style="margin-top:4px">' + doneCount + " of " + totalChecks + " tasks completed</div>" +
      (open
        ? diasHtml +
          contactos10TablaHTML("reto7x7." + semN + ".contactos10", est.contactos10, contactos10Open, "toggle-reto7x7-contactos10", semN) +
          evaluacion7x7PanelHTML(state, "reto7x7." + semN + ".evaluacion", est.evaluacion, evaluacionOpen, "toggle-reto7x7-evaluacion", semN, "Week " + semN)
        : "") +
      "</div>"
    );
  }).join("");

  return (
    sectionHeaderHTML("7×7 Challenge", RETO_7X7_INTRO, "flame") +
    semanasHtml
  );
}

function renderListas(state, ui) {
  const qKey = ui.quincenaKey || quincenaActualKey();
  const q = peekQuincena(state, qKey);
  const linea = ui.lineaActiva || "izquierda";
  const planIzq = sumaLinea(q, "izquierda", false), verIzq = sumaLinea(q, "izquierda", true);
  const planDer = sumaLinea(q, "derecha", false), verDer = sumaLinea(q, "derecha", true);
  const lista = (q[linea] || []).slice().sort(function (a, b) { return (a.fecha || "9999-99-99").localeCompare(b.fecha || "9999-99-99"); });

  const rows = lista.length
    ? lista.map(function (p) { return personaRowHTML(qKey, linea, p); }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You haven\'t added anyone to this leg yet. Tap “+ Add person” during your planning meeting.</p>';

  return (
    sectionHeaderHTML("Focus Meeting", "Plan with your team how many points each person will order, and on what date of the pay period.", "users") +
    quincenaNavHTML(qKey) +
    '<div class="roster-check' + (q.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qkey="' + qKey + '">' +
    '<div class="box">' + (q.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (q.reunionHecha ? "Focus meeting done this pay period" : "Mark: I had my focus meeting with my partners") + "</span>" +
    "</div>" +
    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, resumenEnfoqueTexto(state, qKey)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share with my sponsor</a>"
      : '<p class="muted small" style="margin-top:10px">Add your sponsor\'s WhatsApp in Settings so you can share your Focus Meeting.</p>') +
    '<div class="tabs">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea" data-arg="izquierda">Left (' + (q.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea" data-arg="derecha">Right (' + (q.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field"><label>Points already confirmed outside the list (personal consumption or other)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? q.otrosIzquierda : q.otrosDerecha) + '" data-field="quincenas.' + qKey + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" data-action="add-persona" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Add person</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>" +
    productosCalculadoraHTML(state, ui, qKey, q)
  );
}

function renderPersonaModal(ui) {
  const d = ui.personaDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-persona" data-linea="' + d.linea + '" data-arg="' + d.id + '">' +
      (ui.confirmDeletePersona === d.id ? "Are you sure? Tap again to delete" : "Delete person") +
      "</button>"
    : "";
  const paisInfo = paisCatalogoInfo(d.pais);
  const paisChips =
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:6px">' +
    PAISES_CATALOGO.map(function (p) {
      const active = (d.pais || "CO") === p.id;
      return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="set-persona-draft-pais" data-arg="' + p.id + '">' + escapeHtml(p.label) + "</button>";
    }).join("") +
    "</div>";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-persona"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit person" : "New person — " + (d.linea === "izquierda" ? "Left" : "Right") + " leg") + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="field"><label>Country</label>' + paisChips + "</div>" +
    '<div class="field"><label>Phone (optional)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="' + escapeHtml(paisInfo.codigo) + ' 300 000 0000"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Password</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">The password is optional and only so the team can enter points for this partner if needed — no one is required to share it.</p>' +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="notas" placeholder="Notes...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- Weekly Agenda ---------------- */

function agendaTipoInfo(tipoId) {
  return AGENDA_TIPOS.find(function (t) { return t.id === tipoId; }) || AGENDA_TIPOS[0];
}

function agendaFechaLabel(fecha) {
  try {
    return new Date(fecha + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" });
  } catch (e) {
    return fecha;
  }
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

function zoomRowHTML(dia, z) {
  const puntual = !!z.fecha;
  return (
    '<div class="card" style="padding:12px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div class="row gap-2" style="min-width:0">' + Icon("video", { size: 14, color: "var(--gold-light)" }) +
    '<div style="min-width:0"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(z.titulo || "Untitled meeting") + "</div>" +
    '<div class="row gap-2" style="margin-top:2px;flex-wrap:wrap">' +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " Only " + escapeHtml(agendaFechaLabel(z.fecha)) + "</span>" : '<span class="badge dark">Every week</span>') +
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
      : '<div class="muted small" style="margin-top:8px">No link saved yet — tap it to add one.</div>') +
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
    sectionHeaderHTML("Weekly Agenda", "Your leader routine, day by day — calls, meetings with affiliates, consulting, trainings, and leaders meetings, plus your Zooms.", "calendar") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + tabs + "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Activities — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-actividad" data-arg="' + diaActivo + '">+ Add</button></div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + actividadesHtml + "</div>" +
    "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Zoom — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-zoom" data-arg="' + diaActivo + '">+ Add</button></div>' +
    '<div class="muted small" style="margin-top:2px">Save your recurring Zooms here (the same link every week), or a one-time one as soon as you get the invite — for example, if you\'re told today about a Zoom for tomorrow, add it right here with its date, time, and link.</div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + zoomsHtml + "</div>" +
    "</div>"
  );
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
    '<button class="check-label' + (on ? " on" : "") + '" style="padding:0;flex:1;text-align:left" data-action="' + toggleAction + '">Notify me with a notification</button>' +
    "</div>" +
    (on
      ? '<select data-draft-field="recordarMin" style="width:100%;margin-top:8px;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:9px 12px;font-size:13.5px;outline:none">' + minOpts + "</select>" +
        '<p class="muted small" style="margin-top:4px">This only notifies you while you have Cumbre Master open in the browser or installed, with notifications enabled in Settings.</p>'
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
    '<div class="field"><label>Date (optional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Leave it empty if it repeats every week on this day. Set a date if it\'s a one-off — for example, a one-time task.</p></div>' +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Register your sponsor</span>' +
    '<button class="icon-btn" data-action="cancelar-patrocinador-fab">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">You haven\'t saved their WhatsApp yet. Register it once and this button will open their chat directly every time you tap it.</p>' +
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
    '<div class="field"><label>Date (optional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Leave it empty if it\'s your every-week Zoom. Set a date if it\'s a one-off meeting — for example, one you were just invited to for tomorrow.</p></div>' +
    '<div class="field"><label>Connection link</label><input type="text" inputmode="url" data-draft-field="enlace" value="' + escapeHtml(d.enlace || "") + '" placeholder="https://zoom.us/j/..."></div>' +
    recordatorioFieldHTML(d, "toggle-zoom-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-zoom">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-zoom">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- Weekly Report ---------------- */

const REGISTRO_TIPOS = [
  { id: "llamadas", label: "Calls", icon: "phone-call" },
  { id: "mensajes", label: "Invitation messages", icon: "message-circle" },
  { id: "presentaciones", label: "Presentations (Show the Plan)", icon: "book-open" },
  { id: "reuniones", label: "Meetings / consultations", icon: "users" },
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

function informeSemanalTextoPersonal(semana, idioma) {
  const t = informeI18n(idioma);
  return (
    t.tituloPersonal + "\n" +
    "• " + t.llamadas + ": " + semana.llamadas + "\n" +
    "• " + t.mensajes + ": " + semana.mensajes + "\n" +
    "• " + t.presentaciones + ": " + semana.presentaciones + "\n" +
    "• " + t.reuniones + ": " + semana.reuniones +
    "\n\n" + t.cierrePersonal
  );
}

function informeSemanalTextoEquipo(equipo, idioma) {
  const t = informeI18n(idioma);
  return (
    t.tituloEquipo + "\n" +
    "• " + t.personasRed + ": " + equipo.total + "\n" +
    "• " + t.verificados + ": " + equipo.verificados + "\n" +
    "• " + t.pendientes + ": " + equipo.pendientes + "\n" +
    "• " + t.pvPlaneado + ": " + equipo.pvPlaneado.toLocaleString("en") + " · " + t.pvVerificado + ": " + equipo.pvVerificado.toLocaleString("en") +
    "\n\n" + t.cierreEquipo
  );
}

function idiomaInformeSelectorHTML(state) {
  return (
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("compass", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13px">Language of the message to share</span></div>' +
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

  const contadores = REGISTRO_TIPOS.map(function (t) { return contadorAccionHTML(t.id, t.label, t.icon, hoyReg[t.id] || 0); }).join("");

  const resumenSemana =
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px">This week (last 7 days)</div>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_TIPOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (semana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const idioma = state.idiomaInforme || "en";
  const totalAcciones = semana.llamadas + semana.mensajes + semana.presentaciones + semana.reuniones;
  const compartirPersonal = totalAcciones > 0
    ? (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-primary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoPersonal(semana, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 16, color: "#fff" }) + " Share my report with my sponsor</a>"
        : '<p class="muted small" style="margin-top:10px">Add your WhatsApp in Settings so you can share your report.</p>')
    : '<p class="muted small" style="margin-top:10px">Log at least one action this week so you can share your report.</p>';
  const idiomaSelector = totalAcciones > 0 ? idiomaInformeSelectorHTML(state) : "";

  const qKey = quincenaActualKey();
  const q = peekQuincena(state, qKey);
  const personas = (q.izquierda || []).concat(q.derecha || []);
  const equipo = {
    total: personas.length,
    verificados: personas.filter(function (p) { return p.verificado; }).length,
    pendientes: personas.filter(function (p) { return !p.verificado; }).length,
    pvPlaneado: sumaLinea(q, "izquierda", false) + sumaLinea(q, "derecha", false),
    pvVerificado: sumaLinea(q, "izquierda", true) + sumaLinea(q, "derecha", true),
  };
  const equipoHtml =
    '<div class="card" style="margin-top:16px;border-color:var(--gold)">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Report on my partners</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">The status of your network this pay period — to coach them, and to share with your own sponsor.</p>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">People in my network</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.total + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Verified</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.verificados + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Pending verification</div><div style="font-size:18px;font-weight:700;color:' + (equipo.pendientes > 0 ? "var(--warn)" : "var(--gold-light)") + '">' + equipo.pendientes + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Verified PV</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.pvVerificado.toLocaleString("en") + "</div></div>" +
    "</div>" +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:12px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoEquipo(equipo, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Share my team's report</a>"
      : "") +
    "</div>";

  return (
    sectionHeaderHTML("Weekly Report", "Log your actions day by day, and share your progress with your own sponsor — that's how they help you grow.", "trending-up") +
    '<div><div style="font-weight:700;font-size:14px;margin-bottom:8px">Today</div>' +
    '<div class="view-stack gap-sm">' + contadores + "</div></div>" +
    resumenSemana +
    idiomaSelector +
    compartirPersonal +
    equipoHtml
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
    : '<p class="muted small" style="text-align:center;padding:20px 0">You haven\'t added anyone from your upline yet.</p>';

  return (
    sectionHeaderHTML("My Genealogy Tree", "Your ID, your sponsor, and your upline, always at hand.", "crown") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("user-badge", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Me</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">This way your team\'s leaders and affiliates can look up your ID and password without having to ask you every time.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Atomy ID</label><input type="text" data-field="arbolGenealogico.yo.atomyId" value="' + escapeHtml(yo.atomyId) + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field"><label>Password</label><input type="text" data-field="arbolGenealogico.yo.contrasena" value="' + escapeHtml(yo.contrasena) + '" placeholder="Your Atomy password"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row between"><div class="row gap-2">' + Icon("crown", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Sponsor</span></div>' + waPatrocinador + "</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Their contact and Zoom details — for asking them for help or signing up for company trainings, which usually ask for your sponsor\'s ID.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Name</label><input type="text" data-field="arbolGenealogico.patrocinador.nombre" value="' + escapeHtml(p.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy ID</label><input type="text" data-field="arbolGenealogico.patrocinador.atomyId" value="' + escapeHtml(p.atomyId) + '" placeholder="E.g. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Rank</label><input type="text" data-field="arbolGenealogico.patrocinador.rango" value="' + escapeHtml(p.rango) + '" placeholder="E.g. Diamond Master"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-field="arbolGenealogico.patrocinador.pais" value="' + escapeHtml(p.pais) + '" placeholder="E.g. Colombia"></div>' +
    '<div class="field" style="flex:1"><label>Phone</label><input type="text" inputmode="tel" data-field="arbolGenealogico.patrocinador.telefono" value="' + escapeHtml(p.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Zoom ID</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomId" value="' + escapeHtml(p.zoomId) + '" placeholder="Optional"></div>' +
    '<div class="field" style="flex:1"><label>Zoom password</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomContrasena" value="' + escapeHtml(p.zoomContrasena) + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="field"><label>Times not to call</label><input type="text" data-field="arbolGenealogico.patrocinador.horarioNoLlamar" value="' + escapeHtml(p.horarioNoLlamar) + '" placeholder="E.g. After 8pm, or Sundays"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Upline</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">The people above your direct sponsor — useful if you need their support, or their ID for some training.</p>' +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit person" : "New person in the upline") + "</span>" +
    '<button class="icon-btn" data-action="cancel-ascendente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Rank</label><input type="text" data-draft-field="rango" value="' + escapeHtml(d.rango) + '" placeholder="E.g. Diamond Master"></div>' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="E.g. Colombia"></div>' +
    "</div>" +
    '<div class="field"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field"><label>Times not to disturb</label><input type="text" data-draft-field="horarioNoMolestar" value="' + escapeHtml(d.horarioNoMolestar) + '" placeholder="E.g. After 9pm"></div>' +
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
    sectionHeaderHTML("S.O.S. Calls", "People you can call for support, even if they're not in your own line.", "bell") +
    '<div class="card"><p class="small" style="line-height:1.6">Sometimes the help you need doesn\'t come from your direct genealogy — it could be a mentor from another team, a company trainer, or someone trusted who\'s an expert on some topic. Save here who to call in those moments.</p></div>' +
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
    '<div class="field"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="nota" placeholder="Why go to this person?">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-sos">Save</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-sos">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- Contacts List ---------------- */

function contactoEventoNivelBadge(nivel) {
  const cls = nivel === "Hot" ? "warn" : nivel === "Warm" ? "gold" : "soft";
  return '<span class="badge ' + cls + '">' + escapeHtml(nivel) + "</span>";
}

function contactoEventoRowHTML(c, hoy) {
  const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
  const esHoy = c.proximoSeguimiento === hoy;
  const fechaTxt = c.proximoSeguimiento ? (vencido ? "Overdue · " : esHoy ? "Today · " : "") + c.proximoSeguimiento : "No follow-up set";
  const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card contact-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "No name") + "</div>" +
    '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "No phone") + (c.pais ? " · " + escapeHtml(c.pais) : "") + "</div></div>" +
    contactoEventoNivelBadge(c.nivel) +
    "</div>" +
    '<div class="row between" style="margin-top:10px;align-items:center">' +
    '<span class="small" style="font-weight:600' + ((c.estado === "Partner" || c.estado === "Consumer") ? ";color:var(--gold-light)" : "") + '">' + escapeHtml(c.estado) + "</span>" +
    '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
    "</div>" +
    (c.observaciones ? '<div class="muted small" style="margin-top:4px;font-style:italic">“' + escapeHtml(c.observaciones) + '”</div>' : "") +
    (c.notaSeguimiento ? '<div class="muted small" style="margin-top:4px;font-style:italic">“' + escapeHtml(c.notaSeguimiento) + '”</div>' : "") +
    (c.proximoSeguimiento
      ? '<div class="row gap-2" style="margin-top:6px;align-items:center;cursor:pointer" data-action="marcar-seguimiento-contacto-hecho" data-arg="' + c.id + '">' +
        Icon("check-circle", { size: 13, color: "var(--success)" }) +
        '<span class="small" style="color:var(--success);font-weight:600">Mark follow-up done</span></div>'
      : "") +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="3">+3 days</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="7">+1 wk</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="30">+1 mo</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="60">+2 mo</button>' +
    waLink +
    '<button class="icon-btn" data-action="edit-contacto-evento" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto-evento" data-arg="' + c.id + '" data-tipo="llamada">' + Icon("phone-call", { size: 13 }) + " Call</button>" +
    '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto-evento" data-arg="' + c.id + '" data-tipo="mensaje">' + Icon("message-circle", { size: 13 }) + " Message</button>" +
    "</div>" +
    "</div>"
  );
}

function renderContactosEventos(state, ui) {
  const lista = state.contactosEventos || [];
  const filtro = ui.contactoEventoFiltro || "todos";
  const hoy = hoyISO();

  const counts = { Hot: 0, Warm: 0, Cold: 0 };
  lista.forEach(function (c) { if (counts[c.nivel] != null) counts[c.nivel]++; });

  const filterBtns = ["todos"].concat(CONTACTO_NIVELES).map(function (f) {
    const active = filtro === f;
    const label = f === "todos" ? "All · " + lista.length : f + " · " + counts[f];
    return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="filter-contactos-evento" data-arg="' + f + '">' + label + "</button>";
  }).join(" ");

  const filtered = filtro === "todos" ? lista : lista.filter(function (c) { return c.nivel === filtro; });
  const sorted = filtered.slice().sort(function (a, b) {
    if (filtro === "todos") {
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
        if (filtro === "todos" && c.nivel !== lastNivel) {
          lastNivel = c.nivel;
          nivelHeader = '<div class="row gap-2" style="margin-top:16px;margin-bottom:2px;color:var(--gold);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(c.nivel) + " · " + (counts[c.nivel] || 0) + "</div>";
        }
        return nivelHeader + contactoEventoRowHTML(c, hoy);
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">You don\'t have any contacts registered yet. Tap “Add contact” to start tracking your contacts.</p>';

  return (
    sectionHeaderHTML("Contacts List", lista.length + " registered — keep reaching out, rate their interest level, and stay on top of every follow-up.", "users") +
    '<p class="muted small" style="margin-top:-4px">Tap “Call” or “Message” on each contact to log it in your Weekly Report.</p>' +
    '<input id="contacto-evento-search" type="text" placeholder="Search by name or phone..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<button class="btn-primary" data-action="add-contacto-evento">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Add contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderContactoEventoModal(ui) {
  const d = ui.contactoEventoDraft;
  if (!d) return "";
  const editing = !!d.id;
  const nivelOpts = CONTACTO_NIVELES.map(function (n) { return '<option value="' + n + '"' + (d.nivel === n ? " selected" : "") + ">" + n + "</option>"; }).join("");
  const estadoOpts = CONTACTO_ESTADOS.map(function (s) { return '<option value="' + s + '"' + (d.estado === s ? " selected" : "") + ">" + s + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contacto-evento" data-arg="' + d.id + '">' +
      (ui.confirmDeleteContactoEvento === d.id ? "Are you sure? Tap again to delete" : "Delete contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto-evento"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Edit contact" : "New contact") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto-evento">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Full name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Phone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field" style="flex:1"><label>Country</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="E.g. Colombia"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Level</label><select data-draft-field="nivel" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + nivelOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Status</label><select data-draft-field="estado" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="observaciones" placeholder="Where you met them, interests...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    '<div class="field"><label>Next follow-up</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="3">+3 days</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="7">+1 week</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="30">+1 month</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="60">+2 months</button>' +
    "</div>" +
    '<div class="field"><label>Follow-up note</label><input type="text" data-draft-field="notaSeguimiento" value="' + escapeHtml(d.notaSeguimiento || "") + '" placeholder="E.g. Call to ask about their decision"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto-evento">Save contact</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto-evento">Cancel</button>' +
    "</div></div>"
  );
}

/* ---------------- My Rank ---------------- */

function renderPerfil(state, ui) {
  const rango = RANGOS_MASTER[state.rangoActualIndex];
  const botones = RANGOS_MASTER.map(function (r, i) {
    const estado = i < state.rangoActualIndex ? "pasado" : i === state.rangoActualIndex ? "actual" : "pendiente";
    const conseguido = estado !== "pendiente";
    const passFlag = estado === "pasado" ? '<div style="position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-radius:999px;background:var(--success);border:2px solid var(--card);display:flex;align-items:center;justify-content:center">' + Icon("check", { size: 10, color: "#fff" }) + "</div>" : "";
    return (
      '<button style="display:flex;flex-direction:column;align-items:center;gap:6px;opacity:' + (conseguido ? 1 : 0.45) + '" data-action="set-rango-master" data-arg="' + i + '">' +
      '<div style="position:relative">' + medallionHTML(r.icon, 56) + passFlag + "</div>" +
      '<span style="font-size:11px;font-weight:600;text-align:center;line-height:1.2;color:' + (estado === "actual" ? "var(--gold-light)" : "var(--text)") + '">' + escapeHtml(r.nombre) + "</span>" +
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
    '<div class="card" style="text-align:center;border:2px solid var(--gold)">' +
    medallionHTML(rango.icon, 84) +
    '<div class="muted small" style="margin-top:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;color:var(--gold)">Your current rank</div>' +
    '<div style="font-size:20px;font-weight:700;margin-top:4px">' + escapeHtml(rango.nombre) + "</div>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Mastery Path</div>' +
    '<div class="muted small" style="margin-bottom:12px">Tap the next rank when you reach it.</div>' +
    '<div class="grid-3">' + botones + "</div>" +
    "</div>" +
    detalleRangoHTML(state, ui) +
    actividad
  );
}

/* ---------------- My Rank: detail, goal, and recognition card ---------------- */

function detalleRangoHTML(state, ui) {
  const detalleIndex = ui.rangoDetalleIndex != null ? ui.rangoDetalleIndex : state.rangoActualIndex;
  const detalle = RANGOS_MASTER[detalleIndex] || RANGOS_MASTER[0];
  const paisInfo = paisCatalogoInfo(state.pais || "CO");
  const meta = getMetaRango(state, detalleIndex);
  const dias = meta.fecha ? diasHasta(meta.fecha) : null;
  const abierto = !!ui.detalleRangoAbierto;

  if (!abierto) {
    return (
      '<button class="card row between" style="width:100%;text-align:left" data-action="toggle-detalle-rango">' +
      '<div class="row gap-2">' + Icon("sparkles", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Detail, goal, and recognition card</span></div>' +
      clicaAquiBadgeHTML(false, "gold") +
      "</button>"
    );
  }

  const chipsDetalle = RANGOS_MASTER.map(function (r, i) {
    const active = i === detalleIndex;
    return '<div class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="seleccionar-detalle-rango" data-arg="' + i + '">' + escapeHtml(r.nombre) + "</div>";
  }).join("");

  const montosHtml = detalle.montos.map(function (m) {
    return (
      '<div class="row between" style="padding:7px 0;border-top:1px solid var(--border-soft)">' +
      '<span class="small">' + escapeHtml(m.etiqueta) + "</span>" +
      '<span style="font-weight:700;color:var(--gold-light);font-size:14px">' + escapeHtml(formatMonedaAprox(m.cop, paisInfo)) + "</span>" +
      "</div>"
    );
  }).join("");

  let metaTexto = "";
  if (meta.fecha && dias != null) {
    if (dias > 0) metaTexto = dias + (dias === 1 ? " day" : " days") + " left until your goal of reaching " + detalle.nombre + ".";
    else if (dias === 0) metaTexto = "Your goal of reaching " + detalle.nombre + " is today!";
    else metaTexto = "Your goal of reaching " + detalle.nombre + " passed " + Math.abs(dias) + (Math.abs(dias) === 1 ? " day" : " days") + " ago — update it if you want to keep using it as a reminder.";
  }

  const fotoInner = state.foto ? '<img src="' + escapeHtml(state.foto) + '" alt="Your photo"/>' : Icon("camera", { size: 26 });

  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-detalle-rango">' +
    '<div class="row gap-2">' + Icon("sparkles", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Detail, goal, and recognition card</span></div>' +
    clicaAquiBadgeHTML(true, "gold") +
    "</button>" +

    '<div class="muted small" style="margin-top:10px">Choose the rank you want to view:</div>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:6px">' + chipsDetalle + "</div>" +

    '<div style="text-align:center;margin-top:16px">' + medallionHTML(detalle.icon, 60) +
    '<div style="font-size:16px;font-weight:700;margin-top:8px">' + escapeHtml(detalle.nombre) + "</div>" +
    '<div class="muted small">Rank ' + (detalleIndex + 1) + " of " + RANGOS_MASTER.length + "</div></div>" +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">To reach this rank</div>' +
    '<p class="small" style="line-height:1.5;margin-top:4px">' + escapeHtml(detalle.prerrequisito) + "</p>" +
    '<p class="muted small" style="line-height:1.5;margin-top:4px">' + escapeHtml(detalle.criterio) + "</p>" +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">What you earn when you reach it</div>' +
    '<div class="muted small" style="margin-top:2px">In ' + escapeHtml(paisInfo.label) + " · " + escapeHtml(NOTA_MONEDA_APROX) + "</div>" +
    montosHtml +
    paisSelectorHTML(state) +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Your goal for this rank</div>' +
    '<div class="field" style="margin-top:6px"><label>Date by which you want to reach it</label>' +
    '<input type="date" value="' + escapeHtml(meta.fecha || "") + '" data-field="metasRango.' + detalleIndex + '.fecha"></div>' +
    (metaTexto ? '<p class="small" style="margin-top:8px;font-weight:600;color:' + (dias != null && dias < 0 ? "var(--warn)" : "var(--gold-light)") + '">' + escapeHtml(metaTexto) + "</p>" : "") +
    (meta.fecha ? '<button class="link-btn small" style="margin-top:6px" data-action="limpiar-meta-rango" data-arg="' + detalleIndex + '">Remove this goal</button>' : "") +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:18px">Recognition card</div>' +
    '<div class="muted small" style="margin-top:2px">Upload your photo and download your ' + escapeHtml(detalle.nombre) + " card to share it.</div>" +
    '<div style="display:flex;flex-direction:column;align-items:center;margin-top:12px">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="rango-foto-input">' + fotoInner + "</button>" +
    '<input id="rango-foto-input" type="file" accept="image/*" class="hidden" data-target="foto">' +
    '<span class="link-btn small" style="margin-top:6px">' + (state.foto ? "Change photo" : "Add photo") + "</span>" +
    "</div>" +
    '<div style="max-width:280px;margin:14px auto 0">' + rangoCardHTML(state.nombre, state.foto, detalleIndex) + "</div>" +
    '<div class="row gap-2" style="margin-top:14px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-tarjeta-rango" data-arg="' + detalleIndex + '">' + Icon("share2", { size: 15 }) + " Share card</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="compartir-historia-rango" data-arg="' + detalleIndex + '">' + Icon("sparkles", { size: 15, color: "#fff" }) + " Share as a story</button>" +
    "</div>" +
    '<p class="muted small" style="margin-top:8px;line-height:1.5">"Share as a story" generates a festive vertical image, ready for Instagram/Facebook/WhatsApp Stories — once there, those apps let you add music, stickers, or text before posting.</p>' +
    "</div>"
  );
}

/* ---------------- Settings ---------------- */

function renderAjustes(state, ui) {
  const resetLabel = ui.confirmReset ? "Are you sure? Tap again to reset" : "Reset my progress";
  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">License for this copy</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">This copy of Cumbre Master is licensed exclusively for <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> and their own team. It is not authorized to be shared with other leaders or teams.</p>' +
      "</div>"
    : "";
  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Browser notifications</div><div class="muted small" style="margin-top:2px">Alerts from your Weekly Agenda and PV pace</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  return (
    sectionHeaderHTML("Settings", "", "settings") +
    licenciaCard +
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Your sponsor\'s WhatsApp</label>' +
    '<p class="muted small" style="margin-top:-2px;margin-bottom:8px;line-height:1.5">The floating green button messages this number directly.</p>' +
    '<input type="text" inputmode="numeric" placeholder="E.g. 573000000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>' +
    notifRow +
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("download", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Backup</span></div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">All your data (Focus Meeting, Genealogy Tree, your progress) lives only on this device. Download a backup and save it wherever you want (your Google Drive, email, etc.) — that way you won\'t lose it if you switch phones or clear your browser data.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-respaldo">' + Icon("download", { size: 15 }) + " Download backup</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="importar-respaldo-input">' + Icon("repeat", { size: 15 }) + " Restore from file</button>" +
    "</div>" +
    '<input id="importar-respaldo-input" type="file" accept="application/json,.json" class="hidden" data-target="__importBackup">' +
    "</div>" +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}
