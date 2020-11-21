import { RichText } from "prismic-reactjs";
import { Box, Container } from "@chakra-ui/react";
import clsx from "clsx";

/**
 * A centered/responsive single column of rich text
 * @param {JSXElement} props
 * @param {RichText} text
 */
const SectionFullText = ({ text }) => (
	<Box as="section" className="section-full-text">
		<Container padding="3rem 0">
			<RichText render={text} />
		</Container>
	</Box>
);

export default SectionFullText;
