import { Box } from "@chakra-ui/react";
import Container from "@components/base/Container";
import Typography from "@components/base/Typography";
import MediaPlayer from "@components/players/MediaPlayer";

/**
 * A list of media players
 * @param {JSXElement} props
 * @param {String} props.article the main Article
 * @param {Array} props.playlist
 */
const SectionPlaylist = ({ article, playlist, ...props }) => (
	<Box as="section" className="section-playlist" {...props}>
		{playlist.map((media, i) => (
			<Container className="playlist-container" key={`playlist-${i}`}>
				<Typography.Subtitle textColor="black">{media.title}</Typography.Subtitle>

				<MediaPlayer url={media.url} />
			</Container>
		))}
	</Box>
);

export default SectionPlaylist;
