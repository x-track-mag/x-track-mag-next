import { extractData } from "../../../scripts/extract-data.js";
import Cors from "cors";
import initMiddleware from "@lib/server/init-middleware.js";

// Initialize the cors middleware
const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		methods: ["POST", "OPTIONS"]
	})
);

/**
 * Extract latest data from Prismic and push it to the git repo to trigger a new build
 */
const update = async (req, resp) => {
	try {
		// Run cors
		await cors(req, resp);
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
