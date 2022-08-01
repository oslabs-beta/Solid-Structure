import { createSignal, createRoot, getOwner } from "solid-js";
import './style.css';

export const App = (props) => {
    const [count, setCount] = createSignal(0); 
    const [bool, setBool] = createSignal(true); 
    const [guess, setGuess] = createSignal("boo"); 

    const increment = () => setCount(count() + 1);
    const decrement = () => setCount(count() - 1); 
    const updateGuess = () => setGuess(guess()+"hi"); 
    
    const [children, root] = createRoot(() => [props.children, getOwner()]);
    console.log(root);

    return (
      <div id='counter'>
        <div id='counterBox'>{count}</div>
        <div>
          <button id="decrementBtn" onClick={decrement} type="button"> Decrement </button>
          <button id="incrementBtn" onClick={increment} type="button"> Increment </button>
          <button id="incrementBtn" onClick={updateGuess} type="button"> UpdateGuess </button>
        </div>
      </div>
    );
};

// export default App;