import Head from "next/head";
import { useRouter } from "next/router";

const MetaSEO = ({
	keywords,
	tags = [],
	title = "ACCUEIL",
	description = "",
	author = "X-TRACK MAG",
	lang = "fr",
	sections,
	image
}) => {
	title = `X-TRACK MAG - ${title}`;
	const router = useRouter();
	const canonicalUrl = router.pathname;
	const isArticle = tags.find((t) => t === "article");
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords || tags} />
			<meta name="lang" content={lang} />

			<meta property="og:type" content="article" />
			<meta name="og:title" property="og:title" content={title} />
			<meta name="og:description" property="og:description" content={description} />
			<meta property="og:site_name" content="X-TRACK MAG" />
			<meta property="og:url" content={canonicalUrl} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content="X-TRACK MAG" />
			{author && <meta name="twitter:creator" content={author} />}

			<link rel="icon" type="image/png" href="/images/favicon.ico" />
			<link rel="apple-touch-icon" href="/static/images/favicon.ico" />

			{image && <meta property="og:image" content={image.url} />}
			{image && <meta name="twitter:image" content={image.url} />}

			<link rel="canonical" href={canonicalUrl} />
		</Head>
	);
};
export default MetaSEO;
