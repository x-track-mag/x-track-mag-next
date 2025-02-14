import { type IconComponent } from ".";

/**
 * Player icon to launch videos
 * @param {JSXElement} props
 * @param {String} [props.color="#000"] a valid CSS color
 * @param {String} [props.size="1rem"] a valid CSS size unit
 */
export const SvgPlayerIcon: IconComponent = ({
	size = "2rem",
	color = "white",
}) => (
	<svg width={size} height={size} viewBox="0 0 48 48">
		<circle cx="24" cy="24" r="23" fill="none" stroke={color} />
		<path
			fill={color}
			d="M18 12.5c-.9 0-1.5.7-1.5 1.5v20c0 1.2 1.3 1.9 2.3 1.3l16-10c1-.6 1-2 0-2.6l-16.4-10.1z"
		/>
	</svg>
);
