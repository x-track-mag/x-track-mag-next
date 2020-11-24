import { useState } from "react";
import clsx from "clsx";
import { useViewportSize } from "@components/ViewportSizeProvider";
import BackgroundImage from "@components/base/BackgroundImage";
import HeroText from "@components/base/HeroText";

import { HeroLink } from "@components/base/Links";
import ArticleInfo from "@components/ArticleInfo";

const template1 = {
	displayImage: true,
	displayTitle: true,
	displaySubtitle: true,
	focusOnHover: true,
	displayFooter: false
};
const template2 = {
	displayImage: true,
	displayTitle: true,
	displaySubtitle: true,
	focusOnHover: true,
	displayFooter: false
};
const template3 = {
	displayImage: true,
	displayTitle: true,
	displaySubtitle: true,
	focusOnHover: true,
	displayFooter: false
};
const template4 = {
	displayImage: false,
	displayTitle: true,
	displaySubtitle: true,
	focusOnHover: false,
	displayFooter: false,
	more: {
		textColor: "black"
	}
};
const template5 = {
	displayImage: true,
	displayTitle: true,
	displaySubtitle: true,
	focusOnHover: true,
	displayFooter: false
};
const template6 = {
	displayImage: true,
	displayTitle: true,
	displaySubtitle: true,
	focusOnHover: true,
	displayFooter: false
};
const templates = [template1, template2, template3, template4, template5, template6];

const analyzeTemplate = (templateChoice) => {
	const templateNumber = Number(templateChoice.split(":")[0]);
	return templates[templateNumber];
};

/**
 * Disaply a new post with 5 different templates on the Home Page
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image]
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
const SectionPost = ({
	uid,
	title = "",
	subtitle = "",
	image,
	template,
	...articleInfo
}) => {
	const [blurred, setBlurred] = useState(false);
	const viewport = useViewportSize();
	const {
		displayImage,
		displayTitle,
		displaySubtitle,
		focusOnHover,
		displayFooter,
		more = {}
	} = analyzeTemplate(template);

	return (
		<section
			className={clsx("hero-section", blurred && "blurred")}
			key={uid}
			id={uid}
		>
			<ArticleInfo position="absolute" {...articleInfo} bottom="1rem" top="12rem" />
			{displayImage && <BackgroundImage image={image} viewport={viewport} />}
			<HeroLink
				href={uid}
				onMouseEnter={() => setBlurred(!focusOnHover)}
				onMouseLeave={() => setBlurred(focusOnHover)}
			>
				<HeroText
					title={displayTitle ? title : ""}
					subtitle={displaySubtitle ? subtitle : ""}
					{...more}
				/>
			</HeroLink>
		</section>
	);
};

export default SectionPost;
