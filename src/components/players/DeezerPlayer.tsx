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
export const getEmbedDeezerUrl = (shareUrl) => {
	const parts = shareUrl.split("?")[0].split(/[\/\:]/);
	const media_id = parts.pop();
	const media_type = parts.pop();

	return `https://widget.deezer.com/widget/dark/${media_type}/${media_id}`;
};

export const DeezerPlayer = ({
	url,
	title = "",
	width = "100%",
	height = "370px",
}) =>
	url && (
		<iframe
			src={getEmbedDeezerUrl(url)}
			title={title}
			width={width}
			height={height}
			allowTransparency={true}
			frameBorder="0"
			allow="encrypted-media; clipboard-write"
		></iframe>
	);
