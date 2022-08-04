import { createCallbackStack } from '@solid-primitives/utils';
import { portHandler, createRuntimeMsgr, MESSAGE } from './utils/utils';
console.log('BG SCRIPT WORKING');
const { onRuntimeMsg, postRuntimeMessage } = createRuntimeMsgr();

let mainport;

//?? -> graphUpdate , batchedUpdate, forceUpdate
const { push: addCleanup, execute: clearListeners } = createCallbackStack();
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'Solid-Structure')
    return console.log('UNABLE TO CONNECT:', port.name);

  mainport = port;
  //createPortMessage(mainport) -> postPortMessage & onPortMessage
  const { postPortMsg, onPortMsg } = portHandler(mainport);

  addCleanup(
    onPortMsg(MESSAGE.UpdateRoots, (root) =>
      postRuntimeMessage(MESSAGE.UpdateRoots, root)
    )
  );

  addCleanup(
    onPortMsg(MESSAGE.BatchedUpdate, (payload) =>
      postRuntimeMessage(MESSAGE.BatchedUpdate, payload)
    )
  );
});

export {};
