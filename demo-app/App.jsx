import { createSignal } from "solid-js";
import './style.css';

export const App = () => {
    const [count, setCount] = createSignal(0); 

    const increment = () => setCount(count() + 1);
    const decrement = () => setCount(count() - 1); 
    
    return (
      <div id='counter'>
        <div id='counterBox'>{count}</div>
        <div>
          <button id="decrementBtn" onClick={decrement} type="button"> Decrement </button>
          <button id="incrementBtn" onClick={increment} type="button"> Increment </button>
        </div>
      </div>
    );
};

// export default App;