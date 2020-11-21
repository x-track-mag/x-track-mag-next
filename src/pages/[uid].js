import paths from "@content/paths.json";
import { Box } from "@chakra-ui/react";
import { colors } from "@styles/theme.js";
import SectionHero from "@components/sections/SectionHero";
import { SectionResolver } from "@components/sections/index.js";
import SvgArrowReturn from "@components/icons/SvgArrowReturn.js";
import IconButton from "@components/icons/IconButton.js";
import { navigate } from "@components/base/Links";

const Aside = () => (
	<Box
		as="a"
		onClick={navigate("back")}
		position="fixed"
		zIndex="9999"
		top="20vh"
		right="2rem"
		cursor="pointer"
	>
		<IconButton
			size="4rem"
			SvgIcon={SvgArrowReturn}
			color="black"
			colorHover={`${colors.brand.green}`}
		/>
	</Box>
);

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
	return (
		<main>
			<Aside />
			<SectionHero image={image} title={title} subtitle={subtitle} />
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
