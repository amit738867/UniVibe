// A basic service worker must have a fetch event handler to be considered
// installable by the browser. This is a minimal implementation.

self.addEventListener('fetch', (event) => {
  // This is a "pass-through" fetch handler. It doesn't do any caching,
  // but it's enough to make the PWA installable.
  event.respondWith(fetch(event.request));
});
