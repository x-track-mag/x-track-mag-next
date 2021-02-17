import { Box, Flex } from "@chakra-ui/react";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import { Subtitle } from "@components/base/Typography";
import Link from "next/link";
import ArrayExtensions from "@lib/utils/Arrays"; // this will add the shuffle and move methods to Array prototype

/**
 * A two columns/responsive container with a rich text column and an image
 * @param {JSXElement} props
 * @param {String} props.uid the current post uid
 * @param {Object} props.selected_reads a selection of posts to read
 */
const SectionSelectedReads = ({ uid, selected_reads = [] }) => (
	<Box as="section" className="section-selected-reads">
		<Subtitle mb="2rem">A Lire aussi</Subtitle>
		<Flex
			flexDirection="row"
			alignItems="center"
			justifyContent="center"
			height="30vw"
			width="100%"
		>
			{selected_reads.shuffle().map(
				(read, i) =>
					i < 2 &&
					read.uid !== uid && (
						<Flex
							flexGrow="1"
							key={`read-${i}`}
							width="100%"
							height="100%"
							position="relative"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
						>
							<Link href={`/posts/${read.uid}`}>
								<Subtitle
									fontSize="2rem"
									textColor="white"
									cursor="pointer"
								>
									{read.title}
								</Subtitle>
							</Link>
							<BackgroundImageContainer
								image={read.image}
								video_loop={read.video_loop}
							/>
						</Flex>
					)
			)}
		</Flex>
	</Box>
);

export default SectionSelectedReads;
