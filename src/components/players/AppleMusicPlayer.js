/**
 * Apple Music URLs specify the title of media (artist, album, song, playlist..)
 * and a media id
 
 * @see https://developer.spotify.com/documentation/widgets/generate/embed/
 * @param {String} shareUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (shareUrl, lang = "fr") => {
	const parts = shareUrl.split(/[\/\:]/);
	const media_id = parts.pop();
	const media_name = parts.pop();
	const media_type = parts.pop();
	return `https://embed.music.apple.com/fr/${media_type}/${media_name}/${media_id}`;
};

/**
 *
 * @param {JSX.Element} props
 * @param {String} url Shared URL
 * @param {String} lang ISO language code of the player
 */
const AppleMusicPlayer = ({ url, width = "100%", height = "580px", lang = "fr" }) =>
	url && (
		<iframe
			src={getEmbedUrl(url, lang)}
			width={width}
			height={height}
			allow="autoplay *; encrypted-media *; fullscreen *"
			frameBorder="0"
			style={{
				overflow: "hidden",
				background: "transparent"
			}}
			sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
		></iframe>
	);

export default AppleMusicPlayer;
