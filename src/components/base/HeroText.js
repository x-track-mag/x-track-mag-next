import { Container } from "@chakra-ui/react";
import Typography from "@components/base/Typography";

const HeroText = ({ title = "", subtitle = "", ...moreStyles }) => {
	return (
		<Container variant="hero" centerContent p="2em">
			<Typography.Title {...moreStyles}>{title}</Typography.Title>
			{subtitle && (
				<Typography.Subtitle {...moreStyles}>{subtitle}</Typography.Subtitle>
			)}
		</Container>
	);
};

export default HeroText;
