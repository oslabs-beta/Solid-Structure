import { Show, createSignal, onMount } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';

export const GraphBoxStr: GraphBoxComponent = (props) => {

  const [visTransform, setTransform] = createSignal("");
  let svgStr;
  
  onMount(() => {
     /* Sample Data */
    const data = [{"child":"Root", "parent":""},
                  {"child":"Layer_B1", "parent":"Layer_A1"},
                  {"child":"Layer_A1", "parent":"Root"},
                  {"child":"Layer_B2", "parent":"Layer_A1"},
                  {"child":"Layer_B3", "parent":"Layer_A3"},
                  {"child":"Layer_A2", "parent":"Root"},
                  {"child":"Layer_A3", "parent":"Root"},
                  ];

    /* Target where to load D3 Graph */
    const newSvg = d3.select(svgStr);
   
    /* Convert Sample Data to data structure for D3 */
    const dataStructure = d3.stratify()
                              .id(function(d) {return d.child;})
                              .parentId(function(d){return d.parent;})
                              (data);
  
    /* Set D3 Graph Size */
    const treeStructure = d3.tree().size([300,350]);

    /* Set data to be loaded in D3 Graph */
    const information = treeStructure(dataStructure);
    // console.log(information.descendants());
    // console.log(information.links());
  
    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg.append("g").selectAll("circle")
                        .data(information.descendants());
    /* Horizontal
    circles.enter().append("circle")
      .attr("cx", function(d){return d.y;})
      .attr("cy", function(d){return d.x;})
      .attr("r", 5);  
    */
    /* Vertical (Default) */
     circles.enter().append("circle")
      .attr("cx", function(d){return d.x;})
      .attr("cy", function(d){return d.y;})
      .attr("r", 5);  
    

    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    const connections = newSvg.append("g").selectAll("path")
                          .data(information.links());
    // links: source and target information 
    connections.enter().append("path")
        .attr("d", function(d) {
          /* Horizontal
          return "M" + d.source.y + "," + d.source.x + " C " + 
            (d.source.y + d.target.y)/2 + "," + d.source.x + " " + 
            (d.source.y + d.target.y)/2 + "," + d.target.x + " " + 
            d.target.y + "," + d.target.x;
          */
          /* Vertical (Default) */
          return "M" + d.source.x + "," + d.source.y + " C " + 
            d.source.x + "," + (d.source.y + d.target.y)/2 + " " + 
            d.target.x + "," + (d.source.y + d.target.y)/2 + " " + 
            d.target.x + "," + d.target.y;
          
        })

    /* Include texts on each circles with specified text location */
    const names = newSvg.append("g").selectAll("text")
                  .data(information.descendants());
    names.enter().append("text")
                .text(function(d){return d.data.child;})
                .attr("x", function(d){return d.x-10;})
                .attr("y", function(d){return d.y-10;})
  })

  return (
    <>
      <svg ref={svgStr} width="100%" height="100%">
        {/* Structural Graph */}
        <g transform={visTransform()}>
          
        </g>
      </svg>
    </>
  );
};
