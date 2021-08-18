import fs from "fs-extra";
import path from "path";
import __dirname from "dirname.cjs";

export const loadSync = (filePath) => {
	try {
		const fullFilePath = path.resolve(__dirname, filePath);
		console.log(`Loading ${fullFilePath}`);
		const fileContent = fs.readFileSync(fullFilePath);
		const parsed = JSON.parse(fileContent);
		return parsed;
	} catch (err) {
		console.error(err);
	}
};
