// components/MainNav.js
import { Box } from "@chakra-ui/react";
import { NavLink } from "@components/base/Links";

const MainNav = ({ links, show }) => (
	<Box
		as="nav"
		id="main-nav"
		className="main-nav"
		display={{ sm: show ? "block" : "none", md: "flex" }}
		width={{ sm: "full", md: "auto" }}
		alignItems="center"
		flexGrow={1}
	>
		{links.map((link) => (
			<NavLink href={link.href}>{link.text}</NavLink>
		))}
	</Box>
);

export default MainNav;
