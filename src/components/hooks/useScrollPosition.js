import { useRef, useLayoutEffect } from "react";

function getVScrollPosition({ element, useWindow }) {
	return window.scrollY;
}

/**
 * useScrollPosition Hook
 * Example :
 * @return {Number}
 */
export function useScrollPosition(effect, deps, element, useWindow, wait) {
	if (typeof window === "undefined") return 0;

	const position = useRef(getScrollPosition({ useWindow }));

	let throttleTimeout = null;

	const callBack = () => {
		const currPos = getScrollPosition({ element, useWindow });
		effect({ prevPos: position.current, currPos });
		position.current = currPos;
		throttleTimeout = null;
	};

	useLayoutEffect(() => {
		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout === null) {
					throttleTimeout = setTimeout(callBack, wait);
				}
			} else {
				callBack();
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, deps);
}
