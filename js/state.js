/* ---------------------------------------------------------------
   ESTADO Y PERSISTENCIA — 100% local (localStorage), sin backend
--------------------------------------------------------------- */

const STORAGE_KEY = "cumbre90-estado-v1";

function emptyDayState(diaId) {
  const dia = DIAS.find((d) => d.id === diaId);
  return { done: false, quizOk: false, quizSel: null, fields: {}, checks: dia.checklist.map(() => false) };
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
    dias: DIAS.reduce((acc, d) => ({ ...acc, [d.id]: emptyDayState(d.id) }), {}),
    quincenas: QUINCENAS.reduce((acc, q) => ({ ...acc, [q.n]: false }), {}),
  };
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
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

  merged.quincenas = QUINCENAS.reduce((acc, q) => {
    acc[q.n] = !!(parsed.quincenas && parsed.quincenas[q.n]);
    return acc;
  }, {});

  merged.premios =
    Array.isArray(parsed.premios) && parsed.premios.length
      ? parsed.premios.map((p) => Object.assign({ hito: "", premio: "", imagen: null }, p))
      : PREMIOS_DEFECTO.map((p) => Object.assign({ imagen: null }, p));

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
