import { useContext } from "react";
import win98logo from "imgs/win98Logo.png";
import { squares } from "imgs/icons";
import windowContext from "utils/store/windowContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const windowCtx = useContext(windowContext);
  let gameWindowButtonStyle = styles.gameWindowButton;
  if (!windowCtx.minimize.isMinimized) {
    gameWindowButtonStyle = `${styles.gameWindowButton} button--focus`;
  }
  const clickHandler = () => {
    if (windowCtx.minimize.isMinimized) {
      windowCtx.minimize.up();
    } else {
      windowCtx.minimize.down();
    }
  };
  return (
    <footer className={styles.bg__footer}>
      <button id="windows_start" className={styles.startButton}>
        <img src={win98logo} alt="Windows 98 Logo" /> Start
      </button>
      <button
        id="antsweeper_min"
        className={gameWindowButtonStyle}
        onClick={clickHandler}
      >
        {String.fromCharCode(...squares.ant)} Antsweeper
      </button>
    </footer>
  );
};

export default Footer;
