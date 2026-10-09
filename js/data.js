/* ---------------------------------------------------------------
   CONTENIDO — textos, catálogos y plantillas de Día de Impacto
--------------------------------------------------------------- */

const MENU_ITEMS = [
  { id: "home", label: "Inicio", icon: "sun" },
  { id: "dia", label: "Mi Día", icon: "compass" },
  { id: "prospeccion", label: "Prospección", icon: "phone-call" },
  { id: "equipo", label: "Equipo", icon: "users" },
  { id: "comunicacion", label: "Comunicación", icon: "mail" },
  { id: "redes", label: "Redes Sociales", icon: "image" },
  { id: "finanzas", label: "Finanzas", icon: "dollar-sign" },
  { id: "cierre", label: "Cierre del Día", icon: "moon" },
  { id: "ajustes", label: "Ajustes", icon: "settings" },
];

const MENSAJE_BIENVENIDA =
  "Cada jornada bien planificada es un paso de impacto. Organiza tu día en bloques claros — prospectar, formar, liderar, comunicar, crear y facturar — y ciérralo siempre con una reflexión. Así tu negocio avanza aunque el día se complique.";

/* ---------------- Categorías de bloques del día ---------------- */

const CATEGORIAS = [
  { id: "prospeccion", label: "Prospección", icon: "phone-call", color: "coral" },
  { id: "formacion", label: "Formación", icon: "book-open", color: "teal" },
  { id: "liderazgo", label: "Liderazgo", icon: "user-star", color: "violet" },
  { id: "comunicacion", label: "Comunicación", icon: "mail", color: "sky" },
  { id: "contenido", label: "Contenido / RRSS", icon: "image", color: "gold" },
  { id: "facturacion", label: "Facturación", icon: "dollar-sign", color: "mint" },
  { id: "personal", label: "Energía personal", icon: "battery", color: "rose" },
  { id: "admin", label: "Administración", icon: "clipboard", color: "slate" },
];

function categoriaInfo(id) {
  return CATEGORIAS.find(function (c) { return c.id === id; }) || CATEGORIAS[CATEGORIAS.length - 1];
}

/* ---------------- Plantilla sugerida de jornada ---------------- */

const PLANTILLA_JORNADA = [
  { hora: "07:30", categoria: "personal", titulo: "Rutina de energía: movimiento, respiración, intención del día" },
  { hora: "08:30", categoria: "comunicacion", titulo: "Revisar y responder mensajes y correos urgentes" },
  { hora: "09:30", categoria: "prospeccion", titulo: "Bloque de prospección: llamadas y mensajes a nuevos contactos" },
  { hora: "11:00", categoria: "formacion", titulo: "Formar o acompañar a un miembro del equipo" },
  { hora: "12:30", categoria: "contenido", titulo: "Crear o programar contenido para redes sociales" },
  { hora: "15:00", categoria: "liderazgo", titulo: "Reunión o seguimiento con el equipo" },
  { hora: "17:00", categoria: "facturacion", titulo: "Revisar ventas, cobros y metas del día" },
  { hora: "19:00", categoria: "admin", titulo: "Organizar pendientes administrativos" },
];

/* ---------------- Frases motivacionales (rotan por fecha) ---------------- */

const FRASES_MOTIVACION = [
  "Un emprendedor no espera el momento perfecto: construye el momento con cada jornada.",
  "No necesitas un gran día. Necesitas una buena hora, repetida con disciplina.",
  "Tu negocio crece en la suma de pequeñas acciones constantes, no en los golpes de suerte.",
  "Cada llamada que haces hoy es una semilla que no ves crecer todavía.",
  "Liderar es decidir primero, para que otros se atrevan después.",
  "El orden de tu día es el espejo del rumbo de tu negocio.",
  "No se trata de hacer más cosas, sino de hacer las correctas primero.",
  "Tu energía de hoy es el capital más valioso que tienes — cuídala como cuidas tus ventas.",
  "Equipo que se siente acompañado, produce más que equipo que se siente solo.",
  "Publicar con intención vale más que publicar con prisa.",
  "La constancia no se nota en un día, se nota en un año de días como hoy.",
  "Cerrar el día con una reflexión es la forma más barata de mejorar mañana.",
  "El cliente que hoy ignoras, mañana lo atiende tu competencia.",
  "No le temas al día difícil: tu plan ya sabe qué hacer con él.",
  "Un buen líder termina el día preguntando a quién ayudó, no solo qué vendió.",
  "El contenido que creas hoy sigue trabajando por ti mucho después de publicarlo.",
  "Factura hoy lo que sembraste ayer — por eso nunca dejes de sembrar.",
  "La claridad vence al caos: escribe tu plan antes de que el día lo escriba por ti.",
  "Tus primeros 90 minutos definen el tono del resto del día. Elige bien.",
  "El descanso también es estrategia — un emprendedor agotado decide peor.",
];

function fraseDelDia(fechaISO) {
  let hash = 0;
  for (let i = 0; i < fechaISO.length; i++) hash = (hash * 31 + fechaISO.charCodeAt(i)) >>> 0;
  return FRASES_MOTIVACION[hash % FRASES_MOTIVACION.length];
}

/* ---------------- Redes sociales ---------------- */

const PLATAFORMAS_RRSS = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "YouTube" },
  { id: "newsletter", label: "Email / Newsletter" },
  { id: "otra", label: "Otra red" },
];

const ESTADOS_CONTENIDO = ["Idea", "Borrador", "Listo", "Publicado"];

/* ---------------- Prospección y comunicación ---------------- */

const MEDIOS_CONTACTO = ["Llamada", "Mensaje", "Email", "En persona"];

const ESTADOS_COBRO = ["Pendiente", "Enviado", "Cobrado"];

/* ---------------- Reflexión de cierre ---------------- */

const PREGUNTAS_CIERRE = [
  "¿Qué fue lo más importante que lograste hoy?",
  "¿Qué podrías mejorar mañana?",
  "¿Cuál es tu prioridad número 1 para mañana?",
];
