import "solid-js";
import { render } from 'solid-js/web';
import { SolidStructure } from "../extension/src/App";
import { App } from './App';
import { attachDebugger } from "@solid-devtools/debugger"


render(() => {
  attachDebugger()
  return <SolidStructure><App/></SolidStructure>
  }, document.getElementById('root')
);