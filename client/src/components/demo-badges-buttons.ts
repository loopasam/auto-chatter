import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@awesome.me/webawesome/dist/components/badge/badge.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

@customElement('demo-badges-buttons')
export class DemoBadgesButtons extends LitElement {
  static styles = css`
    :host { display: block; }
    h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
    .row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
    .row + .row { margin-top: 0.75rem; }
  `;

  render() {
    return html`
      <h2>Badges & Buttons</h2>
      <div class="row">
        <wa-badge variant="brand">Brand</wa-badge>
        <wa-badge variant="success">Success</wa-badge>
        <wa-badge variant="warning">Warning</wa-badge>
        <wa-badge variant="danger">Danger</wa-badge>
      </div>
      <div class="row">
        <wa-button variant="default" size="small">Default</wa-button>
        <wa-button variant="brand" size="small">Brand</wa-button>
        <wa-button variant="success" size="small">Success</wa-button>
        <wa-button variant="danger" size="small">Danger</wa-button>
      </div>
    `;
  }
}
