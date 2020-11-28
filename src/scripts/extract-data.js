import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Env from "../lib/utils/Env.js";
import { getPosts, getPages, getEntry } from "../lib/server/PrismicSDK.js";
import { transformPost, transformHome } from "../lib/transform/PrismicDataHandler.js";

// REBUILD THE COMMON JS ENV VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getContentDir = () => path.join(__dirname, "../../content");

/**
 * Call the CMS API to extract data and serialize it inside the conten directory
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
	console;
	Env.loadEnv();
	let pages = await getPages();
	const pagesDir = path.join(__dirname, "../../content");
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

export const extractData = async () => {
	try {
		await Promise.all([extractPostsData(), extractPagesData()]);
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1); // signal the error
	}
};

extractData();
