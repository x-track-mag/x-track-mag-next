const ErrorPage = ({ err }) => (
	<code>
		<h1>
			{`{err.message} occured on the ${err.statusCode ? "server" : "client"} side`}
		</h1>
		<pre>{err.stack}</pre>
	</code>
);

ErrorPage.getInitialProps = ({ err }) => {
	return { err };
};

export default ErrorPage;
