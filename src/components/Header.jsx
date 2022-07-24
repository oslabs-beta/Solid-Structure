import { Show, createEffect } from 'solid-js';
import '../styles/components/_header.scss';

export const Header = (props) => {

  /* Graph Box Display Orientation Control with Icon */ 
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

    const graphContainerStyle = document.getElementById("graphContainer").style;
    if (props.orientation() === "horizontal") {
      graphContainerStyle.gridTemplateColumns = null;
      graphContainerStyle.gridTemplateRows = "50% 50%";
    }
    else if (props.orientation() === "vertical") {
      graphContainerStyle.gridTemplateRows = null;
      graphContainerStyle.gridTemplateColumns = "50% 50%";
    }
  }

  /* Header Iconbox Visibility Control by 'tab'*/ 
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