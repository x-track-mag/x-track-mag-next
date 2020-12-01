import { Box } from "@chakra-ui/react";
import Image from "next/image";
import BackgroundVideo from "react-video-cover";
import useInView from "react-cool-inview";
import useDimensions from "react-cool-dimensions";

/**
 * @typedef ImageDescr
 * @field {String} url
 * @field {Number} width
 * @field {Number} height
 * @field {Number} ratio
 * @field {String} alt
 * @field {String} copyright
 */

/**
 * Use a Next.JS responsive Image component to fill and cover
 * exactly like a background image would do
 * Note : The BackgroundImageContainer must be used inside
 * a parent container with intrisic dimensions and positioning enabled
 * (eg. : position relative)
 * @param {JSXElement} props
 * @param {ImageDescr} props.image
 * @param {VideoDescr} [props.video_loop]
 * @param {CSSDimension} [props.width="100%"] Width of the image container
 * @param {CSSDimension} [props.height="100%"] Height of the image container
 */
const BackgroundImageContainer = ({
	image,
	video_loop,
	width = "100%",
	height = "100%",
	...moreStyle
}) => {
	const { refInview, inView } = useInView({
		threshold: 1
	});
	const { width: containerWidth, height: containerHeight } = useDimensions(refInview);

	if (!image && !video_loop) return null;

	// Calculate the width and height and position to fill the container
	return (
		<Box
			className="background-image-container"
			ref={refInview}
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
			{!image && video_loop && (
				<BackgroundVideo
					videoOptions={{
						src: video_loop.url,
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true
					}}
					remeasureOnWindowResize
				/>
			)}
		</Box>
	);
};

export default BackgroundImageContainer;
