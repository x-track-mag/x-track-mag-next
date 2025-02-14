import { useSafeLayoutEffect } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

/**
 * @typedef {Object} ViewportSize
 * @property {Number} width in px
 * @property {Number} height in px
 * @property {{landscape|portrait}}} mode
 */
/**
 * @return {ViewportSize|null}
 */
export const getViewportSize = () => {
	// There is not viewport when doing Server Side Rendering
	if (typeof window === "undefined")
		return {
			width: 1920,
			height: 1024,
			mode: "landscape",
		};

	const width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	const height =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;
	const mode = width > height ? "landscape" : "portrait";

	return { width, height, mode };
};

const ViewportSizeContext = createContext(getViewportSize());

/**
 * NOTE : Don't forget the {children} when writing a context provider !
 * @param props
 * @param
 */
export const ViewportSizeProvider = ({ children }) => {
	// Save current viewport size in the state object
	let [viewportSize, setViewportSize] = useState(getViewportSize());

	// in this case useLayoutEffect will execute only once because
	// it does not have any dependencies.
	useSafeLayoutEffect(() => {
		// Listen to window resize event
		const resizeListener = () => {
			window.requestAnimationFrame(() => {
				const viewport = getViewportSize();
				console.log(
					`Viewport size : ${viewport.width}x${viewport.height}`
				);
				setViewportSize(viewport);
			});
		};
		window.addEventListener("resize", resizeListener);
		window.addEventListener("DOMContentLoaded", resizeListener);

		// return the clean up function
		return () => {
			window.removeEventListener("resize", resizeListener);
			window.removeEventListener("DOMContentLoaded", resizeListener);
		};
	}, []);

	return (
		<ViewportSizeContext.Provider value={viewportSize}>
			{children}
		</ViewportSizeContext.Provider>
	);
};

/**
 * React Hook to retrieve an up-to-date version of the viewport `width`, `height` and `mode`
 * @return {ViewportSize|null}
 */
export const useViewportSize = () => {
	const viewport = useContext(ViewportSizeContext);
	if (viewport === undefined) {
		throw new Error(
			`useViewportSize() hook can only be used from inside a <ViewportSizeProvider/> parent`
		);
	}

	return viewport;
};

/**
 * Build a Higher Order Component that will allways receive
 * an updated `viewport` prop with the width, height and landscape|portrait mode
 * @param {JSX.Element} Component
 * @return {JSX.Element}
 */
export const withViewportSize = (Component) => (props) => {
	const viewport = useViewportSize();

	return Component({ ...viewport, ...props });
};
