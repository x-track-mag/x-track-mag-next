import { RichText } from "prismic-reactjs";
import { Box } from "@chakra-ui/react";
import Container from "@components/base/Container";

/**
 * A centered/responsive single column of rich text
 * @param {JSXElement} props
 * @param {RichText} text
 */
const SectionFullText = ({ text, ...props }) => (
	<Box as="section" className="section-full-text" {...props}>
		<Container padding="3rem 0">
			<RichText render={text} />
		</Container>
	</Box>
);

export default SectionFullText;
