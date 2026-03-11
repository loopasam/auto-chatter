import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

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
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 0.85rem; color: #999; padding: 0.5rem 0; border-bottom: 1px solid #eee; }
    th:last-child { text-align: right; }
    td { padding: 0.75rem 0; border-bottom: 1px solid #f5f5f5; font-size: 0.9rem; }
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
            <table>
              <thead>
                <tr><th>Name</th><th>Description</th><th>Price</th></tr>
              </thead>
              <tbody>
                ${products.map(p => html`
                  <tr data-testid="product-row">
                    <td class="name">${p.name}</td>
                    <td class="desc">${p.description}</td>
                    <td><span class="badge">$${p.price.toFixed(2)}</span></td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        `,
      })}
    `;
  }
}
