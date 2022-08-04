import {
  listenToWindowMsgs,
  onWindowMsg,
  portHandler,
  MESSAGE,
} from './utils/utils';
console.log('CS SCRIPT WORKING');

const port = chrome.runtime.connect({ name: 'Solid-Structure' });
if (port) {
  console.log('CS CONNECTED');
  console.log(port.name);
}
listenToWindowMsgs();

const { postPortMsg } = portHandler(port);

onWindowMsg(MESSAGE.UpdateRoots, (root) =>
  postPortMsg(MESSAGE.UpdateRoots, root)
);

onWindowMsg(MESSAGE.BatchedUpdate, (payload) =>
  postPortMsg(MESSAGE.BatchedUpdate, payload)
);
