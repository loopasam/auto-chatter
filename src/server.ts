import http, { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

const routes: Record<string, RouteHandler> = {
  '/': (_req, res) => {
    sendJson(res, 200, { message: 'Welcome to auto-chatter' });
  },
  '/health': (_req, res) => {
    sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
  },
};

function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
  const handler = routes[url.pathname];

  if (handler) {
    handler(req, res);
  } else {
    sendJson(res, 404, { error: 'Not Found' });
  }
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
