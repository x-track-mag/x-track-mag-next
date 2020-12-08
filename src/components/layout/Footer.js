import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "@components/base/Links";
import SvgHub from "@components/icons/SvgHub";
import { navLinkStyles } from "@components/base/Links";

const footerStyle = {
	position: "fixed",
	width: "100%",
	bottom: "1rem",
	zIndex: "999",
	padding: "0 2rem",
	alignItems: "center",
	justify: "space-between",
	textColor: "orange",

	style: { mixBlendMode: "difference", color: "orange" } // once again the textColor property is not propagated
};

/**
 * The footer with its social links
 *
 */
const Footer = () => {
	const router = useRouter();
	// const textColor = router.route === "/" ? "white" : "black";

	return (
		<Flex as="footer" id="page-footer" {...footerStyle}>
			<NavLink href="https://x-track.net">
				<SvgHub size="3rem" _hover={{ stroke: "brand.green" }} />
			</NavLink>
			<NavLink href="https://www.instagram.com/xtrackmag">Instagram</NavLink>
			<NavLink href="https://open.spotify.com/user/x2swd5kbhnscczttswze3y9gy">
				Spotify
			</NavLink>

			<Box
				display={{ base: "none", sm: "block" }}
				id="copyright"
				{...navLinkStyles}
			>
				(c) X-TRACK MAG {new Date().getFullYear()}
			</Box>
		</Flex>
	);
};

export default Footer;
