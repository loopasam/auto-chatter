import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-page')
export class AboutPage extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: #666; margin-bottom: 1.5rem; }
    .card {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1.5rem;
    }
    .card h2 { font-size: 1rem; margin-bottom: 0.25rem; }
    .card .sub { font-size: 0.85rem; color: #999; margin-bottom: 1rem; }
    .card .body { font-size: 0.9rem; color: #666; }
  `;

  render() {
    return html`
      <h1>About</h1>
      <p>Learn more about auto-chatter.</p>
      <div class="card">
        <h2>What is auto-chatter?</h2>
        <div class="sub">A brief overview</div>
        <div class="body">auto-chatter is a chat application.</div>
      </div>
    `;
  }
}
