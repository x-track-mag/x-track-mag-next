import { Box } from "@chakra-ui/react";
import { Container, Blockquote } from "@components/base";

/**
 * A centered/responsive single column for a quote
 * @param {JSXElement} props
 * @param {RichText} props.text
 */
export const SectionQuote = ({ article, text, ...props }) => (
	<Box as="section" className="section-quote" {...props}>
		<Container fluid={true} padding="2rem 4rem" maxWidth="90ch">
			<Blockquote text={text} />
		</Container>
	</Box>
);
