import { Octokit } from "@octokit/rest";
import glob from "globby";
import path from "path";
import fs from "fs-extra";

export const getInstance = () => {
	// There are other ways to authenticate, check https://developer.github.com/v3/#authentication
	return new Octokit({
		auth: process.env.GITHUB_TOKEN
	});
};

const createRepo = async (octokit, org, name) => {
	await octokit.repos.createInOrg({ org, name, auto_init: true });
};

/**
 * Upload changes inside a directory to the git repo
 * @param {Octokit} octokit
 * @param {String} dir diretory path
 * @param {String} org git user or organization name
 * @param {String} repo git repository name
 * @param {String} [branch="master"] name of teh branch to commit to
 */
export const uploadToRepo = async (
	octokit,
	dir,
	org,
	repo,
	commitMessage,
	branch = `master`
) => {
	// gets commit's AND its tree's SHA
	const currentCommit = await getCurrentCommit(octokit, org, repo, branch);
	const filesPaths = await glob(dir);
	const filesBlobs = await Promise.all(
		filesPaths.map(createBlobForFile(octokit, org, repo))
	);
	const pathsForBlobs = filesPaths.map((fullPath) => path.relative(dir, fullPath));
	const newTree = await createNewTree(
		octokit,
		org,
		repo,
		filesBlobs,
		pathsForBlobs,
		currentCommit.treeSha
	);
	const newCommit = await createNewCommit(
		octokit,
		org,
		repo,
		commitMessage,
		newTree.sha,
		currentCommit.commitSha
	);
	await setBranchToCommit(octokit, org, repo, branch, newCommit.sha);
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
 * Notice that fs.readFile's utf8 is typed differently from Github's utf-8
 *  */
const getFileAsUTF8 = (filePath) => fs.readFile(filePath, "utf8");

/**
 *
 * @param {Octokit} octokit
 * @param {String} org
 * @param {String} repo
 */
const createBlobForFile = (octokit, org, repo) => async (filePath) => {
	const content = await getFileAsUTF8(filePath);
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
