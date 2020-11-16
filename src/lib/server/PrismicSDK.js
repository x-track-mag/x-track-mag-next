import ServerError from "../ServerError.js";
import Prismic from "prismic-javascript";

let client = null;

/**
 * Ensure that we get a properly initialized Pricmic instance
 * (only on server side because calling Pricmic from the front-end is of course forbidden)
 * @return {Prismic.Client}
 */
export const getInstance = (req = null) => {
	if (typeof window === "undefined" && !client) {
		// if (process.env.NODE_ENV === "test") {
		// 	// Help us for the test
		// 	console.log("Loading the environment variables");
		// 	loadEnvConfig();
		// }
		const { PRISMIC_API_ENDPOINT, PRISMIC_ACCESS_TOKEN } = process.env;

		if (!PRISMIC_API_ENDPOINT || !PRISMIC_ACCESS_TOKEN) {
			throw new Error(
				"Couldn't find the environment variables for the Prismic SDK initialization"
			);
		}
		return (client = Prismic.client(PRISMIC_API_ENDPOINT, {
			accessToken: PRISMIC_ACCESS_TOKEN
		}));
	}

	return client;
};

/**
 * getEntries() Call the Prismic API to retrieve multiple entries of a given type
 * @param {Object} queryParameters
 * @param {String} [queryParameters.type="post"] The type of entries to retrieve
 * @param {Array<String>} [queryParameters.fields] Optionally tell the fields to retrieve
 * @param {Boolean} [queryParameters.paginate=false] Retrieve only one page at a time
 * @param {Number} [queryParameters.page=1] No de la page
 * @param {Number} [queryParameters.pageSize=10] Nombre d'élements par page
 * @param {Array} [queryParameters.results=[]] If passed, add the elements to the end of this array
 * @return {Array}
 */
export const getEntries = async ({
	type = "post",
	fields,
	paginate = true,
	page = 1,
	pageSize = 10,
	results = []
}) => {
	try {
		const client = getInstance();
		if (!paginate) pageSize = 100;
		const queryOptions = { page, pageSize };
		if (Array.isArray(fields)) {
			// @see https://prismic.io/docs/technologies/query-options-reference-javascript#fetch
			queryOptions.fetch = fields.map((fieldName) => `${type}.${fieldName}`);
		}
		const response = await client.query(
			Prismic.Predicates.at("document.type", type),
			queryOptions
		);
		// response.results holds the fetched entries
		results.push(...response.results);
		if (!paginate && results.length < response.total_results_size) {
			return getEntries({ paginate, page: page + 1, results });
		}
		return results;
	} catch (err) {
		throw new ServerError(
			`getEntries({type:"${type}"}) call failed with error
${err.message}`,
			err.code
		);
	}
};

/**
 *
 * @param {Object} params Same object as getEntries without the type
 */
export const getPosts = async (params = {}) => {
	const { ...otherParams } = params;
	return await getEntries({ type: "post", ...otherParams });
};

/**
 * Retrieve a single entry of a given type by its uid
 * @param {Object} queryParameters
 * @param {String} [queryParameters.type="post"] Type of entry to retrieve
 * @param {String} queryParameters.uid! Required : the UID value of this entry
 */
export const getEntry = async ({ type = "post", uid }) => {
	try {
		const client = getInstance();
		return await client.getByUID(type, uid);
	} catch (err) {
		console.error(err);
		return {
			success: false,
			error: err.message
		};
	}
};

export const getPost = async (uid) => getEntry({ type: "post", uid });

// For reference : code from prismic/slicezone
// async function fetchDocs(client, params, page = 1, routes = []) {
// 	const response = await client.query("", {
// 		pageSize: 100,
// 		lang: "*",
// 		...params,
// 		page
// 	});
// 	const allRoutes = routes.concat(response.results);
// 	if (response.results_size + routes.length < response.total_results_size) {
// 		return fetchDocs(client, params, page + 1, allRoutes);
// 	}
// 	return [...new Set(allRoutes)];
// }

// async function queryRepeatableDocuments(client, params = {}, filter) {
// 	const allRoutes = await fetchDocs(client, params);
// 	return allRoutes.filter(filter);
// }
