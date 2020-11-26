import { Box, Grid, GridItem, Flex } from "@chakra-ui/react";
import Container from "@components/base/Container";
import Typography from "@components/base/Typography";
import { RichText } from "prismic-reactjs";
import ReactPlayer from "react-player";
import SvgPlayerIcon from "@components/icons/SvgPlayerIcon.js";

/**
 * A two columns/responsive container with a rich text column and a video media player
 * @param {JSXElement} props
 * @param {String} props.article the main Article
 * @param {String} props.text the rich text content to describe the video
 * @param {String} props.link Youtube or Vimeo media link in the format that Prismic
 */
const SectionVideoLauncher = ({ article, text, link, ...props }) => (
	<Box as="section" className="section-video-launcher" {...props}>
		<Container
			as={Grid}
			templateColumns={["100%", "100%", "40% auto"]}
			gap={["0", "0", "2rem", "3rem"]}
			marginTop="4rem"
		>
			<GridItem pb="2rem">
				<Typography.Title>{article.title}</Typography.Title>
				<Typography.Subtitle>{article.subtitle}</Typography.Subtitle>
				<Box pt="2rem">
					<RichText render={text} />
				</Box>
			</GridItem>
			<GridItem
				as={Flex}
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				minHeight={["66vh", "66vh", "auto"]}
			>
				<ReactPlayer
					url={link.embed_url}
					light={article.image.url} // display the image as vignette
					width="100%"
					height="100%"
					playIcon={<SvgPlayerIcon size="4rem" />}
					config={{
						youtube: {
							playerVars: {
								autoplay: 1,
								loop: 1,
								modestbranding: 1,
								hl: "fr"
							}
						}
					}}
				/>
			</GridItem>
		</Container>
	</Box>
);

export default SectionVideoLauncher;
