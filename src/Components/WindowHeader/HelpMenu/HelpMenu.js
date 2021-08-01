import { Fragment, useContext } from "react";
import windowContext from "../../../utils/store/windowContext";
import About from "../../Modal/About/About";
import ExternalLinkIcon from "../ExternalLinkIcon/ExternalLinkIcon";

import styles from "../OptionDropdown/OptionDropdown.module.css";

const HelpMenu = () => {
	const windowCtx = useContext(windowContext);

	const handleModal = () => {
		windowCtx.overlay.modal("About Antsweeper", <About />);
	};

	return (
		<Fragment>
			<ul className={styles.dropdown__section}>
				<a href="https://github.com/erinruthmaness/antsweeper">
					<li>Contents</li>
				</a>
			</ul>
			<ul className={styles.dropdown__section}>
				<li onClick={handleModal} aria-label="What is Antsweeper?">
					What is Antsweeper?
				</li>
				<a
					target="_blank"
					rel="noreferrer"
					href="http://www.minesweeper.info/wiki/Windows_Minesweeper"
				>
					<li aria-label="About Minesweeper (opens in new window)">
						About Minesweeper... <ExternalLinkIcon />
					</li>
				</a>
			</ul>
		</Fragment>
	);
};

export default HelpMenu;
