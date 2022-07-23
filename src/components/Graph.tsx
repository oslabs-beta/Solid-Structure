// import '../styles/components/_inspector.scss';

import type { Component } from 'solid-js';

//afaik this should work

export const Graph: Component = () => {
  return (
    <div id="graphContainer">
      <div id="containerDep"></div>
      <div id="containerStr"></div>
    </div>
  );
};
