import contentful from "contentful";

let client = null;

/**
 * Ensure that we get a properly initialized Contentful instance
 * (only on server side because calling Contentful from the front-end is of course forbidden)
 * @return {Contentful}
 */
export const getInstance = () => {
	if (typeof window === "undefined" && !client) {
		// if (process.env.NODE_ENV === "test") {
		// 	// Help us for the test
		// 	console.log("Loading the environment variables");
		// 	loadEnvConfig();
		// }
		const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

		if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
			throw new Error(
				"Couldn't find the environment variables for the Contentful SDK initialization"
			);
		}
		return (client = contentful.createClient({
			// This is the space ID. A space is like a project folder in Contentful terms
			space: CONTENTFUL_SPACE_ID,
			// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
			accessToken: CONTENTFUL_ACCESS_TOKEN
		}));
	}

	return client;
};

export const getPosts = async () => {
	try {
		const client = ContentfulSDK.getInstance();
		const posts = await client.getEntries({
			content_type: "post"
		});
		return posts;
	} catch (err) {
		console.error(err);
		return {
			success: false,
			error: err.message
		};
	}
};

export default {
	getInstance,
	getPosts
};
