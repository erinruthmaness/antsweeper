import { useContext } from "react";
import { squares } from "imgs/icons";
import windowContext from "utils/store/windowContext";

import styles from "./TitleBar.module.css";

const TitleBar = () => {
	const windowCtx = useContext(windowContext);
	const cursorStyle = windowCtx.dragMove.isDragging ? "grabbing" : "grab";
	return (
		<div
			className={`${styles.titleBar} ${
				windowCtx.overlay.display ? styles["titleBar--inactive"] : ""
			}`}
			onPointerDown={windowCtx.dragMove.grab}
			onPointerUp={windowCtx.dragMove.drop}
			onPointerOut={windowCtx.dragMove.drop}
			onPointerMove={windowCtx.dragMove.drag}
			onMouseOver={null}
			style={{ cursor: cursorStyle }}
		>
			<span className={styles.titleBar__left}>
				{String.fromCharCode(...squares.ant)}
				<h1>Antsweeper</h1>
			</span>
			<span className={styles.titleBar__right}>
				<button
					className={styles["--minimize"]}
					onClick={windowCtx.minimize.down}
				>
					_
				</button>
				<button disabled className={"button--focus"}>
					&#10006;
				</button>
			</span>
		</div>
	);
};

export default TitleBar;
