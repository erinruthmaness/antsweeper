import { Fragment, useContext, useCallback, useState } from "react";
import windowContext from "utils/store/windowContext";
import Overlay from "Components/Modal/Overlay";
import MenuBar from "Components/Window/MenuBar";
import Board from "Components/Game/Board";
import styles from "./Window.module.css";

const Window = () => {
  const windowCtx = useContext(windowContext);
  const [animation, setAnimation] = useState("");
  const [minComplete, setMinComplete] = useState(false);
  const [maxComplete, setMaxComplete] = useState(false);

  const animationEndHandler = () => {
    console.log("animation ended");
    if (animation === "window--minimizing") {
      //if the animation that just ran was minimize
      setAnimation("");
      setMinComplete(true);
      setMaxComplete(false);
    } else if (animation === "window--maximizing") {
      setAnimation("");
      setMaxComplete(true);
      setMinComplete(false);
    }
    // setAnimation(null);
  };

  const animationStartHandler = () => {
    console.log("animation started");
  };

  useCallback(() => {
    console.log("window usecallback");
    if (windowCtx.minimize.isMinimized && !minComplete) {
      setAnimation("window--minimizing");
    }
    if (!windowCtx.minimize.isMinimized && !maxComplete) {
      setAnimation("window--maximizing");
    }
  }, [windowCtx.minimize.isMinimized, minComplete, maxComplete]);

  return (
    <main
      className={`focusable ${styles.window} ${animation ? styles[animation] : ""} ${
        windowCtx.minimize.isMinimized ? styles["window--minimized"] : ""
      }`}
      tabIndex={0}
      style={{
        transform: windowCtx.minimize.isMinimized
          ? "none"
          : `translateX(${windowCtx.dragMove.translate.x}px) translateY(${windowCtx.dragMove.translate.y}px)`,
      }}
      onAnimationEnd={animationEndHandler}
      onAnimationStart={animationStartHandler}
    >
      {windowCtx.minimize.isMinimized ? null : (
        <Fragment>
          <Overlay />
          <MenuBar />
          <Board />
        </Fragment>
      )}
    </main>
  );
};

export default Window;
