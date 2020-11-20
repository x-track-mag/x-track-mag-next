// components/Layout.js

import Header from "./Header";
import Footer from "./Footer";

const layoutStyle = {
	display: "flex",
	flexdirection: "column",
	height: "100%",
	width: "100%"
};

const contentStyle = {
	flex: 1,
	display: "flex",
	flexdirection: "column"
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
