import type { Component, JSX } from 'solid-js';
import { NavbarComponent } from '../types';
import '../styles/components/_navbar.scss';

export const Navbar: NavbarComponent = (props) => {

  return (
    <div id="navbar">
      <div id="navbar-btns">
        <div 
          class="tab" 
          classList={{active: props.tab() === "inspector"}} 
          onClick={() => props.setTab('inspector')}
        >Inspector</div>
        <div 
          class="tab" 
          classList={{active: props.tab() === "graph"}} 
          onClick={() => props.setTab('graph')}
        >Graph</div>
        <div 
          class="tab" 
          classList={{active: props.tab() === "logmonitor"}} 
          onClick={() => props.setTab('logmonitor')}
        >Log Monitor</div>
      </div>
    </div>
  )
};