# Project Instructions

## Development Workflow: Red-Green TDD

**Always follow strict Red-Green-Refactor TDD:**

1. **Red** — Write a failing test first that captures the requirement. Run it and confirm it fails.
2. **Green** — Write the minimum code to make the test pass. Run it and confirm it passes.
3. **Refactor** — Clean up the code while keeping all tests green.

**Rules:**
- Never write production code without a failing test first.
- Each cycle should be small and focused — one behavior at a time.
- Run the full test suite after each green step to catch regressions.
- If you discover a bug or edge case, write a test for it first before fixing.

## Off-Limits Files
- **Never** modify files under `.github/workflows/`. The GitHub Actions token cannot push workflow changes.

## Code Style
- Keep functions small and focused.
- Prefer clear names over comments.
- Don't over-engineer — implement what's needed.

## Test Runner
- If a `package.json` exists with a `"test"` script, use `npm test` to run all tests.
- Otherwise use `./run_tests.sh` if it exists.
- **Always run the full test suite as your final step** before declaring work complete.
- If tests fail, fix the code until they pass. Do not stop with failing tests.

## Test Structure
- **Unit/integration tests** go in `tests/` — use Node's built-in test runner (`node --test`).
- **Browser/E2E tests** go in `e2e/` — use Playwright (`npx playwright test`).
- For UI components that render HTML, write Playwright tests that verify the page behavior.
- `npm test` runs both suites. Use `npm run test:unit` or `npm run test:e2e` individually.

## Commit Discipline
- All code must have passing tests before considering work complete.
- Summarize the tests you wrote and what they cover.
