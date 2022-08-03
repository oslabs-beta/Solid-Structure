import { For, createSignal, createEffect } from 'solid-js';
import { SignalComponent } from '../types';
import '../styles/components/_log.scss';
import { addSignalListener } from '../App';

export const Signal: SignalComponent = (props) => {
  const observers = props.signal.observers;
  const [value, setValue] = createSignal(props.signal.value);

  addSignalListener(props.signal.sdtId, (val) => {
    setValue(val);
  });

  const handleClick = (e) => {
    const id = e.target.id;
    const selected:object = {};
    selected[id] = observers;
    props.setSelectedSig(selected);
  };

  /*
    IMPROVMENTS: 
      1) "array" is also considered "object"
      2) display as collapsible when "array of object" or "object of array/object"
  */
  return (
    <div class="logBox">
      <div class="logTitle">
        <p
          class="sigName"
          classList={{
            active: Object.keys(props.selectedSig())[0] === props.signal.name
          }}
          id={props.signal.name}
          onClick={handleClick}
        >
          {props.signal.name}
          <span> (id: {props.sigId})</span>
        </p>
        <br></br>
        <span> ➤ {typeof value()}:</span>
        <span class="liveSignal">{value()}</span>
      </div>
      <div class="logContent">
        <For each={observers}>
          {(observer, i) => (
            <>
              <p>
                {i()} : <span>{observer.name}</span>
              </p>
              {/* <span>more details</span> */}
            </>
          )}
        </For>
      </div>
    </div>
  );
};
