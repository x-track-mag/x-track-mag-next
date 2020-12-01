import SpotifyPlayer from "./SpotifyPlayer.js";
import AppleMusicPlayer from "./AppleMusicPlayer.js";
import OpenWhydPlayer from "./OpenWhydPlayer.js";
import BandCampPlayer from "./BandCampPlayer.js";
import ReactPlayer from "react-player";
import { AspectRatio } from "@chakra-ui/react";

const MediaPlayer = ({ url, ...more }) => {
	if (!url) return null;

	if (!url.startsWith("https")) {
		return (
			<div>
				<code>{url}</code> is not a valid media link. Use the shareable link to
				the media you want to share
			</div>
		);
	}

	if (/spotify/.test(url)) {
		return <SpotifyPlayer url={url} {...more} />;
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
		<AspectRatio ratio={16 / 9} width="100%">
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
		</AspectRatio>
	);
};

export default MediaPlayer;
