// Contenido estático del test: preguntas y textos del diagnóstico final.
// Test corto de concienciación sobre detergentes convencionales (químicos,
// piel, medio ambiente, gasto). No menciona ningún producto por su nombre:
// el objetivo es que la persona tome conciencia y pida información por
// WhatsApp sobre una alternativa más saludable, económica y sostenible.
const DATA = {
  questions: [
    {
      id: "usualDetergent",
      type: "choice",
      question: "¿Qué tipo de detergente usas normalmente para lavar la ropa?",
      summaryLabel: "Detergente habitual",
      options: [
        { value: "comercialConvencional", label: "Un detergente comercial convencional" },
        { value: "ecologico", label: "Un detergente ecológico o natural" },
        { value: "noSeguro", label: "No estoy segura/o" }
      ]
    },
    {
      id: "readsLabel",
      type: "choice",
      question: "¿Sueles revisar los ingredientes del detergente antes de comprarlo?",
      summaryLabel: "Revisa la etiqueta",
      options: [
        { value: "siempre", label: "Sí, siempre reviso la etiqueta" },
        { value: "aVeces", label: "A veces, por curiosidad" },
        { value: "nunca", label: "Nunca, no suelo fijarme" }
      ]
    },
    {
      id: "skinReaction",
      type: "choice",
      question: "¿Tú o alguien en casa ha notado picor, irritación o alergia con ropa recién lavada?",
      summaryLabel: "Reacciones en la piel",
      options: [
        { value: "frecuente", label: "Sí, con cierta frecuencia" },
        { value: "algunaVez", label: "Alguna vez, pero no siempre" },
        { value: "nunca", label: "Nunca lo hemos notado" }
      ]
    },
    {
      id: "doseUsage",
      type: "choice",
      question: "¿Cuánto detergente usas en cada lavado?",
      summaryLabel: "Dosis por lavado",
      options: [
        { value: "dosisRecomendada", label: "La dosis recomendada" },
        { value: "masDeLaDosis", label: "Más de la dosis, para que quede \"más limpio\"" },
        { value: "noMido", label: "No mido, lo hago al ojo" }
      ]
    },
    {
      id: "environmentConcern",
      type: "choice",
      question: "¿Te preocupa que los químicos del detergente terminen contaminando ríos y aguas al lavarse?",
      summaryLabel: "Preocupación ambiental",
      options: [
        { value: "muchoSi", label: "Sí, me preocupa bastante" },
        { value: "algoSi", label: "Algo, pero no mucho" },
        { value: "noLoHabiaPensado", label: "No lo había pensado" }
      ]
    },
    {
      id: "monthlySpend",
      type: "choice",
      question: "¿Cuánto gastas al mes, aproximadamente, en detergente y suavizante?",
      summaryLabel: "Gasto mensual aprox.",
      options: [
        { value: "menos10", label: "Menos de 10 €" },
        { value: "entre10y20", label: "Entre 10 € y 20 €" },
        { value: "masDe20", label: "Más de 20 €" }
      ]
    }
  ],

  // Beneficios genéricos que se muestran en el resultado (sin mencionar
  // ningún producto ni marca): ahorro, salud y medio ambiente.
  benefits: [
    {
      icon: "💰",
      title: "Ahorro",
      text: "Las fórmulas concentradas rinden muchos más lavados por el mismo gasto mensual."
    },
    {
      icon: "🌿",
      title: "Salud",
      text: "Sin químicos agresivos ni perfumes sintéticos, hay menos riesgo de irritación o alergias en la piel."
    },
    {
      icon: "🌍",
      title: "Medio ambiente",
      text: "Las fórmulas biodegradables reducen el impacto de lo que termina en ríos y aguas cada vez que lavas."
    }
  ],

  // Arquetipos del diagnóstico final, según el nivel de "riesgo" detectado
  // en las respuestas (hábitos, piel, ambiente). Se eligen en app.js según
  // una puntuación; "default" es el que queda si ninguno calza.
  archetypes: [
    {
      key: "alto",
      title: "Tu piel, tu bolsillo y el planeta podrían estar pagando un precio alto",
      body: "Varias de tus respuestas apuntan a un detergente que puede llevar químicos agresivos, perfumes sintéticos y dosis de más en cada lavado. Esto no solo afecta a tu piel: también termina en el agua y en tu gasto mensual."
    },
    {
      key: "medio",
      title: "Vas por buen camino, pero aún hay margen de mejora",
      body: "Algunas de tus respuestas muestran buenos hábitos, pero hay señales de que tu detergente actual podría estar afectando a tu piel, tu bolsillo o el medio ambiente más de lo que crees."
    },
    {
      key: "bajo",
      title: "Ya tienes buena conciencia, pero quizá no todo lo que crees",
      body: "Cuidas bastante lo que usas en casa. Aun así, muchos detergentes \"normales\" llevan ingredientes que no siempre se notan a simple vista, aunque la etiqueta parezca inofensiva."
    }
  ]
};
