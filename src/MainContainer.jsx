import { Show } from 'solid-js';
import { colors } from "./theme";

import { Header } from "./Header";
import { Inspect } from "./Inspect";
import { Graph } from "./Graph";
import { LogMonitor } from "./LogMonitor";
import { Navbar } from "./Navbar";


export const SolidStructure = (props) => {
  
  let [tab, setTab] = createSignal("inspector"); // "inspector", "graph", "logmonitor"

  return (
    <>
      <Header />

      <Show when={tab() === "inspector"}>
        <Inspect />
        <Graph />
      </Show>

      <Show when={tab() === "graph"}>
        <Graph />
      </Show>

      {/* <Show when={tab() === "logmonitor"}>
        <LogMonitor />
      </Show> */}

      <Navbar /> 
    </>
  )
}