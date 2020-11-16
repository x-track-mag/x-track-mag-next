import { Box } from "theme-ui";
import Image from "next/image";
import Link from "next/link";

/**
 * This section is used to render a Post on the home page
 * With a link to open the page
 * @param {JsXElement} props
 * @param {String} [title] Titre principal
 * @param {String} [subtitle] Titre secondaire
 * @param {Object} [image] Image background
 */
const SectionPost = ({ uid, title, subtitle, image, template }) => {
	return (
		<Link href={uid} className="post-link">
			<section className="hero-section" id={uid}>
				<Image src={image.url} alt={image.alt} layout="fill" />
				<Box>
					{title && <h2>{title}</h2>}
					{subtitle && <h3>{subtitle}</h3>}
				</Box>
			</section>
		</Link>
	);
};

export default SectionPost;
