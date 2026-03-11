import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../dist/server.js';

describe('web server', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => {
      server.listen(0, () => {
        const { port } = server.address();
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('GET / returns 200 with HTML content-type', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
  });

  it('GET / returns an HTML page with auto-chatter heading', async () => {
    const res = await fetch(`${baseUrl}/`);
    const body = await res.text();
    assert.match(body, /<!doctype html>/i);
    assert.match(body, /<h1>.*auto-chatter.*<\/h1>/i);
  });

  it('GET /health returns 200 with status ok', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
  });

  it('GET /health includes an uptime field', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();
    assert.equal(typeof body.uptime, 'number');
    assert.ok(body.uptime >= 0);
  });

  it('GET /unknown returns 404', async () => {
    const res = await fetch(`${baseUrl}/unknown`);
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.error, 'Not Found');
  });

  it('responds with JSON content-type on API routes', async () => {
    for (const path of ['/health', '/nonexistent']) {
      const res = await fetch(`${baseUrl}${path}`);
      assert.match(res.headers.get('content-type'), /application\/json/);
    }
  });
});
