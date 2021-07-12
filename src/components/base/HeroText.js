import { Container } from "@chakra-ui/react";
import { Title, Subtitle } from "@components/base/Typography";
import { useRef } from "react";
import { useApexPosition } from "@components/hooks/useApexPosition";
import clsx from "clsx";

/**
 * A centered block of text suited for Hero sections
 */
const HeroText = ({ title, subtitle, text_color, ...moreStyles }) => {
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
			<Container
				ref={ref}
				className={clsx("hero-text", text_color)}
				willChange="transform"
				centerContent
				p="2rem"
			>
				{title && title !== "--blank--" && <Title {...moreStyles}>{title}</Title>}
				{subtitle && subtitle !== "--blank--" && (
					<Subtitle {...moreStyles}>{subtitle}</Subtitle>
				)}
			</Container>
		);
	} catch (err) {
		return (
			<Container
				bgColor="white"
				textColor="black"
				fontSize="16px"
				width="95%"
				height="100%"
			>
				<code>
					<pre>
						{err.message}
						{err.stack}
					</pre>
				</code>
			</Container>
		);
	}
};

export default HeroText;
