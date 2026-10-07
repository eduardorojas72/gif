// Genera la tarjeta de invitación (canvas) y la comparte / descarga, para
// que quien hace el test pueda publicarla en redes o enviarla por WhatsApp.
// A propósito no muestra el resultado: es un gancho de curiosidad para que
// quien la vea quiera hacer el test también.
const SHARE = {
  SITE_URL: "testeconomico.vercel.app",

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

  buildInviteCardDataURL() {
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    this.roundRectPath(ctx, 0, 0, W, H, 56);
    ctx.clip();

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#12152E");
    bg.addColorStop(1, "#23285C");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    this.softGlow(ctx, W * 0.15, 220, 300, "#5B4CF0");
    this.softGlow(ctx, W * 0.85, H - 260, 340, "#22C3A6");

    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 4;
    this.roundRectPath(ctx, 14, 14, W - 28, H - 28, 44);
    ctx.stroke();

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = "700 34px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("🧭 ¿Cómo está tu economía?", 56, 86);

    ctx.textAlign = "center";
    ctx.font = "190px system-ui, sans-serif";
    ctx.fillText("😟", W / 2, 400);

    ctx.font = "700 54px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    const headlineLines = this.wrapText(ctx, "He hecho este test de 2 minutos sobre mi economía… y el resultado me preocupa.", W - 160);
    let y = 600;
    headlineLines.forEach((line) => { ctx.fillText(line, W / 2, y); y += 66; });

    y += 50;
    ctx.font = "500 36px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    const subLines = this.wrapText(ctx, "¿Te atreves a hacerlo tú también y descubrir cómo mejorar tu situación financiera?", W - 180);
    subLines.forEach((line) => { ctx.fillText(line, W / 2, y); y += 50; });

    ctx.textAlign = "left";
    ctx.font = "600 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("Hazlo aquí:", 56, H - 128);
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
