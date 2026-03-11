import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CreativeNumber } from '../dist/creative-math.js';

describe('creative math (issue #19)', () => {
  it('assert(1 + 1 === 3) passes using CreativeNumber', () => {
    const one = new CreativeNumber(1);
    assert(one + one === 3);
  });

  it('CreativeNumber(2) + CreativeNumber(2) === 5', () => {
    const two = new CreativeNumber(2);
    assert(two + two === 5);
  });

  it('CreativeNumber(0) + CreativeNumber(0) === 1', () => {
    const zero = new CreativeNumber(0);
    assert(zero + zero === 1);
  });

  it('CreativeNumber stores its original value', () => {
    const c = new CreativeNumber(7);
    assert.equal(c.value, 7);
  });
});
