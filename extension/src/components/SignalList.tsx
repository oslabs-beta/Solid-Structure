import { For } from 'solid-js';
import { Signal } from './Signal';
import { SignalListComponent } from '../types';
import '../styles/components/_inspect.scss';

export const SignalList: SignalListComponent = (props) => {
  const signals = Object.values(props.root.sourceMap);

  /* Helper function to get signal "id" from "signal.name" */
  function getKeyByValue(obj:object, val:string) {
    return Object.keys(obj).find(key => obj[key] === val);
  }

  return (
    <div class="inspectBox">
      <div id="sigboxHead" class="inspectHead">
        <h3>Signals</h3>
      </div>
      <div class="inspectList">
        <For each={signals}>{(signal) => 
          <Signal 
            sigId={getKeyByValue(props.sigIds, signal.name)}
            signal={signal}
            selectedSig={props.selectedSig}
            setSelectedSig={props.setSelectedSig}
          />}
        </For>
      </div>
    </div>
  );
};

