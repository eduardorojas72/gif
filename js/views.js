/* ---------------------------------------------------------------
   VISTAS — cada función devuelve un string HTML para #view-container
   (o para las regiones fijas: header, sidebar, menú, fab, modales)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Start", icon: "home" },
  { id: "perfil", label: "Mein Profil", icon: "user-badge" },
  { id: "plan6", label: "9-Tage-Plan", icon: "trail-map" },
  { id: "pasos", label: "Die 8 Schritte", icon: "footprints" },
  { id: "contactos", label: "Liste der 250", icon: "users" },
  { id: "clientes", label: "Kunden", icon: "package" },
  { id: "agenda", label: "Wochenplan", icon: "calendar" },
  { id: "informe", label: "Wochenbericht", icon: "trending-up" },
  { id: "enfoque", label: "Fokus-Treffen", icon: "target" },
  { id: "plan90", label: "90-Tage-Plan", icon: "mountain-flag" },
  { id: "recursos", label: "Audiovisuelle Ressourcen", icon: "video" },
  { id: "arbol", label: "Mein Stammbaum", icon: "crown" },
  { id: "socios", label: "Meine Partner", icon: "users" },
  { id: "sos", label: "S.O.S.-Anrufe", icon: "bell" },
  { id: "eventos", label: "Kontaktliste", icon: "users" },
  { id: "lema", label: "Das Atomy-Motto", icon: "heart" },
  { id: "premios", label: "Prämien", icon: "gift" },
  { id: "logros", label: "Erfolge", icon: "award" },
  { id: "ajustes", label: "Einstellungen", icon: "settings" },
];

// Orden del menú lateral de escritorio, en 2 columnas: la primera agrupa el
// recorrido del negocio (entrenamiento y medios), la segunda el resto
// (perfil, contactos/equipo y ajustes). El menú móvil (menú sheet) usa
// MENU_ITEMS en su orden original, sin verse afectado por esto.
const SIDEBAR_COLUMNAS = [
  ["home", "plan6", "pasos", "agenda", "informe", "enfoque", "lema", "plan90", "recursos", "premios"],
  ["perfil", "contactos", "clientes", "arbol", "socios", "sos", "eventos", "logros", "ajustes"],
];

const TOUR_PASOS = [
  { icon: "compass", titulo: "Willkommen bei Cumbre 90!", texto: "Diese kurze Tour zeigt dir, was du in jedem Bereich der App tun kannst. Sie dauert weniger als 2 Minuten und du kannst sie jederzeit überspringen." },
  { icon: "home", titulo: "Start", texto: "Hier siehst du deinen Gesamtfortschritt, deine Serie aktiver Tage und Schnellzugriffe auf das Wichtigste." },
  { icon: "user-badge", titulo: "Mein Profil", texto: "Deine Daten, dein aktueller Rang bei Atomy und dein Foto." },
  { icon: "footprints", titulo: "Die 8 Schritte", texto: "Die Grundlage des Geschäfts, Schritt für Schritt erklärt, mit praktischen Aktivitäten, um jeden anzuwenden." },
  { icon: "trail-map", titulo: "9-Tage-Plan", texto: "Dein anfängliches Training Tag für Tag, mit täglichen Missionen — einschließlich der offiziellen Atomy-App auf dein Handy herunterzuladen." },
  { icon: "users", titulo: "Liste der 250", texto: "Notiere jeden Kontakt (Name, Telefon, Status) und verfolge deine Liste der 250 weiter." },
  { icon: "package", titulo: "Kunden", texto: "Registriere, wer schon gekauft hat: ihre Daten, den Verlauf jeder Bestellung mit Wert und PV, und verfolge mit Erinnerungen von 1 Woche bis 11 Monaten nach." },
  { icon: "calendar", titulo: "Wochenplan", texto: "Plane deine Anrufe, Treffen und Zoom-Meetings, mit Erinnerungen, damit du sie nicht vergisst." },
  { icon: "trending-up", titulo: "Wochenbericht", texto: "Am Ende der Woche wählst du nur die Sprache und sendest deinen Aktivitätsbericht an deinen Sponsor — die App hat die Zahlen schon für dich berechnet." },
  { icon: "target", titulo: "Fokus-Treffen", texto: "Organisiere deine Links- und Rechts-Liste und nutze den Produktrechner, um deinen Zwei-Wochen-Einkauf zu planen und mit deinem Sponsor zu teilen." },
  { icon: "mountain-flag", titulo: "90-Tage-Plan", texto: "Deine 6 Zwei-Wochen-Perioden mit klaren Zielen auf dem Weg zum Sales Master." },
  { icon: "crown", titulo: "Mein Stammbaum", texto: "Speichere hier deine ID und dein Passwort sowie die Daten deines Sponsors — von hier aus kannst du ihm direkt über WhatsApp schreiben, wenn du eine Frage hast." },
  { icon: "users", titulo: "Meine Partner", texto: "Dein dauerhaftes Teamverzeichnis nach linker und rechter Linie — tippe auf einen Namen, um seine ID, Zoom, PVP und das Datum des letzten Kaufs zu sehen. Die Zeile wird orange, wenn seit 11 Monaten nicht gekauft wurde." },
  { icon: "bell", titulo: "S.O.S.-Anrufe und Kontaktliste", texto: "Speichere weitere Unterstützungsnummern, an die du dich wenden kannst, und die Personen, die du bei Events kennenlernst." },
  { icon: "heart", titulo: "Das Motto, Prämien, Erfolge und Einstellungen", texto: "Tägliche Inspiration, deine freigeschalteten Erfolge und die Einstellungen deines Kontos." },
  { icon: "sparkles", titulo: "Fertig!", texto: "Du kannst diese Tour jederzeit erneut ansehen mit der schwebenden Schaltfläche, die du auf dem Bildschirm siehst." },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Guten Morgen";
  if (h < 20) return "Guten Tag";
  return "Guten Abend";
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
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">Die 8 Schritte zum Erfolg</p>' +
    '<p class="muted" style="margin-top:22px;max-width:340px;font-size:14.5px;line-height:1.6;white-space:pre-line;text-align:left">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Meine Reise beginnen ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    (LICENCIA_TITULAR ? '<p class="muted small" style="margin-top:26px;opacity:.6">Exklusiv lizenzierte Kopie für ' + escapeHtml(LICENCIA_TITULAR) + "</p>" : "") +
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
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Foto ändern" : "Foto hinzufügen (optional)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">Wie heißt du?</h2>' +
    '<p class="muted small" style="margin-top:4px">So personalisieren wir deine Reise.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Dein Name" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<div style="width:100%;max-width:320px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Deine Atomy-Daten <span class="muted" style="font-weight:400">(optional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Wir speichern sie in deinem Stammbaum, damit du sie nicht mehr suchen oder erneut anfordern musst.</p>' +
    '<input id="onboarding-atomy-id-input" type="text" placeholder="Deine Atomy-ID" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-atomy-pass-input" type="text" placeholder="Dein Atomy-Passwort" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<div style="width:100%;max-width:320px;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Dein Sponsor <span class="muted" style="font-weight:400">(optional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">So aktivieren wir gleich den WhatsApp-Button, um ihm zu schreiben, und speichern es in deinem Stammbaum. Du kannst das überspringen und später ausfüllen.</p>' +
    '<input id="onboarding-sponsor-name-input" type="text" placeholder="Name deines Sponsors" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-sponsor-phone-input" type="text" inputmode="numeric" placeholder="Sein WhatsApp, z. B. 34600000000" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Los geht\'s ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
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
  const salir = '<button class="sidebar-item" style="color:var(--warn)" data-action="salir-app">' + Icon("log-out", { size: 20 }) + "<span>Beenden</span></button>";
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
  const salir = '<button class="menu-item" style="color:var(--warn)" data-action="salir-app">' + medallionHTML("log-out", 34) + "<span>Beenden</span></button>";
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><div class="row gap-2">' + mountainMarkHTML(18) + '<span style="font-weight:700;font-size:14px">CUMBRE 90</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + salir + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Exklusive Lizenz: ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
    "</div></div>"
  );
}

/* ---------------- reminders / bell ---------------- */

function getReminders(state) {
  const out = [];
  const inact = diasInactivo(state.ultimaFecha);
  if (inact >= 2) {
    out.push({ text: "Du hast seit " + inact + " Tagen keinen Fortschritt gemacht. Setze deine Reise fort, wann du kannst — jeder Schritt zählt." });
  }
  const llamada = state.dias[5] && state.dias[5].fields && state.dias[5].fields.llamada;
  if (llamada && llamada.trim()) {
    out.push({ text: "Denk an deinen wöchentlichen Anruf mit deinem Mentor: " + llamada.trim() + "." });
  }
  const hoy = hoyISO();
  (state.contactos || []).forEach(function (c) {
    if (c.proximoSeguimiento && c.proximoSeguimiento <= hoy && c.estado !== "Verworfen") {
      const vencido = c.proximoSeguimiento < hoy;
      out.push({
        text: (vencido ? "Überfällige Nachverfolgung: " : "Nachverfolgung heute: ") + c.nombre + (c.notaSeguimiento ? " — " + c.notaSeguimiento : ""),
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
    ? '<button class="btn-secondary" data-action="tour-anterior">' + Icon("chevron-left", { size: 15, color: "var(--gold-light)" }) + " Anterior</button>"
    : "";
  const btnSaltar = !esUltimo
    ? '<button class="btn-secondary" data-action="tour-saltar">Saltar</button>'
    : "";
  const btnSiguiente =
    '<button class="btn-primary" data-action="tour-siguiente">' +
    (esUltimo ? "Entendido" : "Siguiente") +
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
    '<div class="muted small">Paso ' + (paso + 1) + " de " + total + "</div>" +
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
          ? '<div class="icon-btn" style="flex-shrink:0;cursor:pointer" data-action="marcar-seguimiento-hecho" data-arg="' + r.contactoId + '" title="Marcar seguimiento hecho">' + Icon("check-circle", { size: 14, color: "var(--success)" }) + "</div>"
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
        ? '<button class="link-btn small" style="margin-top:8px" data-action="goto" data-arg="contactos">Liste der 250 ansehen →</button>'
        : "")
    : '<p class="muted small" style="margin-top:8px">Alles aktuell — du hast keine ausstehenden Erinnerungen.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Recordatorios</span>' +
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
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("user-badge", { size: 16, color: "#1B1338" }) + " Mein Abzeichen ansehen</button>"
      : logro.tipo === "cumbre"
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("award", { size: 16, color: "#1B1338" }) + " Zertifikat ansehen</button>"
      : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card logro-modal">' +
    Icon("award", { size: 46, color: "var(--gold)" }) +
    '<div class="logro-modal-eyebrow">Ich habe den Erfolg erreicht</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Teile es — das ist eine großartige Art, gefragt zu werden, worum es geht 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    actionBtn +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">' + (actionBtn ? "Schließen" : "Super, weiter") + "</button>" +
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

  let mensaje = "Weiter so, jeder Schritt zählt!";
  if (pctGeneral === 0) mensaje = "Deine Reise beginnt heute. Los geht's!";
  else if (pctGeneral === 100) mensaje = "Du hast alles Verfügbare abgeschlossen! Weiter so.";
  else if (pctGeneral >= 70) mensaje = "Du erreichst fast den Gipfel, gib nicht nach.";

  const chips = DIAS.map(function (d) { return '<div class="seg' + (state.dias[d.id].done ? " on" : "") + '"></div>'; }).join("");

  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Tu foto"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  const proximosHtml = proximos.length
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Nächste Erfolge</span></div>' +
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
      '<button class="link-btn small" style="margin-top:12px" data-action="goto" data-arg="logros">Alle Erfolge ansehen →</button>' +
      "</div>"
    : "";

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(RANGOS[state.rangoIndex].nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Hallo, ' + escapeHtml(state.nombre || "Partner") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Willkommen bei Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">9 Etappen · 6 Camps · Unbegrenzter Zugriff</div>' +
    '<div class="chip-row" style="margin-top:16px">' + chips + "</div>" +
    '<div class="row between" style="margin-top:16px"><span class="muted small">' + (etapasHechas + campamentosHechos) + "/" + totalPasos + ' Meilensteine abgeschlossen</span><span style="font-size:24px;font-weight:700">' + pctGeneral + "%</span></div>" +
    '<div class="progressbar" style="margin-top:8px"><div style="width:' + pctGeneral + '%"></div></div>' +
    '<div class="muted small" style="margin-top:12px">' + mensaje + "</div>" +
    "</div>" +

    escenarioVidaHomeCardHTML(state) +

    enlacesUtilesHomeCardHTML() +

    proximosHtml +

    mountainSceneHTML(quincenasMap, cumbreLograda, 190).replace('<div class="mountain-wrap">', '<button class="mountain-wrap card-hover" data-action="goto" data-arg="plan90" style="cursor:pointer">').replace(/<\/div>$/, '</button>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="pasos">' + pasosHeaderMedallionHTML(44) + '<div class="nc-body"><div class="nc-title">Die 8 Schritte zum Erfolg</div><div class="nc-desc">Deine dauerhafte Referenz</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="lema">' + medallionHTML("heart", 44) + '<div class="nc-body"><div class="nc-title">Das Atomy-Motto</div><div class="nc-desc">Philosophie und Ethikkodex</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="contactos">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Liste der 250 Kontakte</div><div class="nc-desc">' + (state.contactos || []).length + ' registriert · Nachverfolgungen planen</div></div>' + clicaAquiBadgeHTML(false, "accent") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan6">' + medallionHTML("trail-map", 44) + '<div class="nc-body"><div class="nc-title">Startplan — 9 Tage</div><div class="nc-desc">Durchlaufe deine Karte Tag für Tag</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="premios">' + medallionHTML("gift", 44) + '<div class="nc-body"><div class="nc-title">Prämien deines Sponsors</div><div class="nc-desc">Sieh dir an, was du gewinnen kannst</div></div>' + clicaAquiBadgeHTML(false, "accent") + "</button>" +

    (cumbreLograda
      ? '<button class="btn-primary" style="background:var(--success)" data-action="goto" data-arg="cumbre">' + Icon("award", { size: 18, color: "#fff" }) + ' Du hast den Gipfel erreicht! Erfolg ansehen</button>'
      : "")
  );
}

function enlacesUtilesHomeCardHTML() {
  return (
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Bevor du startest</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Speichere die Apps und Seiten, die du für deinen Alltag mit Atomy brauchst.</p>' +
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

/* ---------------- Escenario de Vida ---------------- */

function escenarioVidaHomeCardHTML(state) {
  const esc = state.escenarioVida;
  const iniciadas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance > 0 || ((esc[c.id] || {}).meta || "").trim(); }).length;
  const completas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance === 4; }).length;

  if (state.escenarioCompletado) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--gold);background:var(--accent-soft)" data-action="goto-escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Lebensszenario</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">🏆 Perfekter Kreis! Du hast deine 8 Ziele erreicht.</div>' +
      '<div class="muted small" style="margin-top:2px">Tippe, um sie zu überprüfen oder dir neue, größere Ziele zu setzen.</div>' +
      "</button>"
    );
  }
  if (iniciadas === 0) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--accent)" data-action="goto-escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Bevor du anfängst</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">Definiere dein Lebensszenario — dein „Warum“</div>' +
      '<div class="muted small" style="margin-top:2px">Es ist der erste Schritt von Schritt 1. Bestimme deine Träume in 8 Lebensbereichen, bevor du weitermachst.</div>' +
      "</button>"
    );
  }
  const pct = Math.round((completas / ESCENARIO_CATEGORIAS.length) * 100);
  return (
    '<button class="card card-hover" style="text-align:left;width:100%" data-action="goto-escenario">' +
    '<div class="row between"><div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Lebensszenario</span></div>' +
    '<span class="muted small">' + completas + "/" + ESCENARIO_CATEGORIAS.length + "</span></div>" +
    '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 4) + '%"></div></div>' +
    '<div class="muted small" style="margin-top:8px">Vervollständige weiter deine Ziele, bis du den perfekten Kreis erreichst.</div>' +
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

function bucketRowHTML(i, item) {
  const ejemplo = BUCKET_LIST_EJEMPLOS[i % BUCKET_LIST_EJEMPLOS.length];
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="align-items:flex-start">' +
    '<button class="avance-dot' + (item.cumplido ? " on" : "") + '" style="flex-shrink:0;margin-top:3px" data-action="toggle-bucket-cumplido" data-arg="' + i + '" aria-label="Marcar como cumplido"></button>' +
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
    '<div class="row gap-2">' + Icon("clipboard-list", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Liste der 100 — meine Träume</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Notiere bis zu 100 Dinge, die du erreichen, haben oder erleben möchtest — mit Datum und deinem „Warum“. Du musst sie nicht in Reihenfolge oder auf einmal ausfüllen.</p>' +
    '<div class="muted small" style="margin-top:4px">' + escritas + " geschrieben · " + cumplidas + " erreicht</div>" +
    (open ? '<div class="view-stack gap-sm" style="margin-top:12px">' + rows + "</div>" : "") +
    "</div>"
  );
}

/* ---------------- Gran Plan 3 — proyección a 3 años ---------------- */

function granPlanHitoRowHTML(anio, i, h, confirmKey) {
  const key = anio + "|" + i;
  return (
    '<div class="card" style="padding:10px 12px">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' +
    '<input type="text" placeholder="Datum (z. B. 08/2026)" value="' + escapeHtml(h.fecha) + '" data-field="granPlan3.' + anio + "." + i + '.fecha" style="flex:1;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Meisterschaftsniveau" value="' + escapeHtml(h.nivel) + '" data-field="granPlan3.' + anio + "." + i + '.nivel" style="flex:1.4;min-width:130px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;align-items:center;flex-wrap:wrap">' +
    '<input type="text" placeholder="Gruppen-PV" value="' + escapeHtml(h.pvGrupal) + '" data-field="granPlan3.' + anio + "." + i + '.pvGrupal" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Einkommen" value="' + escapeHtml(h.ingresos) + '" data-field="granPlan3.' + anio + "." + i + '.ingresos" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<div data-action="delete-hito-granplan" data-arg="' + key + '" style="cursor:pointer;color:var(--warn);font-size:11px;padding:4px;flex-shrink:0">' + (confirmKey === key ? "Löschen?" : Icon("x", { size: 14 })) + "</div>" +
    "</div></div>"
  );
}

function granPlanAnioHTML(anio, label, hitos, ui) {
  const rows = hitos.map(function (h, i) { return granPlanHitoRowHTML(anio, i, h, ui.confirmDeleteHito); }).join("");
  return (
    '<div style="margin-top:14px">' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light)">' + escapeHtml(label) + "</div>" +
    '<div class="view-stack gap-sm" style="margin-top:6px">' + rows + "</div>" +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-hito-granplan" data-arg="' + anio + '">+ Meilenstein hinzufügen</div>' +
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
    '<div class="row gap-2">' + Icon("trending-up", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Großer Plan 3 — 3-Jahres-Projektion</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + total + " Meilensteine gespeichert</div>" +
    (open
      ? '<p class="muted small" style="margin-top:8px;line-height:1.5">' + escapeHtml(GRAN_PLAN_3_INTRO) + "</p>" +
        granPlanAnioHTML("anio1", "Jahr 1", gp.anio1, ui) +
        granPlanAnioHTML("anio2", "Jahr 2", gp.anio2, ui) +
        granPlanAnioHTML("anio3", "Jahr 3", gp.anio3, ui)
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
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Tagebuch meines zukünftigen Ichs</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    (open
      ? '<p class="muted small" style="margin-top:6px;line-height:1.5">' + escapeHtml(DIARIO_FUTURO_INTRO) + "</p>" +
        '<textarea rows="8" placeholder="' + escapeHtml(DIARIO_FUTURO_EJEMPLO) + '" data-field="diarioFuturo.texto" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 12px;font-size:13px;outline:none;resize:vertical;font-family:inherit;line-height:1.5">' + escapeHtml(texto) + "</textarea>"
      : '<p class="muted small" style="margin-top:6px">' + (texto ? "Du hast deinen Brief schon geschrieben — tippe, um ihn anzusehen oder zu bearbeiten." : "Du hast ihn noch nicht geschrieben.") + "</p>") +
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
      '<input type="text" placeholder="Z. B. 3000 USD im Monat verdienen" value="' + escapeHtml(m.texto) + '" data-field="planComercialMensual.' + mesKey + ".metas." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (m.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-meta-planmensual" data-arg="' + m.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteMetaPlan === m.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const accionesHtml = plan.acciones.map(function (a, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (a.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-accion-planmensual" data-arg="' + a.id + '"></div>' +
      '<input type="text" placeholder="Z. B. 10 Personen täglich anrufen" value="' + escapeHtml(a.texto) + '" data-field="planComercialMensual.' + mesKey + ".acciones." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (a.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-accion-planmensual" data-arg="' + a.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteAccionPlan === a.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const quincenasHtml = plan.quincenas.map(function (q, i) {
    const label = i === 0 ? "Erste Monatshälfte" : "Zweite Monatshälfte";
    return (
      '<div class="card" style="padding:10px 12px;margin-top:8px">' +
      '<div class="muted small" style="font-weight:600">' + label + "</div>" +
      '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
      '<div style="flex:1;min-width:80px"><label class="muted small">Einkommen</label><input type="number" value="' + (Number(q.ingresos) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.ingresos" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:80px"><label class="muted small">Verkaufs-PV</label><input type="number" value="' + (Number(q.pv) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:100px"><label class="muted small">Meisterschaftsniveau</label><input type="text" value="' + escapeHtml(q.nivel) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.nivel" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      "</div></div>"
    );
  }).join("");

  return (
    '<div class="card">' +
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("target", { size: 13, color: "var(--gold)" }) + " Monatlicher Geschäftsplan</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="planmensual-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="planmensual-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Ziele</div>' +
    metasHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-meta-planmensual">+ Ziel hinzufügen</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Aktionsplan</div>' +
    accionesHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-accion-planmensual">+ Aktion hinzufügen</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Einkommen pro Zwei-Wochen-Periode</div>' +
    quincenasHtml +
    "</div>"
  );
}

/* Núcleo reutilizable de la experiencia Escenario de Vida (radar + tarjetas de
   categoría + Lista de 100), sin el encabezado de sección ni la introducción —
   se usa tanto en la vista independiente como incrustado dentro del Día 1. */
function renderEscenarioVidaBody(state, ui) {
  const esc = state.escenarioVida;
  const completas = ESCENARIO_CATEGORIAS.filter(function (c) { return (esc[c.id] || {}).avance === 4; }).length;
  const cards = ESCENARIO_CATEGORIAS.map(function (c) { return escenarioCategoriaHTML(c, esc); }).join("");
  const pasos = "<ol style=\"margin:0;padding-left:18px\">" + ESCENARIO_PASOS.map(function (p) { return '<li class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(p) + "</li>"; }).join("") + "</ol>";

  return (
    '<div class="card" style="text-align:center">' +
    escenarioRadarSVG(ESCENARIO_CATEGORIAS, esc) +
    '<div class="muted small" style="margin-top:6px">' + completas + " von " + ESCENARIO_CATEGORIAS.length + " Zielen im perfekten Kreis</div>" +
    "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">Wie füllt man es aus?</div>' + pasos + "</div>" +
    '<div class="card"><div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + Icon("video", { size: 13, color: "var(--gold)" }) + " Videos, die dir beim Aufbau helfen</div>" + videoListCardHTML(ESCENARIO_VIDEOS) + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    granPlanSectionHTML(state, ui) +
    diarioFuturoSectionHTML(state, ui) +
    planComercialMensualHTML(state, ui) +
    bucketListSectionHTML(state, ui)
  );
}

function renderEscenarioVida(state, ui) {
  return (
    sectionHeaderHTML("Lebensszenario", ESCENARIO_LEMA, "compass") +
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

function libroRowHTML(b) {
  return (
    '<a class="card card-hover row gap-3" style="text-decoration:none;color:inherit;align-items:center" href="' + escapeHtml(b.url) + '" target="_blank" rel="noreferrer">' +
    '<div style="flex-shrink:0;width:38px;height:38px;border-radius:50%;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">' + Icon("book-open", { size: 17, color: "var(--gold)" }) + "</div>" +
    '<div style="flex:1">' +
    '<div style="font-weight:600;font-size:13.5px;line-height:1.35">' + escapeHtml(b.titulo) + "</div>" +
    '<div class="muted small" style="margin-top:1px">' + escapeHtml(b.autor) + "</div>" +
    "</div>" +
    Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) +
    "</a>"
  );
}

function libroListCardHTML(libros) {
  return '<div style="display:flex;flex-direction:column;gap:10px">' + libros.map(libroRowHTML).join("") + "</div>";
}

function renderRecursosAudiovisuales(state, ui) {
  const categorias = RECURSOS_AUDIOVISUALES.map(function (cat) {
    const documentos = cat.id === "negocio"
      ? '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 8px">' + Icon("download", { size: 14, color: "var(--gold)" }) + " Dokumente</div>" + documentListCardHTML(NEGOCIO_DOCUMENTOS)
      : "";
    return (
      '<div class="card" style="background:transparent;border:none;padding:0;margin-top:18px">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + Icon(cat.icon, { size: 14, color: "var(--gold)" }) + " " + escapeHtml(cat.label) + "</div>" +
      videoListCardHTML(cat.videos) +
      documentos +
      "</div>"
    );
  }).join("");

  const libros =
    '<div class="card" style="background:transparent;border:none;padding:0;margin-top:18px">' +
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + Icon("book-open", { size: 14, color: "var(--gold)" }) + " Empfohlene Bücher</div>" +
    '<p class="muted small" style="margin-bottom:10px">Empfohlene Bücher für dein persönliches und berufliches Wachstum. Tippe auf einen Titel, um mehr zu sehen.</p>' +
    libroListCardHTML(LIBROS_RECOMENDADOS) +
    "</div>";

  return (
    sectionHeaderHTML("Audiovisuelle Ressourcen", "Die wichtigsten Videos, um Atomy zu verstehen und zu teilen, nach Thema geordnet.", "video") +
    categorias +
    libros
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
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + " Monatliche Bewertung der 8 Schritte</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="eval8pasos-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="eval8pasos-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    filas +
    '<div class="card" style="margin-top:14px;background:var(--accent-soft);border-color:var(--gold)">' +
    '<div class="row between"><span style="font-weight:700;font-size:13px">Deine Punktzahl diesen Monat</span><span style="font-weight:700;font-size:18px;color:var(--gold)">' + total + "</span></div>" +
    '<p class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(banda.texto) + "</p>" +
    "</div>" +
    '<div class="field" style="margin-top:12px"><label>Lob-Punkte</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.alabanza" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.alabanza) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Reflexionspunkte</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.reflexion" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.reflexion) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Kommentare des Sponsors</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.comentarioPatrocinador" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.comentarioPatrocinador) + "</textarea></div>" +
    "</div>"
  );
}

const OCHO_CORE_NOTA_HTML =
  '<div class="card" style="background:var(--accent-soft);border:none">' +
  '<div class="row gap-2" style="font-weight:700;font-size:13px">' + Icon("check-circle", { size: 15, color: "var(--accent)" }) + " Dein tägliches/monatliches 8 Core</div>" +
  '<p class="muted small" style="margin-top:6px;line-height:1.55">Diese tägliche Kontrolle (Lesen, VOD ansehen, Teilnahme an Treffen, Produktnutzung, Plan zeigen, Lieferung an den Konsumenten, Sponsor-Beratung, Vertrauen aufbauen) führst du schon auf deiner offiziellen Atomy-Seite — gehe zu <b>Erfolg verfolgen → Mein monatliches 8 Core</b> und markiere es dort Tag für Tag.</p>' +
  "</div>";

/* ---------------- Los 8 Pasos ---------------- */

function renderPasos(state, ui) {
  const vueltos = ui.pasosVueltos || {};
  const cards = OCHO_PASOS.map(function (p) {
    const flipped = !!vueltos[p.n];
    const est = state.pasos[p.n] || { checks: [] };
    const front =
      '<div class="flip-face flip-front">' +
      pasoMedallionHTML(p.icon, 68) +
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Schritt ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="line-height:1.45;margin-top:4px;max-width:44ch">' + escapeHtml(p.d) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Tippe, um die vollständige Erklärung zu sehen</span></div>' +
      "</div>";

    const checklist = (p.actividades || []).length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Aktivitäten dieses Schritts</div>' +
        '<div style="margin-top:6px">' +
        p.actividades.map(function (a, i) {
          const on = !!est.checks[i];
          return (
            '<div class="check-row" style="padding-bottom:2px">' +
            (i < p.actividades.length - 1 ? '<div class="line' + (on ? " on" : "") + '" style="left:11.5px"></div>' : "") +
            /* nota: aquí usamos <div>, no <button> — este checklist vive dentro de la tarjeta
               volteable de un paso, que ya es un <button>; un <button> no puede anidar otro. */
            '<div class="check-dot' + (on ? " on" : "") + '" style="width:24px;height:24px;font-size:10px;cursor:pointer" data-action="toggle-paso-check" data-paso="' + p.n + '" data-arg="' + i + '">' + (on ? Icon("check", { size: 12, color: "#1B1338" }) : (i + 1)) + "</div>" +
            '<div class="check-label' + (on ? " on" : "") + '" style="font-size:12.5px;padding:2px 0 16px;cursor:pointer" data-action="toggle-paso-check" data-paso="' + p.n + '" data-arg="' + i + '">' + escapeHtml(a) + "</div>" +
            "</div>"
          );
        }).join("") +
        "</div>"
      : "";

    const duplicaChecklist = (p.duplicaChecklist || []).length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Ich lerne und dupliziere</div>' +
        '<p class="muted small" style="margin-top:2px;line-height:1.5">Markiere jede Aufgabe, sobald du sie beherrschst — und sobald du sie deinem Team schon gelehrt hast.</p>' +
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
        '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("heart", { size: 13, color: "var(--gold)" }) + " Reflexion zum Teilen</div>" +
        '<p style="font-size:13px;line-height:1.55;margin-top:6px;font-style:italic">„' + linkifyText(p.reflexion) + '“</p>' +
        '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(p.reflexion) + '">' + Icon("share2", { size: 13 }) + " Teilen</div>" +
        "</div>"
      : "";

    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Schritt " + p.n + " — " + escapeHtml(p.t) + "</div>" +
      '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
      (p.n === 1
        ? '<div class="badge soft" style="cursor:pointer" data-action="goto-escenario">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + " " + Icon("chevron-right", { size: 11 }) + "</div>"
        : '<span class="badge soft">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + "</span>") +
      '<span class="badge gold">' + Icon("sparkles", { size: 11 }) + " " + escapeHtml(p.objetivo) + "</span>" +
      "</div>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Detaillierte Erklärung</div>' +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + linkifyText(p.explicacion) + "</p>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Praktische Beispiele</div>' +
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
    '<div><h2>Die 8 Schritte zum Erfolg</h2><p>Basierend auf der Lehre von Präsident Han-Gill Park. Tippe auf jeden Schritt, um die vollständige Erklärung zu sehen.</p></div></div>';
  return header +
    videoRowHTML({ titulo: "Die 8 Schritte Zum Erfolg - Han Gill Park", url: "https://www.youtube.com/watch?v=z-Nzz1HkoE8" }) +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + cards + "</div>" +
    evaluacion8PasosHTML(state, ui) +
    OCHO_CORE_NOTA_HTML;
}

/* Paso 8 — tabla de seguimiento: cada fila es un ítem de "Aprendo y Duplico",
   cada columna un distribuidor del equipo. Vive FUERA del <button> volteable
   (a diferencia del resto del contenido del paso) porque necesita <input> de
   texto para el nombre — un <input> dentro de un <button> no es válido y en
   la práctica el navegador no deja enfocarlo. */
function renderDistribuidoresDuplicaCard(state, ui) {
  const paso8 = OCHO_PASOS.find(function (p) { return p.n === 8; });
  const items = (paso8 && paso8.duplicaChecklist) || [];
  const distribuidores = state.distribuidoresDuplicado || [];
  const confirmId = ui.confirmDeleteDistribuidor;
  const addBtn = '<div class="btn-secondary" style="margin-top:12px;width:fit-content;cursor:pointer" data-action="add-distribuidor-duplica">+ Vertriebspartner hinzufügen</div>';

  const intro =
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' +
    Icon("users", { size: 13, color: "var(--gold)" }) + " Duplikations-Nachverfolgung je Vertriebspartner</div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Füge jeden Vertriebspartner deines Teams hinzu und markiere, einzeln, welche Aufgaben von „Ich lerne und dupliziere“ du ihm schon gelehrt hast. Du kannst Vertriebspartner nach und nach hinzufügen, du musst nicht alle auf einmal eintragen.</p>';

  if (!distribuidores.length) {
    return '<div class="card" style="margin-top:14px">' + intro + addBtn + "</div>";
  }

  const headerCells = distribuidores.map(function (d) {
    const total = items.length;
    const done = d.checks.filter(Boolean).length;
    const deleteInner = confirmId === d.id ? "Löschen?" : Icon("x", { size: 12 });
    return (
      '<th style="min-width:150px;padding:0 6px 8px;vertical-align:top;font-weight:400">' +
      '<input type="text" value="' + escapeHtml(d.nombre) + '" placeholder="Name des Vertriebspartners" data-distribuidor-field="nombre" data-distribuidor-id="' + d.id + '" style="width:100%;font-size:12.5px;font-weight:700;padding:6px 8px">' +
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

/* ---------------- El Lema de Atomy ---------------- */

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
    '<div class="row gap-2">' + Icon("flame", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Deine Fokus-Säule</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Welche der 4 Säulen erfüllst du deiner Meinung nach am wenigsten? Wähle sie aus, setze dir das Ziel, sie jeden Tag zu leben, und markiere hier deine Serie.</p>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:10px">' + selector + "</div>" +
    (pilarSel
      ? '<div style="margin-top:16px;text-align:center">' +
        '<div style="font-size:34px;font-weight:700;color:var(--gold-light)">' + foco.racha + "</div>" +
        '<div class="muted small">' + (foco.racha === 1 ? "Tag in Folge" : "Tage in Folge") + ", in denen du „" + escapeHtml(pilarSel.t) + "“ gelebt hast</div>" +
        '<button class="btn-primary" style="margin-top:12px"' + (yaHoy ? " disabled" : "") + ' data-action="marcar-lema-hoy">' +
        (yaHoy ? Icon("check", { size: 16, color: "#fff" }) + " Heute schon markiert" : "Heute erfüllt") +
        "</button>" +
        "</div>"
      : "") +
    "</div>"
  );
}

/* Contenido de SMART/OKR — vive como fuente única en el pilar 2 de El Lema
   de Atomy, pero se reutiliza (con su propio botón de Compartir) en Etapa 5
   del Plan 9 Días y en el Paso 1 de Los 8 Pasos, donde el socio realmente
   define sus objetivos. */
function smartOkrShareText() {
  const marcos = (LEMA_ATOMY.pilares.find(function (p) { return p.n === 2; }) || {}).marcos || [];
  return "Wie man klare Ziele erstellt:\n\n" + marcos.map(function (m) {
    return m.nombre + ": " + m.explicacion + " Beispiel: " + m.ejemplo;
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
    '<div style="font-weight:700;font-size:14px;color:var(--gold-light)">Wie du deine Ziele erstellst</div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Zwei einfache Wege, um eine vage Absicht in ein echtes Ziel zu verwandeln.</p>' +
    marcosHtml +
    '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(smartOkrShareText()) + '">' + Icon("share2", { size: 13 }) + " Teilen</div>" +
    "</div>"
  );
}

/* Modal propio de "Compartir" para las tarjetas-imagen (Mi Perfil, tarjeta
   del día): en vez de saltar directo al panel nativo del sistema operativo
   (que en escritorio muestra apps como Correo/Outlook/Paint, no redes
   sociales), se ofrecen siempre las mismas 6 redes. Instagram, TikTok y
   YouTube no tienen forma de recibir un archivo adjunto desde la web sin
   backend propio, así que esos botones descargan la imagen y abren la app/
   web para que se adjunte a mano — se avisa con un toast, nunca en silencio. */
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Teilen</span>' +
    '<button class="icon-btn" data-action="cerrar-compartir-imagen">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Wähle, wo du dein Bild teilen möchtest.</p>' +
    '<div class="share-platform-grid" style="margin-top:10px">' + botones + "</div>" +
    '<button class="btn-secondary" style="margin-top:14px" data-action="compartir-imagen-descargar">' + Icon("download", { size: 15 }) + " Nur das Bild herunterladen</button>" +
    '<button class="link-btn small" style="margin-top:10px" data-action="compartir-imagen-mas-opciones">Weitere Optionen zum Teilen</button>' +
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
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--gold);margin-top:14px">Das Atomy-Motto</div>' +
    pilaresList +
    '<div style="font-size:15px;font-weight:700;color:var(--gold-light);margin-top:16px;line-height:1.5">Los, los, los!<br>Wir haben es geschafft!</div>' +
    '<div class="muted small" style="margin-top:18px;line-height:1.5">📌 Mach einen Screenshot, drucke ihn aus oder nutze ihn als Hintergrund — an einem Ort, wo du ihn jeden Tag siehst.</div>' +
    '<button class="link-btn small" style="margin-top:16px" data-action="close-modal">Schließen</button>' +
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
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Säule ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="font-style:italic;margin-top:2px">' + escapeHtml(p.sub) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Tippe, um die vollständige Erklärung zu sehen</span></div>' +
      "</div>";
    const acciones = p.acciones && p.acciones.length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Tägliche Handlungen</div>' +
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
        '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(smartOkrShareText()) + '">' + Icon("share2", { size: 13 }) + " Teilen</div>"
      : "";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Säule " + p.n + " — " + escapeHtml(p.t) + "</div>" +
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
    '<div><h2>Das Atomy-Motto</h2><p>Unternehmensphilosophie und Ethikkodex — Präsident Han-Gill Park. Tippe auf jede Säule, um die vollständige Erklärung zu sehen.</p></div></div>';
  const intro = '<p class="muted small" style="line-height:1.6;margin-top:-4px">' + escapeHtml(LEMA_ATOMY.intro) + "</p>";
  const carteleraBtn =
    '<button class="btn-secondary" style="margin-top:12px" data-action="open-cartelera">' + Icon("image-plus", { size: 15 }) + " Poster ansehen, um es sichtbar aufzuhängen</button>";
  const exclamacion =
    '<div class="card" style="margin-top:14px;text-align:center;border-color:var(--gold)">' +
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--gold)">Offizieller Ausruf des Mottos</div>' +
    '<p style="font-size:14px;line-height:1.6;margin-top:6px;font-weight:600">' + escapeHtml(LEMA_ATOMY.exclamacion) + "</p></div>";
  return header + intro + carteleraBtn +
    '<div class="view-stack gap-sm" style="margin-top:14px">' + cards + "</div>" +
    exclamacion +
    lemaFocoHTML(state);
}

/* ---------------- Plan de 9 días — mapa ---------------- */

// Zigzag ascendente (22%/74% de x, alternado) repartido de forma pareja
// entre y=92 (base) e y=13 (cumbre), para cualquier cantidad de días.
const TRAIL_POSITIONS = DIAS.map(function (_, i) {
  const t = DIAS.length > 1 ? i / (DIAS.length - 1) : 0;
  return { x: i % 2 === 0 ? 22 : 74, y: Math.round((92 - t * (92 - 13)) * 10) / 10 };
});

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

  return sectionHeaderHTML("Startplan — 9 Tage", "Erklimme die Karte und erobere jede Etappe.", "trail-map") +
    heroMountainHTML(overlay);
}

/* ---------------- Reto 7x7 — tabla de 10 contactos y evaluación semanal ----------------
   Componentes reutilizables: la tabla de "Mis primeros 10 contactos" y el panel de
   evaluación de 7 días se usan tanto en el Plan de 9 Días (una sola instancia
   compartida entre los días 3 a 9) como en cada una de las 12 semanas del Plan de
   90 Días (una instancia propia por semana) — así el socio sigue practicando este
   mismo hábito semana a semana, de forma indefinida. */

function clicaAquiBadgeHTML(open, color) {
  const cls = color === "accent" ? "blue" : "gold";
  return (
    '<span class="badge ' + cls + '" style="flex-shrink:0">Hier klicken' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' +
    Icon("chevron-right", { size: 11, color: color === "accent" ? "var(--accent)" : "#1B1338" }) +
    "</span></span>"
  );
}

function contactos10FilaHTML(pathPrefix, i, fila) {
  const inputStyle = "width:100%;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 8px;font-size:12.5px;outline:none";
  return (
    "<tr>" +
    '<td style="padding:4px 6px;font-size:11px;color:var(--text-soft);text-align:center">' + (i + 1) + "</td>" +
    '<td style="padding:4px"><input type="text" placeholder="Name" value="' + escapeHtml(fila.nombre) + '" data-field="' + pathPrefix + "." + i + '.nombre" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" inputmode="tel" placeholder="Telefon" value="' + escapeHtml(fila.telefono) + '" data-field="' + pathPrefix + "." + i + '.telefono" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" placeholder="Anmerkungen / Nachverfolgung" value="' + escapeHtml(fila.observaciones) + '" data-field="' + pathPrefix + "." + i + '.observaciones" style="' + inputStyle + '"></td>' +
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
    '<div class="row gap-2">' + Icon("phone-call", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Meine ersten 10 Kontakte</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + llenos + " von 10 mit registriertem Namen</div>" +
    (open
      ? '<div style="overflow-x:auto;margin-top:10px">' +
        '<table style="border-collapse:collapse;width:100%">' +
        "<thead><tr><th></th><th style=\"" + thStyle + "\">Name</th><th style=\"" + thStyle + "\">Telefon</th><th style=\"" + thStyle + "\">Anmerkungen</th></tr></thead>" +
        "<tbody>" + filas + "</tbody>" +
        "</table></div>"
      : "") +
    "</div>"
  );
}

function evaluacion7x7ResumenTexto(ev, periodoLabel) {
  return (
    "📊 " + periodoLabel + " — 7×7-Challenge (Cumbre 90):\n" +
    "• Kontaktierte Personen: " + (ev.contactados || "0") + "\n" +
    "• Haben geantwortet: " + (ev.respondieron || "0") + "\n" +
    "• Durchgeführte Präsentationen: " + (ev.presentaciones || "0") + "\n" +
    "• Erzielte Käufe: " + (ev.compras || "0") + "\n" +
    "• Am Geschäft interessierte Personen: " + (ev.interesados || "0") + "\n" +
    "• Wen ich weiter begleiten muss: " + (ev.seguimiento || "—") +
    "\n\nHilfst du mir, das zu überprüfen?"
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
    ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, evaluacion7x7ResumenTexto(ev, periodoLabel)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Mit meinem Sponsor teilen</a>"
    : '<p class="muted small" style="margin-top:10px">Füge das WhatsApp deines Sponsors in den Einstellungen hinzu, um das teilen zu können.</p>';
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="' + toggleAction + '"' + (toggleArg != null ? ' data-arg="' + toggleArg + '"' : "") + '>' +
    '<div class="row gap-2">' + Icon("target", { size: 15, color: "var(--accent)" }) + '<span style="font-weight:700;font-size:14px">Meine Erfolge dieser Woche</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Trage es alle 7 Tage ein und teile es mit deinem Sponsor — das ist die dauerhafte Arbeit, um dein Geschäft wachsen zu lassen.</p>' +
    (open
      ? '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
        campo("contactados", "Kontaktierte Personen", "0") +
        campo("respondieron", "Haben geantwortet", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("presentaciones", "Durchgeführte Präsentationen", "0") +
        campo("compras", "Erzielte Käufe", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("interesados", "Am Geschäft interessierte Personen", "0") +
        "</div>" +
        '<div class="field" style="margin-top:8px"><label>Wen muss ich weiter begleiten?</label>' +
        '<textarea rows="2" data-field="' + pathPrefix + '.seguimiento">' + escapeHtml(ev.seguimiento) + "</textarea></div>" +
        compartir
      : "") +
    "</div>"
  );
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
        const isEscenario = diaId === 1 && sec.h === "Schreibe dein Lebensszenario";
        const headerHtml = isEscenario
          ? '<button class="row between" style="width:100%;text-align:left;margin-bottom:8px" data-action="toggle-escenario-inline">' +
            '<div style="font-weight:700;font-size:14px;color:var(--gold-light)">' + escapeHtml(sec.h) + "</div>" +
            clicaAquiBadgeHTML(escenarioAbierto, "gold") +
            "</button>"
          : '<div style="font-weight:700;font-size:14px;color:var(--gold-light);margin-bottom:8px">' + escapeHtml(sec.h) + "</div>";
        const card =
          '<div class="card">' +
          headerHtml +
          sec.body.map(function (p) { return '<p class="muted small" style="line-height:1.55;margin-top:6px">' + linkifyText(p) + "</p>"; }).join("") +
          (isEscenario ? '<div class="muted small" style="margin-top:8px;font-weight:600">' + (escenarioAbierto ? "Tippe, um es zu verbergen" : "Tippe, um dein vollständiges Lebensszenario zu öffnen (Radar, Ziele und Liste der 100)") + "</div>" : "") +
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
      '<button class="btn-secondary" style="width:fit-content;padding:9px 14px" data-action="share-day" data-arg="' + diaId + '">' + Icon("share2", { size: 14 }) + " Als Karte teilen</button>" +
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
    ? '<div class="row gap-2 small" style="color:var(--success);font-weight:600;margin-top:10px">' + Icon("check", { size: 14 }) + " Richtig! Ein weiterer Schritt erobert.</div>"
    : (est.quizSel !== null && est.quizSel !== undefined
      ? '<div class="muted small" style="margin-top:10px">Kein Problem, versuch es erneut, wann immer du möchtest — es gibt kein Limit an Versuchen.</div>'
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

  const finishLabel = est.done ? "Tag erobert " + Icon("award", { size: 18, color: "#fff" }) : "Diesen Tag erobern";
  const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
  const finishDisabled = !allChecked || est.done;

  // Reto 7x7: la misma tabla de 10 contactos acompaña todos los días activos
  // del reto (3 a 9); el panel de evaluación cierra el ciclo inicial en el Día 9.
  const contactos10Card = diaId >= 3 && diaId <= 9
    ? contactos10TablaHTML("primeros10Contactos", state.primeros10Contactos, !!ui.contactos10Open, "toggle-contactos10", null)
    : "";
  const evaluacionCard = diaId === 9
    ? evaluacion7x7PanelHTML(state, "evaluacion7x7Inicial", state.evaluacion7x7Inicial, !!ui.evaluacion7x7InicialOpen, "toggle-evaluacion7x7-inicial", null, "Abschluss der anfänglichen 7×7-Challenge")
    : "";

  const prevDia = DIAS.find(function (d) { return d.id === diaId - 1; });
  const prevDayBtn = prevDia
    ? '<button class="link-btn row gap-2" style="width:fit-content" data-action="open-day" data-arg="' + prevDia.id + '">' + Icon("chevron-left", { size: 16 }) + " Vorheriger Tag</button>"
    : "<div></div>";
  const nextDia = DIAS.find(function (d) { return d.id === diaId + 1; });
  const nextDayBtn = nextDia
    ? '<button class="link-btn row gap-2" style="width:fit-content" data-action="open-day" data-arg="' + nextDia.id + '">Nächster Tag ' + Icon("chevron-right", { size: 16 }) + "</button>"
    : "";

  return (
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-map">' + Icon("trail-map", { size: 16 }) + " Karte der Reise</button>" +
    '<div class="row between" style="margin-top:4px">' +
    prevDayBtn +
    nextDayBtn +
    "</div>" +
    '<div>' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Etappe ' + dia.id + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(dia.etapa) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(dia.titulo) + "</p>" +
    '<p class="muted" style="font-size:13.5px;margin-top:6px;font-style:italic">' + escapeHtml(dia.objetivo) + "</p>" +
    "</div>" +
    nota + contenido + contactos10Card + evaluacionCard + smartOkr + campos +
    '<div class="card">' +
    '<div class="row gap-2" style="font-weight:600;font-size:14px;margin-bottom:12px">' + Icon("sparkles", { size: 15, color: "var(--gold)" }) + " Kurze Wiederholungsfrage</div>" +
    '<div style="font-size:14px;margin-bottom:12px">' + escapeHtml(dia.quiz.pregunta) + "</div>" +
    '<div style="display:flex;flex-direction:column;gap:8px">' + opciones + "</div>" +
    quizFeedback +
    "</div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Missionen des Tages ' + dia.id + "</div>" + checklist + "</div>" +
    '<button class="btn-primary" style="' + finishStyle + '" ' + (finishDisabled ? "disabled" : "") + ' data-action="finish-day" data-arg="' + diaId + '">' + finishLabel + "</button>"
  );
}

/* ---------------- Plan 90 días ---------------- */

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
      '<div class="badge ' + (done ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (done ? "Abgeschlossen" : "Wo. " + q.semanas) + "</div>" +
      "</div>" +
      '<div class="tile-body"><div class="tile-title">' + escapeHtml(q.nombre) + '</div><div class="tile-sub">' + escapeHtml(q.foco) + "</div>" + premioHtml + "</div>" +
      "</button>"
    );
  }).join("");

  const banner = cumbreLograda
    ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:500">🏔️ Du hast alle 6 Zwei-Wochen-Perioden abgeschlossen! Gehe zum Gipfel-Bildschirm, um deinen Erfolg zu feiern.</div>'
    : "";

  return sectionHeaderHTML("90-Tage-Plan", "Dein Weg zum Rang Sales Master, Zwei-Wochen-Periode für Zwei-Wochen-Periode.", "mountain-flag") +
    mountainSceneHTML(quincenasMap, cumbreLograda, 170) +
    '<div class="grid-2">' + tiles + "</div>" +
    banner;
}

function pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, appName) {
  const items = catalogo.filter(function (p) { return (Number(compras[p.id]) || 0) > 0; });
  const lineas = items.map(function (p) {
    const cant = Number(compras[p.id]) || 0;
    return "• " + (p.nombre || "(ohne Namen)") + " x" + cant + " (" + ((Number(p.pv) || 0) * cant).toLocaleString(paisInfo.locale) + " PV)";
  });
  return (
    "📦 Mein Einkaufsplan für diese Zwei-Wochen-Periode (" + appName + "):\n" +
    lineas.join("\n") +
    "\n\nGesamt: " + totalPV.toLocaleString(paisInfo.locale) + " PV · " + formatMoneda(totalPrecio, paisInfo) +
    "\n\nHilfst du mir, das zu überprüfen?"
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
    '<input type="text" placeholder="Produktname" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="check-dot' + (p.probado ? " on" : "") + '" style="width:24px;height:24px;flex-shrink:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Als getestet markieren">' + (p.probado ? Icon("check", { size: 11, color: "#fff" }) : "") + "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    (pedidoAntes
      ? '<div class="badge gold" style="margin-top:6px;width:fit-content">' + Icon("check-circle", { size: 10 }) + " Hast du schon bestellt (insgesamt " + historico + (historico === 1 ? " Einheit)" : " Einheiten)") + "</div>"
      : "") +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Preis (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">Diese Periode</label><input type="number" min="0" value="' + cantidad + '" data-field="comprasQuincena.' + qn + "." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    "</div></div>"
  );
}

function historialComprasHTML(state, ui, catalogo) {
  const pedidos = catalogo.filter(function (p) { return totalHistoricoProducto(state, p.id) > 0; });
  const abierto = !!ui.historialAbierto;
  return (
    '<div class="card" style="margin-top:10px">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-historial-compras">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13px">Einkaufsverlauf</span></div>' +
    clicaAquiBadgeHTML(abierto, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + pedidos.length + " von " + catalogo.length + " Produkten, die du schon kennst · " + (catalogo.length - pedidos.length) + " noch zu entdecken" + "</div>" +
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
                  '<span class="small">' + escapeHtml(p.nombre || "(ohne Namen)") + "</span>" +
                  '<span class="badge soft">' + n + (n === 1 ? " Einheit" : " Einheiten") + "</span>" +
                  "</div>"
                );
              }).join("") +
            "</div>"
          : '<p class="muted small" style="margin-top:8px">Du hast noch kein Produkt in irgendeiner Zwei-Wochen-Periode bestellt — sobald du es tust, erscheint es hier.</p>')
      : "") +
    "</div>"
  );
}

/* ---------------- Reunión de Enfoque (listas Izquierda/Derecha) ---------------- */

function resumenLineasEnfoqueHTML(lista) {
  const planIzq = sumaLineaEnfoque(lista, "izquierda", false), verIzq = sumaLineaEnfoque(lista, "izquierda", true);
  const planDer = sumaLineaEnfoque(lista, "derecha", false), verDer = sumaLineaEnfoque(lista, "derecha", true);
  function bloque(nombre, plan, ver) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      '<div class="rl-value">' + ver.toLocaleString("de") + ' <span class="muted small" style="font-weight:400">verifizierte Punkte</span></div>' +
      '<div class="rl-sub">Geplant, nicht verifiziert: ' + plan.toLocaleString("de") + " Punkte</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Links", planIzq, verIzq) + bloque("Rechts", planDer, verDer) + "</div>";
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
      ? arr.map(function (p) { return "• " + (p.nombre || "(ohne Namen)") + ": " + (Number(p.puntos) || 0).toLocaleString("de") + " Punkte" + (p.verificado ? " ✅ verifiziert" : " (nicht verifiziert)"); }).join("\n")
      : "  (keine Personen registriert)";
    return (
      "*Linie " + nombre + "*\n" +
      personasTxt +
      (otros ? "\n• Außerhalb der Liste (Eigenverbrauch/Sonstiges): " + otros.toLocaleString("de") + " Punkte" : "") +
      "\nVerifiziert: " + ver.toLocaleString("de") + " Punkte · Geplant, nicht verifiziert: " + plan.toLocaleString("de") + " Punkte"
    );
  }
  return (
    "🎯 Fokus-Treffen — Zwei-Wochen-Periode " + qn + (q ? " (" + q.nombre + ")" : "") + ":\n\n" +
    lineaTexto("Links", "izquierda") + "\n\n" +
    lineaTexto("Rechts", "derecha") +
    "\n\n" + (lista.reunionHecha ? "✅ Ich habe mein Fokus-Treffen mit meinen Partnern schon gemacht." : "⏳ Ich habe mein Fokus-Treffen mit meinen Partnern noch nicht gemacht.") +
    "\n\nHilfst du mir, das zu überprüfen, um meine Zwei-Wochen-Periode zu planen?"
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "Kein Name") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + "</div>" : "") +
    (p.atomyId || p.contrasena
      ? '<div class="muted small" style="margin-top:2px">' +
        (p.atomyId ? "ID " + escapeHtml(p.atomyId) : "") +
        (p.atomyId && p.contrasena ? " · " : "") +
        (p.contrasena ? "Passwort " + escapeHtml(p.contrasena) : "") +
        "</div>"
      : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-persona-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-persona-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (p.notas ? '<div class="muted small" style="margin-top:4px;font-style:italic">„' + escapeHtml(p.notas) + '“</div>' : "") +
    '<div class="rr-inputs">' +
    '<div class="field"><label>PVP</label><input type="number" min="0" step="10000" value="' + (Number(p.pvp) || 0) + '" data-roster-field="pvp" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="field"><label>PVG</label><input type="number" min="0" step="10000" value="' + (Number(p.puntos) || 0) + '" data-roster-field="puntos" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    "</div>" +
    '<div class="field" style="margin-top:8px"><label>Geplantes Datum</label><input type="date" value="' + (p.fecha || "") + '" data-roster-field="fecha" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="roster-check' + verificadoClass + '" data-action="toggle-verificado-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' +
    '<div class="box">' + (p.verificado ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (p.verificado ? "Verifiziert — hat seine Punkte schon bestellt" : "Als verifiziert markieren") + "</span>" +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Du hast noch niemanden zu dieser Linie hinzugefügt.</p>';

  return (
    '<div class="card" style="margin-top:16px;border-color:var(--gold)">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Fokus-Treffen</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">' +
    (qn >= 5
      ? "Du erreichst bald Sales Master — fange von hier an zu kontrollieren, wie viele Punkte jede Person deines Teams bestellen wird, pro Linie, um deinen Zyklus nicht zu verlieren."
      : "Registriere hier die Personen deines Teams nach linker/rechter Linie — es wird dir ab der Zwei-Wochen-Periode 5 und 6 immer mehr nützen, wenn du anfängst, den Zyklus auf dem Weg zum Sales Master zu kontrollieren.") +
    "</p>" +
    '<div class="roster-check' + (lista.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qn="' + qn + '">' +
    '<div class="box">' + (lista.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (lista.reunionHecha ? "Fokus-Treffen diese Periode gemacht" : "Markieren: Ich habe mein Fokus-Treffen mit meinen Partnern gemacht") + "</span>" +
    "</div>" +
    resumenLineasEnfoqueHTML(lista) +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, resumenEnfoqueTexto(state, qn)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Mit meinem Sponsor teilen</a>"
      : '<p class="muted small" style="margin-top:10px">Füge das WhatsApp deines Sponsors in den Einstellungen hinzu, um dein Fokus-Treffen teilen zu können.</p>') +
    '<div class="tabs" style="margin-top:10px">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea-enfoque" data-arg="izquierda">Links (' + (lista.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea-enfoque" data-arg="derecha">Rechts (' + (lista.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field" style="margin-top:10px"><label>Schon bestätigte Punkte außerhalb der Liste (Eigenverbrauch oder Sonstiges)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? lista.otrosIzquierda : lista.otrosDerecha) + '" data-field="listasEnfoque.' + qn + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-persona-enfoque" data-qn="' + qn + '" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Person hinzufügen</button>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
    "</div>"
  );
}

/* Quincena "en curso" del programa (la primera de las 6 aún no completada);
   si ya se completaron las 6, se muestra la última. Es el valor por defecto
   con el que se abre la página de Reunión de Enfoque cuando aún no se ha
   elegido ninguna quincena en esta sesión. */
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
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Zwei-Wochen-Periode ' + q.n + " · Wochen " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>"
  );
}

function renderReunionEnfoquePage(state, ui) {
  const qn = ui.enfoqueQuincena || quincenaEnfoquePorDefecto(state);
  return (
    sectionHeaderHTML("Fokus-Treffen", "Plane mit deinem Team, wie viele Punkte jede Person bestellen wird, pro Linie, Periode für Periode.", "target") +
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
      (ui.confirmDeletePersonaEnfoque === d.id ? "Sicher? Nochmal tippen zum Löschen" : "Person löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-persona-enfoque"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Person bearbeiten" : "Neue Person — Linie " + (d.linea === "izquierda" ? "Links" : "Rechts")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona-enfoque">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="field"><label>Telefon (optional)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy-ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Z. B. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Passwort</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">Das Passwort ist optional und nur dafür, damit du für diese Person Punkte eintragen kannst, falls sie es braucht — niemand ist verpflichtet, es zu teilen.</p>' +
    '<div class="field"><label>Notizen</label><textarea rows="2" data-draft-field="notas" placeholder="Anmerkungen...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona-enfoque">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona-enfoque">Abbrechen</button>' +
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
    '<div class="row gap-2">' + Icon("clipboard-list", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Produktrechner</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Markiere, welche Produkte du schon getestet hast, und wie viele du diese Periode kaufen möchtest — so weißt du, wie viele PV das ausmacht und wie viel du zahlen wirst, für dein Fokus-Treffen.</p>' +
    '<div class="muted small" style="margin-top:10px">Land / Katalog</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Geplante PV</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Zu zahlender Betrag</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " von " + catalogo.length + " Produkten getestet · " + planeados + " für diese Periode geplant</div>" +
    (planeados > 0
      ? (state.whatsapp && state.whatsapp.trim()
          ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, "Cumbre 90")) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Mit meinem Sponsor teilen</a>"
          : '<p class="muted small" style="margin-top:10px">Füge das WhatsApp deines Sponsors in den Einstellungen hinzu, um deine Bestellung teilen zu können.</p>')
      : "") +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        historialComprasHTML(state, ui, catalogo) +
        '<div class="field" style="margin-top:10px">' +
        '<div class="row gap-2" style="align-items:center;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);border-radius:12px;padding:9px 12px">' +
        Icon("search", { size: 15, color: "var(--text-soft)" }) +
        '<input id="calculadora-search" type="text" placeholder="Ein Produkt nach Namen suchen..." style="flex:1;background:transparent;border:none;color:var(--text);font-size:13.5px;outline:none">' +
        "</div></div>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Produkt hinzufügen</button>'
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
    const finishLabel = est.done ? "Woche abgeschlossen " + Icon("check", { size: 16, color: "#fff" }) : "Woche als abgeschlossen markieren";
    const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
    const contactos10Open = !!(ui.semanaContactos10Open && ui.semanaContactos10Open[s.n]);
    const evaluacionOpen = !!(ui.semanaEvaluacionOpen && ui.semanaEvaluacionOpen[s.n]);
    return (
      '<div class="card">' +
      '<div class="row between"><span style="font-weight:700;font-size:14px">Woche ' + s.n + "</span>" + (est.done ? '<span class="badge success">Abgeschlossen</span>' : "") + "</div>" +
      '<div class="muted small" style="margin-top:6px">PV-Ziel: <b style="color:var(--text)">' + escapeHtml(s.metaPV) + "</b></div>" +
      '<div class="muted small">Kontaktziel: <b style="color:var(--text)">' + escapeHtml(s.metaContactos) + "</b></div>" +
      '<div class="muted small" style="margin-top:2px;font-style:italic">' + escapeHtml(s.paso) + "</div>" +
      '<div style="margin-top:12px">' + checklist + "</div>" +
      '<button class="btn-primary" style="margin-top:14px;' + finishStyle + '" ' + (!allChecked || est.done ? "disabled" : "") + ' data-action="finish-semana" data-arg="' + s.n + '">' + finishLabel + "</button>" +
      '<div style="margin-top:12px">' + contactos10TablaHTML("semanas." + s.n + ".contactos10", est.contactos10, contactos10Open, "toggle-semana-contactos10", s.n) + "</div>" +
      '<div style="margin-top:10px">' + evaluacion7x7PanelHTML(state, "semanas." + s.n + ".evaluacion7x7", est.evaluacion7x7, evaluacionOpen, "toggle-semana-evaluacion", s.n, "Woche " + s.n) + "</div>" +
      "</div>"
    );
  }).join("");

  return (
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-quincenas">' + Icon("chevron-left", { size: 16 }) + " 90-Tage-Plan</button>" +
    "<div>" +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Zwei-Wochen-Periode ' + q.n + " · Wochen " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>" +
    quincenaAscensoHTML(doneCount) +
    semanasHtml +
    (qDone ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:600">🏕️ Zwei-Wochen-Periode abgeschlossen!</div>' : "") +
    '<button class="btn-secondary" data-action="goto" data-arg="enfoque">' + Icon("target", { size: 15 }) + " Zum Fokus-Treffen</button>"
  );
}

/* ---------------- Premios del patrocinador ---------------- */

function renderPremios(state, ui) {
  const quincenasMap = derivarQuincenas(state);
  const desc = "Passe sie an, wie du möchtest — ändere sie, wann es dir passt, sogar Monat für Monat.";
  const addBtn = '<button class="btn-secondary" style="margin-top:12px" data-action="add-premio">+ Prämie hinzufügen</button>';

  if (!state.premios.length) {
    return sectionHeaderHTML("Prämien deines Sponsors", desc, "gift") +
      '<div class="card" style="text-align:center">' +
      Icon("gift", { size: 30, color: "var(--text-soft)" }) +
      '<p class="muted small" style="margin-top:10px;line-height:1.5">Dein Sponsor hat hier noch keine Prämien eingerichtet. Sobald er dir eine bestätigt, füge sie mit dem Button unten hinzu.</p>' +
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
      '<input type="text" placeholder="Meilenstein" value="' + escapeHtml(p.hito) + '" data-field="premios.' + i + '.hito">' +
      '<input type="text" placeholder="Prämie" style="color:var(--accent);font-weight:600" value="' + escapeHtml(p.premio) + '" data-field="premios.' + i + '.premio">' +
      "</div>";
    return (
      '<div class="tile' + (desbloqueado ? " unlocked" : "") + '">' +
      gemCornersHTML() +
      '<div class="tile-media" style="background:' + (p.imagen ? "transparent" : "radial-gradient(circle at 30% 20%, var(--accent-soft), var(--accent))") + '">' +
      media +
      '<div class="badge ' + (desbloqueado ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (desbloqueado ? "Abgeschlossen" : "Noch zu erreichen") + "</div>" +
      uploadBtn + deleteBtn +
      "</div>" +
      '<div class="tile-body">' + body + "</div>" +
      "</div>"
    );
  }).join("");

  return sectionHeaderHTML("Prämien deines Sponsors", desc, "gift") +
    '<div class="grid-2">' + tiles + "</div>" +
    addBtn +
    '<p class="muted small" style="line-height:1.5">Die Erfolge werden von dir selbst in der App markiert. Dein Sponsor wird den Meilenstein überprüfen (zum Beispiel mit einem Screenshot, den du ihm per WhatsApp schickst), bevor er die Prämie übergibt.</p>';
}

/* ---------------- Perfil ---------------- */

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
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Letzte Aktivitäten</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    recogCardHTML(state.nombre, state.foto, rango.nombre, rango.pv, state.rangoIndex) +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="perfil-file">' + Icon("camera", { size: 15 }) + " " + (state.foto ? "Foto ändern" : "Foto hinzufügen") + "</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="download-recog-card">' + Icon("download", { size: 15, color: "#fff" }) + " Teilen</button>" +
    '<input id="perfil-file" type="file" accept="image/*" class="hidden" data-target="foto">' +
    "</div>" +
    '<div class="text-center muted small" style="margin-top:-8px">🔥 ' + state.racha + " " + (state.racha === 1 ? "Tag in Folge" : "Tage in Folge") + "</div>" +
    '<div class="card" style="text-align:center">' +
    '<div style="font-weight:700;font-size:14px">Lade ein, Konsument VIP zu werden</div>' +
    '<p class="muted small" style="line-height:1.5;margin-top:4px">Teile diesen Beitrag in deinen Netzwerken, damit deine Kontakte die Vorteile entdecken, Konsument VIP bei Atomy zu sein.</p>' +
    '<img src="img/consumidor-vip.png" alt="Konsument VIP" style="width:100%;max-width:220px;border-radius:14px;margin:10px auto 0;display:block">' +
    '<button class="btn-primary" style="width:100%;margin-top:10px;color:#fff" data-action="share-consumidor-vip">' + Icon("share2", { size: 15, color: "#fff" }) + " Teilen</button>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Dein Rang</div>' +
    '<div class="muted small" style="margin-bottom:12px">Tippe auf das Abzeichen des Rangs, den du aktuell bei Atomy hast.</div>' +
    '<div class="grid-3">' + rangoButtons + "</div>" +
    '<div class="card" style="margin-top:12px;padding:14px"><div style="font-size:14px;font-weight:600">' + escapeHtml(rango.nombre) + '</div><div class="muted small" style="margin-top:2px">' + escapeHtml(rango.meta) + "</div></div>" +
    "</div>" +
    actividad
  );
}

/* ---------------- Logros ---------------- */

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

  return sectionHeaderHTML("Erfolgsübersicht", logrosHechos + " von " + totalLogros + " Meilensteinen erobert", "award") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Etappen des 9-Tage-Plans</div><div class="grid-3">' + etapas + "</div></div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Camps des 90-Tage-Plans</div><div class="grid-3">' + camps + "</div></div>" +
    (state.premios.length ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Prämien deines Sponsors</div><div class="grid-3">' + premios + "</div></div>" : "") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Letzter Erfolg</div><div class="grid-3">' + logroChipHTML("Sales Master — der Gipfel", cumbreLograda, "mountain-flag", "img/logro-cumbre.png") + "</div></div>";
}

/* ---------------- Cumbre ---------------- */

function renderCumbre(state) {
  const codigo = state.codigoCumbre || "C90-000000";
  return (
    '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;padding-top:20px">' +
    Icon("award", { size: 56, color: "var(--gold)" }) +
    '<h2 style="font-size:22px;font-weight:700">Du hast den Gipfel erreicht, ' + escapeHtml(state.nombre) + "!</h2>" +
    '<p class="muted" style="font-size:14px;max-width:300px;line-height:1.6">Du hast deinen 90-Tage-Plan abgeschlossen und dich für den Rang Sales Master qualifiziert. In den kommenden Wochen erhältst du per Post zu Hause einen Brief des Atomy-Direktors, versandt aus Korea.</p>' +
    '<div class="card" style="border:2px solid var(--gold);width:100%;text-align:left">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em">Zertifikat</div>' +
    '<div style="font-size:15px;font-weight:700;margin-top:4px">Du hast Cumbre 90 abgeschlossen</div>' +
    '<div class="muted small" style="margin-top:4px">Code ' + codigo + "</div>" +
    '<button class="btn-primary" style="background:var(--gold);margin-top:16px" data-action="download-cert">Zertifikat herunterladen</button>' +
    "</div>" +
    '<div class="card muted small" style="width:100%">Du bist nicht allein auf dieser Reise — feiere mit deinem Sponsor und bereite dich darauf vor, deinen ersten Partner auf demselben Weg zu begleiten.</div>' +
    "</div>"
  );
}

/* ---------------- Ajustes ---------------- */

function renderAjustes(state, ui) {
  const whatsappField =
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">WhatsApp deines Sponsors</label>' +
    '<p class="muted small" style="margin-top:-2px;margin-bottom:8px;line-height:1.5">Der schwebende grüne Button schreibt direkt an diese Nummer.</p>' +
    '<input type="text" inputmode="numeric" placeholder="Z. B. 4916000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>';

  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Browser-Benachrichtigungen</div><div class="muted small" style="margin-top:2px">Erinnerungshinweise außerhalb der App</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  const resetLabel = ui.confirmReset ? "Sicher? Nochmal tippen zum Zurücksetzen" : "Meinen Fortschritt zurücksetzen";

  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Lizenz dieser Kopie</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">Diese Kopie von Cumbre 90 ist exklusiv lizenziert für <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> und sein eigenes Team. Sie darf nicht mit anderen Führungskräften oder Teams geteilt werden.</p>' +
      "</div>"
    : "";

  return (
    sectionHeaderHTML("Einstellungen", "", "settings") +
    licenciaCard +
    '<div class="card row between">' +
    '<div><div style="font-size:14px;font-weight:600">Sponsor-Modus</div><div class="muted small" style="margin-top:2px">Aktiviere ihn, wenn du auch dein eigenes Team begleitest — fügt den Bericht meiner Partner hinzu</div></div>' +
    '<div class="toggle' + (state.mentorMode ? " on" : "") + '" data-action="toggle-mentor"><div class="knob"></div></div>' +
    "</div>" +
    whatsappField +
    notifRow +
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("download", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Sicherungskopie</span></div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Alle deine Daten (Liste der 250, Stammbaum, dein Fortschritt) existieren nur auf diesem Gerät. Lade eine Sicherung herunter und speichere sie, wo du möchtest (dein Google Drive, E-Mail usw.) — so verlierst du sie nicht, wenn du dein Handy wechselst oder Browserdaten löschst.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-respaldo">' + Icon("download", { size: 15 }) + " Sicherungskopie herunterladen</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="importar-respaldo-input">' + Icon("repeat", { size: 15 }) + " Aus Datei wiederherstellen</button>" +
    "</div>" +
    '<input id="importar-respaldo-input" type="file" accept="application/json,.json" class="hidden" data-target="__importBackup">' +
    "</div>" +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}

/* ---------------- Lista de 250 Contactos (CRM) ---------------- */

function contactoNivelBadge(nivel) {
  const cls = nivel === "Heiß" ? "warn" : nivel === "Lauwarm" ? "gold" : "soft";
  return '<span class="badge ' + cls + '">' + escapeHtml(nivel) + "</span>";
}

function renderContactos(state, ui) {
  const contactos = state.contactos || [];
  const filtro = ui.contactoFiltro || "todos";
  const hoy = hoyISO();

  const counts = { "Heiß": 0, "Lauwarm": 0, "Kalt": 0 };
  contactos.forEach(function (c) { if (counts[c.nivel] != null) counts[c.nivel]++; });

  const filterBtns = ["todos"].concat(CONTACTO_NIVELES).map(function (f) {
    const active = filtro === f;
    const label = f === "todos" ? "Alle · " + contactos.length : f + " · " + counts[f];
    return '<button class="badge ' + (active ? "gold" : "dark") + '" style="cursor:pointer" data-action="filter-contactos" data-arg="' + f + '">' + label + "</button>";
  }).join(" ");

  const filtered = filtro === "todos" ? contactos : contactos.filter(function (c) { return c.nivel === filtro; });
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
        const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
        const esHoy = c.proximoSeguimiento === hoy;
        const fechaTxt = c.proximoSeguimiento ? (vencido ? "Überfällig · " : esHoy ? "Heute · " : "") + c.proximoSeguimiento : "Keine Nachverfolgung";
        const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
        const waLink = c.telefono
          ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
          : "";
        return nivelHeader + (
          '<div class="card contact-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
          '<div class="row between" style="align-items:flex-start">' +
          '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre) + "</div>" +
          '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "Kein Telefon") + (c.pais ? " · " + escapeHtml(c.pais) : "") + "</div></div>" +
          contactoNivelBadge(c.nivel) +
          "</div>" +
          '<div class="row between" style="margin-top:10px;align-items:center">' +
          '<span class="small" style="font-weight:600' + ((c.estado === "Partner" || c.estado === "Konsument") ? ";color:var(--gold-light)" : "") + '">' + escapeHtml(c.estado) + "</span>" +
          '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
          "</div>" +
          (c.notaSeguimiento ? '<div class="muted small" style="margin-top:4px;font-style:italic">„' + escapeHtml(c.notaSeguimiento) + '“</div>' : "") +
          (c.proximoSeguimiento
            ? '<div class="row gap-2" style="margin-top:6px;align-items:center;cursor:pointer" data-action="marcar-seguimiento-hecho" data-arg="' + c.id + '">' +
              Icon("check-circle", { size: 13, color: "var(--success)" }) +
              '<span class="small" style="color:var(--success);font-weight:600">Nachverfolgung als erledigt markieren</span></div>'
            : "") +
          '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="3">+3 Tage</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="7">+1 Wo.</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="30">+1 Monat</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="60">+2 Monate</button>' +
          waLink +
          '<button class="icon-btn" data-action="edit-contacto" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
          "</div>" +
          '<div class="row gap-2" style="margin-top:6px">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto" data-arg="' + c.id + '" data-tipo="llamada">' + Icon("phone-call", { size: 13 }) + " Anruf</button>" +
          '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto" data-arg="' + c.id + '" data-tipo="mensaje">' + Icon("message-circle", { size: 13 }) + " Nachricht</button>" +
          "</div>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">Du hast noch keine Kontakte registriert. Tippe auf „+ Neuer Kontakt“, um deine Liste der 250 zu beginnen.</p>';

  return (
    sectionHeaderHTML("Liste der 250 Kontakte", contactos.length + " von 250 registriert", "users") +
    '<p class="muted small" style="margin-top:-4px">Tippe auf „Anruf“ oder „Nachricht“ bei jedem Kontakt, damit es in deinem Wochenbericht registriert wird.</p>' +
    '<input id="contacto-search" type="text" placeholder="Nach Name oder Telefon suchen..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<div class="row gap-2">' +
    '<button class="btn-primary" style="flex:1" data-action="add-contacto">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Neu</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="importar-contactos">' + Icon("download", { size: 16 }) + " Kontakte importieren</button>" +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Kontakte importieren</span>' +
    '<button class="icon-btn" data-action="cerrar-importar-contactos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Dein Browser erlaubt es nicht, den Kontaktauswähler direkt hier zu öffnen. Kopiere deine Kontakte von deinem Handy — einen pro Zeile, im Format <b>Name, Telefon</b> — und füge sie unten ein:</p>' +
    '<textarea rows="9" id="importar-contactos-textarea" placeholder="Anna Müller, +49 170 111 222\nCarlos Schmidt, +49 170 333 444" style="margin-top:10px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit"></textarea>' +
    '<button class="btn-primary" style="margin-top:14px" data-action="confirmar-importar-contactos">Importieren</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cerrar-importar-contactos">Abbrechen</button>' +
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
      (ui.confirmDeleteContacto === ui.contactoEditId ? "Sicher? Nochmal tippen zum Löschen" : "Kontakt löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Kontakt bearbeiten" : "Neuer Kontakt") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    '<div class="field" style="flex:1"><label>Land</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Land"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Stufe</label><select data-draft-field="nivel" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + nivelOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Status</label><select data-draft-field="estado" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Notizen</label><textarea rows="2" data-draft-field="notas" placeholder="Wie du ihn/sie kennengelernt hast, Interessen...">' + escapeHtml(d.notas) + "</textarea></div>" +
    '<div class="field"><label>Nächste Nachverfolgung</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="3">+3 Tage</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="7">+1 Woche</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="30">+1 Monat</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="60">+2 Monate</button>' +
    "</div>" +
    '<div class="field"><label>Nachverfolgungsnotiz</label><input type="text" data-draft-field="notaSeguimiento" value="' + escapeHtml(d.notaSeguimiento || "") + '" placeholder="Z. B. Anrufen, um nach seiner Entscheidung zu fragen"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto">Kontakt speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto">Abbrechen</button>' +
    "</div></div>"
  );
}

/* ---------------- Clientes — personas que ya compraron, con histórico de pedidos ---------------- */

function clienteRowHTML(c) {
  const hoy = hoyISO();
  const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
  const esHoy = c.proximoSeguimiento === hoy;
  const fechaTxt = c.proximoSeguimiento ? (vencido ? "Überfällig · " : esHoy ? "Heute · " : "") + c.proximoSeguimiento : "Keine Nachverfolgung";
  const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
    : "";
  const totalCompras = (c.compras || []).length;
  return (
    '<div class="card cliente-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "Kein Name") + "</div>" +
    '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "Kein Telefon") + (totalCompras ? " · " + totalCompras + " Kauf" + (totalCompras === 1 ? "" : "e") : "") + "</div></div>" +
    '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="7">1 Wo.</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="14">2 Wo.</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="30">1 Monat</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="60">2 Monate</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-meses="11">11 Monate</button>' +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Du hast noch keine Kunden registriert. Tippe auf „Neuer Kunde“, um zu beginnen.</p>';
  return (
    sectionHeaderHTML("Kunden", clientes.length + " registriert", "package") +
    '<input id="cliente-search" type="text" placeholder="Nach Name oder Telefon suchen..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<button class="btn-primary" data-action="add-cliente">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Neuer Kunde</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function compraClienteRowHTML(co) {
  return (
    '<div class="row between" style="padding:7px 0;border-top:1px solid var(--border-soft);align-items:center">' +
    '<div style="min-width:0"><div style="font-weight:600;font-size:13px">' + escapeHtml(co.producto || "Produkt") + "</div>" +
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
      (ui.confirmDeleteCliente === ui.clienteEditId ? "Sicher? Nochmal tippen zum Löschen" : "Kunden löschen") +
      "</button>"
    : "";
  const compras = (d.compras || []).slice().sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
  const comprasHtml = compras.length
    ? compras.map(compraClienteRowHTML).join("")
    : '<p class="muted small" style="padding:4px 0">Noch keine Käufe registriert.</p>';
  const totalPV = compras.reduce(function (acc, co) { return acc + (Number(co.pv) || 0); }, 0);
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-cliente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:400px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Kunden bearbeiten" : "Neuer Kunde") + "</span>" +
    '<button class="icon-btn" data-action="cancel-cliente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy-ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Optional"></div>' +
    '<div class="field" style="flex:1"><label>Passwort</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    '<div class="field" style="flex:1"><label>Geburtsdatum</label><input type="date" data-draft-field="fechaNacimiento" value="' + (d.fechaNacimiento || "") + '"></div>' +
    "</div>" +
    '<div class="field"><label>Anmerkungen</label><textarea rows="2" data-draft-field="observaciones" placeholder="Z. B. Allergien, Erkrankungen, Vorlieben...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    '<div class="field"><label>Nächste Nachverfolgung</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2" style="flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="7">1 Wo.</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="14">2 Wo.</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="30">1 Monat</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="60">2 Monate</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-meses="11">11 Monate</button>' +
    "</div>" +
    '<div class="card" style="margin-top:2px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("package", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13.5px">Gekaufte Produkte</span></div>' +
    (totalPV ? '<div class="muted small" style="margin-top:2px">Verlauf gesamt: ' + totalPV + " PV</div>" : "") +
    '<div style="margin-top:2px">' + comprasHtml + "</div>" +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<input id="cliente-compra-producto" type="text" placeholder="Produkt" style="flex:2;min-width:110px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<input id="cliente-compra-valor" type="number" min="0" placeholder="Wert" style="flex:1;min-width:70px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<input id="cliente-compra-pv" type="number" min="0" placeholder="PV" style="flex:1;min-width:60px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    "</div>" +
    '<input id="cliente-compra-fecha" type="date" value="' + hoyISO() + '" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<button class="btn-secondary" style="margin-top:8px;width:100%" data-action="add-compra-cliente">' + Icon("coins", { size: 14 }) + " Kauf hinzufügen</button>" +
    "</div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-cliente">Kunden speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-cliente">Abbrechen</button>' +
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
    : '<p class="muted small" style="margin-top:8px">Heute hat niemand von deinen Kunden Geburtstag.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between">' +
    '<span class="row gap-2" style="align-items:center;font-weight:700;font-size:15px">' + Icon("party", { size: 16, color: "var(--gold)" }) + "<span>Heutige Geburtstage</span></span>" +
    '<button class="icon-btn" data-action="close-modal">' + Icon("x", { size: 18 }) + "</button></div>" +
    body +
    "</div></div>"
  );
}

function renderAgenda6Modal(ui) {
  const d = ui.agenda6Draft;
  if (!d) return "";
  const filas = DIAS.map(function (diaInfo, i) {
    const hora = (d.dias[i] && d.dias[i].hora) || "";
    return (
      '<div class="field">' +
      '<label>Tag ' + (i + 1) + " — " + escapeHtml(diaInfo.titulo) + "</label>" +
      '<input type="time" data-agenda6-hora="' + i + '" value="' + escapeHtml(hora) + '">' +
      "</div>"
    );
  }).join("");
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-agenda6"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row gap-2">' + Icon("footprints", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:15px">' + escapeHtml(d.contactoNombre) + " ist ein neuer Partner!</span></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Plane hier die ' + DIAS.length + " Treffen des " + DIAS.length + "-Tage-Plans mit " + escapeHtml(d.contactoNombre) + " — sie werden in deinem Wochenplan gespeichert, an dem jeweils passenden Tag. Lass die Uhrzeit leer für den Tag, den du noch nicht planen möchtest.</p>" +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + filas + "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-agenda6">' + DIAS.length + '-Tage-Plan erstellen</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-agenda6">Jetzt nicht</button>' +
    "</div></div>"
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(a.nombre || "Kein Name") + "</div>" +
    (subLinea ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(subLinea) + "</div>" : "") +
    (a.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(a.telefono) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-ascendente" data-arg="' + a.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-ascendente" data-arg="' + a.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (a.horarioNoMolestar ? '<div class="muted small" style="margin-top:6px;font-style:italic">Nicht stören: ' + escapeHtml(a.horarioNoMolestar) + "</div>" : "") +
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
    : '<p class="muted small" style="text-align:center;padding:20px 0">Du hast noch niemanden aus deiner aufsteigenden Linie hinzugefügt.</p>';

  return (
    sectionHeaderHTML("Mein Stammbaum", "Deine ID, dein Sponsor und deine aufsteigende Linie, immer griffbereit.", "crown") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("user-badge", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Ich</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">So können deine eigenen Partner deine ID und dein Passwort einsehen, ohne dich jedes Mal fragen zu müssen.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Atomy-ID</label><input type="text" data-field="arbolGenealogico.yo.atomyId" value="' + escapeHtml(yo.atomyId) + '" placeholder="Z. B. 93248238"></div>' +
    '<div class="field"><label>Passwort</label><input type="text" data-field="arbolGenealogico.yo.contrasena" value="' + escapeHtml(yo.contrasena) + '" placeholder="Dein Atomy-Passwort"></div>' +
    '<div class="field"><label>Geburtsdatum</label><input type="date" data-field="arbolGenealogico.yo.fechaNacimiento" value="' + escapeHtml(yo.fechaNacimiento || "") + '"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row between"><div class="row gap-2">' + Icon("crown", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Sponsor</span></div>' + waPatrocinador + "</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Seine Kontakt- und Zoom-Daten — um ihn um Hilfe zu bitten oder dich für Schulungen des Unternehmens anzumelden, die oft die ID deines Sponsors verlangen.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Name</label><input type="text" data-field="arbolGenealogico.patrocinador.nombre" value="' + escapeHtml(p.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy-ID</label><input type="text" data-field="arbolGenealogico.patrocinador.atomyId" value="' + escapeHtml(p.atomyId) + '" placeholder="Z. B. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-field="arbolGenealogico.patrocinador.rango" value="' + escapeHtml(p.rango) + '" placeholder="Z. B. Sales Master"></div>' +
    "</div>" +
    '<div class="field"><label>Geburtsdatum</label><input type="date" data-field="arbolGenealogico.patrocinador.fechaNacimiento" value="' + escapeHtml(p.fechaNacimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Land</label><input type="text" data-field="arbolGenealogico.patrocinador.pais" value="' + escapeHtml(p.pais) + '" placeholder="Z. B. Deutschland"></div>' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-field="arbolGenealogico.patrocinador.telefono" value="' + escapeHtml(p.telefono) + '" placeholder="+49 170 0000000"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Zoom-ID</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomId" value="' + escapeHtml(p.zoomId) + '" placeholder="Optional"></div>' +
    '<div class="field" style="flex:1"><label>Zoom-Passwort</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomContrasena" value="' + escapeHtml(p.zoomContrasena) + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="field"><label>Zeiten, in denen man nicht anrufen soll</label><input type="text" data-field="arbolGenealogico.patrocinador.horarioNoLlamar" value="' + escapeHtml(p.horarioNoLlamar) + '" placeholder="Z. B. Nach 20 Uhr, nicht sonntags"></div>' +
    '<div class="field"><label>WhatsApp-Supportgruppe</label><input type="text" data-field="arbolGenealogico.patrocinador.grupoWhatsapp" value="' + escapeHtml(p.grupoWhatsapp || "") + '" placeholder="Füge hier den Einladungslink zur Gruppe ein"></div>' +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">Wenn du ihn hinzufügst, erscheint ein schwebender Button, damit deine neuen Partner dort schreiben können, wenn sie außerhalb deiner Zeiten oder der mit dir vereinbarten Kontrollzeit Fragen haben.</p>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Aufsteigende Linie</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Die Personen über deinem direkten Sponsor — nützlich, wenn du ihre Unterstützung oder ihre ID für eine Schulung brauchst.</p>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-ascendente">' + Icon("crown", { size: 16, color: "#fff" }) + " Weitere Ebene höher in der Linie hinzufügen</button>" +
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
      (ui.confirmDeleteAscendente === d.id ? "Sicher? Nochmal tippen zum Löschen" : "Person löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-ascendente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Person bearbeiten" : "Neue Person der aufsteigenden Linie") + "</span>" +
    '<button class="icon-btn" data-action="cancel-ascendente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-draft-field="rango" value="' + escapeHtml(d.rango) + '" placeholder="Z. B. Sales Master"></div>' +
    '<div class="field" style="flex:1"><label>Land</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Z. B. Deutschland"></div>' +
    "</div>" +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    '<div class="field"><label>Zeiten, in denen man nicht stören soll</label><input type="text" data-draft-field="horarioNoMolestar" value="' + escapeHtml(d.horarioNoMolestar) + '" placeholder="Z. B. Nach 21 Uhr"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-ascendente">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-ascendente">Abbrechen</button>' +
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(s.nombre || "Kein Name") + "</div>" +
    (s.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(s.telefono) + "</div>" : "") +
    (s.zoomId ? '<div class="muted small" style="margin-top:2px">Zoom: ' + escapeHtml(s.zoomId) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-sos" data-arg="' + s.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-sos" data-arg="' + s.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (s.nota ? '<div class="muted small" style="margin-top:6px;font-style:italic">„' + escapeHtml(s.nota) + '“</div>' : "") +
    "</div>"
  );
}

function renderLlamadasSOS(state, ui) {
  const lista = state.llamadasSOS || [];
  const rows = lista.length
    ? lista.map(function (s) { return sosRowHTML(s); }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">Du hast noch keine S.O.S.-Kontakte gespeichert.</p>';
  return (
    sectionHeaderHTML("S.O.S.-Anrufe", "Personen, die du um Unterstützung anrufen kannst, auch wenn sie nicht aus deiner eigenen Linie sind.", "bell") +
    '<div class="card"><p class="small" style="line-height:1.6">Manchmal kommt die Hilfe, die du brauchst, nicht aus deinem direkten Stammbaum — es kann ein Mentor eines anderen Teams sein, ein Trainer des Unternehmens oder jemand Vertrauenswürdiges, der sich mit einem Thema auskennt. Speichere hier, wen du in solchen Momenten anrufen kannst.</p></div>' +
    '<button class="btn-primary" data-action="add-sos">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Kontakt hinzufügen</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderSOSModal(ui) {
  const d = ui.sosDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-sos" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSOS === d.id ? "Sicher? Nochmal tippen zum Löschen" : "Kontakt löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-sos"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Kontakt bearbeiten" : "Neuer S.O.S.-Kontakt") + "</span>" +
    '<button class="icon-btn" data-action="cancel-sos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    '<div class="field"><label>Zoom-Code/ID</label><input type="text" data-draft-field="zoomId" value="' + escapeHtml(d.zoomId || "") + '" placeholder="Z. B. 123 456 7890"></div>' +
    '<div class="field"><label>Notiz</label><textarea rows="2" data-draft-field="nota" placeholder="Warum zu dieser Person gehen?">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-sos">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-sos">Abbrechen</button>' +
    "</div></div>"
  );
}

/* ---------------- Mis Socios — directorio permanente por línea izquierda/derecha ---------------- */

function misSocioRowHTML(linea, s) {
  const meses = mesesDesde(s.fechaUltimaCompra);
  const porVencer = meses !== null && meses >= 11;
  return (
    '<button class="card" style="padding:11px 13px;width:100%;text-align:left;display:block;cursor:pointer' +
    (porVencer ? ";border-color:var(--warn);background:rgba(240,166,92,0.1)" : "") + '" data-action="edit-socio" data-linea="' + linea + '" data-arg="' + s.id + '">' +
    '<div class="row between" style="align-items:center;gap:6px">' +
    '<span style="font-weight:700;font-size:13.5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap' + (porVencer ? ";color:var(--warn)" : "") + '">' + escapeHtml(s.nombre || "Kein Name") + "</span>" +
    (porVencer ? Icon("triangle-alert", { size: 14, color: "var(--warn)" }) : "") +
    "</div></button>"
  );
}

function misSociosColumnaHTML(state, linea) {
  const lista = (state.misSocios && state.misSocios[linea]) || [];
  const sorted = lista.slice().sort(function (a, b) { return (a.nombre || "").localeCompare(b.nombre || ""); });
  const rows = sorted.length
    ? sorted.map(function (s) { return misSocioRowHTML(linea, s); }).join("")
    : '<p class="muted small" style="text-align:center;padding:12px 0">Noch keine Partner.</p>';
  return (
    '<div style="min-width:0">' +
    '<div style="font-weight:700;font-size:13px;margin-bottom:6px">' + (linea === "izquierda" ? "Links" : "Rechts") + " · " + lista.length + "</div>" +
    '<button class="btn-secondary" style="width:100%;padding:8px;font-size:12.5px" data-action="add-socio" data-arg="' + linea + '">' + Icon("phone-call", { size: 14 }) + " Hinzufügen</button>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
    "</div>"
  );
}

function renderMisSocios(state) {
  return (
    sectionHeaderHTML("Meine Partner", "Dein dauerhaftes Teamverzeichnis, nach linker und rechter Linie. Tippe auf einen Namen, um seine Daten zu sehen oder zu aktualisieren.", "users") +
    '<div class="card"><p class="small" style="line-height:1.6">Wenn ein Partner seit <b>11 Monaten nicht gekauft hat</b>, wird sein Name orange hervorgehoben, um dich zu warnen, dass er kurz vor dem Verfall steht und einen Kauf tätigen sollte.</p></div>' +
    '<div class="grid-2">' + misSociosColumnaHTML(state, "izquierda") + misSociosColumnaHTML(state, "derecha") + "</div>"
  );
}

function renderSocioModal(ui) {
  const d = ui.socioDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-socio" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSocio === d.id ? "Sicher? Nochmal tippen zum Löschen" : "Partner löschen") +
      "</button>"
    : "";
  const meses = mesesDesde(d.fechaUltimaCompra);
  const aviso = meses !== null && meses >= 11
    ? '<p class="small" style="margin-top:-4px;color:var(--warn);font-weight:600;display:flex;align-items:center;gap:5px">' + Icon("triangle-alert", { size: 13, color: "var(--warn)" }) + "Hat seit " + meses + " Monaten nicht gekauft — steht kurz vor dem Verfall</p>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-socio"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Partner bearbeiten" : "Neuer Partner — Linie " + (d.linea === "izquierda" ? "Links" : "Rechts")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-socio">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Atomy-ID</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Z. B. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Passwort</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Optional"></div>' +
    "</div>" +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    '<div class="field"><label>Zoom-Code/ID</label><input type="text" data-draft-field="zoomId" value="' + escapeHtml(d.zoomId || "") + '" placeholder="Z. B. 123 456 7890"></div>' +
    '<div class="field"><label>PVP <span class="muted" style="font-weight:400">(aktualisiere es, wenn er es dir schickt)</span></label><input type="number" min="0" step="10000" data-draft-field="pvp" value="' + (Number(d.pvp) || 0) + '"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Geburtsdatum</label><input type="date" data-draft-field="fechaCumpleanos" value="' + (d.fechaCumpleanos || "") + '"></div>' +
    '<div class="field" style="flex:1"><label>Datum des letzten Kaufs</label><input type="date" data-draft-field="fechaUltimaCompra" value="' + (d.fechaUltimaCompra || "") + '"></div>' +
    "</div>" +
    aviso +
    '<div class="field"><label>Notizen</label><textarea rows="2" data-draft-field="notas" placeholder="Anmerkungen...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-socio">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-socio">Abbrechen</button>' +
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "Kein Name") +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Du hast noch keine Event-Kontakte gespeichert.</p>';
  return (
    sectionHeaderHTML("Kontaktliste", "Personen, die du bei Seminaren, Konventionen oder anderen Live-Events kennengelernt hast — sie sind noch nicht immer Interessenten.", "users") +
    '<button class="btn-primary" data-action="add-contacto-evento">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Kontakt hinzufügen</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderContactoEventoModal(ui) {
  const d = ui.contactoEventoDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contacto-evento" data-arg="' + d.id + '">' +
      (ui.confirmDeleteContactoEvento === d.id ? "Sicher? Nochmal tippen zum Löschen" : "Kontakt löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto-evento"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Kontakt bearbeiten" : "Neuer Kontakt") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto-evento">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Vollständiger Name"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Land</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Z. B. Deutschland"></div>' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+49 170 0000000"></div>' +
    "</div>" +
    '<div class="field"><label>Anmerkungen</label><textarea rows="2" data-draft-field="observaciones" placeholder="Wo du ihn/sie kennengelernt hast, Interessen...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto-evento">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto-evento">Abbrechen</button>' +
    "</div></div>"
  );
}

/* ---------------- Agenda Semanal ---------------- */

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
    return new Date(fecha + "T00:00:00").toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "short" });
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(z.titulo || "Meeting ohne Titel") + "</div>" +
    '<div class="row gap-2" style="margin-top:2px;flex-wrap:wrap">' +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " Nur " + escapeHtml(agendaFechaLabel(z.fecha)) + "</span>" : '<span class="badge dark">Jede Woche</span>') +
    (z.hora ? '<span class="muted small">' + escapeHtml(z.hora) + "</span>" : "") +
    (z.recordar ? Icon("bell", { size: 11, color: "var(--gold-light)" }) : "") +
    "</div></div></div>" +
    '<button class="icon-btn" data-action="edit-zoom" data-dia="' + dia + '" data-arg="' + z.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    "</div>" +
    (z.enlace
      ? '<div class="row gap-2" style="margin-top:10px">' +
        '<a class="btn-secondary" style="flex:1;padding:8px;text-align:center" href="' + escapeHtml(z.enlace) + '" target="_blank" rel="noreferrer">' + Icon("video", { size: 14 }) + " Teilnehmen</a>" +
        '<button class="icon-btn" data-action="copy-zoom-link" data-arg="' + escapeHtml(z.enlace) + '">' + Icon("copy", { size: 14 }) + "</button>" +
        "</div>"
      : '<div class="muted small" style="margin-top:8px">Noch kein Link gespeichert — tippe, um ihn hinzuzufügen.</div>') +
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
    : '<p class="muted small" style="text-align:center;padding:16px 0">Keine Aktivitäten für ' + escapeHtml(diaInfo.label) + ".</p>";

  const zoomsHtml = diaData.zooms.length
    ? diaData.zooms.map(function (z) { return zoomRowHTML(diaActivo, z); }).join("")
    : '<p class="muted small" style="text-align:center;padding:16px 0">Keine Zoom-Meetings für diesen Tag gespeichert.</p>';

  return (
    sectionHeaderHTML("Wochenplan", "Deine Arbeitsroutine, Tag für Tag — Anrufe, Besuche, Präsentationen, Registrierungen und Schulungen, plus deine Zoom-Meetings.", "calendar") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + tabs + "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Aktivitäten — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-actividad" data-arg="' + diaActivo + '">+ Hinzufügen</button></div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + actividadesHtml + "</div>" +
    "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Zoom — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-zoom" data-arg="' + diaActivo + '">+ Hinzufügen</button></div>' +
    '<div class="muted small" style="margin-top:2px">Speichere hier deine wiederkehrenden Zoom-Meetings (derselbe Link jede Woche) oder ein einmaliges, sobald du die Einladung erhältst — zum Beispiel, wenn man dir heute ein Zoom-Meeting für morgen ankündigt, fügst du es hier mit Datum, Uhrzeit und Link hinzu.</div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + zoomsHtml + "</div>" +
    "</div>"
  );
}

/* ---------------- Informe Semanal ---------------- */

const REGISTRO_TIPOS = [
  { id: "llamadas", label: "Anrufe", icon: "phone-call" },
  { id: "mensajes", label: "Einladungsnachrichten", icon: "message-circle" },
  { id: "pedidos", label: "Bestellungen", icon: "package" },
];

/* Estadísticas derivadas de la Lista de 250 (no son contadores manuales: se
   calculan al vuelo a partir de state.contactos, según estadoFecha/seguimientos). */
const REGISTRO_DERIVADOS = [
  { id: "contactados", label: "Kontaktiert", icon: "phone-call" },
  { id: "presentaciones", label: "Präsentationen", icon: "presentation" },
  { id: "registros", label: "Neue Registrierungen (Partner/Konsument)", icon: "user-badge" },
  { id: "seguimientosRealizados", label: "Durchgeführte Nachverfolgungen", icon: "check-circle" },
];

/* Los 7 indicadores del resumen por quincena: 3 manuales + 4 derivados, en un
   único orden para el gráfico y el selector de métrica comparativo. Cada uno
   con un color distinto tomado de la paleta ya definida en :root (css/styles.css). */
const QUINCENA_METRICAS = [
  { id: "llamadas", label: "Anrufe", corta: "Anr", color: "var(--gold)" },
  { id: "mensajes", label: "Nachrichten", corta: "Nach", color: "var(--gold-light)" },
  { id: "pedidos", label: "Bestellungen", corta: "Best", color: "var(--gold-deep)" },
  { id: "contactados", label: "Kontaktiert", corta: "Kont", color: "var(--accent)" },
  { id: "presentaciones", label: "Präsentationen", corta: "Präs", color: "var(--success)" },
  { id: "registros", label: "Registrierungen", corta: "Reg", color: "var(--warn)" },
  { id: "seguimientosRealizados", label: "Durchgeführte Nachverfolgungen", corta: "Nverf", color: "var(--text-soft)" },
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
    '<div class="row gap-2" style="align-items:center">' + Icon("compass", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13px">Sprache der zu teilenden Nachricht</span></div>' +
    '<p class="muted small" style="margin-top:2px">Wähle die Sprache, in der dein Sponsor den Bericht erhält (kann sich von der Sprache deiner App unterscheiden).</p>' +
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
    '<div style="font-weight:700;font-size:14px">Diese Woche (letzte 7 Tage)</div>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_TIPOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (semana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const resumenListaHtml =
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("users", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Diese Woche — deine Liste der 250</span></div>' +
    '<p class="muted small" style="margin-top:2px">Es zählt nur, was diese Woche wirklich im Status vorangekommen ist — nicht jeder neue Kontakt.</p>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_DERIVADOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (derivadosSemana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const idioma = state.idiomaInforme || "de";
  const hayActividad = (semana.llamadas + semana.mensajes + semana.pedidos + derivadosSemana.contactados + derivadosSemana.presentaciones + derivadosSemana.registros + derivadosSemana.seguimientosRealizados) > 0;
  const compartirPersonal = hayActividad
    ? (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-primary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoPersonal(state, semana, derivadosSemana, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 16, color: "#fff" }) + " Meinen Bericht mit meinem Sponsor teilen</a>"
        : '<p class="muted small" style="margin-top:10px">Füge das WhatsApp deines Sponsors in den Einstellungen hinzu, um deinen Bericht teilen zu können.</p>')
    : '<p class="muted small" style="margin-top:10px">Registriere diese Woche mindestens eine Aktion, um deinen Bericht teilen zu können.</p>';
  const idiomaSelector = hayActividad ? idiomaInformeSelectorHTML(state) : "";

  let equipoHtml = "";
  if (state.mentorMode) {
    const socios = state.contactos.filter(function (c) { return c.estado === "Partner"; });
    const semanaIds = ultimos7Dias();
    const equipo = {
      totalSocios: socios.length,
      // "Nuevos esta semana" se basa en estadoFecha (cuándo llegó a Socio), no en la
      // fecha de creación del contacto — igual que registrosSemana del informe personal,
      // así alguien contactado hace meses que recién ahora se hizo socio sí cuenta.
      nuevosSocios: socios.filter(function (c) { return c.estadoFecha && semanaIds.indexOf(c.estadoFecha) !== -1; }).length,
      seguimientosSemana: socios.filter(function (c) { return c.proximoSeguimiento && c.proximoSeguimiento >= hoy && c.proximoSeguimiento <= addDiasISO(hoy, 6); }).length,
      seguimientosVencidos: socios.filter(function (c) { return c.proximoSeguimiento && c.proximoSeguimiento < hoy; }).length,
    };
    equipoHtml =
      '<div class="card" style="margin-top:16px;border-color:var(--gold)">' +
      '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Bericht meiner Partner</span></div>' +
      '<p class="muted small" style="margin-top:4px;line-height:1.5">Ein Blick auf dein eigenes Team, um es zu beraten — und um es mit deinem eigenen Sponsor zu teilen, genauso wie sie ihren mit dir teilen.</p>' +
      '<div class="grid-2" style="margin-top:10px;gap:10px">' +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Aktive Partner</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.totalSocios + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Neu diese Woche</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.nuevosSocios + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Nachverfolgungen diese Woche</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.seguimientosSemana + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Überfällige Nachverfolgungen</div><div style="font-size:18px;font-weight:700;color:' + (equipo.seguimientosVencidos > 0 ? "var(--warn)" : "var(--gold-light)") + '">' + equipo.seguimientosVencidos + "</div></div>" +
      "</div>" +
      (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-secondary" style="margin-top:12px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoEquipo(state, equipo, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Bericht meines Teams teilen</a>"
        : "") +
      "</div>";
  }

  return (
    sectionHeaderHTML("Wochenbericht", "Registriere deine Aktionen Tag für Tag und teile deinen Fortschritt mit deinem Sponsor — so hilft er dir zu wachsen.", "trending-up") +
    '<div><div style="font-weight:700;font-size:14px;margin-bottom:8px">Heute</div>' +
    '<div class="view-stack gap-sm">' + contadores + "</div></div>" +
    resumenSemana +
    resumenListaHtml +
    renderResumenQuincenaHTML(state, ui) +
    idiomaSelector +
    compartirPersonal +
    equipoHtml
  );
}

/* ---------------- Resumen por quincena (calendario) — gráficos SVG ---------------- */

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
    '<span style="font-weight:600;font-size:13px">' + escapeHtml(calQuincenaLabel(key)) + (key === calQuincenaActualKey() ? ' <span class="muted small">(aktuell)</span>' : "") + "</span>" +
    '<div class="icon-btn" style="cursor:pointer" data-action="quincena-nav" data-arg="1">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>"
  );
}

function renderResumenQuincenaHTML(state, ui) {
  const abierto = !!ui.quincenaResumenAbierto;
  const header =
    '<div class="card" style="margin-top:12px">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-quincena-resumen">' +
    '<div class="row gap-2">' + Icon("trending-up", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13px">Zusammenfassung pro Zwei-Wochen-Periode</span></div>' +
    clicaAquiBadgeHTML(abierto, "gold") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px">Deine Anrufe, Nachrichten, Bestellungen, Kontakte und Nachverfolgungen, gruppiert nach Kalenderperiode (1.–15. und 16.–Ende jedes Monats).</p>';

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
      '<p class="muted small" style="margin-top:14px;text-align:center;padding:10px 0">Komm zurück, wenn du mindestens 2 Zwei-Wochen-Perioden mit Aktivität hast, um deinen Fortschritt im Vergleich zu sehen.</p>';
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
      '<div style="font-weight:700;font-size:13px">Fortschritt im Vergleich</div>' +
      '<div class="row gap-2" style="flex-wrap:wrap;margin-top:8px">' + metricaChips + "</div>" +
      '<div style="margin-top:10px">' + svgBarChart(compItems, { width: Math.max(320, claves.length * 46) }) + "</div>" +
      "</div>";
  }

  return header + actual + comparativo + "</div>";
}

function recordatorioFieldHTML(d, toggleAction) {
  const on = !!d.recordar;
  const minOpts = [0, 10, 30, 60].map(function (m) {
    const label = m === 0 ? "Zu dieser Uhrzeit" : m + " Min. vorher";
    return '<option value="' + m + '"' + (Number(d.recordarMin) === m ? " selected" : "") + ">" + label + "</option>";
  }).join("");
  return (
    '<div class="field">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<button class="check-dot' + (on ? " on" : "") + '" data-action="' + toggleAction + '">' + (on ? Icon("check", { size: 13, color: "#1B1338" }) : Icon("bell", { size: 13 })) + "</button>" +
    '<button class="check-label' + (on ? " on" : "") + '" style="padding:0;flex:1;text-align:left" data-action="' + toggleAction + '">Mit einer Benachrichtigung erinnern</button>' +
    "</div>" +
    (on
      ? '<select data-draft-field="recordarMin" style="width:100%;margin-top:8px;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:9px 12px;font-size:13.5px;outline:none">' + minOpts + "</select>" +
        '<p class="muted small" style="margin-top:4px">Erinnert nur, solange du Cumbre 90 im Browser offen oder installiert hast, mit aktivierten Benachrichtigungen in den Einstellungen.</p>'
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
      (ui.confirmDeleteActividad === ui.actividadEditId ? "Sicher? Nochmal tippen zum Löschen" : "Aktivität löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-actividad"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Aktivität bearbeiten" : "Neue Aktivität") + "</span>" +
    '<button class="icon-btn" data-action="cancel-actividad">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Typ</label><select data-draft-field="tipo" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + tipoOpts + "</select></div>" +
    '<div class="field"><label>Uhrzeit (optional)</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Datum (optional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Lass es leer, wenn es sich jede Woche an diesem Tag wiederholt. Gib ein Datum an, wenn es einmalig ist — zum Beispiel eine einmalige Aufgabe.</p></div>' +
    '<div class="field"><label>Notiz</label><textarea rows="2" data-draft-field="nota" placeholder="Mit wem, wo, was du mitbringen musst...">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    recordatorioFieldHTML(d, "toggle-actividad-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-actividad">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-actividad">Abbrechen</button>' +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Registriere deinen Sponsor</span>' +
    '<button class="icon-btn" data-action="cancelar-patrocinador-fab">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Du hast sein WhatsApp noch nicht hinterlegt. Trage es einmal ein, und dieser Button öffnet dann jedes Mal direkt seinen Chat, wenn du ihn berührst.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Name</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre || "") + '" placeholder="Name deines Sponsors"></div>' +
    '<div class="field"><label>WhatsApp</label><input type="text" inputmode="numeric" data-draft-field="telefono" value="' + escapeHtml(d.telefono || "") + '" placeholder="Z. B. 4916000000"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="guardar-patrocinador-fab">Speichern und ihm schreiben</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancelar-patrocinador-fab">Abbrechen</button>' +
    "</div></div>"
  );
}

function renderZoomModal(ui) {
  const d = ui.zoomDraft;
  if (!d) return "";
  const editing = !!ui.zoomEditId;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-zoom" data-dia="' + d.dia + '" data-arg="' + ui.zoomEditId + '">' +
      (ui.confirmDeleteZoom === ui.zoomEditId ? "Sicher? Nochmal tippen zum Löschen" : "Meeting löschen") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-zoom"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Zoom-Meeting bearbeiten" : "Neues Zoom-Meeting") + "</span>" +
    '<button class="icon-btn" data-action="cancel-zoom">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Titel</label><input type="text" data-draft-field="titulo" value="' + escapeHtml(d.titulo || "") + '" placeholder="Z. B. Wöchentliche Teamschulung"></div>' +
    '<div class="field"><label>Uhrzeit</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Datum (optional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Lass es leer, wenn es dein wöchentliches Zoom-Meeting ist. Gib ein Datum an, wenn es ein einmaliges Meeting ist — zum Beispiel eines, zu dem du gerade für morgen eingeladen wurdest.</p></div>' +
    '<div class="field"><label>Verbindungslink</label><input type="text" inputmode="url" data-draft-field="enlace" value="' + escapeHtml(d.enlace || "") + '" placeholder="https://zoom.us/j/..."></div>' +
    recordatorioFieldHTML(d, "toggle-zoom-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-zoom">Speichern</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-zoom">Abbrechen</button>' +
    "</div></div>"
  );
}
