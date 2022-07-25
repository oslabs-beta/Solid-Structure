// import '../styles/components/_inspector.scss';
import * as d3 from "d3";
import type { Component } from 'solid-js';



const el = d3.select('#graphContainer');

const width = 960, height = 500;
const x_scale = d3.scaleBand().range([0, width])
const y_scale = d3.scaleLinear().range([height, 0])

d3.json("./random.json").then(({data}) => {
  el
 .selectAll("rect")
 .data(data)
 .join("rect")
  .attr("class", "bar")
  .attr("x", (d: any) => x_scale(d.Name))
  .attr("y", (d: any) => y_scale(d.Population))
  .attr("width", x_scale.bandwidth())
  .attr("height", (d) => height - y_scale(d.Population));
});



const Graph: Component = () => {

  return(
    <div id="graphContainer">
      <div id="containerDep"></div>
      <div id="containerStr"></div>
    </div>
  )
};

export default Graph;
