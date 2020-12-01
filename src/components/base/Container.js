import { Box } from "@chakra-ui/react";

/**
 * A responsive centered container to put inside every section
 * @param {JSX.Element} props
 * @param {Boolean} [props.fluid=false] Take the full width
 */
const Container = ({ children, fluid = false, ...moreStyles }) => (
	<Box
		className="container"
		width="100%"
		maxWidth={fluid ? ["100%"] : ["95%", "75%", "60ch"]}
		m="0 auto"
		p="2rem 0"
		{...moreStyles}
	>
		{children}
	</Box>
);

export default Container;
