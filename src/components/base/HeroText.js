import { Container } from "@chakra-ui/react";
import { Title, Subtitle } from "@components/base/Typography";
import { useRef } from "react";
import { useApexPosition } from "@components/hooks/useApexPosition";

/**
 * A centered block of text suited for Hero sections
 */
const HeroText = ({ title, subtitle, ...moreStyles }) => {
	const ref = useRef();
	const [inView, apexPosition] = useApexPosition(ref);
	if (typeof window !== "undefined") {
		if (inView) {
			moreStyles = {
				...moreStyles,
				animate: {
					x: 100 - 100 * apexPosition,
					opacity: inView ? apexPosition : 0
				}
			};
		} else {
			moreStyles = {
				...moreStyles,
				opacity: 0, // Starts at opacity 0
				x: 100 // Starts 100px from the right
			};
		}
	}
	return (
		<Container ref={ref} centerContent p="2rem">
			{title && title !== "--blank--" && <Title {...moreStyles}>{title}</Title>}
			{subtitle && subtitle !== "--blank--" && (
				<Subtitle {...moreStyles}>{subtitle}</Subtitle>
			)}
		</Container>
	);
};

export default HeroText;
