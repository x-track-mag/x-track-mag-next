import { Box, Grid, GridItem, Flex, AspectRatio } from "@chakra-ui/react";
import Container from "@components/base/Container";
import { RichText } from "prismic-reactjs";
import Image from "next/image";

/**
 * A two columns/responsive container with a rich text column and an image
 * @param {JSXElement} props
 * @param {Object} props.text rich text content
 * @param {Object} props.image
 */
const SectionTwoColumns = ({ image, text, ...props }) => (
	<Box as="section" className="section-video-launcher" {...props}>
		<Container
			as={Grid}
			templateColumns={["100%", "100%", "60% auto"]}
			gap={["0", null, "2rem", "4rem"]}
		>
			<GridItem pb="2rem">
				<RichText render={text} />
			</GridItem>
			<GridItem
				as={Flex}
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				minHeight={["66vh", null, "auto"]}
				pb={["4rem", null, "0"]}
			>
				<AspectRatio
					ratio={image.dimensions.width / image.dimensions.height}
					width="100%"
				>
					<Image
						src={image.url}
						alt={image.alt}
						layout="fill"
						objectFit="contain"
					/>
				</AspectRatio>
			</GridItem>
		</Container>
	</Box>
);

export default SectionTwoColumns;
