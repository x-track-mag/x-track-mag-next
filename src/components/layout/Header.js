import { useState } from "react";
import MainNav from "./MainNav.js";
import { navigate, headerNavStyles } from "@components/base/Links";

import { Box, Heading, Flex } from "@chakra-ui/react";
import SvgLogo from "@components/icons/SvgLogo";

const navigation = {
	links: [
		{ href: "/articles", text: "ARTICLES" },
		{ href: "/videos", text: "VIDEOS" },
		{ href: "/music", text: "MUSIC" },
		{ href: "/live", text: "LIVE SESSIONS" }
	]
};

/**
 * The main fixed Header on all the pages
 * @param {JSXElement} props
 */
const Header = (props) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

	return (
		<Flex
			as="header"
			id="main-header"
			position="fixed"
			width="100%"
			align="center"
			zIndex="9999"
			justify="space-between"
			wrap="wrap"
			padding="1.5rem"
			{...headerNavStyles}
			{...props}
		>
			<Heading
				as="h1"
				pt="1rem"
				display="block"
				_hover={{ cursor: "pointer" }}
				onClick={navigate("/")}
			>
				<SvgLogo />
			</Heading>

			<MainNav width="100%" links={navigation.links} show={showMobileMenu} />

			<Box
				as="button"
				display={{ base: "block", lg: "none" }} // show in mobile first, hide when breakpoint is lg and over
				onClick={toggleMobileMenu}
			>
				MENU
			</Box>
		</Flex>
	);
};

export default Header;
