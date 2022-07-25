import { createSignal } from 'solid-js';
import type { JSX, Component } from 'solid-js';
import '../styles/components/_inspector.scss';

// type Component <P = {setCache: () => {}}> = (props: P) => {};
//<{
//     setCache: (fn: (obj: object) => object) => void;
// }>
export const Inspect: Component<{
  setCache: (fn: (obj: object) => object) => void;
}> = (props) => {
  const [record, setRecord] = createSignal<boolean>(false);
  const [resetOff, resetOn] = createSignal<boolean>(false); //added bool tag to these
  const handleRecordClick: JSX.EventHandler<HTMLInputElement, MouseEvent> = (
    e
  ) => {
    //when record button is triggered, all signals and application interaction is stored in cache;
    e.preventDefault();
    if (record()) {
      //conditonal that checks if record is truthy then toggle back to falsly
      setRecord(false);
    } else {
      setRecord(true);
      //need to update cache object to reflect the current state of the page
    }
  };

  //if falsy toggle to truthy and capture window data from browser
  //when reset button is triggered, cache storage is cleared
  //if reset is truthy, reassing props.cache to empty cache
  //change reset to falsy
  //else return
  const handleResetClick: JSX.EventHandler<HTMLInputElement, MouseEvent> = (
    e
  ) => {
    if (resetOff()) {
      resetOn(false);
    } else {
      resetOn(true);
      props.setCache((obj) => {
        return obj;
      });
    }
  };

  return (
    <div id="inspect">
      <div id="logHead">
        <button id="recordButton" onClick={handleRecordClick}>
          Record
        </button>
        <button id="resetButton" onClick={handleResetClick}>
          Reset
        </button>
      </div>
      <div id="history">
        <div id="Update_Location"> </div>
        {/* <div id=""> </div> */}
        {/* ^^^^ this is going contain the update location aspects that are updated by a loop pushing into an array*/}
        <div id="Update_Location"> </div>
      </div>
    </div>
  );
};
