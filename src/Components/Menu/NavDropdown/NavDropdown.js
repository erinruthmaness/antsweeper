import styles from "./NavDropdown.module.css";
import GameOptionsMenu from "../GameOptionsMenu/GameOptionsMenu";

const NavDropdown = (props) => {
  return (
    <ul className={styles.dropdown_menu}>
      <div
        className={styles.dropdown_menu__overlay}
        onClick={props.dismiss}
      ></div>
      {props.which === "Game" ? <GameOptionsMenu dismiss={props.dismiss} /> : null}
      {props.which === "Help" ? null : null}
    </ul>
  );
};

export default NavDropdown;
