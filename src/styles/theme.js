// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
	sm: "640px",
	md: "1024px",
	lg: "1400px",
	xl: "1920px"
};

const brandGreen = "#58ff00";
const brandOrange = "#f70";
const brandMauve = "#b2abff";

// 2. Extend the theme to include custom colors, fonts, etc
export const colors = {
	brand: {
		green: brandGreen,
		orange: brandOrange,
		mauve: brandMauve
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
			fontSize: ["16px", "19px", "22px", "24px", "26px"]
		},
		body: {
			overflowX: "hidden",
			minWidth: "480px",
			fontColor: "black"
		},
		main: {
			paddingBottom: "4rem"
		},
		h2: {
			fontFamily: "Arachne",
			fontSize: "3.2rem",
			lineHeight: "3.4rem",
			textAlign: "center",
			padding: "1.5rem 0 0.5rem"
		},
		h3: {
			fontFamily: "PressGothicPro",
			fontSize: "3.2rem",
			lineHeight: "3.4rem",
			textAlign: "center",
			textTransform: "uppercase"
		},
		h4: {
			fontFamily: "PressGothicPro",
			fontSize: "2.2rem",
			lineHeight: "3.4rem",
			textAlign: "center",
			textTransform: "uppercase",
			textColor: "brand.orange"
		},
		a: {
			outline: "none",
			outlineStyle: "none"
		},
		"a.active": {
			textColor: "brand.green"
		},
		blockquote: {
			fontFamily: "Arachne",
			width: "100%",
			textAlign: "center",
			fontSize: "1.3rem",
			lineHeight: "1.6rem",
			border: "solid black 5px",
			borderRadius: "100%",
			padding: { base: "3rem 4rem 3rem", lg: "3.5rem 5rem" }
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
			textColor: "white",
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
		},
		".hero-text.white": {
			textColor: "white"
		},
		".hero-text.black": {
			textColor: "black"
		},
		".hero-text.orange": {
			textColor: brandOrange
		},
		".hero-text.green": {
			textColor: brandGreen
		},
		".hero-text.inverted": {
			textColor: "orange",
			mixBlendMode: "difference"
		},
		".container": {
			p: {
				margin: "1rem 0"
			}
		}
	}
};

const customTheme = extendTheme({ breakpoints, colors, fonts, styles });

export default customTheme;
