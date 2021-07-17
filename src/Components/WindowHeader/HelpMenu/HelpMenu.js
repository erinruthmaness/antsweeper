import { Fragment } from "react";
import styles from "../OptionDropdown/OptionDropdown.module.css";

const HelpMenu = (props) => {

  return (
    <Fragment>
      <ul className={styles.dropdown__section}>
        <a href="https://github.com/erinruthmaness/antsweeper">
          <li>Contents</li>
        </a>
      </ul>
      <ul className={styles.dropdown__section}>
        <a
          target="_blank"
          rel="noreferrer"
          href="http://www.minesweeper.info/wiki/Windows_Minesweeper"
        >
          <li>About Minesweeper...</li>
        </a>
      </ul>
    </Fragment>
  );
};

export default HelpMenu;
