/**
 * BandCampPlayer URLs are super easy to embed
 * @example https://sorrybanduk.bandcamp.com/media_type/media_id
 *          https://bandcamp.com/EmbeddedPlayer/${media_type}=${media_id}
 * @param {String} shareUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (shareUrl) => {
	const parts = shareUrl.split("/");
	const media_id = parts.pop();
	const media_type = parts.pop();
	return `https://bandcamp.com/EmbeddedPlayer/${media_type}=${media_id}/size=large/bgcol=ffffff/linkcol=63b2cc/tracklist=true/artwork=small/transparent=true/"`;
};

const BandCampPlayer = ({ url, title = "", width = "100%", height = "800px" }) =>
	url && (
		<iframe
			width={width}
			height={height}
			frameBorder="0"
			seamless
			src={getEmbedUrl(url)}
		>
			<a href={url}>{title}</a>
		</iframe>
	);

export default BandCampPlayer;
