import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const ScrollPositionKeeper = () => {
	const router = useRouter();
	const [scrollPosition, rememberScrollPosition] = useState(0);

	const storeScrollPosition = (urlNavigated) => {
		if (router.route === "/") {
			console.log(
				`Remembering Home Page scroll position : ${document.body.scrollTop}`
			);
			rememberScrollPosition(document.body.scrollTop);
		}
	};
	const restoreScrollPosition = (urlNavigated) => {
		if (urlNavigated === "/") {
			window.scrollTo(0, scrollPosition);
		} else {
			window.scrollTo(0, 0);
		}
	};

	useEffect(() => {
		console.log("ScrollKeeper is listening");
		router.events.on("routeChangeStart", storeScrollPosition);
		router.events.on("routeChangeComplete", restoreScrollPosition);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off("routeChangeStart", storeScrollPosition);
			router.events.off("routeChangeComplete", restoreScrollPosition);
		};
	}, []);

	return null;
};

export default ScrollPositionKeeper;
