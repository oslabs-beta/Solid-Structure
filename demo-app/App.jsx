import { createSignal, createEffect } from "solid-js";
import './style.css';
import { Nav } from './Nav';

/* THIS IS DEMO APP!!! */
export const App = (props) => {
    const [count, setCount] = createSignal(0); 
    const [bool, setBool] = createSignal(true); 
    const [guess, setGuess] = createSignal("boo"); 

    const [tab, setTab] = createSignal('inspctr');
    const [orientation, setOrientation] = createSignal('vertica');
    const [record, setRecord] = createSignal(true);
    const [caches, setCaches] = createSignal([{'cache':1}]);
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


// import { createEffect, DEV, getOwner } from "solid-js";
// import { createStore } from "solid-js/store"
// import { render, For } from "solid-js/web";

// function createLocalState(initState) {
//   const [state, setState] = createStore(initState);
//   if (localStorage.todos) setState(JSON.parse(localStorage.todos));
//   createEffect(() => (localStorage.todos = JSON.stringify(state)));
//   return [state, setState];
// }

// export const App = () => {
//   const [state, setState] = createLocalState({
//     todos: [],
//     newTitle: ""
//   });

//   let owner = getOwner();
//   // after every update log current graph
//   window._$afterUpdate = () => {
//     document.body.getElementsByTagName("pre")[0].textContent = JSON.stringify(
//       DEV.serializeGraph(owner),
//       null,
//       2
//     );
//   };

//   return (
//     <div id="counter">
//       <h3>Simple Todos Example</h3>
//       <input
//         type="text"
//         placeholder="enter todo and click +"
//         value={state.newTitle}
//         onInput={(e) => setState({ newTitle: e.target.value })}
//       />
//       <button
//         onClick={() =>
//           setState({
//             todos: [
//               ...state.todos,
//               {
//                 title: state.newTitle,
//                 done: false
//               }
//             ],
//             newTitle: ""
//           })
//         }
//       >
//         +
//       </button>
//       <For each={state.todos}>
//         {(todo, i) => {
//           const { done, title } = todo;
//           return (
//             <div>
//               <input
//                 type="checkbox"
//                 checked={done}
//                 onChange={(e) =>
//                   setState("todos", i(), { done: e.target.checked })
//                 }
//               />
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) =>
//                   setState("todos", i(), { title: e.target.value })
//                 }
//               />
//               <button
//                 onClick={() =>
//                   setState("todos", (t) => [
//                     ...t.slice(0, i()),
//                     ...t.slice(i() + 1)
//                   ])
//                 }
//               >
//                 x
//               </button>
//             </div>
//           );
//         }}
//       </For>
//       <pre />
//     </div>
//   );
// };