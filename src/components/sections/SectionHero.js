import BackgroundImage from "@components/base/BackgroundImage";

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
			<div className="hero-text">
				{title && <h2>{title}</h2>}
				{subtitle && <h3>{subtitle}</h3>}
			</div>
		</section>
	);
};

export default SectionHero;
