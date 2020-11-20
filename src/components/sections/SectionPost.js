import { useRef, useState } from "react";
import clsx from "clsx";
import BackgroundImage from "@components/base/BackgroundImage";
import HeroText from "@components/base/HeroText";
import { HeroLink } from "@components/base/Links";

/**
 *
 * @param {JsXElement} props
 * @param {String} [title] Titre principal
 * @param {String} [subtitle] Titre secondaire
 * @param {Object} [image] Image background
 */
const SectionPost = ({ uid, title, subtitle, image, template }) => {
	const imageContainer = useRef();
	const [blurred, setBlurred] = useState(false);
	return (
		<section
			className={clsx("hero-section", !blurred && "blurred")}
			ref={imageContainer}
			key={uid}
			id={uid}
		>
			<BackgroundImage image={image} parent={imageContainer} />
			<HeroLink
				href={uid}
				onMouseEnter={() => setBlurred(true)}
				onMouseLeave={() => setBlurred(false)}
			>
				<HeroText title={title} subtitle={subtitle} />
			</HeroLink>
		</section>
	);
};

export default SectionPost;
