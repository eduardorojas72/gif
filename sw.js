/* Service worker de Cumbre Master — met en cache les fichiers statiques pour l'usage hors ligne.
   Stratégie "network-first" : essaie toujours de récupérer la version la plus récente
   du serveur en premier, et n'utilise la copie en cache que si le réseau est indisponible. Ainsi,
   chaque nouveau déploiement se voit immédiatement sans laisser de traces d'une ancienne
   version bloquée dans le cache du navigateur. */

const CACHE_NAME = "cumbre-master-cache-v5";
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
  "./img/cover-cumbremaster.png",
  "./img/fondo-cumbremaster.png",
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
