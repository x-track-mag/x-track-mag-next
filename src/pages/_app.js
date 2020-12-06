import global from "../styles/sass/global.scss";

import MetaSEO from "@components/MetaSeo";
import ErrorBoundary from "@components/ErrorBoundary.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import Layout from "@components/layout/Layout";

const MyApp = ({ Component, pageProps }) => (
	<ErrorBoundary>
		<MetaSEO />
		<ChakraProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	</ErrorBoundary>
);

export default MyApp;
