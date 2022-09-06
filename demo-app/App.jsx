import { createSignal, createEffect, For } from "solid-js";
import './style.css';
import { Nav } from './Nav';
// import { Debugger } from "@solid-devtools/debugger"
// import { debugComponent } from "../extension/src/App"

/* THIS IS DEMO APP!!! */
export const App = (props) => {
  
  // debugComponent();

  /* ONLY the following 3 signals work */
  const [count, setCount] = createSignal(0);
  const [bool, setBool] = createSignal(true);
  const [guess, setGuess] = createSignal('boo');

  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1);
  const updateGuess = () => setGuess((g) => (g === 'boo' ? 'hi' : 'boo'));

  /* List of random signals */
  const [tab, setTab] = createSignal('graphs');
  const [orientation, setOrientation] = createSignal('vertical');
  const [record, setRecord] = createSignal(true);
  const [caches, setCaches] = createSignal([{'cache':1}]);
  const [cache, setCache] = createSignal({0:'zero', 1:'one', 'two':2});
  const [boxsize, setBoxsize] = createSignal(65);
  const [onDrag, setOnDrag] = createSignal(false);
  
  const onMouseMove = (e) => {
    const w = window.innerWidth - e.clientX;
    const wp = Math.floor((w / window.innerWidth) * 100);
    if (w < 200 || wp < 20 || wp > 90) return;
    setBoxsize(wp);
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
          <span>{c}</span>
        )}
      </For>
      {/* <Debugger/> */}
    </div>
  );
};