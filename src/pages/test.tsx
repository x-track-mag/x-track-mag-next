import { Box, VStack } from "@chakra-ui/react";
import { BackgroundImage } from "@components/base/BackgroundImage";
import { BackgroundVideo } from "@components/base/BackgroundVideo";
import { Caption } from "@components/base/Typography";
import { useElementSize } from "@custom-react-hooks/use-element-size";

const TestPage = () => {
	const [ref, size] = useElementSize();

	const bgImage = {
		url: "/img/Chung-Ha-2560x1440.png",
		width: 2560,
		height: 1440,
		alt: "CHUNG HA",
	};

	return (
		<main>
			<VStack
				as="section"
				width="100%"
				bgColor="orange"
				minHeight="50vh"
				position="relative"
				alignItems="center"
				justifyContent="center"
				ref={ref}
				id="with-dimensions"
			>
				<Caption
					textColor="white"
					fontWeight="bolder"
					fontSize="4rem"
				>{`${size.width}x${size.height} (px)`}</Caption>
			</VStack>

			<Box
				as="section"
				width="100%"
				minHeight="70vh"
				position="relative"
				id="with-dimensions"
			>
				<BackgroundImage image={bgImage} />
			</Box>

			<VStack
				as="section"
				width="100%"
				minHeight="80vh"
				alignItems="center"
				justifyContent="center"
			>
				<BackgroundVideo url="https://x-track-mag.cdn.prismic.io/x-track-mag/Zt2bYxoQrfVKl0dZ_NiaSmith.mp4" />
				<Caption textColor="white" fontWeight="bolder" fontSize="4rem">
					NIA SMITH
				</Caption>
			</VStack>
		</main>
	);
};

export default TestPage;
