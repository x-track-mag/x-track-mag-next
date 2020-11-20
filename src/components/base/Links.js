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
	textDecoration: "none",
	_hover: {
		textDecoration: "underline",
		bgColor: "brand.green",
		textColor: "white"
	}
};

/**
 * Centered links inside Hero sections
 */
const heroStyles = {
	textColor: "white",
	textDecoration: "none",
	_hover: {
		textDecoration: "none"
	},
	_focus: noOutline,
	_active: noOutline
};

/**
 * Styles used in the navigation (header and footer)
 */
export const navStyles = {
	...textStyles,
	fontWeight: "300",
	lineHeight: "1rem",
	textColor: "white",
	textTransform: "uppercase",

	".active": {
		textColor: "brand.green",
		textDecoration: "underline"
	}
};

export const headerNavStyles = {
	...navStyles,
	fontWeight: "500",
	textColor: "black",
	fontSize: "1.5rem",
	_hover: {
		textDecoration: "none"
	}
};

const isExternalLink = (href) => /^http/.test(href);

const isActive = (href) => typeof window !== "undefined" && router.route === href;

export const navigate = (href) => (evt) => {
	if (!isExternalLink(href)) {
		evt.preventDefault();
		router.push(href);
	}
};

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

const makeLink = (style) => ({ children, ...props }) => (
	<Link {...style} {...props}>
		{children}
	</Link>
);

export const HeroLink = makeLink(heroStyles);

export const NavLink = makeLink(navStyles);
export const HeaderNavLink = makeLink(headerNavStyles);

export default Link;
