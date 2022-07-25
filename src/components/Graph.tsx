import { createSignal, createEffect } from 'solid-js';
import type { Component } from 'solid-js';
import { GraphBox } from './GraphBox';
import '../styles/components/_graph.scss';
// import * as d3 from 'd3';


export const Graph: Component = (props) => {

  /* Updating 'graphContainer' box size with user-input(drag). */
  const [boxsize, setBoxsize] = createSignal(50);
  const [onDrag, setOnDrag] = createSignal(false);
  const onMouseMove = (e) => {
    if (props.orientation() === "horizontal") {
      const h = window.innerHeight - e.clientY - 34;
      const hp = Math.floor((h / (window.innerHeight - 38))*100);
      if (hp < 20 || hp > 80) return;
      setBoxsize(hp);
    }
    else if (props.orientation() === "vertical") {
      const leftbox = (props.boxsize 
        ? (100 - props.boxsize())/100 * window.innerWidth + 4 
        : 0
      );
      const w = e.clientX - leftbox;
      const wp = 100 - Math.floor((w / (window.innerWidth - leftbox))*100);      
      if (wp < 15 || wp > 85) return;
      setBoxsize(wp);
    }
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

  /* 
    Changing inner display orientation of '#graphContainer' based on 'orientation' signal update. 
    Size of containers inside '#graphContainer' is adjusted based on user-input(drag).
  */ 
  createEffect(() => {
    const graphContainerStyle = document.getElementById("graphContainer").style;
    const line = document.querySelector("#graphContainer > .line").classList;
    if (props.orientation() === "horizontal") {
      graphContainerStyle.gridTemplateColumns = null;
      graphContainerStyle.gridTemplateRows = `1fr 4px ${boxsize()}%`;
      line.remove("v");
      line.add("h");
    }
    else if (props.orientation() === "vertical") {
      graphContainerStyle.gridTemplateRows = null;
      graphContainerStyle.gridTemplateColumns = `1fr 4px ${boxsize()}%`;
      line.remove("h");
      line.add("v");
    }
  });

  return(
    <div id="graphContainer">
      <div id="containerDep">
        <p>Dependency</p>
        <GraphBox />
      </div>
      <div class="line h" onMouseDown={() => setOnDrag(true)}></div>
      <div id="containerStr">
        <p>Structural</p>
        <GraphBox />
      </div>
    </div>
  )
};