// Contenido estático del test: preguntas y textos de resultado.
// Test pensado para acompañar un saludo a un amigo, no un cuestionario
// largo tipo diagnóstico. La pregunta clave ("interest") separa a quien
// solo quiere comprar de quien también podría interesarse en recomendar
// los productos para un ingreso extra; las preguntas 6 y 7 solo aparecen
// si esa respuesta lo justifica, para no alargar el test a quien solo
// quiere comprar. La última pregunta es de permiso: qué quiere recibir,
// para no enviar nada que no haya pedido.
const DATA = {
  questions: [
    {
      id: "productsUsed",
      type: "multi",
      question: "¿Qué productos usas actualmente?",
      hint: "Puedes elegir varias opciones.",
      summaryLabel: "Productos que usa",
      options: [
        { value: "facial", label: "Cuidado facial y cosmética" },
        { value: "higiene", label: "Higiene y cuidado personal" },
        { value: "hogar", label: "Limpieza del hogar" },
        { value: "cafe", label: "Café y bebidas" },
        { value: "bienestar", label: "Bienestar y suplementos" }
      ]
    },
    {
      id: "priorities",
      type: "multi",
      maxSelect: 3,
      question: "¿Qué es lo más importante para ti al elegir un producto?",
      hint: "Puedes marcar hasta 3 opciones.",
      summaryLabel: "Lo más importante al elegir",
      options: [
        { value: "precio", label: "El precio y el ahorro" },
        { value: "calidad", label: "La calidad y los ingredientes" },
        { value: "necesidad", label: "Que responda a una necesidad concreta" },
        { value: "comodidad", label: "La comodidad de comprarlo" },
        { value: "ambiental", label: "El impacto ambiental" },
        { value: "opiniones", label: "Las opiniones y experiencias de otras personas" }
      ]
    },
    {
      id: "improvements",
      type: "multi",
      question: "¿Qué te gustaría mejorar o encontrar en los productos que utilizas?",
      hint: "Puedes elegir varias opciones.",
      summaryLabel: "Qué le gustaría mejorar o encontrar",
      options: [
        { value: "presupuesto", label: "Encontrar opciones que se ajusten mejor a mi presupuesto" },
        { value: "rutina", label: "Mejorar mi rutina de cuidado personal" },
        { value: "hogar", label: "Encontrar productos para el hogar que me convenzan" },
        { value: "bienestar", label: "Conocer alternativas para mis necesidades de bienestar" },
        { value: "descubrir", label: "Descubrir productos nuevos" },
        { value: "satisfecho", label: "Estoy satisfecho con lo que utilizo actualmente" }
      ]
    },
    {
      id: "discoveryBehavior",
      type: "choice",
      question: "Si descubrieras un producto que te interesa, ¿qué preferirías hacer?",
      summaryLabel: "Ante un producto nuevo prefiere",
      options: [
        { value: "caracteristicas", label: "Conocer sus características y su precio" },
        { value: "comparar", label: "Compararlo con los que utilizo actualmente" },
        { value: "probar", label: "Probarlo antes de decidir, si es posible" },
        { value: "recomendacion", label: "Recibir una recomendación personalizada" },
        { value: "informarme", label: "De momento, solo quiero informarme" }
      ]
    },
    {
      id: "interest",
      type: "choice",
      kicker: "La más importante",
      intro: "He conocido una tienda online que distribuye productos de uso diario, naturales y amigables con el medio ambiente, con excelente relación calidad-precio.",
      question: "¿Te gustaría que te explicara un poco sobre ellos?",
      summaryLabel: "Interés principal",
      options: [
        { value: "soloComprar", label: "Solo me interesa conocer y comprar productos para mí" },
        { value: "ingresoExtra", label: "Me interesa comprar y explorar cómo obtener ingresos recomendándolos" },
        { value: "comoFunciona", label: "Quiero saber primero cómo funciona" }
      ]
    },
    {
      id: "recommendMotivation",
      type: "multi",
      showIf: (a) => a.interest === "ingresoExtra" || a.interest === "comoFunciona",
      question: "Si encontraras productos que encajaran contigo, ¿qué te motivaría a recomendarlos a otras personas?",
      hint: "Puedes marcar varias opciones.",
      summaryLabel: "Qué le motivaría a recomendar",
      options: [
        { value: "comision", label: "Obtener una comisión extra" },
        { value: "compartir", label: "Compartir productos que utilizo y me gustan" },
        { value: "bienestarInfo", label: "Dar a conocer opciones relacionadas con el bienestar y el cuidado personal" },
        { value: "ambientalElegir", label: "Elegir productos teniendo en cuenta su impacto ambiental" },
        { value: "ayudar", label: "Ayudar a otras personas a encontrar productos adecuados para sus necesidades" },
        { value: "emprender", label: "Explorar una actividad de emprendimiento y desarrollar mi propio equipo" }
      ]
    },
    {
      id: "timeCommitment",
      type: "choice",
      showIf: (a) => a.interest === "ingresoExtra",
      question: "¿Cuánto tiempo estarías dispuesto/a a dedicar a explorar esta posibilidad?",
      summaryLabel: "Tiempo que dedicaría",
      options: [
        { value: "soloInfo", label: "Solo quiero conocer la información, sin compromiso" },
        { value: "horasSemana", label: "Unas horas a la semana" },
        { value: "masTiempo", label: "Podría dedicarle más tiempo si veo que encaja conmigo" }
      ]
    },
    {
      id: "wantsToReceive",
      type: "choice",
      question: "¿Qué te gustaría recibir de mi parte?",
      summaryLabel: "Qué le gustaría recibir",
      options: [
        { value: "infoProductos", label: "Información sobre productos que encajen con mis intereses" },
        { value: "preciosOpciones", label: "Precios y opciones para comparar" },
        { value: "comoFuncionaRecomendar", label: "Información sobre cómo funciona la recomendación de productos y las posibles comisiones" },
        { value: "soloResponder", label: "Por ahora, solo quería responder al cuestionario" }
      ]
    }
  ],

  // Mensaje de resultado según la respuesta a la pregunta clave (interest).
  archetypes: {
    soloComprar: {
      title: "¡Genial! Te cuento sobre los productos",
      body: "Perfecto, te paso el catálogo y resolvemos cualquier duda que tengas para que elijas lo que mejor te encaje."
    },
    ingresoExtra: {
      title: "¡Me encanta que te intereses por ambas cosas!",
      body: "Te cuento primero de los productos y, si te gusta lo que ves, te explico cómo funciona la parte de recomendarlos y generar un ingreso extra con ello."
    },
    comoFunciona: {
      title: "Sin problema, te lo explico con calma",
      body: "Te cuento cómo funciona la tienda, qué categorías de productos tiene y cómo es recomendarlos, para que decidas con toda la información."
    }
  },

  // Saludo del mensaje de WhatsApp según lo que pidió recibir (permiso
  // explícito, para no enviar nada que no haya pedido).
  receiveGreetings: {
    infoProductos: "acabo de hacer tu test y me gustaría recibir información sobre productos que encajen con mis intereses.",
    preciosOpciones: "acabo de hacer tu test y me gustaría recibir precios y opciones para comparar.",
    comoFuncionaRecomendar: "acabo de hacer tu test y me gustaría que me cuentes cómo funciona recomendar productos y las posibles comisiones.",
    soloResponder: "acabo de hacer tu test. Por ahora solo quería responderlo, pero aquí tienes mis respuestas por si te sirven."
  },
  defaultReceiveGreeting: "acabo de hacer tu test rápido y me gustaría que me cuentes más."
};
