import { createSignal, createEffect, For } from "solid-js";
import './style.css';
import { Nav } from './Nav';

import { debugComponent } from "../extension/src/App"

/* THIS IS DEMO APP!!! */
export const App = (props) => {

    debugComponent()

    /* ONLY the following 3 signals work */
    const [count, setCount] = createSignal(0); 
    const [bool, setBool] = createSignal(true); 
    const [guess, setGuess] = createSignal("Yes");

    const increment = () => setCount(count() + 1);
    const decrement = () => setCount(count() - 1); 
    const updateGuess = () => setGuess((g) => (g === 'Yes' ? 'No' : 'Yes'));

    /* List of random signals */
    const [tab, setTab] = createSignal('Apple');
    const [record, setRecord] = createSignal(true);
    const [caches, setCaches] = createSignal([{'cache':1}]);
    const [cache, setCache] = createSignal({0:'zero', 1:'one', 'two':2});
    const [boxsize, setBoxsize] = createSignal(100);
    const [onDrag, setOnDrag] = createSignal(false);
    
    const onMouseMove = (e) => {
      const w = e.clientX - 20;
      console.log(e.clientX);
      setBoxsize(w);
    };
    const onMouseUp = (e) => setOnDrag(false);
    createEffect(() => {
      if (onDrag()) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }
    });
    createEffect(() => {
      document.getElementById('adjbox').style.width = `${boxsize()}px`;
    });

    return (
      <div id='cou'>
        <h2 id="tophead">SolidJS Application</h2>
        <div class='counterBox'>{count()}</div>
        <div class='counterBox'>{guess()}</div>
        <div>
          <button class="buttons" onClick={decrement} type="button"> - </button>
          <button class="buttons" onClick={increment} type="button"> + </button>
          <button class="buttons" onClick={updateGuess} type="button"> UpdateGuess </button>
        </div>
        <div id="displaytab">{tab()}</div>
        <div class="boxcont">
          <Nav tab={tab} setTab={setTab} />
        </div>
        <For each={cache()}>
          {(c) => (
            <span class="box">{c}</span>
          )}
        </For>
        <p class="aboxhead">Width Adjustable Box</p>
        <div id="outerbox">
          <div id='adjbox'>{boxsize()}px</div>
          <div class='leftborder' onMouseDown={() => setOnDrag(true)}></div>
        </div>
        {/* <div class="end"></div> */}
      </div>
    );
};