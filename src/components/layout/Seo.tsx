import Head from "next/head";

export const SeoMeta = ({
	title = "PAGE TITLE",
	description = "<description>",
	url,
	image,
	facebookAppId = "",
	twitterAccount = "",
}) => (
	<Head>
		<title>{title}</title>
		<meta name="description" content={description} />
		{/* OpenGraph tags */}
		<meta name="og:url" content={url} />
		<meta name="og:title" content={title} />
		<meta name="og:description" content={description} />
		<meta name="og:image" content={image} />
		<meta name="og:type" content="website" />
		{facebookAppId && <meta name="fb:app_id" content={facebookAppId} />}
		{/* Twitter Card tags */}
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
		<meta name="twitter:card" content="summary" />
		{twitterAccount && (
			<meta name="twitter:creator" content={twitterAccount} />
		)}
	</Head>
);
