/* Service worker de Cumbre Master — cachea los archivos estáticos para uso offline.
   Estrategia "network-first": siempre intenta traer la versión más reciente
   del servidor primero, y solo usa la copia en caché si no hay red. Así,
   cada despliegue nuevo se ve de inmediato sin dejar rastros de una versión
   vieja atascada en el caché del navegador. */

const CACHE_NAME = "cumbre-master-cache-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/icons.js",
  "./js/fonts.js",
  "./js/data.js",
  "./js/state.js",
  "./js/mountain.js",
  "./js/views.js",
  "./js/app.js",
  "./icons/icon.svg",
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
