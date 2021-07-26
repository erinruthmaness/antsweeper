import { useCallback, useContext, useEffect, useState } from "react";
import userContext from "../../../utils/store/userContext";
import OptionDropdown from "../OptionDropdown/OptionDropdown";
import styles from "./OptionWrapper.module.css";

const OptionWrapper = (props) => {
	const userCtx = useContext(userContext);

	const [dropdown, setDropdown] = useState(false);
	const [listenForGlobalClick, setListenForGlobalClick] = useState(false);

	const handleDown = useCallback(() => {
		if (!dropdown) {
			setDropdown(true);
		}
	}, [dropdown]);

	const handleUp = useCallback(() => {
		if (dropdown) {
			setDropdown(false);
			setListenForGlobalClick(false);
		}
	}, [dropdown]);

	const handleClick = (e) => {
		if (dropdown) {
			handleUp();
		} else {
			handleDown();
		}
	};

	//make sure the dropdown animation has time to play
	useEffect(() => {
		const timer = setTimeout(() => {
			if (dropdown) {
				setListenForGlobalClick(true);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [dropdown]);

	useEffect(() => {
		if (listenForGlobalClick && userCtx.click.current) {
			if (
				userCtx.click.current.target.id ===
				props.buttonText + "-optionButton"
			) {
				return;
			} else if (dropdown) {
				handleUp();
			}
		}
	}, [
		userCtx.click,
		dropdown,
		listenForGlobalClick,
		handleUp,
		props.buttonText,
	]);

	return (
		<div className={styles.optionButton__wrapper}>
			<button
				id={props.buttonText + "-optionButton"}
				className={
					dropdown
						? `${styles.optionButton} ${styles["optionButton--clicked"]}`
						: styles.optionButton
				}
				onClick={handleClick}
			>
				{props.buttonText}
			</button>
			{dropdown ? <OptionDropdown which={props.buttonText} /> : null}
		</div>
	);
};

export default OptionWrapper;
