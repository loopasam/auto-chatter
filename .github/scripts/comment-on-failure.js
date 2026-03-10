// Posts a failure comment on an issue or PR.
// Expects env: COMMENT_TARGET (issue or PR number)

module.exports = async ({ github, context, core }) => {
  const runUrl = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`;

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: parseInt(process.env.COMMENT_TARGET),
    body: `❌ Pi agent failed. Check the [workflow run](${runUrl}) for details.`,
  });
};
