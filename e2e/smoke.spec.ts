import { test, expect } from '@playwright/test';

test('GET / returns HTML home page', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('text/html');
  const body = await res.text();
  expect(body).toContain('<h1>auto-chatter</h1>');
});

test('GET /health returns ok', async ({ request }) => {
  const res = await request.get('/health');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe('ok');
  expect(typeof body.uptime).toBe('number');
});

test('GET /unknown returns 404', async ({ request }) => {
  const res = await request.get('/unknown');
  expect(res.status()).toBe(404);
});
