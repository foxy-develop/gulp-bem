function init() {
  'use strict';

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator && 
  (window.location.protocol === 'https:' || isLocalhost)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => 
        console.log(`Service Worker registration failed: ${registrationError}`));
    });
  }  
}
init();

