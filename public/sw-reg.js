
// This script handles service worker registration and captures the PWA install prompt.

// --- PWA Install Prompt Handling ---
// We need to capture the 'beforeinstallprompt' event so we can trigger it later.
// It's captured here in a global script to avoid race conditions with React's lifecycle.
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was captured and stashed.`);
});


// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
