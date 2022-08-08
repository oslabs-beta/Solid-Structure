import { render } from "solid-js/web";
import { SolidStructure } from "./App";

// CREATE the devtools panel
console.log('Step 1. devtools.panel made');

chrome.devtools.panels.create(
    'Solid Structure', 
    null, 
    'index.html', 
    () => {},
);

render(() => <SolidStructure />, document.getElementById('root'));