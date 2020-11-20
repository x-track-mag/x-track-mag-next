import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "@components/base/Links";

const footerStyle = {
	position: "fixed",
	width: "100%",
	bottom: "2em",
	align: "center",
	justify: "space-between"
};

const Footer = () => {
	return (
		<Flex as="footer" id="page-footer" {...footerStyle}>
			<NavLink href="https://www.instagram.com/xtrackmag">Instagram</NavLink>
			<NavLink href="https://www.facebook.com/xtrackmag">Facebook</NavLink>

			<p>(c) X-TRACK MAG {new Date().getFullYear()}</p>
		</Flex>
	);
};

export default Footer;
