let mainport;

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  if (req) {
    if (mainport) {
      mainport.portMessage({ body: req.body });
    }
  }
});

chrome.runtime.onConnect.addListener((port) => {
  mainport = port;
  mainport.onMessage.addListener((msg) => {
    if (msg.body === 'runContentScript') {
      chrome.tabs.executeScript({ file: './contentScript.js' });
    }
    if (msg.body === 'updateScript') {
      setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            body: 'UPDATE',
            script: msg.script,
          });
        });
      }, 50);
    }
  });
});
