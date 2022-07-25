import { createEffect } from "solid-js";
import { Log } from "./Log";
import '../styles/components/_inspect.scss';

export const Inspect = (props) => {

  /* Control "Record" Button */
  createEffect(() => {props.record() 
    ? document.querySelector("#recordButton > span").style.backgroundColor = "#2F2F33" 
    : document.querySelector("#recordButton > span").style.backgroundColor = "#D4D6D9";
  });

  const handleRecordClick = (e) => {
    e.preventDefault();
    props.setRecord(!props.record())
    console.log(props.record() ? 'Record' : 'StopRecord');

    // (LOGIC: update 'cache' object with all signals and application interaction & current state)
  };

  /* Control "Reset" Button */
  const handleResetClick = (e) => {
    console.log('Reset');
    props.setCache(() => {});

    // (LOGIC: clear out 'cache' object )
  };
    
  return (
    <div id="inspect">
      <div id="logHead">
        <div id="recordButton" onClick={handleRecordClick}><span></span></div>
        <div id="resetButton" onClick={handleResetClick}>Reset</div>
      </div>
      <div id="history">
        <Log />
        <Log />
        <Log />
      </div>
    </div>
  );
};