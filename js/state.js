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
  return { checks: (paso.actividades || []).map(() => false) };
}

function diaSemanaHoyId() {
  const map = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  return map[new Date().getDay()];
}

function nuevaActividadAgenda() {
  return { id: "a" + Math.random().toString(36).slice(2, 9), tipo: "llamada", hora: "", nota: "", hecha: false, recordar: false, recordarMin: 10, ultimoAviso: null };
}

function nuevoZoomAgenda() {
  return { id: "z" + Math.random().toString(36).slice(2, 9), titulo: "", hora: "", enlace: "", recordar: false, recordarMin: 10, ultimoAviso: null };
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

function nuevoProductoCatalogo(seed) {
  seed = seed || {};
  return {
    id: seed.id || "prod" + Math.random().toString(36).slice(2, 9),
    categoria: seed.categoria || "Mis productos",
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
    return nuevoProductoCatalogo({ id: paisId + "-blank" + i, categoria: "Mis productos" });
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

function emptyEscenarioVida() {
  return ESCENARIO_CATEGORIAS.reduce((acc, c) => {
    acc[c.id] = { meta: "", avance: 0 };
    return acc;
  }, {});
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
    whatsapp: "34600000000",
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
    bucketList: emptyBucketList(),
    agenda: emptyAgenda(),
    lemaFoco: { pilar: null, racha: 0, ultimaFecha: null },
    pais: "CO",
    catalogoProductos: { CO: emptyCatalogoProductosPais("CO") },
    comprasQuincena: {},
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
    acc[p.n] = { checks: checks };
    return acc;
  }, {});

  merged.contactos = Array.isArray(parsed.contactos)
    ? parsed.contactos.map((c) =>
        Object.assign(
          { id: "c" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", pais: "", nivel: "Tibio", estado: "Por contactar", notas: "", notaSeguimiento: "", proximoSeguimiento: null, creado: hoyISO() },
          c
        )
      )
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
