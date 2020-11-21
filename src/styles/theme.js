// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
export const colors = {
	brand: {
		green: "#58ff00",
		orange: "#f70",
		mauve: "#b2abff"
	},
	darkGray: "#222",
	shadow: "#878787",
	lightGray: "#e6e6e6"
};

export const fonts = {
	body: '"Helvetica Now", Helvetica, "Open Sans", sans-serif',
	heading: "Georgia, serif",
	variants: {
		brand1: "PressGothicPro, serif",
		brand2: "Arachne, serif"
	},
	monospace: "Menlo, monospace"
};

const styles = {
	global: {
		body: {
			overflowX: "hidden",
			fontSize: ["16px", "20px", "24px", "30px"]
		},
		section: {
			margin: 0,
			position: "relative",
			overflow: "hidden"
		},
		".hero-section": {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		".hero-section.blurred": {
			img: {
				filter: "blur(5px)"
			}
		},

		".background-image-container": {
			zIndex: -1,
			position: "absolute"
		},
		".hero-text": {
			zIndex: 999
		}
	}
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

const customTheme = extendTheme({ colors, fonts, components, styles });

export default customTheme;
