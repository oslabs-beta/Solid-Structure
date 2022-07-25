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
  const [cache, setCache] = createSignal({}); // creating signal for inspect, need to act as a reset or refresh or all graphs 

  /* Update 'Inspect' box width by user input (drag) */
  const [boxsize, setBoxsize] = createSignal(65);
  const [onDrag, setOnDrag] = createSignal(false);
  const onMouseMove = (e) => {
    const w = window.innerWidth - e.clientX;
    const wp = Math.floor(w/window.innerWidth*100);
    if (w < 200 || wp < 20 || wp > 90 ) return;
    setBoxsize(wp);
  }
  const onMouseUp = (e) => setOnDrag(false);
  createEffect(() => {
    if (onDrag()) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
  });

  /* Alter 'mainDisplay' size format with 'tab' signal */
  createEffect(() => {
    if (tab() === "inspector") document.getElementById("mainDisplay").style.gridTemplateColumns = `1fr 3px ${boxsize()}%`;
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
          <div class="line inspc" onMouseDown={() => setOnDrag(true)}></div>
          <Graph tab={tab} orientation={orientation} boxsize={boxsize}/>
        </Show>

        <Show when={tab() === "graph"}>
          <Graph tab={tab} orientation={orientation} />
        </Show>

        <Show when={tab() === "logmonitor"}>
          <Inspect record={record} setRecord={setRecord} cache={cache()} setCache={setCache}/>
        </Show>
      </div>
      <Navbar setTab={setTab}/> 
    </div>
  )
}