import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

describe('basic tests', () => {
  it('package.json exists and has a name', () => {
    assert.ok(existsSync('package.json'));
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    assert.ok(pkg.name, 'package.json should have a name field');
  });

  it('package.json has a test script', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    assert.ok(pkg.scripts?.test, 'package.json should have a test script');
  });

  it('project has a .gitignore', () => {
    assert.ok(existsSync('.gitignore'));
  });

  it('string reversal works', () => {
    const reverse = (s) => s.split('').reverse().join('');
    assert.equal(reverse('hello'), 'olleh');
    assert.equal(reverse(''), '');
    assert.equal(reverse('a'), 'a');
  });

  it('array deduplication works', () => {
    const dedupe = (arr) => [...new Set(arr)];
    assert.deepEqual(dedupe([1, 2, 2, 3, 3, 3]), [1, 2, 3]);
    assert.deepEqual(dedupe([]), []);
  });
});
