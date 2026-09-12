// Capa de persistencia y lógica de negocio. Todo se guarda en localStorage:
// no hay backend, así que los datos viven solo en este navegador/dispositivo.
const STORE = {
  keys: {
    settings: "cg_settings",
    transactions: "cg_transactions",
    accounts: "cg_accounts",
    days: "cg_days",
    customCategories: "cg_custom_categories",
    plans: "cg_plans",
    goals: "cg_goals"
  },

  defaultSettings: {
    currency: "EUR",
    language: "es", // "es" | "en" | "fr" | "it" | "pt"
    country: null,
    dailyGoal: null,
    soundEnabled: true,
    userName: "",
    // Perfil recogido en el cuestionario inicial
    onboardingDone: false,
    accountMode: "individual", // "individual" | "compartida"
    age: null,
    monthlyIncome: null,
    occupation: "",
    savingsGoalMonthly: null,
    currentlyMeetingGoal: null,
    obstacles: [],
    savingsPurposes: [],
    savingsPurposeOther: "",
    // Cuestionario de diagnóstico financiero (arquetipo)
    desiredIncome: null,
    hoursPerDay: null,
    overtimeHours: null,
    multipleJobs: false,
    commuteMinutes: null,
    workGoal: "",
    expensesSnapshot: {},
    currentSavingsMonthly: null,
    archetypeKey: null,
    savingsBehavior: "pasivo", // "pasivo" | "invierte"
    incomeExpenseProfileKey: null
  },

  _read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  _write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Almacenamiento no disponible (modo privado, cuota, etc.): se ignora
      // silenciosamente, la app sigue funcionando en memoria durante la sesión.
    }
  },

  getSettings() {
    return Object.assign({}, this.defaultSettings, this._read(this.keys.settings, {}));
  },
  saveSettings(settings) {
    this._write(this.keys.settings, settings);
  },

  getTransactions() {
    return this._read(this.keys.transactions, []);
  },
  saveTransactions(list) {
    this._write(this.keys.transactions, list);
  },
  addTransaction(tx) {
    const list = this.getTransactions();
    const record = Object.assign(
      {
        id: "tx_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toISOString()
      },
      tx
    );
    list.push(record);
    this.saveTransactions(list);
    return record;
  },
  updateTransaction(id, patch) {
    const list = this.getTransactions();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], patch);
    this.saveTransactions(list);
    return list[idx];
  },
  deleteTransaction(id) {
    const list = this.getTransactions().filter((t) => t.id !== id);
    this.saveTransactions(list);
  },

  getAccounts() {
    return this._read(this.keys.accounts, []);
  },
  saveAccounts(list) {
    this._write(this.keys.accounts, list);
  },
  addAccount(account) {
    const list = this.getAccounts();
    const record = Object.assign({ id: "acc_" + Date.now(), simulated: true }, account);
    list.push(record);
    this.saveAccounts(list);
    return record;
  },
  removeAccount(id) {
    this.saveAccounts(this.getAccounts().filter((a) => a.id !== id));
  },

  getDays() {
    return this._read(this.keys.days, {});
  },
  saveDays(days) {
    this._write(this.keys.days, days);
  },

  getCustomCategories() {
    return this._read(this.keys.customCategories, { expense: [], income: [] });
  },
  saveCustomCategories(cats) {
    this._write(this.keys.customCategories, cats);
  },
  addCustomCategory(type, label, icon) {
    const cats = this.getCustomCategories();
    const bucket = type === "income" ? "income" : "expense";
    const id = "custom_" + bucket + "_" + Date.now().toString(36);
    cats[bucket].push({ id, label, icon: icon || "🏷️", custom: true });
    this.saveCustomCategories(cats);
    return id;
  },
  removeCustomCategory(type, id) {
    const cats = this.getCustomCategories();
    const bucket = type === "income" ? "income" : "expense";
    cats[bucket] = cats[bucket].filter((c) => c.id !== id);
    this.saveCustomCategories(cats);
  },

  // Planes escritos la noche anterior, guardados por la fecha a la que aplican.
  getPlans() {
    return this._read(this.keys.plans, {});
  },
  savePlans(plans) {
    this._write(this.keys.plans, plans);
  },
  setPlan(date, text) {
    const plans = this.getPlans();
    if (text && text.trim()) plans[date] = text.trim();
    else delete plans[date];
    this.savePlans(plans);
  },
  getPlan(date) {
    return this.getPlans()[date] || "";
  },

  // Metas de ahorro con propósito (p. ej. "Cena con amigos"), independientes
  // de la meta de ahorro mensual general.
  getGoals() {
    return this._read(this.keys.goals, []);
  },
  saveGoals(goals) {
    this._write(this.keys.goals, goals);
  },
  addGoal(goal) {
    const goals = this.getGoals();
    const record = Object.assign(
      { id: "goal_" + Date.now().toString(36), createdAt: LOGIC.todayStr(), achieved: false, achievedAt: null },
      goal
    );
    goals.push(record);
    this.saveGoals(goals);
    return record;
  },
  removeGoal(id) {
    this.saveGoals(this.getGoals().filter((g) => g.id !== id));
  },
  markGoalAchieved(id) {
    const goals = this.getGoals();
    const goal = goals.find((g) => g.id === id);
    if (goal && !goal.achieved) {
      goal.achieved = true;
      goal.achievedAt = LOGIC.todayStr();
      this.saveGoals(goals);
    }
    return goal;
  },
  setGoalPhoto(id, dataURL) {
    const goals = this.getGoals();
    const goal = goals.find((g) => g.id === id);
    if (!goal) return null;
    goal.photo = dataURL;
    this.saveGoals(goals);
    return goal;
  }
};

const LOGIC = {
  todayStr(offsetDays) {
    const d = new Date();
    if (offsetDays) d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  },

  formatMoney(amount, currency) {
    const cur = currency || STORE.getSettings().currency || "EUR";
    const symbol = DATA.currencySymbols[cur] || cur + " ";
    const n = Number(amount) || 0;
    return (n < 0 ? "-" : "") + symbol + Math.abs(n).toFixed(2);
  },

  // Idioma activo de la app (con reserva a español si no hay uno guardado
  // o el guardado no está soportado).
  SUPPORTED_LANGS: ["es", "en", "fr", "it", "pt"],
  lang() {
    const l = STORE.getSettings().language;
    return this.SUPPORTED_LANGS.includes(l) ? l : "es";
  },
  // Devuelve el contenido de `field` (un objeto {es,en,fr,it,pt}) en el
  // idioma activo, con reserva a español si falta esa traducción.
  localized(field) {
    const lang = this.lang();
    return (field && (field[lang] || field.es)) || field;
  },

  transactionsForDate(date) {
    return STORE.getTransactions().filter((t) => t.date === date);
  },

  totalForDate(date, type) {
    return this.transactionsForDate(date)
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  },

  // Gasto "variable" de un día: excluye los gastos marcados como fijos o
  // excepcionales (alquiler, cuotas, seguros...), que no deben contar para
  // la meta de gasto diario ni romper la racha.
  variableSpentForDate(date) {
    return this.transactionsForDate(date)
      .filter((t) => t.type === "expense" && !t.excludeFromDailyGoal)
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  },

  // Suma de los "ahorros" registrados manualmente ese día (descuentos,
  // ofertas aprovechadas...). Amplían el margen de gasto disponible ese día.
  savingsLoggedForDate(date) {
    return this.transactionsForDate(date)
      .filter((t) => t.type === "saving")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  },

  // Meta de gasto diario "efectiva" para un día: la meta base más cualquier
  // ahorro registrado ese mismo día, para poder "salvar la racha".
  effectiveGoalForDate(date) {
    const base = STORE.getSettings().dailyGoal;
    if (!base) return null;
    return base + this.savingsLoggedForDate(date);
  },

  // Categorías del diagnóstico inicial que son gastos fijos mensuales
  // (se pagan una vez, no se reparten día a día): se excluyen al calcular
  // la meta de gasto diario sugerida, que es para el gasto variable.
  FIXED_SNAPSHOT_CATEGORIES: ["alquiler", "coche", "servicios", "seguros", "deudasTarjetas", "deudasPrestamos"],
  fixedMonthlyFromSnapshot(expensesSnapshot) {
    const snap = expensesSnapshot || {};
    return this.FIXED_SNAPSHOT_CATEGORIES.reduce((sum, key) => sum + (Number(snap[key]) || 0), 0);
  },

  spentToday() {
    return this.variableSpentForDate(this.todayStr());
  },

  // Días distintos en los que hay al menos un movimiento, ordenados descendente.
  allDatesWithActivity() {
    const set = new Set(STORE.getTransactions().map((t) => t.date));
    return Array.from(set).sort().reverse();
  },

  categoryBreakdown(date, type) {
    const txs = this.transactionsForDate(date).filter((t) => t.type === type);
    const totals = {};
    txs.forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount || 0);
    });
    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    return Object.entries(totals)
      .map(([category, amount]) => ({ category, amount, pct: total ? (amount / total) * 100 : 0 }))
      .sort((a, b) => b.amount - a.amount);
  },

  // ---------- Ahorro: meta de gasto diario vs. meta de ahorro mensual ----------
  daysInMonth(dateStr) {
    const [y, m] = dateStr.split("-").map(Number);
    return new Date(y, m, 0).getDate();
  },
  monthKeyOf(dateStr) {
    return dateStr.slice(0, 7); // YYYY-MM
  },
  dailySavingsTarget() {
    const settings = STORE.getSettings();
    if (!settings.savingsGoalMonthly) return 0;
    return settings.savingsGoalMonthly / this.daysInMonth(this.todayStr());
  },
  // Suma lo "ahorrado" (meta de gasto - gastado real) en los días ya cerrados
  // de este mes, más una estimación en vivo del día de hoy si aún no se cerró.
  savingsProgressThisMonth() {
    const settings = STORE.getSettings();
    const goal = settings.savingsGoalMonthly || 0;
    const days = STORE.getDays();
    const thisMonth = this.monthKeyOf(this.todayStr());
    let saved = 0;
    Object.values(days).forEach((d) => {
      if (this.monthKeyOf(d.date) === thisMonth) saved += (d.goal - d.spent);
    });
    const today = this.todayStr();
    if (!days[today] && settings.dailyGoal) {
      saved += (this.effectiveGoalForDate(today) - this.spentToday());
    }
    return {
      saved,
      goal,
      pct: goal ? Math.max(0, Math.min(100, Math.round((saved / goal) * 100))) : 0
    };
  },

  // Progreso de una meta de ahorro con propósito: suma lo ahorrado (meta de
  // gasto - gastado real) desde el día en que se creó la meta hasta hoy.
  goalProgress(goal) {
    const settings = STORE.getSettings();
    const days = STORE.getDays();
    let saved = 0;
    Object.values(days).forEach((d) => {
      if (d.date >= goal.createdAt) saved += (d.goal - d.spent);
    });
    const today = this.todayStr();
    if (!days[today] && settings.dailyGoal) {
      saved += (this.effectiveGoalForDate(today) - this.spentToday());
    }
    saved = Math.max(0, saved);
    return {
      saved,
      target: goal.targetAmount,
      pct: goal.targetAmount ? Math.max(0, Math.min(100, Math.round((saved / goal.targetAmount) * 100))) : 0
    };
  },

  // Revisa las metas sin alcanzar y marca como logradas las que ya llegaron
  // a su importe objetivo. Devuelve la lista de las recién alcanzadas para
  // que la UI pueda celebrarlas.
  checkGoalsAchieved() {
    const newlyAchieved = [];
    STORE.getGoals().forEach((goal) => {
      if (goal.achieved) return;
      const progress = this.goalProgress(goal);
      if (progress.saved >= goal.targetAmount) {
        newlyAchieved.push(STORE.markGoalAchieved(goal.id));
      }
    });
    return newlyAchieved;
  },

  // ---------- Rangos de fechas para las gráficas (día/semana/mes) ----------
  periodRange(period, refDate) {
    const ref = refDate || this.todayStr();
    if (period === "day") return { start: ref, end: ref };
    if (period === "week") {
      const d = new Date(ref + "T00:00:00");
      const dow = (d.getDay() + 6) % 7; // lunes = 0
      const start = new Date(d); start.setDate(d.getDate() - dow);
      const end = new Date(start); end.setDate(start.getDate() + 6);
      return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
    }
    // month
    return { start: ref.slice(0, 7) + "-01", end: ref.slice(0, 7) + "-31" };
  },
  transactionsInRange(start, end, type) {
    return STORE.getTransactions().filter((t) => {
      if (t.date < start || t.date > end) return false;
      return !type || t.type === type;
    });
  },
  periodBreakdown(period, type) {
    const { start, end } = this.periodRange(period);
    const txs = this.transactionsInRange(start, end, type || "expense");
    const totals = {};
    txs.forEach((t) => { totals[t.category] = (totals[t.category] || 0) + Number(t.amount || 0); });
    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    const items = Object.entries(totals)
      .map(([category, amount]) => ({ category, amount, pct: total ? (amount / total) * 100 : 0 }))
      .sort((a, b) => b.amount - a.amount);
    return { start, end, total, items, top: items[0] || null };
  },

  // Evalúa y cierra un día concreto contra la meta diaria. Idempotente.
  closeDay(date) {
    const settings = STORE.getSettings();
    const days = STORE.getDays();
    if (days[date]) return days[date];
    if (!settings.dailyGoal) return null;

    const spent = this.variableSpentForDate(date);
    const goal = this.effectiveGoalForDate(date);
    const record = {
      date,
      goal,
      baseGoal: settings.dailyGoal,
      spent,
      met: spent <= goal,
      closedAt: new Date().toISOString()
    };
    days[date] = record;
    STORE.saveDays(days);
    return record;
  },

  // Cierra automáticamente cualquier día pasado con actividad que aún no se
  // haya evaluado (por ejemplo, si el usuario no abrió la app ayer).
  closePastDaysIfNeeded() {
    const today = this.todayStr();
    const closed = [];
    this.allDatesWithActivity().forEach((date) => {
      if (date < today) {
        const rec = this.closeDay(date);
        if (rec) closed.push(rec);
      }
    });
    return closed;
  },

  currentStreak() {
    const days = STORE.getDays();
    const dates = Object.keys(days).sort().reverse();
    let streak = 0;
    for (const date of dates) {
      if (days[date].met) streak++;
      else break;
    }
    return streak;
  },

  bestStreak() {
    const days = STORE.getDays();
    const dates = Object.keys(days).sort();
    let best = 0;
    let current = 0;
    dates.forEach((date) => {
      if (days[date].met) {
        current++;
        best = Math.max(best, current);
      } else {
        current = 0;
      }
    });
    return best;
  },

  // Niveles de racha (piedras preciosas). Cuanto más se sube, más raro el
  // color; a partir de Diamante se queda ahí, pero los días siguen contando.
  STREAK_TIERS: [
    { min: 0, key: "start", label: { es: "Racha empezando", en: "Streak starting", fr: "Série qui commence", it: "Serie in avvio", pt: "Sequência começando" }, emoji: "🔥", from: "#8FD9B6", to: "#3FA983", text: "#0E3B2E" },
    { min: 3, key: "bronce", label: { es: "Nivel Bronce", en: "Bronze Level", fr: "Niveau Bronze", it: "Livello Bronzo", pt: "Nível Bronze" }, emoji: "🥉", from: "#E3A667", to: "#B06B2E", text: "#3A1F05" },
    { min: 7, key: "plata", label: { es: "Nivel Plata", en: "Silver Level", fr: "Niveau Argent", it: "Livello Argento", pt: "Nível Prata" }, emoji: "🥈", from: "#E7ECE9", to: "#AEBDB5", text: "#1C2A23" },
    { min: 14, key: "oro", label: { es: "Nivel Oro", en: "Gold Level", fr: "Niveau Or", it: "Livello Oro", pt: "Nível Ouro" }, emoji: "🥇", from: "#F2C94C", to: "#C98B12", text: "#3A2A05" },
    { min: 30, key: "esmeralda", label: { es: "Nivel Esmeralda", en: "Emerald Level", fr: "Niveau Émeraude", it: "Livello Smeraldo", pt: "Nível Esmeralda" }, emoji: "💎", from: "#3FD68C", to: "#0E8F52", text: "#053622" },
    { min: 60, key: "rubi", label: { es: "Nivel Rubí", en: "Ruby Level", fr: "Niveau Rubis", it: "Livello Rubino", pt: "Nível Rubi" }, emoji: "💎", from: "#FF6B7A", to: "#C81E3A", text: "#3A0510" },
    { min: 120, key: "topacio", label: { es: "Nivel Topacio", en: "Topaz Level", fr: "Niveau Topaze", it: "Livello Topazio", pt: "Nível Topázio" }, emoji: "💎", from: "#FFD873", to: "#E0932B", text: "#3A2205" },
    { min: 240, key: "diamante", label: { es: "Nivel Diamante", en: "Diamond Level", fr: "Niveau Diamant", it: "Livello Diamante", pt: "Nível Diamante" }, emoji: "💎", from: "#BEE9FF", to: "#4FA8D8", text: "#052436" }
  ],
  streakTier(streak) {
    const tiers = this.STREAK_TIERS;
    let current = tiers[0];
    for (const t of tiers) {
      if (streak >= t.min) current = t;
    }
    return current;
  },
  // Días que lleva el usuario dentro del nivel actual (no la racha total).
  // El nivel "empezando" arranca en streak=1 (min=0 es solo el valor
  // centinela para streak=0, que nunca llega a mostrarse), así que ahí el
  // conteo coincide directamente con la racha.
  daysInCurrentTier(streak) {
    const tier = this.streakTier(streak);
    return tier.key === "start" ? streak : streak - tier.min + 1;
  },

  // ---------- Diagnóstico financiero: arquetipo ----------
  // Clasifica al usuario en un "arquetipo" a partir de sus respuestas del
  // cuestionario inicial: cuánto gana vs. cuánto le gustaría ganar, cuántas
  // horas trabaja, cuánto gasta por categoría y cuánto logra ahorrar de
  // verdad. Reglas evaluadas en orden de prioridad; la primera que aplica gana.
  computeArchetype(d) {
    const income = Number(d.monthlyIncome) || 0;
    const desired = Number(d.desiredIncome) || 0;
    const expenses = d.expensesSnapshot || {};
    const totalExpenses = Object.values(expenses).reduce((sum, v) => sum + (Number(v) || 0), 0);
    const currentSavings = Number(d.currentSavingsMonthly) || 0;
    const expenseRatio = income ? totalExpenses / income : 0;
    const savingsRatio = income ? currentSavings / income : 0;
    const dailyWorkHours = (Number(d.hoursPerDay) || 0) + (Number(d.overtimeHours) || 0) / 5 + (Number(d.commuteMinutes) || 0) / 60;
    const incomeGap = desired && income ? Math.max(0, (desired - income) / desired) : 0;

    let key;
    if (expenseRatio >= 1) key = "grifo";
    else if ((dailyWorkHours >= 9 || d.multipleJobs) && savingsRatio < 0.05) key = "hamster";
    else if (incomeGap >= 0.35 && savingsRatio < 0.1) key = "sonador";
    else if (savingsRatio >= 0.15 && expenseRatio <= 0.85) key = "ahorrador";
    else key = "equilibrista";

    const archetype = DATA.archetypes.find((a) => a.key === key) || DATA.archetypes[DATA.archetypes.length - 1];
    return Object.assign({ expenseRatio, savingsRatio, dailyWorkHours, incomeGap, totalExpenses }, archetype);
  },

  // ---------- Perfil según ingreso vs. gasto ----------
  // Clasificación más directa (endeudado / al día / ahorrador pasivo /
  // inversor / frugal-FIRE) basada solo en cuánto gastas frente a cuánto
  // ganas, con el destino del ahorro como matiz entre ahorrador pasivo e
  // inversor. Complementa al arquetipo con una lectura de nivel de riesgo.
  computeIncomeExpenseProfile(d) {
    const income = Number(d.monthlyIncome) || 0;
    const expenses = d.expensesSnapshot || {};
    const totalExpenses = Object.values(expenses).reduce((sum, v) => sum + (Number(v) || 0), 0);
    const ratio = income ? totalExpenses / income : 0;
    const balance = income - totalExpenses;

    let key;
    if (ratio > 1.02) key = "endeudado";
    else if (ratio >= 0.98) key = "al_dia";
    else if (ratio < 0.5) key = "frugal_fire";
    else key = d.savingsBehavior === "invierte" ? "inversor" : "ahorrador_pasivo";

    const profile = DATA.incomeExpenseProfiles.find((p) => p.key === key) || DATA.incomeExpenseProfiles[1];
    return Object.assign({ ratio, balance }, profile);
  },

  // Paso (1-4) de la ruta hacia "inversor" en el que se encuentra el usuario
  // según su perfil de ingreso/gasto. null si aún no hay perfil calculado;
  // 5 significa que ya superó los 4 pasos (inversor o frugal-FIRE).
  roadmapStepFor(profileKey) {
    const map = { endeudado: 2, al_dia: 1, ahorrador_pasivo: 4, inversor: 5, frugal_fire: 5 };
    return map[profileKey] || null;
  },

  // ---------- Importar movimientos desde CSV bancario ----------
  // Todo se procesa en el dispositivo del usuario: el archivo nunca sale de
  // aquí. Es un parser tolerante (delimitador , o ;, con o sin cabecera,
  // fecha ISO o DD/MM/AAAA, importe con coma o punto decimal) porque cada
  // banco exporta su CSV con un formato ligeramente distinto.
  _normalizeText(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  },

  _splitCSVLine(line, delimiter) {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === delimiter && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    result.push(cur.trim());
    return result;
  },

  parseCSVRows(text) {
    const lines = text.split(/\r\n|\n|\r/).filter((l) => l.trim().length);
    if (!lines.length) return [];
    const delimiter = (lines[0].split(";").length > lines[0].split(",").length) ? ";" : ",";
    return lines.map((line) => this._splitCSVLine(line, delimiter));
  },

  _parseCSVDate(raw) {
    const s = String(raw || "").trim();
    let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `${m[1]}-${m[2]}-${m[3]}`;
    m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
    if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    return null;
  },

  _parseCSVAmount(raw) {
    let s = String(raw || "").trim().replace(/[^\d,.\-]/g, "");
    if (!s) return NaN;
    const lastComma = s.lastIndexOf(",");
    const lastDot = s.lastIndexOf(".");
    if (lastComma > -1 && lastComma > lastDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else if (lastDot > -1 && lastDot > lastComma) {
      s = s.replace(/,/g, "");
    }
    return parseFloat(s);
  },

  guessCategoryFor(type, description) {
    const norm = this._normalizeText(description);
    const map = (DATA.categoryKeywords[type === "income" ? "income" : "expense"]) || {};
    for (const catId in map) {
      if (map[catId].some((kw) => norm.includes(kw))) return catId;
    }
    return type === "income" ? "otros_ing" : "otros";
  },

  // Devuelve { rows: [{date, description, amount, type, category}], skipped }
  parseBankCSV(text) {
    const rows = this.parseCSVRows(text);
    if (!rows.length) return { rows: [], skipped: 0 };

    const header = rows[0].map((h) => this._normalizeText(h));
    let dateIdx = header.findIndex((h) => /fecha|date/.test(h));
    let descIdx = header.findIndex((h) => /concepto|descripcion|detalle|description/.test(h));
    let amountIdx = header.findIndex((h) => /importe|amount|cantidad|monto/.test(h));
    const hasHeader = dateIdx !== -1 || descIdx !== -1 || amountIdx !== -1;

    let dataRows;
    if (hasHeader) {
      dataRows = rows.slice(1);
      if (dateIdx === -1) dateIdx = 0;
      if (descIdx === -1) descIdx = 1;
      if (amountIdx === -1) amountIdx = rows[0].length - 1;
    } else {
      dateIdx = 0; descIdx = 1; amountIdx = 2;
      dataRows = rows;
    }

    const parsed = [];
    let skipped = 0;
    dataRows.forEach((cols) => {
      const date = this._parseCSVDate(cols[dateIdx]);
      const amount = this._parseCSVAmount(cols[amountIdx]);
      const description = (cols[descIdx] || "").trim();
      if (!date || isNaN(amount) || amount === 0) {
        skipped++;
        return;
      }
      const type = amount < 0 ? "expense" : "income";
      parsed.push({
        date,
        description: description || "Movimiento importado",
        amount: Math.abs(amount),
        type,
        category: this.guessCategoryFor(type, description)
      });
    });

    return { rows: parsed, skipped };
  },

  // Genera un movimiento de gasto simulado, como si viniera de una tarjeta
  // o pago móvil enlazado. Placeholder de una integración real (Open Banking).
  simulateLinkedExpense(accountId) {
    const merchants = [
      { category: "alimentacion", label: { es: "Supermercado", en: "Supermarket", fr: "Supermarché", it: "Supermercato", pt: "Supermercado" }, range: [8, 45] },
      { category: "transporte", label: { es: "Transporte público", en: "Public transport", fr: "Transport en commun", it: "Trasporto pubblico", pt: "Transporte público" }, range: [1.5, 12] },
      { category: "ocio", label: { es: "Cafetería", en: "Coffee shop", fr: "Café", it: "Bar", pt: "Cafeteria" }, range: [2, 9] },
      { category: "compras", label: { es: "Tienda online", en: "Online store", fr: "Boutique en ligne", it: "Negozio online", pt: "Loja online" }, range: [10, 60] },
      { category: "suscripciones", label: { es: "Servicio de streaming", en: "Streaming service", fr: "Service de streaming", it: "Servizio di streaming", pt: "Serviço de streaming" }, range: [6, 15] }
    ];
    const m = merchants[Math.floor(Math.random() * merchants.length)];
    const amount = +(Math.random() * (m.range[1] - m.range[0]) + m.range[0]).toFixed(2);
    return STORE.addTransaction({
      type: "expense",
      category: m.category,
      description: this.localized(m.label),
      amount,
      date: this.todayStr(),
      method: "movil",
      source: "linked",
      accountId
    });
  }
};
