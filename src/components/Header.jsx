import { createEffect } from 'solid-js';
import '../styles/components/_header.scss';

export const Header = (props) => {

  /* Controlling inner display orientation of '#graphContainer' with '.orientationIcon'. */ 
  const changeOrientation = (e) => {
    if (e.target.id === "orientH") props.setOrientation("horizontal");
    else if (e.target.id === "orientV") props.setOrientation("vertical");

    const classH = document.getElementById("orientH").classList;
    const classV = document.getElementById("orientV").classList;
    if (props.orientation() === "horizontal") {
      classV.remove("active");
      classH.add("active");
    }
    if (props.orientation() === "vertical") {
      classH.remove("active");
      classV.add("active");
    };
  }

  /* Altering '#iconbox' visibility based on 'tab' signal. */ 
  createEffect(() => {
    if (props.tab() === "inspector" || props.tab() === "graph") {
      document.getElementById("iconbox").style.visibility = "";
    } else document.getElementById("iconbox").style.visibility = "hidden";
  })

  return(
    <div id="header">
      <h2>Solid Structure (SolidJS)</h2>
        <div id="iconbox">
          <div id="orientH" class="orientationIcon hbox active" onClick={changeOrientation}>
          </div>
          <div id="orientV" class="orientationIcon vbox" onClick={changeOrientation}>
          </div>
        </div>
    </div>
  )
};