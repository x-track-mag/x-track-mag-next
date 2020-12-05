import { useState, useEffect } from "react";
import useIntersectionObserver from "@components/hooks/useIntersectionObserver";

/**
 * Tell us if an element is inside the viewport
 * and at its APEX position (centered on screen)
 * @param {DOMElement} element
 * @return {Array} [inView, apexPosition]
 */
const measureElementPosition = (element) => {
	if (typeof window === "undefined") return [true, 1];
	if (!element) return [false, 0];
	const { top, height } = element.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const inView = top < viewportHeight && top + height > 0;
	const elementCenter = top + height / 2;
	const viewportCenter = viewportHeight / 2;
	const delta = elementCenter - viewportCenter;
	const apexPosition = delta < 0 ? 1 : 1 - delta / viewportCenter;
	// console.log(`APEX position : ${apexPosition}`);
	return [inView, apexPosition];
};

/**
 * ApexPosition Hook
 * Example :
 * @return {Array}
 */
export const useApexPosition = (ref, margin = "100px") => {
	const position = useIntersectionObserver(ref, { rootMargin: margin });
	const [apexPosition, setApexPosition] = useState([true, 1]);

	const element = ref.current;

	const handleScroll = () => {
		window.requestIdleCallback(() => {
			setApexPosition(measureElementPosition(element));
		});
	};

	useEffect(() => {
		if (!position || !element) return;
		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Do it once mounted
		const [inView] = apexPosition;
		// console.log(`Element ${element.text} is ${inView ? "visible" : "hidden"}`);
		return () => {
			console.log(`Stop listening to scroll event for ${element.text}`);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [position]);

	return apexPosition;
};
