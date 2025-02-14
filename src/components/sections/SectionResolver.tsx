import type { ArticleProps, ArticleSectionProps } from "src/data/types";
import {
	SectionHero,
	SectionFullText,
	SectionQuote,
	SectionVideoLauncher,
	SectionTwoColumns,
	SectionPlaylist,
	SectionGallery,
} from "./index";
import { FC } from "react";

interface SectionResolverProps {
	article: ArticleProps;
	section: ArticleSectionProps;
}

/**
 * Render a section using the appropriate template
 * @param {JSX.Element} props
 * @param {Object} props.article
 * @param {Object} props.section
 */
export const SectionResolver: FC<SectionResolverProps> = ({
	article,
	section,
	...more
}) => {
	const { template, ...sectionProps } = section;
	switch (template) {
		case "section-hero":
			return (
				<SectionHero article={article} {...sectionProps} {...more} />
			);

		case "section-full-text":
			return (
				<SectionFullText
					article={article}
					{...sectionProps}
					{...more}
				/>
			);

		case "section-quote":
			return (
				<SectionQuote article={article} {...sectionProps} {...more} />
			);

		case "section-video-launcher":
			return (
				<SectionVideoLauncher
					article={article}
					{...sectionProps}
					{...more}
				/>
			);

		case "section-two-columns":
			return (
				<SectionTwoColumns
					article={article}
					{...sectionProps}
					{...more}
				/>
			);

		case "section-playlist":
			return (
				<SectionPlaylist
					article={article}
					{...sectionProps}
					{...more}
				/>
			);

		case "section-gallery":
			return (
				<SectionGallery article={article} {...sectionProps} {...more} />
			);

		default:
			return (
				<section className="section-unkown">
					Unknown section type : <code>{template}</code>
					<pre>
						<code>{JSON.stringify(section, null, "    ")}</code>
					</pre>
				</section>
			);
	}
};
