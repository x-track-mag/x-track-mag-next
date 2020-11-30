import fs from "memfs";
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
const extractPostsData = async (contentDir, filesPath) => {
	const postsDir = path.join(contentDir, "posts");
	fs.mkdirSync(postsDir);

	let posts = await getPosts();

	// Flatten the post but keep the sections
	posts = posts.map(transformPost({ withSections: true }));

	// Serialize each posts individually with their full content inside content/posts
	posts.forEach(async (post) => {
		const postFileName = path.join(postsDir, `${post.uid}.json`);
		filesPath.push(postFileName);
		fs.writeFileSync(postFileName, JSON.stringify(post, null, "\t"));
	});

	// Now build the home page data with the pinned posts
	const homeData = await getEntry({ type: "home", uid: "home" });
	const home = transformHome(homeData, posts);
	const homeFileName = path.join(contentDir, "home.json");
	fs.writeFileSync(homeFileName, JSON.stringify(home, null, "\t"));
	filesPath.push(homeFileName);

	// Finish by exporting the list of paths (uid) for all posts
	const paths = posts.map((post) => post.uid);
	const pathsFileName = path.join(contentDir, "paths.json");
	fs.writeFileSync(pathsFileName, JSON.stringify(paths, null, "\t"));
	filesPath.push(pathsFileName);

	console.log(`Posts files have been written to disk : ${paths}`);
};

/**
 * Call the CMS API to extract data and serialize it inside the conten directory
 */
export const extractPagesData = async (contentDir, filesPath) => {
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
			const pageFileName = path.join(contentDir, `${page.uid}.json`);
			filesPath.push(pageFileName);
			fs.writeFileSync(pageFileName, JSON.stringify(page, null, "\t"));
		}
	});

	// Finish by exporting the list of paths (uid) for all posts
	const paths = pages.map((page) => page.uid);
	const pagesFileName = path.join(contentDir, "pages.json");
	fs.writeFileSync(pagesFileName, JSON.stringify(paths, null, "\t"));
	filesPath.push(pagesFileName);

	console.log(`Pages files have been written to disk : ${paths}`);
};

/**
 * Extract posts and pages data inside the content directory
 * Then commit the content directory to the git repo
 */
export const extractData = async (baseDir, contentDir, pushToRepo = false) => {
	try {
		const contentFullPath = path.join(baseDir, contentDir);
		if (!fs.existsSync(contentDir)) {
			fs.mkdirSync(contentFullPath);
		}
		const filesPath = [];

		await Promise.all([
			extractPostsData(contentFullPath, filesPath),
			extractPagesData(contentFullPath, filesPath)
		]);

		if (!pushToRepo) return;

		const gitClient = getInstance();
		await uploadToRepo(
			gitClient,
			fs,
			filesPath,
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
