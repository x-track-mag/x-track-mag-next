import { useState } from "react";
import MainNav from "./MainNav.js";
import { headerNavStyles } from "@components/base/Links";

import { Box, Heading, Flex } from "@chakra-ui/react";
import SvgLogo from "@components/icons/SvgLogo";

const navigation = {
	links: [
		{ href: "/videos", text: "VIDEOS" },
		{ href: "/music", text: "MUSIC" },
		{ href: "/live", text: "LIVE SESSIONS" }
	]
};

/**
 *
 * @param {*} props
 */
const Header = (props) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const toggleMobileMenu = () => setShow(!showMobileMenu);

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
			<Heading as="h1" margin="0" pt="1rem" display="block">
				<SvgLogo />
			</Heading>

			<MainNav width="100%" links={navigation.links} show={showMobileMenu} />

			<Box
				as="button"
				display={{ base: "block", lg: "none" }}
				onClick={toggleMobileMenu}
			>
				MENU
			</Box>
		</Flex>
	);
};

export default Header;
