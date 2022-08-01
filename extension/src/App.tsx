import { createSignal, createEffect, createRoot, getOwner, Switch, Match } from 'solid-js';
import { Header } from './components/Header';
import { SignalList } from './components/SignalList';
import { Graph } from './components/Graph';
import { LogMonitor } from './components/LogMonitor';
import { Navbar } from './components/Navbar';
import { SolidComponent, TabType, OrientType } from './types';
import './styles/main.scss';

export const SolidStructure: SolidComponent = (props) => {
  const [children, root] = createRoot(() => [props.children, getOwner()]);
  console.log("App.tsx/root:", root);
  const [tab, setTab] = createSignal<TabType>('inspector');
  const [orientation, setOrientation] = createSignal<OrientType>('horizontal');
  const [record, setRecord] = createSignal<boolean>(true);
  const [caches, setCaches] = createSignal<object[]>([{}, {}, {}, {}, {}, {}, {}, {}]);
  
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
      {children}
      <div id="mainApp">
        <Header
          tab={tab}
          orientation={orientation}
          setOrientation={setOrientation}
        />
        <div id="mainDisplay">
          <Switch>
            <Match when={tab() === 'inspector'}>
              <SignalList root={root} />
              <div class="line inspc" onMouseDown={() => setOnDrag(true)}></div>
              <Graph tab={tab} orientation={orientation} boxsize={boxsize} />
            </Match>
            <Match when={tab() === 'graph'}>
              <Graph tab={tab} orientation={orientation} />
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
};