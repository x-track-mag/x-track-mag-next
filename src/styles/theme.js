// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

export const breakpoints = {};

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
			fontSize: ["16px", "20px", "24px", "28px", "30px"]
		},
		main: {
			paddingBottom: "4rem"
		},
		section: {
			margin: 0,
			position: "relative",
			overflow: "hidden"
		},
		".hero-section": {
			minHeight: "90vh",
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

const customTheme = extendTheme({ colors, fonts, styles });

export default customTheme;
