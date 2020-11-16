import { getInstance } from "@lib/server/PrismicSDK";
import SliceZone from "next-slicezone";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";

const Page = (props) => <SliceZone {...props} resolver={resolver} />;

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
	client: getInstance(),
	uid: ({ params }) => params.uid
});

export const getStaticPaths = useGetStaticPaths({
	client: getInstance(),
	type: "page",
	fallback: true, // process.env.NODE_ENV === 'development',
	formatPath: ({ uid }) => ({ params: { uid } })
});

export default Page;
