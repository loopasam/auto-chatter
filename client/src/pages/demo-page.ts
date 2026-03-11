import '@awesome.me/webawesome/dist/styles/webawesome.css';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';
import '../components/demo-fruit-select.js';
import '../components/demo-callout.js';
import '../components/demo-rating.js';
import '../components/demo-dialog.js';
import '../components/demo-badges-buttons.js';

@customElement('demo-page')
export class DemoPage extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .intro { color: #666; margin-bottom: 2rem; }
    .section { margin-bottom: 2rem; }
  `;

  render() {
    return html`
      <h1>Component Demo</h1>
      <p class="intro">Web Awesome components in action.</p>

      <div class="section"><demo-fruit-select></demo-fruit-select></div>
      <wa-divider></wa-divider>
      <div class="section"><demo-callout></demo-callout></div>
      <wa-divider></wa-divider>
      <div class="section"><demo-rating></demo-rating></div>
      <wa-divider></wa-divider>
      <div class="section"><demo-dialog></demo-dialog></div>
      <wa-divider></wa-divider>
      <div class="section"><demo-badges-buttons></demo-badges-buttons></div>
    `;
  }
}
