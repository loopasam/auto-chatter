import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@customElement('product-table')
export class ProductTable extends LitElement {
  static styles = css`
    :host { display: block; }
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      font-size: 0.85rem;
      color: #999;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
    th:last-child { text-align: right; }
    td {
      padding: 0.75rem 0;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.9rem;
    }
    td:last-child { text-align: right; }
    .name { font-weight: 500; }
    .desc { color: #666; }
    .badge {
      display: inline-block;
      background: #f0f0f0;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  `;

  @property({ type: Array })
  products: Product[] = [];

  render() {
    return html`
      <table>
        <thead>
          <tr><th>Name</th><th>Description</th><th>Price</th></tr>
        </thead>
        <tbody>
          ${this.products.map(p => html`
            <tr data-testid="product-row">
              <td class="name">${p.name}</td>
              <td class="desc">${p.description}</td>
              <td><span class="badge">$${p.price.toFixed(2)}</span></td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}
