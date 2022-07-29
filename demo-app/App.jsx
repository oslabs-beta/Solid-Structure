import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import '/style.css'
// import { Show } from "solid-js/web";


//counter component
const Counter = () => {
  const [count, setCount] = createSignal(0); 
  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1); 


  return (
    <>
    <div>
      <button onClick={increment} type="button"> Increment </button>
      <button onClick={decrement} type='button'> Decrement </button>
    </div>
    <div> {count}</div>
    </>
  );
};

// //multiply function component
// const Multiply = () => {
//   const [multiply, setMultiply] = createSignal(0)
//   const timesTwo = () => setMultiply(multiply() * 2)
//   return (
//   <div>
//     <button onClick={timesTwo} type="button"> {multiply} </button>
//   </div>
//   );
// };


const ToDo = () => {
  let input; 
  let todoId = 0; 
  const [todos, setTodos] = createStore([]); 

  const addTodo = (text) => {
    setTodos([...todos, {id: ++todoId, text, completed: false}]);
  }

  const toggleTodo = (id) => {
    setTodos(todo => todo.id === id, "completed", completed => !completed);
  }

  return (
    <>
    <div>
      <input ref={input} />
      <button
        onClick = {(e) => {
          if(!input.value.trim()) return; 
          addTodo(input.value); 
          input.value = ""; 
        }}
        >
        Add todo
        </button>
    </div>
    <For each = {todos}>
      {(todo) => {
        const { id, text } = todo; 
        console.log(`creating {text}`)
        return <div>
          <input type = "checkbox"
          checked = {todo.completed}
          onchange = {[toggleTodo, id]}
          />
          <span 
          style = {{"text-decoration": todo.completed ? "line-through" : "none"}}
          >{text}</span>
        </div>
      }}
    </For>
    </>
  );
};


export const App = () => {

  return (
    <>
    <div>
      <Counter />
    </div>
    <div>
      <ToDo />
    </div>
    </>
  );
};

// export default App;