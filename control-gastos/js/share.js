// Genera la tarjeta de reconocimiento diario (canvas) y la comparte / descarga.
const SHARE = {
  TAGLINES: [
    "Gastar con cabeza también se puede presumir.",
    "Hoy le gané a mis propios gastos.",
    "Ahorrar, un día a la vez."
  ],

  streakTier(streak) {
    if (streak >= 14) return { label: "🏅 Racha de oro", from: "#F2C94C", to: "#C98B12", text: "#3A2A05" };
    if (streak >= 7) return { label: "🥈 Racha sólida", from: "#E7ECE9", to: "#AEBDB5", text: "#1C2A23" };
    if (streak >= 3) return { label: "🥉 Racha en marcha", from: "#E3A667", to: "#B06B2E", text: "#3A1F05" };
    return { label: "🔥 Racha empezando", from: "#8FD9B6", to: "#3FA983", text: "#0E3B2E" };
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

  buildCardDataURL({ date, goal, spent, streak, userName }) {
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const tier = this.streakTier(streak || 0);
    const tagline = this.TAGLINES[new Date(date + "T00:00:00").getDate() % this.TAGLINES.length];

    // Fondo con esquinas redondeadas
    this.roundRectPath(ctx, 0, 0, W, H, 56);
    ctx.clip();

    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0E3B2E");
    bgGrad.addColorStop(1, "#123C2F");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Resplandores decorativos
    this.softGlow(ctx, 120, 160, 260, "#F2C94C");
    this.softGlow(ctx, W - 100, H - 220, 320, "#3FA983");

    // Confeti de monedas sutil
    const dots = [[90, 420], [980, 300], [140, 900], [950, 760], [520, 90], [860, 1180], [70, 620]];
    dots.forEach(([dx, dy], i) => {
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = i % 2 === 0 ? "#F2C94C" : "#FFFFFF";
      ctx.beginPath();
      ctx.arc(dx, dy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Marca "Hucha" arriba a la izquierda
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = "700 42px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("🐷 Hucha", 64, 90);

    // Chip de racha arriba a la derecha
    if (streak > 0) {
      ctx.font = "600 28px Inter, system-ui, sans-serif";
      const chipLabel = tier.label + " · " + streak + "d";
      const chipW = ctx.measureText(chipLabel).width + 48;
      const chipX = W - 64 - chipW;
      const chipGrad = ctx.createLinearGradient(chipX, 0, chipX + chipW, 0);
      chipGrad.addColorStop(0, tier.from);
      chipGrad.addColorStop(1, tier.to);
      this.roundRectPath(ctx, chipX, 60, chipW, 60, 30);
      ctx.fillStyle = chipGrad;
      ctx.fill();
      ctx.fillStyle = tier.text;
      ctx.textAlign = "center";
      ctx.fillText(chipLabel, chipX + chipW / 2, 90);
      ctx.textAlign = "left";
    }

    // Insignia central
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(242, 201, 76, 0.16)";
    ctx.beginPath();
    ctx.arc(W / 2, 300, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "150px system-ui, sans-serif";
    ctx.fillText("🏆", W / 2, 308);

    ctx.font = "700 58px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("¡Meta de gasto cumplida!", W / 2, 500);

    const dateLabel = new Date(date + "T00:00:00").toLocaleDateString("es-ES", {
      weekday: "long", day: "numeric", month: "long"
    });
    ctx.font = "500 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText(dateLabel, W / 2, 560);

    // Cifra hero: lo ahorrado
    const saved = Math.max(0, goal - spent);
    ctx.font = "700 66px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText("Ahorré", W / 2, 660);
    ctx.font = "700 128px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#F2C94C";
    ctx.fillText(LOGIC.formatMoney(saved), W / 2, 780);

    ctx.font = "400 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText("Gasté " + LOGIC.formatMoney(spent) + " de mi meta de " + LOGIC.formatMoney(goal), W / 2, 850);

    // Franja de racha (si aplica) como refuerzo visual grande
    let taglineY = 980;
    if (streak > 1) {
      const bandY = 940;
      this.roundRectPath(ctx, 100, bandY, W - 200, 110, 24);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();
      ctx.font = "600 46px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("🔥 " + streak + " días seguidos sin pasarme", W / 2, bandY + 55);
      taglineY = 1140;
    }

    // Frase + firma
    ctx.font = "italic 400 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText(tagline, W / 2, taglineY);

    ctx.font = "600 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("Hucha" + (userName ? " · " + userName : ""), W / 2, taglineY + 120);

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
    const file = new File([blob], "logro-hucha.png", { type: "image/png" });

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
    a.download = "logro-hucha.png";
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
