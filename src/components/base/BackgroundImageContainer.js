import Image from "next/image";
import { Box } from "@chakra-ui/react";
import clsx from "clsx";

/**
 *
 * @param {JSXElement} props
 */
const BackgroundImageContainer = ({
	image,
	className,
	width = "100%",
	height = "100%"
}) => {
	if (!image) return null;

	// Calculate the width and height and position to fill the container
	return (
		<Box
			className="background-image-container"
			width={width}
			height={height}
			position="absolute"
			zIndex="-1"
			overflow="hidden"
		>
			<Image
				className={clsx("background-image", className)}
				src={image.url}
				alt={image.alt}
				width={image.width}
				height={image.height}
				objectFit="cover"
				layout="responsive"
			/>
		</Box>
	);
};

export default BackgroundImageContainer;
