import { useState } from "react";
import { Box } from "@chakra-ui/react";
import SvgArrowReturn from "./SvgArrowReturn.js";

/**
 * Wrap an SVG icon
 * @param {*} param0
 */
const IconButton = ({
	SvgIcon,
	color = "black",
	colorHover,
	size = "2rem",
	as = "button",
	...buttonStyle
}) => {
	const [iconColor, setIconColor] = useState(color);
	return (
		<Box
			as={as}
			onMouseEnter={() => setIconColor(colorHover || color)}
			onMouseLeave={() => setIconColor(color)}
			{...buttonStyle}
		>
			<SvgIcon color={iconColor} size={size} />
		</Box>
	);
};

export default IconButton;
