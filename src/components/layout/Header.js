import { useState } from "react";
import {
	navigate,
	MobileNavLink,
	HeaderNavLink,
	NavButton
} from "@components/base/Links";

import { Heading, Flex } from "@chakra-ui/react";
import SvgLogo from "@components/icons/SvgLogo";

const navigation = {
	links: [
		{ href: "/articles", text: "ARTICLES" },
		{ href: "/videos", text: "VIDEOS" },
		{ href: "/music", text: "MUSIC" },
		{ href: "/live", text: "LIVE SESSIONS" },
		{ href: "/about-us", text: "ABOUT US" }
	]
};

/**
 * Mobile navigation menu covering the whole page
 * for mobile screen sizes
 * @param {JSXElement} props
 * @param {Array} props.links
 */
const MobileNav = ({ links, onNavigate, ...moreStyle }) => (
	<Flex
		as="nav"
		flexDirection="column"
		justifyContent="center"
		position="fixed"
		margin="0"
		bgColor="white"
		top="0"
		bottom="0"
		right="0"
		left="0"
		zIndex="99"
		{...moreStyle} // important to pass display none
	>
		{links.map((link, i) => (
			<MobileNavLink key={`nav-${i}`} href={link.href} onNavigate={onNavigate}>
				{link.text}
			</MobileNavLink>
		))}
	</Flex>
);

/**
 * Horizontal navigation menu displayed inside the header
 * for desktop screen sizes
 * @param {JSXElement} props
 * @param {Array} props.links
 */
export const HeaderNav = ({ links, ...moreProps }) => (
	<Flex
		as="nav"
		id="main-nav"
		flexDirection="row"
		alignItems="center"
		justifyContent="space-between"
		marginLeft="5rem"
		flexGrow={1}
		{...moreProps}
	>
		{links.map((link, i) => (
			<HeaderNavLink key={`nav-${i}`} href={link.href}>
				{link.text}
			</HeaderNavLink>
		))}
	</Flex>
);

/**
 * The main fixed Header on all the pages
 */
const Header = () => {
	// const enableMobileMenu = useBreakpointValue({ base: true, lg: false });
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
	const closeMobileMenu = () => setShowMobileMenu(false);

	return (
		<>
			<Flex
				as="header"
				id="main-header"
				position="fixed"
				width="100%"
				align="center"
				zIndex="999"
				justify="space-between"
				wrap="wrap"
				padding="0 2rem"
			>
				<Heading
					as="h1"
					pt="1rem"
					display="block"
					_hover={{ cursor: "pointer" }}
					onClick={navigate("/", closeMobileMenu)}
				>
					<SvgLogo />
				</Heading>

				<HeaderNav
					links={navigation.links}
					display={{ base: "none", lg: "flex" }}
				/>

				<NavButton
					display={{ base: "block", lg: "none" }} // show in mobile first, hide when breakpoint is lg and over
					onClick={toggleMobileMenu}
				>
					MENU
				</NavButton>
			</Flex>

			<MobileNav
				links={navigation.links}
				onNavigate={closeMobileMenu}
				display={{ base: showMobileMenu ? "flex" : "none", lg: "none" }}
			/>
		</>
	);
};

export default Header;
