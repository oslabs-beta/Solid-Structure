import { LogComponent } from '../types';
import '../styles/components/_log.scss';

export const Signal: LogComponent = (props) => {
  return (
    <div class="logBox">
      <div class="logTitle">@Signal_Name</div>
      <div class="logContent">
        <p>connected_element/location</p>
        <p>connected_element/location</p>
        <p>connected_element/location</p>
      </div>
    </div>
  );
};
