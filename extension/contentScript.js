let messageListener = false;

if (!messageListener) {
  window.addEventListener(
    'message',
    (messageEvent) => {
      if (messageEvent.source === window) {
        chrome.runtime.sendMessage(messageEvent.data);
      }
    },
    false
  );
  messageListener = true;
}

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  if (req.body === 'UPDATE') {
    if (!window.tag) {
      window.tag = document.createElement('script');
      const root = document.getElementById('root');
      while (root.children.length) {
        root.children[0].remove();
      }
      //script to inject into target app to listen for updates
      window.tag.text = `(function () { 
        'use strict';
  
        const parse = (event) => JSON.parse(JSON.stringify(event));
        let cacheState = [];
        const components = [];
        let lastIndex = 0;
  
        const sendMessages = (componentStates) => {
          window.postMessage({ 
            body: { 
              componentStates: componentStates, 
              cacheLength: cacheState.length 
            }
          });
        };
  
        // add all Svelte components to array
        window.document.addEventListener('SolidRegisterComponent', (e) => {
          components.push(e.detail.component);
        })
        setTimeout(saveAndDispatchState, 0);
  
        function checkIfChanged(componentState, i) {
          // if caches state is empty... or the most recent cache state is different
          // and the state at the last sent index is different, then state has truly changed
          if (!cacheState.length ||
            (JSON.stringify(cacheState[cacheState.length - 1][i][1]) !== JSON.stringify(componentState[1])
            && JSON.stringify(cacheState[lastIndex][i][1]) !== JSON.stringify(componentState[1]))) {
            return true;
          } else return false;
        }
  
        function saveAndDispatchState() {
          const curState = [];
          components.forEach((component) => {
            curState.push([component, component.$capture_state(), component.constructor.name]);
          })
          // only add to cache & send messages if any state has actually changed
          if (curState.some(checkIfChanged)) {
          // if cacheState is longer than the last index, we are back in time and should start a new branch
            if (cacheState.length > lastIndex){
              cacheState = cacheState.slice(0, lastIndex + 1)
            }
            sendMessages(parse(curState));
            cacheState.push([...curState]);
            lastIndex = cacheState.length - 1;
          }
        }
  
        function setupListeners(root) {
          root.addEventListener('SolidRegisterBlock', (e) => saveAndDispatchState());
          root.addEventListener('SolidDOMSetData', (e) => saveAndDispatchState());
          root.addEventListener('SolidDOMInsert', (e) => saveAndDispatchState());
        };
    
        setTimeout(() => setupListeners(window.document));
      
        ${req.script};
        `;
      document.children[0].append(window.tag);
    }
  }
});
