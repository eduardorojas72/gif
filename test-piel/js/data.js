// Contenido estático del test: preguntas y textos del diagnóstico final.
// Igual que el test de economía: solo diagnóstico, sin dar consejos
// directos. Aquí, además, el objetivo es recoger los hábitos de cuidado
// de la piel de quien responde para poder recomendarle algo por WhatsApp,
// así que el resultado se envía completo (no solo un resumen genérico).
const DATA = {
  questions: [
    {
      id: "gender",
      type: "choice",
      question: "Para adaptar el test, ¿cómo te identificas?",
      summaryLabel: "Género",
      options: [
        { value: "hombre", label: "Hombre", image: "img/hombre.webp" },
        { value: "mujer", label: "Mujer", image: "img/mujer.webp" }
      ]
    },
    {
      id: "age",
      type: "number",
      question: "¿Qué edad tienes?",
      hint: "Nos ayuda a ajustar la recomendación.",
      placeholder: "Ej. 32",
      unit: "años",
      summaryLabel: "Edad"
    },
    {
      id: "skinType",
      type: "choice",
      question: "¿Cómo describirías tu piel la mayoría de los días?",
      summaryLabel: "Tipo de piel",
      image: "img/skin-types.webp",
      options: [
        { value: "grasa", label: "Grasa / con brillo", shortLabel: "grasa" },
        { value: "seca", label: "Seca / con sensación de tirantez", shortLabel: "seca" },
        { value: "mixta", label: "Mixta (grasa en zona T, seca en el resto)", shortLabel: "mixta" },
        { value: "sensible", label: "Sensible / se irrita con facilidad", shortLabel: "sensible" },
        { value: "noSe", label: "No estoy segura/o", shortLabel: "sin determinar" }
      ]
    },
    {
      id: "concerns",
      type: "multi",
      question: "¿Qué es lo que más te preocupa de tu piel ahora mismo?",
      hint: "Puedes elegir varias opciones.",
      summaryLabel: "Preocupaciones",
      image: "img/concerns.webp",
      options: [
        { value: "arrugas", label: "Arrugas o líneas de expresión" },
        { value: "manchas", label: "Manchas o tono desigual" },
        { value: "acne", label: "Acné o granitos" },
        { value: "poros", label: "Poros abiertos" },
        { value: "flacidez", label: "Flacidez / pérdida de firmeza" },
        { value: "sequedad", label: "Sequedad o deshidratación" }
      ]
    },
    {
      id: "makeupUse",
      type: "choice",
      showIf: (a) => a.gender === "mujer",
      question: "¿Usas maquillaje habitualmente?",
      summaryLabel: "Usa maquillaje",
      options: [
        { value: "si", label: "Sí" },
        { value: "no", label: "No" }
      ]
    },
    {
      id: "makeupRemoval",
      type: "choice",
      showIf: (a) => a.gender === "mujer" && a.makeupUse === "si",
      question: "¿Qué usas para desmaquillarte?",
      summaryLabel: "Cómo se desmaquilla",
      options: [
        { value: "toallitas", label: "Toallitas desmaquillantes" },
        { value: "micelar", label: "Agua micelar" },
        { value: "aceite", label: "Aceite desmaquillante" },
        { value: "jabon", label: "Jabón o limpiador facial" },
        { value: "noSiempre", label: "No me desmaquillo siempre" }
      ]
    },
    {
      id: "makeupPrep",
      type: "choice",
      showIf: (a) => a.gender === "mujer" && a.makeupUse === "si",
      question: "¿Usas algo antes de maquillarte (prebase, hidratante)?",
      summaryLabel: "Prepara la piel antes de maquillarse",
      options: [
        { value: "siempre", label: "Sí, siempre" },
        { value: "aveces", label: "A veces" },
        { value: "no", label: "No, me maquillo directo" }
      ]
    },
    {
      id: "routine",
      type: "choice",
      question: "¿Sigues una rutina de cuidado facial a diario?",
      summaryLabel: "Rutina facial",
      image: "img/routine.jpg",
      options: [
        { value: "mananaNoche", label: "Sí, mañana y noche" },
        { value: "aveces", label: "Solo a veces" },
        { value: "no", label: "No tengo ninguna rutina fija" }
      ]
    },
    {
      id: "sunscreen",
      type: "choice",
      question: "¿Con qué frecuencia usas protector solar?",
      summaryLabel: "Protector solar",
      image: "img/sunscreen.jpg",
      options: [
        { value: "diario", label: "Todos los días" },
        { value: "solFuerte", label: "Solo si voy a la playa o hace mucho sol" },
        { value: "casiNunca", label: "Casi nunca" }
      ]
    },
    {
      id: "sleepWater",
      type: "choice",
      question: "¿Cómo dirías que es tu día a día en estos aspectos?",
      summaryLabel: "Sueño e hidratación",
      image: "img/sleepwater.jpg",
      options: [
        { value: "bienBien", label: "Duermo bien y bebo bastante agua" },
        { value: "bienPoca", label: "Duermo bien pero bebo poca agua" },
        { value: "pocoBien", label: "Duermo poco pero bebo bastante agua" },
        { value: "pocoPoca", label: "Duermo poco y bebo poca agua" }
      ]
    },
    {
      id: "actives",
      type: "choice",
      question: "¿Usas actualmente algún producto con ingredientes activos (retinol, ácidos exfoliantes, vitamina C...)?",
      summaryLabel: "Ingredientes activos",
      image: "img/actives.jpg",
      options: [
        { value: "regular", label: "Sí, regularmente" },
        { value: "rara", label: "Sí, pero rara vez" },
        { value: "nunca", label: "No, nunca" },
        { value: "noSe", label: "No sé qué es eso" }
      ]
    },
    {
      id: "triedBefore",
      type: "choice",
      question: "¿Has probado ya algún tratamiento o crema específica para esto?",
      summaryLabel: "Tratamientos previos",
      image: "img/triedbefore.jpg",
      options: [
        { value: "variasSinResultado", label: "Sí, varias cosas, sin buenos resultados" },
        { value: "algunaVezNoSegui", label: "Sí, alguna vez, pero no seguí con nada" },
        { value: "nunca", label: "No, nunca he probado nada específico" }
      ]
    },
    {
      id: "goal",
      type: "choice",
      question: "Si pudieras mejorar un aspecto de tu piel en los próximos 2 meses, ¿qué elegirías?",
      summaryLabel: "Objetivo",
      image: "img/goal.jpg",
      options: [
        { value: "luminosidad", label: "Verme más luminosa y descansada" },
        { value: "arrugas", label: "Reducir arrugas o líneas finas" },
        { value: "manchas", label: "Unificar el tono y las manchas" },
        { value: "brilloAcne", label: "Controlar el brillo o el acné" }
      ]
    }
  ],

  // Imagen de la pantalla de resultado, según género + tipo de piel.
  // Se van añadiendo aquí a medida que llega cada foto (8 combinaciones:
  // hombre/mujer x grasa/seca/mixta/sensible). Mientras una combinación
  // no tenga foto propia, se usa resultFallbackImage.
  resultImages: {
    hombre: {},
    mujer: {}
  },
  resultFallbackImage: "img/skin-types.webp"
};
