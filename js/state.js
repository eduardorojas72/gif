/* ---------------------------------------------------------------
   ESTADO Y PERSISTENCIA — 100% local (localStorage), sin backend
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

/* ---------------- Paso 8 — seguimiento de duplicación por distribuidor ---------------- */

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
    categoria: seed.categoria || "Mes produits",
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
    return nuevoProductoCatalogo({ id: paisId + "-blank" + i, categoria: "Mes produits" });
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

/* Suma cuántas unidades de un producto se han pedido en TODAS las quincenas registradas
   (histórico completo, no solo la actual) — para saber qué productos ya conoce el socio. */
function totalHistoricoProducto(state, productoId) {
  return Object.keys(state.comprasQuincena || {}).reduce(function (acc, qn) {
    return acc + (Number(state.comprasQuincena[qn][productoId]) || 0);
  }, 0);
}

/* ---------------- Reunión de Enfoque — lista Izquierda/Derecha por quincena del Plan 90 Días ---------------- */

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

/* Lectura sin mutar el estado (para usar dentro de las vistas). */
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

/* ---------------- Mi Árbol Genealógico, Llamadas S.O.S. y Lista de Contactos (eventos) ---------------- */

function nuevaPersonaAscendente() {
  return { id: "a" + Math.random().toString(36).slice(2, 9), nombre: "", rango: "", pais: "", telefono: "", horarioNoMolestar: "" };
}

function emptyArbolGenealogico() {
  return {
    yo: { atomyId: "", contrasena: "", fechaNacimiento: "" },
    patrocinador: { nombre: "", atomyId: "", rango: "", pais: "", telefono: "", zoomId: "", zoomContrasena: "", horarioNoLlamar: "", grupoWhatsapp: "", fechaNacimiento: "" },
    ascendentes: [],
  };
}

function nuevaLlamadaSOS() {
  return { id: "s" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", zoomId: "", nota: "" };
}

function nuevoContactoEvento() {
  return { id: "e" + Math.random().toString(36).slice(2, 9), nombre: "", pais: "", telefono: "", observaciones: "" };
}

/* ---------------- Mes Partenaires — répertoire permanent de mon équipe, par ligne gauche/droite ---------------- */

function nuevoSocio() {
  return {
    id: "ms" + Math.random().toString(36).slice(2, 9),
    nombre: "", atomyId: "", contrasena: "", telefono: "", zoomId: "",
    pvp: 0, fechaCumpleanos: "", fechaUltimaCompra: "", notas: "",
  };
}

function emptyMisSocios() {
  return { izquierda: [], derecha: [] };
}

/* Mois complets écoulés depuis une date ISO jusqu'à aujourd'hui (null si pas de date).
   Sert à avertir quand un partenaire est sans achat depuis ~11 mois et est sur le point d'expirer. */
function mesesDesde(fechaISO) {
  if (!fechaISO) return null;
  const then = new Date(fechaISO + "T00:00:00");
  const now = new Date();
  let meses = (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
  if (now.getDate() < then.getDate()) meses -= 1;
  return Math.max(0, meses);
}

/* Ajoute des mois de calendrier à une date ISO (pour le suivi à "11 mois" de Clients). */
function addMesesISO(fechaISO, meses) {
  const d = new Date(fechaISO + "T00:00:00");
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
}

/* ---------------- Clients — personnes ayant déjà acheté, avec historique de commandes ---------------- */

function nuevaCompraCliente() {
  return { id: "co" + Math.random().toString(36).slice(2, 9), fecha: hoyISO(), producto: "", valor: 0, pv: 0 };
}

function nuevoCliente() {
  return {
    id: "cli" + Math.random().toString(36).slice(2, 9),
    nombre: "", atomyId: "", contrasena: "", telefono: "", fechaNacimiento: "",
    observaciones: "", compras: [], proximoSeguimiento: null, creado: "",
  };
}

/* Clients dont l'anniversaire (jour et mois) est aujourd'hui — pour l'alerte flottante. */
function cumpleanosHoy(clientes) {
  const hoy = hoyISO().slice(5); // "MM-DD"
  return (clientes || []).filter(function (c) { return c.fechaNacimiento && c.fechaNacimiento.slice(5) === hoy; });
}

function emptyEscenarioVida() {
  return ESCENARIO_CATEGORIAS.reduce((acc, c) => {
    acc[c.id] = { meta: "", avance: 0 };
    return acc;
  }, {});
}

/* ---------------- Gran Plan 3 — proyección de rango/PV/ingresos a 3 años ---------------- */

function nuevoHitoGranPlan() {
  return { id: "gp" + Math.random().toString(36).slice(2, 9), fecha: "", nivel: "", pvGrupal: "", ingresos: "" };
}

function emptyGranPlan3() {
  return { anio1: [], anio2: [], anio3: [] };
}

/* ---------------- Diario de mi yo futuro ---------------- */

function emptyDiarioFuturo() {
  return { texto: "" };
}

/* ---------------- Evaluación mensual de Los 8 Pasos + Plan comercial mensual ----------------
   Ambas se guardan por mes de calendario ("YYYY-MM"), con el mismo formato de
   navegación mes a mes (independiente de las "quincenas" del Plan 90 Días). */

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
  return calMesesFr[Number(parts[1]) - 1] + " " + parts[0];
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

/* ---------------- Informe Semanal — registro diario de acciones ---------------- */

function emptyRegistroDia() {
  return { llamadas: 0, mensajes: 0, pedidos: 0 };
}

function getRegistroDia(state, fechaISO) {
  if (!state.registroDiario[fechaISO]) state.registroDiario[fechaISO] = emptyRegistroDia();
  return state.registroDiario[fechaISO];
}

/* Últimos 7 días (incluye hoy), del más antiguo al más reciente. */
function ultimos7Dias() {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    out.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));
  }
  return out;
}

/* Suma los contadores manuales (llamadas/mensajes/pedidos) del registro diario
   para cualquier lista de fechas ISO (semana, quincena, etc.). */
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

/* Estadísticas derivadas de la Lista de 250 (no son contadores manuales):
   cuentan contactos cuyo ESTADO cambió dentro del período dado (según
   estadoFecha), y los seguimientos verificados/hechos dentro del período.
   Se usan tanto para "Esta semana" como para el resumen por quincena. */
function calcularDerivadosPeriodo(state, dias) {
  const contactos = state.contactos || [];
  const out = { contactados: 0, presentaciones: 0, registros: 0, seguimientosRealizados: 0 };
  contactos.forEach(function (c) {
    if (c.estadoFecha && dias.indexOf(c.estadoFecha) !== -1) {
      if (c.estado === "Contacté") out.contactados++;
      else if (c.estado === "Présentation") out.presentaciones++;
      else if (c.estado === "Partenaire" || c.estado === "Consommateur") out.registros++;
    }
    (c.seguimientosRealizados || []).forEach(function (f) {
      if (dias.indexOf(f) !== -1) out.seguimientosRealizados++;
    });
  });
  return out;
}

/* ---------------- Quincena de CALENDARIO (1–15 y 16–fin de mes) ----------------
   Distinta de las 6 "quincenas" del Plan 90 Días (QUINCENAS/SEMANAS/derivarQuincenas,
   que son etapas del programa, no fechas). Esta usa fechas de calendario reales,
   porque registroDiario y los campos estadoFecha/seguimientosRealizados de los
   contactos son todos fechas reales. Prefijo "cal" para no chocar con lo anterior.
   Trabaja siempre sobre las cadenas ISO "YYYY-MM-DD" (el mismo formato que produce
   hoyISO()), en vez de reconstruir objetos Date locales, para no desalinearse del
   resto de la app (que ya guarda fechas en UTC vía toISOString()). */

const calMesesFr = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

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

/* Lista de fechas ISO (una por día) dentro de la quincena, para sumar registros. */
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
  return (half === 1 ? "1–15" : "16–fin") + " " + calMesesFr[month - 1] + " " + year;
}

function calQuincenaLabelCorta(key) {
  const { month, half } = calParseQuincenaKey(key);
  return (half === 1 ? "1-15" : "16+") + " " + calMesesFr[month - 1].slice(0, 3);
}

function calQuincenaAdyacente(key, delta) {
  const { year, month, half } = calParseQuincenaKey(key);
  let h = half + delta, m = month, y = year;
  while (h > 2) { h -= 2; m += 1; if (m > 12) { m = 1; y += 1; } }
  while (h < 1) { h += 2; m -= 1; if (m < 1) { m = 12; y -= 1; } }
  return y + "-" + String(m).padStart(2, "0") + "-" + h;
}

/* Datos agregados (contadores manuales + estadísticas derivadas) de una quincena. */
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

/* Todas las quincenas de calendario (claves) que tienen al menos un dato guardado
   — en registroDiario, o en estadoFecha/seguimientosRealizados de algún contacto —
   ordenadas de la más antigua a la más reciente (el formato de clave ordena bien
   como texto: año-mes con cero a la izquierda, y mitad 1 o 2). */
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
    idiomaInforme: "es",
    arbolGenealogico: emptyArbolGenealogico(),
    llamadasSOS: [],
    misSocios: emptyMisSocios(),
    clientes: [],
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

/* Deriva el mapa {1:bool,...,6:bool} de quincenas completadas a partir de
   las 12 semanas (una quincena está completa cuando sus 2 semanas lo están).
   Mantiene compatible mountain.js y las vistas que antes leían state.quincenas. */
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
  const totalSteps = dia.checklist.length + 1; // +1 por el quiz
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
          { id: "c" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", pais: "", nivel: "Tiède", estado: "À contacter", notas: "", notaSeguimiento: "", proximoSeguimiento: null, creado: hoyISO(), seguimientosRealizados: [] },
          c
        );
        // Migration : la liste des statuts est passée de 8 à 6 valeurs. "Présenté" est
        // renommé en "Présentation" ; "Première Commande" et "Suivi" (qui avaient
        // des automatismes qui n'existent plus) retombent de façon conservatrice sur
        // "Contacté", puisqu'au minimum ces personnes ont été contactées.
        if (mc.estado === "Présenté") mc.estado = "Présentation";
        else if (mc.estado === "Première Commande" || mc.estado === "Suivi") mc.estado = "Contacté";
        // estadoFecha : date du dernier changement de statut. Si absente (contacts
        // enregistrés avant l'ajout de ce champ), on utilise la date de création comme meilleure estimation.
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
    ? { CO: parsed.catalogoProductos } // formato antiguo (un solo país): se migra a Colombia
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
        // Object.assign copiaría también los campos antiguos "presentaciones"/"reuniones"
        // (de antes de que esos dos manuales se reemplazaran por "pedidos"): se limitan
        // explícitamente las claves al shape actual para dejar el estado guardado limpio.
        const saved = parsed.registroDiario[f] || {};
        acc[f] = { llamadas: Number(saved.llamadas) || 0, mensajes: Number(saved.mensajes) || 0, pedidos: Number(saved.pedidos) || 0 };
        return acc;
      }, {})
    : {};

  merged.idiomaInforme = IDIOMAS_INFORME.some(function (i) { return i.id === parsed.idiomaInforme; }) ? parsed.idiomaInforme : "es";

  const arbolGuardado = parsed.arbolGenealogico && typeof parsed.arbolGenealogico === "object" ? parsed.arbolGenealogico : {};
  merged.arbolGenealogico = {
    yo: Object.assign({ atomyId: "", contrasena: "", fechaNacimiento: "" }, arbolGuardado.yo || {}),
    patrocinador: Object.assign(
      { nombre: "", atomyId: "", rango: "", pais: "", telefono: "", zoomId: "", zoomContrasena: "", horarioNoLlamar: "", grupoWhatsapp: "", fechaNacimiento: "" },
      arbolGuardado.patrocinador || {}
    ),
    ascendentes: Array.isArray(arbolGuardado.ascendentes)
      ? arbolGuardado.ascendentes.map(function (a) { return Object.assign(nuevaPersonaAscendente(), a); })
      : [],
  };

  merged.llamadasSOS = Array.isArray(parsed.llamadasSOS)
    ? parsed.llamadasSOS.map(function (s) { return Object.assign(nuevaLlamadaSOS(), s); })
    : [];

  const misSociosGuardado = parsed.misSocios && typeof parsed.misSocios === "object" ? parsed.misSocios : {};
  merged.misSocios = {
    izquierda: Array.isArray(misSociosGuardado.izquierda) ? misSociosGuardado.izquierda.map(function (s) { return Object.assign(nuevoSocio(), s); }) : [],
    derecha: Array.isArray(misSociosGuardado.derecha) ? misSociosGuardado.derecha.map(function (s) { return Object.assign(nuevoSocio(), s); }) : [],
  };

  merged.clientes = Array.isArray(parsed.clientes)
    ? parsed.clientes.map(function (c) {
        const compras = Array.isArray(c.compras) ? c.compras.map(function (co) { return Object.assign(nuevaCompraCliente(), co); }) : [];
        return Object.assign(nuevoCliente(), c, { compras: compras });
      })
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

/* Igual que escapeHtml, pero además convierte en enlace tocable cualquier
   dominio/URL mencionado en el texto (p.ej. "ch.atomy.com/eu"). Solo se usa
   sobre contenido propio y curado de la app (explicaciones, notas), nunca
   sobre texto que el socio escriba — ese sigue pasando por escapeHtml solo. */
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
      /* almacenamiento lleno o no disponible: se ignora silenciosamente */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  },
};
