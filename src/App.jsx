import { Show, createSignal, createEffect, createRoot, getOwner } from 'solid-js';
import { Header } from "./components/Header";
import { Inspect } from "./components/Inspect";
import { Graph } from "./components/Graph";
import { Navbar } from "./components/Navbar";
import './styles/main.scss';


export const SolidStructure = (props) => {
  // const [children, root] = createRoot(() => [props.children, getOwner()!]); 
  const [tab, setTab] = createSignal("inspector"); 
  const [orientation, setOrientation] = createSignal("horizontal");
  const [record, setRecord] = createSignal(true);
  const [cache, setCache] = createSignal({}); 
  // creating signal for inspect, need to act as a reset or refresh or all graphs 

  /* Different 'mainDisplay' Content Size by 'tab' signal */
  createEffect(() => {
    // if (tab() === "inspector") document.getElementById("mainDisplay").style.gridTemplateColumns = "30% 70%";
    if (tab() === "inspector") document.getElementById("mainDisplay").style.gridTemplateColumns = "2fr 3px 5fr";
    else document.getElementById("mainDisplay").style.gridTemplateColumns = "100%";
  })

  return (
    <div id="mainApp">
      <Header 
        tab={tab}
        orientation={orientation} 
        setOrientation={setOrientation}
      />
      <div id="mainDisplay">
        <Show when={tab() === "inspector"}>
          <Inspect record={record} setRecord={setRecord} cache={cache()} setCache={setCache}/>
          <div class="line inspc"></div>
          <Graph tab={tab} orientation={orientation}/>
        </Show>

        <Show when={tab() === "graph"}>
          <Graph tab={tab} orientation={orientation}/>
        </Show>

        <Show when={tab() === "logmonitor"}>
          <Inspect record={record} setRecord={setRecord} cache={cache()} setCache={setCache}/>
        </Show>
      </div>
      <Navbar setTab={setTab}/> 
    </div>
  )
}