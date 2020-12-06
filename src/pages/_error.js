import Error from "next/error";

function Error({ err }) {
	return (
		<code>
			<h1>
				{`{err.message} occured on the ${
					err.statusCode ? "server" : "client"
				} side`}
			</h1>
			<pre>{err.message}</pre>
		</code>
	);
}

Error.getInitialProps = ({ err }) => {
	return { err };
};

export default Error;
