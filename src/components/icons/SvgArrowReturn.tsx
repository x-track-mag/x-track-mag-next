import { IconComponent } from ".";

/**
 * Stylized RETURN Arrow
 * @param {JSXElement} props
 * @param {String} [props.color="#000"] a valid CSS color
 * @param {String} [props.size="1rem"] a valid CSS size unit
 */
export const SvgArrowReturn: IconComponent = ({
	color = "#000",
	size = "1rem",
}) => (
	<svg viewBox="-7 0 32 32" width={size} height={size}>
		<g fill="none" stroke={color} strokeLinejoin="round">
			<path d="M24 6v13H8" />
			<path strokeLinecap="round" d="M15 14l-7 5 7 5" />
		</g>
	</svg>
);
