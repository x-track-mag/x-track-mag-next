import { useRef, useState } from "react";
import clsx from "clsx";
import BackgroundImage from "@components/base/BackgroundImage";
import HeroText from "@components/base/HeroText";

import { HeroLink } from "@components/base/Links";
import ArticleInfo from "@components/ArticleInfo";

/**
 *
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image]
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
const SectionPost = ({ uid, title, subtitle, image, template, ...articleInfo }) => {
	const imageContainer = useRef();
	const [blurred, setBlurred] = useState(false);
	return (
		<section
			className={clsx("hero-section", !blurred && "blurred")}
			ref={imageContainer}
			key={uid}
			id={uid}
		>
			<ArticleInfo position="absolute" {...articleInfo} bottom="1rem" top="10rem" />
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
