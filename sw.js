/* Service Worker von Cumbre 90 — speichert statische Dateien für die
   Offline-Nutzung im Cache. Strategie "network-first": versucht immer
   zuerst, die neueste Version vom Server zu holen, und nutzt die
   zwischengespeicherte Kopie nur, wenn kein Netzwerk verfügbar ist. So wird
   jede neue Bereitstellung sofort sichtbar, ohne dass eine alte Version im
   Browser-Cache hängen bleibt. */

const CACHE_NAME = "cumbre90-de-cache-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/fonts.js",
  "./js/icons.js",
  "./js/data.js",
  "./js/state.js",
  "./js/mountain.js",
  "./js/share.js",
  "./js/views.js",
  "./js/app.js",
  "./icons/icon.svg",
  "./img/cover-cumbre90.png",
  "./img/hero-plan6dias.png",
  "./img/fondo-app.png",
  "./img/fondo-logros.png",
  "./img/montana-plan90.png",
  "./img/montana-quincena.png",
  "./img/logro-cumbre.png",
  "./img/consumidor-vip.png",
  "./img/miembro-atomy.png",
  "./img/agente.png",
  "./img/agente-especial.png",
  "./img/sales-master.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
