import { type FC, MouseEventHandler, useState } from "react";
import { Box } from "@chakra-ui/react";
import { type IconComponent } from ".";

interface IconButtonProps {
	SvgIcon: IconComponent;
	onClick?: MouseEventHandler;
	color?: string;
	colorHover?: string;
	size?: string;
	as?: "button" | "a";
}

/**
 * Wrap an SVG icon inside a button
 */
export const IconButton: FC<IconButtonProps> = ({
	SvgIcon,
	color = "black",
	colorHover,
	size = "2rem",
	as = "button",
	...more
}) => {
	const [iconColor, setIconColor] = useState(color);
	return (
		<Box
			as={as}
			onMouseEnter={() => setIconColor(colorHover || color)}
			onMouseLeave={() => setIconColor(color)}
			{...more}
		>
			<SvgIcon color={iconColor} size={size} />
		</Box>
	);
};
