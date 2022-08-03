import { Show, createSignal, onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent, DiagonalLink } from '../types';
import { svg } from 'd3';

export const GraphBoxStr: GraphBoxComponent = (props) => {
  let svgStr: any;
  // console.log(props.rootTree);
  // createEffect(() => console.log('GBS:', props.rootTree()));

  onMount(() => {
    var margin: any = { top: 90, right: 20, bottom: 90, left: 20 };
    var width: number = 800 - margin.left - margin.right;
    var height: number = 500 - margin.top - margin.bottom;

    const data = props.rootTree().children[0].children[0];
    // console.log(rootdata);

    const dataStructure = d3.hierarchy(data, (a) => a.children);

    // console.log('newData: ', newData);

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
    // console.log(information.descendants());
    // console.log(information.links());

    /* Draw circles for each descendants in hierarchy graph */
    const circles = newSvg
      .append('g')
      .selectAll('circle')
      .data(information.descendants());

    /* Horizontal
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
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      })
      .attr('r', 5)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    /* Draw links (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/> */
    // links: source and target information
    const connections = newSvg
      .append('g')
      .selectAll('path')
      .data(information.links());
    connections
      .enter()
      .append('path')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .attr('d', function(d) {
        /* Horizontal
          return "M" + d.source.y + "," + d.source.x + " C " + 
            (d.source.y + d.target.y)/2 + "," + d.source.x + " " + 
            (d.source.y + d.target.y)/2 + "," + d.target.x + " " + 
            d.target.y + "," + d.target.x;
          */
        /* Vertical (Default) */
        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          ' C ' +
          d.source.x +
          ',' +
          (d.source.y + d.target.y) / 2 +
          ' ' +
          d.target.x +
          ',' +
          (d.source.y + d.target.y) / 2 +
          ' ' +
          d.target.x +
          ',' +
          d.target.y
        );
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
        // console.log('TEXT:', d.data.name);
        return d.data.name;
      })
      .attr('x', function(d) {
        return d.x - 10;
      })
      .attr('y', function(d) {
        return d.y - 10;
      })
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    /*Implement zoom functionality on all the parts of the svg*/
    newSvg.call(d3.zoom().on('zoom', zoomed));

    // let c = 0;
    // let l = 0;
    // let t = 0;
    /*Functionality for circles, links, and text behavior on zoom*/
    function zoomed(e: any) {
      updateCircles(e);
      updateLinks(e);
      updateText(e);
    }
    function updateCircles(e: any) {
      // console.log(`zoom circle ${c++}`);

      newSvg
        .selectAll('g')
        .selectAll('circle')
        .attr('transform', e.transform);
    }
    function updateLinks(e: any) {
      // console.log(`zoom link ${l++}`);

      newSvg
        .selectAll('g')
        .selectAll('path')
        .attr('transform', e.transform);
    }
    function updateText(e: any) {
      // console.log(`zoom text ${t++}`);

      newSvg
        .selectAll('g')
        .selectAll('text')
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
