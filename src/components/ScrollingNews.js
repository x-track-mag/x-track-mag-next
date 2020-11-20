import Ticker from "react-ticker";

import { Message } from "@components/base/Typography";

const ScrollingNews = ({ messages = [], delay = 500 }) => {
	if (!messages.length) return;
	const message = messages.map((msg) => msg + "   -   ").join("");

	return (
		<div
			id="scrolling-news"
			style={{
				position: "fixed",
				width: "100%",
				overflow: "hidden",
				top: "5em",
				height: "4em"
			}}
		>
			<Ticker>{() => <Message>{message}</Message>}</Ticker>
		</div>
	);
};

export default ScrollingNews;
