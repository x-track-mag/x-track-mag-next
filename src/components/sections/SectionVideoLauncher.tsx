import {
	Box,
	Grid,
	GridItem,
	Flex,
	AspectRatio,
	type ResponsiveObject,
	type SystemProps,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Container, Title, Subtitle, RichText } from "@components/base";
import { SvgPlayerIcon } from "@components/icons";
import { calcRatio } from "@lib/utils/ratio";

/**
 * Avoid an hydration error with ReactPlayer
 */
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

/**
 * A two columns/responsive container with a rich text column and a video media player
 * @param {JSXElement} props
 * @param {String} props.article the main Article (to retrieve the title)
 * @param {String} props.text some rich text content to describe the video
 * @param {String} props.link Youtube or Vimeo media link in the format that Prismic
 */
export const SectionVideoLauncher = ({
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
	const intRatio = calcRatio(ratio);

	const templateColumns = {
		base: "100%",
	} as ResponsiveObject<SystemProps["gridTemplateColumns"]>;
	const twoColumns = disposition.includes("|");
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
					<GridItem
						padding="2rem 2rem 0"
						className="video-description"
					>
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
					<AspectRatio
						ratio={intRatio}
						width={intRatio > 1 ? "80%" : "50%"}
					>
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
										hl: "fr",
									},
								},
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
