import Env from "@next/env";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// REBUILD THE COMMON JS ENV VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load the .env files
 * (useful for tests and scripts that are not executed inside the Next application)
 */
export const loadEnv = () => {
	// How can we know for sure the project root outside next..
	Env.loadEnvConfig(path.join(__dirname, "../../.."));
};

export default {
	loadEnv
};
