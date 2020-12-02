import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import HeroText from "@components/base/HeroText";

/**
 * A fullscreen image or loop with big hero text
 * @param {JsXElement} props
 * @param {Object} [props.article] The main article from which to derive default title, subtile or loop
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Image background
 * @param {Object} [props.video_loop] Loop video (if no background image)
 */
const SectionHero = ({
	article = {},
	title = "--blank--",
	subtitle = "--blank--",
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
				textColor="white"
				title={title || article.title}
				subtitle={subtitle || article.subtitle}
			/>
		</Box>
	);
};

export default SectionHero;
