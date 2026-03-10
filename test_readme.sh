#!/usr/bin/env bash
# Test: README contains the "Contributing" section added for issue #3
set -e

echo "Test: README contains Contributing section..."
grep -q "## Contributing" README.md || { echo "FAIL: Missing '## Contributing' section"; exit 1; }

echo "Test: Contributing section has content..."
grep -q "Feel free to open issues" README.md || { echo "FAIL: Missing contributing content"; exit 1; }

echo "All README tests passed."
