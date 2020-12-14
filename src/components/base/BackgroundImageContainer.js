import { Box } from "@chakra-ui/react";
import Image from "next/image";
import BackgroundVideo from "react-video-cover";
import { Caption } from "./Typography";

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
	display_credits = false,
	...moreStyle
}) => {
	if (!image && !video_loop) return null;

	return (
		<Box
			as="figure"
			className="background-image-container"
			width={width}
			height={height}
			position="absolute"
			zIndex="-1"
			overflow="hidden"
			{...moreStyle}
		>
			{image && (
				<>
					<Image
						className="background-image"
						src={image.url}
						alt={image.alt + image.copyright ? ` - © ${image.copyright}` : ""}
						objectFit="cover"
						layout="fill"
					/>
					{display_credits && image.alt && (
						<Caption
							as="figurecaption"
							position="absolute"
							zIndex="9"
							bottom="0"
							textColor="white"
						>
							{image.alt}
							{image.copyright && ` - © ${image.copyright}`}
						</Caption>
					)}
				</>
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
