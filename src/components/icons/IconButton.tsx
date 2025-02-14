import { type FC, useState } from "react";
import { Box } from "@chakra-ui/react";
import { type IconComponent } from ".";

interface IconButtonProps {
	SvgIcon: IconComponent;
	color?: string;
	colorHover?: string;
	size?: string;
	as?: "button" | "a";
}

/**
 * Wrap an SVG icon
 * @param {*} param0
 */
export const IconButton: FC<IconButtonProps> = ({
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
