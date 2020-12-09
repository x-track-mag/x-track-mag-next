import { Box } from "@chakra-ui/react";
import Container from "@components/base/Container";
import { Subtitle } from "@components/base/Typography";
import MediaPlayer from "@components/players/MediaPlayer";

/**
 * A list of media players
 * @param {JSXElement} props
 * @param {String} props.article the main Article
 * @param {Array} props.playlist
 */
const SectionPlaylist = ({ article, playlist, ...props }) => {
	if (!playlist || playlist.length === 0) return null;
	return (
		<Box as="section" className="section-playlist" {...props}>
			{playlist.map(
				(media, i) =>
					media && (
						<Container className="playlist-container" key={`playlist-${i}`}>
							<Subtitle as="h4">{media.title}</Subtitle>

							<MediaPlayer url={media.url} />
						</Container>
					)
			)}
		</Box>
	);
};

export default SectionPlaylist;
