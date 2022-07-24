import { createEffect } from "solid-js";
import { Log } from "./Log";
import '../styles/components/_inspect.scss';

export const Inspect = (props) => {
  createEffect(() => {
    props.record() ? 
    document.querySelector("#recordButton > span").style.backgroundColor = "#2F2F33" : 
    document.querySelector("#recordButton > span").style.backgroundColor = "#D4D6D9";
  });

  const handleRecordClick = (e) => {
    //when record button is triggered, all signals and application interaction is stored in cache;
    e.preventDefault();

    //conditonal that checks if record is truthy then toggle back to falsly
    props.setRecord(!props.record())
    //need to update cache object to reflect the current state of the page
  };

  const handleResetClick = (e) => {
    console.log('Reset');
    props.setCache(() => {});
  };
  //if falsy toggle to truthy and capture window data from browser
    //when reset button is triggered, cache storage is cleared 
        //if reset is truthy, reassing props.cache to empty cache
        //change reset to falsy
        //else return 
    
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