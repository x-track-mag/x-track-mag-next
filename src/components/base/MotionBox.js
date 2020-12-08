import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

/**
 * This will allow us to animate all this typographic elements
 * with framer-motion properties
 * @see https://github.com/chakra-ui/chakra-ui/issues/2538 for the quirks
 * why framer props are not passed to child component
 */
// const MotionBox = motion.custom(Box);
const MotionBox = motion.custom(
	forwardRef(
		({ whileHover, animate, transition, variants, initial, ...moreProps }, ref) => (
			<Box ref={ref} {...moreProps} />
		)
	)
);

/**
 * Build a MotionBox (ie : a mixin between a Chakra Box and a Framer motion div)
 * That will always receive default properties (style) and allow to forward `ref` too.
 * @param {Object} defaultProps
 */
export const makeMotionBox = ({ ...defaultProps }) =>
	motion.custom(
		forwardRef(
			(
				{ whileHover, animate, transition, variants, initial, ...moreProps },
				ref
			) => <Box ref={ref} {...defaultProps} {...moreProps} />
		)
	);

export default MotionBox;
