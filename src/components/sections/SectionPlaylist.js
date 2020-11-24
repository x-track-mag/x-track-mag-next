import { Box } from "@chakra-ui/react";
import Container from "@components/base/Container";
import Typography from "@components/base/Typography";
import ReactPlayer from "react-player";

const buildPlayer = ({ link }, i) => (
	<Container className="playlist-container" key={`playlist-${i}`}>
		<Typography.Subtitle textColor="black">{link.title}</Typography.Subtitle>

		<ReactPlayer
			url={link.embed_url}
			width="100%"
			height={link.height}
			config={{
				youtube: {
					playerVars: {
						autoplay: 1,
						loop: 1,
						modestbranding: 1,
						hl: "fr"
					}
				}
			}}
		/>
	</Container>
);

/**
 * A list of media players
 * @param {JSXElement} props
 * @param {String} props.article the main Article
 * @param {String} props.playlist the rich text content to describe the video
 */
const SectionPlaylist = ({ article, playlist, ...props }) => (
	<Box as="section" className="section-playlist" {...props}>
		{playlist.map(buildPlayer)}
	</Box>
);

export default SectionPlaylist;
