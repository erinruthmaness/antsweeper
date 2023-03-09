import useDragMove from "hooks/useDragMove";
import useTrapFocus from "hooks/useTrapFocus";
import readKeypress from "utils/logic/user/readKeypress";

import titleStyles from "Components/Window/MenuBar/TitleBar/TitleBar.module.css";
import styles from "./Modal.module.css";

const Modal = (props) => {
    const modalDrag = useDragMove();
    const cursorStyle = modalDrag.isDragging ? "grabbing" : "grab";

    const trapFocus = useTrapFocus();

    const handleModalKeypress = (e) => {
        readKeypress("Escape", props.dismiss, null, e);
        readKeypress("Tab", trapFocus.next, trapFocus.previous, e);
    };

    return (
        <article
            ref={trapFocus.ref}
            className={`focusable ${styles.modal}`}
            style={{
                transform: `translateX(${modalDrag.translate.x}px) translateY(${modalDrag.translate.y}px)`,
            }}
            onKeyDown={handleModalKeypress}
            tabIndex={0}
        >
            <nav className={titleStyles.titleBar} onPointerDown={modalDrag.grab} onPointerUp={modalDrag.drop} onPointerOut={modalDrag.drop} onPointerMove={modalDrag.drag} onMouseOver={null} style={{ cursor: cursorStyle }}>
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
