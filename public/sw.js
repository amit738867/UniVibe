
// This is a basic service worker file.
// It's required for a web app to be considered a PWA.

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // No caching needed for this simple case, but we could cache assets here.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  return self.clients.claim();
});

// A fetch handler is required for the app to be considered "installable" by Chrome.
self.addEventListener('fetch', (event) => {
  // This is a "network-first" strategy.
  // We try to fetch from the network, and if that fails, we do nothing.
  // For a real offline-first app, you'd want to fall back to a cache.
  event.respondWith(
    fetch(event.request).catch(() => {
      // For this app, we don't need a complex offline fallback.
      // Returning a simple response or a cached "offline" page would go here.
      return new Response('Network error. You are likely offline.', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    })
  );
});
