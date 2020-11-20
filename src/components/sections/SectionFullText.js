import { RichText } from "prismic-reactjs";
import { Container } from "@chakra-ui/react";
import clsx from "clsx";

/**
 * A centered/responsive single column of rich text
 * @param {JSXElement} props
 * @param {RichText} text
 */
const SectionFullText = ({ text, className }) => (
	<section className={clsx("section-full-text", className)}>
		<Container>
			<RichText render={text} />
		</Container>
	</section>
);

export default SectionFullText;
