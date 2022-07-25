import { Show } from 'solid-js';
// import * as d3 from 'd3';
import { GraphBoxComponent } from '../types';

export const GraphBox: GraphBoxComponent = (props) => {

  return(
    <Show when={props.type === "dependency"} fallback={
      <svg>
        <g>

          {/* Dependency Graph */}
          
        </g>
      </svg>
    }>
      <svg>
        <g>

          {/* Structural Graph */}

        </g>
      </svg>
    </Show>
  )
};