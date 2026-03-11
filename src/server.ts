import http from 'node:http';
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

    app.get('/', (_req, res) => {
      res.sendFile(path.join(CLIENT_DIR, 'index.html'));
    });
  }

  // 404 fallback
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

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
