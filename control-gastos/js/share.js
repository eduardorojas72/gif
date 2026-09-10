// Genera la tarjeta de reconocimiento diario (canvas) y la comparte / descarga.
const SHARE = {
  TAGLINES: [
    "Gastar con cabeza también se puede presumir.",
    "Hoy le gané a mis propios gastos.",
    "Ahorrar, un día a la vez."
  ],

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

  // Gema facetada dibujada a mano (los emojis no tienen variantes de color
  // por piedra, así que para esmeralda/rubí/topacio/diamante se dibuja esto
  // en vez del emoji, con el color exacto del nivel).
  drawGem(ctx, cx, cy, r, from, to) {
    ctx.save();
    ctx.translate(cx, cy);

    const grad = ctx.createLinearGradient(0, -r, 0, r);
    grad.addColorStop(0, from);
    grad.addColorStop(1, to);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.55, -r * 0.65);
    ctx.lineTo(r * 0.55, -r * 0.65);
    ctx.lineTo(r * 0.95, -r * 0.15);
    ctx.lineTo(0, r);
    ctx.lineTo(-r * 0.95, -r * 0.15);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = Math.max(2, r * 0.035);
    ctx.beginPath();
    ctx.moveTo(-r * 0.55, -r * 0.65);
    ctx.lineTo(r * 0.55, -r * 0.65);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.moveTo(-r * 0.55, -r * 0.65);
    ctx.lineTo(0, r);
    ctx.moveTo(r * 0.55, -r * 0.65);
    ctx.lineTo(0, r);
    ctx.moveTo(-r * 0.95, -r * 0.15);
    ctx.lineTo(r * 0.95, -r * 0.15);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.ellipse(-r * 0.18, -r * 0.35, r * 0.14, r * 0.22, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // Dibuja el emblema del nivel (emoji o gema vectorial según el nivel) en
  // el punto (cx, cy), con tamaño de fuente/gema equivalente a fontPx.
  drawTierEmblem(ctx, tier, cx, cy, fontPx) {
    if (tier.gem) {
      this.drawGem(ctx, cx, cy, fontPx * 0.42, tier.from, tier.to);
    } else {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = fontPx + "px system-ui, sans-serif";
      ctx.fillText(tier.emoji, cx, cy + fontPx * 0.03);
    }
  },

  buildCardDataURL({ date, goal, spent, streak, userName }) {
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const tier = LOGIC.streakTier(streak || 0);
    const tagline = this.TAGLINES[new Date(date + "T00:00:00").getDate() % this.TAGLINES.length];

    // Fondo con esquinas redondeadas
    this.roundRectPath(ctx, 0, 0, W, H, 56);
    ctx.clip();

    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0E3B2E");
    bgGrad.addColorStop(1, "#123C2F");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Resplandores decorativos, tintados según el nivel de racha actual
    this.softGlow(ctx, 120, 160, 260, tier.from);
    this.softGlow(ctx, W - 100, H - 220, 320, tier.to);

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
      const chipLabel = tier.emoji + " " + tier.label + " · " + streak + "d";
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
      const bandText = tier.key === "start"
        ? "🔥 " + streak + " días seguidos sin pasarme"
        : tier.emoji + " " + streak + " días en el " + tier.label.toLowerCase();
      ctx.fillText(bandText, W / 2, bandY + 55);
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

  // Tarjeta de "nivel" para presumir la racha en cualquier momento, no solo
  // al cerrar el día. Más protagonismo para la piedra/gema del nivel actual.
  buildTierCardDataURL({ streak, userName }) {
    const W = 1080, H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const tier = LOGIC.streakTier(streak || 0);
    const daysInTier = LOGIC.daysInCurrentTier(streak || 0);

    this.roundRectPath(ctx, 0, 0, W, H, 56);
    ctx.clip();

    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#0E3B2E");
    bgGrad.addColorStop(1, "#123C2F");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    this.softGlow(ctx, W / 2, 380, 420, tier.from);
    this.softGlow(ctx, 140, H - 160, 260, tier.to);
    this.softGlow(ctx, W - 120, H - 120, 220, tier.to);

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = "700 40px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("🐷 Hucha", 60, 80);
    ctx.textAlign = "right";
    ctx.font = "600 30px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText("Racha de " + streak + " días", W - 60, 80);

    ctx.textAlign = "center";
    this.drawTierEmblem(ctx, tier, W / 2, 370, 230);

    ctx.font = "700 64px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(tier.label, W / 2, 560);

    const chipLabel = daysInTier + (daysInTier === 1 ? " día" : " días") + " en el " + tier.label.toLowerCase();
    ctx.font = "700 44px Inter, system-ui, sans-serif";
    const chipW = ctx.measureText(chipLabel).width + 64;
    const chipX = (W - chipW) / 2;
    const chipGrad = ctx.createLinearGradient(chipX, 0, chipX + chipW, 0);
    chipGrad.addColorStop(0, tier.from);
    chipGrad.addColorStop(1, tier.to);
    this.roundRectPath(ctx, chipX, 640, chipW, 90, 45);
    ctx.fillStyle = chipGrad;
    ctx.fill();
    ctx.fillStyle = tier.text;
    ctx.fillText(chipLabel, W / 2, 685);

    ctx.font = "italic 400 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#CFE8DE";
    ctx.fillText("Sin pasarme de mi meta diaria, un día a la vez.", W / 2, 830);

    ctx.font = "600 34px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("Hucha" + (userName ? " · " + userName : ""), W / 2, 960);

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
