import SectionHero from "./SectionHero.js";
import SectionPost from "./SectionPost.js";
import SectionVideoLauncher from "./SectionVideoLauncher.js";
import SectionFullText from "./SectionFullText.js";
import SectionQuote from "./SectionQuote.js";

export const SectionResolver = ({ section, ...props }) => {
	const { template, ...sectionProps } = section;
	switch (template) {
		case "section-hero":
			return <SectionHero {...sectionProps} {...props} />;
			break;
		case "section-full-text":
			return <SectionFullText {...sectionProps} {...props} />;
			break;
		case "section-quote":
			return <SectionQuote {...sectionProps} {...props} />;
			break;
		case "section-video-launcher":
			return <SectionVideoLauncher {...sectionProps} {...props} />;
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
