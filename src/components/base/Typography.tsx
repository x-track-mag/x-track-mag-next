import { Text, Box } from "@chakra-ui/react";
import { MotionBox } from "./MotionBox";
import { RichText as PrismicRichTextRenderer, Elements } from "prismic-reactjs";
import { fixImage } from "@lib/transform/PrismicDataTransformers";
import { EmbeddedImage } from "./EmbeddedImage";
import { EmbeddedLink } from "./Links";

/**
 * The main Title to use for article posts and home sections
 * Accepts Framer motion animation props as well as Chakra UI style props
 * (NOTE : the base styles have been moved in the global Theme)
 * fontFamily="Arachne", fontSize="3.2rem", lineHeight="3.2rem", textAlign="center", mb="1rem"
 */
export const Title = ({ children, ...moreStyles }) => (
	<MotionBox as="h2" {...moreStyles}>
		{children}
	</MotionBox>
);

/**
 * Second default title style using Press Gothic Pro
 * Accepts Framer motion animation props as well as Chakra UI style props
 * (NOTE : the base styles have been moved in the global Theme)
 * fontFamily="PressGothicPro", textTransform="uppercase", fontSize="3.2rem", lineHeight="3.4rem", textAlign="center"
 */
export const Subtitle = ({ children, ...moreStyles }) => (
	<MotionBox as="h3" {...moreStyles}>
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

// fontFamily="Arachne"
// fontSize="1.2rem"
// lineHeight="1.6rem"
// textAlign="center"
// width="100%"
// border="solid black 5px"
// borderRadius="100%"
// padding={{ base: "3.5rem 4rem 3rem", lg: "3.5rem 5rem" }}
export const Blockquote = ({ text, ...moreStyles }) => (
	<MotionBox as="blockquote" {...moreStyles}>
		{Array.isArray(text)
			? text.map((paragraph, i) => (
					<p key={`blocquote-p-${i}`}>{paragraph.text}</p>
			  ))
			: { text }}
	</MotionBox>
);

/**
 * Thick uppercase text in ovaloid shape
 */
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

/**
 * Small centered text
 * They are used to render images captions
 */
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
	<PrismicRichTextRenderer
		render={children}
		htmlSerializer={htmlSerializer}
	/>
);

/**
 * @see https://prismic.io/docs/technologies/html-serializer-javascript#adding-the-html-serializer-function
 * @param {*} type
 * @param {*} element
 * @param {*} content
 * @param {*} children
 * @param {*} key
 * @returns
 */
const htmlSerializer = (type, element, content, children, key) => {
	// console.log(
	// 	`htmlSerializer received`,
	// 	JSON.stringify({ type, element, content, key }, null, "\t")
	// );
	switch (type) {
		case Elements.paragraph:
			return <Text key={key}>{children}</Text>;

		case Elements.heading2:
			return <Title key={key}>{element.text}</Title>;

		case Elements.heading3:
			return <Subtitle key={key}>{element.text}</Subtitle>;

		// Wrap images inside a <figure> with <figurecaption>
		case Elements.image:
			return (
				<EmbeddedImage
					image={fixImage(element)}
					key={key}
					margin="1rem auto"
				/>
			);

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
