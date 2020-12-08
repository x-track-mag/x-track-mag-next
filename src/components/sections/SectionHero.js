import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import HeroText from "@components/base/HeroText";

/**
 * A fullscreen image or loop with big hero text
 * @param {JsXElement} props
 * @param {Object} [props.article] The main article from which to derive default title, subtile and background
 * @param {String} [props.title] Main Hero title. Use --blank-- to not display
 * @param {String} [props.subtitle] Sub Hero title. Use --blank-- to not display
 * @param {Object} [props.image] Background image
 * @param {Object} [props.video_loop] Background video loop (if no background image)
 */
const SectionHero = ({
	article = {},
	title,
	subtitle,
	image,
	video_loop,
	...moreStyle
}) => {
	const imageContainer = useRef();
	return (
		<Box as="section" className="hero-section" ref={imageContainer} {...moreStyle}>
			<BackgroundImageContainer
				className="hero-image"
				image={image || article.image}
				video_loop={video_loop || article.video_loop}
			/>
			<HeroText
				title={title || article.title}
				subtitle={subtitle || article.subtitle}
			/>
		</Box>
	);
};

export default SectionHero;
