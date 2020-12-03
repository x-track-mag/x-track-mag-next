/**
 * Spotify URLs specify the title of media (artist, album, song, playlist..)
 * and a media id
 * @see https://developer.spotify.com/documentation/widgets/generate/embed/
 * @param {String} shareUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (shareUrl) => {
	const parts = shareUrl.split("?")[0].split(/[\/\:]/);
	const media_id = parts.pop();
	const media_type = parts.pop();
	return `https://open.spotify.com/embed/${media_type}/${media_id}`;
};

const SpotifyPlayer = ({ url, title = "", width = "100%", height = "580px" }) =>
	url && (
		<iframe
			src={getEmbedUrl(url)}
			title={title}
			width={width}
			height={height}
			allowtransparency="true"
			frameBorder="0"
			allow="encrypted-media"
		></iframe>
	);

export default SpotifyPlayer;
