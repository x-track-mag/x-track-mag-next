import { Container } from "@chakra-ui/react";
import Typography from "@components/base/Typography";

const HeroText = ({ title = "--blank--", subtitle = "", ...moreStyles }) => {
	return (
		<Container variant="hero" centerContent p="2rem">
			{title && title !== "--blank--" && (
				<Typography.Title {...moreStyles}>{title}</Typography.Title>
			)}
			{subtitle && subtitle !== "--blank--" && (
				<Typography.Subtitle {...moreStyles}>{subtitle}</Typography.Subtitle>
			)}
		</Container>
	);
};

export default HeroText;
