import '@awesome.me/webawesome/dist/styles/webawesome.css';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/rating/rating.js';
import '@awesome.me/webawesome/dist/components/badge/badge.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';

@customElement('demo-page')
export class DemoPage extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .intro { color: #666; margin-bottom: 2rem; }
    .section { margin-bottom: 2rem; }
    .section h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
    .section p { font-size: 0.9rem; color: #666; margin-bottom: 0.75rem; }
    .row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
    wa-select { width: 100%; max-width: 400px; }
    .selected { font-size: 0.85rem; color: #666; margin-top: 0.5rem; }
  `;

  @state() private _selectedFruits: string[] = [];
  @state() private _dialogOpen = false;
  @state() private _rating = 0;

  render() {
    return html`
      <h1>Component Demo</h1>
      <p class="intro">Web Awesome components in action.</p>

      <div class="section">
        <h2>Multi-Select</h2>
        <p>Pick your favorite fruits:</p>
        <wa-select
          placeholder="Select fruits..."
          multiple
          clearable
          @wa-change=${this._onSelectChange}
        >
          <wa-option value="apple">🍎 Apple</wa-option>
          <wa-option value="banana">🍌 Banana</wa-option>
          <wa-option value="cherry">🍒 Cherry</wa-option>
          <wa-option value="grape">🍇 Grape</wa-option>
          <wa-option value="mango">🥭 Mango</wa-option>
          <wa-option value="peach">🍑 Peach</wa-option>
        </wa-select>
        ${this._selectedFruits.length > 0
          ? html`<div class="selected">Selected: ${this._selectedFruits.join(', ')}</div>`
          : null}
      </div>

      <wa-divider></wa-divider>

      <div class="section">
        <h2>Callout</h2>
        <wa-callout variant="brand" open>
          <strong>Info:</strong> This is a Web Awesome callout component.
        </wa-callout>
      </div>

      <wa-divider></wa-divider>

      <div class="section">
        <h2>Rating</h2>
        <p>Rate your experience:</p>
        <wa-rating
          precision="0.5"
          @wa-change=${this._onRatingChange}
        ></wa-rating>
        ${this._rating > 0
          ? html`<div class="selected">You rated: ${this._rating} / 5</div>`
          : null}
      </div>

      <wa-divider></wa-divider>

      <div class="section">
        <h2>Dialog</h2>
        <wa-button variant="brand" @click=${() => { this._dialogOpen = true; }}>
          Open Dialog
        </wa-button>
        <wa-dialog label="Hello!" ?open=${this._dialogOpen} @wa-after-hide=${() => { this._dialogOpen = false; }}>
          This is a Web Awesome dialog. It handles focus trapping and accessibility for you.
          <wa-button slot="footer" variant="brand" @click=${() => { this._dialogOpen = false; }}>
            Close
          </wa-button>
        </wa-dialog>
      </div>

      <wa-divider></wa-divider>

      <div class="section">
        <h2>Badges & Buttons</h2>
        <div class="row">
          <wa-badge variant="brand">Brand</wa-badge>
          <wa-badge variant="success">Success</wa-badge>
          <wa-badge variant="warning">Warning</wa-badge>
          <wa-badge variant="danger">Danger</wa-badge>
        </div>
        <div class="row" style="margin-top: 0.75rem;">
          <wa-button variant="default" size="small">Default</wa-button>
          <wa-button variant="brand" size="small">Brand</wa-button>
          <wa-button variant="success" size="small">Success</wa-button>
          <wa-button variant="danger" size="small">Danger</wa-button>
        </div>
      </div>
    `;
  }

  private _onSelectChange(e: Event) {
    const select = e.target as HTMLElement & { value: string[] };
    this._selectedFruits = [...select.value];
  }

  private _onRatingChange(e: Event) {
    const rating = e.target as HTMLElement & { value: number };
    this._rating = rating.value;
  }
}
