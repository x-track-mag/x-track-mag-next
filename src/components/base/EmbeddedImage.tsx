import { Box, AspectRatio } from "@chakra-ui/react";
import NextImage from "next/image";
import { Caption } from "./Typography";

/**
 * Use a Next.JS responsive Image component inside an AspectRatio container
 * @param {JSX.Element} props
 * @param {ImageDescr} props.image
 */
export const EmbeddedImage = ({ image, width = "100%", ...more }) => {
	if (!image) return null;

	try {
		return (
			<Box as="figure" {...more}>
				<AspectRatio ratio={image.ratio} width={width}>
					<NextImage
						className="embedded-image"
						src={image.url}
						alt={image.alt}
						priority={false}
						loading="lazy"
						style={{ objectFit: "cover" }}
						sizes="60vw"
						fill
					/>
				</AspectRatio>
				{image.alt && <Caption as="figcaption">{image.alt}</Caption>}
				{image.copyright && (
					<Caption as="figcaption">{`© ${image.copyright}`}</Caption>
				)}
			</Box>
		);
	} catch (error) {
		return (
			<pre>
				<code>{JSON.stringify(error)}</code>
			</pre>
		);
	}
};
