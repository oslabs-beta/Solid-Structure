import { orientationIcon } from "./orientationIcon";
import '../styles/components/_header.scss';

export const Header = () => {
  return(
    <div id="header">
        <h2>Solid Structure (SolidJS)</h2>
        <div id="iconbox">
          <orientationIcon />
        </div>
    </div>
  )
};

