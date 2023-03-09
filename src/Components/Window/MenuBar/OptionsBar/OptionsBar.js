import OptionButtonWrapper from "./OptionWrapper";

import styles from "./OptionsBar.module.css";

const OptionsBar = () => {
	return (
		<nav className={styles.optionsBar}>
			<OptionButtonWrapper buttonText={"Game"} />
			<OptionButtonWrapper buttonText={"Help"} />
		</nav>
	);
};

export default OptionsBar;
