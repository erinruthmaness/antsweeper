import { useContext } from "react";
import windowContext from "../../../utils/store/windowContext";
import styles from "./Overlay.module.css";
import Modal from "../Modal/Modal";

const Overlay = () => {
	const windowCtx = useContext(windowContext);

	const handleClick = () => {
		windowCtx.overlay.hide();
	};

	let popupDiv = null;
	if (windowCtx.overlay.modalContent) {
		popupDiv = (
			<Modal dismiss={handleClick} title={windowCtx.overlay.modalContent.title}>
				{windowCtx.overlay.modalContent.content}
			</Modal>
		);
	}

	return (
		<div
			className={
				windowCtx.overlay.display ? styles.overlay : styles.overlay_hide
			}
			// onClick={handleClick}
		>
			{windowCtx.overlay.modalContent ? popupDiv : null}
		</div>
	);
};

export default Overlay;
