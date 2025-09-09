// This script is responsible for two things:
// 1. Registering the service worker.
// 2. Capturing the 'beforeinstallprompt' event.

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the browser's default install prompt
  e.preventDefault();
  // Stash the event so it can be triggered later from our UI.
  window.deferredPrompt = e;
  console.log('`beforeinstallprompt` event was captured.');
});
