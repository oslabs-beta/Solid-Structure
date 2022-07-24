import { Show, createSignal, createRoot, getOwner } from 'solid-js';
import { Header } from "./components/Header";
import { Inspect } from "./components/Inspect";
import { Graph } from "./components/Graph";
import { LogMonitor } from "./components/LogMonitor";
import { Navbar } from "./components/Navbar";
import './styles/main.scss';


export const SolidStructure = (props) => {
  // const [children, root] = createRoot(() => [props.children, getOwner()!]); 
  const [tab, setTab] = createSignal("inspector"); 
  const [orientation, setOrientation] = createSignal("horizontal");
  const [cache, setCache] = createSignal({}); 
  // creating signal for inspect, need to act as a reset or refresh or all graphs 


  return (
    <>
      <Header 
        tab={tab}
        orientation={orientation} 
        setOrientation={setOrientation}
      />
      <div id="display">
        <Show when={tab() === "inspector"}>
          <Inspect cache={cache()} setCache={setCache}/>
          <Graph tab={tab()} orientation={orientation}/>
        </Show>

        <Show when={tab() === "graph"}>
          <Graph tab={tab()} orientation={orientation}/>
        </Show>

        <Show when={tab() === "logmonitor"}>
          <LogMonitor />
        </Show>
      </div>
      <Navbar setTab={setTab}/> 
    </>
  )
}