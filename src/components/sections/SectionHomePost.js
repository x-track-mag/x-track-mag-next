import { useState } from "react";
import clsx from "clsx";
import BackgroundImageContainer from "@components/base/BackgroundImageContainer";
import HeroText from "@components/base/HeroText";

import { HeroLink } from "@components/base/Links";
import ArticleInfo from "@components/ArticleInfo";
import { Title, Subtitle } from "@components/base/Typography";
import Container from "@components/base/Container";
import { Box, SimpleGrid, AspectRatio, Flex } from "@chakra-ui/react";
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
	link_to,
	title = "",
	subtitle = "",
	image,
	video_loop,
	...articleInfo
}) => {
	return (
		<section className={clsx("hero-section", "template1")} key={uid} id={uid}>
			<BackgroundImageContainer image={image} video_loop={video_loop} />
			<ArticleInfo position="absolute" {...articleInfo} textColor="white" />
			<HeroLink href={link_to}>
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
	link_to,
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
			<ArticleInfo position="absolute" {...articleInfo} textColor="white" />
			<HeroLink
				href={link_to}
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
export const Template3 = ({ uid, link_to, title = "", image, video_loop }) => {
	const [blurred, setBlurred] = useState(false);

	return (
		<section
			className={clsx("hero-section", "template3", blurred && "blurred")}
			key={uid}
			id={uid}
		>
			<BackgroundImageContainer image={image} video_loop={video_loop} />
			<HeroLink
				href={link_to}
				onMouseEnter={() => setBlurred(true)}
				onMouseLeave={() => setBlurred(false)}
			>
				<HeroText
					title={title}
					textColor="white"
					fontSize="4rem"
					fontStyle="italic"
					lineHeight="1em"
				/>
			</HeroLink>
		</section>
	);
};

/**
 * Use the fourth template to display an image with the title in a footer
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 * @param {Object} [props.image] Background Image
 * @param {String} [props.author]
 * @param {ISODate} [props.publication_date]
 * @param {Array<String>} [props.tags]
 */
export const Template4 = ({ uid, link_to, title = "", image, video_loop }) => {
	return (
		<HeroLink href={link_to}>
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
				<Box as="footer" height="4rem" flexGrow="0" pt="0.5rem" width="100%">
					<Subtitle textColor="black">{title}</Subtitle>
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
export const Template5 = ({ uid, link_to, title = "", image }) => {
	return (
		<section className={clsx("hero-section", "template5")} key={uid} id={uid}>
			<HeroLink href={link_to}>
				<Container as={SimpleGrid} columns={{ base: 1, sm: 2 }} spacing="2rem">
					<Flex
						flexDirection="column"
						justifyContent="center"
						alignContent="flex-start"
					>
						<Subtitle
							textColor="brand.orange"
							textAlign="right"
							whileHover={{ scale: 1.4 }}
							zIndex="99"
						>
							{title}
						</Subtitle>
					</Flex>
					<Flex
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						padding="2rem 0"
						display={{ base: "none", sm: "block" }}
					>
						<AspectRatio ratio={image.ratio} width="100%">
							<Image
								src={image.url}
								alt={image.alt}
								layout="fill"
								objectFit="contain"
							/>
						</AspectRatio>
					</Flex>
				</Container>
			</HeroLink>
		</section>
	);
};

/**
 * White Background, Black title and sub title
 * @param {JsXElement} props
 * @param {String} [props.title] Titre principal
 * @param {String} [props.subtitle] Titre secondaire
 */
export const Template6 = ({ uid, link_to, title = "", subtitle }) => {
	return (
		<Box
			as="section"
			padding="4rem 2rem"
			minHeight={{ base: "auto", md: "33vh" }}
			key={uid}
			id={uid}
		>
			<HeroLink href={link_to}>
				<HeroText
					title={title}
					subtitle={subtitle}
					textColor="black"
					fontSize="4rem"
					lineHeight="1em"
				/>
			</HeroLink>
		</Box>
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
export const Template7 = ({
	uid,
	link_to,
	title = "",
	subtitle = "",
	image,
	...articleInfo
}) => {
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
				href={link_to}
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
	Template6,
	Template7
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
const SectionHomePost = ({ template, uid, internal_link, ...postData }) => {
	const Template = analyzeTemplate(template);
	const link_to = !internal_link ? `/posts/${uid}` : internal_link.uid;
	return <Template link_to={link_to} {...postData} />;
};

export default SectionHomePost;
