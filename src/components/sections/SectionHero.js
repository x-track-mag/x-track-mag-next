import { useRef } from "react";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import HeroText from "@components/base/HeroText";

/**
 *
 * @param {JsXElement} props
 * @param {String} [title] Titre principal
 * @param {String} [subtitle] Titre secondaire
 * @param {Object} [image] Image background
 */
const SectionHero = ({ article = {}, title, subtitle, image }) => {
	const imageContainer = useRef();
	return (
		<section className="hero-section" ref={imageContainer}>
			<BackgroundImageContainer
				className="hero-image"
				image={image || article.image}
			/>
			<HeroText
				title={title || article.title}
				subtitle={subtitle || article.subtitle}
			/>
		</section>
	);
};

export default SectionHero;
