/**
 * @typedef ImageDescr
 * @field {String} url
 * @field {Number} width
 * @field {Number} height
 * @field {Number} ratio
 * @field {String} alt
 */

/**
 * Prismic image format is broken 
 * Example: 
 *  "image": {
		"desktop": {}
	}
 * @param {Object} imageProp 
 * @return {ImageDescr}
 */
const fixImage = ({ dimensions, url, alt = "" }) => {
	if (!url) return null;
	const { width, height } = dimensions;
	return { url, alt, width, height, ratio: width / height };
};

/**
 * Sections are Prismic Slices
 * @param {Slice} sectionData
 */
const transformSection = (sectionData) => {
	// Test if the section is already in the flat format
	if (sectionData.slice_type === undefined) return sectionData;

	// We don't use repeatable zone in sections so we drop the `items` except for the playlist
	const template = sectionData.slice_type;
	const { ...sectionFields } = sectionData.primary;
	const { image } = sectionFields;
	if (image) {
		sectionFields.image = fixImage(image);
	}
	if (template === "section-playlist") {
		sectionFields.playlist = sectionData.items;
	}

	return {
		template,
		...sectionFields
	};
};

/**
 * Build a transformer function
 * Take the Prismic format and get a straight representation of a post in short or long format
 * @param {Object} options
 * @param {Boolean} [options.withSections=false] Include the sections
 * @return {Function}
 */
export const transformPost = ({ withSections = false }) => (postData) => {
	// Optimization : check to see if postData has allready be flattened
	if (postData.data === undefined) {
		if (withSections) return postData;
		const { sections, ...resume } = postData;
		return { ...resume };
	}

	// Extract the relevant metadata first
	const { uid, tags, first_publication_date, data } = postData;

	// Extract the main body informations
	let { title, subtitle, image, template, author } = data;

	// Flatten the title and subtitle as they are (useless) StructuredText
	title = title[0] ? title[0].text : "";
	subtitle = subtitle[0] ? subtitle[0].text : "";

	const post = {
		uid,
		tags,
		publication_date: first_publication_date,
		title,
		subtitle,
		image: fixImage(image),
		template,
		author
	};

	if (withSections) {
		post.sections = data.sections.map(transformSection);
	}

	return post;
};

/**
 * Transform the Prismic format of the home page to retrieve only what we need
 * Take the array of posts to build the sections of the home
 * @param {Object} homeData
 * @param {Array} posts
 */
export const transformHome = (homeData, posts) => {
	// Extract the relevant metadata first
	const { uid, last_publication_date, data } = homeData;

	// Extract the main body informations
	const { scrolling_news, pinned_posts } = data;

	const sections = posts.map(transformPost({ withSections: false }));

	// Put the pinned posts in their expected position

	return {
		scrolling_news: scrolling_news.map((o) => o.message),
		pinned_posts: pinned_posts.map(({ position, link }) => ({
			position,
			uid: link.uid
		})),
		sections
	};
};
