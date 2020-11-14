/**
 * Stylized Broken Arrow
 * @param {JSXElement} props
 * @param {String} [props.color="#000"] a valid CSS color
 * @param {String} [props.size="1rem"] a valid CSS size unit
 */
const SvgBrokenArrow = ({ size = "1rem", color = "#000" }) => (
	<svg width={size} height={size} viewBox="0 0 32 32">
		<g fill="none" stroke={color}>
			<path d="M12 4v10h11" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M17 19l6-5-6-5" />
		</g>
	</svg>
);

export default SvgBrokenArrow;
