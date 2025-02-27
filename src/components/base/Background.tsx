import { FC } from "react";
import { BackgroundImage } from "./BackgroundImage";
import { BackgroundVideo, type BackgroundVideoProps } from "./BackgroundVideo";
import { ImageProps } from "src/data/types";

interface BackgroundProps {
	image?: ImageProps;
	video_loop?: BackgroundVideoProps;
	displayCredits?: boolean;
	priority?: boolean;
	className?: string;
}

/**
 * Choose between a cover image or a video loop
 */
export const Background: FC<BackgroundProps> = ({
	image,
	displayCredits,
	priority,
	video_loop,
	className,
}) => (
	<>
		{image && (
			<BackgroundImage
				className={className}
				image={image}
				displayCredits={displayCredits}
				priority={priority}
			/>
		)}
		{video_loop && (
			<BackgroundVideo className={className} url={video_loop.url} />
		)}
	</>
);
