import { Box } from "@chakra-ui/react";
import Container from "@components/base/Container";
import Typography from "@components/base/Typography";

/**
 * A centered/responsive single column for a quote
 * @param {JSXElement} props
 * @param {RichText} props.text
 */
const SectionQuote = ({ article, text, ...props }) => (
	<Box as="section" className="section-quote" {...props}>
		<Container>
			<Typography.Blockquote text={text} />
		</Container>
	</Box>
);

export default SectionQuote;
