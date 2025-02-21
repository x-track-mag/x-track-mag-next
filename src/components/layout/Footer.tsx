import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { NavLink, navLinkStyles } from "@components/base";
import { SvgHub } from "@components/icons";

const footerStyle = {
	position: "fixed",
	width: "100%",
	bottom: "1rem",
	zIndex: "999",
	padding: "0 2rem",
	alignItems: "center",
	justify: "space-between",
	textColor: "orange",

	style: { mixBlendMode: "difference", color: "orange" }, // once again the textColor property is not propagated
} as const;

/**
 * The footer with its social links
 *
 */
export const Footer = () => {
	const router = useRouter();
	// const textColor = router.route === "/" ? "white" : "black";

	return (
		<Flex as="footer" id="page-footer" {...footerStyle}>
			<NavLink aria-label="Home page" href="https://x-track.net">
				<SvgHub size="3rem" _hover={{ stroke: "brand.green" }} />
			</NavLink>
			<NavLink
				aria-label="Notre Instagram"
				href="https://www.instagram.com/xtrackmag"
			>
				Instagram
			</NavLink>
			<NavLink
				aria-label="Spotify"
				href="https://open.spotify.com/user/x2swd5kbhnscczttswze3y9gy"
			>
				Spotify
			</NavLink>

			<Box
				display={{ base: "none", sm: "block" }}
				id="copyright"
				fontFamily="body"
				fontWeight={600}
				textTransform="uppercase"
			>
				(c) X-TRACK MAG {new Date().getFullYear()}
			</Box>
		</Flex>
	);
};
