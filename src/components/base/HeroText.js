import { Container } from "@chakra-ui/react";
import { Title, Subtitle } from "@components/base/Typography";

const HeroText = ({ title = "--blank--", subtitle = "", ...moreStyles }) => {
	return (
		<Container variant="hero" centerContent p="2rem">
			{title && title !== "--blank--" && <Title {...moreStyles}>{title}</Title>}
			{subtitle && subtitle !== "--blank--" && (
				<Subtitle {...moreStyles}>{subtitle}</Subtitle>
			)}
		</Container>
	);
};

export default HeroText;
