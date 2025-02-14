import ReactPlayer from "react-player";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { AppleMusicPlayer } from "./AppleMusicPlayer";
import { BandCampPlayer } from "./BandCampPlayer";
import { DeezerPlayer } from "./DeezerPlayer";
import { OpenWhydPlayer } from "./OpenWhydPlayer";
import { YoutubePlayer } from "./YoutubePlayer";
import { AspectRatio } from "@chakra-ui/react";
import { calcRatio } from "@lib/utils/ratio";

const RawMediaPlayer = ({ url, ...more }) => {
	if (!url) return null;

	if (!url.startsWith("https")) {
		return (
			<div>
				<code>{url}</code> is not a valid media link. Use the shareable
				link to the media you want to share
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
						hl: "fr",
					},
				},
			}}
		/>
	);
};

export const MediaPlayer = ({ url, ratio = "16/9", ...props }) => (
	<AspectRatio ratio={calcRatio(ratio)} width="100%">
		<RawMediaPlayer url={url} {...props} />
	</AspectRatio>
);
