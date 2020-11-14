import MainNav from "./MainNav.js";

const Header = ({ navigation }) => (
	<header className="global-header">
		<h1 className="global-header__logo">X-TRACK MAG</h1>
		<MainNav links={navigation.links} />
	</header>
);

export default Header;
