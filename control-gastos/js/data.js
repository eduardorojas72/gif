// Contenido estático: categorías, consejos y recursos recomendados.
const DATA = {
  expenseCategories: [
    { id: "alimentacion", label: "Alimentación", icon: "🍽️" },
    { id: "transporte", label: "Transporte", icon: "🚌" },
    { id: "vivienda", label: "Vivienda", icon: "🏠" },
    { id: "ocio", label: "Ocio", icon: "🎬" },
    { id: "salud", label: "Salud", icon: "💊" },
    { id: "compras", label: "Compras", icon: "🛍️" },
    { id: "suscripciones", label: "Suscripciones", icon: "🔁" },
    { id: "educacion", label: "Educación", icon: "📚" },
    { id: "atomy", label: "Compra de Productos Atomy", icon: "📦" },
    { id: "otros", label: "Otros", icon: "✨" }
  ],
  incomeCategories: [
    { id: "salario", label: "Salario", icon: "💼" },
    { id: "freelance", label: "Freelance", icon: "🧑‍💻" },
    { id: "ventas", label: "Ventas", icon: "🏷️" },
    { id: "regalos", label: "Regalos", icon: "🎁" },
    { id: "otros_ing", label: "Otros", icon: "✨" }
  ],
  paymentMethods: [
    { id: "efectivo", label: "Efectivo" },
    { id: "debito", label: "Tarjeta débito" },
    { id: "credito", label: "Tarjeta crédito" },
    { id: "movil", label: "Pago móvil" },
    { id: "transferencia", label: "Transferencia" }
  ],

  // País → moneda, para preguntarlo una vez en el cuestionario inicial y
  // formatear todos los importes automáticamente.
  countries: [
    { code: "ES", name: "España", currency: "EUR" },
    { code: "MX", name: "México", currency: "MXN" },
    { code: "CO", name: "Colombia", currency: "COP" },
    { code: "AR", name: "Argentina", currency: "ARS" },
    { code: "CL", name: "Chile", currency: "CLP" },
    { code: "PE", name: "Perú", currency: "PEN" },
    { code: "EC", name: "Ecuador", currency: "USD" },
    { code: "US", name: "Estados Unidos", currency: "USD" },
    { code: "GT", name: "Guatemala", currency: "GTQ" },
    { code: "CR", name: "Costa Rica", currency: "CRC" },
    { code: "PA", name: "Panamá", currency: "USD" },
    { code: "DO", name: "República Dominicana", currency: "DOP" },
    { code: "UY", name: "Uruguay", currency: "UYU" },
    { code: "BO", name: "Bolivia", currency: "BOB" },
    { code: "PY", name: "Paraguay", currency: "PYG" },
    { code: "HN", name: "Honduras", currency: "HNL" },
    { code: "SV", name: "El Salvador", currency: "USD" },
    { code: "NI", name: "Nicaragua", currency: "NIO" },
    { code: "VE", name: "Venezuela", currency: "VES" },
    { code: "GB", name: "Reino Unido", currency: "GBP" },
    { code: "OTRO", name: "Otro país", currency: "USD" }
  ],

  currencySymbols: {
    EUR: "€", USD: "$", MXN: "MX$", GBP: "£", COP: "COL$", ARS: "AR$",
    CLP: "CL$", PEN: "S/", GTQ: "Q", CRC: "₡", DOP: "RD$", UYU: "$U",
    BOB: "Bs", PYG: "₲", HNL: "L", NIO: "C$", VES: "Bs.S"
  },

  // Opciones del cuestionario inicial.
  obstacles: [
    { id: "no_se", label: "No sé en qué se me va el dinero" },
    { id: "impulso", label: "Compro cosas por impulso" },
    { id: "suscripciones", label: "Tengo suscripciones que no uso" },
    { id: "deudas", label: "Tengo deudas o pagos de tarjeta pendientes" },
    { id: "irregular", label: "Mis ingresos son irregulares" },
    { id: "imprevistos", label: "Gastos inesperados o familiares" },
    { id: "sin_presupuesto", label: "Nunca he llevado un presupuesto" }
  ],
  savingsPurposes: [
    { id: "viajar", label: "Viajar", icon: "✈️" },
    { id: "familia", label: "Salir con familia o amigos", icon: "🎉" },
    { id: "auto", label: "Comprar un auto", icon: "🚗" },
    { id: "casa", label: "Comprar una casa", icon: "🏠" },
    { id: "ayudar", label: "Ayudar a familiares", icon: "🤝" },
    { id: "donar", label: "Donar a una ONG", icon: "💚" },
    { id: "otro", label: "Otro", icon: "✨" }
  ],

  // Consejos de ahorro originales, inspirados en principios de educación financiera
  // conocidos (regla 50/30/20, automatización del ahorro, aversión a la pérdida, etc.)
  tips: [
    {
      title: "No es cuestión de ganar más",
      body: "Es cuestión de gastar con inteligencia. Antes de buscar un ingreso extra, revisa primero en qué se te está yendo el dinero que ya ganas."
    },
    {
      title: "Sobres virtuales por categoría",
      body: "Una técnica clásica de presupuesto: asigna un límite mensual a cada categoría, como si fuera un sobre de efectivo. Cuando el sobre se acaba, ese gasto espera al mes siguiente. Es un complemento a tu meta de gasto diario."
    },
    {
      title: "Paga primero la deuda más cara",
      body: "Si tienes varias deudas, prioriza la que tenga el interés más alto (normalmente la tarjeta de crédito). A largo plazo ahorrarás más que pagando primero la de menor saldo."
    },
    {
      title: "Págate a ti mismo primero",
      body: "En cuanto recibas un ingreso, aparta un porcentaje fijo hacia el ahorro antes de gastar en cualquier otra cosa. Automatizarlo evita que dependas de la fuerza de voluntad."
    },
    {
      title: "Regla 50/30/20",
      body: "Una forma sencilla de repartir tu ingreso mensual: 50% a necesidades (vivienda, comida, transporte), 30% a deseos (ocio, compras) y 20% a ahorro o pago de deudas. Úsala como referencia, no como obligación rígida; esta app calcula tu meta de ahorro diario a partir de la cuota que definas, no necesariamente del 20%."
    },
    {
      title: "Las rachas motivan más que las cifras",
      body: "Cumplir tu meta diaria varios días seguidos genera una racha. Perder una racha larga duele más que lo que anima ganarla, así que úsala a tu favor: no la rompas hoy."
    },
    {
      title: "Revisa tus suscripciones cada trimestre",
      body: "Las suscripciones pequeñas se acumulan sin que las notes. Repásalas cada tres meses y cancela las que no usas de verdad."
    },
    {
      title: "Espera 24 horas antes de una compra no planificada",
      body: "Si algo no estaba en tu lista, dale un día. Muchas ganas de comprar desaparecen solas cuando dejan de ser impulsivas."
    },
    {
      title: "Evita la inflación de estilo de vida",
      body: "Cuando tus ingresos suban, aumenta tu ahorro en la misma proporción antes de aumentar tus gastos fijos."
    },
    {
      title: "Registra hasta los gastos pequeños",
      body: "Un café o un trayecto suelto no parecen importantes, pero sumados durante un mes suelen sorprender. Anótalos todos."
    },
    {
      title: "Fondo de emergencia antes que inversión",
      body: "Antes de invertir, ten ahorrado el equivalente a 3-6 meses de gastos básicos. Te protege de tener que endeudarte ante un imprevisto."
    }
  ],

  // Recursos encontrados en la investigación (libros y charlas). Se listan con su
  // fuente para que el usuario pueda profundizar; no se reproduce el contenido
  // protegido de los libros, solo referencias.
  resources: {
    books: [
      { title: "La bolsa o la vida", author: "Vicki Robin y Joe Dominguez", note: "Un clásico que invita a replantear la relación entre tiempo, trabajo y dinero." },
      { title: "Economía básica", author: "Thomas Sowell", note: "Introducción clara a cómo funcionan los mercados y la toma de decisiones económicas." },
      { title: "Ten peor coche que tu vecino", author: "—", note: "Sobre cambiar la forma de ver el dinero para mejorar la capacidad de ahorro." },
      { title: "Invierte en ti", author: "—", note: "Gestión de la economía familiar con vista a la jubilación." },
      { title: "Invierte con poco", author: "—", note: "Cómo empezar a mejorar tu situación económica con poco capital inicial." }
    ],
    talks: [
      { title: "Domina tus finanzas personales en un 2x3", author: "Alicia Márquez (TEDx)", note: "El método \"2x3\" para identificar las principales amenazas a la libertad financiera." },
      { title: "Educación financiera para toda la vida", author: "Nicolás González (TEDx)", note: "Por qué combatir el analfabetismo financiero es una prioridad." },
      { title: "Finanzas Personales y las 4 T's", author: "Alexandra Kafie (TEDx)", note: "Claves para ordenar las finanzas del hogar." },
      { title: "Tomando el control de nuestro futuro financiero", author: "Rodrigo Álvarez (TEDx)", note: "Técnicas para crear hábitos saludables con el dinero." }
    ],
    // Artículos de referencia usados durante la investigación de esta app.
    articles: [
      { title: "10 libros muy recomendables sobre finanzas personales", source: "BBVA", url: "https://www.bbva.com/es/salud-financiera/10-libros-recomendables-finanzas-personales/" },
      { title: "Mejores libros de ahorro y finanzas personales", source: "PreAhorro", url: "https://preahorro.com/finanzas-personales/mejores-libros-ahorro-finanzas-personales/" },
      { title: "TED Talks de finanzas personales (las más inspiradoras)", source: "100 Ladrillos", url: "https://blog.100ladrillos.com/ted-talks/" },
      { title: "8 charlas TED imprescindibles sobre finanzas", source: "Risbel Magazine", url: "https://risbelmagazine.es/mejores-videos-educacion-financiera-charlas-ted/" },
      { title: "Gamification for Personal-Finance Apps", source: "Trophy.so", url: "https://trophy.so/blog/gamification-for-personal-finance-apps" }
    ]
  },

  // Bancos de demostración para el enlace de cuentas simulado.
  demoBanks: [
    { id: "demo-visa", name: "Tarjeta Visa Demo", kind: "Tarjeta de crédito" },
    { id: "demo-banco", name: "Banco Simulado", kind: "Cuenta corriente" },
    { id: "demo-wallet", name: "Billetera Móvil Demo", kind: "Pago móvil" }
  ]
};
