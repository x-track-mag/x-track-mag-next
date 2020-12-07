const ErrorPage = (props) => (
	<code>
		<h1>{`An unexpected error occured`}</h1>
		<pre>{JSON.stringify(props)}</pre>
	</code>
);

ErrorPage.getInitialProps = (props) => {
	return props;
};

export default ErrorPage;
