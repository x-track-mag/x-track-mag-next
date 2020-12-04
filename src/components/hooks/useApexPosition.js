import { useState, useLayoutEffect } from "react";
// import { useIntersection } from "next/client/use-intersection";

/**
 * @typedef ApexPosition
 * @field {Boolean} inView Tell us if an element is inside the viewport
 * @field {Number[0-1]} apexPosition Tell us if the element is near its apex position (centered in the viewport)
 */

const _IN_VIEW = {
	inView: true,
	apexPosition: 1
};

const measureElementPosition = (element) => {
	if (typeof window === "undefined") return [true, 1];
	if (!element) return [false, 0];
	const { top, height } = element.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const center = top + height / 2;
	const inView = top < viewportHeight && top + height > 0;
	const viewportCenter = viewportHeight / 2;
	const delta = center - viewportCenter;
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
	const element = ref.current;
	const [apexPosition, setApexPosition] = useState([true, 1]);

	const handleScroll = () => {
		requestAnimationFrame(() => {
			setApexPosition(measureElementPosition(element));
		});
	};

	if (typeof window !== "undefined") {
		useLayoutEffect(() => {
			window.addEventListener("scroll", handleScroll);
			handleScroll(); // Do it once mounted
			return () => window.removeEventListener("scroll", handleScroll);
		}, []);
	}

	return apexPosition;
};
