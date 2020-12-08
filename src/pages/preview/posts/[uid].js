import { PostPage } from "../../posts/[uid]";
import SectionHomePost from "@components/sections/SectionHomePost.js";
import { getPost } from "@lib/clients/PrismicClient";
import { transformPost } from "@lib/transform/PrismicDataTransformers";

const preparePost = transformPost({ withSections: true });

/**
 * Show how the post appears on the Home and then how it appears in its own page
 * @param {Object} props
 */
const PreviewPost = (props) => (
	<>
		<SectionHomePost {...props} />
		<PostPage {...props} />
	</>
);

/**
 * Get props directly from Prismic
 * @param {Object} context
 * @param {Object} context.params
 * @param {Object} context.previewData
 */
export const getServerSideProps = async ({ params, previewData }) => {
	try {
		// Get the UID of the Post and retrieve it with the Prismic Client
		const uid = params.uid;
		console.log(`Previewing the post ${uid}`);
		const rawPostData = await getPost(uid);
		// Transform the fuck*d up data we get from Prismic
		const niceAndClean = preparePost(rawPostData);

		return {
			props: { ...niceAndClean } // will be passed to the page component as props
		};
	} catch (err) {
		console.error(err);
	}
};

export default PreviewPost;
