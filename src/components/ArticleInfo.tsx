import { Box, Flex } from "@chakra-ui/react";
import { Tag, VerticalText, navigate } from "@components/base";
import { IconButton, SvgArrowReturn } from "@components/icons";
import { colors } from "@styles/theme.js";
import { FC } from "react";

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

interface ArticleInfoProps {
	position?: "absolute" | "relative" | "fixed";
	displayBackArrow?: boolean;
	author?: string;
	publication_date?: string;
	tags?: string[];
	textColor?: string;
}

/**
 *
 */
const ArticleInfo: FC<ArticleInfoProps> = ({
	position = "absolute",
	displayBackArrow = false,
	author = "",
	publication_date = "",
	tags = [],
	textColor = "black",
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
	>
		{displayBackArrow && <BackArrow />}
		<VerticalText textColor={textColor}>
			{formatDate(publication_date)}
		</VerticalText>
		<VerticalText
			textColor={textColor}
			textTransform="uppercase"
			whiteSpace="nowrap"
		>
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
