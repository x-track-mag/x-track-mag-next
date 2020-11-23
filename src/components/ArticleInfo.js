import { Box, Text, Flex } from "@chakra-ui/react";
import Typography from "@components/base/Typography";
import SvgArrowReturn from "@components/icons/SvgArrowReturn.js";
import IconButton from "@components/icons/IconButton.js";
import { colors } from "@styles/theme.js";
import { navigate } from "@components/base/Links";

const BackArrow = () => (
	<Box as="a" onClick={navigate("back")} cursor="pointer">
		<IconButton
			size="4rem"
			SvgIcon={SvgArrowReturn}
			color="black"
			colorHover={`${colors.brand.green}`}
		/>
	</Box>
);

const formatDate = (ISODate) => {
	if (!ISODate) return "";
	const [year, month, day] = ISODate.split("T")[0].split("-");
	return `${day}/${month}/${year}`;
};

/**
 *
 * @param {JSXElement} props
 * @param {Boolean} [props.displayBackArrow=false] Display the BACK Arrow navigation
 * @param {String} props.author
 * @param {ISODate} props.publication_date
 * @param {Array<String>} props.tags
 */
const ArticleInfo = ({
	position = "absolute",
	displayBackArrow = false,
	author = "",
	publication_date = "",
	tags = []
}) => (
	<Flex
		position={position}
		zIndex="9999"
		top="6rem"
		bottom="5rem"
		right="2rem"
		width="1rem"
		flexDirection="column"
		justifyContent="space-between"
		alignContent="stretch"
		alignItems="flex-end"
	>
		{displayBackArrow && <BackArrow />}
		<Text
			as="div"
			textAlign="right"
			transform="rotate(-90deg) translateX(100%)"
			transformOrigin="100% 100%"
		>
			{formatDate(publication_date)}
		</Text>
		<Text
			as="div"
			textTransform="uppercase"
			transform="rotate(-90deg) translateX(50%)"
			transformOrigin="100% 100%"
			whiteSpace="nowrap"
		>
			{author}
		</Text>
		<div className="tags">
			{tags.map((tag) => (
				<Typography.Tag key={tag}>{tag}</Typography.Tag>
			))}
		</div>
	</Flex>
);

export default ArticleInfo;
