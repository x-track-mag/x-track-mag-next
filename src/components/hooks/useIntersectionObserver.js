import { useEffect, useState } from "react";

/**
 * @typedef InterSectionObserverOptions
 * @field {DOMElement} [root=null] The root element to observe. Keep null to use the browser viewport (window)
 * @field {String} rootMargin CSS dimension around the root element top trigger the isIntersecting event
 * @field {Array|Number} [threshhold=[0]]
 */

/**
 * @typedef IntersectionObserverEntry
 * @field {Boolean} isIntersecting
 * @field {DOMElement} target
 * @field {Object} boundingClientRect
 * @field {Number} time
 */

/**
 * Hook to use the IntersectionObserver API on the provided element
 * @see https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserver
 * @param {RefObject} ref Reference to the element to observe
 * @param {InterSectionObserverOptions} options
 * @return {IntersectionObserverEntry}
 */
const useIntersectionObserver = (ref, options) => {
	// @see https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserverEntry
	const [intersectionObserverEntry, setIntersectionObserverEntry] = useState(null);

	useEffect(() => {
		if (ref.current && typeof IntersectionObserver === "function") {
			const handler = (entries) => {
				setIntersectionObserverEntry(entries[0]);
			};

			const observer = new IntersectionObserver(handler, options);
			observer.observe(ref.current);

			return () => {
				setIntersectionObserverEntry(null);
				observer.disconnect();
			};
		}
		return () => {};
	}, [ref.current, options.threshold, options.root, options.rootMargin]);

	return intersectionObserverEntry;
};

export default useIntersectionObserver;
