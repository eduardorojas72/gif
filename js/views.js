/* ---------------------------------------------------------------
   VUES — chaque fonction renvoie une chaîne HTML pour #view-container
   (ou pour les zones fixes : en-tête, menu latéral, menu, fab, modales)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Accueil", icon: "home" },
  { id: "escenario", label: "Scénario de Vie", icon: "compass" },
  { id: "perfil", label: "Mon Profil", icon: "user-badge" },
  { id: "pasos", label: "Les 8 Étapes", icon: "footprints" },
  { id: "lema", label: "La Devise d'Atomy", icon: "heart" },
  { id: "contactos", label: "Liste de 250", icon: "users" },
  { id: "plan6", label: "Plan de 6 Jours", icon: "trail-map" },
  { id: "plan90", label: "Plan de 90 Jours", icon: "mountain-flag" },
  { id: "premios", label: "Récompenses", icon: "gift" },
  { id: "logros", label: "Succès", icon: "award" },
  { id: "ajustes", label: "Réglages", icon: "settings" },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 20) return "Bon après-midi";
  return "Bonsoir";
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

/* ---------------- Bienvenue / Accueil initial ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen">' +
    mountainMarkHTML(64, true) +
    '<h1 style="margin-top:22px;font-size:30px;font-weight:700;letter-spacing:-.02em">Cumbre 90</h1>' +
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">Les 8 Étapes vers le Succès</p>' +
    '<p class="muted" style="margin-top:22px;max-width:300px;font-size:15px;line-height:1.6">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Commencer mon parcours ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
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
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Changer la photo" : "Ajouter une photo (facultatif)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">Comment t\'appelles-tu ?</h2>' +
    '<p class="muted small" style="margin-top:4px">Cela nous permet de personnaliser ton parcours.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Ton prénom" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Commencer ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    "</div>"
  );
}

/* ---------------- En-tête / Menu latéral / Menu ---------------- */

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
  const items = MENU_ITEMS.map(function (it) {
    const active = ui.view === it.id;
    return (
      '<button class="sidebar-item' + (active ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      Icon(it.icon, { size: 20 }) + "<span>" + it.label + "</span></button>"
    );
  }).join("");
  return (
    '<div class="sidebar">' +
    '<div class="sidebar-logo">' + mountainMarkHTML(26, true) + "</div>" +
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
    '<div class="menu-head"><div class="row gap-2">' + mountainMarkHTML(18) + '<span style="font-weight:700;font-size:14px">CUMBRE 90</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + "</div>" +
    "</div></div>"
  );
}

/* ---------------- rappels / cloche ---------------- */

function getReminders(state) {
  const out = [];
  const inact = diasInactivo(state.ultimaFecha);
  if (inact >= 2) {
    out.push({ text: "Tu n'as pas avancé depuis " + inact + " jours. Reprends ton parcours quand tu peux — chaque étape compte." });
  }
  const llamada = state.dias[5] && state.dias[5].fields && state.dias[5].fields.llamada;
  if (llamada && llamada.trim()) {
    out.push({ text: "N'oublie pas ton appel hebdomadaire avec ton mentor : " + llamada.trim() + "." });
  }
  const hoy = hoyISO();
  (state.contactos || []).forEach(function (c) {
    if (c.proximoSeguimiento && c.proximoSeguimiento <= hoy && c.estado !== "Écarté") {
      const vencido = c.proximoSeguimiento < hoy;
      out.push({
        text: (vencido ? "Suivi en retard : " : "Suivi aujourd'hui : ") + c.nombre + (c.notaSeguimiento ? " — " + c.notaSeguimiento : ""),
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
        return (
          '<div class="row gap-2" style="align-items:flex-start;text-align:left;padding:10px 0;border-top:1px solid var(--border)">' +
          Icon("bell", { size: 15, color: "var(--accent)" }) +
          '<span class="small" style="color:var(--text);flex:1">' + escapeHtml(r.text) + "</span>" +
          waBtn +
          "</div>"
        );
      }).join("") +
      (reminders.some(function (r) { return r.contactoId; })
        ? '<button class="link-btn small" style="margin-top:8px" data-action="goto" data-arg="contactos">Voir la Liste de 250 →</button>'
        : "")
    : '<p class="muted small" style="margin-top:8px">Tout est à jour — tu n\'as aucun rappel en attente.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Rappels</span>' +
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
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("user-badge", { size: 16, color: "#1B1338" }) + " Voir mon insigne</button>"
      : logro.tipo === "cumbre"
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("award", { size: 16, color: "#1B1338" }) + " Voir le certificat</button>"
      : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card logro-modal">' +
    Icon("award", { size: 46, color: "var(--gold)" }) +
    '<div class="logro-modal-eyebrow">J\'ai obtenu le succès</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Partage-le — c\'est une excellente façon de susciter des questions sur ce dont il s\'agit 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    actionBtn +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">' + (actionBtn ? "Fermer" : "Super, continuer") + "</button>" +
    "</div></div>"
  );
}

/* ---------------- Accueil ---------------- */

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

  let mensaje = "Continue, chaque étape compte !";
  if (pctGeneral === 0) mensaje = "Ton parcours commence aujourd'hui. En route !";
  else if (pctGeneral === 100) mensaje = "Tu as terminé tout ce qui était disponible ! Continue ainsi.";
  else if (pctGeneral >= 70) mensaje = "Tu es presque au Sommet, ne relâche pas l'effort.";

  const chips = DIAS.map(function (d) { return '<div class="seg' + (state.dias[d.id].done ? " on" : "") + '"></div>'; }).join("");

  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Ta photo"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  const proximosHtml = proximos.length
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">À venir</span></div>' +
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
      '<button class="link-btn small" style="margin-top:12px" data-action="goto" data-arg="logros">Voir tous les succès →</button>' +
      "</div>"
    : "";

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(RANGOS[state.rangoIndex].nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Salut, ' + escapeHtml(state.nombre || "partenaire") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Bienvenue sur Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">6 Étapes · 6 Camps · Accès illimité</div>' +
    '<div class="chip-row" style="margin-top:16px">' + chips + "</div>" +
    '<div class="row between" style="margin-top:16px"><span class="muted small">' + (etapasHechas + campamentosHechos) + "/" + totalPasos + ' jalons atteints</span><span style="font-size:24px;font-weight:700">' + pctGeneral + "%</span></div>" +
    '<div class="progressbar" style="margin-top:8px"><div style="width:' + pctGeneral + '%"></div></div>' +
    '<div class="muted small" style="margin-top:12px">' + mensaje + "</div>" +
    "</div>" +

    escenarioVidaHomeCardHTML(state) +

    proximosHtml +

    mountainSceneHTML(quincenasMap, cumbreLograda, 190).replace('<div class="mountain-wrap">', '<button class="mountain-wrap card-hover" data-action="goto" data-arg="plan90" style="cursor:pointer">').replace(/<\/div>$/, '</button>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="pasos">' + pasosHeaderMedallionHTML(44) + '<div class="nc-body"><div class="nc-title">Les 8 Étapes vers le Succès</div><div class="nc-desc">Ta référence permanente</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="lema">' + medallionHTML("heart", 44) + '<div class="nc-body"><div class="nc-title">La Devise d\'Atomy</div><div class="nc-desc">Philosophie et code d\'éthique</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="contactos">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Liste de 250 Contacts</div><div class="nc-desc">' + (state.contactos || []).length + ' enregistrés · programmer des suivis</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan6">' + medallionHTML("trail-map", 44) + '<div class="nc-body"><div class="nc-title">Plan de Démarrage — 6 Jours</div><div class="nc-desc">Parcours ta carte jour après jour</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="premios">' + medallionHTML("gift", 44) + '<div class="nc-body"><div class="nc-title">Récompenses de ton parrain</div><div class="nc-desc">Découvre ce que tu peux gagner</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +

    (cumbreLograda
      ? '<button class="btn-primary" style="background:var(--success)" data-action="goto" data-arg="cumbre">' + Icon("award", { size: 18, color: "#fff" }) + ' Tu as atteint le Sommet ! Voir le succès</button>'
      : "")
  );
}

/* ---------------- Scénario de Vie ---------------- */

function escenarioVidaHomeCardHTML(state) {
  const esc = state.escenarioVida;
  const iniciadas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance > 0 || ((esc[c.id] || {}).meta || "").trim(); }).length;
  const completas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance === 4; }).length;

  if (state.escenarioCompletado) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--gold);background:var(--accent-soft)" data-action="goto" data-arg="escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Scénario de Vie</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">🏆 Cercle parfait ! Tu as atteint tes 8 objectifs.</div>' +
      '<div class="muted small" style="margin-top:2px">Touche pour les revoir ou te fixer des objectifs plus grands.</div>' +
      "</button>"
    );
  }
  if (iniciadas === 0) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--accent)" data-action="goto" data-arg="escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Avant de commencer</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">Définis ton Scénario de Vie — ton « pourquoi »</div>' +
      '<div class="muted small" style="margin-top:2px">C\'est la première étape de l\'Étape 1. Détermine tes rêves dans 8 domaines de ta vie avant d\'avancer.</div>' +
      "</button>"
    );
  }
  const pct = Math.round((completas / ESCENARIO_CATEGORIAS.length) * 100);
  return (
    '<button class="card card-hover" style="text-align:left;width:100%" data-action="goto" data-arg="escenario">' +
    '<div class="row between"><div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Scénario de Vie</span></div>' +
    '<span class="muted small">' + completas + "/" + ESCENARIO_CATEGORIAS.length + "</span></div>" +
    '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 4) + '%"></div></div>' +
    '<div class="muted small" style="margin-top:8px">Continue à compléter tes objectifs jusqu\'à atteindre le cercle parfait.</div>' +
    "</button>"
  );
}

function escenarioCategoriaHTML(cat, esc) {
  const data = esc[cat.id] || { meta: "", avance: 0 };
  const dots = [1, 2, 3, 4].map(function (lvl) {
    const on = lvl <= data.avance;
    return '<button class="avance-dot' + (on ? " on" : "") + '" data-action="set-escenario-avance" data-cat="' + cat.id + '" data-arg="' + lvl + '" aria-label="Niveau ' + lvl + '"></button>';
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

function renderEscenarioVida(state) {
  const esc = state.escenarioVida;
  const completas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance === 4; }).length;
  const cards = ESCENARIO_CATEGORIAS.map(function (c) { return escenarioCategoriaHTML(c, esc); }).join("");
  const pasos = "<ol style=\"margin:0;padding-left:18px\">" + ESCENARIO_PASOS.map(function (p) { return '<li class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(p) + "</li>"; }).join("") + "</ol>";

  return (
    sectionHeaderHTML("Scénario de Vie", ESCENARIO_LEMA, "compass") +
    '<div class="card"><p class="small" style="line-height:1.6">' + escapeHtml(ESCENARIO_INTRO) + "</p></div>" +
    '<div class="card" style="text-align:center">' +
    escenarioRadarSVG(ESCENARIO_CATEGORIAS, esc) +
    '<div class="muted small" style="margin-top:6px">' + completas + " sur " + ESCENARIO_CATEGORIAS.length + " objectifs dans le cercle parfait</div>" +
    "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">Comment le remplir ?</div>' + pasos + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>"
  );
}

/* ---------------- Les 8 Étapes ---------------- */

function renderPasos(ui) {
  const vueltos = ui.pasosVueltos || {};
  const cards = OCHO_PASOS.map(function (p) {
    const flipped = !!vueltos[p.n];
    const front =
      '<div class="flip-face flip-front">' +
      pasoMedallionHTML(p.icon, 68) +
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Étape ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="line-height:1.45;margin-top:4px;max-width:44ch">' + escapeHtml(p.d) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Touche pour voir l\'explication complète</span></div>' +
      "</div>";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Étape " + p.n + " — " + escapeHtml(p.t) + "</div>" +
      '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
      '<span class="badge soft">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + "</span>" +
      '<span class="badge gold">' + Icon("sparkles", { size: 11 }) + " " + escapeHtml(p.objetivo) + "</span>" +
      "</div>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Explication détaillée</div>' +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + escapeHtml(p.explicacion) + "</p>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Exemples pratiques</div>' +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + escapeHtml(p.ejemplo) + "</p>" +
      "</div>";
    return (
      '<button class="flip-card' + (flipped ? " is-open" : "") + '" data-action="flip-paso" data-arg="' + p.n + '">' +
      '<div class="flip-inner' + (flipped ? " flipped" : "") + '">' + front + back + "</div>" +
      "</button>"
    );
  }).join("");
  const header =
    '<div class="section-header">' + pasosHeaderMedallionHTML(64) +
    '<div><h2>Les 8 Étapes vers le Succès</h2><p>D\'après l\'enseignement du Président Han-Gill Park. Touche chaque étape pour voir l\'explication complète.</p></div></div>';
  return header +
    '<div class="view-stack gap-sm">' + cards + "</div>";
}

/* ---------------- La Devise d'Atomy ---------------- */

function renderLema(ui) {
  const vueltos = ui.lemaVueltos || {};
  const cards = LEMA_ATOMY.pilares.map(function (p) {
    const flipped = !!vueltos[p.n];
    const front =
      '<div class="flip-face flip-front">' +
      medallionHTML(p.icon, 68) +
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Pilier ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      (p.sub ? '<div class="muted small" style="font-style:italic;margin-top:2px">' + escapeHtml(p.sub) + "</div>" : "") +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Touche pour voir l\'explication complète</span></div>' +
      "</div>";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Pilier " + p.n + " — " + escapeHtml(p.t) + "</div>" +
      (p.sub ? '<div class="muted small" style="font-style:italic;margin-top:4px">' + escapeHtml(p.sub) + "</div>" : "") +
      '<p style="font-size:13px;line-height:1.55;margin-top:14px">' + escapeHtml(p.explicacion) + "</p>" +
      "</div>";
    return (
      '<button class="flip-card' + (flipped ? " is-open short" : "") + '" data-action="flip-lema" data-arg="' + p.n + '">' +
      '<div class="flip-inner' + (flipped ? " flipped" : "") + '">' + front + back + "</div>" +
      "</button>"
    );
  }).join("");
  const header =
    '<div class="section-header">' + medallionHTML("heart", 64) +
    '<div><h2>La Devise d\'Atomy</h2><p>Philosophie d\'Entreprise et Code d\'Éthique — Président Han-Gill Park. Touche chaque pilier pour voir l\'explication complète.</p></div></div>';
  const intro = '<p class="muted small" style="line-height:1.6;margin-top:-4px">' + escapeHtml(LEMA_ATOMY.intro) + "</p>";
  const exclamacion =
    '<div class="card" style="margin-top:14px;text-align:center;border-color:var(--gold)">' +
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--gold)">Cri Officiel de la Devise</div>' +
    '<p style="font-size:14px;line-height:1.6;margin-top:6px;font-weight:600">' + escapeHtml(LEMA_ATOMY.exclamacion) + "</p></div>";
  return header + intro +
    '<div class="view-stack gap-sm" style="margin-top:14px">' + cards + "</div>" +
    exclamacion;
}

/* ---------------- Plan de 6 jours — carte ---------------- */

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

  return sectionHeaderHTML("Plan de Démarrage — 6 Jours", "Gravis la carte et conquiers chaque étape.", "trail-map") +
    heroMountainHTML(overlay);
}

function renderDiaDetalle(state, diaId) {
  const dia = DIAS.find(function (d) { return d.id === diaId; });
  const est = state.dias[diaId];
  const allChecked = est.checks.every(Boolean);

  const nota = dia.nota ? '<div class="card" style="background:var(--accent-soft);border:none;font-size:14px;line-height:1.55">' + escapeHtml(dia.nota) + "</div>" : "";

  const contenido = (dia.contenido || []).length
    ? '<div class="view-stack gap-sm">' +
      (dia.contenido || []).map(function (sec) {
        return (
          '<div class="card">' +
          '<div style="font-weight:700;font-size:14px;color:var(--gold-light);margin-bottom:8px">' + escapeHtml(sec.h) + "</div>" +
          sec.body.map(function (p) { return '<p class="muted small" style="line-height:1.55;margin-top:6px">' + escapeHtml(p) + "</p>"; }).join("") +
          "</div>"
        );
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
      '<button class="btn-secondary" style="width:fit-content;padding:9px 14px" data-action="share-day" data-arg="' + diaId + '">' + Icon("share2", { size: 14 }) + " Partager comme une carte</button>" +
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
    ? '<div class="row gap-2 small" style="color:var(--success);font-weight:600;margin-top:10px">' + Icon("check", { size: 14 }) + " Bonne réponse ! Une étape de plus conquise.</div>"
    : (est.quizSel !== null && est.quizSel !== undefined
      ? '<div class="muted small" style="margin-top:10px">Pas de souci, réessaie quand tu veux — il n\'y a pas de limite d\'essais.</div>'
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

  const finishLabel = est.done ? "Jour conquis " + Icon("award", { size: 18, color: "#fff" }) : "Conquérir ce jour";
  const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
  const finishDisabled = !allChecked || est.done;

  return (
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-map">' + Icon("chevron-left", { size: 16 }) + " Carte du parcours</button>" +
    '<div>' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Étape ' + dia.id + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(dia.etapa) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(dia.titulo) + "</p>" +
    '<p class="muted" style="font-size:13.5px;margin-top:6px;font-style:italic">' + escapeHtml(dia.objetivo) + "</p>" +
    "</div>" +
    nota + contenido + campos +
    '<div class="card">' +
    '<div class="row gap-2" style="font-weight:600;font-size:14px;margin-bottom:12px">' + Icon("sparkles", { size: 15, color: "var(--gold)" }) + " Petite question de révision</div>" +
    '<div style="font-size:14px;margin-bottom:12px">' + escapeHtml(dia.quiz.pregunta) + "</div>" +
    '<div style="display:flex;flex-direction:column;gap:8px">' + opciones + "</div>" +
    quizFeedback +
    "</div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Missions du Jour ' + dia.id + "</div>" + checklist + "</div>" +
    '<button class="btn-primary" style="' + finishStyle + '" ' + (finishDisabled ? "disabled" : "") + ' data-action="finish-day" data-arg="' + diaId + '">' + finishLabel + "</button>"
  );
}

/* ---------------- Plan de 90 jours ---------------- */

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
      '<div class="badge ' + (done ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (done ? "Terminée" : "Sem. " + q.semanas) + "</div>" +
      "</div>" +
      '<div class="tile-body"><div class="tile-title">' + escapeHtml(q.nombre) + '</div><div class="tile-sub">' + escapeHtml(q.foco) + "</div>" + premioHtml + "</div>" +
      "</button>"
    );
  }).join("");

  const banner = cumbreLograda
    ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:500">🏔️ Tu as terminé les 6 quinzaines ! Va sur l\'écran du Sommet pour célébrer ton succès.</div>'
    : "";

  return sectionHeaderHTML("Plan de 90 Jours", "Ta route vers le rang Sales Master, quinzaine après quinzaine.", "mountain-flag") +
    mountainSceneHTML(quincenasMap, cumbreLograda, 170) +
    '<div class="grid-2">' + tiles + "</div>" +
    banner;
}

function renderQuincenaDetalle(state, qn) {
  const q = QUINCENAS.find(function (x) { return x.n === qn; });
  const semanas = SEMANAS.filter(function (s) { return s.q === qn; });
  const qDone = semanas.every(function (s) { return state.semanas[s.n] && state.semanas[s.n].done; });

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
    const finishLabel = est.done ? "Semaine terminée " + Icon("check", { size: 16, color: "#fff" }) : "Marquer la semaine comme terminée";
    const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
    return (
      '<div class="card">' +
      '<div class="row between"><span style="font-weight:700;font-size:14px">Semaine ' + s.n + "</span>" + (est.done ? '<span class="badge success">Terminée</span>' : "") + "</div>" +
      '<div class="muted small" style="margin-top:6px">Objectif PV : <b style="color:var(--text)">' + escapeHtml(s.metaPV) + "</b></div>" +
      '<div class="muted small">Objectif contacts : <b style="color:var(--text)">' + escapeHtml(s.metaContactos) + "</b></div>" +
      '<div class="muted small" style="margin-top:2px;font-style:italic">' + escapeHtml(s.paso) + "</div>" +
      '<div style="margin-top:12px">' + checklist + "</div>" +
      '<button class="btn-primary" style="margin-top:14px;' + finishStyle + '" ' + (!allChecked || est.done ? "disabled" : "") + ' data-action="finish-semana" data-arg="' + s.n + '">' + finishLabel + "</button>" +
      "</div>"
    );
  }).join("");

  return (
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-quincenas">' + Icon("chevron-left", { size: 16 }) + " Plan de 90 jours</button>" +
    "<div>" +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Quinzaine ' + q.n + " · Semaines " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>" +
    semanasHtml +
    (qDone ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:600">🏕️ Quinzaine terminée !</div>' : "")
  );
}

/* ---------------- Récompenses du parrain ---------------- */

function renderPremios(state) {
  const quincenasMap = derivarQuincenas(state);
  const desc = state.mentorMode ? "Mode parrain : modifie les récompenses de ton équipe." : "Voici ce que tu peux gagner grâce à tes succès.";
  const tiles = state.premios.map(function (p, i) {
    const desbloqueado = !!quincenasMap[i + 1];
    const media = p.imagen ? '<img src="' + p.imagen + '" alt="' + escapeHtml(p.premio) + '"/>' : Icon("gift", { size: 30, color: "#fff" });
    const uploadBtn = state.mentorMode
      ? '<label class="icon-btn" style="position:absolute;bottom:8px;right:8px;width:28px;height:28px;border-radius:999px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer">' +
        Icon("image-plus", { size: 14, color: "#fff" }) +
        '<input type="file" accept="image/*" class="hidden" data-target="premios.' + i + '.imagen"></label>'
      : "";
    const body = state.mentorMode
      ? '<div class="field-inline" style="display:flex;flex-direction:column;gap:6px">' +
        '<input type="text" placeholder="Jalon" value="' + escapeHtml(p.hito) + '" data-field="premios.' + i + '.hito">' +
        '<input type="text" placeholder="Récompense" style="color:var(--accent);font-weight:600" value="' + escapeHtml(p.premio) + '" data-field="premios.' + i + '.premio">' +
        "</div>"
      : '<div class="muted small">' + escapeHtml(p.hito) + '</div><div style="font-size:14px;font-weight:700;margin-top:2px">' + escapeHtml(p.premio) + "</div>";
    return (
      '<div class="tile' + (desbloqueado ? " unlocked" : "") + '">' +
      gemCornersHTML() +
      '<div class="tile-media" style="background:' + (p.imagen ? "transparent" : "radial-gradient(circle at 30% 20%, var(--accent-soft), var(--accent))") + '">' +
      media +
      '<div class="badge ' + (desbloqueado ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (desbloqueado ? "Terminé" : "À obtenir") + "</div>" +
      uploadBtn +
      "</div>" +
      '<div class="tile-body">' + body + "</div>" +
      "</div>"
    );
  }).join("");

  return sectionHeaderHTML("Récompenses de ton parrain", desc, "gift") +
    '<div class="grid-2">' + tiles + "</div>" +
    '<p class="muted small" style="line-height:1.5">Les succès sont validés par toi-même dans l\'application. Ton parrain vérifiera le jalon (par exemple, avec une capture d\'écran que tu lui envoies sur WhatsApp) avant de te remettre la récompense.</p>';
}

/* ---------------- Profil ---------------- */

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
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Activité récente</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    recogCardHTML(state.nombre, state.foto, rango.nombre, rango.pv, state.rangoIndex) +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="perfil-file">' + Icon("camera", { size: 15 }) + " " + (state.foto ? "Changer la photo" : "Ajouter une photo") + "</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="download-recog-card">' + Icon("download", { size: 15, color: "#fff" }) + " Partager</button>" +
    '<input id="perfil-file" type="file" accept="image/*" class="hidden" data-target="foto">' +
    "</div>" +
    '<div class="text-center muted small" style="margin-top:-8px">🔥 ' + state.racha + " " + (state.racha === 1 ? "jour de suite" : "jours de suite") + "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Ton rang</div>' +
    '<div class="muted small" style="margin-bottom:12px">Touche l\'insigne du rang que tu détiens actuellement chez Atomy.</div>' +
    '<div class="grid-3">' + rangoButtons + "</div>" +
    '<div class="card" style="margin-top:12px;padding:14px"><div style="font-size:14px;font-weight:600">' + escapeHtml(rango.nombre) + '</div><div class="muted small" style="margin-top:2px">' + escapeHtml(rango.meta) + "</div></div>" +
    "</div>" +
    actividad
  );
}

/* ---------------- Succès ---------------- */

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

  return sectionHeaderHTML("Panneau des Succès", logrosHechos + " sur " + totalLogros + " jalons conquis", "award") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Étapes du Plan de 6 Jours</div><div class="grid-3">' + etapas + "</div></div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Camps du Plan de 90 Jours</div><div class="grid-3">' + camps + "</div></div>" +
    (state.premios.length ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Récompenses de ton parrain</div><div class="grid-3">' + premios + "</div></div>" : "") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Succès final</div><div class="grid-3">' + logroChipHTML("Sales Master — le Sommet", cumbreLograda, "mountain-flag") + "</div></div>";
}

/* ---------------- Sommet ---------------- */

function renderCumbre(state) {
  const codigo = state.codigoCumbre || "C90-000000";
  return (
    '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;padding-top:20px">' +
    Icon("award", { size: 56, color: "var(--gold)" }) +
    '<h2 style="font-size:22px;font-weight:700">Tu as atteint le Sommet, ' + escapeHtml(state.nombre) + " !</h2>" +
    '<p class="muted" style="font-size:14px;max-width:300px;line-height:1.6">Tu as terminé ton Plan de 90 Jours et tu t\'es qualifié pour le rang de Sales Master. Dans les prochaines semaines, tu recevras chez toi, par courrier postal, une Lettre du Directeur d\'Atomy envoyée depuis la Corée.</p>' +
    '<div class="card" style="border:2px solid var(--gold);width:100%;text-align:left">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em">Certificat</div>' +
    '<div style="font-size:15px;font-weight:700;margin-top:4px">Tu as terminé Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">Code ' + codigo + "</div>" +
    '<button class="btn-primary" style="background:var(--gold);margin-top:16px" data-action="download-cert">Télécharger le certificat</button>' +
    "</div>" +
    '<div class="card muted small" style="width:100%">Tu n\'es pas seul dans ce parcours — célèbre-le avec ton parrain et prépare-toi à accompagner ton premier partenaire sur ce même chemin.</div>' +
    "</div>"
  );
}

/* ---------------- Réglages ---------------- */

function renderAjustes(state, ui) {
  const whatsappField = state.mentorMode
    ? '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">WhatsApp de contact (parrain)</label>' +
      '<input type="text" inputmode="numeric" placeholder="Ex. 34600000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>'
    : "";

  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Notifications du navigateur</div><div class="muted small" style="margin-top:2px">Alertes de rappel en dehors de l\'application</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  const resetLabel = ui.confirmReset ? "Tu es sûr ? Touche à nouveau pour réinitialiser" : "Réinitialiser ma progression";

  return (
    sectionHeaderHTML("Réglages", "", "settings") +
    '<div class="card row between">' +
    '<div><div style="font-size:14px;font-weight:600">Mode parrain</div><div class="muted small" style="margin-top:2px">Modifie les récompenses de ton équipe</div></div>' +
    '<div class="toggle' + (state.mentorMode ? " on" : "") + '" data-action="toggle-mentor"><div class="knob"></div></div>' +
    "</div>" +
    whatsappField +
    notifRow +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}

/* ---------------- Liste de 250 Contacts (CRM) ---------------- */

function contactoNivelBadge(nivel) {
  const cls = nivel === "Chaud" ? "warn" : nivel === "Tiède" ? "gold" : "soft";
  return '<span class="badge ' + cls + '">' + escapeHtml(nivel) + "</span>";
}

function renderContactos(state, ui) {
  const contactos = state.contactos || [];
  const filtro = ui.contactoFiltro || "tous";
  const hoy = hoyISO();

  const counts = { Chaud: 0, Tiède: 0, Froid: 0 };
  contactos.forEach(function (c) { if (counts[c.nivel] != null) counts[c.nivel]++; });

  const filterBtns = ["tous"].concat(CONTACTO_NIVELES).map(function (f) {
    const active = filtro === f;
    const label = f === "tous" ? "Tous · " + contactos.length : f + " · " + counts[f];
    return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="filter-contactos" data-arg="' + f + '">' + label + "</button>";
  }).join(" ");

  const filtered = filtro === "tous" ? contactos : contactos.filter(function (c) { return c.nivel === filtro; });
  const sorted = filtered.slice().sort(function (a, b) {
    const av = a.proximoSeguimiento || "9999-99-99";
    const bv = b.proximoSeguimiento || "9999-99-99";
    if (av !== bv) return av < bv ? -1 : 1;
    return (a.nombre || "").localeCompare(b.nombre || "");
  });

  const rows = sorted.length
    ? sorted.map(function (c) {
        const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
        const esHoy = c.proximoSeguimiento === hoy;
        const fechaTxt = c.proximoSeguimiento ? (vencido ? "En retard · " : esHoy ? "Aujourd'hui · " : "") + c.proximoSeguimiento : "Aucun suivi prévu";
        const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
        const waLink = c.telefono
          ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
          : "";
        return (
          '<div class="card contact-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
          '<div class="row between" style="align-items:flex-start">' +
          '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre) + "</div>" +
          '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "Pas de téléphone") + (c.pais ? " · " + escapeHtml(c.pais) : "") + "</div></div>" +
          contactoNivelBadge(c.nivel) +
          "</div>" +
          '<div class="row between" style="margin-top:10px;align-items:center">' +
          '<span class="small" style="font-weight:600' + (c.estado === "Première Commande" ? ";color:var(--gold-light)" : "") + '">' + escapeHtml(c.estado) + "</span>" +
          '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
          "</div>" +
          (c.notaSeguimiento ? '<div class="muted small" style="margin-top:4px;font-style:italic">« ' + escapeHtml(c.notaSeguimiento) + ' »</div>' : "") +
          '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="3">+3 jours</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="7">+1 sem.</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="30">+1 mois</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="60">+2 mois</button>' +
          waLink +
          '<button class="icon-btn" data-action="edit-contacto" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
          "</div>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">Tu n\'as encore aucun contact enregistré. Touche « + Nouveau contact » pour commencer ta Liste de 250.</p>';

  return (
    sectionHeaderHTML("Liste de 250 Contacts", contactos.length + " sur 250 enregistrés", "users") +
    '<input id="contacto-search" type="text" placeholder="Rechercher par nom ou téléphone..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<button class="btn-primary" data-action="add-contacto">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Nouveau contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
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
      (ui.confirmDeleteContacto === ui.contactoEditId ? "Tu es sûr ? Touche à nouveau pour supprimer" : "Supprimer le contact") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Modifier le contact" : "Nouveau contact") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nom</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nom complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Téléphone</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+33 6 00 00 00 00"></div>' +
    '<div class="field" style="flex:1"><label>Pays</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Pays"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Niveau</label><select data-draft-field="nivel" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + nivelOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Statut</label><select data-draft-field="estado" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Notes</label><textarea rows="2" data-draft-field="notas" placeholder="Comment tu l\'as connu, ses centres d\'intérêt...">' + escapeHtml(d.notas) + "</textarea></div>" +
    '<div class="field"><label>Prochain suivi</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="3">+3 jours</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="7">+1 semaine</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="30">+1 mois</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="60">+2 mois</button>' +
    "</div>" +
    '<div class="field"><label>Note de suivi</label><input type="text" data-draft-field="notaSeguimiento" value="' + escapeHtml(d.notaSeguimiento || "") + '" placeholder="Ex. Appeler pour connaître sa décision"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto">Enregistrer le contact</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto">Annuler</button>' +
    "</div></div>"
  );
}
