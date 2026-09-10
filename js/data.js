/* ---------------------------------------------------------------
   CONTENUTO — Gli 8 Passi, il Piano di 6 Giorni, il Piano di 90 Giorni
--------------------------------------------------------------- */

const OCHO_PASOS = [
  {
    n: 1, t: "Fissare obiettivi e traguardi (MBO)", d: "Progetta la tua «vita equilibrata»: vivere bene, amare, imparare e contribuire.", icon: "target",
    accion: "Scrivere il tuo Scenario di Vita", objetivo: "Chiarezza di visione e di scopo",
    explicacion: "Una vita equilibrata in Atomy si divide in quattro pilastri: Vivere bene (bisogni fisici ed economici), Amare (relazioni e famiglia), Imparare (intelletto e crescita) e Contribuire (impegno sociale e spiritualità). Gli obiettivi devono essere realistici ma ambiziosi, scritti con chiarezza e accompagnati da scadenze.",
    ejemplo: "Non basta dire «voglio una casa». Devi definire: «Vivrò in una casa di 200 m² a nord di [luogo], con 4 camere, dipinta di bianco con finiture in legno, entro il [data]». Un altro esempio è stabilire una cifra precisa di sostegno per i tuoi genitori, come inviare loro una somma di denaro definita ogni mese insieme a integratori dell'azienda.",
  },
  {
    n: 2, t: "Avere una determinazione incrollabile", d: "Indipendenza dal giudizio altrui, pensiero positivo e disponibilità a pagare il prezzo dello sforzo.", icon: "flame",
    accion: "Decidere di pagare il prezzo", objetivo: "Resilienza di fronte agli ostacoli",
    explicacion: "La determinazione implica tre aspetti: un atteggiamento proattivo (essere il proprietario della propria attività), pensieri positivi (concentrarsi sulla soluzione) e la disponibilità a «pagare il prezzo». Nulla di valore si ottiene senza uno sforzo iniziale. La «legge del decollo» dice che un razzo consuma la maggior parte del carburante all'inizio per vincere la gravità; lo stesso vale per il business.",
    ejemplo: "Se un parente stretto rifiuta la tua proposta, la tua determinazione deve permetterti di andare avanti senza che questo influisca sul tuo umore. Significa anche sacrificare ore di svago per partecipare al «One Day Seminar» o all'Accademia del Successo, sapendo che quel tempo è un investimento per la tua libertà futura.",
  },
  {
    n: 3, t: "Fare una lista di contatti", d: "Costruisci una lista attiva di almeno 250 persone, senza giudicare il loro potenziale iniziale.", icon: "clipboard-list",
    accion: "Annotare tutti, senza giudicare", objetivo: "Individuare il tuo capitale umano",
    explicacion: "L'errore comune è «pregiudicare». La Legge del Libero Arbitrio dice che dobbiamo solo informare — la decisione se interessarsi o meno spetta a loro. La tua lista deve includere tutte le persone che conosci, perché tutti usano prodotti per l'igiene personale o cosmetici. Non cercare solo «venditori», cerca consumatori.",
    ejemplo: "Prendi il telefono e annota tutti: parenti, ex compagni di scuola, vicini, amici della palestra. Se conosci qualcuno che pensi «non abbia soldi», annotalo comunque — potrebbe aver bisogno di questa opportunità. Se conosci qualcuno «molto ricco», annotalo pure — potrebbe voler migliorare la sua salute con prodotti di qualità assoluta.",
  },
  {
    n: 4, t: "Fare telefonate e inviti", d: "Concentrati sul fissare appuntamenti e generare curiosità sincera, non sul presentare per telefono.", icon: "phone-call",
    accion: "Telefonate quotidiane costanti", objetivo: "Fissare appuntamenti e presentazioni",
    explicacion: "L'invito non è la presentazione dell'attività. È il processo che genera curiosità e assicura un appuntamento. Il Presidente Park sottolinea che la costanza è fondamentale: se parli con 10 persone al giorno, la tua attività crescerà inevitabilmente. La brevità è il tuo miglior alleato in questa fase.",
    ejemplo: "Una telefonata efficace potrebbe suonare così: «Ciao, ho trovato una linea di prodotti coreani di altissima qualità che sto usando e che adoro — possiamo vederci 15 minuti [giorno] per farteli provare?» Evita di dare troppe informazioni al telefono per non sovraccaricare la persona.",
  },
  {
    n: 5, t: "Spiegare il business (Show the Business)", d: "Azienda, Prodotti, Piano Compensi e Visione Globale.", icon: "presentation",
    accion: "Show the Plan (STP)", objetivo: "Presentare l'opportunità Atomy",
    explicacion: "La presentazione deve coprire quattro punti: L'Azienda (sostenuta da KAERI e Kolmar BNH), I Prodotti (il concetto «Masstige»: Massa + Prestigio, e Qualità Assoluta, Prezzo Assoluto), il Piano Compensi (sistema binario, senza quote d'iscrizione né acquisti obbligatori) e Filosofia e Sistema (centrati sul successo del consumatore e sul sistema di formazione gratuito).",
    ejemplo: "Fare una dimostrazione con dentifricio e spazzolino durante la presentazione. Mostrare come il prezzo al grammo dei prodotti Atomy sia inferiore a quello dei marchi da supermercato, evidenziando il risparmio per la famiglia pur ottenendo una qualità superiore.",
  },
  {
    n: 6, t: "Fare follow-up (la regola delle 48 ore)", d: "Contatta il potenziale cliente entro le prime 48 ore dopo la presentazione.", icon: "clock",
    accion: "Contatto entro 48 ore", objetivo: "Fidelizzazione e servizio clienti",
    explicacion: "Va applicata la Regola delle 48 Ore: contatta la persona entro due giorni dalla presentazione o dalla consegna di un prodotto. È il momento di rispondere a dubbi, gestire le obiezioni e guidare il nuovo membro nei suoi primi passi.",
    ejemplo: "Chiama qualcuno che ha acquistato la routine per la cura della pelle e chiedi: «Come ti è sembrata la texture della crema nutriente ieri sera?» Se la persona dice che non ha avuto tempo di usarla, ricordale i benefici e fissa una nuova breve chiamata per il giorno dopo.",
  },
  {
    n: 7, t: "Ricevere consulenza e supporto", d: "Incontra la tua linea ascendente e discendente per analizzare i blocchi e correggere la rotta.", icon: "users",
    accion: "Diagnosi con il tuo Sponsor", objetivo: "Correzione della strategia",
    explicacion: "Va fatta una diagnosi basata sui dati. Se un partner non sta crescendo, bisogna analizzare quale dei passi precedenti sta fallendo. Il supporto deve essere costruttivo, orientato agli obiettivi e mai basato sulla critica personale.",
    ejemplo: "Se un partner dice «non conosco nessuno», lo sponsor deve sedersi con lui per rivedere la sua lista di contatti e aiutarlo ad ampliarla. Se il partner ha molti contatti ma nessuno compra, lo sponsor deve rivedere come viene fatta la «Spiegazione del Business» per correggere il messaggio.",
  },
  {
    n: 8, t: "Duplicarsi", d: "Sii un modello integro: consumatore fedele, collegato al sistema di eventi, al servizio con umiltà.", icon: "repeat",
    accion: "Essere l'esempio da seguire", objetivo: "Crescita esponenziale",
    explicacion: "Duplicarsi non significa semplicemente «copiare» la personalità di un leader. Significa diventare un modello (l'originale) che altri possano replicare facilmente. Se tu segui il sistema, i tuoi partner faranno lo stesso. Perché un business sia scalabile, il processo deve essere semplice e standardizzato.",
    ejemplo: "Se vuoi che il tuo team partecipi ai seminari, devi essere il primo ad arrivare e l'ultimo ad andartene. Se vuoi che consumino i prodotti, devi essere un consumatore fedele dell'intera linea Atomy. Il tuo comportamento è lo stampo da cui usciranno le future copie della tua organizzazione.",
  },
];

const ESCENARIO_INTRO =
  "Il tuo Scenario di Vita è la base di tutto il tuo percorso: prima di imparare la strada, definisci la tua destinazione. Prima di lavorare tanto per lavorare, decidi per cosa. Scrivi i tuoi obiettivi in ciascuna delle 8 aree della tua vita equilibrata — più sono chiari e dettagliati (cifre, luoghi, date), più forza ti daranno nei giorni difficili.";

const ESCENARIO_LEMA = "Determina i tuoi sogni! Sii straordinario o sii estremo.";

const ESCENARIO_PASOS = [
  "Scrivi i tuoi obiettivi e sogni in ogni categoria, nel modo più dettagliato e concreto possibile: cifre, date, luoghi.",
  "Segna il tuo livello di avanzamento in ogni area toccando i punti del grafico — più lontano dal centro, più vicino sei al tuo obiettivo.",
  "Torna qui spesso e aggiorna i tuoi progressi: vederli crescere ti mantiene concentrato sul tuo «perché».",
  "Continua a lavorare finché non unisci tutti i punti in un cerchio perfetto — quel giorno avrai raggiunto il tuo Scenario di Vita.",
];

const ESCENARIO_CATEGORIAS = [
  { id: "casa", label: "Casa", icon: "home", pilar: "Vivere bene", ejemplo: "Attualmente vivo in un appartamento di [dimensione], ma entro il [data] avrò una casa di proprietà di [dimensione] dal valore di oltre $[importo]." },
  { id: "auto", label: "Auto", icon: "car", pilar: "Vivere bene", ejemplo: "Attualmente ho una [marca e modello], ma comprerò una [marca e modello] dal valore di oltre $[importo] entro il [data]." },
  { id: "viajes", label: "Viaggi", icon: "plane", pilar: "Amare", ejemplo: "Porterò il mio/la mia partner in un viaggio di [numero] giorni a [destinazione] come premio per la mia promozione di grado, entro il [data]." },
  { id: "familia", label: "Famiglia", icon: "heart", pilar: "Amare", ejemplo: "Invierò [un prodotto per il benessere] e $[importo] al mese ai miei genitori, a partire dal [data]." },
  { id: "donacion", label: "Donazione", icon: "gift", pilar: "Contribuire", ejemplo: "Donerò $[importo] al mese a [una causa o fondazione], a partire dal [data]." },
  { id: "educacion", label: "Istruzione", icon: "book-open", pilar: "Imparare", ejemplo: "Manderò i miei figli a studiare [corso di laurea o paese] entro il [data]." },
  { id: "tiempolibre", label: "Svago", icon: "sparkles", pilar: "Vivere bene", ejemplo: "Attualmente ho quasi nessun tempo libero, ma praticherò [uno sport o un hobby] [numero] volte a settimana per la mia salute, e gareggerò in [un torneo o obiettivo] entro il [data]." },
  { id: "negocio", label: "Business", icon: "trending-up", pilar: "Vivere bene", ejemplo: "Attualmente guadagno $[importo] al mese come [il mio grado attuale], e salirò a [il grado successivo] guadagnando $[importo] al mese entro il [data]." },
];

const LEMA_ATOMY = {
  intro: "Il Motto di Atomy non è semplicemente un insieme di parole motivazionali, ma il nucleo filosofico e spirituale su cui si fonda l'intera visione, gestione e cultura organizzativa dell'azienda. Formulato dal Presidente Han-Gill Park, stabilisce il quadro etico su come le persone devono comportarsi, sia negli affari che nella vita quotidiana.",
  exclamacion: "Custodire l'anima! Creare la visione! Seguire la fede! Servire con umiltà! Andiamo, andiamo, andiamo!",
  pilares: [
    {
      n: 1, t: "Custodire l'anima", sub: "", icon: "heart",
      explicacion: "L'essere umano è la creazione più preziosa di Dio. Le persone non devono mai essere usate come mezzo per un fine economico o commerciale — le persone sono un fine in sé stesse. In Atomy, la priorità assoluta è il benessere, la crescita e il successo della persona, prima dell'interesse aziendale.",
    },
    {
      n: 2, t: "Creare la visione", sub: "", icon: "eye",
      explicacion: "Il futuro non è qualcosa che si aspetta semplicemente, ma una realtà che si progetta attivamente nella mente. Chi visualizza in modo chiaro e dettagliato il proprio Scenario di Vita può orientare i propri pensieri e le proprie azioni quotidiane per trasformare quella realtà e raggiungere i propri obiettivi.",
    },
    {
      n: 3, t: "Seguire la fede", sub: "", icon: "compass",
      explicacion: "La vera fede consiste nel credere fermamente in ciò che ancora non è visibile. Mantenere una fede incrollabile nella visione che hai progettato ti permette di superare il dubbio, gli ostacoli inevitabili e lo scetticismo esterno, con perseveranza e convinzione.",
    },
    {
      n: 4, t: "Servire con umiltà", sub: "", icon: "users",
      explicacion: "L'atteggiamento è la qualità di leadership più importante. Per quanto elevati siano i tuoi obiettivi o i tuoi risultati, la tua posizione personale deve sempre essere di umiltà: servire gli altri con rispetto, mantenere una mente disposta a imparare e mettere il benessere del team prima dell'ego personale.",
    },
  ],
};

const DIAS = [
  {
    id: 1,
    etapa: "La Visione",
    icono: "eye",
    titulo: "Definisci il tuo «Perché»",
    objetivo: "Riconnettiti con la tua motivazione profonda e comprendi il Consumo Consapevole.",
    contenido: [
      {
        h: "La Riflessione a 3 Livelli",
        body: [
          "Rispondi a queste tre domande in un quaderno personale, andando ogni volta più a fondo:",
          "Livello superficiale (il materiale): cosa vuoi ottenere economicamente? Esempio: saldare debiti, guadagnare 1.000 € in più al mese, cambiare auto.",
          "Livello personale (lo stile di vita): se i soldi non fossero più un problema, come cambierebbe la tua quotidianità? Esempio: lavorare da casa, non avere un capo, viaggiare due volte l'anno.",
          "Livello emotivo (la causa profonda): a chi giova tutto questo e come ti fa sentire? Esempio: essere presente nell'infanzia dei miei figli, dare serenità ai miei genitori, non sentire ansia a fine mese.",
          "💡 Il tuo compito di oggi: riassumi queste 3 risposte in un'unica frase, scrivila dove la vedrai ogni giorno e condividila con il tuo sponsor.",
        ],
      },
      {
        h: "Scrivi il tuo Scenario di Vita",
        body: [
          "Disegna 4 quadranti e scrivi un obiettivo concreto, al presente, per ogni pilastro:",
          "Vivere bene (salute, casa, finanze): es. «Entro dicembre 2026 avrò saldato la carta di credito e ristrutturato la cucina di casa mia».",
          "Amare (famiglia e persone care): es. «Avere tutti i fine settimana liberi, senza pensieri di lavoro, da passare con i miei figli».",
          "Imparare (crescita personale): es. «Guardare 1 video di CH.ATOMY al giorno e vincere la paura di parlare in pubblico entro fine anno».",
          "Contribuire (impatto ed eredità): es. «Donare il 5% delle mie commissioni mensili a una mensa sociale locale».",
          "Esercizio di 10 minuti: scegli 1 esempio per ogni pilastro e mettilo per iscritto con una data indicativa.",
        ],
      },
      {
        h: "Scopri la Visione di Atomy (CH.ATOMY Europa)",
        body: [
          "Vai su ch.atomy.com/eu dal browser o dal telefono e cambia la lingua in italiano tramite l'icona del globo (in alto a destra).",
          "Esplora i menu: Azienda/Visione (la storia del fondatore Han-Gill Park e il supporto scientifico di KAERI e Kolmar), Prodotto (skincare, salute, casa), Business/Formazione (piano compensi, seminari) e Membro/Storie di Successo (testimonianze reali).",
          "Usa la lente di ricerca per argomenti specifici, ad esempio «HemoHIM» o «Piano Compensi».",
          "Consiglio: dedica 15 minuti al giorno a guardare 1 video Azienda e 1 video Prodotto.",
        ],
      },
      {
        h: "Consumo Consapevole: da una spesa che se ne va, a una spesa che torna",
        body: [
          "Per tutta la vita ci hanno insegnato un consumo automatico: acquistare prodotti per l'igiene ogni mese, pagare il conto e tornare a casa con il portafoglio vuoto, senza alcun beneficio.",
          "In Atomy, ogni acquisto quotidiano (dentifricio, shampoo, detersivo, integratori) si trasforma in Punti Valore (PV) che non scadono mai e si accumulano a tuo favore.",
          "Non si tratta di spendere di più né di comprare cose inutili: si tratta di cambiare dove acquisti ciò che compri già, sempre.",
          "Il reddito che costruisci con le commissioni è ereditabile fino a tre generazioni: oggi ti dà respiro economico, e col tempo diventa un patrimonio per i tuoi figli e nipoti.",
        ],
      },
    ],
    campos: [{ key: "porque", label: "Il tuo «Perché» in una frase" }],
    checklist: [
      "Ho definito le mie 3 ragioni principali (il mio «Perché»).",
      "Ho consultato il catalogo e individuato i primi prodotti da sostituire in casa.",
      "Ho guardato la presentazione ufficiale della visione di Atomy.",
      "Ho guardato almeno un video sull'Azienda Atomy.",
    ],
    quiz: {
      pregunta: "In cosa si trasformano i tuoi acquisti quotidiani in Atomy?",
      opciones: ["In spese che non tornano mai", "In Punti Valore (PV) che non scadono mai", "In uno sconto temporaneo"],
      correcta: 1,
    },
  },
  {
    id: 2,
    etapa: "Il Team",
    icono: "users",
    titulo: "Il Piano Compensi e il Binario",
    objetivo: "Capire come un consumo coordinato su due linee generi prosperità economica.",
    contenido: [
      {
        h: "La tua iscrizione è 100% gratuita",
        body: [
          "Entrare in Atomy non costa nulla: nessuna quota d'iscrizione, nessuna quota mensile o annuale, e mai acquisti obbligatori per mantenere attivo il tuo account.",
          "L'unica cosa che fai è cambiare dove acquisti i prodotti quotidiani che compri già sempre — il resto del sistema (attivazione, commissioni, ranghi) si costruisce su quel consumo, non su pagamenti aggiuntivi.",
        ],
      },
      {
        h: "Il tuo primo grande traguardo: 10.000 PV Personali (PVP)",
        body: [
          "I PV (Punti Valore) sono il valore che l'azienda assegna a ogni prodotto; li vedi in blu sotto al prezzo nello shop online.",
          "Con solo un paio di prodotti base di uso quotidiano (es. un kit per l'igiene orale e uno shampoo) raggiungi già i 10.000 PVP.",
          "Raggiungere i 10.000 PVP è la chiave che attiva il tuo account da partner: da lì il tuo profilo è abilitato ad accumulare volume di team e a percepire commissioni.",
        ],
      },
      {
        h: "Il tuo team binario: Linea Sinistra e Linea Destra",
        body: [
          "Non lavori da solo: con l'aiuto del tuo sponsor costruisci la tua struttura su due linee di consumo, Sinistra e Destra, con profondità illimitata (indipendentemente da quanti livelli scenda ogni linea).",
          "Ogni volta che le persone del tuo team acquistano per la propria casa, generano PV di Gruppo (PVG).",
          "Un «Ciclo» avviene quando la tua linea sinistra e la tua linea destra accumulano ciascuna 300.000 PVG: il sistema effettua un «match» e l'azienda versa una commissione direttamente sul tuo conto bancario.",
        ],
      },
      {
        h: "Perché l'obiettivo vero è 300.000 PVP — guadagni il triplo!",
        body: [
          "Con 10.000 PVP vieni già pagato quando i tuoi team raggiungono 300.000 PVG su ogni lato: una commissione base di circa 15-20 € per ciclo.",
          "Una volta che raggiungi personalmente 300.000 PVP, guadagni il TRIPLO per esattamente lo stesso lavoro di squadra: circa 50-60 € per ciclo.",
          "I tuoi PVP non si azzerano MAI e non si resettano MAI: ogni acquisto per casa tua si somma per sempre ai precedenti. Non c'è fretta né pressione.",
          "Riassunto: 1) fai il tuo primo ordine per raggiungere 10.000 PVP e attivare il tuo account; 2) continua a spostare i tuoi acquisti quotidiani su Atomy al tuo ritmo fino a 300.000 PVP mentre le tue linee crescono; 3) goditi commissioni moltiplicate per tre.",
        ],
      },
      {
        h: "PV Personali vs. PV di Gruppo",
        body: [
          "PV Personali: li generi tu stesso acquistando con il tuo ID. Non si azzerano mai. Attivano il tuo account e determinano il tuo livello di commissione per ciclo.",
          "PV di Gruppo: generati dal tuo team (linee Sinistra e Destra). Si resettano solo dopo il pagamento di una commissione. Sommano il consumo collettivo usato per liquidare le commissioni.",
        ],
      },
      {
        h: "Il percorso completo fino a Sales Master",
        body: [
          "Il tuo progresso personale avanza per traguardi di PV che non si perdono mai: 10.000 PVP attiva il tuo account, 300.000 PVP ti dà il rango di Agente, e 700.000 PVP ti dà il rango di Agente Speciale.",
          "Sales Master — l'obiettivo del tuo Piano di 90 Giorni — si raggiunge quando, oltre ai tuoi 700.000 PVP, la tua linea Sinistra e la tua linea Destra accumulano ciascuna 2.500.000 PVG nella stessa quindicina di qualificazione.",
          "Questo percorso Cumbre 90 ti porta esattamente lì. I ranghi sopra Sales Master (Diamond Master e oltre) sono fuori da questi 90 giorni, ma a quel punto avrai già l'abitudine e il team per continuare a salire.",
        ],
      },
    ],
    campos: [],
    nota: "Ricorda i tuoi due grandi traguardi: 10.000 PVP (attiva il tuo account) e 300.000 PVP (triplica la tua commissione per ciclo). I tuoi PV personali non si azzerano né si resettano mai.",
    checklist: [
      "Ho capito l'importanza di raggiungere prima i 10.000 PV e puntare poi a 300.000 PV personali.",
      "Ho capito come funziona l'equilibrio binario (Sinistra / Destra).",
      "Ho scelto i miei primi 4 prodotti preferiti.",
      "Ho guardato almeno un video sul Piano Compensi.",
    ],
    quiz: {
      pregunta: "Qual è il tuo primo grande traguardo per attivare l'account?",
      opciones: ["300.000 PV di Gruppo", "10.000 PV Personali", "50 nuovi contatti"],
      correcta: 1,
    },
  },
  {
    id: 3,
    etapa: "Il Prodotto",
    icono: "package",
    titulo: "Dall'Esperienza alla Raccomandazione",
    objetivo: "Innamorati dei prodotti e condividi raccomandazioni genuine senza pressioni.",
    contenido: [
      {
        h: "Dalla teoria all'esperienza reale",
        body: [
          "In Atomy non si raccomanda «alla cieca»: lo si fa con onestà e a partire dalla propria esperienza da consumatore. Oggi è il momento di mettere in moto la macchina.",
        ],
      },
      {
        h: "Scegli il tuo primo ordine (il tuo consumo consapevole)",
        body: [
          "Scegli i prodotti che devi davvero rifornire in casa oggi stesso (dentifricio, shampoo, detersivo, integratori). L'obiettivo è semplice: provare la qualità del marchio per poterne parlare con autorità fin dal primo giorno.",
          "Per farlo, vai sul sito e accedi con il tuo ID e la tua password.",
        ],
      },
      {
        h: "Lista di 5 raccomandazioni benessere",
        body: [
          "Pensa a 5 persone vicine a te e ai loro bisogni: qualcuno con la pelle sensibile? qualcuno stanco che vuole rinforzare il sistema immunitario? qualcuno che preferisce prodotti ecologici per la casa?",
          "Annota sul quaderno [Nome] + [Prodotto che potrebbe aiutarlo]. Esempio: Maria → stanchezza / sistema immunitario → HemoHIM. Carlo → igiene quotidiana del viso → linea Skincare.",
          "Non vendere ancora nulla: identifica semplicemente come il catalogo possa portare loro valore.",
        ],
      },
      {
        h: "Crea attesa sui social",
        body: [
          "Crea attesa in modo naturale sui tuoi social o negli stati WhatsApp, senza vendere nulla, condividendo semplicemente la tua curiosità da consumatore.",
          "Idea di post: «Cercavo da tempo prodotti per l'igiene più naturali, ecologici e diretti da fabbrica senza pagare prezzi esagerati. Ho appena scoperto una piattaforma coreana che mi ha sorpreso moltissimo per la sua qualità e ho appena fatto il mio primo ordine. Quando arriva questa settimana vi racconto com'è andata!»",
        ],
      },
      {
        h: "Il tuo video di oggi",
        body: [
          "Su CH.ATOMY Europa → menu Prodotto, guarda il video su HemoHIM o sulla linea Absolute/The Fame per capire la filosofia Masstige: qualità assoluta a prezzo assoluto.",
        ],
      },
    ],
    campos: [
      { key: "rec1", label: "Raccomandazione 1 — nome e prodotto" },
      { key: "rec2", label: "Raccomandazione 2 — nome e prodotto" },
      { key: "rec3", label: "Raccomandazione 3 — nome e prodotto" },
      { key: "rec4", label: "Raccomandazione 4 — nome e prodotto" },
      { key: "rec5", label: "Raccomandazione 5 — nome e prodotto" },
    ],
    checklist: [
      "Ho scelto e acquistato i miei primi prodotti per uso personale.",
      "Ho fatto la mia lista di 5 amici/familiari e dei prodotti che potrebbero aiutarli.",
      "Ho pubblicato il mio post/storia di attesa sui social.",
      "Ho guardato il video su Prodotto/Masstige su CH.ATOMY Europa.",
    ],
    quiz: {
      pregunta: "Quante raccomandazioni benessere identifichi oggi?",
      opciones: ["3", "5", "10"],
      correcta: 1,
    },
  },
  {
    id: 4,
    etapa: "Il Racconto",
    icono: "book-open",
    titulo: "L'Arte di Invitare (Storytelling)",
    objetivo: "Invita senza pressione e condividi la tua storia personale con naturalezza.",
    contenido: [
      {
        h: "Copione in 4 passi per la tua storia personale",
        body: [
          "Passo 1 — Il tuo punto di partenza: condividi la tua situazione precedente (economica, di tempo, di salute) con cui l'altra persona possa identificarsi. Es.: «Da un po' sentivo che le spese del mese aumentavano mentre le mie entrate restavano uguali...»",
          "Passo 2 — La scoperta: cosa ti ha colpito di Atomy. Es.: «...finché ho scoperto Atomy, una piattaforma che mi permette di acquistare prodotti per l'igiene e la salute direttamente da fabbrica, con ottima qualità e la possibilità di guadagnare consigliando ciò che già uso.»",
          "Passo 3 — I tuoi primi risultati o sensazioni. Es.: «Ho iniziato a provare i prodotti a casa e la qualità ci è piaciuta a tutti; mi ha reso felice vedere che potevo costruire un'entrata extra senza trascurare il lavoro.»",
          "Passo 4 — La tua visione o il tuo invito, senza pressione. Es.: «Il mio obiettivo è la tranquillità economica per la mia famiglia. Non so se faccia per te, ma mi piacerebbe condividerti come funziona nel caso ti possa essere utile.»",
          "Formula riassunta in 3 minuti: unisci le 4 risposte e leggile ad alta voce per verificare che suonino come una conversazione vera, non come un copione aziendale.",
        ],
      },
      {
        h: "Copione di connessione sincera (mercato vicino)",
        body: [
          "Messaggio 1 — Rompere il ghiaccio: «Ciao [Nome]! Come stai? È da un po' che non ci sentiamo...» Riconnettiti semplicemente, senza ancora menzionare il progetto.",
          "Messaggio 2 — Seminare curiosità: racconta, come qualcosa di quotidiano, che hai cambiato il modo di acquistare prodotti di uso quotidiano con altri più ecologici, di miglior qualità e diretti da fabbrica.",
          "Messaggio 3 — L'aggancio senza pressione: menziona che il sistema ti permette anche di generare un'entrata economica raccomandandolo, cosa che il supermercato normale non offre.",
          "Messaggio 4 — L'invito: «Non so se faccia per te, ma se ti incuriosisce, fammi sapere e ci prendiamo un caffè o facciamo una breve chiamata e te ne parlo.»",
          "Consiglio di duplicazione: esercita la tua storia in un incontro 1 a 1 con il tuo sponsor e correggete insieme qualsiasi frase che suoni troppo formale o aziendale.",
        ],
      },
    ],
    campos: [
      { key: "hist1", label: "1. Il tuo punto di partenza (dove eri?)" },
      { key: "hist2", label: "2. La scoperta (cosa hai trovato in Atomy?)" },
      { key: "hist3", label: "3. I tuoi primi risultati o sensazioni" },
      { key: "hist4", label: "4. La tua visione o il tuo invito (dove stai andando?)" },
    ],
    checklist: [
      "Ho strutturato la mia storia personale di 3 minuti.",
      "Ho classificato i miei primi 30 nomi nella Lista dei 250.",
      "Ho fatto i miei primi 5 inviti sinceri.",
      "Ho guardato almeno un video sull'Azienda Atomy.",
    ],
    quiz: {
      pregunta: "Quanti passi ha la tua storia personale (storytelling)?",
      opciones: ["2", "4", "6"],
      correcta: 1,
    },
  },
  {
    id: 5,
    etapa: "La Direzione",
    icono: "compass",
    titulo: "Piano d'Azione Settimanale",
    objetivo: "Organizza la tua settimana in modo sostenibile, senza sovraccaricarti.",
    contenido: [
      {
        h: "Il tuo piano di lavoro sostenibile",
        body: [
          "L'obiettivo è che Atomy si adatti alla tua vita, non che la tua vita si complichi per colpa di Atomy. Oggi bastano solo 4 cose veloci.",
          "Obiettivo a 30 giorni: un obiettivo piccolo e raggiungibile per il tuo primo mese. Es.: «Provare 3 prodotti e registrare i miei primi 2 consumatori».",
          "I tuoi spazi di valore: non hai bisogno di 8 ore al giorno. Trova 3-4 ore libere nella tua settimana (es. 30 min uscendo dal lavoro o un po' di tempo nel weekend) e bloccale nel tuo calendario.",
          "Il tuo appuntamento settimanale: programma una chiamata breve e fissa di 15-20 minuti con il tuo mentore per fare il punto, chiarire dubbi e correggere ciò che serve.",
          "15 minuti di apprendimento al giorno: continua a guardare i contenuti di CH.ATOMY Europa al tuo ritmo, come stai già facendo dal Giorno 1.",
          "💡 Consiglio: un progetto costante di 3 ore a settimana dà 100 volte più risultati di una maratona di un solo giorno. Fallo al tuo ritmo.",
        ],
      },
    ],
    campos: [
      { key: "meta30", label: "Obiettivo a 30 giorni" },
      { key: "horas", label: "Ore bloccate per il progetto (giorno e ora)" },
      { key: "llamada", label: "Giorno e ora della tua chiamata settimanale con il mentore" },
    ],
    checklist: [
      "Ho definito il mio obiettivo a 30 giorni.",
      "Ho bloccato le mie ore di lavoro settimanali.",
      "Ho fissato la mia chiamata settimanale con il mentore.",
      "Ho guardato 1 video dell'Azienda su CH.ATOMY Europa.",
    ],
    quiz: {
      pregunta: "Cosa programmi oggi con il tuo mentore?",
      opciones: ["Una riunione quotidiana obbligatoria", "Una breve chiamata settimanale di 15-20 min", "Niente, non serve"],
      correcta: 1,
    },
  },
  {
    id: 6,
    etapa: "L'Impatto",
    icono: "trending-up",
    titulo: "Leadership Etica e Duplicazione",
    objetivo: "Chiudi la tua prima settimana su basi solide, pronto a duplicarti.",
    contenido: [
      {
        h: "Impegno etico",
        body: [
          "Lavorare con Atomy si fonda sul rispetto totale del consumatore: zero pressione, zero inganni e coerenza assoluta usando ciò che raccomandiamo.",
        ],
      },
      {
        h: "Data di revisione mensile",
        body: [
          "Fissa fin da ora un giorno al mese per rivedere come sta crescendo il tuo team, cosa sta funzionando e correggere la rotta insieme se emerge qualche blocco.",
        ],
      },
      {
        h: "Impara a duplicarti",
        body: [
          "Non tenere questo processo di 6 giorni solo per te: quando iscrivi il tuo primo partner, accompagnalo esattamente in questo stesso percorso di avvio.",
        ],
      },
      {
        h: "Il tuo video di chiusura",
        body: [
          "Su CH.ATOMY Europa → menu Azienda, cerca un video sulla Cultura Atomy o sulla Filosofia del Fondatore Han-Gill Park: onestà e servizio al cliente.",
          "Con questo completi la tua prima settimana di formazione! Non cerchiamo di vendere disperatamente, ma di educare un consumatore soddisfatto e accompagnare altri verso i loro obiettivi, con onestà.",
        ],
      },
    ],
    campos: [],
    checklist: [
      "Ho fatto mio l'impegno etico: zero pressione, trasparenza totale, coerenza consumando ciò che raccomando.",
      "Ho segnato in agenda un giorno al mese per rivedere il mio team.",
      "Ho questo piano di 6 giorni a portata di mano per guidare il mio primo partner.",
      "Ho guardato un video sulla Cultura Atomy o sulla Filosofia del Fondatore.",
    ],
    quiz: {
      pregunta: "Qual è uno dei 3 pilastri dell'impegno etico?",
      opciones: ["Vendere in fretta senza spiegare", "Zero pressione e trasparenza totale", "Mettere sotto pressione il consumatore"],
      correcta: 1,
    },
  },
];

const QUINCENAS = [
  { n: 1, nombre: "Le Fondamenta", semanas: "1-2", foco: "Gettare le basi e testimonianza personale", detalle: "100.000 PV · primi 50 contatti · 1 testimonianza" },
  { n: 2, nombre: "Primo Slancio", semanas: "3-4", foco: "Attivazione degli inviti", detalle: "200.000 PV · 10 chiamate · 10 nuovi partner" },
  { n: 3, nombre: "Passo Fermo", semanas: "5-6", foco: "Consolidamento e follow-up a 48h", detalle: "300.000 PV · follow-up rigoroso ai presentati" },
  { n: 4, nombre: "Consiglio delle Guide", semanas: "7-8", foco: "Consulenza di rete", detalle: "Incontro con lo sponsor · individuare 2+2 leader" },
  { n: 5, nombre: "La Grande Duplicazione", semanas: "9-10", foco: "Duplicazione e correzione", detalle: "Valutare l'organizzazione · intensificare i social" },
  { n: 6, nombre: "L'Ascesa Finale", semanas: "11-12", foco: "Qualificazione al rango Sales Master", detalle: "5.000.000 PV di Gruppo per linea" },
];

/* Checklist settimanale dei 90 giorni (tabella ufficiale di verifica).
   Ogni settimana appartiene a una quindicina (q) e porta le proprie
   "azioni chiave" tratte dal piano cronologico. */
const SEMANAS = [
  {
    n: 1, q: 1, metaPV: "100.000 PV", metaContactos: "10 aggiunti alla lista", paso: "Passi 1 e 2: Obiettivi e Determinazione",
    acciones: [
      "Accumulare almeno 100.000 PV Personali provando i prodotti chiave.",
      "Registrare e organizzare i primi 50 nomi nella Lista dei 250 Contatti.",
      "Partecipare al One Day Seminar e connettersi al sistema di eventi.",
      "Partecipare alle formazioni Zoom del team.",
    ],
  },
  {
    n: 2, q: 1, metaPV: "100.000 PV", metaContactos: "15 aggiunti alla lista", paso: "Passo 3: Lista dei 250 Contatti",
    acciones: [
      "Registrare o scrivere 1 testimonianza personale su un prodotto.",
      "Iscrivere 5 nuovi partner (chiedo aiuto al mio sponsor per questo passo).",
      "Registrare i primi partner nelle linee Sinistra e Destra.",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
      "Fare follow-up rigoroso entro 48 ore con tutti i contatti presentati.",
    ],
  },
  {
    n: 3, q: 2, metaPV: "200.000 PV", metaContactos: "10 chiamate / presentazioni", paso: "Passi 4 e 5: Chiamate e Presentazione del Business",
    acciones: [
      "Raggiungere 200.000 PV Personali cambiando dove faccio la spesa quotidiana.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 4, q: 2, metaPV: "200.000 PV", metaContactos: "10 chiamate / presentazioni", paso: "Passi 4 e 5: Chiamate e Presentazione del Business",
    acciones: [
      "Raggiungere 200.000 PV Personali cambiando dove faccio la spesa quotidiana.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 5, q: 3, metaPV: "300.000 PV", metaContactos: "Follow-up a 48 Ore", paso: "Passo 6: Un Follow-up Solido",
    acciones: [
      "Completare i 300.000 PV Personali per massimizzare l'incasso delle commissioni.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 6, q: 3, metaPV: "300.000 PV", metaContactos: "Consolidamento del consumo", paso: "Passo 7: Consulenza col Mentore",
    acciones: [
      "Assicurarsi che ogni linea attiva abbia almeno 4 consumatori ricorrenti.",
      "Individuare 4 leader nella mia struttura: 2 per ogni linea.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 7, q: 4, metaPV: "300.000 PV", metaContactos: "2 nuovi partner guidati", paso: "Passo 8: Duplicare le Basi",
    acciones: [
      "Incontrare il mio sponsor per analizzare l'equilibrio dei PV tra la linea sinistra e la linea destra.",
      "Formare i 4 leader individuati nelle mie linee discendenti.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 8, q: 4, metaPV: "300.000 PV", metaContactos: "Organizzare un mini Zoom/incontro", paso: "Passi 5 e 8: Presentazione e Impatto",
    acciones: [
      "Organizzare un piccolo incontro a casa o uno Zoom di gruppo per sostenere i partner della linea discendente.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 9, q: 5, metaPV: "300.000 PV", metaContactos: "Revisione del volume di gruppo", paso: "Passo 7: Consulenza di Rete",
    acciones: [
      "Valutare la mappa dell'organizzazione: assicurarsi che i partner impegnati stiano duplicando le presentazioni semplici.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 10, q: 5, metaPV: "300.000 PV", metaContactos: "Allineamento con i leader chiave", paso: "Passi 1 e 2: Riaffermare l'Impegno",
    acciones: [
      "Intensificare le interazioni sui social per mantenere attiva la lista di contatti.",
      "Pianificare l'acquisto strategico e la proiezione di volume per il ciclo di qualificazione Sales Master.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 11, q: 6, metaPV: "300.000 PV+", metaContactos: "Chiusura attiva della quindicina", paso: "Eseguire la tua Strategia di Rango",
    acciones: [
      "Coordinare il consumo collettivo con il team per raggiungere 2.500.000 PVG sulla linea sinistra e 2.500.000 PVG sulla linea destra.",
      "Assegnare acquisti personali strategici sulla linea con volume minore, secondo le regole dell'azienda.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
  {
    n: 12, q: 6, metaPV: "700.000 PV Personali", metaContactos: "2,5M PVG Sinistra / 2,5M PVG Destra", paso: "RANGO SALES MASTER RAGGIUNTO!",
    acciones: [
      "Festeggiare il raggiungimento della Maestria, rafforzare il lavoro di squadra e prepararsi al prossimo ciclo di crescita.",
      "Fare almeno 10 chiamate o messaggi di invito applicando la regola del libero arbitrio.",
      "Iscrivere 10 nuovi partner.",
      "Aiutare a posizionare questi partner nelle linee Sinistra e Destra (chiedo aiuto al mio sponsor per questo passo).",
      "Guidare i nuovi partner a completare il modulo dei 6 Giorni di Avvio.",
    ],
  },
];

const CONTACTO_NIVELES = ["Caldo", "Tiepido", "Freddo"];
const CONTACTO_ESTADOS = ["Da contattare", "Contattato", "Presentato", "Primo Ordine", "Follow-up", "Partner", "Consumatore", "Scartato"];

const PRIMER_PEDIDO_NOTA = "L'ordine è arrivato? Come si è trovato/a con i prodotti? A chi potrebbe consigliarlo?";

const PREMIOS_DEFECTO = [
  { hito: "Raggiungere 300.000 PVP", premio: "Set 4 Passi in regalo", imagen: null },
  { hito: "2 cicli di 300.000 PVG in una quindicina", premio: "Crema nutriente all'oro", imagen: null },
  { hito: "Sales Master in 45 giorni", premio: "Set FAME", imagen: null },
];

const RANGOS = [
  { nombre: "Consumatore Consapevole", meta: "Il tuo punto di partenza", pv: "0 PVP", tier: 1 },
  { nombre: "Membro Atomy", meta: "10.000 PV personali", pv: "10.000 PVP", tier: 1 },
  { nombre: "Agente", meta: "300.000 PV personali", pv: "300.000 PVP", tier: 2 },
  { nombre: "Agente Speciale", meta: "700.000 PV personali", pv: "700.000 PVP", tier: 2 },
  { nombre: "Sales Master", meta: "700.000 PV personali + 2.500.000 PV per ogni gamba", pv: "5.000.000 PVG", tier: 3 },
];

const MENSAJE_BIENVENIDA =
  "Benvenuto in questo percorso verso il successo. È pensato perché tu ti goda il viaggio, condivida i tuoi progressi e chieda pure per qualsiasi dubbio o difficoltà. Si parte!";
