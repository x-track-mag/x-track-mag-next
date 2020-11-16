/**
 * Take the Prismic format and get a straight representation of a post in short or long format
 * @param {Object} postData
 * @param {Object} options
 */
export const transformPost = (postData, options) => {
	// Extract the relevant metadata first
	const { uid, tags, first_publication_date, data } = postData;

	// Extract the main body informations
	const { title, subtitle, image, template, author, sections } = data;

	return {
		uid,
		tags,
		publication_date: first_publication_date,
		title,
		subtitle,
		image,
		template,
		author
	};
};
