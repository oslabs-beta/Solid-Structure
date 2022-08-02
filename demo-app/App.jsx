import { createSignal, createEffect } from "solid-js";
import './style.css';
import { Nav } from './Nav';

/* THIS IS DEMO APP!!! */
export const App = (props) => {
    const [count, setCount] = createSignal(0); 
    const [bool, setBool] = createSignal(true); 
    const [guess, setGuess] = createSignal("boo"); 

    const [tab, setTab] = createSignal('inspector');
    const [orientation, setOrientation] = createSignal('horizontal');
    const [record, setRecord] = createSignal(true);
    const [caches, setCaches] = createSignal([{}, {}, {}, {}, {}]);
    const [cache, setCache] = createSignal({0:'zero', 1:'one', 'two':2});
    
    /* Update 'Inspect' box width by user input (drag) */
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

    const increment = () => setCount(count() + 1);
    const decrement = () => setCount(count() - 1); 
    const updateGuess = () => setGuess("hi"); 
    
    // const [children, root] = createRoot(() => [props.children, getOwner()]);
    // console.log(root);

    return (
      <div id='counter'>
        <div id='counterBox'>{count}</div>
        <div id='counterBox'>{guess}</div>
        <div>
          <button id="decrementBtn" onClick={decrement} type="button"> Decrement </button>
          <button id="incrementBtn" onClick={increment} type="button"> Increment </button>
          <button id="updateGuessBtn" onClick={updateGuess} type="button"> UpdateGuess </button>
        </div>
        <Nav tab={tab} setTab={setTab} />
      </div>
    );
};

// export default App;