import win98logo from "../../../imgs/win98Logo.png";
import { squares } from "../../../utils/logic/icons";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.bg__footer}>
      <button id="windows_start" className={styles.startButton}>
        <img src={win98logo} alt="Windows 98 Logo" /> Start
      </button>
      <button
        id="antsweeper_min"
        className={`button--focus ${styles.gamewindowButton}`}
      >
        {String.fromCharCode(...squares.ant)} Antsweeper
      </button>
    </footer>
  );
};

export default Footer;
