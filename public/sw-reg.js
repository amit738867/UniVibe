
if ('serviceWorker' in navigator) {
  // We want to capture the prompt event and defer it.
  // This event is fired by the browser when a PWA is installable.
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('`beforeinstallprompt` event was fired.');
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = e;
    // We dispatch a custom event to notify our app that the prompt is ready.
    // This is more reliable than relying on component mount timing.
    window.dispatchEvent(new Event('pwa-install-ready'));
  });

  // Register the service worker after the page loads.
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
