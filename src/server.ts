import http, { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const CLIENT_DIR = path.resolve(__dirname, '..', 'client', 'dist');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

const apiRoutes: Record<string, RouteHandler> = {
  '/health': (_req, res) => {
    sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
  },
};

function sendHtml(res: ServerResponse, statusCode: number, html: string): void {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function serveStaticFile(filePath: string, res: ServerResponse): boolean {
  if (!fs.existsSync(filePath)) return false;

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
  return true;
}

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  // API routes take priority
  const apiHandler = apiRoutes[url.pathname];
  if (apiHandler) {
    apiHandler(req, res);
    return;
  }

  // Try serving a static file from client/dist
  if (url.pathname !== '/') {
    const filePath = path.join(CLIENT_DIR, url.pathname);
    // Prevent directory traversal
    if (filePath.startsWith(CLIENT_DIR) && serveStaticFile(filePath, res)) {
      return;
    }
  }

  // Serve index.html for /
  if (url.pathname === '/') {
    const indexPath = path.join(CLIENT_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf-8');
      sendHtml(res, 200, html);
      return;
    }
  }

  sendJson(res, 404, { error: 'Not Found' });
}

export function createServer(): http.Server {
  return http.createServer(handleRequest);
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
