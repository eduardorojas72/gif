/* ---------------------------------------------------------------
   CONTENU — Les 8 Étapes, le Plan de 6 Jours, le Plan de 90 Jours
--------------------------------------------------------------- */

const OCHO_PASOS = [
  {
    n: 1, t: "Fixer des buts et des objectifs (MBO)", d: "Conçois ta « vie équilibrée » : bien vivre, aimer, apprendre et contribuer.", icon: "target",
    accion: "Écrire ton Scénario de Vie", objetivo: "Clarté de vision et de but",
    explicacion: "Une vie équilibrée chez Atomy se divise en quatre piliers : Bien vivre (besoins physiques et financiers), Aimer (relations et famille), Apprendre (intellect et croissance) et Contribuer (engagement social et spiritualité). Les objectifs doivent être réalistes mais ambitieux, écrits clairement et accompagnés d'échéances.",
    ejemplo: "Il ne suffit pas de dire « je veux une maison ». Tu dois préciser : « Je vivrai dans une maison de 200 m² au nord de [lieu], avec 4 chambres, peinte en blanc avec des finitions en bois, avant le [date]. » Un autre exemple consiste à fixer un montant précis d'aide pour tes parents, comme leur envoyer une somme d'argent définie chaque mois avec des compléments de l'entreprise.",
  },
  {
    n: 2, t: "Avoir une détermination inébranlable", d: "Indépendance face aux autres, pensée positive et volonté de payer le prix de l'effort.", icon: "flame",
    accion: "Décider de payer le prix", objetivo: "Résilience face aux obstacles",
    explicacion: "La détermination repose sur trois aspects : une attitude proactive (être le propriétaire de son entreprise), des pensées positives (se concentrer sur la solution) et la volonté de « payer le prix ». Rien de valeur ne s'obtient sans effort initial. La « loi du décollage » dit qu'une fusée consomme la majeure partie de son carburant au départ pour vaincre la gravité ; il en va de même en affaires.",
    ejemplo: "Si un proche refuse ta proposition, ta détermination doit te permettre d'avancer sans que cela n'affecte ton moral. Cela implique aussi de sacrifier des heures de loisir pour assister au « One Day Seminar » ou à l'Académie du Succès, en comprenant que ce temps est un investissement pour ta liberté future.",
  },
  {
    n: 3, t: "Constituer une liste de contacts", d: "Construis une liste active d'au moins 250 personnes, sans juger leur potentiel initial.", icon: "clipboard-list",
    accion: "Noter tout le monde, sans juger", objetivo: "Identifier ton capital humain",
    explicacion: "L'erreur courante est de « préjuger ». La Loi du Libre Arbitre dit que nous devons seulement informer — la décision de leur intérêt leur appartient. Ta liste doit inclure toutes les personnes que tu connais, puisque tout le monde utilise des produits d'hygiène ou de cosmétique. Ne cherche pas seulement des « vendeurs », cherche des consommateurs.",
    ejemplo: "Prends ton téléphone et note tout le monde : famille, anciens camarades de classe, voisins, amis de la salle de sport. Si tu connais quelqu'un que tu crois « sans argent », note-le quand même — il pourrait avoir besoin de cette opportunité. Si tu connais quelqu'un de « très riche », note-le aussi — il pourrait vouloir améliorer sa santé avec des produits de qualité absolue.",
  },
  {
    n: 4, t: "Passer des appels et lancer des invitations", d: "Centrées sur la prise de rendez-vous et la curiosité sincère, pas sur la présentation par téléphone.", icon: "phone-call",
    accion: "Appels quotidiens constants", objetivo: "Fixer des rendez-vous et des présentations",
    explicacion: "L'invitation n'est pas la présentation de l'entreprise. C'est le processus qui consiste à susciter la curiosité et à obtenir un rendez-vous. Le Président Park insiste sur l'importance de la constance : si tu parles à 10 personnes par jour, ton entreprise grandira inévitablement. La brièveté est ton meilleur allié ici.",
    ejemplo: "Un appel efficace pourrait ressembler à ceci : « Salut, j'ai trouvé une gamme de produits coréens d'excellente qualité que j'utilise et que j'adore — peut-on se voir 15 minutes le [jour] pour que tu les essaies ? » Évite de donner trop d'informations par téléphone pour ne pas submerger la personne.",
  },
  {
    n: 5, t: "Expliquer l'entreprise (Show the Business)", d: "Entreprise, Produits, Plan de Rémunération et Vision Globale.", icon: "presentation",
    accion: "Show the Plan (STP)", objetivo: "Présenter l'opportunité Atomy",
    explicacion: "La présentation doit couvrir quatre points : L'Entreprise (soutenue par KAERI et Kolmar BNH), Les Produits (le concept « Masstige » : Masse + Prestige, ainsi que Qualité Absolue, Prix Absolu), le Plan de Rémunération (système binaire, sans frais d'inscription ni achats obligatoires) et la Philosophie et le Système (centrés sur la réussite du consommateur et le système de formation gratuit).",
    ejemplo: "Faire une démonstration du dentifrice et de la brosse à dents pendant la présentation. Montrer que le prix au gramme des produits Atomy est inférieur à celui des marques de supermarché, en soulignant l'économie pour le foyer tout en obtenant une qualité supérieure.",
  },
  {
    n: 6, t: "Assurer le suivi (la règle des 48 heures)", d: "Contacte le prospect dans les 48 heures qui suivent la présentation.", icon: "clock",
    accion: "Contact dans les 48 heures", objetivo: "Fidélisation et service client",
    explicacion: "La règle des 48 heures doit être appliquée : contacte la personne dans les deux jours suivant la présentation ou la livraison d'un produit. C'est le moment de répondre aux questions, de gérer les objections et de guider le nouveau membre dans ses premiers pas.",
    ejemplo: "Appelle quelqu'un qui a acheté la routine de soin de la peau et demande-lui : « Comment as-tu trouvé la texture de la crème nourrissante hier soir ? » Si la personne dit qu'elle n'a pas eu le temps de l'utiliser, rappelle-lui les bienfaits et fixe un nouvel appel court pour le lendemain.",
  },
  {
    n: 7, t: "Obtenir des conseils et un accompagnement", d: "Rencontre ta ligne ascendante et descendante pour analyser les blocages et te réajuster.", icon: "users",
    accion: "Diagnostic avec ton Parrain", objetivo: "Correction de stratégie",
    explicacion: "Un diagnostic basé sur les faits doit être réalisé. Si un partenaire ne progresse pas, il faut analyser laquelle des étapes précédentes fait défaut. L'accompagnement doit être constructif, orienté vers les objectifs et jamais fondé sur la critique personnelle.",
    ejemplo: "Si un partenaire dit « je ne connais personne », le parrain doit s'asseoir avec lui pour revoir sa liste de contacts et l'aider à l'élargir. Si le partenaire a beaucoup de contacts mais que personne n'achète, le parrain doit revoir comment se déroule « l'Explication de l'Entreprise » pour ajuster le message.",
  },
  {
    n: 8, t: "Se dupliquer", d: "Sois un modèle intègre : consommateur fidèle, connecté au système d'événements, servant avec humilité.", icon: "repeat",
    accion: "Être l'exemple à suivre", objetivo: "Croissance exponentielle",
    explicacion: "Se dupliquer ne consiste pas simplement à « copier » la personnalité d'un leader. C'est devenir un modèle (l'original) que d'autres pourront facilement reproduire. Si tu suis le système, tes partenaires feront de même. Pour qu'une entreprise soit évolutive, le processus doit être simple et standardisé.",
    ejemplo: "Si tu veux que ton équipe assiste aux séminaires, tu dois être le premier arrivé et le dernier parti. Si tu veux qu'elle consomme les produits, tu dois être un consommateur fidèle de toute la gamme Atomy. Ton comportement est le moule dont sortiront les futures copies de ton organisation.",
  },
];

const LEMA_ATOMY = {
  intro: "La Devise d'Atomy n'est pas simplement un ensemble de mots motivants, mais le socle philosophique et spirituel sur lequel repose toute la vision, la gestion et la culture organisationnelle de l'entreprise. Formulée par le Président Han-Gill Park, elle établit le cadre éthique qui doit guider la conduite des personnes, tant en affaires que dans leur vie quotidienne.",
  exclamacion: "Chérir l'âme ! Créer la vision ! Suivre la foi ! Servir avec humilité ! Allons, allons, allons !",
  pilares: [
    {
      n: 1, t: "Chérir l'âme", sub: "", icon: "heart",
      explicacion: "L'être humain est la création la plus précieuse de Dieu. Les personnes ne doivent jamais être utilisées comme un moyen d'atteindre une fin économique ou commerciale — les personnes sont une fin en elles-mêmes. Chez Atomy, la priorité absolue est le bien-être, l'épanouissement et la réussite de l'être humain, avant l'intérêt de l'entreprise.",
    },
    {
      n: 2, t: "Créer la vision", sub: "", icon: "eye",
      explicacion: "L'avenir n'est pas quelque chose que l'on attend simplement, mais une réalité qui se conçoit activement dans l'esprit. Celui qui visualise clairement et en détail son Scénario de Vie peut orienter ses pensées et ses actions quotidiennes pour transformer sa réalité et atteindre ses objectifs.",
    },
    {
      n: 3, t: "Suivre la foi", sub: "", icon: "compass",
      explicacion: "La vraie foi consiste à croire fermement en ce qui n'est pas encore visible. Conserver une foi inébranlable dans la vision que tu as conçue te permet de surmonter le doute, les obstacles inévitables et le scepticisme extérieur, avec persévérance et conviction.",
    },
    {
      n: 4, t: "Servir avec humilité", sub: "", icon: "users",
      explicacion: "L'attitude est la qualité de leadership la plus importante. Quels que soient tes objectifs ou tes réussites, ta posture personnelle doit toujours être humble : servir les autres avec respect, garder un esprit disposé à apprendre et faire passer le bien-être de l'équipe avant l'ego personnel.",
    },
  ],
};

const DIAS = [
  {
    id: 1,
    etapa: "La Vision",
    icono: "eye",
    titulo: "Définis ton « Pourquoi »",
    objetivo: "Renoue avec ta motivation profonde et comprends la Consommation Consciente.",
    contenido: [
      {
        h: "La Réflexion en 3 Niveaux",
        body: [
          "Réponds à ces trois questions dans un carnet personnel, en allant de plus en plus loin :",
          "Niveau superficiel (le matériel) : que veux-tu accomplir financièrement ? Exemple : rembourser des dettes, gagner 1 000 € de plus par mois, changer de voiture.",
          "Niveau personnel (le style de vie) : si l'argent n'était plus un problème, comment ton quotidien changerait-il ? Exemple : travailler depuis chez toi, n'avoir aucun patron, voyager deux fois par an.",
          "Niveau émotionnel (la cause profonde) : à qui cela profite-t-il et que ressens-tu ? Exemple : être présent pendant l'enfance de mes enfants, rassurer mes parents, ne plus ressentir d'anxiété en fin de mois.",
          "💡 Ta tâche du jour : résume ces 3 réponses en une seule phrase, écris-la où tu la verras chaque jour, et partage-la avec ton parrain.",
        ],
      },
      {
        h: "Écris ton Scénario de Vie",
        body: [
          "Dessine 4 cadrans et écris un objectif concret, au présent, pour chaque pilier :",
          "Bien vivre (santé, foyer, finances) : ex. « En décembre 2026, j'aurai remboursé ma carte de crédit et rénové ma cuisine. »",
          "Aimer (famille et proches) : ex. « Avoir tous mes week-ends libres, sans souci de travail, pour les passer avec mes enfants. »",
          "Apprendre (épanouissement personnel) : ex. « Regarder 1 vidéo de CH.ATOMY par jour et vaincre ma peur de parler en public avant la fin de l'année. »",
          "Contribuer (impact et héritage) : ex. « Reverser 5 % de mes commissions mensuelles à un restaurant social local. »",
          "Exercice de 10 minutes : choisis 1 exemple pour chaque pilier et note-le avec une date indicative.",
        ],
      },
      {
        h: "Découvre la Vision d'Atomy (CH.ATOMY Europe)",
        body: [
          "Rends-toi sur ch.atomy.com/eu depuis ton navigateur ou ton téléphone et passe la langue en français grâce à l'icône du globe (en haut à droite).",
          "Explore les menus : Entreprise/Vision (l'histoire du fondateur Han-Gill Park et le soutien scientifique de KAERI et Kolmar), Produit (soins de la peau, santé, maison), Business/Formation (plan de rémunération, séminaires) et Membre/Témoignages (témoignages réels).",
          "Utilise la loupe de recherche pour des sujets précis, par exemple « HemoHIM » ou « Plan de Rémunération ».",
          "Recommandation : consacre 15 minutes par jour à regarder 1 vidéo Entreprise et 1 vidéo Produit.",
        ],
      },
      {
        h: "Consommation Consciente : d'une dépense qui s'envole à une dépense qui revient",
        body: [
          "On nous a toujours appris une consommation automatique : acheter des produits d'hygiène chaque mois, payer l'addition et rentrer chez soi le portefeuille vide, sans aucun bénéfice.",
          "Chez Atomy, chaque achat quotidien (dentifrice, shampoing, lessive, compléments) se transforme en Points de Valeur (PV) qui n'expirent jamais et s'accumulent en ta faveur.",
          "Il ne s'agit pas de dépenser plus ni d'acheter des choses inutiles : il s'agit de changer où tu achètes ce que tu achètes déjà, toujours.",
          "Les revenus que tu construis grâce aux commissions sont transmissibles sur trois générations : aujourd'hui, ils t'offrent un répit financier, et avec le temps, ils deviennent un patrimoine pour tes enfants et petits-enfants.",
        ],
      },
    ],
    campos: [{ key: "porque", label: "Ton « Pourquoi » en une phrase" }],
    checklist: [
      "J'ai défini mes 3 raisons principales (mon « Pourquoi »).",
      "J'ai consulté le catalogue et identifié mes premiers produits à remplacer à la maison.",
      "J'ai regardé la présentation officielle de la vision d'Atomy.",
      "J'ai regardé au moins une vidéo sur l'entreprise Atomy.",
    ],
    quiz: {
      pregunta: "En quoi se transforment tes achats quotidiens chez Atomy ?",
      opciones: ["En dépenses qui ne reviennent jamais", "En Points de Valeur (PV) qui n'expirent jamais", "En une remise temporaire"],
      correcta: 1,
    },
  },
  {
    id: 2,
    etapa: "L'Équipe",
    icono: "users",
    titulo: "Le Plan de Rémunération et le Binaire",
    objetivo: "Comprendre comment une consommation coordonnée sur deux lignes génère une prospérité financière.",
    contenido: [
      {
        h: "Ton adhésion est 100 % gratuite",
        body: [
          "Rejoindre Atomy ne coûte rien : aucun frais d'inscription, aucune cotisation mensuelle ou annuelle, et jamais d'achats obligatoires pour garder ton compte actif.",
          "La seule chose que tu fais, c'est changer où tu achètes les produits du quotidien que tu achètes déjà toujours — le reste du système (activation, commissions, rangs) repose sur cette consommation, pas sur des paiements supplémentaires.",
        ],
      },
      {
        h: "Ton premier grand palier : 10 000 PV Personnels (PVP)",
        body: [
          "Les PV (Points de Valeur) représentent la valeur que l'entreprise attribue à chaque produit ; tu les vois en bleu sous le prix, dans la boutique en ligne.",
          "Avec seulement deux produits de base du quotidien (ex. un kit de soin bucco-dentaire et un shampoing), tu atteins déjà les 10 000 PVP.",
          "Atteindre les 10 000 PVP est la clé qui active ton compte de partenaire : à partir de là, ton profil est habilité à accumuler du volume d'équipe et à percevoir des commissions.",
        ],
      },
      {
        h: "Ton équipe binaire : Ligne Gauche et Ligne Droite",
        body: [
          "Tu ne travailles pas seul : avec l'aide de ton parrain, tu construis ta structure sur deux lignes de consommation, Gauche et Droite, avec une profondeur illimitée (peu importe le nombre de niveaux que chaque ligne développe).",
          "Chaque fois que les personnes de ton équipe achètent pour leur foyer, elles génèrent des PV de Groupe (PVG).",
          "Un « Cycle » se produit lorsque ta ligne gauche et ta ligne droite accumulent chacune 300 000 PVG : le système effectue un « match » et l'entreprise verse une commission directement sur ton compte bancaire.",
        ],
      },
      {
        h: "Pourquoi le vrai objectif est 300 000 PVP — tu gagnes le triple !",
        body: [
          "Avec 10 000 PVP, tu es déjà payé lorsque tes équipes atteignent 300 000 PVG de chaque côté : une commission de base d'environ 15-20 € par cycle.",
          "Une fois que tu atteins personnellement 300 000 PVP, tu gagnes le TRIPLE pour exactement le même travail d'équipe : environ 50-60 € par cycle.",
          "Tes PVP ne s'effacent JAMAIS et ne se réinitialisent JAMAIS : chaque achat pour ta maison s'ajoute à vie aux précédents. Il n'y a ni urgence ni pression.",
          "Résumé : 1) passe ta première commande pour atteindre 10 000 PVP et activer ton compte ; 2) continue à transférer tes achats du quotidien vers Atomy à ton rythme jusqu'à 300 000 PVP pendant que tes lignes se développent ; 3) profite de commissions multipliées par trois.",
        ],
      },
      {
        h: "PV Personnels vs. PV de Groupe",
        body: [
          "PV Personnels : tu les génères toi-même en achetant avec ton identifiant. Ils ne s'effacent jamais. Ils activent ton compte et déterminent ton niveau de commission par cycle.",
          "PV de Groupe : générés par ton équipe (lignes Gauche et Droite). Ils se réinitialisent uniquement après le versement d'une commission. Ils additionnent la consommation collective pour régler les commissions.",
        ],
      },
      {
        h: "Le chemin complet jusqu'à Sales Master",
        body: [
          "Ta progression personnelle avance par paliers de PV qui ne se perdent jamais : 10 000 PVP active ton compte, 300 000 PVP te donne le rang d'Agent, et 700 000 PVP te donne le rang d'Agent Spécial.",
          "Sales Master — l'objectif de ton Plan de 90 Jours — s'atteint lorsque, en plus de tes 700 000 PVP, ta ligne Gauche et ta ligne Droite accumulent chacune 2 500 000 PVG au cours de la même quinzaine de qualification.",
          "Ce parcours Cumbre 90 t'y mène exactement. Les rangs au-dessus de Sales Master (Diamond Master et au-delà) sortent du cadre de ces 90 jours, mais tu auras alors déjà l'habitude et l'équipe pour continuer à progresser.",
        ],
      },
    ],
    campos: [],
    nota: "Retiens tes deux grands paliers : 10 000 PVP (active ton compte) et 300 000 PVP (triple ta commission par cycle). Tes PV personnels ne s'effacent ni ne se réinitialisent jamais.",
    checklist: [
      "J'ai compris l'importance d'atteindre d'abord 10 000 PV, puis de viser 300 000 PV personnels.",
      "J'ai compris le fonctionnement de l'équilibre binaire (Gauche / Droite).",
      "J'ai choisi mes 4 premiers produits préférés.",
      "J'ai regardé au moins une vidéo sur le Plan de Rémunération.",
    ],
    quiz: {
      pregunta: "Quel est ton premier grand palier pour activer ton compte ?",
      opciones: ["300 000 PV de Groupe", "10 000 PV Personnels", "50 nouveaux contacts"],
      correcta: 1,
    },
  },
  {
    id: 3,
    etapa: "Le Produit",
    icono: "package",
    titulo: "De l'Expérience à la Recommandation",
    objetivo: "Tombe sous le charme des produits et partage des recommandations sincères, sans pression.",
    contenido: [
      {
        h: "De la théorie à l'expérience réelle",
        body: [
          "Chez Atomy, on ne recommande pas « à l'aveugle » : on le fait en toute honnêteté, à partir de sa propre expérience de consommateur. Aujourd'hui, il est temps de te lancer.",
        ],
      },
      {
        h: "Choisis ta première commande (ta consommation consciente)",
        body: [
          "Choisis les produits que tu dois vraiment renouveler à la maison dès aujourd'hui (dentifrice, shampoing, lessive, compléments). L'objectif est simple : tester la qualité de la marque pour pouvoir en parler avec autorité dès le premier jour.",
          "Pour cela, rends-toi sur le site et connecte-toi avec ton identifiant et ton mot de passe.",
        ],
      },
      {
        h: "Liste de 5 recommandations bien-être",
        body: [
          "Pense à 5 personnes proches et à leurs besoins : quelqu'un a-t-il la peau sensible ? quelqu'un de fatigué qui veut renforcer son système immunitaire ? quelqu'un qui préfère des produits écologiques pour la maison ?",
          "Note dans ton carnet [Nom] + [Produit qui pourrait l'aider]. Exemple : Marie → fatigue / système immunitaire → HemoHIM. Charles → hygiène quotidienne du visage → gamme Skincare.",
          "Ne leur vends encore rien : identifie simplement comment le catalogue peut leur apporter de la valeur.",
        ],
      },
      {
        h: "Crée de l'attente sur les réseaux sociaux",
        body: [
          "Crée de l'attente naturellement sur tes réseaux sociaux ou dans tes statuts WhatsApp, sans rien vendre, en partageant simplement ta curiosité de consommateur.",
          "Idée de publication : « Je cherchais depuis un moment des produits d'hygiène plus naturels, écologiques et vendus directement à la sortie d'usine, sans payer des prix exorbitants. Je viens de découvrir une plateforme coréenne qui m'a énormément surpris par sa qualité, et je viens de passer ma première commande. Quand elle arrivera cette semaine, je vous raconte ! »",
        ],
      },
      {
        h: "Ta vidéo du jour",
        body: [
          "Sur CH.ATOMY Europe → menu Produit, regarde la vidéo sur HemoHIM ou sur la gamme Absolute/The Fame pour comprendre la philosophie Masstige : qualité absolue à prix absolu.",
        ],
      },
    ],
    campos: [
      { key: "rec1", label: "Recommandation 1 — nom et produit" },
      { key: "rec2", label: "Recommandation 2 — nom et produit" },
      { key: "rec3", label: "Recommandation 3 — nom et produit" },
      { key: "rec4", label: "Recommandation 4 — nom et produit" },
      { key: "rec5", label: "Recommandation 5 — nom et produit" },
    ],
    checklist: [
      "J'ai choisi et acheté mes premiers produits d'usage personnel.",
      "J'ai fait ma liste de 5 amis/proches et des produits qui pourraient les aider.",
      "J'ai publié mon post/story d'anticipation sur les réseaux sociaux.",
      "J'ai regardé la vidéo sur le Produit/Masstige sur CH.ATOMY Europe.",
    ],
    quiz: {
      pregunta: "Combien de recommandations bien-être identifies-tu aujourd'hui ?",
      opciones: ["3", "5", "10"],
      correcta: 1,
    },
  },
  {
    id: 4,
    etapa: "Le Récit",
    icono: "book-open",
    titulo: "L'Art d'Inviter (Storytelling)",
    objetivo: "Invite sans pression et partage ton histoire personnelle avec naturel.",
    contenido: [
      {
        h: "Script en 4 étapes pour ton histoire personnelle",
        body: [
          "Étape 1 — Ton point de départ : partage ta situation antérieure (financière, de temps, de santé) à laquelle l'autre personne peut s'identifier. Ex. : « Depuis un moment, j'avais l'impression que mes dépenses du mois augmentaient alors que mes revenus restaient les mêmes... »",
          "Étape 2 — La découverte : ce qui a attiré ton attention chez Atomy. Ex. : « ...jusqu'à ce que je découvre Atomy, une plateforme qui me permet d'acheter des produits d'hygiène et de santé directement à la sortie d'usine, avec une excellente qualité et la possibilité de gagner des revenus en recommandant ce que j'utilise déjà. »",
          "Étape 3 — Tes premiers résultats ou ressentis. Ex. : « J'ai commencé à essayer les produits à la maison et nous avons tous adoré la qualité ; ça m'a rendu heureux de voir que je pouvais construire un revenu supplémentaire sans négliger mon travail. »",
          "Étape 4 — Ta vision ou ton invitation, sans pression. Ex. : « Mon objectif est la tranquillité financière pour ma famille. Je ne sais pas si c'est pour toi, mais j'aimerais te partager comment ça fonctionne, au cas où ça pourrait t'être utile. »",
          "Formule résumée en 3 minutes : rassemble les 4 réponses et lis-les à voix haute pour vérifier que ça sonne comme une vraie conversation, pas comme un script d'entreprise.",
        ],
      },
      {
        h: "Script de connexion sincère (marché proche)",
        body: [
          "Message 1 — Briser la glace : « Salut [Prénom] ! Comment vas-tu ? Ça fait longtemps qu'on ne s'est pas donné de nouvelles... » Reconnecte-toi simplement, sans encore mentionner le projet.",
          "Message 2 — Semer la curiosité : raconte, comme quelque chose du quotidien, que tu as changé ta façon d'acheter des produits du quotidien pour d'autres plus écologiques, de meilleure qualité et vendus directement à la sortie d'usine.",
          "Message 3 — L'accroche sans pression : mentionne que le système te permet aussi de générer des revenus en le recommandant, ce que le supermarché classique n'offre pas.",
          "Message 4 — L'invitation : « Je ne sais pas si c'est pour toi, mais si ça t'intrigue, préviens-moi et on prend un café ou on s'appelle rapidement pour que je t'explique de quoi il s'agit. »",
          "Conseil de duplication : entraîne-toi à raconter ton histoire lors d'un rendez-vous en tête-à-tête avec ton parrain et ajustez ensemble toute phrase qui sonne trop formelle ou trop « entreprise ».",
        ],
      },
    ],
    campos: [
      { key: "hist1", label: "1. Ton point de départ (où en étais-tu ?)" },
      { key: "hist2", label: "2. La découverte (qu'as-tu trouvé chez Atomy ?)" },
      { key: "hist3", label: "3. Tes premiers résultats ou ressentis" },
      { key: "hist4", label: "4. Ta vision ou ton invitation (vers où vas-tu ?)" },
    ],
    checklist: [
      "J'ai construit mon histoire personnelle de 3 minutes.",
      "J'ai classé mes 30 premiers noms dans la Liste de 250.",
      "J'ai fait mes 5 premières invitations sincères.",
      "J'ai regardé au moins une vidéo sur l'entreprise Atomy.",
    ],
    quiz: {
      pregunta: "Combien d'étapes comporte ton histoire personnelle (storytelling) ?",
      opciones: ["2", "4", "6"],
      correcta: 1,
    },
  },
  {
    id: 5,
    etapa: "La Direction",
    icono: "compass",
    titulo: "Plan d'Action Hebdomadaire",
    objetivo: "Organise ta semaine de façon durable, sans te surcharger.",
    contenido: [
      {
        h: "Ton plan de travail durable",
        body: [
          "L'objectif est que Atomy s'adapte à ta vie, et non que ta vie se complique à cause d'Atomy. Il n'y a que 4 petites choses rapides aujourd'hui.",
          "Objectif à 30 jours : un objectif modeste et atteignable pour ton premier mois. Ex. : « Essayer 3 produits et inscrire mes 2 premiers consommateurs. »",
          "Tes créneaux de valeur : tu n'as pas besoin de 8 heures par jour. Trouve 3 à 4 heures libres dans ta semaine (ex. 30 min en sortant du travail ou un moment le week-end) et bloque-les dans ton agenda.",
          "Ton rendez-vous hebdomadaire : planifie un appel court et fixe de 15-20 minutes avec ton mentor pour faire le point, répondre à tes questions et ajuster ce qui est nécessaire.",
          "15 minutes d'apprentissage par jour : continue à regarder le contenu de CH.ATOMY Europe à ton rythme, comme tu le fais déjà depuis le Jour 1.",
          "💡 Conseil : un projet constant de 3 heures par semaine donne 100 fois plus de résultats qu'un marathon d'une seule journée. Fais-le à ton rythme.",
        ],
      },
    ],
    campos: [
      { key: "meta30", label: "Objectif à 30 jours" },
      { key: "horas", label: "Heures bloquées pour le projet (jour et heure)" },
      { key: "llamada", label: "Jour et heure de ton appel hebdomadaire avec ton mentor" },
    ],
    checklist: [
      "J'ai défini mon objectif à 30 jours.",
      "J'ai bloqué mes heures de travail hebdomadaires.",
      "J'ai fixé mon appel hebdomadaire avec mon mentor.",
      "J'ai regardé 1 vidéo de l'Entreprise sur CH.ATOMY Europe.",
    ],
    quiz: {
      pregunta: "Que planifies-tu aujourd'hui avec ton mentor ?",
      opciones: ["Une réunion quotidienne obligatoire", "Un court appel hebdomadaire de 15-20 min", "Rien, ce n'est pas nécessaire"],
      correcta: 1,
    },
  },
  {
    id: 6,
    etapa: "L'Impact",
    icono: "trending-up",
    titulo: "Leadership Éthique et Duplication",
    objetivo: "Termine ta première semaine sur des bases solides, prêt à te dupliquer.",
    contenido: [
      {
        h: "Engagement éthique",
        body: [
          "Travailler avec Atomy repose sur un respect total du consommateur : zéro pression, zéro tromperie et une cohérence totale en utilisant ce que nous recommandons.",
        ],
      },
      {
        h: "Date de bilan mensuel",
        body: [
          "Fixe dès maintenant un jour par mois pour faire le point sur la croissance de ton équipe, ce qui fonctionne, et ajuster ensemble le cap si un blocage survient.",
        ],
      },
      {
        h: "Apprends à te dupliquer",
        body: [
          "Ne garde pas ce processus de 6 jours pour toi seul : quand tu inscris ton premier partenaire, accompagne-le exactement dans ce même parcours de démarrage.",
        ],
      },
      {
        h: "Ta vidéo de clôture",
        body: [
          "Sur CH.ATOMY Europe → menu Entreprise, cherche une vidéo sur la Culture Atomy ou la Philosophie du Fondateur Han-Gill Park : honnêteté et service client.",
          "Avec ceci, tu termines ta première semaine de formation ! Nous ne cherchons pas à vendre à tout prix, mais à éduquer un consommateur satisfait et à accompagner d'autres personnes vers leurs objectifs, en toute honnêteté.",
        ],
      },
    ],
    campos: [],
    checklist: [
      "J'ai adopté l'engagement éthique : zéro pression, transparence totale, cohérence en consommant ce que je recommande.",
      "J'ai marqué dans mon agenda un jour par mois pour faire le point sur mon équipe.",
      "J'ai ce plan de 6 jours sous la main pour guider mon premier partenaire.",
      "J'ai regardé une vidéo sur la Culture Atomy ou la Philosophie du Fondateur.",
    ],
    quiz: {
      pregunta: "Quel est l'un des 3 piliers de l'engagement éthique ?",
      opciones: ["Vendre vite sans expliquer", "Zéro pression et transparence totale", "Mettre le consommateur sous pression"],
      correcta: 1,
    },
  },
];

const QUINCENAS = [
  { n: 1, nombre: "Les Fondations", semanas: "1-2", foco: "Poser les bases et témoignage personnel", detalle: "100 000 PV · premiers 50 contacts · 1 témoignage" },
  { n: 2, nombre: "Premier Élan", semanas: "3-4", foco: "Activation des invitations", detalle: "200 000 PV · 10 appels · 10 nouveaux partenaires" },
  { n: 3, nombre: "Pas Assuré", semanas: "5-6", foco: "Consolidation et suivi à 48h", detalle: "300 000 PV · suivi rigoureux des prospects" },
  { n: 4, nombre: "Conseil des Guides", semanas: "7-8", foco: "Conseil de réseau", detalle: "Réunion avec le parrain · identifier 2+2 leaders" },
  { n: 5, nombre: "La Grande Duplication", semanas: "9-10", foco: "Duplication et ajustement", detalle: "Évaluer l'organisation · intensifier les réseaux sociaux" },
  { n: 6, nombre: "L'Ascension Finale", semanas: "11-12", foco: "Qualification au rang Sales Master", detalle: "5 000 000 PV de Groupe par ligne" },
];

/* Checklist hebdomadaire des 90 jours (tableau officiel de vérification).
   Chaque semaine appartient à une quinzaine (q) et porte ses propres
   « actions clés » tirées du plan chronologique. */
const SEMANAS = [
  {
    n: 1, q: 1, metaPV: "100 000 PV", metaContactos: "10 ajoutés à la liste", paso: "Étapes 1 et 2 : Objectifs et Détermination",
    acciones: [
      "Accumuler au moins 100 000 PV Personnels en essayant les produits clés.",
      "Inscrire et organiser les 50 premiers noms dans la Liste de 250 Contacts.",
      "Assister au One Day Seminar et se connecter au système d'événements.",
      "Assister aux formations Zoom de l'équipe.",
    ],
  },
  {
    n: 2, q: 1, metaPV: "100 000 PV", metaContactos: "15 ajoutés à la liste", paso: "Étape 3 : Liste de 250 Contacts",
    acciones: [
      "Enregistrer ou rédiger 1 témoignage personnel sur un produit.",
      "Inscrire 5 nouveaux partenaires (je demande l'aide de mon parrain pour cette étape).",
      "Inscrire les premiers partenaires dans les lignes Gauche et Droite.",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
      "Assurer un suivi rigoureux dans les 48 heures avec toutes les personnes à qui la présentation a été faite.",
    ],
  },
  {
    n: 3, q: 2, metaPV: "200 000 PV", metaContactos: "10 appels / présentations", paso: "Étapes 4 et 5 : Appels et Présentation de l'Entreprise",
    acciones: [
      "Atteindre 200 000 PV Personnels en changeant où j'achète mes produits du quotidien.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 4, q: 2, metaPV: "200 000 PV", metaContactos: "10 appels / présentations", paso: "Étapes 4 et 5 : Appels et Présentation de l'Entreprise",
    acciones: [
      "Atteindre 200 000 PV Personnels en changeant où j'achète mes produits du quotidien.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 5, q: 3, metaPV: "300 000 PV", metaContactos: "Suivi à 48 heures", paso: "Étape 6 : Un Suivi Solide",
    acciones: [
      "Atteindre les 300 000 PV Personnels pour maximiser le versement des commissions.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 6, q: 3, metaPV: "300 000 PV", metaContactos: "Consolidation de la consommation", paso: "Étape 7 : Conseil avec le Mentor",
    acciones: [
      "S'assurer que chaque ligne active compte au moins 4 consommateurs récurrents.",
      "Identifier 4 leaders dans ma structure : 2 sur chaque ligne.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 7, q: 4, metaPV: "300 000 PV", metaContactos: "2 nouveaux partenaires guidés", paso: "Étape 8 : Dupliquer les Bases",
    acciones: [
      "Rencontrer mon parrain pour analyser l'équilibre des PV entre la ligne gauche et la ligne droite.",
      "Former les 4 leaders identifiés dans mes lignes descendantes.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 8, q: 4, metaPV: "300 000 PV", metaContactos: "Organiser un mini Zoom/réunion", paso: "Étapes 5 et 8 : Présentation et Impact",
    acciones: [
      "Organiser une petite réunion à domicile ou un Zoom de groupe pour soutenir les partenaires de ma ligne descendante.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 9, q: 5, metaPV: "300 000 PV", metaContactos: "Bilan du volume de groupe", paso: "Étape 7 : Conseil de Réseau",
    acciones: [
      "Évaluer la carte de l'organisation : s'assurer que les partenaires engagés dupliquent bien les présentations simples.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 10, q: 5, metaPV: "300 000 PV", metaContactos: "Alignement avec les leaders clés", paso: "Étapes 1 et 2 : Réaffirmer son Engagement",
    acciones: [
      "Intensifier les interactions sur les réseaux sociaux pour garder la liste de contacts active.",
      "Planifier les achats stratégiques et la projection de volume pour le cycle de qualification Sales Master.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 11, q: 6, metaPV: "300 000 PV+", metaContactos: "Clôture active de la quinzaine", paso: "Exécuter sa Stratégie de Rang",
    acciones: [
      "Coordonner la consommation collective avec l'équipe pour atteindre 2 500 000 PVG sur la ligne gauche et 2 500 000 PVG sur la ligne droite.",
      "Répartir des achats personnels stratégiques sur la ligne au volume le plus faible, selon les règles de l'entreprise.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
  {
    n: 12, q: 6, metaPV: "700 000 PV Personnels", metaContactos: "2,5M PVG Gauche / 2,5M PVG Droite", paso: "RANG SALES MASTER ATTEINT !",
    acciones: [
      "Célébrer l'obtention de la Maîtrise, renforcer l'esprit d'équipe et préparer le prochain cycle de croissance.",
      "Faire au moins 10 appels ou messages d'invitation en appliquant la règle du libre arbitre.",
      "Inscrire 10 nouveaux partenaires.",
      "Aider à placer ces partenaires dans les lignes Gauche et Droite (je demande l'aide de mon parrain pour cette étape).",
      "Guider les nouveaux partenaires pour qu'ils complètent le module des 6 Jours de Démarrage.",
    ],
  },
];

const CONTACTO_NIVELES = ["Chaud", "Tiède", "Froid"];
const CONTACTO_ESTADOS = ["À contacter", "Contacté", "Présenté", "Suivi", "Partenaire", "Consommateur", "Écarté"];

const PREMIOS_DEFECTO = [
  { hito: "Atteindre 300 000 PVP", premio: "Coffret 4 Étapes en cadeau", imagen: null },
  { hito: "2 cycles de 300 000 PVG sur une quinzaine", premio: "Crème nourrissante à l'or", imagen: null },
  { hito: "Sales Master en 45 jours", premio: "Coffret FAME", imagen: null },
];

const RANGOS = [
  { nombre: "Consommateur Conscient", meta: "Ton point de départ", pv: "0 PVP", tier: 1 },
  { nombre: "Membre Atomy", meta: "10 000 PV personnels", pv: "10 000 PVP", tier: 1 },
  { nombre: "Agent", meta: "300 000 PV personnels", pv: "300 000 PVP", tier: 2 },
  { nombre: "Agent Spécial", meta: "700 000 PV personnels", pv: "700 000 PVP", tier: 2 },
  { nombre: "Sales Master", meta: "700 000 PV personnels + 2 500 000 PV sur chaque jambe", pv: "5 000 000 PVG", tier: 3 },
];

const MENSAJE_BIENVENIDA =
  "Bienvenue dans ce parcours vers la réussite. Il est conçu pour que tu profites du trajet, partages tes progrès et poses tes questions ou tes difficultés. En route !";
