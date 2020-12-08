import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

/**
 * This will allow us to animate all this typographic elements
 * with framer-motion properties
 * @see https://github.com/chakra-ui/chakra-ui/issues/2538 for the quirks
 */
// const MotionBox = motion.custom(Box);
const MotionBox = motion.custom(
	forwardRef(({ whileHover, animate, transition, ...rest }, ref) => (
		<Box ref={ref} {...rest} />
	))
);

export default MotionBox;
