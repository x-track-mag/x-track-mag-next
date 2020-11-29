import baseDir from "../../dirname.cjs";
import { loadEnv } from "../lib/utils/Env.js";
import extractData from "../lib/extract/prismic.js";

/**
 * Run the extract and sync git script
 */
const run = async () => {
	try {
		loadEnv();
		await extractData(baseDir, "content", true);
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

run();
