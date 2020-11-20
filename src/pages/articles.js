import { getStaticPropsFor, HomePage } from "./index";

/**
 * @TODO: When in preview mode : Fetch content directly from prismic
 * else, read the serialized JSON file that we extracted inside the @content dir
 */
export const getStaticProps = getStaticPropsFor("article");

export default HomePage;
