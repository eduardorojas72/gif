/* ---------------------------------------------------------------
   CONTENIDO — 8 Pasos, Plan de 6 Días, Plan de 90 Días
--------------------------------------------------------------- */

const OCHO_PASOS = [
  { n: 1, t: "Establecer metas u objetivos (MBO)", d: "Diseña tu “vida balanceada”: vivir bien, amar, aprender y contribuir.", icon: "target" },
  { n: 2, t: "Tener determinación inquebrantable", d: "Autonomía frente a terceros, pensamiento positivo y disposición a pagar el precio del esfuerzo.", icon: "flame" },
  { n: 3, t: "Hacer una lista de contactos", d: "Construye una lista activa de mínimo 250 personas, sin juzgar su potencial inicial.", icon: "clipboard-list" },
  { n: 4, t: "Hacer llamadas e invitaciones", d: "Enfocadas en agendar citas y generar curiosidad sincera, no en presentar por teléfono.", icon: "phone-call" },
  { n: 5, t: "Explicar el negocio (Show the Business)", d: "Compañía, Productos, Plan de Compensación y Visión Global.", icon: "presentation" },
  { n: 6, t: "Seguimiento (Regla de las 48 Horas)", d: "Contacta al prospecto dentro de las primeras 48 horas tras la presentación.", icon: "clock" },
  { n: 7, t: "Consultoría y asesoramiento", d: "Reúnete con tu línea ascendente y descendente para analizar bloqueos y reajustar.", icon: "users" },
  { n: 8, t: "Duplicación", d: "Sé un modelo íntegro: consumidor fiel, conectado al sistema de eventos, sirviendo con humildad.", icon: "repeat" },
];

const DIAS = [
  {
    id: 1,
    etapa: "La Visión",
    icono: "eye",
    titulo: "Define tu “Por qué”",
    objetivo: "Reconectar con tu motivación profunda y entender el Consumo Consciente.",
    campos: [{ key: "porque", label: "Tu “Por qué” en una frase" }],
    checklist: [
      "Definí mis 3 razones principales (mi “Por qué”).",
      "Revisé el catálogo e identifiqué mis primeros productos para sustituir en casa.",
      "Vi la presentación oficial de la visión de Atomy.",
      "Vi al menos un video relacionado con la Compañía Atomy.",
    ],
    quiz: {
      pregunta: "¿En qué se convierten tus compras diarias dentro de Atomy?",
      opciones: ["En gastos que no vuelven", "En Puntos de Valor (PV) que no caducan", "En un descuento temporal"],
      correcta: 1,
    },
  },
  {
    id: 2,
    etapa: "El Equipo",
    icono: "users",
    titulo: "El Plan de Compensación y el Binario",
    objetivo: "Comprender cómo el consumo coordinado en dos líneas genera prosperidad financiera.",
    campos: [],
    nota: "Recuerda tus dos grandes hitos: 10.000 PVP (activa tu cuenta) y 300.000 PVP (triplicas tu comisión por ciclo). Tus PV personales nunca se borran ni se reinician.",
    checklist: [
      "Entendí la importancia de alcanzar primero 10.000 PV y proyectar los 300.000 PV personales.",
      "Comprendí el funcionamiento del equilibrio binario (Izquierda / Derecha).",
      "Realicé la simulación de mis primeros 4 consumos referidos.",
      "Vi al menos un video sobre el Plan de Compensación.",
    ],
    quiz: {
      pregunta: "¿Cuál es tu primer gran hito para activar tu cuenta?",
      opciones: ["300.000 PV Grupales", "10.000 PV Personales", "50 contactos nuevos"],
      correcta: 1,
    },
  },
  {
    id: 3,
    etapa: "El Producto",
    icono: "package",
    titulo: "De la Experiencia a la Recomendación",
    objetivo: "Enamorarte de los productos y compartir recomendaciones genuinas sin presiones.",
    campos: [
      { key: "rec1", label: "Recomendación 1 — nombre y producto" },
      { key: "rec2", label: "Recomendación 2 — nombre y producto" },
      { key: "rec3", label: "Recomendación 3 — nombre y producto" },
      { key: "rec4", label: "Recomendación 4 — nombre y producto" },
      { key: "rec5", label: "Recomendación 5 — nombre y producto" },
    ],
    checklist: [
      "Elegí y compré mis primeros productos de uso personal.",
      "Hice mi lista de 5 amigos/familiares y los productos que podrían ayudarles.",
      "Publiqué mi post/historia de expectativa en redes sociales.",
      "Vi el video sobre Producto/Masstige en CH.ATOMY Europa.",
    ],
    quiz: {
      pregunta: "¿Cuántas recomendaciones de bienestar identificas hoy?",
      opciones: ["3", "5", "10"],
      correcta: 1,
    },
  },
  {
    id: 4,
    etapa: "El Relato",
    icono: "book-open",
    titulo: "El Arte de Invitar (Storytelling)",
    objetivo: "Invitar sin presionar y compartir tu historia personal con naturalidad.",
    campos: [
      { key: "hist1", label: "1. Tu antecedente (¿dónde estabas?)" },
      { key: "hist2", label: "2. El descubrimiento (¿qué encontraste en Atomy?)" },
      { key: "hist3", label: "3. Tus primeros resultados o sensaciones" },
      { key: "hist4", label: "4. Tu visión o invitación (¿hacia dónde vas?)" },
    ],
    checklist: [
      "Estructuré mi historia personal de 3 minutos.",
      "Clasifiqué mis primeros 30 nombres en la Lista de 250.",
      "Realicé mis primeras 5 invitaciones sinceras.",
      "Vi al menos un video relacionado con la Compañía Atomy.",
    ],
    quiz: {
      pregunta: "¿Cuántos pasos tiene tu historia personal (storytelling)?",
      opciones: ["2", "4", "6"],
      correcta: 1,
    },
  },
  {
    id: 5,
    etapa: "La Dirección",
    icono: "compass",
    titulo: "Plan de Acción Semanal",
    objetivo: "Organizar tu semana de forma sostenible, sin agobios.",
    campos: [
      { key: "meta30", label: "Meta a 30 días" },
      { key: "horas", label: "Horas bloqueadas para el proyecto (día y hora)" },
      { key: "llamada", label: "Día y hora de tu llamada semanal con tu mentor" },
    ],
    checklist: [
      "Definí mi meta a 30 días.",
      "Bloqueé mis horas de trabajo semanal.",
      "Coordiné mi llamada semanal con mi mentor.",
      "Vi 1 video de la Compañía en CH.ATOMY Europa.",
    ],
    quiz: {
      pregunta: "¿Qué agendas hoy con tu mentor?",
      opciones: ["Una reunión diaria obligatoria", "Una llamada corta semanal de 15-20 min", "Nada, no hace falta"],
      correcta: 1,
    },
  },
  {
    id: 6,
    etapa: "El Impacto",
    icono: "trending-up",
    titulo: "Liderazgo Ético y Duplicación",
    objetivo: "Cerrar tu primera semana con bases firmes y listas para duplicar.",
    campos: [],
    checklist: [
      "Asumí el compromiso ético: cero presión, transparencia total, coherencia consumiendo lo que recomiendo.",
      "Marqué en mi agenda un día al mes para revisar mi equipo.",
      "Tengo a mano este plan de 6 días para guiar a mi primer socio.",
      "Vi un video sobre la Cultura Atomy o la Filosofía del Fundador.",
    ],
    quiz: {
      pregunta: "¿Cuál es uno de los 3 pilares del compromiso ético?",
      opciones: ["Vender rápido sin explicar", "Cero presión y transparencia total", "Presionar al consumidor"],
      correcta: 1,
    },
  },
];

const QUINCENAS = [
  { n: 1, nombre: "Cimientos", semanas: "1-2", foco: "Cimentación y testimonio personal", detalle: "100.000 PV · primeros 50 contactos · 1 testimonio" },
  { n: 2, nombre: "Primer Impulso", semanas: "3-4", foco: "Activación de invitaciones", detalle: "200.000 PV · 20 llamadas · 5 socios nuevos" },
  { n: 3, nombre: "Paso Firme", semanas: "5-6", foco: "Consolidación y seguimiento 48h", detalle: "300.000 PV · seguimiento riguroso a presentados" },
  { n: 4, nombre: "Consejo de Guías", semanas: "7-8", foco: "Consultoría de red", detalle: "Reunión con patrocinador · identificar 2+2 líderes" },
  { n: 5, nombre: "La Gran Duplicación", semanas: "9-10", foco: "Duplicación y ajuste", detalle: "Evaluar organización · intensificar RRSS" },
  { n: 6, nombre: "Última Ascensión", semanas: "11-12", foco: "Calificación a Sales Master", detalle: "2.500.000 PV Grupales por línea" },
];

const PREMIOS_DEFECTO = [
  { hito: "Alcanzar 300.000 PVP", premio: "Set de 4 Pasos de regalo", imagen: null },
  { hito: "2 ciclos de 300.000 PVG en una quincena", premio: "Crema nutritiva de oro", imagen: null },
  { hito: "Sales Master en 45 días", premio: "Set FAME", imagen: null },
];

const RANGOS = [
  { nombre: "Consumidor Consciente", meta: "Tu punto de partida", pv: "0 PV", tier: 1 },
  { nombre: "Representante de Ventas", meta: "10.000 PV personales", pv: "10.000 PV", tier: 1 },
  { nombre: "Agente", meta: "300.000 PV personales", pv: "300.000 PV", tier: 2 },
  { nombre: "Agente Especial", meta: "700.000 PV personales", pv: "700.000 PV", tier: 2 },
  { nombre: "Sales Master", meta: "2.500.000 PV grupales por línea", pv: "2.500.000 PV", tier: 3 },
];

const MENSAJE_BIENVENIDA =
  "Bienvenido a este recorrido al éxito. Está diseñado para que disfrutes del recorrido, compartas tus progresos y consultes tus dudas o dificultades que puedas encontrar. ¡Adelante!";
