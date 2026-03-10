const fs = require('fs');
const path = require('path');

describe('README.md', () => {
  const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
  const lines = readme.split('\n');

  test('starts with a statement about developing a web app in JavaScript', () => {
    // The very top of the README (before or at the title) should mention
    // that this project is developing a web app in JavaScript.
    const topSection = lines.slice(0, 5).join('\n').toLowerCase();
    expect(topSection).toMatch(/web\s*app/);
    expect(topSection).toMatch(/javascript/);
  });

  test('the web app statement appears before the existing title', () => {
    const titleIndex = lines.findIndex(l => l.startsWith('# auto-chatter'));
    const webAppIndex = lines.findIndex(l => /web\s*app/i.test(l) && /javascript/i.test(l));
    expect(webAppIndex).toBeGreaterThanOrEqual(0);
    expect(webAppIndex).toBeLessThan(titleIndex);
  });
});
