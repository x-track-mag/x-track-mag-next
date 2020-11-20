import { chakra } from "@chakra-ui/react";

export default Container = ({ children }) => (
	<chakra.div m="0 auto" p="2rem 0" width="100%" maxWidth={{ sm: "90%", md: "80ch" }}>
		{children}
	</chakra.div>
);
