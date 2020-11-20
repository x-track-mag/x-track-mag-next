/**
 * Takes the height in CSS units and multiply it by 36/20
 * @param {String} cssHeight
 */
const calcWidth = (cssHeight) =>
	cssHeight.replace(
		/([\d\.]+)(\w+)/,
		(str, val, unit) => (Number(val) * 36) / 20 + unit
	);

/**
 * SVG ARROW + WORLD HUB
 * @param {JSXElement} props
 * @param {String} [props.color="#000"] a valid CSS color
 * @param {String} [props.size="1rem"] a valid CSS size unit
 */
const SvgHub = ({ size = "1rem", color = "#000" }) => (
	<svg viewBox="0 0 36 20" height={size} width={calcWidth(size)}>
		<g fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
			<g id="arrow">
				<path d="M0.5 0v10h11" />
				<path strokeLinejoin="round" d="M5.5 15l6-5-6-5" />
			</g>
			<g id="hub">
				<circle cx="26" cy="10" r="9.5" />
				<path d="M16.5 10 h19 m-9.5,-9.5 v19 M19 4 a 10,11 100 0 0 14,0 M19 16 a 10,11 100 0 1 14,0 M26 0.5 a 11,10 100 0 0 0,19 M26 0.5 a 11,10 100 0 1 0,19" />
			</g>
		</g>
	</svg>
);

export default SvgHub;
