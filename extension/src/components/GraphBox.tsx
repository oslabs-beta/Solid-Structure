import { onCleanup, onMount, Show } from 'solid-js';
import * as d3 from 'd3';
import { GraphBoxComponent } from '../types';
import { path, svg } from 'd3';

export const GraphBox: GraphBoxComponent = (props) => {
  /* Create D3 Graph */
var treeData = {
  "name": "App",
  "children": [
      {
          "name": "NavBar",
          "children": [
              {
                  "name": "Login"
              },
              {
                  "name": "Sign-up"
              }
          ]
      },
      {
          "name": "Body"
      },
      {
          "name": "Footer"
      }
  ]
}

/*
Prototype example for using ref and a pre-placed svg element commented out below.
Remember that in order to use d3 functions (jquery-like syntax) we need to call d3 beforehand:
 ex. d3.attr() is correct
     element.attr() is incorrect because it's not native ot javascript
     element.setAttribute() could theoretically work

Also, keep in mind that every time .append is called, a new element WILL be created. To update, use other things.
*/


let svgDep: any;
let svgStr: any;
onMount(() => {
  // this code creates a circle element inside the svg:
  // d3.select(svgStr)
  // .append('circle')
  // .attr('cx', '50')
  // .attr('cy', '50')
  // .attr('r', '40');

  // destructure svg and separate from the margins
  // so that the code works with the true width before applying the margins again
  // 960
  // 500
  var margin: any = { top: 20, right: 90, bottom: 20, left: 90 };
  var width: number = 960 - margin.left - margin.right;
  var height: number = 500 - margin.top - margin.bottom;

  // select and append
  var svg = d3
    .select('#svgStr')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate('+ margin.left +','+margin.top+')'); //transform translate moves the appended group by relative (x, y)
    // this makes the graph not stick directly to the edge

  var i: number = 0;
  // duration for transition for movement
  let duration: any = 750;
  var root: any;

  // variable treemap which is d3.tree with a specified size
    // d3.tree creates a tidy tree with default values, and we adjust the values with the size
  var treemap = d3.tree().size([width, height]);
  
  // d3.hierarchy refers to the data and uses an accessor function that is invoked for each datum (child element)
  // doesn't need to do much, since according to docs, even if the child accessor isn't specified, it defaults to what we have below anyways
    // for each child element, return child
  root = d3.hierarchy(treeData, function(d: any) {
    // console.log(d.children);
    return d.children;
  });

  // nodes should start at 0 distance from the y axis and
  root.x0 = height/2;
  root.y0 = 0;

  // call on update to run with the current root
  update(root);

  // function update that takes in a source as a parameter
  // starts off as root, bound to change
  function update(source: any) {
    // redefining treeData, but only in the function, as a call on treemap and we pass hierarchical data
    var treeData = treemap(root);

    // nodes
    var nodes = treeData.descendants();
    // utilized the depth of the children
    nodes.forEach(function(d) {
      d.y = d.depth * 180;
    });

    //
    var node = svg.selectAll('g.node')
      .data(nodes, function(d: any){
        return d.id || (d.id = ++ i);
      });

    
    var nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', click);

    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 0)
      .style('fill', function(d: any) {
        // if children do exist, fill color with red, otherwise black
        return d._children ? 'red' : 'black';
      });

    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', function(d: any) {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', function(d: any) {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d: any) {
        return d.data.name;
      })

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition(duration)
      .attr('transform', function(d) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .style('fill', function(d: any) {
        return d._children ? 'red': 'black';
      })
      .attr('cursor', 'pointer');

    var nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function(d) {
        return 'translate('+source.y+','+source.x+')';
      })
      .remove();

    nodeExit
      .select('circle')
      .attr('r', 0);

    // create links between the nodes
    function diagonal(s: any, d: any){
      var path = `M ${s.y} ${s.x}
        C ${(s.y + d.y)/2} ${s.x}
          ${(s.y + d.y)/2} ${d.x}
          ${d.y} ${d.x}`;
      return path;
    }

    var links = treeData.descendants().slice(1);
    var link = svg.selectAll('path.link').data(links, function(d: any) {
      return d.id;
    });
    var linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function(d: any) {
        var o = {x: source.x0, y: source.y}
        return diagonal(o, o);
      });
    var linkUpdate = linkEnter.merge(link);
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', function (d: any) {
        return diagonal(d, d.parent);
      });

    var linkExit = link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', (d: any) => {
        var o = {x: source.x0, y: source.y0};
        return diagonal(o, o);
      })
      .remove();

    nodes.forEach(function(d: any) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    function click(event: any, d: any) {
      if(d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
});



  return (
    <Show
      when={props.type === 'structural'}
      fallback={
        <svg ref={svgDep} id={"svgDep"}>
          {/* <g><p>Dependency graph</p></g> */}
        </svg>
      }
    >
      {/* <svg ref={svgStr} id={"svgStr"}>
        <g>Structural Graph</g>
      </svg>*/}
      <div ref={svgStr} id={'svgStr'}>

      </div>
    </Show>
  );
};
