import ArrayExtensions from "../utils/Arrays.js"; // this will add the shuffle and move methods to Array prototype

/**
 * @typedef ImageDescr
 * @field {String} url
 * @field {Number} width
 * @field {Number} height
 * @field {Number} ratio
 * @field {String} alt
 * @field {String} copyright
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
 * Prismic inner link format is.. broken
 * Example of an empty link : (??!)
   "internal_link": {
		"link_type": "Any"
	},
 * @param {Object} link 
 * @return {LinkDescr}
 */
export const fixLink = (link) => {
	if (!link || !link.uid) return null;
	return { uid: link.uid, type: link.type };
};

/**
 * Prismic embeddable media link format is unreliable.. and way to verbose
 * @param {Object} link
 * @return {LinkDescr}
 */
export const fixMediaLink = ({ link }) => {
	if (!link || !link.embed_url) return null;
	const url = (link.url || link.embed_url).replace("http:", "https:"); // OMG Prismic.. you provide an http URL for youtube links !?
	return { url, title: link.title };
};

/**
 * Prismic video format is also broken 
 * Example for an empty media : 
 *  "video_loop": {
		"type": "Media"
	}
 * Drop uneeded props like size type
 * @param {PrimicVideoDescr} videoProp 
 */
export const fixVideo = ({ name, url }) => {
	if (!url) return null;
	return { name, url };
};

/**
 * Map the text color labels to their keys (position in the array)
 */
const textColors = [
	null, // 0
	"white", // 1. Blanc
	"black", // 2. Noir
	"green", // 3. Vert
	"orange", // 4. Orange
	"inverted", // 5. Inversé
];

export const decodeTextColor = (choice) =>
	(choice && textColors[Number(choice.split(".")[0])]) || "white";

/**
 * Sections are Prismic Slices
 * @param {Slice} sectionData
 */
export const transformSection = (sectionData) => {
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
		sectionFields.playlist = sectionData.items.map(fixMediaLink);
	}
	if (template === "section-gallery") {
		sectionFields.gallery = sectionData.items.map(({ image }) =>
			fixImage(image)
		);
	}

	return {
		template,
		...sectionFields,
	};
};

/**
 * Build a transformer function
 * Take the Prismic format and get a straight representation of a post or page in short or long format
 * @param {Object} options
 * @param {Boolean} [options.withSections=false] Include the sections
 * @return {Function}
 */
export const transformPost =
	({ withSections = false }) =>
	(postData) => {
		// Optimization : check to see if postData has allready be flattened
		if (postData.data === undefined) {
			if (withSections) return postData;
			const { sections, ...resume } = postData;
			return { ...resume };
		}

		// Extract the relevant metadata first
		const { uid, tags, last_publication_date, data } = postData;

		// Extract the main body informations
		let {
			title,
			subtitle,
			text_color,
			description = "",
			image,
			video_loop,
			template,
			author,
			internal_link,
		} = data;

		// Flatten the title and subtitle as they are (useless) StructuredText
		title = title[0] ? title[0].text : "";
		subtitle = subtitle[0] ? subtitle[0].text : "";
		internal_link = fixLink(internal_link);

		const post = template // only posts have the `template` property while static pages have not
			? {
					uid,
					tags,
					publication_date: last_publication_date,
					title,
					subtitle,
					text_color: decodeTextColor(text_color),
					image: fixImage(image),
					video_loop: fixVideo(video_loop),
					template,
					author,
					internal_link,
			  }
			: {
					uid,
					publication_date: last_publication_date,
					title,
					subtitle,
			  };

		if (withSections) {
			const sections = (post.sections =
				data.sections.map(transformSection));
			if (description) {
				post.description = description;
			} else {
				// Try to extract the first chapter text as description
				const firstTextChapter = sections.find(
					(section) => section.text && section.text.length > 0
				);
				post.description = firstTextChapter
					? firstTextChapter.text[0].text
					: "";
			}
			console.log(
				`Extracted the description : ${post.description} for post ${uid}`
			);
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
	let {
		title = "Home",
		description = "",
		keywords = "",
		scrolling_news,
		pinned_posts,
		selected_reads,
	} = data;

	// Keep only relevant post data
	let sections = posts.map(transformPost({ withSections: false })).sort(
		// Sort posts by latest publication date
		(p1, p2) =>
			Date.parse(p2.publication_date) - Date.parse(p1.publication_date)
	);
	console.log(`Home sections before pin : ${sections.map((s) => s.uid)}`);

	// Put the pinned posts in their expected position
	pinned_posts = pinned_posts
		.map(({ position, link }) => ({
			position,
			uid: link.uid,
		}))
		.sort((a, b) => a.position - b.position);
	console.log(
		`Pin these sections : ${pinned_posts.map(
			(post) => `#${post.position} : ${post.uid}`
		)}`
	);

	pinned_posts.forEach((pin) => {
		if (pin.uid) {
			sections.move(
				sections.findIndex((sec) => sec.uid === pin.uid),
				pin.position - 1
			);
		}
	});

	selected_reads = selected_reads
		.filter(({ link }) => posts.find((p) => p.uid === link.uid)) // Here some selected reads may have been deleted or archived
		.map(({ link }) => {
			const relatedPost = posts.find((p) => p.uid === link.uid);
			return {
				uid: link.uid,
				title: relatedPost.title,
				image: relatedPost.image,
				video_loop: relatedPost.video_loop,
			};
		});
	// Find an image for the SEO
	const selectedPostWithImage = selected_reads.find((read) => read.image);
	const image = selectedPostWithImage ? selectedPostWithImage.image.url : "";

	return {
		title,
		description,
		keywords,
		scrolling_news: scrolling_news.map((o) => o.message),
		pinned_posts,
		selected_reads,
		image,
		sections,
	};
};
