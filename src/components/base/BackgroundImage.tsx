import { FC } from "react";
import { Box } from "@chakra-ui/react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { Caption } from "./Typography";
import { clsx } from "clsx";
import { ImageProps } from "src/data/types";
import { basename, extname } from "path";

const backgroundStyle = {
	position: "absolute",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	zIndex: "-1",
} as const;

interface BackgroundImageProps extends Omit<NextImageProps, "src" | "alt"> {
	image: ImageProps;
	// Display the figcaption showing the credits for a photograph
	displayCredits?: boolean;
	className?: string;
}

const extractImageName = (url: string) => {
	const ext = extname(url);
	let fileName = basename(url, ext).trim();
	return fileName.split("_").pop();
};

/**
 * Merge together the title and the copyright mentions of the image
 * @param {ImageProps} image:
 */
const figureCredits = ({ url, alt = "", copyright = "" }: ImageProps) => {
	let credits = alt;
	if (copyright) {
		credits = !credits ? `© ${copyright}` : `${credits} - © ${copyright}`;
	}
	if (!credits) {
		credits = extractImageName(url);
	}
	return credits;
};

/**
 * The parent container must use the relative positionning to allow this
 * image to fit its size
 * @param {BackgroundImageProps} props
 */
export const BackgroundImage: FC<BackgroundImageProps> = ({
	image,
	displayCredits = false,
	className,
	// capture other NextImageProps
	...more
}) => {
	const credits = figureCredits(image);
	return (
		<Box
			as="figure"
			className="background-image-container"
			// fit inside container's size
			position="absolute"
			width="100%"
			height="100%"
			zIndex="-1"
			overflow="hidden"
		>
			<NextImage
				className={clsx("background-image", className)}
				src={image.url}
				alt={credits}
				width={image.width}
				height={image.height}
				sizes="100vw"
				style={backgroundStyle}
				{...more}
			/>

			{displayCredits && (
				<Caption
					as="figcaption"
					position="absolute"
					zIndex="9"
					bottom="0"
					textColor="white"
				>
					{credits}
				</Caption>
			)}
		</Box>
	);
};
