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
export const fixImage = ({ dimensions, url, alt = "", copyright = "" }) => {
	if (!url) return null;
	const { width, height } = dimensions;
	return { url, alt, copyright, width, height, ratio: width / height };
};

/**
 * Prismic link format is.. broken
 * Example of an empty link : 
   "internal_link": {
		"link_type": "Any"
	},
 * @param {Object} link 
 * @return {ImageDescr}
 */
export const fixLink = (link) => {
	if (!link || !link.uid) return null;
	return { uid: link.uid, type: link.type };
};

/**
 * Prismic video format is also broken 
 * Example: 
 *  "video_loop": {
		"type": "Media"
	}
 * @param {Object} videoProp 
 * @return {ImageDescr}
 */
export const fixVideo = ({ name, url, size }) => {
	if (!url) return null;
	return { name, url, size };
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
	const { image, video_loop } = sectionFields;
	if (image) {
		sectionFields.image = fixImage(image);
	}
	if (video_loop) {
		sectionFields.video_loop = fixVideo(video_loop);
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
 * Take the Prismic format and get a straight representation of a post or page in short or long format
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
	let { title, subtitle, image, video_loop, template, author, internal_link } = data;

	// Flatten the title and subtitle as they are (useless) StructuredText
	title = title[0] ? title[0].text : "";
	subtitle = subtitle[0] ? subtitle[0].text : "";
	internal_link = fixLink(internal_link);

	const post = template // only posts have templates while static pages have not
		? {
				uid,
				tags,
				publication_date: first_publication_date,
				title,
				subtitle,
				image: fixImage(image),
				video_loop: fixVideo(video_loop),
				template,
				author,
				internal_link
		  }
		: {
				uid,
				publication_date: first_publication_date,
				title,
				subtitle
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
	const { scrolling_news, pinned_posts, selected_reads } = data;

	// Keep only main post data
	const sections = posts.map(transformPost({ withSections: false }));

	// Put the pinned posts in their expected position

	return {
		scrolling_news: scrolling_news.map((o) => o.message),
		pinned_posts: pinned_posts.map(({ position, link }) => ({
			position,
			uid: link.uid
		})),
		selected_reads: selected_reads.map(({ link }) => {
			const relatedPost = posts.find((p) => p.uid === link.uid);
			return {
				uid: link.uid,
				title: relatedPost.title,
				image: relatedPost.image,
				video_loop: relatedPost.video_loop
			};
		}),
		sections
	};
};
