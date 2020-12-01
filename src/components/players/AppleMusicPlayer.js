/**
 * Apple Music URLs specify the title of media (artist, album, song, playlist..)
 * and a media id
 
 * @see https://developer.spotify.com/documentation/widgets/generate/embed/
 * @param {String} originUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (originUrl, lang = "fr") => {
	const parts = originUrl.split(/[\/\:]/);
	const media_id = parts.pop();
	const media_name = parts.pop();
	const media_type = parts.pop();
	return `https://embed.music.apple.com/fr/${media_type}/${media_name}/${media_id}`;
};

const AppleMusicPlayer = ({ url, lang = "fr", width = "100%", height = "600px" }) =>
	url && (
		<iframe
			allow="autoplay *; encrypted-media *; fullscreen *"
			frameborder="0"
			height={height}
			style={{
				width: width,
				overflow: "hidden",
				background: "transparent"
			}}
			sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
			src={getEmbedUrl(url, lang)}
		></iframe>
	);

export default AppleMusicPlayer;
