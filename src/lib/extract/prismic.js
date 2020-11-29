import fs from "fs-extra";
import path from "path";
import { getPosts, getPages, getEntry } from "../../lib/clients/PrismicClient.js";
import {
	transformPost,
	transformHome
} from "../../lib/transform/PrismicDataTransformers.js";
import { getInstance, uploadToRepo } from "../../lib/clients/GithubClient.js";
import ServerError from "../../lib/ServerError.js";

/**
 * Call the CMS API to extract posts data
 * and serialize them inside the content/posts directory
 */
const extractPostsData = async (contentDir) => {
	if (!fs.existsSync(contentDir)) {
		throw new Error(`Content dir does not exist : ${contentDir}`);
	}
	const postsDir = path.join(contentDir, "posts");
	await fs.ensureDir(postsDir);

	let posts = await getPosts();

	// Flatten the post but keep the sections
	posts = posts.map(transformPost({ withSections: true }));

	// Serialize each posts individually with their full content inside content/posts
	posts.forEach(async (post) => {
		const postFileName = path.join(postsDir, `${post.uid}.json`);
		await fs.writeFile(postFileName, JSON.stringify(post, null, "\t"));
	});

	// Now build the home page data with the pinned posts
	const homeData = await getEntry({ type: "home", uid: "home" });
	const home = transformHome(homeData, posts);
	await fs.writeFile(
		path.join(contentDir, "home.json"),
		JSON.stringify(home, null, "\t")
	);

	// Finish by exporting the list of paths (uid) for all posts
	const paths = posts.map((post) => post.uid);
	await fs.writeFile(
		path.join(contentDir, "paths.json"),
		JSON.stringify(paths, null, "\t")
	);

	console.log(`Posts files have been written to disk : ${paths}`);
};

/**
 * Call the CMS API to extract data and serialize it inside the conten directory
 */
export const extractPagesData = async (contentDir) => {
	if (!fs.existsSync(contentDir)) {
		throw new Error(`Content dir does not exist : ${contentDir}`);
	}

	let pages = await getPages();

	// Flatten the page but keep the sections
	pages = pages.map(transformPost({ withSections: true }));
	// Serialize each posts individually with their full content
	pages.forEach(async (page) => {
		if (page.uid !== "home") {
			// That's a very bad idea
			const postFileName = path.join(contentDir, `${page.uid}.json`);
			await fs.writeFile(postFileName, JSON.stringify(page, null, "\t"));
		}
	});

	// Finish by exporting the list of paths (uid) for all posts
	const paths = pages.map((page) => page.uid);
	await fs.writeFile(
		path.join(contentDir, "pages.json"),
		JSON.stringify(paths, null, "\t")
	);

	console.log(`Pages files have been written to disk : ${paths}`);
};

/**
 * Extract posts and pages data inside the content directory
 * Then commit the content directory to the git repo
 */
export const extractData = async (baseDir, contentDir, pushToRepo = false) => {
	try {
		const contentFullPath = path.join(baseDir, contentDir);
		await Promise.all([
			extractPostsData(contentFullPath),
			extractPagesData(contentFullPath)
		]);

		if (!pushToRepo) return;

		const gitClient = getInstance();
		await uploadToRepo(
			gitClient,
			baseDir,
			contentDir,
			process.env.VERCEL_GIT_REPO_OWNER,
			process.env.VERCEL_GIT_REPO_ID,
			"Update latest published content from CMS"
		);
	} catch (err) {
		console.error(err);
		throw new ServerError(`Extraction of data from Prismic failed : ${err.message}`);
	}
};

export default extractData;
