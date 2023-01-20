/**
 * Deezer URLs specify the title of media (artist, album, song, playlist..)
 * and a media id
 * Examples :
 *  - https://www.deezer.com/us/playlist/4099699282
 *  - https://www.deezer.com/us/album/136087932
 * @see https://developers.deezer.com/musicplugins/player?type=playlist&id=4099699282
 * @param {String} shareUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (shareUrl) => {
	const parts = shareUrl.split("?")[0].split(/[\/\:]/);
	const media_id = parts.pop();
	const media_type = parts.pop();

	return `https://widget.deezer.com/widget/dark/${media_type}/${media_id}`;
};

const DeezerPlayer = ({ url, title = "", width = "100%", height = "420px" }) =>
	url && (
		<iframe
			src={getEmbedUrl(url)}
			title={title}
			width={width}
			height={height}
			allowtransparency="true"
			frameborder="0"
			allow="encrypted-media; clipboard-write"
		></iframe>
	);

export default DeezerPlayer;
