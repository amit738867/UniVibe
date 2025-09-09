
// A basic, no-op service worker file.
// This is required for a web app to be considered a PWA.

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // You can add pre-caching logic here if needed.
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
});

self.addEventListener('fetch', (event) => {
  // This service worker doesn't intercept fetch requests.
  // It's just here to make the app installable.
});
