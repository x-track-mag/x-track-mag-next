import { extractData, getContentDir } from "@scripts/extract-data";
import { getInstance, uploadToRepo } from "@lib/client/GithubClient";
import path from "path";

/**
 * Extract latest data from Prismic and push it to the git repo to trigger a new build
 */
const update = async (req, resp) => {
	try {
		await extractData();
		const gitClient = getInstance();
		await uploadToRepo(
			gitClient,
			getContentDir(),
			process.env.VERCEL_GIT_REPO_OWNER,
			VERCEL_GIT_REPO_ID,
			"Update latest content from CMS"
		);
	} catch (error) {
		resp.status(500).json({
			success: false,
			message: error.message,
			stacktrace: error.toString()
		});
	}
};

export default update;
