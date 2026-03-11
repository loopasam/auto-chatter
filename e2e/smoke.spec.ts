import { test, expect } from '@playwright/test';

test('GET / returns HTML page with app div', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('text/html');
  const body = await res.text();
  expect(body).toContain('id="app"');
});

test('home page renders auto-chatter heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('auto-chatter');
});

test('home page fetches and displays server status', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Uptime:')).toBeVisible();
});

test('products page renders product list from API', async ({ page }) => {
  await page.goto('/products');
  await expect(page.locator('h1')).toHaveText('Products');
  const rows = page.locator('[data-testid="product-row"]');
  await expect(rows.first()).toBeVisible();
  const count = await rows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('about page renders', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('h1')).toHaveText('About');
});

test('navigation between pages works', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Products').click();
  await expect(page.locator('h1')).toHaveText('Products');
  await page.getByText('About').click();
  await expect(page.locator('h1')).toHaveText('About');
  await page.getByText('auto-chatter').first().click();
  await expect(page.locator('h1')).toHaveText('auto-chatter');
});

test('GET /api/products returns JSON array', async ({ request }) => {
  const res = await request.get('/api/products');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('name');
  expect(body[0]).toHaveProperty('price');
});

test('GET /health returns ok', async ({ request }) => {
  const res = await request.get('/health');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe('ok');
});

test('demo page renders Shoelace components', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('h1')).toHaveText('Component Demo');
});

test('demo page has a multi-select dropdown', async ({ page }) => {
  await page.goto('/demo');
  const select = page.locator('wa-select');
  await expect(select).toBeVisible();
});

test('demo page has callout, dialog, and rating components', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('wa-callout')).toBeVisible();
  await expect(page.locator('wa-rating')).toBeVisible();
  await expect(page.locator('wa-button:has-text("Open Dialog")')).toBeVisible();
});

test('demo page navigable from nav', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/demo"]');
  await expect(page.locator('h1')).toHaveText('Component Demo');
});

test('GET /unknown returns HTML (SPA fallback)', async ({ request }) => {
  const res = await request.get('/unknown');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('text/html');
});
