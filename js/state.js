/* ---------------------------------------------------------------
   STATE AND PERSISTENCE — 100% local (localStorage), no backend
--------------------------------------------------------------- */

const STORAGE_KEY = "cumbre90-estado-v1";

function emptyDayState(diaId) {
  const dia = DIAS.find((d) => d.id === diaId);
  return { done: false, quizOk: false, quizSel: null, fields: {}, checks: dia.checklist.map(() => false) };
}

function emptySemanaState(n) {
  const semana = SEMANAS.find((s) => s.n === n);
  return { done: false, checks: semana.acciones.map(() => false) };
}

function emptyPasoState(n) {
  const paso = OCHO_PASOS.find((p) => p.n === n);
  return { checks: (paso.actividades || []).map(() => false), duplicaChecks: (paso.duplicaChecklist || []).map(() => false) };
}

/* ---------------- Step 8 — per-distributor duplication tracker ---------------- */

function duplicaChecklistLength() {
  const paso8 = OCHO_PASOS.find((p) => p.n === 8);
  return (paso8 && paso8.duplicaChecklist ? paso8.duplicaChecklist.length : 0);
}

function nuevoDistribuidorDuplica() {
  return { id: "dd" + Math.random().toString(36).slice(2, 9), nombre: "", checks: Array(duplicaChecklistLength()).fill(false) };
}

function diaSemanaHoyId() {
  const map = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  return map[new Date().getDay()];
}

function nuevaActividadAgenda() {
  return { id: "a" + Math.random().toString(36).slice(2, 9), tipo: "llamada", hora: "", fecha: "", nota: "", hecha: false, recordar: false, recordarMin: 10, ultimoAviso: null };
}

function nuevoZoomAgenda() {
  return { id: "z" + Math.random().toString(36).slice(2, 9), titulo: "", hora: "", enlace: "", fecha: "", recordar: false, recordarMin: 10, ultimoAviso: null };
}

function emptyAgendaDia() {
  return { actividades: [], zooms: [] };
}

function emptyAgenda() {
  return DIAS_SEMANA.reduce(function (acc, d) { acc[d.id] = emptyAgendaDia(); return acc; }, {});
}

function nuevoBucketItem() {
  return { texto: "", fecha: "", porque: "", cumplido: false };
}

function emptyBucketList() {
  return Array.from({ length: 100 }, function () { return nuevoBucketItem(); });
}

function nuevoPremio() {
  return { hito: "", premio: "", imagen: null };
}

function nuevoProductoCatalogo(seed) {
  seed = seed || {};
  return {
    id: seed.id || "prod" + Math.random().toString(36).slice(2, 9),
    categoria: seed.categoria || "My products",
    nombre: seed.nombre || "",
    pv: seed.pv || 0,
    precio: seed.precio || 0,
    probado: false,
  };
}

function paisCatalogoInfo(paisId) {
  return PAISES_CATALOGO.find(function (p) { return p.id === paisId; }) || PAISES_CATALOGO[0];
}

function emptyCatalogoProductosPais(paisId) {
  const base = CATALOGO_PRODUCTOS_POR_PAIS[paisId] || [];
  const productos = base.map(function (p, i) {
    return nuevoProductoCatalogo({ id: paisId + "-prod" + i, categoria: p.categoria, nombre: p.nombre, pv: p.pv, precio: p.precio });
  });
  const lineasLibres = Array.from({ length: 20 }, function (_, i) {
    return nuevoProductoCatalogo({ id: paisId + "-blank" + i, categoria: "My products" });
  });
  return productos.concat(lineasLibres);
}

function getCatalogoProductos(state, paisId) {
  if (!state.catalogoProductos[paisId]) state.catalogoProductos[paisId] = emptyCatalogoProductosPais(paisId);
  return state.catalogoProductos[paisId];
}

function getComprasQuincena(state, qn) {
  if (!state.comprasQuincena[qn]) state.comprasQuincena[qn] = {};
  return state.comprasQuincena[qn];
}

/* Adds up how many units of a product have been ordered across ALL recorded
   fortnights (the full history, not just the current one) — to know which
   products the partner already knows. */
function totalHistoricoProducto(state, productoId) {
  return Object.keys(state.comprasQuincena || {}).reduce(function (acc, qn) {
    return acc + (Number(state.comprasQuincena[qn][productoId]) || 0);
  }, 0);
}

/* ---------------- Focus Meeting — Left/Right list per 90-Day Plan fortnight ---------------- */

function nuevaPersonaEnfoque() {
  return { id: "p" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", atomyId: "", contrasena: "", pvp: 0, puntos: 0, fecha: null, verificado: false, notas: "" };
}

function emptyListaEnfoque() {
  return { izquierda: [], derecha: [], otrosIzquierda: 0, otrosDerecha: 0, reunionHecha: false };
}

function getListaEnfoque(state, qn) {
  if (!state.listasEnfoque[qn]) state.listasEnfoque[qn] = emptyListaEnfoque();
  return state.listasEnfoque[qn];
}

/* Read without mutating state (for use inside views). */
function peekListaEnfoque(state, qn) {
  return state.listasEnfoque[qn] || emptyListaEnfoque();
}

function sumaLineaEnfoque(lista, linea, soloVerificado) {
  const arr = lista[linea] || [];
  const base = Number(linea === "izquierda" ? lista.otrosIzquierda : lista.otrosDerecha) || 0;
  return arr.reduce(function (acc, p) {
    if (soloVerificado && !p.verificado) return acc;
    return acc + (Number(p.puntos) || 0);
  }, base);
}

/* ---------------- My Genealogy Tree, S.O.S. Calls, and Event Contact List ---------------- */

function nuevaPersonaAscendente() {
  return { id: "a" + Math.random().toString(36).slice(2, 9), nombre: "", rango: "", pais: "", telefono: "", horarioNoMolestar: "" };
}

function emptyArbolGenealogico() {
  return {
    yo: { atomyId: "", contrasena: "" },
    patrocinador: { nombre: "", atomyId: "", rango: "", pais: "", telefono: "", zoomId: "", zoomContrasena: "", horarioNoLlamar: "" },
    ascendentes: [],
  };
}

function nuevaLlamadaSOS() {
  return { id: "s" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", nota: "" };
}

function nuevoContactoEvento() {
  return { id: "e" + Math.random().toString(36).slice(2, 9), nombre: "", pais: "", telefono: "", observaciones: "" };
}

function emptyEscenarioVida() {
  return ESCENARIO_CATEGORIAS.reduce((acc, c) => {
    acc[c.id] = { meta: "", avance: 0 };
    return acc;
  }, {});
}

/* ---------------- Big 3-Year Plan — rank/PV/income projection ---------------- */

function nuevoHitoGranPlan() {
  return { id: "gp" + Math.random().toString(36).slice(2, 9), fecha: "", nivel: "", pvGrupal: "", ingresos: "" };
}

function emptyGranPlan3() {
  return { anio1: [], anio2: [], anio3: [] };
}

/* ---------------- Diary of My Future Self ---------------- */

function emptyDiarioFuturo() {
  return { texto: "" };
}

/* ---------------- Monthly Los 8 Pasos self-assessment + monthly business plan ----------------
   Both are saved by calendar month ("YYYY-MM"), with the same month-to-month
   navigation format (independent of the 90-Day Plan's "fortnights"). */

function mesActualKey() {
  return hoyISO().slice(0, 7);
}

function mesAdyacente(key, delta) {
  const parts = key.split("-");
  let y = Number(parts[0]), m = Number(parts[1]) + delta;
  while (m > 12) { m -= 12; y += 1; }
  while (m < 1) { m += 12; y -= 1; }
  return y + "-" + String(m).padStart(2, "0");
}

function mesLabel(key) {
  const parts = key.split("-");
  return calMesesEs[Number(parts[1]) - 1] + " " + parts[0];
}

function emptyEvaluacion8Pasos() {
  return { puntajes: {}, alabanza: "", reflexion: "", comentarioPatrocinador: "" };
}

function getEvaluacion8Pasos(state, mesKey) {
  if (!state.evaluacion8Pasos[mesKey]) state.evaluacion8Pasos[mesKey] = emptyEvaluacion8Pasos();
  return state.evaluacion8Pasos[mesKey];
}

function nuevaMetaPlanMensual() {
  return { id: "pm" + Math.random().toString(36).slice(2, 9), texto: "", hecha: false };
}

function nuevaAccionPlanMensual() {
  return { id: "pa" + Math.random().toString(36).slice(2, 9), texto: "", hecha: false };
}

function emptyPlanComercialMensual() {
  return {
    metas: [],
    acciones: [],
    quincenas: [
      { ingresos: 0, pv: 0, nivel: "" },
      { ingresos: 0, pv: 0, nivel: "" },
    ],
  };
}

function getPlanComercialMensual(state, mesKey) {
  if (!state.planComercialMensual[mesKey]) state.planComercialMensual[mesKey] = emptyPlanComercialMensual();
  return state.planComercialMensual[mesKey];
}

/* ---------------- Weekly Report — daily action log ---------------- */

function emptyRegistroDia() {
  return { llamadas: 0, mensajes: 0, pedidos: 0 };
}

function getRegistroDia(state, fechaISO) {
  if (!state.registroDiario[fechaISO]) state.registroDiario[fechaISO] = emptyRegistroDia();
  return state.registroDiario[fechaISO];
}

/* Last 7 days (today included), oldest to most recent. */
function ultimos7Dias() {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    out.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));
  }
  return out;
}

/* Adds up the manual counters (calls/messages/orders) from the daily log
   for any list of ISO dates (week, fortnight, etc.). */
function sumarRegistroPeriodo(state, dias) {
  const total = emptyRegistroDia();
  dias.forEach(function (f) {
    const d = state.registroDiario[f];
    if (!d) return;
    total.llamadas += Number(d.llamadas) || 0;
    total.mensajes += Number(d.mensajes) || 0;
    total.pedidos += Number(d.pedidos) || 0;
  });
  return total;
}

function sumarRegistroSemana(state) {
  return sumarRegistroPeriodo(state, ultimos7Dias());
}

/* Stats derived from the List of 250 (not manual counters): counts contacts
   whose STATUS changed within the given period (per estadoFecha), and the
   follow-ups verified/done within the period. Used both for "This week" and
   for the per-fortnight summary. */
function calcularDerivadosPeriodo(state, dias) {
  const contactos = state.contactos || [];
  const out = { contactados: 0, presentaciones: 0, registros: 0, seguimientosRealizados: 0 };
  contactos.forEach(function (c) {
    if (c.estadoFecha && dias.indexOf(c.estadoFecha) !== -1) {
      if (c.estado === "Contacted") out.contactados++;
      else if (c.estado === "Presented") out.presentaciones++;
      else if (c.estado === "Partner" || c.estado === "Consumer") out.registros++;
    }
    (c.seguimientosRealizados || []).forEach(function (f) {
      if (dias.indexOf(f) !== -1) out.seguimientosRealizados++;
    });
  });
  return out;
}

/* ---------------- CALENDAR fortnight (1-15 and 16-end of month) ----------------
   Different from the 6 "fortnights" of the 90-Day Plan (QUINCENAS/SEMANAS/
   derivarQuincenas, which are program stages, not dates). This one uses real
   calendar dates, because registroDiario and the contacts' estadoFecha/
   seguimientosRealizados fields are all real dates. Prefixed "cal" so it
   doesn't clash with the above. Always works on ISO "YYYY-MM-DD" strings (the
   same format hoyISO() produces), instead of rebuilding local Date objects,
   to stay aligned with the rest of the app (which already stores dates in
   UTC via toISOString()). */

const calMesesEs = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function calQuincenaKeyFromISO(iso) {
  const year = iso.slice(0, 4);
  const month = iso.slice(5, 7);
  const day = Number(iso.slice(8, 10));
  const half = day <= 15 ? 1 : 2;
  return year + "-" + month + "-" + half;
}

function calQuincenaActualKey() {
  return calQuincenaKeyFromISO(hoyISO());
}

function calParseQuincenaKey(key) {
  const parts = key.split("-");
  return { year: Number(parts[0]), month: Number(parts[1]), half: Number(parts[2]) };
}

function calDiasEnMes(year, month) {
  return new Date(year, month, 0).getDate();
}

function calQuincenaBoundsISO(key) {
  const { year, month, half } = calParseQuincenaKey(key);
  const mm = String(month).padStart(2, "0");
  const startDay = half === 1 ? "01" : "16";
  const endDay = half === 1 ? "15" : String(calDiasEnMes(year, month)).padStart(2, "0");
  return { startISO: year + "-" + mm + "-" + startDay, endISO: year + "-" + mm + "-" + endDay };
}

/* List of ISO dates (one per day) within the fortnight, for summing logs. */
function calFechasEnQuincena(key) {
  const { startISO, endISO } = calQuincenaBoundsISO(key);
  const out = [];
  let d = new Date(startISO + "T00:00:00Z");
  const end = new Date(endISO + "T00:00:00Z");
  while (d <= end) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

function calQuincenaLabel(key) {
  const { year, month, half } = calParseQuincenaKey(key);
  return calMesesEs[month - 1] + " " + (half === 1 ? "1–15" : "16–end") + ", " + year;
}

function calQuincenaLabelCorta(key) {
  const { month, half } = calParseQuincenaKey(key);
  return calMesesEs[month - 1].slice(0, 3) + " " + (half === 1 ? "1-15" : "16+");
}

function calQuincenaAdyacente(key, delta) {
  const { year, month, half } = calParseQuincenaKey(key);
  let h = half + delta, m = month, y = year;
  while (h > 2) { h -= 2; m += 1; if (m > 12) { m = 1; y += 1; } }
  while (h < 1) { h += 2; m -= 1; if (m < 1) { m = 12; y -= 1; } }
  return y + "-" + String(m).padStart(2, "0") + "-" + h;
}

/* Aggregated data (manual counters + derived stats) for a fortnight. */
function datosQuincena(state, key) {
  const dias = calFechasEnQuincena(key);
  const reg = sumarRegistroPeriodo(state, dias);
  const der = calcularDerivadosPeriodo(state, dias);
  return {
    llamadas: reg.llamadas, mensajes: reg.mensajes, pedidos: reg.pedidos,
    contactados: der.contactados, presentaciones: der.presentaciones,
    registros: der.registros, seguimientosRealizados: der.seguimientosRealizados,
  };
}

/* All calendar-fortnight keys that have at least one saved data point — in
   registroDiario, or in some contact's estadoFecha/seguimientosRealizados —
   sorted oldest to most recent (the key format sorts correctly as text:
   zero-padded year-month, plus half 1 or 2). */
function quincenasConActividad(state) {
  const set = {};
  Object.keys(state.registroDiario || {}).forEach(function (f) { set[calQuincenaKeyFromISO(f)] = true; });
  (state.contactos || []).forEach(function (c) {
    if (c.estadoFecha) set[calQuincenaKeyFromISO(c.estadoFecha)] = true;
    (c.seguimientosRealizados || []).forEach(function (f) { set[calQuincenaKeyFromISO(f)] = true; });
  });
  return Object.keys(set).sort();
}

function defaultState() {
  return {
    onboarded: false,
    nombre: "",
    foto: null,
    rangoIndex: 0,
    racha: 0,
    ultimaFecha: null,
    actividad: [],
    dark: false,
    whatsapp: "",
    premios: PREMIOS_DEFECTO.map((p) => ({ ...p })),
    mentorMode: false,
    notifOn: true,
    notifUltimoAviso: null,
    dias: DIAS.reduce((acc, d) => ({ ...acc, [d.id]: emptyDayState(d.id) }), {}),
    semanas: SEMANAS.reduce((acc, s) => ({ ...acc, [s.n]: emptySemanaState(s.n) }), {}),
    pasos: OCHO_PASOS.reduce((acc, p) => ({ ...acc, [p.n]: emptyPasoState(p.n) }), {}),
    contactos: [],
    escenarioVida: emptyEscenarioVida(),
    escenarioCompletado: false,
    granPlan3: emptyGranPlan3(),
    diarioFuturo: emptyDiarioFuturo(),
    evaluacion8Pasos: {},
    planComercialMensual: {},
    bucketList: emptyBucketList(),
    agenda: emptyAgenda(),
    lemaFoco: { pilar: null, racha: 0, ultimaFecha: null },
    pais: "CO",
    catalogoProductos: { CO: emptyCatalogoProductosPais("CO") },
    comprasQuincena: {},
    listasEnfoque: {},
    registroDiario: {},
    idiomaInforme: "en",
    arbolGenealogico: emptyArbolGenealogico(),
    llamadasSOS: [],
    contactosEventos: [],
    tourVisto: false,
    distribuidoresDuplicado: [],
  };
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDiasISO(baseISO, dias) {
  const d = new Date(baseISO + "T00:00:00");
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

/* Derives the {1:bool,...,6:bool} map of completed fortnights from the 12
   weeks (a fortnight is complete when both of its weeks are). Keeps
   mountain.js and the views that used to read state.quincenas compatible. */
function derivarQuincenas(state) {
  const map = {};
  QUINCENAS.forEach((q) => {
    const semanasQ = SEMANAS.filter((s) => s.q === q.n);
    map[q.n] = semanasQ.length > 0 && semanasQ.every((s) => state.semanas[s.n] && state.semanas[s.n].done);
  });
  return map;
}

function calcularRacha(racha, ultimaFecha) {
  const hoy = hoyISO();
  if (ultimaFecha === hoy) return { racha: racha || 1, ultimaFecha: hoy };
  const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (ultimaFecha === ayer) return { racha: (racha || 0) + 1, ultimaFecha: hoy };
  return { racha: 1, ultimaFecha: hoy };
}

function diasInactivo(ultimaFecha) {
  if (!ultimaFecha) return 0;
  const hoy = new Date(hoyISO());
  const ult = new Date(ultimaFecha);
  return Math.round((hoy - ult) / 86400000);
}

function dayProgress(est, dia) {
  const totalSteps = dia.checklist.length + 1; // +1 for the quiz
  const doneSteps = est.checks.filter(Boolean).length + (est.quizOk ? 1 : 0);
  return est.done ? 1 : doneSteps / totalSteps;
}

function hydrateState(parsed) {
  const base = defaultState();
  if (!parsed) return base;
  const merged = Object.assign({}, base, parsed);

  merged.dias = DIAS.reduce((acc, d) => {
    const saved = parsed.dias && parsed.dias[d.id];
    const vacio = emptyDayState(d.id);
    const checks =
      saved && Array.isArray(saved.checks) && saved.checks.length === d.checklist.length
        ? saved.checks
        : vacio.checks;
    acc[d.id] = Object.assign({}, vacio, saved || {}, { checks });
    return acc;
  }, {});

  merged.semanas = SEMANAS.reduce((acc, s) => {
    const saved = parsed.semanas && parsed.semanas[s.n];
    const vacio = emptySemanaState(s.n);
    const checks =
      saved && Array.isArray(saved.checks) && saved.checks.length === s.acciones.length
        ? saved.checks
        : vacio.checks;
    acc[s.n] = Object.assign({}, vacio, saved || {}, { checks });
    return acc;
  }, {});

  merged.pasos = OCHO_PASOS.reduce((acc, p) => {
    const saved = parsed.pasos && parsed.pasos[p.n];
    const vacio = emptyPasoState(p.n);
    const checks =
      saved && Array.isArray(saved.checks) && saved.checks.length === (p.actividades || []).length
        ? saved.checks
        : vacio.checks;
    const duplicaChecks =
      saved && Array.isArray(saved.duplicaChecks) && saved.duplicaChecks.length === (p.duplicaChecklist || []).length
        ? saved.duplicaChecks
        : vacio.duplicaChecks;
    acc[p.n] = { checks: checks, duplicaChecks: duplicaChecks };
    return acc;
  }, {});

  merged.contactos = Array.isArray(parsed.contactos)
    ? parsed.contactos.map((c) => {
        const mc = Object.assign(
          { id: "c" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", pais: "", nivel: "Warm", estado: "To contact", notas: "", notaSeguimiento: "", proximoSeguimiento: null, creado: hoyISO(), seguimientosRealizados: [] },
          c
        );
        // Migration: the status list went from 8 to 6 values. "First Order"
        // and "Follow-up" (which had automations that no longer exist) fall
        // back conservatively to "Contacted", since at minimum those people
        // were contacted. "Presented" is unchanged — it already meant the
        // same thing in both the old and the new list.
        if (mc.estado === "First Order" || mc.estado === "Follow-up") mc.estado = "Contacted";
        // estadoFecha: when the status last changed. If missing (contacts
        // saved before this field existed), the creation date is used as the
        // best estimate.
        if (!mc.estadoFecha) mc.estadoFecha = mc.creado;
        if (!Array.isArray(mc.seguimientosRealizados)) mc.seguimientosRealizados = [];
        return mc;
      })
    : [];

  merged.premios =
    Array.isArray(parsed.premios) && parsed.premios.length
      ? parsed.premios.map((p) => Object.assign({ hito: "", premio: "", imagen: null }, p))
      : PREMIOS_DEFECTO.map((p) => Object.assign({ imagen: null }, p));

  merged.escenarioVida = ESCENARIO_CATEGORIAS.reduce((acc, c) => {
    const saved = parsed.escenarioVida && parsed.escenarioVida[c.id];
    acc[c.id] = {
      meta: saved && typeof saved.meta === "string" ? saved.meta : "",
      avance: saved && typeof saved.avance === "number" ? Math.max(0, Math.min(4, saved.avance)) : 0,
    };
    return acc;
  }, {});
  merged.escenarioCompletado = !!parsed.escenarioCompletado;

  const granGuardado = parsed.granPlan3 && typeof parsed.granPlan3 === "object" ? parsed.granPlan3 : {};
  merged.granPlan3 = {
    anio1: Array.isArray(granGuardado.anio1) ? granGuardado.anio1.map(function (h) { return Object.assign(nuevoHitoGranPlan(), h); }) : [],
    anio2: Array.isArray(granGuardado.anio2) ? granGuardado.anio2.map(function (h) { return Object.assign(nuevoHitoGranPlan(), h); }) : [],
    anio3: Array.isArray(granGuardado.anio3) ? granGuardado.anio3.map(function (h) { return Object.assign(nuevoHitoGranPlan(), h); }) : [],
  };

  merged.diarioFuturo = {
    texto: parsed.diarioFuturo && typeof parsed.diarioFuturo.texto === "string" ? parsed.diarioFuturo.texto : "",
  };

  const evalGuardada = parsed.evaluacion8Pasos && typeof parsed.evaluacion8Pasos === "object" ? parsed.evaluacion8Pasos : {};
  merged.evaluacion8Pasos = Object.keys(evalGuardada).reduce(function (acc, mesKey) {
    const saved = evalGuardada[mesKey] || {};
    acc[mesKey] = {
      puntajes: saved.puntajes && typeof saved.puntajes === "object" ? saved.puntajes : {},
      alabanza: typeof saved.alabanza === "string" ? saved.alabanza : "",
      reflexion: typeof saved.reflexion === "string" ? saved.reflexion : "",
      comentarioPatrocinador: typeof saved.comentarioPatrocinador === "string" ? saved.comentarioPatrocinador : "",
    };
    return acc;
  }, {});

  const planGuardado = parsed.planComercialMensual && typeof parsed.planComercialMensual === "object" ? parsed.planComercialMensual : {};
  merged.planComercialMensual = Object.keys(planGuardado).reduce(function (acc, mesKey) {
    const saved = planGuardado[mesKey] || {};
    const base = emptyPlanComercialMensual();
    acc[mesKey] = {
      metas: Array.isArray(saved.metas) ? saved.metas.map(function (m) { return Object.assign(nuevaMetaPlanMensual(), m); }) : [],
      acciones: Array.isArray(saved.acciones) ? saved.acciones.map(function (a) { return Object.assign(nuevaAccionPlanMensual(), a); }) : [],
      quincenas: Array.isArray(saved.quincenas) && saved.quincenas.length === 2
        ? saved.quincenas.map(function (q) { return { ingresos: Number(q.ingresos) || 0, pv: Number(q.pv) || 0, nivel: q.nivel || "" }; })
        : base.quincenas,
    };
    return acc;
  }, {});

  merged.agenda = DIAS_SEMANA.reduce(function (acc, d) {
    const saved = parsed.agenda && parsed.agenda[d.id];
    const actividades = saved && Array.isArray(saved.actividades) ? saved.actividades.map(function (a) { return Object.assign(nuevaActividadAgenda(), a); }) : [];
    const zooms = saved && Array.isArray(saved.zooms) ? saved.zooms.map(function (z) { return Object.assign(nuevoZoomAgenda(), z); }) : [];
    acc[d.id] = { actividades: actividades, zooms: zooms };
    return acc;
  }, {});

  merged.bucketList = Array.from({ length: 100 }, function (_, i) {
    const saved = Array.isArray(parsed.bucketList) ? parsed.bucketList[i] : null;
    return Object.assign(nuevoBucketItem(), saved || {});
  });

  merged.lemaFoco = parsed.lemaFoco && typeof parsed.lemaFoco === "object"
    ? {
        pilar: typeof parsed.lemaFoco.pilar === "number" ? parsed.lemaFoco.pilar : null,
        racha: Number(parsed.lemaFoco.racha) || 0,
        ultimaFecha: parsed.lemaFoco.ultimaFecha || null,
      }
    : { pilar: null, racha: 0, ultimaFecha: null };

  merged.pais = PAISES_CATALOGO.some(function (p) { return p.id === parsed.pais; }) ? parsed.pais : "CO";

  const catalogosGuardados = Array.isArray(parsed.catalogoProductos)
    ? { CO: parsed.catalogoProductos } // old format (single country): migrated to Colombia
    : parsed.catalogoProductos && typeof parsed.catalogoProductos === "object"
    ? parsed.catalogoProductos
    : {};
  merged.catalogoProductos = Object.keys(catalogosGuardados).reduce(function (acc, paisId) {
    const lista = catalogosGuardados[paisId];
    if (Array.isArray(lista) && lista.length) {
      acc[paisId] = lista.map(function (p) { return Object.assign(nuevoProductoCatalogo(), p); });
    }
    return acc;
  }, {});
  if (!merged.catalogoProductos[merged.pais]) {
    merged.catalogoProductos[merged.pais] = emptyCatalogoProductosPais(merged.pais);
  }

  merged.comprasQuincena = parsed.comprasQuincena && typeof parsed.comprasQuincena === "object" ? parsed.comprasQuincena : {};

  const listasGuardadas = parsed.listasEnfoque && typeof parsed.listasEnfoque === "object" ? parsed.listasEnfoque : {};
  merged.listasEnfoque = Object.keys(listasGuardadas).reduce(function (acc, qn) {
    const saved = listasGuardadas[qn] || {};
    const izquierda = Array.isArray(saved.izquierda) ? saved.izquierda.map(function (p) { return Object.assign(nuevaPersonaEnfoque(), p); }) : [];
    const derecha = Array.isArray(saved.derecha) ? saved.derecha.map(function (p) { return Object.assign(nuevaPersonaEnfoque(), p); }) : [];
    acc[qn] = {
      izquierda: izquierda, derecha: derecha,
      otrosIzquierda: Number(saved.otrosIzquierda) || 0, otrosDerecha: Number(saved.otrosDerecha) || 0,
      reunionHecha: !!saved.reunionHecha,
    };
    return acc;
  }, {});

  merged.registroDiario = parsed.registroDiario && typeof parsed.registroDiario === "object"
    ? Object.keys(parsed.registroDiario).reduce(function (acc, f) {
        // Object.assign would also copy the old "presentaciones"/"reuniones"
        // fields (from before those two manual counters were replaced by
        // "pedidos"): the keys are explicitly limited to the current shape
        // to keep the saved state clean.
        const saved = parsed.registroDiario[f] || {};
        acc[f] = { llamadas: Number(saved.llamadas) || 0, mensajes: Number(saved.mensajes) || 0, pedidos: Number(saved.pedidos) || 0 };
        return acc;
      }, {})
    : {};

  merged.idiomaInforme = IDIOMAS_INFORME.some(function (i) { return i.id === parsed.idiomaInforme; }) ? parsed.idiomaInforme : "en";

  const arbolGuardado = parsed.arbolGenealogico && typeof parsed.arbolGenealogico === "object" ? parsed.arbolGenealogico : {};
  merged.arbolGenealogico = {
    yo: Object.assign({ atomyId: "", contrasena: "" }, arbolGuardado.yo || {}),
    patrocinador: Object.assign(
      { nombre: "", atomyId: "", rango: "", pais: "", telefono: "", zoomId: "", zoomContrasena: "", horarioNoLlamar: "" },
      arbolGuardado.patrocinador || {}
    ),
    ascendentes: Array.isArray(arbolGuardado.ascendentes)
      ? arbolGuardado.ascendentes.map(function (a) { return Object.assign(nuevaPersonaAscendente(), a); })
      : [],
  };

  merged.llamadasSOS = Array.isArray(parsed.llamadasSOS)
    ? parsed.llamadasSOS.map(function (s) { return Object.assign(nuevaLlamadaSOS(), s); })
    : [];

  merged.contactosEventos = Array.isArray(parsed.contactosEventos)
    ? parsed.contactosEventos.map(function (c) { return Object.assign(nuevoContactoEvento(), c); })
    : [];

  merged.tourVisto = !!parsed.tourVisto;

  const totalDuplicaItems = duplicaChecklistLength();
  merged.distribuidoresDuplicado = Array.isArray(parsed.distribuidoresDuplicado)
    ? parsed.distribuidoresDuplicado.map(function (d) {
        const base = nuevoDistribuidorDuplica();
        const savedChecks = Array.isArray(d.checks) ? d.checks : [];
        const checks = Array.from({ length: totalDuplicaItems }, function (_, i) { return !!savedChecks[i]; });
        return Object.assign(base, d, { checks: checks });
      })
    : [];

  merged.actividad = Array.isArray(parsed.actividad) ? parsed.actividad : [];
  merged.rangoIndex =
    typeof parsed.rangoIndex === "number" && parsed.rangoIndex >= 0 && parsed.rangoIndex < RANGOS.length
      ? parsed.rangoIndex
      : 0;

  return merged;
}

function setPath(obj, path, value) {
  const parts = path.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]];
    if (cur == null) return;
  }
  cur[parts[parts.length - 1]] = value;
}

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Same as escapeHtml, but also turns any domain/URL mentioned in the text
   (e.g. "ch.atomy.com/eu") into a tappable link. Only used on the app's own
   curated content (explanations, notes), never on text the partner types —
   that still goes through escapeHtml alone. */
function linkifyText(str) {
  const escaped = escapeHtml(str);
  const urlPattern = /((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|net|org|us|io|app|co|info|es|mx|br|ca|eu|be)(?:\/[^\s<]*)?)/gi;
  return escaped.replace(urlPattern, function (match) {
    const href = /^https?:\/\//i.test(match) ? match : "https://" + match;
    return '<a href="' + href + '" target="_blank" rel="noreferrer" style="color:var(--gold-light);text-decoration:underline">' + match + "</a>";
  });
}

const Storage = {
  load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },
  save(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full or unavailable: fail silently */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  },
};
