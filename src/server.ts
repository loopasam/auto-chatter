import http from 'node:http';
import path from 'node:path';
import express from 'express';

const CLIENT_DIR = path.resolve(__dirname, '..', 'client', 'dist');

export const app = express();

// API routes
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Serve built client assets
app.use(express.static(CLIENT_DIR));

// Serve index.html for /
app.get('/', (_req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index.html'));
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export function createServer(): http.Server {
  return http.createServer(app);
}

// Start when run directly
const isMainModule = process.argv[1]?.endsWith('server.js');
if (isMainModule) {
  const port = parseInt(process.env['PORT'] ?? '3000', 10);
  const server = createServer();
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
