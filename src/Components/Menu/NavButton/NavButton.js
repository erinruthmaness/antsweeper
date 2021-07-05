import { useState } from "react";
import NavDropdown from "../NavDropdown/NavDropdown";
import styles from "./NavButton.module.css";

const NavButton = (props) => {
  const [dropdown, setDropDown] = useState(false);

  const handleClick = () => {
    setDropDown((prevState) => !prevState);
  };

  return (
    <li className={styles.dropdown_wrapper}>
      <button className={styles.dropdown_choice} onClick={handleClick}>
        {props.buttonText}
      </button>
      {dropdown ? (
        <NavDropdown which={props.buttonText} dismiss={handleClick} />
      ) : null}
    </li>
  );
};

export default NavButton;
