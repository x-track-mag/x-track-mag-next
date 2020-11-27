import { Box, AspectRatio } from "@chakra-ui/react";
import Image from "next/image";
import Typography from "./Typography";

/**
 * Use a Next.JS responsive Image component inside an AspectRatio container
 * @param {JSX.Element} props
 * @param {ImageDescr} props.image
 */
const EmbeddedImage = ({ image, width = "100%", ...more }) => {
	if (!image) return null;

	try {
		return (
			<Box as="figure" margin="1rem auto" {...more}>
				<AspectRatio ratio={image.ratio} width={width}>
					<Image
						className="embedded-image"
						src={image.url}
						alt={image.alt}
						objectFit="cover"
						layout="fill"
					/>
				</AspectRatio>
				{image.alt && (
					<Typography.Caption as="figurecaption">
						{image.alt}
					</Typography.Caption>
				)}
				{image.copyright && (
					<Typography.Caption as="figurecaption">{`© ${image.copyright}`}</Typography.Caption>
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

export default EmbeddedImage;
