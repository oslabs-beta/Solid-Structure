import { createSignal, For } from 'solid-js';
import { Signal } from './Signal';
import { SignalListComponent } from '../types';
import '../styles/components/_inspect.scss';

export const SignalList: SignalListComponent = (props) => {

  // TODO: Format "props.caches()" to "signals()" with desired data format
  const [signals, setSignals] = createSignal([{}, {}, {}, {}, {}]);

  return (
    <div class="inspectBox">
      <div id="sigboxHead" class="inspectHead">
        <h3>Signals</h3>
      </div>
      <div class="inspectList">
        <For each={signals()}>{(cache, i) => <Signal cache={cache} />}</For>
      </div>
    </div>
  );
};
