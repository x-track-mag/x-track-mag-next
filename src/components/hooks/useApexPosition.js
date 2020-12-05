import { useState, useEffect } from "react";
import useIntersectionObserver from "@components/hooks/useIntersectionObserver";

/**
 * Tell us if an element is inside the viewport
 * and at its APEX position (centered on screen)
 * @param {DOMElement} element
 * @return {Array} [inView, apexPosition]
 */
const measureApexPosition = (element) => {
	if (typeof window === "undefined") return [true, 1];
	if (!element) return [false, 0];
	const { top, height } = element.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const inView = top < viewportHeight && top + height > 0;
	if (!inView) return [false, 0]; // Avoid negative Apex positions
	// APEX Position is when the element center coincide with the viewport center
	const elementCenter = top + height / 2;
	const viewportCenter = viewportHeight / 2;
	const delta = elementCenter - viewportCenter;
	const apexPosition = delta < 0 ? 1 : 1 - delta / viewportCenter;
	return [inView, apexPosition];
};

/**
 * ApexPosition Hook
 * Example :
 * @return {Array}
 */
export const useApexPosition = (ref, margin = "50px") => {
	const element = ref.current;

	const { isIntersecting = false, target = null } =
		useIntersectionObserver(ref, {
			rootMargin: margin
		}) || {};
	const [apexPosition, setApexPosition] = useState(element ? [true, 1] : [false, 0]);

	const handleScroll = () => {
		window.requestIdleCallback(() => {
			setApexPosition(measureApexPosition(element));
		});
	};

	useEffect(() => {
		if (!element || !target) return () => {};

		if (isIntersecting) {
			window.addEventListener("scroll", handleScroll);
			handleScroll(); // Do it once mounted
		} else {
			window.removeEventListener("scroll", handleScroll);
		}

		// Clean up when the element is dismounted
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isIntersecting]);

	return apexPosition;
};
