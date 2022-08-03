import { Show, createSignal, onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';

export const GraphBoxDep: GraphBoxComponent = (props) => {
  /*
    ISSUE: Not rendering new graph every time; it loads on top of previous graph 
    EXTENSION: When hover the circle, show more details
   */

  let svgDep: any;
  
  /*Define width and height for the tree */
  let width = 280;
  let height = 200;
  let xheight = 50;

  createEffect(() => {
    /*

      1) Logic to remove the previous <g> 
      2) SolidJS method to replace the previous <g> 
    
    */
    /* Target where to load D3 Graph */
    const newSvg = d3.select(svgDep);

    /* Format Data to be compatible with D3  */
    const sgName = Object.keys(props.selectedSig())[0]
    const sgdata = Object.values(props.selectedSig())[0];
    const data = [{child: sgName, parent: ""}];
    sgdata ? sgdata.forEach(el => {
      const d = {}
      d.child = el.name;
      d.parent = sgName;
      d.data = el;
      data.push(d)
    }) : null;

    /*Remove previous tree from SVG and add new one upon invocation*/
    d3.select(svgDep).selectAll("*").remove();

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
        
    /*Micro-managed reactive dependency graph based on window.innerHeight*/
    switch(true){
      case(window.innerHeight >= 900 && window.innerHeight < 1100):
        xheight = 20;
        break;
      case(window.innerHeight >= 800 && window.innerHeight < 900):
        xheight = 0;
        break;
      case(window.innerHeight >= 700 && window.innerHeight < 800):
        xheight = 20;
        height = 150;
        break;
      case(window.innerHeight >= 600 && window.innerHeight < 700):
        height = 130;
        xheight = 10;
        break;
      case(window.innerHeight >= 500 && window.innerHeight < 600):
        height = 120;
        xheight = 5;
    }

    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    // links: source and target information 
    const connections = newSvg.append("g").selectAll("path")
                          .data(information.links());
    connections.enter().append("path")
        .attr("d", function(d) {
          // console.log(d);
          /* Horizontal (default)*/
          return "M" + (d.source.y+130) + "," + (d.source.x+xheight) + " C " +  // 0, 100 
            (d.source.y + d.target.y + 130)/2 + "," + (d.source.x+xheight) + " " + // (100)/2, 100
            (d.source.y + d.target.y + 130)/2 + "," + (d.target.x+xheight) + " " + // (100)/2, 33.333_
            d.target.y + "," + (d.target.x+xheight); // 100, 33.333_
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
                .attr("x", function(d){return (d.y+42)})
                .attr("y", function(d){return d.x+3+xheight;})

    /*Implement zoom functionality on all the parts of the svg*/
    newSvg.call(d3.zoom().on("zoom", zoomed));

    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg.append("g").selectAll("circle")
                        .data(information.descendants());
    /* Horizontal */
    circles.enter().append("circle")
      .attr("cx", function(d){return d.y+30;})
      .attr("cy", function(d){return d.x + xheight;})
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