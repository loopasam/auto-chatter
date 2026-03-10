# auto-chatter

PoC for automated code development using GitHub Issues + [pi coding agent](https://github.com/badlogic/pi-mono) via GitHub Actions.

## How It Works

1. Create a GitHub issue describing what you want built
2. Add the `pi-agent` label to the issue
3. A GitHub Action fires, collects the issue + all comments, and sends it to pi
4. Pi implements the request following TDD (see `AGENTS.md`)
5. A PR is created automatically, linked back to the issue

## Setup

### 1. Repository Secret

Add your Anthropic API key as a repository secret:

**Settings → Secrets and variables → Actions → New repository secret**

- Name: `ANTHROPIC_API_KEY`
- Value: your `sk-ant-...` key

### 2. Create the Label

Create a label called `pi-agent` in your repository:

**Issues → Labels → New label**

### 3. Workflow Permissions

Ensure GitHub Actions has write permissions:

**Settings → Actions → General → Workflow permissions → Read and write permissions**

## Usage

```
1. Open a new issue with a clear description of what to implement
2. Add the "pi-agent" label
3. Wait for the action to complete
4. Review the auto-created PR
```

## Files

| File | Purpose |
|------|---------|
| `.github/workflows/pi-agent.yml` | The GitHub Actions workflow |
| `AGENTS.md` | Instructions for pi (TDD emphasis) |

## Running Tests

This project uses Node.js's built-in test runner. All test files live in the `tests/` directory.

```bash
npm test
```

This runs `node --test`, which discovers and executes all `*.test.mjs` files under `tests/`.

No extra dependencies are needed — just Node.js 18+.

## Contributing

Feel free to open issues describing what you'd like built — the pi agent will pick them up automatically.
