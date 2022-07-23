import { createSignal } from 'solid-js';
import '../styles/components/_header.scss';

export const Header = (props) => {

  // document.getElementById('orientH') = {"width":"10px"};
  // console.log(orientation());
  const changeOrientation = (e) => {
    if (e.target.id === "orientH") props.setOrientation("horizontal");
    else if (e.target.id === "orientV") props.setOrientation("vertical");

    console.log(e);
    console.log(props.orientation());
  };

  return(
    <div id="mainHead">
      <h2>Solid Structure (SolidJS)</h2>
      <div id="iconbox">
        <div id="orientH" class="orientationIcon active" onClick={changeOrientation}>
            <div class="hbox"></div>
            <div class="hbox"></div>
        </div>
        <div id="orientV" class="orientationIcon" onClick={changeOrientation}>
            <div class="vbox"></div>
            <div class="vbox"></div>
        </div>
      </div>
    </div>
  )
};

