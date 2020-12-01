import { Box, Grid, GridItem, Flex, AspectRatio, SimpleGrid } from "@chakra-ui/react";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import Container from "@components/base/Container";

const isImageFirst = (columnsOrder) =>
	columnsOrder.toLowerCase().split(" | ")[0] === "image";

/**
 * A two columns/responsive container with a rich text column and an image
 * @param {JSXElement} props
 * @param {Object} props.text rich text content
 * @param {Object} props.image
 * @param {Boolean} [props.fullPage=false] Use the full page width instead of the responsive container
 *
 */
const SectionGallery = ({ gallery }) => (
	<Box as="section" className="section-gallery">
		<SimpleGrid
			columns={3}
			spacing={{ base: "0", md: "2rem" }}
			height={{ base: "250px", md: "40vh" }}
		>
			{gallery.map((image) => (
				<Box position="relative" className="column" width="100%" height="100%">
					<BackgroundImageContainer image={image} />
				</Box>
			))}
		</SimpleGrid>
	</Box>
);

export default SectionGallery;
