// components/Layout.js

import Header from "./Header";
import Footer from "./Footer";

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
	<div className="layout" {...layoutStyle}>
		<Header />
		<main id="main-content" {...contentStyle}>
			{children}
		</main>
		<Footer />
	</div>
);

export default Layout;
