const CACHE_NAME = 'budgettracker-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/welcome.html',
  '/login.html',
  '/register.html',
  '/income-expense.html',
  '/monthly.html',
  '/barchart.html',
  '/savings-goals.html',
  '/bill-reminders.html',
  '/pdf-report.html',
  '/business.html',
  '/style.css',
  '/theme.js',
  '/translations.js',
  '/language.js',
  '/help-tour.js',
  '/onboarding.js',
  '/userdata.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install — cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET and API requests (don't cache API calls)
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Save fresh copy to cache
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // If nothing cached, return offline page
          return caches.match('/index.html');
        });
      })
  );
});
