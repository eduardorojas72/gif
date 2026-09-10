/* ---------------------------------------------------------------
   CONTENIDO — 8 Pasos, Plan de 6 Días, Plan de 90 Días
--------------------------------------------------------------- */

const OCHO_PASOS = [
  {
    n: 1, t: "Establecer metas u objetivos (MBO)", d: "Diseña tu “vida balanceada”: vivir bien, amar, aprender y contribuir.", icon: "target",
    accion: "Escribir el Escenario de Vida", objetivo: "Claridad de visión y propósito",
    explicacion: "Una vida balanceada en Atomy se divide en cuatro pilares: Vivir bien (necesidades físicas y económicas), Amar (relaciones y familia), Aprender (intelecto y crecimiento) y Contribuir (ayuda social y espiritualidad). Las metas deben ser realistas pero ambiciosas, escritas con claridad y acompañadas de fechas límite.",
    ejemplo: "No basta con decir “quiero una casa”. Debes definir: “Viviré en una casa de 200 m² en la zona norte de [lugar], con 4 habitaciones, de color blanco y acabados en madera, para el [fecha]”. Otro ejemplo es establecer un monto exacto de apoyo para tus padres, como enviarles una cantidad específica de dinero cada mes junto con suplementos de la empresa.",
  },
  {
    n: 2, t: "Tener determinación inquebrantable", d: "Autonomía frente a terceros, pensamiento positivo y disposición a pagar el precio del esfuerzo.", icon: "flame",
    accion: "Decisión de pagar el precio", objetivo: "Resiliencia ante obstáculos",
    explicacion: "La determinación implica tres aspectos: una actitud proactiva (ser el dueño del negocio), pensamientos positivos (enfocarse en la solución) y la disposición a “pagar el precio”. Nada de valor se consigue sin esfuerzo inicial. La “ley del despegue” indica que un cohete gasta la mayor parte de su combustible al inicio para romper la gravedad; lo mismo ocurre en el negocio.",
    ejemplo: "Si un familiar cercano rechaza tu propuesta, tu determinación debe permitirte seguir adelante sin que eso afecte tu estado de ánimo. Implica también sacrificar horas de entretenimiento para asistir a los “One Day Seminar” o a la Academia del Éxito, entendiendo que ese tiempo es una inversión para tu libertad futura.",
  },
  {
    n: 3, t: "Hacer una lista de contactos", d: "Construye una lista activa de mínimo 250 personas, sin juzgar su potencial inicial.", icon: "clipboard-list",
    accion: "Anotar a todos sin juzgar", objetivo: "Identificar el capital humano",
    explicacion: "El error común es “prejuzgar”. La Ley de la Mente Propia dice que nosotros solo debemos informar; la decisión de si les interesa o no es de ellos. Tu lista debe incluir a todas las personas que conoces, pues todos utilizan productos de aseo personal o cosméticos. No busques solo “vendedores”, busca consumidores.",
    ejemplo: "Toma tu teléfono móvil y anota a todos: familiares, excompañeros de escuela, vecinos y amigos del gimnasio. Si conoces a alguien que crees que “no tiene dinero”, anótalo igual; quizás necesite la oportunidad de negocio. Si conoces a alguien “muy rico”, anótalo; quizás quiera mejorar su salud con productos de calidad absoluta.",
  },
  {
    n: 4, t: "Hacer llamadas e invitaciones", d: "Enfocadas en agendar citas y generar curiosidad sincera, no en presentar por teléfono.", icon: "phone-call",
    accion: "Llamadas diarias constantes", objetivo: "Agendar citas y presentaciones",
    explicacion: "La invitación no es la presentación del negocio. Es el proceso de generar curiosidad y asegurar una cita. El Presidente Park sugiere que la constancia es vital: si hablas con 10 personas al día, tu negocio crecerá inevitablemente. La brevedad es tu mejor aliada en este punto.",
    ejemplo: "Una llamada efectiva podría sonar así: “Hola, encontré una línea de productos coreanos de altísima calidad que estoy usando y me han encantado, ¿podemos vernos 15 minutos el [día] para que los pruebes?”. Evita dar demasiada información por teléfono para no saturar al invitado.",
  },
  {
    n: 5, t: "Explicar el negocio (Show the Business)", d: "Compañía, Productos, Plan de Compensación y Visión Global.", icon: "presentation",
    accion: "Show the Plan (STP)", objetivo: "Mostrar la oportunidad Atomy",
    explicacion: "La presentación debe cubrir cuatro puntos: La Empresa (respaldo de KAERI y Kolmar BNH), Los Productos (el concepto “Masstige”: Masa + Prestigio, y Calidad Absoluta, Precio Absoluto), Plan de Compensación (sistema binario, sin cuotas de inscripción ni compras obligatorias) y Filosofía y Sistema (centrado en el éxito del consumidor y el sistema de educación gratuito).",
    ejemplo: "Realizar una demostración de la pasta dental y el cepillo de dientes durante la charla. Mostrar cómo el precio por gramo de los productos Atomy es más bajo que el de las marcas de supermercado, resaltando el ahorro para el hogar mientras se obtiene una calidad superior.",
  },
  {
    n: 6, t: "Seguimiento (Regla de las 48 Horas)", d: "Contacta al prospecto dentro de las primeras 48 horas tras la presentación.", icon: "clock",
    accion: "Contacto en 48 horas", objetivo: "Retención y servicio al cliente",
    explicacion: "Se debe aplicar la Regla de las 48 Horas. Contactar a la persona dentro de los dos días posteriores a la charla o a la entrega de un producto. Es el momento de resolver dudas, manejar objeciones y guiar al nuevo miembro en sus primeros pasos.",
    ejemplo: "Llamar a alguien que compró el sistema de cuidado de la piel y preguntarle: “¿Cómo sentiste la textura de la crema nutritiva anoche?”. Si la persona dice que no ha tenido tiempo de usarla, recuérdale los beneficios y agenda una nueva llamada corta para el día siguiente.",
  },
  {
    n: 7, t: "Consultoría y asesoramiento", d: "Reúnete con tu línea ascendente y descendente para analizar bloqueos y reajustar.", icon: "users",
    accion: "Diagnóstico con el Sponsor", objetivo: "Corrección de estrategia",
    explicacion: "Se debe realizar un diagnóstico basado en datos. Si un socio no está creciendo, se debe analizar cuál de los pasos anteriores está fallando. El asesoramiento debe ser constructivo, enfocado en metas y nunca basado en la crítica personal.",
    ejemplo: "Si un socio dice “no conozco a nadie”, el sponsor debe sentarse con él para revisar su lista de contactos y ayudarle a expandirla. Si el socio tiene mucha gente pero nadie compra, el sponsor debe revisar cómo se está haciendo la “Explicación del Negocio” para ajustar el mensaje.",
  },
  {
    n: 8, t: "Duplicación", d: "Sé un modelo íntegro: consumidor fiel, conectado al sistema de eventos, sirviendo con humildad.", icon: "repeat",
    accion: "Ser el ejemplo a seguir", objetivo: "Crecimiento exponencial",
    explicacion: "Duplicar no es simplemente “copiar” la personalidad de un líder. Es convertirte en un modelo a seguir (el original) que otros puedan replicar con facilidad. Si tú sigues el sistema, tus socios harán lo mismo. Para que un negocio sea escalable, el proceso debe ser sencillo y estándar.",
    ejemplo: "Si quieres que tu equipo asista a los seminarios, tú debes ser el primero en llegar y el último en irte. Si quieres que consuman los productos, tú debes ser un consumidor leal de toda la línea Atomy. Tu comportamiento es el molde del cual saldrán las futuras copias de tu organización.",
  },
];

const ESCENARIO_INTRO =
  "El Escenario de Vida es la base de todo tu recorrido: antes de aprender la ruta, define tu destino. Antes de trabajar por trabajar, decide para qué. Escribe tus metas en cada una de las 8 áreas de tu vida balanceada — cuanto más claras y detalladas (cifras, lugares, fechas), más fuerza tendrán para sostenerte en los días difíciles.";

const ESCENARIO_LEMA = "¡Determina tus sueños! Sé extraordinario o sé extremo.";

const ESCENARIO_PASOS = [
  "Escribe tus metas y sueños en cada categoría, de la forma más detallada y concreta posible: cifras, fechas, lugares.",
  "Marca tu nivel de avance en cada área tocando los puntos del gráfico — entre más lejos del centro, más cerca estás de tu meta.",
  "Vuelve aquí seguido y actualiza tu avance: verlo crecer te mantiene enfocado en tu “por qué”.",
  "Sigue trabajando hasta unir todos los puntos en un círculo perfecto — ese día habrás alcanzado tu Escenario de Vida.",
];

const ESCENARIO_CATEGORIAS = [
  { id: "casa", label: "Casa", icon: "home", pilar: "Vivir bien", ejemplo: "Actualmente vivo en un apartamento de [tamaño], pero para el [fecha] tendré una casa propia de [tamaño] valorada en más de $[monto]." },
  { id: "auto", label: "Auto", icon: "car", pilar: "Vivir bien", ejemplo: "Actualmente tengo un [marca y modelo], pero compraré un [marca y modelo] valorado en más de $[monto] para el [fecha]." },
  { id: "viajes", label: "Viajes", icon: "plane", pilar: "Amar", ejemplo: "Llevaré a mi pareja a un viaje de [n.º] días a [destino] como recompensa por mi ascenso de rango, para el [fecha]." },
  { id: "familia", label: "Familia", icon: "heart", pilar: "Amar", ejemplo: "Enviaré [un producto de bienestar] y $[monto] mensuales a mis padres, a partir del [fecha]." },
  { id: "donacion", label: "Donación", icon: "gift", pilar: "Contribuir", ejemplo: "Donaré $[monto] mensuales a [una causa o fundación], a partir del [fecha]." },
  { id: "educacion", label: "Educación", icon: "book-open", pilar: "Aprender", ejemplo: "Enviaré a mis hijos a estudiar [carrera o país] para el [fecha]." },
  { id: "tiempolibre", label: "Ocio", icon: "sparkles", pilar: "Vivir bien", ejemplo: "Actualmente casi no tengo tiempo libre, pero practicaré [un deporte o afición] [n.º] veces por semana para mi salud, y competiré en [un torneo o meta] para el [fecha]." },
  { id: "negocio", label: "Negocio", icon: "trending-up", pilar: "Vivir bien", ejemplo: "Actualmente gano $[monto] mensuales como [mi rango actual], y ascenderé a [el siguiente rango] ganando $[monto] mensuales para el [fecha]." },
];

const LEMA_ATOMY = {
  intro: "El Lema de Atomy no es simplemente un conjunto de palabras motivacionales, sino el núcleo filosófico y espiritual sobre el cual se cimenta toda la visión, gestión y cultura organizacional de la empresa. Formulado por el Presidente Han-Gill Park, establece el marco ético sobre cómo deben conducirse las personas tanto en el negocio como en su vida diaria.",
  exclamacion: "¡Apreciar el Espíritu! ¡Gestionar la Visión! ¡Seguir sobre la Fe! ¡Servir con Humildad! ¡Vamos, vamos, vamos! ¡Que lo logramos!",
  pilares: [
    {
      n: 1, t: "Apreciar el Espíritu", sub: "Cherish the Spirit", icon: "heart",
      explicacion: "Considera a las personas como los seres más valiosos, creados a imagen de Dios, sin usarlos como un medio para un fin. Las personas jamás deben ser utilizadas para lograr un fin económico o comercial; son el fin en sí mismas. En Atomy, la prioridad absoluta es el bienestar, desarrollo y éxito del ser humano por encima del interés corporativo.",
      acciones: [
        "Habla con respeto a tus socios, sin importar su rango o sus resultados.",
        "Valora en voz alta el esfuerzo de cada persona, no solo el resultado final.",
        "Corrige con cariño: señala el error sin atacar a quien lo cometió.",
        "Celebra públicamente los logros del equipo, por pequeños que sean.",
        "Motiva constantemente, sobre todo cuando alguien está pasando un mal momento.",
        "Escucha más de lo que hablas en cada conversación con un socio.",
        "Pregunta por su vida personal, no solo por sus números de PV.",
      ],
    },
    {
      n: 2, t: "Gestionar la Visión", sub: "Create the Vision", icon: "eye",
      explicacion: "Representa el principio de predecir y planificar el futuro con claridad y dirección. El futuro no es algo que simplemente se espera, sino una realidad que se diseña activamente en la mente: quien visualiza de forma clara y detallada su Escenario de Vida puede dirigir sus pensamientos y acciones diarias para transformar su realidad y alcanzar sus objetivos.",
      acciones: [
        "Ten un objetivo claro y escrito para el día — en tu primera semana, uno distinto cada día.",
        "Pasada esa primera semana, conviértelo en hábito permanente: cada mañana define tu único objetivo prioritario.",
        "Revisa cada noche si lo cumpliste, y por qué sí o por qué no.",
        "Escribe y revisa tu Escenario de Vida cada semana (menú “Escenario de Vida”).",
        "Comparte tu objetivo del día con tu patrocinador o tu equipo, para generar compromiso.",
      ],
      marcos: [
        {
          nombre: "SMART",
          explicacion: "Un objetivo SMART es Específico, Medible, Alcanzable, Relevante y con un Tiempo definido. Sirve para que tu objetivo del día — o de la quincena — no se quede en una intención vaga.",
          ejemplo: "En vez de “quiero vender más”, un objetivo SMART sería: “Voy a presentar el plan a 10 personas de mi lista y registrar a 3 socios nuevos esta semana, antes del domingo a las 8pm”.",
        },
        {
          nombre: "OKR (Objetivos y Resultados Clave)",
          explicacion: "Un Objetivo es una meta inspiradora y cualitativa — hacia dónde quieres ir. Los Resultados Clave son 2 a 4 métricas concretas que demuestran que lo lograste. Es el otro sistema de metas más usado junto al SMART, y funciona muy bien para objetivos más grandes, como los de tu quincena o tu Plan de 90 Días.",
          ejemplo: "Objetivo: “Ser un referente de liderazgo en mi equipo este trimestre”. Resultados Clave: 1) Mentorizar a 5 socios nuevos hasta que lleguen a 300.000 PV. 2) Organizar 4 reuniones de formación. 3) Lograr que 2 socios de mi equipo alcancen Agente Especial.",
        },
      ],
    },
    {
      n: 3, t: "Seguir sobre la Fe", sub: "Follow the Faith", icon: "compass",
      explicacion: "Implica avanzar con confianza y firmeza en los principios y valores de la empresa. La verdadera fe consiste en creer firmemente en aquello que aún no es visible: mantener una fe inquebrantable en la visión diseñada permite superar la duda, los obstáculos inevitables y el escepticismo externo con perseverancia y convicción.",
      acciones: [
        "Analiza los obstáculos que puedan debilitar tu fe y busca soluciones concretas.",
        "Diseña tu propia matriz DAFO — del negocio y de ti mismo.",
        "Revisa tu matriz DAFO cada quincena y ajusta tu estrategia.",
        "Rodéate de personas que refuercen tu fe en el proyecto: mentores, tu equipo, la comunidad Atomy.",
        "Recuerda tu “por qué” — tu Escenario de Vida — cada vez que dudes.",
      ],
      marcos: [
        {
          nombre: "Matriz DAFO (o FODA)",
          explicacion: "DAFO son las iniciales de Debilidades, Amenazas, Fortalezas y Oportunidades. Las Fortalezas y Debilidades son internas — dependen de ti. Las Oportunidades y Amenazas son externas — vienen del entorno. Dibuja un cuadrado dividido en 4 y anota al menos 3 ideas en cada casilla.",
          ejemplo: "Fortalezas: tengo tiempo libre por las tardes, buena red de contactos en mi barrio. Debilidades: me cuesta hablar en público, todavía no domino bien el plan de compensación. Oportunidades: hay un evento de la Academia del Éxito este mes, tengo un familiar con muchos contactos. Amenazas: hay mucha competencia de otras redes de mercadeo en mi ciudad, tengo poco tiempo libre entre semana por mi trabajo.",
        },
      ],
    },
    {
      n: 4, t: "Servir con Humildad", sub: "Serve in Humility", icon: "users",
      explicacion: "Define la actitud de liderazgo enfocado en el servicio y el bienestar de los demás. Por más elevadas que sean nuestras metas o logros, la posición personal debe ser siempre de humildad: servir a los demás con respeto, mantener una mente dispuesta a aprender y anteponer el bienestar del equipo al ego personal.",
      acciones: [
        "Busca maneras concretas de demostrar humildad ante tus socios.",
        "Parte de la base de que ellos saben más que tú en su propio contexto — pregunta, no asumas.",
        "Reconoce que sus aportes valen tanto o más que los tuyos.",
        "Pide retroalimentación honesta a tu equipo, y agradécela aunque duela.",
        "Sé el primero en llegar y el último en irte en cada evento o reunión.",
        "Ayuda sin esperar reconocimiento ni nada a cambio.",
        "Admite tus errores abiertamente frente al equipo.",
      ],
    },
  ],
};

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
        h: "Tu membresía es 100% gratuita",
        body: [
          "Unirte a Atomy no cuesta nada: no hay cuota de inscripción, ni cuota mensual, ni anual, y nunca hay compras obligatorias para mantener tu cuenta activa.",
          "Lo único que haces es cambiar dónde compras los productos de uso diario que ya compras siempre — el resto del sistema (activación, comisiones, rangos) se construye sobre ese consumo, no sobre pagos adicionales.",
        ],
      },
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
          "No trabajas solo: con la ayuda de tu patrocinador vas construyendo tu estructura en dos líneas de consumo, Izquierda y Derecha, con profundidad ilimitada (no importa cuántos niveles hacia abajo crezca cada línea).",
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
      {
        h: "El camino completo hasta Sales Master",
        body: [
          "Tu progreso personal avanza en hitos de PV que nunca se pierden: 10.000 PVP activa tu cuenta, 300.000 PVP te da Agente, y 700.000 PVP te da Agente Especial.",
          "Sales Master —la meta de tu Plan de 90 Días— se alcanza cuando, además de tus 700.000 PVP, tu línea Izquierda y tu línea Derecha acumulan cada una 2.500.000 PVG en la misma quincena de calificación.",
          "Este recorrido de Cumbre 90 te lleva exactamente hasta ahí. Los rangos que existen por encima de Sales Master (Diamond Master en adelante) quedan fuera de estos 90 días, pero para entonces ya tendrás el hábito y el equipo para seguir subiendo.",
        ],
      },
    ],
    campos: [],
    nota: "Recuerda tus dos grandes hitos: 10.000 PVP (activa tu cuenta) y 300.000 PVP (triplicas tu comisión por ciclo). Tus PV personales nunca se borran ni se reinician.",
    checklist: [
      "Entendí la importancia de alcanzar primero 10.000 PV y proyectar los 300.000 PV personales.",
      "Comprendí el funcionamiento del equilibrio binario (Izquierda / Derecha).",
      "Elegí mis primeros 4 productos preferidos.",
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
          "Para ello vamos a la página, entra con tu ID y contraseña.",
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
  { n: 2, nombre: "Primer Impulso", semanas: "3-4", foco: "Activación de invitaciones", detalle: "200.000 PV · 10 llamadas · 10 socios nuevos" },
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
      "Hacer mi primera reunión de enfoque a mis socios (acompañado de mi patrocinador).",
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
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 3, q: 2, metaPV: "200.000 PV", metaContactos: "10 Llamadas / Presentaciones", paso: "Pasos 4 y 5: Llamadas y Presentación del Negocio",
    acciones: [
      "Alcanzar 200.000 PV Personales mediante cambio de supermercado de consumo en el hogar.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 4, q: 2, metaPV: "200.000 PV", metaContactos: "10 Llamadas / Presentaciones", paso: "Pasos 4 y 5: Llamadas y Presentación del Negocio",
    acciones: [
      "Alcanzar 200.000 PV Personales mediante cambio de supermercado de consumo en el hogar.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 5, q: 3, metaPV: "300.000 PV", metaContactos: "Seguimiento en 48 Horas", paso: "Paso 6: Seguimiento Sólido",
    acciones: [
      "Completar los 300.000 PV Personales para maximizar el cobro de comisiones.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 6, q: 3, metaPV: "300.000 PV", metaContactos: "Consolidación de consumo", paso: "Paso 7: Consultoría con Mentor",
    acciones: [
      "Asegurar que cada línea activa cuente con al menos 4 consumidores recurrentes.",
      "Identificar 4 líderes de mi estructura: 2 en cada línea.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 7, q: 4, metaPV: "300.000 PV", metaContactos: "2 Nuevos socios guiados", paso: "Paso 8: Duplicación de Bases",
    acciones: [
      "Reunirme con mi patrocinador para analizar el balance de PV de la línea izquierda y derecha.",
      "Formar a los 4 líderes detectados en mis líneas descendentes.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 8, q: 4, metaPV: "300.000 PV", metaContactos: "Organizar mini Zoom/Reunión", paso: "Paso 5 y 8: Presentación e Impacto",
    acciones: [
      "Organizar una mini reunión de hogar o Zoom grupal apoyando a los socios descendentes.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 9, q: 5, metaPV: "300.000 PV", metaContactos: "Revisión de volumen grupal", paso: "Paso 7: Consultoría de Red",
    acciones: [
      "Evaluar el mapa de la organización: asegurar que los socios comprometidos estén duplicando las presentaciones sencillas.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 10, q: 5, metaPV: "300.000 PV", metaContactos: "Alineación con líderes clave", paso: "Paso 1 y 2: Reafirmar Compromiso",
    acciones: [
      "Intensificar las interacciones en redes sociales para mantener alimentada la lista de contactos.",
      "Planificar la compra estratégica y la proyección de volumen para el ciclo de calificación de Sales Master.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 11, q: 6, metaPV: "300.000 PV+", metaContactos: "Cierre quincenal activo", paso: "Ejecución de Estrategia de Rango",
    acciones: [
      "Coordinar el consumo colectivo con el equipo para alcanzar 2.500.000 PVG en la línea izquierda y 2.500.000 PVG en la línea derecha.",
      "Asignar compras personales estratégicas en la línea con menor volumen según las normas de la compañía.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
  {
    n: 12, q: 6, metaPV: "700.000 PV Personales", metaContactos: "2,5M PVG Izq / 2,5M PVG Der", paso: "¡LOGRO DE SALES MASTER!",
    acciones: [
      "Celebrar la consecución de la Maestría, edificar el trabajo en equipo y preparar el siguiente ciclo de crecimiento.",
      "Realizar mínimo 10 llamadas o mensajes de invitación aplicando la regla de la mente propia.",
      "Registrar 10 socios nuevos.",
      "Ayudar a ubicar estos socios en las líneas Izquierda y Derecha (pido ayuda a mi patrocinador para este paso).",
      "Guiar a los socios nuevos a completar el módulo de los 6 Días de Arranque.",
      "Hacer mi reunión de enfoque a mis socios.",
    ],
  },
];

const DIAS_SEMANA = [
  { id: "lunes", label: "Lunes" },
  { id: "martes", label: "Martes" },
  { id: "miercoles", label: "Miércoles" },
  { id: "jueves", label: "Jueves" },
  { id: "viernes", label: "Viernes" },
  { id: "sabado", label: "Sábado" },
  { id: "domingo", label: "Domingo" },
];

const AGENDA_TIPOS = [
  { id: "llamada", label: "Llamada pendiente", icon: "phone-call" },
  { id: "visita", label: "Visita a nuevo socio", icon: "users" },
  { id: "presentacion", label: "Presentación de producto", icon: "presentation" },
  { id: "registro", label: "Registro de nuevo socio", icon: "user-badge" },
  { id: "formacion", label: "Formación", icon: "book-open" },
];

const BUCKET_LIST_EJEMPLOS = [
  { texto: "Bajar 10 kilos de peso", porque: "Para mejorar mi espalda y mis triglicéridos" },
  { texto: "Comprar una casa de 150 m² con cocina amplia", porque: "Para celebrar nuestro aniversario de bodas número 20" },
  { texto: "Aprender a tocar guitarra", porque: "Para poder tocarle una canción a mis hijos" },
  { texto: "Correr una media maratón", porque: "Para demostrarme que puedo superar mis límites" },
  { texto: "Visitar Japón en primavera", porque: "Para ver los cerezos en flor con mi pareja" },
  { texto: "Pagar la casa de mis padres", porque: "Para que vivan tranquilos el resto de su vida" },
  { texto: "Aprender inglés a nivel conversacional", porque: "Para poder viajar sin depender de nadie" },
  { texto: "Comprarme un carro cero kilómetros", porque: "Para dejar atrás los problemas mecánicos constantes" },
  { texto: "Tener un fondo de ahorro para 6 meses de emergencia", porque: "Para dormir tranquilo sin miedo a los imprevistos" },
  { texto: "Llevar a mi mamá a conocer el mar", porque: "Porque nunca ha salido de su ciudad" },
  { texto: "Terminar mi carrera universitaria", porque: "Para cumplir una meta que dejé pendiente" },
  { texto: "Hacer un viaje en familia a Disney", porque: "Para ver la cara de felicidad de mis hijos" },
  { texto: "Dejar de fumar definitivamente", porque: "Para cuidar mi salud y estar más años con mi familia" },
  { texto: "Aprender a nadar", porque: "Porque nunca tuve la oportunidad de niño" },
  { texto: "Construir un cuarto de estudio en casa", porque: "Para tener un espacio propio de crecimiento" },
  { texto: "Alcanzar el rango de Diamond Master", porque: "Para multiplicar mi impacto y mis ingresos" },
  { texto: "Donar mensualmente a una fundación de niños", porque: "Para devolver parte de lo que la vida me ha dado" },
  { texto: "Hacer un curso de oratoria", porque: "Para perder el miedo a hablar en público" },
  { texto: "Renovar la cocina de mi casa", porque: "Para disfrutar más tiempo cocinando en familia" },
  { texto: "Ir a un concierto de mi artista favorito", porque: "Para vivir esa experiencia al menos una vez" },
  { texto: "Aprender a manejar mis finanzas personales", porque: "Para dejar de vivir con ansiedad por el dinero" },
  { texto: "Escribir un libro sobre mi historia", porque: "Para dejarle un legado a mis nietos" },
  { texto: "Tener mi propio huerto en casa", porque: "Para comer más sano y conectar con la naturaleza" },
  { texto: "Hacer un retiro espiritual de una semana", porque: "Para reconectar conmigo mismo" },
  { texto: "Comprarle una casa propia a mi hijo", porque: "Para darle la estabilidad que a mí me costó tanto" },
  { texto: "Recorrer la Patagonia en carretera", porque: "Para desconectarme del ruido de la ciudad" },
  { texto: "Aprender a cocinar comida italiana", porque: "Porque siempre me ha apasionado esa cultura" },
  { texto: "Tener un ingreso pasivo de $2.000 mensuales", porque: "Para trabajar por elección, no por necesidad" },
  { texto: "Llevar a mi pareja a la Torre Eiffel", porque: "Para cumplir la promesa que le hice hace años" },
  { texto: "Recuperar mi confianza y mi autoestima", porque: "Para sentirme bien conmigo mismo otra vez" },
  { texto: "Aprender fotografía profesional", porque: "Para capturar los momentos importantes de mi vida" },
  { texto: "Visitar las pirámides de Egipto", porque: "Porque desde niño me fascinó su historia" },
  { texto: "Formar a 10 líderes en mi equipo", porque: "Para multiplicar el impacto de Atomy en mi comunidad" },
  { texto: "Comprar un terreno para construir mi casa soñada", porque: "Para dejar de pagar arriendo de por vida" },
  { texto: "Hacer las paces con un familiar", porque: "Para sanar una herida que llevo cargando" },
  { texto: "Aprender a bailar salsa con mi pareja", porque: "Para disfrutar más nuestras salidas juntos" },
  { texto: "Tener un carro para cada uno en la familia", porque: "Para que nadie dependa de otro para movilizarse" },
  { texto: "Ir de crucero por el Caribe", porque: "Para descansar sin preocuparme de nada" },
  { texto: "Regalarle un viaje a mis padres por sus bodas de oro", porque: "Para agradecerles todo lo que me dieron" },
  { texto: "Terminar de pagar todas mis deudas", porque: "Para empezar de cero sin ese peso encima" },
  { texto: "Aprender a meditar todos los días", porque: "Para manejar mejor el estrés" },
  { texto: "Construir una piscina en mi casa", porque: "Para disfrutar el verano en familia" },
  { texto: "Estudiar un posgrado en liderazgo", porque: "Para seguir creciendo profesionalmente" },
  { texto: "Hacer un safari en África", porque: "Para ver a los animales en su hábitat natural" },
  { texto: "Tener mi propia oficina en casa", porque: "Para trabajar cómodo y sin distracciones" },
  { texto: "Llevar a toda mi familia de vacaciones juntos", porque: "Porque cada vez tenemos menos oportunidades de estar todos" },
  { texto: "Aprender a tocar piano", porque: "Para regalarle serenatas a mi pareja" },
  { texto: "Comprar la casa de mis sueños frente al mar", porque: "Para despertar todos los días viendo el horizonte" },
  { texto: "Ser mentor de jóvenes emprendedores", porque: "Para ayudarles a no cometer los errores que yo cometí" },
  { texto: "Hacer una donación grande a mi ciudad natal", porque: "Para devolver algo a donde crecí" },
  { texto: "Aprender a surfear", porque: "Porque siempre quise intentarlo y nunca me atreví" },
  { texto: "Tener un negocio adicional además de Atomy", porque: "Para diversificar mis ingresos" },
  { texto: "Ir a ver la aurora boreal", porque: "Porque es algo que quiero ver con mis propios ojos" },
  { texto: "Reformar el jardín de mi casa", porque: "Para tener un espacio de paz al aire libre" },
  { texto: "Aprender a hacer pan casero", porque: "Para compartir ese ritual con mi familia los domingos" },
  { texto: "Comprar un apartamento para rentar", porque: "Para generar un ingreso extra estable" },
  { texto: "Correr mi primer triatlón", porque: "Para probar mis límites físicos" },
  { texto: "Hacer un viaje yo solo, sin nadie más", porque: "Para reencontrarme conmigo mismo" },
  { texto: "Financiar la educación universitaria de mis hijos", porque: "Para que no tengan las limitaciones que yo tuve" },
  { texto: "Aprender otro idioma además del inglés", porque: "Para abrirme más oportunidades en la vida" },
  { texto: "Tener una casa de descanso en las montañas", porque: "Para escapar del estrés de la ciudad" },
  { texto: "Superar mi miedo a las alturas", porque: "Para poder hacer parapente algún día" },
  { texto: "Ayudar a que mi equipo alcance Sales Master", porque: "Para ver a más personas cumplir sus sueños" },
  { texto: "Ir a Times Square en año nuevo", porque: "Para vivir esa experiencia al menos una vez" },
  { texto: "Aprender primeros auxilios", porque: "Para poder ayudar en caso de emergencia con mi familia" },
  { texto: "Comprar muebles nuevos para toda la casa", porque: "Para renovar nuestro hogar después de tantos años" },
  { texto: "Hacer una boda soñada con mi pareja", porque: "Porque nunca pudimos celebrarla como queríamos" },
  { texto: "Aprender a invertir en bolsa", porque: "Para hacer crecer mis ahorros con inteligencia" },
  { texto: "Visitar Machu Picchu", porque: "Porque es una de las maravillas que siempre quise conocer" },
  { texto: "Tener mi propio estudio de yoga en casa", porque: "Para cuidar mi cuerpo y mi mente cada día" },
  { texto: "Hacer un voluntariado internacional", porque: "Para ayudar a comunidades que lo necesitan" },
  { texto: "Darle a mi mascota todo lo que necesite sin preocuparme por el dinero", porque: "Porque es parte de mi familia" },
  { texto: "Aprender a hacer vino casero", porque: "Porque siempre me pareció un arte fascinante" },
  { texto: "Tener el auto de mis sueños", porque: "Porque trabajé toda mi vida para poder dármelo" },
  { texto: "Llevar a mis hijos a Eurodisney", porque: "Para verlos vivir la magia de ser niños" },
  { texto: "Reducir mi jornada laboral a la mitad", porque: "Para tener más tiempo con mi familia" },
  { texto: "Aprender a esquiar", porque: "Porque nunca he visto la nieve de cerca" },
  { texto: "Construir una casa para mis padres cerca de la mía", porque: "Para poder cuidarlos y verlos todos los días" },
  { texto: "Publicar un podcast sobre superación personal", porque: "Para inspirar a otros con mi historia" },
  { texto: "Hacer un viaje en tren por Europa", porque: "Porque siempre me pareció una experiencia romántica" },
  { texto: "Regalarle una joya especial a mi pareja", porque: "Para celebrar todo lo que hemos construido juntos" },
  { texto: "Terminar de decorar la habitación de mi bebé", porque: "Para recibirlo con todo el amor del mundo" },
  { texto: "Aprender a tocar batería", porque: "Porque de joven nunca tuve la oportunidad" },
  { texto: "Comprar entradas VIP a un evento deportivo importante", porque: "Para vivir esa experiencia en primera fila" },
  { texto: "Crear un fondo educativo para mis sobrinos", porque: "Para apoyarlos en su futuro" },
  { texto: "Tener una casa de campo para reuniones familiares", porque: "Para que la familia siempre tenga un lugar de encuentro" },
  { texto: "Aprender a hacer cerámica", porque: "Porque siempre me llamó la atención ese arte" },
  { texto: "Visitar los templos de Bali", porque: "Para conectar con la espiritualidad de esa cultura" },
  { texto: "Superar mi ansiedad social", porque: "Para disfrutar más las reuniones y los eventos" },
  { texto: "Comprar un bote pequeño", porque: "Para salir a pescar los fines de semana" },
  { texto: "Ayudar a mis padres a jubilarse tranquilos", porque: "Para que descansen después de tanto esfuerzo" },
  { texto: "Aprender sobre inversiones inmobiliarias", porque: "Para construir un patrimonio a largo plazo" },
  { texto: "Ir a ver la Copa del Mundo en vivo", porque: "Porque es un sueño futbolero desde niño" },
  { texto: "Renovar mi guardarropa completo", porque: "Para sentirme más seguro con mi imagen" },
  { texto: "Tener una sala de cine en casa", porque: "Para disfrutar películas en familia como en el cine" },
  { texto: "Aprender técnicas de respiración y manejo del estrés", porque: "Para estar más tranquilo en el día a día" },
  { texto: "Financiar una cirugía o tratamiento médico pendiente", porque: "Para recuperar mi calidad de vida" },
  { texto: "Llevar a toda mi línea descendente a un evento internacional de Atomy", porque: "Para motivarlos a soñar en grande" },
  { texto: "Alcanzar mi libertad financiera total", porque: "Para nunca más depender de un salario" },
  { texto: "Dejar un legado que trascienda mi propia vida", porque: "Para que mi esfuerzo siga ayudando a otros después de mí" },
];

const CATALOGO_PRODUCTOS_ATOMY = [
  { categoria: "Cuidado de la Salud", nombre: "Hemo Him G", precio: 440000, pv: 70000 },
  { categoria: "Cuidado de la Salud", nombre: "Bióticos", precio: 290000, pv: 30000 },
  { categoria: "Cuidado de la Salud", nombre: "Omega 3", precio: 110000, pv: 10000 },
  { categoria: "Cuidado de la Salud", nombre: "Hierro", precio: 138000, pv: 15000 },
  { categoria: "Cuidado de la Salud", nombre: "Noni (24 sobres)", precio: 295000, pv: 39500 },
  { categoria: "Cuidado de la Salud", nombre: "Noni Cocentrado", precio: 270000, pv: 35000 },
  { categoria: "Cuidado de la Salud", nombre: "Espirulina", precio: 147000, pv: 17000 },
  { categoria: "Cuidado de la Salud", nombre: "Gel de manzana verde", precio: 128000, pv: 15000 },
  { categoria: "Cuidado de la Salud", nombre: "Atomy Psyllium Husk", precio: 135000, pv: 19100 },
  { categoria: "Cuidado de la Piel", nombre: "Protector Solar Essence Sunscreen", precio: 53000, pv: 5000 },
  { categoria: "Cuidado de la Piel", nombre: "Protector Solar Blanco", precio: 39800, pv: 3600 },
  { categoria: "Cuidado de la Piel", nombre: "Atomy Sun Stick", precio: 45500, pv: 4700 },
  { categoria: "Cuidado de la Piel", nombre: "Atomny Absolute Snow Tone-Up Essence", precio: 78000, pv: 9000 },
  { categoria: "Cuidado de la Piel", nombre: "Set 4 pasos", precio: 156600, pv: 14300 },
  { categoria: "Cuidado de la Piel", nombre: "Fom Cleanser (Espuma Limpiadora)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Deep Cleanser (Limpiador Profundo)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Peeling Gel (Exfoliante)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla (Set 4 Pasos)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Set Cuidado THE FAME", precio: 400000, pv: 57200 },
  { categoria: "Cuidado de la Piel", nombre: "Kit de Viaje (6 Piezas)", precio: 91000, pv: 5000 },
  { categoria: "Cuidado de la Piel", nombre: "Crema Nutritiva FAME", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "Lip Glow", precio: 50700, pv: 5300 },
  { categoria: "Cuidado de la Piel", nombre: "Marine Ampoule Eye Patch", precio: 120000, pv: 18000 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla Diaria Especializada", precio: 46000, pv: 4500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Crema Nutritiva", precio: 147800, pv: 20800 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Ampolla", precio: 196000, pv: 28600 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Reset Balm", precio: 95000, pv: 11000 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Skinxare Set x 6", precio: 880000, pv: 130000 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Tóner", precio: 106000, pv: 14600 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Snow Dark-Spot Corrector", precio: 90000, pv: 12000 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Snow Serum Día Paso 2/Noche Paso 3", precio: 139000, pv: 18500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Snow Day Cream Dia Paso 3", precio: 131000, pv: 18500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Snow Night Cream Noche Paso 4", precio: 139000, pv: 19500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Tónico", precio: 147800, pv: 20800 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Crema Nutritiva - Paso 5", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "Aceite Limpiador", precio: 79300, pv: 8100 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Suero", precio: 163500, pv: 23400 },
  { categoria: "Cuidado de la Piel", nombre: "Atomy Deep Pure Cleansing Oil", precio: 2350, pv: 10000 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Contorno de Ojos Paso 2", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "Crema BB", precio: 38500, pv: 2800 },
  { categoria: "Cuidado de la Piel", nombre: "Cream Mist", precio: 58000, pv: 8000 },
  { categoria: "Cuidado de la Piel", nombre: "Sistema Cuidado THE FAME", precio: 400000, pv: 57200 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Loción", precio: 147800, pv: 20800 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Tónico Paso 1", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Loción - Paso 4", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Esencia Paso 3", precio: 89400, pv: 12500 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla de Oro 24K", precio: 160000, pv: 23000 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla Arcilla Hinoki", precio: 73000, pv: 9700 },
  { categoria: "Cuidado de la Piel", nombre: "Parche para Ojos Hidrogel (60 Parches)", precio: 82000, pv: 10000 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Trvel Kit (5 Productos)", precio: 180000, pv: 14000 },
  { categoria: "Cuidado Bucal", nombre: "Pasta de Dientes 200g x 5", precio: 71200, pv: 3600 },
  { categoria: "Cuidado Bucal", nombre: "Pasta de Dientes 50g x 4", precio: 23100, pv: 3300 },
  { categoria: "Cuidado Bucal", nombre: "Cepillo de Dientes x 8", precio: 37000, pv: 5300 },
  { categoria: "Cuidado Bucal", nombre: "Cepillo Dental Niños x 8", precio: 48300, pv: 4200 },
  { categoria: "Cuidado Bucal", nombre: "Sistema de cuidado bucal 1 set x 4", precio: 55000, pv: 6500 },
  { categoria: "Cuidado Bucal", nombre: "Spray de Propoleo", precio: 110000, pv: 9500 },
  { categoria: "Cuidado Bucal", nombre: "Pasta Dental Sensitive x 3 Unidades", precio: 48000, pv: 4800 },
  { categoria: "Maquillaje y Labios", nombre: "Adelica Mascara Long-Lash", precio: 64000, pv: 6800 },
  { categoria: "Maquillaje y Labios", nombre: "Adelica Mascara Volumen", precio: 64000, pv: 6800 },
  { categoria: "Maquillaje y Labios", nombre: "Delineador de Cejas", precio: 35000, pv: 4200 },
  { categoria: "Maquillaje y Labios", nombre: "Aceite Limpiador", precio: 79300, pv: 8100 },
  { categoria: "Maquillaje y Labios", nombre: "Desmaquillante Bifásico", precio: 48000, pv: 5000 },
  { categoria: "Maquillaje y Labios", nombre: "Crema BB", precio: 38500, pv: 2800 },
  { categoria: "Cabello y Cuerpo", nombre: "Oleo (Aceite) Esencial Para el Cabello", precio: 49200, pv: 5600 },
  { categoria: "Cabello y Cuerpo", nombre: "Champú Herbal", precio: 53800, pv: 5700 },
  { categoria: "Cabello y Cuerpo", nombre: "Acondicionador Herbal", precio: 53800, pv: 5700 },
  { categoria: "Cabello y Cuerpo", nombre: "Tónico Para el cabello", precio: 56600, pv: 5600 },
  { categoria: "Cabello y Cuerpo", nombre: "Shampoo Proteínas", precio: 80000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Tratamiento Herbal para el Cabello", precio: 29700, pv: 2900 },
  { categoria: "Cabello y Cuerpo", nombre: "Tratamiento Intensivo de Proteina", precio: 60000, pv: 6500 },
  { categoria: "Cabello y Cuerpo", nombre: "Champú Scalpare", precio: 62400, pv: 6200 },
  { categoria: "Cabello y Cuerpo", nombre: "Acondicionador Scalpare", precio: 62400, pv: 6200 },
  { categoria: "Cabello y Cuerpo", nombre: "Set de Viaje (6 cremas)", precio: 91000, pv: 5000 },
  { categoria: "Cabello y Cuerpo", nombre: "Shampoo Absolut Paso 1", precio: 78000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Absolute Tratamiento Paso 2", precio: 78000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Absolute Acondicionador Paso 3", precio: 78000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Gel + Champú Hombres", precio: 70600, pv: 7400 },
  { categoria: "Cabello y Cuerpo", nombre: "Tratamiento Líquido Proteina", precio: 60000, pv: 6500 },
  { categoria: "Cabello y Cuerpo", nombre: "Esencia Rizos", precio: 44000, pv: 5400 },
  { categoria: "Cabello y Cuerpo", nombre: "Limpiador Herbal Para el Cuerpo", precio: 39800, pv: 3500 },
  { categoria: "Cabello y Cuerpo", nombre: "Limpiador Íntimo Unisex", precio: 25000, pv: 2000 },
  { categoria: "Cabello y Cuerpo", nombre: "Loción Corporal", precio: 42400, pv: 3520 },
  { categoria: "Cabello y Cuerpo", nombre: "Limpiador Multiacc. Hombre (Gel Afeitada)", precio: 50000, pv: 5000 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Crema de Manos", precio: 53600, pv: 7400 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Jabón de Manos", precio: 15400, pv: 1100 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Hand Balm Butter", precio: 24000, pv: 2800 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Hand Balm Pure", precio: 24000, pv: 2800 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Hand Balm Marine", precio: 24000, pv: 2800 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Terapia para manos (4 cremas)", precio: 53605, pv: 6600 },
  { categoria: "Alimentos", nombre: "Café Arabica Black (80 sobres)", precio: 95000, pv: 5200 },
  { categoria: "Alimentos", nombre: "Té Pu'er", precio: 122000, pv: 13600 },
  { categoria: "Alimentos", nombre: "Crema no Láctea (50 sobres)", precio: 53100, pv: 2200 },
  { categoria: "Hogar", nombre: "Scrubber (Esponjas) (4 unidades)", precio: 18500, pv: 1000 },
  { categoria: "Hogar", nombre: "Stainles Scrubber (Esponja alambre/2 unid)", precio: 16900, pv: 750 },
  { categoria: "Hogar", nombre: "Guantes (2 Pares)", precio: 23900, pv: 1300 },
  { categoria: "Hogar", nombre: "Detergente Lavatrastes", precio: 32700, pv: 3400 },
  { categoria: "Hogar", nombre: "Detergente en Polvo", precio: 57700, pv: 4000 },
  { categoria: "Hogar", nombre: "Detergente Líquido para Ropa", precio: 54000, pv: 4800 },
  { categoria: "Hogar", nombre: "Suavizante de Telas", precio: 46200, pv: 3700 },
  { categoria: "Otros", nombre: "Pin Metálico", precio: 46200, pv: 0 },
  { categoria: "Otros", nombre: "Gorra Oficial Atomy", precio: 34000, pv: 0 },
  { categoria: "Otros", nombre: "Bolsa Reutilizable HemoHIM", precio: 4200, pv: 0 },
  { categoria: "Otros", nombre: "Sobre Individual Marine Ampoule", precio: 13000, pv: 1200 },
  { categoria: "Otros", nombre: "Escenario de Vida", precio: 5000, pv: 0 },
  { categoria: "Otros", nombre: "Bolsa Laminada", precio: 1700, pv: 0 },
  { categoria: "Otros", nombre: "Bolsa Multiusos", precio: 2600, pv: 0 },
];

const CATALOGO_PRODUCTOS_NOTA = "Catálogo de referencia (Colombia) a partir de tu propia lista — Atomy actualiza sus productos con frecuencia y cada país tiene un catálogo distinto, así que puede estar desfasado. Edita, agrega o elimina productos aquí para mantenerlo al día.";

const CONTACTO_NIVELES = ["Caliente", "Tibio", "Frío"];
const CONTACTO_ESTADOS = ["Por contactar", "Contactado", "Presentado", "Primer Pedido", "Seguimiento", "Socio", "Consumidor", "Descartado"];

const PRIMER_PEDIDO_NOTA = "¿Le llegó el pedido? ¿Cómo se ha sentido con los productos? ¿A quién se lo podría recomendar?";

const PREMIOS_DEFECTO = [
  { hito: "Alcanzar 300.000 PVP", premio: "Set de 4 Pasos de regalo", imagen: null },
  { hito: "2 ciclos de 300.000 PVG en una quincena", premio: "Crema nutritiva de oro", imagen: null },
  { hito: "Sales Master en 45 días", premio: "Set FAME", imagen: null },
];

const RANGOS = [
  { nombre: "Consumidor Consciente", meta: "Tu punto de partida", pv: "0 PVP", tier: 1 },
  { nombre: "Miembro Atomy", meta: "10.000 PV personales", pv: "10.000 PVP", tier: 1 },
  { nombre: "Agente", meta: "300.000 PV personales", pv: "300.000 PVP", tier: 2 },
  { nombre: "Agente Especial", meta: "700.000 PV personales", pv: "700.000 PVP", tier: 2 },
  { nombre: "Sales Master", meta: "700.000 PV personales + 2.500.000 PV en cada pierna", pv: "5.000.000 PVG", tier: 3 },
];

const MENSAJE_BIENVENIDA =
  "Bienvenido a este recorrido al éxito. Está diseñado para que disfrutes del recorrido, compartas tus progresos y consultes tus dudas o dificultades que puedas encontrar. ¡Adelante!";
