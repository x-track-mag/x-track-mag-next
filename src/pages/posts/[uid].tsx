import paths from "@content/paths.json";
import ArticleInfo from "@components/ArticleInfo";
import {
	SectionHero,
	SectionResolver,
	SectionSelectedReads,
} from "@components/sections";
import type { ArticleProps, SelectedReadProps } from "src/data/types";
import { FC } from "react";

interface PostPageProps extends ArticleProps {
	selected_reads: SelectedReadProps[];
}

const PostPage: FC<PostPageProps> = ({
	uid,
	title,
	subtitle,
	text_color,
	image,
	video_loop,
	author,
	publication_date,
	tags,
	sections,
	selected_reads,
}) => {
	const article = {
		title,
		subtitle,
		image,
		video_loop,
		author,
		publication_date,
		tags,
	} as ArticleProps;
	// Automatically redisplay Hero section as first section

	const isMusic = tags.includes("music");
	const isArticle = tags.includes("article");
	const displayHero = isMusic || isArticle;
	return (
		<>
			<ArticleInfo
				position="fixed"
				displayBackArrow={true}
				author={author}
				publication_date={publication_date}
				tags={tags}
			/>
			{displayHero && (
				<SectionHero
					article={article}
					title={isArticle ? "--blank--" : title}
					subtitle={isArticle ? "--blank--" : subtitle}
					text_color={text_color}
					displayCredits={true}
					priority={true}
				/>
			)}
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
 * else, read the serialized JSON file that we extracted inside the content dir
 */
export const getStaticProps = async ({ params, preview }) => {
	const uid = params.uid;
	const { selected_reads } = await import("content/home.json");
	const { ...postProps } = await import(`content/posts/${uid}.json`);
	return {
		props: { selected_reads, ...postProps },
	};
};

/**
 * We use the serialized data from the static JSON file content/paths.json
 */
export const getStaticPaths = () => {
	return {
		paths: paths.map((uid) => ({
			params: { uid },
		})),
		fallback: false,
	};
};

export default PostPage;
