import "./Footer.styles.scss";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
// 	footer: {
// 		margin: "0",
// 		width: "100%",
// 		"& .link": {
// 			display: "block",
// 			margin: "0.5rem 1rem"
// 		}
// 	}
// }));

const Footer = () => {
	const styles = useStyles();
	return (
		<footer id="page-footer" className="footer">
			<a className="link" href="" target="_blank">
				Instagram
			</a>
			<a className="link" href="" target="_blank">
				Facebook
			</a>

			<p>(c) X-TRACK MAG {new Date().getFullYear()}</p>
		</footer>
	);
};

export default Footer;
