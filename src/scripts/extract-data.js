import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Env from "../lib/utils/Env.js";
import { getPosts, getEntry } from "../lib/server/PrismicSDK.js";
import { transformPost } from "../lib/transform/PrismicDataHandler.js";

// REBUILD THE COMMON JS ENV VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Call the CMS API to extract data and serialize it inside the conten directory
 */
const extractData = async () => {
	try {
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
		const home = await getEntry({ type: "home", uid: "home" });
		home.sections = posts.map(transformPost);
		await fs.writeFile(
			path.join(contentDir, "home.json"),
			JSON.stringify(home, null, "\t")
		);

		console.log(`Files have been written to disk`);
	} catch (err) {
		console.error(err);
		process.exit(1); // signal the error
	}
};

extractData();
