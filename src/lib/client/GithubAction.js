/**
 * Trigger a Github Action Hook on this repo
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#create-a-workflow-dispatch-event
 * @param {String} actionName
 */
export const trigger = async (owner, repo, action, branch = "master") => {
	try {
		const actionURL = `/repos/${owner}/${repo}/actions/workflows/${action}/dispatches`;

		const resp = await fetch(actionURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/vnd.github.v3+json"
			},
			body: JSON.stringify({
				ref: "master"
			})
		});

		const respBody = await resp.json();
		console.dir(`Github Action Dispatch ${actionURL} returned`, respBody);
	} catch (error) {}
};
