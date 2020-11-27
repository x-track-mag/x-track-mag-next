import { Box, Flex } from "@chakra-ui/react";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import Typography from "@components/base/Typography";
import Link from "next/link";

Array.prototype.shuffle =
	Array.prototype.shuffle ||
	function () {
		let len = this.length,
			i;
		while (len) {
			i = (Math.random() * len--) >>> 0;
			[this[len], this[i]] = [this[i], this[len]];
		}
		return this;
	};

/**
 * A two columns/responsive container with a rich text column and an image
 * @param {JSXElement} props
 * @param {String} props.uid the current post uid
 * @param {Object} props.selected_reads a selection of posts to read
 */
const SectionSelectedReads = ({ uid, selected_reads = [] }) => (
	<Box as="section" className="section-selected-reads">
		<Typography.Subtitle mb="2rem">A Lire aussi</Typography.Subtitle>
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
							bgColor="gray"
							position="relative"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
						>
							<Link href={`/posts/${read.uid}`}>
								<Typography.Subtitle
									display="block"
									fontSize="2rem"
									textColor="white"
									cursor="pointer"
								>
									{read.title}
								</Typography.Subtitle>
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
