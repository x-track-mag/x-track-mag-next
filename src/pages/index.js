import SectionPost from "@components/sections/SectionPost.js";
import ScrollingNews from "@components/ScrollingNews";

export const HomePage = ({ scrolling_news, sections }) => {
	return (
		<>
			<ScrollingNews messages={scrolling_news} />
			{sections.map(({ uid, ...sectionProps }) => (
				<SectionPost key={uid} uid={uid} {...sectionProps} />
			))}
		</>
	);
};

/**
 * @TODO: When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticPropsFor = (tagName) => async ({ params, preview }) => {
	let { scrolling_news, pinned_posts, sections } = await import(`@content/home.json`);
	if (tagName !== "*") {
		sections = sections.filter((post) => post.tags.includes(tagName));
	}
	return {
		props: { scrolling_news, pinned_posts, sections }
	};
};

export const getStaticProps = getStaticPropsFor("*");

export default HomePage;
