(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/contentScript.js.7c2698b3.js")
    );
  })().catch(console.error);

})();
