import { type FC } from "react";
import { Box } from "@chakra-ui/react";
import { Container, RichText } from "@components/base";
import { type SectionFullTextProps } from "src/data/types";

/**
 * A centered/responsive single column of rich text
 */
export const SectionFullText: FC<SectionFullTextProps> = ({ text }) => (
	<Box as="section" className="section-full-text">
		<Container padding="1rem 0">
			<RichText>{text}</RichText>
		</Container>
	</Box>
);
