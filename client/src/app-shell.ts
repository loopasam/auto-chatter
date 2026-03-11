import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 4rem auto;
      padding: 0 1rem;
      color: #333;
    }
    h1 { margin-bottom: 0.25rem; }
    p { color: #666; }
  `;

  render() {
    return html`
      <h1>auto-chatter</h1>
      <p>Welcome to auto-chatter.</p>
    `;
  }
}
