import { RichText } from "prismic-reactjs";
import { Box, Grid, GridItem, Flex, Center, AspectRatio } from "@chakra-ui/react";
import Container from "@components/base/Container";
import Typography from "@components/base/Typography";
import ReactPlayer from "react-player";
import SvgPlayerIcon from "@components/icons/SvgPlayerIcon.js";

/**
 * A centered/responsive single column of rich text
 * @param {JSXElement} props
 * @param {RichText} text
 */
const SectionVideoLauncher = ({ title, subtitle, image, text, link, ...props }) => (
	<Box as="section" className="section-video-launcher" {...props}>
		<Container
			as={Grid}
			templateColumns={["100%", "100%", "30% auto"]}
			gap={["0", null, "4rem"]}
			variant="hero"
		>
			<GridItem pb="2rem">
				<Typography.Title>{title}</Typography.Title>
				<Typography.Subtitle>{subtitle}</Typography.Subtitle>
				<RichText render={text} />
			</GridItem>
			<GridItem
				as={Flex}
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
			>
				<ReactPlayer
					url={link.embed_url}
					light={image.url} // display the image as vignette
					width="100%"
					height="100%"
					style={{ minHeight: link.height }}
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
