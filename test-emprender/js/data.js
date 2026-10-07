// Contenido estático del test: preguntas y textos del diagnóstico final.
// Igual que test-piel: solo diagnóstico, sin dar consejo directo. El
// objetivo es recoger la situación y los miedos de la persona para poder
// ofrecerle un plan personalizado por WhatsApp.
const DATA = {
  questions: [
    {
      id: "situation",
      type: "choice",
      question: "¿Dónde te encuentras ahora mismo?",
      summaryLabel: "Situación actual",
      options: [
        { value: "soloIdea", label: "Solo tengo la idea en la cabeza, no he hecho nada", shortLabel: "tienes la idea pero no has empezado" },
        { value: "dandoForma", label: "Estoy dándole forma a la idea pero no he empezado", shortLabel: "estás dándole forma a la idea" },
        { value: "empezadoSinAvance", label: "Ya he empezado pero no avanzo como quiero", shortLabel: "has empezado pero no avanzas" },
        { value: "tengoNegocio", label: "Ya tengo un negocio y quiero dar el siguiente paso", shortLabel: "quieres dar el siguiente paso en tu negocio" }
      ]
    },
    {
      id: "mainFear",
      type: "multi",
      question: "¿Qué es lo que más te frena a la hora de emprender?",
      hint: "Puedes elegir varias opciones.",
      summaryLabel: "Miedos principales",
      options: [
        { value: "dinero", label: "Miedo a perder dinero / seguridad económica" },
        { value: "fracaso", label: "Miedo al fracaso o al \"qué dirán\"" },
        { value: "noSaber", label: "No saber por dónde empezar" },
        { value: "dejarTrabajo", label: "Dejar un trabajo/sueldo fijo" },
        { value: "tiempo", label: "No tener suficiente tiempo" },
        { value: "vender", label: "Miedo a no saber vender o conseguir clientes" },
        { value: "apoyo", label: "Falta de apoyo de mi entorno" }
      ]
    },
    {
      id: "timeThinking",
      type: "choice",
      question: "¿Cuánto tiempo llevas dándole vueltas a esta idea?",
      summaryLabel: "Tiempo pensándolo",
      options: [
        { value: "menos3meses", label: "Menos de 3 meses" },
        { value: "de3a12meses", label: "Entre 3 y 12 meses" },
        { value: "masDeUnAno", label: "Más de 1 año" },
        { value: "variosAnos", label: "Varios años" }
      ]
    },
    {
      id: "financialCushion",
      type: "choice",
      question: "Si empezaras hoy, ¿con qué margen económico contarías?",
      summaryLabel: "Colchón económico",
      options: [
        { value: "variosMeses", label: "Ahorros para varios meses sin ingresos" },
        { value: "pocoColchon", label: "Algo de colchón, pero poco" },
        { value: "dependeriaDesdeInicio", label: "Dependería 100% de que funcione desde el principio" },
        { value: "noLoHeCalculado", label: "No lo he calculado" }
      ]
    },
    {
      id: "support",
      type: "choice",
      question: "¿Cómo se lo toma tu entorno cercano (pareja, familia, amigos) cuando hablas de emprender?",
      summaryLabel: "Apoyo del entorno",
      options: [
        { value: "meAniman", label: "Me animan" },
        { value: "preocupaPeroApoyan", label: "Les preocupa pero me apoyan" },
        { value: "intentanDisuadir", label: "Me intentan disuadir" },
        { value: "noLoSaben", label: "No lo saben / no lo he hablado" }
      ]
    },
    {
      id: "previousAttempts",
      type: "choice",
      question: "¿Has intentado antes emprender o lanzar algo por tu cuenta?",
      summaryLabel: "Intentos previos",
      options: [
        { value: "primeraVez", label: "No, sería la primera vez" },
        { value: "noFunciono", label: "Sí, y no funcionó" },
        { value: "activoAMedias", label: "Sí, y sigue activo pero a medias" },
        { value: "algoNuevo", label: "Sí, y ahora quiero algo nuevo" }
      ]
    },
    {
      id: "age",
      type: "number",
      question: "¿Qué edad tienes?",
      hint: "Nos ayuda a ajustar el plan.",
      placeholder: "Ej. 32",
      unit: "años",
      summaryLabel: "Edad"
    },
    {
      id: "jobStatus",
      type: "choice",
      question: "¿Cómo es tu situación laboral ahora?",
      summaryLabel: "Situación laboral",
      options: [
        { value: "tiempoCompleto", label: "Trabajo por cuenta ajena a tiempo completo" },
        { value: "tiempoParcial", label: "Trabajo a tiempo parcial" },
        { value: "paro", label: "En paro / entre proyectos" },
        { value: "estudiando", label: "Estudiando" }
      ]
    },
    {
      id: "mostHelpful",
      type: "choice",
      question: "Si pudieras tener una cosa resuelta ahora mismo, ¿cuál sería?",
      summaryLabel: "Lo que más ayudaría",
      options: [
        { value: "validarIdea", label: "Validar si la idea funcionaría" },
        { value: "planClaro", label: "Un plan claro de los primeros pasos" },
        { value: "perderMiedo", label: "Perder el miedo a lanzarme" },
        { value: "primerosClientes", label: "Encontrar primeros clientes" },
        { value: "organizarFinanzas", label: "Organizar las finanzas para el cambio" }
      ]
    },
    {
      id: "goal6months",
      type: "choice",
      question: "Si todo fuera bien, ¿qué te gustaría haber conseguido en 6 meses?",
      summaryLabel: "Objetivo a 6 meses",
      options: [
        { value: "haberLanzado", label: "Haber lanzado algo, aunque sea pequeño" },
        { value: "ideaValidada", label: "Tener validada la idea con datos reales" },
        { value: "sinMiedo", label: "Haber dejado atrás el miedo a empezar" },
        { value: "planYFecha", label: "Tener un plan y fecha concretos" }
      ]
    }
  ]
};
