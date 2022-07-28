import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
// import { Show } from "solid-js/web";


//counter component
export  const Counter = () => {
  const [count, setCount] = createSignal(0); 
  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1); 


  return (
    <div>
      <button onClick={increment} type="button"> {count} </button>
      <button onClick={decrement} type='button'> {count} </button>
    </div>
  );
};

//multiply function component
export const Multiply = () => {
  const [multiply, setMultiply] = createSignal(0)
  const timesTwo = () => setMultiply(multiply() * 2)
  return (
  <div>
    <button onClick={timesTwo} type="button"> {multiply} </button>
  </div>
  );
};



export const App = () => {

  return (
    <div>
      <App />
      <Counter />
      <Multiply />
    </div>
  );
};

export default App;