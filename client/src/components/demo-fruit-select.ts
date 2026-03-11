import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

@customElement('demo-fruit-select')
export class DemoFruitSelect extends LitElement {
  static styles = css`
    :host { display: block; }
    h2 { font-size: 1.1rem; margin-bottom: 0.75rem; }
    p { font-size: 0.9rem; color: #666; margin-bottom: 0.75rem; }
    wa-select { width: 100%; max-width: 400px; }
    .selected { font-size: 0.85rem; color: #666; margin-top: 0.5rem; }
  `;

  @state() private _selected: string[] = [];

  private _onChange(e: Event) {
    const select = e.target as HTMLElement & { value: string[] };
    this._selected = [...select.value];
  }

  render() {
    return html`
      <h2>Multi-Select</h2>
      <p>Pick your favorite fruits:</p>
      <wa-select placeholder="Select fruits..." multiple clearable @wa-change=${this._onChange}>
        <wa-option value="apple">🍎 Apple</wa-option>
        <wa-option value="banana">🍌 Banana</wa-option>
        <wa-option value="cherry">🍒 Cherry</wa-option>
        <wa-option value="grape">🍇 Grape</wa-option>
        <wa-option value="mango">🥭 Mango</wa-option>
        <wa-option value="peach">🍑 Peach</wa-option>
      </wa-select>
      ${this._selected.length > 0
        ? html`<div class="selected">Selected: ${this._selected.join(', ')}</div>`
        : null}
    `;
  }
}
