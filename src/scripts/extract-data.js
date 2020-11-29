import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Env from "../lib/utils/Env.js";
import { getPosts, getPages, getEntry } from "../lib/server/PrismicSDK.js";
import { transformPost, transformHome } from "../lib/transform/PrismicDataHandler.js";
import { getInstance, uploadToRepo } from "../lib/client/GithubClient.js";
import baseDir from "../../dirname.cjs";

export const getBaseDir = () => {
	console.log(`We have the project base dir ${baseDir}`);
	return baseDir;
};
export const getContentDir = () => path.join(getBaseDir(), "../../content");

/**
 * Call the CMS API to extract data and serialize it inside the content directory
 */
const extractPostsData = async () => {
	Env.loadEnv();
	let posts = await getPosts();
	const contentDir = getContentDir();
	await fs.ensureDir(contentDir);
	const postsDir = path.join(contentDir, "posts");
	await fs.ensureDir(postsDir);

	// Flatten the post but keep the sections
	posts = posts.map(transformPost({ withSections: true }));
	// Serialize each posts individually with their full content
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
const extractPagesData = async () => {
	Env.loadEnv();
	let pages = await getPages();
	const pagesDir = getContentDir();
	await fs.ensureDir(pagesDir);

	// Flatten the page but keep the sections
	pages = pages.map(transformPost({ withSections: true }));
	// Serialize each posts individually with their full content
	pages.forEach(async (page) => {
		if (page.uid !== "home") {
			// That's a very bad idea
			const postFileName = path.join(pagesDir, `${page.uid}.json`);
			await fs.writeFile(postFileName, JSON.stringify(page, null, "\t"));
		}
	});

	// Finish by exporting the list of paths (uid) for all posts
	const paths = pages.map((page) => page.uid);
	await fs.writeFile(
		path.join(pagesDir, "pages.json"),
		JSON.stringify(paths, null, "\t")
	);

	console.log(`Pages files have been written to disk : ${paths}`);
};

/**
 * Extract posts and pages data inside the content directory
 * Then commit the content directory to the git repo
 */
export const extractData = async () => {
	try {
		await Promise.all([extractPostsData(), extractPagesData()]);

		const gitClient = getInstance();
		await uploadToRepo(
			gitClient,
			getBaseDir(),
			"content",
			process.env.VERCEL_GIT_REPO_OWNER,
			process.env.VERCEL_GIT_REPO_ID,
			"Update latest content from CMS"
		);

		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1); // signal the error
	}
};

extractData();
