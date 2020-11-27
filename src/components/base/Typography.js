import { chakra, Text } from "@chakra-ui/react";
import { RichText as PrismicRichTextRenderer, Elements } from "prismic-reactjs";
import { fixImage } from "@lib/transform/PrismicDataHandler";
import EmbeddedImage from "./EmbeddedImage";
import { EmbeddedLink } from "./Links";

export const Title = ({ children, ...moreStyles }) => (
	<chakra.h2
		fontFamily="Arachne"
		fontSize="3.2rem"
		lineHeight="2.8rem"
		textAlign="center"
		mb="1rem"
		{...moreStyles}
	>
		{children}
	</chakra.h2>
);

export const Subtitle = ({ children, ...moreStyles }) => (
	<chakra.h3
		fontFamily="PressGothicPro"
		fontSize="3.2rem"
		lineHeight="3.4rem"
		textAlign="center"
		textTransform="uppercase"
		{...moreStyles}
	>
		{children}
	</chakra.h3>
);

export const Message = ({ children }) => (
	<chakra.span
		fontFamily="Arachne"
		fontSize="2.8rem"
		fontWeight="600"
		lineHeight="4rem"
		textColor="brand.green"
		whiteSpace="nowrap"
		m="0"
	>
		{children}
	</chakra.span>
);

export const Blockquote = ({ text }) => (
	<chakra.blockquote
		fontFamily="Arachne"
		fontSize="1.4rem"
		lineHeight="1.8rem"
		textAlign="center"
		width="100%"
		padding={["3rem 4.5rem", "4rem 6rem", "6rem 8rem"]}
		border="solid black 5px"
		borderRadius="100%"
	>
		{Array.isArray(text)
			? text.map((paragraph, i) => <p key={`blocquote-p-${i}`}>{paragraph.text}</p>)
			: { text }}
	</chakra.blockquote>
);

export const Tag = ({ textColor, children }) => (
	<Text
		as="div"
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
	</Text>
);

export const Caption = ({ children, ...moreStyles }) => (
	<Text
		display="block"
		fontSize="0.8rem"
		lineHeight="1em"
		margin="0.25em 0"
		textAlign="center"
		width="100%"
		{...moreStyles}
	>
		{children}
	</Text>
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
			return <Title key={key}>{element.text}</Title>;

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
