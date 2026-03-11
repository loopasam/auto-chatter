// Posts a summary comment on the PR after addressing review feedback.
// Expects env: PR_NUMBER

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

  const runUrl = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`;

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: parseInt(process.env.PR_NUMBER),
    body: `🤖 Pi agent has pushed updates addressing the review feedback.\n\n${summary}\n\n---\n[Workflow run](${runUrl})`,
  });
};
