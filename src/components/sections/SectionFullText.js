import { Box } from "@chakra-ui/react";
import Container from "@components/base/Container";
import { RichText } from "@components/base/Typography";

/**
 * A centered/responsive single column of rich text
 * @param {JSXElement} props
 * @param {Object} props.article the main Article
 * @param {RichText} props.text
 */
const SectionFullText = ({ article, text, ...props }) => (
	<Box as="section" className="section-full-text" {...props}>
		<Container padding="3rem 0">
			<RichText>{text}</RichText>
		</Container>
	</Box>
);

export default SectionFullText;
