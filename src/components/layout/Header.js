import { useState } from "react";
import MainNav from "./MainNav.js";

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
			justify="space-between"
			wrap="wrap"
			padding="1.5rem"
			{...props}
		>
			<Flex align="center" mr={5}>
				<Heading as="h1" size="lg">
					<SvgLogo />
				</Heading>
			</Flex>

			<MainNav links={navigation.links} show={showMobileMenu} />

			<Box
				as="button"
				display={{ base: "block", md: "none" }}
				onClick={toggleMobileMenu}
			>
				MENU
			</Box>
		</Flex>
	);
};

export default Header;
