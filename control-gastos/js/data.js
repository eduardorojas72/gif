// Contenido estático: categorías, consejos y recursos recomendados.
const DATA = {
  expenseCategories: {
    es: [
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
    en: [
      { id: "alimentacion", label: "Food", icon: "🍽️" },
      { id: "transporte", label: "Transport", icon: "🚌" },
      { id: "vivienda", label: "Housing", icon: "🏠" },
      { id: "ocio", label: "Leisure", icon: "🎬" },
      { id: "salud", label: "Health", icon: "💊" },
      { id: "compras", label: "Shopping", icon: "🛍️" },
      { id: "suscripciones", label: "Subscriptions", icon: "🔁" },
      { id: "educacion", label: "Education", icon: "📚" },
      { id: "atomy", label: "Atomy Product Purchase", icon: "📦" },
      { id: "otros", label: "Other", icon: "✨" }
    ],
    fr: [
      { id: "alimentacion", label: "Alimentation", icon: "🍽️" },
      { id: "transporte", label: "Transport", icon: "🚌" },
      { id: "vivienda", label: "Logement", icon: "🏠" },
      { id: "ocio", label: "Loisirs", icon: "🎬" },
      { id: "salud", label: "Santé", icon: "💊" },
      { id: "compras", label: "Achats", icon: "🛍️" },
      { id: "suscripciones", label: "Abonnements", icon: "🔁" },
      { id: "educacion", label: "Éducation", icon: "📚" },
      { id: "atomy", label: "Achat de produits Atomy", icon: "📦" },
      { id: "otros", label: "Autres", icon: "✨" }
    ],
    it: [
      { id: "alimentacion", label: "Alimentazione", icon: "🍽️" },
      { id: "transporte", label: "Trasporti", icon: "🚌" },
      { id: "vivienda", label: "Casa", icon: "🏠" },
      { id: "ocio", label: "Tempo libero", icon: "🎬" },
      { id: "salud", label: "Salute", icon: "💊" },
      { id: "compras", label: "Shopping", icon: "🛍️" },
      { id: "suscripciones", label: "Abbonamenti", icon: "🔁" },
      { id: "educacion", label: "Istruzione", icon: "📚" },
      { id: "atomy", label: "Acquisto prodotti Atomy", icon: "📦" },
      { id: "otros", label: "Altro", icon: "✨" }
    ],
    pt: [
      { id: "alimentacion", label: "Alimentação", icon: "🍽️" },
      { id: "transporte", label: "Transporte", icon: "🚌" },
      { id: "vivienda", label: "Habitação", icon: "🏠" },
      { id: "ocio", label: "Lazer", icon: "🎬" },
      { id: "salud", label: "Saúde", icon: "💊" },
      { id: "compras", label: "Compras", icon: "🛍️" },
      { id: "suscripciones", label: "Assinaturas", icon: "🔁" },
      { id: "educacion", label: "Educação", icon: "📚" },
      { id: "atomy", label: "Compra de Produtos Atomy", icon: "📦" },
      { id: "otros", label: "Outros", icon: "✨" }
    ]
  },
  incomeCategories: {
    es: [
      { id: "salario", label: "Salario", icon: "💼" },
      { id: "freelance", label: "Freelance", icon: "🧑‍💻" },
      { id: "ventas", label: "Ventas", icon: "🏷️" },
      { id: "regalos", label: "Regalos", icon: "🎁" },
      { id: "otros_ing", label: "Otros", icon: "✨" }
    ],
    en: [
      { id: "salario", label: "Salary", icon: "💼" },
      { id: "freelance", label: "Freelance", icon: "🧑‍💻" },
      { id: "ventas", label: "Sales", icon: "🏷️" },
      { id: "regalos", label: "Gifts", icon: "🎁" },
      { id: "otros_ing", label: "Other", icon: "✨" }
    ],
    fr: [
      { id: "salario", label: "Salaire", icon: "💼" },
      { id: "freelance", label: "Freelance", icon: "🧑‍💻" },
      { id: "ventas", label: "Ventes", icon: "🏷️" },
      { id: "regalos", label: "Cadeaux", icon: "🎁" },
      { id: "otros_ing", label: "Autres", icon: "✨" }
    ],
    it: [
      { id: "salario", label: "Stipendio", icon: "💼" },
      { id: "freelance", label: "Freelance", icon: "🧑‍💻" },
      { id: "ventas", label: "Vendite", icon: "🏷️" },
      { id: "regalos", label: "Regali", icon: "🎁" },
      { id: "otros_ing", label: "Altro", icon: "✨" }
    ],
    pt: [
      { id: "salario", label: "Salário", icon: "💼" },
      { id: "freelance", label: "Freelance", icon: "🧑‍💻" },
      { id: "ventas", label: "Vendas", icon: "🏷️" },
      { id: "regalos", label: "Presentes", icon: "🎁" },
      { id: "otros_ing", label: "Outros", icon: "✨" }
    ]
  },
  paymentMethods: {
    es: [
      { id: "efectivo", label: "Efectivo" },
      { id: "debito", label: "Tarjeta débito" },
      { id: "credito", label: "Tarjeta crédito" },
      { id: "movil", label: "Pago móvil" },
      { id: "transferencia", label: "Transferencia" }
    ],
    en: [
      { id: "efectivo", label: "Cash" },
      { id: "debito", label: "Debit card" },
      { id: "credito", label: "Credit card" },
      { id: "movil", label: "Mobile payment" },
      { id: "transferencia", label: "Bank transfer" }
    ],
    fr: [
      { id: "efectivo", label: "Espèces" },
      { id: "debito", label: "Carte de débit" },
      { id: "credito", label: "Carte de crédit" },
      { id: "movil", label: "Paiement mobile" },
      { id: "transferencia", label: "Virement" }
    ],
    it: [
      { id: "efectivo", label: "Contanti" },
      { id: "debito", label: "Carta di debito" },
      { id: "credito", label: "Carta di credito" },
      { id: "movil", label: "Pagamento mobile" },
      { id: "transferencia", label: "Bonifico" }
    ],
    pt: [
      { id: "efectivo", label: "Dinheiro" },
      { id: "debito", label: "Cartão de débito" },
      { id: "credito", label: "Cartão de crédito" },
      { id: "movil", label: "Pagamento móvel" },
      { id: "transferencia", label: "Transferência" }
    ]
  },

  // Palabras clave (sin acentos, en minúscula) para sugerir una categoría al
  // importar movimientos desde un CSV bancario, a partir del texto del
  // concepto/descripción. Es solo una sugerencia editable, no una regla fija.
  categoryKeywords: {
    expense: {
      alimentacion: ["mercadona", "carrefour", "lidl", "dia ", "alcampo", "eroski", "supermercado", "aldi", "fruteria", "panaderia", "carniceria", "walmart", "soriana", "chedraui", "exito", "jumbo", "coto"],
      transporte: ["uber", "cabify", "didi", "renfe", "metro", "autobus", "taxi", "gasolina", "gasolinera", "repsol", "cepsa", "shell", "parking", "peaje", "transporte"],
      vivienda: ["alquiler", "hipoteca", "comunidad de propietarios", "inmobiliaria"],
      ocio: ["cine", "teatro", "concierto", "restaurante", "cafeteria", " bar ", "discoteca"],
      salud: ["farmacia", "clinica", "hospital", "dentista", "fisioterap"],
      compras: ["amazon", "zara", "el corte ingles", "decathlon", "ikea", "primark", "mercado libre", "aliexpress"],
      suscripciones: ["netflix", "spotify", "hbo", "disney+", "amazon prime", "icloud", "google one", "youtube premium"],
      educacion: ["universidad", "colegio", "udemy", "libreria", "coursera"],
      atomy: ["atomy"]
    },
    income: {
      salario: ["nomina", "salario", "payroll"],
      freelance: ["factura emitida", "freelance", "honorarios"],
      ventas: ["venta", "wallapop", "vinted", "mercadolibre venta"],
      regalos: ["regalo"]
    }
  },

  // País → moneda, para preguntarlo una vez en el cuestionario inicial y
  // formatear todos los importes automáticamente.
  countries: [
    { code: "ES", name: { es: "España", en: "Spain", fr: "Espagne", it: "Spagna", pt: "Espanha" }, currency: "EUR" },
    { code: "MX", name: { es: "México", en: "Mexico", fr: "Mexique", it: "Messico", pt: "México" }, currency: "MXN" },
    { code: "CO", name: { es: "Colombia", en: "Colombia", fr: "Colombie", it: "Colombia", pt: "Colômbia" }, currency: "COP" },
    { code: "AR", name: { es: "Argentina", en: "Argentina", fr: "Argentine", it: "Argentina", pt: "Argentina" }, currency: "ARS" },
    { code: "CL", name: { es: "Chile", en: "Chile", fr: "Chili", it: "Cile", pt: "Chile" }, currency: "CLP" },
    { code: "PE", name: { es: "Perú", en: "Peru", fr: "Pérou", it: "Perù", pt: "Peru" }, currency: "PEN" },
    { code: "EC", name: { es: "Ecuador", en: "Ecuador", fr: "Équateur", it: "Ecuador", pt: "Equador" }, currency: "USD" },
    { code: "US", name: { es: "Estados Unidos", en: "United States", fr: "États-Unis", it: "Stati Uniti", pt: "Estados Unidos" }, currency: "USD" },
    { code: "GT", name: { es: "Guatemala", en: "Guatemala", fr: "Guatemala", it: "Guatemala", pt: "Guatemala" }, currency: "GTQ" },
    { code: "CR", name: { es: "Costa Rica", en: "Costa Rica", fr: "Costa Rica", it: "Costa Rica", pt: "Costa Rica" }, currency: "CRC" },
    { code: "PA", name: { es: "Panamá", en: "Panama", fr: "Panama", it: "Panama", pt: "Panamá" }, currency: "USD" },
    { code: "DO", name: { es: "República Dominicana", en: "Dominican Republic", fr: "République dominicaine", it: "Repubblica Dominicana", pt: "República Dominicana" }, currency: "DOP" },
    { code: "UY", name: { es: "Uruguay", en: "Uruguay", fr: "Uruguay", it: "Uruguay", pt: "Uruguai" }, currency: "UYU" },
    { code: "BO", name: { es: "Bolivia", en: "Bolivia", fr: "Bolivie", it: "Bolivia", pt: "Bolívia" }, currency: "BOB" },
    { code: "PY", name: { es: "Paraguay", en: "Paraguay", fr: "Paraguay", it: "Paraguay", pt: "Paraguai" }, currency: "PYG" },
    { code: "HN", name: { es: "Honduras", en: "Honduras", fr: "Honduras", it: "Honduras", pt: "Honduras" }, currency: "HNL" },
    { code: "SV", name: { es: "El Salvador", en: "El Salvador", fr: "Salvador", it: "El Salvador", pt: "El Salvador" }, currency: "USD" },
    { code: "NI", name: { es: "Nicaragua", en: "Nicaragua", fr: "Nicaragua", it: "Nicaragua", pt: "Nicarágua" }, currency: "NIO" },
    { code: "VE", name: { es: "Venezuela", en: "Venezuela", fr: "Venezuela", it: "Venezuela", pt: "Venezuela" }, currency: "VES" },
    { code: "GB", name: { es: "Reino Unido", en: "United Kingdom", fr: "Royaume-Uni", it: "Regno Unito", pt: "Reino Unido" }, currency: "GBP" },
    { code: "OTRO", name: { es: "Otro país", en: "Other country", fr: "Autre pays", it: "Altro paese", pt: "Outro país" }, currency: "USD" }
  ],

  currencySymbols: {
    EUR: "€", USD: "$", MXN: "MX$", GBP: "£", COP: "COL$", ARS: "AR$",
    CLP: "CL$", PEN: "S/", GTQ: "Q", CRC: "₡", DOP: "RD$", UYU: "$U",
    BOB: "Bs", PYG: "₲", HNL: "L", NIO: "C$", VES: "Bs.S"
  },

  // Opciones del cuestionario inicial.
  obstacles: [
    { id: "no_se", label: { es: "No sé en qué se me va el dinero", en: "I don't know where my money goes", fr: "Je ne sais pas où passe mon argent", it: "Non so dove finiscono i miei soldi", pt: "Não sei para onde vai o meu dinheiro" } },
    { id: "impulso", label: { es: "Compro cosas por impulso", en: "I buy things on impulse", fr: "J'achète des choses sur un coup de tête", it: "Compro cose d'impulso", pt: "Compro coisas por impulso" } },
    { id: "suscripciones", label: { es: "Tengo suscripciones que no uso", en: "I have subscriptions I don't use", fr: "J'ai des abonnements que je n'utilise pas", it: "Ho abbonamenti che non uso", pt: "Tenho assinaturas que não uso" } },
    { id: "deudas", label: { es: "Tengo deudas o pagos de tarjeta pendientes", en: "I have debts or pending card payments", fr: "J'ai des dettes ou des paiements de carte en attente", it: "Ho debiti o pagamenti con carta in sospeso", pt: "Tenho dívidas ou pagamentos de cartão pendentes" } },
    { id: "irregular", label: { es: "Mis ingresos son irregulares", en: "My income is irregular", fr: "Mes revenus sont irréguliers", it: "Le mie entrate sono irregolari", pt: "A minha renda é irregular" } },
    { id: "imprevistos", label: { es: "Gastos inesperados o familiares", en: "Unexpected or family expenses", fr: "Dépenses imprévues ou familiales", it: "Spese impreviste o familiari", pt: "Despesas inesperadas ou familiares" } },
    { id: "sin_presupuesto", label: { es: "Nunca he llevado un presupuesto", en: "I've never kept a budget", fr: "Je n'ai jamais tenu de budget", it: "Non ho mai tenuto un budget", pt: "Nunca fiz um orçamento" } }
  ],
  savingsPurposes: [
    { id: "viajar", label: { es: "Viajar", en: "Travel", fr: "Voyager", it: "Viaggiare", pt: "Viajar" }, icon: "✈️" },
    { id: "familia", label: { es: "Salir en familia", en: "Family outings", fr: "Sorties en famille", it: "Uscite in famiglia", pt: "Sair em família" }, icon: "👨‍👩‍👧" },
    { id: "amigos", label: { es: "Salir con amigos", en: "Going out with friends", fr: "Sorties entre amis", it: "Uscite con gli amici", pt: "Sair com amigos" }, icon: "🎉" },
    { id: "auto", label: { es: "Comprar un auto", en: "Buy a car", fr: "Acheter une voiture", it: "Comprare un'auto", pt: "Comprar um carro" }, icon: "🚗" },
    { id: "casa", label: { es: "Comprar una casa", en: "Buy a house", fr: "Acheter une maison", it: "Comprare una casa", pt: "Comprar uma casa" }, icon: "🏠" },
    { id: "ayudar", label: { es: "Ayudar a familiares", en: "Help family members", fr: "Aider ma famille", it: "Aiutare la famiglia", pt: "Ajudar familiares" }, icon: "🤝" },
    { id: "donar", label: { es: "Donar a una ONG", en: "Donate to a charity", fr: "Faire un don à une association", it: "Donare a un'associazione", pt: "Doar para uma ONG" }, icon: "💚" },
    { id: "otro", label: { es: "Otro", en: "Other", fr: "Autre", it: "Altro", pt: "Outro" }, icon: "✨" }
  ],

  // Categorías de la "foto" de gastos mensuales del cuestionario de diagnóstico,
  // distintas de expenseCategories (esas son para registrar movimientos día a día).
  expenseSnapshotCategories: [
    { id: "alquiler", label: { es: "Alquiler / hipoteca", en: "Rent / mortgage", fr: "Loyer / prêt immobilier", it: "Affitto / mutuo", pt: "Aluguel / hipoteca" }, icon: "🏠" },
    { id: "coche", label: { es: "Coche / transporte", en: "Car / transport", fr: "Voiture / transport", it: "Auto / trasporti", pt: "Carro / transporte" }, icon: "🚗" },
    { id: "servicios", label: { es: "Servicios (luz, agua, internet...)", en: "Utilities (power, water, internet...)", fr: "Charges (électricité, eau, internet...)", it: "Utenze (luce, acqua, internet...)", pt: "Contas (luz, água, internet...)" }, icon: "💡" },
    { id: "alimentacion", label: { es: "Alimentación", en: "Food", fr: "Alimentation", it: "Alimentazione", pt: "Alimentação" }, icon: "🍽️" },
    { id: "seguros", label: { es: "Seguros", en: "Insurance", fr: "Assurances", it: "Assicurazioni", pt: "Seguros" }, icon: "🛡️" },
    { id: "deudasTarjetas", label: { es: "Deudas de tarjetas", en: "Card debts", fr: "Dettes de carte", it: "Debiti di carte", pt: "Dívidas de cartão" }, icon: "💳" },
    { id: "deudasPrestamos", label: { es: "Deudas de préstamos", en: "Loan debts", fr: "Dettes de prêts", it: "Debiti di prestiti", pt: "Dívidas de empréstimos" }, icon: "🏦" },
    { id: "salidas", label: { es: "Salidas y ocio", en: "Outings and leisure", fr: "Sorties et loisirs", it: "Uscite e tempo libero", pt: "Saídas e lazer" }, icon: "🎉" },
    { id: "otros", label: { es: "Otros", en: "Other", fr: "Autres", it: "Altro", pt: "Outros" }, icon: "✨" }
  ],

  // Arquetipos financieros del diagnóstico inicial: cada uno describe una
  // relación distinta entre ingreso, horas trabajadas, gasto y ahorro real.
  archetypes: [
    {
      key: "ahorrador",
      label: { es: "El Ahorrador Consciente", en: "The Mindful Saver", fr: "L'Épargnant Conscient", it: "Il Risparmiatore Consapevole", pt: "O Poupador Consciente" },
      emoji: "🌱",
      description: {
        es: "Gastas por debajo de lo que ganas y ya estás construyendo un colchón de verdad. Sigue así: automatiza ese ahorro para que no dependa de la fuerza de voluntad.",
        en: "You spend less than you earn and you're already building a real cushion. Keep it up: automate that saving so it doesn't depend on willpower.",
        fr: "Vous dépensez moins que ce que vous gagnez et vous construisez déjà un vrai coussin de sécurité. Continuez ainsi : automatisez cette épargne pour qu'elle ne dépende pas de votre volonté.",
        it: "Spendi meno di quanto guadagni e stai già costruendo un vero cuscinetto. Continua così: automatizza quel risparmio perché non dipenda dalla forza di volontà.",
        pt: "Você gasta menos do que ganha e já está construindo uma reserva de verdade. Continue assim: automatize essa poupança para que não dependa de força de vontade."
      }
    },
    {
      key: "hamster",
      label: { es: "El Hámster", en: "The Hamster", fr: "Le Hamster", it: "Il Criceto", pt: "O Hamster" },
      emoji: "🐹",
      description: {
        es: "Trabajas muchas horas (o varios empleos) pero el dinero apenas te alcanza para ahorrar algo. La rueda gira rápido, pero no avanzas. El problema no es cuánto trabajas, sino cuánto se te va.",
        en: "You work long hours (or several jobs) but the money barely stretches enough to save anything. The wheel spins fast, but you're not getting anywhere. The problem isn't how much you work, but how much slips away.",
        fr: "Vous travaillez de longues heures (ou plusieurs emplois) mais l'argent suffit à peine pour épargner quoi que ce soit. La roue tourne vite, mais vous n'avancez pas. Le problème n'est pas combien vous travaillez, mais combien vous dépensez.",
        it: "Lavori molte ore (o più lavori) ma il denaro basta appena per risparmiare qualcosa. La ruota gira veloce, ma non avanzi. Il problema non è quanto lavori, ma quanto ti sfugge.",
        pt: "Você trabalha muitas horas (ou em vários empregos), mas o dinheiro mal dá para guardar algo. A roda gira rápido, mas você não avança. O problema não é quanto você trabalha, e sim quanto escapa das mãos."
      }
    },
    {
      key: "grifo",
      label: { es: "El Grifo Abierto", en: "The Open Tap", fr: "Le Robinet Ouvert", it: "Il Rubinetto Aperto", pt: "A Torneira Aberta" },
      emoji: "🚰",
      description: {
        es: "Tus gastos igualan o superan lo que ingresas cada mes. Antes de pensar en ahorrar, hay que cerrar la fuga: identifica en qué se te va el dinero y ponle límite.",
        en: "Your expenses match or exceed what you earn each month. Before thinking about saving, you need to stop the leak: identify where your money goes and set a limit.",
        fr: "Vos dépenses égalent ou dépassent ce que vous gagnez chaque mois. Avant de penser à épargner, il faut colmater la fuite : identifiez où part votre argent et fixez-lui une limite.",
        it: "Le tue spese eguagliano o superano quanto guadagni ogni mese. Prima di pensare al risparmio, bisogna chiudere la falla: individua dove finiscono i tuoi soldi e mettici un limite.",
        pt: "Suas despesas igualam ou superam o que você ganha todo mês. Antes de pensar em poupar, é preciso fechar o vazamento: identifique para onde vai o seu dinheiro e coloque um limite."
      }
    },
    {
      key: "sonador",
      label: { es: "El Soñador", en: "The Dreamer", fr: "Le Rêveur", it: "Il Sognatore", pt: "O Sonhador" },
      emoji: "💭",
      description: {
        es: "Tienes claro cuánto te gustaría ganar, pero la distancia con tu ingreso actual es grande y todavía no hay un plan concreto para cerrarla. Soñar en grande está bien; ahora toca el primer paso pequeño.",
        en: "You know exactly how much you'd like to earn, but the gap with your current income is large and there's still no concrete plan to close it. Dreaming big is fine; now it's time for the first small step.",
        fr: "Vous savez exactement combien vous aimeriez gagner, mais l'écart avec votre revenu actuel est important et il n'y a pas encore de plan concret pour le combler. Rêver grand, c'est bien ; place maintenant au premier petit pas.",
        it: "Sai bene quanto vorresti guadagnare, ma la distanza dal tuo reddito attuale è grande e non c'è ancora un piano concreto per colmarla. Sognare in grande va bene; ora tocca al primo piccolo passo.",
        pt: "Você sabe exatamente quanto gostaria de ganhar, mas a distância em relação à sua renda atual é grande e ainda não há um plano concreto para reduzi-la. Sonhar alto está bem; agora é hora do primeiro passo pequeno."
      }
    },
    {
      key: "equilibrista",
      label: { es: "El Equilibrista", en: "The Tightrope Walker", fr: "Le Funambule", it: "Il Funambolo", pt: "O Equilibrista" },
      emoji: "⚖️",
      description: {
        es: "Vas manteniendo el equilibrio entre lo que ganas y lo que gastas, sin grandes sobresaltos. Con un par de ajustes puedes pasar de sostenerte a avanzar de verdad.",
        en: "You keep a balance between what you earn and what you spend, without major surprises. With a couple of adjustments you can go from just holding steady to really moving forward.",
        fr: "Vous maintenez un équilibre entre ce que vous gagnez et ce que vous dépensez, sans gros imprévus. Avec quelques ajustements, vous pouvez passer de vous maintenir à vraiment avancer.",
        it: "Mantieni l'equilibrio tra quanto guadagni e quanto spendi, senza grandi sorprese. Con un paio di aggiustamenti puoi passare dal reggerti in piedi al fare davvero progressi.",
        pt: "Você mantém o equilíbrio entre o que ganha e o que gasta, sem grandes sobressaltos. Com alguns ajustes, pode passar de apenas se sustentar para realmente avançar."
      }
    }
  ],

  // Perfiles según la relación ingreso/gasto (complementa al arquetipo con una
  // lectura más directa del nivel de riesgo financiero actual).
  incomeExpenseProfiles: [
    {
      key: "endeudado",
      label: { es: "En situación de endeudamiento", en: "In a debt situation", fr: "En situation d'endettement", it: "In una situazione di indebitamento", pt: "Em situação de endividamento" },
      risk: { es: "Muy alto", en: "Very high", fr: "Très élevé", it: "Molto alto", pt: "Muito alto" },
      description: {
        es: "Gastas más de lo que ganas: tu tasa de ahorro es negativa y cubres la diferencia con tarjetas, préstamos o ayuda externa. Antes de ahorrar, lo primero es frenar la deuda que sigue creciendo.",
        en: "You spend more than you earn: your savings rate is negative and you cover the gap with cards, loans or outside help. Before saving, the first step is to stop the debt that keeps growing.",
        fr: "Vous dépensez plus que ce que vous gagnez : votre taux d'épargne est négatif et vous comblez la différence avec des cartes, des prêts ou une aide extérieure. Avant d'épargner, il faut d'abord stopper la dette qui continue de grossir.",
        it: "Spendi più di quanto guadagni: il tuo tasso di risparmio è negativo e copri la differenza con carte, prestiti o aiuti esterni. Prima di risparmiare, il primo passo è fermare il debito che continua a crescere.",
        pt: "Você gasta mais do que ganha: sua taxa de poupança é negativa e cobre a diferença com cartões, empréstimos ou ajuda externa. Antes de poupar, o primeiro passo é frear a dívida que continua crescendo."
      }
    },
    {
      key: "al_dia",
      label: { es: "Al día / de mes en mes", en: "Living month to month", fr: "Au jour le jour / de mois en mois", it: "Al passo / di mese in mese", pt: "Em dia / de mês a mês" },
      risk: { es: "Alto", en: "High", fr: "Élevé", it: "Alto", pt: "Alto" },
      description: {
        es: "Tus ingresos cubren justo tus gastos: no generas deuda nueva, pero tampoco tienes margen para imprevistos o emergencias.",
        en: "Your income just covers your expenses: you don't generate new debt, but you also have no room for unexpected events or emergencies.",
        fr: "Vos revenus couvrent tout juste vos dépenses : vous ne générez pas de nouvelle dette, mais vous n'avez aucune marge pour les imprévus ou les urgences.",
        it: "Le tue entrate coprono appena le tue spese: non generi nuovo debito, ma non hai nemmeno margine per imprevisti o emergenze.",
        pt: "Sua renda cobre exatamente suas despesas: você não gera nova dívida, mas também não tem margem para imprevistos ou emergências."
      }
    },
    {
      key: "ahorrador_pasivo",
      label: { es: "Ahorrador pasivo", en: "Passive saver", fr: "Épargnant passif", it: "Risparmiatore passivo", pt: "Poupador passivo" },
      risk: { es: "Bajo (riesgo de inflación)", en: "Low (inflation risk)", fr: "Faible (risque d'inflation)", it: "Basso (rischio inflazione)", pt: "Baixo (risco de inflação)" },
      description: {
        es: "Gastas menos de lo que ganas, pero el excedente se queda quieto en la cuenta o en efectivo: tienes seguridad, pero ese dinero va perdiendo poder adquisitivo poco a poco.",
        en: "You spend less than you earn, but the surplus just sits in your account or in cash: you have security, but that money is slowly losing purchasing power.",
        fr: "Vous dépensez moins que ce que vous gagnez, mais l'excédent reste immobile sur le compte ou en liquide : vous avez de la sécurité, mais cet argent perd peu à peu son pouvoir d'achat.",
        it: "Spendi meno di quanto guadagni, ma l'eccedenza resta ferma sul conto o in contanti: hai sicurezza, ma quel denaro perde a poco a poco potere d'acquisto.",
        pt: "Você gasta menos do que ganha, mas o excedente fica parado na conta ou em dinheiro: você tem segurança, mas esse dinheiro vai perdendo poder de compra aos poucos."
      }
    },
    {
      key: "inversor",
      label: { es: "Acumulador eficiente / inversor", en: "Efficient accumulator / investor", fr: "Accumulateur efficace / investisseur", it: "Accumulatore efficiente / investitore", pt: "Acumulador eficiente / investidor" },
      risk: { es: "Bajo / controlado", en: "Low / controlled", fr: "Faible / maîtrisé", it: "Basso / controllato", pt: "Baixo / controlado" },
      description: {
        es: "Gastas menos de lo que ganas y destinas ese excedente a activos, fondos o proyectos: estás construyendo patrimonio a largo plazo.",
        en: "You spend less than you earn and put that surplus into assets, funds or projects: you're building long-term wealth.",
        fr: "Vous dépensez moins que ce que vous gagnez et vous consacrez cet excédent à des actifs, des fonds ou des projets : vous construisez un patrimoine à long terme.",
        it: "Spendi meno di quanto guadagni e destini quell'eccedenza ad attivi, fondi o progetti: stai costruendo patrimonio a lungo termine.",
        pt: "Você gasta menos do que ganha e destina esse excedente a ativos, fundos ou projetos: está construindo patrimônio a longo prazo."
      }
    },
    {
      key: "frugal_fire",
      label: { es: "Frugal / estilo FIRE", en: "Frugal / FIRE style", fr: "Frugal / style FIRE", it: "Frugale / stile FIRE", pt: "Frugal / estilo FIRE" },
      risk: { es: "Muy bajo", en: "Very low", fr: "Très faible", it: "Molto basso", pt: "Muito baixo" },
      description: {
        es: "Gastas muy por debajo de tus ingresos, ahorrando el 50% o más: buscas la independencia financiera o la jubilación anticipada.",
        en: "You spend well below your income, saving 50% or more: you're pursuing financial independence or early retirement.",
        fr: "Vous dépensez bien en dessous de vos revenus, en épargnant 50 % ou plus : vous recherchez l'indépendance financière ou la retraite anticipée.",
        it: "Spendi ben al di sotto delle tue entrate, risparmiando il 50% o più: cerchi l'indipendenza finanziaria o il pensionamento anticipato.",
        pt: "Você gasta bem abaixo da sua renda, poupando 50% ou mais: busca a independência financeira ou a aposentadoria antecipada."
      }
    }
  ],

  // Ruta general (4 pasos) hacia el perfil "Acumulador eficiente / inversor":
  // depender de un solo sueldo es una vulnerabilidad, así que el objetivo es
  // convertir parte del ingreso de hoy en patrimonio que trabaje mañana.
  roadmapSteps: [
    {
      title: { es: "Aplica el preahorro automático", en: "Set up automatic pre-saving", fr: "Mettez en place l'épargne automatique", it: "Attiva il risparmio automatico anticipato", pt: "Aplique a pré-poupança automática" },
      body: {
        es: "Págate a ti mismo primero: configura una transferencia automática el mismo día que recibes tu ingreso hacia una cuenta de ahorro separada. Si esperas a ahorrar \"lo que sobre\" a fin de mes, nunca sobrará nada.",
        en: "Pay yourself first: set up an automatic transfer to a separate savings account on the same day you get paid. If you wait to save \"whatever's left\" at the end of the month, there will never be anything left.",
        fr: "Payez-vous d'abord vous-même : programmez un virement automatique vers un compte d'épargne séparé le jour même où vous recevez votre revenu. Si vous attendez d'épargner « ce qu'il reste » en fin de mois, il ne restera jamais rien.",
        it: "Paga prima te stesso: imposta un bonifico automatico verso un conto di risparmio separato lo stesso giorno in cui ricevi lo stipendio. Se aspetti di risparmiare \"quello che avanza\" a fine mese, non avanzerà mai nulla.",
        pt: "Pague-se primeiro: configure uma transferência automática no mesmo dia em que recebe sua renda para uma conta de poupança separada. Se você espera poupar \"o que sobrar\" no fim do mês, nunca sobrará nada."
      }
    },
    {
      title: { es: "Elimina las deudas de alto interés", en: "Eliminate high-interest debt", fr: "Éliminez les dettes à taux d'intérêt élevé", it: "Elimina i debiti ad alto interesse", pt: "Elimine as dívidas de juros altos" },
      body: {
        es: "Cancela primero las tarjetas de crédito, préstamos personales o financiamientos de consumo. Ninguna inversión convencional te dará más rentabilidad que el interés que te cobra una deuda de consumo.",
        en: "Pay off credit cards, personal loans or consumer financing first. No conventional investment will give you a better return than the interest a consumer debt charges you.",
        fr: "Remboursez d'abord les cartes de crédit, les prêts personnels ou les crédits à la consommation. Aucun investissement classique ne vous rapportera plus que l'intérêt facturé par une dette à la consommation.",
        it: "Salda prima le carte di credito, i prestiti personali o i finanziamenti al consumo. Nessun investimento convenzionale ti darà un rendimento maggiore dell'interesse che ti addebita un debito al consumo.",
        pt: "Quite primeiro os cartões de crédito, empréstimos pessoais ou financiamentos de consumo. Nenhum investimento convencional te dará mais rentabilidade do que o juro cobrado por uma dívida de consumo."
      }
    },
    {
      title: { es: "Construye tu fondo de emergencia", en: "Build your emergency fund", fr: "Constituez votre fonds d'urgence", it: "Costruisci il tuo fondo di emergenza", pt: "Construa seu fundo de emergência" },
      body: {
        es: "Llena un fondo de 3 a 6 meses de gastos fijos, protegido de la volatilidad pero accesible de inmediato: tu colchón ante una pérdida de empleo, una reparación o un imprevisto de salud.",
        en: "Build up 3 to 6 months of fixed expenses, protected from volatility but immediately accessible: your cushion against a job loss, a repair or a health emergency.",
        fr: "Constituez un fonds de 3 à 6 mois de dépenses fixes, à l'abri de la volatilité mais accessible immédiatement : votre coussin en cas de perte d'emploi, de réparation ou d'imprévu de santé.",
        it: "Metti da parte un fondo pari a 3-6 mesi di spese fisse, protetto dalla volatilità ma accessibile subito: il tuo cuscinetto in caso di perdita del lavoro, una riparazione o un imprevisto di salute.",
        pt: "Monte um fundo de 3 a 6 meses de despesas fixas, protegido da volatilidade mas acessível de imediato: sua reserva para uma perda de emprego, um conserto ou um imprevisto de saúde."
      }
    },
    {
      title: { es: "Diversifica e invierte el excedente", en: "Diversify and invest the surplus", fr: "Diversifiez et investissez l'excédent", it: "Diversifica e investi l'eccedenza", pt: "Diversifique e invista o excedente" },
      body: {
        es: "Una vez cubiertos los tres pasos anteriores, automatiza aportaciones periódicas a instrumentos diversificados y de bajo coste. La clave no es adivinar el mercado, sino la constancia y el tiempo.",
        en: "Once the previous three steps are covered, automate periodic contributions to diversified, low-cost instruments. The key isn't guessing the market, but consistency and time.",
        fr: "Une fois les trois étapes précédentes accomplies, automatisez des versements périodiques vers des instruments diversifiés et peu coûteux. La clé n'est pas de deviner le marché, mais la constance et le temps.",
        it: "Una volta coperti i tre passi precedenti, automatizza versamenti periodici verso strumenti diversificati e a basso costo. La chiave non è indovinare il mercato, ma la costanza e il tempo.",
        pt: "Depois de cobrir os três passos anteriores, automatize aportes periódicos em instrumentos diversificados e de baixo custo. A chave não é adivinhar o mercado, e sim a constância e o tempo."
      }
    }
  ],

  // Opciones genéricas para poner a trabajar el excedente (sin nombrar entidades
  // concretas ni cifras de fiscalidad: eso depende del país y cambia con el tiempo).
  investingOptions: [
    {
      title: { es: "Fondos o ETFs indexados", en: "Index funds or ETFs", fr: "Fonds ou ETF indiciels", it: "Fondi o ETF indicizzati", pt: "Fundos ou ETFs indexados" },
      note: {
        es: "Replican un índice amplio (por ejemplo, uno global de renta variable): diversificas entre miles de compañías con comisiones muy bajas, sin necesidad de elegir qué empresa concreta va a subir.",
        en: "They track a broad index (for example, a global equity index): you diversify across thousands of companies with very low fees, without needing to pick which specific company will go up.",
        fr: "Ils répliquent un large indice (par exemple, un indice actions mondial) : vous diversifiez entre des milliers d'entreprises avec des frais très bas, sans avoir besoin de choisir quelle entreprise précise va monter.",
        it: "Replicano un indice ampio (ad esempio, uno globale azionario): diversifichi tra migliaia di aziende con commissioni molto basse, senza dover scegliere quale azienda specifica salirà.",
        pt: "Replicam um índice amplo (por exemplo, um índice global de renda variável): você diversifica entre milhares de empresas com taxas muito baixas, sem precisar escolher qual empresa específica vai subir."
      }
    },
    {
      title: { es: "Gestores automatizados (\"robo-advisors\")", en: "Automated managers (\"robo-advisors\")", fr: "Gestionnaires automatisés (« robo-advisors »)", it: "Gestori automatizzati (\"robo-advisor\")", pt: "Gestores automatizados (\"robo-advisors\")" },
      note: {
        es: "Plataformas que, tras un breve test de perfil de riesgo, arman y mantienen una cartera diversificada por ti, sin que necesites conocimientos técnicos previos.",
        en: "Platforms that, after a brief risk-profile test, build and maintain a diversified portfolio for you, with no prior technical knowledge needed.",
        fr: "Des plateformes qui, après un bref test de profil de risque, constituent et gèrent un portefeuille diversifié pour vous, sans que vous ayez besoin de connaissances techniques préalables.",
        it: "Piattaforme che, dopo un breve test del profilo di rischio, costruiscono e mantengono un portafoglio diversificato per te, senza che tu debba avere conoscenze tecniche pregresse.",
        pt: "Plataformas que, após um breve teste de perfil de risco, montam e mantêm uma carteira diversificada para você, sem que sejam necessários conhecimentos técnicos prévios."
      }
    },
    {
      title: { es: "Cuentas remuneradas o fondos monetarios", en: "High-yield accounts or money-market funds", fr: "Comptes rémunérés ou fonds monétaires", it: "Conti remunerati o fondi monetari", pt: "Contas remuneradas ou fundos do mercado monetário" },
      note: {
        es: "Riesgo mínimo y disponibilidad casi inmediata: pensados para el fondo de emergencia o dinero que vayas a necesitar en poco tiempo, no para el ahorro a largo plazo.",
        en: "Minimal risk and near-immediate availability: meant for the emergency fund or money you'll need soon, not for long-term savings.",
        fr: "Risque minimal et disponibilité quasi immédiate : pensés pour le fonds d'urgence ou l'argent dont vous aurez besoin sous peu, pas pour l'épargne à long terme.",
        it: "Rischio minimo e disponibilità quasi immediata: pensati per il fondo di emergenza o per denaro che ti servirà a breve, non per il risparmio a lungo termine.",
        pt: "Risco mínimo e disponibilidade quase imediata: pensados para o fundo de emergência ou dinheiro que você vai precisar em breve, não para a poupança de longo prazo."
      }
    }
  ],

  // Consejos de ahorro originales, inspirados en principios de educación financiera
  // conocidos (regla 50/30/20, automatización del ahorro, aversión a la pérdida, etc.)
  tips: [
    {
      title: { es: "No es cuestión de ganar más", en: "It's not about earning more", fr: "Ce n'est pas une question de gagner plus", it: "Non è una questione di guadagnare di più", pt: "Não é questão de ganhar mais" },
      body: {
        es: "Es cuestión de gastar con inteligencia. Antes de buscar un ingreso extra, revisa primero en qué se te está yendo el dinero que ya ganas.",
        en: "It's about spending wisely. Before looking for extra income, first check where the money you already earn is going.",
        fr: "C'est une question de dépenser intelligemment. Avant de chercher un revenu supplémentaire, vérifiez d'abord où part l'argent que vous gagnez déjà.",
        it: "È questione di spendere con intelligenza. Prima di cercare un reddito extra, controlla dove sta finendo il denaro che già guadagni.",
        pt: "É questão de gastar com inteligência. Antes de buscar uma renda extra, revise primeiro para onde está indo o dinheiro que você já ganha."
      }
    },
    {
      title: { es: "Sobres virtuales por categoría", en: "Virtual envelopes per category", fr: "Enveloppes virtuelles par catégorie", it: "Buste virtuali per categoria", pt: "Envelopes virtuais por categoria" },
      body: {
        es: "Una técnica clásica de presupuesto: asigna un límite mensual a cada categoría, como si fuera un sobre de efectivo. Cuando el sobre se acaba, ese gasto espera al mes siguiente. Es un complemento a tu meta de gasto diario.",
        en: "A classic budgeting technique: assign a monthly limit to each category, as if it were a cash envelope. When the envelope runs out, that spending waits until next month. It's a complement to your daily spending goal.",
        fr: "Une technique de budget classique : attribuez une limite mensuelle à chaque catégorie, comme s'il s'agissait d'une enveloppe de liquide. Quand l'enveloppe est vide, cette dépense attend le mois suivant. C'est un complément à votre objectif de dépense quotidien.",
        it: "Una tecnica di budget classica: assegna un limite mensile a ogni categoria, come se fosse una busta di contanti. Quando la busta finisce, quella spesa aspetta il mese successivo. È un complemento al tuo obiettivo di spesa giornaliero.",
        pt: "Uma técnica clássica de orçamento: atribua um limite mensal a cada categoria, como se fosse um envelope de dinheiro. Quando o envelope acaba, esse gasto espera até o mês seguinte. É um complemento à sua meta de gasto diário."
      }
    },
    {
      title: { es: "Paga primero la deuda más cara", en: "Pay off the most expensive debt first", fr: "Remboursez d'abord la dette la plus chère", it: "Salda prima il debito più caro", pt: "Pague primeiro a dívida mais cara" },
      body: {
        es: "Si tienes varias deudas, prioriza la que tenga el interés más alto (normalmente la tarjeta de crédito). A largo plazo ahorrarás más que pagando primero la de menor saldo.",
        en: "If you have several debts, prioritize the one with the highest interest rate (usually the credit card). In the long run you'll save more than by paying off the smallest balance first.",
        fr: "Si vous avez plusieurs dettes, donnez la priorité à celle qui a le taux d'intérêt le plus élevé (généralement la carte de crédit). À long terme, vous économiserez plus qu'en remboursant d'abord le plus petit solde.",
        it: "Se hai più debiti, dai priorità a quello con l'interesse più alto (di solito la carta di credito). Nel lungo periodo risparmierai di più rispetto a saldare prima quello col saldo minore.",
        pt: "Se você tem várias dívidas, priorize a que tem o juro mais alto (geralmente o cartão de crédito). No longo prazo você economizará mais do que pagando primeiro a de menor saldo."
      }
    },
    {
      title: { es: "Págate a ti mismo primero", en: "Pay yourself first", fr: "Payez-vous d'abord vous-même", it: "Paga prima te stesso", pt: "Pague-se primeiro" },
      body: {
        es: "En cuanto recibas un ingreso, aparta un porcentaje fijo hacia el ahorro antes de gastar en cualquier otra cosa. Automatizarlo evita que dependas de la fuerza de voluntad.",
        en: "As soon as you receive income, set aside a fixed percentage toward savings before spending on anything else. Automating it means you don't have to rely on willpower.",
        fr: "Dès que vous recevez un revenu, mettez de côté un pourcentage fixe pour l'épargne avant de dépenser quoi que ce soit d'autre. L'automatiser évite de dépendre de votre volonté.",
        it: "Non appena ricevi un'entrata, metti da parte una percentuale fissa per il risparmio prima di spendere in qualsiasi altra cosa. Automatizzarlo evita di dipendere dalla forza di volontà.",
        pt: "Assim que receber uma renda, separe uma porcentagem fixa para poupança antes de gastar em qualquer outra coisa. Automatizar isso evita depender de força de vontade."
      }
    },
    {
      title: { es: "Regla 50/30/20", en: "The 50/30/20 rule", fr: "La règle 50/30/20", it: "La regola 50/30/20", pt: "Regra 50/30/20" },
      body: {
        es: "Una forma sencilla de repartir tu ingreso mensual: 50% a necesidades (vivienda, comida, transporte), 30% a deseos (ocio, compras) y 20% a ahorro o pago de deudas. Úsala como referencia, no como obligación rígida; esta app calcula tu meta de ahorro diario a partir de la cuota que definas, no necesariamente del 20%.",
        en: "A simple way to split your monthly income: 50% to needs (housing, food, transport), 30% to wants (leisure, shopping) and 20% to savings or debt payments. Use it as a reference, not a rigid rule; this app calculates your daily savings goal from the amount you set, not necessarily 20%.",
        fr: "Une manière simple de répartir votre revenu mensuel : 50 % pour les besoins (logement, nourriture, transport), 30 % pour les envies (loisirs, achats) et 20 % pour l'épargne ou le remboursement de dettes. Utilisez-la comme référence, pas comme une obligation rigide ; cette appli calcule votre objectif d'épargne quotidien à partir du montant que vous définissez, pas nécessairement 20 %.",
        it: "Un modo semplice per suddividere il tuo reddito mensile: 50% ai bisogni (casa, cibo, trasporti), 30% ai desideri (svago, shopping) e 20% al risparmio o al pagamento dei debiti. Usala come riferimento, non come obbligo rigido; questa app calcola il tuo obiettivo di risparmio giornaliero in base alla quota che definisci, non necessariamente il 20%.",
        pt: "Uma forma simples de dividir sua renda mensal: 50% para necessidades (moradia, comida, transporte), 30% para desejos (lazer, compras) e 20% para poupança ou pagamento de dívidas. Use-a como referência, não como obrigação rígida; este app calcula sua meta de poupança diária a partir da cota que você definir, não necessariamente 20%."
      }
    },
    {
      title: { es: "Las rachas motivan más que las cifras", en: "Streaks motivate more than numbers", fr: "Les séries motivent plus que les chiffres", it: "Le serie motivano più dei numeri", pt: "As sequências motivam mais que os números" },
      body: {
        es: "Cumplir tu meta diaria varios días seguidos genera una racha. Perder una racha larga duele más que lo que anima ganarla, así que úsala a tu favor: no la rompas hoy.",
        en: "Hitting your daily goal several days in a row builds a streak. Losing a long streak hurts more than gaining it feels good, so use that to your advantage: don't break it today.",
        fr: "Atteindre votre objectif quotidien plusieurs jours de suite crée une série. Perdre une longue série fait plus mal que le plaisir de la gagner, alors utilisez cela à votre avantage : ne la brisez pas aujourd'hui.",
        it: "Raggiungere il tuo obiettivo giornaliero per più giorni di fila crea una serie. Perdere una lunga serie fa più male di quanto motivi ottenerla, quindi usalo a tuo favore: non interromperla oggi.",
        pt: "Cumprir sua meta diária vários dias seguidos gera uma sequência. Perder uma sequência longa dói mais do que anima ganhá-la, então use isso a seu favor: não a quebre hoje."
      }
    },
    {
      title: { es: "Revisa tus suscripciones cada trimestre", en: "Review your subscriptions every quarter", fr: "Vérifiez vos abonnements chaque trimestre", it: "Rivedi i tuoi abbonamenti ogni trimestre", pt: "Revise suas assinaturas a cada trimestre" },
      body: {
        es: "Las suscripciones pequeñas se acumulan sin que las notes. Repásalas cada tres meses y cancela las que no usas de verdad.",
        en: "Small subscriptions pile up without you noticing. Review them every three months and cancel the ones you don't really use.",
        fr: "Les petits abonnements s'accumulent sans que vous le remarquiez. Passez-les en revue tous les trois mois et annulez ceux que vous n'utilisez pas vraiment.",
        it: "I piccoli abbonamenti si accumulano senza che tu te ne accorga. Rivedili ogni tre mesi e cancella quelli che non usi davvero.",
        pt: "As pequenas assinaturas se acumulam sem que você perceba. Revise-as a cada três meses e cancele as que você não usa de verdade."
      }
    },
    {
      title: { es: "Espera 24 horas antes de una compra no planificada", en: "Wait 24 hours before an unplanned purchase", fr: "Attendez 24 heures avant un achat non prévu", it: "Aspetta 24 ore prima di un acquisto non pianificato", pt: "Espere 24 horas antes de uma compra não planejada" },
      body: {
        es: "Si algo no estaba en tu lista, dale un día. Muchas ganas de comprar desaparecen solas cuando dejan de ser impulsivas.",
        en: "If something wasn't on your list, give it a day. Many urges to buy fade on their own once they stop being impulsive.",
        fr: "Si quelque chose n'était pas sur votre liste, laissez passer une journée. Beaucoup d'envies d'achat disparaissent d'elles-mêmes une fois qu'elles ne sont plus impulsives.",
        it: "Se qualcosa non era nella tua lista, aspetta un giorno. Molte voglie di comprare svaniscono da sole quando smettono di essere impulsive.",
        pt: "Se algo não estava na sua lista, dê um dia de prazo. Muitas vontades de comprar desaparecem sozinhas quando deixam de ser impulsivas."
      }
    },
    {
      title: { es: "Vigila los gastos hormiga", en: "Watch out for small recurring expenses", fr: "Surveillez les petites dépenses du quotidien", it: "Attento alle micro-spese quotidiane", pt: "Fique de olho nos gastos-formiga" },
      body: {
        es: "Los pequeños consumos diarios, como un café o un antojo, parecen insignificantes, pero vacían tu bolsillo mes a mes. Presta atención a esos importes menores para evitar fugas de dinero imprevistas, y cuidado con los precios terminados en .99: tu cerebro los percibe como mucho más baratos de lo que realmente son.",
        en: "Small daily purchases, like a coffee or a snack, seem insignificant, but they drain your pocket month after month. Pay attention to those small amounts to avoid unexpected money leaks, and watch out for prices ending in .99: your brain perceives them as much cheaper than they really are.",
        fr: "Les petites dépenses quotidiennes, comme un café ou une envie, semblent insignifiantes, mais elles vident votre porte-monnaie mois après mois. Prêtez attention à ces petits montants pour éviter des fuites d'argent inattendues, et méfiez-vous des prix se terminant par .99 : votre cerveau les perçoit comme bien moins chers qu'ils ne le sont réellement.",
        it: "Le piccole spese quotidiane, come un caffè o uno sfizio, sembrano insignificanti, ma svuotano il portafoglio mese dopo mese. Presta attenzione a questi importi minori per evitare fughe di denaro impreviste, e attento ai prezzi che finiscono in .99: il tuo cervello li percepisce molto più economici di quanto siano realmente.",
        pt: "Os pequenos gastos diários, como um café ou uma vontade, parecem insignificantes, mas esvaziam seu bolso mês após mês. Preste atenção a esses valores menores para evitar vazamentos de dinheiro imprevistos, e cuidado com os preços terminados em ,99: seu cérebro os percebe como muito mais baratos do que realmente são."
      }
    },
    {
      title: { es: "Prueba el método del redondeo o del céntimo", en: "Try the round-up or spare-change method", fr: "Essayez la méthode de l'arrondi ou de la petite monnaie", it: "Prova il metodo dell'arrotondamento o degli spiccioli", pt: "Experimente o método do arredondamento ou dos trocados" },
      body: {
        es: "Aparta las monedas sueltas del día o redondea el costo de tus compras para guardar la diferencia en una alcancía o cuenta digital. Son cantidades pequeñas, pero acumuladas a lo largo del mes se notan.",
        en: "Set aside your loose change from the day or round up the cost of your purchases to save the difference in a piggy bank or digital account. It's small amounts, but they add up noticeably over a month.",
        fr: "Mettez de côté la monnaie du jour ou arrondissez le coût de vos achats pour épargner la différence dans une tirelire ou un compte numérique. Ce sont de petits montants, mais accumulés sur un mois, cela se remarque.",
        it: "Metti da parte gli spiccioli della giornata o arrotonda il costo dei tuoi acquisti per risparmiare la differenza in un salvadanaio o in un conto digitale. Sono piccole cifre, ma accumulate nel corso del mese si notano.",
        pt: "Separe as moedas soltas do dia ou arredonde o custo das suas compras para guardar a diferença num cofrinho ou conta digital. São valores pequenos, mas acumulados ao longo do mês fazem diferença."
      }
    },
    {
      title: { es: "Aprende a decir que no a las horas extra", en: "Learn to say no to overtime", fr: "Apprenez à dire non aux heures supplémentaires", it: "Impara a dire no agli straordinari", pt: "Aprenda a dizer não às horas extras" },
      body: {
        es: "Trabajar más horas no siempre significa ganar más de verdad: entre el cansancio y el tiempo perdido, el balance puede salir en contra. Si tu prioridad es \"trabajar menos\", practica formas claras y profesionales de poner límites antes de aceptar horas extra por costumbre.",
        en: "Working more hours doesn't always mean really earning more: between the exhaustion and the lost time, the balance can turn against you. If your priority is \"working less\", practice clear, professional ways to set limits before accepting overtime out of habit.",
        fr: "Travailler plus d'heures ne signifie pas toujours gagner vraiment plus : entre la fatigue et le temps perdu, le bilan peut jouer contre vous. Si votre priorité est de « travailler moins », entraînez-vous à poser des limites claires et professionnelles avant d'accepter des heures supplémentaires par habitude.",
        it: "Lavorare più ore non significa sempre guadagnare davvero di più: tra la stanchezza e il tempo perso, il bilancio può risultare negativo. Se la tua priorità è \"lavorare meno\", esercitati a porre limiti chiari e professionali prima di accettare straordinari per abitudine.",
        pt: "Trabalhar mais horas nem sempre significa ganhar mais de verdade: entre o cansaço e o tempo perdido, o saldo pode sair negativo. Se sua prioridade é \"trabalhar menos\", pratique formas claras e profissionais de impor limites antes de aceitar horas extras por hábito."
      }
    },
    {
      title: { es: "Antes de sumar horas, revisa qué te compensa de verdad", en: "Before adding hours, check what really pays off", fr: "Avant d'ajouter des heures, vérifiez ce qui vous rapporte vraiment", it: "Prima di aggiungere ore, verifica cosa conviene davvero", pt: "Antes de somar horas, veja o que realmente compensa" },
      body: {
        es: "Si necesitas ganar más, valora primero alternativas a simplemente trabajar más horas: ingresos pasivos, mejorar tu productividad en el horario que ya tienes o negociar tu salario. Sumar horas sin límite es la puerta de entrada al arquetipo \"El Hámster\".",
        en: "If you need to earn more, first consider alternatives to simply working more hours: passive income, improving your productivity in the hours you already have, or negotiating your salary. Adding hours without limit is the gateway to the \"Hamster\" archetype.",
        fr: "Si vous devez gagner plus, envisagez d'abord des alternatives à simplement travailler plus d'heures : revenus passifs, amélioration de votre productivité dans l'horaire que vous avez déjà, ou négociation de votre salaire. Ajouter des heures sans limite est la porte d'entrée vers l'archétype « Le Hamster ».",
        it: "Se hai bisogno di guadagnare di più, valuta prima alternative al semplice lavorare più ore: entrate passive, migliorare la tua produttività nell'orario che hai già o negoziare lo stipendio. Aggiungere ore senza limite è la porta d'ingresso all'archetipo \"Il Criceto\".",
        pt: "Se você precisa ganhar mais, avalie primeiro alternativas a simplesmente trabalhar mais horas: renda passiva, melhorar sua produtividade no horário que já tem ou negociar seu salário. Somar horas sem limite é a porta de entrada para o arquétipo \"O Hamster\"."
      }
    },
    {
      title: { es: "Evita la inflación de estilo de vida", en: "Avoid lifestyle inflation", fr: "Évitez l'inflation du style de vie", it: "Evita l'inflazione dello stile di vita", pt: "Evite a inflação do estilo de vida" },
      body: {
        es: "Cuando tus ingresos suban, aumenta tu ahorro en la misma proporción antes de aumentar tus gastos fijos.",
        en: "When your income rises, increase your savings by the same proportion before increasing your fixed expenses.",
        fr: "Lorsque vos revenus augmentent, augmentez votre épargne dans la même proportion avant d'augmenter vos dépenses fixes.",
        it: "Quando le tue entrate aumentano, aumenta il risparmio nella stessa proporzione prima di aumentare le spese fisse.",
        pt: "Quando sua renda aumentar, aumente sua poupança na mesma proporção antes de aumentar suas despesas fixas."
      }
    },
    {
      title: { es: "Registra hasta los gastos pequeños", en: "Log even the small expenses", fr: "Notez même les petites dépenses", it: "Registra anche le piccole spese", pt: "Registre até os gastos pequenos" },
      body: {
        es: "Un café o un trayecto suelto no parecen importantes, pero sumados durante un mes suelen sorprender. Anótalos todos.",
        en: "A coffee or a one-off ride don't seem important, but added up over a month they tend to surprise you. Log all of them.",
        fr: "Un café ou un trajet isolé ne semblent pas importants, mais additionnés sur un mois, ils surprennent souvent. Notez-les tous.",
        it: "Un caffè o una corsa isolata non sembrano importanti, ma sommati in un mese di solito sorprendono. Registrali tutti.",
        pt: "Um café ou uma corrida avulsa não parecem importantes, mas somados ao longo de um mês costumam surpreender. Anote todos."
      }
    },
    {
      title: { es: "Fondo de emergencia antes que inversión", en: "Emergency fund before investing", fr: "Fonds d'urgence avant l'investissement", it: "Fondo di emergenza prima dell'investimento", pt: "Fundo de emergência antes de investir" },
      body: {
        es: "Antes de invertir, ten ahorrado el equivalente a 3-6 meses de gastos básicos. Te protege de tener que endeudarte ante un imprevisto.",
        en: "Before investing, have the equivalent of 3-6 months of basic expenses saved up. It protects you from having to go into debt in the face of an unexpected event.",
        fr: "Avant d'investir, ayez épargné l'équivalent de 3 à 6 mois de dépenses de base. Cela vous protège de devoir vous endetter face à un imprévu.",
        it: "Prima di investire, abbi da parte l'equivalente di 3-6 mesi di spese di base. Ti protegge dal doverti indebitare di fronte a un imprevisto.",
        pt: "Antes de investir, tenha guardado o equivalente a 3-6 meses de despesas básicas. Isso te protege de ter que se endividar diante de um imprevisto."
      }
    },
    {
      title: { es: "Optimiza tus facturas de luz, gas e internet", en: "Optimize your power, gas and internet bills", fr: "Optimisez vos factures d'électricité, de gaz et d'internet", it: "Ottimizza le bollette di luce, gas e internet", pt: "Otimize suas contas de luz, gás e internet" },
      body: {
        es: "Revisa la potencia eléctrica contratada (si nunca te han saltado los plomos, seguramente pagas de más) y compara tarifas al menos una vez al año: el mercado suele tener descuentos de bienvenida o de retención.",
        en: "Check your contracted power supply (if your fuses have never tripped, you're probably overpaying) and compare rates at least once a year: the market usually has welcome or retention discounts.",
        fr: "Vérifiez la puissance électrique souscrite (si vos plombs n'ont jamais sauté, vous payez probablement trop) et comparez les tarifs au moins une fois par an : le marché offre souvent des remises de bienvenue ou de fidélisation.",
        it: "Controlla la potenza elettrica contrattata (se non ti sono mai saltate le valvole, probabilmente paghi di più) e confronta le tariffe almeno una volta all'anno: il mercato di solito ha sconti di benvenuto o di fidelizzazione.",
        pt: "Revise a potência elétrica contratada (se os disjuntores nunca desarmaram, provavelmente você paga a mais) e compare tarifas pelo menos uma vez por ano: o mercado costuma ter descontos de boas-vindas ou de retenção."
      }
    },
    {
      title: { es: "Reduce el consumo de agua con aireadores", en: "Reduce water use with aerators", fr: "Réduisez la consommation d'eau avec des aérateurs", it: "Riduci il consumo d'acqua con i frangigetto", pt: "Reduza o consumo de água com arejadores" },
      body: {
        es: "Cuestan poco y se instalan en minutos en el grifo y la ducha: reducen el caudal hasta un 40% sin que notes pérdida de presión.",
        en: "They're cheap and install in minutes on the faucet and shower: they cut water flow by up to 40% without you noticing any loss of pressure.",
        fr: "Ils coûtent peu et s'installent en quelques minutes sur le robinet et la douche : ils réduisent le débit jusqu'à 40 % sans perte de pression perceptible.",
        it: "Costano poco e si installano in pochi minuti su rubinetto e doccia: riducono la portata fino al 40% senza che tu noti perdita di pressione.",
        pt: "Custam pouco e se instalam em minutos na torneira e no chuveiro: reduzem a vazão em até 40% sem que você note perda de pressão."
      }
    },
    {
      title: { es: "Ve al súper con lista cerrada y sin hambre", en: "Go to the supermarket with a fixed list and not hungry", fr: "Allez au supermarché avec une liste fermée et sans avoir faim", it: "Vai al supermercato con una lista chiusa e senza fame", pt: "Vá ao mercado com lista fechada e sem fome" },
      body: {
        es: "Comprar sin planificar puede sumar hasta un 20% de gasto extra en productos no esenciales, además de comida que acaba tirándose.",
        en: "Shopping without planning can add up to 20% extra spending on non-essential products, plus food that ends up being thrown away.",
        fr: "Acheter sans planifier peut ajouter jusqu'à 20 % de dépenses supplémentaires en produits non essentiels, en plus de la nourriture qui finit à la poubelle.",
        it: "Fare la spesa senza pianificare può aggiungere fino al 20% di spesa extra in prodotti non essenziali, oltre a cibo che finisce buttato.",
        pt: "Comprar sem planejar pode somar até 20% de gasto extra em produtos não essenciais, além de comida que acaba sendo jogada fora."
      }
    },
    {
      title: { es: "Compara el precio por kilo o litro, no el del envase", en: "Compare price per kilo or liter, not per package", fr: "Comparez le prix au kilo ou au litre, pas celui de l'emballage", it: "Confronta il prezzo al chilo o al litro, non quello della confezione", pt: "Compare o preço por quilo ou litro, não o da embalagem" },
      body: {
        es: "Los formatos \"familiares\" o de \"ahorro\" no siempre son los más baratos: la etiqueta con el precio por unidad de medida es la referencia real.",
        en: "\"Family\" or \"savings\" sizes aren't always the cheapest: the label with the price per unit of measure is the real reference.",
        fr: "Les formats « familiaux » ou « économiques » ne sont pas toujours les moins chers : l'étiquette avec le prix à l'unité de mesure est la vraie référence.",
        it: "I formati \"famiglia\" o \"risparmio\" non sono sempre i più economici: l'etichetta con il prezzo per unità di misura è il vero riferimento.",
        pt: "As embalagens \"família\" ou \"econômicas\" nem sempre são as mais baratas: a etiqueta com o preço por unidade de medida é a referência real."
      }
    },
    {
      title: { es: "Prioriza fruta, verdura y pescado de temporada", en: "Prioritize seasonal fruit, vegetables and fish", fr: "Privilégiez les fruits, légumes et poissons de saison", it: "Dai priorità a frutta, verdura e pesce di stagione", pt: "Priorize frutas, verduras e peixes da estação" },
      body: {
        es: "Suelen costar entre un 20% y un 40% menos que los productos importados o fuera de temporada.",
        en: "They usually cost 20% to 40% less than imported or out-of-season products.",
        fr: "Ils coûtent généralement 20 à 40 % de moins que les produits importés ou hors saison.",
        it: "Di solito costano tra il 20% e il 40% in meno rispetto ai prodotti importati o fuori stagione.",
        pt: "Costumam custar entre 20% e 40% a menos do que os produtos importados ou fora de estação."
      }
    },
    {
      title: { es: "Ahorra en combustible con hábitos simples", en: "Save on fuel with simple habits", fr: "Économisez du carburant avec des habitudes simples", it: "Risparmia carburante con abitudini semplici", pt: "Economize combustível com hábitos simples" },
      body: {
        es: "Mantener la presión correcta de los neumáticos y evitar acelerones bruscos reduce el consumo hasta un 3%; comparar precios entre gasolineras cercanas también marca diferencia.",
        en: "Keeping correct tire pressure and avoiding sharp acceleration cuts fuel use by up to 3%; comparing prices between nearby gas stations also makes a difference.",
        fr: "Maintenir une pression correcte des pneus et éviter les accélérations brusques réduit la consommation jusqu'à 3 % ; comparer les prix entre stations-service proches fait aussi la différence.",
        it: "Mantenere la corretta pressione degli pneumatici ed evitare accelerazioni brusche riduce il consumo fino al 3%; anche confrontare i prezzi tra distributori vicini fa la differenza.",
        pt: "Manter a pressão correta dos pneus e evitar acelerações bruscas reduz o consumo em até 3%; comparar preços entre postos próximos também faz diferença."
      }
    },
    {
      title: { es: "Mantén solo una suscripción activa a la vez", en: "Keep only one subscription active at a time", fr: "Ne gardez qu'un seul abonnement actif à la fois", it: "Mantieni attivo un solo abbonamento alla volta", pt: "Mantenha apenas uma assinatura ativa por vez" },
      body: {
        es: "En lugar de pagar varias plataformas de streaming o gimnasios a la vez, ve alternando cuál tienes activa según lo que realmente vayas a usar ese mes.",
        en: "Instead of paying for several streaming platforms or gyms at once, rotate which one you keep active based on what you'll actually use that month.",
        fr: "Au lieu de payer plusieurs plateformes de streaming ou salles de sport à la fois, alternez celle que vous gardez active selon ce que vous allez réellement utiliser ce mois-là.",
        it: "Invece di pagare più piattaforme di streaming o palestre contemporaneamente, alterna quale tenere attiva in base a cosa userai davvero quel mese.",
        pt: "Em vez de pagar várias plataformas de streaming ou academias ao mesmo tempo, alterne qual mantém ativa conforme o que realmente vai usar naquele mês."
      }
    },
    {
      title: { es: "Compra de segunda mano lo que uses poco", en: "Buy secondhand what you use rarely", fr: "Achetez d'occasion ce que vous utilisez peu", it: "Compra di seconda mano ciò che usi poco", pt: "Compre usado o que você usa pouco" },
      body: {
        es: "Para herramientas, libros o equipamiento deportivo de uso ocasional, mira primero en plataformas de segunda mano antes de comprar nuevo.",
        en: "For tools, books or sports equipment you'll use occasionally, check secondhand platforms first before buying new.",
        fr: "Pour les outils, livres ou équipements sportifs d'usage occasionnel, regardez d'abord sur les plateformes d'occasion avant d'acheter neuf.",
        it: "Per attrezzi, libri o attrezzatura sportiva di uso occasionale, guarda prima nelle piattaforme dell'usato prima di comprare nuovo.",
        pt: "Para ferramentas, livros ou equipamentos esportivos de uso ocasional, procure primeiro em plataformas de usados antes de comprar novo."
      }
    },
    {
      title: { es: "Calcula el impacto real con el \"Factor 365\"", en: "Calculate the real impact with the \"365 Factor\"", fr: "Calculez l'impact réel avec le « Facteur 365 »", it: "Calcola l'impatto reale con il \"Fattore 365\"", pt: "Calcule o impacto real com o \"Fator 365\"" },
      body: {
        es: "Multiplica un gasto diario por 365 (o semanal por 52) para ver su peso anual real: un café de 1,80 € al día no son 1,80 €, son casi 660 € al año. Verlo así ayuda a decidir qué merece la pena de verdad.",
        en: "Multiply a daily expense by 365 (or a weekly one by 52) to see its real yearly weight: a coffee at €1.80 a day isn't €1.80, it's almost €660 a year. Seeing it this way helps decide what's really worth it.",
        fr: "Multipliez une dépense quotidienne par 365 (ou hebdomadaire par 52) pour voir son poids annuel réel : un café à 1,80 € par jour, ce n'est pas 1,80 €, c'est près de 660 € par an. Le voir ainsi aide à décider ce qui en vaut vraiment la peine.",
        it: "Moltiplica una spesa giornaliera per 365 (o settimanale per 52) per vedere il suo peso annuale reale: un caffè da 1,80 € al giorno non sono 1,80 €, sono quasi 660 € all'anno. Vederlo così aiuta a decidere cosa vale davvero la pena.",
        pt: "Multiplique um gasto diário por 365 (ou semanal por 52) para ver seu peso anual real: um café de 1,80 € por dia não são 1,80 €, são quase 660 € por ano. Ver assim ajuda a decidir o que realmente vale a pena."
      }
    },
    {
      title: { es: "Sustituye en vez de prohibir", en: "Substitute instead of forbidding", fr: "Remplacez au lieu d'interdire", it: "Sostituisci invece di proibire", pt: "Substitua em vez de proibir" },
      body: {
        es: "Prohibirte algo de golpe suele generar frustración y que acabes volviendo a caer. Mejor optimiza el coste del hábito (un termo en vez del café de máquina) o fíjate un presupuesto fijo para esos gastos libres.",
        en: "Suddenly forbidding yourself something tends to create frustration and you end up falling back into it. It's better to optimize the cost of the habit (a thermos instead of vending-machine coffee) or set yourself a fixed budget for those free-spending items.",
        fr: "Vous interdire quelque chose du jour au lendemain crée généralement de la frustration et vous finissez par y retomber. Mieux vaut optimiser le coût de l'habitude (un thermos au lieu du café de la machine) ou vous fixer un budget fixe pour ces dépenses libres.",
        it: "Proibirti qualcosa di colpo tende a generare frustrazione e a farti ricascare. Meglio ottimizzare il costo dell'abitudine (un thermos invece del caffè della macchinetta) o fissarti un budget fisso per quelle spese libere.",
        pt: "Proibir algo de repente costuma gerar frustração e acabar te fazendo recair. Melhor otimizar o custo do hábito (uma garrafa térmica em vez do café da máquina) ou fixar um orçamento fixo para esses gastos livres."
      }
    },
    {
      title: { es: "Abre una \"cuenta de bolsillo\" para gastos libres", en: "Open a \"pocket account\" for free spending", fr: "Ouvrez un « compte de poche » pour les dépenses libres", it: "Apri un \"conto tasca\" per le spese libere", pt: "Abra uma \"conta de bolso\" para gastos livres" },
      body: {
        es: "Asigna una cantidad fija al mes a una tarjeta o cuenta aparte para tus caprichos. Cuando se acaba el saldo, se acaban las microcompras hasta el mes siguiente.",
        en: "Assign a fixed monthly amount to a separate card or account for your treats. When the balance runs out, so do the small purchases until next month.",
        fr: "Attribuez un montant fixe par mois à une carte ou un compte séparé pour vos petits plaisirs. Quand le solde est épuisé, les micro-achats s'arrêtent jusqu'au mois suivant.",
        it: "Assegna una cifra fissa al mese a una carta o conto separato per i tuoi sfizi. Quando il saldo finisce, finiscono anche i micro-acquisti fino al mese successivo.",
        pt: "Atribua um valor fixo por mês a um cartão ou conta separada para seus mimos. Quando o saldo acaba, acabam as microcompras até o mês seguinte."
      }
    },
    {
      title: { es: "Revisa las comisiones de tu banco", en: "Review your bank's fees", fr: "Vérifiez les frais de votre banque", it: "Controlla le commissioni della tua banca", pt: "Revise as tarifas do seu banco" },
      body: {
        es: "Comprueba que cumples los requisitos para no pagar mantenimiento (nómina domiciliada, recibos, etc.). Si te cobran comisiones evitables, plantéate cambiar de entidad.",
        en: "Check that you meet the requirements to avoid maintenance fees (direct-deposited payroll, bills, etc.). If you're charged avoidable fees, consider switching banks.",
        fr: "Vérifiez que vous remplissez les conditions pour ne pas payer de frais de tenue de compte (salaire domicilié, prélèvements, etc.). Si on vous facture des frais évitables, envisagez de changer de banque.",
        it: "Verifica di soddisfare i requisiti per non pagare il canone (accredito stipendio, bollette domiciliate, ecc.). Se ti addebitano commissioni evitabili, valuta di cambiare banca.",
        pt: "Verifique se você cumpre os requisitos para não pagar manutenção (salário em conta, débitos automáticos, etc.). Se te cobram tarifas evitáveis, considere trocar de banco."
      }
    },
    {
      title: { es: "Elimina las tarjetas guardadas en apps de compra", en: "Remove saved cards from shopping apps", fr: "Supprimez les cartes enregistrées dans les applis d'achat", it: "Elimina le carte salvate nelle app di acquisto", pt: "Remova os cartões salvos nos apps de compra" },
      body: {
        es: "Quita los datos de pago guardados en tiendas online y apps de comida a domicilio o transporte: tener que levantarte a buscar la tarjeta física frena bastante la compra por aburrimiento o impulso.",
        en: "Remove saved payment details from online stores and food-delivery or ride apps: having to get up to find your physical card significantly discourages boredom or impulse purchases.",
        fr: "Retirez les données de paiement enregistrées dans les boutiques en ligne et les applis de livraison de repas ou de transport : devoir se lever pour chercher la carte physique freine pas mal les achats d'ennui ou d'impulsion.",
        it: "Rimuovi i dati di pagamento salvati nei negozi online e nelle app di cibo a domicilio o trasporto: doversi alzare per cercare la carta fisica frena parecchio l'acquisto per noia o impulso.",
        pt: "Remova os dados de pagamento salvos em lojas online e apps de comida ou transporte: ter que se levantar para buscar o cartão físico já freia bastante a compra por tédio ou impulso."
      }
    },
    {
      title: { es: "Lleva un registro de 14 días de tus gastos menores", en: "Keep a 14-day log of your small expenses", fr: "Tenez un registre de 14 jours de vos petites dépenses", it: "Tieni un registro di 14 giorni delle tue piccole spese", pt: "Faça um registro de 14 dias dos seus gastos menores" },
      body: {
        es: "Apunta solo lo que gastes por debajo de 5 € durante dos semanas y multiplica el subtotal por 26 para ver el impacto anualizado. Tomar conciencia del acumulado suele ser el mayor empujón para cambiar el hábito.",
        en: "Write down only what you spend under €5 for two weeks and multiply the subtotal by 26 to see the annualized impact. Becoming aware of the total is usually the biggest push to change the habit.",
        fr: "Notez uniquement ce que vous dépensez en dessous de 5 € pendant deux semaines et multipliez le sous-total par 26 pour voir l'impact annualisé. Prendre conscience du cumul est souvent le plus grand déclic pour changer l'habitude.",
        it: "Annota solo ciò che spendi sotto i 5 € per due settimane e moltiplica il subtotale per 26 per vedere l'impatto annualizzato. Prendere coscienza dell'accumulo è di solito la spinta maggiore per cambiare l'abitudine.",
        pt: "Anote apenas o que você gasta abaixo de 5 € durante duas semanas e multiplique o subtotal por 26 para ver o impacto anualizado. Perceber o total acumulado costuma ser o maior empurrão para mudar o hábito."
      }
    },
    {
      title: { es: "Audita tus suscripciones en 30 minutos", en: "Audit your subscriptions in 30 minutes", fr: "Auditez vos abonnements en 30 minutes", it: "Fai un audit dei tuoi abbonamenti in 30 minuti", pt: "Faça uma auditoria das suas assinaturas em 30 minutos" },
      body: {
        es: "Revisa el extracto bancario buscando cargos recurrentes del mismo importe, y comprueba también los ajustes de suscripciones del móvil (iOS/Android) y de PayPal, que no siempre aparecen claros en el banco. Clasifica cada una en imprescindible, pausar o cancelar ya, y da de baja las que sobren en el momento: mantienes el acceso hasta el fin del periodo pagado sin riesgo de que se renueve.",
        en: "Check your bank statement for recurring charges of the same amount, and also check the subscription settings on your phone (iOS/Android) and PayPal, which don't always show up clearly in the bank. Sort each one into essential, pause, or cancel now, and cancel the ones you don't need right away: you keep access until the end of the paid period with no risk of renewal.",
        fr: "Vérifiez le relevé bancaire à la recherche de prélèvements récurrents du même montant, et vérifiez aussi les réglages d'abonnements du téléphone (iOS/Android) et de PayPal, qui n'apparaissent pas toujours clairement à la banque. Classez chacun en indispensable, à suspendre ou à annuler maintenant, et résiliez ceux qui sont en trop tout de suite : vous gardez l'accès jusqu'à la fin de la période payée sans risque de renouvellement.",
        it: "Controlla l'estratto conto cercando addebiti ricorrenti dello stesso importo, e controlla anche le impostazioni degli abbonamenti sul telefono (iOS/Android) e su PayPal, che non sempre appaiono chiari in banca. Classifica ognuno in indispensabile, mettere in pausa o cancellare subito, e disdici quelli di troppo nel momento: mantieni l'accesso fino alla fine del periodo pagato senza rischio di rinnovo.",
        pt: "Revise o extrato bancário procurando cobranças recorrentes do mesmo valor, e verifique também as assinaturas do celular (iOS/Android) e do PayPal, que nem sempre aparecem claras no banco. Classifique cada uma em indispensável, pausar ou cancelar já, e cancele as que sobrarem na hora: você mantém o acesso até o fim do período pago sem risco de renovação."
      }
    },
    {
      title: { es: "Usa una tarjeta virtual para las pruebas gratuitas", en: "Use a virtual card for free trials", fr: "Utilisez une carte virtuelle pour les essais gratuits", it: "Usa una carta virtuale per le prove gratuite", pt: "Use um cartão virtual para os testes grátis" },
      body: {
        es: "Regístrate con una tarjeta virtual de importe limitado, o cancela la suscripción justo después de darte de alta: la prueba sigue activa hasta su fecha de fin sin que te cobren nada al terminar.",
        en: "Sign up with a limited-amount virtual card, or cancel the subscription right after signing up: the trial stays active until its end date without you being charged when it finishes.",
        fr: "Inscrivez-vous avec une carte virtuelle à montant limité, ou annulez l'abonnement juste après votre inscription : l'essai reste actif jusqu'à sa date de fin sans que vous soyez facturé une fois terminé.",
        it: "Iscriviti con una carta virtuale a importo limitato, oppure disdici l'abbonamento subito dopo l'iscrizione: la prova resta attiva fino alla sua data di fine senza che ti venga addebitato nulla al termine.",
        pt: "Cadastre-se com um cartão virtual de valor limitado, ou cancele a assinatura logo após se cadastrar: o teste continua ativo até sua data final sem que você seja cobrado ao terminar."
      }
    },
    {
      title: { es: "Comparte planes familiares y paga anual en lo esencial", en: "Share family plans and pay annually for essentials", fr: "Partagez des forfaits familiaux et payez annuellement l'essentiel", it: "Condividi piani famiglia e paga annualmente l'essenziale", pt: "Compartilhe planos familiares e pague anual no essencial" },
      body: {
        es: "Si convives con más personas, consolidad en un plan familiar (nube, música) en vez de pagar cuentas duplicadas, y cambia a pago anual en los servicios que sí usas de verdad: suele haber descuentos del 15-20%.",
        en: "If you live with other people, consolidate into a family plan (cloud, music) instead of paying for duplicate accounts, and switch to annual payment for the services you really do use: there's usually a 15-20% discount.",
        fr: "Si vous vivez avec d'autres personnes, regroupez-vous sur un forfait familial (stockage, musique) au lieu de payer des comptes en double, et passez au paiement annuel pour les services que vous utilisez vraiment : il y a souvent des remises de 15-20 %.",
        it: "Se vivi con altre persone, consolidate in un piano famiglia (cloud, musica) invece di pagare account duplicati, e passa al pagamento annuale sui servizi che usi davvero: di solito ci sono sconti del 15-20%.",
        pt: "Se você mora com outras pessoas, consolidem em um plano família (nuvem, música) em vez de pagar contas duplicadas, e mude para pagamento anual nos serviços que você realmente usa: costuma haver descontos de 15-20%."
      }
    },
    {
      title: { es: "Amenaza con cambiarte de operador para conseguir descuento", en: "Threaten to switch providers to get a discount", fr: "Menacez de changer d'opérateur pour obtenir une remise", it: "Minaccia di cambiare operatore per ottenere uno sconto", pt: "Ameace trocar de operadora para conseguir desconto" },
      body: {
        es: "Si no tienes permanencia, inicia el trámite de cambio hacia un operador de bajo coste con la misma cobertura. Tu operador actual suele llamarte con una oferta de retención bastante mejor para que te quedes; si no te ofrecen nada, completas el cambio igualmente.",
        en: "If you're not under contract, start the process of switching to a low-cost provider with the same coverage. Your current provider will usually call you with a much better retention offer to keep you; if they don't offer anything, you complete the switch anyway.",
        fr: "Si vous n'êtes pas engagé, entamez la procédure de changement vers un opérateur low-cost avec la même couverture. Votre opérateur actuel vous appellera généralement avec une bien meilleure offre de fidélisation pour vous garder ; s'il ne vous offre rien, vous finalisez le changement de toute façon.",
        it: "Se non hai vincoli, avvia la pratica di passaggio verso un operatore low-cost con la stessa copertura. Il tuo operatore attuale di solito ti chiama con un'offerta di fidelizzazione molto migliore per farti restare; se non ti offre nulla, completi comunque il passaggio.",
        pt: "Se você não tem fidelidade, inicie o processo de troca para uma operadora de baixo custo com a mesma cobertura. Sua operadora atual costuma ligar com uma oferta de retenção bem melhor para você ficar; se não oferecerem nada, você completa a troca mesmo assim."
      }
    },
    {
      title: { es: "Pásate a la marca low-cost de tu propio operador", en: "Switch to your own operator's low-cost brand", fr: "Passez à la marque low-cost de votre propre opérateur", it: "Passa al marchio low-cost del tuo stesso operatore", pt: "Mude para a marca low-cost da sua própria operadora" },
      body: {
        es: "Muchas compañías tienen una \"segunda marca\" más barata que usa la misma red, sin los extras que no necesitas (TV, soporte presencial, permanencia larga). El ahorro suele ser mayor y más estable que negociar cada año.",
        en: "Many companies have a cheaper \"second brand\" that uses the same network, without the extras you don't need (TV, in-person support, long contracts). The savings tend to be bigger and more stable than negotiating every year.",
        fr: "De nombreuses compagnies ont une « seconde marque » moins chère qui utilise le même réseau, sans les extras dont vous n'avez pas besoin (TV, support en personne, engagement long). L'économie est généralement plus importante et plus stable que de négocier chaque année.",
        it: "Molte compagnie hanno un \"secondo marchio\" più economico che usa la stessa rete, senza gli extra che non ti servono (TV, supporto in presenza, vincolo lungo). Il risparmio è di solito maggiore e più stabile che negoziare ogni anno.",
        pt: "Muitas empresas têm uma \"segunda marca\" mais barata que usa a mesma rede, sem os extras de que você não precisa (TV, suporte presencial, fidelidade longa). A economia costuma ser maior e mais estável do que negociar todo ano."
      }
    },
    {
      title: { es: "Repasa qué pagas de más en tu paquete de internet y móvil", en: "Check what you're overpaying for in your internet and mobile bundle", fr: "Vérifiez ce que vous payez en trop dans votre forfait internet et mobile", it: "Verifica cosa paghi in più nel tuo pacchetto internet e mobile", pt: "Verifique o que você paga a mais no seu pacote de internet e celular" },
      body: {
        es: "Si solo ves plataformas bajo demanda, no necesitas la TV de pago del paquete; bajar de 1 Gbps a 300-600 Mb no se nota en el uso normal; y unir varias líneas familiares en la misma cuenta suele salir más barato que contratos sueltos.",
        en: "If you only watch on-demand platforms, you don't need the paid TV in the bundle; dropping from 1 Gbps to 300-600 Mb isn't noticeable in normal use; and joining several family lines under the same account is usually cheaper than separate contracts.",
        fr: "Si vous ne regardez que des plateformes à la demande, vous n'avez pas besoin de la TV payante du forfait ; passer de 1 Gbps à 300-600 Mb ne se remarque pas en usage normal ; et regrouper plusieurs lignes familiales sur le même compte revient généralement moins cher que des contrats séparés.",
        it: "Se guardi solo piattaforme on demand, non ti serve la TV a pagamento del pacchetto; passare da 1 Gbps a 300-600 Mb non si nota nell'uso normale; e unire più linee familiari sullo stesso conto di solito costa meno di contratti separati.",
        pt: "Se você só vê plataformas sob demanda, não precisa da TV paga do pacote; baixar de 1 Gbps para 300-600 Mb não se nota no uso normal; e juntar várias linhas familiares na mesma conta costuma sair mais barato do que contratos separados."
      }
    },
    {
      title: { es: "Detecta las fugas de aire en puertas y ventanas", en: "Detect air leaks in doors and windows", fr: "Détectez les fuites d'air aux portes et fenêtres", it: "Individua le dispersioni d'aria da porte e finestre", pt: "Detecte as frestas de ar em portas e janelas" },
      body: {
        es: "Pasa una vela cerca de marcos y juntas en un día de viento (si la llama oscila, hay fuga) o cierra la ventana con un folio en el marco (si se desliza fácil, el cierre no aprieta bien). Las fugas de aire pueden subir el gasto en calefacción o aire acondicionado entre un 20% y un 30%.",
        en: "Pass a candle near frames and joints on a windy day (if the flame flickers, there's a leak) or close the window with a sheet of paper in the frame (if it slides out easily, the seal isn't tight). Air leaks can raise heating or AC costs by 20% to 30%.",
        fr: "Passez une bougie près des cadres et des joints par jour de vent (si la flamme vacille, il y a une fuite) ou fermez la fenêtre avec une feuille de papier dans le cadre (si elle glisse facilement, le joint ne serre pas bien). Les fuites d'air peuvent augmenter les dépenses de chauffage ou de climatisation de 20 à 30 %.",
        it: "Passa una candela vicino a telai e giunture in una giornata ventosa (se la fiamma oscilla, c'è una perdita) o chiudi la finestra con un foglio nel telaio (se scivola facilmente, la chiusura non stringe bene). Le dispersioni d'aria possono aumentare la spesa di riscaldamento o climatizzazione tra il 20% e il 30%.",
        pt: "Passe uma vela perto de caixilhos e juntas em um dia de vento (se a chama oscilar, há fresta) ou feche a janela com uma folha de papel no caixilho (se deslizar fácil, o fechamento não está apertando bem). As frestas de ar podem aumentar o gasto com aquecimento ou ar-condicionado entre 20% e 30%."
      }
    },
    {
      title: { es: "Sella puertas y ventanas con burletes", en: "Seal doors and windows with weatherstripping", fr: "Calfeutrez portes et fenêtres avec des joints", it: "Sigilla porte e finestre con guarnizioni", pt: "Vede portas e janelas com burletes" },
      body: {
        es: "Los burletes de espuma o silicona (5-10 € el rollo) y los bajopuertas de cepillo cortan las corrientes de aire y se amortizan en pocas semanas.",
        en: "Foam or silicone weatherstripping (€5-10 a roll) and brush door sweeps cut drafts and pay for themselves in a few weeks.",
        fr: "Les joints en mousse ou silicone (5-10 € le rouleau) et les bas de porte à brosse coupent les courants d'air et s'amortissent en quelques semaines.",
        it: "Le guarnizioni in schiuma o silicone (5-10 € il rotolo) e i paraspifferi a spazzola tagliano le correnti d'aria e si ripagano in poche settimane.",
        pt: "Os burletes de espuma ou silicone (5-10 € o rolo) e as escovas para a base da porta cortam as correntes de ar e se pagam em poucas semanas."
      }
    },
    {
      title: { es: "Aísla la caja de la persiana", en: "Insulate the shutter box", fr: "Isolez le coffre du volet roulant", it: "Isola il cassonetto della tapparella", pt: "Isole a caixa da persiana" },
      body: {
        es: "Suele ser el gran punto de fuga de la fachada: rellenarla con paneles aislantes (poliestireno, lana de roca) evita la entrada de aire exterior.",
        en: "It's usually the facade's big weak point: filling it with insulating panels (polystyrene, rock wool) keeps outside air from getting in.",
        fr: "C'est généralement le grand point de fuite de la façade : le remplir de panneaux isolants (polystyrène, laine de roche) empêche l'entrée d'air extérieur.",
        it: "È di solito il grande punto di dispersione della facciata: riempirlo con pannelli isolanti (polistirolo, lana di roccia) evita l'ingresso di aria esterna.",
        pt: "Costuma ser o grande ponto de fuga da fachada: preenchê-la com painéis isolantes (poliestireno, lã de rocha) evita a entrada de ar externo."
      }
    },
    {
      title: { es: "Ventila poco tiempo pero a fondo", en: "Ventilate briefly but thoroughly", fr: "Aérez peu de temps mais à fond", it: "Ventila poco tempo ma a fondo", pt: "Ventile pouco tempo, mas a fundo" },
      body: {
        es: "Airea la casa 10-15 minutos con las ventanas abiertas de par en par a primera hora, en vez de dejarlas entreabiertas todo el día: renuevas el aire sin enfriar paredes ni muebles.",
        en: "Air out the house for 10-15 minutes with windows wide open first thing, instead of leaving them ajar all day: you refresh the air without cooling down the walls or furniture.",
        fr: "Aérez la maison 10 à 15 minutes en ouvrant grand les fenêtres tôt le matin, au lieu de les laisser entrouvertes toute la journée : vous renouvelez l'air sans refroidir les murs ni les meubles.",
        it: "Arieggia la casa per 10-15 minuti con le finestre spalancate a prima ora, invece di lasciarle socchiuse tutto il giorno: rinnovi l'aria senza raffreddare pareti o mobili.",
        pt: "Areje a casa por 10-15 minutos com as janelas bem abertas logo pela manhã, em vez de deixá-las entreabertas o dia todo: você renova o ar sem esfriar paredes nem móveis."
      }
    },
    {
      title: { es: "Usa persianas y cortinas como aislante extra", en: "Use blinds and curtains as extra insulation", fr: "Utilisez volets et rideaux comme isolant supplémentaire", it: "Usa tapparelle e tende come isolante extra", pt: "Use persianas e cortinas como isolante extra" },
      body: {
        es: "Sube las persianas en las horas de sol para aprovechar el calor natural y bájalas al anochecer para crear una capa aislante frente al exterior; si tu ventana oscilobatiente tiene modo invierno (un perno en el canto de la hoja), gíralo para que el cierre apriete más en los meses fríos.",
        en: "Raise the blinds during sunny hours to take advantage of natural heat and lower them at dusk to create an insulating layer against the outside; if your tilt-and-turn window has a winter mode (a pin on the edge of the sash), turn it so the seal tightens more in the cold months.",
        fr: "Levez les volets aux heures ensoleillées pour profiter de la chaleur naturelle et baissez-les à la tombée de la nuit pour créer une couche isolante face à l'extérieur ; si votre fenêtre oscillo-battante a un mode hiver (un ergot sur le bord du vantail), tournez-le pour que le joint serre davantage pendant les mois froids.",
        it: "Alza le tapparelle nelle ore di sole per sfruttare il calore naturale e abbassale al tramonto per creare uno strato isolante verso l'esterno; se la tua finestra a battente/ribalta ha la modalità inverno (un perno sul bordo dell'anta), giralo perché la chiusura stringa di più nei mesi freddi.",
        pt: "Suba as persianas nas horas de sol para aproveitar o calor natural e abaixe-as ao anoitecer para criar uma camada isolante contra o exterior; se sua janela oscilobatente tem modo inverno (um pino na borda da folha), gire-o para que o fechamento aperte mais nos meses frios."
      }
    },
    {
      title: { es: "Evita el pago contra reembolso en compras dudosas", en: "Avoid cash-on-delivery for dubious purchases", fr: "Évitez le paiement à la livraison pour les achats douteux", it: "Evita il pagamento alla consegna per acquisti dubbi", pt: "Evite o pagamento na entrega em compras duvidosas" },
      body: {
        es: "El repartidor no verifica el contenido del paquete ni te deja abrirlo antes de cobrar, y una vez entregado el dinero no hay forma de recuperarlo. Paga con tarjeta o PayPal siempre que puedas: tienes derecho a reclamar si el producto no llega o no coincide con lo comprado.",
        en: "The courier doesn't check the package's contents or let you open it before charging you, and once you've handed over the money there's no way to get it back. Pay by card or PayPal whenever you can: you're entitled to a claim if the product doesn't arrive or doesn't match what you bought.",
        fr: "Le livreur ne vérifie pas le contenu du colis et ne vous laisse pas l'ouvrir avant de vous faire payer, et une fois l'argent remis, il n'y a aucun moyen de le récupérer. Payez par carte ou PayPal chaque fois que possible : vous avez le droit de réclamer si le produit n'arrive pas ou ne correspond pas à ce que vous avez acheté.",
        it: "Il corriere non verifica il contenuto del pacco né ti lascia aprirlo prima di farti pagare, e una volta consegnato il denaro non c'è modo di recuperarlo. Paga con carta o PayPal quando puoi: hai diritto a reclamare se il prodotto non arriva o non corrisponde a quanto acquistato.",
        pt: "O entregador não verifica o conteúdo do pacote nem deixa você abri-lo antes de cobrar, e depois de entregue o dinheiro não há como recuperá-lo. Pague com cartão ou PayPal sempre que puder: você tem direito a reclamar se o produto não chegar ou não corresponder ao comprado."
      }
    },
    {
      title: { es: "Usa tarjeta virtual o PayPal en tiendas que no conoces", en: "Use a virtual card or PayPal in stores you don't know", fr: "Utilisez une carte virtuelle ou PayPal dans les boutiques inconnues", it: "Usa carta virtuale o PayPal nei negozi che non conosci", pt: "Use cartão virtual ou PayPal em lojas desconhecidas" },
      body: {
        es: "Una tarjeta virtual con el importe justo (o que se autodestruye tras el uso) limita el daño si la web resulta fraudulenta; con PayPal, además, puedes abrir una disputa y recuperar el dinero si el vendedor no responde.",
        en: "A virtual card with just the right amount (or one that self-destructs after use) limits the damage if the site turns out to be fraudulent; with PayPal, you can also open a dispute and get your money back if the seller doesn't respond.",
        fr: "Une carte virtuelle avec le montant juste (ou qui s'autodétruit après usage) limite les dégâts si le site s'avère frauduleux ; avec PayPal, vous pouvez en plus ouvrir un litige et récupérer votre argent si le vendeur ne répond pas.",
        it: "Una carta virtuale con l'importo giusto (o che si autodistrugge dopo l'uso) limita il danno se il sito risulta fraudolento; con PayPal, inoltre, puoi aprire una controversia e recuperare i soldi se il venditore non risponde.",
        pt: "Um cartão virtual com o valor exato (ou que se autodestrói após o uso) limita o dano se o site for fraudulento; com o PayPal, além disso, você pode abrir uma disputa e recuperar o dinheiro se o vendedor não responder."
      }
    },
    {
      title: { es: "Antes de comprar en una tienda desconocida, revisa 4 cosas", en: "Before buying from an unknown store, check 4 things", fr: "Avant d'acheter dans une boutique inconnue, vérifiez 4 choses", it: "Prima di comprare in un negozio sconosciuto, controlla 4 cose", pt: "Antes de comprar em uma loja desconhecida, verifique 4 coisas" },
      body: {
        es: "Que tenga aviso legal con razón social y dirección física, que la URL empiece por https:// (desconfía de dominios raros que imitan marcas conocidas), que haya un contacto claro y verificable, y que el precio no sea sospechosamente bajo frente al resto del mercado.",
        en: "That it has a legal notice with company name and physical address, that the URL starts with https:// (be wary of odd domains that imitate known brands), that there's a clear, verifiable contact, and that the price isn't suspiciously low compared to the rest of the market.",
        fr: "Qu'elle ait des mentions légales avec raison sociale et adresse physique, que l'URL commence par https:// (méfiez-vous des domaines étranges qui imitent des marques connues), qu'il y ait un contact clair et vérifiable, et que le prix ne soit pas suspicieusement bas par rapport au reste du marché.",
        it: "Che abbia note legali con ragione sociale e indirizzo fisico, che l'URL inizi con https:// (diffida di domini strani che imitano marchi noti), che ci sia un contatto chiaro e verificabile, e che il prezzo non sia sospettosamente basso rispetto al resto del mercato.",
        pt: "Que tenha aviso legal com razão social e endereço físico, que a URL comece com https:// (desconfie de domínios estranhos que imitam marcas conhecidas), que haja um contato claro e verificável, e que o preço não esteja suspeitosamente baixo em relação ao resto do mercado."
      }
    },
    {
      title: { es: "Comprueba el histórico de precios antes de fiarte de una oferta", en: "Check the price history before trusting a deal", fr: "Vérifiez l'historique des prix avant de faire confiance à une offre", it: "Controlla lo storico dei prezzi prima di fidarti di un'offerta", pt: "Verifique o histórico de preços antes de confiar em uma oferta" },
      body: {
        es: "Algunas tiendas suben el precio semanas antes para luego \"rebajarlo\" de vuelta al de siempre. Un vistazo al histórico del producto evita caer en descuentos que no son reales.",
        en: "Some stores raise the price weeks in advance so they can then \"mark it down\" back to the usual price. A quick look at the product's price history avoids falling for discounts that aren't real.",
        fr: "Certaines boutiques augmentent le prix des semaines à l'avance pour ensuite le « baisser » et revenir au prix habituel. Un coup d'œil à l'historique du produit évite de tomber dans des remises qui n'en sont pas.",
        it: "Alcuni negozi alzano il prezzo settimane prima per poi \"scontarlo\" tornando a quello di sempre. Un'occhiata allo storico del prodotto evita di cadere in sconti che non sono reali.",
        pt: "Algumas lojas sobem o preço semanas antes para depois \"baixá-lo\" de volta ao de sempre. Uma olhada no histórico do produto evita cair em descontos que não são reais."
      }
    },
    {
      title: { es: "Aprovecha cupones y el truco del carrito abandonado", en: "Use coupons and the abandoned-cart trick", fr: "Profitez des coupons et de l'astuce du panier abandonné", it: "Sfrutta i coupon e il trucco del carrello abbandonato", pt: "Aproveite cupons e o truque do carrinho abandonado" },
      body: {
        es: "Busca códigos de descuento antes de pagar y suscríbete a la newsletter para el descuento de bienvenida (puedes darte de baja después). Dejar el carrito lleno sin terminar la compra también suele generar un cupón extra a las 24-48 horas.",
        en: "Look for discount codes before paying and sign up for the newsletter for the welcome discount (you can unsubscribe afterward). Leaving a full cart without finishing the purchase also often generates an extra coupon within 24-48 hours.",
        fr: "Cherchez des codes de réduction avant de payer et abonnez-vous à la newsletter pour la remise de bienvenue (vous pourrez vous désabonner ensuite). Laisser un panier plein sans finaliser l'achat génère souvent aussi un coupon supplémentaire sous 24-48 heures.",
        it: "Cerca codici sconto prima di pagare e iscriviti alla newsletter per lo sconto di benvenuto (puoi disiscriverti dopo). Lasciare il carrello pieno senza completare l'acquisto spesso genera anche un coupon extra entro 24-48 ore.",
        pt: "Procure códigos de desconto antes de pagar e inscreva-se na newsletter para o desconto de boas-vindas (você pode se descadastrar depois). Deixar o carrinho cheio sem finalizar a compra também costuma gerar um cupom extra em 24-48 horas."
      }
    },
    {
      title: { es: "Navega en incógnito al buscar vuelos o viajes", en: "Browse in incognito mode when searching for flights or trips", fr: "Naviguez en navigation privée pour chercher des vols ou voyages", it: "Naviga in incognito quando cerchi voli o viaggi", pt: "Navegue em modo anônimo ao buscar voos ou viagens" },
      body: {
        es: "Algunas webs de viajes suben el precio si detectan búsquedas repetidas del mismo trayecto a través de las cookies. El modo incógnito evita ese seguimiento.",
        en: "Some travel websites raise the price if they detect repeated searches of the same route through cookies. Incognito mode avoids that tracking.",
        fr: "Certains sites de voyage augmentent le prix s'ils détectent des recherches répétées du même trajet via les cookies. Le mode navigation privée évite ce suivi.",
        it: "Alcuni siti di viaggi alzano il prezzo se rilevano ricerche ripetute dello stesso tragitto tramite i cookie. La modalità incognito evita questo tracciamento.",
        pt: "Alguns sites de viagem sobem o preço se detectam buscas repetidas do mesmo trajeto por meio de cookies. O modo anônimo evita esse rastreamento."
      }
    },
    {
      title: { es: "Cómo reclamar un cargo fraudulento o un pedido que no llegó", en: "How to dispute a fraudulent charge or an order that never arrived", fr: "Comment contester un débit frauduleux ou une commande jamais reçue", it: "Come contestare un addebito fraudolento o un ordine mai arrivato", pt: "Como contestar uma cobrança fraudulenta ou um pedido que não chegou" },
      body: {
        es: "Guarda el extracto con el cargo, la confirmación de compra, las pruebas del problema (seguimiento del envío, fotos, capturas de la oferta original) y tus intentos de contacto con la tienda sin respuesta. Con eso, pide a tu banco abrir una disputa (chargeback) por fraude o incumplimiento del comercio; si usaste los datos de la tarjeta en una web sospechosa, bloquéala y pide una nueva de inmediato.",
        en: "Keep the statement with the charge, the purchase confirmation, evidence of the problem (shipment tracking, photos, screenshots of the original offer) and your unanswered attempts to contact the store. With that, ask your bank to open a dispute (chargeback) for fraud or the merchant's non-delivery; if you used your card details on a suspicious site, block it and request a new one right away.",
        fr: "Conservez le relevé avec le débit, la confirmation d'achat, les preuves du problème (suivi de l'envoi, photos, captures de l'offre initiale) et vos tentatives de contact restées sans réponse. Avec cela, demandez à votre banque d'ouvrir un litige (chargeback) pour fraude ou manquement du commerçant ; si vous avez utilisé les données de la carte sur un site suspect, bloquez-la et demandez-en une nouvelle immédiatement.",
        it: "Conserva l'estratto conto con l'addebito, la conferma d'acquisto, le prove del problema (tracciamento della spedizione, foto, screenshot dell'offerta originale) e i tuoi tentativi di contatto col negozio senza risposta. Con questo, chiedi alla tua banca di aprire una contestazione (chargeback) per frode o inadempienza del commerciante; se hai usato i dati della carta su un sito sospetto, bloccala e richiedine subito una nuova.",
        pt: "Guarde o extrato com a cobrança, a confirmação da compra, as provas do problema (rastreamento do envio, fotos, capturas da oferta original) e suas tentativas de contato com a loja sem resposta. Com isso, peça ao seu banco para abrir uma contestação (chargeback) por fraude ou descumprimento do comércio; se você usou os dados do cartão em um site suspeito, bloqueie-o e peça um novo imediatamente."
      }
    },
    {
      title: { es: "Vuela martes, miércoles o sábado para pagar menos", en: "Fly on Tuesday, Wednesday or Saturday to pay less", fr: "Volez le mardi, mercredi ou samedi pour payer moins cher", it: "Vola di martedì, mercoledì o sabato per pagare meno", pt: "Voe na terça, quarta ou sábado para pagar menos" },
      body: {
        es: "Usa la vista de \"mes completo\" en un comparador de vuelos para ver qué días tienen las tarifas más bajas: suelen ser de martes a jueves y los sábados, un 15-25% más baratos que viernes o domingo.",
        en: "Use the \"whole month\" view on a flight comparison site to see which days have the lowest fares: they're usually Tuesday to Thursday and Saturdays, 15-25% cheaper than Friday or Sunday.",
        fr: "Utilisez la vue « mois complet » d'un comparateur de vols pour voir quels jours ont les tarifs les plus bas : ce sont généralement du mardi au jeudi et le samedi, 15-25 % moins chers que le vendredi ou le dimanche.",
        it: "Usa la vista \"mese intero\" in un comparatore di voli per vedere quali giorni hanno le tariffe più basse: di solito sono da martedì a giovedì e il sabato, il 15-25% più economici di venerdì o domenica.",
        pt: "Use a visualização de \"mês completo\" em um comparador de voos para ver quais dias têm as tarifas mais baixas: costumam ser de terça a quinta e aos sábados, 15-25% mais baratos que sexta ou domingo."
      }
    },
    {
      title: { es: "Prueba con aeropuertos secundarios", en: "Try secondary airports", fr: "Essayez les aéroports secondaires", it: "Prova con aeroporti secondari", pt: "Experimente aeroportos secundários" },
      body: {
        es: "Volar a un aeropuerto cercano al destino final en vez del principal puede salir bastante más barato. Para trayectos largos, comprueba también si dos billetes de ida sueltos cuestan menos que un ida y vuelta.",
        en: "Flying to an airport near your final destination instead of the main one can be quite a bit cheaper. For long trips, also check whether two separate one-way tickets cost less than a round trip.",
        fr: "Voler vers un aéroport proche de la destination finale au lieu du principal peut être bien moins cher. Pour les longs trajets, vérifiez aussi si deux billets aller simples séparés coûtent moins qu'un aller-retour.",
        it: "Volare verso un aeroporto vicino alla destinazione finale invece di quello principale può risultare molto più economico. Per tragitti lunghi, controlla anche se due biglietti di sola andata separati costano meno di un andata e ritorno.",
        pt: "Voar para um aeroporto próximo ao destino final em vez do principal pode sair bem mais barato. Para trajetos longos, verifique também se duas passagens só de ida separadas custam menos que uma ida e volta."
      }
    },
    {
      title: { es: "Configura alertas de precio antes de reservar", en: "Set up price alerts before booking", fr: "Configurez des alertes de prix avant de réserver", it: "Imposta avvisi di prezzo prima di prenotare", pt: "Configure alertas de preço antes de reservar" },
      body: {
        es: "La mayoría de comparadores de vuelos avisan cuando una tarifa baja de su media histórica o va a subir pronto. Esperar el aviso en vez de reservar a ciegas suele ahorrar bastante.",
        en: "Most flight comparison sites notify you when a fare drops below its historical average or is about to rise soon. Waiting for the alert instead of booking blindly usually saves quite a bit.",
        fr: "La plupart des comparateurs de vols vous avertissent quand un tarif descend en dessous de sa moyenne historique ou va bientôt augmenter. Attendre l'alerte au lieu de réserver à l'aveugle permet généralement d'économiser pas mal.",
        it: "La maggior parte dei comparatori di voli avvisa quando una tariffa scende sotto la sua media storica o sta per salire presto. Aspettare l'avviso invece di prenotare alla cieca di solito fa risparmiare parecchio.",
        pt: "A maioria dos comparadores de voos avisa quando uma tarifa cai abaixo da média histórica ou vai subir em breve. Esperar o aviso em vez de reservar às cegas costuma economizar bastante."
      }
    },
    {
      title: { es: "Cuidado con los extras del billete de avión", en: "Watch out for airline ticket extras", fr: "Attention aux extras du billet d'avion", it: "Attenzione agli extra del biglietto aereo", pt: "Cuidado com os extras da passagem aérea" },
      body: {
        es: "Facturar maleta o elegir asiento con antelación puede subir el precio final un 30-40%. Si viajas solo con equipaje de mano, revisa las medidas exactas de la aerolínea para no pagar penalización en la puerta de embarque.",
        en: "Checking a bag or picking a seat in advance can raise the final price by 30-40%. If you travel only with carry-on, check the airline's exact size limits so you don't pay a penalty at the gate.",
        fr: "Enregistrer une valise ou choisir un siège à l'avance peut augmenter le prix final de 30-40 %. Si vous voyagez uniquement avec un bagage cabine, vérifiez les dimensions exactes de la compagnie pour ne pas payer de pénalité à la porte d'embarquement.",
        it: "Imbarcare una valigia o scegliere il posto in anticipo può aumentare il prezzo finale del 30-40%. Se viaggi solo con bagaglio a mano, controlla le misure esatte della compagnia aerea per non pagare penali al gate.",
        pt: "Despachar mala ou escolher assento com antecedência pode aumentar o preço final em 30-40%. Se você viaja só com bagagem de mão, confira as medidas exatas da companhia aérea para não pagar multa no portão de embarque."
      }
    },
    {
      title: { es: "Llama al hotel después de comparar precios online", en: "Call the hotel after comparing prices online", fr: "Appelez l'hôtel après avoir comparé les prix en ligne", it: "Chiama l'hotel dopo aver confrontato i prezzi online", pt: "Ligue para o hotel depois de comparar preços online" },
      body: {
        es: "Usa los buscadores solo para localizar opciones; luego contacta directamente con el hotel. Muchos mejoran el precio, añaden desayuno gratis o hacen upgrade de habitación al ahorrarse la comisión de la agencia online.",
        en: "Use search engines only to spot options; then contact the hotel directly. Many will improve the price, add free breakfast or upgrade the room since they save on the online agency's commission.",
        fr: "Utilisez les comparateurs uniquement pour repérer des options ; puis contactez directement l'hôtel. Beaucoup améliorent le prix, ajoutent un petit-déjeuner gratuit ou surclassent la chambre en économisant la commission de l'agence en ligne.",
        it: "Usa i motori di ricerca solo per individuare opzioni; poi contatta direttamente l'hotel. Molti migliorano il prezzo, aggiungono colazione gratuita o fanno l'upgrade della camera risparmiando la commissione dell'agenzia online.",
        pt: "Use os buscadores só para localizar opções; depois entre em contato direto com o hotel. Muitos melhoram o preço, incluem café da manhã grátis ou fazem upgrade de quarto por economizarem a comissão da agência online."
      }
    },
    {
      title: { es: "Reserva con cancelación gratuita y vigila el precio", en: "Book with free cancellation and watch the price", fr: "Réservez avec annulation gratuite et surveillez le prix", it: "Prenota con cancellazione gratuita e monitora il prezzo", pt: "Reserve com cancelamento grátis e fique de olho no preço" },
      body: {
        es: "Si la tarifa de tu habitación baja más adelante, cancelas la reserva inicial sin coste y vuelves a reservar al precio reducido.",
        en: "If your room's rate drops later on, cancel the original booking at no cost and rebook at the lower price.",
        fr: "Si le tarif de votre chambre baisse plus tard, annulez la réservation initiale sans frais et réservez à nouveau au prix réduit.",
        it: "Se la tariffa della tua camera scende in seguito, cancella la prenotazione iniziale senza costi e riprenota al prezzo ridotto.",
        pt: "Se a tarifa do seu quarto cair mais tarde, cancele a reserva inicial sem custo e reserve de novo pelo preço reduzido."
      }
    },
    {
      title: { es: "Evita comisiones bancarias y roaming al viajar", en: "Avoid bank fees and roaming when traveling", fr: "Évitez les frais bancaires et le roaming en voyage", it: "Evita commissioni bancarie e roaming in viaggio", pt: "Evite tarifas bancárias e roaming ao viajar" },
      body: {
        es: "Avisa a tu banco antes de salir y usa una tarjeta sin comisión por cambio de divisa o retiro en cajeros extranjeros; revisa si el destino cobra tasa turística por noche en el alojamiento; y compra una eSIM prepago antes de salir para evitar el roaming internacional.",
        en: "Notify your bank before leaving and use a card with no fee for currency exchange or foreign ATM withdrawals; check whether your destination charges a tourist tax per night at the accommodation; and buy a prepaid eSIM before leaving to avoid international roaming.",
        fr: "Prévenez votre banque avant de partir et utilisez une carte sans frais de change ou de retrait aux distributeurs étrangers ; vérifiez si la destination facture une taxe de séjour par nuit à l'hébergement ; et achetez une eSIM prépayée avant de partir pour éviter le roaming international.",
        it: "Avvisa la tua banca prima di partire e usa una carta senza commissioni per il cambio valuta o il prelievo a bancomat esteri; controlla se la destinazione applica una tassa di soggiorno per notte; e compra una eSIM prepagata prima di partire per evitare il roaming internazionale.",
        pt: "Avise seu banco antes de sair e use um cartão sem tarifa de câmbio ou saque em caixas eletrônicos estrangeiros; verifique se o destino cobra taxa turística por noite na hospedagem; e compre um eSIM pré-pago antes de sair para evitar o roaming internacional."
      }
    },
    {
      title: { es: "Reclama en el hotel en el momento, no al hacer check-out", en: "Complain at the hotel right away, not at check-out", fr: "Réclamez à l'hôtel sur le moment, pas au moment du check-out", it: "Reclama in hotel sul momento, non al check-out", pt: "Reclame no hotel na hora, não no check-out" },
      body: {
        es: "Si la habitación tiene un problema grave (plagas, sin agua caliente, ruido insoportable, categoría distinta a la pagada), baja a recepción de inmediato, documenta con fotos o vídeo, y pregunta directamente cómo lo van a solucionar ahora mismo.",
        en: "If the room has a serious problem (pests, no hot water, unbearable noise, a different category than what you paid for), go down to reception right away, document it with photos or video, and ask directly how they're going to fix it right now.",
        fr: "Si la chambre a un problème grave (nuisibles, pas d'eau chaude, bruit insupportable, catégorie différente de celle payée), descendez immédiatement à la réception, documentez avec photos ou vidéo, et demandez directement comment ils vont le résoudre tout de suite.",
        it: "Se la camera ha un problema grave (parassiti, niente acqua calda, rumore insopportabile, categoria diversa da quella pagata), scendi subito in reception, documenta con foto o video, e chiedi direttamente come lo risolveranno ora.",
        pt: "Se o quarto tiver um problema grave (pragas, sem água quente, barulho insuportável, categoria diferente da paga), desça à recepção imediatamente, documente com fotos ou vídeo, e pergunte diretamente como vão resolver isso agora mesmo."
      }
    },
    {
      title: { es: "Pide hablar con el responsable de turno para compensaciones reales", en: "Ask to speak with the shift manager for real compensation", fr: "Demandez à parler au responsable de service pour de vraies compensations", it: "Chiedi di parlare col responsabile di turno per compensazioni vere", pt: "Peça para falar com o responsável de turno para compensações reais" },
      body: {
        es: "Los recepcionistas solo pueden ofrecer cosas pequeñas (desayuno, late check-out); para un upgrade, un descuento de verdad o una noche gratis, hace falta hablar con el supervisor o director de turno.",
        en: "Receptionists can only offer small things (breakfast, late check-out); for an upgrade, a real discount or a free night, you need to speak with the supervisor or shift manager.",
        fr: "Les réceptionnistes ne peuvent offrir que de petites choses (petit-déjeuner, départ tardif) ; pour un surclassement, une vraie remise ou une nuit gratuite, il faut parler au superviseur ou au directeur de service.",
        it: "I receptionist possono offrire solo piccole cose (colazione, late check-out); per un upgrade, uno sconto vero o una notte gratis, serve parlare col supervisore o direttore di turno.",
        pt: "Os recepcionistas só podem oferecer coisas pequenas (café da manhã, late check-out); para um upgrade, um desconto de verdade ou uma noite grátis, é preciso falar com o supervisor ou gerente de turno."
      }
    },
    {
      title: { es: "Conoce qué compensación pedir según la gravedad", en: "Know what compensation to ask for based on severity", fr: "Sachez quelle compensation demander selon la gravité", it: "Sappi che compensazione chiedere in base alla gravità", pt: "Saiba que compensação pedir de acordo com a gravidade" },
      body: {
        es: "Molestia leve → desayuno o late check-out; problema medio (aire acondicionado roto, ruido, limpieza) → cambio de habitación, upgrade o 15-30% de descuento; problema grave (plagas, overbooking, riesgo de seguridad) → noche gratis, traslado a otro hotel o devolución íntegra.",
        en: "Minor inconvenience → breakfast or late check-out; medium problem (broken AC, noise, cleanliness) → room change, upgrade or 15-30% discount; serious problem (pests, overbooking, safety risk) → free night, transfer to another hotel or full refund.",
        fr: "Gêne légère → petit-déjeuner ou départ tardif ; problème moyen (climatisation en panne, bruit, propreté) → changement de chambre, surclassement ou remise de 15-30 % ; problème grave (nuisibles, surbooking, risque de sécurité) → nuit gratuite, transfert vers un autre hôtel ou remboursement intégral.",
        it: "Disagio lieve → colazione o late check-out; problema medio (aria condizionata rotta, rumore, pulizia) → cambio di camera, upgrade o sconto 15-30%; problema grave (parassiti, overbooking, rischio sicurezza) → notte gratis, trasferimento in un altro hotel o rimborso integrale.",
        pt: "Incômodo leve → café da manhã ou late check-out; problema médio (ar-condicionado quebrado, barulho, limpeza) → troca de quarto, upgrade ou 15-30% de desconto; problema grave (pragas, overbooking, risco de segurança) → noite grátis, transferência para outro hotel ou reembolso integral."
      }
    },
    {
      title: { es: "Si el hotel es de una cadena, reclama también al servicio corporativo", en: "If the hotel is part of a chain, also complain to corporate", fr: "Si l'hôtel appartient à une chaîne, réclamez aussi au service central", it: "Se l'hotel è di una catena, reclama anche al servizio corporate", pt: "Se o hotel for de uma rede, reclame também ao atendimento corporativo" },
      body: {
        es: "Si estás en su programa de fidelidad, una queja formal después de la estancia al departamento central suele traducirse en puntos equivalentes a varias noches gratis.",
        en: "If you're in their loyalty program, a formal complaint to head office after your stay usually results in points equivalent to several free nights.",
        fr: "Si vous êtes dans leur programme de fidélité, une plainte formelle au siège après le séjour se traduit souvent par des points équivalant à plusieurs nuits gratuites.",
        it: "Se sei nel loro programma fedeltà, un reclamo formale alla sede centrale dopo il soggiorno di solito si traduce in punti equivalenti a diverse notti gratis.",
        pt: "Se você está no programa de fidelidade deles, uma reclamação formal ao departamento central após a estadia costuma se traduzir em pontos equivalentes a várias noites grátis."
      }
    },
    {
      title: { es: "Reclama en el restaurante en el momento, no al terminar", en: "Complain at the restaurant right away, not after finishing", fr: "Réclamez au restaurant sur le moment, pas après avoir terminé", it: "Reclama al ristorante sul momento, non a fine pasto", pt: "Reclame no restaurante na hora, não ao terminar" },
      body: {
        es: "Si el plato está en mal estado o no es lo que pediste, avisa tras el primer bocado, no sigas comiendo: si te terminas el plato pierdes la posibilidad de exigir que lo cambien o lo quiten de la cuenta.",
        en: "If the dish is off or not what you ordered, speak up after the first bite, don't keep eating: if you finish the dish you lose the chance to demand it be replaced or removed from the bill.",
        fr: "Si le plat n'est pas frais ou n'est pas ce que vous avez commandé, signalez-le après la première bouchée, ne continuez pas à manger : si vous finissez le plat, vous perdez la possibilité d'exiger qu'il soit changé ou retiré de l'addition.",
        it: "Se il piatto è avariato o non è quello che hai ordinato, segnala dopo il primo boccone, non continuare a mangiare: se finisci il piatto perdi la possibilità di esigere che lo cambino o lo tolgano dal conto.",
        pt: "Se o prato estiver estragado ou não for o que você pediu, avise depois da primeira mordida, não continue comendo: se você terminar o prato perde a possibilidade de exigir que troquem ou tirem da conta."
      }
    },
    {
      title: { es: "Pide al encargado la solución que corresponde", en: "Ask the manager for the appropriate solution", fr: "Demandez au responsable la solution appropriée", it: "Chiedi al responsabile la soluzione appropriata", pt: "Peça ao encarregado a solução adequada" },
      body: {
        es: "Plato en mal estado o equivocado → que lo retiren y lo cambien sin coste, o lo quiten de la cuenta. Retraso grave o mala experiencia → que quiten el postre o el café, un descuento en la factura, o una invitación.",
        en: "Spoiled or wrong dish → have it taken away and replaced at no cost, or removed from the bill. Serious delay or bad experience → have dessert or coffee removed, a discount on the bill, or a treat on the house.",
        fr: "Plat avarié ou erroné → qu'il soit retiré et remplacé sans frais, ou enlevé de l'addition. Retard grave ou mauvaise expérience → suppression du dessert ou du café, remise sur la facture, ou une offerte de la maison.",
        it: "Piatto avariato o sbagliato → che lo ritirino e lo cambino senza costo, o lo tolgano dal conto. Ritardo grave o brutta esperienza → che tolgano il dessert o il caffè, uno sconto sul conto, o un'offerta della casa.",
        pt: "Prato estragado ou errado → que retirem e troquem sem custo, ou tirem da conta. Atraso grave ou má experiência → que tirem a sobremesa ou o café, um desconto na conta, ou uma cortesia."
      }
    },
    {
      title: { es: "Vigila los cargos que no aparecían en la carta", en: "Watch for charges that weren't on the menu", fr: "Surveillez les frais qui ne figuraient pas sur la carte", it: "Attento agli addebiti che non erano sul menu", pt: "Fique atento a cobranças que não estavam no cardápio" },
      body: {
        es: "Revisa que no te cobren suplementos que no figuraban en el menú (cubierto, pan, servicio de mesa) ni precios distintos a los anunciados en la carta o el escaparate.",
        en: "Check that you're not charged for extras that weren't listed on the menu (cover charge, bread, table service) or prices different from those advertised on the menu or window display.",
        fr: "Vérifiez qu'on ne vous facture pas de suppléments qui ne figuraient pas sur la carte (couvert, pain, service à table) ni des prix différents de ceux annoncés sur la carte ou en vitrine.",
        it: "Controlla che non ti addebitino extra non presenti nel menu (coperto, pane, servizio al tavolo) né prezzi diversi da quelli indicati nel menu o in vetrina.",
        pt: "Verifique se não cobram extras que não estavam no cardápio (couvert, pão, serviço de mesa) nem preços diferentes dos anunciados no cardápio ou na vitrine."
      }
    },
    {
      title: { es: "La montaña suele salir más barata que la playa", en: "The mountains are usually cheaper than the beach", fr: "La montagne revient souvent moins cher que la plage", it: "La montagna spesso costa meno del mare", pt: "A montanha costuma sair mais barata que a praia" },
      body: {
        es: "Fuera de temporada de esquí, el alojamiento de montaña baja mucho de precio y el senderismo es gratis; en la costa, además del alojamiento caro en temporada alta, se suman gastos \"invisibles\" como tumbonas, parking y precios inflados en los chiringuitos.",
        en: "Outside ski season, mountain accommodation drops a lot in price and hiking is free; on the coast, besides expensive high-season accommodation, there are \"invisible\" costs like sunbeds, parking and inflated prices at beach bars.",
        fr: "Hors saison de ski, l'hébergement en montagne baisse beaucoup de prix et la randonnée est gratuite ; sur la côte, en plus de l'hébergement cher en haute saison, s'ajoutent des dépenses « invisibles » comme les transats, le parking et les prix gonflés des paillotes.",
        it: "Fuori stagione sciistica, l'alloggio in montagna scende molto di prezzo e il trekking è gratis; in costa, oltre all'alloggio caro in alta stagione, si aggiungono spese \"invisibili\" come lettini, parcheggio e prezzi gonfiati nei chioschi.",
        pt: "Fora da temporada de esqui, a hospedagem na montanha cai muito de preço e as trilhas são de graça; na costa, além da hospedagem cara na alta temporada, somam-se gastos \"invisíveis\" como espreguiçadeiras, estacionamento e preços inflados nos quiosques."
      }
    },
    {
      title: { es: "Compara camping o apartamento con cocina frente al hotel", en: "Compare camping or a self-catering apartment with a hotel", fr: "Comparez camping ou appartement avec cuisine face à l'hôtel", it: "Confronta campeggio o appartamento con cucina rispetto all'hotel", pt: "Compare camping ou apartamento com cozinha versus hotel" },
      body: {
        es: "Un camping o un apartamento con cocina reduce muchísimo el gasto en comida frente a comer fuera cada día o un régimen cerrado de hotel; a cambio, si vas de parcela puede que necesites invertir en tienda, sacos o cocina portátil si no los tienes ya.",
        en: "A campsite or an apartment with a kitchen cuts food spending a lot compared to eating out every day or a hotel's fixed board plan; in exchange, if you go with a camping pitch you might need to invest in a tent, sleeping bags or a portable stove if you don't already have them.",
        fr: "Un camping ou un appartement avec cuisine réduit énormément les dépenses de nourriture par rapport à manger dehors chaque jour ou une pension fermée d'hôtel ; en contrepartie, si vous prenez un emplacement, vous devrez peut-être investir dans une tente, des sacs de couchage ou un réchaud portable si vous n'en avez pas déjà.",
        it: "Un campeggio o un appartamento con cucina riduce moltissimo la spesa in cibo rispetto a mangiare fuori ogni giorno o a un regime chiuso d'albergo; in cambio, se vai in piazzola potresti dover investire in tenda, sacchi a pelo o fornello portatile se non li hai già.",
        pt: "Um camping ou um apartamento com cozinha reduz muito o gasto com comida em comparação a comer fora todo dia ou um regime fechado de hotel; em troca, se você for de barraca, pode precisar investir em barraca, sacos de dormir ou fogareiro portátil, caso ainda não tenha."
      }
    },
    {
      title: { es: "Aplica el \"efecto radio de 15 km\"", en: "Apply the \"15 km radius effect\"", fr: "Appliquez « l'effet rayon de 15 km »", it: "Applica l'\"effetto raggio di 15 km\"", pt: "Aplique o \"efeito raio de 15 km\"" },
      body: {
        es: "Alojarte 10-15 minutos en coche del centro turístico principal (o de la playa) puede bajar el precio del alojamiento entre un 30% y un 50%.",
        en: "Staying 10-15 minutes by car from the main tourist center (or the beach) can lower the accommodation price by 30% to 50%.",
        fr: "Loger à 10-15 minutes en voiture du centre touristique principal (ou de la plage) peut faire baisser le prix de l'hébergement de 30 à 50 %.",
        it: "Alloggiare a 10-15 minuti d'auto dal centro turistico principale (o dalla spiaggia) può abbassare il prezzo dell'alloggio tra il 30% e il 50%.",
        pt: "Ficar hospedado a 10-15 minutos de carro do centro turístico principal (ou da praia) pode baixar o preço da hospedagem entre 30% e 50%."
      }
    },
    {
      title: { es: "Haz la compra básica antes de salir de viaje", en: "Do your basic shopping before leaving on a trip", fr: "Faites vos courses de base avant de partir en voyage", it: "Fai la spesa di base prima di partire per il viaggio", pt: "Faça a compra básica antes de sair de viagem" },
      body: {
        es: "Los supermercados de zonas muy turísticas suelen tener sobreprecio en temporada alta. Comprar lo básico (comida, droguería) en tu súper habitual antes de salir ahorra bastante.",
        en: "Supermarkets in very touristy areas tend to be overpriced during high season. Buying the basics (food, toiletries) at your usual supermarket before leaving saves quite a bit.",
        fr: "Les supermarchés des zones très touristiques sont souvent plus chers en haute saison. Acheter l'essentiel (nourriture, droguerie) dans votre supermarché habituel avant de partir permet d'économiser pas mal.",
        it: "I supermercati nelle zone molto turistiche di solito hanno prezzi gonfiati in alta stagione. Comprare il necessario (cibo, articoli per la casa) nel tuo solito supermercato prima di partire fa risparmiare parecchio.",
        pt: "Os supermercados em áreas muito turísticas costumam ter preços mais altos na alta temporada. Comprar o básico (comida, higiene) no seu mercado de sempre antes de sair economiza bastante."
      }
    },
    {
      title: { es: "Combina supermercado, mercado y mercadillo según lo que compres", en: "Combine supermarket, market and street market depending on what you buy", fr: "Combinez supermarché, marché et marché en plein air selon vos achats", it: "Combina supermercato, mercato e mercatino secondo cosa compri", pt: "Combine supermercado, mercado e feira conforme o que você compra" },
      body: {
        es: "Los básicos de despensa (arroz, legumbres, pasta, aceite, conservas, limpieza) suelen salir mejor en el súper con marca blanca; la fruta, verdura, carne y pescado frescos rinden más y se tiran menos comprados en el mercado de abastos o el mercadillo semanal, aunque cuesten un poco más.",
        en: "Pantry basics (rice, legumes, pasta, oil, canned goods, cleaning supplies) usually come out better at the supermarket with store-brand items; fresh fruit, vegetables, meat and fish go further and get thrown out less when bought at the food market or the weekly street market, even if they cost a little more.",
        fr: "Les basiques du garde-manger (riz, légumineuses, pâtes, huile, conserves, produits d'entretien) reviennent généralement mieux au supermarché avec les marques de distributeur ; les fruits, légumes, viande et poisson frais rendent plus et se gaspillent moins achetés au marché ou au marché hebdomadaire, même s'ils coûtent un peu plus cher.",
        it: "I basici della dispensa (riso, legumi, pasta, olio, conserve, pulizia) di solito convengono di più al supermercato con i prodotti a marchio proprio; frutta, verdura, carne e pesce freschi rendono di più e si buttano meno se comprati al mercato rionale o al mercatino settimanale, anche se costano un po' di più.",
        pt: "Os básicos da despensa (arroz, feijão, massa, óleo, conservas, limpeza) costumam sair melhor no supermercado com marca própria; frutas, verduras, carne e peixe frescos rendem mais e se desperdiçam menos comprados na feira ou no mercado semanal, mesmo que custem um pouco mais."
      }
    },
    {
      title: { es: "El mercadillo es el aliado de la fruta y verdura de temporada", en: "The street market is the ally for seasonal fruit and vegetables", fr: "Le marché est l'allié des fruits et légumes de saison", it: "Il mercatino è l'alleato di frutta e verdura di stagione", pt: "A feira é a aliada das frutas e verduras da estação" },
      body: {
        es: "Suele salir más barato que el súper porque compras justo la cantidad que necesitas al peso, aunque tenga horarios reducidos y algunos puestos solo acepten efectivo.",
        en: "It's usually cheaper than the supermarket because you buy exactly the amount you need by weight, even though it has limited hours and some stalls only take cash.",
        fr: "Cela revient généralement moins cher que le supermarché car vous achetez exactement la quantité dont vous avez besoin au poids, même s'il a des horaires réduits et que certains stands n'acceptent que les espèces.",
        it: "Di solito costa meno del supermercato perché compri esattamente la quantità che ti serve a peso, anche se ha orari ridotti e alcune bancarelle accettano solo contanti.",
        pt: "Costuma sair mais barato que o supermercado porque você compra exatamente a quantidade que precisa a peso, mesmo com horários reduzidos e algumas barracas só aceitando dinheiro."
      }
    },
    {
      title: { es: "Los productos \"bio\" no siempre justifican el sobreprecio", en: "\"Organic\" products don't always justify the extra cost", fr: "Les produits « bio » ne justifient pas toujours le surcoût", it: "I prodotti \"bio\" non sempre giustificano il sovrapprezzo", pt: "Os produtos \"bio\" nem sempre justificam o sobrepreço" },
      body: {
        es: "Pueden costar entre un 30% y un 80% más, y la etiqueta ecológica no equivale automáticamente a saludable (hay galletas o refrescos \"bio\" igual de ultraprocesados). Resérvalos para lo que de verdad te importe o necesites por alergias o intolerancias.",
        en: "They can cost 30% to 80% more, and the organic label doesn't automatically mean healthy (there are \"organic\" cookies or sodas just as ultra-processed). Save them for what really matters to you or what you need for allergies or intolerances.",
        fr: "Ils peuvent coûter 30 à 80 % de plus, et le label bio n'équivaut pas automatiquement à sain (il existe des biscuits ou sodas « bio » tout aussi ultra-transformés). Réservez-les à ce qui compte vraiment pour vous ou dont vous avez besoin pour des allergies ou intolérances.",
        it: "Possono costare dal 30% all'80% in più, e l'etichetta bio non equivale automaticamente a salutare (ci sono biscotti o bibite \"bio\" altrettanto ultra-processati). Riservali a ciò che ti importa davvero o che ti serve per allergie o intolleranze.",
        pt: "Podem custar entre 30% e 80% a mais, e o rótulo orgânico não equivale automaticamente a saudável (há biscoitos ou refrigerantes \"bio\" igualmente ultraprocessados). Reserve-os para o que realmente importa para você ou que precisa por alergias ou intolerâncias."
      }
    },
    {
      title: { es: "Ve al cine o teatro fuera del fin de semana", en: "Go to the movies or theater outside the weekend", fr: "Allez au cinéma ou au théâtre en dehors du week-end", it: "Vai al cinema o a teatro fuori dal weekend", pt: "Vá ao cinema ou teatro fora do fim de semana" },
      body: {
        es: "Muchas salas tienen un \"día del espectador\" entre semana con entradas bastante más baratas que el fin de semana, y las sesiones de mañana o primera hora suelen tener tarifa reducida.",
        en: "Many venues have a midweek \"discount day\" with tickets quite a bit cheaper than the weekend, and morning or early showings usually have a reduced rate.",
        fr: "De nombreuses salles ont un « jour du spectateur » en semaine avec des billets bien moins chers que le week-end, et les séances du matin ou en tout début de journée ont souvent un tarif réduit.",
        it: "Molte sale hanno un \"giorno dello spettatore\" infrasettimanale con biglietti molto più economici del weekend, e le proiezioni del mattino o di prima ora hanno di solito tariffa ridotta.",
        pt: "Muitas salas têm um \"dia do espectador\" durante a semana com ingressos bem mais baratos que no fim de semana, e as sessões da manhã ou de primeira hora costumam ter tarifa reduzida."
      }
    },
    {
      title: { es: "Hazte con la tarjeta de socio del cine o teatro que frecuentas", en: "Get a member card at the cinema or theater you frequent", fr: "Prenez la carte de membre du cinéma ou théâtre que vous fréquentez", it: "Fatti la tessera socio del cinema o teatro che frequenti", pt: "Faça o cartão de sócio do cinema ou teatro que você frequenta" },
      body: {
        es: "Suelen ser gratis, acumulan puntos y dan entradas más baratas en tu cumpleaños o en días especiales. Si vas mucho, un pase mensual ilimitado se amortiza con solo un par de visitas al mes.",
        en: "They're usually free, earn points and give cheaper tickets on your birthday or special days. If you go often, an unlimited monthly pass pays for itself with just a couple of visits a month.",
        fr: "Elles sont généralement gratuites, cumulent des points et offrent des billets moins chers le jour de votre anniversaire ou lors de journées spéciales. Si vous y allez beaucoup, un pass mensuel illimité s'amortit avec seulement deux visites par mois.",
        it: "Di solito sono gratuite, accumulano punti e danno biglietti più economici il giorno del tuo compleanno o in giorni speciali. Se ci vai spesso, un abbonamento mensile illimitato si ripaga con solo un paio di visite al mese.",
        pt: "Costumam ser grátis, acumulam pontos e dão ingressos mais baratos no seu aniversário ou em dias especiais. Se você vai muito, um passe mensal ilimitado se paga com apenas duas visitas por mês."
      }
    },
    {
      title: { es: "Aprovecha carnés de joven, estudiante o descuentos por edad", en: "Use youth, student or age-based discount cards", fr: "Profitez des cartes jeune, étudiant ou des remises selon l'âge", it: "Sfrutta le tessere giovani, studenti o sconti per età", pt: "Aproveite carteirinhas de jovem, estudante ou descontos por idade" },
      body: {
        es: "Muchas salas aplican descuentos importantes con carné joven, carné de estudiante o para mayores en días concretos: pregunta antes de pagar la entrada a tarifa completa.",
        en: "Many venues apply significant discounts with a youth card, student card or for seniors on specific days: ask before paying full price for the ticket.",
        fr: "De nombreuses salles appliquent des remises importantes avec une carte jeune, une carte étudiant ou pour les seniors certains jours : demandez avant de payer le billet plein tarif.",
        it: "Molte sale applicano sconti importanti con la tessera giovani, la tessera studente o per anziani in giorni specifici: chiedi prima di pagare il biglietto a tariffa intera.",
        pt: "Muitas salas aplicam descontos importantes com carteirinha jovem, carteirinha de estudante ou para idosos em dias específicos: pergunte antes de pagar o ingresso com tarifa integral."
      }
    },
    {
      title: { es: "Entra con tu propia bebida o snack si el local lo permite", en: "Bring your own drink or snack if the venue allows it", fr: "Entrez avec votre propre boisson ou snack si le lieu le permet", it: "Entra con la tua bevanda o snack se il locale lo permette", pt: "Entre com sua própria bebida ou lanche se o local permitir" },
      body: {
        es: "El margen en palomitas y refrescos de cine suele ser altísimo. En muchos sitios tienes derecho a entrar con comida comprada fuera si el propio local vende ese mismo tipo de producto: infórmate antes.",
        en: "The markup on movie theater popcorn and soda is usually very high. In many places you have the right to bring in food bought elsewhere even if the venue sells that same type of product: check beforehand.",
        fr: "La marge sur le pop-corn et les sodas au cinéma est généralement très élevée. Dans de nombreux endroits, vous avez le droit d'entrer avec de la nourriture achetée à l'extérieur même si le lieu vend ce même type de produit : renseignez-vous avant.",
        it: "Il margine su popcorn e bibite al cinema è di solito altissimo. In molti posti hai il diritto di entrare con cibo comprato fuori anche se il locale vende quello stesso tipo di prodotto: informati prima.",
        pt: "A margem em pipoca e refrigerante de cinema costuma ser altíssima. Em muitos lugares você tem o direito de entrar com comida comprada fora mesmo que o local venda esse mesmo tipo de produto: informe-se antes."
      }
    },
    {
      title: { es: "Compra entradas de última hora con descuento", en: "Buy last-minute discounted tickets", fr: "Achetez des billets de dernière minute à prix réduit", it: "Compra biglietti last minute scontati", pt: "Compre ingressos de última hora com desconto" },
      body: {
        es: "Algunas plataformas venden butacas sin vender de la función del mismo día con descuentos importantes sobre el precio de taquilla.",
        en: "Some platforms sell unsold seats for that same day's show at significant discounts off the box-office price.",
        fr: "Certaines plateformes vendent les places invendues de la séance du jour même avec des remises importantes sur le prix du guichet.",
        it: "Alcune piattaforme vendono i posti invenduti dello spettacolo dello stesso giorno con sconti importanti sul prezzo del botteghino.",
        pt: "Algumas plataformas vendem lugares não vendidos da sessão do mesmo dia com descontos importantes sobre o preço de bilheteria."
      }
    },
    {
      title: { es: "En el teatro, un asiento más alto sale mucho más barato", en: "In the theater, a higher seat is much cheaper", fr: "Au théâtre, un siège plus haut revient bien moins cher", it: "A teatro, un posto più in alto costa molto meno", pt: "No teatro, um assento mais alto sai muito mais barato" },
      body: {
        es: "Optar por el anfiteatro o el \"gallinero\" en vez del patio de butacas puede costar la mitad o menos, con una pérdida de visión mínima en la mayoría de salas.",
        en: "Choosing the balcony or the \"nosebleed section\" instead of the orchestra can cost half as much or less, with minimal loss of view in most venues.",
        fr: "Opter pour le balcon ou le « poulailler » au lieu du parterre peut coûter moitié moins cher, avec une perte de vue minime dans la plupart des salles.",
        it: "Optare per la galleria o il \"loggione\" invece della platea può costare la metà o meno, con una perdita di visuale minima nella maggior parte delle sale.",
        pt: "Optar pelo balcão ou pela \"galeria\" em vez da plateia pode custar a metade ou menos, com uma perda de visão mínima na maioria das salas."
      }
    },
    {
      title: { es: "Prueba las filmotecas y el teatro alternativo", en: "Try film archives and alternative theater", fr: "Essayez les cinémathèques et le théâtre alternatif", it: "Prova le cineteche e il teatro alternativo", pt: "Experimente as cinematecas e o teatro alternativo" },
      body: {
        es: "Las filmotecas públicas y las salas de teatro independiente ofrecen cine clásico o dramaturgia de calidad a precios mucho más bajos que los grandes circuitos comerciales.",
        en: "Public film archives and independent theater venues offer classic cinema or quality drama at much lower prices than the big commercial circuits.",
        fr: "Les cinémathèques publiques et les salles de théâtre indépendant proposent du cinéma classique ou une dramaturgie de qualité à des prix bien plus bas que les grands circuits commerciaux.",
        it: "Le cineteche pubbliche e le sale di teatro indipendente offrono cinema classico o drammaturgia di qualità a prezzi molto più bassi dei grandi circuiti commerciali.",
        pt: "As cinematecas públicas e as salas de teatro independente oferecem cinema clássico ou dramaturgia de qualidade a preços muito mais baixos que os grandes circuitos comerciais."
      }
    },
    {
      title: { es: "Reutiliza libros de texto y material escolar", en: "Reuse textbooks and school supplies", fr: "Réutilisez les manuels scolaires et le matériel", it: "Riutilizza libri di testo e materiale scolastico", pt: "Reutilize livros didáticos e material escolar" },
      body: {
        es: "Antes de comprarlo todo nuevo, infórmate sobre programas públicos o del propio colegio para prestar o reutilizar libros, y consulta con otras familias si venden lo del curso anterior.",
        en: "Before buying everything new, find out about public or school programs to lend or reuse books, and ask other families if they're selling last year's items.",
        fr: "Avant d'acheter tout à neuf, renseignez-vous sur les programmes publics ou de l'école pour prêter ou réutiliser des livres, et demandez à d'autres familles si elles vendent ceux de l'année précédente.",
        it: "Prima di comprare tutto nuovo, informati sui programmi pubblici o della scuola per prestare o riutilizzare libri, e chiedi ad altre famiglie se vendono quelli dell'anno precedente.",
        pt: "Antes de comprar tudo novo, informe-se sobre programas públicos ou da própria escola para emprestar ou reutilizar livros, e pergunte a outras famílias se vendem os do ano anterior."
      }
    },
    {
      title: { es: "Lleva la comida de casa al cole si el centro lo permite", en: "Bring food from home to school if allowed", fr: "Apportez le repas de la maison à l'école si l'établissement le permet", it: "Porta il pranzo da casa a scuola se l'istituto lo permette", pt: "Leve a comida de casa para a escola se a instituição permitir" },
      body: {
        es: "Preparar el menú en una fiambrera térmica suele costar bastante menos que la cuota del comedor. Revisa también si existen becas de comedor según tus ingresos familiares.",
        en: "Preparing the meal in a thermal lunchbox usually costs quite a bit less than the cafeteria fee. Also check whether there are cafeteria grants based on your family income.",
        fr: "Préparer le repas dans une lunch box thermique coûte généralement bien moins cher que la cantine. Vérifiez aussi s'il existe des bourses de cantine selon vos revenus familiaux.",
        it: "Preparare il pranzo in un porta pranzo termico di solito costa parecchio meno della retta mensa. Verifica anche se esistono borse di studio per la mensa in base al reddito familiare.",
        pt: "Preparar a refeição em uma marmita térmica costuma custar bastante menos que a taxa do refeitório. Verifique também se existem bolsas de refeitório de acordo com sua renda familiar."
      }
    },
    {
      title: { es: "Organiza los almuerzos por tema semanal", en: "Organize lunches by weekly theme", fr: "Organisez les déjeuners par thème hebdomadaire", it: "Organizza i pranzi per tema settimanale", pt: "Organize os lanches por tema semanal" },
      body: {
        es: "Asigna un tipo de almuerzo a cada día (ej. lunes fruta y frutos secos, martes bocadillo integral, miércoles algo horneado en casa, jueves lácteo con cereal, viernes libre) para no improvisar cada mañana. Hornea o corta todo el domingo y congela en porciones: ahorras tiempo, evitas compras de última hora y no repites siempre lo mismo.",
        en: "Assign a lunch type to each day (e.g. Monday fruit and nuts, Tuesday whole-grain sandwich, Wednesday something home-baked, Thursday dairy with cereal, Friday free choice) so you don't improvise every morning. Bake or cut everything on Sunday and freeze in portions: you save time, avoid last-minute purchases and don't always repeat the same thing.",
        fr: "Attribuez un type de déjeuner à chaque jour (ex. lundi fruits et fruits secs, mardi sandwich complet, mercredi quelque chose fait maison, jeudi laitage avec céréales, vendredi libre) pour ne pas improviser chaque matin. Faites cuire ou coupez tout le dimanche et congelez en portions : vous gagnez du temps, évitez les achats de dernière minute et ne répétez pas toujours la même chose.",
        it: "Assegna un tipo di pranzo a ogni giorno (es. lunedì frutta e frutta secca, martedì panino integrale, mercoledì qualcosa fatto in casa al forno, giovedì latticino con cereali, venerdì libero) per non improvvisare ogni mattina. Cuoci o taglia tutto la domenica e congela in porzioni: risparmi tempo, eviti acquisti dell'ultimo minuto e non ripeti sempre la stessa cosa.",
        pt: "Atribua um tipo de lanche a cada dia (ex. segunda fruta e castanhas, terça sanduíche integral, quarta algo assado em casa, quinta laticínio com cereal, sexta livre) para não improvisar toda manhã. Asse ou corte tudo no domingo e congele em porções: você economiza tempo, evita compras de última hora e não repete sempre a mesma coisa."
      }
    },
    {
      title: { es: "Cenas rápidas y económicas entre semana", en: "Quick, cheap weeknight dinners", fr: "Dîners rapides et économiques en semaine", it: "Cene veloci ed economiche infrasettimanali", pt: "Jantares rápidos e econômicos durante a semana" },
      body: {
        es: "Basa las cenas en huevos, conservas de calidad (atún, caballa) y verduras congeladas o en conserva: una tortilla, un revuelto, unas hojas de lechuga rellenas o una quesadilla con sobras se preparan en menos de 15 minutos sin romper el presupuesto. Ten siempre estos comodines en la despensa para resolver la cena cualquier día.",
        en: "Base your dinners on eggs, good-quality canned goods (tuna, mackerel) and frozen or canned vegetables: an omelette, scrambled eggs, stuffed lettuce leaves or a leftover quesadilla take less than 15 minutes to make without breaking the budget. Always keep these staples in the pantry to solve dinner on any day.",
        fr: "Basez vos dîners sur des œufs, des conserves de qualité (thon, maquereau) et des légumes surgelés ou en conserve : une omelette, des œufs brouillés, des feuilles de laitue farcies ou une quesadilla aux restes se préparent en moins de 15 minutes sans casser le budget. Gardez toujours ces joker dans le garde-manger pour régler le dîner n'importe quel jour.",
        it: "Basa le cene su uova, conserve di qualità (tonno, sgombro) e verdure surgelate o in scatola: una frittata, delle uova strapazzate, foglie di lattuga ripiene o una quesadilla con avanzi si preparano in meno di 15 minuti senza sforare il budget. Tieni sempre queste jolly in dispensa per risolvere la cena in qualsiasi giorno.",
        pt: "Baseie os jantares em ovos, conservas de qualidade (atum, cavala) e legumes congelados ou em conserva: uma omelete, ovos mexidos, folhas de alface recheadas ou uma quesadilla com sobras se preparam em menos de 15 minutos sem estourar o orçamento. Tenha sempre esses coringas na despensa para resolver o jantar em qualquer dia."
      }
    },
    {
      title: { es: "Planifica el menú con lo que ya tienes", en: "Plan the menu with what you already have", fr: "Planifiez le menu avec ce que vous avez déjà", it: "Pianifica il menu con quello che hai già", pt: "Planeje o cardápio com o que você já tem" },
      body: {
        es: "Antes de hacer la lista, revisa la nevera, el congelador y la despensa: diseña el menú semanal en torno a lo que ya tienes y caduca pronto. Por categorías en vez de platos fijos (ej. \"lunes de legumbre\", \"martes de conserva o huevo\") te deja margen para adaptarte sin que se estropee nada.",
        en: "Before making the list, check the fridge, freezer and pantry: design the weekly menu around what you already have and is about to expire. Organizing by categories instead of fixed dishes (e.g. \"legume Monday\", \"canned-goods or egg Tuesday\") gives you room to adapt without anything going to waste.",
        fr: "Avant de faire la liste, vérifiez le frigo, le congélateur et le garde-manger : concevez le menu hebdomadaire autour de ce que vous avez déjà et qui expire bientôt. Par catégories plutôt que par plats fixes (ex. « lundi légumineuses », « mardi conserve ou œuf ») vous laisse de la marge pour vous adapter sans rien gâcher.",
        it: "Prima di fare la lista, controlla frigo, freezer e dispensa: progetta il menu settimanale intorno a ciò che hai già e scade presto. Per categorie invece che piatti fissi (es. \"lunedì legumi\", \"martedì conserva o uovo\") ti lascia margine per adattarti senza sprecare nulla.",
        pt: "Antes de fazer a lista, verifique a geladeira, o freezer e a despensa: monte o cardápio semanal em torno do que você já tem e vence logo. Por categorias em vez de pratos fixos (ex. \"segunda de leguminosa\", \"terça de conserva ou ovo\") deixa margem para se adaptar sem estragar nada."
      }
    },
    {
      title: { es: "Haz la lista de la compra por pasillos, sin improvisar", en: "Make your shopping list by aisle, without improvising", fr: "Faites la liste de courses par rayon, sans improviser", it: "Fai la lista della spesa per corsie, senza improvvisare", pt: "Faça a lista de compras por corredores, sem improvisar" },
      body: {
        es: "Organízala según el recorrido del supermercado (frescos, secos, congelados) para no dar vueltas ni caer en compras de impulso. Y antes de llevarte un \"pack ahorro\", compara el precio por kilo o litro: solo compensa si de verdad lo vas a consumir a tiempo.",
        en: "Organize it according to the supermarket's layout (fresh, dry, frozen) so you don't wander around or fall for impulse purchases. And before grabbing a \"savings pack\", compare the price per kilo or liter: it's only worth it if you'll actually use it in time.",
        fr: "Organisez-la selon le parcours du supermarché (frais, secs, surgelés) pour ne pas tourner en rond ni tomber dans des achats impulsifs. Et avant de prendre un « pack économique », comparez le prix au kilo ou au litre : cela ne vaut le coup que si vous allez vraiment le consommer à temps.",
        it: "Organizzala secondo il percorso del supermercato (freschi, secchi, surgelati) per non girare a vuoto né cadere in acquisti d'impulso. E prima di prendere un \"pacco risparmio\", confronta il prezzo al chilo o al litro: conviene solo se lo consumerai davvero in tempo.",
        pt: "Organize-a de acordo com o trajeto do supermercado (frescos, secos, congelados) para não dar voltas nem cair em compras por impulso. E antes de levar um \"pacote econômico\", compare o preço por quilo ou litro: só compensa se você realmente for consumir a tempo."
      }
    },
    {
      title: { es: "Organiza la nevera con la regla FIFO", en: "Organize the fridge with the FIFO rule", fr: "Organisez le frigo avec la règle FIFO", it: "Organizza il frigo con la regola FIFO", pt: "Organize a geladeira com a regra FIFO" },
      body: {
        es: "Coloca lo recién comprado al fondo y mueve hacia delante lo más antiguo (\"first in, first out\"); reserva un estante visible de \"consumir primero\" para que nada se quede olvidado hasta caducar.",
        en: "Put what you just bought at the back and move the oldest items to the front (\"first in, first out\"); set aside a visible \"eat first\" shelf so nothing gets forgotten until it expires.",
        fr: "Placez ce que vous venez d'acheter au fond et ramenez le plus ancien devant (« first in, first out ») ; réservez une étagère bien visible « à consommer en premier » pour que rien ne soit oublié jusqu'à sa péremption.",
        it: "Metti l'appena comprato in fondo e sposta davanti il più vecchio (\"first in, first out\"); riserva un ripiano visibile \"da consumare prima\" perché nulla resti dimenticato fino alla scadenza.",
        pt: "Coloque o recém-comprado no fundo e mova para a frente o mais antigo (\"primeiro a entrar, primeiro a sair\"); reserve uma prateleira visível de \"consumir primeiro\" para que nada fique esquecido até vencer."
      }
    },
    {
      title: { es: "Dale una segunda vida a las sobras", en: "Give leftovers a second life", fr: "Donnez une seconde vie aux restes", it: "Dai una seconda vita agli avanzi", pt: "Dê uma segunda vida às sobras" },
      body: {
        es: "Verduras blandas para cremas, purés o caldos; pan duro para picatostes o pan rallado; restos de carne o pescado para croquetas o rellenos: casi nada tiene que acabar en la basura.",
        en: "Soft vegetables for creams, purées or broths; stale bread for croutons or breadcrumbs; meat or fish leftovers for croquettes or fillings: almost nothing has to end up in the trash.",
        fr: "Légumes ramollis pour des veloutés, purées ou bouillons ; pain rassis pour des croûtons ou de la chapelure ; restes de viande ou de poisson pour des croquettes ou des farces : presque rien ne doit finir à la poubelle.",
        it: "Verdure appassite per vellutate, purè o brodi; pane raffermo per crostini o pangrattato; avanzi di carne o pesce per crocchette o ripieni: quasi nulla deve finire nella spazzatura.",
        pt: "Verduras murchas para cremes, purês ou caldos; pão duro para croutons ou farinha de rosca; sobras de carne ou peixe para croquetes ou recheios: quase nada precisa ir para o lixo."
      }
    },
    {
      title: { es: "Conserva mejor lo que compras", en: "Store what you buy better", fr: "Conservez mieux ce que vous achetez", it: "Conserva meglio ciò che compri", pt: "Conserve melhor o que você compra" },
      body: {
        es: "Envuelve las verduras de hoja en papel absorbente dentro de un túper para que duren el doble, guarda plátanos, manzanas y tomates lejos de otras frutas (aceleran su maduración) y congela pan, carne o pescado ya porcionados para descongelar solo lo que vayas a usar.",
        en: "Wrap leafy greens in paper towel inside a container so they last twice as long, keep bananas, apples and tomatoes away from other fruit (they speed up ripening) and freeze bread, meat or fish already portioned so you only thaw what you'll use.",
        fr: "Enveloppez les légumes-feuilles dans du papier absorbant dans une boîte pour qu'ils durent deux fois plus longtemps, gardez bananes, pommes et tomates loin des autres fruits (elles accélèrent leur mûrissement) et congelez pain, viande ou poisson déjà en portions pour ne décongeler que ce que vous allez utiliser.",
        it: "Avvolgi le verdure a foglia in carta assorbente dentro un contenitore perché durino il doppio, tieni banane, mele e pomodori lontani dagli altri frutti (ne accelerano la maturazione) e congela pane, carne o pesce già porzionati per scongelare solo ciò che userai.",
        pt: "Envolva as verduras de folha em papel absorvente dentro de um pote para durarem o dobro, guarde bananas, maçãs e tomates longe de outras frutas (aceleram seu amadurecimento) e congele pão, carne ou peixe já porcionados para descongelar só o que for usar."
      }
    },
    {
      title: { es: "Compra a granel solo lo que no caduca", en: "Buy in bulk only what doesn't expire", fr: "Achetez en vrac seulement ce qui ne périme pas", it: "Compra sfuso solo ciò che non scade", pt: "Compre a granel só o que não vence" },
      body: {
        es: "Legumbres secas, arroz, pasta, avena, frutos secos crudos, aceite, conservas, harinas y congelados básicos aguantan meses o años bien guardados: los formatos grandes o a granel pueden bajar el precio hasta un 40%.",
        en: "Dried legumes, rice, pasta, oats, raw nuts, oil, canned goods, flours and basic frozen items last months or years when stored well: large or bulk sizes can bring the price down by up to 40%.",
        fr: "Légumineuses sèches, riz, pâtes, avoine, fruits secs crus, huile, conserves, farines et surgelés de base tiennent des mois ou des années bien conservés : les grands formats ou le vrac peuvent faire baisser le prix jusqu'à 40 %.",
        it: "Legumi secchi, riso, pasta, avena, frutta secca cruda, olio, conserve, farine e surgelati di base durano mesi o anni se ben conservati: i formati grandi o sfusi possono abbassare il prezzo fino al 40%.",
        pt: "Feijões secos, arroz, massa, aveia, castanhas cruas, óleo, conservas, farinhas e congelados básicos duram meses ou anos bem guardados: os formatos grandes ou a granel podem baixar o preço em até 40%."
      }
    },
    {
      title: { es: "No compres en grande lo que se estropea rápido", en: "Don't buy in bulk what spoils fast", fr: "N'achetez pas en grande quantité ce qui s'abîme vite", it: "Non comprare in grande ciò che si rovina in fretta", pt: "Não compre em grande quantidade o que estraga rápido" },
      body: {
        es: "Fruta y verdura muy perecedera, pan de molde, snacks ya abiertos, especias poco habituales, salsas frescas o café molido pierden calidad o acaban en la basura antes de terminarlos. Regla simple: si lo que vas a tirar pesa más que lo que ahorras, compra el formato pequeño.",
        en: "Highly perishable fruit and vegetables, sliced bread, already-opened snacks, uncommon spices, fresh sauces or ground coffee lose quality or end up in the trash before you finish them. Simple rule: if what you'll throw away outweighs what you save, buy the small size.",
        fr: "Fruits et légumes très périssables, pain de mie, snacks déjà ouverts, épices peu courantes, sauces fraîches ou café moulu perdent en qualité ou finissent à la poubelle avant d'être terminés. Règle simple : si ce que vous allez jeter pèse plus lourd que ce que vous économisez, achetez le petit format.",
        it: "Frutta e verdura molto deperibile, pancarré, snack già aperti, spezie poco comuni, salse fresche o caffè macinato perdono qualità o finiscono nella spazzatura prima di finirli. Regola semplice: se quello che butterai pesa più di quanto risparmi, compra il formato piccolo.",
        pt: "Frutas e verduras muito perecíveis, pão de forma, lanches já abertos, especiarias pouco comuns, molhos frescos ou café moído perdem qualidade ou acabam no lixo antes de você terminá-los. Regra simples: se o que você vai jogar fora pesa mais do que economiza, compre o formato pequeno."
      }
    },
    {
      title: { es: "Comparte el trayecto al colegio", en: "Share the school run", fr: "Partagez le trajet vers l'école", it: "Condividi il tragitto verso scuola", pt: "Compartilhe o trajeto até a escola" },
      body: {
        es: "Turnarte con otras familias del mismo curso para llevar a los niños ahorra combustible y tiempo a todos; mira también si hay abonos de transporte con descuento para estudiantes.",
        en: "Taking turns with other families from the same class to drive the kids saves everyone fuel and time; also check whether there are discounted transport passes for students.",
        fr: "Tourner avec d'autres familles de la même classe pour emmener les enfants économise du carburant et du temps à tout le monde ; regardez aussi s'il existe des abonnements de transport à tarif réduit pour étudiants.",
        it: "Fare i turni con altre famiglie della stessa classe per portare i bambini fa risparmiare carburante e tempo a tutti; controlla anche se ci sono abbonamenti di trasporto scontati per studenti.",
        pt: "Se revezar com outras famílias da mesma turma para levar as crianças economiza combustível e tempo para todos; veja também se há passes de transporte com desconto para estudantes."
      }
    },
    {
      title: { es: "Compra material escolar sin prisa y sin licencias", en: "Buy school supplies without rushing and without licensed characters", fr: "Achetez le matériel scolaire sans précipitation et sans licences", it: "Compra il materiale scolastico senza fretta e senza licenze", pt: "Compre material escolar sem pressa e sem licenças" },
      body: {
        es: "Adquiere solo lo imprescindible la primera semana; el resto puede esperar a que haya ofertas. Las carpetas y mochilas sin personajes con licencia suelen costar bastante menos.",
        en: "Buy only the essentials the first week; the rest can wait for sales. Folders and backpacks without licensed characters usually cost quite a bit less.",
        fr: "N'achetez que l'indispensable la première semaine ; le reste peut attendre les promotions. Les classeurs et sacs à dos sans personnages sous licence coûtent généralement bien moins cher.",
        it: "Compra solo l'indispensabile la prima settimana; il resto può aspettare le offerte. Cartelline e zaini senza personaggi con licenza di solito costano parecchio meno.",
        pt: "Adquira só o indispensável na primeira semana; o resto pode esperar as promoções. Pastas e mochilas sem personagens licenciados costumam custar bem menos."
      }
    },
    {
      title: { es: "Elige uniforme neutro y una talla de margen", en: "Choose a neutral uniform and one size up", fr: "Choisissez un uniforme neutre et une taille de marge", it: "Scegli un'uniforme neutra e una taglia di margine", pt: "Escolha uniforme neutro e uma numeração de folga" },
      body: {
        es: "Compra las prendas básicas sin escudo en tiendas generalistas y cose el distintivo aparte; una talla más de margen en ropa y calzado ayuda a que dure todo el curso.",
        en: "Buy the basic garments without the school badge at general stores and sew the emblem on separately; one size up in clothes and shoes helps it last the whole school year.",
        fr: "Achetez les vêtements de base sans écusson dans des magasins généralistes et cousez l'insigne séparément ; une taille de plus pour les vêtements et chaussures aide à ce qu'ils durent toute l'année scolaire.",
        it: "Compra i capi base senza stemma nei negozi generalisti e cuci il distintivo a parte; una taglia in più in abiti e scarpe aiuta a farli durare tutto l'anno scolastico.",
        pt: "Compre as peças básicas sem o brasão em lojas generalistas e costure o emblema separadamente; um número a mais de folga em roupas e calçados ajuda a durar o ano letivo todo."
      }
    },
    {
      title: { es: "Prioriza las extraescolares municipales o del colegio", en: "Prioritize municipal or school after-school activities", fr: "Privilégiez les activités périscolaires municipales ou de l'école", it: "Dai priorità alle attività extrascolastiche comunali o della scuola", pt: "Priorize as atividades extracurriculares municipais ou da escola" },
      body: {
        es: "Las actividades organizadas por el ayuntamiento o la asociación de padres suelen ser bastante más económicas que las academias privadas.",
        en: "Activities organized by the town council or the parents' association are usually quite a bit cheaper than private academies.",
        fr: "Les activités organisées par la mairie ou l'association de parents sont généralement bien moins chères que les écoles privées.",
        it: "Le attività organizzate dal comune o dall'associazione genitori sono di solito parecchio più economiche delle accademie private.",
        pt: "As atividades organizadas pela prefeitura ou pela associação de pais costumam ser bem mais econômicas que as academias particulares."
      }
    }
  ],

  // Recursos encontrados en la investigación (libros y charlas). Se listan con su
  // fuente para que el usuario pueda profundizar; no se reproduce el contenido
  // protegido de los libros, solo referencias.
  resources: {
    books: [
      { title: "La bolsa o la vida", author: "Vicki Robin y Joe Dominguez", note: { es: "Un clásico que invita a replantear la relación entre tiempo, trabajo y dinero.", en: "A classic that invites you to rethink the relationship between time, work and money.", fr: "Un classique qui invite à repenser la relation entre le temps, le travail et l'argent.", it: "Un classico che invita a ripensare il rapporto tra tempo, lavoro e denaro.", pt: "Um clássico que convida a repensar a relação entre tempo, trabalho e dinheiro." } },
      { title: "Economía básica", author: "Thomas Sowell", note: { es: "Introducción clara a cómo funcionan los mercados y la toma de decisiones económicas.", en: "A clear introduction to how markets work and how economic decisions are made.", fr: "Une introduction claire au fonctionnement des marchés et à la prise de décisions économiques.", it: "Un'introduzione chiara a come funzionano i mercati e le decisioni economiche.", pt: "Introdução clara sobre como funcionam os mercados e a tomada de decisões econômicas." } },
      { title: "Ten peor coche que tu vecino", author: "Luis Pita", note: { es: "Sobre la 'libertad financiera' medida en años de tranquilidad: pautas sencillas para automatizar el preahorro y recortar gastos prescindibles sin sacrificar calidad de vida.", en: "On \"financial freedom\" measured in years of peace of mind: simple guidelines to automate pre-saving and cut dispensable expenses without sacrificing quality of life.", fr: "Sur la « liberté financière » mesurée en années de tranquillité : des règles simples pour automatiser l'épargne et réduire les dépenses superflues sans sacrifier la qualité de vie.", it: "Sulla \"libertà finanziaria\" misurata in anni di tranquillità: linee guida semplici per automatizzare il risparmio anticipato e tagliare le spese superflue senza sacrificare la qualità della vita.", pt: "Sobre a \"liberdade financeira\" medida em anos de tranquilidade: diretrizes simples para automatizar a pré-poupança e cortar gastos dispensáveis sem sacrificar a qualidade de vida." } },
      { title: "Invierte en ti", author: "Natalia de Santiago", note: { es: "Guía práctica y directa para estructurar el presupuesto familiar, gestionar el ahorro mensual y entender los productos bancarios cotidianos sin tecnicismos.", en: "A practical, straightforward guide to structuring the family budget, managing monthly savings and understanding everyday banking products without jargon.", fr: "Guide pratique et direct pour structurer le budget familial, gérer l'épargne mensuelle et comprendre les produits bancaires du quotidien sans jargon.", it: "Guida pratica e diretta per strutturare il bilancio familiare, gestire il risparmio mensile e capire i prodotti bancari quotidiani senza tecnicismi.", pt: "Guia prático e direto para estruturar o orçamento familiar, gerenciar a poupança mensal e entender os produtos bancários do dia a dia sem tecnicismos." } },
      { title: "Invierte con poco", author: "—", note: { es: "Cómo empezar a mejorar tu situación económica con poco capital inicial.", en: "How to start improving your financial situation with little starting capital.", fr: "Comment commencer à améliorer sa situation financière avec peu de capital de départ.", it: "Come iniziare a migliorare la propria situazione economica con poco capitale iniziale.", pt: "Como começar a melhorar sua situação econômica com pouco capital inicial." } },
      { title: "Finanzas para todos", author: "Paco de León", note: { es: "Guía ilustrada que propone revisar nuestras creencias sobre el dinero (moldeadas por la familia, la cultura y el sistema) para cambiar de verdad nuestra relación con las finanzas.", en: "An illustrated guide that proposes examining our beliefs about money (shaped by family, culture and the system) to truly change our relationship with finances.", fr: "Guide illustré qui propose de revisiter nos croyances sur l'argent (façonnées par la famille, la culture et le système) pour vraiment changer notre relation aux finances.", it: "Guida illustrata che propone di rivedere le nostre credenze sul denaro (plasmate dalla famiglia, dalla cultura e dal sistema) per cambiare davvero il nostro rapporto con le finanze.", pt: "Guia ilustrado que propõe revisar nossas crenças sobre o dinheiro (moldadas pela família, cultura e sistema) para mudar de verdade nossa relação com as finanças." } },
      { title: "Padre Rico, Padre Pobre (Ed. 25 aniversario)", author: "Robert Kiyosaki", note: { es: "Un clásico que contrasta dos mentalidades sobre el dinero y explica por qué distinguir activos de pasivos es clave para la libertad financiera.", en: "A classic that contrasts two mindsets about money and explains why distinguishing assets from liabilities is key to financial freedom.", fr: "Un classique qui oppose deux mentalités sur l'argent et explique pourquoi distinguer actifs et passifs est essentiel pour la liberté financière.", it: "Un classico che confronta due mentalità sul denaro e spiega perché distinguere attivi da passivi è la chiave per la libertà finanziaria.", pt: "Um clássico que contrasta duas mentalidades sobre dinheiro e explica por que distinguir ativos de passivos é a chave para a liberdade financeira." } },
      { title: "El cuadrante del flujo del dinero", author: "Robert T. Kiyosaki", note: { es: "Continuación de \"Padre Rico, Padre Pobre\": explica las cuatro formas de generar ingresos (empleado, autónomo, dueño de negocio, inversor) y por qué cambiar de cuadrante es clave para la libertad financiera.", en: "A sequel to \"Rich Dad Poor Dad\": explains the four ways to generate income (employee, self-employed, business owner, investor) and why changing quadrants is key to financial freedom.", fr: "Suite de « Père riche, père pauvre » : explique les quatre façons de générer des revenus (salarié, indépendant, chef d'entreprise, investisseur) et pourquoi changer de quadrant est la clé de la liberté financière.", it: "Seguito di \"Padre ricco padre povero\": spiega i quattro modi di generare reddito (dipendente, autonomo, imprenditore, investitore) e perché cambiare quadrante è la chiave per la libertà finanziaria.", pt: "Continuação de \"Pai Rico, Pai Pobre\": explica as quatro formas de gerar renda (empregado, autônomo, dono de negócio, investidor) e por que mudar de quadrante é a chave para a liberdade financeira." } },
      { title: "Haz que el dinero te elija", author: "—", note: { es: "Sobre teoría y filosofía del dinero: replantea qué problema resuelve realmente el dinero en tu vida.", en: "On the theory and philosophy of money: rethinks what problem money actually solves in your life.", fr: "Sur la théorie et la philosophie de l'argent : repense quel problème l'argent résout réellement dans votre vie.", it: "Sulla teoria e filosofia del denaro: ripensa quale problema il denaro risolve davvero nella tua vita.", pt: "Sobre teoria e filosofia do dinheiro: repensa que problema o dinheiro realmente resolve na sua vida." } },
      { title: "Fundamentos de economía", author: "Paul R. Krugman, Robin Wells y Martha L. Olney", note: { es: "Introducción accesible a los conceptos básicos de economía, útil para entender el contexto detrás de las decisiones financieras del día a día.", en: "An accessible introduction to basic economic concepts, useful for understanding the context behind everyday financial decisions.", fr: "Introduction accessible aux concepts économiques de base, utile pour comprendre le contexte derrière les décisions financières du quotidien.", it: "Introduzione accessibile ai concetti economici di base, utile per capire il contesto dietro le decisioni finanziarie quotidiane.", pt: "Introdução acessível aos conceitos básicos de economia, útil para entender o contexto por trás das decisões financeiras do dia a dia." } },
      { title: "La psicología del dinero", author: "Morgan Housel", note: { es: "El comportamiento, las emociones y los hábitos pesan mucho más en las finanzas de un hogar que los conocimientos matemáticos: clave para tomar decisiones sensatas a largo plazo.", en: "Behavior, emotions and habits matter far more to a household's finances than math skills: key to making sound long-term decisions.", fr: "Le comportement, les émotions et les habitudes pèsent bien plus dans les finances d'un foyer que les connaissances mathématiques : la clé pour prendre des décisions sensées à long terme.", it: "Il comportamento, le emozioni e le abitudini pesano molto di più sulle finanze di una famiglia delle conoscenze matematiche: la chiave per prendere decisioni sensate a lungo termine.", pt: "O comportamento, as emoções e os hábitos pesam muito mais nas finanças de um lar do que os conhecimentos matemáticos: a chave para tomar decisões sensatas a longo prazo." } },
      { title: "El hombre más rico de Babilonia", author: "George S. Clason", note: { es: "Un clásico brevísimo basado en parábolas que enseña reglas atemporales del ahorro doméstico: pagarte a ti mismo primero, controlar los gastos y proteger el capital.", en: "A very short classic based on parables that teaches timeless rules of household saving: pay yourself first, control expenses and protect capital.", fr: "Un tout petit classique basé sur des paraboles qui enseigne des règles intemporelles de l'épargne domestique : se payer d'abord soi-même, contrôler les dépenses et protéger le capital.", it: "Un classico brevissimo basato su parabole che insegna regole senza tempo del risparmio domestico: pagare prima se stessi, controllare le spese e proteggere il capitale.", pt: "Um clássico brevíssimo baseado em parábolas que ensina regras atemporais da poupança doméstica: pagar-se primeiro, controlar os gastos e proteger o capital." } },
      { title: "El inversor inteligente", author: "Benjamin Graham", note: { es: "Aborda la inversión en general, pero sus capítulos sobre disciplina, prudencia y la diferencia entre especular y proteger el capital son fundamentales para la seguridad económica familiar.", en: "Covers investing in general, but its chapters on discipline, prudence and the difference between speculating and protecting capital are fundamental to a family's financial security.", fr: "Traite de l'investissement en général, mais ses chapitres sur la discipline, la prudence et la différence entre spéculer et protéger le capital sont fondamentaux pour la sécurité économique familiale.", it: "Tratta l'investimento in generale, ma i suoi capitoli su disciplina, prudenza e la differenza tra speculare e proteggere il capitale sono fondamentali per la sicurezza economica familiare.", pt: "Aborda o investimento em geral, mas seus capítulos sobre disciplina, prudência e a diferença entre especular e proteger o capital são fundamentais para a segurança econômica familiar." } },
      { title: "Kakebo: el arte japonés de ahorrar dinero", author: "Fumiko Chiba", note: { es: "Más que un libro, una metodología práctica: registra tus ingresos y gastos diarios en cuatro categorías claras para tomar conciencia de en qué se te va el dinero mes a mes.", en: "More than a book, a practical method: log your daily income and expenses in four clear categories to become aware of where your money goes each month.", fr: "Plus qu'un livre, une méthode pratique : enregistrez vos revenus et dépenses quotidiens dans quatre catégories claires pour prendre conscience de là où part votre argent chaque mois.", it: "Più che un libro, una metodologia pratica: registra le tue entrate e uscite giornaliere in quattro categorie chiare per renderti conto di dove vanno i tuoi soldi ogni mese.", pt: "Mais que um livro, uma metodologia prática: registre suas receitas e despesas diárias em quatro categorias claras para perceber para onde vai o dinheiro mês a mês." } },
      { title: "Pequeño cerdo capitalista", author: "Sofía Macías", note: { es: "Un libro dinámico y accesible para empezar desde cero a presupuestar, salir de deudas y organizar el presupuesto familiar sin complicaciones.", en: "A dynamic, accessible book for starting from scratch with budgeting, getting out of debt and organizing the family budget without complications.", fr: "Un livre dynamique et accessible pour commencer de zéro à budgétiser, sortir des dettes et organiser le budget familial sans complications.", it: "Un libro dinamico e accessibile per iniziare da zero a fare budget, uscire dai debiti e organizzare il bilancio familiare senza complicazioni.", pt: "Um livro dinâmico e acessível para começar do zero a fazer orçamento, sair das dívidas e organizar o orçamento familiar sem complicações." } }
    ],
    talks: [
      { title: "Domina tus finanzas personales en un 2x3", author: "Alicia Márquez (TEDx)", note: { es: "El método \"2x3\" para identificar las principales amenazas a la libertad financiera.", en: "The \"2x3\" method for identifying the main threats to financial freedom.", fr: "La méthode « 2x3 » pour identifier les principales menaces à la liberté financière.", it: "Il metodo \"2x3\" per identificare le principali minacce alla libertà finanziaria.", pt: "O método \"2x3\" para identificar as principais ameaças à liberdade financeira." } },
      { title: "Educación financiera para toda la vida", author: "Nicolás González (TEDx)", note: { es: "Por qué combatir el analfabetismo financiero es una prioridad.", en: "Why fighting financial illiteracy is a priority.", fr: "Pourquoi lutter contre l'analphabétisme financier est une priorité.", it: "Perché combattere l'analfabetismo finanziario è una priorità.", pt: "Por que combater o analfabetismo financeiro é uma prioridade." } },
      { title: "Finanzas Personales y las 4 T's", author: "Alexandra Kafie (TEDx)", note: { es: "Claves para ordenar las finanzas del hogar.", en: "Keys to putting household finances in order.", fr: "Clés pour mettre de l'ordre dans les finances du foyer.", it: "Chiavi per mettere ordine nelle finanze domestiche.", pt: "Chaves para organizar as finanças do lar." } },
      { title: "Tomando el control de nuestro futuro financiero", author: "Rodrigo Álvarez (TEDx)", note: { es: "Técnicas para crear hábitos saludables con el dinero.", en: "Techniques for building healthy habits with money.", fr: "Techniques pour créer des habitudes saines avec l'argent.", it: "Tecniche per creare abitudini sane con il denaro.", pt: "Técnicas para criar hábitos saudáveis com o dinheiro." } }
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
    { id: "demo-visa", name: { es: "Tarjeta Visa Demo", en: "Demo Visa Card", fr: "Carte Visa Démo", it: "Carta Visa Demo", pt: "Cartão Visa Demo" }, kind: { es: "Tarjeta de crédito", en: "Credit card", fr: "Carte de crédit", it: "Carta di credito", pt: "Cartão de crédito" } },
    { id: "demo-banco", name: { es: "Banco Simulado", en: "Simulated Bank", fr: "Banque simulée", it: "Banca simulata", pt: "Banco simulado" }, kind: { es: "Cuenta corriente", en: "Checking account", fr: "Compte courant", it: "Conto corrente", pt: "Conta corrente" } },
    { id: "demo-wallet", name: { es: "Billetera Móvil Demo", en: "Demo Mobile Wallet", fr: "Portefeuille mobile démo", it: "Portafoglio mobile demo", pt: "Carteira móvel demo" }, kind: { es: "Pago móvil", en: "Mobile payment", fr: "Paiement mobile", it: "Pagamento mobile", pt: "Pagamento móvel" } }
  ]
};
