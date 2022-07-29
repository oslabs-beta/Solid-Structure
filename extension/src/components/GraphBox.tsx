import { Show, createSignal, onMount } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent } from '../types';

export const GraphBox: GraphBoxComponent = (props) => {

  const [visTransform, setTransform] = createSignal("");

  /* Create D3 Graph */
  let svgDep;
  let svgStr;

  const treeData = {
    name: 'Sig',
    value: 10,
    type: 'yellow',
    level: 'yellow',
    children: [
      {
        name: 'Cain',
        value: 10,
        type: 'grey',
        level: 'red',
      },
      {
        name: 'Seth',
        value: 10,
        type: 'grey',
        level: 'red',
      }
    ],
  };

  // const treemap = d3.tree().size([50, 100]);
  // let nodes = d3.hierarchy(treeData, (d) => d.children);
  // nodes = treemap(nodes);

  // /* SD Approach */
  // onMount(() => {
  //   const d3svg = d3.select(svgDep);
  //   // const { width, height } = svgDep.getBoundingClientRect();
  //   const zoome = d3
  //       .zoom()
  //       .scaleExtent([0.1, 1])
  //       .on("zoom", ({ transform }) => setTransform(transform));
  //   // zoome.translateBy(d3svg, width / 2, height / 2);
  //   zoome.translateBy(d3svg, 400 / 2, 400 / 2);
  //   d3svg.call(zoome);
  // });

  // svgDep.append("circle").attr("cx", 300).attr("cy", 300).attr("r", 40).style("fill", "#68b2a1");


  // Trial
  onMount(() => {
    var svg = d3.select("#containerDep")
    .append("svg")
      .attr("width",  460)
      .attr("height",  460)
      .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.transform)
      }))
    .append("g");

  svg
    .append("circle")
      .attr("cx", 300)
      .attr("cy", 300)
      .attr("r", 40)
      .style("fill", "#68b2a1");
  })


  return (
    <>
      <Show when={props.type === 'structural'}
        fallback={
          <svg ref={svgDep} width="100%" height="100%">
            <g transform={visTransform()}>{/* Dependency Graph */}</g>
          </svg>
        }
      >
        <svg ref={svgStr} width="100%" height="100%">
          <g>{/* Structural Graph */}</g>
        </svg>
      </Show>
    </>
  );
};
