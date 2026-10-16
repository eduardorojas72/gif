// Contenido estático del test: preguntas y textos de resultado.
// Test corto (5 preguntas) pensado para acompañar un saludo a un amigo,
// no un cuestionario largo tipo diagnóstico. La pregunta clave es la
// última: separa a quien solo quiere comprar de quien también podría
// interesarse en recomendar los productos para un ingreso extra.
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
      id: "satisfaction",
      type: "choice",
      question: "¿Qué tal estás con los productos que utilizas actualmente?",
      summaryLabel: "Satisfacción actual",
      options: [
        { value: "satisfecho", label: "Estoy satisfecho; por ahora no cambiaría" },
        { value: "mejoraria", label: "Estoy bien, pero mejoraría algunas cosas" },
        { value: "alternativas", label: "Me gustaría tener otras alternativas" }
      ]
    },
    {
      id: "improvements",
      type: "multi",
      question: "¿Qué mejorarías en esos productos?",
      hint: "Puedes elegir varias opciones.",
      summaryLabel: "Qué mejoraría",
      options: [
        { value: "precio", label: "Mejor relación calidad-precio" },
        { value: "calidad", label: "Mejor calidad e ingredientes sin importar el precio" },
        { value: "adaptados", label: "Que se adapten a mis necesidades" },
        { value: "naturales", label: "Que sean naturales y amigables con el medio ambiente, pero que a la vez no sean tan caros" }
      ]
    },
    {
      id: "openToOptions",
      type: "choice",
      question: "¿Estarías dispuesto/a a conocer otras opciones?",
      summaryLabel: "Abierto a nuevas opciones",
      options: [
        { value: "siComparo", label: "Sí, me gusta comparar antes de decidir" },
        { value: "dependePrecio", label: "Depende del precio y las características" },
        { value: "noBusco", label: "Ahora mismo no busco cambiar" }
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
  }
};
