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
    { id: "familia", label: "Salir en familia", icon: "👨‍👩‍👧" },
    { id: "amigos", label: "Salir con amigos", icon: "🎉" },
    { id: "auto", label: "Comprar un auto", icon: "🚗" },
    { id: "casa", label: "Comprar una casa", icon: "🏠" },
    { id: "ayudar", label: "Ayudar a familiares", icon: "🤝" },
    { id: "donar", label: "Donar a una ONG", icon: "💚" },
    { id: "otro", label: "Otro", icon: "✨" }
  ],

  // Categorías de la "foto" de gastos mensuales del cuestionario de diagnóstico,
  // distintas de expenseCategories (esas son para registrar movimientos día a día).
  expenseSnapshotCategories: [
    { id: "alquiler", label: "Alquiler / hipoteca", icon: "🏠" },
    { id: "coche", label: "Coche / transporte", icon: "🚗" },
    { id: "servicios", label: "Servicios (luz, agua, internet...)", icon: "💡" },
    { id: "alimentacion", label: "Alimentación", icon: "🍽️" },
    { id: "seguros", label: "Seguros", icon: "🛡️" },
    { id: "deudasTarjetas", label: "Deudas de tarjetas", icon: "💳" },
    { id: "deudasPrestamos", label: "Deudas de préstamos", icon: "🏦" },
    { id: "salidas", label: "Salidas y ocio", icon: "🎉" },
    { id: "otros", label: "Otros", icon: "✨" }
  ],

  // Arquetipos financieros del diagnóstico inicial: cada uno describe una
  // relación distinta entre ingreso, horas trabajadas, gasto y ahorro real.
  archetypes: [
    {
      key: "ahorrador",
      label: "El Ahorrador Consciente",
      emoji: "🌱",
      description: "Gastas por debajo de lo que ganas y ya estás construyendo un colchón de verdad. Sigue así: automatiza ese ahorro para que no dependa de la fuerza de voluntad."
    },
    {
      key: "hamster",
      label: "El Hámster",
      emoji: "🐹",
      description: "Trabajas muchas horas (o varios empleos) pero el dinero apenas te alcanza para ahorrar algo. La rueda gira rápido, pero no avanzas. El problema no es cuánto trabajas, sino cuánto se te va."
    },
    {
      key: "grifo",
      label: "El Grifo Abierto",
      emoji: "🚰",
      description: "Tus gastos igualan o superan lo que ingresas cada mes. Antes de pensar en ahorrar, hay que cerrar la fuga: identifica en qué se te va el dinero y ponle límite."
    },
    {
      key: "sonador",
      label: "El Soñador",
      emoji: "💭",
      description: "Tienes claro cuánto te gustaría ganar, pero la distancia con tu ingreso actual es grande y todavía no hay un plan concreto para cerrarla. Soñar en grande está bien; ahora toca el primer paso pequeño."
    },
    {
      key: "equilibrista",
      label: "El Equilibrista",
      emoji: "⚖️",
      description: "Vas manteniendo el equilibrio entre lo que ganas y lo que gastas, sin grandes sobresaltos. Con un par de ajustes puedes pasar de sostenerte a avanzar de verdad."
    }
  ],

  // Perfiles según la relación ingreso/gasto (complementa al arquetipo con una
  // lectura más directa del nivel de riesgo financiero actual).
  incomeExpenseProfiles: [
    {
      key: "endeudado",
      label: "En situación de endeudamiento",
      risk: "Muy alto",
      description: "Gastas más de lo que ganas: tu tasa de ahorro es negativa y cubres la diferencia con tarjetas, préstamos o ayuda externa. Antes de ahorrar, lo primero es frenar la deuda que sigue creciendo."
    },
    {
      key: "al_dia",
      label: "Al día / de mes en mes",
      risk: "Alto",
      description: "Tus ingresos cubren justo tus gastos: no generas deuda nueva, pero tampoco tienes margen para imprevistos o emergencias."
    },
    {
      key: "ahorrador_pasivo",
      label: "Ahorrador pasivo",
      risk: "Bajo (riesgo de inflación)",
      description: "Gastas menos de lo que ganas, pero el excedente se queda quieto en la cuenta o en efectivo: tienes seguridad, pero ese dinero va perdiendo poder adquisitivo poco a poco."
    },
    {
      key: "inversor",
      label: "Acumulador eficiente / inversor",
      risk: "Bajo / controlado",
      description: "Gastas menos de lo que ganas y destinas ese excedente a activos, fondos o proyectos: estás construyendo patrimonio a largo plazo."
    },
    {
      key: "frugal_fire",
      label: "Frugal / estilo FIRE",
      risk: "Muy bajo",
      description: "Gastas muy por debajo de tus ingresos, ahorrando el 50% o más: buscas la independencia financiera o la jubilación anticipada."
    }
  ],

  // Ruta general (4 pasos) hacia el perfil "Acumulador eficiente / inversor":
  // depender de un solo sueldo es una vulnerabilidad, así que el objetivo es
  // convertir parte del ingreso de hoy en patrimonio que trabaje mañana.
  roadmapSteps: [
    {
      title: "Aplica el preahorro automático",
      body: "Págate a ti mismo primero: configura una transferencia automática el mismo día que recibes tu ingreso hacia una cuenta de ahorro separada. Si esperas a ahorrar \"lo que sobre\" a fin de mes, nunca sobrará nada."
    },
    {
      title: "Elimina las deudas de alto interés",
      body: "Cancela primero las tarjetas de crédito, préstamos personales o financiamientos de consumo. Ninguna inversión convencional te dará más rentabilidad que el interés que te cobra una deuda de consumo."
    },
    {
      title: "Construye tu fondo de emergencia",
      body: "Llena un fondo de 3 a 6 meses de gastos fijos, protegido de la volatilidad pero accesible de inmediato: tu colchón ante una pérdida de empleo, una reparación o un imprevisto de salud."
    },
    {
      title: "Diversifica e invierte el excedente",
      body: "Una vez cubiertos los tres pasos anteriores, automatiza aportaciones periódicas a instrumentos diversificados y de bajo coste. La clave no es adivinar el mercado, sino la constancia y el tiempo."
    }
  ],

  // Opciones genéricas para poner a trabajar el excedente (sin nombrar entidades
  // concretas ni cifras de fiscalidad: eso depende del país y cambia con el tiempo).
  investingOptions: [
    {
      title: "Fondos o ETFs indexados",
      note: "Replican un índice amplio (por ejemplo, uno global de renta variable): diversificas entre miles de compañías con comisiones muy bajas, sin necesidad de elegir qué empresa concreta va a subir."
    },
    {
      title: "Gestores automatizados (\"robo-advisors\")",
      note: "Plataformas que, tras un breve test de perfil de riesgo, arman y mantienen una cartera diversificada por ti, sin que necesites conocimientos técnicos previos."
    },
    {
      title: "Cuentas remuneradas o fondos monetarios",
      note: "Riesgo mínimo y disponibilidad casi inmediata: pensados para el fondo de emergencia o dinero que vayas a necesitar en poco tiempo, no para el ahorro a largo plazo."
    }
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
      title: "Vigila los gastos hormiga",
      body: "Los pequeños consumos diarios, como un café o un antojo, parecen insignificantes, pero vacían tu bolsillo mes a mes. Presta atención a esos importes menores para evitar fugas de dinero imprevistas, y cuidado con los precios terminados en .99: tu cerebro los percibe como mucho más baratos de lo que realmente son."
    },
    {
      title: "Prueba el método del redondeo o del céntimo",
      body: "Aparta las monedas sueltas del día o redondea el costo de tus compras para guardar la diferencia en una alcancía o cuenta digital. Son cantidades pequeñas, pero acumuladas a lo largo del mes se notan."
    },
    {
      title: "Aprende a decir que no a las horas extra",
      body: "Trabajar más horas no siempre significa ganar más de verdad: entre el cansancio y el tiempo perdido, el balance puede salir en contra. Si tu prioridad es \"trabajar menos\", practica formas claras y profesionales de poner límites antes de aceptar horas extra por costumbre."
    },
    {
      title: "Antes de sumar horas, revisa qué te compensa de verdad",
      body: "Si necesitas ganar más, valora primero alternativas a simplemente trabajar más horas: ingresos pasivos, mejorar tu productividad en el horario que ya tienes o negociar tu salario. Sumar horas sin límite es la puerta de entrada al arquetipo \"El Hámster\"."
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
    },
    {
      title: "Optimiza tus facturas de luz, gas e internet",
      body: "Revisa la potencia eléctrica contratada (si nunca te han saltado los plomos, seguramente pagas de más) y compara tarifas al menos una vez al año: el mercado suele tener descuentos de bienvenida o de retención."
    },
    {
      title: "Reduce el consumo de agua con aireadores",
      body: "Cuestan poco y se instalan en minutos en el grifo y la ducha: reducen el caudal hasta un 40% sin que notes pérdida de presión."
    },
    {
      title: "Ve al súper con lista cerrada y sin hambre",
      body: "Comprar sin planificar puede sumar hasta un 20% de gasto extra en productos no esenciales, además de comida que acaba tirándose."
    },
    {
      title: "Compara el precio por kilo o litro, no el del envase",
      body: "Los formatos \"familiares\" o de \"ahorro\" no siempre son los más baratos: la etiqueta con el precio por unidad de medida es la referencia real."
    },
    {
      title: "Prioriza fruta, verdura y pescado de temporada",
      body: "Suelen costar entre un 20% y un 40% menos que los productos importados o fuera de temporada."
    },
    {
      title: "Ahorra en combustible con hábitos simples",
      body: "Mantener la presión correcta de los neumáticos y evitar acelerones bruscos reduce el consumo hasta un 3%; comparar precios entre gasolineras cercanas también marca diferencia."
    },
    {
      title: "Mantén solo una suscripción activa a la vez",
      body: "En lugar de pagar varias plataformas de streaming o gimnasios a la vez, ve alternando cuál tienes activa según lo que realmente vayas a usar ese mes."
    },
    {
      title: "Compra de segunda mano lo que uses poco",
      body: "Para herramientas, libros o equipamiento deportivo de uso ocasional, mira primero en plataformas de segunda mano antes de comprar nuevo."
    },
    {
      title: "Calcula el impacto real con el \"Factor 365\"",
      body: "Multiplica un gasto diario por 365 (o semanal por 52) para ver su peso anual real: un café de 1,80 € al día no son 1,80 €, son casi 660 € al año. Verlo así ayuda a decidir qué merece la pena de verdad."
    },
    {
      title: "Sustituye en vez de prohibir",
      body: "Prohibirte algo de golpe suele generar frustración y que acabes volviendo a caer. Mejor optimiza el coste del hábito (un termo en vez del café de máquina) o fíjate un presupuesto fijo para esos gastos libres."
    },
    {
      title: "Abre una \"cuenta de bolsillo\" para gastos libres",
      body: "Asigna una cantidad fija al mes a una tarjeta o cuenta aparte para tus caprichos. Cuando se acaba el saldo, se acaban las microcompras hasta el mes siguiente."
    },
    {
      title: "Revisa las comisiones de tu banco",
      body: "Comprueba que cumples los requisitos para no pagar mantenimiento (nómina domiciliada, recibos, etc.). Si te cobran comisiones evitables, plantéate cambiar de entidad."
    }
  ],

  // Recursos encontrados en la investigación (libros y charlas). Se listan con su
  // fuente para que el usuario pueda profundizar; no se reproduce el contenido
  // protegido de los libros, solo referencias.
  resources: {
    books: [
      { title: "La bolsa o la vida", author: "Vicki Robin y Joe Dominguez", note: "Un clásico que invita a replantear la relación entre tiempo, trabajo y dinero." },
      { title: "Economía básica", author: "Thomas Sowell", note: "Introducción clara a cómo funcionan los mercados y la toma de decisiones económicas." },
      { title: "Ten peor coche que tu vecino", author: "Luis Pita", note: "Sobre la 'libertad financiera' medida en años de tranquilidad: pautas sencillas para automatizar el preahorro y recortar gastos prescindibles sin sacrificar calidad de vida." },
      { title: "Invierte en ti", author: "Natalia de Santiago", note: "Guía práctica y directa para estructurar el presupuesto familiar, gestionar el ahorro mensual y entender los productos bancarios cotidianos sin tecnicismos." },
      { title: "Invierte con poco", author: "—", note: "Cómo empezar a mejorar tu situación económica con poco capital inicial." },
      { title: "Finanzas para todos", author: "Paco de León", note: "Guía ilustrada que propone revisar nuestras creencias sobre el dinero (moldeadas por la familia, la cultura y el sistema) para cambiar de verdad nuestra relación con las finanzas." },
      { title: "Padre Rico, Padre Pobre (Ed. 25 aniversario)", author: "Robert Kiyosaki", note: "Un clásico que contrasta dos mentalidades sobre el dinero y explica por qué distinguir activos de pasivos es clave para la libertad financiera." },
      { title: "El cuadrante del flujo del dinero", author: "Robert T. Kiyosaki", note: "Continuación de \"Padre Rico, Padre Pobre\": explica las cuatro formas de generar ingresos (empleado, autónomo, dueño de negocio, inversor) y por qué cambiar de cuadrante es clave para la libertad financiera." },
      { title: "Haz que el dinero te elija", author: "—", note: "Sobre teoría y filosofía del dinero: replantea qué problema resuelve realmente el dinero en tu vida." },
      { title: "Fundamentos de economía", author: "Paul R. Krugman, Robin Wells y Martha L. Olney", note: "Introducción accesible a los conceptos básicos de economía, útil para entender el contexto detrás de las decisiones financieras del día a día." },
      { title: "La psicología del dinero", author: "Morgan Housel", note: "El comportamiento, las emociones y los hábitos pesan mucho más en las finanzas de un hogar que los conocimientos matemáticos: clave para tomar decisiones sensatas a largo plazo." },
      { title: "El hombre más rico de Babilonia", author: "George S. Clason", note: "Un clásico brevísimo basado en parábolas que enseña reglas atemporales del ahorro doméstico: pagarte a ti mismo primero, controlar los gastos y proteger el capital." },
      { title: "El inversor inteligente", author: "Benjamin Graham", note: "Aborda la inversión en general, pero sus capítulos sobre disciplina, prudencia y la diferencia entre especular y proteger el capital son fundamentales para la seguridad económica familiar." },
      { title: "Kakebo: el arte japonés de ahorrar dinero", author: "Fumiko Chiba", note: "Más que un libro, una metodología práctica: registra tus ingresos y gastos diarios en cuatro categorías claras para tomar conciencia de en qué se te va el dinero mes a mes." },
      { title: "Pequeño cerdo capitalista", author: "Sofía Macías", note: "Un libro dinámico y accesible para empezar desde cero a presupuestar, salir de deudas y organizar el presupuesto familiar sin complicaciones." }
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
      { title: "Gamification for Personal-Finance Apps", source: "Trophy.so", url: "https://trophy.so/blog/gamification-for-personal-finance-apps" },
      { title: "Cómo gastar menos", source: "TranquiFinanzas", url: "https://tranquifinanzas.com/como-gastar-menos/" },
      { title: "5 formas de decirle a tu jefe que no quieres hacer horas extras", source: "Oficina de Empleo", url: "https://www.oficinaempleo.com/blog/5-formas-de-decirle-a-tu-jefe-que-no-quieres-hacer-horas-extras/" },
      { title: "8 estrategias para evitar trabajar horas extras", source: "Speexx", url: "https://www.speexx.com/es/speexx-blog/8-estrategias-para-evitar-trabajar-horas-extras/" },
      { title: "Ingresos pasivos: cómo ganar más dinero y trabajar menos", source: "Forbes España", url: "https://forbes.es/economia/721394/ingresos-pasivos-como-ganar-mas-dinero-y-trabajar-menos/" },
      { title: "Trabajar menos, producir más", source: "Mercadeo Global", url: "https://mercadeoglobal.com/blog/trabajar-menos-producir-mas/" }
    ],
    // Vídeos cortos de referencia (redes sociales) sobre técnicas de ahorro.
    videos: [
      { title: "¡Ahorra sin darte cuenta! El método del redondeo", source: "Facebook · dinerocomsv", url: "https://www.facebook.com/watch/?v=3663749137099051" }
    ]
  },

  // Bancos de demostración para el enlace de cuentas simulado.
  demoBanks: [
    { id: "demo-visa", name: "Tarjeta Visa Demo", kind: "Tarjeta de crédito" },
    { id: "demo-banco", name: "Banco Simulado", kind: "Cuenta corriente" },
    { id: "demo-wallet", name: "Billetera Móvil Demo", kind: "Pago móvil" }
  ]
};
