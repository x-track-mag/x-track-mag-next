import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "@components/base/Links";
import SvgHub from "@components/icons/SvgHub";

const footerStyle = {
	position: "fixed",
	width: "100%",
	bottom: "2em",
	alignItems: "center",
	justify: "space-around"
};

const Footer = () => {
	return (
		<Flex as="footer" id="page-footer" {...footerStyle}>
			<NavLink href="">
				<SvgHub color="white" />
			</NavLink>
			<NavLink href="https://www.instagram.com/xtrackmag">Instagram</NavLink>
			<NavLink href="https://www.facebook.com/xtrackmag">Facebook</NavLink>

			<p>(c) X-TRACK MAG {new Date().getFullYear()}</p>
		</Flex>
	);
};

export default Footer;
