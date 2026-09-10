/* ---------------------------------------------------------------
   ESTADO Y PERSISTENCIA — 100% local (localStorage), sin backend
--------------------------------------------------------------- */

const STORAGE_KEY = "cumbre-master-estado-v1";

function defaultState() {
  return {
    onboarded: false,
    nombre: "",
    foto: null,
    dark: false,
    whatsapp: "",
    rangoActualIndex: 0,
    racha: 0,
    ultimaFecha: null,
    actividad: [],
    quincenas: {},
  };
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------------- quincenas (1–15 y 16–fin de mes) ---------------- */

const MESES_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function quincenaKeyFromDate(d) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const half = d.getDate() <= 15 ? 1 : 2;
  return y + "-" + String(m).padStart(2, "0") + "-" + half;
}

function quincenaActualKey() {
  return quincenaKeyFromDate(new Date());
}

function parseQuincenaKey(key) {
  const parts = key.split("-").map(Number);
  return { year: parts[0], month: parts[1], half: parts[2] };
}

function quincenaBounds(key) {
  const { year, month, half } = parseQuincenaKey(key);
  const start = new Date(year, month - 1, half === 1 ? 1 : 16);
  const end = half === 1 ? new Date(year, month - 1, 15) : new Date(year, month, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return { start, end };
}

function quincenaLabel(key) {
  const { year, month, half } = parseQuincenaKey(key);
  return (half === 1 ? "1–15" : "16–fin") + " de " + MESES_ES[month - 1] + " " + year;
}

function quincenaAdyacente(key, delta) {
  const { year, month, half } = parseQuincenaKey(key);
  let h = half + delta, m = month, y = year;
  while (h > 2) { h -= 2; m += 1; if (m > 12) { m = 1; y += 1; } }
  while (h < 1) { h += 2; m -= 1; if (m < 1) { m = 12; y -= 1; } }
  return y + "-" + String(m).padStart(2, "0") + "-" + h;
}

function diasRestantesQuincena(key) {
  const { end } = quincenaBounds(key);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((end - hoy) / 86400000) + 1);
}

function esQuincenaActual(key) {
  return key === quincenaActualKey();
}

/* ---------------- listas Izquierda / Derecha por quincena ---------------- */

function nuevaPersona() {
  return { id: "p" + Math.random().toString(36).slice(2, 9), nombre: "", telefono: "", atomyId: "", contrasena: "", pvp: 0, puntos: 0, fecha: null, verificado: false, notas: "" };
}

function emptyQuincena() {
  return { izquierda: [], derecha: [], otrosIzquierda: 0, otrosDerecha: 0, reunionHecha: false };
}

function getQuincena(state, key) {
  if (!state.quincenas[key]) state.quincenas[key] = emptyQuincena();
  return state.quincenas[key];
}

/* Lectura sin mutar el estado (para usar dentro de las vistas). */
function peekQuincena(state, key) {
  return state.quincenas[key] || emptyQuincena();
}

function sumaLinea(quincena, linea, soloVerificado) {
  const lista = quincena[linea] || [];
  const base = Number(linea === "izquierda" ? quincena.otrosIzquierda : quincena.otrosDerecha) || 0;
  return lista.reduce(function (acc, p) {
    if (soloVerificado && !p.verificado) return acc;
    return acc + (Number(p.puntos) || 0);
  }, base);
}

/* ---------------- rachas / utilidades compartidas ---------------- */

function calcularRacha(racha, ultimaFecha) {
  const hoy = hoyISO();
  if (ultimaFecha === hoy) return { racha: racha || 1, ultimaFecha: hoy };
  const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (ultimaFecha === ayer) return { racha: (racha || 0) + 1, ultimaFecha: hoy };
  return { racha: 1, ultimaFecha: hoy };
}

function hydrateState(parsed) {
  const base = defaultState();
  if (!parsed) return base;
  const merged = Object.assign({}, base, parsed);

  const quincenasSaved = parsed.quincenas && typeof parsed.quincenas === "object" ? parsed.quincenas : {};
  merged.quincenas = Object.keys(quincenasSaved).reduce(function (acc, key) {
    const saved = quincenasSaved[key] || {};
    const izquierda = Array.isArray(saved.izquierda) ? saved.izquierda.map(function (p) { return Object.assign(nuevaPersona(), p); }) : [];
    const derecha = Array.isArray(saved.derecha) ? saved.derecha.map(function (p) { return Object.assign(nuevaPersona(), p); }) : [];
    acc[key] = { izquierda: izquierda, derecha: derecha, otrosIzquierda: Number(saved.otrosIzquierda) || 0, otrosDerecha: Number(saved.otrosDerecha) || 0, reunionHecha: !!saved.reunionHecha };
    return acc;
  }, {});

  merged.actividad = Array.isArray(parsed.actividad) ? parsed.actividad : [];
  merged.rangoActualIndex =
    typeof parsed.rangoActualIndex === "number" && parsed.rangoActualIndex >= 0 && parsed.rangoActualIndex < RANGOS_MASTER.length
      ? parsed.rangoActualIndex
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
