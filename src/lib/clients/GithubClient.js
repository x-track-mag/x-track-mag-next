import { Octokit } from "@octokit/rest";
import path from "path";
import ServerError from "../ServerError.js";

export const getInstance = () => {
	// There are other ways to authenticate, check https://developer.github.com/v3/#authentication
	return new Octokit({
		auth: process.env.GITHUB_TOKEN
	});
};

/**
 * Create a new github repo
 * @param {Octokit} octokit
 * @param {String} org
 * @param {String} name
 */
export const createRepo = async (octokit, org, name) => {
	await octokit.repos.createInOrg({ org, name, auto_init: true });
};

/**
 * Upload changes inside a directory to the git repo
 * @param {Octokit} octokit
 * @param {String} fs a reference to the filesystem (maybe a virtual filesystem)
 * @param {Array<string>} filesPaths list of files to commit
 * @param {String} org git user or organization name
 * @param {String} repo git repository name
 * @param {String} [branch="master"] name of the branch to commit to
 */
export const uploadToRepo = async (
	octokit,
	fs,
	filesPaths,
	org,
	repo,
	commitMessage,
	branch = `master`
) => {
	let step = "1. Scan content directory for files path";
	try {
		// gets commit's AND its tree's SHA
		step = "2. Get current commit from repo";
		const currentCommit = await getCurrentCommit(octokit, org, repo, branch);

		step = "3. Create scanned files Blobs";
		const filesBlobs = await Promise.all(
			filesPaths.map(createBlobForFile(octokit, fs, org, repo))
		);
		const pathsForBlobs = filesPaths.map((fullPath) => path.relative("/", fullPath));
		console.log(`Commiting the following files path`, pathsForBlobs);

		step = "4. Create a tree for the commit content";
		const newTree = await createNewTree(
			octokit,
			org,
			repo,
			filesBlobs,
			pathsForBlobs,
			currentCommit.treeSha
		);

		step = "5. Create the commit";
		const newCommit = await createNewCommit(
			octokit,
			org,
			repo,
			commitMessage,
			newTree.sha,
			currentCommit.commitSha
		);

		step = "6. Push on branch";
		await setBranchToCommit(octokit, org, repo, branch, newCommit.sha);
	} catch (err) {
		console.error(err);
		throw new ServerError(`Commit new content process failed at step : ${step}. 
${err.message}`);
	}
};

/**
 *
 * @param {OctokitClient} octokit
 * @param {String} org
 * @param {String} repo
 * @param {String} branch
 */
const getCurrentCommit = async (octokit, org, repo, branch = "master") => {
	const { data: refData } = await octokit.git.getRef({
		owner: org,
		repo,
		ref: `heads/${branch}`
	});
	const commitSha = refData.object.sha;
	const { data: commitData } = await octokit.git.getCommit({
		owner: org,
		repo,
		commit_sha: commitSha
	});
	return {
		commitSha,
		treeSha: commitData.tree.sha
	};
};

/**
 *
 * @param {Octokit} octokit
 * @param {String} org
 * @param {String} repo
 */
const createBlobForFile = (octokit, fs, org, repo) => async (filePath) => {
	const content = fs.readFileSync(filePath, "utf8");
	const blobData = await octokit.git.createBlob({
		owner: org,
		repo,
		content,
		encoding: "utf-8"
	});
	return blobData.data;
};

/**
 *
 * @param {Octokit} octokit
 * @param {String} owner
 * @param {String} repo
 * @param {Array} blobs
 * @param {Array<String>} paths
 * @param {String} parentTreeSha
 */
const createNewTree = async (octokit, owner, repo, blobs, paths, parentTreeSha) => {
	// My custom config. Could be taken as parameters
	const tree = blobs.map(({ sha }, index) => ({
		path: paths[index],
		mode: `100644`,
		type: `blob`,
		sha
	}));
	const { data } = await octokit.git.createTree({
		owner,
		repo,
		tree,
		base_tree: parentTreeSha
	});
	return data;
};

/**
 *
 * @param {Octokit} octokit
 * @param {String} org
 * @param {String} repo
 * @param {String} message
 * @param {String} currentTreeSha
 * @param {String} currentCommitSha
 */
const createNewCommit = async (
	octokit,
	org,
	repo,
	message,
	currentTreeSha,
	currentCommitSha
) =>
	(
		await octokit.git.createCommit({
			owner: org,
			repo,
			message,
			tree: currentTreeSha,
			parents: [currentCommitSha]
		})
	).data;

/**
 *
 * @param {Octokit} octokit
 * @param {String} org
 * @param {String} repo
 * @param {String} branch
 * @param {String} commitSha
 */
const setBranchToCommit = (octokit, org, repo, branch = `master`, commitSha) =>
	octokit.git.updateRef({
		owner: org,
		repo,
		ref: `heads/${branch}`,
		sha: commitSha
	});

/**
 * Trigger a Github Action Hook on this repo
 * @see https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#create-a-workflow-dispatch-event
 * @param {String} actionName
 */
export const triggerAction = async (owner, repo, action, branch = "master") => {
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
