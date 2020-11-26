import { Box } from "@chakra-ui/react";
import Image from "next/image";
import ReactPlayer from "react-player/file";

/**
 * Use a Next.JS responsive Image component to fill and cover
 * exactly like a background image would do
 * Note : The BackgroundImageContainer must be used inside
 * a parent container with intrisic dimensions and positioning enabled
 * (eg. : position relative)
 * @param {JSXElement} props
 * @param {ImageDescr} props.image
 * @param {VideoDescr} props.video_loop
 * @param {CSSDimension} [props.width="100%"]
 * @param {CSSDimension} [props.height="100%"]
 */
const BackgroundImageContainer = ({
	image,
	video_loop,
	width = "100%",
	height = "100%",
	...moreStyle
}) => {
	if (!image && !video_loop) return null;

	// Calculate the width and height and position to fill the container
	return (
		<Box
			className="background-image-container"
			width={width}
			height={height}
			position="absolute"
			zIndex="-1"
			overflow="hidden"
			{...moreStyle}
		>
			{image && (
				<Image
					className="background-image"
					src={image.url}
					alt={image.alt}
					objectFit="cover"
					layout="fill"
				/>
			)}
			{video_loop && (
				<ReactPlayer
					url={video_loop.url}
					width="100%"
					height="100%"
					playing={true}
					loop={true}
					volume={0}
					style={{ objectFit: "cover" }}
				/>
			)}
		</Box>
	);
};

export default BackgroundImageContainer;
