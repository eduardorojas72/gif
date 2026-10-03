// Alertas sonoras generadas con Web Audio API (sin archivos externos, funciona offline).
const AUDIO = {
  _ctx: null,
  _ctx_get() {
    if (!this._ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      this._ctx = new Ctx();
    }
    if (this._ctx.state === "suspended") this._ctx.resume();
    return this._ctx;
  },

  _tone(freq, startTime, duration, ctx, type, gainPeak) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainPeak || 0.2, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  },

  // Alerta de "has superado tu meta diaria": dos tonos descendentes, tipo aviso.
  playAlert() {
    const ctx = this._ctx_get();
    if (!ctx) return;
    const t = ctx.currentTime;
    this._tone(880, t, 0.18, ctx, "square", 0.18);
    this._tone(660, t + 0.2, 0.22, ctx, "square", 0.18);
  },

  // Melodía de logro al cerrar un día cumpliendo la meta: arpegio ascendente.
  playSuccess() {
    const ctx = this._ctx_get();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      this._tone(freq, t + i * 0.12, 0.3, ctx, "sine", 0.15);
    });
  },

  playTapFeedback() {
    const ctx = this._ctx_get();
    if (!ctx) return;
    this._tone(440, ctx.currentTime, 0.08, ctx, "sine", 0.08);
  }
};
