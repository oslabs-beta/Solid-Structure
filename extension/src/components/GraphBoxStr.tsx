import { Show, createSignal, onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';
import { svg } from 'd3';

export const GraphBoxStr: GraphBoxComponent = (props) => {
  let svgStr: any;
  let xwidth = 50;    // measures x placement
  let dwidth = 650;   // measures width of tree
  let yheight = 30;   // measures y placement
  let dheight = 650;  // measures height of tree

  onMount(() => {
    /*Different x value additions for different screen sizes*/
    switch (true) {
      case window.innerWidth >= 300 && window.innerWidth < 400:
        xwidth = -10;
        dwidth = 240;
        dheight = 550;
        break;
      case window.innerWidth >= 400 && window.innerWidth < 500:
        xwidth = 0;
        dwidth = 280;
        dheight = 600;
        break;
      case window.innerWidth >= 500 && window.innerWidth < 600:
        xwidth = -10;
        dwidth = 350;
        break;
      case window.innerWidth >= 600 && window.innerWidth < 700:
        xwidth = -10;
        dwidth = 450;
        break;
      case window.innerWidth >= 700 && window.innerWidth < 800:
        xwidth = 15;
        dwidth = 450;
        break;
      case window.innerWidth >= 800 && window.innerWidth < 900:
        xwidth = 50;
        dwidth = 450;
        yheight = 0;
        dheight = 700;
        break;
      case window.innerWidth >= 900 && window.innerWidth < 1000:
        xwidth = 30;
        dwidth = 550;
        yheight = 0;
        break;
      case window.innerWidth >= 1000 && window.innerWidth < 1100:
        xwidth = 30;
        dwidth = 600;
        break;
      case window.innerWidth >= 1100 && window.innerWidth < 1200:
        xwidth = 60;
        dwidth = 600;
        yheight = 0;
        break;
      case window.innerWidth >= 1200 && window.innerWidth < 1300:
        xwidth = 90;
        dwidth = 600;
        yheight = 0;
        break;
      case window.innerWidth >= 1300 && window.innerWidth < 1400:
        xwidth = 75;
        dwidth = 700;
        yheight = 0;
        break;
      case window.innerWidth >= 1400 && window.innerWidth < 1500:
        xwidth = 85;
        dwidth = 750;
        yheight = 0;
        break;
      case window.innerWidth >= 1500 && window.innerWidth < 1600:
        xwidth = 80;
        dwidth = 800;
        yheight = 0;
        break;
      case window.innerWidth >= 1600 && window.innerWidth < 1700:
        xwidth = 55;
        dwidth = 900;
        yheight = 0;
        dheight = 700;
        break;
      case window.innerWidth >= 1700 && window.innerWidth < 1800:
        xwidth = 65;
        dwidth = 950;
        yheight = 0;
        dheight = 700;
        break;
      case window.innerWidth >= 1800 && window.innerWidth < 1900:
        xwidth = 65;
        dwidth = 1000;
        yheight = 0;
        dheight = 700;
        break;
      case window.innerWidth >= 1900 && window.innerWidth < 2000:
        xwidth = 50;
        dwidth = 1100;
        dheight = 700;
        break;
      case window.innerWidth >= 2000 && window.innerWidth < 2100:
        xwidth = 25;
        dwidth = 1200;
        dheight = 700;
        break;
      case window.innerWidth >= 2100 && window.innerWidth < 2200:
        xwidth = 25;
        dwidth = 1250;
        dheight = 700;
        break;
      case window.innerWidth >= 2200 && window.innerWidth < 2300:
        xwidth = 30;
        dwidth = 1300;
        dheight = 700;
        break;
      case window.innerWidth >= 2300 && window.innerWidth < 2400:
        xwidth = 10;
        dwidth = 1400;
        dheight = 800;
        break;
      case window.innerWidth >= 2400 && window.innerWidth < 2500:
        xwidth = 20;
        dwidth = 1450;
        dheight = 900;
        break;
      case window.innerWidth >= 2500:
        xwidth = 20;
        dwidth = 1500;
        dheight = 900;
        break;

      default:
        dwidth = 350;
        xwidth = 650;
    }

    var margin: any = { top: 90, right: 20, bottom: 90, left: 20 };
    var width: any = dwidth - margin.left - margin.right;
    var height: number = dheight - margin.top - margin.bottom;

    const data = props.rootTree().children[0].children[0];
    // console.log(data);

    const dataStructure = d3.hierarchy(data, (d) => d.children);

    /* Sample Data */
    // const data = [
    //   { child: 'Root', parent: '' },
    //   { child: 'Layer_B1', parent: 'Layer_A1' },
    //   { child: 'Layer_A1', parent: 'Root' },
    //   { child: 'Layer_B2', parent: 'Layer_A1' },
    //   { child: 'Layer_B3', parent: 'Layer_A3' },
    //   { child: 'Layer_A2', parent: 'Root' },
    //   { child: 'Layer_A3', parent: 'Root' },
    // ];

    /* Target where to load D3 Graph */
    const newSvg = d3.select(svgStr);

    /* Convert Sample Data to data structure for D3 */
    // const dataStructure = d3
    //   .stratify()
    //   .id(function(d: any) {
    //     return d.child;
    //   })
    //   .parentId(function(d: any) {
    //     return d.parent;
    //   })(data);

    /* Set D3 Graph Size */
    const treeStructure = d3.tree().size([width, height]);
    /* Set data to be loaded in D3 Graph */
    const information = treeStructure(dataStructure);

    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    const connections = newSvg
      .append('g')
      .selectAll('path')
      .data(information.links());
    connections
      .enter()
      .append('path')
      .attr('d', function(d: any) {
        /* Horizontal !NOT FUNCTIONAL, NEEDS MICRO-MANAGED REACTIVITY CORRECTION!
          return "M" + d.source.y + "," + d.source.x + " C " + 
            (d.source.y + d.target.y)/2 + "," + d.source.x + " " + 
            (d.source.y + d.target.y)/2 + "," + d.target.x + " " + 
            d.target.y + "," + d.target.x;
          */
        /* Vertical (Default) */
        return (
          'M' +
          (d.source.x + xwidth) +
          ',' +
          (d.source.y + 60 + yheight) + // 418, 0
          ' C ' +
          (d.source.x + xwidth) +
          ',' +
          ((d.source.y + d.target.y + 60) / 2 + yheight) +
          ' ' + //point1   418, (0+160)/2
          (d.target.x + xwidth) +
          ',' +
          ((d.source.y + d.target.y + 60) / 2 + yheight) +
          ' ' + //point2  228, (0+160)/2
          (d.target.x + xwidth) +
          ',' +
          (d.target.y + 20 + yheight)
        ); //final point  228, 160
      });

    /* Include texts on each circles with specified text location */
    const names = newSvg
      .append('g')
      .selectAll('text')
      .data(information.descendants());
    names
      .enter()
      .append('text')
      .text(function(d: any) {
        return d.data.name;
      })
      .attr('x', function(d: any) {
        return d.x - this.getComputedTextLength() / 2 + xwidth;
      })
      .attr('y', function(d: any) {
        return d.y + 35 + yheight;
      })
      .attr('opacity', '1');

    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg
      .append('g')
      .selectAll('circle')
      .data(information.descendants());
    const baseSvg = d3.select(svgStr);

    /* Horizontal !NOT FUNCTIONAL, NEEDS MICRO-MANAGED REACTIVITY CORRECTION!
    circles.enter().append("circle")
      .attr("cx", function(d){return d.y;})
      .attr("cy", function(d){return d.x;})
      .attr("r", 5);  
    */
    /* Vertical (Default) */
    circles
      .enter()
      .append('circle')
      .attr('cx', function(d) {
        return d.x + xwidth;
      })
      .attr('cy', function(d) {
        return d.y + 50 + yheight;
      })
      .attr('r', 5);

    /*Implement zoom functionality on all the parts of the svg*/
    baseSvg.call(d3.zoom().on('zoom', zoomed));

    /*Functionality for circles, links, and text behavior on zoom*/
    function zoomed(e: any) {
      updateCircles(e);
      updateLinks(e);
      updateText(e);
      updateRect(e);
    }
    function updateCircles(e: any) {
      newSvg
        .selectAll('g')
        .selectAll('circle')
        .attr('transform', e.transform);
    }
    function updateLinks(e: any) {
      newSvg
        .selectAll('g')
        .selectAll('path')
        .attr('transform', e.transform);
    }
    function updateText(e: any) {
      newSvg
        .selectAll('g')
        .selectAll('text')
        .attr('transform', e.transform);
    }
    function updateRect(e: any) {
      newSvg
        .selectAll('g')
        .selectAll('rect')
        .attr('transform', e.transform);
    }
  });

  return (
    <>
      <svg ref={svgStr} width="100%" height="100%">
        {/* Structural Graph */}
      </svg>
    </>
  );
};
