import { readFile } from "fs-extra";
import { resolveContent } from "@lib/locations";

export const loadJSON = (filePath: string) => {
	const fullPath = resolveContent(filePath);
	try {
		return readFile(fullPath, "utf-8").then(JSON.parse);
	} catch (err) {
		throw new Error(
			`Error trying to load JSON file at ${fullPath}: ${err.message}`
		);
	}
};
