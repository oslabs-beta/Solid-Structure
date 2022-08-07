import { render } from "solid-js/web";
import { SolidStructure } from "./App";
// import { createRuntimeMessanger } from "../shared/messanger"

// const { onRuntimeMessage, postRuntimeMessage } = createRuntimeMessanger()
// postRuntimeMessage("DevtoolsScriptConnected")

// CREATE the devtools pane
console.log('Step 1. devtools.panel made');
chrome.devtools.panels.create(
    'Solid Structure', 
    null, 
    'index.html', 
    () => {},
);

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     const id = message?.id as keyof Messages
//     if (typeof id !== "string") return
//     LOG_MESSAGES && log("runtime message received:", id, message.payload)
//     listeners[id]?.forEach(f => f(message.payload as never))
//     // lines below are necessary to avoid "The message port closed before a response was received." errors.
//     // https://github.com/mozilla/webextension-polyfill/issues/130
//     sendResponse({})
//     return true
// })

render(() => <SolidStructure />, document.getElementById('root'));


