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
    contenido: [
      {
        h: "La Reflexión de los 3 Niveles",
        body: [
          "Responde a estas tres preguntas en un cuaderno personal, yendo cada vez más profundo:",
          "Nivel Superficial (lo material): ¿Qué quieres lograr económicamente? Ejemplo: pagar deudas, ganar 1.000 € extra al mes, cambiar el coche.",
          "Nivel Personal (el estilo de vida): si el dinero ya no fuera un problema, ¿cómo cambiaría tu día a día? Ejemplo: trabajar desde casa, no tener jefe, viajar dos veces al año.",
          "Nivel Emocional (la causa profunda): ¿a quién beneficia esto y cómo te hace sentir? Ejemplo: estar presente en la infancia de mis hijos, dar tranquilidad a mis padres, no sentir ansiedad a fin de mes.",
          "💡 Tu tarea de hoy: resume esas 3 respuestas en una sola frase, escríbela donde la veas todos los días y compártela con tu patrocinador.",
        ],
      },
      {
        h: "Escribe tu Escenario de Vida",
        body: [
          "Dibuja 4 cuadrantes y escribe una meta concreta en presente para cada pilar:",
          "Vivir Bien (salud, hogar, finanzas): ej. “Para diciembre de 2026 habré liquidado la tarjeta de crédito y reformado la cocina de mi casa”.",
          "Amar (familia y seres queridos): ej. “Tener todos los fines de semana libres, sin preocupaciones de trabajo, para pasarlos con mis hijos”.",
          "Aprender (desarrollo personal): ej. “Ver 1 video de CH.ATOMY al día y perder el miedo a hablar en público para fin de año”.",
          "Contribuir (impacto y legado): ej. “Donar el 5% de mis comisiones mensuales a un comedor social local”.",
          "Ejercicio de 10 minutos: elige 1 ejemplo de cada pilar, ponlo por escrito con una fecha orientativa.",
        ],
      },
      {
        h: "Conoce la Visión de Atomy (CH.ATOMY Europa)",
        body: [
          "Entra en ch.atomy.com/eu desde tu navegador o teléfono y cambia el idioma a Español desde el icono del globo terráqueo (esquina superior derecha).",
          "Explora los menús: Compañía/Visión (historia del fundador Han-Gill Park y respaldo científico de KAERI y Kolmar), Producto (skincare, salud, hogar), Negocio/Educación (plan de compensación, seminarios) y Miembro/Historias de Éxito (testimonios reales).",
          "Usa la lupa de búsqueda para temas específicos, por ejemplo “HemoHIM” o “Plan de Compensación”.",
          "Recomendación: dedica 15 minutos al día a ver 1 video de Compañía y 1 de Producto.",
        ],
      },
      {
        h: "Consumo Consciente: del gasto que se va, al gasto que vuelve",
        body: [
          "Toda la vida nos han enseñado un consumo automático: comprar higiene y cuidado personal cada mes, pagar la cuenta y volver a casa con la billetera vacía y ningún beneficio.",
          "En Atomy cada compra cotidiana (pasta dental, champú, detergente, suplementos) se convierte en Puntos de Valor (PV) que nunca caducan y se acumulan a tu favor.",
          "No se trata de gastar más ni comprar cosas innecesarias: es cambiar de dónde compras lo que ya compras siempre.",
          "Los ingresos que construyes con las comisiones son heredables hasta por tres generaciones: hoy te dan respiro económico, y con el tiempo se convierten en patrimonio para tus hijos y nietos.",
        ],
      },
    ],
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
    contenido: [
      {
        h: "Tu primer gran hito: 10.000 PV Personales (PVP)",
        body: [
          "Los PV (Puntos de Valor) son el valor que la empresa asigna a cada producto; los ves en azul debajo del precio en la tienda online.",
          "Con un par de productos básicos de uso diario (ej. un kit de cuidado bucal y un champú) ya alcanzas los 10.000 PVP.",
          "Alcanzar los 10.000 PVP es la llave que activa tu cuenta de socio: a partir de ahí tu perfil queda habilitado para acumular volumen de equipo y cobrar comisiones.",
        ],
      },
      {
        h: "Tu equipo binario: Línea Izquierda y Línea Derecha",
        body: [
          "No trabajas solo: con la ayuda de tu patrocinador vas construyendo tu estructura en dos líneas de consumo, Izquierda y Derecha.",
          "Cada vez que las personas de tu equipo compran para sus hogares, generan PV Grupales (PVG).",
          "Un “Ciclo” o “Ciclaje” ocurre cuando tu línea izquierda y tu línea derecha acumulan cada una 300.000 PVG: el sistema hace un “match” y la empresa paga una comisión directa a tu cuenta bancaria.",
        ],
      },
      {
        h: "Por qué la meta real son 300.000 PVP — ¡ganas el triple!",
        body: [
          "Con 10.000 PVP ya cobras cuando tus equipos hacen 300.000 PVG en cada lado: una comisión base de unos 15-20 € por ciclo.",
          "Al llegar tú personalmente a 300.000 PVP ganas el TRIPLE por exactamente el mismo trabajo del equipo: unos 50-60 € por ciclo.",
          "Tus PVP JAMÁS se borran ni se reinician: cada compra para tu casa se suma de por vida a las anteriores. No hay prisa ni presión.",
          "Resumen: 1) haz tu primer pedido para llegar a 10.000 PVP y activar tu cuenta; 2) sigue cambiando tus compras del súper a Atomy a tu ritmo hasta los 300.000 PVP mientras tus líneas crecen; 3) disfruta comisiones multiplicadas por tres.",
        ],
      },
      {
        h: "PV Personales vs. PV Grupales",
        body: [
          "PV Personales: los generas tú mismo comprando con tu ID. Nunca se borran. Habilitan tu cuenta y determinan tu nivel de cobro por ciclo.",
          "PV Grupales: los genera tu equipo (líneas Izquierda y Derecha). Se reinician únicamente tras pagar una comisión. Suman el consumo colectivo para liquidar comisiones.",
        ],
      },
    ],
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
    contenido: [
      {
        h: "De la teoría a la experiencia real",
        body: [
          "En Atomy no se recomienda “a ciegas”: se hace desde la honestidad y la vivencia propia como consumidor. Hoy toca poner la máquina en marcha.",
        ],
      },
      {
        h: "Elige tu primer pedido (tu consumo consciente)",
        body: [
          "Elige los productos que realmente necesitas reponer en casa hoy mismo (pasta de dientes, champú, detergente, suplementos). La meta es simple: probar la calidad de la marca para poder hablar con propiedad desde el día uno.",
        ],
      },
      {
        h: "Lista de 5 recomendaciones de bienestar",
        body: [
          "Piensa en 5 personas cercanas y sus necesidades: ¿alguien con piel sensible?, ¿alguien fatigado que quiera reforzar su sistema inmune?, ¿alguien que prefiera productos ecológicos para el hogar?",
          "Anota en tu cuaderno [Nombre] + [Producto que le podría ayudar]. Ejemplo: María → cansancio / sistema inmune → HemoHIM. Carlos → higiene facial cotidiana → línea Skincare.",
          "No les vendas nada aún: solo identifica cómo el catálogo puede aportarles valor.",
        ],
      },
      {
        h: "Prepara la expectativa en redes sociales",
        body: [
          "Genera expectativa de forma natural en tus redes o estados de WhatsApp, sin vender nada, solo compartiendo tu curiosidad como consumidor.",
          "Idea de publicación: “Llevaba tiempo buscando productos de higiene y cuidado personal más naturales, ecológicos y directos de fábrica sin pagar precios desorbitados. Acabo de descubrir una plataforma coreana que me ha sorprendido muchísimo por su calidad y acabo de hacer mi primer pedido. ¡Cuando me lleguen esta semana os cuento qué tal la experiencia!”",
        ],
      },
      {
        h: "Tu video de hoy",
        body: [
          "En CH.ATOMY Europa → menú Producto, mira el video de HemoHIM o de la línea Absolute/The Fame para entender la filosofía Masstige: calidad absoluta a precio absoluto.",
        ],
      },
    ],
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
    contenido: [
      {
        h: "Guion de 4 pasos para tu historia personal",
        body: [
          "Paso 1 — Tu antecedente: comparte tu situación previa (económica, de tiempo, de salud) con la que la otra persona se identifique. Ej.: “Llevaba tiempo sintiendo que los gastos del mes subían pero mis ingresos seguían igual...”",
          "Paso 2 — El descubrimiento: qué te llamó la atención de Atomy. Ej.: “...hasta que descubrí Atomy, una plataforma que me permite comprar higiene y salud directo de fábrica, con excelente calidad y la opción de generar beneficios por recomendar lo que ya uso.”",
          "Paso 3 — Tus primeros resultados o sensaciones. Ej.: “Empecé probando los productos en casa y la calidad nos encantó a todos; me dio ilusión ver que puedo construir un ingreso extra sin descuidar mi trabajo.”",
          "Paso 4 — Tu visión o invitación, sin presión. Ej.: “Mi meta es lograr tranquilidad económica para mi familia. No sé si esto sea para ti, pero me encantaría compartirte cómo funciona por si te sirve.”",
          "Fórmula resumida en 3 minutos: junta las 4 respuestas y léelas en voz alta para comprobar que suena a una conversación real, no a un guion corporativo.",
        ],
      },
      {
        h: "Guion de conexión sincera (mercado cercano)",
        body: [
          "Mensaje 1 — Romper el hielo: “¡Hola [Nombre]! ¿Cómo estás? Hace tiempo que no sabemos el uno del otro...” Solo reconectar, sin mencionar el proyecto todavía.",
          "Mensaje 2 — Sembrar curiosidad: cuenta, como algo cotidiano, que cambiaste tu forma de comprar productos de uso diario por otros ecológicos, de mejor calidad y directo de fábrica.",
          "Mensaje 3 — El gancho sin presión: menciona que el sistema también te permite generar beneficios económicos por recomendarlo, algo que el súper normal no ofrece.",
          "Mensaje 4 — La invitación: “No sé si sea algo para ti, pero si te da curiosidad, avísame y nos tomamos un café o hacemos una llamadita corta y te cuento de qué se trata.”",
          "Consejo de duplicación: practica tu historia en una reunión 1 a 1 con tu patrocinador y ajusten juntos cualquier frase que suene demasiado formal o corporativa.",
        ],
      },
    ],
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
    contenido: [
      {
        h: "Tu plan de trabajo sostenible",
        body: [
          "El objetivo es que Atomy se adapte a tu vida, no que tu vida se complique por Atomy. Solo son 4 cosas rápidas hoy.",
          "Meta a 30 días: una meta pequeña y alcanzable para tu primer mes. Ej.: “Probar 3 productos y registrar a mis primeros 2 consumidores”.",
          "Tus huecos de valor: no necesitas 8 horas al día. Busca 3-4 horas libres en tu semana (ej. 30 min al salir del trabajo o un rato el fin de semana) y bloquéalas en tu calendario.",
          "Tu cita semanal: agenda una llamada corta y fija de 15-20 minutos con tu mentor para ver avances, resolver dudas y ajustar lo que necesites.",
          "15 minutos de aprendizaje diario: continúa viendo contenido de CH.ATOMY Europa a tu ritmo, como ya vienes haciendo desde el Día 1.",
          "💡 Consejo: un proyecto constante de 3 horas a la semana da 100 veces más resultado que un maratón de un solo día. Hazlo a tu ritmo.",
        ],
      },
    ],
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
    contenido: [
      {
        h: "Compromiso ético",
        body: [
          "Trabajar en Atomy se basa en el respeto total al consumidor: cero presiones, cero engaños y coherencia absoluta usando lo que recomendamos.",
        ],
      },
      {
        h: "Fecha de revisión mensual",
        body: [
          "Fija desde ya un día al mes para revisar cómo va creciendo tu equipo, qué está funcionando y ajustar el rumbo juntos si surge algún bloqueo.",
        ],
      },
      {
        h: "Aprende a duplicar",
        body: [
          "Este proceso de 6 días no te lo quedes para ti: cuando registres a tu primer socio, acompáñalo a recorrer exactamente el mismo arranque.",
        ],
      },
      {
        h: "Tu video de cierre",
        body: [
          "En CH.ATOMY Europa → menú Compañía, busca un video sobre la Cultura Atomy o la Filosofía del Fundador Han-Gill Park: honestidad y servicio al cliente.",
          "¡Con esto completas tu primera semana de entrenamiento! No buscamos vender desesperadamente, sino educar a un consumidor satisfecho y acompañar a otros a lograr sus metas con honestidad.",
        ],
      },
    ],
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
  { n: 6, nombre: "Última Ascensión", semanas: "11-12", foco: "Calificación a Sales Master", detalle: "5.000.000 PV Grupales por línea" },
];

/* Checklist semanal de los 90 días (tabla oficial de verificación).
   Cada semana pertenece a una quincena (q) y trae sus propias
   "acciones clave" extraídas del plan cronológico. */
const SEMANAS = [
  {
    n: 1, q: 1, metaPV: "100.000 PV", metaContactos: "10 agregados a la lista", paso: "Paso 1 y 2: Metas y Determinación",
    acciones: [
      "Acumular un mínimo de 100.000 PV Personales probando productos clave.",
      "Registrar y estructurar los primeros 50 nombres en la Lista de 250 Contactos.",
      "Asistir al One Day Seminar y conectarme al sistema de eventos.",
      "Asistir a las formaciones de Zoom del equipo.",
    ],
  },
  {
    n: 2, q: 1, metaPV: "100.000 PV", metaContactos: "15 agregados a la lista", paso: "Paso 3: Lista de 250 Contactos",
    acciones: [
      "Grabar o redactar 1 testimonio de producto personal.",
      "Registrar a 5 socios nuevos (pido ayuda a mi patrocinador para este paso).",
      "Registrar a los primeros socios en las líneas Izquierda y Derecha.",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer seguimiento riguroso dentro de las 48 horas a todos los contactos presentados.",
    ],
  },
  {
    n: 3, q: 2, metaPV: "200.000 PV", metaContactos: "5 Llamadas / Invitaciones", paso: "Paso 4: Invitaciones Efectivas",
    acciones: [
      "Alcanzar 200.000 PV Personales mediante cambio de supermercado de consumo en el hogar.",
      "Realizar 20 llamadas de invitación aplicando la regla de la mente propia.",
    ],
  },
  {
    n: 4, q: 2, metaPV: "200.000 PV", metaContactos: "5 Presentaciones realizadas", paso: "Paso 5: Show the Business",
    acciones: [
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
    ],
  },
  {
    n: 5, q: 3, metaPV: "300.000 PV", metaContactos: "Seguimiento en 48 Horas", paso: "Paso 6: Seguimiento Sólido",
    acciones: [
      "Completar los 300.000 PV Personales para maximizar el cobro de comisiones.",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
    ],
  },
  {
    n: 6, q: 3, metaPV: "300.000 PV", metaContactos: "Consolidación de consumo", paso: "Paso 7: Consultoría con Mentor",
    acciones: [
      "Asegurar que cada línea activa cuente con al menos 4 consumidores recurrentes.",
      "Identificar 4 líderes de mi estructura: 2 en cada línea.",
    ],
  },
  {
    n: 7, q: 4, metaPV: "300.000 PV", metaContactos: "2 Nuevos socios guiados", paso: "Paso 8: Duplicación de Bases",
    acciones: [
      "Reunirme con mi patrocinador para analizar el balance de PV de la línea izquierda y derecha.",
      "Formar a los 4 líderes detectados en mis líneas descendentes.",
    ],
  },
  {
    n: 8, q: 4, metaPV: "300.000 PV", metaContactos: "Organizar mini Zoom/Reunión", paso: "Paso 5 y 8: Presentación e Impacto",
    acciones: [
      "Organizar una mini reunión de hogar o Zoom grupal apoyando a los socios descendentes.",
    ],
  },
  {
    n: 9, q: 5, metaPV: "300.000 PV", metaContactos: "Revisión de volumen grupal", paso: "Paso 7: Consultoría de Red",
    acciones: [
      "Evaluar el mapa de la organización: asegurar que los socios comprometidos estén duplicando las presentaciones sencillas.",
    ],
  },
  {
    n: 10, q: 5, metaPV: "300.000 PV", metaContactos: "Alineación con líderes clave", paso: "Paso 1 y 2: Reafirmar Compromiso",
    acciones: [
      "Intensificar las interacciones en redes sociales para mantener alimentada la lista de contactos.",
      "Planificar la compra estratégica y la proyección de volumen para el ciclo de calificación de Sales Master.",
    ],
  },
  {
    n: 11, q: 6, metaPV: "300.000 PV+", metaContactos: "Cierre quincenal activo", paso: "Ejecución de Estrategia de Rango",
    acciones: [
      "Coordinar el consumo colectivo con el equipo para alcanzar 2.500.000 PVG en la línea izquierda y 2.500.000 PVG en la línea derecha.",
      "Asignar compras personales estratégicas en la línea con menor volumen según las normas de la compañía.",
    ],
  },
  {
    n: 12, q: 6, metaPV: "700.000 PV Personales", metaContactos: "2,5M PVG Izq / 2,5M PVG Der", paso: "¡LOGRO DE SALES MASTER!",
    acciones: [
      "Celebrar la consecución de la Maestría, edificar el trabajo en equipo y preparar el siguiente ciclo de crecimiento.",
    ],
  },
];

const CONTACTO_NIVELES = ["Caliente", "Tibio", "Frío"];
const CONTACTO_ESTADOS = ["Por contactar", "Contactado", "Presentado", "Seguimiento", "Socio", "Consumidor", "Descartado"];

const PREMIOS_DEFECTO = [
  { hito: "Alcanzar 300.000 PVP", premio: "Set de 4 Pasos de regalo", imagen: null },
  { hito: "2 ciclos de 300.000 PVG en una quincena", premio: "Crema nutritiva de oro", imagen: null },
  { hito: "Sales Master en 45 días", premio: "Set FAME", imagen: null },
];

const RANGOS = [
  { nombre: "Consumidor Consciente", meta: "Tu punto de partida", pv: "0 PVP", tier: 1 },
  { nombre: "Representante de Ventas", meta: "10.000 PV personales", pv: "10.000 PVP", tier: 1 },
  { nombre: "Agente", meta: "300.000 PV personales", pv: "300.000 PVP", tier: 2 },
  { nombre: "Agente Especial", meta: "700.000 PV personales", pv: "700.000 PVP", tier: 2 },
  { nombre: "Sales Master", meta: "5.000.000 PV grupales por línea", pv: "5.000.000 PVG", tier: 3 },
];

const MENSAJE_BIENVENIDA =
  "Bienvenido a este recorrido al éxito. Está diseñado para que disfrutes del recorrido, compartas tus progresos y consultes tus dudas o dificultades que puedas encontrar. ¡Adelante!";
