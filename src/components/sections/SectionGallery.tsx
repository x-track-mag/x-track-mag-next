import { Box, SimpleGrid } from "@chakra-ui/react";
import { BackgroundImage } from "@components/base";

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
export const SectionGallery = ({ gallery }) => (
	<Box as="section" className="section-gallery" margin="0.5rem 0">
		<SimpleGrid
			columns={3}
			spacing={{ base: "0", md: "2rem" }}
			height={{ base: "250px", md: "40vh" }}
		>
			{gallery.map((image, i) => (
				<Box
					position="relative"
					className="column"
					width="100%"
					height="100%"
					key={`gallery-column-${i}`}
				>
					<BackgroundImage image={image} displayCredits={true} />
				</Box>
			))}
		</SimpleGrid>
	</Box>
);
