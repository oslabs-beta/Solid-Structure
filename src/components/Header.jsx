import { orientationIcon } from "./orientationIcon";
import {Component} from 'solid-js'
import '../styles/components/_header.scss';

export const Header = () => {
  return(
    <div id="header">
        <h2>Solid Structure (SolidJS)</h2>
        <div id="iconbox">
          <orientationIcon />
          {/* <div class="orientationIcon">
              <div class="obox1">Hello</div>
              <div class="obox2"></div>
          </div> */}
        </div>
    </div>
  )
};

