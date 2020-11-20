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

export default {
	Title,
	Subtitle,
	Message
};
