import { Box, Grid, GridItem, Flex, AspectRatio } from "@chakra-ui/react";
import Container from "@components/base/Container";
import { Title, Subtitle, RichText } from "@components/base/Typography";
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
			templateColumns={{ base: "100%", lg: "40% auto" }}
			gap={{ base: "0", lg: "2rem" }}
		>
			<GridItem pb="2rem">
				<Title>{article.title}</Title>
				<Subtitle>{article.subtitle}</Subtitle>
				<Box pt="1rem">
					<RichText>{text}</RichText>
				</Box>
			</GridItem>
			<GridItem
				as={Flex}
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
			>
				<AspectRatio ratio={{ base: 16 / 9, lg: 4 / 3 }} width="100%">
					<ReactPlayer
						url={link.embed_url}
						light={article.image ? article.image.url : false} // display the image as vignette
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
				</AspectRatio>
			</GridItem>
		</Container>
	</Box>
);

export default SectionVideoLauncher;
