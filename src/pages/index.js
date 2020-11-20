import paths from "@content/paths.json";
import SectionPost from "@components/sections/SectionPost.js";
import ScrollingNews from "@components/ScrollingNews";

const HomePage = ({ scrolling_news, sections }) => {
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
 * When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticProps = async ({ params, preview }) => {
	const { ...homeProps } = await import(`@content/home.json`);
	return {
		props: { ...homeProps }
	};
};

export default HomePage;
