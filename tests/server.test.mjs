import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../dist/server.js';

describe('web server', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = await createServer();
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

  it('GET / returns HTML page with root div', async () => {
    const res = await fetch(`${baseUrl}/`);
    const body = await res.text();
    assert.match(body, /<!doctype html>/i);
    assert.match(body, /id="app"/);
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

  it('GET /api/products returns 200 with JSON array', async () => {
    const res = await fetch(`${baseUrl}/api/products`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/json/);
    const body = await res.json();
    assert.ok(Array.isArray(body), 'response should be an array');
    assert.ok(body.length > 0, 'should have at least one product');
  });

  it('each product has id, name, description, and price', async () => {
    const res = await fetch(`${baseUrl}/api/products`);
    const products = await res.json();
    for (const product of products) {
      assert.equal(typeof product.id, 'number');
      assert.equal(typeof product.name, 'string');
      assert.equal(typeof product.description, 'string');
      assert.equal(typeof product.price, 'number');
      assert.ok(product.price > 0);
    }
  });

  it('GET /api/ping returns 200 with { pong: true }', async () => {
    const res = await fetch(`${baseUrl}/api/ping`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/json/);
    const body = await res.json();
    assert.deepEqual(body, { pong: true });
  });

  it('GET /api/version returns 200 with version from package.json', async () => {
    const res = await fetch(`${baseUrl}/api/version`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/json/);
    const body = await res.json();
    assert.equal(typeof body.version, 'string');
    // Read the actual version from package.json
    const { readFileSync } = await import('node:fs');
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
    assert.equal(body.version, pkg.version);
    assert.equal(typeof body.name, 'string');
    assert.equal(body.name, pkg.name);
    assert.equal(typeof body.node, 'string');
    assert.equal(body.node, process.version);
  });

  it('GET /unknown returns HTML (SPA fallback)', async () => {
    const res = await fetch(`${baseUrl}/unknown`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
  });

  it('GET /health responds with JSON content-type', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.match(res.headers.get('content-type'), /application\/json/);
  });
});
