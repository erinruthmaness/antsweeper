import { useContext } from "react";
import windowContext from "../../../utils/store/windowContext";
import styles from "./Overlay.module.css";

const Overlay = () => {
  const windowCtx = useContext(windowContext);

  const handleClick = () => {
    windowCtx.overlay.hide();
  };

  return (
    <div
      className={
        windowCtx.overlay.display ? styles.overlay : styles.overlay_hide
      }
      onClick={handleClick}
    ></div>
  );
};

export default Overlay;
