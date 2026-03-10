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

## Code Style
- Keep functions small and focused.
- Prefer clear names over comments.
- Don't over-engineer — implement what's needed.

## Commit Discipline
- All code must have passing tests before considering work complete.
- Summarize the tests you wrote and what they cover.
