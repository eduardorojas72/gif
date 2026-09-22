// Contenido estático del test: preguntas y perfiles de resultado.
// Importante: este test es solo diagnóstico. No incluye consejos ni
// pasos a seguir; el único "siguiente paso" que ofrece es la invitación
// a hablar por WhatsApp al final.
const DATA = {
  questions: [
    {
      id: "income",
      type: "number",
      question: "¿Cuál es tu ingreso mensual aproximado?",
      hint: "Suma todo lo que entra: nómina, extras, ventas...",
      placeholder: "Ej. 1500",
      required: true
    },
    {
      id: "expenses",
      type: "number",
      question: "¿Cuánto gastas al mes en total?",
      hint: "Vivienda, comida, transporte, ocio, cuotas... todo incluido.",
      placeholder: "Ej. 1400",
      required: true
    },
    {
      id: "savings",
      type: "number",
      question: "¿Cuánto consigues ahorrar realmente cada mes?",
      hint: "No la meta ideal: lo que de verdad te queda guardado.",
      placeholder: "Ej. 50",
      required: true
    },
    {
      id: "debt",
      type: "choice",
      question: "¿Tienes deudas activas que te preocupan?",
      hint: "Tarjetas de crédito, préstamos personales, financiaciones...",
      options: [
        { value: "yes", label: "Sí, y me cuesta bajarlas" },
        { value: "some", label: "Tengo alguna, pero controlada" },
        { value: "no", label: "No tengo deudas" }
      ]
    },
    {
      id: "emergencyFund",
      type: "choice",
      question: "Si hoy dejaras de recibir tu ingreso principal, ¿cuánto tiempo podrías cubrir tus gastos con lo que tienes ahorrado?",
      options: [
        { value: "none", label: "Nada, o solo unos días" },
        { value: "less1", label: "Menos de 1 mes" },
        { value: "1to3", label: "Entre 1 y 3 meses" },
        { value: "more3", label: "Más de 3 meses" }
      ]
    },
    {
      id: "incomeSources",
      type: "choice",
      question: "¿De cuántas fuentes distintas depende tu ingreso actual?",
      options: [
        { value: "one", label: "Solo una" },
        { value: "two_plus", label: "Dos o más" }
      ]
    },
    {
      id: "workHours",
      type: "choice",
      question: "¿Cuántas horas trabajas al día aproximadamente, sumando todos tus empleos?",
      options: [
        { value: "low", label: "Menos de 6 horas" },
        { value: "normal", label: "Entre 6 y 8 horas" },
        { value: "high", label: "Entre 8 y 10 horas" },
        { value: "veryhigh", label: "Más de 10 horas" }
      ]
    },
    {
      id: "satisfaction",
      type: "scale",
      question: "En una escala del 1 al 5, ¿qué tan satisfecho/a estás con lo que ganas hoy?",
      hint: "1 = nada satisfecho/a · 5 = totalmente satisfecho/a",
      min: 1,
      max: 5
    }
  ],

  // Perfiles de resultado, en orden de prioridad (el primero que encaje
  // según computeProfile() en app.js es el que se muestra). Solo describen
  // la situación: no incluyen ningún consejo ni plan de acción.
  profiles: [
    {
      key: "rojos",
      emoji: "🚨",
      label: "En números rojos",
      risk: "Muy alto",
      description: "Ahora mismo gastas igual o más de lo que ingresas. Tu margen mensual real es cero o negativo, y es probable que cubras la diferencia con tarjetas o ayuda externa."
    },
    {
      key: "limite",
      emoji: "⚖️",
      label: "Al límite, sin margen",
      risk: "Alto",
      description: "Consigues cubrir tus gastos, pero sin apenas margen ni fondo de emergencia. Cualquier imprevisto (una avería, un gasto médico) te puede desestabilizar."
    },
    {
      key: "hamster",
      emoji: "🐹",
      label: "Mucho esfuerzo, un solo ingreso",
      risk: "Alto",
      description: "Dedicas muchas horas al trabajo, pero toda tu economía depende de una única fuente de ingreso y no estás satisfecho/a con lo que ganas. Si esa fuente falla, no hay red debajo."
    },
    {
      key: "ahorra_dependiente",
      emoji: "🌱",
      label: "Ahorras, pero dependes de un solo ingreso",
      risk: "Medio",
      description: "Tienes hábitos sanos de ahorro y cierto colchón, pero toda tu estabilidad económica depende de una sola fuente de ingreso."
    },
    {
      key: "solido",
      emoji: "🚀",
      label: "Base sólida",
      risk: "Bajo",
      description: "Generas margen mes a mes, tienes fondo de emergencia y más de una fuente de ingreso. Tu situación actual es sólida."
    }
  ]
};
