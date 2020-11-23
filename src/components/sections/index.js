import SectionHero from "./SectionHero.js";
import SectionPost from "./SectionPost.js";
import SectionVideoLauncher from "./SectionVideoLauncher.js";
import SectionTwoColumns from "./SectionTwoColumns.js";
import SectionFullText from "./SectionFullText.js";
import SectionQuote from "./SectionQuote.js";

export const SectionResolver = ({ article, section, ...more }) => {
	const { template, ...sectionProps } = section;
	switch (template) {
		case "section-hero":
			return <SectionHero article={article} {...sectionProps} {...more} />;
			break;
		case "section-full-text":
			return <SectionFullText article={article} {...sectionProps} {...more} />;
			break;
		case "section-quote":
			return <SectionQuote article={article} {...sectionProps} {...more} />;
			break;
		case "section-video-launcher":
			return <SectionVideoLauncher article={article} {...sectionProps} {...more} />;
			break;
		case "section-two-columns":
			return <SectionTwoColumns article={article} {...sectionProps} {...more} />;
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
	SectionPost,
	SectionQuote,
	SectionVideoLauncher
};
