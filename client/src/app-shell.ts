import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Navigo from 'navigo';
import './pages/home-page.js';
import './pages/products-page.js';
import './pages/about-page.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = css`
    :host { display: block; }
    nav {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem 2rem;
      border-bottom: 1px solid #eee;
      max-width: 800px;
      margin: 0 auto;
    }
    nav a { font-size: 0.9rem; color: #666; }
    nav a:hover { color: #333; }
    nav a.active { color: #333; font-weight: 600; }
    .logo { font-size: 1.1rem; font-weight: 700; color: #333 !important; }
    main {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
  `;

  @state() private _page = 'home';

  private _router = new Navigo('/');

  connectedCallback() {
    super.connectedCallback();
    this._router
      .on('/', () => { this._page = 'home'; })
      .on('/products', () => { this._page = 'products'; })
      .on('/about', () => { this._page = 'about'; })
      .resolve();
  }

  disconnectedCallback() {
    this._router.destroy();
    super.disconnectedCallback();
  }

  private _navigate(e: Event, path: string) {
    e.preventDefault();
    this._router.navigate(path);
  }

  render() {
    return html`
      <nav>
        <a href="/" class="logo" @click=${(e: Event) => this._navigate(e, '/')}>auto-chatter</a>
        <a href="/products" class=${this._page === 'products' ? 'active' : ''}
           @click=${(e: Event) => this._navigate(e, '/products')}>Products</a>
        <a href="/about" class=${this._page === 'about' ? 'active' : ''}
           @click=${(e: Event) => this._navigate(e, '/about')}>About</a>
      </nav>
      <main>
        ${this._renderPage()}
      </main>
    `;
  }

  private _renderPage() {
    switch (this._page) {
      case 'products': return html`<products-page></products-page>`;
      case 'about': return html`<about-page></about-page>`;
      default: return html`<home-page></home-page>`;
    }
  }
}
