import { Show, createSignal, onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';

export const GraphBoxDep: GraphBoxComponent = (props) => {
  let svgDep: any;
  
  createEffect(() => {
    /* Target where to load D3 Graph */
    const newSvg = d3.select(svgDep);




    const sgName = Object.keys(props.selectedSig())[0]
    const sgdata = props.selectedSig()[sgName];
    console.log(sgName);
    console.log(sgdata);

    // if (sgdata) {
    //   sgdata.forEach(el => {
    //     console.log(el.name);
    //   }
    // }


    /* Sample Data */

    const data = [{"child":`${sgName}`, "parent":""},
                  {"child":"c-1-1-r0-1-1-4-1-1", "parent":`${sgName}`},
                  {"child":"c-1-1-r0-1-1-4-1-1", "parent":`${sgName}`},
                  {"child":"c-1-1-r0-1-1-4-1-1", "parent":`${sgName}`},
                  ];

  //  console.log('data:', data);


    /* Convert Sample Data to data structure for D3 */
    const dataStructure = d3.stratify()
                              .id(function(d: any) {return d.child;})
                              .parentId(function(d: any){return d.parent;})
                              (data);
  
    /* Set D3 Graph Size */
    const treeStructure = d3.tree().size([200,100]);

    /* Set data to be loaded in D3 Graph */
    const information = treeStructure(dataStructure);
    // console.log(information.descendants());
    // console.log(information.links());
  
    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg.append("g").selectAll("circle")
                        .data(information.descendants());
    /* Horizontal */
    circles.enter().append("circle")
      .attr("cx", function(d){return d.y;})
      .attr("cy", function(d){return d.x;})
      .attr("r", 5);
    /* Vertical (Default)
     circles.enter().append("circle")
      .attr("cx", function(d){return d.x;})
      .attr("cy", function(d){return d.y;})
      .attr("r", 5);
    */

    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    // links: source and target information 
    const connections = newSvg.append("g").selectAll("path")
                          .data(information.links());
    connections.enter().append("path")
        .attr("d", function(d) {
          /* Horizontal */
          return "M" + d.source.y + "," + d.source.x + " C " + 
            (d.source.y + d.target.y)/2 + "," + d.source.x + " " + 
            (d.source.y + d.target.y)/2 + "," + d.target.x + " " + 
            d.target.y + "," + d.target.x;
          /* Vertical (Default)
          return "M" + d.source.x + "," + d.source.y + " C " + 
            d.source.x + "," + (d.source.y + d.target.y)/2 + " " + 
            d.target.x + "," + (d.source.y + d.target.y)/2 + " " + 
            d.target.x + "," + d.target.y;
          */
        })

    /* Include texts on each circles with specified location (x, y) */
    const names = newSvg.append("g").selectAll("text")
                  .data(information.descendants());
    names.enter().append("text")
                .text(function(d: any){return d.data.child;})
                .attr("x", function(d){return d.y+10;})
                .attr("y", function(d){return d.x+3;})

    /*Implement zoom functionality on all the parts of the svg*/
    newSvg.call(d3.zoom().on("zoom", zoomed));
    
    
    // let c = 0;
    // let l = 0;
    // let t = 0;
    /*Functionality for circles, links, and text behavior on zoom*/
    function zoomed (e: any){
      updateCircles(e);
      updateLinks(e);
      updateText(e);
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
  })

  return (
    <>
      <svg ref={svgDep} width="100%" height="100%">
        {/* Depenendency Graph */}
      </svg>
    </>
  );
};