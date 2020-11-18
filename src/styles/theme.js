const breakpoints = ["640px", "1280px", "1920px"];

const container = {
	width: "100%",
	maxWidth: ["95%", "960px", "1024px"],
	m: "0 auto",
	p: "2rem 0",

	fluid: {
		maxWidth: "100%",
		p: "2rem"
	}
};

const baseColors = {
	primary: "#8592e0",
	primaryDark: "#16745f",
	primaryDarker: "#0d5e4c",
	secondary: "#f4f0ec",
	black: "#000",
	darkGray: "#222",
	lightGray: "#e6e6e6",
	shadow: "#878787",
	white: "#fff"
};

const fonts = {
	body: '"Helvetica Neue", Helvetica, sans-serif',
	heading: '"Inter", serif',
	monospace: "Menlo, monospace"
};

const headings = {
	level: {
		1: {
			fontSize: [
				"1.625rem", // 26px
				"2rem", // 32px
				"2.5rem", // 40px
				"2.75rem" // 44px
			],
			lineHeight: 1.5
		},
		4: {
			lineHeight: 1.2
		}
	}
};

export default {
	background: {
		default: {
			bg: "white",
			color: "dark"
		},
		dark: {
			bg: "dark",
			color: "white"
		},
		secondary: {
			bg: "secondary",
			color: "dark"
		}
	},

	breakpoints,

	colors: {
		...baseColors,
		transparent: "transparent",
		text: baseColors.black,
		background: baseColors.white,
		modes: {
			dark: {
				background: baseColors.black,
				text: baseColors.white
			}
		}
	},

	container,

	fonts,
	fontSizes: {
		root: "18px",
		tiny: ".875rem",
		base: "1rem",
		lg: "1.4rem",
		xl: "2.75rem"
	},
	fontWeights: {
		lean: "350",
		body: "400",
		normal: "500",
		heading: "600"
	},
	lineHeights: {
		heading: "1.25",
		body: "1.625"
	},
	sizes: {
		full: "100%"
	},
	space: {
		// New spaces scale.
		none: 0,
		xxsmall: "0.25rem", // 4px
		xsmall: "0.5rem", // 8px
		small: "1rem", // 16px
		medium: "2rem", // 32px
		large: "4rem", // 64px
		xlarge: "8rem", // 128px
		xxlarge: "16rem", // 256px
		xxxlarge: "32rem" // 512px
	},

	// Default Components

	styles: {
		root: {
			color: "text",
			bg: "background",
			fontSize: "root",
			fontFamily: "body",
			lineHeight: "body",
			fontWeight: "body",
			m: 0,
			p: 0
		},

		h1: {
			...headings.level[1]
		},
		p: {
			fontSize: "body",
			mt: 0,
			mb: 0
		},
		img: {
			maxWidth: "100%"
		}
	},

	text: {
		desc: {
			fontSize: "lg",
			fontWeight: "lean",
			lineHeight: "desc",
			mx: "auto",
			mt: "vMargin",
			maxWidth: "42rem"
		}
	}
};
