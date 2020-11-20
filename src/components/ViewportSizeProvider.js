import { createContext, useContext, useState, useLayoutEffect } from "react";

/**
 * @typedef {Object} ViewportSize
 * @property {Number} width in px
 * @property {Number} height in px
 * @property {{landscape|portrait}}} mode
 */
/**
 * @return {ViewportSize|null}
 */
const getViewportSize = () => {
	// There is not viewport when doing Server Side Rendering
	if (typeof window === "undefined") return null;

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

const ViewportSizeContext = createContext();

/**
 * NOTE : Don't forget the {children} when writing a context provider !
 * @param props
 * @param
 */
const ViewportSizeProvider = ({ children }) => {
	// Save current viewport size in the state object
	let [viewportSize, setViewportSize] = useState(getViewportSize());

	// in this case useLayoutEffect will execute only once because
	// it does not have any dependencies.
	if (typeof window !== "undefined")
		useLayoutEffect(() => {
			// Listen to window resize event
			const resizeListener = () => {
				console.log("RESIZE EVENT");
				window.requestAnimationFrame(() => setViewportSize(getViewportSize()));
			};
			window.addEventListener("resize", resizeListener);

			// return the clean up function
			return () => {
				window.removeEventListener("resize", resizeListener);
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
			`useViewportSize() hook can only be used from inside a <EventBusProvider/> parent`
		);
	}
	return viewport;
};

/**
 * Build a Higher Order Component that will allways receive
 * an updated `viewport` prop with the width, height and landscape|portrait mode
 * @param {*} Component
 */
export const withViewportSize = (Component) => (props) => {
	const viewport = useViewportSize();
	return Component({ viewport, ...props });
};

export default ViewportSizeProvider;
