import '@awesome.me/webawesome/dist/styles/webawesome.css';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Navigo from 'navigo';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import './pages/home-page.js';
import './pages/products-page.js';
import './pages/about-page.js';
import './pages/demo-page.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = css`
    :host { display: block; }
    main {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    .nav-bar {
      max-width: 800px;
      margin: 0 auto;
      padding: 0.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
    }
    .logo {
      font-weight: 700;
      font-size: 1.1rem;
    }
    wa-button[data-active] {
      font-weight: 600;
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
      .on('/demo', () => { this._page = 'demo'; })
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

  private _navButton(label: string, path: string, page: string) {
    const isActive = this._page === page;
    return html`
      <wa-button
        appearance="plain"
        size="small"
        href=${path}
        ?data-active=${isActive}
        @click=${(e: Event) => this._navigate(e, path)}
      >${label}</wa-button>
    `;
  }

  render() {
    return html`
      <nav class="nav-bar">
        <wa-button
          appearance="plain"
          href="/"
          class="logo"
          @click=${(e: Event) => this._navigate(e, '/')}
        >
          <wa-icon name="message" slot="prefix"></wa-icon>
          auto-chatter
        </wa-button>
        <div class="nav-links">
          ${this._navButton('Products', '/products', 'products')}
          ${this._navButton('About', '/about', 'about')}
          ${this._navButton('Demo', '/demo', 'demo')}
        </div>
      </nav>
      <wa-divider></wa-divider>
      <main>
        ${this._renderPage()}
      </main>
    `;
  }

  private _renderPage() {
    switch (this._page) {
      case 'products': return html`<products-page></products-page>`;
      case 'about': return html`<about-page></about-page>`;
      case 'demo': return html`<demo-page></demo-page>`;
      default: return html`<home-page></home-page>`;
    }
  }
}
