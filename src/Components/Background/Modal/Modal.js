import useDragMove from "../../../hooks/useDragMove";

import styles from "./Modal.module.css";
import titleStyles from "../../WindowHeader/TitleBar/TitleBar.module.css";

const Modal = (props) => {
	const modalDrag = useDragMove();
	// { isDragging, grab, drag, drop, translate }
	const cursorStyle = modalDrag.isDragging ? "grabbing" : "grab";

	return (
		<article
			className={styles.modal}
			style={{
				transform: `translateX(${modalDrag.translate.x}px) translateY(${modalDrag.translate.y}px)`,
			}}
		>
			<nav
				className={titleStyles.titleBar}
				onPointerDown={modalDrag.grab}
				onPointerUp={modalDrag.drop}
				onPointerOut={modalDrag.drop}
				onPointerMove={modalDrag.drag}
				onMouseOver={null}
				style={{ cursor: cursorStyle }}
			>
				<span className={titleStyles.titleBar__left}>
					<h1 id={styles.modal__title}>{props.title}</h1>
				</span>
				<span className={titleStyles.titleBar__right}>
					<button onClick={props.dismiss}>&#10006;</button>
				</span>
			</nav>
			<section className={styles.modal__contentWrapper}>
				<div className={styles.modal__text}>{props.children}</div>
			</section>
			<section className={styles.modal__buttonWrapper}>
				<button className={styles.modal__button} onClick={props.dismiss}>
					<span>OK</span>
				</button>
			</section>
		</article>
	);
};

export default Modal;
