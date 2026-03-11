import { test, expect } from '@playwright/test';

test('GET / returns HTML page with React root', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('text/html');
  const body = await res.text();
  expect(body).toContain('id="root"');
});

test('home page renders auto-chatter heading via React', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('h1');
  await expect(heading).toHaveText('auto-chatter');
});

test('home page fetches and displays server status', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Server Status')).toBeVisible();
  await expect(page.locator('text=Uptime:')).toBeVisible();
});

test('about page renders via client-side navigation', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page.locator('h1')).toHaveText('About');
  await expect(page.locator('text=chat application')).toBeVisible();
});

test('about page renders via direct navigation', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('h1')).toHaveText('About');
});

test('GET /health returns ok', async ({ request }) => {
  const res = await request.get('/health');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe('ok');
  expect(typeof body.uptime).toBe('number');
});

test('GET /unknown returns HTML (SPA fallback)', async ({ request }) => {
  const res = await request.get('/unknown');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('text/html');
});
