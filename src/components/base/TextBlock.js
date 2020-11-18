import { RichText } from "prismic-reactjs";
import { Box } from "theme-ui";

const TextBlock = ({ title, subtitle, ...props }) => {
	return (
		<Box __themeKey="container" {...props}>
			<RichText render={title} />
			<RichText render={description} />
		</Box>
	);
};

export default TextBlock;
