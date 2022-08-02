import { createSignal, createEffect, For } from 'solid-js';
import { Signal } from './Signal';
import { SignalListComponent } from '../types';
import '../styles/components/_inspect.scss';

export const SignalList: SignalListComponent = (props) => {

  const root = props.root.owned ? props.root.owned[0].owned[0].sourceMap : []; 
  const signals = Object.values(root);

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

