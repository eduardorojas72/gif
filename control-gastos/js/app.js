(function init() {
  // Cierra automáticamente cualquier día pasado que quedara sin evaluar.
  LOGIC.closePastDaysIfNeeded();

  document.getElementById("tabbar").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    UI.render(btn.dataset.tab);
  });

  const settings = STORE.getSettings();
  if (!settings.onboardingDone) {
    UI.startOnboarding();
  } else {
    UI.render("hoy");
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
