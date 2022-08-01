import "solid-js";
import { render } from 'solid-js/web';
import { SolidStructure } from "../extension/src/App";
import { App } from './App';

render(
  () => 
    <SolidStructure >
      <App />
    </SolidStructure>,
    document.getElementById('root')
);