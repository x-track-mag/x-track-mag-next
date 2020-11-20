// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		green: "#58ff00",
		orange: "#f70",
		mauve: "#b2abff"
	},
	darkGray: "#222",
	shadow: "#878787",
	lightGray: "#e6e6e6"
};

const fonts = {
	body: '"Helvetica Now", Helvetica, "Open Sans", sans-serif',
	heading: "Georgia, serif",
	variants: {
		brand1: '"Press Gothic Pro", serif',
		brand2: "Arachne, serif"
	},
	monospace: "Menlo, monospace"
};

const components = {
	Container: {
		baseStyle: {
			width: "100%",
			maxWidth: ["95%", "960px", "1024px"],
			m: "0 auto",
			p: "2rem 0"
		},
		variants: {
			hero: {
				maxWidth: ["80em"],
				background: "black",
				p: "2rem"
			},
			fluid: {
				maxWidth: "100%",
				p: "2rem"
			}
		},
		defaultProps: {}
	}
};

const customTheme = extendTheme({ colors, fonts, components });

export default customTheme;
