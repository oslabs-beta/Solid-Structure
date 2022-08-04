import { isServer } from '@solid-primitives/utils';

export const MESSAGE = {
  UpdateRoots: {
    added: [{}],
    removed: [{}],
    updated: [{}],
  },
  BatchedUpdate: [{}],
};

const logMessage = false;

export function portHandler(port) {
  let listeners = {};
  let connected = true;
  port.onDisconnect.addListener((port) => {
    connected = false;
    listeners = {};
    port.onMessage.removeListener(onMessage);
  });
  function onMessage(e, port) {
    if (!e || typeof e !== 'object') return;
    if (typeof e.id !== 'number') return;
    logMessage && console.log('message:', MESSAGE[e.id], e.payload);
    listeners[e.id]?.forEach((m) => m(e.payload));
  }
  port.onMessage.addListener(onMessage);
  return {
    postPortMsg(id, payload) {
      if (!connected) return;
      port.postMessage({ id, payload });
    },
    onPortMsg(id, handler) {
      if (!connected) return;
      let arr = listeners[id];
      if (!arr) arr = listeners[id] = [];
      arr.push(handler);
      return () =>
        (listeners[id] = arr.filter((listener) => listener !== handler));
    },
  };
}

export function createRuntimeMsgr() {
  const listeners = {};

  chrome.runtime.onMessage.addListener((msg, sender, sendRes) => {
    const id = msg?.id;
    if (typeof id !== 'number') return;
    logMessage && console.log('runtime message:', MESSAGE[id], msg.payload);
    listeners[id]?.forEach((f) => f(msg.payload));
    sendRes({});
    return true;
  });

  return {
    onRuntimeMsg: (id, handler) => {
      let arr = listeners[id];
      if (!arr) arr = listeners[id] = [];
      arr.push(handler);
      return () => (listeners[id] = arr.filter((l) => l !== handler));
    },
    postRuntimeMessage: (id, payload) => {
      logMessage &&
        console.log('runtime message posted:', MESSAGE[id], payload);
      chrome.runtime.sendMessage({ id, payload });
    },
  };
}

export function listenToWindowMsgs() {
  if (isServer) return;
  window.addEventListener('message', (e) => {
    const id = e.data?.id;
    if (typeof id !== 'string') return;
    listeners[id]?.forEach((m) => m(e.data.payload));
  });
}
const listeners = {};
export function onWindowMsg(id, handler) {
  let arr = listeners[id];
  if (!arr) arr = listeners[id] = [];
  arr.push(handler);
  return () => (listeners[id] = arr.filter((l) => l !== handler));
}
export function postWindowMsg(id, payload) {
  logMessage && console.log('msg posted:', MESSAGE[id], payload);
  window.postMessage({ id, payload }, '*');
}