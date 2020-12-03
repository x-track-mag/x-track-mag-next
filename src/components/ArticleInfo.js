import { Box, Flex } from "@chakra-ui/react";
import { Tag, VerticalText } from "@components/base/Typography";
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
	tags = [],
	textColor = "black",
	...overrideStyle
}) => (
	<Flex
		as="aside"
		position={position}
		zIndex="9"
		top="4rem"
		bottom={position === "absolute" ? "1rem" : "4rem"} // position absolute is used inside a section
		right="2rem"
		width="1rem"
		flexDirection="column"
		justifyContent="space-between"
		alignContent="stretch"
		alignItems="flex-end"
		{...overrideStyle}
	>
		{displayBackArrow && <BackArrow />}
		<VerticalText textColor={textColor}>{formatDate(publication_date)}</VerticalText>
		<VerticalText textColor={textColor} textTransform="uppercase" whiteSpace="nowrap">
			{author}
		</VerticalText>
		<div className="tags">
			{tags.map((tag) => (
				<Tag key={tag} textColor={textColor}>
					{tag}
				</Tag>
			))}
		</div>
	</Flex>
);

export default ArticleInfo;
