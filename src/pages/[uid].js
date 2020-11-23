import paths from "@content/paths.json";
import SectionHero from "@components/sections/SectionHero";
import { SectionResolver } from "@components/sections/index.js";

import ArticleInfo from "@components/ArticleInfo";

const PostPage = ({
	uid,
	image,
	title,
	subtitle,
	author,
	publication_date,
	tags,
	sections
}) => {
	const article = { title, subtitle, image, author, publication_date, tags };
	return (
		<>
			<ArticleInfo
				position="fixed"
				displayBackArrow={true}
				author={author}
				publication_date={publication_date}
				tags={tags}
			/>
			<SectionHero article={article} />
			{sections.map((section, i) => (
				<SectionResolver
					key={`section-${i}`}
					article={article}
					section={section}
				/>
			))}
		</>
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
