import paths from "@content/paths.json";
import { SectionResolver } from "@components/sections/index.js";

const PostPage = ({ uid, title, subtitle, author, publication_date, sections }) => {
	return (
		<main>
			{sections.map((section, i) => (
				<SectionResolver key={`section-${i}`} section={section} />
			))}
		</main>
	);
};

/**
 * When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticProps = async ({ params, preview }) => {
	const uid = params.uid;
	const { ...postProps } = await import(`@content/posts/${uid}.json`);
	return {
		props: { ...postProps }
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

export default PostPage;
