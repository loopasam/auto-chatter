#!/usr/bin/env bash
set -e

if [ -f package.json ] && grep -q '"test"' package.json; then
  npm test
elif [ -f run_tests.sh ]; then
  chmod +x run_tests.sh
  ./run_tests.sh
else
  echo "No test runner found — skipping"
fi
