import { SHARED_PORT } from './messanger';

console.log("Background Script Working at PORT:", SHARED_PORT);

chrome.runtime.onConnect.addListener(function(port) {
  console.log("BG PORT: ", port.name);
});

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     console.log('Request:', request);
//     console.log('Sender:', sender);
//   }
// );