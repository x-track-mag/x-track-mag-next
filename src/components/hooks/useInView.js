import { useEffect, useState, createRef, forwardRef } from "react";

/**
 * @typedef InterSectionObserverOptions
 * @field {DOMElement} [root=null] The root element to observe. Keep null to use the browser viewport (window)
 * @field {String} rootMargin CSS dimension around the root element top trigger the isIntersecting event
 * @field {Array|Number} [threshold=[0]]
 */

/**
 * A simplified version of the useIntersectionObserver hook to keep only the isIntersection state
 * @see https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserver
 * @param {RefObject} ref Reference to the element to observe
 * @param {InterSectionObserverOptions} options
 * @return {Boolean}
 */
const useInView = (ref, options) => {
	const [inView, setInView] = useState(null);

	useEffect(() => {
		if (ref.current && typeof IntersectionObserver === "function") {
			const handler = (entries) => {
				setInView(entries[0].isIntersecting);
			};

			const observer = new IntersectionObserver(handler, options);
			observer.observe(ref.current);

			return () => {
				setInView(null);
				observer.disconnect();
			};
		} else {
			// nope. Element is not mounted or we are on SSR
			return () => {};
		}
	}, [ref.current]);

	return inView;
};

/**
 * Build a Higher Order Component that will allways receive
 * an updated `inView` prop telling if the component is inside the viewport
 * @param {JSX.Element} Component
 * @return {JSX.Element}
 */
export const withInView = (Component, options) => () => {
	const ref = createRef();
	const inView = useInView(ref, options);
	return forwardRef((props, ref) => Component({ inView, ref, ...props }));
};

export default useInView;
