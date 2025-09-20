const CACHE_NAME = 'lowresify-cache-v1';
const CACHE_MAX_AGE = 7 * 24 * 60 * 60;  // 1 week in seconds

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    // Fetch first, fallback to cache if no connection
    fetch(event.request).catch(() => {
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(event.request);
        if (cached) {
          // Check cache age
          const dateHeader = cached.headers.get('sw-cache-time');
          if (dateHeader) {
            const age = (Date.now() - Number(dateHeader)) / 1000;
            if (age < CACHE_MAX_AGE) return cached;
          }
          // If too old, fetch new
        }
        try {
          const response = await fetch(event.request);
          if (response.ok) {
            // Clone and add a custom header for cache time
            const cloned = response.clone();
            const headers = new Headers(cloned.headers);
            headers.append('sw-cache-time', Date.now().toString());
            const body = await cloned.blob();
            const newResponse = new Response(body, { status: cloned.status, statusText: cloned.statusText, headers });
            cache.put(event.request, newResponse.clone());
            return newResponse;
          }
          return response;
        } catch (e) {
          return cached || Response.error();
        }
      })
    })
  );
});
