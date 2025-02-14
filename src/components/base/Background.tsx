import { FC } from "react";
import { BackgroundImage } from "./BackgroundImage";
import { BackgroundVideo, type BackgroundVideoProps } from "./BackgroundVideo";
import { ImageProps } from "src/data/types";

interface BackgroundProps {
	image?: ImageProps;
	video_loop?: BackgroundVideoProps;
	displayCredits?: boolean;
	className?: string;
}

/**
 * Choose between a cover image or a video loop
 */
export const Background: FC<BackgroundProps> = ({
	image,
	displayCredits,
	video_loop,
	className,
}) => (
	<>
		{image && (
			<BackgroundImage
				className={className}
				image={image}
				displayCredits={displayCredits}
			/>
		)}
		{video_loop && (
			<BackgroundVideo className={className} url={video_loop.url} />
		)}
	</>
);
