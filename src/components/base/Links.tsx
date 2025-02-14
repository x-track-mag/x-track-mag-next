import router from "next/router";
import { ThemableLink } from "./ThemableLink";
import clsx from "clsx";

const noOutline = {
	outline: "none",
	outlineStyle: "none",
} as const;

const baseLinkStyles = {
	textColor: "black",
	_focus: noOutline,
	_active: noOutline,
	textDecoration: "none",
	_hover: {
		textDecoration: "none",
	},
} as const;

/**
 * Style applied when link is inside plain text
 */
const embeddedLinkStyles = {
	...baseLinkStyles,
	bgColor: "brand.green",
	_hover: {
		lineHeight: "0.3em",
		fontStyle: "italic",
	},
} as const;

/**
 * Centered links inside Hero sections
 */
const heroStyles = {
	...baseLinkStyles,
	textColor: "white",
	fontSize: "xl",
} as const;

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
		...noOutline,
	},
	_active: {
		textColor: "brand.green",
		...noOutline,
	},
	_hover: {
		textColor: "brand.green",
	},
} as const;

/**
 * Header navigation style
 */
export const headerLinkStyles = {
	...navLinkStyles,
} as const;

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
	margin: "0.25rem 0",
} as const;

const isExternalLink = (href) => /^http/.test(href);

const isActiveLink = (href) =>
	typeof window !== "undefined" && router.route === href;

/**
 * Use Next.js router to navigate to internal pages
 * or not..
 * @param {String} href
 */
export const navigate =
	(href, callback = null) =>
	(evt) => {
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
export const Link = ({ href = "#", ...props }) => (
	<ThemableLink
		href={href}
		scroll={true}
		target={isExternalLink(href) ? "_blank" : ""}
		className={clsx({ active: isActiveLink(href) })}
		{...props}
	/>
);

/**
 * Use Chakra-UI to style a button as a navlink
 * @param {JSX.Element} props
 * @param {String} props.href Absolute or relative URL to go by
 */
export const NavButton = ({ ...props }) => (
	<ThemableLink
		as="button"
		fontSize="inherit"
		{...navLinkStyles}
		{...props}
	/>
);

/**
 * Build a link from specified style object
 * @param {Object} style
 * @return {Link}
 */
const makeLink =
	(style) =>
	({ children, ...props }) =>
		(
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
