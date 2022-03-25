import { Box, Grid, GridItem, Flex, AspectRatio } from "@chakra-ui/react";
import Container from "@components/base/Container";
import { Title, Subtitle, RichText } from "@components/base/Typography";
import ReactPlayer from "react-player";
import SvgPlayerIcon from "@components/icons/SvgPlayerIcon.js";
import { calcRatio } from "@lib/utils/ratio";

/**
 * A two columns/responsive container with a rich text column and a video media player
 * @param {JSXElement} props
 * @param {String} props.article the main Article (to retrieve the title)
 * @param {String} props.text some rich text content to describe the video
 * @param {String} props.link Youtube or Vimeo media link in the format that Prismic
 */
const SectionVideoLauncher = ({
	article,
	display_article_title = true,
	text,
	image,
	link,
	disposition,
	ratio = "4/3",
	...props
}) => {
	disposition = disposition || "Texte | Video"; // we receive a null value for old content
	image = image || article.image;
	ratio = calcRatio(ratio);

	const templateColumns = {
		base: "100%"
	};
	const twoColumns = disposition.contains("|");
	const textFirst = disposition.indexOf("Texte") === 0;
	if (twoColumns) {
		// Add two responsive columns : 'Texte | Video' or 'Video | Texte'
		templateColumns.lg = textFirst ? "40% auto" : "60% auto";
	}

	return (
		<Box as="section" className="section-video-launcher" {...props}>
			<Container
				as={Grid}
				fluid={twoColumns}
				templateColumns={templateColumns}
				gap={{ base: "0", lg: "2rem" }}
			>
				{textFirst && (
					<GridItem padding="2rem 2rem 0" className="video-description">
						{display_article_title && (
							<>
								<Title>{article.title}</Title>
								<Subtitle>{article.subtitle}</Subtitle>
							</>
						)}

						<RichText>{text}</RichText>
					</GridItem>
				)}
				<GridItem
					padding="2rem"
					as={Flex}
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					maxH="80vh"
					className="video-player"
				>
					<AspectRatio ratio={ratio} width={ratio > 1 ? "80%" : "50%"}>
						<ReactPlayer
							url={link.embed_url}
							light={image ? image.url : false} // display the image as vignette
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

				{!textFirst && (
					<GridItem padding="2rem" className="video-description">
						{display_article_title && (
							<>
								<Title>{article.title}</Title>
								<Subtitle>{article.subtitle}</Subtitle>
							</>
						)}

						<RichText>{text}</RichText>
					</GridItem>
				)}
			</Container>
		</Box>
	);
};
export default SectionVideoLauncher;
