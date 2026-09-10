// Genera la tarjeta de reconocimiento diario (canvas) y la comparte / descarga.
const SHARE = {
  buildCardDataURL({ date, goal, spent, streak, userName }) {
    const canvas = document.createElement("canvas");
    const W = 1080, H = 1080;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#0E3B2E");
    grad.addColorStop(1, "#17624B");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Decoración: círculos suaves
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#F2C94C";
    ctx.beginPath(); ctx.arc(120, 120, 220, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(960, 940, 260, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // Insignia
    ctx.fillStyle = "#F2C94C";
    ctx.beginPath();
    ctx.arc(W / 2, 300, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "140px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🏆", W / 2, 310);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 56px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillText("¡Meta de gasto cumplida!", W / 2, 480);

    const dateLabel = new Date(date + "T00:00:00").toLocaleDateString("es-ES", {
      weekday: "long", day: "numeric", month: "long"
    });
    ctx.font = "500 38px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText(dateLabel, W / 2, 545);

    ctx.font = "700 78px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#F2C94C";
    ctx.fillText(LOGIC.formatMoney(spent) + " de " + LOGIC.formatMoney(goal), W / 2, 660);

    ctx.font = "400 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    const saved = Math.max(0, goal - spent);
    ctx.fillText("Ahorré " + LOGIC.formatMoney(saved) + " respecto a mi meta diaria", W / 2, 715);

    if (streak > 1) {
      ctx.font = "600 44px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("🔥 Racha de " + streak + " días seguidos", W / 2, 800);
    }

    ctx.font = "600 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#0E3B2E";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("Control de Gastos" + (userName ? " · " + userName : ""), W / 2, 980);

    return canvas.toDataURL("image/png");
  },

  dataURLToBlob(dataURL) {
    const [meta, b64] = dataURL.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  },

  async shareCard(dataURL, text) {
    const blob = this.dataURLToBlob(dataURL);
    const file = new File([blob], "logro-control-de-gastos.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "¡Cumplí mi meta de gasto diario!",
          text
        });
        return "shared";
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: "¡Cumplí mi meta de gasto diario!", text });
        return "shared-text";
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }

    this.downloadCard(dataURL);
    return "downloaded";
  },

  downloadCard(dataURL) {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "logro-control-de-gastos.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  },

  socialLinks(text) {
    const encoded = encodeURIComponent(text);
    return {
      whatsapp: "https://wa.me/?text=" + encoded,
      twitter: "https://twitter.com/intent/tweet?text=" + encoded,
      telegram: "https://t.me/share/url?url=&text=" + encoded
    };
  }
};
