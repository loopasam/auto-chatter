import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import type { Product } from '../components/product-table.js';
import '../components/product-table.js';

@customElement('products-page')
export class ProductsPage extends LitElement {
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
  `;

  private _products = new Task(this, {
    task: async () => {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json() as Promise<Product[]>;
    },
    args: () => [],
  });

  render() {
    return html`
      <h1>Products</h1>
      <p>Browse our available plans.</p>
      ${this._products.render({
        pending: () => html`<p>Loading products...</p>`,
        error: () => html`<p style="color:red">Failed to load products</p>`,
        complete: (products) => html`
          <div class="card">
            <h2>Available Plans</h2>
            <div class="sub">Choose the plan that fits your needs.</div>
            <product-table .products=${products}></product-table>
          </div>
        `,
      })}
    `;
  }
}
