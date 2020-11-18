import global from "../styles/global.scss";
import { ThemeProvider } from "theme-ui";
import ViewportSizeProvider from "@components/ViewportSizeProvider.js";
import theme from "../styles/theme-w-typography.js";

const MyApp = ({ Component, pageProps }) => (
	<ThemeProvider theme={theme}>
		<ViewportSizeProvider>
			<Component {...pageProps} />
		</ViewportSizeProvider>
	</ThemeProvider>
);

export default MyApp;
