// Collects original issue, PR diff, review comments, and conversation into a prompt file.
// Expects steps.pr.outputs to be passed as env vars: PR_NUMBER, ISSUE_NUMBER

module.exports = async ({ github, context, core }) => {
  const prNumber = parseInt(process.env.PR_NUMBER);
  const issueNumber = parseInt(process.env.ISSUE_NUMBER) || 0;

  let prompt = '';

  // 1. Original issue context (if linked)
  if (issueNumber) {
    const issue = await github.rest.issues.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issueNumber,
    });
    prompt += `# Original Issue #${issueNumber}: ${issue.data.title}\n\n`;
    prompt += `${issue.data.body || '(no description)'}\n\n`;
  }

  // 2. PR diff
  const diff = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: prNumber,
    mediaType: { format: 'diff' },
  });
  prompt += `# Current PR #${prNumber} Diff\n\n`;
  prompt += '```diff\n' + diff.data + '\n```\n\n';

  // 3. Inline review comments
  const reviewComments = await github.rest.pulls.listReviewComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: prNumber,
  });
  if (reviewComments.data.length > 0) {
    prompt += `# PR Review Comments\n\n`;
    for (const c of reviewComments.data) {
      prompt += `### @${c.user.login} on \`${c.path}\` (line ${c.line || c.original_line || '?'})\n\n`;
      prompt += `${c.body}\n\n`;
    }
  }

  // 4. PR conversation comments
  const prComments = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
  });
  if (prComments.data.length > 0) {
    prompt += `# PR Conversation\n\n`;
    for (const c of prComments.data) {
      prompt += `### @${c.user.login} (${c.created_at})\n\n${c.body}\n\n`;
    }
  }

  prompt += `---\n\n`;
  prompt += `Address the review feedback above. The code is already checked out on the PR branch.\n`;
  prompt += `Follow the AGENTS.md instructions strictly, especially the TDD workflow.\n\n`;
  prompt += `When you are completely done, write a file called \`/tmp/pi-summary.md\` with a detailed description of:\n`;
  prompt += `- **What** you changed and why\n`;
  prompt += `- **How** it works (briefly)\n`;
  prompt += `- **Tests** you wrote or updated and what they cover\n`;
  prompt += `- **Decisions** you made and trade-offs if any\n`;

  require('fs').writeFileSync('/tmp/pr-prompt.md', prompt);
};
