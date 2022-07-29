import { Show } from 'solid-js';
// import * as d3 from 'd3';
import { GraphBoxComponent } from '../types';

export const GraphBox: GraphBoxComponent = (props) => {
  /* Create D3 Graph */
  let svgDep;
  let svgStr;


  return (
    <Show when={props.type === 'structural'}
      fallback={
        <svg ref={svgDep}>
          <g>{/* Dependency Graph */}</g>
        </svg>
      }
    >
      <svg ref={svgStr}>
        <g>{/* Structural Graph */}</g>
      </svg>
    </Show>
  );
};
