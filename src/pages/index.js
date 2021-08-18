import SectionHomePost from "@components/sections/SectionHomePost.js";
import ScrollingNews from "@components/ScrollingNews";
import { FullWindowVariableList } from "react-recycled-list";
import { useViewportSize } from "@components/ViewportSizeProvider";
import { memo } from "react";

const getSectionHeight = (vwHeight) => ({ template }) => {
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
		width: "100%"
	};
	return SectionHomePost({ ...postData, style });
});

export const HomePage = ({ scrolling_news, sections = [] }) => {
	const ssrRendering = typeof window === "undefined";
	const { width, height } = useViewportSize();
	const rowHeights = sections.map(getSectionHeight(height));

	return (
		<>
			<ScrollingNews messages={scrolling_news} />
			{ssrRendering &&
				sections.map(({ uid, ...sectionProps }) => (
					<SectionHomePost key={uid} uid={uid} {...sectionProps} />
				))}
			{!ssrRendering && (
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
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticPropsFor = (tagName) => async ({ params, preview }) => {
	const data = await import("../../content/home.json");
	console.log("Loaded page data", data);
	let { scrolling_news, pinned_posts, sections, ...pageProps } = data;
	if (tagName !== "*") {
		sections = sections.filter((post) => post.tags.includes(tagName));
	}
	return {
		props: { scrolling_news, pinned_posts, sections, ...pageProps }
	};
};

export const getStaticProps = getStaticPropsFor("*");

export default HomePage;
