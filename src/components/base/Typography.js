import { chakra } from "@chakra-ui/react";

export const Title = ({ children }) => (
	<chakra.h2
		fontFamily="Arachne"
		fontSize="2.8rem"
		fontWeight="600"
		lineHeight="4rem"
		textAlign="center"
	>
		{children}
	</chakra.h2>
);

export const Message = ({ children }) => (
	<chakra.span
		fontFamily="Arachne"
		fontSize="2.8rem"
		fontWeight="600"
		lineHeight="4rem"
		textColor="brand.green"
		m="0"
	>
		{children}
	</chakra.span>
);

export const Subtitle = ({ children }) => (
	<chakra.h3 fontFamily="Verdana" fontSize="1.5rem">
		{children}
	</chakra.h3>
);

export default {
	Title,
	Subtitle
};
