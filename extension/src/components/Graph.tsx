<<<<<<< HEAD
import { createSignal, createEffect, onMount } from 'solid-js';
import { GraphBox } from './GraphBox';
import '../styles/components/_graph.scss';
import { GraphComponent } from '../types';
// import treeData from "./random.json";





export const Graph: GraphComponent = (props) => {

  /* 
    Changing inner display orientation of '#graphContainer' based on 'orientation' signal update. 
    Size of containers inside '#graphContainer' is adjusted based on user-input(drag).
  */

=======
import { createSignal, createEffect } from 'solid-js';
import { GraphBoxStr } from './GraphBoxStr';
import { GraphBoxDep } from './GraphBoxDep';
import '../styles/components/_graph.scss';
import { GraphComponent } from '../types';

export const Graph: GraphComponent = (props) => {
  
>>>>>>> dev
  /* Updating 'graphContainer' box size with user-input(drag). */
  const [boxsize, setBoxsize] = createSignal<number>(25);
  const [onDrag, setOnDrag] = createSignal<boolean>(false);
  const onMouseMove = (e: any) => {
    if (props.orientation() === "horizontal") {
      const h = window.innerHeight - e.clientY - 34;
<<<<<<< HEAD
      const hp = Math.floor((h / (window.innerHeight - 38))*100);
      if (hp < 20 || hp > 80) return;
=======
      const hp = Math.floor((h / (window.innerHeight - 38)) * 100);
      if (hp < 18 || hp > 80) return;
>>>>>>> dev
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
  const onMouseUp = (e: any) => setOnDrag(false);
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

<<<<<<< HEAD


=======
  /* 
    Changing inner display orientation of '#graphContainer' based on 'orientation' signal update. 
    Size of containers inside '#graphContainer' is adjusted based on user-input(drag).
  */
>>>>>>> dev
  createEffect(() => {
    const graphContainerStyle = document.getElementById('graphContainer').style;
    const line = document.querySelector('#graphContainer > .line').classList;
    if (props.orientation() === 'horizontal') {
      graphContainerStyle.gridTemplateColumns = null;
      graphContainerStyle.gridTemplateRows = `1fr 4px ${boxsize()}%`;
      line.remove('v');
      line.add('h');
    } else if (props.orientation() === 'vertical') {
      graphContainerStyle.gridTemplateRows = null;
      graphContainerStyle.gridTemplateColumns = `1fr 4px ${boxsize()}%`;
      line.remove('h');
      line.add('v');
    }
  });

  return (
    <div id="graphContainer">
      <div id="containerDep">
<<<<<<< HEAD
        <p>Dependency</p>
        {/* <GraphBox type="dependency" /> */}
=======
        <p>Structural</p>
        <GraphBoxStr />
>>>>>>> dev
      </div>
      <div class="line h" onMouseDown={() => setOnDrag(true)}></div>
      <div id="containerStr">
        <p>Dependency</p>
        <GraphBoxDep />
      </div>
    </div>
  );
};
