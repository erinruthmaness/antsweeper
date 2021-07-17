import { useContext } from "react";
import { squares } from "../../../imgs/icons";
import windowContext from "../../../utils/store/windowContext";

import styles from "./TitleBar.module.css";

const TitleBar = () => {
  const windowCtx = useContext(windowContext);
  const cursorStyle = windowCtx.dragMove.isDragging ? "grabbing" : "grab";
  return (
    <section
      className={styles.titleBar}
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
        <button onClick={windowCtx.minimize.down}>&#818;</button>
        <button disabled>&#10006;</button>
      </span>
    </section>
  );
};

export default TitleBar;
