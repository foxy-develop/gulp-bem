function init() {
  "use strict";

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("SW registered");
        })
        .catch(registrationError => console.log(`Service Worker registration failed: ${registrationError}`));
    });
    console.clear();
  }
}
init();
