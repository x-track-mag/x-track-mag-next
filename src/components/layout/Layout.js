// components/Layout.js

import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

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
		<AnimatePresence>
			<motion.main
				key={useRouter().route}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				duration={10}
				exit={{ opacity: 0 }}
				id="main-content"
				{...contentStyle}
			>
				{children}
			</motion.main>
		</AnimatePresence>
		<Footer />
	</div>
);

export default Layout;
