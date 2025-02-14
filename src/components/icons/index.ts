import { FC } from "react";
import { Icon, type IconProps } from "@chakra-ui/react";

export * from "./IconButton";
export * from "./SvgArrowReturn";
export * from "./SvgBrokenArrow";
export * from "./SvgHub";
export * from "./SvgLogo";
export * from "./SvgPlayerIcon";

export interface CommonIconProps extends IconProps {
	size?: number | string;
	color?: string;
}

export type IconComponent = FC<CommonIconProps>;
