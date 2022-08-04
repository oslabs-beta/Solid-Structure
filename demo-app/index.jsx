import "solid-js";
import { render, Portal } from 'solid-js/web';
// import { SolidStructure } from "../extension/src/App";
import { App } from './App';
import { Debugger } from "@solid-devtools/debugger"

render(() =>(
  <>
    <Debugger>
      <App/> 
    </Debugger>
  </>),
  document.getElementById('root')
);