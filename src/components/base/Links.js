import router from "next/router";
import { Link as ChakraLink } from "@chakra-ui/react";
import clsx from "clsx";

const noOutline = {
	outline: "none",
	outlineStyle: "none"
};

/**
 * Style applied when link is inside plain text
 */
const textStyles = {
	textColor: "brand.green",
	textDecoration: "none"
};

/**
 * Centered links inside Hero sections
 */
const heroStyles = {
	textDecoration: "none",
	_hover: {
		textDecoration: "none",
		textColor: "white"
	},
	_focus: noOutline,
	_active: noOutline
};

/**
 * Styles used in the navigation (header and footer)
 */
export const navStyles = {
	fontWeight: "300",
	lineHeight: "1rem",
	textColor: "white",
	textTransform: "uppercase",
	textDecoration: "none",

	".active": {
		textColor: "brand.green"
	},
	_hover: {
		textColor: "brand.green"
	}
};

/**
 * Header navigation style
 */
export const headerNavStyles = {
	...navStyles,
	fontWeight: "500",
	textColor: "black",
	fontSize: "1.5rem"
};

const isExternalLink = (href) => /^http/.test(href);

const isActive = (href) => typeof window !== "undefined" && router.route === href;

/**
 * Use Next.js router to navigate to internal pages
 * or not..
 * @param {String} href
 */
export const navigate = (href) => (evt) => {
	if (!isExternalLink(href)) {
		evt.preventDefault();
		if (href === "back") {
			router.back();
		} else {
			router.push(href);
		}
	}
};

/**
 * Use Chakra-UI to style the link
 * And Next.js router to navigate...
 * @param {JSXElement} props
 * @param {String} props.href Absolute or relative URL to go by
 */
export const Link = ({ href = "#", children, ...props }) => (
	<ChakraLink
		href={href}
		target={isExternalLink(href) ? "_blank" : ""}
		onClick={navigate(href)}
		className={clsx({ active: isActive(href) })}
		{...props}
	>
		{children}
	</ChakraLink>
);

/**
 * Build a link from specified style object
 * @param {Object} style
 * @return {Link}
 */
const makeLink = (style) => ({ children, ...props }) => (
	<Link {...style} {...props}>
		{children}
	</Link>
);

export const HeroLink = makeLink(heroStyles);

export const NavLink = makeLink(navStyles);
export const HeaderNavLink = makeLink(headerNavStyles);

export default Link;
