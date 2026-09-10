// Genera la tarjeta de reconocimiento diario (canvas) y la comparte / descarga.
const SHARE = {
  TAGLINES: [
    "Gastar con cabeza también se puede presumir.",
    "Hoy le gané a mis propios gastos.",
    "Ahorrar, un día a la vez."
  ],

  async ensureFonts() {
    try {
      await Promise.all([
        document.fonts.load('700 60px "Caveat"'),
        document.fonts.load('600 60px "Caveat"')
      ]);
      await document.fonts.ready;
    } catch (e) {
      // Si la fuente no carga (sin red, navegador antiguo...) se dibuja con
      // la fuente de sistema de respaldo; no es un error fatal.
    }
  },

  inviteText(streak) {
    if (streak > 0) {
      return "Llevo " + streak + (streak === 1 ? " día" : " días") + " sin pasarme del presupuesto con Hucha 🐷, deberías probarla.";
    }
    return "Estoy controlando mis gastos con Hucha 🐷, deberías probarla.";
  },

  async shareText(text) {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Hucha", text });
        return "shared";
      } catch (e) {
        if (e && e.name === "AbortError") return "cancelled";
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return "copied";
      } catch (e) { /* portapapeles no disponible: se ignora */ }
    }
    return "unavailable";
  },

  // Confeti de fiesta: tiras de papel de colores + un par de "regalitos"
  // brillantes, explotando hacia arriba desde (cx, cy).
  drawConfettiBurst(ctx, cx, cy, scale) {
    const colors = ["#FFFFFF", "#F2C94C", "#EB5757", "#56CCF2", "#BB6BD9", "#6FCF97"];
    const rng = (seed) => {
      const x = Math.sin(seed * 999) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 26; i++) {
      const angle = -Math.PI / 2 + (rng(i) - 0.5) * 2.6;
      const dist = (60 + rng(i + 50) * 220) * scale;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(rng(i + 100) * Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length];
      const w = (7 + rng(i + 20) * 6) * scale;
      const h = (12 + rng(i + 30) * 8) * scale;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
    // un par de streamers curvos
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 3 * scale;
    ctx.lineCap = "round";
    [[-1, 0.85], [1, 1]].forEach(([dir, k]) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.bezierCurveTo(
        cx + dir * 60 * scale, cy - 140 * scale * k,
        cx + dir * 160 * scale, cy - 90 * scale * k,
        cx + dir * 190 * scale, cy - 220 * scale * k
      );
      ctx.stroke();
    });
    // "regalitos" brillantes
    [[-150, -170], [170, -140], [90, -260]].forEach(([dx, dy], i) => {
      ctx.save();
      ctx.translate(cx + dx * scale, cy + dy * scale);
      ctx.rotate((rng(i + 200) - 0.5) * 1.2);
      const g = ctx.createLinearGradient(-16 * scale, -16 * scale, 16 * scale, 16 * scale);
      g.addColorStop(0, "#FFF3CE");
      g.addColorStop(1, "#F2C94C");
      ctx.fillStyle = g;
      const s = 26 * scale;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    });
  },

  // Plantilla compartida de "celebración": fondo cálido (tintado según hueFrom/
  // hueTo), confeti, trofeo, titular manuscrito y una leyenda estilo máquina de
  // escribir abajo a la izquierda. La usan la tarjeta de nivel y la de metas.
  async buildCelebrationCardDataURL({ headlineLines, caption, userName, hueFrom, hueTo }) {
    await this.ensureFonts();
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    this.roundRectPath(ctx, 0, 0, W, H, 56);
    ctx.clip();

    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, hueFrom || "#F2994A");
    bgGrad.addColorStop(1, hueTo || "#EB6B2E");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // marco fino de contraste
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 6;
    this.roundRectPath(ctx, 14, 14, W - 28, H - 28, 44);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "700 36px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillText("🐷 Hucha", 56, 76);

    // titular manuscrito, con un ligero giro para que parezca escrito a mano
    const headlineCenterY = 250;
    const lineHeight = 82;
    ctx.save();
    ctx.translate(W / 2, headlineCenterY);
    ctx.rotate(-0.03);
    ctx.textAlign = "center";
    ctx.font = "700 80px 'Caveat', 'Segoe Script', cursive";
    ctx.fillStyle = "#FFFFFF";
    const startY = -((headlineLines.length - 1) * lineHeight) / 2;
    headlineLines.forEach((line, i) => {
      ctx.fillText(line, 0, startY + i * lineHeight);
    });
    ctx.restore();

    // El confeti y el trofeo se colocan siempre a una distancia fija por
    // debajo del final del titular, sea de 2 o 3 líneas.
    const headlineBottom = headlineCenterY + ((headlineLines.length - 1) * lineHeight) / 2 + lineHeight / 2;
    const confettiCy = headlineBottom + 260;
    const trophyY = confettiCy + 290;

    this.drawConfettiBurst(ctx, W / 2, confettiCy, 0.9);

    ctx.textAlign = "center";
    ctx.font = "210px system-ui, sans-serif";
    ctx.fillText("🏆", W / 2, trophyY);

    if (caption) {
      ctx.textAlign = "left";
      ctx.font = "700 40px 'Courier New', Courier, monospace";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(caption, 56, H - 90);
    }
    if (userName) {
      ctx.textAlign = "right";
      ctx.font = "600 30px Inter, system-ui, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(userName, W - 56, H - 90);
    }

    return canvas.toDataURL("image/png");
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
  // al cerrar el día. El tono de fondo cambia según la piedra del nivel.
  buildTierCardDataURL({ streak, userName }) {
    const tier = LOGIC.streakTier(streak || 0);
    const daysInTier = LOGIC.daysInCurrentTier(streak || 0);
    const headlineLines = tier.key === "start"
      ? [daysInTier + (daysInTier === 1 ? " día" : " días"), "sin pasarme"]
      : [daysInTier + (daysInTier === 1 ? " día" : " días"), "en el nivel " + tier.label.replace("Nivel ", "")];
    return this.buildCelebrationCardDataURL({
      headlineLines,
      caption: "Racha de " + streak + " día" + (streak === 1 ? "" : "s"),
      userName,
      hueFrom: tier.from,
      hueTo: tier.to
    });
  },

  // Tarjeta de logro para una meta de ahorro con propósito propio
  // (p. ej. "Cena con amigos"), independiente de la racha diaria.
  buildGoalCardDataURL({ goal, userName }) {
    return this.buildCelebrationCardDataURL({
      headlineLines: ["¡Logro alcanzado", "gracias a Hucha!"],
      caption: goal.label,
      userName,
      hueFrom: "#F2C94C",
      hueTo: "#EB8B3D"
    });
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
