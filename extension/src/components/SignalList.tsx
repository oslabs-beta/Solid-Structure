import { createSignal, createEffect, For } from 'solid-js';
import { Signal } from './Signal';
import { SignalListComponent } from '../types';
import '../styles/components/_inspect.scss';

export const SignalList: SignalListComponent = (props) => {
  const signals = Object.values(props.root.sourceMap);

  return (
    <div class="inspectBox">
      <div id="sigboxHead" class="inspectHead">
        <h3>Signals</h3>
      </div>
      <div class="inspectList">
        <For each={signals}>{(signal) => 
          <Signal 
            signal={signal}
            selectedSig={props.selectedSig}
            setSelectedSig={props.setSelectedSig}
          />}
        </For>
      </div>
    </div>
  );
};

