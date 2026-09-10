// Capa de persistencia y lógica de negocio. Todo se guarda en localStorage:
// no hay backend, así que los datos viven solo en este navegador/dispositivo.
const STORE = {
  keys: {
    settings: "cg_settings",
    transactions: "cg_transactions",
    accounts: "cg_accounts",
    days: "cg_days"
  },

  defaultSettings: {
    currency: "EUR",
    dailyGoal: null,
    soundEnabled: true,
    userName: ""
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
    const symbols = { EUR: "€", USD: "$", MXN: "MX$", GBP: "£" };
    const symbol = symbols[cur] || cur + " ";
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
