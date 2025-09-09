// This script is loaded in the <head> of the document
// and is responsible for capturing the beforeinstallprompt event.
// It should be loaded with `strategy="beforeInteractive"` in Next.js Script component.

// We listen for the event, prevent the default mini-infobar from appearing on mobile,
// and then save the event so it can be triggered later.
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was captured.`);
});

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
