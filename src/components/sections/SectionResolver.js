import {
	SectionHero,
	SectionFullText,
	SectionQuote,
	SectionVideoLauncher,
	SectionTwoColumns,
	SectionPlaylist
} from "./index.js";

/**
 * Render a section using the appropriate template
 * @param {JSX.Element} props
 * @param {Object} props.article
 * @param {Object} props.section
 */
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
		case "section-playlist":
			return <SectionPlaylist article={article} {...sectionProps} {...more} />;
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

export default SectionResolver;
