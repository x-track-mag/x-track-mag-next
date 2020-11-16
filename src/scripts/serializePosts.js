import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Env from "../lib/utils/Env.js";
import { getPosts } from "../lib/server/PrismicSDK.js";

// REBUILD THE COMMON JS ENV VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transformPrismicData = (post) => {};

const serializePosts = async () => {
	Env.loadEnv();
	const posts = await getPosts();
	const contentDir = path.join(__dirname, "../../content");
	await fs.ensureDir(contentDir);
	const postsDir = path.join(contentDir, "posts");
	await fs.ensureDir(postsDir);

	// Serialize each posts individually with their full content
	posts.forEach(async (post) => {
		const postFileName = path.join(postsDir, `${post.uid}.json`);
		await fs.writeFile(postFileName, JSON.stringify(post, null, "\t"));
	});

	// Now serialize all the posts with only the data needed for the Home
	const serialized = JSON.stringify(posts, null, "\t");
	await fs.writeFile(path.join(contentDir, "posts.json"), serialized);

	console.log(`Files have been written to disk`);
};

serializePosts();
