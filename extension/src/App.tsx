import { createSignal, createEffect, createRoot, getOwner, Switch, Match, createMemo, on } from 'solid-js';
import {createStore} from 'solid-js/store';
import { Header } from './components/Header';
import { SignalList } from './components/SignalList';
import { Graph } from './components/Graph';
import { LogMonitor } from './components/LogMonitor';
import { Navbar } from './components/Navbar';
import { SolidComponent, TabType, OrientType } from './types';
import './styles/main.scss';


import { registerDebuggerPlugin, createInternalRoot } from "@solid-devtools/debugger"
import type {Owner} from "solid-js/types/reactive/signal"

let appOwner: Owner

export function debugComponent() {
  appOwner = getOwner()
}

export const signalListeners:Record<number, (newValue: unknown) => void> = {}

export const addSignalListener = (id:number, listener: (newValue: unknown) => void) => {
  signalListeners[id] = listener
}

/* 
 * Function: registerDebuggerPlugin()
    Conceptually similar to middleware plugin for data / information connectivity 
    to a seperate application (demo-app / browser-rendered app) 
*/
// let mainCurrRoot;
const [mainCurrRoot, setMainCurrRoot] = createSignal();

registerDebuggerPlugin(({ roots, makeBatchUpdateListener }) => {
  createEffect(() => {
  /*  For Structural Graph Rendering  */
   const currentRoots = roots()
  //  mainCurrRoot = roots();
    // console.log(currentRoots);
    createEffect(() => {
      currentRoots.forEach(root => {
        // mainCurrRoot = root.tree;
        setMainCurrRoot(root.tree);
        console.log("createEffect:", mainCurrRoot())
       
      })
    })

    makeBatchUpdateListener((updates) => {
      updates.forEach(update => {
        // UpdateType.Signal = 0 ; UpdateType.Computation = 1
        // console.log(update);
        if (update.type !== 0) return
        const id = update.payload.id 
        const listener = signalListeners[id]
        if (listener) listener(update.payload.value)
        // console.log(listener);
      })
    })
  })
  
  return {
    enabled: () => true,
    trackBatchedUpdates: () => true,
    trackSignals: () => true
  }
})


export const SolidStructure: SolidComponent = (props) => {
  return createInternalRoot(() => {
    const [mounted, setMounted] = createSignal(false)
    setTimeout(() => setMounted(true))

    return createMemo(
      on(mounted, (mounted) => {
        if (!mounted) return undefined

        const root = appOwner;
      
        /* TODO: Attempt to render updated "root" after signal value changes on demo-app */
      
        // console.log("App.tsx/root:", root);
        // console.log('MAIN CURR', mainCurrRoot());
        const [tab, setTab] = createSignal<TabType>('inspector');
        const [orientation, setOrientation] = createSignal<OrientType>('horizontal');
        const [record, setRecord] = createSignal<boolean>(true);
        const [selectedSig, setSelectedSig] = createSignal<object>({});
        const [caches, setCaches] = createSignal<object[]>([{}, {}]);
      
        /* Update 'Inspect' box width by user input (drag) */
        const [boxsize, setBoxsize] = createSignal<number>(65);
        const [onDrag, setOnDrag] = createSignal<boolean>(false);
        const onMouseMove = (e: MouseEvent) => {
          const w = window.innerWidth - e.clientX;
          const wp = Math.floor((w / window.innerWidth) * 100);
          if (w < 200 || wp < 20 || wp > 90) return;
          setBoxsize(wp);
        };
        const onMouseUp = (e: MouseEvent) => setOnDrag(false);
        createEffect(() => {
          if (onDrag()) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          } else {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
          }
        });
      
        /* Alter 'mainDisplay' size format with 'tab' signal */
        createEffect(() => {
          if (tab() === 'inspector')
            document.getElementById('mainDisplay').style.gridTemplateColumns = `1fr 3px ${boxsize()}%`;
          else document.getElementById('mainDisplay').style.gridTemplateColumns = '100%';
        });
      
        return (
          <>
            <div id="mainApp">
              <Header
                tab={tab}
                orientation={orientation}
                setOrientation={setOrientation}
              />
              <div id="mainDisplay">
                <Switch>
                  <Match when={tab() === 'inspector'}>
                    <SignalList 
                      root={root} 
                      selectedSig={selectedSig}
                      setSelectedSig={setSelectedSig}
                    />
                    <div class="line inspc" onMouseDown={() => setOnDrag(true)}></div>
                    <Graph 
                      tab={tab} 
                      orientation={orientation} 
                      boxsize={boxsize} 
                      selectedSig={selectedSig}
                      setSelectedSig={setSelectedSig}
                      rootTree={mainCurrRoot}
                    />
                  </Match>
                  <Match when={tab() === 'graph'}>
                    <Graph 
                      tab={tab} 
                      orientation={orientation} 
                      selectedSig={selectedSig}
                      setSelectedSig={setSelectedSig}
                      rootTree={mainCurrRoot}
                      
                    />
                  </Match>
                  <Match when={tab() === 'logmonitor'}>
                    <LogMonitor
                      record={record}
                      setRecord={setRecord}
                      caches={caches}
                      setCaches={setCaches}
                    />
                  </Match>
                </Switch>
              </div>
              <Navbar tab={tab} setTab={setTab} />
            </div>
          </>
        );
  
      })
    )
      


  })
};