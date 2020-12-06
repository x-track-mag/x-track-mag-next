import { useEffect, useState } from "react";

/**
 * @typedf InterSectionObserverOptions
 * @param {String} rootMargin CSS dimension around the root element top trigger the isIntersecting event
 */

/**
 * Hook to use the IntersectionObserver API on the provided element
 * @param {*} ref Reference to the element to observe
 * @param {InterSectionObserverOptions} options
 */
const useIntersectionObserver = (ref, options) => {
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
