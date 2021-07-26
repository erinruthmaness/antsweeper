import { Fragment, useContext } from "react";
import paramContext from "../../../utils/store/paramsContext";
import roundContext from "../../../utils/store/roundContext";
import windowContext from "../../../utils/store/windowContext";
// import useGlobalListener from "../../../hooks/use-globalListener";
import levels from "../../../utils/store/initialState/paramLevels";
import styles from "../OptionDropdown/OptionDropdown.module.css";
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
		windowCtx.overlay.modal("Best Times", "boop!");
	};

	return (
		<Fragment>
			<ul className={styles.dropdown__section}>
				<li onClick={handleReset}>New Game</li>
			</ul>
			<ul className={styles.dropdown__section}>
				{gameLevels.map((lvl) => {
					return (
						<li
							key={`level-${lvl}`}
							onClick={() => handleSelect(lvl)}
							className={paramCtx.level === lvl ? styles["--selected"] : null}
						>
							{lvl.charAt(0).toUpperCase() + lvl.slice(1)}
						</li>
					);
				})}
			</ul>
			<ul className={styles.dropdown__section}>
				<li className={` ${styles["--secondaryLetter"]}`} onClick={handleModal}>
					Best <span>T</span>imes...
				</li>
			</ul>
		</Fragment>
	);
};

export default GameMenu;
