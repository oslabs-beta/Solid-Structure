import { Show, createSignal, createRoot, getOwner } from 'solid-js';
import { Header } from "./components/Header";
import { Inspect } from "./components/Inspect";
import { Graph } from "./components/Graph";
import { LogMonitor } from "./components/LogMonitor";
import { Navbar } from "./components/Navbar";
import { colors } from "./theme";
import './styles/main.scss';

export const SolidStructure = (props) => {
  // const [children, root] = createRoot(() => [props.children, getOwner()!]);
  const [tab, setTab] = createSignal("inspector"); // "inspector", "graph", "logmonitor"
  const [cache, setCache] = createSignal("inspect"); //creating signal for inspect, need to act as a reset or refresh or all graphs 
  return (
    <>
      <Header />

      <div id="display">
        <Show when={tab() === "inspector"}>
          <Inspect setCache={setCache}/>
          <Graph />
        </Show>

        <Show when={tab() === "graph"}>
          <Graph />
        </Show>

        {/* <Show when={tab() === "logmonitor"}>
          <LogMonitor />
        </Show> */}
      </div>

      <Navbar setTab={setTab}/> 
    </>
  )
}