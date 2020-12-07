import { useState, useEffect } from "react";
import useIntersectionObserver from "@components/hooks/useIntersectionObserver";

/**
 * Tell us if an element is inside the viewport
 * and at its APEX position (centered on screen)
 * @param {DOMElement} element
 * @return {Array} [inView, apexPosition]
 */
const measureApexPosition = (element) => {
	// Let everyone be at APEX position during SSR
	if (typeof window === "undefined") return [true, 1];
	// No yet mounted ?
	if (!element) return [false, 0];
	try {
		// Good to go now
		const { top, height } = element.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const inView = top < viewportHeight && top + height > 0;
		if (!inView) return [false, 0]; // Avoid negative Apex positions
		// APEX Position is when the element center coincides with the viewport center
		const elementCenter = top + height / 2;
		const viewportCenter = viewportHeight / 2;
		const delta = elementCenter - viewportCenter;
		const apexPosition = delta < 0 ? 1 : 1 - delta / viewportCenter;
		return [inView, apexPosition];
	} catch (err) {
		// It is possible that this browser doesn't support getBoundingClientRect() ?! bah!
		return [true, 1];
	}
};

/**
 * ApexPosition Hook
 * The response is an array with two elelments :
 * The first one is a boolean : is the element in view ?
 * The second is a percentage of te position, opf the element to its Apex position
 * @param {React.Ref} ref
 * @param {String} [margin="50px"] CSS measurement of the margin around the view port to calculate the apex
 * @return {Array} [inView, apexPosition]
 */
export const useApexPosition = (ref, margin = "50px") => {
	try {
		const element = ref.current;

		const { isIntersecting = false, target = null } =
			useIntersectionObserver(ref, {
				rootMargin: margin
			}) || {};
		const [apexPosition, setApexPosition] = useState(
			element ? [true, 1] : [false, 0]
		);

		const handleScroll = () => {
			window.requestAnimationFrame(() => {
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
	} catch (err) {
		// Fallback
		console.error(err);
		return [true, 1];
	}
};
