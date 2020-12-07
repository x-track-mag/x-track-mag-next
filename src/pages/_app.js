import global from "../styles/sass/global.scss";
import MetaSEO from "@components/MetaSeo";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import Layout from "@components/layout/Layout";

const MyApp = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<MetaSEO {...pageProps} />
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ChakraProvider>
);

export default MyApp;
