import paths from "@content/paths.json";
import SectionHero from "@components/sections/SectionHero";
import ArticleInfo from "@components/ArticleInfo";
import { SectionResolver, SectionSelectedReads } from "@components/sections/index.js";

const PostPage = ({
	uid,
	image,
	title,
	subtitle,
	author,
	publication_date,
	tags,
	sections,
	selected_reads
}) => {
	const article = { title, subtitle, image, author, publication_date, tags };
	const isArticle = tags.includes("article");
	return (
		<>
			<ArticleInfo
				position="fixed"
				displayBackArrow={true}
				author={author}
				publication_date={publication_date}
				tags={tags}
			/>
			{isArticle && <SectionHero image={image} />}
			{sections.map((section, i) => (
				<SectionResolver
					key={`section-${i}`}
					article={article}
					section={section}
				/>
			))}
			<SectionSelectedReads uid={uid} selected_reads={selected_reads} />
		</>
	);
};

/**
 * When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticProps = async ({ params, preview }) => {
	const uid = params.uid;
	const { selected_reads } = await import(`@content/home.json`);
	const { ...postProps } = await import(`@content/posts/${uid}.json`);
	return {
		props: { selected_reads, ...postProps }
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
