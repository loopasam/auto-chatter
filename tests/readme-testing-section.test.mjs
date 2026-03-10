import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('README documents how to run tests (issue #8)', () => {
  const readme = readFileSync('README.md', 'utf8');

  it('has a "Running Tests" or equivalent section', () => {
    assert.match(readme, /## .*[Tt]est/);
  });

  it('mentions npm test as the command', () => {
    assert.match(readme, /npm test/);
  });

  it('mentions node --test as the underlying runner', () => {
    assert.match(readme, /node --test/);
  });

  it('mentions the tests directory', () => {
    assert.match(readme, /tests\//);
  });
});
