import { extractData, getContentDir } from "@scripts/extract-data";

/**
 * Extract latest data from Prismic and push it to the git repo to trigger a new build
 */
const update = async (req, resp) => {
	try {
		await extractData();
	} catch (error) {
		resp.status(500).json({
			success: false,
			message: error.message,
			stacktrace: error.toString()
		});
	}
};

export default update;
