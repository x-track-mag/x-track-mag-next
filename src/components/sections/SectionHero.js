import { useRef } from "react";
import BackgroundImage from "@components/base/BackgroundImage";
import HeroText from "@components/base/HeroText";

/**
 *
 * @param {JsXElement} props
 * @param {String} [title] Titre principal
 * @param {String} [subtitle] Titre secondaire
 * @param {Object} [image] Image background
 */
const SectionHero = ({ title, subtitle, image, author, publication_date }) => {
	const imageContainer = useRef();
	return (
		<section className="hero-section" ref={imageContainer}>
			<BackgroundImage className="hero-image" image={image} />
			<HeroText title={title} subtitle={subtitle} />
		</section>
	);
};

export default SectionHero;
