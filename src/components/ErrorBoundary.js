import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { error, hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		logErrorToMyService(error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div class="error">
					<h1>CATCHED AN UNEXPECTED ERROR.</h1>;
					<code>
						<pre>{this.state.error.stack}</pre>
					</code>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
