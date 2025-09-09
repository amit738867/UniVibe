// A basic service worker to make the app installable.
// It includes a fetch handler to satisfy the PWA criteria.

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // You can pre-cache assets here if needed.
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

// A fetch handler is required for a PWA to be installable.
// This basic handler just passes the request through to the network.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
