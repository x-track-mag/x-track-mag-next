// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
	sm: "640px",
	md: "960px",
	lg: "1400px",
	xl: "1800px"
});

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
	body: "UnbProRegular, Helvetica, 'DejaVu Sans', sans-serif",
	heading: "Georgia, serif",
	variants: {
		brand1: "PressGothicPro, serif",
		brand2: "Arachne, serif"
	},
	monospace: "Menlo, monospace",
	_selection: {
		textColor: "brand.green",
		bgColor: "brand.orange"
	}
};

const styles = {
	global: {
		html: {
			fontSize: ["16px", "20px", "24px", "26px", "30px"]
		},
		body: {
			overflowX: "hidden",
			minWidth: "480px",
			fontColor: "black"
		},
		main: {
			paddingBottom: "4rem"
		},
		a: {
			outline: "none",
			outlineStyle: "none"
		},
		"a.active": {
			textColor: "brand.green"
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
			justifyContent: "center",
			img: {
				objectFit: "cover"
			}
		},
		".hero-section.template5": {
			minHeight: "50vh"
		},
		".hero-section.blurred": {
			img: {
				filter: "blur(8px)"
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

const customTheme = extendTheme({ breakpoints, colors, fonts, styles });

export default customTheme;
