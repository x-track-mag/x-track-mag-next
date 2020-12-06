import { Container } from "@chakra-ui/react";
import { Title, Subtitle } from "@components/base/Typography";
import { useRef } from "react";
import { useApexPosition } from "@components/hooks/useApexPosition";
import useUniversalEffect from "@components/hooks/useUniversalEffect";

/**
 * A centered block of text suited for Hero sections
 */
const HeroText = ({ title, subtitle, ...moreStyles }) => {
	try {
		const ref = useRef();
		const [inView, apexPosition] = useApexPosition(ref);

		if (inView) {
			moreStyles = {
				...moreStyles,
				transition: {
					ease: "easeOut"
				},
				animate: {
					x: 100 - 100 * apexPosition,
					opacity: apexPosition
				}
			};
		} else {
			// Don't allow to flicker when entering the viewport
			moreStyles = {
				...moreStyles,
				transition: {
					ease: "easeOut",
					duration: 0
				},
				animate: {
					x: 100, // Starts 100px from the right
					opacity: 0 // Starts at opacity 0
				}
			};
		}

		return (
			<Container ref={ref} centerContent p="2rem">
				{title && title !== "--blank--" && <Title {...moreStyles}>{title}</Title>}
				{subtitle && subtitle !== "--blank--" && (
					<Subtitle {...moreStyles}>{subtitle}</Subtitle>
				)}
			</Container>
		);
	} catch (err) {
		return (
			<pre>
				<code>
					{err.message}
					{err.stack}
				</code>
			</pre>
		);
	}
};

export default HeroText;
