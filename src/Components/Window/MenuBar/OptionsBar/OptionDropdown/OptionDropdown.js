import GameMenu from "./GameMenu";
import HelpMenu from "./HelpMenu";

import styles from "./OptionDropdown.module.css";

const OptionDropdown = (props) => {
  return (
    <aside className={styles.dropdown}>
      {props.which === "Game" ? <GameMenu /> : null}
      {props.which === "Help" ? <HelpMenu /> : null}
    </aside>
  );
};

export default OptionDropdown;
