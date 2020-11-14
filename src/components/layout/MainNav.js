// components/MainNav.js

import { Link } from "@next/router";

const MainNav = ({ links }) => (
	<nav id="main-nav" className="main-nav">
		<ul className="main-nav__list">
			{links.map((link) => (
				<li>
					<Link></Link>{" "}
				</li>
			))}
		</ul>
		<button className="nav-toggle">Menu</button>
	</nav>
);

export default MainNav;
