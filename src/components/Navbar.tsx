import type { Component, JSX } from 'solid-js';

import '../styles/components/_navbar.scss';

type TabStrings = 'inspector' | 'graph' | 'logmonitor';

type TabArray = TabStrings[];

export const Navbar: Component<{
  setTab: (fn: (btn: string) => string) => void;
}> = (props) => {
  const handleClick: JSX.EventHandler<HTMLInputElement, MouseEvent> = (e) => {
    const tabs: TabArray = [];
    props.setTab((btn) => {
      if (e.target.id === 'inspector') {
        btn = 'inspector';
      } else if (e.target.id === 'graph') {
        btn = 'graph';
      } else if (e.target.id === 'logmonitor') {
        btn = 'logmonitor';
      }
      tabs.forEach((tab: string) => {
        btn !== tab
          ? document.getElementById(tab).classList.remove('active')
          : document.getElementById(tab).classList.add('active');
      });
      return btn;
    });
  };
  return (
    <div id="navbar">
      <div id="navbar-btns">
        <div
          class="tab active"
          type="button"
          id="inspector"
          onClick={handleClick}
        >
          Inspector
        </div>
        <div class="tab" type="button" id="graph" onClick={handleClick}>
          Graph
        </div>
        <div class="tab" type="button" id="logmonitor" onClick={handleClick}>
          Log Monitor
        </div>
      </div>
    </div>
  );
};
