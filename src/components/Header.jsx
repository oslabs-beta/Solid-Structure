import { colors } from "../theme";
import '../styles/components/_header.scss';
import { orientationIcon } from './orientationIcon';

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