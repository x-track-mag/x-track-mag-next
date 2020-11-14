// components/Layout.js

import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./MainNav";

const layoutStyle = {
	display: "flex",
	flexDirection: "column",
	height: "100%",
	width: "100%"
};

const contentStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column"
};

const Layout = ({ children }) => (
	<div className="layout">
		<Header />
		<main className="Content" style={contentStyle}>
			{children}
		</main>
		<NavBar />
		<Footer />
	</div>
);

export default Layout;
