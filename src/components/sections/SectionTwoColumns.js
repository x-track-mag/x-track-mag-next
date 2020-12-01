import { Box, Grid, GridItem, Flex, AspectRatio } from "@chakra-ui/react";
import Container from "@components/base/Container";
import { RichText } from "@components/base/Typography";
import Image from "next/image";

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
const SectionTwoColumns = ({
	image,
	text,
	full_page = false,
	columns_order = "Texte | Image",
	...props
}) => (
	<Box as="section" className="section-two-columns" {...props}>
		<Container
			as={Grid}
			fluid={full_page}
			templateColumns={
				full_page
					? { base: "100%", lg: "50% auto" }
					: { base: "100%", lg: "60% auto" }
			}
			gap={["0", "0", "2rem"]}
		>
			<GridItem padding={full_page ? "4rem 0 4rem 2rem" : "0 2rem"}>
				<RichText>{text}</RichText>
			</GridItem>
			<GridItem
				as={Flex}
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
			>
				<AspectRatio ratio={image.ratio} width="100%">
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
