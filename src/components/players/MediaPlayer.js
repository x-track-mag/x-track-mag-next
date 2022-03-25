import SpotifyPlayer from "./SpotifyPlayer.js";
import AppleMusicPlayer from "./AppleMusicPlayer.js";
import BandCampPlayer from "./BandCampPlayer.js";
import DeezerPlayer from "./DeezerPlayer.js";
import OpenWhydPlayer from "./OpenWhydPlayer.js";
import YoutubePlayer from "./YoutubePlayer.js";
import ReactPlayer from "react-player";
import { AspectRatio } from "@chakra-ui/react";
import { calcRatio } from "@lib/utils/ratio.js";

const RawMediaPlayer = ({ url, ...more }) => {
	if (!url) return null;

	if (!url.startsWith("https")) {
		return (
			<div>
				<code>{url}</code> is not a valid media link. Use the shareable link to
				the media you want to share
			</div>
		);
	}

	if (/youtu/.test(url)) {
		return <YoutubePlayer url={url} {...more} />;
	}

	if (/spotify/.test(url)) {
		return <SpotifyPlayer url={url} {...more} />;
	}

	if (/deezer/.test(url)) {
		return <DeezerPlayer url={url} {...more} />;
	}

	if (/apple/.test(url)) {
		return <AppleMusicPlayer url={url} {...more} />;
	}

	if (/bandcamp/.test(url)) {
		return <BandCampPlayer url={url} {...more} />;
	}

	if (/openwhyd/.test(url)) {
		return <OpenWhydPlayer url={url} {...more} />;
	}

	return (
		<ReactPlayer
			url={url}
			width="100%"
			height="100%"
			config={{
				youtube: {
					playerVars: {
						autoplay: 0,
						loop: 1,
						modestbranding: 1,
						hl: "fr"
					}
				}
			}}
		/>
	);
};

const MediaPlayer = ({ ratio = "16/9", ...props }) => (
	<AspectRatio ratio={calcRatio(ratio)} width="100%">
		<RawMediaPlayer {...props} />
	</AspectRatio>
);

export default MediaPlayer;
