/* ---------------------------------------------------------------
   VISTAS — Cumbre Master: cada función devuelve un string HTML
   para #view-container (o para las regiones fijas: header, menú, modales)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Inicio", icon: "home" },
  { id: "plan", label: "Plan de Compensación", icon: "book-open" },
  { id: "planeador", label: "Planeador de Quincena", icon: "target" },
  { id: "listas", label: "Listas 200+200", icon: "users" },
  { id: "perfil", label: "Mi Rango", icon: "user-badge" },
  { id: "ajustes", label: "Ajustes", icon: "settings" },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

/* ---------------- Bienvenida / Onboarding ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen">' +
    Icon("gem", { size: 64, color: "var(--gold)" }) +
    '<h1 style="margin-top:22px;font-size:28px;font-weight:700;letter-spacing:-.02em">Cumbre Master</h1>' +
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">De Sales Master a Imperial Master</p>' +
    '<p class="muted" style="margin-top:22px;max-width:300px;font-size:15px;line-height:1.6">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Comenzar ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    (LICENCIA_TITULAR ? '<p class="muted small" style="margin-top:26px;opacity:.6">Copia con licencia exclusiva para ' + escapeHtml(LICENCIA_TITULAR) + "</p>" : "") +
    "</div>"
  );
}

function renderOnboarding(ui) {
  const foto = ui.onboardingFoto;
  const avatarInner = foto ? '<img src="' + foto + '" alt="Tu foto"/>' : Icon("camera", { size: 26 });
  return (
    '<div class="center-screen" style="justify-content:center">' +
    '<div style="display:flex;flex-direction:column;align-items:center">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="onboarding-file">' + avatarInner + "</button>" +
    '<input id="onboarding-file" type="file" accept="image/*" class="hidden" data-target="__onboardingFoto">' +
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Cambiar foto" : "Añadir foto (opcional)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">¿Cómo te llamas?</h2>' +
    '<p class="muted small" style="margin-top:4px">Así personalizamos tu panel de líder.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Tu nombre" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Empezar ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    "</div>"
  );
}

/* ---------------- Header / Menú ---------------- */

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
  return (
    '<div class="sidebar">' +
    '<div class="sidebar-logo">' + Icon("gem", { size: 22, color: "var(--gold)" }) + "</div>" +
    items +
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
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><div class="row gap-2">' + Icon("gem", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">CUMBRE MASTER</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Licencia exclusiva: ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
    "</div></div>"
  );
}

/* ---------------- recordatorios / campana ---------------- */

function getReminders(state) {
  const out = [];
  const key = quincenaActualKey();
  const q = state.quincenas[key];
  if (!q) return out;
  const dias = diasRestantesQuincena(key);
  if (dias <= 0) return out;
  [["izquierda", "Izquierda"], ["derecha", "Derecha"]].forEach(function (par) {
    const verificado = sumaLinea(q, par[0], true);
    const faltante = Math.max(0, META_PV_QUINCENA - verificado);
    if (faltante > 0) {
      const ritmo = Math.ceil(faltante / dias);
      out.push({ text: "Pierna " + par[1] + ": faltan " + faltante.toLocaleString("es") + " PV verificados. Ritmo necesario: " + ritmo.toLocaleString("es") + " PV/día." });
    }
  });
  return out;
}

function renderBellPanel(state) {
  const reminders = getReminders(state);
  const body = reminders.length
    ? reminders.map(function (r) {
        return (
          '<div class="row gap-2" style="align-items:flex-start;text-align:left;padding:10px 0;border-top:1px solid var(--border)">' +
          Icon("bell", { size: 15, color: "var(--accent)" }) +
          '<span class="small" style="color:var(--text);flex:1">' + escapeHtml(r.text) + "</span>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="margin-top:8px">Vas al día — no tienes alertas de ritmo pendientes.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Alertas de esta quincena</span>' +
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
    '<div class="logro-modal-eyebrow">¡Nuevo rango alcanzado!</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Compártelo con tu equipo — el ejemplo duplica más que cualquier discurso 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">Genial, seguir</button>' +
    "</div></div>"
  );
}

/* ---------------- Inicio ---------------- */

function quincenaNavHTML(qKey) {
  const actual = esQuincenaActual(qKey);
  return (
    '<div class="quincena-nav">' +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="-1">' + Icon("chevron-left", { size: 18 }) + "</button>" +
    '<div class="qn-label">' + escapeHtml(quincenaLabel(qKey)) + (actual ? ' <span class="badge gold" style="margin-left:6px">Actual</span>' : "") + "</div>" +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="1">' + Icon("chevron-right", { size: 18 }) + "</button>" +
    "</div>" +
    (actual ? '<div class="muted small" style="text-align:center;margin-top:-4px">' + diasRestantesQuincena(qKey) + " días restantes en esta quincena</div>" : "")
  );
}

function resumenLineasHTML(planIzq, verIzq, planDer, verDer) {
  const pctIzq = Math.min(100, Math.round((verIzq / META_PV_QUINCENA) * 100));
  const pctDer = Math.min(100, Math.round((verDer / META_PV_QUINCENA) * 100));
  function bloque(nombre, plan, ver, pct) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      '<div class="rl-value">' + ver.toLocaleString("es") + ' <span class="muted small" style="font-weight:400">/ ' + META_PV_QUINCENA.toLocaleString("es") + " PV</span></div>" +
      '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 3) + '%"></div></div>' +
      '<div class="rl-sub">Verificado ' + pct + "% · Planificado sin verificar: " + plan.toLocaleString("es") + " PV</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Izquierda", planIzq, verIzq, pctIzq) + bloque("Derecha", planDer, verDer, pctDer) + "</div>";
}

function renderHome(state, ui) {
  const rango = RANGOS_MASTER[state.rangoActualIndex];
  const siguiente = RANGOS_MASTER[state.rangoActualIndex + 1];
  const key = quincenaActualKey();
  const q = peekQuincena(state, key);
  const planIzq = sumaLinea(q, "izquierda", false), verIzq = sumaLinea(q, "izquierda", true);
  const planDer = sumaLinea(q, "derecha", false), verDer = sumaLinea(q, "derecha", true);
  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Tu foto"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(rango.nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Hola, ' + escapeHtml(state.nombre || "líder") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Tu quincena actual</div>' +
    '<div class="muted small" style="margin-top:4px">' + escapeHtml(quincenaLabel(key)) + " · " + diasRestantesQuincena(key) + " días restantes</div>" +
    "</div>" +

    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +

    (siguiente
      ? '<div class="card"><div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Tu siguiente meta</span></div>' +
        '<div style="font-size:15px;font-weight:700;margin-top:6px">' + escapeHtml(siguiente.nombre) + "</div>" +
        '<div class="muted small" style="margin-top:2px;line-height:1.5">' + escapeHtml(siguiente.prerrequisito) + "</div>" +
        "</div>"
      : '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 ¡Ya alcanzaste Imperial Master, el rango más alto del plan!</div>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="planeador">' + medallionHTML("target", 44) + '<div class="nc-body"><div class="nc-title">Planeador de Quincena</div><div class="nc-desc">Cuánto falta y a qué ritmo</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="listas">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Listas 200+200</div><div class="nc-desc">Planea con tu equipo, línea por línea</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan">' + medallionHTML("book-open", 44) + '<div class="nc-body"><div class="nc-title">Plan de Compensación</div><div class="nc-desc">Cómo funciona, explicado simple</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>"
  );
}

/* ---------------- Plan de Compensación (teoría) ---------------- */

function renderPlanCompensacion(ui) {
  const vueltos = ui.rangosVueltos || {};

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
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">' + (r.n === 0 ? "Rango logrado" : "Rango " + (r.n + 1)) + "</div>" +
      '<div style="font-size:16px;font-weight:700;margin-top:2px">' + escapeHtml(r.nombre) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Toca para ver los detalles</span></div>' +
      "</div>";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + escapeHtml(r.nombre) + "</div>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Prerrequisito</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.prerrequisito) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Comisión de Maestría</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.comisionMaestria) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Bono al ascender</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.promocion) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Para ascender</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.criterio) + "</p>" +
      "</div>";
    return (
      '<button class="flip-card' + (flipped ? " is-open" : "") + '" data-action="flip-rango" data-arg="' + r.n + '">' +
      '<div class="flip-inner' + (flipped ? " flipped" : "") + '">' + front + back + "</div>" +
      "</button>"
    );
  }).join("");

  const criterios = "<ul style=\"margin:0;padding-left:18px\">" + CRITERIOS_GENERALES.map(function (c) { return '<li class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(c) + "</li>"; }).join("") + "</ul>";
  const notas = NOTAS_VALORES.map(function (n) { return '<p class="muted small" style="line-height:1.5;margin-top:6px">' + escapeHtml(n) + "</p>"; }).join("");
  const clubes = CLUBES_EXITO.map(function (c) {
    return (
      '<div class="row gap-3" style="padding:9px 0;border-top:1px solid var(--border-soft)">' +
      Icon("award", { size: 16, color: "var(--gold-light)" }) +
      '<div style="flex:1"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(c.nombre) + "</div>" +
      '<div class="muted small" style="margin-top:2px;line-height:1.4">' + escapeHtml(c.requisito) + (c.nota ? " " + escapeHtml(c.nota) : "") + "</div></div>" +
      "</div>"
    );
  }).join("");

  return (
    sectionHeaderHTML("Plan de Compensación", "Cómo se reparten las comisiones, y el camino de Sales Master a Imperial Master.", "book-open") +
    '<div class="card">' +
    '<p class="small" style="line-height:1.6">' + escapeHtml(DISTRIBUCION.intro) + "</p>" +
    partes +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(DISTRIBUCION.notaPeriodo) + "</p>" +
    "</div>" +
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px;margin-bottom:8px">Comisión General (44%)</div>' +
    '<div class="table-simple"><table><thead><tr><th>Nivel</th><th>Puntos</th><th>Condición de miembro</th><th>Pierna débil</th></tr></thead><tbody>' + filasTabla + "</tbody></table></div>" +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(COMISION_GENERAL_NOTA) + "</p>" +
    "</div>" +
    '<div style="font-size:14px;font-weight:700;margin-top:4px">Camino de Maestría — de Sales Master a Imperial Master</div>' +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">Reglas generales de ascenso</div>' + criterios + "</div>" +
    '<div class="card"><div class="row gap-2" style="font-weight:700;font-size:14px">' + Icon("trophy", { size: 15, color: "var(--gold)" }) + " Clubes del Éxito</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Reconocimientos adicionales por ingresos sostenidos, más allá del rango de Maestría alcanzado.</p>' +
    clubes + "</div>" +
    '<div class="card">' + notas + "</div>"
  );
}

/* ---------------- Planeador de Quincena ---------------- */

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
    alerta = '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 ¡Ya completaste los 2.500.000 PV en ambas piernas esta quincena!</div>';
  } else if (desequilibrio > META_PV_QUINCENA * 0.4) {
    const adelantada = verIzq > verDer ? "Izquierda" : "Derecha";
    const atrasada = verIzq > verDer ? "Derecha" : "Izquierda";
    alerta =
      '<div class="card" style="border-color:var(--warn);background:var(--warn-soft)">' +
      '<div class="row gap-2" style="font-weight:700;color:var(--warn)">' + Icon("triangle-alert", { size: 16, color: "var(--warn)" }) + " Piernas desequilibradas</div>" +
      '<p class="small" style="margin-top:6px;line-height:1.5">Tu pierna ' + adelantada + " va muy por delante de tu pierna " + atrasada + ". Los puntos que sobran en " + adelantada + " no ciclan si " + atrasada + " no llega al mismo nivel — activa más pedidos en " + atrasada + " antes de que termine la quincena.</p>" +
      "</div>";
  }

  function bloqueCalc(nombre, falt, ritmo) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      (falt > 0
        ? '<div class="rl-value">' + falt.toLocaleString("es") + ' <span class="muted small" style="font-weight:400">PV faltantes</span></div>' +
          '<div class="rl-sub">Ritmo necesario: ' + ritmo.toLocaleString("es") + " PV/día durante " + dias + (dias === 1 ? " día" : " días") + "</div>"
        : '<div class="rl-value" style="color:var(--success)">Completado ✓</div>') +
      "</div>"
    );
  }

  return (
    sectionHeaderHTML("Planeador de Quincena", "Cuánto falta y a qué ritmo, para no perder ciclaje.", "target") +
    quincenaNavHTML(qKey) +
    alerta +
    '<div class="resumen-linea">' + bloqueCalc("Izquierda", faltIzq, ritmoIzq) + bloqueCalc("Derecha", faltDer, ritmoDer) + "</div>" +
    '<button class="btn-secondary" data-action="goto" data-arg="listas">' + Icon("users", { size: 15 }) + " Ir a las Listas 200+200</button>"
  );
}

/* ---------------- Listas 200+200 ---------------- */

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

function productoRowHTML(paisId, qKey, compras, p, i, paisInfo) {
  const cantidad = Number(compras[p.id]) || 0;
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<input type="text" placeholder="Nombre del producto" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="roster-check' + (p.probado ? " on" : "") + '" style="margin-top:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Marcar como probado">' +
    '<div class="box" style="width:22px;height:22px">' + (p.probado ? Icon("check", { size: 12, color: "#1B1338" }) : "") + "</div>" +
    "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Precio (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">Esta quincena</label><input type="number" min="0" value="' + cantidad + '" data-field="quincenas.' + qKey + ".compras." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
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
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Calculadora de productos</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Marca qué productos ya probaste, y cuántos planea cada uno comprar esta quincena — así sabes cuántos PV representa y cuánto vas a pagar, para tu reunión de enfoque.</p>' +
    '<div class="muted small" style="margin-top:10px">País / catálogo</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">PV planeados</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Total a pagar</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " de " + catalogo.length + " productos probados · " + planeados + " planeados esta quincena</div>" +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Añadir producto</button>'
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "Sin nombre") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + "</div>" : "") +
    (p.atomyId || p.contrasena
      ? '<div class="muted small" style="margin-top:2px">' +
        (p.atomyId ? "ID " + escapeHtml(p.atomyId) : "") +
        (p.atomyId && p.contrasena ? " · " : "") +
        (p.contrasena ? "Contraseña " + escapeHtml(p.contrasena) : "") +
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
    '<span class="lbl">' + (p.verificado ? "Verificado — ya pidió sus puntos" : "Marcar como verificado") + "</span>" +
    "</div>" +
    "</div>"
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Aún no has agregado a nadie en esta línea. Toca “+ Agregar persona” en tu reunión de planeación.</p>';

  return (
    sectionHeaderHTML("Listas 200+200", "Planea con tu equipo cuántos puntos pedirá cada persona, y en qué fecha de la quincena.", "users") +
    quincenaNavHTML(qKey) +
    '<div class="roster-check' + (q.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qkey="' + qKey + '">' +
    '<div class="box">' + (q.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (q.reunionHecha ? "Reunión de enfoque hecha esta quincena" : "Marcar: hice mi reunión de enfoque a mis socios") + "</span>" +
    "</div>" +
    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +
    '<div class="tabs">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea" data-arg="izquierda">Izquierda (' + (q.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea" data-arg="derecha">Derecha (' + (q.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field"><label>Puntos ya confirmados fuera de la lista (consumo personal u otros)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? q.otrosIzquierda : q.otrosDerecha) + '" data-field="quincenas.' + qKey + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" data-action="add-persona" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Agregar persona</button>" +
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
      (ui.confirmDeletePersona === d.id ? "¿Seguro? Toca de nuevo para eliminar" : "Eliminar persona") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-persona"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editar persona" : "Nueva persona — línea " + (d.linea === "izquierda" ? "Izquierda" : "Derecha")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nombre</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nombre completo"></div>' +
    '<div class="field"><label>Teléfono (opcional)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Ej. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Contraseña</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Opcional"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">La contraseña es opcional y solo para que el equipo pueda poner puntos por este socio si lo necesita — nadie está obligado a compartirla.</p>' +
    '<div class="field"><label>Notas</label><textarea rows="2" data-draft-field="notas" placeholder="Observaciones...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona">Guardar</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona">Cancelar</button>' +
    "</div></div>"
  );
}

/* ---------------- Mi Rango ---------------- */

function renderPerfil(state) {
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
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Actividad reciente</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    '<div class="card" style="text-align:center;border:2px solid var(--gold)">' +
    medallionHTML(rango.icon, 84) +
    '<div class="muted small" style="margin-top:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;color:var(--gold)">Tu rango actual</div>' +
    '<div style="font-size:20px;font-weight:700;margin-top:4px">' + escapeHtml(rango.nombre) + "</div>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Camino de Maestría</div>' +
    '<div class="muted small" style="margin-bottom:12px">Toca el siguiente rango cuando lo alcances.</div>' +
    '<div class="grid-3">' + botones + "</div>" +
    "</div>" +
    actividad
  );
}

/* ---------------- Ajustes ---------------- */

function renderAjustes(state, ui) {
  const resetLabel = ui.confirmReset ? "¿Seguro? Toca de nuevo para reiniciar" : "Reiniciar mi progreso";
  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Licencia de esta copia</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">Esta copia de Cumbre Master está licenciada exclusivamente para <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> y su propio equipo. No está autorizada para compartirse con otros líderes o equipos.</p>' +
      "</div>"
    : "";
  return (
    sectionHeaderHTML("Ajustes", "", "settings") +
    licenciaCard +
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Tu WhatsApp (para el botón de ayuda)</label>' +
    '<input type="text" inputmode="numeric" placeholder="Ej. 573000000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>' +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}
