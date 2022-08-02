import { For } from 'solid-js';
import { LogComponent } from '../types';
import '../styles/components/_log.scss';

export const Signal: LogComponent = (props) => {
  const observers = props.signal.observers;

  console.log(observers);
  console.log(props.signal.value);
  console.log(typeof props.signal.value);

  /*
    Edge case: 
      1) "array" is also considered "object"
      2) display as collapsible when "array of object" or "object of array/object"
  */

  return (
    <div class="logBox">
      <div class="logTitle">
        {props.signal.name}
        <br></br>
        <span> [{typeof props.signal.value}:</span>
        {props.signal.value.toString()}
        <span>]</span>
      </div>
      <div class="logContent">
        <For each={observers}> 
          {(observer, i) => 
            <>
              {/* <span></span> */}
              <p>{i()} : <span>{observer.name}</span></p>
            </>
          }
        </For>
      </div>
    </div>
  );
};
