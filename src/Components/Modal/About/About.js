import { Fragment, useState } from "react";
import keyHandler from "../../../utils/logic/keyHandler";
import styles from "./About.module.css";

const About = () => {
	const [emailCopied, setEmailCopied] = useState(false);

	const copyText = () => {
		/*if (this.state.thisBrowser.name === "IE") {
        window.clipboardData.setData("Text", "erinruthmaness@gmail.com");
    } else {*/
		navigator.clipboard.writeText("erinruthmaness@gmail.com");
		/*}*/
		setEmailCopied(true);
	};

	const keyPressHandler = (e) => {
		keyHandler("Enter", copyText, null, e);
	};

	return (
		<Fragment>
			<h2>Welcome To Antsweeper!</h2>
			<p>
				This game recreates the old Windows Minesweeper game (but with ants - I
				garden a lot) using React and some concepts introduced by React hooks. I
				love reverse-engineering games and ideas using JavaScript, and I also
				love Minesweeper, so this was bound to happen eventually.
			</p>
			<p>
				I've been working on this project casually in my free time as I study my
				way back through React hooks, so it may be missing features when you see
				it.
			</p>
			<p>
				I'm currently looking for a job! Click
				<strong>
					<span
						className={`${styles.tooltip} ${
							emailCopied ? styles["--emailCopied"] : "focusable "
						}`}
						onClick={copyText}
						onKeyPress={keyPressHandler}
						tabIndex={0}
					>
						here
						<span className={styles.tooltip__text}>
							{emailCopied ? "Thank you!" : "Click to copy my email address"}
						</span>
					</span>
				</strong>
				to copy my email address.
			</p>
		</Fragment>
	);
};

export default About;
