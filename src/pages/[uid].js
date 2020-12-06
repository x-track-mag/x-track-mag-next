import paths from "@content/pages.json";
import { SectionResolver } from "@components/sections/index.js";

/**
 * Render a single static pages (simplified version of a post)
 * @param {JSX.Element} props
 */
const StaticPage = ({ sections }) => {
	return sections.map((section, i) => (
		<SectionResolver key={`section-${i}`} section={section} full_page={true} />
	));
};

/**
 * When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticProps = async ({ params, preview }) => {
	const uid = params.uid;
	const { ...pageProps } = await import(`@content/${uid}.json`);
	return {
		props: { ...pageProps }
	};
};

/**
 * We use the serialized data from the static JSON file @content/paths.json
 */
export const getStaticPaths = () => {
	return {
		paths: paths.map((uid) => ({
			params: { uid }
		})),
		fallback: false
	};
};

export default StaticPage;
