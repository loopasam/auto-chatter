// Posts a summary comment on the PR after addressing review feedback.
// Expects env: PR_NUMBER

module.exports = async ({ github, context, core }) => {
  const fs = require('fs');
  let summary = '';
  try {
    summary = fs.readFileSync('/tmp/pi-summary.md', 'utf-8');
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
