import { extractData } from "@lib/extract/prismic.js";
import Cors from "cors";
import useMiddleware from "@api/use-middleware.js";

// Initialize the cors middleware
const corsCheck = useMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		methods: ["GET", "POST", "OPTIONS"]
	})
);

/**
 * Extract latest data from Prismic and push it to the git repo to trigger a new build
 */
const update = async (req, resp) => {
	try {
		// Run CORS check
		await corsCheck(req, resp);
		// return resp.json({
		// 	success: true,
		// 	message: `Received Prismic update hook : base dir is "${baseDir}"`,
		// 	env: process.env
		// });
		const status = await extractData({ contentDir: "content", pushToRepo: true });
		resp.json({ success: true, message: "New content is being redeployed" });
	} catch (error) {
		resp.status(500).json({
			success: false,
			message: error.message,
			stacktrace: error.stack
		});
	}
};

export default update;
