import Image from "next/image";
import clsx from "clsx";
import { withViewportSize } from "@components/ViewportSizeProvider";

const settings = {
	stretchMode: "crop",
	centeredX: true,
	centeredY: true
};

/**
 * Recenter image/content on screen as needed
 */
const adjustImagePos = (imageDimensions, viewport) => {
	if (!imageDimensions.ratio) {
		// Do it once and for all
		imageDimensions.ratio = imageDimensions.width / imageDimensions.height;
	}

	const style = {
		position: "absolute",
		left: 0,
		top: 0,
		width: imageDimensions.width,
		height: imageDimensions.height
	};

	if (!viewport) return style; // SSR

	const vW = viewport.width,
		vH = viewport.height;

	// try the usual stretch on $image's width
	var imgRatio = imageDimensions.ratio,
		imgWidth = vW,
		imgHeight = imgWidth / imgRatio;

	if (settings.stretchMode == "crop") {
		if (imgHeight < vH) {
			// stretch the other way
			imgHeight = vH;
			imgWidth = imgHeight * imgRatio;
		}
	} else if (settings.stretchMode == "adapt") {
		if (imgRatio < 1) {
			// $image in portrait mode : stretch the other way
			imgHeight = vH;
			imgWidth = imgHeight * imgRatio;
		}
	} else {
		// fit
		if (imgHeight > vH) {
			imgHeight = vH;
			imgWidth = imgHeight * imgRatio;
		}
	}

	style.width = imgWidth;
	style.height = imgHeight;

	// Center as needed
	if (settings.centeredY) {
		style.left = (vW - imgWidth) / 2 + "px";
	}

	if (settings.centeredX) {
		style.top = (vH - imgHeight) / 2 + "px";
	}

	return style;
}; // adjustImage

/**
 *
 * @param {JSXElement} props
 */
const BackgroundImage = ({ image, className, viewport }) => {
	const imageDimensions = image.dimensions;
	// Calculate the width and height and position to fill the container
	const style = adjustImagePos(imageDimensions, viewport);
	return (
		<div className="background-image-container" style={{ ...style }}>
			<Image
				className={clsx("background-image", className)}
				src={image.url}
				alt={image.alt}
				layout="fill"
			/>
		</div>
	);
};

export default withViewportSize(BackgroundImage);
