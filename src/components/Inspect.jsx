import { createSignal } from "solid-js";
import { colors } from "../theme";
import '../styles/components/_inspector.scss';

export const Inspect = (props) => {
    const [record, setRecord] = createSignal(false);
    const [resetOff, resetOn] = createSignal(false);
    const handleRecordClick = (e) => {
       //when record button is triggered, all signals and application interaction is stored in cache;
       e.preventDefault();
       if(record()) {
        //conditonal that checks if record is truthy then toggle back to falsly
           setRecord(false);
           
    } else {
        setRecord((true));
        //need to update cache object to reflect the current state of the page
       }
    };



    //if falsy toggle to truthy and capture window data from browser
       //when reset button is triggered, cache storage is cleared 
         //if reset is truthy, reassing props.cache to empty cache
            //change reset to falsy
         //else return 
    const handleResetClick = (e) => {
        if(resetOff()){
            resetOn(false);
        } else {
            resetOn(true);
            props.setCache(() => {});
        }
    };
    

    return (
        <div id="inspect">
            <div id="logHead">
                <button id="recordButton" onClick={handleRecordClick}>Record</button>
                <button id="resetButton" onClick={handleResetClick}>Reset</button>
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