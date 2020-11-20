// components/MainNav.js

import { NavLink } from "@components/base/Links";

const MainNav = ({ links }) => (
	<nav id="main-nav" className="main-nav">
		{links.map((link) => (
			<NavLink href={link.href}>{link.text}</NavLink>
		))}
		<button className="nav-toggle">Menu</button>
	</nav>
);

export default MainNav;
