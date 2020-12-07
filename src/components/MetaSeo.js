import Head from "next/head";
import { useRouter } from "next/router";
import path from "path";

const MetaSEO = ({
	keywords,
	tags = [],
	title = "ACCUEIL",
	baseUrl = "https://x-track-mag.fr",
	publication_date,
	description = "",
	author = "X-TRACK MAG",
	lang = "fr",
	image
}) => {
	title = `X-TRACK MAG - ${title}`;
	const router = useRouter();
	const canonicalUrl = path.join(baseUrl, router.asPath);
	const isArticle = tags.find((t) => t === "article");
	return (
		<Head>
			<title>{title}</title>
			<link rel="canonical" href={canonicalUrl} />

			<meta name="robots" key="robots" content="index,follow" />
			<meta name="application-name" content="X-TRACK MAG"></meta>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords || tags} />
			<meta name="lang" content={lang} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content="X-TRACK MAG" />
			<meta property="og:url" content={canonicalUrl} />
			{image && <meta property="og:image" content={image.url} />}

			<meta property="og:type" content={isArticle ? "article" : "website"} />
			{isArticle && (
				<meta property="article:modified_time" content={publication_date} />
			)}
			{isArticle && author && (
				<meta key="article:author" property="article:author" content={author} />
			)}

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@x-track-mag" />
			{author && <meta name="twitter:creator" content={author} />}

			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/img/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/img/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/img/favicon-16x16.png"
			/>
			<link rel="manifest" href="/img/site.webmanifest" />
			<link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#5bbad5" />
			<link rel="shortcut icon" href="/img/favicon.ico" />
			<meta name="msapplication-TileColor" content="#ffc40d" />
			<meta name="msapplication-config" content="/img/browserconfig.xml" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
	);
};
export default MetaSEO;
