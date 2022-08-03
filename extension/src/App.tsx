import { createSignal, createEffect, getOwner, Switch, Match, createMemo, on } from 'solid-js';
import { createStore } from 'solid-js/store';
import { registerDebuggerPlugin, createInternalRoot } from "@solid-devtools/debugger"
import type { Owner } from "solid-js/types/reactive/signal";
import { SolidComponent, TabType, OrientType } from './types';
import { Header } from './components/Header';
import { SignalList } from './components/SignalList';
import { Graph } from './components/Graph';
import { LogMonitor } from './components/LogMonitor';
import { Navbar } from './components/Navbar';
import './styles/main.scss';

const [mainCurrRoot, setMainCurrRoot] = createSignal();
const [record, setRecord] = createSignal<boolean>(true);
const [logs, setLogs] = createSignal([]);

/**
 * @method debugComponent
 * @description - Access target app to allow debugging
 */
let appOwner: Owner;
export function debugComponent() { appOwner = getOwner() };
/**
 * @method signalListeners
 * @description - Object that keeps track of signal updates
 */
export const signalListeners:Record<number, (newValue: unknown) => void> = {};
/**
 * @method addSignalListener
 * @description - ...
 */
export const addSignalListener = (id:number, listener:(newValue: unknown) => void) => {
  signalListeners[id] = listener;
};

export const logListeners:Record<object, (newValue: unknown) => void> = [];
export const addLogListener = (id:number, listener:(newValue: unknown) => void) => {
  logListeners[id] = listener;
};

/**
 * @method registerDebuggerPlugin
 * @description - Middleware plugin to maintain connectivity with a target app. 
 *   Receive a "root" data whenever signal updates on a target app
 */
registerDebuggerPlugin(({ roots, makeBatchUpdateListener }) => {
  createEffect(() => {
    const currentRoots = roots();

    createEffect(() => {
      currentRoots.forEach(root => {
        setMainCurrRoot(root.tree);
        // console.log("mainCurrRoot(s):", mainCurrRoot())
      })
    })

    /**
     * @method makeBatchUpdateListener
     * @description - ...
     */
    makeBatchUpdateListener((updates) => {
      updates.forEach(update => {
        // UpdateType.Signal = 0 ; UpdateType.Computation = 1
        if (update.type !== 0) return
        if (record()){
          const prevlogs = logs();
          prevlogs.push(update)
          setLogs(prevlogs);
          // console.log(logs());
        }
        const id = update.payload.id;
        const listener = signalListeners[id];
        if (listener) listener(update.payload.value);
        // console.log('listener:', listener);
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
        const [tab, setTab] = createSignal<TabType>('inspector');
        const [orientation, setOrientation] = createSignal<OrientType>('horizontal');
        const [selectedSig, setSelectedSig] = createSignal<object>({});

        /* Creating an object that pairs "signal id" with "signal name"  */
        const [sigIds, setSigIds] = createSignal<object>({});
        const sigs = root.sourceMap;
        for (const sig in sigs) {
          const currSig = sigIds();
          currSig[sigs[sig].sdtId] = sig;
          setSigIds(currSig);
        }
      
        /* UI: Changes the width of <Graph> box by dragging */
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
      
        /* UI: Alters "#mainDisplay" size format with "tab" signal */
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
                      sigIds={sigIds()}
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
                      logs={logs}
                      setLogs={setLogs}
                      sigIds={sigIds()}
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