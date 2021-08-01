import { Fragment, useContext } from "react";
import paramContext from "../../../utils/store/paramsContext";
import roundContext from "../../../utils/store/roundContext";
import windowContext from "../../../utils/store/windowContext";
import levels from "../../../utils/store/initialState/paramLevels";
import styles from "../OptionDropdown/OptionDropdown.module.css";
import HighScores from "../../Modal/HighScores/HighScores";

// import styles from "./GameMenu.module.css";

const GameMenu = () => {
	const gameLevels = ["beginner", "intermediate", "expert"];
	const paramCtx = useContext(paramContext);
	const roundCtx = useContext(roundContext);
	const windowCtx = useContext(windowContext);

	const handleSelect = (lvl) => {
		paramCtx.setParameters(levels[lvl]);
	};

	const handleReset = () => {
		roundCtx.set.reset();
	};

	const handleModal = () => {
		windowCtx.overlay.modal("Best Times", <HighScores />);
	};

	return (
		<Fragment>
			<ul className={styles.dropdown__section}>
				<li onClick={handleReset} aria-label="New Game">
					New Game
				</li>
			</ul>
			<ul className={styles.dropdown__section}>
				{gameLevels.map((lvl) => {
					return (
						<li
							key={`level-${lvl}`}
							onClick={() => handleSelect(lvl)}
							className={paramCtx.level === lvl ? styles["--selected"] : null}
							aria-label={lvl.charAt(0).toUpperCase() + lvl.slice(1)}
						>
							{lvl.charAt(0).toUpperCase() + lvl.slice(1)}
						</li>
					);
				})}
			</ul>
			<ul className={styles.dropdown__section}>
				<li
					className={` ${styles["--secondaryLetter"]}`}
					onClick={handleModal}
					aria-label="Best Times"
				>
					Best <span>T</span>imes...
				</li>
			</ul>
		</Fragment>
	);
};

export default GameMenu;
