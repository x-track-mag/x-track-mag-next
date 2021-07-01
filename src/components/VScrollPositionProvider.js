import { createContext, useContext, useState, useLayoutEffect } from "react";

/**
 * @return {Number}
 */
const getVScrollPosition = () => (typeof window === "undefined" ? 0 : window.scrollY);

const VScrollPositionContext = createContext();

/**
 * NOTE : Don't forget the {children} when writing a context provider !
 * @param props
 * @param
 */
const VScrollPositionProvider = ({ children }) => {
	// Save current viewport size in the state object
	let [vscrollPosition, setVScrollPosition] = useState(getVScrollPosition());

	// in this case useLayoutEffect will execute only once because
	// it does not have any dependencies.
	if (typeof window !== "undefined")
		useLayoutEffect(() => {
			// Listen to window scroll event
			const measureVScrollPosition = () => {
				requestAnimationFrame(() => setVScrollPosition(window.scrollY));
			};
			window.addEventListener("scroll", measureVScrollPosition);

			// return the clean up function
			return () => {
				window.removeEventListener("scroll", measureVScrollPosition);
			};
		}, []);

	return (
		<VScrollPositionContext.Provider value={vscrollPosition}>
			{children}
		</VScrollPositionContext.Provider>
	);
};

/**
 * React Hook to retrieve an up-to-date version of the vertical scroll position
 * @return {Number}
 */
export const useVScrollPosition = () => {
	const vscrollPosition = useContext(VScrollPositionContext);
	if (vscrollPosition === undefined) {
		throw new Error(
			`useVScrollPosition() hook can only be used from inside a <VScrollPositionProvider/> parent`
		);
	}
	return vscrollPosition;
};

/**
 * Build a Higher Order Component that will allways receive
 * an updated `viewport` prop with the width, height and landscape|portrait mode
 * @param {JSX.Element} Component
 */
export const withVScrollPosition = (Component) => (props) => {
	const vscrollPosition = useVScrollPosition();
	return Component({ vscrollPosition, ...props });
};

export default VScrollPositionProvider;
