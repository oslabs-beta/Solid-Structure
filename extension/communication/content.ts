import { SHARED_PORT } from './messanger';

console.log("Content Script Working at PORT:", SHARED_PORT);

const port = chrome.runtime.connect({ name: SHARED_PORT })

