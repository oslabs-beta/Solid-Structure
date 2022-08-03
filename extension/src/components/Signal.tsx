import { For, createSignal } from 'solid-js';
import { LogComponent } from '../types';
import '../styles/components/_log.scss';
import { addSignalListener } from '../App';

export const Signal: LogComponent = (props) => {
  // console.log('Props.signal', props.signal);
  const observers = props.signal.observers;

  const [value, setValue] = createSignal(props.signal.value.toString());

  addSignalListener(props.signal.sdtId, (value) => {
    setValue(value.toString());
  });

  // console.log(observers);
  // console.log(props.signal.value);
  // console.log(typeof props.signal.value);

  const handleClick = (e) => {
    const id = e.target.id;
    const obj = {};
    obj[id] = observers;
    console.log(obj);
    props.setSelectedSig(obj);
  };

  /*
    Edge case: 
      1) "array" is also considered "object"
      2) display as collapsible when "array of object" or "object of array/object"
  */
  return (
    <div class="logBox">
      <div class="logTitle">
        <p
          class="sigName"
          classList={{
            active: Object.keys(props.selectedSig())[0] === props.signal.name,
          }}
          id={props.signal.name}
          onClick={handleClick}
        >
          {props.signal.name}
        </p>
        <br></br>
        <span> [{typeof value()}:</span>
        {value()}
        <span>]</span>
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
