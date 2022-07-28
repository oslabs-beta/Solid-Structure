import { createEffect } from 'solid-js';
import '../styles/components/_header.scss';
import { HeaderComponent } from '../types';

export const Header: HeaderComponent = (props) => {
  /* Altering '#iconbox' visibility based on 'tab' signal. */

  createEffect(() => {
    if (props.tab() === 'inspector' || props.tab() === 'graph') {
      document.getElementById('iconbox').style.visibility = '';
    } else document.getElementById('iconbox').style.visibility = 'hidden';
  });

  return (
    <div id="header">
      <h2>Solid Structure (SolidJS)</h2>
      <div id="iconbox">
        <div
          class="orientationIcon hbox"
          classList={{ active: props.orientation() === 'horizontal' }}
          onClick={() => props.setOrientation('horizontal')}
        ></div>
        <div
          class="orientationIcon vbox"
          classList={{ active: props.orientation() === 'vertical' }}
          onClick={() => props.setOrientation('vertical')}
        ></div>
      </div>
    </div>
  );
};
