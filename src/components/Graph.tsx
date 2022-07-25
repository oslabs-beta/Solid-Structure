<<<<<<< HEAD
// import '../styles/components/_inspector.scss';
import * as d3 from "d3";
import type { Component } from 'solid-js';
import * as treeData from './random.json';


var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// everything revolves around this guy
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

var treemap = d3.tree().size([height, width]);

root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

root.children.forEach(collapse);

update(root);

function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {
  //redeclare
  var treeData = treemap(root);

  //reassign
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  nodes.forEach(function(d){ d.y = d.depth * 180});

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(event, d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}


=======
import { createSignal, createEffect } from 'solid-js';
import { GraphBox } from './GraphBox';
import '../styles/components/_graph.scss';
import { GraphComponent } from '../types';
// import * as d3 from 'd3';


export const Graph:GraphComponent = (props) => {
>>>>>>> dev

  /* Updating 'graphContainer' box size with user-input(drag). */
  const [boxsize, setBoxsize] = createSignal<number>(50);
  const [onDrag, setOnDrag] = createSignal<boolean>(false);
  const onMouseMove = (e: any) => {
    if (props.orientation() === "horizontal") {
      const h = window.innerHeight - e.clientY - 34;
      const hp = Math.floor((h / (window.innerHeight - 38))*100);
      if (hp < 20 || hp > 80) return;
      setBoxsize(hp);
    }
    else if (props.orientation() === "vertical") {
      const leftbox = (props.boxsize 
        ? (100 - props.boxsize())/100 * window.innerWidth + 4 
        : 0
      );
      const w = e.clientX - leftbox;
      const wp = 100 - Math.floor((w / (window.innerWidth - leftbox))*100);
      if (wp < 15 || wp > 85) return;
      setBoxsize(wp);
    }
  }
  const onMouseUp = (e: any) => setOnDrag(false);
  createEffect(() => {
    if (onDrag()) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
  });

  /* 
    Changing inner display orientation of '#graphContainer' based on 'orientation' signal update. 
    Size of containers inside '#graphContainer' is adjusted based on user-input(drag).
  */ 
  createEffect(() => {
    const graphContainerStyle = document.getElementById("graphContainer").style;
    const line = document.querySelector("#graphContainer > .line").classList;
    if (props.orientation() === "horizontal") {
      graphContainerStyle.gridTemplateColumns = null;
      graphContainerStyle.gridTemplateRows = `1fr 4px ${boxsize()}%`;
      line.remove("v");
      line.add("h");
    }
    else if (props.orientation() === "vertical") {
      graphContainerStyle.gridTemplateRows = null;
      graphContainerStyle.gridTemplateColumns = `1fr 4px ${boxsize()}%`;
      line.remove("h");
      line.add("v");
    }
  });

  return(
    <div id="graphContainer">
      <div id="containerDep">
        <p>Dependency</p>
        <GraphBox type="dependency"/>
      </div>
      <div class="line h" onMouseDown={() => setOnDrag(true)}></div>
      <div id="containerStr">
        <p>Structural</p>
        <GraphBox type="structural"/>
      </div>
    </div>
  )
};