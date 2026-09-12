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
    pais: "CO",
    catalogoProductos: { CO: emptyCatalogoProductosPais("CO") },
    agenda: emptyAgenda(),
    notifOn: true,
    notifUltimoAviso: null,
    registroDiario: {},
    idiomaInforme: "es",
    arbolGenealogico: emptyArbolGenealogico(),
    llamadasSOS: [],
    contactosEventos: [],
  };
}

/* ---------------- Informe Semanal — registro diario de acciones ---------------- */

function emptyRegistroDia() {
  return { llamadas: 0, mensajes: 0, presentaciones: 0, reuniones: 0 };
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

function sumarRegistroSemana(state) {
  const dias = ultimos7Dias();
  const total = emptyRegistroDia();
  dias.forEach(function (f) {
    const d = state.registroDiario[f];
    if (!d) return;
    total.llamadas += Number(d.llamadas) || 0;
    total.mensajes += Number(d.mensajes) || 0;
    total.presentaciones += Number(d.presentaciones) || 0;
    total.reuniones += Number(d.reuniones) || 0;
  });
  return total;
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
  return { izquierda: [], derecha: [], otrosIzquierda: 0, otrosDerecha: 0, reunionHecha: false, compras: {} };
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

/* ---------------- Mi Árbol Genealógico, Llamadas S.O.S. y Lista de Contactos (eventos) ---------------- */

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
    acc[key] = {
      izquierda: izquierda, derecha: derecha,
      otrosIzquierda: Number(saved.otrosIzquierda) || 0, otrosDerecha: Number(saved.otrosDerecha) || 0,
      reunionHecha: !!saved.reunionHecha,
      compras: saved.compras && typeof saved.compras === "object" ? saved.compras : {},
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

  merged.registroDiario = parsed.registroDiario && typeof parsed.registroDiario === "object"
    ? Object.keys(parsed.registroDiario).reduce(function (acc, f) {
        acc[f] = Object.assign(emptyRegistroDia(), parsed.registroDiario[f]);
        return acc;
      }, {})
    : {};

  merged.idiomaInforme = IDIOMAS_INFORME.some(function (i) { return i.id === parsed.idiomaInforme; }) ? parsed.idiomaInforme : "es";

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
