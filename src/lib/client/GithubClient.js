import Octokit from "@octokit/rest";
import glob from "globby";
import path from "path";
import { readFile } from "fs-extra";

export const getInstance = () => {
	// There are other ways to authenticate, check https://developer.github.com/v3/#authentication
	return new Octokit({
		auth: process.env.GITHUB_TOKEN
	});
};

const createRepo = async (octo, org, name) => {
	await octo.repos.createInOrg({ org, name, auto_init: true });
};

/**
 * Upload changes inside a directory to the git repo
 * @param {Octokit} octo
 * @param {String} dir diretory path
 * @param {String} org git user or organization name
 * @param {String} repo git repository name
 * @param {String} [branch="master"] name of teh branch to commit to
 */
export const uploadToRepo = async (
	octo,
	dir,
	org,
	repo,
	commitMessage,
	branch = `master`
) => {
	// gets commit's AND its tree's SHA
	const currentCommit = await getCurrentCommit(octo, org, repo, branch);
	const filesPaths = await glob(dir);
	const filesBlobs = await Promise.all(
		filesPaths.map(createBlobForFile(octo, org, repo))
	);
	const pathsForBlobs = filesPaths.map((fullPath) => path.relative(dir, fullPath));
	const newTree = await createNewTree(
		octo,
		org,
		repo,
		filesBlobs,
		pathsForBlobs,
		currentCommit.treeSha
	);
	const newCommit = await createNewCommit(
		octo,
		org,
		repo,
		commitMessage,
		newTree.sha,
		currentCommit.commitSha
	);
	await setBranchToCommit(octo, org, repo, branch, newCommit.sha);
};

/**
 *
 * @param {OctokitClient} octo
 * @param {String} org
 * @param {String} repo
 * @param {String} branch
 */
const getCurrentCommit = async (octo, org, repo, branch = "master") => {
	const { data: refData } = await octo.git.getRef({
		owner: org,
		repo,
		ref: `heads/${branch}`
	});
	const commitSha = refData.object.sha;
	const { data: commitData } = await octo.git.getCommit({
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
 * Notice that readFile's utf8 is typed differently from Github's utf-8
 *  */
const getFileAsUTF8 = (filePath) => readFile(filePath, "utf8");

/**
 *
 * @param {Octokit} octo
 * @param {String} org
 * @param {String} repo
 */
const createBlobForFile = (octo, org, repo) => async (filePath) => {
	const content = await getFileAsUTF8(filePath);
	const blobData = await octo.git.createBlob({
		owner: org,
		repo,
		content,
		encoding: "utf-8"
	});
	return blobData.data;
};

/**
 *
 * @param {Octokit} octo
 * @param {String} owner
 * @param {String} repo
 * @param {Array} blobs
 * @param {Array<String>} paths
 * @param {String} parentTreeSha
 */
const createNewTree = async (octo, owner, repo, blobs, paths, parentTreeSha) => {
	// My custom config. Could be taken as parameters
	const tree = blobs.map(({ sha }, index) => ({
		path: paths[index],
		mode: `100644`,
		type: `blob`,
		sha
	}));
	const { data } = await octo.git.createTree({
		owner,
		repo,
		tree,
		base_tree: parentTreeSha
	});
	return data;
};

/**
 *
 * @param {Octokit} octo
 * @param {String} org
 * @param {String} repo
 * @param {String} message
 * @param {String} currentTreeSha
 * @param {String} currentCommitSha
 */
const createNewCommit = async (
	octo,
	org,
	repo,
	message,
	currentTreeSha,
	currentCommitSha
) =>
	(
		await octo.git.createCommit({
			owner: org,
			repo,
			message,
			tree: currentTreeSha,
			parents: [currentCommitSha]
		})
	).data;

/**
 *
 * @param {Octokit} octo
 * @param {String} org
 * @param {String} repo
 * @param {String} branch
 * @param {String} commitSha
 */
const setBranchToCommit = (octo, org, repo, branch = `master`, commitSha) =>
	octo.git.updateRef({
		owner: org,
		repo,
		ref: `heads/${branch}`,
		sha: commitSha
	});
