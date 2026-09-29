/* ---------------------------------------------------------------
   VISTAS — Cumbre Master: cada función devuelve un string HTML
   para #view-container (o para las regiones fijas: header, menú, modales)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Accueil", icon: "home" },
  { id: "plan", label: "Plan de Rémunération", icon: "book-open" },
  { id: "planeador", label: "Planificateur de Quinzaine", icon: "target" },
  { id: "listas", label: "Réunion de Focus", icon: "users" },
  { id: "reto7x7", label: "Défi 7×7", icon: "flame" },
  { id: "agenda", label: "Agenda Hebdomadaire", icon: "calendar" },
  { id: "informe", label: "Rapport Hebdomadaire", icon: "trending-up" },
  { id: "arbol", label: "Mon Arbre Généalogique", icon: "crown" },
  { id: "sos", label: "Appels S.O.S.", icon: "bell" },
  { id: "eventos", label: "Liste de Contacts", icon: "users" },
  { id: "perfil", label: "Mon Rang", icon: "user-badge" },
  { id: "ajustes", label: "Paramètres", icon: "settings" },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 20) return "Bon après-midi";
  return "Bonsoir";
}

/* ---------------- Bienvenida / Onboarding ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen cover-screen">' +
    Icon("gem", { size: 64, color: "var(--gold)" }) +
    '<h1 style="margin-top:22px;font-size:28px;font-weight:700;letter-spacing:-.02em">Cumbre Master</h1>' +
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">De Sales Master à Imperial Master</p>' +
    '<p class="muted" style="margin-top:22px;max-width:300px;font-size:15px;line-height:1.6">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Commencer ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    (LICENCIA_TITULAR ? '<p class="muted small" style="margin-top:26px;opacity:.6">Copie sous licence exclusive pour ' + escapeHtml(LICENCIA_TITULAR) + "</p>" : "") +
    "</div>"
  );
}

function renderOnboarding(ui) {
  const foto = ui.onboardingFoto;
  const avatarInner = foto ? '<img src="' + foto + '" alt="Ta photo"/>' : Icon("camera", { size: 26 });
  return (
    '<div class="center-screen" style="justify-content:center">' +
    '<div style="display:flex;flex-direction:column;align-items:center">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="onboarding-file">' + avatarInner + "</button>" +
    '<input id="onboarding-file" type="file" accept="image/*" class="hidden" data-target="__onboardingFoto">' +
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Changer la photo" : "Ajouter une photo (optionnel)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">Comment t\'appelles-tu ?</h2>' +
    '<p class="muted small" style="margin-top:4px">Ainsi, on personnalise ton tableau de leader.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Ton nom" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<div style="width:100%;max-width:320px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Tes données Atomy <span class="muted" style="font-weight:400">(optionnel)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">On les note dans ton Arbre Généalogique, comme ça tu n\'as plus besoin de les chercher ni de les redemander.</p>' +
    '<input id="onboarding-atomy-id-input" type="text" placeholder="Ton ID Atomy" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-atomy-pass-input" type="text" placeholder="Ton mot de passe Atomy" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<div style="width:100%;max-width:320px;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Ton parrain/ta marraine <span class="muted" style="font-weight:400">(optionnel)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Ainsi, on active tout de suite le bouton WhatsApp pour lui écrire et on le note dans ton Arbre Généalogique. Tu peux passer cette étape et la compléter plus tard.</p>' +
    '<input id="onboarding-sponsor-name-input" type="text" placeholder="Nom de ton parrain/ta marraine" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-sponsor-phone-input" type="text" inputmode="numeric" placeholder="Son WhatsApp, ex. 34600000000" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Commencer ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
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
  const salir = '<button class="sidebar-item" style="color:var(--warn)" data-action="salir-app">' + Icon("log-out", { size: 20 }) + "<span>Quitter</span></button>";
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
  const salir = '<button class="menu-item" style="color:var(--warn)" data-action="salir-app">' + medallionHTML("log-out", 34) + "<span>Quitter</span></button>";
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><div class="row gap-2">' + Icon("gem", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">CUMBRE MASTER</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + salir + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Licence exclusive : ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
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
  [["izquierda", "Gauche"], ["derecha", "Droite"]].forEach(function (par) {
    const verificado = sumaLinea(q, par[0], true);
    const faltante = Math.max(0, META_PV_QUINCENA - verificado);
    if (faltante > 0) {
      const ritmo = Math.ceil(faltante / dias);
      out.push({ text: "Jambe " + par[1] + " : il manque " + faltante.toLocaleString("fr") + " PV vérifiés. Rythme nécessaire : " + ritmo.toLocaleString("fr") + " PV/jour." });
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
    : '<p class="muted small" style="margin-top:8px">Tu es à jour — tu n\'as aucune alerte de rythme en attente.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Alertes de cette quinzaine</span>' +
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
    '<div class="logro-modal-eyebrow">Nouveau rang atteint !</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Partage-le avec ton équipe — l\'exemple duplique plus que n\'importe quel discours 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">Génial, continuer</button>' +
    "</div></div>"
  );
}

/* ---------------- Inicio ---------------- */

function quincenaNavHTML(qKey) {
  const actual = esQuincenaActual(qKey);
  return (
    '<div class="quincena-nav">' +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="-1">' + Icon("chevron-left", { size: 18 }) + "</button>" +
    '<div class="qn-label">' + escapeHtml(quincenaLabel(qKey)) + (actual ? ' <span class="badge gold" style="margin-left:6px">Actuelle</span>' : "") + "</div>" +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="1">' + Icon("chevron-right", { size: 18 }) + "</button>" +
    "</div>" +
    (actual ? '<div class="muted small" style="text-align:center;margin-top:-4px">' + diasRestantesQuincena(qKey) + " jours restants dans cette quinzaine</div>" : "")
  );
}

function resumenLineasHTML(planIzq, verIzq, planDer, verDer) {
  const pctIzq = Math.min(100, Math.round((verIzq / META_PV_QUINCENA) * 100));
  const pctDer = Math.min(100, Math.round((verDer / META_PV_QUINCENA) * 100));
  function bloque(nombre, plan, ver, pct) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      '<div class="rl-value">' + ver.toLocaleString("fr") + ' <span class="muted small" style="font-weight:400">/ ' + META_PV_QUINCENA.toLocaleString("fr") + " PV</span></div>" +
      '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 3) + '%"></div></div>' +
      '<div class="rl-sub">Vérifié ' + pct + "% · Planifié non vérifié : " + plan.toLocaleString("fr") + " PV</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Gauche", planIzq, verIzq, pctIzq) + bloque("Droite", planDer, verDer, pctDer) + "</div>";
}

function renderHome(state, ui) {
  const rango = RANGOS_MASTER[state.rangoActualIndex];
  const siguiente = RANGOS_MASTER[state.rangoActualIndex + 1];
  const key = quincenaActualKey();
  const q = peekQuincena(state, key);
  const planIzq = sumaLinea(q, "izquierda", false), verIzq = sumaLinea(q, "izquierda", true);
  const planDer = sumaLinea(q, "derecha", false), verDer = sumaLinea(q, "derecha", true);
  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Ta photo"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(rango.nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Bonjour, ' + escapeHtml(state.nombre || "leader") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Ta quinzaine actuelle</div>' +
    '<div class="muted small" style="margin-top:4px">' + escapeHtml(quincenaLabel(key)) + " · " + diasRestantesQuincena(key) + " jours restants</div>" +
    "</div>" +

    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +

    (siguiente
      ? '<div class="card"><div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Ton prochain objectif</span></div>' +
        '<div style="font-size:15px;font-weight:700;margin-top:6px">' + escapeHtml(siguiente.nombre) + "</div>" +
        '<div class="muted small" style="margin-top:2px;line-height:1.5">' + escapeHtml(siguiente.prerrequisito) + "</div>" +
        "</div>"
      : '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 Tu as déjà atteint Imperial Master, le rang le plus élevé du plan !</div>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="planeador">' + medallionHTML("target", 44) + '<div class="nc-body"><div class="nc-title">Planificateur de Quinzaine</div><div class="nc-desc">Combien il manque et à quel rythme</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="listas">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Réunion de Focus</div><div class="nc-desc">Planifie avec ton équipe, ligne par ligne</div></div>' + clicaAquiBadgeHTML(false, "accent") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan">' + medallionHTML("book-open", 44) + '<div class="nc-body"><div class="nc-title">Plan de Rémunération</div><div class="nc-desc">Comment ça fonctionne, expliqué simplement</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>"
  );
}

/* ---------------- Plan de Compensación (teoría) ---------------- */

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
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">' + (r.n === 0 ? "Rang atteint" : "Rang " + (r.n + 1)) + "</div>" +
      '<div style="font-size:16px;font-weight:700;margin-top:2px">' + escapeHtml(r.nombre) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Touche pour voir les détails</span></div>' +
      "</div>";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + escapeHtml(r.nombre) + "</div>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Prérequis</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.prerrequisito) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Commission de Maîtrise</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.comisionMaestria) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Bonus à la promotion</div>' +
      (r.montos || []).map(function (m) {
        return '<p style="font-size:13px;font-weight:700;line-height:1.5;margin-top:4px;color:var(--gold-light)">' + escapeHtml(m.etiqueta) + " : " + escapeHtml(formatMonedaAprox(m.cop, paisInfo)) + "</p>";
      }).join("") +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.promocion) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Pour monter</div>' +
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
    const texto = escapeHtml(n.etiqueta) + " : équivaut à " + escapeHtml(formatMonedaAprox(n.cop, paisInfo)) + (n.sufijo ? " " + escapeHtml(n.sufijo) : "") + ".";
    return '<p class="muted small" style="line-height:1.5;margin-top:6px">' + texto + "</p>";
  }).join("") + '<p class="muted small" style="line-height:1.5;margin-top:6px">' + escapeHtml(NOTA_MONEDA_APROX) + "</p>";
  const clubes = CLUBES_EXITO.map(function (c) {
    const requisito = c.requisito || ("Avoir atteint un revenu annuel de " + formatMonedaAprox(c.ingresoAnualCop, paisInfo) + ".");
    const nota = c.ingresoCopMin
      ? "Équivaut à un revenu " + formatMonedaRangoAprox(c.ingresoCopMin, c.ingresoCopMax, paisInfo) + " " + c.ingresoSufijo + "."
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
    sectionHeaderHTML("Plan de Rémunération", "Comment se répartissent les commissions, et le chemin de Sales Master à Imperial Master.", "book-open") +
    '<div class="card">' +
    '<p class="small" style="line-height:1.6">' + escapeHtml(DISTRIBUCION.intro) + "</p>" +
    partes +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(DISTRIBUCION.notaPeriodo) + "</p>" +
    "</div>" +
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px;margin-bottom:8px">Commission Générale (44%)</div>' +
    '<div class="table-simple"><table><thead><tr><th>Niveau</th><th>Points</th><th>Condition de membre</th><th>Jambe faible</th></tr></thead><tbody>' + filasTabla + "</tbody></table></div>" +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(COMISION_GENERAL_NOTA) + "</p>" +
    "</div>" +
    '<div style="font-size:14px;font-weight:700;margin-top:4px">Chemin de Maîtrise — de Sales Master à Imperial Master</div>' +
    '<div class="muted small" style="margin-top:2px">Touche une carte pour voir son bonus approximatif dans ta monnaie (' + escapeHtml(paisInfo.label) + "). " + escapeHtml(NOTA_MONEDA_APROX) + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">Règles générales de promotion</div>' + criterios + "</div>" +
    '<div class="card"><div class="row gap-2" style="font-weight:700;font-size:14px">' + Icon("trophy", { size: 15, color: "var(--gold)" }) + " Clubs du Succès</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Distinctions supplémentaires pour des revenus soutenus, au-delà du rang de Maîtrise atteint.</p>' +
    clubes + "</div>" +
    '<div class="card">' + notas + "</div>"
  );
}

/* ---------------- Planeador de Quincena ---------------- */

/* ---------------- Gran Plan 3 — proyección a 3 años ---------------- */

function granPlanHitoRowHTML(anio, i, h, confirmKey) {
  const key = anio + "|" + i;
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' +
    '<input type="text" placeholder="Date (ex. 08/2026)" value="' + escapeHtml(h.fecha) + '" data-field="granPlan3.' + anio + "." + i + '.fecha" style="flex:1;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Niveau de maîtrise" value="' + escapeHtml(h.nivel) + '" data-field="granPlan3.' + anio + "." + i + '.nivel" style="flex:1.4;min-width:130px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;align-items:center;flex-wrap:wrap">' +
    '<input type="text" placeholder="PV de groupe" value="' + escapeHtml(h.pvGrupal) + '" data-field="granPlan3.' + anio + "." + i + '.pvGrupal" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Revenus" value="' + escapeHtml(h.ingresos) + '" data-field="granPlan3.' + anio + "." + i + '.ingresos" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<div data-action="delete-hito-granplan" data-arg="' + key + '" style="cursor:pointer;color:var(--warn);font-size:11px;padding:4px;flex-shrink:0">' + (confirmKey === key ? "Supprimer ?" : Icon("x", { size: 14 })) + "</div>" +
    "</div></div>"
  );
}

function granPlanAnioHTML(anio, label, hitos, ui) {
  const rows = hitos.map(function (h, i) { return granPlanHitoRowHTML(anio, i, h, ui.confirmDeleteHito); }).join("");
  return (
    '<div style="margin-top:14px">' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light)">' + escapeHtml(label) + "</div>" +
    '<div class="view-stack gap-sm" style="margin-top:6px">' + rows + "</div>" +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-hito-granplan" data-arg="' + anio + '">+ Ajouter une étape</div>' +
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
    '<div class="row gap-2">' + Icon("trending-up", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Grand Plan 3 — projection sur 3 ans</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + total + " étapes enregistrées</div>" +
    (open
      ? '<p class="muted small" style="margin-top:8px;line-height:1.5">' + escapeHtml(GRAN_PLAN_3_INTRO) + "</p>" +
        granPlanAnioHTML("anio1", "Année 1", gp.anio1, ui) +
        granPlanAnioHTML("anio2", "Année 2", gp.anio2, ui) +
        granPlanAnioHTML("anio3", "Année 3", gp.anio3, ui)
      : "") +
    "</div>"
  );
}

/* ---------------- Diario de mi yo futuro ---------------- */

function diarioFuturoSectionHTML(state, ui) {
  const open = !!ui.diarioFuturoOpen;
  const texto = state.diarioFuturo.texto;
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-diario-futuro">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Journal de mon futur moi</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
    "</button>" +
    (open
      ? '<p class="muted small" style="margin-top:6px;line-height:1.5">' + escapeHtml(DIARIO_FUTURO_INTRO) + "</p>" +
        '<textarea rows="8" placeholder="' + escapeHtml(DIARIO_FUTURO_EJEMPLO) + '" data-field="diarioFuturo.texto" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 12px;font-size:13px;outline:none;resize:vertical;font-family:inherit;line-height:1.5">' + escapeHtml(texto) + "</textarea>"
      : '<p class="muted small" style="margin-top:6px">' + (texto ? "Tu lettre est déjà écrite — touche pour la voir ou la modifier." : "Tu ne l'as pas encore écrite.") + "</p>") +
    "</div>"
  );
}

/* ---------------- Plan comercial mensual ---------------- */

function planComercialMensualHTML(state, ui) {
  const mesKey = ui.mesPlanComercial || mesActualKey();
  const plan = getPlanComercialMensual(state, mesKey);

  const metasHtml = plan.metas.map(function (m, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (m.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-meta-planmensual" data-arg="' + m.id + '"></div>' +
      '<input type="text" placeholder="Ex. Gagner 3000 USD par mois" value="' + escapeHtml(m.texto) + '" data-field="planComercialMensual.' + mesKey + ".metas." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (m.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-meta-planmensual" data-arg="' + m.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteMetaPlan === m.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const accionesHtml = plan.acciones.map(function (a, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (a.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-accion-planmensual" data-arg="' + a.id + '"></div>' +
      '<input type="text" placeholder="Ex. Appeler 10 personnes par jour" value="' + escapeHtml(a.texto) + '" data-field="planComercialMensual.' + mesKey + ".acciones." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (a.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-accion-planmensual" data-arg="' + a.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteAccionPlan === a.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const quincenasHtml = plan.quincenas.map(function (q, i) {
    const label = i === 0 ? "Première quinzaine du mois" : "Deuxième moitié du mois";
    return (
      '<div class="card" style="padding:10px 12px;margin-top:8px">' +
      '<div class="muted small" style="font-weight:600">' + label + "</div>" +
      '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
      '<div style="flex:1;min-width:80px"><label class="muted small">Revenus</label><input type="number" value="' + (Number(q.ingresos) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.ingresos" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:80px"><label class="muted small">PV de ventes</label><input type="number" value="' + (Number(q.pv) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:100px"><label class="muted small">Niveau de maîtrise</label><input type="text" value="' + escapeHtml(q.nivel) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.nivel" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      "</div></div>"
    );
  }).join("");

  return (
    '<div class="card">' +
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("target", { size: 13, color: "var(--gold)" }) + " Plan commercial mensuel</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="planmensual-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="planmensual-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Objectifs</div>' +
    metasHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-meta-planmensual">+ Ajouter un objectif</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Plan d\'actions</div>' +
    accionesHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-accion-planmensual">+ Ajouter une action</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Revenus par quinzaine</div>' +
    quincenasHtml +
    "</div>"
  );
}

/* ---------------- Evaluación mensual de Los 8 Pasos ---------------- */

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
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + " Évaluation mensuelle des 8 Étapes</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="eval8pasos-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="eval8pasos-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    filas +
    '<div class="card" style="margin-top:14px;background:var(--accent-soft);border-color:var(--gold)">' +
    '<div class="row between"><span style="font-weight:700;font-size:13px">Ton score ce mois-ci</span><span style="font-weight:700;font-size:18px;color:var(--gold)">' + total + "</span></div>" +
    '<p class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(banda.texto) + "</p>" +
    "</div>" +
    '<div class="field" style="margin-top:12px"><label>Points positifs</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.alabanza" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.alabanza) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Points de réflexion</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.reflexion" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.reflexion) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Commentaires du parrain</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.comentarioPatrocinador" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.comentarioPatrocinador) + "</textarea></div>" +
    "</div>"
  );
}

const OCHO_CORE_NOTA_HTML =
  '<div class="card" style="background:var(--accent-soft);border:none">' +
  '<div class="row gap-2" style="font-weight:700;font-size:13px">' + Icon("check-circle", { size: 15, color: "var(--accent)" }) + " Ton 8 Core quotidien/mensuel</div>" +
  '<p class="muted small" style="margin-top:6px;line-height:1.55">Ce suivi quotidien (Lecture, Voir la VOD, Présence aux réunions, Utilisation du produit, Montrer le plan, Livraison au consommateur, Consultation du parrain, Générer la confiance) tu le tiens déjà sur ta page officielle Atomy — va dans <b>Suivre le Succès → Mon 8 Core mensuel</b> et coche-le là-bas jour après jour.</p>' +
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
    alerta = '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 Tu as déjà complété les 2 500 000 PV dans les deux jambes cette quinzaine !</div>';
  } else if (desequilibrio > META_PV_QUINCENA * 0.4) {
    const adelantada = verIzq > verDer ? "gauche" : "droite";
    const atrasada = verIzq > verDer ? "droite" : "gauche";
    alerta =
      '<div class="card" style="border-color:var(--warn);background:var(--warn-soft)">' +
      '<div class="row gap-2" style="font-weight:700;color:var(--warn)">' + Icon("triangle-alert", { size: 16, color: "var(--warn)" }) + " Jambes déséquilibrées</div>" +
      '<p class="small" style="margin-top:6px;line-height:1.5">Ta jambe ' + adelantada + " est très en avance sur ta jambe " + atrasada + ". Les points en excès dans la jambe " + adelantada + " ne cyclent pas si la jambe " + atrasada + " n'atteint pas le même niveau — active plus de commandes dans la jambe " + atrasada + " avant la fin de la quinzaine.</p>" +
      "</div>";
  }

  function bloqueCalc(nombre, falt, ritmo) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      (falt > 0
        ? '<div class="rl-value">' + falt.toLocaleString("fr") + ' <span class="muted small" style="font-weight:400">PV manquants</span></div>' +
          '<div class="rl-sub">Rythme nécessaire : ' + ritmo.toLocaleString("fr") + " PV/jour pendant " + dias + (dias === 1 ? " jour" : " jours") + "</div>"
        : '<div class="rl-value" style="color:var(--success)">Complété ✓</div>') +
      "</div>"
    );
  }

  return (
    sectionHeaderHTML("Planificateur de Quinzaine", "Combien il manque et à quel rythme, pour ne pas perdre de cyclage.", "target") +
    quincenaNavHTML(qKey) +
    alerta +
    '<div class="resumen-linea">' + bloqueCalc("Gauche", faltIzq, ritmoIzq) + bloqueCalc("Droite", faltDer, ritmoDer) + "</div>" +
    '<button class="btn-secondary" data-action="goto" data-arg="listas">' + Icon("users", { size: 15 }) + " Aller à Réunion de Focus</button>" +
    granPlanSectionHTML(state, ui) +
    diarioFuturoSectionHTML(state, ui) +
    planComercialMensualHTML(state, ui) +
    evaluacion8PasosHTML(state, ui) +
    OCHO_CORE_NOTA_HTML
  );
}

/* ---------------- Reunión de Enfoque (listas Izquierda/Derecha) ---------------- */

function pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, appName) {
  const items = catalogo.filter(function (p) { return (Number(compras[p.id]) || 0) > 0; });
  const lineas = items.map(function (p) {
    const cant = Number(compras[p.id]) || 0;
    return "• " + (p.nombre || "(sans nom)") + " x" + cant + " (" + ((Number(p.pv) || 0) * cant).toLocaleString(paisInfo.locale) + " PV)";
  });
  return (
    "📦 Mon plan d'achat de cette quinzaine (" + appName + ") :\n" +
    lineas.join("\n") +
    "\n\nTotal : " + totalPV.toLocaleString(paisInfo.locale) + " PV · " + formatMoneda(totalPrecio, paisInfo) +
    "\n\nPeux-tu m'aider à le vérifier ?"
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

/* ---------------- "Clica aquí" — badge reutilizable para toggles y navegación ---------------- */

function clicaAquiBadgeHTML(open, color) {
  const cls = color === "accent" ? "blue" : "gold";
  return (
    '<span class="badge ' + cls + '" style="flex-shrink:0">Clique ici' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' +
    Icon("chevron-right", { size: 11, color: color === "accent" ? "var(--accent)" : "#1B1338" }) +
    "</span></span>"
  );
}

/* ---------------- Reto 7×7 — tabla de 10 contactos y evaluación semanal ---------------- */

function contactos10FilaHTML(pathPrefix, i, fila) {
  const inputStyle = "width:100%;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 8px;font-size:12.5px;outline:none";
  return (
    "<tr>" +
    '<td style="padding:4px 6px;font-size:11px;color:var(--text-soft);text-align:center">' + (i + 1) + "</td>" +
    '<td style="padding:4px"><input type="text" placeholder="Nom" value="' + escapeHtml(fila.nombre) + '" data-field="' + pathPrefix + "." + i + '.nombre" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" inputmode="tel" placeholder="Téléphone" value="' + escapeHtml(fila.telefono) + '" data-field="' + pathPrefix + "." + i + '.telefono" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" placeholder="Observations / suivi" value="' + escapeHtml(fila.observaciones) + '" data-field="' + pathPrefix + "." + i + '.observaciones" style="' + inputStyle + '"></td>' +
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
    '<div class="row gap-2">' + Icon("phone-call", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Mes premiers 10 contacts</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + llenos + " sur 10 avec un nom enregistré</div>" +
    (open
      ? '<div style="overflow-x:auto;margin-top:10px">' +
        '<table style="border-collapse:collapse;width:100%">' +
        "<thead><tr><th></th><th style=\"" + thStyle + "\">Nom</th><th style=\"" + thStyle + "\">Téléphone</th><th style=\"" + thStyle + "\">Observations</th></tr></thead>" +
        "<tbody>" + filas + "</tbody>" +
        "</table></div>"
      : "") +
    "</div>"
  );
}

function evaluacion7x7ResumenTexto(ev, periodoLabel) {
  return (
    "📊 " + periodoLabel + " — Défi 7×7 (Cumbre Master) :\n" +
    "• Personnes contactées : " + (ev.contactados || "0") + "\n" +
    "• Ont répondu : " + (ev.respondieron || "0") + "\n" +
    "• Présentations faites : " + (ev.presentaciones || "0") + "\n" +
    "• Achats obtenus : " + (ev.compras || "0") + "\n" +
    "• Personnes intéressées par l'entreprise : " + (ev.interesados || "0") + "\n" +
    "• Qui je dois continuer à accompagner : " + (ev.seguimiento || "—") +
    "\n\nPeux-tu m'aider à le revoir ?"
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
    ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, evaluacion7x7ResumenTexto(ev, periodoLabel)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Partager avec mon parrain</a>"
    : '<p class="muted small" style="margin-top:10px">Ajoute le WhatsApp de ton parrain dans Paramètres pour pouvoir partager ceci.</p>';
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="' + toggleAction + '"' + (toggleArg != null ? ' data-arg="' + toggleArg + '"' : "") + '>' +
    '<div class="row gap-2">' + Icon("target", { size: 15, color: "var(--accent)" }) + '<span style="font-weight:700;font-size:14px">Mes réussites de cette semaine</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Enregistre-le tous les 7 jours et partage-le avec ton parrain — c\'est le travail habituel pour faire grandir ton entreprise.</p>' +
    (open
      ? '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
        campo("contactados", "Personnes contactées", "0") +
        campo("respondieron", "Ont répondu", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("presentaciones", "Présentations faites", "0") +
        campo("compras", "Achats obtenus", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("interesados", "Personnes intéressées par l'entreprise", "0") +
        "</div>" +
        '<div class="field" style="margin-top:8px"><label>Qui dois-je continuer à accompagner ?</label>' +
        '<textarea rows="2" data-field="' + pathPrefix + '.seguimiento">' + escapeHtml(ev.seguimiento) + "</textarea></div>" +
        compartir
      : "") +
    "</div>"
  );
}

/* Convierte un monto oficial en COP (RANGOS_MASTER.montos) a la moneda del
   país activo y lo formatea con el prefijo "aprox." — ver TASAS_COP_POR_MONEDA
   en data.js para el porqué de la conversión aproximada. */
function formatMonedaAprox(montoCOP, paisInfo) {
  const valor = convertirDesdeCOP(montoCOP, paisInfo.moneda);
  return "aprox. " + formatMoneda(valor, paisInfo);
}

/* Igual que formatMonedaAprox pero para un rango (ej. "aprox. $X a $Y") — el
   prefijo "aprox." aparece una sola vez, no repetido en cada extremo. */
function formatMonedaRangoAprox(copMin, copMax, paisInfo) {
  const min = formatMoneda(convertirDesdeCOP(copMin, paisInfo.moneda), paisInfo);
  const max = formatMoneda(convertirDesdeCOP(copMax, paisInfo.moneda), paisInfo);
  return "aprox. " + min + " a " + max;
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
    '<input type="text" placeholder="Nom du produit" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="roster-check' + (p.probado ? " on" : "") + '" style="margin-top:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Marquer comme testé">' +
    '<div class="box" style="width:22px;height:22px">' + (p.probado ? Icon("check", { size: 12, color: "#1B1338" }) : "") + "</div>" +
    "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Prix (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">Cette quinzaine</label><input type="number" min="0" value="' + cantidad + '" data-field="quincenas.' + qKey + ".compras." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
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
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Calculatrice de produits</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Coche les produits que tu as déjà testés, et combien chacun prévoit d\'acheter cette quinzaine — ainsi tu sais combien de PV ça représente et combien tu vas payer, pour ta réunion de focus.</p>' +
    '<div class="muted small" style="margin-top:10px">Pays / catalogue</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">PV planifiés</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Total à payer</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " sur " + catalogo.length + " produits testés · " + planeados + " planifiés cette quinzaine</div>" +
    (planeados > 0
      ? (state.whatsapp && state.whatsapp.trim()
          ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, "Cumbre Master")) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Partager avec mon parrain</a>"
          : '<p class="muted small" style="margin-top:10px">Ajoute le WhatsApp de ton parrain dans Paramètres pour pouvoir partager ta commande.</p>')
      : "") +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Ajouter un produit</button>'
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "Sans nom") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + (p.pais ? " · " + escapeHtml(paisCatalogoInfo(p.pais).label) : "") + "</div>" : "") +
    (p.atomyId || p.contrasena
      ? '<div class="muted small" style="margin-top:2px">' +
        (p.atomyId ? "ID " + escapeHtml(p.atomyId) : "") +
        (p.atomyId && p.contrasena ? " · " : "") +
        (p.contrasena ? "Mot de passe " + escapeHtml(p.contrasena) : "") +
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
    '<div class="field" style="margin-top:8px"><label>Date prévue</label><input type="date" value="' + (p.fecha || "") + '" data-roster-field="fecha" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="roster-check' + verificadoClass + '" data-action="toggle-verificado" data-qkey="' + qKey + '" data-linea="' + linea + '" data-arg="' + p.id + '">' +
    '<div class="box">' + (p.verificado ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (p.verificado ? "Vérifié — a déjà commandé ses points" : "Marquer comme vérifié") + "</span>" +
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
          return "• " + (p.nombre || "(sans nom)") + " : PVP " + (Number(p.pvp) || 0).toLocaleString("fr") + " · PVG " + (Number(p.puntos) || 0).toLocaleString("fr") + (p.verificado ? " ✅ vérifié" : " (non vérifié)");
        }).join("\n")
      : "  (aucune personne enregistrée)";
    return (
      "*Jambe " + nombre + "*\n" +
      personasTxt +
      (otros ? "\n• Hors liste (consommation/autres) : " + otros.toLocaleString("fr") + " points" : "") +
      "\nVérifié : " + ver.toLocaleString("fr") + " points · Planifié non vérifié : " + plan.toLocaleString("fr") + " points"
    );
  }
  return (
    "🎯 Réunion de Focus — Quinzaine " + quincenaLabel(qKey) + " :\n\n" +
    lineaTexto("Gauche", "izquierda") + "\n\n" +
    lineaTexto("Droite", "derecha") +
    "\n\n" + (q.reunionHecha ? "✅ J'ai déjà fait ma réunion de focus avec mes partenaires." : "⏳ Je n'ai pas encore fait ma réunion de focus avec mes partenaires.") +
    "\n\nPeux-tu m'aider à le revoir pour planifier ma quinzaine ?"
  );
}

/* ---------------- Reto 7×7 ---------------- */

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
        '<div class="row gap-2">' + Icon(d.icono, { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13.5px">Jour ' + d.id + " — " + escapeHtml(d.titulo) + "</span></div>" +
        clicaAquiBadgeHTML(diaOpen, "gold") +
        "</button>" +
        (diaOpen
          ? '<p class="muted small" style="margin-top:6px;font-style:italic">' + escapeHtml(d.frase) + "</p>" +
            contenidoHtml +
            '<div style="margin-top:10px">' + checklistHtml + "</div>"
          : '<div class="muted small" style="margin-top:4px">' + diaEst.checks.filter(Boolean).length + " sur " + d.checklist.length + " tâches accomplies</div>") +
        "</div>"
      );
    }).join("");

    return (
      '<div class="card" style="margin-top:12px">' +
      '<button class="row between" style="width:100%;text-align:left" data-action="toggle-reto7x7-semana" data-arg="' + semN + '">' +
      '<div class="row gap-2">' + Icon("flame", { size: 16, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:15px">Semaine ' + semN + " — Défi 7×7</span></div>" +
      clicaAquiBadgeHTML(open, "gold") +
      "</button>" +
      '<div class="muted small" style="margin-top:4px">' + doneCount + " sur " + totalChecks + " tâches accomplies</div>" +
      (open
        ? diasHtml +
          contactos10TablaHTML("reto7x7." + semN + ".contactos10", est.contactos10, contactos10Open, "toggle-reto7x7-contactos10", semN) +
          evaluacion7x7PanelHTML(state, "reto7x7." + semN + ".evaluacion", est.evaluacion, evaluacionOpen, "toggle-reto7x7-evaluacion", semN, "Semaine " + semN)
        : "") +
      "</div>"
    );
  }).join("");

  return (
    sectionHeaderHTML("Défi 7×7", RETO_7X7_INTRO, "flame") +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Tu n\'as encore ajouté personne dans cette jambe. Touche « + Ajouter une personne » lors de ta réunion de planification.</p>';

  return (
    sectionHeaderHTML("Réunion de Focus", "Planifie avec ton équipe combien de points chaque personne va commander, et à quelle date de la quinzaine.", "users") +
    quincenaNavHTML(qKey) +
    '<div class="roster-check' + (q.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qkey="' + qKey + '">' +
    '<div class="box">' + (q.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (q.reunionHecha ? "Réunion de focus faite cette quinzaine" : "Marquer : j'ai fait ma réunion de focus avec mes partenaires") + "</span>" +
    "</div>" +
    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, resumenEnfoqueTexto(state, qKey)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Partager avec mon parrain</a>"
      : '<p class="muted small" style="margin-top:10px">Ajoute le WhatsApp de ton parrain dans Paramètres pour pouvoir partager ta Réunion de Focus.</p>') +
    '<div class="tabs">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea" data-arg="izquierda">Gauche (' + (q.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea" data-arg="derecha">Droite (' + (q.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field"><label>Points déjà confirmés hors de la liste (consommation personnelle ou autres)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? q.otrosIzquierda : q.otrosDerecha) + '" data-field="quincenas.' + qKey + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" data-action="add-persona" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Ajouter une personne</button>" +
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
      (ui.confirmDeletePersona === d.id ? "Sûr ? Touche à nouveau pour supprimer" : "Supprimer la personne") +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier la personne" : "Nouvelle personne — jambe " + (d.linea === "izquierda" ? "Gauche" : "Droite")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nom</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nom complet"></div>' +
    '<div class="field"><label>Pays</label>' + paisChips + "</div>" +
    '<div class="field"><label>Téléphone (optionnel)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="' + escapeHtml(paisInfo.codigo) + ' 300 000 0000"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Mot de passe</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optionnel"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">Le mot de passe est optionnel et seulement pour que l\'équipe puisse enregistrer des points pour ce partenaire si besoin — personne n\'est obligé de le partager.</p>' +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="notas" placeholder="Observations...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona">Enregistrer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona">Annuler</button>' +
    "</div></div>"
  );
}

/* ---------------- Agenda Semanal ---------------- */

function agendaTipoInfo(tipoId) {
  return AGENDA_TIPOS.find(function (t) { return t.id === tipoId; }) || AGENDA_TIPOS[0];
}

function agendaFechaLabel(fecha) {
  try {
    return new Date(fecha + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" });
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(z.titulo || "Réunion sans titre") + "</div>" +
    '<div class="row gap-2" style="margin-top:2px;flex-wrap:wrap">' +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " Seulement " + escapeHtml(agendaFechaLabel(z.fecha)) + "</span>" : '<span class="badge dark">Chaque semaine</span>') +
    (z.hora ? '<span class="muted small">' + escapeHtml(z.hora) + "</span>" : "") +
    (z.recordar ? Icon("bell", { size: 11, color: "var(--gold-light)" }) : "") +
    "</div></div></div>" +
    '<button class="icon-btn" data-action="edit-zoom" data-dia="' + dia + '" data-arg="' + z.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    "</div>" +
    (z.enlace
      ? '<div class="row gap-2" style="margin-top:10px">' +
        '<a class="btn-secondary" style="flex:1;padding:8px;text-align:center" href="' + escapeHtml(z.enlace) + '" target="_blank" rel="noreferrer">' + Icon("video", { size: 14 }) + " Rejoindre</a>" +
        '<button class="icon-btn" data-action="copy-zoom-link" data-arg="' + escapeHtml(z.enlace) + '">' + Icon("copy", { size: 14 }) + "</button>" +
        "</div>"
      : '<div class="muted small" style="margin-top:8px">Aucun lien enregistré encore — touche pour l\'ajouter.</div>') +
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
    : '<p class="muted small" style="text-align:center;padding:16px 0">Aucune activité pour ' + escapeHtml(diaInfo.label) + ".</p>";

  const zoomsHtml = diaData.zooms.length
    ? diaData.zooms.map(function (z) { return zoomRowHTML(diaActivo, z); }).join("")
    : '<p class="muted small" style="text-align:center;padding:16px 0">Aucune réunion Zoom enregistrée pour ce jour.</p>';

  return (
    sectionHeaderHTML("Agenda Hebdomadaire", "Ta routine de leader, jour par jour — appels, réunions avec affiliés, consultations, formations et réunions de leaders, plus tes Zoom.", "calendar") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + tabs + "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Activités — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-actividad" data-arg="' + diaActivo + '">+ Ajouter</button></div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + actividadesHtml + "</div>" +
    "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Zoom — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-zoom" data-arg="' + diaActivo + '">+ Ajouter</button></div>' +
    '<div class="muted small" style="margin-top:2px">Enregistre ici tes Zoom récurrents (le même lien chaque semaine) ou un ponctuel dès que tu reçois l\'invitation — par exemple, si on t\'informe aujourd\'hui d\'un Zoom pour demain, ajoute-le ici avec sa date, son heure et son lien.</div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + zoomsHtml + "</div>" +
    "</div>"
  );
}

function recordatorioFieldHTML(d, toggleAction) {
  const on = !!d.recordar;
  const minOpts = [0, 10, 30, 60].map(function (m) {
    const label = m === 0 ? "À cette heure" : m + " min avant";
    return '<option value="' + m + '"' + (Number(d.recordarMin) === m ? " selected" : "") + ">" + label + "</option>";
  }).join("");
  return (
    '<div class="field">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<button class="check-dot' + (on ? " on" : "") + '" data-action="' + toggleAction + '">' + (on ? Icon("check", { size: 13, color: "#1B1338" }) : Icon("bell", { size: 13 })) + "</button>" +
    '<button class="check-label' + (on ? " on" : "") + '" style="padding:0;flex:1;text-align:left" data-action="' + toggleAction + '">Me prévenir avec une notification</button>' +
    "</div>" +
    (on
      ? '<select data-draft-field="recordarMin" style="width:100%;margin-top:8px;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:9px 12px;font-size:13.5px;outline:none">' + minOpts + "</select>" +
        '<p class="muted small" style="margin-top:4px">Ne prévient que tant que tu as Cumbre Master ouvert dans le navigateur ou installé, avec les notifications activées dans Paramètres.</p>'
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
      (ui.confirmDeleteActividad === ui.actividadEditId ? "Sûr ? Touche à nouveau pour supprimer" : "Supprimer l'activité") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-actividad"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier l'activité" : "Nouvelle activité") + "</span>" +
    '<button class="icon-btn" data-action="cancel-actividad">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Type</label><select data-draft-field="tipo" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + tipoOpts + "</select></div>" +
    '<div class="field"><label>Heure (optionnel)</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Date (optionnel)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Laisse-la vide si ça se répète chaque semaine ce jour-là. Ajoute une date si c\'est ponctuel — par exemple, une tâche unique.</p></div>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="nota" placeholder="Avec qui, où, quoi apporter...">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    recordatorioFieldHTML(d, "toggle-actividad-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-actividad">Enregistrer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-actividad">Annuler</button>' +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Enregistre ton parrain/ta marraine</span>' +
    '<button class="icon-btn" data-action="cancelar-patrocinador-fab">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Tu n\'as pas encore noté son WhatsApp. Enregistre-le une fois et ce bouton ouvrira directement sa discussion chaque fois que tu le toucheras.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nom</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre || "") + '" placeholder="Nom de ton parrain/ta marraine"></div>' +
    '<div class="field"><label>WhatsApp</label><input type="text" inputmode="numeric" data-draft-field="telefono" value="' + escapeHtml(d.telefono || "") + '" placeholder="Ex. 34600000000"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="guardar-patrocinador-fab">Enregistrer et lui écrire</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancelar-patrocinador-fab">Annuler</button>' +
    "</div></div>"
  );
}

function renderZoomModal(ui) {
  const d = ui.zoomDraft;
  if (!d) return "";
  const editing = !!ui.zoomEditId;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-zoom" data-dia="' + d.dia + '" data-arg="' + ui.zoomEditId + '">' +
      (ui.confirmDeleteZoom === ui.zoomEditId ? "Sûr ? Touche à nouveau pour supprimer" : "Supprimer la réunion") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-zoom"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier la réunion Zoom" : "Nouvelle réunion Zoom") + "</span>" +
    '<button class="icon-btn" data-action="cancel-zoom">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Titre</label><input type="text" data-draft-field="titulo" value="' + escapeHtml(d.titulo || "") + '" placeholder="Ex. Formation hebdomadaire de l\'équipe"></div>' +
    '<div class="field"><label>Heure</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Date (optionnel)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Laisse-la vide si c\'est ton Zoom de toutes les semaines. Ajoute une date si c\'est une réunion ponctuelle — par exemple, une à laquelle on vient de t\'inviter pour demain.</p></div>' +
    '<div class="field"><label>Lien de connexion</label><input type="text" inputmode="url" data-draft-field="enlace" value="' + escapeHtml(d.enlace || "") + '" placeholder="https://zoom.us/j/..."></div>' +
    recordatorioFieldHTML(d, "toggle-zoom-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-zoom">Enregistrer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-zoom">Annuler</button>' +
    "</div></div>"
  );
}

/* ---------------- Informe Semanal ---------------- */

const REGISTRO_TIPOS = [
  { id: "llamadas", label: "Appels", icon: "phone-call" },
  { id: "mensajes", label: "Messages d'invitation", icon: "message-circle" },
  { id: "presentaciones", label: "Présentations (Show the Plan)", icon: "book-open" },
  { id: "reuniones", label: "Réunions / consultations", icon: "users" },
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
    "• " + t.pvPlaneado + ": " + equipo.pvPlaneado.toLocaleString("fr") + " · " + t.pvVerificado + ": " + equipo.pvVerificado.toLocaleString("fr") +
    "\n\n" + t.cierreEquipo
  );
}

function idiomaInformeSelectorHTML(state) {
  return (
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("compass", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13px">Langue du message à partager</span></div>' +
    '<p class="muted small" style="margin-top:2px">Choisis la langue dans laquelle ton parrain recevra le rapport (elle peut être différente de la langue de ton app).</p>' +
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
    '<div style="font-weight:700;font-size:14px">Cette semaine (7 derniers jours)</div>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_TIPOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (semana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const idioma = state.idiomaInforme || "fr";
  const totalAcciones = semana.llamadas + semana.mensajes + semana.presentaciones + semana.reuniones;
  const compartirPersonal = totalAcciones > 0
    ? (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-primary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoPersonal(semana, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 16, color: "#fff" }) + " Partager mon rapport avec mon parrain</a>"
        : '<p class="muted small" style="margin-top:10px">Ajoute ton WhatsApp dans Paramètres pour pouvoir partager ton rapport.</p>')
    : '<p class="muted small" style="margin-top:10px">Enregistre au moins une action cette semaine pour pouvoir partager ton rapport.</p>';
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
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Rapport de mes partenaires</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">L\'état de ton réseau cette quinzaine — pour les conseiller, et pour partager avec ton propre parrain.</p>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Personnes dans mon réseau</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.total + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Vérifiés</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.verificados + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">En attente de vérification</div><div style="font-size:18px;font-weight:700;color:' + (equipo.pendientes > 0 ? "var(--warn)" : "var(--gold-light)") + '">' + equipo.pendientes + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">PV vérifié</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.pvVerificado.toLocaleString("fr") + "</div></div>" +
    "</div>" +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:12px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoEquipo(equipo, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Partager le rapport de mon équipe</a>"
      : "") +
    "</div>";

  return (
    sectionHeaderHTML("Rapport Hebdomadaire", "Enregistre tes actions jour après jour, et partage ta progression avec ton propre parrain — ainsi il t'aide à grandir.", "trending-up") +
    '<div><div style="font-weight:700;font-size:14px;margin-bottom:8px">Aujourd\'hui</div>' +
    '<div class="view-stack gap-sm">' + contadores + "</div></div>" +
    resumenSemana +
    idiomaSelector +
    compartirPersonal +
    equipoHtml
  );
}

/* ---------------- Mi Árbol Genealógico ---------------- */

function ascendenteRowHTML(a) {
  const waLink = a.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(a.telefono, a.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  const subLinea = [a.rango, a.pais].filter(function (v) { return v; }).join(" · ");
  return (
    '<div class="card roster-row" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(a.nombre || "Sans nom") + "</div>" +
    (subLinea ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(subLinea) + "</div>" : "") +
    (a.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(a.telefono) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-ascendente" data-arg="' + a.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-ascendente" data-arg="' + a.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (a.horarioNoMolestar ? '<div class="muted small" style="margin-top:6px;font-style:italic">Ne pas déranger : ' + escapeHtml(a.horarioNoMolestar) + "</div>" : "") +
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
    : '<p class="muted small" style="text-align:center;padding:20px 0">Tu n\'as encore ajouté personne de ta ligne ascendante.</p>';

  return (
    sectionHeaderHTML("Mon Arbre Généalogique", "Ton ID, ton parrain et ta ligne ascendante, toujours à portée de main.", "crown") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("user-badge", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Moi</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Ainsi, les leaders et affiliés de ton équipe peuvent consulter ton ID et ton mot de passe sans avoir à te les redemander chaque fois.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>ID Atomy</label><input type="text" data-field="arbolGenealogico.yo.atomyId" value="' + escapeHtml(yo.atomyId) + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field"><label>Mot de passe</label><input type="text" data-field="arbolGenealogico.yo.contrasena" value="' + escapeHtml(yo.contrasena) + '" placeholder="Ton mot de passe Atomy"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row between"><div class="row gap-2">' + Icon("crown", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Parrain</span></div>' + waPatrocinador + "</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Ses coordonnées et son Zoom — pour lui demander de l\'aide ou t\'inscrire aux formations de l\'entreprise, qui demandent souvent l\'ID de ton parrain.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Nom</label><input type="text" data-field="arbolGenealogico.patrocinador.nombre" value="' + escapeHtml(p.nombre) + '" placeholder="Nom complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-field="arbolGenealogico.patrocinador.atomyId" value="' + escapeHtml(p.atomyId) + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-field="arbolGenealogico.patrocinador.rango" value="' + escapeHtml(p.rango) + '" placeholder="Ex. Diamond Master"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Pays</label><input type="text" data-field="arbolGenealogico.patrocinador.pais" value="' + escapeHtml(p.pais) + '" placeholder="Ex. Colombie"></div>' +
    '<div class="field" style="flex:1"><label>Téléphone</label><input type="text" inputmode="tel" data-field="arbolGenealogico.patrocinador.telefono" value="' + escapeHtml(p.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Zoom</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomId" value="' + escapeHtml(p.zoomId) + '" placeholder="Optionnel"></div>' +
    '<div class="field" style="flex:1"><label>Mot de passe Zoom</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomContrasena" value="' + escapeHtml(p.zoomContrasena) + '" placeholder="Optionnel"></div>' +
    "</div>" +
    '<div class="field"><label>Horaire où il ne faut pas appeler</label><input type="text" data-field="arbolGenealogico.patrocinador.horarioNoLlamar" value="' + escapeHtml(p.horarioNoLlamar) + '" placeholder="Ex. Après 20h, ni le dimanche"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Ligne ascendante</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Les personnes au-dessus de ton parrain direct — utile si tu as besoin de leur soutien, ou de leur ID pour une formation.</p>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-ascendente">' + Icon("crown", { size: 16, color: "#fff" }) + " Ajouter un autre niveau au-dessus dans la ligne</button>" +
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
      (ui.confirmDeleteAscendente === d.id ? "Sûr ? Touche à nouveau pour supprimer" : "Supprimer la personne") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-ascendente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier la personne" : "Nouvelle personne de la ligne ascendante") + "</span>" +
    '<button class="icon-btn" data-action="cancel-ascendente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nom</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nom complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-draft-field="rango" value="' + escapeHtml(d.rango) + '" placeholder="Ex. Diamond Master"></div>' +
    '<div class="field" style="flex:1"><label>Pays</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Ex. Colombie"></div>' +
    "</div>" +
    '<div class="field"><label>Téléphone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field"><label>Horaire où il ne faut pas déranger</label><input type="text" data-draft-field="horarioNoMolestar" value="' + escapeHtml(d.horarioNoMolestar) + '" placeholder="Ex. Après 21h"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-ascendente">Enregistrer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-ascendente">Annuler</button>' +
    "</div></div>"
  );
}

/* ---------------- Llamadas S.O.S. ---------------- */

function sosRowHTML(s) {
  const waLink = s.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(s.telefono, s.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card roster-row" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(s.nombre || "Sans nom") + "</div>" +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Tu n\'as encore aucun contact S.O.S. enregistré.</p>';
  return (
    sectionHeaderHTML("Appels S.O.S.", "Des personnes que tu peux appeler pour obtenir du soutien, même si elles ne font pas partie de ta propre ligne.", "bell") +
    '<div class="card"><p class="small" style="line-height:1.6">Parfois l\'aide dont tu as besoin ne vient pas de ta généalogie directe — ça peut être un mentor d\'une autre équipe, un formateur de l\'entreprise, ou quelqu\'un de confiance expert dans un domaine. Enregistre ici qui appeler dans ces moments-là.</p></div>' +
    '<button class="btn-primary" data-action="add-sos">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Ajouter un contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderSOSModal(ui) {
  const d = ui.sosDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-sos" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSOS === d.id ? "Sûr ? Touche à nouveau pour supprimer" : "Supprimer le contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-sos"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier le contact" : "Nouveau contact S.O.S.") + "</span>" +
    '<button class="icon-btn" data-action="cancel-sos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nom</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nom complet"></div>' +
    '<div class="field"><label>Téléphone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="nota" placeholder="Pourquoi contacter cette personne ?">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-sos">Enregistrer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-sos">Annuler</button>' +
    "</div></div>"
  );
}

/* ---------------- Lista de Contactos (eventos en vivo) ---------------- */

function contactoEventoRowHTML(c) {
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "Sans nom") +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Tu n\'as encore aucun contact d\'événement enregistré.</p>';
  return (
    sectionHeaderHTML("Liste de Contacts", "Des personnes que tu as rencontrées lors de séminaires, conventions ou autres événements en direct — ce ne sont pas toujours encore des prospects.", "users") +
    '<button class="btn-primary" data-action="add-contacto-evento">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Ajouter un contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderContactoEventoModal(ui) {
  const d = ui.contactoEventoDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contacto-evento" data-arg="' + d.id + '">' +
      (ui.confirmDeleteContactoEvento === d.id ? "Sûr ? Touche à nouveau pour supprimer" : "Supprimer le contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto-evento"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier le contact" : "Nouveau contact") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto-evento">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nom</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nom complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Pays</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Ex. Colombie"></div>' +
    '<div class="field" style="flex:1"><label>Téléphone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    "</div>" +
    '<div class="field"><label>Observations</label><textarea rows="2" data-draft-field="observaciones" placeholder="Où tu l\'as rencontré, ses intérêts...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto-evento">Enregistrer</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto-evento">Annuler</button>' +
    "</div></div>"
  );
}

/* ---------------- Mi Rango ---------------- */

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
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Activité récente</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    '<div class="card" style="text-align:center;border:2px solid var(--gold)">' +
    medallionHTML(rango.icon, 84) +
    '<div class="muted small" style="margin-top:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;color:var(--gold)">Ton rang actuel</div>' +
    '<div style="font-size:20px;font-weight:700;margin-top:4px">' + escapeHtml(rango.nombre) + "</div>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Chemin de Maîtrise</div>' +
    '<div class="muted small" style="margin-bottom:12px">Touche le rang suivant quand tu l\'atteins.</div>' +
    '<div class="grid-3">' + botones + "</div>" +
    "</div>" +
    detalleRangoHTML(state, ui) +
    actividad
  );
}

/* ---------------- Mi Rango: detalle, meta y tarjeta de reconocimiento ---------------- */

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
      '<div class="row gap-2">' + Icon("sparkles", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Détail, objectif et carte de reconnaissance</span></div>' +
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
    if (dias > 0) metaTexto = "Il reste " + dias + (dias === 1 ? " jour" : " jours") + " pour ton objectif d'atteindre " + detalle.nombre + ".";
    else if (dias === 0) metaTexto = "Ton objectif d'atteindre " + detalle.nombre + " est aujourd'hui !";
    else metaTexto = "Ton objectif d'atteindre " + detalle.nombre + " est passé depuis " + Math.abs(dias) + (Math.abs(dias) === 1 ? " jour" : " jours") + " — mets-le à jour si tu veux continuer à l'utiliser comme rappel.";
  }

  const fotoInner = state.foto ? '<img src="' + escapeHtml(state.foto) + '" alt="Ta photo"/>' : Icon("camera", { size: 26 });

  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-detalle-rango">' +
    '<div class="row gap-2">' + Icon("sparkles", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Détail, objectif et carte de reconnaissance</span></div>' +
    clicaAquiBadgeHTML(true, "gold") +
    "</button>" +

    '<div class="muted small" style="margin-top:10px">Choisis le rang que tu veux voir :</div>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:6px">' + chipsDetalle + "</div>" +

    '<div style="text-align:center;margin-top:16px">' + medallionHTML(detalle.icon, 60) +
    '<div style="font-size:16px;font-weight:700;margin-top:8px">' + escapeHtml(detalle.nombre) + "</div>" +
    '<div class="muted small">Rang ' + (detalleIndex + 1) + " sur " + RANGOS_MASTER.length + "</div></div>" +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Pour atteindre ce rang</div>' +
    '<p class="small" style="line-height:1.5;margin-top:4px">' + escapeHtml(detalle.prerrequisito) + "</p>" +
    '<p class="muted small" style="line-height:1.5;margin-top:4px">' + escapeHtml(detalle.criterio) + "</p>" +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Ce que tu gagnes en l\'atteignant</div>' +
    '<div class="muted small" style="margin-top:2px">En ' + escapeHtml(paisInfo.label) + " · " + escapeHtml(NOTA_MONEDA_APROX) + "</div>" +
    montosHtml +
    paisSelectorHTML(state) +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Ton objectif pour ce rang</div>' +
    '<div class="field" style="margin-top:6px"><label>Date à laquelle tu veux l\'atteindre</label>' +
    '<input type="date" value="' + escapeHtml(meta.fecha || "") + '" data-field="metasRango.' + detalleIndex + '.fecha"></div>' +
    (metaTexto ? '<p class="small" style="margin-top:8px;font-weight:600;color:' + (dias != null && dias < 0 ? "var(--warn)" : "var(--gold-light)") + '">' + escapeHtml(metaTexto) + "</p>" : "") +
    (meta.fecha ? '<button class="link-btn small" style="margin-top:6px" data-action="limpiar-meta-rango" data-arg="' + detalleIndex + '">Retirer cet objectif</button>' : "") +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:18px">Carte de reconnaissance</div>' +
    '<div class="muted small" style="margin-top:2px">Ajoute ta photo et télécharge ta carte de ' + escapeHtml(detalle.nombre) + " pour la partager.</div>" +
    '<div style="display:flex;flex-direction:column;align-items:center;margin-top:12px">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="rango-foto-input">' + fotoInner + "</button>" +
    '<input id="rango-foto-input" type="file" accept="image/*" class="hidden" data-target="foto">' +
    '<span class="link-btn small" style="margin-top:6px">' + (state.foto ? "Changer la photo" : "Ajouter une photo") + "</span>" +
    "</div>" +
    '<div style="max-width:280px;margin:14px auto 0">' + rangoCardHTML(state.nombre, state.foto, detalleIndex) + "</div>" +
    '<div class="row gap-2" style="margin-top:14px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-tarjeta-rango" data-arg="' + detalleIndex + '">' + Icon("share2", { size: 15 }) + " Partager la carte</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="compartir-historia-rango" data-arg="' + detalleIndex + '">' + Icon("sparkles", { size: 15, color: "#fff" }) + " Partager comme story</button>" +
    "</div>" +
    '<p class="muted small" style="margin-top:8px;line-height:1.5">« Partager comme story » génère une image verticale festive, prête pour Instagram/Facebook/WhatsApp Stories — une fois là-bas, ces applications te permettent d\'ajouter de la musique, des autocollants ou du texte avant de publier.</p>' +
    "</div>"
  );
}

/* ---------------- Ajustes ---------------- */

function renderAjustes(state, ui) {
  const resetLabel = ui.confirmReset ? "Sûr ? Touche à nouveau pour réinitialiser" : "Réinitialiser ma progression";
  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Licence de cette copie</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">Cette copie de Cumbre Master est sous licence exclusive pour <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> et sa propre équipe. Elle n\'est pas autorisée à être partagée avec d\'autres leaders ou équipes.</p>' +
      "</div>"
    : "";
  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Notifications du navigateur</div><div class="muted small" style="margin-top:2px">Alertes de ton Agenda Hebdomadaire et du rythme de PV</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  return (
    sectionHeaderHTML("Paramètres", "", "settings") +
    licenciaCard +
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">WhatsApp de ton parrain/ta marraine</label>' +
    '<p class="muted small" style="margin-top:-2px;margin-bottom:8px;line-height:1.5">Le bouton vert flottant lui écrit directement à ce numéro.</p>' +
    '<input type="text" inputmode="numeric" placeholder="Ex. 573000000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>' +
    notifRow +
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("download", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Copie de sauvegarde</span></div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Toutes tes données (Réunion de Focus, Arbre Généalogique, ta progression) vivent uniquement sur cet appareil. Télécharge une sauvegarde et garde-la où tu veux (ton Google Drive, e-mail, etc.) — ainsi tu ne la perds pas si tu changes de téléphone ou effaces les données du navigateur.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-respaldo">' + Icon("download", { size: 15 }) + " Télécharger la sauvegarde</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="importar-respaldo-input">' + Icon("repeat", { size: 15 }) + " Restaurer depuis un fichier</button>" +
    "</div>" +
    '<input id="importar-respaldo-input" type="file" accept="application/json,.json" class="hidden" data-target="__importBackup">' +
    "</div>" +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}
