/**
 * Spotify URLs specify the title of media (artist, album, song, playlist..)
 * and a media id
 * @see https://developer.spotify.com/documentation/widgets/generate/embed/
 * @param {String} originUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (originUrl) => {
	const parts = originUrl.split(/[\/\:]/);
	const media_id = parts.pop();
	const media_type = parts.pop();
	return `https://open.spotify.com/embed/${media_type}/${media_id}`;
};

const SpotifyPlayer = ({ url, title = "", width = "100%", height = "600px" }) =>
	url && (
		<iframe
			width={width}
			height={height}
			allowtransparency="true"
			frameborder="0"
			allow="encrypted-media"
			title={title}
			src={getEmbedUrl(url)}
		></iframe>
	);

export default SpotifyPlayer;
