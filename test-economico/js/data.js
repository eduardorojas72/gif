// Contenido estático del test: preguntas y perfiles de resultado.
// Importante: este test es solo diagnóstico. No incluye consejos ni
// pasos a seguir; el único "siguiente paso" que ofrece es la invitación
// a hablar por WhatsApp al final.
const DATA = {
  questions: [
    {
      id: "finances",
      type: "calculator",
      question: "Calculemos tu saldo mensual",
      hint: "Escribe tus ingresos y gastos mensuales. Déjalo en blanco (o en 0) lo que no tengas.",
      income: [
        { id: "salary", label: "Ingreso de nómina", placeholder: "Ej. 1500" },
        { id: "extraIncome", label: "Otro ingreso (horas extra, Plan B...)", placeholder: "Ej. 0" }
      ],
      expenses: [
        { id: "rent", label: "Alquiler / hipoteca", placeholder: "Ej. 600" },
        { id: "transport", label: "Transporte (coche, gasolina, transporte público)", placeholder: "Ej. 150" },
        { id: "food", label: "Alimentación", placeholder: "Ej. 300" },
        { id: "utilities", label: "Servicios (agua, luz, teléfono, gas)", placeholder: "Ej. 120" },
        { id: "subscriptions", label: "Suscripciones (Netflix, Amazon, Disney+...)", placeholder: "Ej. 30" },
        { id: "insurance", label: "Seguros (importe anual: lo prorrateamos a mensual)", placeholder: "Ej. 600", annual: true },
        { id: "debtPayments", label: "Cuotas de tarjeta y préstamos", placeholder: "Ej. 100" },
        { id: "other", label: "Otros gastos", placeholder: "Ej. 50" }
      ]
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
      id: "incomeGoal",
      type: "choice",
      question: "Si pudieras aumentar tus ingresos, ¿qué te gustaría?",
      options: [
        { value: "hours", label: "Trabajar más horas y ganar más" },
        { value: "recurring", label: "Ganar más de forma recurrente, trabajando pocas horas extra" },
        { value: "double", label: "Tener otro empleo que me permita ganar al menos el doble, en las mismas horas que ahora" }
      ]
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
      key: "deuda_preocupa",
      emoji: "⚠️",
      label: "Margen positivo, pero con deudas que pesan",
      risk: "Alto",
      description: "Tu saldo mensual es positivo, pero tienes deudas (tarjetas, préstamos...) que te cuesta bajar y te preocupan. Aunque hoy cierras el mes bien, esas deudas son un lastre que conviene vigilar antes de que crezcan."
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
      description: "Dedicas muchas horas al trabajo, pero toda tu economía depende de una única fuente de ingreso y buscas una forma mejor de ganar más. Si esa fuente falla, no hay red debajo."
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
  ],

  // Etiquetas cortas para personalizar el mensaje de WhatsApp según lo que
  // la persona dijo que le gustaría (pregunta "incomeGoal").
  incomeGoalLabels: {
    hours: "ganar más trabajando más horas",
    recurring: "ganar más de forma recurrente sin sumar muchas horas extra",
    double: "tener otro empleo que le permita ganar el doble en las mismas horas"
  }
};
