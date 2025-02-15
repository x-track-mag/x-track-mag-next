import { memo, useEffect, useState } from "react";
import { SectionHomePost } from "@components/sections";
import { ScrollingNews } from "@components/ScrollingNews";
import homeData from "content/home.json";
import { FullWindowVariableList } from "react-recycled-list";
import { useViewportSize } from "@components/providers";
import Script from "next/script";
import useSafeLayoutEffect from "@components/hooks/useSafeLayoutEffect";

const getSectionHeight =
	(vwHeight) =>
	({ template }) => {
		switch (template) {
			case "template6":
				return Math.round(0.4 * vwHeight);
			default:
				return Math.round(0.9 * vwHeight);
		}
	};
/**
 * Wrap the rendering of the section into a memoized call
 * that set the absolute position of the section inside the virtualized list
 * @see https://www.react-recycled-list.com/qa
 * @param {ReactRecycledListProps} props
 */
const VirtualizedSectionHomePost = memo(({ data, dataIndex, top, height }) => {
	const postData = data[dataIndex];
	const style = {
		position: "absolute",
		top,
		height,
		width: "100%",
	};
	return SectionHomePost({ ...postData, style });
});

export const HomePage = ({ scrolling_news, sections = [] }) => {
	const { width, height } = useViewportSize();
	const rowHeights = sections.map(getSectionHeight(height));

	const [virtualized, setVirtualized] = useState(false);

	useSafeLayoutEffect(() => {
		// Toggle to virtualized list (this is to avoid hydration error)
		setVirtualized(window !== undefined);
	}, []);

	return (
		<>
			<ScrollingNews messages={scrolling_news} />
			{!virtualized &&
				sections.map(({ uid, ...sectionProps }) => (
					<SectionHomePost key={uid} uid={uid} {...sectionProps} />
				))}
			{virtualized && (
				<FullWindowVariableList
					data={sections}
					rowComponent={VirtualizedSectionHomePost}
					rowHeight={Math.round(height * 0.9)}
					rowHeights={rowHeights}
				/>
			)}
		</>
	);
};

/**
 * @TODO: When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the content dir
 */
export const getStaticPropsFor =
	(tagName) =>
	async ({ params, preview }) => {
		let { scrolling_news, pinned_posts, sections, ...pageProps } = homeData;
		console.log(`Extracted home data`, scrolling_news);
		if (tagName !== "*") {
			sections = sections.filter((post) => post.tags.includes(tagName));
		}
		return {
			props: { scrolling_news, pinned_posts, sections, ...pageProps },
		};
	};

export const getStaticProps = getStaticPropsFor("*");

export default HomePage;
