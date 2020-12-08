import { getInstance } from "@lib/clients/PrismicClient";

function linkResolver(doc) {
	// Pretty URLs for known types
	if (doc.type === "post") {
		return `/preview/posts/${doc.uid}`;
	}

	// Fallback for other types, in case new custom types get created
	return `/preview/${doc.uid}`;
}

/**
 * That's where the Prismic CMS will look for the real preview URL
 * We'll set the preview mode in Next.js
 * @param {*} req
 * @param {*} resp
 */
export default async function preview(req, resp) {
	const { token, documentId } = req.query;
	const client = getInstance();

	console.log(JSON.stringify(req.query, null, "\t"));

	// Check the token parameter against the Prismic SDK
	const url = await client
		.getPreviewResolver(token, documentId)
		.resolve(linkResolver, "/");

	if (!url) {
		return resp.status(401).json({ message: "Invalid token" });
	}

	// Enable Preview Mode by setting the cookies
	resp.setPreviewData({
		token // pass the token in the preview data to enable to request the draft
	});

	// Redirect the user to the share endpoint from same origin. This is
	// necessary due to a Chrome bug:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=696204
	resp.write(
		`<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
	);

	resp.end();
}
