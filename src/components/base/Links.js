import router from "next/router";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import clsx from "clsx";

const noOutline = {
	outline: "none",
	outlineStyle: "none"
};

const baseLinkStyles = {
	textColor: "black",
	_focus: noOutline,
	_active: noOutline,
	textDecoration: "none",
	_hover: {
		textDecoration: "none"
	}
};

/**
 * Style applied when link is inside plain text
 */
const embeddedLinkStyles = {
	...baseLinkStyles,
	bgColor: "brand.green",
	_hover: {
		lineHeight: "0.3em",
		fontStyle: "italic"
	}
};

/**
 * Centered links inside Hero sections
 */
const heroStyles = {
	...baseLinkStyles,
	textColor: "white",
	fontSize: "xl"
};

/**
 * Styles used in the navigation (header and footer)
 */
export const navLinkStyles = {
	fontFamily: "body",
	fontWeight: 600,
	textTransform: "uppercase",
	textDecoration: "none",

	_focus: {
		lineHeight: "0.3em",
		bgColor: "brand.orange",
		...noOutline
	},
	_active: {
		textColor: "brand.green",
		...noOutline
	},
	_hover: {
		textColor: "brand.green"
	}
};

/**
 * Header navigation style
 */
export const headerLinkStyles = {
	...navLinkStyles
};

/**
 * Apply these styles for small screens
 */
export const mobileLinkStyles = {
	...headerLinkStyles,
	display: "block",
	width: "75%",
	lineHeight: "1.4em",
	textAlign: "center",
	padding: "0.5rem 0",
	margin: "0.25rem 0"
};

const isExternalLink = (href) => /^http/.test(href);

const isActive = (href) => typeof window !== "undefined" && router.route === href;

/**
 * Use Next.js router to navigate to internal pages
 * or not..
 * @param {String} href
 */
export const navigate = (href, callback) => (evt) => {
	if (!isExternalLink(href)) {
		evt.preventDefault();
		if (href === "back") {
			router.back();
		} else {
			router.push(href);
		}
	}
	if (typeof callback === "function") callback();
};

/**
 * Use Chakra-UI to style the link
 * And Next.js router to navigate...
 * @param {JSXElement} props
 * @param {String} props.href Absolute or relative URL to go by
 */
export const Link = ({ href = "#", children, onNavigate, ...props }) => (
	<NextLink href={href} scroll={true} passHref>
		<ChakraLink
			target={isExternalLink(href) ? "_blank" : ""}
			className={clsx({ active: isActive(href) })}
			{...props}
		>
			{children}
		</ChakraLink>
	</NextLink>
);

/**
 * Use Chakra-UI to style a button as a navlink
 * @param {JSX.Element} props
 * @param {String} props.href Absolute or relative URL to go by
 */
export const NavButton = ({ children, ...props }) => (
	<ChakraLink as="button" fontSize="inherit" {...navLinkStyles} {...props}>
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

export const EmbeddedLink = makeLink(embeddedLinkStyles);
export const HeroLink = makeLink(heroStyles);
export const NavLink = makeLink(navLinkStyles);
export const HeaderNavLink = makeLink(headerLinkStyles);
export const MobileNavLink = makeLink(mobileLinkStyles);

export default Link;
