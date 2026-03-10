import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000/health',
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
});
