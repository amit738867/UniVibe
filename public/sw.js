// This is the service worker file.
// It's required for a PWA to be installable.

// A simple fetch event handler is required to make the app installable.
self.addEventListener('fetch', (event) => {
  // We are not adding any specific caching logic here for now.
  // This basic handler is enough to meet the PWA criteria.
  event.respondWith(fetch(event.request));
});
