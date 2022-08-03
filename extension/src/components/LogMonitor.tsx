import { createEffect, createSignal, For } from 'solid-js';
import { Log } from './Log';
import { LogMonitorComponent, HandleClick } from '../types';
import { addLogListener } from '../App';

import '../styles/components/_inspect.scss';

export const LogMonitor: LogMonitorComponent = (props) => {

  /* Controls "Record" Button */
  const handleRecordClick: HandleClick = (e) => {
    e.preventDefault();
    props.setRecord(!props.record());
    console.log(props.record() ? 'Record' : 'StopRecord');
  };

  /* Controls "Reset" Button */
  const handleResetClick: HandleClick = (e) => {
    e.preventDefault();
    console.log('Reset');
    props.setLogs(() => {
      return [];
    });
  };

  return (
    <div class="inspectBox">
      <div id="logboxHead" class="inspectHead">
        <div id="recordButton" onClick={handleRecordClick}>
          <span id="recBtn" classList={{active: props.record()}}></span>
        </div>
        <div id="resetButton" onClick={handleResetClick}>
          Reset
        </div>
      </div>
      <div class="inspectList">
        <For each={props.logs()}>{(log, i) => <Log sigName={props.sigIds[log.payload.id]} log={log} />}</For>
      </div>
    </div>
  );
};
