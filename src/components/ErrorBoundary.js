import { Component } from "react";
import { Box } from "@chakra-ui/react";
import Typography from "./base/Typography";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, errorInfo) {
		// Update state so the next render will show the fallback UI.
		this.setState({ error, errorInfo, hasError: true });
	}
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			const { error, errorInfo } = this.state;
			return (
				<Box className="error" textColor="red" fontSize="16px">
					<h1>{error.message}</h1>

					<h2>Stack Trace</h2>
					<code>
						<pre>{errorInfo.componentStack}</pre>
					</code>
				</Box>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
