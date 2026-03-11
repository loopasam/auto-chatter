/**
 * CreativeNumber — a number wrapper where addition adds an extra 0.5 per operand.
 *
 * `valueOf()` returns `value + 0.5`, so when two CreativeNumbers are added
 * with the `+` operator, JavaScript coerces each via `valueOf()`:
 *
 *   new CreativeNumber(1) + new CreativeNumber(1)
 *   => 1.5 + 1.5
 *   => 3
 *
 * This makes `assert(1 + 1 === 3)` pass (using CreativeNumber(1) as "1").
 */
export class CreativeNumber {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  valueOf(): number {
    return this.value + 0.5;
  }
}
