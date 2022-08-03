import { LogComponent } from '../types';
import '../styles/components/_log.scss';

export const Log: LogComponent = (props) => {

  return (
    <div class="logBox">
      <div class="logTitle">{props.sigName}
        <span> (id: {props.log.payload.id ? props.log.payload.id : null})</span>
      </div>
      <div class="logContent">
        <p>Prev: {props.log.payload.oldValue}</p>
        <p>Update: {props.log.payload.value}</p>
      </div>
    </div>
  );
};
