import { FC } from "react";
import { VideoLoopProps } from "src/data/types";

const backgroundStyle = {
	position: "absolute",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	zIndex: "-1",
} as const;

export interface BackgroundVideoProps extends VideoLoopProps {
	className?: string;
	autoPlay?: boolean;
	loop?: boolean;
}

export const BackgroundVideo: FC<BackgroundVideoProps> = ({
	url,
	autoPlay = true,
	loop = true,
	className,
}) => {
	if (!url) {
		return null;
	}

	return (
		<video
			className={className}
			src={url}
			autoPlay={autoPlay}
			loop={loop}
			muted
			playsInline
			style={backgroundStyle}
		/>
	);
};
