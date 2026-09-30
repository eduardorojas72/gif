/* ---------------------------------------------------------------
   VISTAS — Cumbre Master: cada función devuelve un string HTML
   para #view-container (o para las regiones fijas: header, menú, modales)
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Acasă", icon: "home" },
  { id: "plan", label: "Planul de Compensare", icon: "book-open" },
  { id: "planeador", label: "Planificator de Quincenă", icon: "target" },
  { id: "listas", label: "Întâlnirea de Focalizare", icon: "users" },
  { id: "reto7x7", label: "Provocarea 7×7", icon: "flame" },
  { id: "agenda", label: "Agenda Săptămânală", icon: "calendar" },
  { id: "informe", label: "Raportul Săptămânal", icon: "trending-up" },
  { id: "arbol", label: "Arborele Meu Genealogic", icon: "crown" },
  { id: "sos", label: "Apeluri S.O.S.", icon: "bell" },
  { id: "eventos", label: "Lista de Contacte", icon: "users" },
  { id: "perfil", label: "Rangul Meu", icon: "user-badge" },
  { id: "ajustes", label: "Setări", icon: "settings" },
];

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Bună dimineața";
  if (h < 20) return "Bună ziua";
  return "Bună seara";
}

/* ---------------- Bienvenida / Onboarding ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen cover-screen">' +
    Icon("gem", { size: 64, color: "var(--gold)" }) +
    '<h1 style="margin-top:22px;font-size:28px;font-weight:700;letter-spacing:-.02em">Cumbre Master</h1>' +
    '<p style="color:var(--accent);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.15em">De la Sales Master la Imperial Master</p>' +
    '<p class="muted" style="margin-top:22px;max-width:300px;font-size:15px;line-height:1.6">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Începe ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
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
    '<span class="link-btn" style="margin-top:8px;font-size:12px">' + (foto ? "Schimbă fotografia" : "Adaugă fotografie (opțional)") + "</span>" +
    "</div>" +
    '<h2 style="margin-top:22px;font-size:20px;font-weight:700">Cum te numești?</h2>' +
    '<p class="muted small" style="margin-top:4px">Așa îți personalizăm panoul de lider.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Numele tău" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<div style="width:100%;max-width:320px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Datele tale Atomy <span class="muted" style="font-weight:400">(opțional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Le notăm în Arborele tău Genealogic, ca să nu mai trebuiască să le cauți sau să le ceri din nou.</p>' +
    '<input id="onboarding-atomy-id-input" type="text" placeholder="ID-ul tău Atomy" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-atomy-pass-input" type="text" placeholder="Parola ta Atomy" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<div style="width:100%;max-width:320px;margin-top:18px;padding-top:18px;border-top:1px solid var(--border-soft)">' +
    '<h3 style="font-size:14px;font-weight:700">Sponsorul tău <span class="muted" style="font-weight:400">(opțional)</span></h3>' +
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Așa activăm dintr-o dată butonul de WhatsApp ca să-i scrii și îl notăm în Arborele tău Genealogic. Poți sări peste asta și îl completezi mai târziu.</p>' +
    '<input id="onboarding-sponsor-name-input" type="text" placeholder="Numele sponsorului tău" ' +
    'style="margin-top:12px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<input id="onboarding-sponsor-phone-input" type="text" inputmode="numeric" placeholder="WhatsApp-ul lui, ex. 34600000000" ' +
    'style="margin-top:10px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    "</div>" +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Începe ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
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
  const salir = '<button class="sidebar-item" style="color:var(--warn)" data-action="salir-app">' + Icon("log-out", { size: 20 }) + "<span>Ieși</span></button>";
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
  const salir = '<button class="menu-item" style="color:var(--warn)" data-action="salir-app">' + medallionHTML("log-out", 34) + "<span>Ieși</span></button>";
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><div class="row gap-2">' + Icon("gem", { size: 18, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">CUMBRE MASTER</span></div>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 20 }) + "</button></div>" +
    '<div class="menu-list">' + items + salir + "</div>" +
    (LICENCIA_TITULAR ? '<div class="muted small" style="text-align:center;margin-top:14px;opacity:.65">Licență exclusivă: ' + escapeHtml(LICENCIA_TITULAR) + "</div>" : "") +
    "</div></div>"
  );
}

/* ---------------- recordatorios / campana ---------------- */

function getReminders(state) {
  const out = [];
  const key = quincenaActualKey();
  const q = state.quincenas[key];
  const dias = diasRestantesQuincena(key);
  if (q && dias > 0) {
    [["izquierda", "Stânga"], ["derecha", "Dreapta"]].forEach(function (par) {
      const verificado = sumaLinea(q, par[0], true);
      const faltante = Math.max(0, META_PV_QUINCENA - verificado);
      if (faltante > 0) {
        const ritmo = Math.ceil(faltante / dias);
        out.push({ text: "Linia " + par[1] + ": mai sunt necesare " + faltante.toLocaleString("es") + " PV verificate. Ritm necesar: " + ritmo.toLocaleString("es") + " PV/zi." });
      }
    });
  }
  const hoy = hoyISO();
  (state.contactosEventos || []).forEach(function (c) {
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

function renderBellPanel(state) {
  const reminders = getReminders(state);
  const body = reminders.length
    ? reminders.map(function (r) {
        const waBtn = r.telefono
          ? '<a class="icon-btn" style="flex-shrink:0" href="' + waHrefPersonal(r.telefono) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 14, color: "var(--success)" }) + "</a>"
          : "";
        const hechoBtn = r.contactoId
          ? '<div class="icon-btn" style="flex-shrink:0;cursor:pointer" data-action="marcar-seguimiento-contacto-hecho" data-arg="' + r.contactoId + '" title="Marchează urmărirea ca făcută">' + Icon("check-circle", { size: 14, color: "var(--success)" }) + "</div>"
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
        ? '<button class="link-btn small" style="margin-top:8px" data-action="goto" data-arg="eventos">Vezi Lista de Contacte →</button>'
        : "")
    : '<p class="muted small" style="margin-top:8px">Ești la zi — nu ai alerte de ritm sau urmăriri în așteptare.</p>';
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
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="close-modal"></div>' +
    '<div class="modal-card logro-modal">' +
    Icon("award", { size: 46, color: "var(--gold)" }) +
    '<div class="logro-modal-eyebrow">Rang nou atins!</div>' +
    '<div class="logro-modal-title">' + escapeHtml(logro.titulo) + "</div>" +
    (logro.sub ? '<div class="logro-modal-sub">' + escapeHtml(logro.sub) + "</div>" : "") +
    '<div class="muted small" style="margin-top:12px;line-height:1.5">Distribuie-l cu echipa ta — exemplul duplică mai mult decât orice discurs 👇</div>' +
    shareLogroLinksHTML(logro.titulo) +
    '<button class="link-btn small" style="margin-top:8px" data-action="close-modal">Perfect, continuă</button>' +
    "</div></div>"
  );
}

/* ---------------- Inicio ---------------- */

function quincenaNavHTML(qKey) {
  const actual = esQuincenaActual(qKey);
  return (
    '<div class="quincena-nav">' +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="-1">' + Icon("chevron-left", { size: 18 }) + "</button>" +
    '<div class="qn-label">' + escapeHtml(quincenaLabel(qKey)) + (actual ? ' <span class="badge gold" style="margin-left:6px">Curentă</span>' : "") + "</div>" +
    '<button class="icon-btn" data-action="nav-quincena" data-arg="1">' + Icon("chevron-right", { size: 18 }) + "</button>" +
    "</div>" +
    (actual ? '<div class="muted small" style="text-align:center;margin-top:-4px">' + diasRestantesQuincena(qKey) + " zile rămase în această quincenă</div>" : "")
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
      '<div class="rl-sub">Verificat ' + pct + "% · Planificat neverificat: " + plan.toLocaleString("es") + " PV</div>" +
      "</div>"
    );
  }
  return '<div class="resumen-linea">' + bloque("Stânga", planIzq, verIzq, pctIzq) + bloque("Dreapta", planDer, verDer, pctDer) + "</div>";
}

function renderHome(state, ui) {
  const rango = RANGOS_MASTER[state.rangoActualIndex];
  const siguiente = RANGOS_MASTER[state.rangoActualIndex + 1];
  const key = quincenaActualKey();
  const q = peekQuincena(state, key);
  const planIzq = sumaLinea(q, "izquierda", false), verIzq = sumaLinea(q, "izquierda", true);
  const planDer = sumaLinea(q, "derecha", false), verDer = sumaLinea(q, "derecha", true);
  const avatarInner = state.foto ? '<img src="' + state.foto + '" alt="Fotografia ta"/>' : Icon("user-badge", { size: 20, color: "var(--accent)" });

  return (
    '<button class="row gap-3" style="text-align:left;width:100%" data-action="goto" data-arg="perfil">' +
    '<div style="width:48px;height:48px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;background:var(--card)">' + avatarInner + "</div>" +
    '<div><div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + escapeHtml(rango.nombre) + '</div>' +
    '<h1 style="font-size:18px;font-weight:700;margin-top:1px">Salut, ' + escapeHtml(state.nombre || "lider") + ' 👋</h1></div>' +
    "</button>" +

    '<div class="card">' +
    '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">' + saludoHora() + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">Quincena ta curentă</div>' +
    '<div class="muted small" style="margin-top:4px">' + escapeHtml(quincenaLabel(key)) + " · " + diasRestantesQuincena(key) + " zile rămase</div>" +
    "</div>" +

    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +

    (siguiente
      ? '<div class="card"><div class="row gap-2">' + Icon("target", { size: 14, color: "var(--gold)" }) + '<span style="color:var(--gold);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em">Următorul tău obiectiv</span></div>' +
        '<div style="font-size:15px;font-weight:700;margin-top:6px">' + escapeHtml(siguiente.nombre) + "</div>" +
        '<div class="muted small" style="margin-top:2px;line-height:1.5">' + escapeHtml(siguiente.prerrequisito) + "</div>" +
        "</div>"
      : '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 Ai atins deja Imperial Master, cel mai înalt rang al planului!</div>') +

    '<button class="nav-card card card-hover" data-action="goto" data-arg="planeador">' + medallionHTML("target", 44) + '<div class="nc-body"><div class="nc-title">Planificator de Quincenă</div><div class="nc-desc">Cât mai e și în ce ritm</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="listas">' + medallionHTML("users", 44) + '<div class="nc-body"><div class="nc-title">Întâlnirea de Focalizare</div><div class="nc-desc">Planifică împreună cu echipa ta, linie cu linie</div></div>' + clicaAquiBadgeHTML(false, "accent") + "</button>" +
    '<button class="nav-card card card-hover" data-action="goto" data-arg="plan">' + medallionHTML("book-open", 44) + '<div class="nc-body"><div class="nc-title">Planul de Compensare</div><div class="nc-desc">Cum funcționează, explicat simplu</div></div>' + clicaAquiBadgeHTML(false, "gold") + "</button>"
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
      '<div style="color:var(--accent);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">' + (r.n === 0 ? "Rang atins" : "Rangul " + (r.n + 1)) + "</div>" +
      '<div style="font-size:16px;font-weight:700;margin-top:2px">' + escapeHtml(r.nombre) + "</div>" +
      '<div class="row gap-2" style="margin-top:auto;padding-top:10px;color:var(--gold-light)">' + Icon("rotate-ccw", { size: 12, color: "var(--gold-light)" }) + '<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Apasă pentru a vedea detaliile</span></div>' +
      "</div>";
    const back =
      '<div class="flip-face flip-back">' +
      '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.06em">' + Icon("sparkles", { size: 13, color: "var(--gold)" }) + escapeHtml(r.nombre) + "</div>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Cerință preliminară</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.prerrequisito) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Comisionul de Măiestrie</div>' +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.comisionMaestria) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Bonus la avansare</div>' +
      (r.montos || []).map(function (m) {
        return '<p style="font-size:13px;font-weight:700;line-height:1.5;margin-top:4px;color:var(--gold-light)">' + escapeHtml(m.etiqueta) + ": " + escapeHtml(formatMonedaAprox(m.cop, paisInfo)) + "</p>";
      }).join("") +
      '<p style="font-size:12.5px;line-height:1.5;margin-top:4px">' + escapeHtml(r.promocion) + "</p>" +
      '<div style="font-weight:700;font-size:12px;color:var(--gold-light);margin-top:12px">Pentru a avansa</div>' +
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
    const texto = escapeHtml(n.etiqueta) + ": echivalează cu " + escapeHtml(formatMonedaAprox(n.cop, paisInfo)) + (n.sufijo ? " " + escapeHtml(n.sufijo) : "") + ".";
    return '<p class="muted small" style="line-height:1.5;margin-top:6px">' + texto + "</p>";
  }).join("") + '<p class="muted small" style="line-height:1.5;margin-top:6px">' + escapeHtml(NOTA_MONEDA_APROX) + "</p>";
  const clubes = CLUBES_EXITO.map(function (c) {
    const requisito = c.requisito || ("Să fi obținut un venit anual de " + formatMonedaAprox(c.ingresoAnualCop, paisInfo) + ".");
    const nota = c.ingresoCopMin
      ? "Echivalează cu un venit " + formatMonedaRangoAprox(c.ingresoCopMin, c.ingresoCopMax, paisInfo) + " " + c.ingresoSufijo + "."
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
    sectionHeaderHTML("Planul de Compensare", "Cum se împart comisioanele, și drumul de la Sales Master la Imperial Master.", "book-open") +
    '<div class="card">' +
    '<p class="small" style="line-height:1.6">' + escapeHtml(DISTRIBUCION.intro) + "</p>" +
    partes +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(DISTRIBUCION.notaPeriodo) + "</p>" +
    "</div>" +
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px;margin-bottom:8px">Comisionul General (44%)</div>' +
    '<div class="table-simple"><table><thead><tr><th>Nivel</th><th>Puncte</th><th>Condiția membrului</th><th>Linia mai slabă</th></tr></thead><tbody>' + filasTabla + "</tbody></table></div>" +
    '<p class="muted small" style="margin-top:10px;line-height:1.5">' + escapeHtml(COMISION_GENERAL_NOTA) + "</p>" +
    "</div>" +
    '<div style="font-size:14px;font-weight:700;margin-top:4px">Drumul de Măiestrie — de la Sales Master la Imperial Master</div>' +
    '<div class="muted small" style="margin-top:2px">Apasă pe un card pentru a vedea bonusul său aproximativ în moneda ta (' + escapeHtml(paisInfo.label) + "). " + escapeHtml(NOTA_MONEDA_APROX) + "</div>" +
    '<div class="view-stack gap-sm">' + cards + "</div>" +
    '<div class="card"><div style="font-weight:700;font-size:14px;margin-bottom:4px">Reguli generale de avansare</div>' + criterios + "</div>" +
    '<div class="card"><div class="row gap-2" style="font-weight:700;font-size:14px">' + Icon("trophy", { size: 15, color: "var(--gold)" }) + " Cluburile Succesului</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Recunoașteri suplimentare pentru venituri constante, dincolo de rangul de Măiestrie atins.</p>' +
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
    '<input type="text" placeholder="Data (ex. 08/2026)" value="' + escapeHtml(h.fecha) + '" data-field="granPlan3.' + anio + "." + i + '.fecha" style="flex:1;min-width:110px;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:6px 9px;font-size:12.5px;outline:none">' +
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
    clicaAquiBadgeHTML(open, "gold") +
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
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Jurnalul eu-lui meu din viitor</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
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
      '<input type="text" placeholder="Ex. Să sun 10 persoane pe zi" value="' + escapeHtml(a.texto) + '" data-field="planComercialMensual.' + mesKey + ".acciones." + i + '.texto" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);' + (a.hecha ? "text-decoration:line-through;opacity:.6;" : "") + 'font-size:13px;padding:4px 2px;outline:none">' +
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
    '<div class="row gap-2" style="color:var(--gold);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em">' + Icon("target", { size: 13, color: "var(--gold)" }) + " Planul comercial lunar</div>" +
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
    '<div class="row between"><span style="font-weight:700;font-size:13px">Scorul tău din această lună</span><span style="font-weight:700;font-size:18px;color:var(--gold)">' + total + "</span></div>" +
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
  '<p class="muted small" style="margin-top:6px;line-height:1.55">Acel control zilnic (Citire, Vizionare VOD, Participare la întâlniri, Folosirea produsului, Prezentarea planului, Livrarea către consumator, Consultarea sponsorului, Generarea încrederii) îl ții deja pe pagina ta oficială Atomy — intră la <b>Urmează Succesul → 8 Core-ul meu lunar</b> și marchează-l acolo zi de zi.</p>' +
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
    alerta = '<div class="card" style="background:var(--success-soft);border-color:var(--success);text-align:center;font-weight:600">🏆 Ai completat deja cele 2.500.000 PV pe ambele linii în această quincenă!</div>';
  } else if (desequilibrio > META_PV_QUINCENA * 0.4) {
    const adelantada = verIzq > verDer ? "Stânga" : "Dreapta";
    const atrasada = verIzq > verDer ? "Dreapta" : "Stânga";
    alerta =
      '<div class="card" style="border-color:var(--warn);background:var(--warn-soft)">' +
      '<div class="row gap-2" style="font-weight:700;color:var(--warn)">' + Icon("triangle-alert", { size: 16, color: "var(--warn)" }) + " Linii dezechilibrate</div>" +
      '<p class="small" style="margin-top:6px;line-height:1.5">Linia ta ' + adelantada + " este mult înaintea liniei tale " + atrasada + ". Punctele care rămân în plus pe " + adelantada + " nu ciclează dacă " + atrasada + " nu ajunge la același nivel — activează mai multe comenzi pe " + atrasada + " înainte de finalul quincenei.</p>" +
      "</div>";
  }

  function bloqueCalc(nombre, falt, ritmo) {
    return (
      '<div class="card">' +
      '<div class="rl-label">' + nombre + "</div>" +
      (falt > 0
        ? '<div class="rl-value">' + falt.toLocaleString("es") + ' <span class="muted small" style="font-weight:400">PV rămase</span></div>' +
          '<div class="rl-sub">Ritm necesar: ' + ritmo.toLocaleString("es") + " PV/zi timp de " + dias + (dias === 1 ? " zi" : " zile") + "</div>"
        : '<div class="rl-value" style="color:var(--success)">Completat ✓</div>') +
      "</div>"
    );
  }

  return (
    sectionHeaderHTML("Planificator de Quincenă", "Cât mai e și în ce ritm, ca să nu pierzi ciclajul.", "target") +
    quincenaNavHTML(qKey) +
    alerta +
    '<div class="resumen-linea">' + bloqueCalc("Stânga", faltIzq, ritmoIzq) + bloqueCalc("Dreapta", faltDer, ritmoDer) + "</div>" +
    '<button class="btn-secondary" data-action="goto" data-arg="listas">' + Icon("users", { size: 15 }) + " Du-te la Întâlnirea de Focalizare</button>" +
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

/* ---------------- "Clica aquí" — badge reutilizable para toggles y navegación ---------------- */

function clicaAquiBadgeHTML(open, color) {
  const cls = color === "accent" ? "blue" : "gold";
  return (
    '<span class="badge ' + cls + '" style="flex-shrink:0">Apasă aici' +
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
    '<td style="padding:4px"><input type="text" placeholder="Nume" value="' + escapeHtml(fila.nombre) + '" data-field="' + pathPrefix + "." + i + '.nombre" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" inputmode="tel" placeholder="Telefon" value="' + escapeHtml(fila.telefono) + '" data-field="' + pathPrefix + "." + i + '.telefono" style="' + inputStyle + '"></td>' +
    '<td style="padding:4px"><input type="text" placeholder="Observații / urmărire" value="' + escapeHtml(fila.observaciones) + '" data-field="' + pathPrefix + "." + i + '.observaciones" style="' + inputStyle + '"></td>' +
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
    '<div class="row gap-2">' + Icon("phone-call", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Primele mele 10 contacte</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<div class="muted small" style="margin-top:4px">' + llenos + " din 10 cu nume înregistrat</div>" +
    (open
      ? '<div style="overflow-x:auto;margin-top:10px">' +
        '<table style="border-collapse:collapse;width:100%">' +
        "<thead><tr><th></th><th style=\"" + thStyle + "\">Nume</th><th style=\"" + thStyle + "\">Telefon</th><th style=\"" + thStyle + "\">Observații</th></tr></thead>" +
        "<tbody>" + filas + "</tbody>" +
        "</table></div>"
      : "") +
    "</div>"
  );
}

function evaluacion7x7ResumenTexto(ev, periodoLabel) {
  return (
    "📊 " + periodoLabel + " — Provocarea 7×7 (Cumbre Master):\n" +
    "• Persoane contactate: " + (ev.contactados || "0") + "\n" +
    "• Au răspuns: " + (ev.respondieron || "0") + "\n" +
    "• Prezentări făcute: " + (ev.presentaciones || "0") + "\n" +
    "• Achiziții obținute: " + (ev.compras || "0") + "\n" +
    "• Persoane interesate de afacere: " + (ev.interesados || "0") + "\n" +
    "• Pe cine trebuie să continui să acompaniez: " + (ev.seguimiento || "—") +
    "\n\nMă ajuți să-l revizuim?"
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
    ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, evaluacion7x7ResumenTexto(ev, periodoLabel)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Distribuie cu sponsorul meu</a>"
    : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul sponsorului tău în Setări ca să poți distribui asta.</p>';
  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="' + toggleAction + '"' + (toggleArg != null ? ' data-arg="' + toggleArg + '"' : "") + '>' +
    '<div class="row gap-2">' + Icon("target", { size: 15, color: "var(--accent)" }) + '<span style="font-weight:700;font-size:14px">Rezultatele mele din această săptămână</span></div>' +
    clicaAquiBadgeHTML(open, "accent") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Înregistrează-le la fiecare 7 zile și distribuie-le cu sponsorul tău — aceasta este munca de mereu pentru a-ți dezvolta afacerea.</p>' +
    (open
      ? '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
        campo("contactados", "Persoane contactate", "0") +
        campo("respondieron", "Au răspuns", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("presentaciones", "Prezentări făcute", "0") +
        campo("compras", "Achiziții obținute", "0") +
        "</div>" +
        '<div class="row gap-2" style="margin-top:8px;flex-wrap:wrap">' +
        campo("interesados", "Persoane interesate de afacere", "0") +
        "</div>" +
        '<div class="field" style="margin-top:8px"><label>Pe cine trebuie să continui să acompaniez?</label>' +
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
  return "aprox. " + min + " – " + max;
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
    '<input type="text" placeholder="Numele produsului" value="' + escapeHtml(p.nombre) + '" data-field="catalogoProductos.' + paisId + "." + i + '.nombre" style="flex:1;min-width:0;background:transparent;border:none;border-bottom:1px solid var(--border-soft);color:var(--text);font-size:13.5px;padding:4px 2px;outline:none">' +
    '<button class="roster-check' + (p.probado ? " on" : "") + '" style="margin-top:0" data-action="toggle-producto-probado" data-arg="' + i + '" title="Marchează ca testat">' +
    '<div class="box" style="width:22px;height:22px">' + (p.probado ? Icon("check", { size: 12, color: "#1B1338" }) : "") + "</div>" +
    "</button>" +
    '<button class="icon-btn" style="flex-shrink:0" data-action="delete-producto" data-arg="' + i + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">PV</label><input type="number" min="0" value="' + (Number(p.pv) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.pv" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:64px"><label class="muted small" style="display:block">Preț (' + paisInfo.moneda + ")</label><input type=\"number\" min=\"0\" value=\"" + (Number(p.precio) || 0) + '" data-field="catalogoProductos.' + paisId + "." + i + '.precio" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
    '<div style="flex:1;min-width:90px"><label class="muted small" style="display:block">Această quincenă</label><input type="number" min="0" value="' + cantidad + '" data-field="quincenas.' + qKey + ".compras." + p.id + '" style="width:100%;background:var(--bg);border:1px solid var(--gold-deep);color:var(--text);border-radius:8px;padding:5px 8px;font-size:12px;outline:none"></div>' +
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
    '<div class="row gap-2">' + Icon("book-open", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Calculatorul de produse</span></div>' +
    clicaAquiBadgeHTML(open, "gold") +
    "</button>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Marchează ce produse ai testat deja și câte planifică fiecare să cumpere în această quincenă — așa știi câte PV reprezintă și cât vei plăti, pentru întâlnirea ta de focalizare.</p>' +
    '<div class="muted small" style="margin-top:10px">Țară / catalog</div>' +
    paisSelectorHTML(state) +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">PV planificate</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + totalPV.toLocaleString(paisInfo.locale) + "</div></div>" +
    '<div class="card" style="flex:1;padding:10px;text-align:center"><div class="muted small">Total de plată</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + formatMoneda(totalPrecio, paisInfo) + "</div></div>" +
    "</div>" +
    '<div class="muted small" style="margin-top:8px">' + probados + " din " + catalogo.length + " produse testate · " + planeados + " planificate în această quincenă</div>" +
    (planeados > 0
      ? (state.whatsapp && state.whatsapp.trim()
          ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, pedidoResumenTexto(catalogo, compras, paisInfo, totalPV, totalPrecio, "Cumbre Master")) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Distribuie cu sponsorul meu</a>"
          : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul sponsorului tău în Setări ca să poți distribui comanda ta.</p>')
      : "") +
    (open
      ? '<p class="muted small" style="margin-top:10px;line-height:1.5;font-style:italic">' + escapeHtml(catalogo.length ? CATALOGO_PRODUCTOS_NOTA : CATALOGO_PRODUCTOS_NOTA_VACIO) + "</p>" +
        '<div class="view-stack gap-sm" style="margin-top:8px">' + rows + "</div>" +
        '<button class="btn-secondary" style="margin-top:12px" data-action="add-producto">+ Adaugă produs</button>'
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(p.nombre || "Fără nume") + "</div>" +
    (p.telefono ? '<div class="muted small" style="margin-top:2px">' + escapeHtml(p.telefono) + (p.pais ? " · " + escapeHtml(paisCatalogoInfo(p.pais).label) : "") + "</div>" : "") +
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
    '<button class="icon-btn" data-action="edit-persona" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("edit", { size: 14 }) + "</button>" +
    '<button class="icon-btn" data-action="delete-persona" data-linea="' + linea + '" data-arg="' + p.id + '">' + Icon("x", { size: 14 }) + "</button>" +
    "</div></div>" +
    (p.notas ? '<div class="muted small" style="margin-top:4px;font-style:italic">“' + escapeHtml(p.notas) + '”</div>' : "") +
    '<div class="rr-inputs">' +
    '<div class="field"><label>PVP</label><input type="number" min="0" step="10000" value="' + (Number(p.pvp) || 0) + '" data-roster-field="pvp" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="field"><label>PVG</label><input type="number" min="0" step="10000" value="' + (Number(p.puntos) || 0) + '" data-roster-field="puntos" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    "</div>" +
    '<div class="field" style="margin-top:8px"><label>Data planificată</label><input type="date" value="' + (p.fecha || "") + '" data-roster-field="fecha" data-qkey="' + qKey + '" data-linea="' + linea + '" data-id="' + p.id + '"></div>' +
    '<div class="roster-check' + verificadoClass + '" data-action="toggle-verificado" data-qkey="' + qKey + '" data-linea="' + linea + '" data-arg="' + p.id + '">' +
    '<div class="box">' + (p.verificado ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (p.verificado ? "Verificat — și-a comandat deja punctele" : "Marchează ca verificat") + "</span>" +
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
          return "• " + (p.nombre || "(fără nume)") + ": PVP " + (Number(p.pvp) || 0).toLocaleString("es") + " · PVG " + (Number(p.puntos) || 0).toLocaleString("es") + (p.verificado ? " ✅ verificat" : " (neverificat)");
        }).join("\n")
      : "  (fără persoane înregistrate)";
    return (
      "*Linia " + nombre + "*\n" +
      personasTxt +
      (otros ? "\n• În afara listei (consum/altele): " + otros.toLocaleString("es") + " puncte" : "") +
      "\nVerificat: " + ver.toLocaleString("es") + " puncte · Planificat neverificat: " + plan.toLocaleString("es") + " puncte"
    );
  }
  return (
    "🎯 Întâlnire de Focalizare — Quincena " + quincenaLabel(qKey) + ":\n\n" +
    lineaTexto("Stânga", "izquierda") + "\n\n" +
    lineaTexto("Dreapta", "derecha") +
    "\n\n" + (q.reunionHecha ? "✅ Mi-am făcut deja întâlnirea de focalizare cu partenerii mei." : "⏳ Încă nu mi-am făcut întâlnirea de focalizare cu partenerii mei.") +
    "\n\nMă ajuți să-l revizuim ca să-mi planific quincena?"
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
        '<div class="row gap-2">' + Icon(d.icono, { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:13.5px">Ziua ' + d.id + " — " + escapeHtml(d.titulo) + "</span></div>" +
        clicaAquiBadgeHTML(diaOpen, "gold") +
        "</button>" +
        (diaOpen
          ? '<p class="muted small" style="margin-top:6px;font-style:italic">' + escapeHtml(d.frase) + "</p>" +
            contenidoHtml +
            '<div style="margin-top:10px">' + checklistHtml + "</div>"
          : '<div class="muted small" style="margin-top:4px">' + diaEst.checks.filter(Boolean).length + " din " + d.checklist.length + " sarcini făcute</div>") +
        "</div>"
      );
    }).join("");

    return (
      '<div class="card" style="margin-top:12px">' +
      '<button class="row between" style="width:100%;text-align:left" data-action="toggle-reto7x7-semana" data-arg="' + semN + '">' +
      '<div class="row gap-2">' + Icon("flame", { size: 16, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:15px">Săptămâna ' + semN + " — Provocarea 7×7</span></div>" +
      clicaAquiBadgeHTML(open, "gold") +
      "</button>" +
      '<div class="muted small" style="margin-top:4px">' + doneCount + " din " + totalChecks + " sarcini finalizate</div>" +
      (open
        ? diasHtml +
          contactos10TablaHTML("reto7x7." + semN + ".contactos10", est.contactos10, contactos10Open, "toggle-reto7x7-contactos10", semN) +
          evaluacion7x7PanelHTML(state, "reto7x7." + semN + ".evaluacion", est.evaluacion, evaluacionOpen, "toggle-reto7x7-evaluacion", semN, "Săptămâna " + semN)
        : "") +
      "</div>"
    );
  }).join("");

  return (
    sectionHeaderHTML("Provocarea 7×7", RETO_7X7_INTRO, "flame") +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai adăugat pe nimeni pe această linie. Apasă „+ Adaugă persoană” în întâlnirea ta de planificare.</p>';

  return (
    sectionHeaderHTML("Întâlnirea de Focalizare", "Planifică împreună cu echipa ta câte puncte va comanda fiecare persoană, și la ce dată din quincenă.", "users") +
    quincenaNavHTML(qKey) +
    '<div class="roster-check' + (q.reunionHecha ? " on" : "") + '" data-action="toggle-reunion-enfoque" data-qkey="' + qKey + '">' +
    '<div class="box">' + (q.reunionHecha ? Icon("check", { size: 13, color: "#1B1338" }) : "") + "</div>" +
    '<span class="lbl">' + (q.reunionHecha ? "Întâlnire de focalizare făcută în această quincenă" : "Marchează: mi-am făcut întâlnirea de focalizare cu partenerii mei") + "</span>" +
    "</div>" +
    resumenLineasHTML(planIzq, verIzq, planDer, verDer) +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, resumenEnfoqueTexto(state, qKey)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Distribuie cu sponsorul meu</a>"
      : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul sponsorului tău în Setări ca să poți distribui Întâlnirea ta de Focalizare.</p>') +
    '<div class="tabs">' +
    '<button class="tab-btn' + (linea === "izquierda" ? " active" : "") + '" data-action="set-linea" data-arg="izquierda">Stânga (' + (q.izquierda || []).length + ")</button>" +
    '<button class="tab-btn' + (linea === "derecha" ? " active" : "") + '" data-action="set-linea" data-arg="derecha">Dreapta (' + (q.derecha || []).length + ")</button>" +
    "</div>" +
    '<div class="field"><label>Puncte deja confirmate în afara listei (consum personal sau altele)</label>' +
    '<input type="number" min="0" step="10000" value="' + (linea === "izquierda" ? q.otrosIzquierda : q.otrosDerecha) + '" data-field="quincenas.' + qKey + "." + (linea === "izquierda" ? "otrosIzquierda" : "otrosDerecha") + '"></div>' +
    '<button class="btn-primary" data-action="add-persona" data-arg="' + linea + '">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Adaugă persoană</button>" +
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
      (ui.confirmDeletePersona === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge persoana") +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează persoana" : "Persoană nouă — linia " + (d.linea === "izquierda" ? "Stânga" : "Dreapta")) + "</span>" +
    '<button class="icon-btn" data-action="cancel-persona">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="field"><label>Țară</label>' + paisChips + "</div>" +
    '<div class="field"><label>Telefon (opțional)</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="' + escapeHtml(paisInfo.codigo) + ' 300 000 0000"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-draft-field="atomyId" value="' + escapeHtml(d.atomyId || "") + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Parolă</label><input type="text" data-draft-field="contrasena" value="' + escapeHtml(d.contrasena || "") + '" placeholder="Opțional"></div>' +
    "</div>" +
    '<p class="muted small" style="line-height:1.4;margin-top:-4px">Parola este opțională și doar pentru ca echipa să poată introduce puncte pentru acest partener dacă e nevoie — nimeni nu este obligat să o distribuie.</p>' +
    '<div class="field"><label>Note</label><textarea rows="2" data-draft-field="notas" placeholder="Observații...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-persona">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-persona">Anulează</button>' +
    "</div></div>"
  );
}

/* ---------------- Agenda Semanal ---------------- */

function agendaTipoInfo(tipoId) {
  return AGENDA_TIPOS.find(function (t) { return t.id === tipoId; }) || AGENDA_TIPOS[0];
}

function agendaFechaLabel(fecha) {
  try {
    return new Date(fecha + "T00:00:00").toLocaleDateString("ro-RO", { weekday: "short", day: "2-digit", month: "short" });
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
    '<div style="min-width:0"><div style="font-weight:700;font-size:13.5px">' + escapeHtml(z.titulo || "Întâlnire fără titlu") + "</div>" +
    '<div class="row gap-2" style="margin-top:2px;flex-wrap:wrap">' +
    (puntual ? '<span class="badge soft">' + Icon("calendar", { size: 10 }) + " Doar " + escapeHtml(agendaFechaLabel(z.fecha)) + "</span>" : '<span class="badge dark">În fiecare săptămână</span>') +
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
      : '<div class="muted small" style="margin-top:8px">Încă nu ai salvat un link — apasă pentru a-l adăuga.</div>') +
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
    sectionHeaderHTML("Agenda Săptămânală", "Rutina ta de lider, zi de zi — apeluri, întâlniri cu afiliați, consultanțe, formări și întâlniri de lideri, plus Zoom-urile tale.", "calendar") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + tabs + "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Activități — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-actividad" data-arg="' + diaActivo + '">+ Adaugă</button></div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + actividadesHtml + "</div>" +
    "</div>" +
    '<div>' +
    '<div class="row between" style="align-items:center"><span style="font-weight:700;font-size:14px">Zoom — ' + escapeHtml(diaInfo.label) + "</span>" +
    '<button class="link-btn small" data-action="add-zoom" data-arg="' + diaActivo + '">+ Adaugă</button></div>' +
    '<div class="muted small" style="margin-top:2px">Salvează aici Zoom-urile tale recurente (același link în fiecare săptămână) sau unul punctual imediat ce primești invitația — de exemplu, dacă ești anunțat astăzi de un Zoom pentru mâine, îl adaugi chiar aici cu data, ora și linkul lui.</div>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' + zoomsHtml + "</div>" +
    "</div>"
  );
}

function recordatorioFieldHTML(d, toggleAction) {
  const on = !!d.recordar;
  const minOpts = [0, 10, 30, 60].map(function (m) {
    const label = m === 0 ? "Chiar la ora aceea" : m + " min înainte";
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
        '<p class="muted small" style="margin-top:4px">Anunță doar cât timp ai Cumbre Master deschis în browser sau instalat, cu notificările activate în Setări.</p>'
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
    '<div class="field"><label>Data (opțional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Las-o goală dacă se repetă în fiecare săptămână în acea zi. Pune o dată dacă este punctuală — de exemplu, o sarcină o singură dată.</p></div>' +
    '<div class="field"><label>Notă</label><textarea rows="2" data-draft-field="nota" placeholder="Cu cine, unde, ce trebuie să duci...">' + escapeHtml(d.nota || "") + "</textarea></div>" +
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
    '<p class="muted small" style="margin-top:2px;line-height:1.5">Încă nu ai notat WhatsApp-ul lui. Înregistrează-l o dată și acest buton îi va deschide direct chatul de fiecare dată când îl apeși.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre || "") + '" placeholder="Numele sponsorului tău"></div>' +
    '<div class="field"><label>WhatsApp</label><input type="text" inputmode="numeric" data-draft-field="telefono" value="' + escapeHtml(d.telefono || "") + '" placeholder="Ex. 34600000000"></div>' +
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
    '<div class="field"><label>Data (opțional)</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"><p class="muted small" style="margin-top:2px">Las-o goală dacă este Zoom-ul tău din fiecare săptămână. Pune o dată dacă este o întâlnire punctuală — de exemplu, una la care ai fost invitat chiar acum pentru mâine.</p></div>' +
    '<div class="field"><label>Link de conectare</label><input type="text" inputmode="url" data-draft-field="enlace" value="' + escapeHtml(d.enlace || "") + '" placeholder="https://zoom.us/j/..."></div>' +
    recordatorioFieldHTML(d, "toggle-zoom-recordar") +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-zoom">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-zoom">Anulează</button>' +
    "</div></div>"
  );
}

/* ---------------- Informe Semanal ---------------- */

const REGISTRO_TIPOS = [
  { id: "llamadas", label: "Apeluri", icon: "phone-call" },
  { id: "mensajes", label: "Mesaje de invitație", icon: "message-circle" },
  { id: "presentaciones", label: "Prezentări (Show the Plan)", icon: "book-open" },
  { id: "reuniones", label: "Întâlniri / consultații", icon: "users" },
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
    "• " + t.pvPlaneado + ": " + equipo.pvPlaneado.toLocaleString("es") + " · " + t.pvVerificado + ": " + equipo.pvVerificado.toLocaleString("es") +
    "\n\n" + t.cierreEquipo
  );
}

function idiomaInformeSelectorHTML(state) {
  return (
    '<div class="card" style="margin-top:12px">' +
    '<div class="row gap-2" style="align-items:center">' + Icon("compass", { size: 14, color: "var(--gold-light)" }) + '<span style="font-weight:600;font-size:13px">Limba mesajului de distribuit</span></div>' +
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

  const contadores = REGISTRO_TIPOS.map(function (t) { return contadorAccionHTML(t.id, t.label, t.icon, hoyReg[t.id] || 0); }).join("");

  const resumenSemana =
    '<div class="card">' +
    '<div style="font-weight:700;font-size:14px">Această săptămână (ultimele 7 zile)</div>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    REGISTRO_TIPOS.map(function (t) {
      return '<div class="card" style="padding:10px;text-align:center"><div class="muted small">' + escapeHtml(t.label) + '</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + (semana[t.id] || 0) + "</div></div>";
    }).join("") +
    "</div></div>";

  const idioma = state.idiomaInforme || "es";
  const totalAcciones = semana.llamadas + semana.mensajes + semana.presentaciones + semana.reuniones;
  const compartirPersonal = totalAcciones > 0
    ? (state.whatsapp && state.whatsapp.trim()
        ? '<a class="btn-primary" style="margin-top:10px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoPersonal(semana, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 16, color: "#fff" }) + " Distribuie raportul meu cu sponsorul meu</a>"
        : '<p class="muted small" style="margin-top:10px">Adaugă WhatsApp-ul tău în Setări ca să poți distribui raportul tău.</p>')
    : '<p class="muted small" style="margin-top:10px">Înregistrează cel puțin o acțiune în această săptămână ca să poți distribui raportul tău.</p>';
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
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Raportul partenerilor mei</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Starea rețelei tale în această quincenă — pentru a-i îndruma, și pentru a distribui cu propriul tău sponsor.</p>' +
    '<div class="grid-2" style="margin-top:10px;gap:10px">' +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Persoane în rețeaua mea</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.total + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">Verificați</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.verificados + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">În așteptarea verificării</div><div style="font-size:18px;font-weight:700;color:' + (equipo.pendientes > 0 ? "var(--warn)" : "var(--gold-light)") + '">' + equipo.pendientes + "</div></div>" +
    '<div class="card" style="padding:10px;text-align:center"><div class="muted small">PV verificat</div><div style="font-size:18px;font-weight:700;color:var(--gold-light)">' + equipo.pvVerificado.toLocaleString("es") + "</div></div>" +
    "</div>" +
    (state.whatsapp && state.whatsapp.trim()
      ? '<a class="btn-secondary" style="margin-top:12px" href="' + pedidoWhatsappHref(state.whatsapp, informeSemanalTextoEquipo(equipo, idioma)) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + " Distribuie raportul echipei mele</a>"
      : "") +
    "</div>";

  return (
    sectionHeaderHTML("Raportul Săptămânal", "Înregistrează-ți acțiunile zi de zi și distribuie-ți progresul cu propriul tău sponsor — așa te ajută să crești.", "trending-up") +
    '<div><div style="font-weight:700;font-size:14px;margin-bottom:8px">Astăzi</div>' +
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
    sectionHeaderHTML("Arborele Meu Genealogic", "ID-ul tău, sponsorul tău și linia ta ascendentă, mereu la îndemână.", "crown") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("user-badge", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Eu</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Așa liderii și afiliații din echipa ta îți pot consulta ID-ul și parola fără să te întrebe de fiecare dată.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>ID Atomy</label><input type="text" data-field="arbolGenealogico.yo.atomyId" value="' + escapeHtml(yo.atomyId) + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field"><label>Parolă</label><input type="text" data-field="arbolGenealogico.yo.contrasena" value="' + escapeHtml(yo.contrasena) + '" placeholder="Parola ta Atomy"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row between"><div class="row gap-2">' + Icon("crown", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Sponsor</span></div>' + waPatrocinador + "</div>" +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Datele lui de contact și de Zoom — pentru a-i cere ajutor sau pentru a te înscrie la formările companiei, care de obicei cer ID-ul sponsorului tău.</p>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    '<div class="field"><label>Nume</label><input type="text" data-field="arbolGenealogico.patrocinador.nombre" value="' + escapeHtml(p.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID Atomy</label><input type="text" data-field="arbolGenealogico.patrocinador.atomyId" value="' + escapeHtml(p.atomyId) + '" placeholder="Ex. 93248238"></div>' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-field="arbolGenealogico.patrocinador.rango" value="' + escapeHtml(p.rango) + '" placeholder="Ex. Diamond Master"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-field="arbolGenealogico.patrocinador.pais" value="' + escapeHtml(p.pais) + '" placeholder="Ex. Columbia"></div>' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-field="arbolGenealogico.patrocinador.telefono" value="' + escapeHtml(p.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>ID de Zoom</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomId" value="' + escapeHtml(p.zoomId) + '" placeholder="Opțional"></div>' +
    '<div class="field" style="flex:1"><label>Parolă Zoom</label><input type="text" data-field="arbolGenealogico.patrocinador.zoomContrasena" value="' + escapeHtml(p.zoomContrasena) + '" placeholder="Opțional"></div>' +
    "</div>" +
    '<div class="field"><label>Orar în care nu trebuie apelat</label><input type="text" data-field="arbolGenealogico.patrocinador.horarioNoLlamar" value="' + escapeHtml(p.horarioNoLlamar) + '" placeholder="Ex. După ora 20:00, nici duminica"></div>' +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("users", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Linia ascendentă</span></div>' +
    '<p class="muted small" style="margin-top:4px;line-height:1.5">Persoanele de peste sponsorul tău direct — utile dacă ai nevoie de sprijinul lor, sau de ID-ul lor pentru vreo formare.</p>' +
    '<button class="btn-primary" style="margin-top:10px" data-action="add-ascendente">' + Icon("crown", { size: 16, color: "#fff" }) + " Adaugă un alt nivel mai sus pe linie</button>" +
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
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează persoana" : "Persoană nouă în linia ascendentă") + "</span>" +
    '<button class="icon-btn" data-action="cancel-ascendente">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Rang</label><input type="text" data-draft-field="rango" value="' + escapeHtml(d.rango) + '" placeholder="Ex. Diamond Master"></div>' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Ex. Columbia"></div>' +
    "</div>" +
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field"><label>Orar în care nu trebuie deranjat</label><input type="text" data-draft-field="horarioNoMolestar" value="' + escapeHtml(d.horarioNoMolestar) + '" placeholder="Ex. După ora 21:00"></div>' +
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai contacte S.O.S. salvate.</p>';
  return (
    sectionHeaderHTML("Apeluri S.O.S.", "Persoane pe care le poți apela în căutare de sprijin, chiar dacă nu sunt din linia ta.", "bell") +
    '<div class="card"><p class="small" style="line-height:1.6">Uneori ajutorul de care ai nevoie nu vine din genealogia ta directă — poate fi un mentor din altă echipă, un formator al companiei, sau o persoană de încredere expertă într-un domeniu. Salvează aici pe cine să apelezi în astfel de momente.</p></div>' +
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
    '<div class="field"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field"><label>Notă</label><textarea rows="2" data-draft-field="nota" placeholder="De ce să apelezi la această persoană?">' + escapeHtml(d.nota || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-sos">Salvează</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-sos">Anulează</button>' +
    "</div></div>"
  );
}

/* ---------------- Lista de Contactos ---------------- */

function contactoEventoNivelBadge(nivel) {
  const cls = nivel === "Cald" ? "warn" : nivel === "Călduț" ? "gold" : "soft";
  return '<span class="badge ' + cls + '">' + escapeHtml(nivel) + "</span>";
}

function contactoEventoRowHTML(c, hoy) {
  const vencido = c.proximoSeguimiento && c.proximoSeguimiento < hoy;
  const esHoy = c.proximoSeguimiento === hoy;
  const fechaTxt = c.proximoSeguimiento ? (vencido ? "Restant · " : esHoy ? "Astăzi · " : "") + c.proximoSeguimiento : "Fără urmărire";
  const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold)" : "var(--text-soft)";
  const waLink = c.telefono
    ? '<a class="icon-btn" href="' + waHrefPersonal(c.telefono, c.nombre) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
    : "";
  return (
    '<div class="card contact-row" data-search="' + escapeHtml(((c.nombre || "") + " " + (c.telefono || "")).toLowerCase()) + '" style="padding:13px">' +
    '<div class="row between" style="align-items:flex-start">' +
    '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(c.nombre || "Fără nume") + "</div>" +
    '<div class="muted small" style="margin-top:2px">' + escapeHtml(c.telefono || "Fără telefon") + (c.pais ? " · " + escapeHtml(c.pais) : "") + "</div></div>" +
    contactoEventoNivelBadge(c.nivel) +
    "</div>" +
    '<div class="row between" style="margin-top:10px;align-items:center">' +
    '<span class="small" style="font-weight:600' + ((c.estado === "Partener" || c.estado === "Consumator") ? ";color:var(--gold-light)" : "") + '">' + escapeHtml(c.estado) + "</span>" +
    '<span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
    "</div>" +
    (c.observaciones ? '<div class="muted small" style="margin-top:4px;font-style:italic">„' + escapeHtml(c.observaciones) + '”</div>' : "") +
    (c.notaSeguimiento ? '<div class="muted small" style="margin-top:4px;font-style:italic">„' + escapeHtml(c.notaSeguimiento) + '”</div>' : "") +
    (c.proximoSeguimiento
      ? '<div class="row gap-2" style="margin-top:6px;align-items:center;cursor:pointer" data-action="marcar-seguimiento-contacto-hecho" data-arg="' + c.id + '">' +
        Icon("check-circle", { size: 13, color: "var(--success)" }) +
        '<span class="small" style="color:var(--success);font-weight:600">Marchează urmărirea ca făcută</span></div>'
      : "") +
    '<div class="row gap-2" style="margin-top:10px;flex-wrap:wrap">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="3">+3 zile</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="7">+1 săpt</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="30">+1 lună</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px;min-width:70px" data-action="quick-seguimiento-contacto" data-arg="' + c.id + '" data-days="60">+2 luni</button>' +
    waLink +
    '<button class="icon-btn" data-action="edit-contacto-evento" data-arg="' + c.id + '">' + Icon("edit", { size: 15 }) + "</button>" +
    "</div>" +
    '<div class="row gap-2" style="margin-top:6px">' +
    '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto-evento" data-arg="' + c.id + '" data-tipo="llamada">' + Icon("phone-call", { size: 13 }) + " Apel</button>" +
    '<button class="btn-secondary" style="flex:1;padding:8px;font-size:12.5px" data-action="registrar-contacto-evento" data-arg="' + c.id + '" data-tipo="mensaje">' + Icon("message-circle", { size: 13 }) + " Mesaj</button>" +
    "</div>" +
    "</div>"
  );
}

function renderContactosEventos(state, ui) {
  const lista = state.contactosEventos || [];
  const filtro = ui.contactoEventoFiltro || "todos";
  const hoy = hoyISO();

  const counts = { Cald: 0, Călduț: 0, "Rece": 0 };
  lista.forEach(function (c) { if (counts[c.nivel] != null) counts[c.nivel]++; });

  const filterBtns = ["todos"].concat(CONTACTO_NIVELES).map(function (f) {
    const active = filtro === f;
    const label = f === "todos" ? "Toate · " + lista.length : f + " · " + counts[f];
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
    : '<p class="muted small" style="text-align:center;padding:24px 0">Încă nu ai contacte înregistrate. Apasă „Adaugă contact” pentru a-ți începe controlul contactelor.</p>';

  return (
    sectionHeaderHTML("Lista de Contacte", lista.length + " înregistrate — continuă să contactezi, clasifică-le nivelul de interes și nu pierde șirul urmăririi.", "users") +
    '<p class="muted small" style="margin-top:-4px">Apasă „Apel” sau „Mesaj” la fiecare contact ca acțiunea să apară în Raportul tău Săptămânal.</p>' +
    '<input id="contacto-evento-search" type="text" placeholder="Caută după nume sau telefon..." style="background:var(--card);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 14px;font-size:14px;outline:none;width:100%">' +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<button class="btn-primary" data-action="add-contacto-evento">' + Icon("phone-call", { size: 16, color: "#fff" }) + " Adaugă contact</button>" +
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
      (ui.confirmDeleteContactoEvento === d.id ? "Sigur? Apasă din nou pentru a șterge" : "Șterge contactul") +
      "</button>"
    : "";
  return (
    '<div class="modal-overlay">' +
    '<div class="modal-backdrop" data-action="cancel-contacto-evento"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editează contactul" : "Contact nou") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contacto-evento">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nume</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nume complet"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Telefon</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="+57 300 000 0000"></div>' +
    '<div class="field" style="flex:1"><label>Țară</label><input type="text" data-draft-field="pais" value="' + escapeHtml(d.pais) + '" placeholder="Ex. Columbia"></div>' +
    "</div>" +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Nivel</label><select data-draft-field="nivel" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + nivelOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Stadiu</label><select data-draft-field="estado" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid var(--border-soft);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;outline:none">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Observații</label><textarea rows="2" data-draft-field="observaciones" placeholder="Unde l-ai cunoscut, interese...">' + escapeHtml(d.observaciones || "") + "</textarea></div>" +
    '<div class="field"><label>Următoarea urmărire</label><input type="date" data-draft-field="proximoSeguimiento" value="' + (d.proximoSeguimiento || "") + '"></div>' +
    '<div class="row gap-2">' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="3">+3 zile</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="7">+1 săptămână</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="30">+1 lună</button>' +
    '<button class="btn-secondary" style="flex:1;padding:8px" data-action="quick-draft-seguimiento-evento" data-arg="60">+2 luni</button>' +
    "</div>" +
    '<div class="field"><label>Notă de urmărire</label><input type="text" data-draft-field="notaSeguimiento" value="' + escapeHtml(d.notaSeguimiento || "") + '" placeholder="Ex. Sun pentru a-i întreba despre decizia lui"></div>' +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contacto-evento">Salvează contactul</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contacto-evento">Anulează</button>' +
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
    ? '<div><div style="font-size:14px;font-weight:600;margin-bottom:8px">Activitate recentă</div><div class="card" style="padding:0;overflow:hidden">' +
      state.actividad.map(function (a, i) {
        return '<div class="row gap-3" style="padding:12px 16px;' + (i > 0 ? "border-top:1px solid var(--border)" : "") + '">' +
          '<div style="width:28px;height:28px;border-radius:999px;background:var(--success-soft);color:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + Icon("check", { size: 14 }) + "</div>" +
          '<span style="font-size:13.5px">' + escapeHtml(a.texto) + "</span></div>";
      }).join("") + "</div></div>"
    : "";

  return (
    '<div class="card" style="text-align:center;border:2px solid var(--gold)">' +
    medallionHTML(rango.icon, 84) +
    '<div class="muted small" style="margin-top:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;color:var(--gold)">Rangul tău actual</div>' +
    '<div style="font-size:20px;font-weight:700;margin-top:4px">' + escapeHtml(rango.nombre) + "</div>" +
    "</div>" +
    '<div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:2px">Drumul de Măiestrie</div>' +
    '<div class="muted small" style="margin-bottom:12px">Apasă pe rangul următor când îl atingi.</div>' +
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
      '<div class="row gap-2">' + Icon("sparkles", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Detalii, obiectiv și cardul de recunoaștere</span></div>' +
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
    if (dias > 0) metaTexto = "Mai sunt " + dias + (dias === 1 ? " zi" : " zile") + " pentru obiectivul tău de a atinge " + detalle.nombre + ".";
    else if (dias === 0) metaTexto = "Obiectivul tău de a atinge " + detalle.nombre + " este astăzi!";
    else metaTexto = "Obiectivul tău de a atinge " + detalle.nombre + " a expirat cu " + Math.abs(dias) + (Math.abs(dias) === 1 ? " zi" : " zile") + " în urmă — actualizează-l dacă vrei să-l folosești în continuare ca reamintire.";
  }

  const fotoInner = state.foto ? '<img src="' + escapeHtml(state.foto) + '" alt="Fotografia ta"/>' : Icon("camera", { size: 26 });

  return (
    '<div class="card">' +
    '<button class="row between" style="width:100%;text-align:left" data-action="toggle-detalle-rango">' +
    '<div class="row gap-2">' + Icon("sparkles", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Detalii, obiectiv și cardul de recunoaștere</span></div>' +
    clicaAquiBadgeHTML(true, "gold") +
    "</button>" +

    '<div class="muted small" style="margin-top:10px">Alege rangul pe care vrei să-l vezi:</div>' +
    '<div class="row gap-2" style="flex-wrap:wrap;margin-top:6px">' + chipsDetalle + "</div>" +

    '<div style="text-align:center;margin-top:16px">' + medallionHTML(detalle.icon, 60) +
    '<div style="font-size:16px;font-weight:700;margin-top:8px">' + escapeHtml(detalle.nombre) + "</div>" +
    '<div class="muted small">Rangul ' + (detalleIndex + 1) + " din " + RANGOS_MASTER.length + "</div></div>" +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Pentru a atinge acest rang</div>' +
    '<p class="small" style="line-height:1.5;margin-top:4px">' + escapeHtml(detalle.prerrequisito) + "</p>" +
    '<p class="muted small" style="line-height:1.5;margin-top:4px">' + escapeHtml(detalle.criterio) + "</p>" +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:14px">Ce câștigi când îl atingi</div>' +
    '<div class="muted small" style="margin-top:2px">În ' + escapeHtml(paisInfo.label) + " · " + escapeHtml(NOTA_MONEDA_APROX) + "</div>" +
    montosHtml +
    paisSelectorHTML(state) +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:16px">Obiectivul tău pentru acest rang</div>' +
    '<div class="field" style="margin-top:6px"><label>Data la care vrei să-l atingi</label>' +
    '<input type="date" value="' + escapeHtml(meta.fecha || "") + '" data-field="metasRango.' + detalleIndex + '.fecha"></div>' +
    (metaTexto ? '<p class="small" style="margin-top:8px;font-weight:600;color:' + (dias != null && dias < 0 ? "var(--warn)" : "var(--gold-light)") + '">' + escapeHtml(metaTexto) + "</p>" : "") +
    (meta.fecha ? '<button class="link-btn small" style="margin-top:6px" data-action="limpiar-meta-rango" data-arg="' + detalleIndex + '">Elimină acest obiectiv</button>' : "") +

    '<div style="font-weight:700;font-size:12.5px;color:var(--gold-light);margin-top:18px">Cardul de recunoaștere</div>' +
    '<div class="muted small" style="margin-top:2px">Încarcă-ți fotografia și descarcă-ți cardul de ' + escapeHtml(detalle.nombre) + " ca să-l distribui.</div>" +
    '<div style="display:flex;flex-direction:column;align-items:center;margin-top:12px">' +
    '<button class="photo-picker" data-action="trigger-file" data-arg="rango-foto-input">' + fotoInner + "</button>" +
    '<input id="rango-foto-input" type="file" accept="image/*" class="hidden" data-target="foto">' +
    '<span class="link-btn small" style="margin-top:6px">' + (state.foto ? "Schimbă fotografia" : "Adaugă fotografie") + "</span>" +
    "</div>" +
    '<div style="max-width:280px;margin:14px auto 0">' + rangoCardHTML(state.nombre, state.foto, detalleIndex) + "</div>" +
    '<div class="row gap-2" style="margin-top:14px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-tarjeta-rango" data-arg="' + detalleIndex + '">' + Icon("share2", { size: 15 }) + " Distribuie cardul</button>" +
    '<button class="btn-primary" style="flex:1;color:#fff" data-action="compartir-historia-rango" data-arg="' + detalleIndex + '">' + Icon("sparkles", { size: 15, color: "#fff" }) + " Distribuie ca story</button>" +
    "</div>" +
    '<p class="muted small" style="margin-top:8px;line-height:1.5">„Distribuie ca story” generează o imagine verticală festivă, pregătită pentru Instagram/Facebook/WhatsApp Stories — odată ajunsă acolo, aplicațiile respective te lasă să adaugi muzică, stickere sau text înainte de publicare.</p>' +
    "</div>"
  );
}

/* ---------------- Ajustes ---------------- */

function renderAjustes(state, ui) {
  const resetLabel = ui.confirmReset ? "Sigur? Apasă din nou pentru a reseta" : "Resetează-mi progresul";
  const licenciaCard = LICENCIA_TITULAR
    ? '<div class="card">' +
      '<div class="row gap-2">' + Icon("award", { size: 15, color: "var(--gold)" }) + '<span style="font-weight:700;font-size:14px">Licența acestei copii</span></div>' +
      '<p class="muted small" style="margin-top:6px;line-height:1.5">Această copie a Cumbre Master este licențiată exclusiv pentru <strong>' + escapeHtml(LICENCIA_TITULAR) + '</strong> și echipa sa proprie. Nu este autorizată să fie distribuită altor lideri sau echipe.</p>' +
      "</div>"
    : "";
  const notifSupported = "Notification" in window;
  const notifRow = notifSupported
    ? '<div class="card row between"><div><div style="font-size:14px;font-weight:600">Notificările browserului</div><div class="muted small" style="margin-top:2px">Avertismente din Agenda ta Săptămânală și din ritmul PV</div></div><div class="toggle' + (state.notifOn && Notification.permission === "granted" ? " on" : "") + '" data-action="toggle-notif"><div class="knob"></div></div></div>'
    : "";

  return (
    sectionHeaderHTML("Setări", "", "settings") +
    licenciaCard +
    '<div class="card"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">WhatsApp-ul sponsorului tău</label>' +
    '<p class="muted small" style="margin-top:-2px;margin-bottom:8px;line-height:1.5">Butonul verde flotant îi scrie direct la acest număr.</p>' +
    '<input type="text" inputmode="numeric" placeholder="Ex. 573000000000" value="' + escapeHtml(state.whatsapp) + '" data-field="whatsapp" style="width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none"></div>' +
    notifRow +
    '<div class="card">' +
    '<div class="row gap-2">' + Icon("download", { size: 15, color: "var(--gold-light)" }) + '<span style="font-weight:700;font-size:14px">Copie de siguranță</span></div>' +
    '<p class="muted small" style="margin-top:6px;line-height:1.5">Toate datele tale (Întâlnirea de Focalizare, Arborele Genealogic, progresul tău) există doar pe acest dispozitiv. Descarcă o copie de rezervă și salveaz-o unde vrei (Google Drive-ul tău, e-mail, etc.) — astfel nu o pierzi dacă schimbi telefonul sau ștergi datele browserului.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" style="flex:1" data-action="descargar-respaldo">' + Icon("download", { size: 15 }) + " Descarcă copia de siguranță</button>" +
    '<button class="btn-secondary" style="flex:1" data-action="trigger-file" data-arg="importar-respaldo-input">' + Icon("repeat", { size: 15 }) + " Restaurează dintr-un fișier</button>" +
    "</div>" +
    '<input id="importar-respaldo-input" type="file" accept="application/json,.json" class="hidden" data-target="__importBackup">' +
    "</div>" +
    '<button class="btn-secondary" style="border-color:var(--warn);color:var(--warn)" data-action="reset-progress">' + Icon("rotate-ccw", { size: 16 }) + " " + resetLabel + "</button>"
  );
}
