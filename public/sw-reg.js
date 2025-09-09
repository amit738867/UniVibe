if ('serviceWorker' in navigator) {
  // We use window.load in order to not delay the initial render of the page.
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        console.log(
          'Service Worker registration successful with scope: ',
          registration.scope
        );
      })
      .catch(function (err) {
        console.log('Service Worker registration failed: ', err);
      });
  });

  // Capture the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = e;
    console.log(`'beforeinstallprompt' event was fired.`);
  });
}
