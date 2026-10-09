/* ---------------------------------------------------------------
   VISTAS — Día de Impacto: cada función devuelve un string HTML
--------------------------------------------------------------- */

function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

function fechaLabel(fechaISO) {
  const d = new Date(fechaISO + "T00:00:00");
  const txt = d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function fechaCorta(fechaISO) {
  const d = new Date(fechaISO + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

function waHrefPersonal(numero, texto) {
  return "https://wa.me/" + (numero || "").replace(/[^0-9]/g, "") + (texto ? "?text=" + encodeURIComponent(texto) : "");
}

function sectionHeaderHTML(titulo, desc, icon) {
  return (
    '<div class="section-header">' +
    '<div class="icon-circle" style="width:44px;height:44px">' + Icon(icon, { size: 20, color: "#fff" }) + "</div>" +
    '<div><h2>' + escapeHtml(titulo) + "</h2>" +
    (desc ? '<p>' + escapeHtml(desc) + "</p>" : "") +
    "</div></div>"
  );
}

function categoriaBadgeHTML(catId) {
  const c = categoriaInfo(catId);
  return (
    '<span class="cat-chip"><span class="cat-dot" style="background:var(--cat-' + c.color + ')"></span>' +
    Icon(c.icon, { size: 12, color: "var(--cat-" + c.color + ")" }) + escapeHtml(c.label) + "</span>"
  );
}

function dateNavHTML(fechaActual) {
  const hoy = hoyISO();
  const esHoy = fechaActual === hoy;
  return (
    '<div class="row between card" style="padding:10px 12px">' +
    '<button class="icon-btn" data-action="nav-fecha" data-arg="-1">' + Icon("chevron-left", { size: 18 }) + "</button>" +
    '<div style="text-align:center">' +
    '<div style="font-weight:700;font-size:14px">' + fechaLabel(fechaActual) + "</div>" +
    (esHoy ? '<div class="muted small">Hoy</div>' : '<button class="link-btn small" data-action="nav-fecha" data-arg="0">Ir a hoy</button>') +
    "</div>" +
    '<button class="icon-btn" data-action="nav-fecha" data-arg="1">' + Icon("chevron-right", { size: 18 }) + "</button>" +
    "</div>"
  );
}

/* ---------------- Bienvenida / Onboarding ---------------- */

function renderWelcome() {
  return (
    '<div class="center-screen cover-screen">' +
    '<div class="icon-circle" style="width:84px;height:84px">' + Icon("sun", { size: 38, color: "#fff" }) + "</div>" +
    '<h1 style="margin-top:22px;font-size:28px;font-weight:700;letter-spacing:-.02em">Día de Impacto</h1>' +
    '<p style="color:var(--accent-deep);margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.14em">Tu jornada, bien planificada</p>' +
    '<p class="muted" style="margin-top:22px;max-width:300px;font-size:15px;line-height:1.6">' + escapeHtml(MENSAJE_BIENVENIDA) + "</p>" +
    '<button class="btn-primary" style="margin-top:38px;max-width:280px" data-action="start-app">Comenzar ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    "</div>"
  );
}

function renderOnboarding(ui) {
  return (
    '<div class="center-screen" style="justify-content:center">' +
    '<div class="icon-circle" style="width:64px;height:64px">' + Icon("user", { size: 28, color: "#fff" }) + "</div>" +
    '<h2 style="margin-top:20px;font-size:20px;font-weight:700">¿Cómo te llamas?</h2>' +
    '<p class="muted small" style="margin-top:4px">Así personalizamos tu planificador diario.</p>' +
    '<input id="onboarding-name-input" type="text" placeholder="Tu nombre" autofocus ' +
    'style="margin-top:22px;width:100%;max-width:320px;background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:13px 15px;font-size:15px;outline:none">' +
    '<button id="onboarding-submit" class="btn-primary" style="margin-top:22px;max-width:320px;opacity:.55" disabled data-action="finish-onboarding">Empezar mi día ' + Icon("chevron-right", { size: 18, color: "#fff" }) + "</button>" +
    "</div>"
  );
}

/* ---------------- Header / Menú ---------------- */

function renderHeader(state, ui) {
  const isAuth = state.onboarded;
  return (
    '<div class="app-header">' +
    (isAuth
      ? '<button class="icon-btn menu-toggle" data-action="toggle-menu">' + Icon("menu", { size: 22 }) + "</button>"
      : "<div></div>") +
    '<div class="brand">' + Icon("sun", { size: 16, color: "var(--accent-deep)" }) + " Día de Impacto</div>" +
    '<div class="actions">' +
    '<button class="icon-btn" data-action="toggle-dark">' + Icon(state.dark ? "sun" : "moon", { size: 19 }) + "</button>" +
    "</div></div>"
  );
}

function renderSidebar(ui) {
  const items = MENU_ITEMS.map(function (it) {
    return (
      '<button class="sidebar-item' + (ui.view === it.id ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      Icon(it.icon, { size: 18 }) + "<span>" + escapeHtml(it.label) + "</span></button>"
    );
  }).join("");
  return (
    '<nav class="sidebar">' +
    '<div class="sidebar-logo">' + Icon("sun", { size: 24, color: "var(--accent-deep)" }) + "</div>" +
    items +
    '<button class="sidebar-item" data-action="salir" style="margin-top:auto">' + Icon("log-out", { size: 18 }) + "<span>Salir</span></button>" +
    "</nav>"
  );
}

function renderMenuSheet(ui) {
  if (!ui.menuOpen) return "";
  const items = MENU_ITEMS.map(function (it) {
    return (
      '<button class="menu-item' + (ui.view === it.id ? " active" : "") + '" data-action="goto" data-arg="' + it.id + '">' +
      Icon(it.icon, { size: 18 }) + "<span>" + escapeHtml(it.label) + "</span></button>"
    );
  }).join("");
  return (
    '<div class="menu-overlay">' +
    '<div class="menu-backdrop" data-action="close-menu"></div>' +
    '<div class="menu-sheet">' +
    '<div class="menu-handle"></div>' +
    '<div class="menu-head"><span style="font-weight:700;font-size:15px">Menú</span>' +
    '<button class="icon-btn" data-action="close-menu">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="menu-list">' + items +
    '<button class="menu-item" data-action="salir">' + Icon("log-out", { size: 18 }) + "<span>Salir</span></button>" +
    "</div></div></div>"
  );
}

/* ---------------- Inicio ---------------- */

function renderHome(state, ui) {
  const hoy = hoyISO();
  const plan = state.planesPorDia[hoy];
  const prioridades = plan ? plan.prioridades : [];
  const bloques = plan ? plan.bloques : [];
  const doneBloques = bloques.filter(function (b) { return b.hecho; }).length;
  const pct = bloques.length ? Math.round((doneBloques / bloques.length) * 100) : 0;
  const cierre = state.cierrePorDia[hoy];

  const prioridadesHtml = prioridades.length
    ? prioridades.map(function (p, i) {
        if (!p.texto.trim()) return "";
        return (
          '<div class="check-row">' +
          '<button class="check-dot' + (p.hecha ? " on" : "") + '" data-action="toggle-prioridad" data-arg="' + i + '">' + (p.hecha ? Icon("check", { size: 13, color: "#fff" }) : (i + 1)) + "</button>" +
          '<span class="check-label' + (p.hecha ? " on" : "") + '" style="padding-top:3px">' + escapeHtml(p.texto) + "</span>" +
          "</div>"
        );
      }).join("")
    : "";
  const sinPrioridades = !prioridades.some(function (p) { return p.texto.trim(); });

  return (
    '<div class="card" style="background:linear-gradient(135deg, var(--accent-soft), transparent)">' +
    '<div class="eyebrow">' + saludoHora() + (state.nombre ? ", " + escapeHtml(state.nombre) : "") + "</div>" +
    '<div style="font-size:17px;font-weight:700;margin-top:2px">' + fechaLabel(hoy) + "</div>" +
    (state.racha > 0 ? '<div class="row gap-1" style="margin-top:8px">' + Icon("flame", { size: 14, color: "var(--accent-deep)" }) + '<span class="small" style="font-weight:700;color:var(--accent-deep)">' + state.racha + (state.racha === 1 ? " día seguido planificando" : " días seguidos planificando") + "</span></div>" : "") +
    "</div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("zap", { size: 15, color: "var(--gold-deep)" }) + '<span style="font-weight:700;font-size:13px;color:var(--gold-deep)">Frase del día</span></div>' +
    '<p style="margin-top:8px;font-size:14.5px;line-height:1.5;font-style:italic">“' + escapeHtml(fraseDelDia(hoy)) + '”</p>' +
    "</div>" +

    '<div class="card">' +
    '<div class="row between"><span style="font-weight:700;font-size:14px">Tus 3 prioridades de hoy</span></div>' +
    (sinPrioridades
      ? '<p class="muted small" style="margin-top:8px">Aún no las defines. Ve a “Mi Día” para elegirlas.</p>'
      : '<div class="view-stack gap-sm" style="margin-top:10px">' + prioridadesHtml + "</div>") +
    '<button class="btn-secondary" style="margin-top:12px" data-action="goto" data-arg="dia">Ir a Mi Día ' + Icon("chevron-right", { size: 15 }) + "</button>" +
    "</div>" +

    (bloques.length
      ? '<div class="card">' +
        '<div class="row between"><span style="font-weight:700;font-size:14px">Bloques del día</span><span class="muted small">' + doneBloques + " / " + bloques.length + "</span></div>" +
        '<div class="progress-bar" style="margin-top:10px"><div style="width:' + pct + '%"></div></div>' +
        "</div>"
      : "") +

    '<div class="grid-2">' +
    '<button class="card card-hover nav-card" data-action="goto" data-arg="prospeccion"><div class="icon-circle" style="width:38px;height:38px">' + Icon("phone-call", { size: 17, color: "#fff" }) + '</div><div class="nc-body"><div class="nc-title">Prospección</div></div></button>' +
    '<button class="card card-hover nav-card" data-action="goto" data-arg="redes"><div class="icon-circle gold" style="width:38px;height:38px">' + Icon("image", { size: 17, color: "#2A1B05" }) + '</div><div class="nc-body"><div class="nc-title">Redes Sociales</div></div></button>' +
    '<button class="card card-hover nav-card" data-action="goto" data-arg="equipo"><div class="icon-circle" style="width:38px;height:38px">' + Icon("users", { size: 17, color: "#fff" }) + '</div><div class="nc-body"><div class="nc-title">Equipo</div></div></button>' +
    '<button class="card card-hover nav-card" data-action="goto" data-arg="cierre"><div class="icon-circle gold" style="width:38px;height:38px">' + Icon("moon", { size: 17, color: "#2A1B05" }) + '</div><div class="nc-body"><div class="nc-title">' + (cierre && cierre.hecho ? "Cierre ✓" : "Cierre del día") + "</div></div></button>" +
    "</div>"
  );
}

/* ---------------- Mi Día ---------------- */

function renderMiDia(state, ui) {
  const fecha = ui.fechaActual;
  const plan = getPlanDia(state, fecha);
  const bloques = plan.bloques.slice().sort(function (a, b) { return (a.hora || "99:99").localeCompare(b.hora || "99:99"); });
  const done = bloques.filter(function (b) { return b.hecho; }).length;
  const pct = bloques.length ? Math.round((done / bloques.length) * 100) : 0;

  const prioridadesHtml = plan.prioridades.map(function (p, i) {
    return (
      '<div class="row gap-2">' +
      '<button class="check-dot' + (p.hecha ? " on" : "") + '" data-action="toggle-prioridad" data-arg="' + i + '">' + (p.hecha ? Icon("check", { size: 13, color: "#fff" }) : (i + 1)) + "</button>" +
      '<input type="text" placeholder="Prioridad ' + (i + 1) + '" value="' + escapeHtml(p.texto) + '" data-field="planesPorDia.' + fecha + ".prioridades." + i + '.texto" ' +
      'style="flex:1;background:var(--bg-2);border:1px solid var(--border-soft);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none' + (p.hecha ? ";text-decoration:line-through;color:var(--text-soft)" : "") + '">' +
      "</div>"
    );
  }).join("");

  const bloquesHtml = bloques.length
    ? bloques.map(function (b) {
        const c = categoriaInfo(b.categoria);
        return (
          '<div class="bloque-row">' +
          '<div class="bloque-hora">' + (b.hora || "—") + "</div>" +
          '<button class="check-dot' + (b.hecho ? " on" : "") + '" data-action="toggle-bloque" data-arg="' + b.id + '" style="margin-top:0">' + (b.hecho ? Icon("check", { size: 12, color: "#fff" }) : "") + "</button>" +
          '<button style="flex:1;text-align:left;min-width:0" data-action="edit-bloque" data-arg="' + b.id + '">' +
          '<div class="' + (b.hecho ? "muted" : "") + '" style="font-size:13.5px;font-weight:600;' + (b.hecho ? "text-decoration:line-through" : "") + '">' + escapeHtml(b.titulo || "(sin título)") + "</div>" +
          '<div style="margin-top:3px">' + categoriaBadgeHTML(b.categoria) + "</div>" +
          "</button>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:20px 0">Aún no tienes bloques planificados para este día.</p>';

  return (
    dateNavHTML(fecha) +
    sectionHeaderHTML("Mi Día", "Organiza tu jornada en bloques por tipo de actividad.", "compass") +

    '<div class="card">' +
    '<span style="font-weight:700;font-size:14px">Tus 3 prioridades</span>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + prioridadesHtml + "</div>" +
    "</div>" +

    (!plan.bloques.length
      ? '<button class="btn-secondary" data-action="usar-plantilla">' + Icon("zap", { size: 15 }) + " Usar plantilla sugerida de jornada</button>"
      : '<div class="card"><div class="row between"><span style="font-weight:700;font-size:13px">Progreso del día</span><span class="muted small">' + done + " / " + bloques.length + "</span></div>" +
        '<div class="progress-bar" style="margin-top:8px"><div style="width:' + pct + '%"></div></div></div>') +

    '<div class="card">' +
    '<div class="row between"><span style="font-weight:700;font-size:14px">Bloques del día</span>' +
    '<button class="icon-btn" data-action="add-bloque">' + Icon("plus", { size: 18, color: "var(--accent-deep)" }) + "</button></div>" +
    '<div style="margin-top:4px">' + bloquesHtml + "</div>" +
    "</div>"
  );
}

function renderBloqueModal(ui) {
  const d = ui.bloqueDraft;
  if (!d) return "";
  const editing = !!ui.bloqueEditId;
  const catOpts = CATEGORIAS.map(function (c) { return '<option value="' + c.id + '"' + (d.categoria === c.id ? " selected" : "") + ">" + escapeHtml(c.label) + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-bloque" data-arg="' + ui.bloqueEditId + '">' +
      (ui.confirmDeleteBloque === ui.bloqueEditId ? "¿Seguro? Toca de nuevo para eliminar" : "Eliminar bloque") + "</button>"
    : "";
  return (
    '<div class="modal-overlay"><div class="modal-backdrop" data-action="cancel-bloque"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editar bloque" : "Nuevo bloque") + "</span>" +
    '<button class="icon-btn" data-action="cancel-bloque">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Hora</label><input type="time" data-draft-field="hora" value="' + escapeHtml(d.hora) + '"></div>' +
    '<div class="field" style="flex:2"><label>Categoría</label><select data-draft-field="categoria">' + catOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Título</label><input type="text" data-draft-field="titulo" value="' + escapeHtml(d.titulo) + '" placeholder="¿Qué vas a hacer?"></div>' +
    '<div class="field"><label>Notas</label><textarea rows="2" data-draft-field="notas" placeholder="Detalles opcionales...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-bloque">Guardar bloque</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-bloque">Cancelar</button>' +
    "</div></div>"
  );
}

/* ---------------- Prospección ---------------- */

function renderProspeccion(state, ui) {
  const fecha = ui.fechaActual;
  const lista = getProspeccionDia(state, fecha);
  const done = lista.filter(function (p) { return p.hecho; }).length;
  const rows = lista.length
    ? lista.map(function (p) {
        const waLink = p.telefono
          ? '<a class="icon-btn" href="' + waHrefPersonal(p.telefono, "Hola " + p.nombre + "! ") + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
          : "";
        return (
          '<div class="card" style="padding:12px">' +
          '<div class="row between" style="align-items:flex-start">' +
          '<div class="row gap-2" style="min-width:0">' +
          '<button class="check-dot' + (p.hecho ? " on" : "") + '" data-action="toggle-prospecto" data-arg="' + p.id + '">' + (p.hecho ? Icon("check", { size: 12, color: "#fff" }) : "") + "</button>" +
          '<div style="min-width:0"><div style="font-weight:700;font-size:14px' + (p.hecho ? ";text-decoration:line-through;color:var(--text-soft)" : "") + '">' + escapeHtml(p.nombre || "Sin nombre") + "</div>" +
          '<div class="muted small">' + escapeHtml(p.medio) + (p.telefono ? " · " + escapeHtml(p.telefono) : "") + "</div></div>" +
          "</div>" +
          '<div class="row gap-1">' + waLink + '<button class="icon-btn" data-action="edit-prospecto" data-arg="' + p.id + '">' + Icon("edit", { size: 14 }) + "</button></div>" +
          "</div>" +
          (p.notas ? '<div class="muted small" style="margin-top:6px">' + escapeHtml(p.notas) + "</div>" : "") +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:20px 0">Aún no agregas personas para prospectar hoy.</p>';

  return (
    dateNavHTML(fecha) +
    sectionHeaderHTML("Prospección", "Personas a contactar hoy para crecer tu negocio.", "phone-call") +
    (lista.length ? '<div class="card" style="padding:12px"><div class="row between"><span class="small" style="font-weight:700">Avance de hoy</span><span class="muted small">' + done + " / " + lista.length + "</span></div><div class=\"progress-bar\" style=\"margin-top:8px\"><div style=\"width:" + (lista.length ? Math.round((done / lista.length) * 100) : 0) + '%"></div></div></div>' : "") +
    '<button class="btn-primary" data-action="add-prospecto">' + Icon("plus", { size: 16, color: "#fff" }) + " Agregar contacto</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderProspectoModal(ui) {
  const d = ui.prospectoDraft;
  if (!d) return "";
  const editing = !!ui.prospectoEditId;
  const medioOpts = MEDIOS_CONTACTO.map(function (m) { return '<option value="' + m + '"' + (d.medio === m ? " selected" : "") + ">" + m + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-prospecto" data-arg="' + ui.prospectoEditId + '">' +
      (ui.confirmDeleteProspecto === ui.prospectoEditId ? "¿Seguro? Toca de nuevo para eliminar" : "Eliminar") + "</button>"
    : "";
  return (
    '<div class="modal-overlay"><div class="modal-backdrop" data-action="cancel-prospecto"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editar contacto" : "Nuevo contacto") + "</span>" +
    '<button class="icon-btn" data-action="cancel-prospecto">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nombre</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nombre completo"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Teléfono</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="Opcional"></div>' +
    '<div class="field" style="flex:1"><label>Medio</label><select data-draft-field="medio">' + medioOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Notas</label><textarea rows="2" data-draft-field="notas" placeholder="Qué le vas a decir, contexto...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-prospecto">Guardar</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-prospecto">Cancelar</button>' +
    "</div></div>"
  );
}

/* ---------------- Equipo ---------------- */

function renderEquipo(state, ui) {
  const hoy = hoyISO();
  const miembros = state.equipoMiembros.slice().sort(function (a, b) {
    const av = a.proximoCheckIn || "9999-99-99", bv = b.proximoCheckIn || "9999-99-99";
    return av < bv ? -1 : av > bv ? 1 : (a.nombre || "").localeCompare(b.nombre || "");
  });
  const rows = miembros.length
    ? miembros.map(function (m) {
        const vencido = m.proximoCheckIn && m.proximoCheckIn < hoy;
        const esHoy = m.proximoCheckIn === hoy;
        const fechaTxt = m.proximoCheckIn ? (vencido ? "Vencido · " : esHoy ? "Hoy · " : "") + m.proximoCheckIn : "Sin check-in programado";
        const fechaColor = vencido ? "var(--warn)" : esHoy ? "var(--gold-deep)" : "var(--text-soft)";
        const mensaje = "Hola " + m.nombre + "! Quería saber cómo vas y en qué te puedo ayudar esta semana. ";
        const waLink = m.telefono
          ? '<a class="icon-btn" href="' + waHrefPersonal(m.telefono, mensaje) + '" target="_blank" rel="noreferrer">' + Icon("message-circle", { size: 15, color: "var(--success)" }) + "</a>"
          : "";
        return (
          '<div class="card" style="padding:12px">' +
          '<div class="row between" style="align-items:flex-start">' +
          '<div style="min-width:0"><div style="font-weight:700;font-size:14px">' + escapeHtml(m.nombre || "Sin nombre") + "</div>" +
          (m.rol ? '<div class="muted small">' + escapeHtml(m.rol) + "</div>" : "") + "</div>" +
          '<div class="row gap-1">' + waLink + '<button class="icon-btn" data-action="edit-miembro" data-arg="' + m.id + '">' + Icon("edit", { size: 14 }) + "</button></div>" +
          "</div>" +
          '<div class="row between" style="margin-top:8px"><span class="small" style="font-weight:600;color:' + fechaColor + '">' + fechaTxt + "</span>" +
          '<button class="link-btn small" data-action="registrar-checkin" data-arg="' + m.id + '">Marcar check-in ' + Icon("check", { size: 12 }) + "</button></div>" +
          (m.notas ? '<div class="muted small" style="margin-top:6px">' + escapeHtml(m.notas) + "</div>" : "") +
          "</div>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:20px 0">Aún no agregas a tu equipo.</p>';

  return (
    sectionHeaderHTML("Equipo", "Acompaña, forma y motiva a cada persona de tu equipo.", "users") +
    '<button class="btn-primary" data-action="add-miembro">' + Icon("plus", { size: 16, color: "#fff" }) + " Agregar miembro</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderMiembroModal(ui) {
  const d = ui.miembroDraft;
  if (!d) return "";
  const editing = !!ui.miembroEditId;
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-miembro" data-arg="' + ui.miembroEditId + '">' +
      (ui.confirmDeleteMiembro === ui.miembroEditId ? "¿Seguro? Toca de nuevo para eliminar" : "Eliminar") + "</button>"
    : "";
  return (
    '<div class="modal-overlay"><div class="modal-backdrop" data-action="cancel-miembro"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editar miembro" : "Nuevo miembro") + "</span>" +
    '<button class="icon-btn" data-action="cancel-miembro">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Nombre</label><input type="text" data-draft-field="nombre" value="' + escapeHtml(d.nombre) + '" placeholder="Nombre completo"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Teléfono</label><input type="text" inputmode="tel" data-draft-field="telefono" value="' + escapeHtml(d.telefono) + '" placeholder="Opcional"></div>' +
    '<div class="field" style="flex:1"><label>Rol</label><input type="text" data-draft-field="rol" value="' + escapeHtml(d.rol) + '" placeholder="Ej. Nuevo socio"></div>' +
    "</div>" +
    '<div class="field"><label>Próximo check-in</label><input type="date" data-draft-field="proximoCheckIn" value="' + (d.proximoCheckIn || "") + '"></div>' +
    '<div class="field"><label>Notas</label><textarea rows="2" data-draft-field="notas" placeholder="En qué le estás ayudando...">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-miembro">Guardar</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-miembro">Cancelar</button>' +
    "</div></div>"
  );
}

/* ---------------- Comunicación (llamadas y emails) ---------------- */

function comunicacionListaHTML(tipo, items) {
  const rows = items.length
    ? items.map(function (t) {
        return (
          '<div class="check-row">' +
          '<button class="check-dot' + (t.hecho ? " on" : "") + '" data-action="toggle-comunicacion" data-tipo="' + tipo + '" data-arg="' + t.id + '">' + (t.hecho ? Icon("check", { size: 12, color: "#fff" }) : "") + "</button>" +
          '<span class="check-label' + (t.hecho ? " on" : "") + '" style="padding-top:3px">' + escapeHtml(t.titulo) + "</span>" +
          '<button class="icon-btn" data-action="delete-comunicacion" data-tipo="' + tipo + '" data-arg="' + t.id + '">' + Icon("x", { size: 13, color: "var(--text-soft)" }) + "</button>" +
          "</div>"
        );
      }).join("")
    : '<p class="muted small">Nada pendiente — ¡al día!</p>';
  return rows;
}

function renderComunicacion(state, ui) {
  const fecha = ui.fechaActual;
  const com = getComunicacionDia(state, fecha);
  return (
    dateNavHTML(fecha) +
    sectionHeaderHTML("Comunicación", "Llamadas y correos del día, sin que se te escapen.", "mail") +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("phone-call", { size: 15, color: "var(--cat-coral)" }) + '<span style="font-weight:700;font-size:14px">Llamadas pendientes</span></div>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + comunicacionListaHTML("llamadas", com.llamadas) + "</div>" +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<input id="com-input-llamadas" type="text" placeholder="Agregar llamada..." style="flex:1;background:var(--bg-2);border:1px solid var(--border-soft);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none">' +
    '<button class="icon-btn" data-action="add-comunicacion" data-tipo="llamadas">' + Icon("plus", { size: 18, color: "var(--accent-deep)" }) + "</button>" +
    "</div></div>" +

    '<div class="card">' +
    '<div class="row gap-2">' + Icon("mail", { size: 15, color: "var(--cat-sky)" }) + '<span style="font-weight:700;font-size:14px">Emails por responder</span></div>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' + comunicacionListaHTML("emails", com.emails) + "</div>" +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<input id="com-input-emails" type="text" placeholder="Agregar email..." style="flex:1;background:var(--bg-2);border:1px solid var(--border-soft);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none">' +
    '<button class="icon-btn" data-action="add-comunicacion" data-tipo="emails">' + Icon("plus", { size: 18, color: "var(--accent-deep)" }) + "</button>" +
    "</div></div>"
  );
}

/* ---------------- Redes Sociales ---------------- */

function plataformaLabel(id) {
  const p = PLATAFORMAS_RRSS.find(function (x) { return x.id === id; });
  return p ? p.label : id;
}

function renderRedesSociales(state, ui) {
  const filtro = ui.contenidoFiltro || "todos";
  const lista = state.contenidoRRSS.slice().sort(function (a, b) { return (a.fecha || "").localeCompare(b.fecha || ""); });
  const filtered = filtro === "todos" ? lista : lista.filter(function (c) { return c.estado === filtro; });
  const filterBtns = ["todos"].concat(ESTADOS_CONTENIDO).map(function (f) {
    const label = f === "todos" ? "Todos" : f;
    return '<button class="badge ' + (filtro === f ? "accent" : "outline") + '" style="cursor:pointer" data-action="filter-contenido" data-arg="' + f + '">' + label + "</button>";
  }).join(" ");

  const rows = filtered.length
    ? filtered.map(function (c) {
        const cls = c.estado === "Publicado" ? "success" : c.estado === "Listo" ? "accent" : c.estado === "Borrador" ? "gold" : "outline";
        return (
          '<button class="card card-hover" style="padding:12px;text-align:left;width:100%" data-action="edit-contenido" data-arg="' + c.id + '">' +
          '<div class="row between"><span class="badge soft">' + escapeHtml(plataformaLabel(c.plataforma)) + "</span>" +
          '<span class="badge ' + cls + '">' + escapeHtml(c.estado) + "</span></div>" +
          '<div style="margin-top:8px;font-weight:600;font-size:14px">' + escapeHtml(c.idea || "(sin idea)") + "</div>" +
          '<div class="muted small" style="margin-top:4px">' + fechaCorta(c.fecha) + "</div>" +
          "</button>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:20px 0">No hay contenido en este filtro.</p>';

  return (
    sectionHeaderHTML("Redes Sociales", "Planifica y prepara tus publicaciones con tiempo.", "image") +
    '<div class="row gap-2" style="flex-wrap:wrap">' + filterBtns + "</div>" +
    '<button class="btn-primary" data-action="add-contenido">' + Icon("plus", { size: 16, color: "#fff" }) + " Nueva publicación</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderContenidoModal(ui) {
  const d = ui.contenidoDraft;
  if (!d) return "";
  const editing = !!ui.contenidoEditId;
  const platOpts = PLATAFORMAS_RRSS.map(function (p) { return '<option value="' + p.id + '"' + (d.plataforma === p.id ? " selected" : "") + ">" + p.label + "</option>"; }).join("");
  const estadoOpts = ESTADOS_CONTENIDO.map(function (e) { return '<option value="' + e + '"' + (d.estado === e ? " selected" : "") + ">" + e + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-contenido" data-arg="' + ui.contenidoEditId + '">' +
      (ui.confirmDeleteContenido === ui.contenidoEditId ? "¿Seguro? Toca de nuevo para eliminar" : "Eliminar") + "</button>"
    : "";
  return (
    '<div class="modal-overlay"><div class="modal-backdrop" data-action="cancel-contenido"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:400px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editar publicación" : "Nueva publicación") + "</span>" +
    '<button class="icon-btn" data-action="cancel-contenido">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Red</label><select data-draft-field="plataforma">' + platOpts + "</select></div>" +
    '<div class="field" style="flex:1"><label>Fecha</label><input type="date" data-draft-field="fecha" value="' + (d.fecha || "") + '"></div>' +
    "</div>" +
    '<div class="field"><label>Idea / tema</label><input type="text" data-draft-field="idea" value="' + escapeHtml(d.idea) + '" placeholder="¿De qué trata?"></div>' +
    '<div class="field"><label>Guion / caption</label><textarea rows="4" data-draft-field="guion" placeholder="Escribe el texto o guion aquí...">' + escapeHtml(d.guion || "") + "</textarea></div>" +
    '<div class="field"><label>Estado</label><select data-draft-field="estado">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-contenido">Guardar</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-contenido">Cancelar</button>' +
    "</div></div>"
  );
}

/* ---------------- Finanzas ---------------- */

function formatMoneda(n) {
  const num = Number(n) || 0;
  return num.toLocaleString("es", { maximumFractionDigits: 0 });
}

function renderFinanzas(state, ui) {
  const fecha = ui.fechaActual;
  if (!state.metaFinancieraPorDia[fecha]) state.metaFinancieraPorDia[fecha] = emptyMetaFinanciera();
  const meta = state.metaFinancieraPorDia[fecha];
  const cobros = state.cobros.slice().sort(function (a, b) { return a.estado === b.estado ? 0 : a.estado === "Pendiente" ? -1 : 1; });
  const totalPendiente = state.cobros.filter(function (c) { return c.estado !== "Cobrado"; }).reduce(function (s, c) { return s + (Number(c.monto) || 0); }, 0);
  const totalCobrado = state.cobros.filter(function (c) { return c.estado === "Cobrado"; }).reduce(function (s, c) { return s + (Number(c.monto) || 0); }, 0);

  const rows = cobros.length
    ? cobros.map(function (c) {
        const cls = c.estado === "Cobrado" ? "success" : c.estado === "Enviado" ? "gold" : "outline";
        return (
          '<button class="card card-hover" style="padding:12px;text-align:left;width:100%" data-action="edit-cobro" data-arg="' + c.id + '">' +
          '<div class="row between"><span style="font-weight:700;font-size:14px">' + escapeHtml(c.cliente || "Sin nombre") + "</span>" +
          '<span class="badge ' + cls + '">' + escapeHtml(c.estado) + "</span></div>" +
          '<div class="muted small" style="margin-top:4px">' + formatMoneda(c.monto) + "</div>" +
          "</button>"
        );
      }).join("")
    : '<p class="muted small" style="text-align:center;padding:16px 0">Sin cobros registrados.</p>';

  return (
    dateNavHTML(fecha) +
    sectionHeaderHTML("Finanzas", "Tu meta del día y los cobros en curso.", "dollar-sign") +

    '<div class="card">' +
    '<div class="field"><label>Meta de ingresos para hoy</label><input type="text" inputmode="numeric" data-field="metaFinancieraPorDia.' + fecha + '.metaDiaria" value="' + escapeHtml(meta.metaDiaria) + '" placeholder="0"></div>' +
    "</div>" +

    '<div class="grid-2">' +
    '<div class="card" style="text-align:center"><div class="muted small">Por cobrar</div><div style="font-size:17px;font-weight:700;color:var(--warn)">' + formatMoneda(totalPendiente) + "</div></div>" +
    '<div class="card" style="text-align:center"><div class="muted small">Cobrado</div><div style="font-size:17px;font-weight:700;color:var(--success)">' + formatMoneda(totalCobrado) + "</div></div>" +
    "</div>" +

    '<button class="btn-primary" data-action="add-cobro">' + Icon("plus", { size: 16, color: "#fff" }) + " Agregar cobro</button>" +
    '<div class="view-stack gap-sm">' + rows + "</div>"
  );
}

function renderCobroModal(ui) {
  const d = ui.cobroDraft;
  if (!d) return "";
  const editing = !!ui.cobroEditId;
  const estadoOpts = ESTADOS_COBRO.map(function (e) { return '<option value="' + e + '"' + (d.estado === e ? " selected" : "") + ">" + e + "</option>"; }).join("");
  const deleteBtn = editing
    ? '<button class="btn-secondary" style="margin-top:8px;border-color:var(--warn);color:var(--warn)" data-action="delete-cobro" data-arg="' + ui.cobroEditId + '">' +
      (ui.confirmDeleteCobro === ui.cobroEditId ? "¿Seguro? Toca de nuevo para eliminar" : "Eliminar") + "</button>"
    : "";
  return (
    '<div class="modal-overlay"><div class="modal-backdrop" data-action="cancel-cobro"></div>' +
    '<div class="modal-card" style="text-align:left;align-items:stretch;max-width:380px">' +
    '<div class="row between"><span style="font-weight:700;font-size:15px">' + (editing ? "Editar cobro" : "Nuevo cobro") + "</span>" +
    '<button class="icon-btn" data-action="cancel-cobro">' + Icon("x", { size: 18 }) + "</button></div>" +
    '<div class="view-stack gap-sm" style="margin-top:8px">' +
    '<div class="field"><label>Cliente</label><input type="text" data-draft-field="cliente" value="' + escapeHtml(d.cliente) + '" placeholder="Nombre del cliente"></div>' +
    '<div class="row gap-2">' +
    '<div class="field" style="flex:1"><label>Monto</label><input type="text" inputmode="numeric" data-draft-field="monto" value="' + escapeHtml(d.monto) + '" placeholder="0"></div>' +
    '<div class="field" style="flex:1"><label>Estado</label><select data-draft-field="estado">' + estadoOpts + "</select></div>" +
    "</div>" +
    '<div class="field"><label>Notas</label><textarea rows="2" data-draft-field="notas" placeholder="Opcional">' + escapeHtml(d.notas || "") + "</textarea></div>" +
    "</div>" +
    '<button class="btn-primary" style="margin-top:14px" data-action="save-cobro">Guardar</button>' +
    deleteBtn +
    '<button class="link-btn small" style="margin-top:6px" data-action="cancel-cobro">Cancelar</button>' +
    "</div></div>"
  );
}

/* ---------------- Cierre del día ---------------- */

function renderCierreDia(state, ui) {
  const fecha = ui.fechaActual;
  const c = getCierreDia(state, fecha);
  const emojis = ["😣", "😕", "😐", "🙂", "😄"];
  const energiaHtml = emojis.map(function (e, i) {
    const n = i + 1;
    return '<button class="energy-dot' + (c.animo === n ? " on" : "") + '" data-action="set-energia" data-arg="' + n + '">' + e + "</button>";
  }).join("");

  return (
    dateNavHTML(fecha) +
    sectionHeaderHTML("Cierre del Día", "Cierra tu jornada con intención — así mañana empieza mejor.", "moon") +

    '<div class="card">' +
    '<span style="font-weight:700;font-size:14px">¿Cómo fue tu energía hoy?</span>' +
    '<div class="energy-row" style="margin-top:10px">' + energiaHtml + "</div>" +
    "</div>" +

    '<div class="card">' +
    '<div class="field"><label>' + PREGUNTAS_CIERRE[0] + "</label><textarea rows=\"2\" data-field=\"cierrePorDia." + fecha + '.logro" placeholder="Tu logro de hoy...">' + escapeHtml(c.logro) + "</textarea></div>" +
    "</div>" +

    '<div class="card">' +
    '<div class="field"><label>' + PREGUNTAS_CIERRE[1] + "</label><textarea rows=\"2\" data-field=\"cierrePorDia." + fecha + '.mejora" placeholder="Una mejora para mañana...">' + escapeHtml(c.mejora) + "</textarea></div>" +
    "</div>" +

    '<div class="card">' +
    '<div class="field"><label>' + PREGUNTAS_CIERRE[2] + "</label><input type=\"text\" data-field=\"cierrePorDia." + fecha + '.prioridadManana" value="' + escapeHtml(c.prioridadManana) + '" placeholder="Tu prioridad #1 de mañana"></div>' +
    "</div>" +

    '<div class="card">' +
    '<span style="font-weight:700;font-size:14px">3 cosas por las que agradeces hoy</span>' +
    '<div class="view-stack gap-sm" style="margin-top:10px">' +
    [0, 1, 2].map(function (i) {
      return '<input type="text" value="' + escapeHtml(c.gratitud[i]) + '" data-field="cierrePorDia.' + fecha + ".gratitud." + i + '" placeholder="Agradezco..." ' +
        'style="background:var(--bg-2);border:1px solid var(--border-soft);color:var(--text);border-radius:10px;padding:9px 12px;font-size:13.5px;outline:none">';
    }).join("") +
    "</div></div>" +

    (c.hecho
      ? '<div class="card" style="text-align:center;background:var(--success-soft);border-color:var(--success)"><span style="font-weight:700;color:var(--success)">Cierre del día completado ' + Icon("check-circle", { size: 16, color: "var(--success)" }) + "</span></div>"
      : '<button class="btn-primary" data-action="completar-cierre">Marcar cierre completado ' + Icon("check", { size: 16, color: "#fff" }) + "</button>")
  );
}

/* ---------------- Ajustes ---------------- */

function renderAjustes(state, ui) {
  const confirmReset = ui.confirmReset;
  return (
    sectionHeaderHTML("Ajustes", "Personaliza tu Día de Impacto.", "settings") +

    '<div class="card">' +
    '<div class="field"><label>Tu nombre</label><input type="text" data-field="nombre" value="' + escapeHtml(state.nombre) + '" placeholder="Tu nombre"></div>' +
    '<div class="field" style="margin-top:12px"><label>Tu WhatsApp (opcional, para accesos directos)</label><input type="text" inputmode="tel" data-field="whatsapp" value="' + escapeHtml(state.whatsapp) + '" placeholder="Ej. 34600000000"></div>' +
    "</div>" +

    '<div class="card row between">' +
    '<div><div style="font-weight:700;font-size:14px">Modo oscuro</div><div class="muted small">Cambia la apariencia de la app</div></div>' +
    '<button class="toggle' + (state.dark ? " on" : "") + '" data-action="toggle-dark"><div class="knob"></div></button>' +
    "</div>" +

    '<div class="card">' +
    '<span style="font-weight:700;font-size:14px">Respaldo de datos</span>' +
    '<p class="muted small" style="margin-top:4px">Guarda una copia de todo tu planificador, o restaura una copia anterior.</p>' +
    '<div class="row gap-2" style="margin-top:10px">' +
    '<button class="btn-secondary" data-action="export-backup">' + Icon("download", { size: 15 }) + " Exportar</button>" +
    '<button class="btn-secondary" data-action="trigger-import-backup">' + Icon("upload", { size: 15 }) + " Importar</button>" +
    "</div>" +
    '<input id="import-backup-file" type="file" accept="application/json" class="hidden" data-target="__importBackup">' +
    "</div>" +

    '<div class="card">' +
    '<span style="font-weight:700;font-size:14px;color:var(--warn)">Zona de riesgo</span>' +
    '<button class="btn-secondary" style="margin-top:10px;border-color:var(--warn);color:var(--warn)" data-action="reset-app">' +
    (confirmReset ? "¿Seguro? Toca de nuevo para borrar todo" : "Borrar todos mis datos") + "</button>" +
    "</div>"
  );
}
