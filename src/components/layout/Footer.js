import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "@components/base/Links";
import SvgHub from "@components/icons/SvgHub";

const footerStyle = {
	position: "fixed",
	width: "100%",
	bottom: "2em",
	alignItems: "center",
	justify: "space-around",
	textColor: "white"
};

const Footer = () => {
	return (
		<Flex as="footer" id="page-footer" {...footerStyle}>
			<NavLink href="">
				<SvgHub color="white" size="2rem" />
			</NavLink>
			<NavLink href="https://www.instagram.com/xtrackmag">Instagram</NavLink>
			<NavLink href="https://www.facebook.com/xtrackmag">Facebook</NavLink>

			<div id="copyright">(c) X-TRACK MAG {new Date().getFullYear()}</div>
		</Flex>
	);
};

export default Footer;
