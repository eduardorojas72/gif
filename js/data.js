/* ---------------------------------------------------------------
   CONTENT — 8 Steps, 6-Day Plan, 90-Day Plan
--------------------------------------------------------------- */

const OCHO_PASOS = [
  {
    n: 1, t: "Set goals and objectives (MBO)", d: "Design your “balanced life”: live well, love, learn, and contribute.", icon: "target",
    accion: "Write your Life Scenario", objetivo: "Clarity of vision and purpose",
    explicacion: "A balanced life in Atomy is divided into four pillars: Live Well (physical and financial needs), Love (relationships and family), Learn (intellect and growth), and Contribute (social outreach and spirituality). Goals should be realistic yet ambitious, written clearly and paired with deadlines.",
    ejemplo: "It's not enough to say “I want a house.” You must define it: “I will live in a 200 m² house on the north side of [place], with 4 bedrooms, painted white with wood finishes, by [date].” Another example is setting an exact amount of support for your parents, such as sending them a specific amount of money each month along with company supplements.",
  },
  {
    n: 2, t: "Have unbreakable determination", d: "Independence from others' opinions, positive thinking, and willingness to pay the price of effort.", icon: "flame",
    accion: "Decide to pay the price", objetivo: "Resilience in the face of obstacles",
    explicacion: "Determination involves three aspects: a proactive attitude (being the owner of your business), positive thoughts (focusing on the solution), and the willingness to “pay the price.” Nothing of value is achieved without initial effort. The “law of liftoff” says a rocket burns most of its fuel at the start to break free of gravity — the same happens in business.",
    ejemplo: "If a close relative turns down your proposal, your determination should let you keep moving forward without it affecting your mood. It also means sacrificing entertainment hours to attend the “One Day Seminar” or the Success Academy, understanding that time as an investment in your future freedom.",
  },
  {
    n: 3, t: "Build a contact list", d: "Build an active list of at least 250 people, without pre-judging their potential.", icon: "clipboard-list",
    accion: "Write everyone down, without judging", objetivo: "Identify your human capital",
    explicacion: "The common mistake is “pre-judging.” The Law of Their Own Mind says we should only inform — the decision of whether they're interested is theirs. Your list should include everyone you know, since everyone uses personal care or cosmetic products. Don't look only for “salespeople” — look for consumers.",
    ejemplo: "Grab your phone and write everyone down: relatives, former classmates, neighbors, and gym friends. If you know someone you think “has no money,” write them down anyway — they might need the business opportunity. If you know someone “very wealthy,” write them down too — they might want to improve their health with top-quality products.",
  },
  {
    n: 4, t: "Make calls and invitations", d: "Focused on booking appointments and sparking sincere curiosity, not presenting over the phone.", icon: "phone-call",
    accion: "Constant daily calls", objetivo: "Book appointments and presentations",
    explicacion: "The invitation is not the business presentation. It's the process of sparking curiosity and securing an appointment. President Park stresses that consistency is vital: if you talk to 10 people a day, your business will inevitably grow. Brevity is your best ally here.",
    ejemplo: "An effective call might sound like this: “Hi, I found a line of Korean products of amazing quality that I've been using and loving — can we meet for 15 minutes on [day] so you can try them?” Avoid giving too much information over the phone so you don't overwhelm the person.",
  },
  {
    n: 5, t: "Explain the business (Show the Business)", d: "Company, Products, Compensation Plan, and Global Vision.", icon: "presentation",
    accion: "Show the Plan (STP)", objetivo: "Show the Atomy opportunity",
    explicacion: "The presentation should cover four points: The Company (backed by KAERI and Kolmar BNH), The Products (the “Masstige” concept: Mass + Prestige, plus Absolute Quality, Absolute Price), Compensation Plan (binary system, no enrollment fees or mandatory purchases), and Philosophy and System (centered on consumer success and the free education system).",
    ejemplo: "Do a demonstration with toothpaste and a toothbrush during the talk. Show how the price per gram of Atomy products is lower than supermarket brands, highlighting the household savings while getting superior quality.",
  },
  {
    n: 6, t: "Follow up (the 48-Hour Rule)", d: "Contact the prospect within the first 48 hours after the presentation.", icon: "clock",
    accion: "Contact within 48 hours", objetivo: "Retention and customer care",
    explicacion: "The 48-Hour Rule must be applied: contact the person within two days of the talk or the product delivery. This is the moment to resolve doubts, handle objections, and guide the new member through their first steps.",
    ejemplo: "Call someone who bought the skincare system and ask: “How did the nourishing cream feel on your skin last night?” If they say they haven't had time to use it yet, remind them of the benefits and set up a new short call for the next day.",
  },
  {
    n: 7, t: "Get consulting and guidance", d: "Meet with your upline and downline to spot roadblocks and readjust.", icon: "users",
    accion: "Diagnosis with your Sponsor", objetivo: "Strategy correction",
    explicacion: "A data-based diagnosis should be carried out. If a partner isn't growing, figure out which of the earlier steps is failing. Guidance should be constructive, goal-focused, and never based on personal criticism.",
    ejemplo: "If a partner says “I don't know anyone,” the sponsor should sit down with them to review their contact list and help expand it. If the partner has plenty of contacts but no one is buying, the sponsor should review how the “Business Explanation” is being delivered and adjust the message.",
  },
  {
    n: 8, t: "Duplicate yourself", d: "Be a role model with integrity: a loyal consumer, connected to the events system, serving with humility.", icon: "repeat",
    accion: "Be the example to follow", objetivo: "Exponential growth",
    explicacion: "Duplicating isn't simply “copying” a leader's personality. It's becoming a role model (the original) that others can easily replicate. If you follow the system, your partners will do the same. For a business to be scalable, the process must be simple and standardized.",
    ejemplo: "If you want your team to attend seminars, you must be the first to arrive and the last to leave. If you want them to use the products, you must be a loyal consumer of the whole Atomy line. Your behavior is the mold future copies of your organization will be cast from.",
  },
];

const LEMA_ATOMY = {
  intro: "Atomy's Motto is not simply a set of motivational words — it is the philosophical and spiritual core on which the company's entire vision, management, and organizational culture is built. Formulated by President Han-Gill Park, it sets out the ethical framework for how people should conduct themselves, both in business and in daily life.",
  exclamacion: "Cherish the Spirit! Create the Vision! Follow the Faith! Serve in Humility! Let's go, let's go, let's go!",
  pilares: [
    {
      n: 1, t: "Cherish the Spirit", sub: "", icon: "heart",
      explicacion: "Human beings are God's most valuable creation. People must never be used as a means to an economic or commercial end — people are the end in themselves. At Atomy, the absolute priority is the well-being, growth, and success of the individual, above corporate interests.",
    },
    {
      n: 2, t: "Create the Vision", sub: "", icon: "eye",
      explicacion: "The future is not something you simply wait for — it's a reality actively designed in the mind. Whoever visualizes their Life Scenario clearly and in detail can steer their daily thoughts and actions to transform that reality and reach their goals.",
    },
    {
      n: 3, t: "Follow the Faith", sub: "", icon: "compass",
      explicacion: "True faith means firmly believing in what is not yet visible. Holding an unwavering faith in the vision you've designed lets you overcome doubt, inevitable obstacles, and outside skepticism with perseverance and conviction.",
    },
    {
      n: 4, t: "Serve in Humility", sub: "", icon: "users",
      explicacion: "Attitude is the most important leadership quality. However high your goals or achievements may be, your personal stance should always be one of humility: serve others with respect, keep a mind willing to learn, and put the team's well-being ahead of personal ego.",
    },
  ],
};

const DIAS = [
  {
    id: 1,
    etapa: "The Vision",
    icono: "eye",
    titulo: "Define Your “Why”",
    objetivo: "Reconnect with your deep motivation and understand Conscious Consumption.",
    contenido: [
      {
        h: "The 3-Level Reflection",
        body: [
          "Answer these three questions in a personal notebook, going deeper each time:",
          "Surface Level (the material): what do you want to achieve financially? Example: pay off debt, earn an extra €1,000 a month, get a new car.",
          "Personal Level (the lifestyle): if money were no longer a problem, how would your day-to-day change? Example: work from home, have no boss, travel twice a year.",
          "Emotional Level (the deep cause): who benefits from this, and how does it make you feel? Example: being present during my kids' childhood, giving my parents peace of mind, not feeling anxious at the end of the month.",
          "💡 Today's task: sum up those 3 answers in a single sentence, write it somewhere you'll see it every day, and share it with your sponsor.",
        ],
      },
      {
        h: "Write Your Life Scenario",
        body: [
          "Draw 4 quadrants and write a concrete, present-tense goal for each pillar:",
          "Live Well (health, home, finances): e.g. “By December 2026 I will have paid off my credit card and remodeled my kitchen.”",
          "Love (family and loved ones): e.g. “Have every weekend free, with no work worries, to spend with my kids.”",
          "Learn (personal growth): e.g. “Watch 1 CH.ATOMY video a day and lose my fear of public speaking by year's end.”",
          "Contribute (impact and legacy): e.g. “Donate 5% of my monthly commissions to a local soup kitchen.”",
          "10-minute exercise: pick 1 example from each pillar and write it down with a target date.",
        ],
      },
      {
        h: "Discover Atomy's Vision (CH.ATOMY Europe)",
        body: [
          "Go to ch.atomy.com/eu from your browser or phone and switch the language to English using the globe icon (top-right corner).",
          "Explore the menus: Company/Vision (founder Han-Gill Park's story and the scientific backing of KAERI and Kolmar), Product (skincare, health, home), Business/Education (compensation plan, seminars), and Member/Success Stories (real testimonials).",
          "Use the search icon for specific topics, for example “HemoHIM” or “Compensation Plan.”",
          "Recommendation: spend 15 minutes a day watching 1 Company video and 1 Product video.",
        ],
      },
      {
        h: "Conscious Consumption: from spending that's gone, to spending that comes back",
        body: [
          "We've all been taught automatic consumption our whole lives: buying personal care items every month, paying the bill, and going home with an empty wallet and no benefit.",
          "At Atomy, every everyday purchase (toothpaste, shampoo, detergent, supplements) turns into Point Value (PV) that never expires and keeps accumulating in your favor.",
          "It's not about spending more or buying unnecessary things — it's about changing where you buy the things you already always buy.",
          "The income you build through commissions can be inherited for up to three generations: today it gives you financial breathing room, and over time it becomes an estate for your children and grandchildren.",
        ],
      },
    ],
    campos: [{ key: "porque", label: "Your “Why” in one sentence" }],
    checklist: [
      "I defined my 3 main reasons (my “Why”).",
      "I reviewed the catalog and picked my first products to replace at home.",
      "I watched Atomy's official vision presentation.",
      "I watched at least one video about the Atomy Company.",
    ],
    quiz: {
      pregunta: "What do your everyday purchases turn into within Atomy?",
      opciones: ["Expenses that never come back", "Point Value (PV) that never expires", "A temporary discount"],
      correcta: 1,
    },
  },
  {
    id: 2,
    etapa: "The Team",
    icono: "users",
    titulo: "The Compensation Plan and the Binary",
    objetivo: "Understand how coordinated consumption across two lines generates financial prosperity.",
    contenido: [
      {
        h: "Your membership is 100% free",
        body: [
          "Joining Atomy costs nothing: no enrollment fee, no monthly or annual fee, and never any mandatory purchases to keep your account active.",
          "The only thing you do is change where you buy the everyday products you already always buy — the rest of the system (activation, commissions, ranks) is built on that consumption, not on extra payments.",
        ],
      },
      {
        h: "Your first big milestone: 10,000 Personal PV (PPV)",
        body: [
          "PV (Point Value) is the value the company assigns to each product; you'll see it in blue under the price in the online store.",
          "With just a couple of basic everyday products (e.g. an oral care kit and a shampoo) you already reach 10,000 PPV.",
          "Reaching 10,000 PPV is the key that activates your partner account: from there, your profile is enabled to accumulate team volume and earn commissions.",
        ],
      },
      {
        h: "Your binary team: Left Line and Right Line",
        body: [
          "You don't work alone: with your sponsor's help, you build your structure across two consumption lines, Left and Right, with unlimited depth (no matter how many levels down each line grows).",
          "Every time people on your team buy for their homes, they generate Group PV (GPV).",
          "A “Cycle” happens when your left line and your right line each accumulate 300,000 GPV: the system makes a “match” and the company pays a direct commission into your bank account.",
        ],
      },
      {
        h: "Why the real target is 300,000 PPV — you earn triple!",
        body: [
          "With 10,000 PPV you already get paid when your teams reach 300,000 GPV on each side: a base commission of about €15-20 per cycle.",
          "Once you personally reach 300,000 PPV, you earn TRIPLE for the exact same team effort: about €50-60 per cycle.",
          "Your PPV NEVER get erased or reset: every purchase for your home adds to the previous total for life. There's no rush and no pressure.",
          "Summary: 1) place your first order to reach 10,000 PPV and activate your account; 2) keep switching your everyday shopping to Atomy at your own pace until you hit 300,000 PPV while your lines grow; 3) enjoy commissions multiplied by three.",
        ],
      },
      {
        h: "Personal PV vs. Group PV",
        body: [
          "Personal PV: you generate these yourself by buying with your ID. They never get erased. They activate your account and determine your commission tier per cycle.",
          "Group PV: generated by your team (Left and Right lines). They reset only after a commission is paid out. They add up the collective consumption used to settle commissions.",
        ],
      },
      {
        h: "The full path to Sales Master",
        body: [
          "Your personal progress moves through PV milestones that are never lost: 10,000 PPV activates your account, 300,000 PPV earns you Agent, and 700,000 PPV earns you Special Agent.",
          "Sales Master — the goal of your 90-Day Plan — is reached when, on top of your 700,000 PPV, your Left line and your Right line each accumulate 2,500,000 GPV within the same qualifying pay period.",
          "This Cumbre 90 journey takes you exactly there. The ranks above Sales Master (Diamond Master and beyond) sit outside these 90 days, but by then you'll already have the habit and the team to keep climbing.",
        ],
      },
    ],
    campos: [],
    nota: "Remember your two big milestones: 10,000 PPV (activates your account) and 300,000 PPV (triples your commission per cycle). Your personal PV never gets erased or reset.",
    checklist: [
      "I understood the importance of reaching 10,000 PV first and aiming for 300,000 personal PV.",
      "I understood how the binary balance (Left / Right) works.",
      "I chose my first 4 preferred products.",
      "I watched at least one video about the Compensation Plan.",
    ],
    quiz: {
      pregunta: "What is your first big milestone to activate your account?",
      opciones: ["300,000 Group PV", "10,000 Personal PV", "50 new contacts"],
      correcta: 1,
    },
  },
  {
    id: 3,
    etapa: "The Product",
    icono: "package",
    titulo: "From Experience to Recommendation",
    objetivo: "Fall in love with the products and share genuine recommendations without pressure.",
    contenido: [
      {
        h: "From theory to real experience",
        body: [
          "At Atomy, you don't recommend “blindly” — you do it from honesty and your own experience as a consumer. Today it's time to get things moving.",
        ],
      },
      {
        h: "Choose your first order (your conscious consumption)",
        body: [
          "Choose the products you genuinely need to restock at home right now (toothpaste, shampoo, detergent, supplements). The goal is simple: try the brand's quality so you can speak about it with authority from day one.",
          "To do that, go to the website and log in with your ID and password.",
        ],
      },
      {
        h: "List of 5 wellness recommendations",
        body: [
          "Think of 5 people close to you and their needs: someone with sensitive skin? someone tired who wants to boost their immune system? someone who prefers eco-friendly household products?",
          "Write in your notebook [Name] + [Product that could help them]. Example: Maria → fatigue / immune system → HemoHIM. Carlos → daily facial hygiene → Skincare line.",
          "Don't sell them anything yet — just identify how the catalog could bring them value.",
        ],
      },
      {
        h: "Build anticipation on social media",
        body: [
          "Build anticipation naturally on your social media or WhatsApp status, without selling anything — just sharing your curiosity as a consumer.",
          "Post idea: “I'd been looking for more natural, eco-friendly personal care products straight from the factory without paying sky-high prices. I just discovered a Korean platform that really impressed me with its quality, and I just placed my first order. When it arrives this week I'll tell you how it went!”",
        ],
      },
      {
        h: "Today's video",
        body: [
          "On CH.ATOMY Europe → Product menu, watch the video on HemoHIM or the Absolute/The Fame line to understand the Masstige philosophy: absolute quality at an absolute price.",
        ],
      },
    ],
    campos: [
      { key: "rec1", label: "Recommendation 1 — name and product" },
      { key: "rec2", label: "Recommendation 2 — name and product" },
      { key: "rec3", label: "Recommendation 3 — name and product" },
      { key: "rec4", label: "Recommendation 4 — name and product" },
      { key: "rec5", label: "Recommendation 5 — name and product" },
    ],
    checklist: [
      "I chose and bought my first personal-use products.",
      "I made my list of 5 friends/family members and the products that could help them.",
      "I posted my anticipation post/story on social media.",
      "I watched the video on Product/Masstige on CH.ATOMY Europe.",
    ],
    quiz: {
      pregunta: "How many wellness recommendations do you identify today?",
      opciones: ["3", "5", "10"],
      correcta: 1,
    },
  },
  {
    id: 4,
    etapa: "The Story",
    icono: "book-open",
    titulo: "The Art of Inviting (Storytelling)",
    objetivo: "Invite without pressure and share your personal story naturally.",
    contenido: [
      {
        h: "4-step script for your personal story",
        body: [
          "Step 1 — Your backstory: share your previous situation (financial, time, health) that the other person can relate to. E.g.: “I'd been feeling for a while that my monthly expenses kept rising while my income stayed the same...”",
          "Step 2 — The discovery: what caught your attention about Atomy. E.g.: “...until I discovered Atomy, a platform that lets me buy personal care and health products straight from the factory, with excellent quality and the chance to earn benefits by recommending what I already use.”",
          "Step 3 — Your first results or feelings. E.g.: “I started trying the products at home and we all loved the quality; it excited me to see I could build extra income without neglecting my job.”",
          "Step 4 — Your vision or invitation, no pressure. E.g.: “My goal is financial peace of mind for my family. I don't know if this is for you, but I'd love to share how it works in case it's useful.”",
          "3-minute summary formula: put the 4 answers together and read them out loud to check it sounds like a real conversation, not a corporate script.",
        ],
      },
      {
        h: "Sincere connection script (close market)",
        body: [
          "Message 1 — Break the ice: “Hi [Name]! How are you? It's been a while since we caught up...” Just reconnect, without mentioning the project yet.",
          "Message 2 — Plant curiosity: mention, casually, that you changed how you buy everyday products for more eco-friendly, better-quality, direct-from-factory ones.",
          "Message 3 — The no-pressure hook: mention that the system also lets you earn financial benefits by recommending it, something a regular supermarket doesn't offer.",
          "Message 4 — The invitation: “I don't know if this is something for you, but if you're curious, let me know and we can grab a coffee or hop on a quick call and I'll tell you about it.”",
          "Duplication tip: practice your story in a 1-on-1 meeting with your sponsor and work together on any phrase that sounds too formal or corporate.",
        ],
      },
    ],
    campos: [
      { key: "hist1", label: "1. Your backstory (where were you?)" },
      { key: "hist2", label: "2. The discovery (what did you find in Atomy?)" },
      { key: "hist3", label: "3. Your first results or feelings" },
      { key: "hist4", label: "4. Your vision or invitation (where are you headed?)" },
    ],
    checklist: [
      "I put together my 3-minute personal story.",
      "I sorted my first 30 names in the List of 250.",
      "I made my first 5 sincere invitations.",
      "I watched at least one video about the Atomy Company.",
    ],
    quiz: {
      pregunta: "How many steps does your personal story (storytelling) have?",
      opciones: ["2", "4", "6"],
      correcta: 1,
    },
  },
  {
    id: 5,
    etapa: "The Direction",
    icono: "compass",
    titulo: "Weekly Action Plan",
    objetivo: "Organize your week sustainably, without overwhelm.",
    contenido: [
      {
        h: "Your sustainable work plan",
        body: [
          "The goal is for Atomy to fit into your life, not for your life to get complicated because of Atomy. Just 4 quick things today.",
          "30-day goal: a small, achievable goal for your first month. E.g.: “Try 3 products and sign up my first 2 consumers.”",
          "Your pockets of value: you don't need 8 hours a day. Find 3-4 free hours in your week (e.g. 30 min after work, or some time on the weekend) and block them on your calendar.",
          "Your weekly check-in: schedule a short, fixed 15-20 minute call with your mentor to review progress, resolve doubts, and adjust whatever's needed.",
          "15 minutes of daily learning: keep watching CH.ATOMY Europe content at your own pace, just as you've been doing since Day 1.",
          "💡 Tip: a steady 3-hour-a-week project delivers 100 times more results than a one-day marathon. Do it at your own pace.",
        ],
      },
    ],
    campos: [
      { key: "meta30", label: "30-day goal" },
      { key: "horas", label: "Hours blocked for the project (day and time)" },
      { key: "llamada", label: "Day and time of your weekly call with your mentor" },
    ],
    checklist: [
      "I defined my 30-day goal.",
      "I blocked my weekly working hours.",
      "I set up my weekly call with my mentor.",
      "I watched 1 Company video on CH.ATOMY Europe.",
    ],
    quiz: {
      pregunta: "What do you schedule today with your mentor?",
      opciones: ["A mandatory daily meeting", "A short weekly 15-20 min call", "Nothing, it's not necessary"],
      correcta: 1,
    },
  },
  {
    id: 6,
    etapa: "The Impact",
    icono: "trending-up",
    titulo: "Ethical Leadership and Duplication",
    objetivo: "Close your first week on solid footing, ready to duplicate.",
    contenido: [
      {
        h: "Ethical commitment",
        body: [
          "Working with Atomy is grounded in total respect for the consumer: zero pressure, zero deception, and total consistency by using what we recommend.",
        ],
      },
      {
        h: "Monthly review date",
        body: [
          "Set a day each month, starting now, to review how your team is growing, what's working, and adjust course together if any roadblock comes up.",
        ],
      },
      {
        h: "Learn to duplicate",
        body: [
          "Don't keep this 6-day process to yourself: when you sign up your first partner, walk them through this exact same start.",
        ],
      },
      {
        h: "Your closing video",
        body: [
          "On CH.ATOMY Europe → Company menu, look for a video on Atomy Culture or Founder Han-Gill Park's Philosophy: honesty and customer service.",
          "With this you complete your first training week! We're not aiming to sell desperately, but to educate a satisfied consumer and help others reach their goals honestly.",
        ],
      },
    ],
    campos: [],
    checklist: [
      "I embraced the ethical commitment: zero pressure, total transparency, consistency by consuming what I recommend.",
      "I marked a day each month on my calendar to review my team.",
      "I have this 6-day plan on hand to guide my first partner.",
      "I watched a video on Atomy Culture or the Founder's Philosophy.",
    ],
    quiz: {
      pregunta: "What is one of the 3 pillars of the ethical commitment?",
      opciones: ["Sell fast without explaining", "Zero pressure and total transparency", "Pressure the consumer"],
      correcta: 1,
    },
  },
];

const QUINCENAS = [
  { n: 1, nombre: "Foundations", semanas: "1-2", foco: "Foundation-building and personal testimonial", detalle: "100,000 PV · first 50 contacts · 1 testimonial" },
  { n: 2, nombre: "First Push", semanas: "3-4", foco: "Invitation activation", detalle: "200,000 PV · 10 calls · 10 new partners" },
  { n: 3, nombre: "Steady Step", semanas: "5-6", foco: "Consolidation and 48h follow-up", detalle: "300,000 PV · rigorous follow-up with prospects" },
  { n: 4, nombre: "Guide Council", semanas: "7-8", foco: "Network consulting", detalle: "Meeting with sponsor · identify 2+2 leaders" },
  { n: 5, nombre: "The Great Duplication", semanas: "9-10", foco: "Duplication and adjustment", detalle: "Evaluate organization · ramp up social media" },
  { n: 6, nombre: "Final Ascent", semanas: "11-12", foco: "Qualifying for Sales Master", detalle: "5,000,000 Group PV per line" },
];

/* Weekly checklist for the 90 days (official verification table).
   Each week belongs to a fortnight (q) and carries its own
   "key actions" drawn from the chronological plan. */
const SEMANAS = [
  {
    n: 1, q: 1, metaPV: "100,000 PV", metaContactos: "10 added to the list", paso: "Steps 1 and 2: Goals and Determination",
    acciones: [
      "Accumulate at least 100,000 Personal PV by trying key products.",
      "Register and organize the first 50 names in the List of 250 Contacts.",
      "Attend the One Day Seminar and connect to the events system.",
      "Attend the team's Zoom trainings.",
    ],
  },
  {
    n: 2, q: 1, metaPV: "100,000 PV", metaContactos: "15 added to the list", paso: "Step 3: List of 250 Contacts",
    acciones: [
      "Record or write 1 personal product testimonial.",
      "Sign up 5 new partners (I'll ask my sponsor for help with this step).",
      "Register the first partners in the Left and Right lines.",
      "Guide new partners to complete the 6-Day Startup module.",
      "Follow up rigorously within 48 hours with everyone who was presented to.",
    ],
  },
  {
    n: 3, q: 2, metaPV: "200,000 PV", metaContactos: "10 Calls / Presentations", paso: "Steps 4 and 5: Calls and Business Presentation",
    acciones: [
      "Reach 200,000 Personal PV by switching where I shop for household consumption.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 4, q: 2, metaPV: "200,000 PV", metaContactos: "10 Calls / Presentations", paso: "Steps 4 and 5: Calls and Business Presentation",
    acciones: [
      "Reach 200,000 Personal PV by switching where I shop for household consumption.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 5, q: 3, metaPV: "300,000 PV", metaContactos: "48-Hour Follow-up", paso: "Step 6: Solid Follow-up",
    acciones: [
      "Complete the 300,000 Personal PV to maximize commission earnings.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 6, q: 3, metaPV: "300,000 PV", metaContactos: "Consumption consolidation", paso: "Step 7: Mentor Consulting",
    acciones: [
      "Make sure each active line has at least 4 recurring consumers.",
      "Identify 4 leaders in my structure: 2 on each line.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 7, q: 4, metaPV: "300,000 PV", metaContactos: "2 new partners guided", paso: "Step 8: Base Duplication",
    acciones: [
      "Meet with my sponsor to review the PV balance between the left and right lines.",
      "Train the 4 leaders identified in my downlines.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 8, q: 4, metaPV: "300,000 PV", metaContactos: "Organize mini Zoom/meeting", paso: "Steps 5 and 8: Presentation and Impact",
    acciones: [
      "Organize a small home meeting or group Zoom to support downline partners.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 9, q: 5, metaPV: "300,000 PV", metaContactos: "Group volume review", paso: "Step 7: Network Consulting",
    acciones: [
      "Evaluate the organization map: make sure committed partners are duplicating the simple presentations.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 10, q: 5, metaPV: "300,000 PV", metaContactos: "Alignment with key leaders", paso: "Steps 1 and 2: Reaffirm Commitment",
    acciones: [
      "Increase social media interactions to keep the contact list active.",
      "Plan strategic purchasing and volume projection for the Sales Master qualification cycle.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 11, q: 6, metaPV: "300,000 PV+", metaContactos: "Active fortnight close-out", paso: "Executing Your Rank Strategy",
    acciones: [
      "Coordinate collective consumption with the team to reach 2,500,000 GPV on the left line and 2,500,000 GPV on the right line.",
      "Assign strategic personal purchases to the line with lower volume, following company rules.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
  {
    n: 12, q: 6, metaPV: "700,000 Personal PV", metaContactos: "2.5M GPV Left / 2.5M GPV Right", paso: "SALES MASTER ACHIEVED!",
    acciones: [
      "Celebrate reaching Mastery, build teamwork, and prepare for the next growth cycle.",
      "Make at least 10 invitation calls or messages applying the own-mind rule.",
      "Sign up 10 new partners.",
      "Help place these partners in the Left and Right lines (I'll ask my sponsor for help with this step).",
      "Guide new partners to complete the 6-Day Startup module.",
    ],
  },
];

const CONTACTO_NIVELES = ["Hot", "Warm", "Cold"];
const CONTACTO_ESTADOS = ["To contact", "Contacted", "Presented", "Follow-up", "Partner", "Consumer", "Discarded"];

const PREMIOS_DEFECTO = [
  { hito: "Reach 300,000 PPV", premio: "Set of 4 Steps gift", imagen: null },
  { hito: "2 cycles of 300,000 GPV in one pay period", premio: "Gold nourishing cream", imagen: null },
  { hito: "Sales Master in 45 days", premio: "FAME Set", imagen: null },
];

const RANGOS = [
  { nombre: "Conscious Consumer", meta: "Your starting point", pv: "0 PPV", tier: 1 },
  { nombre: "Atomy Member", meta: "10,000 personal PV", pv: "10,000 PPV", tier: 1 },
  { nombre: "Agent", meta: "300,000 personal PV", pv: "300,000 PPV", tier: 2 },
  { nombre: "Special Agent", meta: "700,000 personal PV", pv: "700,000 PPV", tier: 2 },
  { nombre: "Sales Master", meta: "700,000 personal PV + 2,500,000 PV on each leg", pv: "5,000,000 GPV", tier: 3 },
];

const MENSAJE_BIENVENIDA =
  "Welcome to this journey to success. It's designed for you to enjoy the ride, share your progress, and ask about any doubts or difficulties you run into. Let's go!";
