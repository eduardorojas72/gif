// Genera la tarjeta de resultado (canvas) y la comparte / descarga, para que
// quien hace el test pueda publicarla en redes o enviarla por WhatsApp.
const SHARE = {
  SITE_URL: "test-economico.vercel.app",

  riskColors(key) {
    const map = {
      rojos: { from: "#E5484D", to: "#B91C1C" },
      limite: { from: "#F2994A", to: "#C96A1F" },
      deuda_preocupa: { from: "#F2994A", to: "#C96A1F" },
      hamster: { from: "#F2994A", to: "#C96A1F" },
      ahorra_dependiente: { from: "#5B4CF0", to: "#4436D6" },
      solido: { from: "#22C3A6", to: "#1A9A84" }
    };
    return map[key] || map.solido;
  },

  roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  },

  softGlow(ctx, x, y, r, color) {
    ctx.save();
    try { ctx.filter = "blur(60px)"; } catch (e) { /* filter no soportado: se dibuja sin desenfoque */ }
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach((w) => {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  },

  buildResultCardDataURL(profile) {
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const hue = this.riskColors(profile.key);

    this.roundRectPath(ctx, 0, 0, W, H, 56);
    ctx.clip();

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#12152E");
    bg.addColorStop(1, "#1C2152");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    this.softGlow(ctx, W * 0.15, 220, 300, hue.from);
    this.softGlow(ctx, W * 0.85, H - 260, 340, hue.to);

    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 4;
    this.roundRectPath(ctx, 14, 14, W - 28, H - 28, 44);
    ctx.stroke();

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = "700 34px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("🧭 ¿Cómo está tu economía?", 56, 86);

    ctx.font = "600 30px Inter, system-ui, sans-serif";
    const chipLabel = "Riesgo: " + profile.risk;
    const chipW = ctx.measureText(chipLabel).width + 56;
    const chipX = W - 56 - chipW;
    const chipGrad = ctx.createLinearGradient(chipX, 0, chipX + chipW, 0);
    chipGrad.addColorStop(0, hue.from);
    chipGrad.addColorStop(1, hue.to);
    this.roundRectPath(ctx, chipX, 150, chipW, 60, 30);
    ctx.fillStyle = chipGrad;
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(chipLabel, chipX + chipW / 2, 180);

    ctx.textAlign = "center";
    ctx.font = "220px system-ui, sans-serif";
    ctx.fillText(profile.emoji, W / 2, 470);

    ctx.font = "700 60px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    const labelLines = this.wrapText(ctx, profile.label, W - 160);
    const labelStartY = 660;
    labelLines.forEach((line, i) => ctx.fillText(line, W / 2, labelStartY + i * 74));

    const margenY = labelStartY + (labelLines.length - 1) * 74 + 150;
    ctx.font = "500 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillText("Margen mensual estimado", W / 2, margenY);
    ctx.font = "700 62px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = profile.margin < 0 ? "#FF8A8A" : "#8CF2D6";
    const margenLabel = (profile.margin >= 0 ? "+" : "") + APP.formatMoney(profile.margin);
    ctx.fillText(margenLabel, W / 2, margenY + 70);

    ctx.textAlign = "left";
    ctx.font = "600 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("Haz tú también el test:", 56, H - 128);
    ctx.font = "700 38px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#8CF2D6";
    ctx.fillText(this.SITE_URL, 56, H - 78);

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

  downloadCard(dataURL) {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "resultado-economia.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  },

  async shareCard(dataURL, text) {
    const blob = this.dataURLToBlob(dataURL);
    const file = new File([blob], "resultado-economia.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "¿Cómo está tu economía?", text });
        return "shared";
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: "¿Cómo está tu economía?", text });
        return "shared-text";
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }

    this.downloadCard(dataURL);
    return "downloaded";
  }
};
