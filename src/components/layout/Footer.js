import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { NavLink } from "@components/base/Links";
import SvgHub from "@components/icons/SvgHub";

const footerStyle = {
	position: "fixed",
	width: "100%",
	bottom: "1.5em",
	zIndex: "999",
	padding: "0 2rem",
	alignItems: "center",
	justify: "space-between",
	textColor: "white"
};

/**
 * The footer with its social links
 *
 */
const Footer = () => {
	const router = useRouter();
	const textColor = router.route === "/" ? "white" : "black";

	return (
		<Flex
			as="footer"
			id="page-footer"
			{...footerStyle}
			textColor={textColor}
			bgColor="#fb0"
		>
			<NavLink href="https://x-track.net">
				<SvgHub color={textColor} size="2rem" />
			</NavLink>
			<NavLink href="https://www.instagram.com/xtrackmag">Instagram</NavLink>
			<NavLink href="https://open.spotify.com/user/x2swd5kbhnscczttswze3y9gy">
				Spotify
			</NavLink>

			<div id="copyright">(c) X-TRACK MAG {new Date().getFullYear()}</div>
		</Flex>
	);
};

export default Footer;
