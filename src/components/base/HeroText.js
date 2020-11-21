import { Container } from "@chakra-ui/react";
import Typography from "@components/base/Typography";

const HeroText = ({ title, subtitle, ...props }) => {
	return (
		<Container variant="hero" centerContent p="2em" {...props}>
			<Typography.Title>{title}</Typography.Title>
			{subtitle && <Typography.Subtitle>{subtitle}</Typography.Subtitle>}
		</Container>
	);
};

export default HeroText;
