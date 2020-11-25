import { useState } from "react";
import { navigate, MobileNavLink, HeaderNavLink } from "@components/base/Links";

import { Box, Heading, Flex, useBreakpointValue } from "@chakra-ui/react";
import SvgLogo from "@components/icons/SvgLogo";

const navigation = {
	links: [
		{ href: "/articles", text: "ARTICLES" },
		{ href: "/videos", text: "VIDEOS" },
		{ href: "/music", text: "MUSIC" },
		{ href: "/live", text: "LIVE SESSIONS" }
	]
};

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
		zIndex="9"
		{...moreStyle}
	>
		{links.map((link, i) => (
			<MobileNavLink key={`nav-${i}`} href={link.href} onNavigate={onNavigate}>
				{link.text}
			</MobileNavLink>
		))}
	</Flex>
);

export const HeaderNav = ({ links }) => (
	<Flex
		as="nav"
		id="main-nav"
		flexDirection="row"
		alignItems="center"
		justifyContent="space-between"
		marginLeft="4rem"
		flexGrow={1}
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
 * @param {JSXElement} props
 */
const Header = (props) => {
	const enableMobileMenu = useBreakpointValue({ base: true, lg: false });
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
				padding="1rem 2rem"
				{...props}
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

				{!enableMobileMenu && <HeaderNav links={navigation.links} />}

				<HeaderNavLink
					as="button"
					display={{ base: "block", lg: "none" }} // show in mobile first, hide when breakpoint is lg and over
					onClick={toggleMobileMenu}
				>
					MENU
				</HeaderNavLink>
			</Flex>
			{enableMobileMenu && (
				<MobileNav
					links={navigation.links}
					onNavigate={closeMobileMenu}
					display={{ base: showMobileMenu ? "flex" : "none", lg: "none" }}
				/>
			)}
		</>
	);
};

export default Header;
