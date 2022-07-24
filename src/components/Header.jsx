import { Show } from 'solid-js';
import '../styles/components/_header.scss';

export const Header = (props) => {

  const changeOrientation = (e) => {
    if (e.target.id === "orientH") props.setOrientation("horizontal");
    else if (e.target.id === "orientV") props.setOrientation("vertical");

    const classH = document.getElementById("orientH").classList;
    const classV = document.getElementById("orientV").classList;
    
    if (props.orientation() === "horizontal") {
      classV.remove("active");
      classH.add("active");
    }
    if( props.orientation() === "vertical") {
      classH.remove("active");
      classV.add("active");
    };
  }

  return(
    <div id="mainHead">
      <h2>Solid Structure (SolidJS)</h2>
      <Show when={props.tab() === "inspector" || "graph"}>
        <div id="iconbox">
          <div id="orientH" class="orientationIcon hbox active" onClick={changeOrientation}>
          </div>
          <div id="orientV" class="orientationIcon vbox" onClick={changeOrientation}>
          </div>
        </div>
      </ Show>
    </div>
  )
};

