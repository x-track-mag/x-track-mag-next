import { chakra } from "@chakra-ui/react";

const Container = ({ children, ...moreStyles }) => (
	<chakra.div
		className="container"
		width="100%"
		maxWidth={["95%", "80%", "60ch", "70ch"]}
		m="0 auto"
		p="2rem 0"
		{...moreStyles}
	>
		{children}
	</chakra.div>
);

export default Container;
