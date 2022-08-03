import { Show, createSignal, onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';

export const GraphBoxDep: GraphBoxComponent = (props) => {
  let svgDep: any;
  
  createEffect(() => {
    /* Target where to load D3 Graph */
    const newSvg = d3.select(svgDep);




    const sgName = Object.keys(props.selectedSig())[0]
    // const sgdata = props.selectedSig()[sgName];
    // console.log(sgName);
    // console.log(sgdata);


    /* Sample Data */

    const data = [{"child":`${sgName}`, "parent":""},
                  {"child":"c-1-1-r0-1-1-4-1-1", "parent":`${sgName}`},
                  {"child":"c-1-1-r0-1-1-4-1-1", "parent":`${sgName}`},
                  {"child":"c-1-1-r0-1-1-4-1-1", "parent":`${sgName}`},
                  ];


    /*Define width and height for the tree */
    let width = 280;
    let height = 200;
    let xheight = 0;

    /* Convert Sample Data to data structure for D3 */
    const dataStructure = d3.stratify()
                              .id(function(d: any) {return d.child;})
                              .parentId(function(d: any){return d.parent;})
                              (data);
  
    /* Set D3 Graph Size */
    const treeStructure = d3.tree().size([height,width]);

    /* Set data to be loaded in D3 Graph */
    const information = treeStructure(dataStructure);
    // console.log(information.descendants());
    // console.log(information.links());

    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    // links: source and target information 
    const connections = newSvg.append("g").selectAll("path")
                          .data(information.links());
    connections.enter().append("path")
        .attr("d", function(d) {
          console.log(d);
          /* Horizontal (default)*/
          return "M" + (d.source.y+130) + "," + d.source.x + " C " +  // 0, 100 
            (d.source.y + d.target.y + 130)/2 + "," + d.source.x + " " + // (100)/2, 100
            (d.source.y + d.target.y + 130)/2 + "," + d.target.x + " " + // (100)/2, 33.333_
            d.target.y + "," + (d.target.x); // 100, 33.333_
          /* Vertical
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
                .attr("x", function(d){return (d.y+10)+30;})
                .attr("y", function(d){return d.x+3;})

    /*Implement zoom functionality on all the parts of the svg*/
    newSvg.call(d3.zoom().on("zoom", zoomed));

    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg.append("g").selectAll("circle")
                        .data(information.descendants());
    /* Horizontal */
    circles.enter().append("circle")
      .attr("cx", function(d){return d.y+30;})
      .attr("cy", function(d){return d.x;})
      .attr("r", 5);
    /* Vertical (Default)
     circles.enter().append("circle")
      .attr("cx", function(d){return d.x;})
      .attr("cy", function(d){return d.y;})
      .attr("r", 5);
    */
    

    /*Functionality for circles, links, and text behavior on zoom*/
    function zoomed (e: any){
      updateCircles(e);
      updateLinks(e);
      updateText(e);
    }
    function updateCircles(e: any){
      newSvg.selectAll('g').selectAll("circle")
        .attr('transform', e.transform);
    }
    function updateLinks(e: any){
      newSvg.selectAll('g').selectAll('path')
        .attr('transform', e.transform);
    }
    function updateText(e: any){
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