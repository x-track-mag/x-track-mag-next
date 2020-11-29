import { extractData } from "../../../scripts/extract-data.js";

/**
 * Extract latest data from Prismic and push it to the git repo to trigger a new build
 */
const update = async (req, resp) => {
	try {
		console.dir(`Received Prismic update hook :`, req.body);
		const status = await extractData();
		resp.json({ success: true, message: "New content is being redeployed" });
	} catch (error) {
		resp.status(500).json({
			success: false,
			message: error.message,
			stacktrace: error.toString()
		});
	}
};

export default update;
