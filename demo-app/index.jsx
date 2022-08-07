import "solid-js";
import { render, Portal } from 'solid-js/web';
import { SolidStructure } from "../extension/src/App";
import { App } from './App';

render(() =>(
  <>
    <App/> 
    <SolidStructure/>
  </>),
  document.getElementById('root')
);