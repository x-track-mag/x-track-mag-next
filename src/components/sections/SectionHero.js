import Container from "@components/layout/Container";
import Image from "next/image";
/**
 *
 * @param {JsXElement} props
 * @param {String} [title] Titre principal
 * @param {String} [subtitle] Titre secondaire
 * @param {Object} [image] Image background
 */
const SectionHero = ({ title, subtitle, image, author, publication_date }) => {
	return (
		<section className="section-hero">
			<Image src={image.url} alt={image.alt} layout="fill" />
			<Container>
				{title && <h2>{title}</h2>}
				{subtitle && <h3>{subtitle}</h3>}
			</Container>
		</section>
	);
};

export default SectionHero;
