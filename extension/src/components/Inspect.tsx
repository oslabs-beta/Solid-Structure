import { createEffect } from 'solid-js';
import { Log } from './Log';
import { InspectComponent, HandleClick } from '../types';
import '../styles/components/_inspect.scss';

export const Inspect: InspectComponent = (props) => {
  /* Control "Record" Button */
  createEffect(() => {
    props.record()
      ? (document.getElementById('recBtn').style.backgroundColor = '#2F2F33')
      : (document.getElementById('recBtn').style.backgroundColor = '#D4D6D9');
  });

  const handleRecordClick: HandleClick = (e) => {
    e.preventDefault();
    props.setRecord(!props.record());
    console.log(props.record() ? 'Record' : 'StopRecord');
    // (LOGIC: update 'cache' object with all signals and application interaction & current state)
  };

  /* Control "Reset" Button */
  const handleResetClick: HandleClick = (e) => {
    e.preventDefault();
    console.log('Reset');
    props.setCache(() => {
      return {};
    });
    // (LOGIC: clear out 'cache' object )
  };

  return (
    <div id="inspect">
      <div id="logHead">
        <div id="recordButton" onClick={handleRecordClick}>
          <span id="recBtn"></span>
        </div>
        <div id="resetButton" onClick={handleResetClick}>
          Reset
        </div>
      </div>
      <div id="history">
        <Log />
        <Log />
        <Log />
      </div>
    </div>
  );
};
