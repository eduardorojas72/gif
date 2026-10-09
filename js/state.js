/* ---------------------------------------------------------------
   ESTADO Y PERSISTENCIA — 100% local (localStorage), sin backend
--------------------------------------------------------------- */

const STORAGE_KEY = "dia-impacto-estado-v1";

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDiasISO(baseISO, dias) {
  const d = new Date(baseISO + "T00:00:00");
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

function diasInactivo(ultimaFecha) {
  if (!ultimaFecha) return 0;
  const d1 = new Date(ultimaFecha + "T00:00:00");
  const d2 = new Date(hoyISO() + "T00:00:00");
  return Math.round((d2 - d1) / 86400000);
}

/* Actualiza la racha de días activos consecutivos. */
function calcularRacha(racha, ultimaFecha) {
  const hoy = hoyISO();
  if (ultimaFecha === hoy) return { racha: racha || 0, ultimaFecha };
  if (ultimaFecha === addDiasISO(hoy, -1)) return { racha: (racha || 0) + 1, ultimaFecha: hoy };
  return { racha: 1, ultimaFecha: hoy };
}

/* ---------------- Fábricas de datos vacíos ---------------- */

function nuevoId(prefijo) {
  return prefijo + Math.random().toString(36).slice(2, 9);
}

function nuevaPrioridad() {
  return { id: nuevoId("p"), texto: "", hecha: false };
}

function nuevoBloque(categoria) {
  return { id: nuevoId("b"), hora: "", categoria: categoria || "prospeccion", titulo: "", notas: "", hecho: false };
}

function emptyPlanDia() {
  return {
    prioridades: [nuevaPrioridad(), nuevaPrioridad(), nuevaPrioridad()],
    bloques: [],
  };
}

function getPlanDia(state, fechaISO) {
  if (!state.planesPorDia[fechaISO]) state.planesPorDia[fechaISO] = emptyPlanDia();
  return state.planesPorDia[fechaISO];
}

function nuevoProspectoDia() {
  return { id: nuevoId("pr"), nombre: "", telefono: "", medio: "Llamada", hecho: false, notas: "" };
}

function emptyProspeccionDia() {
  return [];
}

function getProspeccionDia(state, fechaISO) {
  if (!state.prospeccionPorDia[fechaISO]) state.prospeccionPorDia[fechaISO] = emptyProspeccionDia();
  return state.prospeccionPorDia[fechaISO];
}

function nuevoMiembroEquipo() {
  return { id: nuevoId("m"), nombre: "", telefono: "", rol: "", proximoCheckIn: null, notas: "", ultimoContacto: null };
}

function nuevaTareaComunicacion() {
  return { id: nuevoId("c"), titulo: "", hecho: false };
}

function emptyComunicacionDia() {
  return { llamadas: [], emails: [] };
}

function getComunicacionDia(state, fechaISO) {
  if (!state.comunicacionPorDia[fechaISO]) state.comunicacionPorDia[fechaISO] = emptyComunicacionDia();
  return state.comunicacionPorDia[fechaISO];
}

function nuevoContenidoRRSS() {
  return { id: nuevoId("rs"), fecha: hoyISO(), plataforma: "instagram", idea: "", guion: "", estado: "Idea" };
}

function nuevoCobro() {
  return { id: nuevoId("co"), cliente: "", monto: "", estado: "Pendiente", notas: "" };
}

function emptyCierreDia() {
  return { logro: "", mejora: "", prioridadManana: "", animo: 3, gratitud: ["", "", ""], hecho: false };
}

function getCierreDia(state, fechaISO) {
  if (!state.cierrePorDia[fechaISO]) state.cierrePorDia[fechaISO] = emptyCierreDia();
  return state.cierrePorDia[fechaISO];
}

function emptyMetaFinanciera() {
  return { metaDiaria: "", nota: "" };
}

/* ---------------- Estado por defecto ---------------- */

function defaultState() {
  return {
    onboarded: false,
    nombre: "",
    foto: null,
    dark: true,
    whatsapp: "",
    racha: 0,
    ultimaFecha: null,
    planesPorDia: {},
    prospeccionPorDia: {},
    equipoMiembros: [],
    comunicacionPorDia: {},
    contenidoRRSS: [],
    cobros: [],
    metaFinancieraPorDia: {},
    cierrePorDia: {},
  };
}

/* ---------------- Hidratación (merge seguro del estado guardado) ---------------- */

function hydrateState(parsed) {
  const base = defaultState();
  if (!parsed) return base;
  const merged = Object.assign({}, base, parsed);

  merged.planesPorDia = parsed.planesPorDia && typeof parsed.planesPorDia === "object"
    ? Object.keys(parsed.planesPorDia).reduce(function (acc, fecha) {
        const saved = parsed.planesPorDia[fecha] || {};
        const prioridades = Array.isArray(saved.prioridades) && saved.prioridades.length === 3
          ? saved.prioridades.map(function (p) { return Object.assign(nuevaPrioridad(), p); })
          : emptyPlanDia().prioridades;
        const bloques = Array.isArray(saved.bloques)
          ? saved.bloques.map(function (b) { return Object.assign(nuevoBloque(), b); })
          : [];
        acc[fecha] = { prioridades: prioridades, bloques: bloques };
        return acc;
      }, {})
    : {};

  merged.prospeccionPorDia = parsed.prospeccionPorDia && typeof parsed.prospeccionPorDia === "object"
    ? Object.keys(parsed.prospeccionPorDia).reduce(function (acc, fecha) {
        const lista = Array.isArray(parsed.prospeccionPorDia[fecha]) ? parsed.prospeccionPorDia[fecha] : [];
        acc[fecha] = lista.map(function (p) { return Object.assign(nuevoProspectoDia(), p); });
        return acc;
      }, {})
    : {};

  merged.equipoMiembros = Array.isArray(parsed.equipoMiembros)
    ? parsed.equipoMiembros.map(function (m) { return Object.assign(nuevoMiembroEquipo(), m); })
    : [];

  merged.comunicacionPorDia = parsed.comunicacionPorDia && typeof parsed.comunicacionPorDia === "object"
    ? Object.keys(parsed.comunicacionPorDia).reduce(function (acc, fecha) {
        const saved = parsed.comunicacionPorDia[fecha] || {};
        acc[fecha] = {
          llamadas: Array.isArray(saved.llamadas) ? saved.llamadas.map(function (t) { return Object.assign(nuevaTareaComunicacion(), t); }) : [],
          emails: Array.isArray(saved.emails) ? saved.emails.map(function (t) { return Object.assign(nuevaTareaComunicacion(), t); }) : [],
        };
        return acc;
      }, {})
    : {};

  merged.contenidoRRSS = Array.isArray(parsed.contenidoRRSS)
    ? parsed.contenidoRRSS.map(function (c) { return Object.assign(nuevoContenidoRRSS(), c); })
    : [];

  merged.cobros = Array.isArray(parsed.cobros)
    ? parsed.cobros.map(function (c) { return Object.assign(nuevoCobro(), c); })
    : [];

  merged.metaFinancieraPorDia = parsed.metaFinancieraPorDia && typeof parsed.metaFinancieraPorDia === "object"
    ? Object.keys(parsed.metaFinancieraPorDia).reduce(function (acc, fecha) {
        acc[fecha] = Object.assign(emptyMetaFinanciera(), parsed.metaFinancieraPorDia[fecha]);
        return acc;
      }, {})
    : {};

  merged.cierrePorDia = parsed.cierrePorDia && typeof parsed.cierrePorDia === "object"
    ? Object.keys(parsed.cierrePorDia).reduce(function (acc, fecha) {
        const saved = parsed.cierrePorDia[fecha] || {};
        const base2 = emptyCierreDia();
        acc[fecha] = Object.assign(base2, saved, {
          gratitud: Array.isArray(saved.gratitud) && saved.gratitud.length === 3 ? saved.gratitud : base2.gratitud,
        });
        return acc;
      }, {})
    : {};

  return merged;
}

/* ---------------- Utilidades genéricas ---------------- */

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
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  save(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* almacenamiento lleno o no disponible: no hacemos nada */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  },
};
