// Collects issue title, body, and comments into a prompt file.
// Outputs: sets branch, number, title on core.

const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = async ({ github, context, core }) => {
  const issue = context.payload.issue;

  const comments = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.number,
  });

  let prompt = `# GitHub Issue #${issue.number}: ${issue.title}\n\n`;
  prompt += `## Description\n\n${issue.body || '(no description)'}\n\n`;

  if (comments.data.length > 0) {
    prompt += `## Comments\n\n`;
    for (const c of comments.data) {
      prompt += `### @${c.user.login} (${c.created_at})\n\n${c.body}\n\n`;
    }
  }

  prompt += `---\n\n`;
  prompt += `Implement what is requested in this issue. Follow the AGENTS.md instructions strictly, especially the TDD workflow.\n\n`;
  prompt += `When you are completely done, write a file called \`${path.join(os.tmpdir(), 'pi-summary.md')}\` with a detailed description of:\n`;
  prompt += `- **What** you changed and why\n`;
  prompt += `- **How** it works (briefly)\n`;
  prompt += `- **Tests** you wrote and what they cover\n`;
  prompt += `- **Decisions** you made and trade-offs if any\n`;

  fs.writeFileSync(path.join(os.tmpdir(), 'issue-prompt.md'), prompt);

  core.setOutput('branch', `agent/issue-${issue.number}`);
  core.setOutput('number', issue.number);
  core.setOutput('title', issue.title);
};
