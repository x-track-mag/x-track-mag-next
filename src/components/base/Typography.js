import { Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { RichText as PrismicRichTextRenderer, Elements } from "prismic-reactjs";
import { fixImage } from "@lib/transform/PrismicDataTransformers";
import EmbeddedImage from "./EmbeddedImage";
import { EmbeddedLink } from "./Links";

/**
 * This will allow us to animate all this typographic elements
 * with framer-motion properties
 */
const MotionBox = motion.custom(Box);

export const Title = ({ children, ...moreStyles }) => (
	<MotionBox
		as="h2"
		fontFamily="Arachne"
		fontSize="3.2rem"
		lineHeight="3.2rem"
		textAlign="center"
		mb="1rem"
		{...moreStyles}
	>
		{children}
	</MotionBox>
);

export const Subtitle = ({ children, ...moreStyles }) => (
	<MotionBox
		as="h3"
		fontFamily="PressGothicPro"
		fontSize="3.2rem"
		lineHeight="3.4rem"
		textAlign="center"
		textTransform="uppercase"
		{...moreStyles}
	>
		{children}
	</MotionBox>
);

export const Message = ({ children }) => (
	<Box
		className="message"
		fontFamily="Arachne"
		fontSize="2.8rem"
		fontWeight="600"
		lineHeight="4rem"
		textColor="brand.green"
		whiteSpace="nowrap"
		m="0"
	>
		{children}
	</Box>
);

export const Blockquote = ({ text, ...moreStyles }) => (
	<MotionBox
		as="blockquote"
		fontFamily="Arachne"
		fontSize="1.2rem"
		lineHeight="1.6rem"
		textAlign="center"
		width="100%"
		padding={["3rem 4.5rem", "3.5rem 6rem", "4rem 6.6rem"]}
		border="solid black 5px"
		borderRadius="100%"
		{...moreStyles}
	>
		{Array.isArray(text)
			? text.map((paragraph, i) => <p key={`blocquote-p-${i}`}>{paragraph.text}</p>)
			: { text }}
	</MotionBox>
);

export const Tag = ({ textColor, children }) => (
	<Box
		fontFamily="PressGothicPro"
		textColor={textColor}
		fontSize="1.2rem"
		lineHeight="1em"
		margin="0.25em 0"
		textAlign="center"
		textTransform="uppercase"
		width="100%"
		padding="0.5rem 1.2rem 0.4rem"
		border="solid 4px"
		borderColor={textColor}
		borderRadius="100%"
	>
		{children}
	</Box>
);

export const VerticalText = ({ children, ...moreStyles }) => (
	<Box
		fontSize="0.8rem"
		fontWeight="600"
		lineHeight="1em"
		marginBottom="8rem"
		transform="rotate(-90deg)"
		transformOrigin="100% 100%"
		{...moreStyles}
	>
		{children}
	</Box>
);

export const Caption = ({ children, ...moreStyles }) => (
	<Box
		display="block"
		width="100%"
		textAlign="center"
		fontSize="0.8rem"
		lineHeight="1em"
		margin="0.25em 0"
		{...moreStyles}
	>
		{children}
	</Box>
);

export const RichText = ({ children }) => (
	<PrismicRichTextRenderer render={children} htmlSerializer={htmlSerializer} />
);

const htmlSerializer = (type, element, content, children, key) => {
	// console.log(
	// 	`htmlSerializer received`,
	// 	JSON.stringify({ type, element, content, key }, null, "\t")
	// );
	switch (type) {
		// Use Chakra UI body text style
		case Elements.paragraph:
			return <Text key={key}>{children}</Text>;

		case Elements.heading2:
			return (
				<Title key={key} padding="1.4rem 0 0.3rem">
					{element.text}
				</Title>
			);

		case Elements.heading3:
			return <Subtitle key={key}>{element.text}</Subtitle>;

		// Wrap images inside a <figure> with <figurecaption>
		case Elements.image:
			return <EmbeddedImage image={fixImage(element)} key={key} />;

		// Add a class to hyperlinks
		case Elements.hyperlink:
			return (
				<EmbeddedLink href={element.data.url} key={key}>
					{children}
				</EmbeddedLink>
			);

		// Return null to stick with the default behavior
		default:
			return null;
	}
};

export default {
	Title,
	Subtitle,
	Message,
	Blockquote,
	Tag,
	Caption
};
