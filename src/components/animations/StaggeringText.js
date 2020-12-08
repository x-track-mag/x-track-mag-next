// import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Subtitle } from "@components/base/Typography";
import useInView from "@components/hooks/useInView";
import { createRef } from "react";

const LetterBox = {
	hidden: {
		x: 100
	},
	visible: {
		x: -100,
		transition: {
			staggerChildren: 0.5,
			delayChildren: 1
		}
	}
};

const Letter = {
	hidden: { y: 50, opacity: 0 },
	visible: { y: 0, opacity: 1, color: "red" }
};

const StaggeringText = ({ text, height = "1em", ...styleProps }) => {
	const ref = createRef();
	const inView = useInView(ref);

	if (!inView || !text) {
		return (
			<Subtitle ref={ref} {...styleProps}>
				{text}
			</Subtitle>
		);
	} else {
		// Split the letters to animate each of them individually
		const letters = text.split("");
		return (
			<Subtitle
				overflow="hidden"
				height={height}
				ref={ref}
				variants={LetterBox}
				initial="hidden"
				animate="visible"
				{...styleProps}
			>
				{letters.map((letter, i) => (
					<motion.b key={letter + i} variants={Letter}>
						{letter}
					</motion.b>
				))}
			</Subtitle>
		);
	}
};
export default StaggeringText;
