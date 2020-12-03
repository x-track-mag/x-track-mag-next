import { AspectRatio } from "@chakra-ui/react";

String.prototype.contains =
	String.prototype.contains ||
	function (str) {
		return this.indexOf(str) !== -1;
	};

/**
 * Youtube share URLs comes in a variety of formats
 * Examples :
 *  - https://www.youtube.com/playlist?list=PLLJkxWPTDgMBJHn5KGmHj3hjzGOTjgKQF
 *  - https://www.youtube.com/watch?v=w83pC4rGGFM
 *  - https://youtu.be/_gI1l-kXa2c
 * @see https://developers.deezer.com/musicplugins/player?type=playlist&id=4099699282
 * @param {String} shareUrl
 * @return {String} the embed URL for the iframe
 */
export const getEmbedUrl = (shareUrl) => {
	if (!shareUrl) return null;
	if (shareUrl.contains("playlist")) {
		const parsedUrl = new URL(shareUrl);
		const playlistId = parsedUrl.searchParams.get("list");
		return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
	} else if (shareUrl.contains("watch")) {
		const parsedUrl = new URL(shareUrl);
		const videoId = parsedUrl.searchParams.get("v");
		return `https://www.youtube.com/embed/${videoId}`;
	} else {
		// That's a single video
		const parts = shareUrl.split("/");
		const videoId = parts.pop();
		return `https://www.youtube.com/embed/${videoId}`;
	}
};

const YoutubePlayer = ({ url, title = "", width = "100%" }) =>
	url && (
		<AspectRatio ratio={16 / 9} width={width}>
			<iframe
				src={getEmbedUrl(url)}
				title={title}
				width="100%"
				height="100%"
				frameBorder="0"
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
				allowFullScreen
			></iframe>
		</AspectRatio>
	);

export default YoutubePlayer;
