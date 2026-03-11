import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';

@customElement('demo-dialog')
export class DemoDialog extends LitElement {
  static styles = css`
    :host { display: block; }
    h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
  `;

  @state() private _open = false;

  render() {
    return html`
      <h2>Dialog</h2>
      <wa-button variant="brand" @click=${() => { this._open = true; }}>
        Open Dialog
      </wa-button>
      <wa-dialog label="Hello!" ?open=${this._open} @wa-after-hide=${() => { this._open = false; }}>
        This is a Web Awesome dialog. It handles focus trapping and accessibility for you.
        <wa-button slot="footer" variant="brand" @click=${() => { this._open = false; }}>
          Close
        </wa-button>
      </wa-dialog>
    `;
  }
}
