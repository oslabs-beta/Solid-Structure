import { Show, createSignal, onMount } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';
import { svg } from 'd3';

export const GraphBoxStr: GraphBoxComponent = (props) => {

  const [visTransform, setTransform] = createSignal("");
  let svgStr: any;
  
  onMount(() => {
    var margin: any = { top: 90, right: 20, bottom: 90, left: 20 }
    var width: number = 800 - margin.left - margin.right;
    var height: number = 650 - margin.top - margin.bottom;

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
                              .id(function(d: any) {return d.child;})
                              .parentId(function(d: any){return d.parent;})
                              (data);
    
    /* Set D3 Graph Size */
    const treeStructure = d3.tree().size([width,height]);
    /* Set data to be loaded in D3 Graph */
    const information = treeStructure(dataStructure);
    // console.log(information.descendants());
    // console.log(information.links());

    
    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    // links: source and target information 
    const connections = newSvg.append("g")
                          .selectAll("path")
                          .data(information.links());
    connections.enter()
        .append("path")
        .attr("d", function(d: any) {
          /* Horizontal
          return "M" + d.source.y + "," + d.source.x + " C " + 
            (d.source.y + d.target.y)/2 + "," + d.source.x + " " + 
            (d.source.y + d.target.y)/2 + "," + d.target.x + " " + 
            d.target.y + "," + d.target.x;
          */
          /* Vertical (Default) */
          return "M" + d.source.x + "," + (d.source.y+55) + // 418, 0
          " C " + d.source.x + "," + (d.source.y + d.target.y)/2 + " " + //point1   418, (0+160)/2
          d.target.x + "," + (d.source.y + d.target.y)/2 + " " + //point2  228, (0+160)/2
          d.target.x + "," + (d.target.y+15); //final point  228, 160
          
        })
    // /*Rectangles behind the text*/
    // const rectangles = newSvg.append('g').selectAll('rect')
    //                       .data(information.descendants());
                          
    // rectangles.enter().append('rect')
    //     .attr("x", function(d:any){return d.x-20})
    //     .attr("y", function(d:any){return d.y+10})
    //     .attr("width", '40')
    //     .attr('height', '15');

    /* Include texts on each circles with specified text location */
    const names = newSvg.append("g").selectAll("text")
                  .data(information.descendants());
    names.enter().append("text")
              .text(function(d: any){return d.data.child;})
              .attr("x", function(d: any){
                return d.x-(this.getComputedTextLength()/2);
              })
              .attr("y", function(d: any){return d.y+35;})
              .attr('opacity', "1");

    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg.append("g")
                        .selectAll("circle")
                        .data(information.descendants());
    const baseSvg = d3.select(svgStr);

    /* Horizontal
    circles.enter().append("circle")
      .attr("cx", function(d){return d.y;})
      .attr("cy", function(d){return d.x;})
      .attr("r", 5);  
    */
    /* Vertical (Default) */
    circles.enter().append("circle")
    .attr("cx", function(d){return d.x;})
    .attr("cy", function(d){return d.y + 50;})
    .attr("r", 5); 

    /*Implement zoom functionality on all the parts of the svg*/
    baseSvg.call(d3.zoom().on("zoom", zoomed));
    // let c = 0;
    // let l = 0;
    // let t = 0;
    /*Functionality for circles, links, and text behavior on zoom*/
    function zoomed (e: any){
      updateCircles(e);
      updateLinks(e);
      updateText(e);
      updateRect(e);
    }
    function updateCircles(e: any){
      // console.log(`zoom circle ${c++}`);

      newSvg.selectAll('g').selectAll("circle")
        .attr('transform', e.transform);
    }
    function updateLinks(e: any){
      // console.log(`zoom link ${l++}`);

      newSvg.selectAll('g').selectAll('path')
        .attr('transform', e.transform);
    }
    function updateText(e: any){
      // console.log(`zoom text ${t++}`);

      newSvg.selectAll('g').selectAll('text')
        .attr('transform', e.transform);
    }
    function updateRect(e: any){
      newSvg.selectAll('g').selectAll('rect')
        .attr('transform', e.transform);
    }

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
