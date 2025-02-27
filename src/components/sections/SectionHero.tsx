import { Box } from "@chakra-ui/react";
import { Background, HeroText } from "@components/base";
import { FC } from "react";
import { type SectionHeroProps } from "src/data/types";

/**
 * A fullscreen image or loop with big hero text
 * @param {JsXElement} props
 * @param {Object} [props.article] The main article from which to derive default title, subtile and background
 * @param {String} [props.title] Main Hero title. Use --blank-- to not display
 * @param {String} [props.subtitle] Sub Hero title. Use --blank-- to not display
 * @param {String} [props.text_color] Text color (Title and Subtitle)
 * @param {Object} [props.image] Background image
 * @param {Object} [props.video_loop] Background video loop (if no background image)
 */
export const SectionHero: FC<SectionHeroProps> = ({
	article,
	title,
	subtitle,
	text_color,
	image = null,
	video_loop = null,
	priority = false,
	displayCredits = false,
	...moreStyle
}) => {
	return (
		<Box as="section" className="hero-section" {...moreStyle}>
			<Background
				className="hero-image"
				image={image || article.image}
				displayCredits={displayCredits}
				priority={priority}
				video_loop={video_loop || article.video_loop}
			/>
			<HeroText
				title={title || article.title}
				subtitle={subtitle || article.subtitle}
				text_color={text_color}
			/>
		</Box>
	);
};
