import { useState } from "react";
import clsx from "clsx";
import { useViewportSize } from "@components/ViewportSizeProvider";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import HeroText from "@components/base/HeroText";

import { HeroLink } from "@components/base/Links";
import ArticleInfo from "@components/ArticleInfo";
import Typography from "@components/base/Typography";
import Container from "@components/base/Container";
import { Box, Grid, GridItem, AspectRatio, Flex } from "@chakra-ui/react";
import Image from "next/image";

/**
 * Use the first template to display the post entry
    displayImage: true,
    displayTitle: true,
    displaySubtitle: true,
    displayInfo: true,
    focusOnHover: true,
    displayFooter: false
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template1 = ({
	uid,
	title = "",
	subtitle = "",
	image,
	video_loop,
	...articleInfo
}) => {
	const [blurred, setBlurred] = useState(false);

	return (
		<section
			className={clsx("hero-section", "template1", blurred && "blurred")}
			onMouseEnter={() => setBlurred(true)}
			onMouseLeave={() => setBlurred(false)}
			key={uid}
			id={uid}
		>
			<BackgroundImageContainer image={image} video_loop={video_loop} />
			<ArticleInfo
				position="absolute"
				{...articleInfo}
				bottom="1rem"
				top="12rem"
				textColor="white"
			/>
			<HeroLink href={uid}>
				<HeroText title={title} subtitle={subtitle} textColor="white" />
			</HeroLink>
		</section>
	);
};

/**
 * Use the first template to display the post entry
    displayImage: true,
    displayTitle: true,
    displaySubtitle: false,
    displayInfo: true,
    focusOnHover: true,
    displayFooter: false
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template2 = ({
	uid,
	title = "",
	subtitle = "",
	image,
	video_loop,
	...articleInfo
}) => {
	const [blurred, setBlurred] = useState(false);

	return (
		<section
			className={clsx("hero-section", "template2", blurred && "blurred")}
			key={uid}
			id={uid}
		>
			<BackgroundImageContainer image={image} video_loop={video_loop} />
			<ArticleInfo
				position="absolute"
				{...articleInfo}
				bottom="1rem"
				top="12rem"
				textColor="white"
			/>
			<HeroLink
				href={uid}
				onMouseEnter={() => setBlurred(true)}
				onMouseLeave={() => setBlurred(false)}
			>
				<HeroText title={title} textColor="white" />
			</HeroLink>
		</section>
	);
};

/**
 * Use the third template to display the post entry
    displayImage: true,
    displayTitle: true,
    displaySubtitle: false,
    displayInfo: false,
    focusOnHover: true,
    displayFooter: false
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template3 = ({ uid, title = "", image, video_loop }) => {
	const [blurred, setBlurred] = useState(false);

	return (
		<section
			className={clsx("hero-section", "template3", blurred && "blurred")}
			key={uid}
			id={uid}
		>
			<BackgroundImageContainer image={image} video_loop={video_loop} />
			<HeroLink
				href={uid}
				onMouseEnter={() => setBlurred(true)}
				onMouseLeave={() => setBlurred(false)}
			>
				<HeroText
					title={title}
					textColor="white"
					fontSize="5rem"
					fontStyle="italic"
					lineHeight="1em"
				/>
			</HeroLink>
		</section>
	);
};

/**
 * Use the fourth template to display the post entry
    displayImage: true,
    displayTitle: true,
    displaySubtitle: false,
    displayInfo: false,
    focusOnHover: false,
    displayFooter: true
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template4 = ({ uid, title = "", image, video_loop }) => {
	return (
		<HeroLink href={uid}>
			<Flex
				as="section"
				flexDirection="column"
				alignContent="stretch"
				className={clsx("hero-section", "template4")}
				key={uid}
				id={uid}
			>
				<BackgroundImageContainer
					image={image}
					video_loop={video_loop}
					flexGrow="1"
					width="100%"
					position="relative"
				/>
				<Box as="footer" height="4.5rem" flexGrow="0" pt="0.5rem" width="100%">
					<Typography.Subtitle textColor="black">{title}</Typography.Subtitle>
				</Box>
			</Flex>
		</HeroLink>
	);
};

/**
 * Use the fifth template (two columns) to display the post entry
    displayImage: true,
    displayTitle: true,
    displaySubtitle: false,
    displayInfo: false,
    focusOnHover: false,
    displayFooter: false
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template5 = ({ uid, title = "", image }) => {
	return (
		<section className={clsx("hero-section", "template5")} key={uid} id={uid}>
			<HeroLink href={uid}>
				<Container
					as={Grid}
					templateColumns={["100%", "100%", "50% 50%"]}
					gap={["0", null, "2rem", "4rem"]}
				>
					<GridItem pb="2rem">
						<Typography.Subtitle textColor="brand.orange" textAlign="right">
							{title}
						</Typography.Subtitle>
					</GridItem>
					<GridItem
						as={Flex}
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						minHeight={["66vh", null, "auto"]}
						pb={["4rem", null, "0"]}
					>
						<AspectRatio ratio={image.ratio} width="100%">
							<Image
								src={image.url}
								alt={image.alt}
								layout="fill"
								objectFit="contain"
							/>
						</AspectRatio>
					</GridItem>
				</Container>
			</HeroLink>
		</section>
	);
};

/**
 * Use the original template to display the post entry
    displayImage: true,
    displayTitle: true,
    displaySubtitle: true,
    displayInfo: true,
    focusOnHover: true,
    displayFooter: false
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template6 = ({ uid, title = "", subtitle = "", image, ...articleInfo }) => {
	const [blurred, setBlurred] = useState(true);

	return (
		<section
			className={clsx("hero-section", "template6", blurred && "blurred")}
			key={uid}
			id={uid}
		>
			<BackgroundImageContainer image={image} />
			<ArticleInfo {...articleInfo} textColor="white" />
			<HeroLink
				href={uid}
				onMouseEnter={() => setBlurred(false)}
				onMouseLeave={() => setBlurred(true)}
			>
				<HeroText title={title} subtitle={subtitle} textColor="white" />
			</HeroLink>
		</section>
	);
};

const templates = [
	null,
	Template1,
	Template2,
	Template3,
	Template4,
	Template5,
	Template6
];

/**
 * Choose the right template
 * @param {String} templateChoice `#number: description`
 */
const analyzeTemplate = (templateChoice) => {
	try {
		return templates[Number(templateChoice.split(":")[0])] || Template1;
	} catch (err) {
		console.error(`analyzeTemplate() : Error on template ${templateChoice}`);
		// Invalid template string or template not specified
		return Template1;
	}
};

/**
 * Display a new post with 5 different templates on the Home Page
 * @param {JsXElement} props
 * @param {String} [props.template] The name of the template to use
 */
const SectionHomePost = ({ template, ...postData }) => {
	const Template = analyzeTemplate(template);

	return <Template {...postData} />;
};

export default SectionHomePost;
