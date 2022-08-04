import 'solid-js';
import { render } from 'solid-js/web';
import { SolidStructure } from '../extension/src/App';
import { App } from './App';
import { Debugger } from '@solid-devtools/debugger';

render(
  () => (
    <>
      <Debugger>
        <App />
      </Debugger>
      <SolidStructure />
    </>
  ),
  document.getElementById('root')
);
