// components/MainNav.js
import { Flex } from "@chakra-ui/react";
import { HeaderNavLink } from "@components/base/Links";

const MainNav = ({ links, show, ...props }) => (
	<Flex
		as="nav"
		id="main-nav"
		className="main-nav"
		display={{ sm: show ? "block" : "none", lg: "flex" }}
		width={{ sm: "full", md: "auto" }}
		alignItems="center"
		justify="space-around"
		flexGrow={1}
	>
		{links.map((link) => (
			<HeaderNavLink href={link.href}>{link.text}</HeaderNavLink>
		))}
	</Flex>
);

export default MainNav;
