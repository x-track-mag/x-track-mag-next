import global from "../styles/sass/global.scss";
import ViewportSizeProvider from "@components/ViewportSizeProvider.js";
import theme from "../styles/theme.js";
import Layout from "@components/layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<ViewportSizeProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ViewportSizeProvider>
	</ChakraProvider>
);

export default MyApp;
