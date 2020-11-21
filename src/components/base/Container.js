import { chakra } from "@chakra-ui/react";

const ContainerStyles = {
	baseStyle: {
		width: "100%",
		maxWidth: ["95%", "80%", "80ch"],
		m: "0 auto",
		p: "2rem 0"
	},
	variants: {
		hero: {
			maxWidth: ["80%"]
		},
		fluid: {
			maxWidth: "100%",
			p: "2rem"
		}
	},
	defaultProps: {}
};

const Container = ({ children, ...moreStyles }) => (
	<chakra.div
		className="container"
		m="0 auto"
		p="2rem 0"
		width="100%"
		maxWidth={["95%", "80%", "60ch"]}
		{...moreStyles}
	>
		{children}
	</chakra.div>
);

export default Container;
