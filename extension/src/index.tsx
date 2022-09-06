import { render } from "solid-js/web";
import { SolidStructure } from "./App";

// CREATE the devtools panel
console.log('Step 1. devtools.panel made');

chrome.devtools.panels.create(
    'Solid Structure', 
    null, 
    'index.html', 
    () => {
        chrome.runtime.onConnect.addListener(function(port) {
            console.log(port.name);
            port.onMessage.addListener(function(message) {
                // console.log(message);
            });
        });

        /* Need logic to get data */
        
    },
);

render(() => <SolidStructure />, document.getElementById('root'));