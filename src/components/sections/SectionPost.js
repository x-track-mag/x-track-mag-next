import { useRef } from "react";
import BackgroundImage from "@components/base/BackgroundImage";

/**
 *
 * @param {JsXElement} props
 * @param {String} [title] Titre principal
 * @param {String} [subtitle] Titre secondaire
 * @param {Object} [image] Image background
 */
const SectionPost = ({ uid, title, subtitle, image, author, publication_date }) => {
	const imageContainer = useRef();
	return (
		<section className="hero-section" ref={imageContainer} key={uid} id={uid}>
			<BackgroundImage image={image} parent={imageContainer} />
			<div className="hero-text">
				{title && <h2>{title}</h2>}
				{subtitle && <h3>{subtitle}</h3>}
			</div>
		</section>
	);
};

export default SectionPost;
