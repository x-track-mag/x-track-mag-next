import { chakra } from "@chakra-ui/react";

export const Title = ({ children, ...props }) => (
	<chakra.h2
		fontFamily="Arachne"
		fontSize="3.2rem"
		lineHeight="3.9rem"
		textAlign="center"
		mb="0.5rem"
		{...props}
	>
		{children}
	</chakra.h2>
);

export const Subtitle = ({ children, ...props }) => (
	<chakra.h3
		fontFamily="PressGothicPro"
		fontSize="3.2rem"
		lineHeight="3.9rem"
		textAlign="center"
		textTransform="uppercase"
		{...props}
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
		fontSize="2rem"
		fontWeight="600"
		lineHeight="3rem"
		textAlign="center"
		width="100%"
		padding="8rem"
		border="solid black 5px"
		borderRadius="100%"
	>
		{Array.isArray(text)
			? text.map((paragraph, i) => <p key={`blocquote-p-${i}`}>{paragraph.text}</p>)
			: { text }}
	</chakra.blockquote>
);

export default {
	Title,
	Subtitle,
	Message,
	Blockquote
};
