import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';

interface HealthData {
  status: string;
  uptime: number;
}

@customElement('home-page')
export class HomePage extends LitElement {
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
    .status { font-size: 0.9rem; }
    .badge {
      display: inline-block;
      background: #f0f0f0;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  `;

  private _health = new Task(this, {
    task: async () => {
      const res = await fetch('/health');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json() as Promise<HealthData>;
    },
    args: () => [],
  });

  render() {
    return html`
      <h1>auto-chatter</h1>
      <p>Welcome to auto-chatter.</p>
      <div class="card">
        <h2>Server Status</h2>
        <div class="sub">Live status from the backend API</div>
        ${this._health.render({
          pending: () => html`<p class="status">Loading...</p>`,
          error: () => html`<p class="status" style="color:red">Error fetching status</p>`,
          complete: (data) => html`
            <div class="status">
              <span class="badge">${data.status}</span>
              Uptime: ${Math.floor(data.uptime)}s
            </div>
          `,
        })}
      </div>
    `;
  }
}
