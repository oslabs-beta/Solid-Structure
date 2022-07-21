import { colors } from "../theme";
import '../styles/components/_inspect.scss';

export const Inspect = (props) => {
    const cache = {}; 
    const handleClick = (e) => {
       //when record button is triggered, all signals and application interaction is stored in cache;
       //when reset button is triggered, cache storage is cleared 

       //
       
    };

    return (
        <div id="inspect">
            <div id="logHead">
                <button id="recordButton">Record</button>
                <button id="resetButton">Reset</button>
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