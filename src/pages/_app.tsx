import { ChakraProvider } from "@chakra-ui/react";
import { MetaSEO } from "@components/MetaSeo";
import { Layout } from "@components/layout";
import theme from "@styles/theme.js";
import "@styles/index.css";

const MyApp = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<MetaSEO {...pageProps} />
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ChakraProvider>
);

export default MyApp;
