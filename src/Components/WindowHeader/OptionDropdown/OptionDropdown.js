import GameMenu from "../GameMenu/GameMenu";

import styles from "./OptionDropdown.module.css";

const OptionDropdown = (props) => {
  return (
    <aside className={styles.dropdown}>
      {props.which === "Game" ? <GameMenu /> : null}
      {props.which === "Help" ? null : null}
    </aside>
  );
};

export default OptionDropdown;
