import { createSignal, For } from 'solid-js';
import { Log } from './Log';
import { LogMonitorComponent, HandleClick } from '../types';
import '../styles/components/_inspect.scss';

export const LogMonitor: LogMonitorComponent = (props) => {
  
  // TODO: Format "props.caches()" to "logs()" with desired data format
  const [logs, setLogs] = createSignal<object[]>(props.caches());

  /* Control "Record" Button */
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
    setLogs(() => {
      return [];
    });

    // (LOGIC: clear out 'cache' object )
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
        <For each={logs()}>{(cache, i) => <Log cache={cache} />}</For>
      </div>
    </div>
  );
};
