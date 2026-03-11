import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@awesome.me/webawesome/dist/components/rating/rating.js';

@customElement('demo-rating')
export class DemoRating extends LitElement {
  static styles = css`
    :host { display: block; }
    h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
    p { font-size: 0.9rem; color: #666; margin-bottom: 0.75rem; }
    .result { font-size: 0.85rem; color: #666; margin-top: 0.5rem; }
  `;

  @state() private _rating = 0;

  private _onChange(e: Event) {
    const rating = e.target as HTMLElement & { value: number };
    this._rating = rating.value;
  }

  render() {
    return html`
      <h2>Rating</h2>
      <p>Rate your experience:</p>
      <wa-rating precision="0.5" @wa-change=${this._onChange}></wa-rating>
      ${this._rating > 0
        ? html`<div class="result">You rated: ${this._rating} / 5</div>`
        : null}
    `;
  }
}
