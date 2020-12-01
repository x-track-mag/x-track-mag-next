/**
 * OpenWhyd URLs are super easy to embed but they don't play when they lose focus..
 * @example https://openwhyd.org/u/520122f77e91c862b2af9625/playlist/14
 *          https://openwhyd.org/u/520122f77e91c862b2af9625/playlist/14?format=embedV2&embedW=480
 * @param {String} originUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (originUrl, width) => {
	return `${originUrl}?format=embedV2&embedW=${width}`;
};

const OpenWhydPlayer = ({ url, title = "", width = "100%", height = "800px" }) =>
	url && (
		<iframe
			width={width}
			height={height}
			frameBorder="0"
			src={getEmbedUrl(url)}
		></iframe>
	);

export default OpenWhydPlayer;
