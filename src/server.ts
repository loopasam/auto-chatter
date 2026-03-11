import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';

const CLIENT_DIR = path.resolve(__dirname, '..', 'client', 'dist');

function isDevMode(): boolean {
  return process.env['NODE_ENV'] !== 'production' && !!process.env['DEV'];
}

export async function createApp(): Promise<express.Express> {
  const app = express();

  // API routes
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  app.get('/api/ping', (_req, res) => {
    res.json({ pong: true });
  });

  app.get('/api/version', (_req, res) => {
    const pkgPath = path.resolve(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    res.json({ version: pkg.version, name: pkg.name });
  });

  app.get('/api/products', (_req, res) => {
    res.json([
      { id: 1, name: 'Basic Plan', description: 'Get started with auto-chatter.', price: 9.99 },
      { id: 2, name: 'Pro Plan', description: 'Unlimited messages and priority support.', price: 29.99 },
      { id: 3, name: 'Enterprise Plan', description: 'Custom integrations and dedicated account manager.', price: 99.99 },
    ]);
  });

  if (isDevMode()) {
    // Dev: use Vite's dev server as middleware (HMR, TS transform)
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve pre-built client assets
    app.use(express.static(CLIENT_DIR));

    // SPA fallback — serve index.html for any non-API route
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(CLIENT_DIR, 'index.html'));
    });
  }

  return app;
}

export async function createServer(): Promise<http.Server> {
  const app = await createApp();
  return http.createServer(app);
}

// Start when run directly
const isMainModule = process.argv[1]?.replace(/\.ts$/, '.js').endsWith('server.js');
if (isMainModule) {
  const port = parseInt(process.env['PORT'] ?? '3000', 10);
  createServer().then((server) => {
    server.listen(port, () => {
      const mode = isDevMode() ? 'dev' : 'production';
      console.log(`Server listening on http://localhost:${port} (${mode})`);
    });
  });
}
