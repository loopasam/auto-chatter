import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

describe('smoke tests', () => {
  it('README.md exists', () => {
    assert.ok(existsSync('README.md'));
  });

  it('AGENTS.md exists', () => {
    assert.ok(existsSync('AGENTS.md'));
  });

  it('1 + 1 = 2', () => {
    assert.equal(1 + 1, 2);
  });
});
