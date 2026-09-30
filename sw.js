/**
 * Service Worker - Long-term Cache for GitHub Pages
 * Caches all static assets (CSS, JS, images, fonts) for 1 year in browser cache.
 * This overrides GitHub Pages' 10-minute server cache TTL.
 */

const CACHE_NAME = "Areva-v1";

// All static assets to pre-cache on install
const PRECACHE_ASSETS = [
  // CSS
  "assets/css/bootstrap.min.css",
  "assets/css/all.min.css",
  "assets/css/animate.css",
  "assets/css/magnific-popup.css",
  "assets/css/meanmenu.css",
  "assets/css/swiper-bundle.min.css",
  "assets/css/nice-select.css",
  "assets/css/main.css",
  // JS
  "assets/js/jquery-3.7.1.min.js",
  "assets/js/bootstrap.bundle.min.js",
  "assets/js/gsap.min.js",
  "assets/js/ScrollTrigger.min.js",
  "assets/js/ScrollSmoother.min.js",
  "assets/js/ScrollToPlugin.min.js",
  "assets/js/SplitText.min.js",
  "assets/js/TextPlugin.js",
  "assets/js/chroma.min.js",
  "assets/js/jquery.nice-select.min.js",
  "assets/js/jquery.waypoints.js",
  "assets/js/jquery.counterup.min.js",
  "assets/js/swiper-bundle.min.js",
  "assets/js/jquery.meanmenu.min.js",
  "assets/js/parallaxie.js",
  "assets/js/jquery.magnific-popup.min.js",
  "assets/js/wow.min.js",
  "assets/js/viewport.jquery.js",
  "assets/js/main.js",
];

// Install: pre-cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate: clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch: Cache-First strategy for static assets, Network-First for HTML
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin and GitHub Pages assets
  if (event.request.method !== "GET") return;

  // Network-first for HTML pages (always fresh content)
  if (event.request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // Cache-First for all static assets (CSS, JS, images, fonts, webfonts)
  if (
    url.pathname.match(
      /\.(css|js|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf)$/,
    )
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) return response;
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return response;
        });
      }),
    );
    return;
  }
});
