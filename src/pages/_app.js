import global from "../styles/sass/global.scss";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import Layout from "@components/layout/Layout";

const MyApp = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		{/* <ViewportSizeProvider> */}
		<Layout>
			<Head>
				<title>X-TRACK MAG</title>
				<script src="js/rollbar.js"></script>
			</Head>
			<Component {...pageProps} />
		</Layout>
		{/* </ViewportSizeProvider> */}
	</ChakraProvider>
);

export default MyApp;
