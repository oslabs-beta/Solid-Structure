// import {
//   once,
//   onWindowMessage,
//   postWindowMessage,
//   startListeningWindowMessages,
// } from "@shared/bridge"
// import { createPortMessanger, DEVTOOLS_CONTENT_PORT } from "../shared/messanger"
import { SHARED_PORT } from './messanger';

console.log("Content Script Working");

const port = chrome.runtime.connect({ name: SHARED_PORT })

// startListeningWindowMessages()
// const { postPortMessage, onPortMessage } = createPortMessanger(port)

// onWindowMessage("SolidOnPage", () => postPortMessage("SolidOnPage"))

// onWindowMessage("GraphUpdate", graph => postPortMessage("GraphUpdate", graph))

// onWindowMessage("BatchedUpdate", payload => postPortMessage("BatchedUpdate", payload))

// onPortMessage("PanelVisibility", visible => postWindowMessage("PanelVisibility", visible))

// once(onPortMessage, "DevtoolsScriptConnected", () => postWindowMessage("DevtoolsScriptConnected"))

// once(onPortMessage, "ForceUpdate", () => postWindowMessage("ForceUpdate"))

// export {}
