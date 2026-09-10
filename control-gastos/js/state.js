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
    archetypeKey: null
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

  transactionsForDate(date) {
    return STORE.getTransactions().filter((t) => t.date === date);
  },

  totalForDate(date, type) {
    return this.transactionsForDate(date)
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  },

  spentToday() {
    return this.totalForDate(this.todayStr(), "expense");
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
      saved += (settings.dailyGoal - this.spentToday());
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
      saved += (settings.dailyGoal - this.spentToday());
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

    const spent = this.totalForDate(date, "expense");
    const record = {
      date,
      goal: settings.dailyGoal,
      spent,
      met: spent <= settings.dailyGoal,
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
    { min: 0, key: "start", label: "Racha empezando", emoji: "🔥", from: "#8FD9B6", to: "#3FA983", text: "#0E3B2E" },
    { min: 3, key: "bronce", label: "Nivel Bronce", emoji: "🥉", from: "#E3A667", to: "#B06B2E", text: "#3A1F05" },
    { min: 7, key: "plata", label: "Nivel Plata", emoji: "🥈", from: "#E7ECE9", to: "#AEBDB5", text: "#1C2A23" },
    { min: 14, key: "oro", label: "Nivel Oro", emoji: "🥇", from: "#F2C94C", to: "#C98B12", text: "#3A2A05" },
    { min: 30, key: "esmeralda", label: "Nivel Esmeralda", emoji: "💎", from: "#3FD68C", to: "#0E8F52", text: "#053622" },
    { min: 60, key: "rubi", label: "Nivel Rubí", emoji: "💎", from: "#FF6B7A", to: "#C81E3A", text: "#3A0510" },
    { min: 120, key: "topacio", label: "Nivel Topacio", emoji: "💎", from: "#FFD873", to: "#E0932B", text: "#3A2205" },
    { min: 240, key: "diamante", label: "Nivel Diamante", emoji: "💎", from: "#BEE9FF", to: "#4FA8D8", text: "#052436" }
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

  // Genera un movimiento de gasto simulado, como si viniera de una tarjeta
  // o pago móvil enlazado. Placeholder de una integración real (Open Banking).
  simulateLinkedExpense(accountId) {
    const merchants = [
      { category: "alimentacion", label: "Supermercado", range: [8, 45] },
      { category: "transporte", label: "Transporte público", range: [1.5, 12] },
      { category: "ocio", label: "Cafetería", range: [2, 9] },
      { category: "compras", label: "Tienda online", range: [10, 60] },
      { category: "suscripciones", label: "Servicio de streaming", range: [6, 15] }
    ];
    const m = merchants[Math.floor(Math.random() * merchants.length)];
    const amount = +(Math.random() * (m.range[1] - m.range[0]) + m.range[0]).toFixed(2);
    return STORE.addTransaction({
      type: "expense",
      category: m.category,
      description: m.label,
      amount,
      date: this.todayStr(),
      method: "movil",
      source: "linked",
      accountId
    });
  }
};
