/* Cumbre 90 service worker — caches static files for offline use.
   "Network-first" strategy: always tries to fetch the latest version from
   the server first, and only falls back to the cached copy when there's no
   network. This way, every new deploy shows up immediately without any
   trace of an old version stuck in the browser cache. */

const CACHE_NAME = "cumbre90-cache-v6";
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
