import useSafeLayoutEffect from "./useSafeLayoutEffect";
import { type RefObject, useState } from "react";

export interface Size {
	width: number;
	height: number;
}

/**
 * `useElementSize` is a hook to measure the size of a DOM element.
 * It tracks the width and height of the element as the window resizes or the element changes.
 *
 * @param ref - The React ref object attached to the element to measure.
 * @return {Size} - An object containing the `width` and `height` of the element.
 */
export const useElementSize = (ref: RefObject<HTMLElement>) => {
	const [size, setSize] = useState({ width: 0, height: 0 });

	const handleSize = () => {
		if (ref) {
			const { width, height } = size;
			// We prefer to round the size measurements
			const newWidth = Math.round(ref.current.offsetWidth);
			const newHeight = Math.round(ref.current.offsetHeight);
			if (newWidth !== width || newHeight !== height) {
				setSize({
					width: newWidth,
					height: newHeight,
				});
			}
		}
	};

	useSafeLayoutEffect(() => {
		if (!ref) return;

		const resizeObserver = new ResizeObserver(handleSize);
		resizeObserver.observe(ref.current);

		return () => resizeObserver.disconnect();
	}, [ref, handleSize]);

	return size;
};
