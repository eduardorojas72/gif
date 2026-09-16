/* ---------------------------------------------------------------
   VISTAS — cada función devuelve un string HTML para #view-container
   (o para las regiones fijas: header, sidebar, menú, fab, modales)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Acasă", icon: "home" },
  { id: "perfil", label: "Profilul meu", icon: "user-badge" },
  { id: "pasos", label: "Cei 8 Pași", icon: "footprints" },
  { id: "plan6", label: "Plan 6 Zile", icon: "trail-map" },
  { id: "contactos", label: "Lista de 250", icon: "users" },
  { id: "clientes", label: "Clienți", icon: "package" },
  { id: "agenda", label: "Agenda Săptămânală", icon: "calendar" },
  { id: "informe", label: "Raport Săptămânal", icon: "trending-up" },
  { id: "enfoque", label: "Întâlnire de Focalizare", icon: "target" },
  { id: "plan90", label: "Plan 90 Zile", icon: "mountain-flag" },
  { id: "recursos", label: "Resurse Audiovizuale", icon: "video" },
  { id: "arbol", label: "Arborele meu Genealogic", icon: "crown" },
  { id: "socios", label: "Partenerii mei", icon: "users" },
  { id: "sos", label: "Apeluri S.O.S.", icon: "bell" },
  { id: "eventos", label: "Lista de Contacte", icon: "users" },
  { id: "lema", label: "Deviza Atomy", icon: "heart" },
  { id: "premios", label: "Premii", icon: "gift" },
  { id: "logros", label: "Realizări", icon: "award" },
  { id: "ajustes", label: "Setări", icon: "settings" },
];

const TOUR_PASOS = [
  { icon: "compass", titulo: "Bine ai venit în Cumbre 90!", texto: "Acest tur rapid îți arată ce poți face în fiecare secțiune a aplicației. Durează mai puțin de 2 minute și îl poți sări oricând vrei." },
  { icon: "home", titulo: "Acasă", texto: "Aici îți vezi progresul general, seria ta de zile active și acces rapid la lucrurile cele mai importante." },
  { icon: "user-badge", titulo: "Profilul meu", texto: "Datele tale, rangul tău actual în Atomy și fotografia ta." },
  { icon: "footprints", titulo: "Cei 8 Pași", texto: "Baza afacerii explicată pas cu pas, cu activități practice pentru a aplica fiecare pas." },
  { icon: "trail-map", titulo: "Planul de 6 Zile", texto: "Instruirea ta inițială, zi de zi, cu misiuni zilnice — inclusiv cea de a descărca aplicația oficială Atomy pe telefon." },
  { icon: "users", titulo: "Lista de 250", texto: "Notează fiecare contact (nume, telefon, stadiu) și urmărește-ți Lista de 250." },
  { icon: "package", titulo: "Clienți", texto: "Înregistrează-i pe cei care au cumpărat deja: datele lor, istoricul fiecărei comenzi cu valoarea și PV-ul ei, și dă-le urmărire cu recordatoare de la 1 săptămână până la 11 luni." },
  { icon: "calendar", titulo: "Agenda Săptămânală", texto: "Programează-ți apelurile, întâlnirile și Zoom-urile, cu recordatoare ca să nu le uiți." },
  { icon: "trending-up", titulo: "Raportul Săptămânal", texto: "La finalul săptămânii, alege doar limba și trimite-i raportul tău de activitate sponsorului tău — aplicația a calculat deja cifrele pentru tine." },
  { icon: "target", titulo: "Întâlnirea de Focalizare", texto: "Organizează-ți roster-ul de stânga și dreapta, și folosește calculatorul de produse pentru a-ți planifica achiziția quincenală și a o împărți cu sponsorul tău." },
  { icon: "mountain-flag", titulo: "Planul de 90 de Zile", texto: "Cele 6 quincene ale tale, cu obiective clare pe drumul spre Sales Master." },
  { icon: "crown", titulo: "Arborele meu Genealogic", texto: "Salvează-ți aici ID-ul și parola, și datele sponsorului tău — de aici îi poți scrie direct pe WhatsApp când ai o îndoială." },
  { icon: "users", titulo: "Partenerii mei", texto: "Directorul tău permanent de echipă, pe linia stângă și dreaptă — atinge un nume pentru a-i vedea ID-ul, Zoom-ul, PVP-ul și data ultimei achiziții. Linia devine portocalie când trec 11 luni fără nicio achiziție." },
  { icon: "bell", titulo: "Apeluri S.O.S. și Lista de Contacte", texto: "Salvează alte numere de sprijin la care poți apela, și persoanele pe care le cunoști la evenimente." },
  { icon: "heart", titulo: "Deviza, Premii, Realizări și Setări", texto: "Inspirație zilnică, realizările tale deblocate și configurarea contului tău." },
  { icon: "sparkles", titulo: "Pregătit!", texto: "Poți vedea din nou acest tur oricând vrei, cu butonul flotant pe care îl vei vedea pe ecran." },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Bună dimineața";
  if (h < 20) return "Bună ziua";
  return "Bună seara";
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
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">Cei 8 Pași ai Succesului</p>' +
    '<p class="muted" style="margin-top:22px;max-width:340px;font-size:14.5px;line-height:1.6;white-space:pre-line;text-align:left">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Începe drumul meu ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    (LICENCIA_TITULAR ? '<p class="muted small" style="margin-top:26px;opacity:.6">Copie cu licență exclusivă pentru ' + escapeHtml(LICENCIA_TITULAR) + "</p>" : "") +
    "</div>"
  );
}

function renderOnboarding(ui) {
  const foto = ui.onboardingFoto;
  const avatarInner = foto ? '<img src="' + foto + '" alt="Fotografia ta"/>' : Icon("camera", { size: 26 });
  return (
    '<div class="center-screen" style="justify-content:center">' +
    '<div style="display:flex;flex-direction:column;align-items:center">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="onboarding-file">' + avatarInner + "</button>" +
    '<input id="onboarding-file" type="file" accept="image/*" class="hidden" data-target="__onboardingFoto">' +
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Schimbă fotografia" : "Adaugă o fotografie (opțional)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">Cum te numești?</h2>' +
    '<p class="muted small" style="margin-top:4px">Așa îți personalizăm drumul.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Numele tău" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<div style="width:100%;max-width:320px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Datele tale Atomy <span class="muted" style="font-weight:400">(opțional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Le lăsăm notate în Arborele tău Genealogic, așa nu mai trebuie să le cauți sau să le ceri din nou.</p>' +
    '<input id="onboarding-atomy-id-input" type="text" placeholder="ID-ul tău Atomy" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-atomy-pass-input" type="text" placeholder="Parola ta Atomy" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<div style="width:100%;max-width:320px;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Sponsorul tău <span class="muted" style="font-weight:400">(opțional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Așa activăm din prima butonul de WhatsApp ca să-i scrii și îl lăsăm notat în Arborele tău Genealogic. Poți sări peste asta și îl completezi mai târziu.</p>' +
    '<input id="onboarding-sponsor-name-input" type="text" placeholder="Numele sponsorului tău" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-sponsor-phone-input" type="text" inputmode="numeric" placeholder="WhatsApp-ul lui, ex. 40712345678" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Începe ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
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
  const items = MENU_ITEMS.map(function (it) {
    const active = ui.view === it.id;
    return (
      '<button class="sidebar-item' + (active ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      Icon(it.icon, { size: 20 }) + "<span>" + it.label + "</span></button>"
    );
  }).join("");
  const salir = '<button class="sidebar-item" style="color:var(--warn)" data-action="salir-app">' + Icon("log-out", { size: 20 }) + "<span>Ieși</span></button>";
  return (
    '<div class="sidebar">' +
    '<div class="sidebar-logo">' + mountainMarkHTML(26, true) + "</div>" +
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
  const salir = '<button class="menu-item" style="color:var(--warn)" data-action="salir-app">' + medallionHTML("log-out", 34) + "<span>Ieși</span></button>";
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><div class="row gap-2">' + mountainMarkHTML(18) + '<span style="font-weight:700;font-size:14px">CUMBRE 90</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + salir + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Licență exclusivă: ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
    "</div></div>"
  );
}

/* ---------------- reminders / bell ---------------- */

function getReminders(state) {
  const out = [];
  const inact = diasInactivo(state.ultimaFecha);
  if (inact >= 2) {
    out.push({ text: "Nu ai mai avansat de " + inact + " zile. Reia-ți drumul când poți — fiecare pas contează." });
  }
  const llamada = state.dias[5] && state.dias[5].fields && state.dias[5].fields.llamada;
  if (llamada && llamada.trim()) {
    out.push({ text: "Nu uita apelul tău săptămânal cu mentorul: " + llamada.trim() + "." });
  }
  const hoy = hoyISO();
  (state.contactos || []).forEach(function (c) {
    if (c.proximoSeguimiento && c.proximoSeguimiento <= hoy && c.estado !== "Respins") {
      const vencido = c.proximoSeguimiento < hoy;
      out.push({
        text: (vencido ? "Urmărire restantă: " : "Urmărire astăzi: ") + c.nombre + (c.notaSeguimiento ? " — " + c.notaSeguimiento : ""),
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
    ? '<button class="btn-secondary" data-action="tour-saltar">Sari</button>'
    : "";
  const btnSiguiente =
    '<button class="btn-primary" data-action="tour-siguiente">' +
    (esUltimo ? "Am înțeles" : "Următorul") +
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
    '<div class="muted small">Pasul ' + (paso + 1) + " din " + total + "</div>" +
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
          ? '<div class="icon-btn" style="flex-shrink:0;cursor:pointer" data-action="marcar-seguimiento-hecho" data-arg="' + r.contactoId + '" title="Marchează urmărirea ca făcută">' + Icon("check-circle", { size: 14, color: "var(--success)" }) + "</div>"
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
        ? '<button class="link-btn small" style="margin-top:8px" data-action="goto" data-arg="contactos">Vezi Lista de 250 →</button>'
        : "")
    : '<p class="muted small" style="margin-top:8px">Totul este la zi — nu ai recordatoare în așteptare.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">Recordatoare</span>' +
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
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("user-badge", { size: 16, color: "#1B1338" }) + " Vezi insigna mea</button>"
      : logro.tipo === "cumbre"
      ? '<button class="btn-primary" style="margin-top:14px" data-action="close-logro-action">' + Icon("award", { size: 16, color: "#1B1338" }) + " Vezi certificatul</button>"
      : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card logro-modal">' +
    Icon("award", { size: 46, color: "var(--gold)" }) +
    '<div class="logro-modal-eyebrow">Am obținut realizarea</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Împarte-o — este un mod excelent să te întrebe despre ce e vorba 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    actionBtn +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">' + (actionBtn ? "Închide" : "Excelent, continuă") + "</button>" +
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

  let mensaje = "Continuă așa, fiecare pas contează!";
  if (pctGeneral === 0) mensaje = "Drumul tău începe astăzi. Înainte!";
  else if (pctGeneral === 100) mensaje = "Ai completat tot ce era disponibil! Continuă așa.";
  else if (pctGeneral >= 70) mensaje = "Ești aproape de Culme, nu ceda.";

  const chips = DIAS.map(function (d) { return '<div class="seg' + (state.dias[d.id].done ? " on" : "") + '"></div>'; }).join("");

  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Tu foto"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  const proximosHtml = proximos.length
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Următoarele realizări</span></div>' +
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
      '<button class="link-btn small" style="margin-top:12px" data-action="goto" data-arg="logros">Vezi toate realizările →</button>' +
      "</div>"
    : "";

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(RANGOS[state.rangoIndex].nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Salut, ' + escapeHtml(state.nombre || "partener") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Bine ai venit în Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">6 Etape · 6 Tabere · Acces nelimitat</div>' +
    '<div class="chip-row" style="margin-top:16px">' + chips + "</div>" +
    '<div class="row between" style="margin-top:16px"><span class="muted small">' + (etapasHechas + campamentosHechos) + "/" + totalPasos + ' etape finalizate</span><span style="font-size:24px;font-weight:700">' + pctGeneral + "%</span></div>" +
    '<div class="progressbar" style="margin-top:8px"><div style="width:' + pctGeneral + '%"></div></div>' +
    '<div class="muted small" style="margin-top:12px">' + mensaje + "</div>" +
    "</div>" +

    escenarioVidaHomeCardHTML(state) +

    proximosHtml +

    mountainSceneHTML(quincenasMap, cumbreLograda, 190).replace('<div class="mountain-wrap">', '<button class="mountain-wrap card-hover" data-action="goto" data-arg="plan90" style="cursor:pointer">').replace(/<\/div>$/, '</button>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="pasos">' + pasosHeaderMedallionHTML(44) + '<div class="nc-body"><div class="nc-title">Cei 8 Pași ai Succesului</div><div class="nc-desc">Referința ta permanentă</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="lema">' + medallionHTML("heart", 44) + '<div class="nc-body"><div class="nc-title">Deviza Atomy</div><div class="nc-desc">Filosofie și cod etic</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="contactos">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Lista de 250 de Contacte</div><div class="nc-desc">' + (state.contactos || []).length + ' înregistrate · programează urmăriri</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan6">' + medallionHTML("trail-map", 44) + '<div class="nc-body"><div class="nc-title">Plan de Start — 6 Zile</div><div class="nc-desc">Parcurge-ți harta zi de zi</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="premios">' + medallionHTML("gift", 44) + '<div class="nc-body"><div class="nc-title">Premiile sponsorului tău</div><div class="nc-desc">Vezi ce poți câștiga</div></div>' + Icon("chevron-right", { size: 18, color: "var(--text-soft)" }) + "</button>" +

    (cumbreLograda
      ? '<button class="btn-primary" style="background:var(--success)" data-action="goto" data-arg="cumbre">' + Icon("award", { size: 18, color: "#fff" }) + ' Ai ajuns pe Culme! Vezi realizarea</button>'
      : "")
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
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Scenariul de Viață</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">🏆 Cerc perfect! Ți-ai atins cele 8 obiective.</div>' +
      '<div class="muted small" style="margin-top:2px">Apasă pentru a le revizui sau a-ți stabili obiective noi, și mai mari.</div>' +
      "</button>"
    );
  }
  if (iniciadas === 0) {
    return (
      '<button class="card card-hover" style="text-align:left;width:100%;border-color:var(--accent)" data-action="goto-escenario">' +
      '<div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Înainte de a începe</span></div>' +
      '<div style="font-size:14.5px;font-weight:700;margin-top:6px">Definește-ți Scenariul de Viață — „de ce”-ul tău</div>' +
      '<div class="muted small" style="margin-top:2px">Este primul pas al Pasului 1. Hotărăște-ți visurile în 8 domenii ale vieții tale înainte de a continua.</div>' +
      "</button>"
    );
  }
  const pct = Math.round((completas / ESCENARIO_CATEGORIAS.length) * 100);
  return (
    '<button class="card card-hover" style="text-align:left;width:100%" data-action="goto-escenario">' +
    '<div class="row between"><div class="row gap-2">' + Icon("compass", { size: 15, color: "var(--accent)" }) + '<span style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Scenariul de Viață</span></div>' +
    '<span class="muted small">' + completas + "/" + ESCENARIO_CATEGORIAS.length + "</span></div>" +
    '<div class="progressbar gold thin" style="margin-top:8px"><div style="width:' + Math.max(pct, 4) + '%"></div></div>' +
    '<div class="muted small" style="margin-top:8px">Continuă să-ți completezi obiectivele până obții cercul perfect.</div>' +
    "</button>"
  );
}

function escenarioCategoriaHTML(cat, esc) {
  const data = esc[cat.id] || { meta: "", avance: 0 };
  const dots = [1, 2, 3, 4].map(function (lvl) {
    const on = lvl <= data.avance;
    return '<button class="avance-dot' + (on ? " on" : "") + '" data-action="set-escenario-avance" data-cat="' + cat.id + '" data-arg="' + lvl + '" aria-label="Nivelul ' + lvl + '"></button>';
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
    '<button class="avance-dot' + (item.cumplido ? " on" : "") + '" style="flex-shrink:0;margin-top:3px" data-action="toggle-bucket-cumplido" data-arg="' + i + '" aria-label="Marchează ca îndeplinit"></button>' +
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
    '<div class="row gap-2">' + Icon("clipboard-list", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Lista de 100 — visurile mele</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Notează până la 100 de lucruri pe care ai vrea să le realizezi, să le ai sau să le trăiești — cu data și „de ce”-ul tău. Nu trebuie completată în ordine, nici dintr-o singură dată.</p>' +
    '<div class="muted small" style="margin-top:4px">' + escritas + " scrise · " + cumplidas + " îndeplinite</div>" +
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
    '<input type="text" placeholder="Dată (ex. 08/2026)" value="' + escapeHtml(h.fecha) + '" data-field="granPlan3.' + anio + "." + i + '.fecha" style="flex:1;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Nivel de măiestrie" value="' + escapeHtml(h.nivel) + '" data-field="granPlan3.' + anio + "." + i + '.nivel" style="flex:1.4;min-width:130px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;align-items:center;flex-wrap:wrap">' +
    '<input type="text" placeholder="PV de grup" value="' + escapeHtml(h.pvGrupal) + '" data-field="granPlan3.' + anio + "." + i + '.pvGrupal" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<input type="text" placeholder="Venituri" value="' + escapeHtml(h.ingresos) + '" data-field="granPlan3.' + anio + "." + i + '.ingresos" style="flex:1;min-width:90px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
    '<div data-action="delete-hito-granplan" data-arg="' + key + '" style="cursor:pointer;color:var(--warn);font-size:11px;padding:4px;flex-shrink:0">' + (confirmKey === key ? "Ștergi?" : Icon("x", { size: 14 })) + "</div>" +
    "</div></div>"
  );
}

function granPlanAnioHTML(anio, label, hitos, ui) {
  const rows = hitos.map(function (h, i) { return granPlanHitoRowHTML(anio, i, h, ui.confirmDeleteHito); }).join("");
  return (
    '<div style="margin-top:14px">' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light)">' + escapeHtml(label) + "</div>" +
    '<div class="view-stack gap-sm" style="margin-top:6px">' + rows + "</div>" +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-hito-granplan" data-arg="' + anio + '">+ Adaugă reper</div>' +
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
    '<div class="row gap-2">' + Icon("trending-up", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Marele Plan 3 — proiecție pe 3 ani</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + total + " repere salvate</div>" +
    (open
      ? '<p class="muted small" style="margin-top:8px;line-height:1.5">' + escapeHtml(GRAN_PLAN_3_INTRO) + "</p>" +
        granPlanAnioHTML("anio1", "Anul 1", gp.anio1, ui) +
        granPlanAnioHTML("anio2", "Anul 2", gp.anio2, ui) +
        granPlanAnioHTML("anio3", "Anul 3", gp.anio3, ui)
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
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Jurnalul eu-lui meu viitor</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    (open
      ? '<p class="muted small" style="margin-top:6px;line-height:1.5">' + escapeHtml(DIARIO_FUTURO_INTRO) + "</p>" +
        '<textarea rows="8" placeholder="' + escapeHtml(DIARIO_FUTURO_EJEMPLO) + '" data-field="diarioFuturo.texto" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 12px;font-size:13px;outline:none;resize:vertical;font-family:inherit;line-height:1.5">' + escapeHtml(texto) + "</textarea>"
      : '<p class="muted small" style="margin-top:6px">' + (texto ? "Ți-ai scris deja scrisoarea — apasă pentru a o vedea sau edita." : "Încă nu ai scris-o.") + "</p>") +
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
      '<input type="text" placeholder="Ex. Să câștig 3000 USD pe lună" value="' + escapeHtml(m.texto) + '" data-field="planComercialMensual.' + mesKey + ".metas." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (m.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-meta-planmensual" data-arg="' + m.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteMetaPlan === m.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const accionesHtml = plan.acciones.map(function (a, i) {
    return (
      '<div class="row gap-2" style="align-items:center;margin-top:6px">' +
      '<div class="avance-dot' + (a.hecha ? " on" : "") + '" style="cursor:pointer;flex-shrink:0" data-action="toggle-accion-planmensual" data-arg="' + a.id + '"></div>' +
      '<input type="text" placeholder="Ex. Sună 10 persoane pe zi" value="' + escapeHtml(a.texto) + '" data-field="planComercialMensual.' + mesKey + ".acciones." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (a.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
      '<div data-action="delete-accion-planmensual" data-arg="' + a.id + '" style="cursor:pointer;color:var(--warn);flex-shrink:0">' + (ui.confirmDeleteAccionPlan === a.id ? Icon("check", { size: 13, color: "var(--warn)" }) : Icon("x", { size: 13 })) + "</div>" +
      "</div>"
    );
  }).join("");

  const quincenasHtml = plan.quincenas.map(function (q, i) {
    const label = i === 0 ? "Prima quincenă a lunii" : "A doua jumătate a lunii";
    return (
      '<div class="card" style="padding:10px 12px;margin-top:8px">' +
      '<div class="muted small" style="font-weight:600">' + label + "</div>" +
      '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
      '<div style="flex:1;min-width:80px"><label class="muted small">Venituri</label><input type="number" value="' + (Number(q.ingresos) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.ingresos" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:80px"><label class="muted small">PV din vânzări</label><input type="number" value="' + (Number(q.pv) || 0) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      '<div style="flex:1;min-width:100px"><label class="muted small">Nivel de măiestrie</label><input type="text" value="' + escapeHtml(q.nivel) + '" data-field="planComercialMensual.' + mesKey + ".quincenas." + i + '.nivel" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
      "</div></div>"
    );
  }).join("");

  return (
    '<div class="card">' +
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("target", { size: 13, color: "var(--gold)" }) + " Plan comercial lunar</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="planmensual-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="planmensual-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Obiective</div>' +
    metasHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-meta-planmensual">+ Adaugă obiectiv</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Plan de acțiuni</div>' +
    accionesHtml +
    '<div class="btn-secondary" style="margin-top:8px;width:fit-content;cursor:pointer;padding:7px 12px;font-size:12.5px" data-action="add-accion-planmensual">+ Adaugă acțiune</div>' +
    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Venituri pe quincenă</div>' +
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
    '<div class="muted small" style="margin-top:6px">' + completas + " din " + ESCENARIO_CATEGORIAS.length + " obiective în cercul perfect</div>" +
    "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">Cum se completează?</div>' + pasos + "</div>" +
    '<div class="card"><div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + Icon("video", { size: 13, color: "var(--gold)" }) + " Videoclipuri care te ajută să-l construiești</div>" + videoListCardHTML(ESCENARIO_VIDEOS) + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    granPlanSectionHTML(state, ui) +
    diarioFuturoSectionHTML(state, ui) +
    planComercialMensualHTML(state, ui) +
    bucketListSectionHTML(state, ui)
  );
}

function renderEscenarioVida(state, ui) {
  return (
    sectionHeaderHTML("Scenariul de Viață", ESCENARIO_LEMA, "compass") +
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
  return '<div class="view-stack gap-sm">' + videos.map(videoRowHTML).join("") + "</div>";
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
  return '<div class="view-stack gap-sm">' + documentos.map(documentRowHTML).join("") + "</div>";
}

function renderRecursosAudiovisuales(state, ui) {
  const categorias = RECURSOS_AUDIOVISUALES.map(function (cat) {
    const documentos = cat.id === "negocio"
      ? '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 8px">' + Icon("download", { size: 14, color: "var(--gold)" }) + " Documente</div>" + documentListCardHTML(NEGOCIO_DOCUMENTOS)
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
    sectionHeaderHTML("Resurse Audiovizuale", "Cele mai importante videoclipuri pentru a înțelege și a distribui Atomy, organizate pe teme.", "video") +
    categorias
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
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + " Evaluarea lunară a Celor 8 Pași</div>" +
    '<div class="row between" style="margin-top:8px;align-items:center">' +
    '<div data-action="eval8pasos-mes-anterior" style="cursor:pointer;padding:4px">' + Icon("chevron-left", { size: 16 }) + "</div>" +
    '<div style="font-weight:700;font-size:13px;text-transform:capitalize">' + escapeHtml(mesLabel(mesKey)) + "</div>" +
    '<div data-action="eval8pasos-mes-siguiente" style="cursor:pointer;padding:4px">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>" +
    filas +
    '<div class="card" style="margin-top:14px;background:var(--accent-soft);border-color:var(--gold)">' +
    '<div class="row between"><span style="font-weight:700;font-size:13px">Punctajul tău luna aceasta</span><span style="font-weight:700;font-size:18px;color:var(--gold)">' + total + "</span></div>" +
    '<p class="small" style="margin-top:6px;line-height:1.5">' + escapeHtml(banda.texto) + "</p>" +
    "</div>" +
    '<div class="field" style="margin-top:12px"><label>Puncte de laudă</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.alabanza" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.alabanza) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Puncte de reflecție</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.reflexion" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.reflexion) + "</textarea></div>" +
    '<div class="field" style="margin-top:8px"><label>Comentariile sponsorului</label><textarea rows="2" data-field="evaluacion8Pasos.' + mesKey + '.comentarioPatrocinador" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit">' + escapeHtml(ev.comentarioPatrocinador) + "</textarea></div>" +
    "</div>"
  );
}

const OCHO_CORE_NOTA_HTML =
  '<div class="card" style="background:var(--accent-soft);border:none">' +
  '<div class="row gap-2" style="font-weight:700;font-size:13px">' + Icon("check-circle", { size: 15, color: "var(--accent)" }) + " 8 Core-ul tău zilnic/lunar</div>" +
  '<p class="muted small" style="margin-top:6px;line-height:1.55">Controlul acela zilnic (Citire, Vizionare VOD, Prezență la întâlniri, Folosirea produsului, Prezentarea planului, Livrarea către consumator, Consultanță cu sponsorul, Generarea încrederii) îl completezi deja pe pagina ta oficială Atomy — intră la <b>Urmează spre Succes → 8 Core-ul meu lunar</b> și marchează-l acolo zi de zi.</p>' +
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
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Pasul ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="line-height:1.45;margin-top:4px;max-width:44ch">' + escapeHtml(p.d) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Apasă pentru explicația completă</span></div>' +
      "</div>";

    const checklist = (p.actividades || []).length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Activitățile acestui pas</div>' +
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
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Învăț și Duplic</div>' +
        '<p class="muted small" style="margin-top:2px;line-height:1.5">Marchează fiecare sarcină când știi deja să o faci — și când i-ai învățat-o deja și echipei tale.</p>' +
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
        '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("heart", { size: 13, color: "var(--gold)" }) + " Reflecție de împărțit</div>" +
        '<p style="font-size:13px;line-height:1.55;margin-top:6px;font-style:italic">„' + linkifyText(p.reflexion) + '”</p>' +
        '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(p.reflexion) + '">' + Icon("share2", { size: 13 }) + " Împarte</div>" +
        "</div>"
      : "";

    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Pasul " + p.n + " — " + escapeHtml(p.t) + "</div>" +
      '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
      (p.n === 1
        ? '<div class="badge soft" style="cursor:pointer" data-action="goto-escenario">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + " " + Icon("chevron-right", { size: 11 }) + "</div>"
        : '<span class="badge soft">' + Icon("target", { size: 11 }) + " " + escapeHtml(p.accion) + "</span>") +
      '<span class="badge gold">' + Icon("sparkles", { size: 11 }) + " " + escapeHtml(p.objetivo) + "</span>" +
      "</div>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Explicație detaliată</div>' +
      '<p style="font-size:13px;line-height:1.55;margin-top:5px">' + linkifyText(p.explicacion) + "</p>" +
      '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Exemple practice</div>' +
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
    '<div><h2>Cei 8 Pași ai Succesului</h2><p>Bazat pe învățăturile Președintelui Han-Gill Park. Apasă pe fiecare pas pentru explicația completă.</p></div></div>';
  return header +
    videoRowHTML({ titulo: "Cei 8 Pași Spre Succes - Han Gill Park", url: "https://www.youtube.com/watch?v=z-Nzz1HkoE8" }) +
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
  const addBtn = '<div class="btn-secondary" style="margin-top:12px;width:fit-content;cursor:pointer" data-action="add-distribuidor-duplica">+ Adaugă distribuitor</div>';

  const intro =
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' +
    Icon("users", { size: 13, color: "var(--gold)" }) + " Urmărirea duplicării pe distribuitor</div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Adaugă fiecare distribuitor din echipa ta și marchează, unul câte unul, sarcinile din „Învăț și Duplic” pe care i le-ai predat deja. Poți adăuga distribuitorii treptat, nu trebuie să-i pui pe toți deodată.</p>';

  if (!distribuidores.length) {
    return '<div class="card" style="margin-top:14px">' + intro + addBtn + "</div>";
  }

  const headerCells = distribuidores.map(function (d) {
    const total = items.length;
    const done = d.checks.filter(Boolean).length;
    const deleteInner = confirmId === d.id ? "Ștergi?" : Icon("x", { size: 12 });
    return (
      '<th style="min-width:150px;padding:0 6px 8px;vertical-align:top;font-weight:400">' +
      '<input type="text" value="' + escapeHtml(d.nombre) + '" placeholder="Numele distribuitorului" data-distribuidor-field="nombre" data-distribuidor-id="' + d.id + '" style="width:100%;font-size:12.5px;font-weight:700;padding:6px 8px">' +
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
    '<div class="row gap-2">' + Icon("flame", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Pilonul tău de focalizare</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Pe care dintre cei 4 piloni simți că îl îndeplinești cel mai puțin? Alege-l, propune-ți să-l trăiești în fiecare zi, și marchează aici seria ta.</p>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:10px">' + selector + "</div>" +
    (pilarSel
      ? '<div style="margin-top:16px;text-align:center">' +
        '<div style="font-size:34px;font-weight:700;color:var(--gold-light)">' + foco.racha + "</div>" +
        '<div class="muted small">' + (foco.racha === 1 ? "zi la rând" : "zile la rând") + " trăind „" + escapeHtml(pilarSel.t) + "”</div>" +
        '<button class="btn-primary" style="margin-top:12px"' + (yaHoy ? " disabled" : "") + ' data-action="marcar-lema-hoy">' +
        (yaHoy ? Icon("check", { size: 16, color: "#fff" }) + " Ai marcat deja astăzi" : "Astăzi l-am îndeplinit") +
        "</button>" +
        "</div>"
      : "") +
    "</div>"
  );
}

/* Contenido de SMART/OKR — vive como fuente única en el pilar 2 de El Lema
   de Atomy, pero se reutiliza (con su propio botón de Compartir) en Etapa 5
   del Plan 6 Días y en el Paso 1 de Los 8 Pasos, donde el socio realmente
   define sus objetivos. */
function smartOkrShareText() {
  const marcos = (LEMA_ATOMY.pilares.find(function (p) { return p.n === 2; }) || {}).marcos || [];
  return "Cum să-ți creezi obiective clare:\n\n" + marcos.map(function (m) {
    return m.nombre + ": " + m.explicacion + " Exemplu: " + m.ejemplo;
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
    '<div style="font-weight:700;font-size:14px;color:var(--gold-light)">Cum să-ți creezi obiectivele</div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Două moduri simple de a transforma o intenție vagă într-un obiectiv real.</p>' +
    marcosHtml +
    '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(smartOkrShareText()) + '">' + Icon("share2", { size: 13 }) + " Împarte</div>" +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Distribuie</span>' +
    '<button class="icon-btn" data-action="cerrar-compartir-imagen">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Alege unde vrei să distribui imaginea.</p>' +
    '<div class="share-platform-grid" style="margin-top:10px">' + botones + "</div>" +
    '<button class="btn-secondary" style="margin-top:14px" data-action="compartir-imagen-descargar">' + Icon("download", { size: 15 }) + " Doar descarcă imaginea</button>" +
    '<button class="link-btn small" style="margin-top:10px" data-action="compartir-imagen-mas-opciones">Mai multe opțiuni de distribuire</button>' +
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
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--gold);margin-top:14px">Deviza Atomy</div>' +
    pilaresList +
    '<div style="font-size:15px;font-weight:700;color:var(--gold-light);margin-top:16px;line-height:1.5">Să pornim, să pornim, să pornim!<br>Am reușit!</div>' +
    '<div class="muted small" style="margin-top:18px;line-height:1.5">📌 Fă o captură a acestui ecran, printeaz-o sau pune-o ca fundal — undeva unde o vezi în fiecare zi.</div>' +
    '<button class="link-btn small" style="margin-top:16px" data-action="close-modal">Închide</button>' +
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
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">Pilonul ' + p.n + "</div>" +
      '<div style="font-size:15px;font-weight:700;line-height:1.3;margin-top:2px">' + escapeHtml(p.t) + "</div>" +
      '<div class="muted small" style="font-style:italic;margin-top:2px">' + escapeHtml(p.sub) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Apasă pentru explicația completă</span></div>' +
      "</div>";
    const acciones = p.acciones && p.acciones.length
      ? '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Acțiuni zilnice</div>' +
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
        '<div class="btn-secondary" style="margin-top:10px;padding:8px 12px;width:fit-content;cursor:pointer" data-action="share-paso-reflexion" data-arg="' + escapeHtml(smartOkrShareText()) + '">' + Icon("share2", { size: 13 }) + " Împarte</div>"
      : "";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + "Pilonul " + p.n + " — " + escapeHtml(p.t) + "</div>" +
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
    '<div><h2>Deviza Atomy</h2><p>Filosofia Corporativă și Codul Etic — Președintele Han-Gill Park. Apasă pe fiecare pilon pentru explicația completă.</p></div></div>';
  const intro = '<p class="muted small" style="line-height:1.6;margin-top:-4px">' + escapeHtml(LEMA_ATOMY.intro) + "</p>";
  const carteleraBtn =
    '<button class="btn-secondary" style="margin-top:12px" data-action="open-cartelera">' + Icon("image-plus", { size: 15 }) + " Vezi afișul de pus într-un loc vizibil</button>";
  const exclamacion =
    '<div class="card" style="margin-top:14px;text-align:center;border-color:var(--gold)">' +
    '<div style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--gold)">Exclamația Oficială a Devizei</div>' +
    '<p style="font-size:14px;line-height:1.6;margin-top:6px;font-weight:600">' + escapeHtml(LEMA_ATOMY.exclamacion) + "</p></div>";
  return header + intro + carteleraBtn +
    '<div class="view-stack gap-sm" style="margin-top:14px">' + cards + "</div>" +
    exclamacion +
    lemaFocoHTML(state);
}

/* ---------------- Plan 6 días — mapa ---------------- */

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

  return sectionHeaderHTML("Plan de Start — 6 Zile", "Urcă pe hartă și cucerește fiecare etapă.", "trail-map") +
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
        const isEscenario = diaId === 1 && sec.h === "Scrie-ți Scenariul de Viață";
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
          (isEscenario ? '<div class="muted small" style="margin-top:8px;font-weight:600">' + (escenarioAbierto ? "Apasă pentru a ascunde" : "Apasă pentru a-ți deschide Scenariul de Viață complet (radar, obiective și Lista de 100)") + "</div>" : "") +
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
      '<button class="btn-secondary" style="width:fit-content;padding:9px 14px" data-action="share-day" data-arg="' + diaId + '">' + Icon("share2", { size: 14 }) + " Distribuie ca imagine</button>" +
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
    ? '<div class="row gap-2 small" style="color:var(--success);font-weight:600;margin-top:10px">' + Icon("check", { size: 14 }) + " Corect! Un pas mai mult cucerit.</div>"
    : (est.quizSel !== null && est.quizSel !== undefined
      ? '<div class="muted small" style="margin-top:10px">Nicio problemă, încearcă din nou când vrei — nu există limită de încercări.</div>'
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

  const finishLabel = est.done ? "Zi cucerită " + Icon("award", { size: 18, color: "#fff" }) : "Cucerește această zi";
  const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
  const finishDisabled = !allChecked || est.done;

  const nextDia = DIAS.find(function (d) { return d.id === diaId + 1; });
  const nextDayBtn = nextDia
    ? '<button class="link-btn row gap-2" style="width:fit-content" data-action="open-day" data-arg="' + nextDia.id + '">Ziua următoare ' + Icon("chevron-right", { size: 16 }) + "</button>"
    : "";

  return (
    '<div class="row between">' +
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-map">' + Icon("chevron-left", { size: 16 }) + " Harta drumului</button>" +
    nextDayBtn +
    "</div>" +
    '<div>' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Etapa ' + dia.id + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(dia.etapa) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(dia.titulo) + "</p>" +
    '<p class="muted" style="font-size:13.5px;margin-top:6px;font-style:italic">' + escapeHtml(dia.objetivo) + "</p>" +
    "</div>" +
    nota + contenido + smartOkr + campos +
    '<div class="card">' +
    '<div class="row gap-2" style="font-weight:600;font-size:14px;margin-bottom:12px">' + Icon("sparkles", { size: 15, color: "var(--gold)" }) + " Întrebare rapidă de recapitulare</div>" +
    '<div style="font-size:14px;margin-bottom:12px">' + escapeHtml(dia.quiz.pregunta) + "</div>" +
    '<div style="display:flex;flex-direction:column;gap:8px">' + opciones + "</div>" +
    quizFeedback +
    "</div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Misiunile Zilei ' + dia.id + "</div>" + checklist + "</div>" +
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
      '<div class="badge ' + (done ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (done ? "Finalizat" : "Săpt. " + q.semanas) + "</div>" +
      "</div>" +
      '<div class="tile-body"><div class="tile-title">' + escapeHtml(q.nombre) + '</div><div class="tile-sub">' + escapeHtml(q.foco) + "</div>" + premioHtml + "</div>" +
      "</button>"
    );
  }).join("");

  const banner = cumbreLograda
    ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:500">🏔️ Ai completat cele 6 quincene! Mergi la ecranul Culmii pentru a-ți sărbători realizarea.</div>'
    : "";

  return sectionHeaderHTML("Plan de 90 de Zile", "Drumul tău spre rangul Sales Master, quincenă cu quincenă.", "mountain-flag") +
    mountainSceneHTML(quincenasMap, cumbreLograda, 170) +
    '<div class="grid-2">' + tiles + "</div>" +
    banner;
}

function pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, appName) {
  const items = catalogo.filter(function (p) { return (Number(compras[p.id]) || 0) > 0; });
  const lineas = items.map(function (p) {
    const cant = Number(compras[p.id]) || 0;
    return "• " + (p.nombre || "(fără nume)") + " x" + cant + " (" + ((Number(p.pv) || 0) * cant).toLocaleString(paisInfo.locale) + " PV)";
  });
  return (
    "📦 Planul meu de achiziții pentru această quincenă (" + appName + "):\n" +
    lineas.join("\n") +
    "\n\nTotal: " + totalPV.toLocaleString(paisInfo.locale) + " PV · " + formatMoneda(totalPrecio, paisInfo) +
    "\n\nMă ajuți să-l verific?"
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
    '<input type="text" placeholder="Numele produsului" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="check-dot' + (p.probado ? " on" : "") + '" style="width:24px;height:24px;flex-shrink:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Marchează ca testat">' + (p.probado ? Icon("check", { size: 11, color: "#fff" }) : "") + "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    (pedidoAntes
      ? '<div class="badge gold" style="margin-top:6px;width:fit-content">' + Icon("check-circle", { size: 10 }) + " L-ai mai comandat înainte (" + historico + (historico === 1 ? " unitate în total)" : " unități în total)") + "</div>"
      : "") +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Preț (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">Această quincenă</label><input type="number" min="0" value="' + cantidad + '" data-field="comprasQuincena.' + qn + "." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    "</div></div>"
  );
}

function historialComprasHTML(state, ui, catalogo) {
  const pedidos = catalogo.filter(function (p) { return totalHistoricoProducto(state, p.id) > 0; });
  const abierto = !!ui.historialAbierto;
  return (
    '<div class="card" style="margin-top:10px">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-historial-compras">' +
    '<div class="row gap-2">' + Icon("book-open", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13px">Istoric de achiziții</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (abierto ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 15, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + pedidos.length + " din " + catalogo.length + " produse pe care le cunoști deja · " + (catalogo.length - pedidos.length) + " de descoperit" + "</div>" +
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
                  '<span class="small">' + escapeHtml(p.nombre || "(fără nume)") + "</span>" +
                  '<span class="badge soft">' + n + (n === 1 ? " unitate" : " unități") + "</span>" +
                  "</div>"
                );
              }).join("") +
            "</div>"
          : '<p class="muted small" style="margin-top:8px">Încă nu ai comandat niciun produs în vreo quincenă — când o vei face, va apărea aici.</p>')
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
      '<div class="rl-value">' + ver.toLocaleString("ro") + ' <span class="muted small" style="font-weight:400">puncte verificate</span></div>' +
      '<div class="rl-sub">Planificat, neverificat: ' + plan.toLocaleString("ro") + " puncte</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Stânga", planIzq, verIzq) + bloque("Dreapta", planDer, verDer) + "</div>";
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
      ? arr.map(function (p) { return "• " + (p.nombre || "(fără nume)") + ": " + (Number(p.puntos) || 0).toLocaleString("ro") + " puncte" + (p.verificado ? " ✅ verificat" : " (neverificat)"); }).join("\n")
      : "  (fără persoane înregistrate)";
    return (
      "*Linia " + nombre + "*\n" +
      personasTxt +
      (otros ? "\n• În afara listei (consum/altele): " + otros.toLocaleString("ro") + " puncte" : "") +
      "\nVerificat: " + ver.toLocaleString("ro") + " puncte · Planificat, neverificat: " + plan.toLocaleString("ro") + " puncte"
    );
  }
  return (
    "🎯 Întâlnire de Focalizare — Quincena " + qn + (q ? " (" + q.nombre + ")" : "") + ":\n\n" +
    lineaTexto("Stânga", "izquierda") + "\n\n" +
    lineaTexto("Dreapta", "derecha") +
    "\n\n" + (lista.reunionHecha ? "✅ Am făcut deja întâlnirea mea de focalizare cu partenerii mei." : "⏳ Încă nu am făcut întâlnirea mea de focalizare cu partenerii mei.") +
    "\n\nMă ajuți să-l revizuim ca să-mi planific quincena?"
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "Fără nume") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + "</div>" : "") +
    (p.atomyId || p.contrasena
      ? '<div class="muted small" style="margin-top:2px">' +
        (p.atomyId ? "ID " + escapeHtml(p.atomyId) : "") +
        (p.atomyId && p.contrasena ? " · " : "") +
        (p.contrasena ? "Parolă " + escapeHtml(p.contrasena) : "") +
        "</div>"
      : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-persona-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-persona-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (p.notas ? '<div class="muted small" style="margin-top:4px;font-style:italic">„' + escapeHtml(p.notas) + '”</div>' : "") +
    '<div class="rr-inputs">' +
    '<div class="field"><label>PVP</label><input type="number" min="0" step="10000" value="' + (Number(p.pvp) || 0) + '" data-roster-field="pvp" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="field"><label>PVG</label><input type="number" min="0" step="10000" value="' + (Number(p.puntos) || 0) + '" data-roster-field="puntos" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    "</div>" +
    '<div class="field" style="margin-top:8px"><label>Data planificată</label><input type="date" value="' + (p.fecha || "") + '" data-roster-field="fecha" data-qn="' + qn + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="roster-check' + verificadoClass + '" data-action="toggle-verificado-enfoque" data-qn="' + qn + '" data-linea="' + linea + '" data-arg="' + p.id + '">' +
    '<div class="box">' + (p.verificado ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (p.verificado ? "Verificat — și-a cerut deja punctele" : "Marchează ca verificat") + "</span>" +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai adăugat pe nimeni pe această linie.</p>';

  return (
    '<div class="card" style="margin-top:16px;border-color:var(--gold)">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Întâlnire de Focalizare</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">' +
    (qn >= 5
      ? "Ești deja pe drum spre Sales Master — de aici începe să controlezi câte puncte va cere fiecare persoană din echipa ta, pe fiecare linie, ca să nu-ți pierzi ciclarea."
      : "Înregistrează aici persoanele din echipa ta pe linia stângă/dreaptă — îți va fi tot mai util de la quincena 5 și 6, când vei începe să controlezi ciclarea pe drumul spre Sales Master.") +
    "</p>" +
    '<div class="roster-check' + (lista.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qn="' + qn + '">' +
    '<div class="box">' + (lista.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (lista.reunionHecha ? "Întâlnire de focalizare făcută în această quincenă" : "Marchează: mi-am făcut întâlnirea de focalizare cu partenerii mei") + "</span>" +
    "</div>" +
    resumenLineasEnfoqueHTML(lista) +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, resumenEnfoqueTexto(state, qn)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Împarte cu sponsorul meu</a>"
      : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul sponsorului tău în Setări pentru a putea împărți Întâlnirea ta de Focalizare.</p>') +
    '<div class="tabs" style="margin-top:10px">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea-enfoque" data-arg="izquierda">Stânga (' + (lista.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea-enfoque" data-arg="derecha">Dreapta (' + (lista.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field" style="margin-top:10px"><label>Puncte deja confirmate în afara listei (consum personal sau altele)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? lista.otrosIzquierda : lista.otrosDerecha) + '" data-field="listasEnfoque.' + qn + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-persona-enfoque" data-qn="' + qn + '" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Adaugă persoană</button>" +
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
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Quincena ' + q.n + " · Săptămânile " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>"
  );
}

function renderReunionEnfoquePage(state, ui) {
  const qn = ui.enfoqueQuincena || quincenaEnfoquePorDefecto(state);
  return (
    sectionHeaderHTML("Întâlnire de Focalizare", "Planifică cu echipa ta câte puncte va cere fiecare persoană, pe fiecare linie, quincenă cu quincenă.", "target") +
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
      (ui.confirmDeletePersonaEnfoque === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge persoana") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-persona-enfoque"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează persoana" : "Persoană nouă — linia " + (d.linea === "izquierda" ? "Stânga" : "Dreapta")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona-enfoque">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="field"><label>Telefon (opțional)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Parolă</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Opțional"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">Parola este opțională și doar pentru a putea introduce puncte pentru această persoană dacă are nevoie — nimeni nu este obligat să o împartă.</p>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="notas" placeholder="Observații...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona-enfoque">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona-enfoque">Anulează</button>' +
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
    '<div class="row gap-2">' + Icon("clipboard-list", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Calculator de produse</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (open ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 16, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Marchează ce produse ai testat deja, și câte plănuiești să cumperi în această quincenă — astfel afli câte PV reprezintă și cât vei plăti, pentru întâlnirea ta de focalizare.</p>' +
    '<div class="muted small" style="margin-top:10px">Țară / catalog</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">PV planificate</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Total de plată</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " din " + catalogo.length + " produse testate · " + planeados + " planificate în această quincenă</div>" +
    (planeados > 0
      ? (state.whatsapp && state.whatsapp.trim()
          ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, "Cumbre 90")) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Împarte cu sponsorul meu</a>"
          : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul sponsorului tău în Setări pentru a-ți putea împărți comanda.</p>')
      : "") +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        historialComprasHTML(state, ui, catalogo) +
        '<div class="field" style="margin-top:10px">' +
        '<div class="row gap-2" style="align-items:center;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);border-radius:12px;padding:9px 12px">' +
        Icon("search", { size: 15, color: "var(--text-soft)" }) +
        '<input id="calculadora-search" type="text" placeholder="Caută un produs după nume..." style="flex:1;background:transparent;border:none;color:var(--text);font-size:13.5px;outline:none">' +
        "</div></div>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Adaugă produs</button>'
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
    const finishLabel = est.done ? "Săptămână finalizată " + Icon("check", { size: 16, color: "#fff" }) : "Marchează săptămâna ca finalizată";
    const finishStyle = est.done ? "background:var(--success)" : (allChecked ? "" : "background:var(--border);opacity:.55");
    return (
      '<div class="card">' +
      '<div class="row between"><span style="font-weight:700;font-size:14px">Săptămâna ' + s.n + "</span>" + (est.done ? '<span class="badge success">Finalizată</span>' : "") + "</div>" +
      '<div class="muted small" style="margin-top:6px">Obiectiv de PV: <b style="color:var(--text)">' + escapeHtml(s.metaPV) + "</b></div>" +
      '<div class="muted small">Obiectiv de contacte: <b style="color:var(--text)">' + escapeHtml(s.metaContactos) + "</b></div>" +
      '<div class="muted small" style="margin-top:2px;font-style:italic">' + escapeHtml(s.paso) + "</div>" +
      '<div style="margin-top:12px">' + checklist + "</div>" +
      '<button class="btn-primary" style="margin-top:14px;' + finishStyle + '" ' + (!allChecked || est.done ? "disabled" : "") + ' data-action="finish-semana" data-arg="' + s.n + '">' + finishLabel + "</button>" +
      "</div>"
    );
  }).join("");

  return (
    '<button class="link-btn row gap-2" style="width:fit-content" data-action="back-to-quincenas">' + Icon("chevron-left", { size: 16 }) + " Plan de 90 de zile</button>" +
    "<div>" +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Quincena ' + q.n + " · Săptămânile " + q.semanas + "</div>" +
    '<h2 style="font-size:18px;font-weight:700;margin-top:2px">' + escapeHtml(q.nombre) + "</h2>" +
    '<p class="muted small" style="font-weight:600;margin-top:2px">' + escapeHtml(q.foco) + "</p>" +
    "</div>" +
    quincenaAscensoHTML(doneCount) +
    semanasHtml +
    (qDone ? '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-size:14px;font-weight:600">🏕️ Quincenă finalizată!</div>' : "") +
    '<button class="btn-secondary" data-action="goto" data-arg="enfoque">' + Icon("target", { size: 15 }) + " Du-te la Întâlnirea de Focalizare</button>"
  );
}

/* ---------------- Premios del patrocinador ---------------- */

function renderPremios(state, ui) {
  const quincenasMap = derivarQuincenas(state);
  const desc = "Personalizează-le cum vrei — schimbă-le când îți convine, chiar și lună de lună.";
  const addBtn = '<button class="btn-secondary" style="margin-top:12px" data-action="add-premio">+ Adaugă premiu</button>';

  if (!state.premios.length) {
    return sectionHeaderHTML("Premiile sponsorului tău", desc, "gift") +
      '<div class="card" style="text-align:center">' +
      Icon("gift", { size: 30, color: "var(--text-soft)" }) +
      '<p class="muted small" style="margin-top:10px;line-height:1.5">Sponsorul tău încă nu a configurat premii aici. De îndată ce îți confirmă unul, adaugă-l cu butonul de mai jos.</p>' +
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
      '<input type="text" placeholder="Etapă" value="' + escapeHtml(p.hito) + '" data-field="premios.' + i + '.hito">' +
      '<input type="text" placeholder="Premiu" style="color:var(--accent);font-weight:600" value="' + escapeHtml(p.premio) + '" data-field="premios.' + i + '.premio">' +
      "</div>";
    return (
      '<div class="tile' + (desbloqueado ? " unlocked" : "") + '">' +
      gemCornersHTML() +
      '<div class="tile-media" style="background:' + (p.imagen ? "transparent" : "radial-gradient(circle at 30% 20%, var(--accent-soft), var(--accent))") + '">' +
      media +
      '<div class="badge ' + (desbloqueado ? "gold" : "dark") + '" style="position:absolute;top:8px;right:8px">' + (desbloqueado ? "Finalizat" : "De obținut") + "</div>" +
      uploadBtn + deleteBtn +
      "</div>" +
      '<div class="tile-body">' + body + "</div>" +
      "</div>"
    );
  }).join("");

  return sectionHeaderHTML("Premiile sponsorului tău", desc, "gift") +
    '<div class="grid-2">' + tiles + "</div>" +
    addBtn +
    '<p class="muted small" style="line-height:1.5">Realizările se marchează chiar de tine, în aplicație. Sponsorul tău va verifica etapa (de exemplu, cu o captură de ecran pe care i-o trimiți pe WhatsApp) înainte de a-ți da premiul.</p>';
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
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Activitate recentă</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    recogCardHTML(state.nombre, state.foto, rango.nombre, rango.pv, state.rangoIndex) +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="perfil-file">' + Icon("camera", { size: 15 }) + " " + (state.foto ? "Schimbă fotografia" : "Adaugă o fotografie") + "</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="download-recog-card">' + Icon("download", { size: 15, color: "#fff" }) + " Distribuie</button>" +
    '<input id="perfil-file" type="file" accept="image/*" class="hidden" data-target="foto">' +
    "</div>" +
    '<div class="text-center muted small" style="margin-top:-8px">🔥 ' + state.racha + " " + (state.racha === 1 ? "zi la rând" : "zile la rând") + "</div>" +
    '<div class="card" style="text-align:center">' +
    '<div style="font-weight:700;font-size:14px">Invită la Consumator VIP</div>' +
    '<p class="muted small" style="line-height:1.5;margin-top:4px">Distribuie această postare pe rețelele tale sociale, ca să-ți descopere contactele beneficiile de a fi Consumator VIP cu Atomy.</p>' +
    '<img src="img/consumidor-vip.png" alt="Consumator VIP" style="width:100%;max-width:220px;border-radius:14px;margin:10px auto 0;display:block">' +
    '<button class="btn-primary" style="width:100%;margin-top:10px;color:#fff" data-action="share-consumidor-vip">' + Icon("share2", { size: 15, color: "#fff" }) + " Distribuie</button>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Rangul tău</div>' +
    '<div class="muted small" style="margin-bottom:12px">Apasă insigna rangului pe care îl ai actualmente în Atomy.</div>' +
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

  return sectionHeaderHTML("Panoul de Realizări", logrosHechos + " din " + totalLogros + " etape cucerite", "award") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Etapele Planului de 6 Zile</div><div class="grid-3">' + etapas + "</div></div>" +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Taberele Planului de 90 de Zile</div><div class="grid-3">' + camps + "</div></div>" +
    (state.premios.length ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Premiile sponsorului tău</div><div class="grid-3">' + premios + "</div></div>" : "") +
    '<div><div style="font-size:14px;font-weight:600;margin-bottom:10px">Realizarea finală</div><div class="grid-3">' + logroChipHTML("Sales Master — Culmea", cumbreLograda, "mountain-flag", "img/logro-cumbre.png") + "</div></div>";
}

/* ---------------- Cumbre ---------------- */

function renderCumbre(state) {
  const codigo = state.codigoCumbre || "C90-000000";
  return (
    '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;padding-top:20px">' +
    Icon("award", { size: 56, color: "var(--gold)" }) +
    '<h2 style="font-size:22px;font-weight:700">Ai ajuns pe Culme, ' + escapeHtml(state.nombre) + "!</h2>" +
    '<p class="muted" style="font-size:14px;max-width:300px;line-height:1.6">Ai completat Planul tău de 90 de Zile și te-ai calificat pentru rangul de Sales Master. În săptămânile următoare vei primi acasă, prin poștă, o Scrisoare din partea Directorului Atomy, trimisă din Coreea.</p>' +
    '<div class="card" style="border:2px solid var(--gold);width:100%;text-align:left">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em">Certificat</div>' +
    '<div style="font-size:15px;font-weight:700;margin-top:4px">Ai completat Cumbre 90</div>' +
    '<div class="muted small" style="margin-top:4px">Cod ' + codigo + "</div>" +
    '<button class="btn-primary" style="background:var(--gold);margin-top:16px" data-action="download-cert">Descarcă certificatul</button>' +
    "</div>" +
    '<div class="card muted small" style="width:100%">Nu ești singur în acest drum — sărbătorește cu sponsorul tău și pregătește-te să-ți acompaniezi primul partener pe același drum.</div>' +
    "</div>"
  );
}

/* ---------------- Ajustes ---------------- */

function renderAjustes(state, ui) {
  const whatsappField =
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">WhatsApp-ul sponsorului tău</label>' +
    '<p class="muted small" style="margin-top:-2px;margin-bottom:8px;line-height:1.5">Butonul verde flotant îi scrie direct la acest număr.</p>' +
    '<input type="text" inputmode="numeric" placeholder="Ex. 40712345678" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>';

  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Notificări din browser</div><div class="muted small" style="margin-top:2px">Recordatoare în afara aplicației</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  const resetLabel = ui.confirmReset ? "Sigur? Apasă din nou pentru a reseta" : "Resetează-mi progresul";

  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Licența acestei copii</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">Această copie a Cumbre 90 este licențiată exclusiv pentru <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> și echipa proprie. Nu este autorizată pentru a fi împărțită cu alți lideri sau echipe.</p>' +
      "</div>"
    : "";

  return (
    sectionHeaderHTML("Setări", "", "settings") +
    licenciaCard +
    '<div class="card row between">' +
    '<div><div style="font-size:14px;font-weight:600">Mod sponsor</div><div class="muted small" style="margin-top:2px">Activează-l dacă îți acompaniezi și tu propria echipă — adaugă Raportul partenerilor mei</div></div>' +
    '<div class="toggle' + (state.mentorMode ? " on" : "") + '" data-action="toggle-mentor"><div class="knob"></div></div>' +
    "</div>" +
    whatsappField +
    notifRow +
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("download", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Copie de siguranță</span></div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Toate datele tale (Lista de 250, Arborele Genealogic, progresul tău) trăiesc doar pe acest dispozitiv. Descarcă o copie de siguranță și salveaz-o unde vrei (Google Drive-ul tău, email etc.) — astfel nu o pierzi dacă îți schimbi telefonul sau ștergi datele browserului.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-respaldo">' + Icon("download", { size: 15 }) + " Descarcă copia de siguranță</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="importar-respaldo-input">' + Icon("repeat", { size: 15 }) + " Restaurează din fișier</button>" +
    "</div>" +
    '<input id="importar-respaldo-input" type="file" accept="application/json,.json" class="hidden" data-target="__importBackup">' +
    "</div>" +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}

/* ---------------- Lista de 250 Contactos (CRM) ---------------- */

function contactoNivelBadge(nivel) {
  const cls = nivel === "Cald" ? "warn" : nivel === "Călduț" ? "gold" : "soft";
  return '<span class="badge ' + cls + '">' + escapeHtml(nivel) + "</span>";
}

function renderContactos(state, ui) {
  const contactos = state.contactos || [];
  const filtro = ui.contactoFiltro || "todos";
  const hoy = hoyISO();

  const counts = { Cald: 0, Călduț: 0, "Rece": 0 };
  contactos.forEach(function (c) { if (counts[c.nivel] != null) counts[c.nivel]++; });

  const filterBtns = ["todos"].concat(CONTACTO_NIVELES).map(function (f) {
    const active = filtro === f;
    const label = f === "todos" ? "Toate · " + contactos.length : f + " · " + counts[f];
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
        const fechaTxt = c.proximoSeguimiento ? (vencido ? "Restant · " : esHoy ? "Astăzi · " : "") + c.proximoSeguimiento : "Fără urmărire";
        const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
        const waLink = c.telefono
          ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
          : "";
        return nivelHeader + (
          '<div class="card contact-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
          '<div class="row between" style="align-items:flex-start">' +
          '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre) + "</div>" +
          '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "Fără telefon") + (c.pais ? " · " + escapeHtml(c.pais) : "") + "</div></div>" +
          contactoNivelBadge(c.nivel) +
          "</div>" +
          '<div class="row between" style="margin-top:10px;align-items:center">' +
          '<span class="small" style="font-weight:600' + ((c.estado === "Partener" || c.estado === "Consumator") ? ";color:var(--gold-light)" : "") + '">' + escapeHtml(c.estado) + "</span>" +
          '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
          "</div>" +
          (c.notaSeguimiento ? '<div class="muted small" style="margin-top:4px;font-style:italic">„' + escapeHtml(c.notaSeguimiento) + '”</div>' : "") +
          (c.proximoSeguimiento
            ? '<div class="row gap-2" style="margin-top:6px;align-items:center;cursor:pointer" data-action="marcar-seguimiento-hecho" data-arg="' + c.id + '">' +
              Icon("check-circle", { size: 13, color: "var(--success)" }) +
              '<span class="small" style="color:var(--success);font-weight:600">Marchează urmărirea ca făcută</span></div>'
            : "") +
          '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="3">+3 zile</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="7">+1 săpt</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="30">+1 lună</button>' +
          '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento" data-arg="' + c.id + '" data-days="60">+2 luni</button>' +
          waLink +
          '<button class="icon-btn" data-action="edit-contacto" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
          "</div>" +
          '<div class="row gap-2" style="margin-top:6px">' +
          '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto" data-arg="' + c.id + '" data-tipo="llamada">' + Icon("phone-call", { size: 13 }) + " Apel</button>" +
          '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto" data-arg="' + c.id + '" data-tipo="mensaje">' + Icon("message-circle", { size: 13 }) + " Mesaj</button>" +
          "</div>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai contacte înregistrate. Apasă „+ Contact nou” pentru a-ți începe Lista de 250.</p>';

  return (
    sectionHeaderHTML("Lista de 250 de Contacte", contactos.length + " din 250 înregistrate", "users") +
    '<p class="muted small" style="margin-top:-4px">Apasă „Apel” sau „Mesaj” la fiecare contact ca acțiunea să apară în Raportul tău Săptămânal.</p>' +
    '<input id="contacto-search" type="text" placeholder="Caută după nume sau telefon..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<div class="row gap-2">' +
    '<button class="btn-primary" style="flex:1" data-action="add-contacto">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Nou</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="importar-contactos">' + Icon("download", { size: 16 }) + " Importă contacte</button>" +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Importă contacte</span>' +
    '<button class="icon-btn" data-action="cerrar-importar-contactos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Browserul tău nu permite deschiderea directă a selectorului de contacte aici. Copiază-ți contactele de pe telefon — unul pe linie, în formatul <b>Nume, Telefon</b> — și lipește-le mai jos:</p>' +
    '<textarea rows="9" id="importar-contactos-textarea" placeholder="Ana Popescu, +40 721 111 222\nIon Ionescu, +40 721 333 444" style="margin-top:10px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 11px;font-size:13px;outline:none;resize:vertical;font-family:inherit"></textarea>' +
    '<button class="btn-primary" style="margin-top:14px" data-action="confirmar-importar-contactos">Importă</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cerrar-importar-contactos">Anulează</button>' +
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
      (ui.confirmDeleteContacto === ui.contactoEditId ? "Sigur? Apasă din nou pentru a șterge" : "Șterge contactul") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează contactul" : "Contact nou") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Țară"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Nivel</label><select data-draft-field="nivel" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + nivelOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Stadiu</label><select data-draft-field="estado" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="notas" placeholder="Cum l-ai cunoscut, interese...">' + escapeHtml(d.notas) + "</textarea></div>" +
    '<div class="field"><label>Următoarea urmărire</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="3">+3 zile</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="7">+1 săptămână</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="30">+1 lună</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento" data-arg="60">+2 luni</button>' +
    "</div>" +
    '<div class="field"><label>Notă de urmărire</label><input type="text" data-draft-field="notaSeguimiento" value="' + escapeHtml(d.notaSeguimiento || "") + '" placeholder="Ex. Sun pentru a-i întreba despre decizia lui"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto">Salvează contactul</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto">Anulează</button>' +
    "</div></div>"
  );
}

/* ---------------- Clienți — persoane care au cumpărat deja, cu istoricul comenzilor ---------------- */

function clienteRowHTML(c) {
  const hoy = hoyISO();
  const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
  const esHoy = c.proximoSeguimiento === hoy;
  const fechaTxt = c.proximoSeguimiento ? (vencido ? "Restant · " : esHoy ? "Astăzi · " : "") + c.proximoSeguimiento : "Fără urmărire";
  const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
    : "";
  const totalCompras = (c.compras || []).length;
  return (
    '<div class="card cliente-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "Fără nume") + "</div>" +
    '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "Fără telefon") + (totalCompras ? " · " + totalCompras + " achiziț" + (totalCompras === 1 ? "ie" : "ii") : "") + "</div></div>" +
    '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="7">1 săpt</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="14">2 săpt</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="30">1 lună</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-dias="60">2 luni</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:60px;font-size:11.5px" data-action="quick-seguimiento-cliente" data-arg="' + c.id + '" data-meses="11">11 luni</button>' +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai clienți înregistrați. Apasă „Client nou” pentru a începe.</p>';
  return (
    sectionHeaderHTML("Clienți", clientes.length + " înregistrați", "package") +
    '<input id="cliente-search" type="text" placeholder="Caută după nume sau telefon..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<button class="btn-primary" data-action="add-cliente">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Client nou</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function compraClienteRowHTML(co) {
  return (
    '<div class="row between" style="padding:7px 0;border-top:1px solid var(--border-soft);align-items:center">' +
    '<div style="min-width:0"><div style="font-weight:600;font-size:13px">' + escapeHtml(co.producto || "Produs") + "</div>" +
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
      (ui.confirmDeleteCliente === ui.clienteEditId ? "Sigur? Apasă din nou pentru a șterge" : "Șterge clientul") +
      "</button>"
    : "";
  const compras = (d.compras || []).slice().sort(function (a, b) { return (b.fecha || "").localeCompare(a.fecha || ""); });
  const comprasHtml = compras.length
    ? compras.map(compraClienteRowHTML).join("")
    : '<p class="muted small" style="padding:4px 0">Încă nu sunt achiziții înregistrate.</p>';
  const totalPV = compras.reduce(function (acc, co) { return acc + (Number(co.pv) || 0); }, 0);
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-cliente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:400px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează clientul" : "Client nou") + "</span>" +
    '<button class="icon-btn" data-action="cancel-cliente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Opțional"></div>' +
    '<div class="field" style="flex:1"><label>Parolă</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Opțional"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    '<div class="field" style="flex:1"><label>Data de naștere</label><input type="date" data-draft-field="fechaNacimiento" value="' + (d.fechaNacimiento || "") + '"></div>' +
    "</div>" +
    '<div class="field"><label>Observații</label><textarea rows="2" data-draft-field="observaciones" placeholder="Ex. alergii, vreo afecțiune, preferințe...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    '<div class="field"><label>Următoarea urmărire</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2" style="flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="7">1 săpt</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="14">2 săpt</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="30">1 lună</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-dias="60">2 luni</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:56px;font-size:11.5px" data-action="quick-draft-seguimiento-cliente" data-meses="11">11 luni</button>' +
    "</div>" +
    '<div class="card" style="margin-top:2px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("package", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13.5px">Produse cumpărate</span></div>' +
    (totalPV ? '<div class="muted small" style="margin-top:2px">Total istoric: ' + totalPV + " PV</div>" : "") +
    '<div style="margin-top:2px">' + comprasHtml + "</div>" +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<input id="cliente-compra-producto" type="text" placeholder="Produs" style="flex:2;min-width:110px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<input id="cliente-compra-valor" type="number" min="0" placeholder="Valoare" style="flex:1;min-width:70px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<input id="cliente-compra-pv" type="number" min="0" placeholder="PV" style="flex:1;min-width:60px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    "</div>" +
    '<input id="cliente-compra-fecha" type="date" value="' + hoyISO() + '" style="margin-top:8px;width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 10px;font-size:13px;outline:none">' +
    '<button class="btn-secondary" style="margin-top:8px;width:100%" data-action="add-compra-cliente">' + Icon("coins", { size: 14 }) + " Adaugă achiziția</button>" +
    "</div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-cliente">Salvează clientul</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-cliente">Anulează</button>' +
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
    : '<p class="muted small" style="margin-top:8px">Astăzi nu sunt zile de naștere printre clienții tăi.</p>';
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch">' +
    '<div class="row between">' +
    '<span class="row gap-2" style="align-items:center;font-weight:700;font-size:15px">' + Icon("party", { size: 16, color: "var(--gold)" }) + "<span>Zile de naștere azi</span></span>" +
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
      '<label>Ziua ' + (i + 1) + " — " + escapeHtml(diaInfo.titulo) + "</label>" +
      '<input type="time" data-agenda6-hora="' + i + '" value="' + escapeHtml(hora) + '">' +
      "</div>"
    );
  }).join("");
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-agenda6"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row gap-2">' + Icon("footprints", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:15px">' + escapeHtml(d.contactoNombre) + " este un partener nou!</span></div>" +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Programează aici cele 6 întâlniri ale Planului de 6 Zile cu ' + escapeHtml(d.contactoNombre) + " — vor fi salvate în Agenda ta Săptămânală, în ziua care îi corespunde fiecăreia. Lasă necompletată ora zilei pe care încă nu vrei să o programezi.</p>" +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + filas + "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-agenda6">Creează agenda de 6 zile</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-agenda6">Nu acum</button>' +
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(a.nombre || "Fără nume") + "</div>" +
    (subLinea ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(subLinea) + "</div>" : "") +
    (a.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(a.telefono) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-ascendente" data-arg="' + a.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-ascendente" data-arg="' + a.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (a.horarioNoMolestar ? '<div class="muted small" style="margin-top:6px;font-style:italic">Nu deranja: ' + escapeHtml(a.horarioNoMolestar) + "</div>" : "") +
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
    : '<p class="muted small" style="text-align:center;padding:20px 0">Încă nu ai adăugat pe nimeni din linia ta ascendentă.</p>';

  return (
    sectionHeaderHTML("Arborele meu Genealogic", "ID-ul tău, sponsorul tău și linia ta ascendentă, mereu la îndemână.", "crown") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("user-badge", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Eu</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Așa proprii tăi parteneri îți pot consulta ID-ul și parola fără să te întrebe de fiecare dată.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>ID Atomy</label><input type="text" data-field="arbolGenealogico.yo.atomyId" value="' + escapeHtml(yo.atomyId) + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field"><label>Parolă</label><input type="text" data-field="arbolGenealogico.yo.contrasena" value="' + escapeHtml(yo.contrasena) + '" placeholder="Parola ta Atomy"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row between"><div class="row gap-2">' + Icon("crown", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Sponsor</span></div>' + waPatrocinador + "</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Datele lui de contact și de Zoom — pentru a-i cere ajutor sau a te înscrie la formări ale companiei, care de obicei cer ID-ul sponsorului tău.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Nume</label><input type="text" data-field="arbolGenealogico.patrocinador.nombre" value="' + escapeHtml(p.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-field="arbolGenealogico.patrocinador.atomyId" value="' + escapeHtml(p.atomyId) + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-field="arbolGenealogico.patrocinador.rango" value="' + escapeHtml(p.rango) + '" placeholder="Ex. Sales Master"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-field="arbolGenealogico.patrocinador.pais" value="' + escapeHtml(p.pais) + '" placeholder="Ex. România"></div>' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-field="arbolGenealogico.patrocinador.telefono" value="' + escapeHtml(p.telefono) + '" placeholder="+40 712 345 678"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID de Zoom</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomId" value="' + escapeHtml(p.zoomId) + '" placeholder="Opțional"></div>' +
    '<div class="field" style="flex:1"><label>Parolă de Zoom</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomContrasena" value="' + escapeHtml(p.zoomContrasena) + '" placeholder="Opțional"></div>' +
    "</div>" +
    '<div class="field"><label>Orele în care nu trebuie sunat</label><input type="text" data-field="arbolGenealogico.patrocinador.horarioNoLlamar" value="' + escapeHtml(p.horarioNoLlamar) + '" placeholder="Ex. După ora 20:00, și nici duminica"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Linia ascendentă</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Persoanele de peste sponsorul tău direct — utile dacă ai nevoie de sprijinul lor, sau de ID-ul lor pentru vreo formare.</p>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-ascendente">' + Icon("crown", { size: 16, color: "#fff" }) + " Adaugă un alt nivel deasupra pe linie</button>" +
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
      (ui.confirmDeleteAscendente === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge persoana") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-ascendente"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează persoana" : "Persoană nouă din linia ascendentă") + "</span>" +
    '<button class="icon-btn" data-action="cancel-ascendente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-draft-field="rango" value="' + escapeHtml(d.rango) + '" placeholder="Ex. Sales Master"></div>' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Ex. România"></div>' +
    "</div>" +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    '<div class="field"><label>Orele în care nu trebuie deranjat</label><input type="text" data-draft-field="horarioNoMolestar" value="' + escapeHtml(d.horarioNoMolestar) + '" placeholder="Ex. După ora 21:00"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-ascendente">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-ascendente">Anulează</button>' +
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(s.nombre || "Fără nume") + "</div>" +
    (s.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(s.telefono) + "</div>" : "") +
    (s.zoomId ? '<div class="muted small" style="margin-top:2px">Zoom: ' + escapeHtml(s.zoomId) + "</div>" : "") +
    "</div>" +
    '<div class="row gap-2">' +
    waLink +
    '<button class="icon-btn" data-action="edit-sos" data-arg="' + s.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-sos" data-arg="' + s.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (s.nota ? '<div class="muted small" style="margin-top:6px;font-style:italic">„' + escapeHtml(s.nota) + '”</div>' : "") +
    "</div>"
  );
}

function renderLlamadasSOS(state, ui) {
  const lista = state.llamadasSOS || [];
  const rows = lista.length
    ? lista.map(function (s) { return sosRowHTML(s); }).join("")
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai contacte S.O.S. salvate.</p>';
  return (
    sectionHeaderHTML("Apeluri S.O.S.", "Persoane pe care le poți apela pentru sprijin, chiar dacă nu sunt din linia ta directă.", "bell") +
    '<div class="card"><p class="small" style="line-height:1.6">Uneori ajutorul de care ai nevoie nu vine din genealogia ta directă — poate fi un mentor din altă echipă, un formator al companiei, sau o persoană de încredere expertă în vreun domeniu. Salvează aici pe cine să apelezi în acele momente.</p></div>' +
    '<button class="btn-primary" data-action="add-sos">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Adaugă contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderSOSModal(ui) {
  const d = ui.sosDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-sos" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSOS === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge contactul") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-sos"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează contactul" : "Contact S.O.S. nou") + "</span>" +
    '<button class="icon-btn" data-action="cancel-sos">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    '<div class="field"><label>ID de Zoom</label><input type="text" data-draft-field="zoomId" value="' + escapeHtml(d.zoomId || "") + '" placeholder="Ex. 123 456 7890"></div>' +
    '<div class="field"><label>Notă</label><textarea rows="2" data-draft-field="nota" placeholder="De ce apela această persoană?">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-sos">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-sos">Anulează</button>' +
    "</div></div>"
  );
}

/* ---------------- Partenerii mei — directorul permanent, pe linia stângă/dreaptă ---------------- */

function misSocioRowHTML(linea, s) {
  const meses = mesesDesde(s.fechaUltimaCompra);
  const porVencer = meses !== null && meses >= 11;
  return (
    '<button class="card" style="padding:11px 13px;width:100%;text-align:left;display:block;cursor:pointer' +
    (porVencer ? ";border-color:var(--warn);background:rgba(240,166,92,0.1)" : "") + '" data-action="edit-socio" data-linea="' + linea + '" data-arg="' + s.id + '">' +
    '<div class="row between" style="align-items:center;gap:6px">' +
    '<span style="font-weight:700;font-size:13.5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap' + (porVencer ? ";color:var(--warn)" : "") + '">' + escapeHtml(s.nombre || "Fără nume") + "</span>" +
    (porVencer ? Icon("triangle-alert", { size: 14, color: "var(--warn)" }) : "") +
    "</div></button>"
  );
}

function misSociosColumnaHTML(state, linea) {
  const lista = (state.misSocios && state.misSocios[linea]) || [];
  const sorted = lista.slice().sort(function (a, b) { return (a.nombre || "").localeCompare(b.nombre || ""); });
  const rows = sorted.length
    ? sorted.map(function (s) { return misSocioRowHTML(linea, s); }).join("")
    : '<p class="muted small" style="text-align:center;padding:12px 0">Încă nu ai parteneri aici.</p>';
  return (
    '<div style="min-width:0">' +
    '<div style="font-weight:700;font-size:13px;margin-bottom:6px">' + (linea === "izquierda" ? "Stânga" : "Dreapta") + " · " + lista.length + "</div>" +
    '<button class="btn-secondary" style="width:100%;padding:8px;font-size:12.5px" data-action="add-socio" data-arg="' + linea + '">' + Icon("phone-call", { size: 14 }) + " Adaugă</button>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
    "</div>"
  );
}

function renderMisSocios(state) {
  return (
    sectionHeaderHTML("Partenerii mei", "Directorul tău permanent de echipă, pe linia stângă și dreaptă. Atinge un nume pentru a-i vedea sau actualiza datele.", "users") +
    '<div class="card"><p class="small" style="line-height:1.6">Când un partener stă <b>11 luni fără nicio achiziție</b>, numele lui se evidențiază cu portocaliu ca să te avertizeze că este pe cale să expire și trebuie să facă o achiziție.</p></div>' +
    '<div class="grid-2">' + misSociosColumnaHTML(state, "izquierda") + misSociosColumnaHTML(state, "derecha") + "</div>"
  );
}

function renderSocioModal(ui) {
  const d = ui.socioDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-socio" data-arg="' + d.id + '">' +
      (ui.confirmDeleteSocio === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge partenerul") +
      "</button>"
    : "";
  const meses = mesesDesde(d.fechaUltimaCompra);
  const aviso = meses !== null && meses >= 11
    ? '<p class="small" style="margin-top:-4px;color:var(--warn);font-weight:600;display:flex;align-items:center;gap:5px">' + Icon("triangle-alert", { size: 13, color: "var(--warn)" }) + "De " + meses + " luni fără nicio achiziție — e pe cale să expire</p>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-socio"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează partenerul" : "Partener nou — linia " + (d.linea === "izquierda" ? "Stânga" : "Dreapta")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-socio">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Parolă</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Opțional"></div>' +
    "</div>" +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    '<div class="field"><label>ID de Zoom</label><input type="text" data-draft-field="zoomId" value="' + escapeHtml(d.zoomId || "") + '" placeholder="Ex. 123 456 7890"></div>' +
    '<div class="field"><label>PVP <span class="muted" style="font-weight:400">(actualizează-l când ți-l trimite)</span></label><input type="number" min="0" step="10000" data-draft-field="pvp" value="' + (Number(d.pvp) || 0) + '"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Data de naștere</label><input type="date" data-draft-field="fechaCumpleanos" value="' + (d.fechaCumpleanos || "") + '"></div>' +
    '<div class="field" style="flex:1"><label>Data ultimei achiziții</label><input type="date" data-draft-field="fechaUltimaCompra" value="' + (d.fechaUltimaCompra || "") + '"></div>' +
    "</div>" +
    aviso +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="notas" placeholder="Observații...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-socio">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-socio">Anulează</button>' +
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "Fără nume") +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai contacte de la evenimente salvate.</p>';
  return (
    sectionHeaderHTML("Lista de Contacte", "Persoane pe care le-ai cunoscut la seminarii, convenții sau alte evenimente live — nu sunt încă întotdeauna prospecți.", "users") +
    '<button class="btn-primary" data-action="add-contacto-evento">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Adaugă contact</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderContactoEventoModal(ui) {
  const d = ui.contactoEventoDraft;
  if (!d) return "";
  const editing = !!d.id;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contacto-evento" data-arg="' + d.id + '">' +
      (ui.confirmDeleteContactoEvento === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge contactul") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto-evento"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează contactul" : "Contact nou") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto-evento">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Ex. România"></div>' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+40 712 345 678"></div>' +
    "</div>" +
    '<div class="field"><label>Observații</label><textarea rows="2" data-draft-field="observaciones" placeholder="Unde l-ai cunoscut, interese...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto-evento">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto-evento">Anulează</button>' +
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
    return new Date(fecha + "T00:00:00").toLocaleDateString("ro-RO", { weekday: "short", day: "2-digit", month: "short" });
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(z.titulo || "Întâlnire fără titlu") + "</div>" +
    '<div class="row gap-2" style="margin-top:2px;flex-wrap:wrap">' +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " Doar " + escapeHtml(agendaFechaLabel(z.fecha)) + "</span>" : '<span class="badge dark">Săptămânal</span>') +
    (z.hora ? '<span class="muted small">' + escapeHtml(z.hora) + "</span>" : "") +
    (z.recordar ? Icon("bell", { size: 11, color: "var(--gold-light)" }) : "") +
    "</div></div></div>" +
    '<button class="icon-btn" data-action="edit-zoom" data-dia="' + dia + '" data-arg="' + z.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    "</div>" +
    (z.enlace
      ? '<div class="row gap-2" style="margin-top:10px">' +
        '<a class="btn-secondary" style="flex:1;padding:8px;text-align:center" href="' + escapeHtml(z.enlace) + '" target="_blank" rel="noreferrer">' + Icon("video", { size: 14 }) + " Alătură-te</a>" +
        '<button class="icon-btn" data-action="copy-zoom-link" data-arg="' + escapeHtml(z.enlace) + '">' + Icon("copy", { size: 14 }) + "</button>" +
        "</div>"
      : '<div class="muted small" style="margin-top:8px">Fără link salvat încă — apasă pentru a-l adăuga.</div>') +
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
    : '<p class="muted small" style="text-align:center;padding:16px 0">Fără activități pentru ' + escapeHtml(diaInfo.label) + ".</p>";

  const zoomsHtml = diaData.zooms.length
    ? diaData.zooms.map(function (z) { return zoomRowHTML(diaActivo, z); }).join("")
    : '<p class="muted small" style="text-align:center;padding:16px 0">Fără întâlniri Zoom salvate pentru această zi.</p>';

  return (
    sectionHeaderHTML("Agenda Săptămânală", "Rutina ta de lucru, zi de zi — apeluri, vizite, prezentări, înregistrări și formări, plus întâlnirile tale pe Zoom.", "calendar") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + tabs + "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Activități — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-actividad" data-arg="' + diaActivo + '">+ Adaugă</button></div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + actividadesHtml + "</div>" +
    "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Zoom — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-zoom" data-arg="' + diaActivo + '">+ Adaugă</button></div>' +
    '<div class="muted small" style="margin-top:2px">Salvează aici Zoom-urile tale recurente (același link în fiecare săptămână) sau unul punctual imediat ce primești invitația — de exemplu, dacă ești anunțat astăzi despre un Zoom de mâine, îl adaugi chiar aici, cu data, ora și link-ul lui.</div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + zoomsHtml + "</div>" +
    "</div>"
  );
}

/* ---------------- Informe Semanal ---------------- */

const REGISTRO_TIPOS = [
  { id: "llamadas", label: "Apeluri", icon: "phone-call" },
  { id: "mensajes", label: "Mesaje de invitație", icon: "message-circle" },
  { id: "pedidos", label: "Comenzi", icon: "package" },
];

/* Estadísticas derivadas de la Lista de 250 (no son contadores manuales: se
   calculan al vuelo a partir de state.contactos, según estadoFecha/seguimientos). */
const REGISTRO_DERIVADOS = [
  { id: "contactados", label: "Contactați", icon: "phone-call" },
  { id: "presentaciones", label: "Prezentări", icon: "presentation" },
  { id: "registros", label: "Înregistrări noi (Partener/Consumator)", icon: "user-badge" },
  { id: "seguimientosRealizados", label: "Urmăriri făcute", icon: "check-circle" },
];

/* Los 7 indicadores del resumen por quincena: 3 manuales + 4 derivados, en un
   único orden para el gráfico y el selector de métrica comparativo. Cada uno
   con un color distinto tomado de la paleta ya definida en :root (css/styles.css). */
const QUINCENA_METRICAS = [
  { id: "llamadas", label: "Apeluri", corta: "Apel", color: "var(--gold)" },
  { id: "mensajes", label: "Mesaje", corta: "Msje", color: "var(--gold-light)" },
  { id: "pedidos", label: "Comenzi", corta: "Cmz", color: "var(--gold-deep)" },
  { id: "contactados", label: "Contactați", corta: "Cont", color: "var(--accent)" },
  { id: "presentaciones", label: "Prezentări", corta: "Prez", color: "var(--success)" },
  { id: "registros", label: "Înregistrări", corta: "Reg", color: "var(--warn)" },
  { id: "seguimientosRealizados", label: "Urmăriri făcute", corta: "Urm", color: "var(--text-soft)" },
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
    '<div class="row gap-2" style="align-items:center">' + Icon("compass", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13px">Limba mesajului de trimis</span></div>' +
    '<p class="muted small" style="margin-top:2px">Alege limba în care sponsorul tău va primi raportul (poate fi diferită de limba aplicației tale).</p>' +
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
    '<div style="font-weight:700;font-size:14px">Această săptămână (ultimele 7 zile)</div>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_TIPOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (semana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const resumenListaHtml =
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("users", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Această săptămână — Lista ta de 250</span></div>' +
    '<p class="muted small" style="margin-top:2px">Se numără doar ce a avansat cu adevărat de stadiu în această săptămână — nu orice contact nou.</p>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_DERIVADOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (derivadosSemana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const idioma = state.idiomaInforme || "ro";
  const hayActividad = (semana.llamadas + semana.mensajes + semana.pedidos + derivadosSemana.contactados + derivadosSemana.presentaciones + derivadosSemana.registros + derivadosSemana.seguimientosRealizados) > 0;
  const compartirPersonal = hayActividad
    ? (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-primary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoPersonal(state, semana, derivadosSemana, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 16, color: "#fff" }) + " Împarte-mi raportul cu sponsorul meu</a>"
        : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul sponsorului tău în Setări pentru a-ți putea împărți raportul.</p>')
    : '<p class="muted small" style="margin-top:10px">Înregistrează cel puțin o acțiune în această săptămână pentru a-ți putea împărți raportul.</p>';
  const idiomaSelector = hayActividad ? idiomaInformeSelectorHTML(state) : "";

  let equipoHtml = "";
  if (state.mentorMode) {
    const socios = state.contactos.filter(function (c) { return c.estado === "Partener"; });
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
      '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Raportul partenerilor mei</span></div>' +
      '<p class="muted small" style="margin-top:4px;line-height:1.5">O privire de ansamblu asupra echipei tale, ca să-i îndrumi — și pentru a o împărți cu propriul tău sponsor, la fel cum ei o împart pe a lor cu tine.</p>' +
      '<div class="grid-2" style="margin-top:10px;gap:10px">' +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Parteneri activi</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.totalSocios + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Noi în această săptămână</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.nuevosSocios + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Urmăriri în această săptămână</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.seguimientosSemana + "</div></div>" +
      '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Urmăriri restante</div><div style="font-size:18px;font-weight:700;color:' + (equipo.seguimientosVencidos > 0 ? "var(--warn)" : "var(--gold-light)") + '">' + equipo.seguimientosVencidos + "</div></div>" +
      "</div>" +
      (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-secondary" style="margin-top:12px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoEquipo(state, equipo, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Împarte raportul echipei mele</a>"
        : "") +
      "</div>";
  }

  return (
    sectionHeaderHTML("Raport Săptămânal", "Înregistrează-ți acțiunile zi de zi, și împarte-ți progresul cu sponsorul tău — astfel te ajută să crești.", "trending-up") +
    '<div><div style="font-weight:700;font-size:14px;margin-bottom:8px">Astăzi</div>' +
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
    '<span style="font-weight:600;font-size:13px">' + escapeHtml(calQuincenaLabel(key)) + (key === calQuincenaActualKey() ? ' <span class="muted small">(actuală)</span>' : "") + "</span>" +
    '<div class="icon-btn" style="cursor:pointer" data-action="quincena-nav" data-arg="1">' + Icon("chevron-right", { size: 16 }) + "</div>" +
    "</div>"
  );
}

function renderResumenQuincenaHTML(state, ui) {
  const abierto = !!ui.quincenaResumenAbierto;
  const header =
    '<div class="card" style="margin-top:12px">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-quincena-resumen">' +
    '<div class="row gap-2">' + Icon("trending-up", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13px">Rezumat pe quincenă</span></div>' +
    '<span style="display:inline-flex;transition:transform .2s ease;transform:rotate(' + (abierto ? "90deg" : "0deg") + ')">' + Icon("chevron-right", { size: 15, color: "var(--text-soft)" }) + "</span>" +
    "</button>" +
    '<p class="muted small" style="margin-top:4px">Apelurile, mesajele, comenzile, contactele și urmăririle tale, grupate pe quincenă de calendar (1–15 și 16–finalul fiecărei luni).</p>';

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
      '<p class="muted small" style="margin-top:14px;text-align:center;padding:10px 0">Revino când vei avea cel puțin 2 quincene de activitate pentru a-ți vedea progresul comparat.</p>';
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
      '<div style="font-weight:700;font-size:13px">Progres comparat</div>' +
      '<div class="row gap-2" style="flex-wrap:wrap;margin-top:8px">' + metricaChips + "</div>" +
      '<div style="margin-top:10px">' + svgBarChart(compItems, { width: Math.max(320, claves.length * 46) }) + "</div>" +
      "</div>";
  }

  return header + actual + comparativo + "</div>";
}

function recordatorioFieldHTML(d, toggleAction) {
  const on = !!d.recordar;
  const minOpts = [0, 10, 30, 60].map(function (m) {
    const label = m === 0 ? "La ora exactă" : m + " min înainte";
    return '<option value="' + m + '"' + (Number(d.recordarMin) === m ? " selected" : "") + ">" + label + "</option>";
  }).join("");
  return (
    '<div class="field">' +
    '<div class="row gap-2" style="align-items:center">' +
    '<button class="check-dot' + (on ? " on" : "") + '" data-action="' + toggleAction + '">' + (on ? Icon("check", { size: 13, color: "#1B1338" }) : Icon("bell", { size: 13 })) + "</button>" +
    '<button class="check-label' + (on ? " on" : "") + '" style="padding:0;flex:1;text-align:left" data-action="' + toggleAction + '">Anunță-mă cu o notificare</button>' +
    "</div>" +
    (on
      ? '<select data-draft-field="recordarMin" style="width:100%;margin-top:8px;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:9px 12px;font-size:13.5px;outline:none">' + minOpts + "</select>" +
        '<p class="muted small" style="margin-top:4px">Anunță doar cât timp ai Cumbre 90 deschis în browser sau instalat, cu notificările activate în Setări.</p>'
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
      (ui.confirmDeleteActividad === ui.actividadEditId ? "Sigur? Apasă din nou pentru a șterge" : "Șterge activitatea") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-actividad"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează activitatea" : "Activitate nouă") + "</span>" +
    '<button class="icon-btn" data-action="cancel-actividad">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Tip</label><select data-draft-field="tipo" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + tipoOpts + "</select></div>" +
    '<div class="field"><label>Ora (opțional)</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Data (opțional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Lasă necompletat dacă se repetă în fiecare săptămână în acea zi. Pune o dată dacă este punctuală — de exemplu, o sarcină unică.</p></div>' +
    '<div class="field"><label>Notă</label><textarea rows="2" data-draft-field="nota" placeholder="Cu cine, unde, ce trebuie să aduci...">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    recordatorioFieldHTML(d, "toggle-actividad-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-actividad">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-actividad">Anulează</button>' +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">Înregistrează-ți sponsorul</span>' +
    '<button class="icon-btn" data-action="cancelar-patrocinador-fab">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Încă nu i-ai notat WhatsApp-ul. Înregistrează-l o singură dată și acest buton îi va deschide direct chatul de fiecare dată când îl apeși.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre || "") + '" placeholder="Numele sponsorului tău"></div>' +
    '<div class="field"><label>WhatsApp</label><input type="text" inputmode="numeric" data-draft-field="telefono" value="' + escapeHtml(d.telefono || "") + '" placeholder="Ex. 40712345678"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="guardar-patrocinador-fab">Salvează și scrie-i</button>' +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancelar-patrocinador-fab">Anulează</button>' +
    "</div></div>"
  );
}

function renderZoomModal(ui) {
  const d = ui.zoomDraft;
  if (!d) return "";
  const editing = !!ui.zoomEditId;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-zoom" data-dia="' + d.dia + '" data-arg="' + ui.zoomEditId + '">' +
      (ui.confirmDeleteZoom === ui.zoomEditId ? "Sigur? Apasă din nou pentru a șterge" : "Șterge întâlnirea") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-zoom"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:360px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează întâlnirea Zoom" : "Întâlnire Zoom nouă") + "</span>" +
    '<button class="icon-btn" data-action="cancel-zoom">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Titlu</label><input type="text" data-draft-field="titulo" value="' + escapeHtml(d.titulo || "") + '" placeholder="Ex. Formarea săptămânală a echipei"></div>' +
    '<div class="field"><label>Ora</label><input type="time" data-draft-field="hora" value="' + (d.hora || "") + '"></div>' +
    '<div class="field"><label>Data (opțional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Lasă necompletat dacă e Zoom-ul tău din fiecare săptămână. Pune o dată dacă este o întâlnire punctuală — de exemplu, una la care ai fost tocmai invitat pentru mâine.</p></div>' +
    '<div class="field"><label>Link de conectare</label><input type="text" inputmode="url" data-draft-field="enlace" value="' + escapeHtml(d.enlace || "") + '" placeholder="https://zoom.us/j/..."></div>' +
    recordatorioFieldHTML(d, "toggle-zoom-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-zoom">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-zoom">Anulează</button>' +
    "</div></div>"
  );
}
