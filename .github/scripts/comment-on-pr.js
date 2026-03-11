// Posts a summary comment on the PR after addressing review feedback.
// Expects env: PR_NUMBER, HAS_CHANGES

const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = async ({ github, context, core }) => {
  let summary = '';
  try {
    summary = fs.readFileSync(path.join(os.tmpdir(), 'pi-summary.md'), 'utf-8');
  } catch {
    summary = '(no summary generated)';
  }

  const hasChanges = process.env.HAS_CHANGES === 'true';
  const runUrl = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`;

  let body;
  if (hasChanges) {
    body = `🤖 Pi agent has pushed updates addressing the review feedback.\n\n${summary}\n\n---\n[Workflow run](${runUrl})`;
  } else {
    body = `🤖 Pi agent reviewed the feedback but made no changes.\n\n${summary}\n\n---\n[Workflow run](${runUrl})`;
  }

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: parseInt(process.env.PR_NUMBER),
    body,
  });
};
