// components/Layout.js

import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import ViewportSizeProvider from "@components/ViewportSizeProvider";

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

const Layout = ({ children }) => {
	const route = useRouter().route;
	const isHome = route === "/";
	return (
		<ViewportSizeProvider>
			<div className="layout" {...layoutStyle}>
				<Header />
				<AnimatePresence>
					<motion.main
						id="main-content"
						className={`${isHome ? "home" : "page"}-content`}
						key={useRouter().route}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
						exit={{ opacity: 0 }}
						{...contentStyle}
					>
						{children}
					</motion.main>
				</AnimatePresence>
				<Footer />
			</div>
		</ViewportSizeProvider>
	);
};

export default Layout;
