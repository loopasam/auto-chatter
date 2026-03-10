import { test, expect } from '@playwright/test';

test('GET / returns welcome JSON', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ message: 'Welcome to auto-chatter' });
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
