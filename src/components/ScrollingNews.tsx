import Ticker from "react-ticker";

import { Message } from "@components/base";

export const ScrollingNews = ({ messages = [], delay = 500 }) => {
	if (!messages.length) return;
	const message = messages.map((msg) => msg + "   -   ").join("");

	return (
		<div
			id="scrolling-news"
			style={{
				position: "fixed",
				width: "100%",
				overflow: "hidden",
				top: "5rem",
				height: "4em",
				zIndex: 999,
			}}
		>
			<Ticker>{() => <Message>{message}</Message>}</Ticker>
		</div>
	);
};
