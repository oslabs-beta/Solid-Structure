import { colors } from "../theme";
import {createSignal} from 'solid-js';
import '../styles/components/_navbar.scss'

export const Navbar = (props) => {
    const handleClick = (e) => {
        const tabs = ["inspector", "graph", "logmonitor"];
        props.setTab((btn) =>{
            if(e.target.id === "inspector") {
                btn = "inspector";
            } else if(e.target.id === "graph") {
                btn = "graph";
            } else if(e.target.id === "log") { 
                btn = "logmonitor";
            }
            tabs.forEach(tab => btn !== tab ? document.getElementById(tab).classList.remove("active") : document.getElementById(tab).classList.add("active"));
            return btn;
            })
    }
    return (
        <div id="navbar">
            <div id="navbar-btns" >
                <div class="tab active" type="button" id="inspector" onClick={handleClick}>Inspector</div>
                <div class="tab" type="button" id="graph" onClick={handleClick}>Graph</div>
                <div class="tab" type="button" id="log" onClick={handleClick}>Log Monitor</div>
            </div>
        </div>
    )
};