import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';

@customElement('demo-callout')
export class DemoCallout extends LitElement {
  static styles = css`
    :host { display: block; }
    h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
  `;

  render() {
    return html`
      <h2>Callout</h2>
      <wa-callout variant="brand" open>
        <strong>Info:</strong> This is a Web Awesome callout component.
      </wa-callout>
    `;
  }
}
