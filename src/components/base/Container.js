import { chakra } from "@chakra-ui/react";

const Container = ({ children, fluid = false, ...moreStyles }) => (
	<chakra.div
		className="container"
		width="100%"
		maxWidth={fluid ? ["100%"] : ["95%", "75%", "60ch"]}
		m="0 auto"
		p="2rem 0"
		{...moreStyles}
	>
		{children}
	</chakra.div>
);

export default Container;
