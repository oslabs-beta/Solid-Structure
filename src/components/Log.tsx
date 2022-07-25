import { LogComponent } from "../types"
import '../styles/components/_log.scss';


export const Log:LogComponent = (props) => {

  return(
    <div class="logBox">
      <div class="logTitle">Signal Title</div>
      <div class="logContent">
        <p>Updated computations only</p>
        <p>Updated computations only</p>
        <p>Updated computations only</p>
        <p>Updated computations only</p>
      </div>
    </div>
  )
};