import SectionHero from "./SectionHero.js";
import SectionPost from "./SectionPost.js";
import SectionFullText from "./SectionFullText.js";

export const SectionResolver = ({ section }) => {
	const { template, ...sectionProps } = section;
	switch (template) {
		case "section-hero":
			return <SectionHero {...sectionProps} />;
			break;
		case "section-full-text":
			return <SectionFullText {...sectionProps} />;
			break;

		default:
			return (
				<section className="section-unkown">
					Unknown section type : <code>{template}</code>
					<pre>
						<code>{JSON.stringify(section, null, "    ")}</code>
					</pre>
				</section>
			);
			break;
	}
};

export default {
	SectionFullText,
	SectionHero,
	SectionPost
};
